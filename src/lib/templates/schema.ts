import { z } from 'zod';
import type { Assessment } from '../curriculum/assessment';

const id = z.string().regex(/^[A-Z][A-Z0-9_]{0,199}$/);
const version = z.string().regex(/^\d{1,4}\.\d{1,4}\.\d{1,4}$/);
export const MAX_DOCUMENT_BYTES = 180_000;
export const MAX_ROWS = 100;
export const MAX_COLUMNS = 12;
const cell = z
  .string()
  .max(4000)
  .refine((value) => !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value));
export const columnSchema = z.strictObject({
  id,
  label: z.string().trim().min(1).max(80),
});
const tableSchema = z
  .strictObject({
    columns: z.array(columnSchema).min(1).max(MAX_COLUMNS),
    rows: z.array(z.array(cell).min(1).max(MAX_COLUMNS)).max(MAX_ROWS),
  })
  .superRefine((table, context) => {
    if (new Set(table.columns.map((column) => column.id)).size !== table.columns.length)
      context.addIssue({ code: 'custom', message: 'DUPLICATE_COLUMN' });
    if (table.rows.some((row) => row.length !== table.columns.length))
      context.addIssue({ code: 'custom', message: 'INVALID_ROW_WIDTH' });
  });

const shared = {
  id,
  version,
  lessonId: id,
  assessmentId: id,
  rubricVersion: version,
  criterionId: id,
  prompt: z.string().min(20).max(4000),
  evidenceHint: z.string().min(10).max(4000),
  guidance: z.string().min(20).max(2000),
};
export const templateDefinitionSchema = z.discriminatedUnion('kind', [
  z.strictObject({ ...shared, kind: z.literal('markdown') }),
  z
    .strictObject({
      ...shared,
      kind: z.literal('table'),
      starter: tableSchema,
      minimumRows: z.number().int().min(1).max(MAX_ROWS),
    })
    .superRefine((definition, context) => {
      if (definition.starter.rows.length < definition.minimumRows)
        context.addIssue({ code: 'custom', message: 'INSUFFICIENT_STARTER_ROWS' });
    }),
]);
export const templateCatalogSchema = z.strictObject({
  schemaVersion: z.literal(1),
  version,
  sourceCurriculumVersion: version,
  templates: z.array(templateDefinitionSchema).min(1).max(2000),
});
export type TemplateDefinition = z.infer<typeof templateDefinitionSchema>;
export type TemplateCatalog = z.infer<typeof templateCatalogSchema>;
export const templateDocumentSchema = z
  .strictObject({
    schemaVersion: z.literal(1),
    templateId: id,
    templateVersion: version,
    notes: z
      .string()
      .max(12000)
      .refine((value) => !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)),
    table: tableSchema.optional(),
  })
  .superRefine((document, context) => {
    if (new TextEncoder().encode(JSON.stringify(document)).byteLength > MAX_DOCUMENT_BYTES)
      context.addIssue({ code: 'custom', message: 'DOCUMENT_TOO_LARGE' });
  });
export type TemplateDocument = z.infer<typeof templateDocumentSchema>;

/** Empty cells are deliberate scaffolding; they never claim a completed learner task. */
export function starterDocument(definition: TemplateDefinition): TemplateDocument {
  return {
    schemaVersion: 1,
    templateId: definition.id,
    templateVersion: definition.version,
    notes: '',
    ...(definition.kind === 'table' ? { table: structuredClone(definition.starter) } : {}),
  };
}
export function validateTemplateDocument(raw: unknown, definition: TemplateDefinition) {
  const document = templateDocumentSchema.parse(raw);
  if (document.templateId !== definition.id || document.templateVersion !== definition.version)
    throw new Error('STALE_TEMPLATE');
  if (definition.kind === 'markdown' && document.table) throw new Error('UNEXPECTED_TABLE');
  if (definition.kind === 'table') {
    if (!document.table) throw new Error('TABLE_REQUIRED');
    const columns = new Set(document.table.columns.map((column) => column.id));
    if (definition.starter.columns.some((column) => !columns.has(column.id)))
      throw new Error('REQUIRED_COLUMN_MISSING');
  }
  return document;
}

/** Exact criterion binding makes a later rubric change visible instead of silently remapping work. */
export function validateTemplateCatalog(
  raw: unknown,
  catalog: { version: string; assessments: Assessment[] },
): TemplateCatalog {
  const bank = templateCatalogSchema.parse(raw);
  if (bank.sourceCurriculumVersion !== catalog.version) throw new Error('TEMPLATE_COURSE_DRIFT');
  const definitions = new Map<string, TemplateDefinition>();
  const ids = new Set<string>();
  for (const definition of bank.templates) {
    const key = `${definition.assessmentId}:${definition.criterionId}`;
    if (ids.has(definition.id) || definitions.has(key)) throw new Error('DUPLICATE_TEMPLATE');
    if (definition.version !== bank.version) throw new Error('TEMPLATE_VERSION_DRIFT');
    ids.add(definition.id);
    definitions.set(key, definition);
  }
  let count = 0;
  for (const assessment of catalog.assessments) {
    for (const criterion of assessment.criteria) {
      count++;
      const definition = definitions.get(`${assessment.id}:${criterion.id}`);
      if (
        !definition ||
        definition.id !== `TEMPLATE_${assessment.id}_${criterion.id}` ||
        definition.lessonId !== assessment.lessonId ||
        definition.rubricVersion !== assessment.version ||
        definition.prompt !== criterion.prompt ||
        definition.evidenceHint !== criterion.evidenceHint
      )
        throw new Error('TEMPLATE_CRITERION_DRIFT');
    }
  }
  if (count !== definitions.size) throw new Error('UNKNOWN_TEMPLATE');
  return bank;
}

/** Count only learner content, excluding labels and unchanged starter values. */
export function templateCompletion(raw: unknown, definition: TemplateDefinition) {
  const document = validateTemplateDocument(raw, definition);
  let characters = document.notes
    .replace(/^ {0,3}#{1,6}(?:[ \t]+.*)?$/gm, '')
    .replace(/^\s*(?:```.*|~~~.*|[-*_]{3,})\s*$/gm, '')
    .trim().length;
  let completedRows = 0;
  if (document.table && definition.kind === 'table') {
    const requiredIds = definition.starter.columns.map((column) => column.id);
    for (const [index, row] of document.table.rows.entries()) {
      let changed = false;
      for (const [columnIndex, value] of row.entries()) {
        const originalIndex = definition.starter.columns.findIndex(
          (column) => column.id === document.table!.columns[columnIndex].id,
        );
        const original = definition.starter.rows[index]?.[originalIndex] ?? '';
        if (value.trim() && value !== original) {
          characters += value.trim().length;
          changed = true;
        }
      }
      if (
        changed &&
        requiredIds.every((columnId) => {
          const columnIndex = document.table!.columns.findIndex((column) => column.id === columnId);
          return row[columnIndex]?.trim();
        })
      )
        completedRows++;
    }
  }
  return {
    characters,
    completedRows,
    ready:
      characters >= 80 && (definition.kind !== 'table' || completedRows >= definition.minimumRows),
  };
}
