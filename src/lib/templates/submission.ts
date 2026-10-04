import { z } from 'zod';
import { definitionHashSchema } from './persistence';
export const templateReferencesSchema = z
  .array(
    z.strictObject({
      templateId: z.string().regex(/^[A-Z][A-Z0-9_]{0,199}$/),
      definitionHash: definitionHashSchema,
      revision: z.number().int().positive().max(1_000_000_000),
    }),
  )
  .min(1)
  .max(6)
  .superRefine((items, context) => {
    if (new Set(items.map((item) => item.templateId)).size !== items.length)
      context.addIssue({ code: 'custom', message: 'DUPLICATE_TEMPLATE' });
  });
export type TemplateReference = z.infer<typeof templateReferencesSchema>[number];
