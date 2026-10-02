'use client';
import { useActionState } from 'react';
import { togglePortfolio } from '@/app/portfolio/actions';
export function PortfolioToggle({
  submissionId,
  included,
}: {
  submissionId: string;
  included: boolean;
}) {
  const [result, action, pending] = useActionState(togglePortfolio, { ok: true, message: '' });
  return (
    <form action={action}>
      <input type="hidden" name="submissionId" value={submissionId} />
      <input type="hidden" name="included" value={String(!included)} />
      <button className="button secondary" disabled={pending}>
        {pending ? 'מעדכן…' : included ? 'הסרה מתיק העבודות' : 'הוספה לתיק העבודות'}
      </button>
      <p role="status">{result.message}</p>
    </form>
  );
}
