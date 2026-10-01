'use client';
import { useState } from 'react';
import { PencilLine } from 'lucide-react';

/** A concrete writing exercise. The preview is assembled text, never a model response. */
export function InstructionPractice() {
  const [task, setTask] = useState('');
  const [audience, setAudience] = useState('');
  const [format, setFormat] = useState('');
  const complete = Boolean(task && audience && format);
  return (
    <section className="playground-widget instruction-practice" aria-labelledby="practice-title">
      <div className="playground-top">
        <span>
          <PencilLine size={18} />
          <b id="practice-title">תרגיל קצר: מה בדיוק לבקש מה־AI?</b>
        </span>
        <span className="simulation-label">תרגול כתיבה · ללא שליחה ל־AI</span>
      </div>
      <p>״תכתוב לי משהו״ היא בקשה עמומה. בחר שלושה פרטים וראה איך נוצרת בקשה ברורה יותר.</p>
      <div className="practice-fields">
        <label className="field-label">
          1. מה המשימה?
          <select value={task} onChange={(e) => setTask(e.target.value)}>
            <option value="">בחר משימה</option>
            <option value="הסבר מהי אוטומציה">להסביר מהי אוטומציה</option>
            <option value="נסח הודעה על שעות הפעילות של העסק">לנסח הודעה על שעות הפעילות</option>
            <option value="הכן רשימת שאלות לפגישת היכרות עם לקוח">
              להכין שאלות לפגישה עם לקוח
            </option>
          </select>
        </label>
        <label className="field-label">
          2. למי התשובה מיועדת?
          <select value={audience} onChange={(e) => setAudience(e.target.value)}>
            <option value="">בחר קהל</option>
            <option value="למתחיל ללא רקע טכני">למתחיל ללא רקע טכני</option>
            <option value="לבעל עסק קטן">לבעל עסק קטן</option>
            <option value="לצוות שירות לקוחות">לצוות שירות לקוחות</option>
          </select>
        </label>
        <label className="field-label">
          3. איך להציג אותה?
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">בחר מבנה</option>
            <option value="בשלוש נקודות קצרות">שלוש נקודות קצרות</option>
            <option value="בפסקה קצרה ובדוגמה אחת">פסקה קצרה ודוגמה אחת</option>
            <option value="ברשימה של חמישה סעיפים">רשימה של חמישה סעיפים</option>
          </select>
        </label>
      </div>
      <div className="notice" role="status" aria-live="polite">
        <strong>הבקשה שהרכבת:</strong>
        <p>
          {complete
            ? `${task} ${audience}, ${format}. אל תמציא פרטים שלא נמסרו; אם חסר מידע, שאל אותי.`
            : 'בחר משימה, קהל ומבנה כדי לראות את הבקשה המלאה.'}
        </p>
      </div>
      <p className="playground-disclosure">
        הטקסט מורכב מהבחירות שלך. זו אינה תשובת AI. בקשה ברורה עוזרת להגדיר את המשימה, אך אינה
        מבטיחה תשובה נכונה.
      </p>
    </section>
  );
}
