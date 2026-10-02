import Link from 'next/link';
import { requireUser } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { portfolioRepository } from '@/lib/db/portfolio';
import { artifactRepository } from '@/lib/db/artifacts';
import { PortfolioCard } from '@/components/assessment/portfolio-card';
import { PortfolioToggle } from '@/components/assessment/portfolio-toggle';
import { ArtifactLinks } from '@/components/assessment/artifact-links';
export const metadata = { title: 'תיק העבודות שלי' };
export default async function Portfolio() {
  const user = await requireUser(),
    connection = getConnection(),
    entries = portfolioRepository(connection, user.id).entries(),
    files = artifactRepository(connection, user.id).metadata();
  const included = entries.filter((item) => item.included),
    hidden = entries.filter((item) => !item.included);
  return (
    <div className="page narrow">
      <p className="eyebrow">מהרעיון לעבודה שאפשר להראות</p>
      <h1>תיק העבודות שלי</h1>
      <p>
        העבודות שבחרת לשמור יחד. התיק פרטי; הוא אינו מתפרסם באינטרנט. מצב ההערכה מוצג בכל עבודה.
      </p>
      {!included.length && (
        <section className="card settings-card">
          <h2>התיק שלך מתחיל בעבודה אחת</h2>
          <p>
            בסוף השיעור, בחר לכלול את ההגשה בתיק העבודות. אפשר גם להוסיף הגשה שמורה מהרשימה למטה.
          </p>
          <Link href="/assessments" className="button primary">
            לעבודות שהגשתי
          </Link>
        </section>
      )}
      <div className="portfolio-grid">
        {included.map((item) => (
          <section key={item.submission_id}>
            <PortfolioCard
              title={item.title}
              summary={item.summary}
              lessonId={item.lesson_id}
              fileCount={files.filter((file) => file.submission_id === item.submission_id).length}
              status={
                item.outcome === 'PASS'
                  ? 'עמדה בדרישות המחוון'
                  : item.outcome === 'REVISE'
                    ? 'נדרש שיפור'
                    : 'ממתינה להערכה'
              }
            />
            <ArtifactLinks
              files={files.filter((file) => file.submission_id === item.submission_id)}
            />
            <PortfolioToggle submissionId={item.submission_id} included />
          </section>
        ))}
      </div>
      {hidden.length > 0 && (
        <details className="card settings-card">
          <summary>הגשות ששמרת מחוץ לתיק ({hidden.length})</summary>
          {hidden.map((item) => (
            <section key={item.submission_id}>
              <h3>{item.title}</h3>
              <PortfolioToggle submissionId={item.submission_id} included={false} />
            </section>
          ))}
        </details>
      )}
    </div>
  );
}
