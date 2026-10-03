---
generated: true
schema_version: 1
kind: "asset"
entity_id: "QUIZ_REVIEW_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/quiz-bank-review.tsx"
asset_kind: "ui-code"
source_sha256: "9b1d5066277a8e490559aa3d0d00426e128b65f114fcf8095a614eadd16f7407"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[02_CURRICULUM/quiz-banks/1.0.0-draft/Index]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת שאלות ואישור מאגר לפרסום

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/quiz-bank-review.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/quiz-bank-review.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { quizReviewStore } from '@/lib/quizzes/review-store';
import { reducedMotion } from '@/lib/domain/motion';
import { VaultSyncStatus } from './vault-sync-status';

type Store = ReturnType<typeof quizReviewStore>;
type Overview = ReturnType<Store['list']> & {
  status: ReturnType<Store['status']>;
  draft: { hash: string; version: string; curriculumVersion: string; questionCount: number };
};
type Detail = ReturnType<Store['details']>;
type Question = ReturnType<Store['question']>;
const failures: Record<string, string> = {
  INVALID_REQUEST:
    'בדוק שכל השדות מולאו. אישור דורש סימון של שלוש הבדיקות והסבר של 40 תווים לפחות.',
  UNAUTHORIZED: 'ההתחברות הסתיימה. היכנס שוב לחשבון.',
  QUIZ_REVIEW_STALE_COURSE: 'גרסת הקורס השתנתה. יש להכין בדיקה חדשה מול השיעורים העדכניים.',
  QUIZ_REVIEW_STALE_DRAFT: 'טיוטת השאלות השתנתה. רענן את העמוד לפני הכנת בדיקה חדשה.',
  QUIZ_REVIEW_STALE_PROPOSAL: 'הבקשה אינה תואמת לבדיקה השמורה. רענן את העמוד.',
  QUIZ_REVIEW_STALE_QUESTION: 'הבקשה אינה תואמת לשאלה השמורה. טען אותה מחדש.',
  QUIZ_REVIEW_ALREADY_DECIDED: 'כבר נשמרה החלטה לשאלה הזו. שינוי בהחלטה דורש בדיקה חדשה.',
  QUIZ_REVIEW_INCOMPLETE:
    'אי אפשר לפרסם לפני שכל השאלות אושרו. שאלה שנדחתה דורשת תיקון ובדיקה חדשה.',
  QUIZ_REVIEW_VERSION_ORDER: 'בחר מספר גרסה גבוה יותר מגרסת השאלות הפעילה.',
  QUIZ_REVIEW_VERSION_USED:
    'מספר הגרסה כבר נשמר. בחר מספר חדש; גרסאות קודמות נשמרות גם לאחר חזרה לגרסה קודמת.',
  QUIZ_REVIEW_STALE_RELEASE: 'גרסת השאלות הפעילה השתנתה. רענן לפני חזרה לגרסה הקודמת.',
  QUIZ_REVIEW_RELEASE_CONFLICT: 'מספר הגרסה כבר שייך לבדיקה אחרת. הכן בדיקה חדשה עם מספר גרסה חדש.',
  QUIZ_REVIEW_REQUEST_CONFLICT:
    'אותה בקשה כבר נשמרה עם פרטים אחרים. רענן את העמוד לפני פעולה נוספת.',
  QUIZ_REVIEW_BUSY: 'פעולת שמירה אחרת מתבצעת כרגע. נסה שוב לאחר סיומה.',
};
async function read<T>(query = '', signal = AbortSignal.timeout(20000)): Promise<T> {
  const response = await fetch(`/api/quizzes/review${query}`, { cache: 'no-store', signal });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'REQUEST_FAILED');
  return result as T;
}

export function QuizBankReview({ initial }: { initial: Overview }) {
  const router = useRouter();
  const [overview, setOverview] = useState(initial),
    [detail, setDetail] = useState<Detail | null>(null);
  const [index, setIndex] = useState(0),
    [question, setQuestion] = useState<Question | null>(null);
  const [vaultRevision, setVaultRevision] = useState(0);
  const [questionLoading, setQuestionLoading] = useState(false),
    [pending, setPending] = useState(false);
  const [message, setMessage] = useState(''),
    [error, setError] = useState(''),
    [retry, setRetry] = useState(false);
  const running = useRef(false),
    savedRequest = useRef<unknown>(null),
    heading = useRef<HTMLHeadingElement>(null);
  const proposalId = detail?.proposal.id,
    questionId = detail?.proposal.bank.quizzes[index]?.id;
  const reviewCurrent = detail?.current;
  useEffect(() => {
    if (!proposalId || !questionId || !reviewCurrent) return;
    const controller = new AbortController();
    read<Question>(
      `?proposalId=${proposalId}&questionId=${encodeURIComponent(questionId)}`,
      AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]),
    )
      .then((result) => {
        if (controller.signal.aborted) return;
        setQuestion(result);
        setQuestionLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setQuestionLoading(false);
          setError('לא ניתן לטעון את קטע השיעור כרגע. פתח את הבדיקה מחדש כדי לנסות שוב.');
        }
      });
    return () => controller.abort();
  }, [proposalId, questionId, reviewCurrent]);
  async function show(id: string) {
    if (running.current) return;
    setError('');
    setDetail(null);
    setQuestion(null);
    setQuestionLoading(true);
    try {
      const loaded = await read<Detail>(`?proposalId=${id}`);
      setDetail(loaded);
      setIndex(0);
      if (!loaded.current) setQuestionLoading(false);
    } catch {
      setQuestionLoading(false);
      setError('לא ניתן לטעון את הבדיקה. נסה לפתוח אותה שוב.');
    }
  }
  function go(next: number) {
    if (!detail || next < 0 || next >= detail.proposal.bank.quizzes.length || next === index)
      return;
    setQuestion(null);
    setQuestionLoading(detail.current);
    setIndex(next);
    setError('');
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({
      block: 'start',
      behavior: reducedMotion() ? 'instant' : 'smooth',
    });
  }
  async function mutate(payload: unknown, success: string) {
    if (running.current) return;
    running.current = true;
    savedRequest.current = payload;
    setPending(true);
    setError('');
    setMessage('');
    setRetry(false);
    try {
      const response = await fetch('/api/quizzes/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'REQUEST_FAILED');
      savedRequest.current = null;
      setMessage(
        success +
          (result.vaultSync
            ? result.vaultSync.status === 'SYNCED'
              ? ' מפות Volt עודכנו.'
              : ' המפות לא עודכנו. בדוק את מצב המפה ונסה לעדכן בנפרד.'
            : ''),
      );
      if (result.vaultSync) setVaultRevision((value) => value + 1);
      setOverview(await read<Overview>());
      const newId = result.proposal?.id || proposalId;
      if (newId) {
        setDetail(await read<Detail>(`?proposalId=${newId}`));
        if (newId !== proposalId) {
          setIndex(0);
          setQuestion(null);
          setQuestionLoading(true);
        }
      }
      router.refresh();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : '';
      setError(
        failures[code] ||
          (savedRequest.current
            ? 'לא התקבל אישור לשמירה. אפשר לחזור על אותה בקשה באמצעות כפתור הניסיון הנוסף.'
            : 'הפעולה נשמרה, אך העמוד לא התרענן. רענן כדי לראות את התוצאה.'),
      );
      setRetry(Boolean(savedRequest.current) && !failures[code]);
    } finally {
      running.current = false;
      setPending(false);
    }
  }
  function propose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void mutate(
      {
        operation: 'propose',
        requestId: crypto.randomUUID(),
        targetVersion: new FormData(event.currentTarget).get('targetVersion'),
        draftHash: overview.draft.hash,
        curriculumHash: overview.status.curriculumHash,
      },
      'הבדיקה נשמרה. יצירת הבדיקה אינה מפרסמת את מאגר השאלות.',
    );
  }
  function decide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detail || !question) return;
    const form = new FormData(event.currentTarget);
    void mutate(
      {
        operation: 'decide',
        input: {
          proposalId,
          proposalHash: detail.proposalHash,
          questionId,
          questionHash: question.context.questionHash,
          decision: form.get('decision'),
          notes: form.get('notes'),
          answerChecked: form.get('answerChecked') === 'on',
          sourcesChecked: form.get('sourcesChecked') === 'on',
          hebrewChecked: form.get('hebrewChecked') === 'on',
        },
      },
      'ההחלטה נשמרה. אישור שאלה אינו מפרסם את מאגר השאלות; הפרסום נעשה בכפתור נפרד.',
    );
  }
  const approved =
    detail?.decisions.filter((item) => item?.input.decision === 'approve').length || 0;
  const rejected =
    detail?.decisions.filter((item) => item?.input.decision === 'reject').length || 0;
  const count = detail?.proposal.bank.quizzes.length || 0;
  const selectedDecision = detail?.decisions[index];
  const currentQuestion = detail?.proposal.bank.quizzes[index];
  const [major, minor, patch] = (overview.status.reservedVersion || overview.draft.version)
    .split('.')
    .map(Number);
  const target = overview.status.reservedVersion
    ? patch < 9999
      ? `${major}.${minor}.${patch + 1}`
      : minor < 9999
        ? `${major}.${minor + 1}.0`
        : `${major + 1}.0.0`
    : overview.draft.version;
  return (
    <>
      <div className="notice">
        <strong>
          גרסת הקורס: <bdi>{overview.status.curriculumVersion}</bdi>
        </strong>
        <p>
          {overview.status.active
            ? `גרסת השאלות הפעילה: ${overview.status.active.version}${overview.status.available ? '' : ' · אינה תואמת לקורס הנוכחי ואינה מוצגת ללומדים'}.`
            : 'טרם פורסם מאגר שאלות ייעודי לשיעורים.'}
        </p>
        <p>
          אישור השאלות דורש בדיקת תוכן אנושית. בדיקות אוטומטיות בודקות מבנה וקישורים, ואינן מאשרות
          תשובות.
        </p>
      </div>
      <VaultSyncStatus key={vaultRevision} />
      {message && (
        <p role="status" className="notice">
          {message}
        </p>
      )}
      {error && (
        <div role="alert" className="notice">
          <p>{error}</p>
          {retry && (
            <button
              type="button"
              className="button secondary"
              disabled={pending}
              onClick={() => void mutate(savedRequest.current, 'הפעולה נשמרה.')}
            >
              לנסות שוב את אותה בקשה
            </button>
          )}
        </div>
      )}
      <section className="card auditor-authoring">
        <h2>הכנת בדיקה חדשה</h2>
        <p>
          הטיוטה כוללת {overview.draft.questionCount} שאלות לגרסת הקורס{' '}
          <bdi>{overview.draft.curriculumVersion}</bdi>. כל החלטה תשמור את נוסח השאלה שנבדק.
        </p>
        <form className="auditor-form" onSubmit={propose}>
          <fieldset
            disabled={
              pending || overview.draft.curriculumVersion !== overview.status.curriculumVersion
            }
          >
            <label>
              מספר הגרסה לפרסום
              <input
                key={target}
                name="targetVersion"
                defaultValue={target}
                pattern="[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}"
                required
                dir="ltr"
              />
            </label>
            <button type="submit" className="button primary">
              להכין בדיקה חדשה
            </button>
          </fieldset>
        </form>
        {overview.draft.curriculumVersion !== overview.status.curriculumVersion && (
          <p className="notice">
            הטיוטה מתייחסת לגרסת קורס אחרת. יש לעדכן אותה ולבדוק את הקשרים לשיעורים לפני הכנת בדיקה
            חדשה.
          </p>
        )}
      </section>
      <section className="card auditor-proposals">
        <h2>בדיקות שמורות</h2>
        {!overview.proposals.length && <p>עדיין אין בדיקות שמורות.</p>}
        <ul>
          {overview.proposals.map((item) => (
            <li key={item.id}>
              <span>
                גרסה <bdi>{item.targetVersion}</bdi> · {item.questionCount} שאלות ·{' '}
                {new Date(item.createdAt).toLocaleDateString('he-IL', {
                  timeZone: 'Asia/Jerusalem',
                })}
              </span>
              <button
                type="button"
                className="button secondary"
                disabled={pending}
                onClick={() => void show(item.id)}
              >
                לפתוח בדיקה
              </button>
            </li>
          ))}
        </ul>
        {overview.total > 100 && (
          <p>מוצגות 100 הבדיקות האחרונות. בדיקות ישנות נשמרות ולא נמחקות.</p>
        )}
      </section>
      {detail && (
        <section className="card auditor-detail quiz-review-question">
          <h2 ref={heading} tabIndex={-1}>
            בדיקת שאלות · גרסה <bdi>{detail.proposal.targetVersion}</bdi>
          </h2>
          <div className="quiz-review-progress">
            <span>
              {approved} מתוך {count} שאלות אושרו · {rejected} נדחו
            </span>
            <progress value={approved} max={count} aria-label="שאלות שאושרו לפרסום" />
          </div>
          {!detail.current && (
            <p className="notice">
              גרסת הקורס השתנתה מאז הכנת הבדיקה. ההחלטות נשמרו, אך אי אפשר לאשר או לפרסם אותה מול
              הקורס הנוכחי.
            </p>
          )}
          <div className="auditor-form">
            <label>
              מעבר לשאלה לפי מספר
              <select
                value={index}
                aria-label="מעבר לשאלה לפי מספר"
                disabled={pending}
                onChange={(event) => go(Number(event.target.value))}
              >
                {detail.proposal.bank.quizzes.map((item, i) => (
                  <option key={item.id} value={i}>
                    {i + 1}. {item.lessonId}
                    {detail.decisions[i]
                      ? detail.decisions[i]?.input.decision === 'approve'
                        ? ' · אושרה'
                        : ' · נדחתה'
                      : ''}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p>
            שאלה {index + 1} מתוך {count}
          </p>
          <h3>{currentQuestion?.question}</h3>
          {currentQuestion?.options.map((option) => (
            <p
              className="quiz-review-answer"
              data-correct={option.id === currentQuestion.correctOptionId}
              key={option.id}
            >
              <bdi>{option.id}</bdi> · {option.text}
              {option.id === currentQuestion.correctOptionId && (
                <strong> · התשובה המסומנת בטיוטה</strong>
              )}
            </p>
          ))}
          <p>
            <strong>ההסבר המוצע:</strong> {currentQuestion?.explanation}
          </p>
          {questionLoading && <p role="status">טוען את הקטע הרלוונטי מהשיעור…</p>}
          {question && (
            <>
              <h3>הקטע מהשיעור: {question.lessonTitle}</h3>
              <Link
                className="text-link"
                href={`/learn/${question.question.lessonId}`}
                target="_blank"
              >
                לפתיחת השיעור המלא בחלון חדש
              </Link>
              <pre className="auditor-original" tabIndex={0} aria-label="הקטע מהשיעור לבדיקת השאלה">
                {question.sourceText}
              </pre>
              <h3>מקורות לבדיקה</h3>
              <ul>
                {question.context.sources.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                      <span className="sr-only"> · נפתח בחלון חדש</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedDecision ? (
            <div className="notice">
              <strong>
                {selectedDecision.input.decision === 'approve'
                  ? 'השאלה אושרה בבדיקה הזו.'
                  : 'השאלה נדחתה בבדיקה הזו.'}
              </strong>
              <p>{selectedDecision.input.notes}</p>
              <p>ההחלטה נשמרה ואינה ניתנת להחלפה. שינוי בנוסח או בהחלטה דורש בדיקה חדשה.</p>
            </div>
          ) : (
            <form className="auditor-form" key={`${proposalId}:${questionId}`} onSubmit={decide}>
              <fieldset disabled={pending || !detail.current || !question || questionLoading}>
                <legend>החלטה לגבי השאלה הזו</legend>
                <label>
                  החלטה
                  <select name="decision" aria-label="החלטה" defaultValue="reject">
                    <option value="reject">לדחות עד לתיקון</option>
                    <option value="approve">לאשר את הנוסח שנבדק</option>
                  </select>
                </label>
                <label className="auditor-check">
                  <input type="checkbox" name="answerChecked" />
                  בדקתי את השאלה, את כל האפשרויות ואת ההסבר לתשובה.
                </label>
                <label className="auditor-check">
                  <input type="checkbox" name="sourcesChecked" />
                  קראתי את המקורות ובדקתי שהם תומכים בתשובה המסומנת.
                </label>
                <label className="auditor-check">
                  <input type="checkbox" name="hebrewChecked" />
                  בדקתי שהעברית תקינה ושהניסוח ברור ללומד.
                </label>
                <label>
                  הסבר להחלטה
                  <textarea name="notes" minLength={40} maxLength={4000} required rows={4} />
                </label>
                <button type="submit" className="button primary">
                  לשמור החלטה לשאלה
                </button>
              </fieldset>
            </form>
          )}
          <nav className="assessment-navigation" aria-label="ניווט בבדיקת השאלות">
            <button
              type="button"
              className="button secondary"
              disabled={pending || index === 0}
              onClick={() => go(index - 1)}
            >
              השאלה הקודמת
            </button>
            <button
              type="button"
              className="button secondary"
              disabled={pending || index === count - 1}
              onClick={() => go(index + 1)}
            >
              השאלה הבאה
            </button>
          </nav>
          <div className="auditor-publication">
            <h3>פרסום ללומדים</h3>
            <p>
              פרסום מחליף את גרסת השאלות הפעילה. תשובות שכבר נשמרו, נקודות והתקדמות נשארות בחשבון.
            </p>
            <button
              type="button"
              className="button primary"
              disabled={
                pending ||
                !detail.current ||
                approved !== count ||
                overview.status.active?.version === detail.proposal.targetVersion
              }
              onClick={() =>
                void mutate(
                  {
                    operation: 'publish',
                    proposalId,
                    proposalHash: detail.proposalHash,
                    requestId: crypto.randomUUID(),
                  },
                  'גרסת השאלות המאושרת פורסמה ללומדים.',
                )
              }
            >
              לפרסם את כל השאלות המאושרות
            </button>
            {overview.status.active?.version === detail.proposal.targetVersion && (
              <button
                type="button"
                className="button secondary"
                disabled={pending}
                onClick={() =>
                  void mutate(
                    {
                      operation: 'rollback',
                      requestId: crypto.randomUUID(),
                      releaseHash: overview.status.active!.releaseHash,
                    },
                    'המערכת חזרה לגרסת השאלות הקודמת. התשובות וההתקדמות נשמרו.',
                  )
                }
              >
                לחזור לגרסת השאלות הקודמת
              </button>
            )}
          </div>
        </section>
      )}
    </>
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
- [[02_CURRICULUM/quiz-banks/1.0.0-draft/Index|טיוטת שאלות לחיזוק ההבנה]] — ממשק בדיקת שאלות
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
