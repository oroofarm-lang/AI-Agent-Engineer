'use server';
import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { contactConsent } from '@/lib/db/contact-consent';
export type ConsentState = { message: string; eventId: string };
export async function saveConsent(previous: ConsentState, form: FormData): Promise<ConsentState> {
  const user = await requireUser();
  try {
    const enabled = form.get('enabled') === 'on';
    contactConsent(getConnection(), user.id).record({ id: form.get('eventId'), enabled });
    revalidatePath('/settings');
    return {
      eventId: randomUUID(),
      message: enabled
        ? user.emailVerified
          ? 'הבחירה נשמרה. אפשר לבטל את ההסכמה כאן בכל עת.'
          : 'הבחירה נשמרה. לפני ההצטרפות לרשימת העדכונים, צריך לאמת גם את כתובת המייל שלך.'
        : 'הבחירה נשמרה. אינך רשום לקבלת עדכונים על הקורס במייל.',
    };
  } catch {
    return { ...previous, message: 'לא הצלחנו להשלים את השמירה. נסה שוב.' };
  }
}
