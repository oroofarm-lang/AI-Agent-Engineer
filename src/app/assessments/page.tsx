import Link from 'next/link';
import { getAssessmentRepository, getCurriculum, getLearningSystem } from '@/lib/data';
import { assessmentSchema } from '@/lib/curriculum/assessment';
import { z } from 'zod';
import { requireUser } from '@/lib/auth/session';
import { getConnection } from '@/lib/db/connection';
import { artifactRepository } from '@/lib/db/artifacts';
import { portfolioRepository } from '@/lib/db/portfolio';
import { PortfolioToggle } from '@/components/assessment/portfolio-toggle';
import { ArtifactLinks } from '@/components/assessment/artifact-links';
import { EvaluationPanel } from '@/components/assessment/evaluation-panel';
import { evaluationRepository } from '@/lib/agents/evaluate';
import { mentorConfiguration } from '@/lib/ai/provider';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'העבודות והמשוב שלי' };
export default async function Assessments() {
  const user = await requireUser(),
    connection = getConnection();
  const files = artifactRepository(connection, user.id).metadata(),
    portfolio = portfolioRepository(connection, user.id).entries();
  const c = getCurriculum(),
    attempts = (await getAssessmentRepository()).attempts(),
    reviews = (await getLearningSystem()).reviews();
  const evaluations = evaluationRepository(connection, user.id).list();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVIDENCE BEFORE MASTERY</p>
          <h1>העבודות והמשוב שלי</h1>
          <p className="muted">כאן תמצא את העבודות שהגשת ואת המשוב שקיבלת. כל הגשה נשמרת בנפרד.</p>
        </div>
      </div>
      <div className="notice">
        בודק מורשה יכול להעריך את הראיות לפי המחוון. הגשה לבדה אינה מוכיחה שליטה בנושא, והקוד אינו
        מורץ כאן.
      </div>
      {attempts.length === 0 ? (
        <section className="card settings-card">
          <h2>עדיין אין הגשות</h2>
          <p>
            מתחילים בתרגיל בפרק היסודות. לאחר שתסיים, צרף את העבודה ואת ההסבר שלך לפי ההוראות
            בשיעור.
          </p>
          <Link
            href={`/learn/${c.modules?.find((chapter) => chapter.requiredEntry)?.lessonIds[0] || c.lessons[0].id}#assessment`}
            className="button primary"
          >
            למחוון המעשי הראשון
          </Link>
        </section>
      ) : (
        <div className="attempt-list">
          {attempts.map((attempt) => {
            const rubric = assessmentSchema.parse(JSON.parse(attempt.rubricSnapshot));
            const evidence = z.record(z.string(), z.string()).parse(JSON.parse(attempt.evidence));
            const review = reviews.find((r) => r.submission_id === attempt.id);
            const feedback = review
              ? (JSON.parse(review.criteria) as Record<string, { level: number; feedback: string }>)
              : null;
            return (
              <details className="card attempt" key={attempt.id}>
                <summary>
                  <span>{rubric.title}</span>
                  <span className="planned-tag">
                    {review?.outcome === 'PASS'
                      ? 'העבודה עמדה בדרישות המחוון'
                      : review?.outcome === 'REVISE'
                        ? 'נדרש שיפור'
                        : 'ממתינה להערכה'}
                  </span>
                  <time dateTime={attempt.submittedAt}>
                    {new Intl.DateTimeFormat('he-IL', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'Asia/Jerusalem',
                    }).format(new Date(attempt.submittedAt))}
                  </time>
                </summary>
                <div className="attempt-body">
                  <p className="muted">
                    תוכנית {attempt.curriculumVersion} · מחוון {attempt.rubricVersion} · תאריך לפי
                    שעון ירושלים
                  </p>
                  {rubric.criteria.map((criterion) => (
                    <section key={criterion.id}>
                      <h3>{criterion.prompt}</h3>
                      <pre className="evidence-text" dir="auto">
                        {evidence[criterion.id]}
                      </pre>
                      <ArtifactLinks
                        files={files.filter(
                          (file) =>
                            file.submission_id === attempt.id && file.criterion_id === criterion.id,
                        )}
                      />
                      {feedback && (
                        <div className="notice">
                          <p>רמה {feedback[criterion.id].level} בסעיף · הערכה אנושית</p>
                          <p className="reflection-text">{feedback[criterion.id].feedback}</p>
                        </div>
                      )}
                    </section>
                  ))}
                  <Link href={`/learn/${attempt.lessonId}#assessment`} className="text-link">
                    חזרה לשיעור והגשת ניסיון נוסף ←
                  </Link>
                  <PortfolioToggle
                    submissionId={attempt.id}
                    included={Boolean(
                      portfolio.find((item) => item.submission_id === attempt.id)?.included,
                    )}
                  />
                  <EvaluationPanel
                    submissionId={attempt.id}
                    files={files.filter((file) => file.submission_id === attempt.id)}
                    criteria={rubric.criteria}
                    ready={mentorConfiguration().ready}
                    initial={evaluations.find((item) => item.submission_id === attempt.id)}
                  />
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
