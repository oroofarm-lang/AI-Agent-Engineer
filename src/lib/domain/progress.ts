import type { Lesson } from '../curriculum/schema';
export const states = [
  'NOT_STARTED',
  'IN_PROGRESS',
  'BUILD_COMPLETE',
  'MASTERY_PENDING',
  'MASTERED',
  'COMPLETED_WITHOUT_MASTERY',
] as const;
export type ProgressState = (typeof states)[number];
export type Progress = { lessonId: string; state: ProgressState; buildCompletedAt: string | null };
export function nextState(
  current: ProgressState,
  action: 'start' | 'complete-build',
): ProgressState {
  if (action === 'start') return current === 'NOT_STARTED' ? 'IN_PROGRESS' : current;
  return current === 'NOT_STARTED' || current === 'IN_PROGRESS' ? 'BUILD_COMPLETE' : current;
}
export function calculateProgress(lessons: Pick<Lesson, 'id'>[], records: Progress[]) {
  const ids = new Set(lessons.map((l) => l.id));
  const valid = [
    ...new Map(records.filter((p) => ids.has(p.lessonId)).map((p) => [p.lessonId, p])).values(),
  ];
  const built = valid.filter((p) => p.buildCompletedAt !== null).length;
  const completed = valid.filter(
    (p) => p.state === 'MASTERED' || p.state === 'COMPLETED_WITHOUT_MASTERY',
  ).length;
  return {
    built,
    completed,
    total: ids.size,
    buildPercent: ids.size ? Math.round((built / ids.size) * 100) : 0,
    completionPercent: ids.size ? Math.round((completed / ids.size) * 100) : 0,
  };
}
export function nextLesson(lessons: Lesson[], records: Progress[]) {
  const published = lessons
    .filter((l) => l.publicationStatus === 'published')
    .sort((a, b) => (a.day ?? 1000) - (b.day ?? 1000));
  const map = new Map(records.map((p) => [p.lessonId, p]));
  return (
    published.find((l) => map.get(l.id)?.state === 'IN_PROGRESS') ??
    published.find((l) => !map.get(l.id)?.buildCompletedAt) ??
    published[0]
  );
}
