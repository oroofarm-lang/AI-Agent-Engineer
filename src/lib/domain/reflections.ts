import { z } from 'zod';
export const failureCategories = [
  'INVALID_SCHEMA',
  'TOOL_TIMEOUT',
  'WRONG_TOOL',
  'BAD_RETRIEVAL',
  'CONTEXT_FAILURE',
  'PROMPT_INJECTION',
  'HANDOFF_LOOP',
  'DUPLICATE_ACTION',
  'PERMISSION_ISSUE',
  'API_ISSUE',
  'FALSE_ASSUMPTION',
  'AGENT_LOOP',
  'CONTEXT_OVERFLOW',
] as const;
export const categoryLabels: Record<(typeof failureCategories)[number], string> = {
  INVALID_SCHEMA: 'סכמה לא תקינה',
  TOOL_TIMEOUT: 'הכלי לא סיים בזמן',
  WRONG_TOOL: 'כלי שגוי',
  BAD_RETRIEVAL: 'אחזור שגוי',
  CONTEXT_FAILURE: 'מידע חסר או שגוי בהקשר',
  PROMPT_INJECTION: 'הזרקת הוראות זדוניות',
  HANDOFF_LOOP: 'העברת טיפול ללא סוף',
  DUPLICATE_ACTION: 'פעולה כפולה',
  PERMISSION_ISSUE: 'בעיית הרשאות',
  API_ISSUE: 'בעיית API',
  FALSE_ASSUMPTION: 'הנחה שגויה',
  AGENT_LOOP: 'לולאת סוכן',
  CONTEXT_OVERFLOW: 'חריגה ממגבלת ההקשר',
};
const body = z
  .string()
  .max(12000)
  .refine((s) => s.trim().length >= 10, 'יש לפרט לפחות 10 תווים');
const base = {
  id: z.uuid(),
  revision: z.number().int().nonnegative(),
  title: z.string().trim().min(3).max(160),
  lessonId: z.string().max(100),
};
export const journalSchema = z.strictObject({
  ...base,
  built: body,
  failed: body,
  cause: body,
  decision: body,
  tradeoff: body,
  next: body,
  learned: body,
});
export const failureSchema = z.strictObject({
  ...base,
  category: z.enum(failureCategories),
  skillId: z.string().max(100),
  description: body,
  rootCause: body,
  fix: body,
  testCreated: z.string().max(3000),
});
export const testCaseSchema = z.strictObject({
  id: z.uuid(),
  failureId: z.uuid(),
  kind: z.enum(['REGRESSION', 'EVAL', 'SECURITY', 'EDGE_CASE']),
  input: body,
  expected: body,
});
export type JournalInput = z.infer<typeof journalSchema>;
export type FailureInput = z.infer<typeof failureSchema>;
export type ReflectionKind = 'journal' | 'failure';
export const journalFields = [
  ['built', 'מה בניתי?'],
  ['failed', 'מה נכשל?'],
  ['cause', 'למה זה קרה?'],
  ['decision', 'איזו החלטת תכנון קיבלתי?'],
  ['tradeoff', 'איזו פשרה קיבלתי על עצמי?'],
  ['next', 'מה אשנה בפעם הבאה?'],
  ['learned', 'מה למדתי?'],
] as const;
export const failureFields = [
  ['description', 'מה קרה ומה ציפיתי שיקרה?'],
  ['rootCause', 'מה גרם לתקלה?'],
  ['fix', 'איך תיקנתי או איך אבדוק את ההשערה?'],
  ['testCreated', 'בדיקה שיצרתי — פקודה, קובץ או תיאור (רשות)'],
] as const;
