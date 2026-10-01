import { z } from 'zod';
import { stableId, type Curriculum } from './schema';
import { assertUnique } from './validate';
export const assessmentSchema = z.strictObject({
  id: stableId,
  lessonId: stableId,
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  title: z.string().min(1),
  instructions: z.string().min(20),
  criteria: z
    .array(
      z.strictObject({
        id: stableId,
        skillId: stableId,
        prompt: z.string().min(20),
        evidenceHint: z.string().min(10),
      }),
    )
    .min(1)
    .max(12),
});
export type Assessment = z.infer<typeof assessmentSchema>;
export function validateAssessments(assessments: Assessment[], curriculum: Curriculum) {
  assertUnique(
    assessments.map((a) => a.id),
    'assessment ID',
  );
  assertUnique(
    assessments.map((a) => a.lessonId),
    'lesson assessment',
  );
  for (const a of assessments) {
    const lesson = curriculum.lessons.find((l) => l.id === a.lessonId);
    if (!lesson || lesson.publicationStatus !== 'published')
      throw new Error(`Assessment requires published lesson: ${a.id}`);
    assertUnique(
      a.criteria.map((c) => c.id),
      'criterion ID',
    );
    for (const criterion of a.criteria)
      if (!lesson.skillIds.includes(criterion.skillId))
        throw new Error(`Assessment skill outside lesson: ${criterion.skillId}`);
  }
}
