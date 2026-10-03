'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
export function KnowledgeRefresh() {
  const [pending, setPending] = useState(false),
    [message, setMessage] = useState('');
  const router = useRouter();
  async function refresh() {
    setPending(true);
    setMessage('');
    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      if (!response.ok) throw new Error('REFRESH_FAILED');
      const data = await response.json();
      const failures = data.snapshot.sources.filter(
        (source: { status: string }) => source.status !== 'ok',
      ).length;
      setMessage(
        failures
          ? `התוצאות עודכנו. מקורות ללא תוצאות עדכניות: ${failures}.`
          : 'התוצאות מעודכנות למועד ניסיון העדכון שמוצג בעמוד.',
      );
      router.refresh();
    } catch {
      setMessage('לא ניתן היה לעדכן את המקורות. נסה שוב מאוחר יותר.');
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="knowledge-refresh">
      <button
        type="button"
        className="button secondary"
        onClick={refresh}
        disabled={pending}
        aria-busy={pending}
      >
        <RefreshCw size={17} aria-hidden="true" />
        {pending ? 'מעדכן מקורות…' : 'עדכון המקורות'}
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
