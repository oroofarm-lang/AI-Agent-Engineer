import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { he } from '@/lib/i18n/he';
import { learningPath, canStudyLesson } from '@/lib/domain/learning-path';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  return {
    title: getCurriculum().modules?.find((topic) => topic.id === moduleId)?.title ?? 'פרק לא נמצא',
  };
}
export default async function Topic({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const c = getCurriculum();
  const topic = c.modules?.find((item) => item.id === moduleId);
  if (!topic) notFound();
  const records = (await getRepository()).progress();
  const path = learningPath(c, records);
  return (
    <div className="page narrow">
      <Link href="/topics" className="text-link">
        <ArrowRight size={16} />
        לספריית הפרקים
      </Link>
      <div className="page-heading">
        <div>
          <p className="eyebrow" dir="ltr">
            {topic.id}
          </p>
          <h1>{topic.title}</h1>
          <p className="muted">{topic.description}</p>
        </div>
      </div>
      <div className="notice">
        {topic.id === path.core.id ? (
          <>
            <strong>פרק חובה לכל מי שמתחיל.</strong> לומדים לפי הסדר. הבנייה הושלמה ב־{path.built}{' '}
            מתוך {topic.lessonIds.length} יחידות. סימון שהתרגיל נבנה אינו מוכיח שליטה בנושא.
          </>
        ) : !path.ready ? (
          <>
            אפשר לעיין בתוכנית הפרק עכשיו. כדי להתחיל יחידות חדשות צריך להשלים את תרגילי{' '}
            <Link href="/topics/CORE">פרק היסודות</Link>. ההתקדמות הקודמת שלך נשמרה.
          </>
        ) : (
          'פרק היסודות הושלם. אפשר להתחיל את ההתמחות ולתרגל לפי הסדר.'
        )}
      </div>
      <section className="card topic-outcome">
        <h2>מה תבנה בפרק?</h2>
        <p>{topic.outcome}</p>
        <p>
          זמן מתוכנן: כ־
          {Math.round(
            topic.lessonIds.reduce(
              (total, id) => total + (c.lessons.find((l) => l.id === id)?.estimatedMinutes ?? 0),
              0,
            ) / 60,
          )}{' '}
          שעות. זו הערכת זמן לתרגול, ולא הבטחה לקצב למידה או לשליטה.
        </p>
        {topic.prerequisiteModuleIds.length > 0 && (
          <p>
            מומלץ ללמוד קודם:{' '}
            {topic.prerequisiteModuleIds.map((id, index) => (
              <span key={id}>
                {index ? ' · ' : ''}
                <Link href={`/topics/${id}`}>{c.modules?.find((m) => m.id === id)?.title}</Link>
              </span>
            ))}
            .
          </p>
        )}
      </section>
      <section className="card" aria-label="יחידות הפרק">
        {topic.lessonIds.map((id, index) => {
          const lesson = c.lessons.find((item) => item.id === id)!;
          const record = records.find((item) => item.lessonId === id);
          return (
            <Link key={id} href={`/learn/${id}?module=${topic.id}`} className="lesson-row">
              <span className="day-number active">
                {record?.buildCompletedAt ? (
                  <Check size={16} />
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
              </span>
              <span className="row-title">
                {lesson.title}
                <small>
                  {canStudyLesson(c, records, lesson)
                    ? he.states[record?.state ?? 'NOT_STARTED']
                    : 'צריך להשלים קודם את פרק היסודות'}{' '}
                  · {lesson.contentStage === 'guided-lesson' ? 'שיעור מודרך' : 'חוברת תרגול'}
                </small>
              </span>
              <ArrowLeft size={16} />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
