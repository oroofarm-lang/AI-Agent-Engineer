'use client';
import { useActionState, useState } from 'react';
import { Check, Play, Save } from 'lucide-react';
import { updateProgress, saveNote } from '@/app/learn/actions';
import type { ProgressState } from '@/lib/domain/progress';
export function ProgressControls({ lessonId, state }: { lessonId: string; state: ProgressState }) {
  const [result, action, pending] = useActionState(updateProgress, { ok: true, message: '' });
  const built = !['NOT_STARTED', 'IN_PROGRESS'].includes(state);
  return (
    <div className="progress-controls">
      {!built ? (
        <form action={action}>
          <input type="hidden" name="lessonId" value={lessonId} />
          <input
            type="hidden"
            name="action"
            value={state === 'NOT_STARTED' ? 'start' : 'complete-build'}
          />
          <button className="button primary" disabled={pending}>
            {state === 'NOT_STARTED' ? <Play size={16} /> : <Check size={16} />}{' '}
            {pending ? 'שומר…' : state === 'NOT_STARTED' ? 'התחלת השיעור' : 'סימון הבנייה כהושלמה'}
          </button>
        </form>
      ) : (
        <span className="success-line">
          <Check size={17} /> הבנייה הושלמה ונשמרה
        </span>
      )}
      <p className={result.ok ? 'form-status' : 'form-error'} role="status">
        {result.message}
      </p>
      <small className="muted">סימון שהתרגיל נבנה אינו מוכיח שליטה בנושא. בהמשך השיעור מופיע המחוון להערכת העבודה.</small>
    </div>
  );
}
export function LessonNotes({ lessonId, body }: { lessonId: string; body: string }) {
  const [note, setNote] = useState(body);
  const [result, action, pending] = useActionState(saveNote, { ok: true, message: '' });
  return (
    <form action={action} className="notes-form">
      <input type="hidden" name="lessonId" value={lessonId} />
      <label htmlFor="engineering-notes">ההערות שלי לשיעור</label>
      <p className="muted">מה בנית? מה נכשל? איזו החלטה קיבלת, ומה תשנה בפעם הבאה?</p>
      <textarea
        id="engineering-notes"
        name="body"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        maxLength={20000}
        rows={7}
        placeholder="תובנות, כשלים, החלטות וראיות — בלי מפתחות API או סודות."
      />
      <div className="notes-actions">
        <button className="button secondary" disabled={pending}>
          <Save size={16} />
          {pending ? 'שומר…' : 'שמירת הערות'}
        </button>
        <span role="status" className={result.ok ? 'form-status' : 'form-error'}>
          {result.message}
        </span>
      </div>
    </form>
  );
}
