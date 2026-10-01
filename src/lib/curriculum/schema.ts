import { z } from 'zod';
export const stableId = z.string().regex(/^[A-Z][A-Z0-9_]+$/);
const version = z.string().regex(/^\d+\.\d+\.\d+$/);
const date = z.iso.date();
export const skillSchema = z.strictObject({
  id: stableId,
  name: z.string().min(1),
  domain: z.string().min(1),
  description: z.string().min(1),
  prerequisiteSkillIds: z.array(stableId),
});
export const lessonSchema = z.strictObject({
  id: stableId,
  week: z.number().int().min(1).max(16).optional(),
  day: z.number().int().min(1).max(80).optional(),
  title: z.string().min(1),
  titleEn: z.string().min(1),
  version,
  stability: z.enum(['FOUNDATION', 'AGENT_ENGINEERING', 'ECOSYSTEM']),
  estimatedMinutes: z.number().int().min(1).max(240),
  skillIds: z.array(stableId).min(1),
  prerequisiteLessonIds: z.array(stableId),
  sourceIds: z.array(stableId),
  publicationStatus: z.enum(['published', 'planned']),
  contentStage: z.enum(['guided-lesson', 'practice-workbook']).optional(),
  lastVerified: date.nullable(),
  outline: z.string().min(1),
  verification: z
    .strictObject({
      sourcesCheckedAt: date.nullable(),
      hebrewReviewedAt: date.nullable(),
      execution: z.enum(['not-applicable', 'local-tested', 'not-run']),
      command: z.string().nullable(),
      limitations: z.array(z.string()).min(1),
    })
    .refine((value) => value.execution !== 'local-tested' || Boolean(value.command?.trim()), {
      message: 'Local execution evidence requires a reproducible command',
    })
    .optional(),
});
export const curriculumSchema = z.strictObject({
  curriculumId: stableId,
  version,
  baseline: z.string().min(1),
  releaseDate: date,
  lastVerified: date.nullable(),
  minimumMigrationVersion: version,
  majorChanges: z.array(z.string()),
  weeks: z
    .array(
      z.strictObject({
        id: stableId,
        number: z.number().int().min(1).max(16),
        title: z.string().min(1),
        titleEn: z.string().min(1),
      }),
    )
    .length(16),
  lessons: z.array(lessonSchema).min(1),
  modules: z
    .array(
      z.strictObject({
        id: stableId,
        title: z.string().min(1),
        description: z.string().min(20),
        outcome: z.string().min(20),
        lessonIds: z.array(stableId).min(1),
        prerequisiteModuleIds: z.array(stableId),
        requiredEntry: z.boolean().optional(),
      }),
    )
    .optional(),
});
export const sourceSchema = z.strictObject({
  id: stableId,
  title: z.string().min(1),
  url: z.url().refine((v) => v.startsWith('https://')),
  type: z.enum(['official-docs', 'specification', 'official-repository', 'research']),
  vendor: z.string(),
  lastVerified: date.nullable(),
  lessonIds: z.array(stableId),
  technologyIds: z.array(stableId),
});
export type Lesson = z.infer<typeof lessonSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Curriculum = z.infer<typeof curriculumSchema>;
export type Source = z.infer<typeof sourceSchema>;
export const requiredSections = [
  'Mission',
  'Build First',
  'Concepts',
  'Mental Model',
  'Deep Dive',
  'Failure Lab',
  'Challenge',
  'Mastery Check',
  'Documentation',
  'Engineering Notes',
] as const;
