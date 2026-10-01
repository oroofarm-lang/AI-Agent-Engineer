'use client';
import { containDialogFocus } from '@/lib/client/dialog';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './code-block';
import { helpLabels } from '@/lib/ai/policy';
type Message = { id: string; role: 'user' | 'assistant'; body: string };
const errors: Record<string, string> = {
  AI_NOT_CONFIGURED: 'חיבור ה־AI עדיין לא הוגדר. בעל המערכת צריך להגדיר מפתח ומודל בצד השרת.',
  MENTOR_BUSY: 'בקשה קודמת עדיין מתבצעת. המתן רגע לפני שליחת בקשה נוספת.',
  MENTOR_DAILY_LIMIT: 'הגעת למגבלה של 20 בקשות ביום. אפשר להמשיך ללמוד ללא המנטור.',
  AI_RATE_LIMIT: 'ספק ה־AI הגביל את הבקשה. לא בוצע ניסיון חוזר אוטומטי.',
  AI_CONNECTION_FAILED: 'לא התקבלה תשובה בזמן. ייתכן שהבקשה נקלטה אצל הספק; לא שלחנו אותה שוב.',
  FOUNDATION_REQUIRED: 'צריך להשלים את תרגילי פרק הבסיס לפני עבודה ביחידה הזו.',
};
export function MentorInfo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const lessonId = /^\/(learn|projects)\//.test(pathname) ? pathname.split('/')[2] : null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>();
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [mode, setMode] = useState('hint');
  const [learningMode, setLearningMode] = useState('tutorial');
  const [helpLevel, setHelpLevel] = useState(1);
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeReflections, setIncludeReflections] = useState(false);
  async function load() {
    const response = await fetch(
      `/api/mentor${lessonId ? `?lessonId=${encodeURIComponent(lessonId)}` : ''}`,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    setReady(data.configuration.ready);
    setLoaded(true);
    setMessages(data.messages);
    setThreadId(data.threadId);
  }
  async function open() {
    dialog.current?.showModal();
    setStatus('טוען שיחה…');
    setReady(false);
    setLoaded(false);
    setMessages([]);
    setThreadId(undefined);
    setCode('');
    setMessage('');
    setIncludeNotes(false);
    setIncludeReflections(false);
    try {
      await load();
      setStatus('');
    } catch {
      setStatus('טעינת השיחה נכשלה. סגור ופתח שוב כדי לנסות מחדש.');
    }
  }
  async function send(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus('המנטור מכין תשובה…');
    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: crypto.randomUUID(),
          lessonId,
          threadId,
          message,
          code,
          mode,
          learningMode,
          helpLevel,
          includeNotes,
          includeReflections,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        await load();
        setStatus(
          errors[data.error] || 'הבקשה לא הושלמה. לא התקבלה כאן תשובת AI ולא שלחנו את הבקשה שוב באופן אוטומטי.',
        );
        return;
      }
      setMessages(data.messages);
      setThreadId(data.threadId);
      setMessage('');
      setCode('');
      setStatus('התשובה נשמרה. זו תשובת AI; בדוק אותה לפני שימוש.');
    } catch {
      setStatus('החיבור נקטע. פתח שוב את השיחה כדי לבדוק אם נשמרה תשובה לפני שתשלח מחדש.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="button subtle" onClick={open}>
        <Sparkles size={16} /> AI Mentor
      </button>
      <dialog
        onKeyDown={containDialogFocus}
        aria-labelledby="mentor-title"
        ref={dialog}
        className="mentor-dialog mentor-panel"
        onClick={(e) => {
          if (e.target === e.currentTarget && !busy) dialog.current?.close();
        }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">עזרה בלמידה</span>
          <button
            className="icon-button"
            aria-label="סגירת חלונית המנטור"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="mentor-title">המנטור שלך</h2>
        <p>
          {lessonId
            ? 'השיחה משויכת לשיעור הנוכחי. תוכן השיעור ומצב ההתקדמות מצורפים לבקשה.'
            : 'שיחה כללית על הלמידה ועל ההתקדמות שלך.'}{' '}
          מתחילים ברמז, ובוחרים כמה עזרה לקבל.
        </p>
        {loaded && !ready && (
          <div className="notice">
            <strong>חיבור ה־AI עדיין לא פעיל.</strong>
            <p>חיבור המנטור עדיין לא הוגדר, ולכן אי אפשר לשלוח אליו שאלות כרגע.</p>
            <p>מפעיל הקורס צריך להפעיל את החיבור. אפשר להמשיך ללמוד, לתרגל ולשמור התקדמות בינתיים.</p>
          </div>
        )}
        <div className="mentor-transcript" role="region" aria-label="היסטוריית השיחה">
          {messages.map((item) => (
            <article key={item.id} className={`mentor-message ${item.role}`}>
              <strong>{item.role === 'user' ? 'השאלה שלך' : 'תשובת AI · דורשת בדיקה'}</strong>
              <div className="prose">
                <ReactMarkdown
                  components={{
                    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {item.body}
                </ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
        <form onSubmit={send}>
          <div className="practice-fields">
            <label className="field-label">
              סוג העזרה
              <select value={mode} onChange={(e) => setMode(e.target.value)} disabled={busy}>
                <option value="hint">רמז</option>
                <option value="explain">הסבר</option>
                <option value="debug">איתור תקלה</option>
                <option value="review">בדיקת קוד</option>
                <option value="quiz">שאלות לתרגול</option>
                <option value="challenge">אתגר נוסף</option>
                <option value="architecture">בדיקת תכנון</option>
              </select>
            </label>
            <label className="field-label">
              איך לומדים?
              <select
                value={learningMode}
                onChange={(e) => {
                  setLearningMode(e.target.value);
                  if (e.target.value === 'interview') setHelpLevel(1);
                }}
                disabled={busy}
              >
                <option value="tutorial">עם הדרכה</option>
                <option value="builder">בנייה עצמאית</option>
                <option value="interview">בחינה עצמית</option>
              </select>
            </label>
            <label className="field-label">
              כמה עזרה לקבל?
              <select
                value={helpLevel}
                onChange={(e) => setHelpLevel(Number(e.target.value))}
                disabled={busy}
              >
                {helpLabels.map((label, index) => (
                  <option
                    key={label}
                    value={index + 1}
                    disabled={learningMode === 'interview' && index > 1}
                  >
                    {index + 1}. {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="muted tiny">
            באתגרי סיום ובבחינה עצמית, העזרה מוגבלת לשאלה מנחה או לכיוון לפתרון. זו הנחיה למודל,
            ואינה מבטיחה שיציית בכל תשובה.
          </p>
          <label className="field-label">
            מה ניסית, ובמה נתקעת?
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              minLength={3}
              maxLength={4000}
              required
              disabled={!ready || busy}
            />
          </label>
          <details>
            <summary>לצרף קוד או מידע אישי מהקורס · לבחירתך</summary>
            <label className="field-label">
              קוד לבדיקה — בלי סיסמאות או מפתחות
              <textarea
                dir="ltr"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={16000}
                rows={5}
                disabled={busy}
              />
            </label>
            <label className="field-label">
              או בחר קובץ טקסט מהמחשב
              <input
                type="file"
                accept=".txt,.py,.ts,.tsx,.js,.json,.md"
                disabled={busy}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 16000) {
                    setStatus('בחר קובץ של עד 16KB.');
                    return;
                  }
                  setCode(await file.text());
                }}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeNotes}
                disabled={!lessonId || busy}
                onChange={(e) => setIncludeNotes(e.target.checked)}
              />{' '}
              לצרף את הערות השיעור שלי
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={includeReflections}
                disabled={busy}
                onChange={(e) => setIncludeReflections(e.target.checked)}
              />{' '}
              לצרף רשומות מיומן הלמידה ומתיעוד התקלות שלי, לפי השיעור
            </label>
          </details>
          <p className="muted tiny">
            בשליחה, השאלה וההקשר שנבחרו מועברים ל־OpenAI. השיחה נשמרת בחשבון שלך. המנטור אינו מריץ
            את הקוד ואינו קובע אם הגעת לשליטה בנושא. עד 20 בקשות ביום; המונה מתאפס בחצות לפי שעון
            UTC.
          </p>
          <button
            type="submit"
            disabled={!ready || busy || message.trim().length < 3}
            className="button primary"
          >
            {busy ? 'ממתינים לתשובה…' : 'שליחה למנטור'}
          </button>
          <p role="status">{status}</p>
        </form>
      </dialog>
    </>
  );
}
