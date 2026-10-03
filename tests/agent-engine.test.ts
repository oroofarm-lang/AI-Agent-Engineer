import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { agentInput, sendAgentMessage } from '../src/lib/agents/orchestrator';
import { agentRepository } from '../src/lib/db/agents';
import { mentorRepository } from '../src/lib/db/mentor';
import { repository } from '../src/lib/db/repository';
import { loadAgentRegistry, type AgentDefinition } from '../src/lib/agents/registry';
import { collectAgentTools, parseToolContext, executeAgentTool } from '../src/lib/agents/tools';
import type { ProviderInput } from '../src/lib/ai/provider';

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
function input(level: 'eli5' | 'practical' | 'advanced' = 'practical') {
  return agentInput.parse({
    requestId: randomUUID(),
    lessonId: 'W01D01_FIRST_AI_PROGRAM',
    message: 'איך בודקים שהמפתח נקרא בלי לחשוף אותו?',
    mode: 'explain',
    learningMode: 'tutorial',
    helpLevel: 3,
    explanationLevel: level,
  });
}
function provider(ids = ['Agent-Curriculum-Pedagogy', 'Agent-Security-Auditor']) {
  return {
    reply: vi.fn(async (request: ProviderInput) => ({
      text: request.format
        ? JSON.stringify({ agentIds: ids })
        : request.instructions.includes('Synthesize only')
          ? 'תשובת בדיקה מאוחדת בלבד.'
          : 'דוח מומחה לצורך בדיקה בלבד.',
      inputTokens: 10,
      outputTokens: 5,
    })),
  };
}
it('actually routes, calls distinct specialists and synthesizes their actual reports; replay is free and tenant isolated', async () => {
  const { c, connection } = fixture(),
    value = input(),
    fake = provider();
  const result = await sendAgentMessage(
    connection,
    c,
    'local',
    value,
    fake,
    'Published lesson fixture',
  );
  expect(fake.reply).toHaveBeenCalledTimes(4);
  expect(result.state).toBe('COMPLETE');
  expect(result.messages.at(-1)?.body).toBe('תשובת בדיקה מאוחדת בלבד.');
  expect(result.steps.map((step) => step.role)).toEqual([
    'orchestrator',
    'specialist',
    'specialist',
    'synthesis',
  ]);
  expect(result.steps.every((step) => step.state === 'COMPLETE')).toBe(true);
  expect(fake.reply.mock.calls[1][0].instructions).not.toBe(
    fake.reply.mock.calls[2][0].instructions,
  );
  const synthesis = JSON.parse(fake.reply.mock.calls[3][0].context);
  expect(synthesis.answers.map((answer: { agentId: string }) => answer.agentId)).toEqual([
    'Agent-Curriculum-Pedagogy',
    'Agent-Security-Auditor',
  ]);
  await sendAgentMessage(connection, c, 'local', value, fake, 'Published lesson fixture');
  expect(fake.reply).toHaveBeenCalledTimes(4);
  expect(() => agentRepository(connection, 'other').steps(value.requestId)).toThrow('UNKNOWN_RUN');
  expect(repository(connection, c, 'local').exportData().agentSteps).toHaveLength(4);
  expect(repository(connection, c, 'other').exportData().agentSteps).toEqual([]);
  expect(
    connection.sqlite
      .prepare('SELECT input_tokens,output_tokens FROM mentor_runs WHERE id=?')
      .get(value.requestId),
  ).toEqual({ input_tokens: 40, output_tokens: 20 });
});
it('rejects invented routing IDs and duplicate IDs without a specialist call or learner answer', async () => {
  const { c, connection } = fixture();
  for (const ids of [
    ['Agent-Can-Send-Email'],
    ['Agent-Curriculum-Pedagogy', 'Agent-Curriculum-Pedagogy'],
  ]) {
    const value = input(),
      fake = provider(ids);
    await expect(sendAgentMessage(connection, c, 'local', value, fake, '')).rejects.toThrow(
      'AGENT_ROUTING_INVALID',
    );
    expect(fake.reply).toHaveBeenCalledTimes(1);
    expect(
      connection.sqlite.prepare('SELECT state FROM mentor_runs WHERE id=?').get(value.requestId),
    ).toEqual({ state: 'FAILED' });
    const thread = mentorRepository(connection, 'local').latest(value.lessonId)!;
    expect(
      mentorRepository(connection, 'local')
        .messages(thread.id)
        .map((item) => item.role),
    ).toEqual(['user']);
    expect(agentRepository(connection, 'local').latest(thread.id)).toEqual([]);
  }
});
it('preserves failed specialist traces and never fabricates a synthesis, grade or automatic retry', async () => {
  const { c, connection } = fixture(),
    value = input(),
    fake = provider();
  const original = fake.reply.getMockImplementation()!;
  fake.reply.mockImplementation(async (request) => {
    if (request.instructions.includes('Stay within your specialty'))
      throw new Error('AI_RATE_LIMIT');
    return original(request);
  });
  await expect(sendAgentMessage(connection, c, 'local', value, fake, '')).rejects.toThrow(
    'AI_RATE_LIMIT',
  );
  expect(fake.reply).toHaveBeenCalledTimes(3);
  expect(
    agentRepository(connection, 'local')
      .steps(value.requestId)
      .map((step) => step.state),
  ).toEqual(['COMPLETE', 'FAILED', 'FAILED']);
  expect(connection.sqlite.prepare('SELECT COUNT(*) n FROM skill_mastery').get()).toEqual({ n: 0 });
  const replay = await sendAgentMessage(connection, c, 'local', value, fake, '');
  expect(replay.state).toBe('FAILED');
  expect(fake.reply).toHaveBeenCalledTimes(3);
});
it('keeps all three explanation policies distinct while restricting interview help on EVERY call', async () => {
  const { c, connection } = fixture();
  for (const level of ['eli5', 'practical', 'advanced'] as const) {
    const fake = provider(['Agent-Curriculum-Pedagogy']);
    await sendAgentMessage(
      connection,
      c,
      'local',
      { ...input(level), learningMode: 'interview', helpLevel: 5 },
      fake,
      '',
    );
    for (const [request] of fake.reply.mock.calls)
      expect(request.instructions).toContain('Maximum help level: 2');
    expect(fake.reply.mock.calls.at(-1)![0].context).toContain(level);
  }
});
it('tool allowlists exclude private opt-in data from specialties without evidence permissions', () => {
  const { c } = fixture(),
    registry = loadAgentRegistry(c);
  const context = parseToolContext(
    JSON.stringify({
      curriculumVersion: c.version,
      activeTask: null,
      lesson: null,
      sources: [],
      progress: [],
      skillMastery: [],
      knowledge: null,
      selectedNotes: 'PRIVATE SELECTED FIXTURE',
      selectedCode: 'SELECTED CODE',
      selectedReflections: null,
    }),
  );
  const restricted: AgentDefinition = {
    ...registry.agents.find((agent) => agent.role === 'specialist')!,
    allowedTools: ['course.read'],
  };
  expect(JSON.stringify(collectAgentTools(restricted, context))).not.toContain(
    'PRIVATE SELECTED FIXTURE',
  );
  expect(() => executeAgentTool(restricted, 'evidence.read', context)).toThrow('AGENT_TOOL_DENIED');
  expect(() =>
    executeAgentTool({ ...restricted, allowedTools: ['shell.execute'] }, 'shell.execute', context),
  ).toThrow('UNKNOWN_AGENT_TOOL');
});
it('shares the legacy reservation ledger instead of bypassing its one-active-request rule', async () => {
  const { c, connection } = fixture(),
    value = input(),
    repo = mentorRepository(connection, 'local');
  repo.reserve({
    id: randomUUID(),
    lessonId: null,
    version: c.version,
    fingerprint: 'reserved',
    message: 'fixture',
    mode: 'hint',
    helpLevel: 1,
  });
  const fake = provider();
  await expect(sendAgentMessage(connection, c, 'local', value, fake, '')).rejects.toThrow(
    'MENTOR_BUSY',
  );
  expect(fake.reply).not.toHaveBeenCalled();
});

it('keeps the original concurrent run active when a conflicting request reuses its UUID', async () => {
  const { c, connection } = fixture(),
    value = input(),
    fake = provider();
  let releaseRouting!: () => void, routingStarted!: () => void;
  const held = new Promise<void>((resolve) => {
      releaseRouting = resolve;
    }),
    started = new Promise<void>((resolve) => {
      routingStarted = resolve;
    });
  const original = fake.reply.getMockImplementation()!;
  fake.reply.mockImplementation(async (request) => {
    if (request.format?.name === 'specialist_route') {
      routingStarted();
      await held;
    }
    return original(request);
  });
  const first = sendAgentMessage(connection, c, 'local', value, fake, 'Published fixture').then(
    (result) => ({ result, error: undefined }),
    (error: unknown) => ({ result: undefined, error }),
  );
  await started;
  const rejected = await sendAgentMessage(
    connection,
    c,
    'local',
    { ...value, message: 'בקשה שונה שמשתמשת באותו מזהה לצורך בדיקת התנגשות.' },
    fake,
    'Published fixture',
  ).then(
    () => undefined,
    (error: unknown) => error,
  );
  const during = agentRepository(connection, 'local').steps(value.requestId);
  releaseRouting();
  const completed = await first;
  expect(rejected).toBeInstanceOf(Error);
  expect((rejected as Error).message).toBe('REQUEST_CONFLICT');
  expect(during.map((step) => step.state)).toEqual(['RUNNING']);
  expect(completed.error).toBeUndefined();
  expect(completed.result?.state).toBe('COMPLETE');
  expect(completed.result?.steps.every((step) => step.state === 'COMPLETE')).toBe(true);
  expect(fake.reply).toHaveBeenCalledTimes(4);
});

it('expires interrupted owned traces atomically without changing completed, failed, foreign or legacy runs', () => {
  const { c, connection } = fixture(),
    local = mentorRepository(connection, 'local'),
    other = mentorRepository(connection, 'other'),
    traces = agentRepository(connection, 'local'),
    definition = loadAgentRegistry(c).agents.find((agent) => agent.role === 'orchestrator')!;
  const staleId = randomUUID(),
    foreignId = randomUUID(),
    expiredAt = new Date(Date.now() - 120000).toISOString();
  const reservation = {
    id: staleId,
    lessonId: null,
    version: c.version,
    fingerprint: 'interrupted-run-fixture',
    message: 'Isolated interrupted process fixture',
    mode: 'hint',
    helpLevel: 1,
  };
  local.reserve(reservation);
  const complete = traces.start(staleId, 0, definition, '1.0.0', []);
  traces.finish(complete, { text: 'Completed fixture only', inputTokens: 7, outputTokens: 4 });
  const failed = traces.start(staleId, 1, definition, '1.0.0', []);
  traces.finish(failed, undefined, 'AI_RATE_LIMIT');
  traces.start(staleId, 2, definition, '1.0.0', []);
  const before = traces.steps(staleId);
  other.reserve({ ...reservation, id: foreignId });
  agentRepository(connection, 'other').start(foreignId, 0, definition, '1.0.0', []);
  connection.sqlite
    .prepare('UPDATE mentor_runs SET created_at=? WHERE id IN (?,?)')
    .run(expiredAt, staleId, foreignId);
  const resumedId = randomUUID();
  local.reserve({ ...reservation, id: resumedId, fingerprint: 'resumed-run-fixture' });
  expect(
    connection.sqlite.prepare('SELECT state FROM mentor_runs WHERE id=?').get(staleId),
  ).toEqual({ state: 'FAILED' });
  const after = traces.steps(staleId);
  expect(after[0]).toEqual(before[0]);
  expect(after[1]).toEqual(before[1]);
  expect(after[2].state).toBe('FAILED');
  expect(after[2].error_code).toBe('AGENT_RUN_STALE');
  expect(
    connection.sqlite.prepare('SELECT state FROM mentor_runs WHERE id=?').get(resumedId),
  ).toEqual({ state: 'RUNNING' });
  expect(
    connection.sqlite.prepare('SELECT state FROM mentor_runs WHERE id=?').get(foreignId),
  ).toEqual({ state: 'RUNNING' });
  expect(agentRepository(connection, 'other').steps(foreignId)[0].state).toBe('RUNNING');
  expect(connection.sqlite.pragma('foreign_key_check')).toEqual([]);

  const legacy = fixture(),
    legacyRepo = mentorRepository(legacy.connection, 'local'),
    legacyId = randomUUID();
  legacyRepo.reserve({ ...reservation, id: legacyId, version: legacy.c.version });
  legacy.connection.sqlite
    .prepare('UPDATE mentor_runs SET created_at=? WHERE id=?')
    .run(expiredAt, legacyId);
  legacyRepo.reserve({
    ...reservation,
    id: randomUUID(),
    version: legacy.c.version,
    fingerprint: 'legacy-resume-fixture',
  });
  expect(
    legacy.connection.sqlite.prepare('SELECT state FROM mentor_runs WHERE id=?').get(legacyId),
  ).toEqual({ state: 'FAILED' });
  expect(legacy.connection.sqlite.prepare('SELECT COUNT(*) n FROM agent_steps').get()).toEqual({
    n: 0,
  });
});
