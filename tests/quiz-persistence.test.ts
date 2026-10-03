import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum, readLesson } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import { quizRepository, quizFeedback } from '../src/lib/db/quizzes';
import { systemQuestion, questionHash } from '../src/lib/quizzes/catalog';
import { learningActivity } from '../src/lib/domain/activity';
import { createAuth } from '../src/lib/auth/config';
import { sendMentorMessage } from '../src/lib/ai/service';
import { mentorInput } from '../src/lib/ai/policy';
import { executeAgentTool, parseToolContext } from '../src/lib/agents/tools';
import { missionSummary } from '../src/lib/curriculum/mission';

const open: ReturnType<typeof connect>[] = [];
afterEach(() => {
  for (const connection of open.splice(0)) connection.sqlite.close();
  vi.unstubAllEnvs();
});
function fixture() {
  const curriculum = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, curriculum);
  connection.sqlite
    .prepare("INSERT INTO users(id,locale,created_at) VALUES('other','he-IL',?)")
    .run(new Date().toISOString());
  return { connection, curriculum, quizzes: quizRepository(connection, curriculum, 'local') };
}
const answer = () => ({
  requestId: randomUUID(),
  lessonId: 'FND_01',
  curriculumVersion: loadCurriculum().version,
  questionHash,
  optionId: 'evidence',
});

it('persists exact question snapshots and correctness, deduplicates owned UUIDs and preserves progress and XP', () => {
  const { connection, curriculum, quizzes } = fixture(),
    input = answer();
  const learner = repository(connection, curriculum, 'local');
  learner.updateProgress('FND_01', 'complete-build');
  const before = learner.exportData(),
    attempt = quizzes.save(input);
  expect(quizzes.save(input)).toEqual(attempt);
  expect(quizzes.latest('FND_01')).toEqual(attempt);
  expect(JSON.parse(attempt.question_snapshot)).toEqual(systemQuestion);
  expect(quizFeedback(attempt)).toBe(systemQuestion.feedback.correct);
  expect(learner.progress()).toEqual(before.lessonProgress);
  expect(learningActivity(learner.progress()).xp).toBe(100);
  expect(learner.exportData().skillMastery).toEqual(before.skillMastery);
  expect(learner.exportData().assessmentResults).toEqual(before.assessmentResults);
  expect(learner.exportData().quizAttempts).toEqual([attempt]);
  expect(() => quizzes.save({ ...input, optionId: 'skip' })).toThrow('QUIZ_REQUEST_CONFLICT');
  expect(learner.exportData().quizAttempts).toHaveLength(1);
});
it('isolates reads/exports and permits the same UUID for another owner without leaking data', () => {
  const { connection, curriculum, quizzes } = fixture(),
    input = answer();
  quizzes.save(input);
  const other = quizRepository(connection, curriculum, 'other');
  expect(other.latest('FND_01')).toBeUndefined();
  expect(other.summary()).toEqual([]);
  expect(repository(connection, curriculum, 'other').exportData().quizAttempts).toEqual([]);
  const own = other.save({ ...input, optionId: 'skip' });
  expect(own.correct).toBe(0);
  expect(quizFeedback(own)).toBe(systemQuestion.feedback.incorrect);
  expect(quizzes.latest('FND_01')?.option_id).toBe('evidence');
});
it('rejects locked/unknown/planned lessons, obsolete hashes/versions, invalid options and injected extra fields without writes', () => {
  const { connection, curriculum, quizzes } = fixture();
  expect(() => quizzes.latest('AUT_01')).toThrow('FOUNDATION_REQUIRED');
  expect(() => quizzes.save({ ...answer(), lessonId: 'AUT_01' })).toThrow('FOUNDATION_REQUIRED');
  expect(() => quizzes.save({ ...answer(), lessonId: 'UNKNOWN' })).toThrow('QUIZ_UNKNOWN_LESSON');
  const planned = structuredClone(curriculum);
  planned.lessons.find((lesson) => lesson.id === 'FND_01')!.publicationStatus = 'planned';
  expect(() => quizRepository(connection, planned, 'local').save(answer())).toThrow(
    'QUIZ_UNKNOWN_LESSON',
  );
  expect(() => quizzes.save({ ...answer(), questionHash: '0'.repeat(64) })).toThrow(
    'QUIZ_VERSION_CONFLICT',
  );
  expect(() => quizzes.save({ ...answer(), curriculumVersion: '0.0.0' })).toThrow(
    'QUIZ_VERSION_CONFLICT',
  );
  expect(() => quizzes.save({ ...answer(), optionId: 'injected' })).toThrow('QUIZ_INVALID_OPTION');
  expect(() => quizzes.save({ ...answer(), correct: true } as ReturnType<typeof answer>)).toThrow();
  expect(quizzes.summary()).toEqual([]);
});
it('keeps original answers and feedback across a new curriculum and rejects corrupt stored snapshots', () => {
  const { connection, curriculum, quizzes } = fixture(),
    input = answer(),
    saved = quizzes.save(input);
  const next = { ...curriculum, version: '2.3.0' };
  setupDatabase(connection, next);
  const later = quizRepository(connection, next, 'local');
  expect(later.latest('FND_01')).toEqual(saved);
  expect(quizFeedback(later.latest('FND_01')!)).toBe(systemQuestion.feedback.correct);
  later.save({ ...answer(), curriculumVersion: next.version, optionId: 'skip' });
  expect(repository(connection, next, 'local').exportData().quizAttempts).toHaveLength(2);
  connection.sqlite.prepare('UPDATE quiz_attempts SET question_snapshot=? WHERE id=?').run(
    JSON.stringify({
      ...systemQuestion,
      question: 'A changed question that was never submitted to this learner.',
    }),
    input.requestId,
  );
  expect(() => quizFeedback(saved)).not.toThrow();
  expect(() => later.summary()).toThrow('QUIZ_CORRUPT_SNAPSHOT');
});
it('enforces the UTC daily bound, keeps retry idempotent at the limit and bounds Mentor summaries', () => {
  const { connection, curriculum, quizzes } = fixture(),
    now = new Date('2026-10-03T23:59:59Z');
  const base = answer();
  for (let i = 0; i < 500; i++) quizzes.save({ ...base, requestId: randomUUID() }, now);
  expect(quizzes.summary()).toHaveLength(12);
  const last = quizzes.latest('FND_01')!;
  expect(quizzes.save({ ...base, requestId: last.id }, now)).toEqual(last);
  expect(() => quizzes.save(answer(), now)).toThrow('QUIZ_DAILY_LIMIT');
  expect(repository(connection, curriculum, 'local').exportData().quizAttempts).toHaveLength(500);
  expect(quizzes.save(answer(), new Date('2026-10-04T00:00:00Z')).correct).toBe(1);
});
it('passes only real relevant owned answers to the Mentor progress tool as practice facts', async () => {
  const { connection, curriculum, quizzes } = fixture();
  quizzes.save(answer());
  quizzes.save({ ...answer(), lessonId: 'FND_02', optionId: 'skip' });
  quizRepository(connection, curriculum, 'other').save({ ...answer(), optionId: 'complete' });
  const provider = {
    reply: vi
      .fn()
      .mockResolvedValue({ text: 'Unit-test fixture only.', inputTokens: 1, outputTokens: 1 }),
  };
  await sendMentorMessage(
    connection,
    curriculum,
    'local',
    mentorInput.parse({
      requestId: randomUUID(),
      lessonId: 'FND_01',
      message: 'איך לומדים מהתשובה שלי?',
      mode: 'explain',
      learningMode: 'tutorial',
      helpLevel: 1,
    }),
    provider,
    readLesson('FND_01'),
  );
  const context = parseToolContext(provider.reply.mock.calls[0][0].context);
  const tool = executeAgentTool({ allowedTools: ['progress.read'] }, 'progress.read', context) as {
    quizResults: { lessonId: string; correct: boolean; mastery: string }[];
  };
  expect(tool.quizResults).toHaveLength(1);
  expect(tool.quizResults[0]).toMatchObject({
    lessonId: 'FND_01',
    correct: true,
    mastery: 'practice-only',
  });
});
it('account deletion removes answers without touching another learner', async () => {
  const { connection, quizzes, curriculum } = fixture();
  vi.stubEnv('BETTER_AUTH_URL', 'http://127.0.0.1:3000');
  vi.stubEnv('BETTER_AUTH_SECRET', 'isolated-test-secret-12345678901234567890');
  const auth = createAuth(connection);
  const response = await auth.api.signUpEmail({
    asResponse: true,
    body: {
      email: 'quiz-only@example.test',
      password: 'Test-only-password-891',
      name: 'Quiz fixture',
    },
  });
  const signed = await response.json();
  const cookie = response.headers
    .getSetCookie()
    .map((value) => value.split(';')[0])
    .join('; ');
  quizRepository(connection, curriculum, signed.user.id).save(answer());
  quizzes.save(answer());
  await auth.api.deleteUser({
    headers: new Headers({ cookie }),
    body: { password: 'Test-only-password-891' },
  });
  expect(
    connection.sqlite
      .prepare('SELECT COUNT(*) AS n FROM quiz_attempts WHERE user_id=?')
      .get(signed.user.id),
  ).toEqual({ n: 0 });
  expect(quizzes.summary()).toHaveLength(1);
});
it('renders all 139 dashboard missions as prose and preserves periods inside addresses and decimals', () => {
  for (const lesson of loadCurriculum().lessons) {
    const summary = missionSummary(readLesson(lesson.id));
    expect(summary.length, lesson.id).toBeGreaterThan(10);
    expect(summary, lesson.id).not.toMatch(/###|```|\*\*/);
  }
  expect(
    missionSummary(
      '## Mission\n### כותרת\n```py\n## ignored\n```\n\nחבר את **API** ב־example.com עם ערך `0.7`.\n\nפסקה שנייה\n## Build First\nnext',
    ),
  ).toBe('חבר את API ב־example.com עם ערך 0.7.');
});
