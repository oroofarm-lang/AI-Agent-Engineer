import { randomUUID } from 'node:crypto';
import { AssessmentForm } from '@/components/assessment-form';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowRight, ArrowLeft, Clock3 } from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { lessonNavigation } from '@/lib/curriculum/navigation';
import { readCatalogLesson } from '@/lib/curriculum/load';
import { he } from '@/lib/i18n/he';
import { LessonCanvas } from '@/components/learning/lesson-canvas';
import { markdownCards } from '@/lib/curriculum/cards';
import { LessonPre } from '@/components/learning/lesson-pre';
import { ProgressControls, LessonNotes } from '@/components/lesson-controls';
import { canStudyLesson } from '@/lib/domain/learning-path';
import { currentPracticeQuestion, publicPracticeQuestion } from '@/lib/quizzes/release-runtime';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return {
    title: getCurriculum().lessons.find((l) => l.id === lessonId)?.title ?? 'שיעור לא נמצא',
  };
}
export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ module?: string }>;
}) {
  const { lessonId } = await params;
  const c = getCurriculum(),
    lesson = c.lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();
  const repo = await getRepository(),
    p = repo.progress().find((p) => p.lessonId === lessonId),
    published = lesson.publicationStatus === 'published';
  if (!canStudyLesson(c, repo.progress(), lesson))
    return (
      <div className="page narrow">
        <h1>{lesson.title}</h1>
        <section className="card settings-card">
          <h2>מתחילים בפרק היסודות</h2>
          <p>
            היחידה הזו משתמשת במושגים ובכלים שלומדים בפרק החובה. השלם קודם את תרגילי הבסיס כדי
            להתחיל אותה.
          </p>
          <Link href="/topics/CORE" className="button primary">
            לפרק היסודות · חובה למתחילים
          </Link>
          <Link href="/topics" className="text-link">
            לתוכניות הפרקים
          </Link>
        </section>
      </div>
    );
  const sections = published
    ? readCatalogLesson(c, lesson.id)
        .split(/^## /m)
        .filter(Boolean)
        .map((part) => ({
          title: part.slice(0, part.indexOf('\n')).trim(),
          body: part.slice(part.indexOf('\n') + 1),
        }))
    : [];
  const assessment = c.assessments.find((a) => a.lessonId === lesson.id);
  const { module: requestedModule } = await searchParams;
  const { module, next, query } = lessonNavigation(c, lesson, requestedModule);
  return (
    <div className="page lesson-page">
      <Link href={module ? `/topics/${module.id}` : '/learn'} className="text-link">
        <ArrowRight size={16} /> חזרה למסלול
      </Link>
      <div className="page-heading lesson-heading">
        <div>
          <p className="eyebrow">
            {module
              ? `${module.title} · יחידה ${module.lessonIds.indexOf(lesson.id) + 1} מתוך ${module.lessonIds.length}`
              : `יום ${lesson.day}`}
          </p>
          <h1 dir="auto">{lesson.title}</h1>
          <div className="lesson-meta">
            <span>
              <Clock3 size={15} /> עד {lesson.estimatedMinutes} דקות
            </span>
            <span>{published ? he.states[p?.state ?? 'NOT_STARTED'] : 'תוכנית בלבד'}</span>
          </div>
        </div>
      </div>
      <div className="skill-tags">
        {lesson.skillIds.map((id) => (
          <span key={id} dir="ltr">
            {c.skills.find((s) => s.id === id)?.name}
          </span>
        ))}
      </div>
      {published ? (
        <>
          <div className="lesson-launchbar card">
            <ProgressControls lessonId={lesson.id} state={p?.state ?? 'NOT_STARTED'} />
            <a href="#assessment" className="text-link">
              למחוון ולהגשת ראיות ←
            </a>
          </div>
          <LessonCanvas
            key={lesson.id}
            lessonId={lesson.id}
            initialStepId={repo.position(lesson.id)?.stepId}
            steps={sections.flatMap((section, index) =>
              markdownCards(section.body).map((body, part, parts) => ({
                id: `section-${index}-${part}`,
                title:
                  he.sections[section.title] +
                  (parts.length > 1 ? ` · ${part + 1}/${parts.length}` : ''),
                label: he.sections[section.title],
                content: (
                  <div className="prose">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        pre: ({ children }) => <LessonPre>{children}</LessonPre>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {body}
                    </ReactMarkdown>
                  </div>
                ),
              })),
            )}
          >
            {assessment && (
              <AssessmentForm
                assessment={assessment}
                submissionId={randomUUID()}
                curriculumVersion={c.version}
                built={Boolean(p?.buildCompletedAt)}
                practiceQuestion={publicPracticeQuestion(currentPracticeQuestion(c, lesson.id))}
              />
            )}
            <section className="card note-card">
              <LessonNotes lessonId={lesson.id} body={repo.note(lesson.id)} />
            </section>
          </LessonCanvas>
        </>
      ) : (
        <section className="card outline-card">
          <span className="pill">בפיתוח · עדיין לא שיעור מלא</span>
          <h2>תוכנית השיעור המקורית</h2>
          <p className="muted">
            זוהי תוכנית הלימודים מתוך מפרט המקור. התרגול, ההסברים וההערכה המעשית טרם נכתבו. אין
            אפשרות לסמן את השיעור כהושלם.
          </p>
          <div className="source-outline" dir="ltr" lang="en">
            {lesson.outline}
          </div>
        </section>
      )}
      {next && (
        <Link href={`/learn/${next.id}${query}`} className="next-lesson">
          <div>
            <small>
              {query ? 'היחידה הבאה בפרק' : 'היום הבא'} ·{' '}
              {next.publicationStatus === 'planned' ? 'תוכנית בלבד' : 'שיעור זמין'}
            </small>
            <strong dir="auto">{next.title}</strong>
          </div>
          <ArrowLeft size={20} />
        </Link>
      )}
    </div>
  );
}
