'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page narrow">
      <h1>לא הצלחנו לטעון את סביבת הלמידה</h1>
      <p>
        נסה לטעון את העמוד שוב. אם התקלה נמשכת, פנה למפעיל הקורס.
      </p>
      <button className="button primary" onClick={reset}>
        ניסיון נוסף
      </button>
    </div>
  );
}
