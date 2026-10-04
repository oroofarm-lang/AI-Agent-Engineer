import { getSession } from '@/lib/auth/session';
import Link from '@/components/workspace-navigation';
import { Zap, ArrowUpLeft } from 'lucide-react';
import { getCurriculum, getRepository } from '@/lib/data';
import { calculateProgress } from '@/lib/domain/progress';
import { learningActivity } from '@/lib/domain/activity';
import { MentorInfo } from '@/components/mentor-info';
import { isOperator } from '@/lib/admin/access';

export async function ActivityHeader() {
  const session = await getSession();
  if (!session)
    return (
      <header className="activity-header public-header">
        <b>AGENT ENGINEER</b>
        <span>מרחב למידה אישי</span>
      </header>
    );
  const c = getCurriculum(),
    records = (await getRepository()).progress();
  const progress = calculateProgress(c.lessons, records),
    activity = learningActivity(records);
  return (
    <header className="activity-header">
      <div className="activity-top">
        <div className="header-location">
          <span className="status-dot" />
          <span>סביבת הלמידה שלך</span>
          <span className="header-slash">/</span>
          <b dir="ltr">AI ENGINEERING</b>
        </div>
        <div className="activity-actions">
          <span className="streak-badge" title="רצף ימים שבהם סיימת תרגיל בנייה · לפי שעון ישראל">
            <Zap size={17} />
            <b>{activity.streak}</b>
            <span>ימי רצף</span>
            <span className="streak-meter" aria-hidden="true">
              {Array.from({ length: 7 }, (_, i) => (
                <i key={i} className={i < Math.min(activity.streak, 7) ? 'is-lit' : ''} />
              ))}
            </span>
          </span>
          <span
            className="xp-badge"
            title="100 XP לכל בנייה שהושלמה. נקודות תרגול אינן ציון שליטה."
          >
            <Zap size={16} />
            <b dir="ltr">SCORE: {String(activity.xp).padStart(5, '0')}</b>
          </span>
          <MentorInfo />
          {isOperator(session.user) && (
            <Link href="/admin" className="text-link">
              ניהול משתמשים
            </Link>
          )}
          <Link href="/settings" className="profile-avatar" aria-label="הפרופיל והנתונים שלי">
            {session.user.name.slice(0, 1)}
            <ArrowUpLeft size={10} />
          </Link>
        </div>
      </div>
      <div className="header-course-progress">
        <span>התקדמות בבנייה</span>
        <progress aria-label="השלמת תרגילי הקורס" value={progress.built} max={progress.total} />
        <b>{progress.buildPercent}%</b>
        <span className="header-progress-caption">
          {progress.built} / {progress.total} תרגילי בנייה
        </span>
      </div>
    </header>
  );
}
