import { createHash } from 'node:crypto';
import { z } from 'zod';
import definition from '../../../content/quizzes/system/1.0.0.json';
import { questionContextSchema } from './bank';
export const systemQuestionSchema = z
  .strictObject({
    id: z.string().regex(/^[A-Z][A-Z0-9_]+$/),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    title: z.string().min(10).max(200),
    question: z.string().min(20).max(2000),
    options: z
      .array(
        z.strictObject({
          id: z.string().regex(/^[A-Za-z][A-Za-z0-9_-]{0,79}$/),
          text: z.string().min(5).max(1000),
        }),
      )
      .min(2)
      .max(6),
    correctOptionId: z.string(),
    feedback: z.strictObject({
      correct: z.string().min(20).max(5000),
      incorrect: z.string().min(20).max(5000),
    }),
    teachingContext: questionContextSchema.optional(),
  })
  .superRefine((value, context) => {
    if (
      new Set(value.options.map((option) => option.id)).size !== value.options.length ||
      new Set(value.options.map((option) => option.text.trim())).size !== value.options.length ||
      !value.options.some((option) => option.id === value.correctOptionId) ||
      (value.teachingContext && value.teachingContext.questionId !== value.id) ||
      (value.id !== 'QUIZ_EVIDENCE_NEXT_STEP' && !value.teachingContext)
    )
      context.addIssue({ code: 'custom', message: 'Invalid question options' });
  });
export const systemQuestion = systemQuestionSchema.parse(definition);
export type PracticeQuestion = z.infer<typeof systemQuestionSchema>;
export type PublicPracticeQuestion = Pick<
  PracticeQuestion,
  'id' | 'title' | 'question' | 'options'
> & { hash: string };
export const questionHash = createHash('sha256')
  .update(JSON.stringify(systemQuestion))
  .digest('hex');
export const quizInput = z.strictObject({
  requestId: z.uuid(),
  lessonId: z.string().regex(/^[A-Z][A-Z0-9_]+$/),
  curriculumVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  questionHash: z.string().regex(/^[a-f0-9]{64}$/),
  optionId: z.string().min(1).max(100),
});
export type QuizInput = z.infer<typeof quizInput>;
