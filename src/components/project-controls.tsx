'use client';
import { useActionState, useState } from 'react';
import { saveWorkspace, bossAction } from '@/app/projects/actions';
import type { Workspace, BossAttempt } from '@/lib/db/learning-system';
export function ProjectWorkspace({
  lessonId,
  workspace,
}: {
  lessonId: string;
  workspace?: Workspace;
}) {
  const [result, action, pending] = useActionState(saveWorkspace, { ok: true, message: '' });
  return (
    <form action={action} className="card settings-card reflection-form">
      <h2>תיעוד הפרויקט שלך</h2>
      <p>שמור החלטות ותוצאות שבדקת בפועל. הקוד של הפרויקט נשאר בתיקיית העבודה שלך.</p>
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="revision" value={result.revision ?? workspace?.revision ?? 0} />
      <label className="field-label">
        איך תכננתי את הפתרון?
        <textarea
          name="architecture"
          defaultValue={workspace?.architecture}
          maxLength={12000}
          rows={5}
        />
      </label>
      <label className="field-label">
        אילו בדיקות הרצתי ומה היו התוצאות?
        <textarea name="testLog" defaultValue={workspace?.test_log} maxLength={12000} rows={5} />
      </label>
      <label className="field-label">
        מה למדתי ומה אשנה?
        <textarea
          name="reflection"
          defaultValue={workspace?.reflection}
          maxLength={12000}
          rows={4}
        />
      </label>
      <button className="button primary" disabled={pending}>
        {pending ? 'שומר…' : 'שמירת תיעוד הפרויקט'}
      </button>
      <p role="status">{pending ? 'שומר את השינויים…' : result.message}</p>
    </form>
  );
}
export function BossControls({
  id,
  lessonId,
  active,
  evidence,
}: {
  id: string;
  lessonId: string;
  active?: BossAttempt;
  evidence: { id: string; submittedAt: string }[];
}) {
  const [newId] = useState(id),
    [result, action, pending] = useActionState(bossAction, { ok: true, message: '' });
  return (
    <form action={action} className="reflection-form">
      <input type="hidden" name="id" value={active?.id || newId} />
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="action" value={active ? 'submit' : 'start'} />
      {active && (
        <label className="field-label">
          איזו עבודה שהגשת לצרף לניסיון הזה?
          <select name="submissionId" required defaultValue="">
            <option value="" disabled>
              בחר הגשה מאותו שיעור
            </option>
            {evidence.map((item) => (
              <option key={item.id} value={item.id}>
                {new Date(item.submittedAt).toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        className="button secondary"
        disabled={pending || (Boolean(active) && !evidence.length)}
      >
        {pending ? 'שומר…' : active ? 'צירוף ההגשה לניסיון' : 'התחלת ניסיון'}
      </button>
      <p role="status">{result.message}</p>
    </form>
  );
}
