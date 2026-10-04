'use client';
import { useActionState, useCallback, useEffect, useRef, useState } from 'react';
import Link from '@/components/workspace-navigation';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Assessment } from '@/lib/curriculum/assessment';
import { submitEvidence } from '@/app/assessments/actions';
import { ArtifactPicker, type SelectedArtifact } from './assessment/artifact-picker';
import { PortfolioCard } from './assessment/portfolio-card';
import { reducedMotion } from '@/lib/domain/motion';
import { ReinforcementQuiz } from './assessment/reinforcement-quiz';
import { TemplateWorkspace, type InitialWorkspace } from './assessment/workspace/workspace';
import { templateSubmission } from '@/lib/templates/formats';
import type { PublicPracticeQuestion } from '@/lib/quizzes/catalog';

export function AssessmentForm({
  assessment,
  submissionId,
  curriculumVersion,
  built,
  practiceQuestion,
  templateDrafts,
}: {
  assessment: Assessment;
  submissionId: string;
  curriculumVersion: string;
  built: boolean;
  practiceQuestion: PublicPracticeQuestion;
  templateDrafts: InitialWorkspace[];
}) {
  // Preserve retry identity across unrelated Server Action revalidation.
  const [ownedSubmissionId] = useState(submissionId);
  const [templateModes, setTemplateModes] = useState<Record<string, boolean>>({});
  const [templateStates, setTemplateStates] = useState<
    Record<string, { revision: number; ready: boolean }>
  >(() =>
    Object.fromEntries(
      templateDrafts.map((draft) => {
        let ready = false;
        try {
          templateSubmission(draft.document, draft.definition);
          ready = draft.revision > 0 && !draft.readOnly;
        } catch {}
        return [draft.definition.id, { revision: draft.revision, ready }];
      }),
    ),
  );
  const updateTemplateState = useCallback(
    (id: string, state: { revision: number; ready: boolean }) => {
      setTemplateStates((previous) =>
        previous[id]?.revision === state.revision && previous[id]?.ready === state.ready
          ? previous
          : { ...previous, [id]: state },
      );
    },
    [],
  );
  const selectedTemplates = templateDrafts.filter(
    (draft) => templateModes[draft.definition.criterionId],
  );
  const templateReferences = selectedTemplates.map((draft) => ({
    templateId: draft.definition.id,
    definitionHash: draft.definitionHash,
    revision: templateStates[draft.definition.id]?.revision || 0,
  }));
  const [openedTemplates, setOpenedTemplates] = useState<Record<string, boolean>>({});
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<SelectedArtifact[]>([]);
  const [index, setIndex] = useState(0),
    [included, setIncluded] = useState(false),
    [title, setTitle] = useState(assessment.title),
    [summary, setSummary] = useState(''),
    [feedback, setFeedback] = useState('');
  const heading = useRef<HTMLHeadingElement>(null),
    moved = useRef(false);
  const [result, action, pending] = useActionState(
    async (previous: { ok: boolean; message: string }, form: FormData) => {
      for (const item of files) form.append(`artifact:${item.criterionId}:${item.id}`, item.file);
      try {
        return await submitEvidence(previous, form);
      } catch {
        return {
          ok: false,
          message:
            'לא התקבל אישור להגשה. התשובות עדיין כאן; נסה להגיש שוב כדי לבדוק אם העבודה נשמרה.',
        };
      }
    },
    { ok: true, message: '' },
  );
  const submitted = result.ok && Boolean(result.message),
    disabled = pending || submitted;
  const valid = (id: string) => {
    const draft = templateDrafts.find((item) => item.definition.criterionId === id);
    return templateModes[id] && draft
      ? Boolean(templateStates[draft.definition.id]?.ready)
      : (evidence[id]?.trim().length || 0) >= 80 && (evidence[id]?.length || 0) <= 12000;
  };
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
          אפשר למלא טבלאות, לכתוב תשובות ולבחור קבצים כבר עכשיו. כדי להגיש, השלם קודם את תרגיל
          הבנייה וסמן אותו כהושלם בשיעור.
        </p>
      )}
      <ReinforcementQuiz
        key={`${assessment.lessonId}:${practiceQuestion.hash}`}
        lessonId={assessment.lessonId}
        curriculumVersion={curriculumVersion}
        question={practiceQuestion}
      />
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
        // Keep answer and portfolio selections intact after any resolved action, including a lost acknowledgement.
        onReset={(event) => event.preventDefault()}
        noValidate
        onSubmit={(event) => {
          setFeedback('');
          if (files.length + selectedTemplates.length > 6) {
            event.preventDefault();
            setFeedback(
              'אפשר לצרף עד 6 קבצים בסך הכול, כולל התבניות שנבחרו. הסר קובץ או בטל בחירת תבנית ונסה שוב.',
            );
            return;
          }
          const invalid = assessment.criteria.findIndex((item) => !valid(item.id));
          if (invalid >= 0) {
            event.preventDefault();
            go(invalid);
            setFeedback('ההגשה לא נשמרה. השלם כל סעיף וודא שהתבניות שבחרת מוכנות ושמורות בחשבון.');
          }
        }}
      >
        <input type="hidden" name="submissionId" value={ownedSubmissionId} />
        <input type="hidden" name="assessmentId" value={assessment.id} />
        <input type="hidden" name="rubricVersion" value={assessment.version} />
        <input type="hidden" name="curriculumVersion" value={curriculumVersion} />
        {selectedTemplates.length > 0 && (
          <input
            type="hidden"
            name="templateReferences"
            value={JSON.stringify(templateReferences)}
          />
        )}
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
                hidden={Boolean(templateModes[item.id])}
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
                  : templateModes[item.id]
                    ? 'השלם את התבנית והמתן לאישור השמירה.'
                    : `עוד ${Math.max(0, 80 - (evidence[item.id]?.trim().length || 0))} תווים לפחות כדי לתאר את העבודה.`}
              </p>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(templateModes[item.id])}
                  onChange={(event) => {
                    setTemplateModes((previous) => ({
                      ...previous,
                      [item.id]: event.target.checked,
                    }));
                    if (event.target.checked)
                      setOpenedTemplates((previous) => ({ ...previous, [item.id]: true }));
                  }}
                />
                להגיש את סעיף {i + 1} מתוך התבנית
              </label>
              {templateModes[item.id] && (
                <p className="muted">
                  הטיוטה השמורה תשמש כתשובה. עותק קבוע שלה יצורף כקובץ להגשה. הטקסט שכתבת ידנית נשאר
                  בנפרד; ביטול הבחירה יחזיר אותך אליו.
                </p>
              )}
              <details open={templateModes[item.id] ? true : undefined}>
                <summary
                  onClick={() =>
                    setOpenedTemplates((previous) => ({ ...previous, [item.id]: true }))
                  }
                >
                  לעבוד בתבנית בתוך השיעור
                </summary>
                {openedTemplates[item.id] &&
                  templateDrafts.find((d) => d.definition.criterionId === item.id) && (
                    <TemplateWorkspace
                      initial={templateDrafts.find((d) => d.definition.criterionId === item.id)!}
                      curriculumVersion={curriculumVersion}
                      disabled={disabled}
                      onSubmissionState={updateTemplateState}
                      onUse={(text) =>
                        setEvidence((previous) => ({ ...previous, [item.id]: text }))
                      }
                    />
                  )}
              </details>
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
              fileCount={files.length + selectedTemplates.length}
              preview
            />
          </details>
          <p className="muted">
            קבצים שנבחרו להגשה: {files.length + selectedTemplates.length} (כולל תבניות שנבחרו).
            הקבצים יישמרו בחשבון שלך עם התשובות; אפשר להוריד אותם לאחר ההגשה.
          </p>
          <button className="button primary" type="submit" disabled={!built}>
            {pending
              ? 'שומר תשובות וקבצים…'
              : submitted
                ? 'הראיות הוגשו'
                : selectedTemplates.length
                  ? 'הגש מתוך הטמפלייט'
                  : 'הגשת ראיות להערכה'}
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
