import { requireUser } from '@/lib/auth/session';
import { AccountControls } from '@/components/account-controls';
import { Download, Database, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { mentorConfiguration } from '@/lib/ai/provider';
import { mailConfigured } from '@/lib/mail/delivery';
import { isOperator } from '@/lib/admin/access';
export const metadata = { title: 'הגדרות ונתונים' };
export default async function Settings() {
  const user = await requireUser();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>הנתונים וההגדרות שלך</h1>
          <p className="muted">מרחב אישי עם כניסה מאובטחת, ללא שירות חיצוני לניתוח השימוש.</p>
        </div>
      </div>
      <AccountControls name={user.name} email={user.email} />
      {isOperator(user) && (
        <section className="card settings-card">
          <h2>ניהול המערכת</h2>
          <Link href="/admin" className="button secondary">
            לרשימת המשתמשים שנרשמו
          </Link>
        </section>
      )}
      <section className="card settings-card">
        <Database className="accent" />
        <h2>גיבוי הנתונים</h2>
        <p>
          ייצוא JSON כולל את פרטי הפרופיל, מיקום הקריאה, ההתקדמות, ההערות, הראיות והפניות לגרסאות
          תוכנית הלימודים. קובץ הגיבוי אינו כולל מפתחות API.
        </p>
        <a href="/api/export" className="button primary" download>
          <Download size={17} /> ייצוא הנתונים שלי
        </a>
        <p className="muted tiny">
          ייבוא מתוך הממשק עדיין אינו זמין. שמור גם עותק של תיקיית הנתונים כשהשרת כבוי.
        </p>
      </section>
      <section className="card settings-card" id="connections">
        <KeyRound className="accent" />
        <h2>חיבור המנטור ושליחת מיילים</h2>
        <div className="connection-status">
          <p>
            <strong>AI Mentor:</strong>{' '}
            {mentorConfiguration().ready
              ? 'מפתח ומודל מוגדרים. יש לבדוק תשובה אמיתית לפני פתיחת השירות למשתמשים.'
              : 'עדיין לא פעיל — חסרים מפתח API או שם מודל.'}
          </p>
          <p>
            <strong>מייל:</strong>{' '}
            {mailConfigured()
              ? 'פרטי השליחה מוגדרים. צריך לבדוק חיבור והגעה לתיבת הדואר.'
              : 'עדיין לא פעיל — חסרים פרטי ספק השליחה.'}
          </p>
        </div>
        <p>
          בעל המערכת מגדיר <code dir="ltr">OPENAI_API_KEY</code> ו־<code dir="ltr">AI_MODEL</code>{' '}
          בקובץ <code dir="ltr">.env.local</code> בשרת. משתמשים אינם צריכים למסור מפתח API. אל תכניס
          סודות להערות, לקוד שנשלח למנטור או לצ׳אט.
        </p>
        <p>
          הרשאת ניהול ניתנת רק לכתובת שהמפעיל הגדיר ושאומתה באמצעות מייל. אפשר להמשיך ללמוד ולשמור
          התקדמות גם בלי חיבור AI.
        </p>
      </section>
      <section className="card settings-card">
        <ShieldCheck className="accent" />
        <h2>שמירה לפי חשבון</h2>
        <p>
          הנתונים מופרדים לפי החשבון המחובר ונשמרים במסד של מפעיל השרת. הנתונים נשמרים ב־SQLite,
          והשפה היא עברית כברירת מחדל.
        </p>
      </section>
    </div>
  );
}
