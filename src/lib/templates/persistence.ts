import { z } from 'zod';
import { templateDocumentSchema } from './schema';
const templateId = z.string().regex(/^[A-Z][A-Z0-9_]{0,199}$/);
export const definitionHashSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const draftQuerySchema = z.strictObject({
  templateId,
  definitionHash: definitionHashSchema.optional(),
});
export const draftSaveSchema = z.strictObject({
  requestId: z.uuid(),
  templateId,
  definitionHash: definitionHashSchema,
  curriculumVersion: z.string().regex(/^\d{1,4}\.\d{1,4}\.\d{1,4}$/),
  expectedRevision: z.number().int().min(0).max(1_000_000_000),
  document: templateDocumentSchema,
});
export type DraftSaveInput = z.infer<typeof draftSaveSchema>;
