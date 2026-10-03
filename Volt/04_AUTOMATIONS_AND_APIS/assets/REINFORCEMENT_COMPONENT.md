---
generated: true
schema_version: 1
kind: "asset"
entity_id: "REINFORCEMENT_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/assessment/reinforcement-quiz.tsx"
asset_kind: "ui-code"
source_sha256: "a3fee4c528168abedcf5e8f3cd92109c0695c4373b0e7de81f9080f6bdfa54c1"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# שאלת תרגול ושמירת תשובה

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/assessment/reinforcement-quiz.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/assessment/reinforcement-quiz.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';

import { useEffect, useRef, useState } from 'react';
import question from '../../../content/quizzes/system/1.0.0.json';

type Attempt = {
  id: string;
  optionId: string;
  questionHash: string;
  correct: boolean;
  createdAt: string;
  feedback: string;
};
type PendingAnswer = { requestId: string; optionId: string };

/** Feedback is shown only after the server has saved this learner's actual choice. */
export function ReinforcementQuiz({
  lessonId,
  curriculumVersion,
  questionHash,
}: {
  lessonId: string;
  curriculumVersion: string;
  questionHash: string;
}) {
  const [answer, setAnswer] = useState(''),
    [saved, setSaved] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true),
    [pending, setPending] = useState(false);
  const [loadError, setLoadError] = useState(false),
    [saveError, setSaveError] = useState(''),
    [reload, setReload] = useState(0);
  const retry = useRef<PendingAnswer | null>(null),
    write = useRef<AbortController | null>(null);
  const [saveIssue, setSaveIssue] = useState<'retry' | 'version' | 'limit'>('retry');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/quizzes?lessonId=${encodeURIComponent(lessonId)}`, {
      cache: 'no-store',
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('LOAD_FAILED');
        const data = (await response.json()) as { latest: Attempt | null };
        if (controller.signal.aborted) return;
        if (
          data.latest?.questionHash === questionHash &&
          question.options.some((option) => option.id === data.latest!.optionId)
        ) {
          setAnswer(data.latest.optionId);
          setSaved(data.latest);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => {
      controller.abort();
      write.current?.abort();
    };
  }, [lessonId, questionHash, reload]);

  async function save(value: PendingAnswer) {
    if (write.current) return;
    const controller = new AbortController();
    write.current = controller;
    setPending(true);
    setSaveError('');
    setSaved(null);
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
        body: JSON.stringify({ ...value, lessonId, curriculumVersion, questionHash }),
      });
      const data = (await response.json()) as { attempt?: Attempt; error?: string };
      if (
        !response.ok ||
        !data.attempt ||
        data.attempt.id !== value.requestId ||
        data.attempt.optionId !== value.optionId ||
        data.attempt.questionHash !== questionHash
      )
        throw new Error(data.error || 'SAVE_FAILED');
      if (!controller.signal.aborted) {
        setSaved(data.attempt);
        retry.current = null;
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setSaveIssue(
          error instanceof Error && error.message === 'QUIZ_VERSION_CONFLICT'
            ? 'version'
            : error instanceof Error && error.message === 'QUIZ_DAILY_LIMIT'
              ? 'limit'
              : 'retry',
        );
        setSaveError(
          error instanceof Error && error.message === 'QUIZ_VERSION_CONFLICT'
            ? 'גרסת השאלה השתנתה. רענן את העמוד כדי להמשיך.'
            : error instanceof Error && error.message === 'QUIZ_DAILY_LIMIT'
              ? 'הגעת למגבלת התשובות היומית. אפשר לחזור לתרגול מחר.'
              : 'לא התקבל אישור שהתשובה נשמרה. לחץ על ״לנסות לשמור שוב״ כדי לחזור על אותו ניסיון שמירה, בלי לבחור תשובה מחדש.',
        );
      }
    } finally {
      if (write.current === controller) write.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  return (
    <details className="reinforcement-quiz">
      <summary>{question.title}</summary>
      <p className="muted">
        לאחר בחירת תשובה, המערכת מנסה לשמור אותה בחשבון שלך. זהו תרגול קצר; הוא אינו מעניק XP או
        אישור שליטה.
      </p>
      <fieldset
        disabled={loading || loadError || pending || Boolean(saveError && saveIssue !== 'retry')}
      >
        <legend>{question.question}</legend>
        {question.options.map((option) => (
          <label key={option.id} className="toggle-row">
            <input
              type="radio"
              name={`reinforcement-${lessonId}`}
              value={option.id}
              checked={answer === option.id}
              onChange={() => {
                if (write.current) return;
                const value = { requestId: crypto.randomUUID(), optionId: option.id };
                setAnswer(option.id);
                retry.current = value;
                void save(value);
              }}
            />
            {option.text}
          </label>
        ))}
      </fieldset>
      <p role="status">
        {loading
          ? 'טוען את התשובה האחרונה…'
          : pending
            ? 'ממתין לאישור שמירת התשובה…'
            : saved
              ? `${saved.feedback} התשובה נשמרה בחשבון שלך.`
              : ''}
      </p>
      {loadError && (
        <div role="alert">
          <p>לא ניתן לטעון את התשובה האחרונה כרגע.</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setLoading(true);
              setLoadError(false);
              setReload((value) => value + 1);
            }}
          >
            לנסות לטעון שוב
          </button>
        </div>
      )}
      {saveError && (
        <div role="alert">
          <p>{saveError}</p>
          {saveIssue === 'version' && (
            <button
              type="button"
              className="button secondary"
              onClick={() => window.location.reload()}
            >
              רענון העמוד
            </button>
          )}
          {saveIssue === 'retry' && (
            <button
              type="button"
              className="button secondary"
              disabled={pending}
              onClick={() => {
                if (retry.current) void save(retry.current);
              }}
            >
              לנסות לשמור שוב
            </button>
          )}
        </div>
      )}
    </details>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[02_CURRICULUM/system-quizzes/1.0.0/QUIZ_EVIDENCE_NEXT_STEP|לפני שמגישים · שאלה קצרה לתרגול]] — רכיב התרגול
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
