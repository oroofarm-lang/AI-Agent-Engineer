import Link from 'next/link';
import { TopicCatalog } from '@/components/topic-catalog';
import { ArrowLeft, Check } from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { he } from '@/lib/i18n/he';
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
        <span className="version-tag" dir="ltr">
          v{c.version}
        </span>
      </div>
      <div className="notice">
        השיעורים זמינים לקריאה ולתרגול, עם מקורות ומחוונים להגשת ראיות. רוב היחידות הן חוברות תרגול
        תמציתיות; מצב בדיקת התוכן והקוד מפורט בכל יחידה.
      </div>
      <TopicCatalog curriculum={c} progress={progress} />
      <h2 className="legacy-heading">המסלול המקורי · 80 ימי הנדסת סוכנים</h2>
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
                        {l.publicationStatus === 'planned'
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
    </div>
  );
}
