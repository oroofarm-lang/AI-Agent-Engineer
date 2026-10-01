'use client';
import { useActionState, useState } from 'react';
import { saveReflection, saveFailureCase } from '@/app/reflections/actions';
import {
  journalFields,
  failureFields,
  failureCategories,
  categoryLabels,
  type ReflectionKind,
} from '@/lib/domain/reflections';
type Choice = { id: string; title: string };
export function ReflectionForm({
  kind,
  id,
  revision = 0,
  values = {},
  lessons,
  skills,
}: {
  kind: ReflectionKind;
  id: string;
  revision?: number;
  values?: Record<string, string>;
  lessons: Choice[];
  skills: Choice[];
}) {
  const [result, action, pending] = useActionState(saveReflection.bind(null, kind), {
    ok: true,
    message: '',
  });
  const [entryId] = useState(id);
  const fields = kind === 'journal' ? journalFields : failureFields;
  return (
    <form action={action} className="card settings-card reflection-form">
      <h2>
        {revision || result.revision
          ? 'עריכת הרשומה'
          : kind === 'journal'
            ? 'רשומה חדשה ביומן'
            : 'תיעוד תקלה חדשה'}
      </h2>
      <p>
        תעד מה קרה בפועל. אפשר לכתוב ״עדיין לא ידוע״ ולתאר איך תבדוק זאת. אל תצרף סודות או מידע אישי
        של לקוחות.
      </p>
      <input type="hidden" name="id" value={entryId} />
      <input type="hidden" name="revision" value={result.revision ?? revision} />
      <label className="field-label">
        כותרת
        <input name="title" defaultValue={values.title} required minLength={3} maxLength={160} />
      </label>
      <label className="field-label">
        שיעור קשור · רשות
        <select name="lessonId" defaultValue={values.lessonId || ''}>
          <option value="">ללא שיעור מסוים</option>
          {lessons.map((item) => (
            <option value={item.id} key={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      {kind === 'failure' && (
        <>
          <label className="field-label">
            סוג התקלה
            <select name="category" defaultValue={values.category || 'FALSE_ASSUMPTION'}>
              {failureCategories.map((id) => (
                <option key={id} value={id}>
                  {categoryLabels[id]}
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            מיומנות קשורה · רשות
            <select name="skillId" defaultValue={values.skillId || ''}>
              <option value="">ללא מיומנות מסוימת</option>
              {skills.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {fields.map(([name, label]) => (
        <label className="field-label" key={name}>
          {label}
          <textarea
            name={name}
            defaultValue={values[name]}
            required={name !== 'testCreated'}
            minLength={name !== 'testCreated' ? 10 : undefined}
            maxLength={name === 'testCreated' ? 3000 : 12000}
            rows={3}
          />
        </label>
      ))}
      <button className="button primary" disabled={pending}>
        {pending ? 'שומר…' : 'שמירת הרשומה'}
      </button>
      <p role="status">{pending ? 'שומר את השינויים…' : result.message}</p>
      {result.ok && result.revision && (
        <a href={kind === 'journal' ? '/journal' : '/failures'}>פתיחת טופס לרשומה נוספת</a>
      )}
    </form>
  );
}
export function FailureCaseForm({ failureId, id }: { failureId: string; id: string }) {
  const [result, action, pending] = useActionState(saveFailureCase, { ok: true, message: '' });
  return (
    <form action={action} className="reflection-form">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="failureId" value={failureId} />
      <label className="field-label">
        סוג הבדיקה
        <select name="kind">
          <option value="REGRESSION">בדיקה למניעת חזרת התקלה</option>
          <option value="EVAL">מקרה להערכת איכות</option>
          <option value="SECURITY">בדיקת אבטחה</option>
          <option value="EDGE_CASE">מקרה חריג</option>
        </select>
      </label>
      <label className="field-label">
        הקלט או התנאים לבדיקה
        <textarea name="input" required minLength={10} maxLength={12000} rows={3} />
      </label>
      <label className="field-label">
        התוצאה המצופה
        <textarea name="expected" required minLength={10} maxLength={12000} rows={3} />
      </label>
      <button
        className="button secondary"
        disabled={pending || (result.ok && Boolean(result.message))}
      >
        {pending ? 'שומר…' : 'שמירת מקרה בדיקה'}
      </button>
      <p role="status">{result.message}</p>
    </form>
  );
}
