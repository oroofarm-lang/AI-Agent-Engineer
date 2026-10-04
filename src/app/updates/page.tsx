import Link from '@/components/workspace-navigation';
import { requireUser } from '@/lib/auth/session';
import { isOperator } from '@/lib/admin/access';
import { readKnowledge } from '@/lib/ai/knowledge-store';
import { getCurriculum } from '@/lib/data';
import { KnowledgeRefresh } from '@/components/knowledge-refresh';
import type { KnowledgeSnapshot } from '@/lib/ai/knowledge';
import './updates.css';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'עדכונים בעולם ה־AI' };
type Kind = KnowledgeSnapshot['sources'][number]['kind'];
const kinds: Record<Kind, string> = {
  'framework-release': 'כלים לפיתוח סוכנים',
  'automation-release': 'אוטומציה',
  'model-runtime-release': 'הרצת מודלים',
  news: 'חדשות',
  'model-catalog': 'קטלוג מודלים',
  'api-changelog': 'שינויים ב־API',
};
function date(value: string, day = false) {
  return new Intl.DateTimeFormat('he-IL', {
    timeZone: 'Asia/Jerusalem',
    dateStyle: 'medium',
    ...(day ? {} : { timeStyle: 'short' }),
  }).format(new Date(day ? `${value}T12:00:00Z` : value));
}
export default async function Updates({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const user = await requireUser(),
    snapshot = await readKnowledge(),
    curriculum = getCurriculum();
  const { kind } = await searchParams;
  const selected = typeof kind === 'string' && Object.hasOwn(kinds, kind) ? (kind as Kind) : '';
  const sources = snapshot?.sources.filter((source) => !selected || source.kind === selected) || [];
  return (
    <div className="page knowledge-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">לקריאה ולהתנסות</p>
          <h1>מה חדש בעולם ה־AI?</h1>
          <p className="muted">
            עדכונים משמונה מקורות רשמיים, עם קישורים לשיעורים שיעזרו לך להבין אותם.
          </p>
        </div>
        {isOperator(user) && <KnowledgeRefresh />}
      </div>
      <div className="notice">
        כאן תמצא קישורים לפרסומים ולתיעוד של החברות והכלים. הפרסומים אינם בדיקה של יכולות המערכת.
        לפני שימוש בפרויקט, פתח את המקור ובדוק את ההוראות ואת הזמינות בחשבון שלך.
      </div>
      <form action="/updates" className="skill-filter">
        <label>
          סוג העדכון
          <select name="kind" defaultValue={selected}>
            <option value="">כל העדכונים</option>
            {Object.entries(kinds).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary">סינון עדכונים</button>
        <Link href="/updates" className="text-link">
          כל העדכונים
        </Link>
      </form>
      {snapshot ? (
        <p className="muted">
          ניסיון העדכון האחרון:{' '}
          <time dateTime={snapshot.attemptedAt}>{date(snapshot.attemptedAt)}</time>. איסוף העדכונים
          מתוכנן לימי שני, רביעי ושישי. מועד ניסיון האיסוף מופיע ליד כל מקור.
        </p>
      ) : (
        <div className="card settings-card">
          <h2>עדיין אין עדכונים שנאספו</h2>
          <p>עדיין לא נשמרו תוצאות מאיסוף המקורות. הן יופיעו לאחר ניסיון העדכון הראשון.</p>
        </div>
      )}
      <div className="knowledge-grid">
        {sources.map((source) => (
          <section
            className="card knowledge-source"
            key={source.id}
            aria-labelledby={`source-${source.id}`}
          >
            <p className="eyebrow">{kinds[source.kind]}</p>
            <h2 id={`source-${source.id}`} dir="auto">
              {source.name}
            </h2>
            <p className="muted tiny">
              {source.checkedAt ? (
                <>
                  ניסיון האיסוף האחרון:{' '}
                  <time dateTime={source.checkedAt}>{date(source.checkedAt)}</time>
                </>
              ) : (
                'טרם בוצע ניסיון לאסוף עדכונים מהמקור'
              )}
            </p>
            {source.status !== 'ok' ? (
              <p className="notice">
                {source.status === 'not-checked'
                  ? 'עדיין אין תוצאות מאיסוף המקור הזה.'
                  : 'לא ניתן היה לקרוא את המקור בניסיון העדכון האחרון.'}
              </p>
            ) : !source.items.length ? (
              <p>לא נמצאו פרסומים שמתאימים לתנאי האיסוף.</p>
            ) : (
              <ul className="knowledge-items">
                {source.items.map((item) => (
                  <li key={item.id}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" dir="auto">
                      {item.title}
                      <span className="sr-only"> — נפתח בחלון חדש</span>
                    </a>
                    {(item.publishedAt || item.publishedOn) && (
                      <p className="muted tiny">
                        פורסם ב־
                        <time dateTime={item.publishedAt || item.publishedOn!}>
                          {date(item.publishedAt || item.publishedOn!, Boolean(item.publishedOn))}
                        </time>
                      </p>
                    )}
                    {item.excerpt && (
                      <p className="knowledge-excerpt" dir="auto">
                        {item.excerpt}
                      </p>
                    )}
                    {item.modelRefs && (
                      <details>
                        <summary>דפי מודלים שנמצאו בקטלוג ({item.modelRefs.length})</summary>
                        <p className="muted tiny">
                          הרשימה נאספה מהתיעוד והיא מוגבלת ל־64 דפים. הופעה בקטלוג אינה מבטיחה
                          זמינות בחשבון או תמיכה בכל פעולה.
                        </p>
                        <ul>
                          {item.modelRefs.map((model) => (
                            <li key={model.slug}>
                              <a
                                href={model.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                dir="auto"
                              >
                                {model.title}
                                <span className="sr-only"> — נפתח בחלון חדש</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <details>
              <summary>שיעורים שקשורים למקור</summary>
              <ul>
                {source.lessonIds.map((id) => (
                  <li key={id}>
                    <Link href={`/learn/${id}`}>
                      {curriculum.lessons.find((lesson) => lesson.id === id)?.title || id}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            <a
              className="text-link"
              href={source.endpoint}
              target="_blank"
              rel="noopener noreferrer"
            >
              למקור הרשמי<span className="sr-only"> — נפתח בחלון חדש</span>
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}
