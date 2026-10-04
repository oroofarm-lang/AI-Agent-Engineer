import { randomUUID } from 'node:crypto';
import { notFound } from 'next/navigation';
import Link from '@/components/workspace-navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { getConnection } from '@/lib/db/connection';
import { assessmentReviewer } from '@/lib/db/learning-system';
import { assessmentSchema } from '@/lib/curriculum/assessment';
import { ReviewForm } from '@/components/review-form';
import { artifactRepository } from '@/lib/db/artifacts';
import { ArtifactLinks } from '@/components/assessment/artifact-links';
export const metadata = { title: 'בדיקת ראיות' };
export default async function Reviews() {
  const user = await requireUser();
  if (!isOperator(user)) notFound();
  const attempts = assessmentReviewer(getConnection(), user).pending();
  return (
    <div className="page narrow">
      <Link href="/admin" className="text-link">
        לניהול המשתמשים
      </Link>
      <h1>ראיות שממתינות להערכה</h1>
      <p>
        הגשות הלומדים מוצגות כאן לצורך בדיקה אנושית. המערכת אינה מריצה את הקוד ואינה מבצעת בדיקה
        מקצועית במקומך.
      </p>
      <p>מוצגות עד 25 ההגשות הראשונות שעדיין ממתינות לבדיקה. אחרי בדיקתן יוצגו ההגשות הבאות.</p>
      {!attempts.length && <p>אין כרגע הגשות שממתינות לבדיקה.</p>}
      {attempts.map((attempt) => {
        const rubric = assessmentSchema.parse(JSON.parse(attempt.rubric_snapshot)),
          evidence = JSON.parse(attempt.evidence) as Record<string, string>;
        const files = artifactRepository(getConnection(), attempt.user_id).metadata(attempt.id);
        return (
          <details className="card verification-card" key={attempt.id}>
            <summary>
              {attempt.learner_name} · {rubric.title}
            </summary>
            <p>
              תוכנית {attempt.curriculum_version} · מחוון {rubric.version}
            </p>
            {rubric.criteria.map((item) => (
              <section key={item.id}>
                <h3>{item.prompt}</h3>
                <pre className="evidence-text" dir="auto">
                  {evidence[item.id]}
                </pre>
                <ArtifactLinks files={files.filter((file) => file.criterion_id === item.id)} />
              </section>
            ))}
            {attempt.user_id === user.id ? (
              <p>זו הגשה שלך. נדרש בודק מורשה אחר כדי להעריך אותה.</p>
            ) : (
              <ReviewForm id={randomUUID()} submissionId={attempt.id} rubric={rubric} />
            )}
          </details>
        );
      })}
    </div>
  );
}
