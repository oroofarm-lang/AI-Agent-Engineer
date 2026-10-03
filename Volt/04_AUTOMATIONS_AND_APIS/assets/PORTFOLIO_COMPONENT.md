---
generated: true
schema_version: 1
kind: "asset"
entity_id: "PORTFOLIO_COMPONENT"
curriculum_version: "2.2.0"
source_path: "src/components/assessment/portfolio-card.tsx"
asset_kind: "ui-code"
source_sha256: "1b6143cceaf3a3b4db85b6ce726e5ebbb3f5fcdeca37f30ae7dbc7b76df53cde"
related: ["[[01_AGENTS/Agent-Code-Reviewer]]","[[01_AGENTS/Agent-Database-Architect]]","[[01_AGENTS/Agent-Production-Reliability]]","[[01_AGENTS/Agent-Security-Auditor]]","[[01_AGENTS/Agent-UI-UX-Inspector]]","[[02_CURRICULUM/2.2.0/modules/PRODUCT]]","[[02_CURRICULUM/2.2.0/modules/WEB]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תצוגת תיק העבודות

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/src/components/assessment/portfolio-card.tsx)

סוג הקובץ: `ui-code`. נתיב במאגר הציבורי: `src/components/assessment/portfolio-card.tsx`.

זהו רכיב ממשק מתוך האפליקציה. תמונת מסך או קוד הרכיב אינם תוצאה של בדיקת איכות בפני עצמם.

## תוכן הקובץ הציבורי

```
import Link from 'next/link';
export function PortfolioCard({
  title,
  summary,
  lessonId,
  status,
  fileCount,
  preview = false,
}: {
  title: string;
  summary: string;
  lessonId?: string;
  status: string;
  fileCount: number;
  preview?: boolean;
}) {
  return (
    <article className="portfolio-card card">
      <p className="eyebrow">{preview ? 'כך העבודה תיראה בתיק שלך' : 'העבודה שלי'}</p>
      <h3 dir="auto">{title}</h3>
      <p className="reflection-text" dir="auto">
        {summary || 'עדיין לא נכתב תיאור לעבודה.'}
      </p>
      <div className="portfolio-meta">
        <span className="pill">{status}</span>
        <span>קבצים מצורפים: {fileCount}</span>
        <span>פרטי · רק לך ולבודק מורשה</span>
      </div>
      {lessonId && (
        <Link href={`/learn/${lessonId}#assessment`} className="text-link">
          לשיעור ולדרישות העבודה ←
        </Link>
      )}
    </article>
  );
}

```

## קשרים במפת הידע

- [[01_AGENTS/Agent-Code-Reviewer|קוד וניפוי שגיאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Database-Architect|מסדי נתונים ומצב]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Production-Reliability|פריסה, ניטור ואמינות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-Security-Auditor|אבטחה והרשאות]] — קובץ עזר למומחה
- [[01_AGENTS/Agent-UI-UX-Inspector|ממשק, ניווט ונגישות]] — קובץ עזר למומחה
- [[02_CURRICULUM/2.2.0/modules/PRODUCT|מוצר, שירות ופריסה]] — קובץ עזר לפרק
- [[02_CURRICULUM/2.2.0/modules/WEB|אתרים וכלים פנימיים]] — קובץ עזר לפרק
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
