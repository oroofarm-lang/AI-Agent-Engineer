import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { getConnection } from '@/lib/db/connection';
import { auditorStore } from '@/lib/auditor/store';
import { CurriculumReview } from '@/components/curriculum-review';
import './curriculum.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'בדיקת עדכונים לקורס' };
export default async function CurriculumUpdates() {
  const user = await requireUser();
  if (!isOperator(user)) notFound();
  const store = auditorStore(getConnection(), user);
  return (
    <div className="page curriculum-review-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">עריכת הקורס</p>
          <h1>בדיקת עדכונים לקורס</h1>
          <p>משווים את הנוסח, בודקים את המקורות ומאשרים גרסה חדשה לפני שהלומדים רואים שינוי.</p>
        </div>
      </div>
      <nav className="auth-options" aria-label="ניהול תוכן">
        <Link href="/admin">לניהול המערכת</Link>
        <Link href="/updates">לעדכונים שנאספו ממקורות רשמיים</Link>
      </nav>
      <CurriculumReview initialContext={store.context()} initialProposals={store.list()} />
    </div>
  );
}
