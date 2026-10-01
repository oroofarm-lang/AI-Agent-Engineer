'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page narrow">
      <h1>לא הצלחנו לטעון את סביבת הלמידה</h1>
      <p>
        הנתונים לא אופסו. בהתקנה ראשונה, יש להריץ <code dir="ltr">npm run db:setup</code> ולעיין
        בהוראות ההתקנה.
      </p>
      <button className="button primary" onClick={reset}>
        ניסיון נוסף
      </button>
    </div>
  );
}
