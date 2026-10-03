'use client';
import { useEffect, useRef, useState } from 'react';
import type { VaultStatus } from '@/lib/vault/sync';

const errors: Record<string, string> = {
  VAULT_EDITED_NOTE:
    'העדכון נעצר כדי לא למחוק עריכה ידנית בקובץ שיוצא. גבה את העריכה והעבר אותה למחברת האישית לפני שחזור הקובץ המיוצא וניסיון נוסף.',
  VAULT_SYNC_BUSY: 'מפות Volt מתעדכנות בפעולה אחרת. נסה שוב לאחר סיומה.',
  VAULT_ACTIVE_CHANGED: 'גרסת הקורס השתנתה במהלך העדכון. נסה שוב כדי לייצא את הגרסה הפעילה.',
  UNAUTHORIZED: 'ההתחברות הסתיימה. היכנס שוב לחשבון כדי לעדכן את המפות.',
};

async function loadStatus(signal: AbortSignal): Promise<VaultStatus> {
  const response = await fetch('/api/vault/sync', { cache: 'no-store', signal });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'VAULT_STATUS_FAILED');
  return result;
}

/** Operator-only public projection controls; no browser paths or private notes are submitted. */
export function VaultSyncStatus() {
  const [status, setStatus] = useState<VaultStatus | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const running = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    loadStatus(AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]))
      .then((result) => {
        if (!controller.signal.aborted) setStatus(result);
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError(
            'בדיקת גרסת הייצוא לא הושלמה. רענן את העמוד כדי לנסות לבדוק שוב. לעדכון המפות, השתמש בכפתור שבהמשך.',
          );
      });
    return () => controller.abort();
  }, []);

  async function synchronize() {
    if (running.current) return;
    running.current = true;
    setPending(true);
    setError('');
    setMessage('');
    let acknowledged = false;
    try {
      const response = await fetch('/api/vault/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'VAULT_SYNC_FAILED');
      acknowledged = true;
      setMessage(`מפות Volt עודכנו לגרסה ${result.curriculumVersion}.`);
      setStatus(await loadStatus(AbortSignal.timeout(20000)));
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : '';
      setError(
        acknowledged
          ? 'המפות עודכנו, אך בדיקת המצב לא הושלמה. רענן את העמוד כדי לבדוק את הגרסה.'
          : errors[code] ||
              'לא התקבל אישור לעדכון המפות. רענן את העמוד ובדוק את הגרסה לפני ניסיון נוסף.',
      );
    } finally {
      running.current = false;
      setPending(false);
    }
  }

  return (
    <section className="card" aria-labelledby="vault-sync-title">
      <h2 id="vault-sync-title">מפת הידע ב־Volt</h2>
      <p>פרסום גרסת קורס או מאגר שאלות, וגם חזרה לגרסה קודמת, מפעילים עדכון של המפות והקשרים.</p>
      {status && (
        <div>
          <p>
            הגרסה באפליקציה: <bdi>{status.activeVersion}</bdi>
          </p>
          <p>
            גרסת הייצוא האחרונה: <bdi>{status.exportedVersion || 'טרם נשמרה'}</bdi>
          </p>
          <p role="status">
            {status.state === 'CURRENT'
              ? 'גרסת הייצוא השמור תואמת לקורס, למאגר השאלות ולהגדרות התבניות באפליקציה.'
              : status.state === 'PENDING'
                ? 'מפת הידע טרם עודכנה לקורס, למאגר השאלות ולהגדרות התבניות באפליקציה.'
                : 'לא ניתן היה לבדוק את הייצוא השמור.'}
          </p>
        </div>
      )}
      {!status && !error && <p role="status">בודק את גרסת הייצוא…</p>}
      <p>
        הבדיקה משווה את הקורס, את מאגר השאלות ואת הגדרות התבניות לייצוא השמור. היא אינה בודקת עריכות
        שנעשו בקבצים לאחר הייצוא.
      </p>
      {message && <p role="status">{message}</p>}
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      <button
        className="button secondary"
        disabled={pending}
        aria-busy={pending}
        onClick={() => void synchronize()}
      >
        {pending ? 'מעדכן את המפות…' : 'לעדכן את מפות Volt'}
      </button>
    </section>
  );
}
