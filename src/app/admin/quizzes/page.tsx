import Link from '@/components/workspace-navigation';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { quizReviewStore } from '@/lib/quizzes/review-store';
import { operatorQuizDraft } from '@/lib/quizzes/draft';
import { QuizBankReview } from '@/components/quiz-bank-review';
import '../curriculum/curriculum.css';
import './quizzes.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'בדיקת שאלות לתרגול' };
export default async function QuizReview() {
  const user = await requireUser();
  if (!isOperator(user)) notFound();
  const store = quizReviewStore(user),
    draft = operatorQuizDraft(user);
  return (
    <div className="page curriculum-review-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">עריכת הקורס</p>
          <h1>בדיקת שאלות לתרגול</h1>
          <p>בודקים כל שאלה מול השיעור והמקורות, ורק לאחר מכן מפרסמים את המאגר ללומדים.</p>
        </div>
      </div>
      <nav className="auth-options" aria-label="ניהול תוכן">
        <Link href="/admin">לניהול המערכת</Link>
        <Link href="/admin/curriculum">לבדיקת עדכונים לקורס</Link>
      </nav>
      <QuizBankReview
        initial={{
          ...store.list(),
          status: store.status(),
          draft: {
            hash: draft.hash,
            version: draft.bank.version,
            curriculumVersion: draft.bank.curriculumVersion,
            questionCount: draft.bank.quizzes.length,
          },
        }}
      />
    </div>
  );
}
