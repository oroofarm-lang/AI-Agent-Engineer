'use client';
import { useState } from 'react';
import type { ArtifactMetadata } from '@/lib/domain/artifacts';
import type { AgentEvaluation } from '@/lib/agents/evaluate';

const errors: Record<string, string> = {
  AI_NOT_CONFIGURED:
    'המשוב באמצעות AI עדיין אינו זמין. אפשר להמשיך ללמוד ולהגיש עבודה לבדיקה אנושית.',
  MENTOR_BUSY: 'בקשה קודמת עדיין מתבצעת. המתן לסיומה.',
  MENTOR_DAILY_LIMIT: 'הגעת למגבלה היומית של בקשות AI. אפשר להמשיך ללמוד ללא המשוב האוטומטי.',
  AI_RATE_LIMIT: 'שירות ה־AI לא קיבל את הבקשה כרגע. לא בוצע ניסיון חוזר אוטומטי.',
  EVALUATION_CONTEXT_LIMIT: 'החומר שנבחר גדול מדי לבקשה אחת. נסה לבחור פחות קבצים.',
  AI_CONNECTION_FAILED: 'החיבור נקטע. רענן את העמוד כדי לבדוק אם נשמר משוב לפני שליחה נוספת.',
};
const criterionStatus = {
  supported: 'נמצאו ראיות בסעיף',
  'needs-work': 'כדאי לשפר את הסעיף',
  unclear: 'אין מספיק מידע למסקנה',
};
export function EvaluationPanel({
  submissionId,
  files,
  criteria,
  ready,
  initial,
}: {
  submissionId: string;
  files: ArtifactMetadata[];
  criteria: { id: string; prompt: string }[];
  ready: boolean;
  initial?: AgentEvaluation;
}) {
  const [selected, setSelected] = useState<string[]>([]),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState(''),
    [evaluation, setEvaluation] = useState(initial);
  async function evaluate() {
    if (!consent || busy || !ready) return;
    setBusy(true);
    setStatus('מכין משוב על ההגשה…');
    try {
      const response = await fetch('/api/agents/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: crypto.randomUUID(),
          submissionId,
          artifactIds: selected,
          consent: true,
          explanationLevel: 'practical',
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(errors[result.error] || 'לא נשמר משוב חדש. לא בוצע ניסיון חוזר אוטומטי.');
        return;
      }
      setEvaluation(result.evaluation);
      setStatus('המשוב נשמר בחשבון שלך.');
    } catch {
      setStatus('החיבור נקטע. רענן את העמוד כדי לבדוק אם נשמר משוב לפני שליחה נוספת.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="settings-card" aria-label="משוב אוטומטי על ההגשה">
      <h3>משוב אוטומטי · לבחירתך</h3>
      <p>
        אפשר לבקש עזרה בזיהוי מה ברור בעבודה ומה כדאי לשפר. זהו משוב באמצעות AI לפי דרישות התרגיל.
        הוא עשוי לכלול טעויות ואינו אישור לשליטה בנושא.
      </p>
      {!ready && <p className="notice">המשוב באמצעות AI עדיין אינו זמין.</p>}
      {files.length > 0 && (
        <fieldset disabled={busy}>
          <legend>אילו קבצים לצרף למשוב?</legend>
          {files.map((file) => (
            <label className="toggle-row" key={file.id}>
              <input
                type="checkbox"
                checked={selected.includes(file.id)}
                onChange={(event) =>
                  setSelected((current) =>
                    event.target.checked
                      ? [...current, file.id]
                      : current.filter((id) => id !== file.id),
                  )
                }
              />
              <span dir="auto">{file.name}</span>
              <span className="tiny">{Math.ceil(file.size / 1024)} KB</span>
            </label>
          ))}
        </fieldset>
      )}
      <label className="toggle-row">
        <input
          type="checkbox"
          checked={consent}
          disabled={busy}
          onChange={(event) => setConsent(event.target.checked)}
        />
        אני מסכים לשליחת תוכן מהתשובות השמורות ומהקבצים שבחרתי ל־OpenAI לצורך המשוב.
      </label>
      <button
        className="button secondary"
        type="button"
        disabled={!ready || !consent || busy}
        onClick={evaluate}
      >
        {busy ? 'ממתינים למשוב…' : 'בקשת משוב אוטומטי'}
      </button>
      <p role="status">{status}</p>
      {evaluation && (
        <div className="evaluation-feedback">
          <h4>סיכום המשוב האוטומטי</h4>
          <p className="reflection-text">{evaluation.feedback.summary}</p>
          {evaluation.feedback.criteria.map((item) => (
            <section className="notice" key={item.criterionId}>
              <h4>
                {criteria.find((criterion) => criterion.id === item.criterionId)?.prompt ||
                  'סעיף מהמחוון המקורי'}
              </h4>
              <p>לפי המשוב: {criterionStatus[item.status]}</p>
              <p className="reflection-text">{item.feedback}</p>
              {item.evidence && (
                <p className="reflection-text">על מה המשוב מבוסס: {item.evidence}</p>
              )}
              <p className="reflection-text">הצעד הבא: {item.nextStep}</p>
            </section>
          ))}
          <details>
            <summary>איזה חומר נשלח למשוב?</summary>
            <p>
              הקוד לא הורץ. רק החלקים המפורטים כאן נשלחו למודל; המשוב אינו אימות טכני של העבודה.
            </p>
            <ul>
              {evaluation.coverage.evidence.map((item) => (
                <li key={item.criterionId}>
                  {criteria.find((criterion) => criterion.id === item.criterionId)?.prompt}: נשלחו{' '}
                  {item.charactersProvided} מתוך {item.totalCharacters} תווים.
                </li>
              ))}
              {evaluation.coverage.artifacts.map((item) => (
                <li key={item.id}>
                  <bdi>{item.name}</bdi>: {item.reason}
                  {typeof item.charactersProvided === 'number' &&
                    ` נשלחו ${item.charactersProvided} תווים.`}
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </section>
  );
}
