'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth/client';
type Mode = 'login' | 'signup' | 'forgot' | 'reset';
export function AuthForm({
  resetToken,
  mailEnabled,
}: {
  resetToken?: string;
  mailEnabled: boolean;
}) {
  const [mode, setMode] = useState<Mode>(resetToken ? 'reset' : 'login'),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setMessage('');
    const email = String(form.get('email') || '').trim(),
      password = String(form.get('password') || '');
    try {
      if (mode === 'forgot') {
        const result = await authClient.requestPasswordReset({ email, redirectTo: '/auth' });
        setMessage(
          result.error
            ? 'שליחת הבקשה נכשלה. אפשר לנסות שוב מאוחר יותר.'
            : 'אם קיים חשבון מתאים, נשלח אליו קישור לאיפוס סיסמה.',
        );
        return;
      }
      if (mode === 'reset') {
        const result = await authClient.resetPassword({
          newPassword: password,
          token: resetToken!,
        });
        if (result.error) {
          setMessage('הקישור אינו תקף או שפג תוקפו. בקש קישור חדש.');
          return;
        }
        setMode('login');
        setMessage('הסיסמה עודכנה. אפשר להתחבר.');
        return;
      }
      const result =
        mode === 'signup'
          ? await authClient.signUp.email({
              name: String(form.get('name') || '').trim(),
              email,
              password,
              callbackURL: '/',
            })
          : await authClient.signIn.email({ email, password });
      if (result.error) {
        setMessage(
          result.error.status === 429
            ? 'יותר מדי ניסיונות. נסה שוב בעוד דקה.'
            : 'לא הצלחנו להתחבר או ליצור חשבון. בדוק את הפרטים וודא שכתובת הדוא״ל אומתה.',
        );
        return;
      }
      if (mode === 'signup' && !result.data?.token) {
        setMessage('בדוק את הדוא״ל ואמת את כתובתך לפני הכניסה.');
        return;
      }
      const next = new URLSearchParams(location.search).get('next');
      location.assign(
        next &&
          /^\/(learn|topics|skills|assessments|settings|roadmap|admin|journal|failures|projects|boss-levels)(\/|$)/.test(
            next,
          )
          ? next
          : '/',
      );
    } catch {
      setMessage('החיבור לשרת נכשל. הפרטים נשארו בטופס, אפשר לנסות שוב.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card auth-card">
      <p className="eyebrow">PLAYER LOGIN</p>
      <h1>
        {mode === 'signup'
          ? 'יצירת חשבון'
          : mode === 'forgot'
            ? 'שחזור גישה'
            : mode === 'reset'
              ? 'סיסמה חדשה'
              : 'ברוך השב'}
      </h1>
      <p>ההתקדמות, הניקוד ומקום הקריאה האחרון שלך נשמרים בחשבון.</p>
      <form onSubmit={submit}>
        {mode === 'signup' && (
          <label className="field-label">
            שם לתצוגה
            <input name="name" autoComplete="name" required minLength={2} maxLength={80} />
          </label>
        )}
        {mode !== 'reset' && (
          <label className="field-label">
            דוא״ל
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              dir="ltr"
            />
          </label>
        )}
        {mode !== 'forgot' && (
          <label className="field-label">
            סיסמה
            <input
              name="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={12}
              maxLength={128}
              aria-describedby="password-help"
              dir="ltr"
            />
          </label>
        )}
        {mode !== 'forgot' && (
          <p id="password-help">12–128 תווים. מומלץ להשתמש במשפט סיסמה ייחודי.</p>
        )}
        {mode === 'signup' && (
          <p>בהרשמה מאשרים את תנאי השימוש. מדיניות הפרטיות והצהרת הנגישות זמינות בתחתית העמוד.</p>
        )}
        {mode === 'signup' && (
          <p className="muted">
            הרשמה אינה מצרפת אותך לרשימת תפוצה. אפשר לבחור לקבל עדכונים במייל בהגדרות החשבון.
          </p>
        )}
        <button disabled={busy} className="button primary" type="submit">
          {busy
            ? 'רגע…'
            : mode === 'login'
              ? 'כניסה לחשבון'
              : mode === 'signup'
                ? 'הרשמה'
                : mode === 'forgot'
                  ? 'שליחת קישור איפוס'
                  : 'שמירת הסיסמה'}
        </button>
        <p role="status">{message}</p>
      </form>
      <div className="auth-options">
        <button
          className="text-link"
          onClick={() => {
            setMode(mode === 'signup' ? 'login' : 'signup');
            setMessage('');
          }}
        >
          {mode === 'signup' ? 'כבר יש לי חשבון' : 'יצירת חשבון חדש'}
        </button>
        {mailEnabled && (
          <button
            className="text-link"
            onClick={async () => {
              const input = document.querySelector<HTMLInputElement>('input[name="email"]');
              if (!input?.value || !input.checkValidity()) {
                setMessage('הזן קודם כתובת מייל תקינה.');
                return;
              }
              setBusy(true);
              try {
                const result = await authClient.sendVerificationEmail({
                  email: input.value.trim(),
                  callbackURL: '/',
                });
                setMessage(
                  result.error
                    ? 'הבקשה לא נשלחה. אפשר לנסות שוב מאוחר יותר.'
                    : 'אם קיים חשבון שצריך אימות, נשלח אליו קישור. בדוק גם את תיקיית הספאם.',
                );
              } catch {
                setMessage('השליחה נכשלה. אפשר לנסות שוב מאוחר יותר.');
              } finally {
                setBusy(false);
              }
            }}
            disabled={busy}
          >
            שליחה מחדש של קישור אימות
          </button>
        )}
        {mailEnabled && (
          <button
            className="text-link"
            onClick={() => {
              setMode('forgot');
              setMessage('');
            }}
          >
            שכחתי סיסמה
          </button>
        )}
      </div>
      {!mailEnabled && (
        <p className="muted">
          שליחת מיילים אינה פעילה כרגע. אפשר ללמוד ולשמור התקדמות; איפוס סיסמה במייל אינו זמין.
        </p>
      )}
    </section>
  );
}
