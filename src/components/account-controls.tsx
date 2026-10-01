'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth/client';
export function AccountControls({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false);
  async function signOut() {
    setBusy(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error();
      router.replace('/auth');
      router.refresh();
    } catch {
      setMessage('ההתנתקות נכשלה. נסה שוב.');
      setBusy(false);
    }
  }
  async function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const result = await authClient.updateUser({
        name: String(new FormData(e.currentTarget).get('name')),
      });
      setMessage(result.error ? 'העדכון נכשל.' : 'השם עודכן.');
    } catch {
      setMessage('החיבור לשרת נכשל.');
    } finally {
      setBusy(false);
    }
  }
  async function remove(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const form = new FormData(e.currentTarget);
    try {
      const result = await authClient.deleteUser({
        password: String(form.get('password')),
        callbackURL: '/auth',
      });
      if (result.error) {
        setMessage('המחיקה נכשלה. בדוק את הסיסמה והתחבר מחדש.');
        return;
      }
      router.replace('/auth');
      router.refresh();
    } catch {
      setMessage('החיבור לשרת נכשל.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card settings-card">
      <h2>החשבון שלי</h2>
      <p dir="ltr">{email}</p>
      <form onSubmit={update}>
        <label className="field-label">
          שם לתצוגה
          <input
            name="name"
            required
            minLength={2}
            maxLength={80}
            defaultValue={name}
            autoComplete="name"
          />
        </label>
        <button className="button secondary" disabled={busy}>
          עדכון שם
        </button>
      </form>
      <button className="button secondary account-signout" disabled={busy} onClick={signOut}>
        התנתקות
      </button>
      <details>
        <summary>מחיקת החשבון והנתונים</summary>
        <p>
          הפעולה מוחקת את ההתקדמות, ההערות, הראיות והחשבון מהמסד הפעיל. מומלץ לייצא את הנתונים לפני
          המחיקה. לא ניתן לבטל אותה.
        </p>
        <form onSubmit={remove}>
          <label className="field-label">
            סיסמה לאישור המחיקה
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          <label className="toggle-row">
            <input type="checkbox" required />
            אני מבין שהמחיקה קבועה
          </label>
          <button className="button secondary" disabled={busy}>
            מחיקה לצמיתות
          </button>
        </form>
      </details>
      <p role="status">{message}</p>
    </section>
  );
}
