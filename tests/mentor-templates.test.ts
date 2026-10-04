import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { templateDraftRepository } from '../src/lib/db/template-drafts';
import { templateCatalogSchema, starterDocument } from '../src/lib/templates/schema';
import { templateHash } from '../src/lib/templates/hash';
import rawCatalog from '../content/templates/releases/1.0.0.json';
import { mentorInput } from '../src/lib/ai/policy';
import { sendMentorMessage } from '../src/lib/ai/service';
import { sendAgentMessage, agentInput } from '../src/lib/agents/orchestrator';
import type { ProviderInput } from '../src/lib/ai/provider';
const opened: ReturnType<typeof connect>[] = [];
afterEach(() => {
  for (const c of opened.splice(0)) c.sqlite.close();
});
function fixture() {
  const curriculum = loadCurriculum(),
    connection = connect(':memory:');
  opened.push(connection);
  setupDatabase(connection, curriculum);
  connection.sqlite
    .prepare("INSERT INTO users(id,locale,created_at) VALUES('other','he-IL',?)")
    .run(new Date().toISOString());
  const definition = templateCatalogSchema
    .parse(rawCatalog)
    .templates.find((d) => d.lessonId === 'FND_01' && d.kind === 'markdown')!;
  const drafts = templateDraftRepository(connection, curriculum, 'local');
  const save = (notes: string, expectedRevision = 0) =>
    drafts.save({
      requestId: randomUUID(),
      templateId: definition.id,
      definitionHash: templateHash(definition),
      curriculumVersion: curriculum.version,
      expectedRevision,
      document: { ...starterDocument(definition), notes },
    });
  const input = () =>
    mentorInput.parse({
      requestId: randomUUID(),
      lessonId: definition.lessonId,
      message: 'איך לשפר את הטיוטה שלי?',
      mode: 'hint',
      learningMode: 'tutorial',
      helpLevel: 1,
      activeTask: { kind: 'assessment', id: definition.criterionId },
    });
  return { curriculum, connection, definition, drafts, save, input };
}
const reply = { text: 'תשובת ספק מדומה לצורך בדיקת הקשר בלבד.', inputTokens: 1, outputTokens: 1 };
it('sends owned progress without contents by default, and one exact saved draft only after explicit selection', async () => {
  const f = fixture();
  f.save('OWN_SAVED_TEXT — נתונים סינתטיים לבדיקת הרשאות בלבד.');
  const provider = { reply: vi.fn().mockResolvedValue(reply) };
  await sendMentorMessage(
    f.connection,
    f.curriculum,
    'local',
    f.input(),
    provider,
    'public lesson',
  );
  const first = JSON.parse(provider.reply.mock.calls[0][0].context);
  expect(first.selectedTemplate).toBeNull();
  expect(JSON.stringify(first)).not.toContain('OWN_SAVED_TEXT');
  expect(first.templateProgress.ownedStoredDocuments).toBe(1);
  expect(
    first.templateProgress.drafts.find(
      (d: { templateId: string }) => d.templateId === f.definition.id,
    ).revision,
  ).toBe(1);
  const selected = {
    templateId: f.definition.id,
    definitionHash: templateHash(f.definition),
    revision: 1,
  };
  const request = { ...f.input(), selectedTemplate: selected };
  await sendMentorMessage(f.connection, f.curriculum, 'local', request, provider, 'public lesson');
  expect(JSON.parse(provider.reply.mock.calls[1][0].context).selectedTemplate).toMatchObject({
    ...selected,
    text: expect.stringContaining('OWN_SAVED_TEXT'),
    execution: 'not-run',
    grade: null,
  });
  f.save('NEWER_TEXT — שינוי אחר בזמן בדיקה.', 1);
  await sendMentorMessage(f.connection, f.curriculum, 'local', request, provider, 'public lesson');
  expect(provider.reply).toHaveBeenCalledTimes(2);
  await expect(
    sendMentorMessage(
      f.connection,
      f.curriculum,
      'local',
      { ...request, requestId: randomUUID() },
      provider,
      '',
    ),
  ).rejects.toThrow('TEMPLATE_REVISION_CONFLICT');
  await expect(
    sendMentorMessage(
      f.connection,
      f.curriculum,
      'other',
      { ...request, requestId: randomUUID() },
      provider,
      '',
    ),
  ).rejects.toThrow('TEMPLATE_REVISION_CONFLICT');
  expect(provider.reply).toHaveBeenCalledTimes(2);
  expect(
    f.connection.sqlite
      .prepare("SELECT COUNT(*) AS n FROM mentor_runs WHERE user_id='other'")
      .get(),
  ).toEqual({ n: 0 });
});
it('rejects a selected template from another criterion and bounds the actual owned content with explicit truncation', async () => {
  const f = fixture();
  f.save('אב'.repeat(5500));
  const provider = { reply: vi.fn().mockResolvedValue(reply) };
  const request = {
    ...f.input(),
    selectedTemplate: {
      templateId: f.definition.id,
      definitionHash: templateHash(f.definition),
      revision: 1,
    },
  };
  await expect(
    sendMentorMessage(
      f.connection,
      f.curriculum,
      'local',
      {
        ...request,
        activeTask: {
          kind: 'assessment',
          id: f.curriculum.assessments.find((a) => a.lessonId === 'FND_01')!.criteria[0].id,
        },
      },
      provider,
      '',
    ),
  ).rejects.toThrow('INVALID_TEMPLATE_CONTEXT');
  expect(provider.reply).not.toHaveBeenCalled();
  await sendMentorMessage(f.connection, f.curriculum, 'local', request, provider, '');
  const selected = JSON.parse(provider.reply.mock.calls[0][0].context).selectedTemplate;
  expect(selected.text).toHaveLength(8000);
  expect(selected.truncated).toBe(true);
  expect(selected.totalCharacters).toBeGreaterThan(selected.includedCharacters);
  expect(() =>
    mentorInput.parse({
      ...request,
      selectedTemplate: { ...request.selectedTemplate, document: { notes: 'forged' } },
    }),
  ).toThrow();
});
it('keeps template contents out of routing and specialist tools without evidence permission, while authorized synthesis receives the selected draft', async () => {
  const f = fixture();
  f.save('SELECTED_ONLY_FIXTURE — הקשר בדיקה ולא עבודת לומד אמיתי.');
  const registry = JSON.parse(
    await (await import('node:fs/promises')).readFile('content/agents/registry.json', 'utf8'),
  );
  const specialist = registry.agents.find(
    (a: { role: string; allowedTools: string[] }) =>
      a.role === 'specialist' && !a.allowedTools.includes('evidence.read'),
  );
  expect(specialist).toBeDefined();
  const provider = {
    reply: vi.fn(async (request: ProviderInput) => ({
      ...reply,
      text: request.format ? JSON.stringify({ agentIds: [specialist.id] }) : reply.text,
    })),
  };
  const request = agentInput.parse({
    ...f.input(),
    selectedTemplate: {
      templateId: f.definition.id,
      definitionHash: templateHash(f.definition),
      revision: 1,
    },
  });
  await sendAgentMessage(f.connection, f.curriculum, 'local', request, provider, '');
  expect(provider.reply).toHaveBeenCalledTimes(3);
  expect(provider.reply.mock.calls[0][0].context).not.toContain('SELECTED_ONLY_FIXTURE');
  expect(provider.reply.mock.calls[1][0].context).not.toContain('SELECTED_ONLY_FIXTURE');
  expect(provider.reply.mock.calls[2][0].context).toContain('SELECTED_ONLY_FIXTURE');
});
