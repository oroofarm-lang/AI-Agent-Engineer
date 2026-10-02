import Link from 'next/link';
import { getAssessmentRepository, getCurriculum, getLearningSystem } from '@/lib/data';
import { assessmentSchema } from '@/lib/curriculum/assessment';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'עץ מיומנויות' };
export default async function Skills({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string; q?: string }>;
}) {
  const c = getCurriculum(),
    params = await searchParams;
  const system = await getLearningSystem(),
    mastery = system.mastery(),
    reviews = system.reviews();
  const domains = [...new Set(c.skills.map((s) => s.domain))];
  const domain = domains.includes(params.domain ?? '') ? params.domain : '';
  const q = typeof params.q === 'string' ? params.q.trim().slice(0, 100) : '';
  const skills = c.skills.filter(
    (s) =>
      (!domain || s.domain === domain) &&
      (!q || `${s.name} ${s.description} ${s.domain}`.toLowerCase().includes(q.toLowerCase())),
  );
  const pending = (await getAssessmentRepository())
    .attempts()
    .filter((a) => !reviews.some((r) => r.submission_id === a.id))
    .flatMap((a) =>
      assessmentSchema.parse(JSON.parse(a.rubricSnapshot)).criteria.map((c) => c.skillId),
    );
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE ENGINEERING SKILL TREE</p>
          <h1>איך היכולות מתחברות?</h1>
          <p className="muted">
            {c.skills.length} מיומנויות · תנאים מוקדמים · שיעורים רלוונטיים · ראיות מעשיות
          </p>
        </div>
      </div>
      <div className="notice">
        רמות השליטה: 0 — אין מספיק ראיות להערכת היכולת; 1 — הבנה; 2 — מימוש בעזרת מקורות; 3 — תכנון
        ואיתור תקלות באופן עצמאי. הרמה מתעדכנת רק לאחר שבודק אנושי העריך את העבודה שהוגשה. קריאה
        והגשה בלבד אינן מעלות אותה.
      </div>
      <form className="skill-filter" action="/skills">
        <label>
          חיפוש מיומנות
          <input
            name="q"
            defaultValue={q}
            maxLength={100}
            placeholder="למשל: Python, Memory, RAG"
          />
        </label>
        <label>
          תחום
          <select name="domain" defaultValue={domain}>
            <option value="">כל התחומים</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <button className="button secondary">סינון</button>
        <Link href="/skills" className="text-link">
          איפוס סינון
        </Link>
      </form>
      <p className="muted" role="status">
        {skills.length} מיומנויות בתוצאות
      </p>
      <div className="skills-grid">
        {skills.map((skill) => {
          const downstream = c.skills.filter((s) => s.prerequisiteSkillIds.includes(skill.id));
          const lessons = c.lessons.filter((l) => l.skillIds.includes(skill.id));
          const demonstrated = mastery.find((m) => m.skill_id === skill.id);
          const skillLink = (id: string) => (
            <Link key={id} href={`/skills#${id}`}>
              {c.skills.find((s) => s.id === id)?.name}
            </Link>
          );
          return (
            <details className="card skill-card" id={skill.id} key={skill.id}>
              <summary>
                <span>
                  <small>{skill.domain}</small>
                  <strong dir="ltr">{skill.name}</strong>
                </span>
                <span className="planned-tag">
                  {demonstrated ? `רמה ${demonstrated.level}` : 'טרם נקבעה רמה'}
                </span>
              </summary>
              <div className="skill-detail">
                <p>{skill.description}</p>
                {demonstrated && (
                  <p>
                    הרמה נקבעה בהערכה אנושית של עבודה שהוגשה בגרסת תוכנית הלימודים{' '}
                    {demonstrated.curriculum_version}.{' '}
                    <Link href="/assessments">לראיות ולמשוב</Link>
                  </p>
                )}
                {pending.includes(skill.id) && (
                  <p className="available-tag">יש ראיות שממתינות להערכה</p>
                )}
                <h3>תנאים מוקדמים</h3>
                <div className="skill-relations">
                  {skill.prerequisiteSkillIds.length ? (
                    skill.prerequisiteSkillIds.map(skillLink)
                  ) : (
                    <span className="muted">לא הוגדרו כאן מיומנויות שצריך ללמוד קודם.</span>
                  )}
                </div>
                <h3>מיומנויות המשך</h3>
                <div className="skill-relations">
                  {downstream.length ? (
                    downstream.map((s) => skillLink(s.id))
                  ) : (
                    <span className="muted">לא הוגדרו כאן מיומנויות שלומדים בהמשך.</span>
                  )}
                </div>
                <h3>שיעורים רלוונטיים</h3>
                <ul className="skill-lessons">
                  {lessons.map((l) => (
                    <li key={l.id}>
                      <Link href={`/learn/${l.id}`}>
                        <span>
                          {l.day ? `יום ${l.day} · ` : ''}
                          {l.title}
                        </span>
                        <small>
                          {l.publicationStatus === 'published' ? 'שיעור זמין' : 'תוכנית בלבד'}
                        </small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="muted tiny">
                  לפרויקטים מעשיים, פתח את <Link href="/projects">ספריית הפרויקטים</Link>.
                </p>
              </div>
            </details>
          );
        })}
      </div>
      {!skills.length && (
        <div className="card settings-card">
          <h2>לא נמצאו מיומנויות</h2>
          <Link href="/skills" className="text-link">
            הצגת כל המיומנויות
          </Link>
        </div>
      )}
    </div>
  );
}
