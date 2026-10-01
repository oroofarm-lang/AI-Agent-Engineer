'use client';
import { useActionState, useState } from 'react';
import type { Assessment } from '@/lib/curriculum/assessment';
import { reviewEvidence } from '@/app/admin/reviews/actions';
export function ReviewForm({
  id,
  submissionId,
  rubric,
}: {
  id: string;
  submissionId: string;
  rubric: Assessment;
}) {
  const [reviewId] = useState(id),
    [result, action, pending] = useActionState(reviewEvidence, { ok: true, message: '' });
  return (
    <form action={action} className="reflection-form">
      <input type="hidden" name="id" value={reviewId} />
      <input type="hidden" name="submissionId" value={submissionId} />
      <p>
        בדוק את הראיות לפי כל קריטריון. אם אין מספיק ראיות, אל תניח שהיכולת הוכחה. כל הקריטריונים
        צריכים להיות ברמה 2 לפחות כדי לאשר את הניסיון.
      </p>
      {rubric.criteria.map((item) => (
        <fieldset key={item.id}>
          <legend>{item.prompt}</legend>
          <label className="field-label">
            רמת הביצוע בסעיף
            <select name={`level:${item.id}`} required defaultValue="">
              <option value="" disabled>
                בחר לפי הראיות
              </option>
              <option value="0">0 · אין מספיק ראיות</option>
              <option value="1">1 · הבנה ללא מימוש מוכח</option>
              <option value="2">2 · מימוש שנבדק, עם עזרה ומקורות</option>
              <option value="3">3 · תכנון וניפוי שגיאות עצמאיים</option>
            </select>
          </label>
          <label className="field-label">
            משוב והראיות שעליהן הוא מבוסס
            <textarea
              name={`feedback:${item.id}`}
              required
              minLength={20}
              maxLength={3000}
              rows={4}
            />
          </label>
        </fieldset>
      ))}
      <button className="button primary" disabled={pending}>
        {pending ? 'שומר…' : 'שמירת הערכה אנושית'}
      </button>
      <p role="status">{result.message}</p>
    </form>
  );
}
