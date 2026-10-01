'use client';
import { useActionState } from 'react';
import { saveConsent } from '@/app/settings/consent-actions';
export function ContactConsent({ enabled, eventId }: { enabled: boolean; eventId: string }) {
  const [state, action, pending] = useActionState(saveConsent, { message: '', eventId });
  return (
    <section className="card settings-card" aria-labelledby="contact-consent-title">
      <h2 id="contact-consent-title">עדכונים במייל</h2>
      <p>
        אפשר לקבל מבעל הקורס עדכונים על שיעורים ותכנים חדשים. ההצטרפות לרשימת העדכונים היא לבחירתך;
        אפשר ללמוד גם בלי להצטרף, והבחירה אינה משפיעה על ההתקדמות שלך.
      </p>
      <form action={action}>
        <input type="hidden" name="eventId" value={state.eventId} />
        <label className="toggle-row">
          <input type="checkbox" name="enabled" defaultChecked={enabled} disabled={pending} />
          אני מסכים לקבל עדכונים על הקורס במייל.
        </label>
        <p className="muted tiny">
          כדי לבטל את ההסכמה, הסר את הסימון ולחץ על ״שמירת הבחירה״. כדי להצטרף לרשימת העדכונים, צריך
          לאמת את כתובת המייל שלך. הבחירה אינה חלה על הודעות לאימות כתובת המייל ולאיפוס סיסמה.
        </p>
        <button className="button secondary" disabled={pending}>
          {pending ? 'שומר את הבחירה…' : 'שמירת הבחירה'}
        </button>
        <p role="status">{state.message}</p>
      </form>
    </section>
  );
}
