import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { mentorRepository } from '../src/lib/db/mentor';
import {
  evaluateSubmission,
  evaluationInput,
  evaluationRepository,
  type EvaluationFeedback,
} from '../src/lib/agents/evaluate';
import type { ProviderInput } from '../src/lib/ai/provider';

const open: Connection[] = [];
afterEach(() => {
  open.splice(0).forEach((connection) => connection.sqlite.close());
  vi.unstubAllEnvs();
});
function fixture() {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, c);
  connection.sqlite
    .prepare('INSERT INTO users(id,locale,created_at) VALUES(?,?,?)')
    .run('other', 'he-IL', new Date().toISOString());
  const rubric = c.assessments[0];
  const text = {
    id: randomUUID(),
    criterionId: rubric.criteria[0].id,
    name: 'proof.py',
    data: new TextEncoder().encode('print("selected artifact fixture")\n'),
  };
  const image = {
    id: randomUUID(),
    criterionId: rubric.criteria[0].id,
    name: 'proof.png',
    data: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==',
      'base64',
    ),
  };
  const pdf = {
    id: randomUUID(),
    criterionId: rubric.criteria[0].id,
    name: 'proof.pdf',
    data: new TextEncoder().encode('%PDF-1.4\n% Isolated provider-payload fixture only\n%%EOF'),
  };
  const hidden = {
    id: randomUUID(),
    criterionId: rubric.criteria[0].id,
    name: 'unselected.md',
    data: new TextEncoder().encode('UNSELECTED_ARTIFACT_CONTENT'),
  };
  const saved = {
    submissionId: randomUUID(),
    assessmentId: rubric.id,
    rubricVersion: rubric.version,
    curriculumVersion: c.version,
    evidence: Object.fromEntries(
      rubric.criteria.map((criterion) => [
        criterion.id,
        `עבודה לתרגול של ${criterion.id}: ראיות, דוגמה, בחירה והסבר של דרך הבדיקה. `.repeat(3),
      ]),
    ),
    artifacts: [text, image, pdf, hidden],
  };
  repository(connection, c, 'local').updateProgress(rubric.lessonId, 'complete-build');
  assessmentRepository(connection, c, 'local').submit(saved);
  const input = evaluationInput.parse({
    requestId: randomUUID(),
    submissionId: saved.submissionId,
    artifactIds: [text.id, image.id, pdf.id],
    consent: true,
  });
  const feedback: EvaluationFeedback = {
    summary: 'משוב בדיקה בלבד: יש ראיות לעבודה, אך יש להשלים את בדיקת המקרה החריג.',
    criteria: rubric.criteria.map((criterion) => ({
      criterionId: criterion.id,
      status: 'needs-work',
      feedback: 'ההסבר נותן כיוון ברור, אך חסרה בו תוצאה שאפשר להשוות לבדיקה הצפויה.',
      evidence: 'הראיות שנבחרו מתארות את הבחירה ואת דרך הבדיקה.',
      nextStep: 'הוסף את הקלט ואת התוצאה של המקרה החריג.',
    })),
  };
  return { c, connection, saved, input, rubric, text, image, pdf, hidden, feedback };
}
function provider(
  feedback: EvaluationFeedback,
  ids = ['Agent-Progress-Tracker', 'Agent-Code-Reviewer'],
) {
  return {
    reply: vi.fn(async (request: ProviderInput) => ({
      text:
        request.format?.name === 'specialist_route'
          ? JSON.stringify({ agentIds: ids })
          : request.format?.name === 'advisory_submission_feedback'
            ? JSON.stringify(feedback)
            : 'ממצא מומחה לצורך בדיקה בלבד: הראיות דורשות בדיקת מקרה חריג.',
      inputTokens: 10,
      outputTokens: 5,
    })),
  };
}
function protectedState(connection: Connection) {
  return {
    progress: connection.sqlite
      .prepare('SELECT * FROM lesson_progress ORDER BY user_id,lesson_id')
      .all(),
    mastery: connection.sqlite.prepare('SELECT * FROM skill_mastery').all(),
    humanReviews: connection.sqlite.prepare('SELECT * FROM assessment_reviews').all(),
    submissions: connection.sqlite.prepare('SELECT * FROM assessment_results ORDER BY id').all(),
  };
}

it('reviews actual selected owned text/media against the frozen rubric, persists advisory feedback and preserves mastery', async () => {
  const f = fixture(),
    fake = provider(f.feedback),
    before = protectedState(f.connection);
  const queries = vi.spyOn(f.connection.sqlite, 'prepare');
  const newer = structuredClone(f.c);
  newer.assessments[0].criteria[0].id = 'NEW_UNRELATED_CRITERION';
  const result = await evaluateSubmission(f.connection, newer, 'local', f.input, fake);
  expect(fake.reply).toHaveBeenCalledTimes(4);
  expect(result.feedback).toEqual(f.feedback);
  expect(result.submission_id).toBe(f.saved.submissionId);
  expect(result.curriculum_version).toBe(f.saved.curriculumVersion);
  expect(result.rubric_version).toBe(f.saved.rubricVersion);
  expect(result.coverage.execution).toBe('not-run');
  expect(result.coverage.masteryDecision).toBeNull();
  expect(result.coverage.artifacts.find((file) => file.id === f.hidden.id)?.status).toBe(
    'not-selected',
  );
  expect(JSON.stringify(fake.reply.mock.calls)).not.toContain('UNSELECTED_ARTIFACT_CONTENT');
  const contentQueries = queries.mock.calls
    .map(([sql]) => sql)
    .filter((sql) => sql.includes('FROM assessment_artifacts') && /\bdata\b/.test(sql));
  expect(contentQueries).toHaveLength(1);
  expect(contentQueries[0]).toContain('submission_id=? AND user_id=? AND id IN (');
  const routing = fake.reply.mock.calls[0][0];
  expect(routing.assets).toBeUndefined();
  for (const [request] of fake.reply.mock.calls.filter(([call]) =>
    call.instructions.includes('Stay within your specialty'),
  )) {
    const context = JSON.parse(request.context).selectedSubmission;
    expect(context.frozenRubric).toEqual(f.rubric);
    expect(context.selectedEvidence).toEqual(f.saved.evidence);
    expect(context.textFiles[0].text).toBe(new TextDecoder().decode(f.text.data));
    expect(request.assets?.map((asset) => asset.filename).sort()).toEqual([
      'proof.pdf',
      'proof.png',
    ]);
    expect(
      Buffer.from(
        request.assets!.find((asset) => asset.filename === f.image.name)!.dataBase64,
        'base64',
      ),
    ).toEqual(f.image.data);
    expect(
      Buffer.from(
        request.assets!.find((asset) => asset.filename === f.pdf.name)!.dataBase64,
        'base64',
      ),
    ).toEqual(Buffer.from(f.pdf.data));
  }
  expect(protectedState(f.connection)).toEqual(before);
  expect(f.connection.sqlite.pragma('foreign_key_check')).toEqual([]);
  expect(evaluationRepository(f.connection, 'local').list(f.saved.submissionId)).toHaveLength(1);
  expect(evaluationRepository(f.connection, 'other').list()).toEqual([]);
  expect(evaluationRepository(f.connection, 'other').byRun(f.input.requestId)).toBeUndefined();
});

it('deduplicates the exact selection without another paid call and rejects changed selections or levels under the same request ID', async () => {
  const f = fixture(),
    fake = provider(f.feedback);
  const first = await evaluateSubmission(f.connection, f.c, 'local', f.input, fake);
  const replay = await evaluateSubmission(
    f.connection,
    f.c,
    'local',
    { ...f.input, artifactIds: [...f.input.artifactIds].reverse() },
    fake,
  );
  expect(replay).toEqual(first);
  expect(fake.reply).toHaveBeenCalledTimes(4);
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, artifactIds: [f.hidden.id] },
      fake,
    ),
  ).rejects.toThrow('REQUEST_CONFLICT');
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, explanationLevel: 'advanced' },
      fake,
    ),
  ).rejects.toThrow('REQUEST_CONFLICT');
  expect(fake.reply).toHaveBeenCalledTimes(4);
});

it('requires explicit consent, rejects foreign submissions/artifacts and never reads another user through operator access', async () => {
  const f = fixture(),
    fake = provider(f.feedback);
  expect(() => evaluationInput.parse({ ...f.input, consent: false })).toThrow();
  await expect(evaluateSubmission(f.connection, f.c, 'other', f.input, fake)).rejects.toThrow(
    'UNKNOWN_SUBMISSION',
  );
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, artifactIds: [randomUUID()] },
      fake,
    ),
  ).rejects.toThrow('UNKNOWN_ARTIFACT');
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, artifactIds: [f.text.id, f.text.id] },
      fake,
    ),
  ).rejects.toThrow('DUPLICATE_ARTIFACT');
  const foreignFile = { ...f.text, id: randomUUID() };
  const foreignSubmissionId = randomUUID();
  repository(f.connection, f.c, 'other').updateProgress(f.rubric.lessonId, 'complete-build');
  assessmentRepository(f.connection, f.c, 'other').submit({
    ...f.saved,
    submissionId: foreignSubmissionId,
    artifacts: [foreignFile],
  });
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, artifactIds: [foreignFile.id] },
      fake,
    ),
  ).rejects.toThrow('UNKNOWN_ARTIFACT');
  await expect(
    evaluateSubmission(
      f.connection,
      f.c,
      'local',
      { ...f.input, submissionId: foreignSubmissionId, artifactIds: [] },
      fake,
    ),
  ).rejects.toThrow('UNKNOWN_SUBMISSION');
  vi.stubEnv('ADMIN_EMAILS', 'operator@example.test');
  expect(evaluationRepository(f.connection, 'other').list(f.saved.submissionId)).toEqual([]);
  expect(fake.reply).not.toHaveBeenCalled();
  expect(f.connection.sqlite.prepare('SELECT COUNT(*) n FROM mentor_runs').get()).toEqual({ n: 0 });
});

it('checks actual artifact bytes and refuses corrupted content before a provider call', async () => {
  const f = fixture(),
    fake = provider(f.feedback);
  f.connection.sqlite
    .prepare('UPDATE assessment_artifacts SET data=? WHERE id=?')
    .run(Buffer.from('changed'), f.text.id);
  await expect(evaluateSubmission(f.connection, f.c, 'local', f.input, fake)).rejects.toThrow(
    'ARTIFACT_INTEGRITY',
  );
  expect(fake.reply).not.toHaveBeenCalled();
});

it('marks truncated evidence and file contents honestly instead of claiming a full review', async () => {
  const f = fixture(),
    fake = provider(f.feedback);
  const long = Object.fromEntries(
    f.rubric.criteria.map((criterion) => [criterion.id, 'ראיות '.repeat(2000).slice(0, 12000)]),
  );
  const data = new TextEncoder().encode('long text '.repeat(1000));
  const { createHash } = await import('node:crypto');
  f.connection.sqlite
    .prepare('UPDATE assessment_results SET evidence=? WHERE id=?')
    .run(JSON.stringify(long), f.saved.submissionId);
  f.connection.sqlite
    .prepare('UPDATE assessment_artifacts SET data=?,size=?,sha256=? WHERE id=?')
    .run(
      Buffer.from(data),
      data.length,
      createHash('sha256').update(data).digest('hex'),
      f.text.id,
    );
  const result = await evaluateSubmission(f.connection, f.c, 'local', f.input, fake);
  expect(
    result.coverage.evidence.every(
      (item) => item.status === 'partial-text' && item.charactersProvided < item.totalCharacters,
    ),
  ).toBe(true);
  expect(result.coverage.artifacts.find((file) => file.id === f.text.id)?.status).toBe(
    'partial-text',
  );
  expect(result.coverage.artifacts.find((file) => file.id === f.text.id)?.charactersProvided).toBe(
    2000,
  );
  expect(JSON.stringify(fake.reply.mock.calls.at(-1)![0].context)).toContain('partial-text');
});

it('excludes selected text when the context budget is exhausted and does not call that a content review', async () => {
  const f = fixture(),
    fake = provider(f.feedback);
  const files = Array.from({ length: 3 }, (_, index) => ({
    id: randomUUID(),
    criterionId: f.rubric.criteria[0].id,
    name: `long-${index}.txt`,
    data: new TextEncoder().encode(`EXPLICIT FILE ${index} `.repeat(300)),
  }));
  const submissionId = randomUUID();
  assessmentRepository(f.connection, f.c, 'local').submit({
    ...f.saved,
    submissionId,
    artifacts: files,
  });
  const result = await evaluateSubmission(
    f.connection,
    f.c,
    'local',
    { ...f.input, submissionId, artifactIds: files.map((file) => file.id) },
    fake,
  );
  const excluded = result.coverage.artifacts.filter((file) => file.status === 'excluded');
  expect(excluded).toHaveLength(1);
  expect(excluded[0].charactersProvided).toBe(0);
  expect(excluded[0].reason).toContain('לא נבדק');
  for (const [request] of fake.reply.mock.calls.filter(([call]) =>
    call.instructions.includes('Stay within your specialty'),
  )) {
    const context = JSON.parse(request.context).selectedSubmission;
    expect(context.textFiles.some((file: { id: string }) => file.id === excluded[0].id)).toBe(
      false,
    );
  }
});

it('rejects missing, duplicate and foreign criterion feedback before saving an assistant answer', async () => {
  for (const defect of ['missing', 'duplicate', 'foreign'] as const) {
    const f = fixture(),
      broken = structuredClone(f.feedback);
    if (defect === 'missing') broken.criteria.pop();
    if (defect === 'duplicate') broken.criteria.push(broken.criteria[0]);
    if (defect === 'foreign') broken.criteria[0].criterionId = 'FOREIGN_CRITERION';
    const fake = provider(broken),
      before = protectedState(f.connection);
    await expect(evaluateSubmission(f.connection, f.c, 'local', f.input, fake)).rejects.toThrow(
      'AI_INVALID_RESPONSE',
    );
    expect(evaluationRepository(f.connection, 'local').list()).toEqual([]);
    const thread = mentorRepository(f.connection, 'local').latest(f.rubric.lessonId)!;
    expect(
      mentorRepository(f.connection, 'local')
        .messages(thread.id)
        .map((message) => message.role),
    ).toEqual(['user']);
    expect(
      f.connection.sqlite
        .prepare('SELECT state FROM mentor_runs WHERE id=?')
        .get(f.input.requestId),
    ).toEqual({ state: 'FAILED' });
    expect(protectedState(f.connection)).toEqual(before);
    const count = fake.reply.mock.calls.length;
    await expect(evaluateSubmission(f.connection, f.c, 'local', f.input, fake)).rejects.toThrow(
      'MENTOR_PREVIOUS_FAILED',
    );
    expect(fake.reply).toHaveBeenCalledTimes(count);
  }
});

it('requires the real assessment feedback specialist and shares concurrency/daily request limits', async () => {
  const f = fixture(),
    fake = provider(f.feedback, ['Agent-Code-Reviewer']);
  await expect(evaluateSubmission(f.connection, f.c, 'local', f.input, fake)).rejects.toThrow(
    'AGENT_ROUTING_INVALID',
  );
  expect(fake.reply).toHaveBeenCalledTimes(1);
  const repo = mentorRepository(f.connection, 'local');
  const reserve = {
    id: randomUUID(),
    lessonId: null,
    version: f.c.version,
    fingerprint: 'fixture',
    message: 'test fixture',
    mode: 'hint',
    helpLevel: 1,
  };
  repo.reserve(reserve);
  const ready = provider(f.feedback);
  await expect(
    evaluateSubmission(f.connection, f.c, 'local', { ...f.input, requestId: randomUUID() }, ready),
  ).rejects.toThrow('MENTOR_BUSY');
  expect(ready.reply).not.toHaveBeenCalled();
  repo.finish(reserve.id);
  for (let i = 2; i < 20; i++) {
    const item = { ...reserve, id: randomUUID() };
    repo.reserve(item);
    repo.finish(item.id);
  }
  await expect(
    evaluateSubmission(f.connection, f.c, 'local', { ...f.input, requestId: randomUUID() }, ready),
  ).rejects.toThrow('MENTOR_DAILY_LIMIT');
  expect(ready.reply).not.toHaveBeenCalled();
});
