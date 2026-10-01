import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { registrationDirectory } from '@/lib/admin/directory';
import { getConnection } from '@/lib/db/connection';
import { mailConfigured } from '@/lib/mail/delivery';
export const metadata = { title: 'ניהול משתמשים' };
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await requireUser();
  if (!isOperator(user)) notFound();
  const query = await searchParams;
  const page = /^\d+$/.test(query.page || '')
    ? Math.min(100000, Math.max(1, Number(query.page)))
    : 1;
  const directory = registrationDirectory(getConnection(), user, page);
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ניהול המערכת</p>
          <h1>המשתמשים שנרשמו</h1>
          <p>
            {directory.total} חשבונות · עמוד {page} מתוך {directory.pages}
          </p>
        </div>
      </div>
      <Link className="button secondary" href="/admin/reviews">
        לבדיקת ראיות הלומדים
      </Link>
      <div className="notice">
        {mailConfigured()
          ? 'שליחת מיילים מוגדרת. הגדרה אינה מוכיחה שהודעה הגיעה לתיבת הדואר.'
          : 'שליחת מיילים עדיין אינה מוגדרת. החשבונות המקומיים נשמרים, אך כתובת שלא אומתה אינה מוכיחה בעלות על המייל.'}{' '}
        הרשימה מיועדת לניהול השירות בלבד; אין הרשאה לשלוח דיוור שיווקי ללא הסכמה.
      </div>
      <div className="card directory-table">
        <table>
          <caption>פרטי הרשמה והתקדמות כללית</caption>
          <thead>
            <tr>
              <th scope="col">שם</th>
              <th scope="col">כתובת דוא״ל</th>
              <th scope="col">אימות כתובת</th>
              <th scope="col">נרשם בתאריך</th>
              <th scope="col">תרגילים שסומנו כהושלמו</th>
              <th scope="col">הגשות</th>
            </tr>
          </thead>
          <tbody>
            {directory.accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>
                  <bdi>{account.email}</bdi>
                </td>
                <td>{account.emailVerified ? 'אומת' : 'טרם אומת'}</td>
                <td>
                  {new Date(account.createdAt).toLocaleDateString('he-IL', {
                    timeZone: 'Asia/Jerusalem',
                  })}
                </td>
                <td>{account.builds}</td>
                <td>{account.submissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="auth-options" aria-label="עמודי משתמשים">
        {page > 1 && <Link href={`/admin?page=${page - 1}`}>העמוד הקודם</Link>}
        {page < directory.pages && <Link href={`/admin?page=${page + 1}`}>העמוד הבא</Link>}
      </nav>
    </div>
  );
}
