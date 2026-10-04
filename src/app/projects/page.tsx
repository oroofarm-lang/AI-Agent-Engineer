import Link from '@/components/workspace-navigation';
import { getCurriculum, getRepository, getLearningSystem } from '@/lib/data';
import { projectCatalog } from '@/lib/domain/projects';
import { he } from '@/lib/i18n/he';
export const metadata = { title: 'פרויקטים מעשיים' };
export default async function Projects() {
  const c = getCurriculum(),
    progress = (await getRepository()).progress(),
    workspaces = (await getLearningSystem()).workspaces();
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">מהתרגיל לתיק העבודות</p>
          <h1>הפרויקטים שלך</h1>
          <p>בונים פתרון, בודקים אותו ומתעדים למה בחרנו בו.</p>
        </div>
      </div>
      <div className="skills-grid">
        {projectCatalog(c).map((lesson) => (
          <article className="card settings-card" key={lesson.id}>
            <p className="eyebrow">יום {lesson.day}</p>
            <h2>{lesson.title}</h2>
            <p>
              {he.states[progress.find((p) => p.lessonId === lesson.id)?.state ?? 'NOT_STARTED']}
            </p>
            {workspaces.some((w) => w.lesson_id === lesson.id) && <p>יש תיעוד שמור לפרויקט</p>}
            <Link className="button secondary" href={`/projects/${lesson.id}`}>
              להוראות ולתיעוד הפרויקט
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
