'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Assessment } from '@/lib/curriculum/assessment';
import { submitEvidence } from '@/app/assessments/actions';
import { ArtifactPicker, type SelectedArtifact } from './assessment/artifact-picker';
import { PortfolioCard } from './assessment/portfolio-card';
import { reducedMotion } from '@/lib/domain/motion';

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
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<SelectedArtifact[]>([]);
  const [index, setIndex] = useState(0),
    [included, setIncluded] = useState(false),
    [title, setTitle] = useState(assessment.title),
    [summary, setSummary] = useState(''),
    [feedback, setFeedback] = useState(''),
    [answer, setAnswer] = useState('');
  const heading = useRef<HTMLHeadingElement>(null),
    moved = useRef(false);
  const [result, action, pending] = useActionState(
    async (previous: { ok: boolean; message: string }, form: FormData) => {
      for (const item of files) form.append(`artifact:${item.criterionId}:${item.id}`, item.file);
      return submitEvidence(previous, form);
    },
    { ok: true, message: '' },
  );
  const submitted = result.ok && Boolean(result.message),
    disabled = !built || pending || submitted;
  const valid = (id: string) =>
    (evidence[id]?.trim().length || 0) >= 80 && (evidence[id]?.length || 0) <= 12000;
  const ready = assessment.criteria.filter((item) => valid(item.id)).length;
  function go(next: number) {
    moved.current = true;
    setIndex(next);
    setFeedback('');
  }
  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({
      block: 'start',
      behavior: reducedMotion() ? 'instant' : 'smooth',
    });
  }, [index]);
  return (
    <section className="card assessment-card" id="assessment">
      <p className="eyebrow">הוכחה מעשית · צעד אחר צעד</p>
      <h2>{assessment.title}</h2>
      <p className="muted">{assessment.instructions}</p>
      <p className="notice">
        ממלאים תשובה אחת בכל פעם. אפשר לחזור לכל שאלה. הבדיקה כאן בודקת שהמילוי הושלם; בודק מורשה
        יעריך את העבודה לאחר ההגשה.
      </p>
      {!built && (
        <p className="muted">
          השאלות זמינות לקריאה. כדי לענות ולהגיש, השלם קודם את תרגיל הבנייה וסמן אותו כהושלם בשיעור.
        </p>
      )}
      <details className="reinforcement-quiz">
        <summary>לפני שמגישים · שאלה קצרה לתרגול</summary>
        <fieldset>
          <legend>סיימת את התרגיל המעשי. מה הצעד הבא כדי להראות מה למדת?</legend>
          {[
            ['complete', 'לסמן שהגעתי לשליטה בנושא, בלי לצרף ראיות'],
            ['evidence', 'לצרף תוצאה והסבר ולהגיש אותם לבדיקה'],
            ['skip', 'לעבור הלאה בלי לבדוק מקרה בעייתי בתרגיל'],
          ].map(([value, label]) => (
            <label key={value} className="toggle-row">
              <input
                type="radio"
                name={`reinforcement-${assessment.id}`}
                value={value}
                checked={answer === value}
                onChange={() => setAnswer(value)}
              />
              {label}
            </label>
          ))}
        </fieldset>
        <p role="status">
          {answer === 'evidence'
            ? 'נכון. תוצאה והסבר מאפשרים לבודק להעריך את העבודה. ההגשה עצמה עדיין אינה אישור שליטה.'
            : answer
              ? 'נסה שוב. השלמת התרגיל היא התחלה; צריך גם להראות מה בדקת ומה הבנת.'
              : ''}
        </p>
      </details>
      <div className="assessment-progress">
        <span>
          שאלה {index + 1} מתוך {assessment.criteria.length}
        </span>
        <span>תשובות מוכנות להגשה: {ready}</span>
        <progress value={ready} max={assessment.criteria.length} aria-label="השלמת תשובות להערכה" />
      </div>
      <nav className="assessment-question-nav" aria-label="מעבר בין שאלות ההערכה">
        {assessment.criteria.map((item, i) => (
          <button
            type="button"
            key={item.id}
            aria-label={`שאלה ${i + 1}${valid(item.id) ? ' · המילוי הושלם' : ''}`}
            aria-current={i === index ? 'step' : undefined}
            onClick={() => go(i)}
            disabled={pending}
          >
            <span>{i + 1}</span>
            {valid(item.id) && <Check aria-hidden="true" size={14} />}
          </button>
        ))}
      </nav>
      <form
        action={action}
        noValidate
        onSubmit={(event) => {
          setFeedback('');
          const invalid = assessment.criteria.findIndex((item) => !valid(item.id));
          if (invalid >= 0) {
            event.preventDefault();
            go(invalid);
            setFeedback('ההגשה לא נשמרה. כתוב בין 80 ל־12,000 תווים בכל סעיף ונסה שוב.');
          }
        }}
      >
        <input type="hidden" name="submissionId" value={submissionId} />
        <input type="hidden" name="assessmentId" value={assessment.id} />
        <input type="hidden" name="rubricVersion" value={assessment.version} />
        <input type="hidden" name="curriculumVersion" value={curriculumVersion} />
        <fieldset disabled={disabled}>
          {assessment.criteria.map((item, i) => (
            <section
              className="evidence-field assessment-question"
              hidden={i !== index}
              key={item.id}
              data-mentor-kind="assessment"
              data-mentor-id={item.id}
              data-mentor-title={item.prompt}
            >
              <span className="question-type">
                {/הרצ|בדיק|תקלה|כשל/.test(item.prompt)
                  ? 'בדיקה מעשית + קבצים'
                  : 'הסבר במילים שלך + קבצים'}
              </span>
              <h3 ref={i === index ? heading : undefined} tabIndex={-1}>
                {item.prompt}
              </h3>
              <label htmlFor={item.id}>
                {i + 1}. {item.prompt}
              </label>
              <p id={`${item.id}-help`} className="muted">
                {item.evidenceHint} (80–12,000 תווים)
              </p>
              <textarea
                value={evidence[item.id] ?? ''}
                onChange={(event) =>
                  setEvidence((previous) => ({ ...previous, [item.id]: event.target.value }))
                }
                id={item.id}
                name={`evidence:${item.id}`}
                aria-describedby={`${item.id}-help ${item.id}-feedback`}
                minLength={80}
                maxLength={12000}
                rows={6}
                required
                dir="auto"
              />
              <p id={`${item.id}-feedback`} className="answer-feedback" role="status">
                {valid(item.id)
                  ? 'המילוי הושלם. איכות התשובה תיבדק לאחר ההגשה.'
                  : `עוד ${Math.max(0, 80 - (evidence[item.id]?.trim().length || 0))} תווים לפחות כדי לתאר את העבודה.`}
              </p>
              <ArtifactPicker
                criterionId={item.id}
                files={files}
                onChange={setFiles}
                disabled={disabled}
              />
            </section>
          ))}
          <div className="assessment-navigation">
            <button
              className="button secondary"
              type="button"
              disabled={index === 0}
              onClick={() => go(index - 1)}
            >
              <ArrowRight size={16} />
              השאלה הקודמת
            </button>
            <button
              className="button primary"
              type="button"
              disabled={index === assessment.criteria.length - 1}
              onClick={() => go(index + 1)}
            >
              השאלה הבאה
              <ArrowLeft size={16} />
            </button>
          </div>
          <details className="portfolio-options">
            <summary>להציג את העבודה בתיק העבודות שלי</summary>
            <label className="toggle-row">
              <input
                type="checkbox"
                name="portfolioIncluded"
                checked={included}
                onChange={(event) => setIncluded(event.target.checked)}
              />
              לכלול את ההגשה בתיק העבודות הפרטי שלי
            </label>
            <label className="field-label">
              שם העבודה
              <input
                name="portfolioTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={120}
                required
              />
            </label>
            <label className="field-label">
              מה בניתי ומה למדתי?
              <textarea
                name="portfolioSummary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                maxLength={1200}
                rows={3}
              />
            </label>
            <PortfolioCard
              title={title}
              summary={summary}
              status={submitted ? 'ממתינה להערכה' : 'טיוטה · עדיין לא הוגשה'}
              fileCount={files.length}
              preview
            />
          </details>
          <p className="muted">
            קבצים שנבחרו להגשה: {files.length}. הקבצים יישמרו בחשבון שלך עם התשובות; אפשר להוריד
            אותם לאחר ההגשה.
          </p>
          <button className="button primary" type="submit">
            {pending ? 'שומר תשובות וקבצים…' : submitted ? 'הראיות הוגשו' : 'הגשת ראיות להערכה'}
          </button>
        </fieldset>
        <p role="status" className={result.ok ? 'form-status' : 'form-error'}>
          {feedback || result.message}
        </p>
      </form>
      <Link className="text-link" href="/assessments">
        לעבודות שהגשתי ולמשוב ←
      </Link>
      {submitted && (
        <Link href="/portfolio" className="button secondary">
          לתיק העבודות שלי
        </Link>
      )}
    </section>
  );
}
