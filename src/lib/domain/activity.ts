import type { Progress } from './progress';

/** Rewards describe recorded practice, never assessed mastery. Dates use the learner's locale. */
export function learningActivity(records: Progress[], now = new Date()) {
  const unique = [...new Map(records.map((record) => [record.lessonId, record])).values()];
  const builds = unique.filter(
    (record) => record.buildCompletedAt && Number.isFinite(Date.parse(record.buildCompletedAt)),
  );
  const day = (date: Date) =>
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  const days = new Set(builds.map((record) => day(new Date(record.buildCompletedAt!))));
  // Walk calendar days at UTC noon so a DST transition never adds or skips a date.
  const cursor = new Date(`${day(now)}T12:00:00Z`);
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return { xp: builds.length * 100, streak, builds: builds.length };
}
