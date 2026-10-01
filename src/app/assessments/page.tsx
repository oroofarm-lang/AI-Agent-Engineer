import Link from 'next/link';
import { getAssessmentRepository, getCurriculum, getLearningSystem } from '@/lib/data';
import { assessmentSchema } from '@/lib/curriculum/assessment';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'תיק הראיות' };
export default async function Assessments() {
  const c = getCurriculum(),
    attempts = (await getAssessmentRepository()).attempts(),
    reviews = (await getLearningSystem()).reviews();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVIDENCE BEFORE MASTERY</p>
          <h1>תיק הראיות שלך</h1>
          <p className="muted">כל ניסיון נשמר עם המחוון וגרסת התוכנית שהיו בתוקף בזמן ההגשה.</p>
        </div>
      </div>
      <div className="notice">
        בודק מורשה יכול להעריך את הראיות לפי המחוון. הגשה לבדה אינה מוכיחה שליטה בנושא, ואין בדיקה
        אוטומטית של הקוד.
      </div>
      {attempts.length === 0 ? (
        <section className="card settings-card">
          <h2>עדיין אין הגשות</h2>
          <p>השלם את הבנייה בשיעור הראשון, שחזר את הפרויקט בעצמך וצרף ראיות לכל סעיף במחוון.</p>
          <Link href={`/learn/${c.lessons[0].id}#assessment`} className="button primary">
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
                        : 'ממתין להערכה'}
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
                      {feedback && (
                        <div className="notice">
                          <p>רמה {feedback[criterion.id].level} בקריטריון · הערכה אנושית</p>
                          <p className="reflection-text">{feedback[criterion.id].feedback}</p>
                        </div>
                      )}
                    </section>
                  ))}
                  <Link href={`/learn/${attempt.lessonId}#assessment`} className="text-link">
                    חזרה לשיעור והגשת ניסיון נוסף ←
                  </Link>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
