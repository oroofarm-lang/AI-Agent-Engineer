import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { afterEach, expect, it } from 'vitest';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { teachingBankSchema, type TeachingBank } from '../src/lib/quizzes/bank';
import {
  currentPracticeQuestion,
  publicPracticeQuestion,
} from '../src/lib/quizzes/release-runtime';
import { fingerprint } from '../src/lib/auditor/analysis';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { quizRepository, quizFeedback } from '../src/lib/db/quizzes';
import { repository } from '../src/lib/db/repository';
import { systemQuestion, questionHash } from '../src/lib/quizzes/catalog';

const course = loadCurriculum('content/releases/2.2.0');
const draft = teachingBankSchema.parse(
  JSON.parse(fs.readFileSync('content/authoring/quiz-bank/1.0.0-draft.json', 'utf8')),
);
const connections: ReturnType<typeof connect>[] = [];
afterEach(() => connections.splice(0).forEach((connection) => connection.sqlite.close()));
function fixture() {
  const connection = connect(':memory:');
  connections.push(connection);
  setupDatabase(connection, course);
  connection.sqlite
    .prepare("INSERT INTO users(id,locale,created_at) VALUES('other','he-IL',?)")
    .run(new Date().toISOString());
  // Trusted synthetic runtime injection avoids writing a real approval ledger or user database.
  let selected: TeachingBank | null = { ...draft, status: 'published', reviewStatus: 'approved' };
  return {
    connection,
    bank: () => selected,
    select: (bank: TeachingBank | null) => {
      selected = bank;
    },
  };
}
function input(question = systemQuestion) {
  return {
    requestId: randomUUID(),
    lessonId: 'FND_01',
    curriculumVersion: course.version,
    questionHash: fingerprint(question),
    optionId: question.correctOptionId,
  };
}

it('selects only published lesson questions and sends no answer key or private decision to the client', () => {
  const f = fixture();
  const question = currentPracticeQuestion(course, 'FND_01', f.bank());
  expect(question.id).toBe('QUIZ_FND_01');
  expect(question.teachingContext?.lessonId).toBe('FND_01');
  expect(publicPracticeQuestion(question)).toEqual({
    id: question.id,
    title: question.title,
    question: question.question,
    options: question.options,
    hash: fingerprint(question),
  });
  expect(publicPracticeQuestion(question)).not.toHaveProperty('correctOptionId');
  expect(publicPracticeQuestion(question)).not.toHaveProperty('feedback');
  expect(() => currentPracticeQuestion(course, 'FND_01', draft)).toThrow(
    'QUIZ_REVIEW_DRAFT_REQUIRED',
  );
  expect(currentPracticeQuestion(course, 'FND_01', null)).toEqual(systemQuestion);
});

it('saves own exact subject snapshots, evaluates the actual option and leaves all learning progress unchanged', () => {
  const f = fixture();
  const quizzes = quizRepository(f.connection, course, 'local', f.bank);
  const before = repository(f.connection, course, 'local').exportData();
  const question = currentPracticeQuestion(course, 'FND_01', f.bank());
  const saved = quizzes.save(input(question));
  expect(saved.question_id).toBe('QUIZ_FND_01');
  expect(JSON.parse(saved.question_snapshot)).toEqual(question);
  expect(quizFeedback(saved)).toBe(question.feedback.correct);
  expect(quizzes.latest('FND_01')).toEqual(saved);
  const wrong = question.options.find((option) => option.id !== question.correctOptionId)!;
  expect(quizzes.save({ ...input(question), optionId: wrong.id }).correct).toBe(0);
  const after = repository(f.connection, course, 'local').exportData();
  expect(after.quizAttempts).toHaveLength(2);
  expect(after.lessonProgress).toEqual(before.lessonProgress);
  expect(after.skillMastery).toEqual(before.skillMastery);
  expect(after.assessmentResults).toEqual(before.assessmentResults);
  const other = quizRepository(f.connection, course, 'other', f.bank);
  expect(other.latest('FND_01')).toBeUndefined();
  expect(other.summary()).toEqual([]);
});

it('preserves generic and subject answers through replacement and rollback, and replays an old acknowledged UUID', () => {
  const f = fixture(),
    quizzes = quizRepository(f.connection, course, 'local', f.bank);
  const generic = quizzes.save(input());
  const question = currentPracticeQuestion(course, 'FND_01', f.bank());
  const originalInput = input(question),
    old = quizzes.save(originalInput);
  const replacement = { ...f.bank()!, version: '1.1.0' };
  f.select(replacement);
  expect(() => quizzes.save({ ...originalInput, requestId: randomUUID() })).toThrow(
    'QUIZ_VERSION_CONFLICT',
  );
  expect(quizzes.save(originalInput)).toEqual(old);
  const nextQuestion = currentPracticeQuestion(course, 'FND_01', f.bank());
  quizzes.save(input(nextQuestion));
  f.select(null);
  expect(quizzes.latest('FND_01')).toEqual(generic);
  expect(quizzes.latest('FND_01', 'QUIZ_FND_01')?.question_version).toBe('1.1.0');
  expect(quizzes.save(originalInput)).toEqual(old);
  expect(repository(f.connection, course, 'local').exportData().quizAttempts).toHaveLength(3);
  expect(quizzes.summary().map((item) => item.mastery)).toEqual([
    'practice-only',
    'practice-only',
    'practice-only',
  ]);
  expect(questionHash).toBe(fingerprint(systemQuestion));
});

it('rejects answers intended for a different lesson and detects modified stored subject context', () => {
  const f = fixture(),
    quizzes = quizRepository(f.connection, course, 'local', f.bank);
  const wrongQuestion = currentPracticeQuestion(course, 'FND_02', f.bank());
  expect(() => quizzes.save(input(wrongQuestion))).toThrow('QUIZ_VERSION_CONFLICT');
  const question = currentPracticeQuestion(course, 'FND_01', f.bank());
  const saved = quizzes.save(input(question));
  f.connection.sqlite
    .prepare('UPDATE quiz_attempts SET lesson_id=? WHERE id=? AND user_id=?')
    .run('FND_02', saved.id, 'local');
  expect(() => quizzes.summary()).toThrow('QUIZ_CORRUPT_SNAPSHOT');
});
