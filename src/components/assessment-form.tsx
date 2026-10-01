'use client';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import type { Assessment } from '@/lib/curriculum/assessment';
import { submitEvidence } from '@/app/assessments/actions';
export function AssessmentForm({
  assessment,
  submissionId,
  curriculumVersion,
  built,
}: {
  assessment: Assessment;
  submissionId: string;
  curriculumVersion: string;
  built: boolean;
}) {
  const [result, action, pending] = useActionState(submitEvidence, { ok: true, message: '' });
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const submitted = result.ok && result.message.length > 0;
  return (
    <section className="card assessment-card" id="assessment">
      <p className="eyebrow">העבודה שלך לבדיקה</p>
      <h2>{assessment.title}</h2>
      <p className="muted">{assessment.instructions}</p>
      <p className="notice">
        לאחר ההגשה, בודק מורשה יכול לתת משוב לפי הדרישות שבמחוון. ההגשה אינה ציון; התוצאה תופיע לצד
        העבודה לאחר הבדיקה.
      </p>
      {!built && (
        <p className="muted">
          המחוון זמין לקריאה. להגשה, יש להשלים קודם את הבנייה באמצעות הכפתור בשיעור.
        </p>
      )}
      <form action={action}>
        <input type="hidden" name="submissionId" value={submissionId} />
        <input type="hidden" name="assessmentId" value={assessment.id} />
        <input type="hidden" name="rubricVersion" value={assessment.version} />
        <input type="hidden" name="curriculumVersion" value={curriculumVersion} />
        <fieldset disabled={!built || pending || submitted}>
          {assessment.criteria.map((criterion, i) => (
            <div className="evidence-field" key={criterion.id}>
              <label htmlFor={criterion.id}>
                {i + 1}. {criterion.prompt}
              </label>
              <p id={`${criterion.id}-help`} className="muted">
                {criterion.evidenceHint} (80–12,000 תווים)
              </p>
              <textarea
                value={evidence[criterion.id] ?? ''}
                onChange={(event) =>
                  setEvidence((previous) => ({ ...previous, [criterion.id]: event.target.value }))
                }
                id={criterion.id}
                name={`evidence:${criterion.id}`}
                aria-describedby={`${criterion.id}-help`}
                minLength={80}
                maxLength={12000}
                required
                rows={6}
                dir="auto"
              />
            </div>
          ))}
          <button className="button primary" type="submit">
            {pending ? 'שומר ראיות…' : submitted ? 'הראיות הוגשו' : 'הגשת ראיות להערכה'}
          </button>
        </fieldset>
        <p role="status" className={result.ok ? 'form-status' : 'form-error'}>
          {result.message}
        </p>
      </form>
      <Link className="text-link" href="/assessments">
        לעבודות שהגשתי ולמשוב ←
      </Link>
    </section>
  );
}
