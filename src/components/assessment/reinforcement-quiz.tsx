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
