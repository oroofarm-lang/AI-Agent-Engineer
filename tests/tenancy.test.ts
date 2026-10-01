import { afterEach, expect, it } from 'vitest';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { reflectionRepository } from '../src/lib/db/reflections';
import { users } from '../src/lib/db/schema';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { learningActivity } from '../src/lib/domain/activity';
import { randomUUID } from 'node:crypto';
const open: ReturnType<typeof connect>[] = [];
afterEach(() => open.splice(0).forEach((c) => c.sqlite.close()));
it('scopes all learner repositories and exports, and never awards duplicate build XP', () => {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, c);
  for (const id of ['one', 'two'])
    connection.db
      .insert(users)
      .values({ id, locale: 'he-IL', createdAt: new Date().toISOString() })
      .run();
  const one = repository(connection, c, 'one'),
    two = repository(connection, c, 'two'),
    lesson = c.lessons[0].id;
  one.updateProgress(lesson, 'complete-build');
  one.updateProgress(lesson, 'complete-build');
  one.saveNote(lesson, 'A private note');
  one.savePosition(lesson, 'section-1-0');
  expect(learningActivity(one.progress()).xp).toBe(100);
  expect(learningActivity(two.progress()).xp).toBe(0);
  expect(two.note(lesson)).toBe('');
  expect(two.position(lesson)).toBeUndefined();
  const evidence = Object.fromEntries(
    c.assessments[0].criteria.map((criterion) => [
      criterion.id,
      'Meaningful evidence including commands, observed output, expected behavior and the concrete fix for a missing environment variable.',
    ]),
  );
  const attempt = {
    submissionId: randomUUID(),
    assessmentId: c.assessments[0].id,
    curriculumVersion: c.version,
    rubricVersion: c.assessments[0].version,
    evidence,
  };
  assessmentRepository(connection, c, 'one').submit(attempt);
  expect(assessmentRepository(connection, c, 'two').attempts()).toEqual([]);
  expect(() => assessmentRepository(connection, c, 'two').submit(attempt)).toThrow(
    'SUBMISSION_CONFLICT',
  );
  const failures = reflectionRepository(connection, c, 'one');
  const entry = {
    id: randomUUID(),
    revision: 0,
    title: 'Private failure',
    lessonId: lesson,
    skillId: '',
    category: 'API_ISSUE',
    description: 'An API call failed on request.',
    rootCause: 'The token was not configured.',
    fix: 'Read configuration from the environment.',
    testCreated: '',
  };
  failures.save('failure', entry);
  expect(reflectionRepository(connection, c, 'two').failures()).toEqual([]);
  expect(() =>
    reflectionRepository(connection, c, 'two').addCase({
      id: randomUUID(),
      failureId: entry.id,
      kind: 'REGRESSION',
      input: 'Missing environment token.',
      expected: 'Return an informative error.',
    }),
  ).toThrow('UNKNOWN_FAILURE');
  expect(two.exportData().assessmentResults).toEqual([]);
  expect(two.exportData().failureEntries).toEqual([]);
  expect(two.exportData().lessonPositions).toEqual([]);
  expect(JSON.stringify(one.exportData())).not.toMatch(/password|session_token/);
  expect(repository(connection, c, 'local').progress()).toEqual([]);
});
