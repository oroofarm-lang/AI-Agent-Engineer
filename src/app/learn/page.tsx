import Link from 'next/link';
import { TopicCatalog } from '@/components/topic-catalog';
import { ArrowLeft, Check } from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { he } from '@/lib/i18n/he';
import { canStudyLesson } from '@/lib/domain/learning-path';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'מסלול הלמידה' };
export default async function Learn() {
  const c = getCurriculum(),
    progress = (await getRepository()).progress();
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE CURRICULUM</p>
          <h1>בונים יכולת, יום אחרי יום.</h1>
          <p className="muted">
            {c.modules?.length} פרקים · {c.lessons.length} יחידות · מתקדמים לפי שליטה
          </p>
        </div>
      </div>
      <div className="notice">
        מתחילים בפרק היסודות. בכל שיעור קוראים הסבר, מתרגלים ובודקים את התוצאה. לאחר השלמת תרגילי
        היסודות נפתחים פרקי ההתמחות.
      </div>
      <TopicCatalog curriculum={c} progress={progress} />
      <details>
        <summary className="legacy-heading">הצגת שיעורי ההנדסה לפי שבועות</summary>
        <nav className="week-jump" aria-label="מעבר לשבוע">
          {c.weeks.map((w) => (
            <a key={w.id} href={`#${w.id}`}>
              שבוע {w.number}
            </a>
          ))}
        </nav>
        <div className="curriculum-grid">
          {c.weeks.map((w) => (
            <section className="card" id={w.id} key={w.id}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">WEEK {String(w.number).padStart(2, '0')}</p>
                  <h2>{w.title}</h2>
                </div>
                <span className="muted tiny">5 ימים</span>
              </div>
              {c.lessons
                .filter((l) => l.week === w.number)
                .map((l) => {
                  const p = progress.find((p) => p.lessonId === l.id);
                  return (
                    <Link href={`/learn/${l.id}`} key={l.id} className="lesson-row">
                      <span
                        className={`day-number ${l.publicationStatus === 'published' ? 'active' : ''}`}
                      >
                        {p?.buildCompletedAt ? <Check size={16} /> : String(l.day).padStart(2, '0')}
                      </span>
                      <span className="row-title" dir="auto">
                        {l.title}
                        <small dir="rtl">
                          {!canStudyLesson(c, progress, l)
                            ? 'נפתח אחרי פרק היסודות'
                            : l.publicationStatus === 'planned'
                              ? 'תוכנית בלבד'
                              : he.states[p?.state ?? 'NOT_STARTED']}
                        </small>
                      </span>
                      <ArrowLeft size={15} />
                    </Link>
                  );
                })}
            </section>
          ))}
        </div>
      </details>
    </div>
  );
}
