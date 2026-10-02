import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpLeft,
  Clock3,
  Code2,
  Layers3,
  GitBranch,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { readLesson } from '@/lib/curriculum/load';
import { calculateProgress } from '@/lib/domain/progress';
import { learningPath, canStudyLesson } from '@/lib/domain/learning-path';
import { AiMascot } from '@/components/learning/ai-mascot';
import { LessonMap } from '@/components/learning/lesson-map';
export const dynamic = 'force-dynamic';
export default async function Dashboard() {
  const c = getCurriculum(),
    records = (await getRepository()).progress();
  const path = learningPath(c, records);
  const lesson = path.next,
    metrics = calculateProgress(c.lessons, records),
    current = records.find((p) => p.lessonId === lesson.id);
  const mission =
    readLesson(lesson.id).split('## Mission')[1].split('## Build First')[0].trim().split('.')[0] +
    '.';
  return (
    <div className="page dashboard neon-dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            <span className="neon-dash" /> PLAYER 01 · READY TO BUILD?
          </p>
          <h1>
            פחות לצפות. <span>יותר לבנות.</span>
          </h1>
          <p className="muted">רעיונות גדולים. צעדים קטנים. יכולות שנשארות איתך.</p>
        </div>
        <Link href="/learn" className="button secondary">
          לכל השיעורים
          <ArrowUpLeft size={16} />
        </Link>
      </div>
      <section className="hero neon-hero">
        <div className="hero-content">
          <div className="hero-meta">
            <span className="pill">
              <span className="status-dot" />{' '}
              {path.ready ? 'ממשיכים להתמחות' : 'מתחילים בפרק היסודות · חובה'}
            </span>
            <span>
              {!path.ready
                ? `יחידה ${path.core.lessonIds.indexOf(lesson.id) + 1} מתוך ${path.core.lessonIds.length}`
                : c.modules?.find((module) => module.lessonIds.includes(lesson.id))?.title}
            </span>
          </div>
          <p className="hero-overline" dir="ltr">
            {lesson.titleEn.toUpperCase()}
          </p>
          <h2>{lesson.title}</h2>
          <p className="hero-description">{mission}</p>
          <div className="hero-tags">
            <span>
              <Clock3 size={15} /> {lesson.estimatedMinutes} דקות · בקצב שלך
            </span>
            <span>
              <Code2 size={15} />{' '}
              {lesson.skillIds.map((id) => c.skills.find((s) => s.id === id)?.name).join(' · ')}
            </span>
          </div>
          <div className="hero-cta">
            <Link
              href={`/learn/${lesson.id}?module=${c.modules?.find((module) => module.lessonIds.includes(lesson.id))?.id}`}
              className="button primary"
            >
              {current?.buildCompletedAt
                ? 'חזרה לשיעור ולראיות'
                : current
                  ? 'ממשיכים לבנות'
                  : 'מתחילים ללמוד'}
              <ArrowLeft size={18} />
            </Link>
            <span className="hero-xp">
              <Sparkles size={15} /> 100 XP להשלמת הבנייה
            </span>
          </div>
          <div className="hero-bottom">
            <span className="hero-mini-icon">
              <Terminal size={13} />
            </span>
            <span>בונים · מבינים · שוברים · מתקנים · מוכיחים</span>
          </div>
        </div>
        <AiMascot />
      </section>
      <section aria-label="מדדי למידה" className="neon-stats">
        <div className="card">
          <span className="stat-icon cyan">
            <Layers3 size={20} />
          </span>
          <div>
            <span>התקדמות בקורס</span>
            <strong>
              {metrics.buildPercent}
              <small>%</small>
            </strong>
            <p>
              הבנייה הושלמה ב־{metrics.built} מתוך {metrics.total} יחידות
            </p>
          </div>
        </div>
        <div className="card">
          <span className="stat-icon violet">
            <GitBranch size={20} />
          </span>
          <div>
            <span>הגשות שממתינות לבדיקה</span>
            <strong>{records.filter((record) => record.state === 'MASTERY_PENDING').length}</strong>
            <p>שליטה מוכחת רק אחרי הערכה נפרדת</p>
          </div>
        </div>
        <div className="card">
          <span className="stat-icon green">
            <Terminal size={20} />
          </span>
          <div>
            <span>פרק היסודות · חובה</span>
            <strong>
              {path.built}
              <small> / {path.core.lessonIds.length}</small>
            </strong>
            <p>
              {path.ready
                ? 'תרגילי הבסיס הושלמו. אפשר לבחור התמחות.'
                : 'מסיימים את תרגילי הבסיס לפני התמחות חדשה.'}
            </p>
          </div>
        </div>
      </section>
      <section className="card learning-journey" aria-labelledby="journey-title">
        <h2 id="journey-title">איך מתקדמים בקורס?</h2>
        <ol>
          <li>
            <strong>1. לומדים את הבסיס</strong>
            <p>מתחילים בפרק החובה: מושגי AI, קוד, נתונים וכלים.</p>
          </li>
          <li>
            <strong>2. בונים ומגישים</strong>
            <p>
              קריאת כרטיס היא צעד בשיעור. השלמת הבנייה נשמרת ומעדכנת את ההתקדמות; הגשה לבדיקה היא
              שלב נפרד.
            </p>
          </li>
          <li>
            <strong>3. בוחרים התמחות</strong>
            <p>אחרי תרגילי הבסיס בוחרים מסלול שמתאים למערכת שרוצים לבנות.</p>
          </li>
        </ol>
        <Link href="/topics/CORE" className="text-link">
          לפרק היסודות ולרשימת השלבים <ArrowLeft size={16} />
        </Link>
      </section>
      <div className="dashboard-path-layout">
        <LessonMap
          lessons={c.lessons}
          weeks={c.weeks}
          records={records}
          lockedIds={c.lessons
            .filter((unit) => !canStudyLesson(c, records, unit))
            .map((unit) => unit.id)}
        />
        <aside className="insight-card card">
          <span className="insight-icon">
            <Sparkles size={23} />
          </span>
          <p className="eyebrow">THE ENGINEER MINDSET</p>
          <h2>
            הקסם הוא
            <br />
            <span>להבין איך זה עובד.</span>
          </h2>
          <p>
            לפני שמוסיפים עוד סוכן, שואלים: האם זה באמת צריך AI? לומדים לבנות מערכות מתוך שיקול דעת.
          </p>
          <Link href="/topics" className="text-link">
            לבחור פרק והתמחות
            <ArrowLeft size={15} />
          </Link>
          <div className="insight-footer">
            <span>{c.modules?.length} פרקים</span>
            <i />
            <span>{c.lessons.length} יחידות</span>
          </div>
        </aside>
      </div>
      <div className="release-footnote">
        <span className="status-dot" />
        <p>{c.lessons.length} יחידות לקריאה ולתרגול · מתחילים ביסודות ומתקדמים לבנייה מעשית</p>
        <Link href="/topics">
          לכל פרקי הקורס
          <ArrowUpLeft size={12} />
        </Link>
      </div>
    </div>
  );
}
