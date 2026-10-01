import { randomUUID } from 'node:crypto';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReflectionForm, FailureCaseForm } from '@/components/reflection-form';
import { getCurriculum, getReflectionRepository } from '@/lib/data';
import { failureFields, categoryLabels } from '@/lib/domain/reflections';
export const metadata = { title: 'תקלות ובדיקות' };
export default async function Failures({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const c = getCurriculum(),
    repo = await getReflectionRepository(),
    entries = repo.failures(),
    cases = repo.cases();
  const { edit } = await searchParams,
    entry = entries.find((item) => item.id === edit);
  if (edit && !entry) notFound();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">מתקלה לבדיקה</p>
          <h1>תקלות ובדיקות</h1>
          <p>תעד את התקלה, הסיבה והתיקון, והגדר בדיקה שתעזור לזהות אותה בעתיד.</p>
        </div>
      </div>
      <ReflectionForm
        key={entry?.id || 'new'}
        kind="failure"
        id={entry?.id || randomUUID()}
        revision={entry?.revision}
        values={entry ? JSON.parse(entry.content) : {}}
        lessons={c.lessons}
        skills={c.skills.map((skill) => ({ id: skill.id, title: skill.name }))}
      />
      <section aria-label="התקלות שלי">
        {!entries.length && <p>עדיין אין תקלות מתועדות. אפשר להתחיל מתקלה שפגשת בתרגיל.</p>}
        {entries.map((item) => {
          const data = JSON.parse(item.content);
          return (
            <details className="card verification-card" key={item.id}>
              <summary>{item.title}</summary>
              <p>
                {categoryLabels[item.category as keyof typeof categoryLabels]} · גרסה{' '}
                {item.revision}
              </p>
              {failureFields.map(([name, label]) => (
                <div key={name}>
                  <h3>{label}</h3>
                  <p className="reflection-text">{data[name] || 'לא נמסר'}</p>
                </div>
              ))}
              <Link href={`/failures?edit=${item.id}`}>עריכת התקלה</Link>
              <h3>מקרים לבדיקה</h3>
              {cases
                .filter((test) => test.failureId === item.id)
                .map((test) => (
                  <div className="notice" key={test.id}>
                    <p>מבוסס על גרסה {test.failureRevision} של תיעוד התקלה · טרם הורץ</p>
                    <p>קלט: {test.input}</p>
                    <p>תוצאה מצופה: {test.expected}</p>
                  </div>
                ))}
              <FailureCaseForm failureId={item.id} id={randomUUID()} />
            </details>
          );
        })}
      </section>
    </div>
  );
}
