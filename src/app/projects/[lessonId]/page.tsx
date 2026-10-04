import Link from '@/components/workspace-navigation';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCurriculum, getLearningSystem, getRepository } from '@/lib/data';
import { readCatalogLesson } from '@/lib/curriculum/load';
import { isProject } from '@/lib/domain/projects';
import { canStudyLesson } from '@/lib/domain/learning-path';
import { CodeBlock } from '@/components/code-block';
import { ProjectWorkspace } from '@/components/project-controls';
export const metadata = { title: 'תכנון ותיעוד הפרויקט' };
export default async function Project({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params,
    c = getCurriculum(),
    lesson = c.lessons.find((l) => l.id === lessonId && isProject(l));
  if (!lesson) notFound();
  const repo = await getRepository(),
    allowed = canStudyLesson(c, repo.progress(), lesson),
    workspace = (await getLearningSystem()).workspaces().find((w) => w.lesson_id === lessonId);
  const sections = readCatalogLesson(c, lessonId)
    .split(/^## /m)
    .filter(Boolean)
    .map((part) => ({ name: part.split('\n')[0], body: part.slice(part.indexOf('\n') + 1) }));
  const labels: Record<string, string> = {
    Mission: 'מה בונים ולשם מה?',
    'Build First': 'דרישות ושלבי העבודה',
    Concepts: 'המושגים שנשתמש בהם',
    'Mental Model': 'תכנון התהליך',
    'Deep Dive': 'החלטות תכנון',
    'Failure Lab': 'בדיקות ותקלות',
    Challenge: 'הרחבה עצמאית',
    'Mastery Check': 'איך בודקים את התוצר?',
    Documentation: 'מקורות לעבודה',
  };
  return (
    <div className="page narrow">
      <Link className="text-link" href="/projects">
        חזרה לפרויקטים
      </Link>
      <h1>{lesson.title}</h1>
      <p>
        זהו פרויקט מתוך מסלול הלמידה. הדוגמאות מיועדות לתרגול; אין לחבר נתוני לקוח אמיתי בלי התאמות
        ובדיקות.
      </p>
      {!allowed ? (
        <div className="notice">
          כדי להתחיל לעבוד, השלם את תרגילי <Link href="/topics/CORE">פרק היסודות</Link>.
        </div>
      ) : (
        <div className="auth-options">
          <Link className="button primary" href={`/learn/${lessonId}`}>
            לשיעור ולהגשת הראיות
          </Link>
          <a className="button secondary" href={`/api/projects/${lessonId}/starter`} download>
            הורדת תוכנית עבודה לפרויקט
          </a>
        </div>
      )}
      {sections
        .filter((s) => labels[s.name])
        .map((s) => (
          <details className="card verification-card" key={s.name}>
            <summary>{labels[s.name]}</summary>
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{ pre: ({ children }) => <CodeBlock>{children}</CodeBlock> }}
              >
                {s.body}
              </ReactMarkdown>
            </div>
          </details>
        ))}
      {allowed && <ProjectWorkspace lessonId={lessonId} workspace={workspace} />}
      <div className="auth-options">
        <Link href={`/journal?lesson=${lessonId}`}>לתיעוד ביומן</Link>
        <Link href="/failures">לתיעוד תקלה ובדיקה</Link>
      </div>
    </div>
  );
}
