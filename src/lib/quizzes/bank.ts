import { z } from 'zod';
import { requiredSections, stableId } from '../curriculum/schema';
import { readCatalogLesson } from '../curriculum/load';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import { fingerprint, textHash } from '../auditor/analysis';

export const bankVersion = z.string().regex(/^\d{1,4}\.\d{1,4}\.\d{1,4}$/);
export const digest = z.string().regex(/^[a-f0-9]{64}$/);
const optionId = z.string().regex(/^[A-Za-z][A-Za-z0-9_-]{0,79}$/);
export const teachingQuestionSchema = z.strictObject({
  id: stableId,
  lessonId: stableId,
  question: z.string().min(25).max(2000),
  options: z
    .array(z.strictObject({ id: optionId, text: z.string().min(5).max(1000) }))
    .min(2)
    .max(6),
  correctOptionId: optionId,
  explanation: z.string().min(70).max(4000),
  sourceSection: z.enum(requiredSections),
  sourceIds: z.array(stableId).min(1).max(30),
});
export const teachingBankSchema = z.strictObject({
  version: bankVersion,
  status: z.enum(['draft', 'published']),
  curriculumVersion: bankVersion,
  reviewStatus: z.enum(['requires-human-review', 'approved']),
  quizzes: z.array(teachingQuestionSchema).min(1).max(5000),
});
export type TeachingBank = z.infer<typeof teachingBankSchema>;
export type TeachingQuestion = z.infer<typeof teachingQuestionSchema>;

/** Resolve actual H2 teaching sections; headings inside fenced examples do not divide a lesson. */
export function teachingSection(body: string, wanted: string) {
  let section = '',
    fence: { marker: string; length: number } | undefined;
  const lines: string[] = [];
  for (const line of body.split(/\r?\n/)) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (marker) {
      if (!fence) fence = { marker: marker[1][0], length: marker[1].length };
      else if (
        marker[1][0] === fence.marker &&
        marker[1].length >= fence.length &&
        !marker[2].trim()
      )
        fence = undefined;
    }
    const heading = !fence && line.match(/^##\s+(.+?)\s*$/);
    if (heading) section = heading[1];
    else if (section === wanted) lines.push(line);
  }
  const text = lines.join('\n').trim();
  if (text.length < 30) throw new Error('QUIZ_REVIEW_SOURCE_SECTION');
  return text;
}

/** Structural validation and source linkage are evidence for review, never a teaching approval. */
export function validateTeachingBank(raw: unknown, curriculum: ReturnTypeOfCurriculum) {
  const bank = teachingBankSchema.parse(raw);
  if (bank.curriculumVersion !== curriculum.version) throw new Error('QUIZ_REVIEW_STALE_COURSE');
  if ((bank.status === 'published') !== (bank.reviewStatus === 'approved'))
    throw new Error('QUIZ_REVIEW_STATUS');
  const lessons = curriculum.lessons.filter((lesson) => lesson.publicationStatus === 'published');
  if (
    bank.quizzes.length !== lessons.length ||
    new Set(bank.quizzes.map((quiz) => quiz.id)).size !== bank.quizzes.length ||
    bank.quizzes.some(
      (quiz, index) => quiz.lessonId !== lessons[index].id || quiz.id !== `QUIZ_${quiz.lessonId}`,
    )
  )
    throw new Error('QUIZ_REVIEW_COVERAGE');
  const sourceIds = new Set(curriculum.sources.map((source) => source.id));
  for (const quiz of bank.quizzes) {
    const lesson = lessons.find((lesson) => lesson.id === quiz.lessonId)!;
    if (
      new Set(quiz.options.map((option) => option.id)).size !== quiz.options.length ||
      new Set(
        quiz.options.map((option) => option.text.normalize('NFKC').trim().replace(/\s+/g, ' ')),
      ).size !== quiz.options.length ||
      !quiz.options.some((option) => option.id === quiz.correctOptionId) ||
      new Set(quiz.sourceIds).size !== quiz.sourceIds.length ||
      quiz.sourceIds.some((id) => !sourceIds.has(id) || !lesson.sourceIds.includes(id))
    )
      throw new Error('QUIZ_REVIEW_QUESTION');
    teachingSection(readCatalogLesson(curriculum, lesson.id), quiz.sourceSection);
  }
  return bank;
}

export const questionContextSchema = z.strictObject({
  questionId: stableId,
  lessonId: stableId,
  lessonBodyHash: digest,
  sectionHash: digest,
  sources: z
    .array(z.strictObject({ id: stableId, title: z.string(), url: z.url() }))
    .min(1)
    .max(30),
  questionHash: digest,
});
export type QuestionContext = z.infer<typeof questionContextSchema>;
export function questionContext(question: TeachingQuestion, curriculum: ReturnTypeOfCurriculum) {
  const context = {
    questionId: question.id,
    lessonId: question.lessonId,
    lessonBodyHash: curriculum.lessonBodyHashes[question.lessonId],
    sectionHash: textHash(
      teachingSection(readCatalogLesson(curriculum, question.lessonId), question.sourceSection),
    ),
    sources: question.sourceIds.map((id) => {
      const source = curriculum.sources.find((source) => source.id === id);
      if (!source) throw new Error('QUIZ_REVIEW_QUESTION');
      return { id, title: source.title, url: source.url };
    }),
  };
  return questionContextSchema.parse({
    ...context,
    questionHash: fingerprint({ question, context }),
  });
}
