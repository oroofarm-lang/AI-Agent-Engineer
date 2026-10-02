import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { mentorRepository } from '../src/lib/db/mentor';
import { mentorInput, mentorInstructions } from '../src/lib/ai/policy';
import { mentorConfiguration, openAIProvider } from '../src/lib/ai/provider';
import { sendMentorMessage } from '../src/lib/ai/service';
import { repository } from '../src/lib/db/repository';
import { boundedJSON } from '../src/lib/http/body';
const open: ReturnType<typeof connect>[] = [];
afterEach(() => {
  for (const connection of open.splice(0)) connection.sqlite.close();
  vi.unstubAllEnvs();
});
function fixture() {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, c);
  connection.sqlite
    .prepare("INSERT INTO users(id,locale,created_at) VALUES('other','he-IL',?)")
    .run(new Date().toISOString());
  return { c, connection };
}
function input() {
  return mentorInput.parse({
    requestId: randomUUID(),
    lessonId: 'W01D01_FIRST_AI_PROGRAM',
    message: 'איך בודקים שהמפתח נקרא?',
    mode: 'hint',
    learningMode: 'tutorial',
    helpLevel: 1,
  });
}
const reply = {
  text: 'תשובת בדיקה מסומנת: בדוק אם משתנה הסביבה מוגדר.',
  inputTokens: 20,
  outputTokens: 10,
};
it('adapter sends stateless bounded server requests and never treats incomplete output as success', async () => {
  vi.stubEnv('OPENAI_API_KEY', 'unit-test-key');
  vi.stubEnv('AI_MODEL', 'unit-test-model');
  const request = vi.fn<typeof fetch>().mockResolvedValue(
    Response.json({
      status: 'completed',
      output: [{ type: 'message', content: [{ type: 'output_text', text: 'Test fixture only' }] }],
      usage: { input_tokens: 3, output_tokens: 4 },
    }),
  );
  expect(
    (await openAIProvider(request).reply({ instructions: 'policy', context: 'data', messages: [] }))
      .text,
  ).toBe('Test fixture only');
  const body = JSON.parse(String(request.mock.calls[0][1]?.body));
  expect(body.store).toBe(false);
  expect(body.max_output_tokens).toBe(1800);
  expect(body.model).toBe('unit-test-model');
  request.mockResolvedValueOnce(Response.json({ status: 'incomplete', output: [] }));
  await expect(
    openAIProvider(request).reply({ instructions: '', context: '', messages: [] }),
  ).rejects.toThrow('AI_INCOMPLETE');
  request.mockResolvedValueOnce(new Response('contains-private-provider-detail', { status: 401 }));
  await expect(
    openAIProvider(request).reply({ instructions: '', context: '', messages: [] }),
  ).rejects.toThrow('AI_PROVIDER_FAILED');
  expect(request).toHaveBeenCalledTimes(3);
});
it('missing configuration cannot produce a simulated learner answer', async () => {
  vi.stubEnv('OPENAI_API_KEY', '');
  vi.stubEnv('AI_MODEL', '');
  const request = vi.fn<typeof fetch>();
  expect(mentorConfiguration().ready).toBe(false);
  await expect(
    openAIProvider(request).reply({ instructions: '', context: '', messages: [] }),
  ).rejects.toThrow('AI_NOT_CONFIGURED');
  expect(request).not.toHaveBeenCalled();
});
it('persists replies, deduplicates a request, isolates threads and sends selected notes only', async () => {
  const { c, connection } = fixture(),
    value = input();
  const learner = repository(connection, c, 'local');
  learner.saveNote(value.lessonId!, 'PRIVATE NOTE FIXTURE');
  const provider = { reply: vi.fn().mockResolvedValue(reply) };
  const sent = await sendMentorMessage(connection, c, 'local', value, provider, 'lesson text');
  expect(sent.messages).toHaveLength(2);
  expect(provider.reply.mock.calls[0][0].context).not.toContain('PRIVATE NOTE FIXTURE');
  await sendMentorMessage(connection, c, 'local', value, provider, 'lesson text');
  expect(provider.reply).toHaveBeenCalledTimes(1);
  expect(mentorRepository(connection, 'other').latest(value.lessonId)).toBeUndefined();
  await expect(
    sendMentorMessage(
      connection,
      c,
      'other',
      { ...input(), threadId: sent.threadId },
      provider,
      '',
    ),
  ).rejects.toThrow('UNKNOWN_THREAD');
  await sendMentorMessage(
    connection,
    c,
    'local',
    { ...input(), threadId: sent.threadId, includeNotes: true },
    provider,
    '',
  );
  expect(provider.reply.mock.calls[1][0].context).toContain('PRIVATE NOTE FIXTURE');
  expect(learner.exportData().mentorMessages).toHaveLength(4);
  expect(repository(connection, c, 'other').exportData().mentorMessages).toEqual([]);
});
it('limits concurrency and daily requests; failure persists without an assistant answer or retry', async () => {
  const { c, connection } = fixture();
  const repo = mentorRepository(connection, 'local');
  const reservation = {
    id: randomUUID(),
    lessonId: null,
    version: c.version,
    fingerprint: 'one',
    message: 'test fixture',
    mode: 'hint',
    helpLevel: 1,
  };
  repo.reserve(reservation);
  expect(() => repo.reserve({ ...reservation, id: randomUUID() })).toThrow('MENTOR_BUSY');
  repo.finish(reservation.id);
  for (let i = 1; i < 20; i++) {
    const next = { ...reservation, id: randomUUID() };
    repo.reserve(next);
    repo.finish(next.id);
  }
  expect(() => repo.reserve({ ...reservation, id: randomUUID() })).toThrow('MENTOR_DAILY_LIMIT');
  const provider = { reply: vi.fn().mockRejectedValue(new Error('AI_RATE_LIMIT')) };
  await expect(sendMentorMessage(connection, c, 'other', input(), provider, '')).rejects.toThrow(
    'AI_RATE_LIMIT',
  );
  expect(provider.reply).toHaveBeenCalledTimes(1);
  const thread = mentorRepository(connection, 'other').latest('W01D01_FIRST_AI_PROGRAM')!;
  expect(mentorRepository(connection, 'other').messages(thread.id)).toHaveLength(1);
  expect(
    connection.sqlite.prepare("SELECT state FROM mentor_runs WHERE user_id='other'").get(),
  ).toEqual({ state: 'FAILED' });
});
it('assessment policy restricts help and bounded JSON rejects chunked oversized bodies', async () => {
  expect(mentorInstructions({ ...input(), helpLevel: 5 }, true)).toContain('Maximum help level: 2');
  const request = new Request('http://test.invalid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'x'.repeat(80) }),
  });
  await expect(boundedJSON(request, 40)).rejects.toThrow('BODY_TOO_LARGE');
});
it('resolves the active question from the server catalog and rejects foreign criterion IDs', async () => {
  const { c, connection } = fixture(),
    rubric = c.assessments.find((item) => item.lessonId === input().lessonId)!;
  const provider = { reply: vi.fn().mockResolvedValue(reply) };
  await sendMentorMessage(
    connection,
    c,
    'local',
    { ...input(), activeTask: { kind: 'assessment', id: rubric.criteria[0].id } },
    provider,
    'lesson text',
  );
  const context = JSON.parse(provider.reply.mock.calls[0][0].context);
  expect(context.activeTask.criterion.prompt).toBe(rubric.criteria[0].prompt);
  expect(context.skillMastery).toEqual([]);
  await expect(
    sendMentorMessage(
      connection,
      c,
      'local',
      { ...input(), activeTask: { kind: 'assessment', id: 'FOREIGN_CRITERION' } },
      provider,
      '',
    ),
  ).rejects.toThrow('INVALID_TASK_CONTEXT');
  expect(provider.reply).toHaveBeenCalledTimes(1);
});
