import type { ReturnTypeOfCurriculum } from '../ai/types';
import { publishedTeachingBank } from './review-store';
import { questionContext, validateTeachingBank, type TeachingBank } from './bank';
import {
  systemQuestion,
  systemQuestionSchema,
  type PracticeQuestion,
  type PublicPracticeQuestion,
} from './catalog';
import { fingerprint } from '../auditor/analysis';

/** Drafts are never selected here. Operator review and publication are separate operations. */
export function currentPracticeQuestion(
  curriculum: ReturnTypeOfCurriculum,
  lessonId: string,
  bank: TeachingBank | null = publishedTeachingBank(curriculum),
): PracticeQuestion {
  if (!bank) return systemQuestion;
  const published = validateTeachingBank(bank, curriculum);
  if (published.status !== 'published') throw new Error('QUIZ_REVIEW_DRAFT_REQUIRED');
  const question = published.quizzes.find((item) => item.lessonId === lessonId);
  if (!question) throw new Error('QUIZ_UNKNOWN_LESSON');
  return systemQuestionSchema.parse({
    id: question.id,
    version: published.version,
    title: 'שאלה קצרה על השיעור · בדיקת הבנה',
    question: question.question,
    options: question.options,
    correctOptionId: question.correctOptionId,
    feedback: {
      correct: `נכון. ${question.explanation}`,
      incorrect: `כדאי לחזור להסבר בשיעור. ${question.explanation}`,
    },
    teachingContext: questionContext(question, curriculum),
  });
}
/** The learner receives choices without the answer key or review records. */
export function publicPracticeQuestion(question: PracticeQuestion): PublicPracticeQuestion {
  return {
    id: question.id,
    title: question.title,
    question: question.question,
    options: question.options,
    hash: fingerprint(question),
  };
}
