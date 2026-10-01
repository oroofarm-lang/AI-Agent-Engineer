import type { Curriculum, Lesson } from '../curriculum/schema';
/** The original specification's stable IDs identify projects and the four Boss challenges. */
export const isBoss = (lesson: Pick<Lesson, 'id'>) => lesson.id.includes('BOSS');
export const isProject = (lesson: Pick<Lesson, 'id'>) => lesson.id.includes('_PROJECT_');
export function projectCatalog(curriculum: Curriculum, boss = false) {
  return curriculum.lessons.filter(
    (lesson) =>
      lesson.publicationStatus === 'published' && (boss ? isBoss(lesson) : isProject(lesson)),
  );
}
