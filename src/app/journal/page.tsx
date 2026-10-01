import { randomUUID } from 'node:crypto';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReflectionForm } from '@/components/reflection-form';
import { getCurriculum, getReflectionRepository } from '@/lib/data';
import { journalFields } from '@/lib/domain/reflections';
export const metadata = { title: 'יומן הלמידה' };
export default async function Journal({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const c = getCurriculum(),
    entries = (await getReflectionRepository()).journals();
  const { edit } = await searchParams,
    entry = entries.find((item) => item.id === edit);
  if (edit && !entry) notFound();
  return (
    <div className="page narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">לומדים מהניסיון</p>
          <h1>יומן הלמידה שלך</h1>
          <p>מה בנית, מה גילית ואיזו החלטה תשנה בפעם הבאה?</p>
        </div>
      </div>
      <ReflectionForm
        key={entry?.id || 'new'}
        kind="journal"
        id={entry?.id || randomUUID()}
        revision={entry?.revision}
        values={entry ? JSON.parse(entry.content) : {}}
        lessons={c.lessons}
        skills={c.skills.map((skill) => ({ id: skill.id, title: skill.name }))}
      />
      <section aria-label="הרשומות שלי">
        {!entries.length && <p>עדיין אין רשומות. אחרי התרגיל הראשון, תעד כאן מה למדת.</p>}
        {entries.map((item) => {
          const data = JSON.parse(item.content);
          return (
            <details className="card verification-card" key={item.id}>
              <summary>{item.title}</summary>
              <p>
                {new Date(item.updatedAt).toLocaleDateString('he-IL', {
                  timeZone: 'Asia/Jerusalem',
                })}{' '}
                · גרסה {item.revision}
              </p>
              {journalFields.map(([name, label]) => (
                <div key={name}>
                  <h3>{label}</h3>
                  <p className="reflection-text">{data[name]}</p>
                </div>
              ))}
              <Link href={`/journal?edit=${item.id}`}>עריכת הרשומה</Link>
            </details>
          );
        })}
      </section>
    </div>
  );
}
