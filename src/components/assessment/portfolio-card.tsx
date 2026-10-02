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
