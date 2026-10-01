'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getRepository } from '@/lib/data';
import { stableId } from '@/lib/curriculum/schema';
const id = stableId;
export type ActionResult = { ok: boolean; message: string };
export async function updateProgress(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const parsed = z
    .object({ lessonId: id, action: z.enum(['start', 'complete-build']) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { ok: false, message: 'הבקשה אינה תקינה.' };
  try {
    (await getRepository()).updateProgress(parsed.data.lessonId, parsed.data.action);
  } catch {
    return {
      ok: false,
      message: 'לא הצלחנו לשמור את ההתקדמות. הנתונים הקודמים נשמרו; אפשר לנסות שוב.',
    };
  }
  revalidatePath('/');
  revalidatePath('/learn');
  revalidatePath('/topics', 'layout');
  revalidatePath(`/learn/${parsed.data.lessonId}`);
  return {
    ok: true,
    message:
      parsed.data.action === 'start'
        ? 'השיעור התחיל. בהצלחה בבנייה!'
        : 'הבנייה נשמרה. שליטה דורשת הערכה נפרדת.',
  };
}
export async function saveNote(_previous: ActionResult, form: FormData): Promise<ActionResult> {
  const parsed = z
    .object({ lessonId: id, body: z.string().max(20000) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { ok: false, message: 'הערה יכולה להכיל עד 20,000 תווים.' };
  try {
    (await getRepository()).saveNote(parsed.data.lessonId, parsed.data.body);
  } catch {
    return { ok: false, message: 'שמירת ההערה נכשלה. הטקסט שלך נשאר כאן כדי לנסות שוב.' };
  }
  revalidatePath(`/learn/${parsed.data.lessonId}`);
  return { ok: true, message: 'ההערות נשמרו בחשבון שלך.' };
}
