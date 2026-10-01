'use server';
import { revalidatePath } from 'next/cache';
import { getReflectionRepository } from '@/lib/data';
import { journalFields, failureFields, type ReflectionKind } from '@/lib/domain/reflections';
export type ReflectionResult = { ok: boolean; message: string; revision?: number };
export async function saveReflection(
  kind: ReflectionKind,
  _previous: ReflectionResult,
  form: FormData,
): Promise<ReflectionResult> {
  if (!['journal', 'failure'].includes(kind))
    return { ok: false, message: 'סוג הרשומה אינו תקין.' };
  try {
    // Next server-action fields are transport metadata, not strict domain-schema input.
    const keys = [
      'id',
      'title',
      'lessonId',
      ...(kind === 'journal'
        ? journalFields.map(([key]) => key)
        : ['category', 'skillId', ...failureFields.map(([key]) => key)]),
    ];
    const values = Object.fromEntries(keys.map((key) => [key, form.get(key)]));
    const revision = (await getReflectionRepository()).save(kind, {
      ...values,
      revision: Number(form.get('revision')),
    });
    revalidatePath(kind === 'journal' ? '/journal' : '/failures');
    return { ok: true, message: 'הרשומה נשמרה בחשבון שלך.', revision };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error && error.message === 'STALE_ENTRY'
          ? 'הרשומה עודכנה מאז שפתחת אותה. העתק את השינויים שלך ורענן את העמוד לפני שמירה נוספת.'
          : 'הרשומה לא נשמרה. כתוב לפחות 10 תווים בכל סעיף חובה, בדוק את החיבור ונסה שוב.',
    };
  }
}
export async function saveFailureCase(
  _previous: ReflectionResult,
  form: FormData,
): Promise<ReflectionResult> {
  try {
    (await getReflectionRepository()).addCase(
      Object.fromEntries(
        ['id', 'failureId', 'kind', 'input', 'expected'].map((key) => [key, form.get(key)]),
      ),
    );
    revalidatePath('/failures');
    return {
      ok: true,
      message: 'מקרה הבדיקה נשמר. הוא לא הורץ, ולכן עדיין אין תוצאה שמראה אם הבדיקה עברה.',
    };
  } catch {
    return {
      ok: false,
      message: 'מקרה הבדיקה לא נשמר. כתוב לפחות 10 תווים בקלט ובתוצאה הצפויה ונסה שוב.',
    };
  }
}
