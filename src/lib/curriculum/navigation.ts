import type { Curriculum, Lesson } from './schema';

/** Topic order is independent of the preserved original day numbering. */
export function lessonNavigation(c: Curriculum, lesson: Lesson, requestedModule?: string) {
  const requested = c.modules?.find(
    (topic) => topic.id === requestedModule && topic.lessonIds.includes(lesson.id),
  );
  const topic = requested ?? c.modules?.find((topic) => topic.lessonIds.includes(lesson.id));
  const ordered = requested || lesson.day === undefined ? topic?.lessonIds : undefined;
  const index = ordered?.indexOf(lesson.id) ?? -1;
  const nextId = ordered && index >= 0 ? ordered[index + 1] : undefined;
  const next = ordered
    ? c.lessons.find((item) => item.id === nextId)
    : c.lessons.find((item) => item.day === (lesson.day ?? -2) + 1);
  return { module: topic, next, query: ordered && topic ? `?module=${topic.id}` : '' };
}
