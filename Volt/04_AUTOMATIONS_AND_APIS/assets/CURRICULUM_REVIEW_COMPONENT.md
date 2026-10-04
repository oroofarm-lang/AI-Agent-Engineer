---
generated: true
schema_version: 1
kind: "asset"
entity_id: "CURRICULUM_REVIEW_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/curriculum-review.tsx"
asset_kind: "ui-code"
source_sha256: "28554a956d82605ca7854a1d40565ade3915dd8a1bfde060aced4ca0d432d85e"
related: ["[[01_AGENTS/Agent-Curriculum-Auditor]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Hebrew-UX]]","[[01_AGENTS/Agent-Knowledge-RAG]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Progress-Tracker]]","[[01_AGENTS/Agent-Quiz-Designer]]","[[01_AGENTS/Agent-Security-Auditor]]","[[02_CURRICULUM/2.2.0/modules/KNOWLEDGE]]","[[02_CURRICULUM/2.2.0/modules/QUALITY]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# בדיקת הצעות לעדכון הקורס

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/curriculum-review.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/curriculum-review.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from '@/components/workspace-navigation';
import { requiredSections } from '@/lib/curriculum/schema';
import type { auditorStore } from '@/lib/auditor/store';
import type { ProposalInput } from '@/lib/auditor/schema';
import { VaultSyncStatus } from './vault-sync-status';

type Store = ReturnType<typeof auditorStore>;
type Context = ReturnType<Store['context']>;
type Summary = ReturnType<Store['list']>[number];
type Detail = ReturnType<Store['details']>;
type Section = { beforeText: string; bodyHash: string; version: string; baseHash: string };
const sections: Record<(typeof requiredSections)[number], string> = {
  Mission: 'המשימה',
  'Build First': 'שלבי הבנייה',
  Concepts: 'המושגים',
  'Mental Model': 'איך לחשוב על התהליך',
  'Deep Dive': 'הסבר מעמיק',
  'Failure Lab': 'תרגול תקלות',
  Challenge: 'אתגר עצמאי',
  'Mastery Check': 'בדיקת הבנה',
  Documentation: 'מקורות לעבודה',
  'Engineering Notes': 'הערות לעבודה',
};
const severities = {
  CRITICAL: 'קריטי: הוראה שאי אפשר לבצע או שאינה בטוחה',
  HIGH: 'גבוה: שינוי משמעותי בתכנון',
  MEDIUM: 'בינוני: שינוי בדרך העבודה המומלצת',
  LOW: 'נמוך: שינוי בדוגמה או בתחביר',
  INFORMATIONAL: 'לידיעה בלבד',
};
const actions = {
  ADD: 'הוספת הסבר',
  UPDATE: 'עדכון הסבר',
  DEPRECATE: 'סימון דרך עבודה שהתיישנה',
  REPLACE: 'החלפת הסבר',
  WATCH: 'מעקב בלבד',
};
const states: Record<string, string> = {
  PROPOSED: 'ממתינה לבדיקה',
  APPROVED: 'אושרה, טרם פורסמה',
  DEFERRED: 'ממתינה לבדיקה בהמשך',
  WATCHED: 'נשמרה למעקב',
  APPLIED: 'פורסמה',
  ROLLED_BACK: 'בוצעה חזרה לגרסה הקודמת',
};
const failures: Record<string, string> = {
  INVALID_REQUEST:
    'בדוק שהשדות מולאו לפי הדרישות, שנבחר מקור אחד לפחות ושיש הסבר של לפחות 30 תווים לכל מקור שנבחר.',
  UNAUTHORIZED: 'ההתחברות הסתיימה. היכנס שוב לחשבון לפני פעולה נוספת.',
  AUDITOR_STALE_BASE: 'גרסת הקורס השתנתה. רענן את העמוד והכן הצעה על בסיס הגרסה העדכנית.',
  AUDITOR_STALE_BODY: 'נוסח השיעור השתנה. טען את הקטע מחדש לפני שמירת ההצעה.',
  AUDITOR_MORE_EVIDENCE_REQUIRED: 'שינוי קריטי או משמעותי דורש שני מקורות ראשוניים שונים לפחות.',
  AUDITOR_REVIEW_REQUIRED: 'כדי לאשר, צריך לקרוא את המקורות ואת הנוסח המוצע ולסמן ששניהם נבדקו.',
  AUDITOR_FOUNDATION_REVIEW:
    'זהו שינוי ביסודות. כתוב הסבר של לפחות 60 תווים על השפעתו על מושגי היסוד.',
  AUDITOR_APPROVAL_REQUIRED: 'ההצעה עדיין אינה מאושרת לפרסום.',
  AUDITOR_PROPOSAL_CONFLICT: 'ההצעה אינה תואמת לגרסה השמורה. רענן את העמוד לפני פעולה נוספת.',
  AUDITOR_DECISION_CONFLICT: 'כבר נשמרה החלטה אחרת להצעה הזו. שינוי נוסף דורש הצעה חדשה.',
  AUDITOR_NO_CHANGE: 'הנוסח המוצע זהה לנוסח הקיים. כתוב שינוי או בחר מעקב בלבד.',
  AUDITOR_SECTION_BOUNDARY: 'שנה רק את תוכן הקטע. אין להוסיף בו כותרת חדשה מסוג ##.',
  AUDITOR_ROLLBACK_CONFLICT:
    'פורסמה מאז גרסה נוספת. אי אפשר להשתמש בהצעה הזו כדי לחזור לגרסה הקודמת.',
  AUDITOR_BUSY: 'פעולת עריכה אחרת מתבצעת כרגע. נסה שוב לאחר סיומה.',
};
async function readAPI<T>(url: string, signal = AbortSignal.timeout(20000)): Promise<T> {
  const response = await fetch(url, { signal, cache: 'no-store' });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'REQUEST_FAILED');
  return result as T;
}

export function CurriculumReview({
  initialContext,
  initialProposals,
}: {
  initialContext: Context;
  initialProposals: Summary[];
}) {
  const router = useRouter();
  const [context, setContext] = useState(initialContext),
    [proposals, setProposals] = useState(initialProposals);
  const [lessonId, setLessonId] = useState(context.lessons[0].id),
    [section, setSection] = useState<(typeof requiredSections)[number]>('Engineering Notes');
  const [original, setOriginal] = useState<Section | null>(null),
    [newText, setNewText] = useState(''),
    [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Detail | null>(null),
    [pending, setPending] = useState(false),
    [message, setMessage] = useState(''),
    [error, setError] = useState('');
  const [vaultRevision, setVaultRevision] = useState(0);
  const mutationRunning = useRef(false),
    savedRequest = useRef<unknown>(null),
    [canRetry, setCanRetry] = useState(false);
  const selectedLesson = context.lessons.find((lesson) => lesson.id === lessonId)!;
  const [action, setAction] = useState<ProposalInput['action']>('UPDATE');
  const [sourceIds, setSourceIds] = useState<string[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    readAPI<Section>(
      `/api/auditor?lessonId=${encodeURIComponent(lessonId)}&section=${encodeURIComponent(section)}`,
      AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]),
    )
      .then((result) => {
        if (controller.signal.aborted) return;
        setOriginal(result);
        setNewText(result.beforeText);
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setError('לא ניתן היה לטעון את הקטע. רענן את העמוד כדי לנסות שוב.');
        }
      });
    return () => controller.abort();
  }, [lessonId, section, context.version]);
  function changeSelection(nextLesson: string, nextSection: (typeof requiredSections)[number]) {
    if (nextLesson === lessonId && nextSection === section) return;
    setLoading(true);
    setOriginal(null);
    setNewText('');
    setSourceIds([]);
    setError('');
    setLessonId(nextLesson);
    setSection(nextSection);
  }
  async function showProposal(id: string) {
    setError('');
    try {
      setDetail(await readAPI<Detail>(`/api/auditor?proposalId=${encodeURIComponent(id)}`));
    } catch {
      setError('לא ניתן היה לטעון את ההצעה. נסה לפתוח אותה שוב.');
    }
  }
  async function mutate(payload: unknown, success: string) {
    if (mutationRunning.current) return;
    mutationRunning.current = true;
    setPending(true);
    setError('');
    setMessage('');
    setCanRetry(false);
    savedRequest.current = payload;
    try {
      const response = await fetch('/api/auditor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'REQUEST_FAILED');
      // Acknowledged writes are facts even if the subsequent screen refresh fails.
      savedRequest.current = null;
      const projectionMessage = result.vaultSync
        ? result.vaultSync.status === 'SYNCED'
          ? ` מפות Volt עודכנו לגרסה ${result.vaultSync.curriculumVersion}.`
          : ' גרסת הקורס נשמרה, אך מפות Volt לא עודכנו. בדוק את מצב המפה ונסה לעדכן אותה בנפרד.'
        : '';
      setMessage(success + projectionMessage);
      if (result.vaultSync) setVaultRevision((value) => value + 1);
      const refreshed = await readAPI<{ context: Context; proposals: Summary[] }>('/api/auditor');
      setContext(refreshed.context);
      setProposals(refreshed.proposals);
      if (result.id) await showProposal(result.id);
      else if (detail) await showProposal(detail.proposal.input.id);
      router.refresh();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : '';
      setError(
        failures[code] ||
          (savedRequest.current
            ? 'לא התקבל אישור להשלמת הפעולה. אפשר לנסות שוב את אותה בקשה; אל תכין הצעה חדשה לפני בדיקת הרשימה.'
            : 'הפעולה נשמרה, אך העמוד לא התרענן. רענן כדי לראות את התוצאה.'),
      );
      setCanRetry(Boolean(savedRequest.current) && !failures[code]);
    } finally {
      mutationRunning.current = false;
      setPending(false);
    }
  }
  function propose(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!original || loading || original.version !== context.version) return;
    const form = new FormData(event.currentTarget);
    if (!form.getAll('sourceId').length) {
      setError('בחר מקור אחד לפחות וכתוב כיצד הוא תומך בשינוי.');
      return;
    }
    const input: ProposalInput = {
      id: crypto.randomUUID(),
      baseVersion: original.version,
      baseHash: original.baseHash,
      targetVersion: String(form.get('targetVersion')),
      title: String(form.get('title')),
      newInformation: String(form.get('newInformation')),
      reason: String(form.get('reason')),
      confidence: String(form.get('confidence')) as ProposalInput['confidence'],
      estimatedMinutes: Number(form.get('estimatedMinutes')),
      severity: String(form.get('severity')) as ProposalInput['severity'],
      action,
      evidence: form.getAll('sourceId').map((sourceId) => ({
        sourceId: String(sourceId),
        summary: String(form.get(`source:${sourceId}`)),
      })),
      changes:
        action === 'WATCH' ? [] : [{ lessonId, section, beforeHash: original.bodyHash, newText }],
    };
    void mutate({ operation: 'propose', input }, 'ההצעה נשמרה לבדיקה. תוכן הקורס עדיין לא השתנה.');
  }
  function decide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detail) return;
    const form = new FormData(event.currentTarget);
    void mutate(
      {
        operation: 'decide',
        input: {
          id: detail.proposal.input.id,
          proposalHash: detail.hash,
          decision: form.get('decision'),
          rationale: form.get('rationale'),
          checkedPrimarySources: form.get('checkedPrimarySources') === 'on',
          checkedTeaching: form.get('checkedTeaching') === 'on',
          foundationRationale: String(form.get('foundationRationale') || ''),
        },
      },
      'ההחלטה נשמרה. פרסום דורש לחיצה נפרדת על כפתור הפרסום.',
    );
  }
  const [major, minor, patch] = context.version.split('.').map(Number);
  return (
    <>
      <div className="notice">
        <strong>
          גרסת הקורס הפעילה: <bdi>{context.version}</bdi>
        </strong>
        <p>
          איסוף עדכון או שמירת הצעה אינם אישור לפרסום. בדיקות המבנה אינן בודקות את נכונות ההסבר או
          מריצות את הקוד שבשיעור.
        </p>
      </div>
      {message && <p role="status">{message}</p>}
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      {canRetry && (
        <button
          className="button secondary"
          disabled={pending}
          onClick={() => void mutate(savedRequest.current, 'הפעולה הושלמה ונשמרה.')}
        >
          לנסות שוב את אותה בקשה
        </button>
      )}
      <VaultSyncStatus key={vaultRevision} />
      <section className="card auditor-proposals" aria-labelledby="proposal-list-title">
        <h2 id="proposal-list-title">הצעות שנשמרו</h2>
        <p>מוצגות עד 50 ההצעות האחרונות. החלטות ונוסחים נשמרים; שינוי נוסף דורש הצעה חדשה.</p>
        {!proposals.length ? (
          <p>אין כרגע הצעות. אפשר להכין הצעה בטופס שבהמשך.</p>
        ) : (
          <ul>
            {proposals.map((item) => (
              <li key={item.id}>
                <button
                  className="button secondary"
                  disabled={pending}
                  onClick={() => void showProposal(item.id)}
                >
                  {item.title}
                </button>
                <span>
                  {states[item.state]} · שיעורים שהוצע לעדכן: {item.directLessonIds.length} ·{' '}
                  <bdi>
                    {item.baseVersion} → {item.targetVersion}
                  </bdi>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {detail && (
        <section className="card auditor-detail" aria-labelledby="proposal-title">
          <h2 id="proposal-title">{detail.proposal.input.title}</h2>
          <p>
            <strong>{states[detail.state]}</strong> · {severities[detail.proposal.input.severity]} ·{' '}
            {actions[detail.proposal.input.action]}
          </p>
          <h3>מה השתנה במקור ולמה זה חשוב?</h3>
          <p>{detail.proposal.input.newInformation}</p>
          <p>{detail.proposal.input.reason}</p>
          <p>
            זמן התאמה משוער (בדקות): {detail.proposal.input.estimatedMinutes}. רמת הביטחון שציין
            מחבר ההצעה:{' '}
            {{ low: 'נמוכה', medium: 'בינונית', high: 'גבוהה' }[detail.proposal.input.confidence]}.
          </p>
          <h3>מקורות לבדיקה</h3>
          <ul>
            {detail.proposal.evidence.map((source) => (
              <li key={source.sourceId}>
                <a
                  className="text-link"
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                  <span className="sr-only"> — נפתח בחלון חדש</span>
                </a>
                <p>{source.summary}</p>
              </li>
            ))}
          </ul>
          <details open>
            <summary>השוואת הנוסחים</summary>
            {detail.proposal.comparison.length ? (
              detail.proposal.comparison.map((change) => (
                <section key={`${change.lessonId}:${change.section}`}>
                  <h3>
                    {context.lessons.find((lesson) => lesson.id === change.lessonId)?.title} ·{' '}
                    {sections[change.section]}
                  </h3>
                  <div className="auditor-diff">
                    <div>
                      <h4>הנוסח הקיים</h4>
                      <pre dir="auto" tabIndex={0} aria-label="הנוסח הקיים להשוואה">
                        {change.beforeText}
                      </pre>
                    </div>
                    <div>
                      <h4>הנוסח המוצע</h4>
                      <pre dir="auto" tabIndex={0} aria-label="הנוסח המוצע להשוואה">
                        {change.afterText}
                      </pre>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p>זו הצעה למעקב בלבד. לא הוכן שינוי בתוכן.</p>
            )}
          </details>
          <details>
            <summary>שיעורים ומיומנויות שצריך לבדוק</summary>
            <p>
              שיעורים עם שינוי מוצע: {detail.proposal.impact.directLessonIds.length}. שיעורים קשורים
              דרך מיומנויות או דרישות קדם: {detail.proposal.impact.downstreamLessonIds.length}. הקשר
              אינו מעיד שתוכנם השתנה.
            </p>
            <ul>
              {[
                ...detail.proposal.impact.directLessonIds,
                ...detail.proposal.impact.downstreamLessonIds,
              ].map((id) => (
                <li key={id}>
                  <Link href={`/learn/${id}`}>
                    {context.lessons.find((lesson) => lesson.id === id)?.title || id}
                  </Link>
                </li>
              ))}
            </ul>
            <p>מזהי המיומנויות לבדיקה: {detail.proposal.impact.affectedSkillIds.join(', ')}</p>
          </details>
          {detail.state === 'PROPOSED' && (
            <form className="auditor-form" onSubmit={decide} key={detail.proposal.input.id}>
              <h3>החלטת הבודק</h3>
              <label>
                החלטה
                <select name="decision" aria-label="החלטה" defaultValue="defer">
                  <option value="defer">לדחות את הבדיקה למועד מאוחר יותר</option>
                  <option value="watch">לשמור למעקב</option>
                  {detail.proposal.input.action !== 'WATCH' && (
                    <option value="approve">לאשר את הנוסח לפרסום</option>
                  )}
                </select>
              </label>
              <label>
                הסבר להחלטה
                <textarea
                  name="rationale"
                  aria-label="הסבר להחלטה"
                  required
                  minLength={40}
                  maxLength={4000}
                  rows={4}
                />
              </label>
              <label className="auditor-check">
                <input type="checkbox" name="checkedPrimarySources" />
                קראתי את המקורות הראשוניים ובדקתי שהם תומכים בטענות המוצעות.
              </label>
              <label className="auditor-check">
                <input type="checkbox" name="checkedTeaching" />
                קראתי את הנוסח המוצע ובדקתי את השפעתו על השיעור ועל הלמידה.
              </label>
              {detail.proposal.impact.foundationTouched && (
                <label>
                  השפעת השינוי על היסודות
                  <textarea
                    name="foundationRationale"
                    aria-label="השפעת השינוי על היסודות"
                    minLength={60}
                    maxLength={4000}
                    rows={4}
                  />
                  <span>
                    לאישור שינוי ביסודות, הסבר מה משתנה במושגי היסוד ולמה המקורות מצדיקים אותו.
                    פרסום שיווקי לבדו אינו סיבה להחליף יסודות.
                  </span>
                </label>
              )}
              <button className="button primary" disabled={pending} aria-busy={pending}>
                לשמור החלטה
              </button>
            </form>
          )}
          {detail.decision && (
            <div className="notice">
              <h3>הסבר ההחלטה שנשמרה</h3>
              <p>{detail.decision.rationale}</p>
            </div>
          )}
          {detail.state === 'APPROVED' && (
            <div className="auditor-publication">
              <p>
                הפרסום יפעיל את גרסה <bdi>{detail.proposal.input.targetVersion}</bdi>. הגרסה הקודמת
                והתקדמות הלומדים יישמרו.
              </p>
              <button
                className="button primary"
                disabled={pending}
                onClick={() =>
                  void mutate(
                    { operation: 'apply', id: detail.proposal.input.id, proposalHash: detail.hash },
                    'הגרסה החדשה פורסמה. התקדמות הלומדים נשמרה.',
                  )
                }
              >
                לפרסם את העדכון המאושר
              </button>
            </div>
          )}
          {detail.state === 'APPLIED' && context.manifestHash === detail.proposal.candidateHash && (
            <div className="auditor-publication">
              <p>החזרה תשנה את תוכן הקורס לגרסה הקודמת. הגשות, ציונים והתקדמות לא יימחקו.</p>
              <button
                className="button secondary"
                disabled={pending}
                onClick={() =>
                  void mutate(
                    {
                      operation: 'rollback',
                      id: detail.proposal.input.id,
                      proposalHash: detail.hash,
                    },
                    'הקורס חזר לגרסה הקודמת. התקדמות הלומדים נשמרה.',
                  )
                }
              >
                לחזור לגרסה הקודמת
              </button>
            </div>
          )}
        </section>
      )}
      <details className="card auditor-authoring">
        <summary>הכנת הצעה חדשה</summary>
        <form className="auditor-form" onSubmit={propose}>
          <div className="auditor-fields">
            <label>
              השיעור לעריכה
              <select
                aria-label="השיעור לעריכה"
                value={lessonId}
                disabled={pending}
                onChange={(event) => changeSelection(event.target.value, section)}
              >
                {context.lessons.map((lesson) => (
                  <option value={lesson.id} key={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              הקטע לעריכה
              <select
                aria-label="הקטע לעריכה"
                value={section}
                disabled={pending}
                onChange={(event) =>
                  changeSelection(lessonId, event.target.value as typeof section)
                }
              >
                {requiredSections.map((name) => (
                  <option value={name} key={name}>
                    {sections[name]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            כותרת ההצעה
            <input name="title" required minLength={5} maxLength={180} />
          </label>
          <label>
            מה המידע החדש?
            <textarea
              name="newInformation"
              aria-label="מה המידע החדש?"
              required
              minLength={30}
              maxLength={6000}
              rows={4}
            />
          </label>
          <label>
            למה השינוי נחוץ?
            <textarea
              name="reason"
              aria-label="למה השינוי נחוץ?"
              required
              minLength={30}
              maxLength={4000}
              rows={4}
            />
          </label>
          <div className="auditor-fields">
            <label>
              חומרת השינוי
              <select name="severity" aria-label="חומרת השינוי" defaultValue="LOW">
                {Object.entries(severities).map(([value, title]) => (
                  <option value={value} key={value}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              הפעולה המוצעת
              <select
                aria-label="הפעולה המוצעת"
                value={action}
                onChange={(event) => setAction(event.target.value as typeof action)}
              >
                {Object.entries(actions).map(([value, title]) => (
                  <option value={value} key={value}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              רמת הביטחון של מחבר ההצעה
              <select name="confidence" aria-label="רמת הביטחון של מחבר ההצעה" defaultValue="low">
                <option value="low">נמוכה</option>
                <option value="medium">בינונית</option>
                <option value="high">גבוהה</option>
              </select>
            </label>
            <label>
              זמן התאמה משוער בדקות
              <input
                type="number"
                name="estimatedMinutes"
                defaultValue={30}
                min={1}
                max={960}
                required
              />
            </label>
            <label>
              גרסת הקורס המוצעת
              <input
                name="targetVersion"
                key={context.version}
                defaultValue={`${major}.${minor}.${patch + 1}`}
                pattern="[0-9]{1,6}\.[0-9]{1,6}\.[0-9]{1,6}"
                required
                dir="ltr"
              />
            </label>
          </div>
          <fieldset>
            <legend>מקורות ראשוניים שתומכים בהצעה</legend>
            <p>
              בחר מקור אחד לפחות וכתוב במילים שלך כיצד הוא תומך בשינוי. אין להעתיק מסמך שלם. לשינוי
              קריטי או משמעותי נדרשים שני מקורות שונים לפחות.
            </p>
            {context.sources
              .filter((source) => selectedLesson.sourceIds.includes(source.id))
              .map((source) => (
                <div className="auditor-source" key={`${lessonId}:${source.id}`}>
                  <label className="auditor-check">
                    <input
                      type="checkbox"
                      name="sourceId"
                      value={source.id}
                      checked={sourceIds.includes(source.id)}
                      onChange={(event) =>
                        setSourceIds((selected) =>
                          event.target.checked
                            ? [...selected, source.id]
                            : selected.filter((id) => id !== source.id),
                        )
                      }
                    />
                    {source.title}
                  </label>
                  <a
                    className="text-link"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    לקריאת המקור<span className="sr-only"> — נפתח בחלון חדש</span>
                  </a>
                  <label>
                    כיצד המקור תומך בשינוי המוצע? · {source.title}
                    <textarea
                      name={`source:${source.id}`}
                      aria-label={`כיצד המקור תומך בשינוי המוצע? · ${source.title}`}
                      minLength={30}
                      maxLength={1500}
                      rows={3}
                      required={sourceIds.includes(source.id)}
                      disabled={!sourceIds.includes(source.id)}
                    />
                  </label>
                </div>
              ))}
          </fieldset>
          {action !== 'WATCH' && (
            <>
              <details>
                <summary>הנוסח שקיים עכשיו</summary>
                <pre
                  className="auditor-original"
                  dir="auto"
                  tabIndex={0}
                  aria-label="הנוסח שקיים בקטע"
                >
                  {loading ? 'טוען את הקטע…' : original?.beforeText}
                </pre>
              </details>
              <label>
                הנוסח המלא המוצע לקטע
                <textarea
                  aria-label="הנוסח המלא המוצע לקטע"
                  value={newText}
                  onChange={(event) => setNewText(event.target.value)}
                  minLength={20}
                  maxLength={40000}
                  rows={12}
                  required
                  disabled={loading || pending || original?.version !== context.version}
                  dir="auto"
                />
              </label>
            </>
          )}
          <p>הנוסח שבהצעה נשמר כפי שהוא לצורך בדיקה. שמירת ההצעה אינה מפרסמת שינוי בשיעור.</p>
          <button
            className="button primary"
            disabled={pending || loading || !original || original.version !== context.version}
            aria-busy={pending}
          >
            לשמור הצעה לבדיקה
          </button>
        </form>
      </details>
    </>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Curriculum-Auditor|מקורות ועדכוני תוכן]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Hebrew-UX|עברית ברורה וסיכום התשובה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Knowledge-RAG|ידע, זיכרון ושליפת מקורות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Progress-Tracker|משוב על העבודה והתקדמות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Quiz-Designer|תרגול ובדיקות הבנה]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/KNOWLEDGE|זיכרון ומערכות ידע]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/QUALITY|איכות, אבטחה ובקרה]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
