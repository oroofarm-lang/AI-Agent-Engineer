import { randomUUID } from 'node:crypto';
import Link from '@/components/workspace-navigation';
import {
  getCurriculum,
  getRepository,
  getAssessmentRepository,
  getLearningSystem,
} from '@/lib/data';
import { projectCatalog } from '@/lib/domain/projects';
import { canStudyLesson } from '@/lib/domain/learning-path';
import { BossControls } from '@/components/project-controls';
export const metadata = { title: 'מבחנים מסכמים' };
export default async function Boss() {
  const c = getCurriculum(),
    progress = (await getRepository()).progress(),
    system = await getLearningSystem(),
    attempts = system.bosses(),
    reviews = system.reviews(),
    evidence = (await getAssessmentRepository()).attempts();
  return (
    <div className="page narrow">
      <h1>מבחנים מסכמים · Boss Levels</h1>
      <p>
        כאן בונים באופן עצמאי. אפשר להשתמש במקורות ולבקש רמז מהמנטור, אך לא לקבל ממנו פתרון מלא.
        ההנחיה למנטור מגבילה את העזרה; היא אינה מבטיחה שהמודל תמיד יציית.
      </p>
      <p>כל ניסיון נשמר בנפרד. הגשת העבודה אינה מספיקה כדי לעבור במבחן. בודק אנושי צריך להעריך אותה לפי המחוון — רשימת הקריטריונים להערכת העבודה.</p>
      {projectCatalog(c, true).map((lesson) => {
        const own = attempts.filter((a) => a.lesson_id === lesson.id),
          active = own.find((a) => a.state === 'ACTIVE');
        return (
          <section className="card settings-card" key={lesson.id}>
            <h2>{lesson.title}</h2>
            <Link className="text-link" href={`/learn/${lesson.id}`}>
              לאתגר ולמחוון
            </Link>
            {canStudyLesson(c, progress, lesson) ? (
              <BossControls
                key={active?.id || lesson.id}
                id={randomUUID()}
                lessonId={lesson.id}
                active={active}
                evidence={evidence.filter(
                  (e) =>
                    e.lessonId === lesson.id &&
                    e.curriculumVersion === (active?.curriculum_version || c.version) &&
                    !attempts.some((a) => a.submission_id === e.id),
                )}
              />
            ) : (
              <p>
                מתחילים אחרי <Link href="/topics/CORE">פרק היסודות</Link>.
              </p>
            )}
            <ul>
              {own.map((a) => {
                const review = reviews.find((r) => r.submission_id === a.submission_id);
                return (
                  <li key={a.id}>
                    {new Date(a.started_at).toLocaleDateString('he-IL')} · תוכנית{' '}
                    {a.curriculum_version} ·{' '}
                    {a.state === 'ACTIVE'
                      ? 'ניסיון פעיל'
                      : review?.outcome === 'PASS'
                        ? 'עמד בדרישות לפי הערכה אנושית'
                        : review?.outcome === 'REVISE'
                          ? 'נדרש שיפור'
                          : 'ממתין להערכה'}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
