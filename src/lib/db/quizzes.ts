import { createHash } from 'node:crypto';
import type { Connection } from './connection';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import { repository } from './repository';
import { canStudyLesson } from '../domain/learning-path';
import {
  quizInput,
  systemQuestion,
  systemQuestionSchema,
  questionHash,
  type QuizInput,
} from '../quizzes/catalog';
export type QuizAttempt = {
  id: string;
  user_id: string;
  lesson_id: string;
  curriculum_version: string;
  question_id: string;
  question_version: string;
  question_hash: string;
  question_snapshot: string;
  option_id: string;
  correct: number;
  payload_fingerprint: string;
  created_at: string;
};
export function quizRepository(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
) {
  const { sqlite } = connection;
  function access(lessonId: string) {
    const lesson = curriculum.lessons.find(
      (item) => item.id === lessonId && item.publicationStatus === 'published',
    );
    if (!lesson) throw new Error('QUIZ_UNKNOWN_LESSON');
    if (!canStudyLesson(curriculum, repository(connection, curriculum, userId).progress(), lesson))
      throw new Error('FOUNDATION_REQUIRED');
  }
  return {
    latest(lessonId: string) {
      access(lessonId);
      return sqlite
        .prepare(
          'SELECT * FROM quiz_attempts WHERE user_id=? AND lesson_id=? AND question_id=? ORDER BY rowid DESC LIMIT 1',
        )
        .get(userId, lessonId, systemQuestion.id) as QuizAttempt | undefined;
    },
    summary(lessonId?: string) {
      if (lessonId) access(lessonId);
      const attempts = sqlite
        .prepare(
          `SELECT * FROM quiz_attempts WHERE user_id=? ${lessonId ? 'AND lesson_id=?' : ''} ORDER BY rowid DESC LIMIT 12`,
        )
        .all(...(lessonId ? [userId, lessonId] : [userId])) as QuizAttempt[];
      return attempts.map((attempt) => {
        const frozen = frozenQuestion(attempt);
        return {
          lessonId: attempt.lesson_id,
          questionId: attempt.question_id,
          questionVersion: attempt.question_version,
          question: frozen.question,
          chosenAnswer: frozen.options.find((option) => option.id === attempt.option_id)!.text,
          correct: Boolean(attempt.correct),
          createdAt: attempt.created_at,
          mastery: 'practice-only',
        };
      });
    },
    save(raw: QuizInput, now = new Date()) {
      const input = quizInput.parse(raw);
      access(input.lessonId);
      if (input.curriculumVersion !== curriculum.version || input.questionHash !== questionHash)
        throw new Error('QUIZ_VERSION_CONFLICT');
      if (!systemQuestion.options.some((option) => option.id === input.optionId))
        throw new Error('QUIZ_INVALID_OPTION');
      const fingerprint = createHash('sha256')
        .update(
          JSON.stringify({
            lessonId: input.lessonId,
            curriculumVersion: input.curriculumVersion,
            questionHash: input.questionHash,
            optionId: input.optionId,
          }),
        )
        .digest('hex');
      return sqlite
        .transaction(() => {
          const existing = sqlite
            .prepare('SELECT * FROM quiz_attempts WHERE id=? AND user_id=?')
            .get(input.requestId, userId) as QuizAttempt | undefined;
          if (existing) {
            if (existing.payload_fingerprint !== fingerprint)
              throw new Error('QUIZ_REQUEST_CONFLICT');
            return existing;
          }
          const daily = sqlite
            .prepare('SELECT COUNT(*) AS n FROM quiz_attempts WHERE user_id=? AND created_at>=?')
            .get(userId, `${now.toISOString().slice(0, 10)}T00:00:00.000Z`) as { n: number };
          if (daily.n >= 500) throw new Error('QUIZ_DAILY_LIMIT');
          sqlite
            .prepare(
              'INSERT INTO quiz_attempts (id,user_id,lesson_id,curriculum_version,question_id,question_version,question_hash,question_snapshot,option_id,correct,payload_fingerprint,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            )
            .run(
              input.requestId,
              userId,
              input.lessonId,
              curriculum.version,
              systemQuestion.id,
              systemQuestion.version,
              questionHash,
              JSON.stringify(systemQuestion),
              input.optionId,
              Number(input.optionId === systemQuestion.correctOptionId),
              fingerprint,
              now.toISOString(),
            );
          return sqlite
            .prepare('SELECT * FROM quiz_attempts WHERE id=? AND user_id=?')
            .get(input.requestId, userId) as QuizAttempt;
        })
        .immediate();
    },
  };
}
export function quizFeedback(attempt: QuizAttempt) {
  const frozen = frozenQuestion(attempt);
  return attempt.correct ? frozen.feedback.correct : frozen.feedback.incorrect;
}
function frozenQuestion(attempt: QuizAttempt) {
  const frozen = systemQuestionSchema.parse(JSON.parse(attempt.question_snapshot));
  if (
    createHash('sha256').update(JSON.stringify(frozen)).digest('hex') !== attempt.question_hash ||
    frozen.id !== attempt.question_id ||
    frozen.version !== attempt.question_version ||
    !frozen.options.some((option) => option.id === attempt.option_id) ||
    Number(attempt.option_id === frozen.correctOptionId) !== attempt.correct
  )
    throw new Error('QUIZ_CORRUPT_SNAPSHOT');
  return frozen;
}
