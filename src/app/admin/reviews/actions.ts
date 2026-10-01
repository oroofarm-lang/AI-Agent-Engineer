'use server';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { assessmentReviewer } from '@/lib/db/learning-system';
type Result = { ok: boolean; message: string };
export async function reviewEvidence(_previous: Result, form: FormData): Promise<Result> {
  try {
    const actor = await requireUser(),
      criteria: Record<string, { level: number; feedback: FormDataEntryValue | null }> = {};
    for (const key of form.keys())
      if (key.startsWith('level:')) {
        const id = key.slice(6);
        criteria[id] = { level: Number(form.get(key)), feedback: form.get(`feedback:${id}`) };
      }
    const outcome = assessmentReviewer(getConnection(), actor).review({
      id: form.get('id'),
      submissionId: form.get('submissionId'),
      criteria,
    });
    revalidatePath('/', 'layout');
    return {
      ok: true,
      message:
        outcome === 'PASS'
          ? 'ההערכה נשמרה: העבודה עמדה בדרישות המחוון.'
          : 'ההערכה נשמרה: נדרש שיפור והגשה נוספת.',
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error && error.message === 'SELF_REVIEW'
          ? 'אי אפשר לאשר את ההגשה שלך בעצמך. נדרש בודק מורשה אחר.'
          : 'ההערכה לא נשמרה. בדוק את ההרשאה וכתוב משוב של לפחות 20 תווים לכל סעיף. אי אפשר להחליף הערכה שכבר נשמרה.',
    };
  }
}
