import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
export const metadata = { title: 'מפת הפיתוח' };
const phases = [
  {
    n: '01',
    title: 'תשתית וסביבת למידה',
    status: 'גרסת בסיס זמינה',
    body: 'לוח בקרה, 14 פרקים ו־139 יחידות עם תוכן ותרגול, מחווני ראיות, התקדמות לפי חשבון וייצוא. בדיקת המקורות והרצת החיבורים החיצוניים עדיין אינן מלאות.',
  },
  {
    n: '02',
    title: 'מערכת למידה והוכחת שליטה',
    status: 'מערכת למידה זמינה',
    body: 'פרק יסודות נדרש, עץ מיומנויות, הגשת עבודות והערכה אנושית, פרויקטים, מבחנים מסכמים, יומן ותיעוד תקלות. הבדיקות מכסות שמירה לפי חשבון, מחוונים והיסטוריית גרסאות. ההדרכה המפורטת מורחבת בהדרגה.',
  },
  {
    n: '03',
    title: 'AI Mentor',
    status: 'המימוש זמין · נדרש חיבור לספק',
    body: 'שיחות שמורות לפי משתמש ושיעור, הקשר מהקורס, בחירה של קוד והערות, מצבי עזרה ומגבלות בקשות. נדרשים מפתח ומודל בצד השרת ובדיקת תשובה אמיתית; ללא הגדרות אין יצירת תשובות.',
  },
  {
    n: '04',
    title: 'Curriculum Auditor',
    status: 'מתוכנן',
    body: 'רישום טכנולוגיות, בדיקת מקורות, הצעות שינוי עם ראיות, סקירת הבדלים ואישור אנושי. עדכון גרסאות עם שימור התקדמות ויכולת חזרה לאחור.',
  },
  {
    n: '05',
    title: 'ליטוש ואימות מקיף',
    status: 'מתוכנן',
    body: 'חיפוש, תפריט פקודות, מסלול מותאם, בדיקות נגישות ורספונסיביות, הרחבת הבדיקות ותיעוד מלא.',
  },
];
export default async function Roadmap() {
  if (!isOperator(await requireUser())) notFound();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">BUILT IN INCREMENTS</p>
          <h1>מערכת רצינית, שלב אחרי שלב.</h1>
          <p className="muted">מפת הפיתוח מציגה את שלבי הפיתוח ואת היכולות הזמינות והמתוכננות.</p>
        </div>
      </div>
      <div className="roadmap-list">
        {phases.map((p) => (
          <section className="card phase-card" key={p.n}>
            <span className="phase-number">{p.n}</span>
            <div>
              <span className={p.n === '01' ? 'available-tag' : 'planned-tag'}>{p.status}</span>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
