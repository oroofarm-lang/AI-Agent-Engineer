'use client';
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Check, Layers3, BookOpen, Sparkles } from 'lucide-react';
import { reducedMotion } from '@/lib/domain/motion';
import { AiMascot } from './ai-mascot';
import { InstructionPractice } from './instruction-practice';

type CanvasStep = { id: string; title: string; label: string; content: ReactNode };
/** Card acknowledgements are session-local reading aids, separate from persisted build/mastery. */
export function LessonCanvas({
  steps,
  children,
  lessonId,
  initialStepId,
}: {
  steps: CanvasStep[];
  children: ReactNode;
  lessonId: string;
  initialStepId?: string;
}) {
  const [index, setIndex] = useState(
      Math.max(
        0,
        steps.findIndex((s) => s.id === initialStepId),
      ),
    ),
    [finished, setFinished] = useState<number[]>([]),
    [reading, setReading] = useState(false),
    [burst, setBurst] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const readingHeading = useRef<HTMLHeadingElement>(null);
  const step = steps[index];
  const moved = useRef(false),
    queue = useRef(Promise.resolve()),
    saveSequence = useRef(0);
  const [saveMessage, setSaveMessage] = useState('');
  function persist(stepId: string) {
    const sequence = ++saveSequence.current;
    setSaveMessage('שומר מיקום…');
    queue.current = queue.current.then(async () => {
      try {
        const result = await fetch('/api/position', {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId, stepId }),
        });
        if (!result.ok) throw new Error();
        if (sequence === saveSequence.current) setSaveMessage('מיקום הקריאה נשמר.');
      } catch {
        if (sequence === saveSequence.current)
          setSaveMessage('המיקום לא נשמר. בדוק את החיבור ונסה שוב.');
      }
    });
  }
  useEffect(() => {
    if (!moved.current) return;
    const target = reading ? readingHeading.current : heading.current;
    target?.focus({ preventScroll: true });
    target
      ?.closest('.focus-card, .canvas-reading')
      ?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'instant' : 'smooth' });
  }, [index, reading]);
  function go(next: number) {
    const bounded = Math.max(0, Math.min(steps.length - 1, next));
    moved.current = true;
    setIndex(bounded);
    persist(steps[bounded].id);
  }
  function acknowledge() {
    if (!finished.includes(index)) {
      setFinished((previous) => [...previous, index]);
      setBurst((value) => value + 1);
    }
    if (index < steps.length - 1) go(index + 1);
  }
  return (
    <div className="canvas-workspace">
      <div className="canvas-main">
        <div className="canvas-modebar">
          <div className="canvas-kicker">
            <Layers3 size={16} /> צעד קטן. הבנה עמוקה.
          </div>
          <button
            className="canvas-mode-button"
            aria-pressed={reading}
            onClick={() => {
              moved.current = true;
              setReading((value) => !value);
            }}
          >
            <BookOpen size={15} />
            {reading ? 'חזרה לכרטיסיות' : 'קריאה רציפה'}
          </button>
        </div>
        <nav className="step-progress numbered-steps" aria-label="מעבר לפי מספר שקופית">
          {steps.map((s, i) => (
            <button
              key={s.id}
              className={`${i === index ? 'current' : ''} ${finished.includes(i) ? 'acknowledged' : ''}`}
              aria-label={`שקופית ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'step' : undefined}
              onClick={() => {
                setReading(false);
                go(i);
              }}
            >
              <span>{i + 1}</span>
            </button>
          ))}
        </nav>
        <div className="lesson-reading-progress">
          <progress aria-label="מיקום הקריאה בשיעור" value={index + 1} max={steps.length} />
          <span>{Math.round(((index + 1) / steps.length) * 100)}% מהדרך בשיעור</span>
        </div>
        {reading ? (
          <article className="canvas-reading card">
            {steps.map((s, i) => (
              <section
                id={s.id}
                key={s.id}
                data-mentor-kind="lesson"
                data-mentor-id={s.id}
                data-mentor-title={s.title}
              >
                <h2 ref={i === 0 ? readingHeading : undefined} tabIndex={i === 0 ? -1 : undefined}>
                  {s.title}
                </h2>
                {s.content}
              </section>
            ))}
          </article>
        ) : (
          <article
            className="focus-card card"
            aria-labelledby="canvas-step-title"
            data-mentor-kind="lesson"
            data-mentor-id={step.id}
            data-mentor-title={step.title}
          >
            <div className="focus-card-top">
              <span className="lesson-step-label">
                שקופית {index + 1} <span>מתוך {steps.length}</span>
              </span>
              <span className="focus-card-tag">
                <span className="status-dot" />
                {step.label}
              </span>
            </div>
            <div className="step-entry" key={step.id}>
              <h2 id="canvas-step-title" tabIndex={-1} ref={heading}>
                {step.title}
              </h2>
              <div className="canvas-step-content">{step.content}</div>
              {index === 0 &&
                ['W01D01_FIRST_AI_PROGRAM', 'W02D07_CONTEXT_ENGINEERING'].includes(lessonId) && (
                  <InstructionPractice />
                )}
            </div>
            <div className="card-acknowledgement">
              <button
                className={`button ${finished.includes(index) ? 'acknowledged-button' : 'secondary'}`}
                onClick={acknowledge}
                disabled={index === steps.length - 1 && finished.includes(index)}
              >
                <Check size={16} />
                {index === steps.length - 1
                  ? finished.includes(index)
                    ? 'סיימתי לקרוא'
                    : 'הבנתי, סיימתי לקרוא'
                  : 'הבנתי, לשקופית הבאה'}
              </button>
              <span role="status">
                {finished.includes(index)
                  ? 'סימון קריאה בלבד. את תרגיל הבנייה מגישים בנפרד.'
                  : 'סימון הקריאה הזה זמני ואינו מסמן שהשיעור הושלם.'}
              </span>
            </div>
            {burst > 0 && (
              <div className="completion-burst" key={burst} aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <i
                    key={i}
                    style={
                      {
                        '--particle-angle': `${i * 22.5}deg`,
                        '--particle-distance': `${70 + (i % 4) * 30}px`,
                        '--particle-color': ['#00F5FF', '#8A2BE2', '#00FF66'][i % 3],
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            )}
            <div className="canvas-pagination">
              <button
                className="button subtle"
                disabled={index === 0}
                onClick={() => go(index - 1)}
              >
                <ArrowRight size={16} />
                הקודם
              </button>
              <span>
                {index + 1} מתוך {steps.length}
              </span>
              <button
                className="button primary"
                disabled={index === steps.length - 1}
                onClick={() => go(index + 1)}
              >
                הבא
                <ArrowLeft size={16} />
              </button>
            </div>
          </article>
        )}
        <p className="position-status" role="status">
          {saveMessage}
        </p>
        {saveMessage.includes('לא נשמר') && (
          <button className="button secondary" onClick={() => persist(step.id)}>
            ניסיון שמירה נוסף
          </button>
        )}
        {children}
      </div>
      <aside className="canvas-companion">
        <div className="companion-card card">
          <div className="companion-caption">
            <span className="eyebrow">MEET YOUR COMPANION</span>
            <span className="live-dot" />
          </div>
          <AiMascot compact mood={finished.includes(index) ? 'happy' : 'curious'} />
          <h3>סקרנות היא כוח־על.</h3>
          <p>
            שנה משהו קטן. בדוק מה קורה.
            <br />
            ככה בונים אינטואיציה הנדסית.
          </p>
          <div className="companion-footnote">
            <Sparkles size={13} /> החבר שלך לתרגול
          </div>
        </div>
        <div className="canvas-road card">
          <p className="eyebrow">הדרך שלך בשיעור</p>
          <ol>
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => {
                    setReading(false);
                    go(i);
                  }}
                >
                  <span>
                    {finished.includes(i) ? <Check size={12} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
