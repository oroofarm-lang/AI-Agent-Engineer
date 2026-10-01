import type { Curriculum, Lesson } from '../curriculum/schema';
import type { Progress } from './progress';

/** Builds are self-reported practice. The entry requirement never certifies mastery. */
export function learningPath(curriculum: Curriculum, records: Progress[]) {
  const core = curriculum.modules?.find((module) => module.requiredEntry || module.id === 'CORE');
  if (!core) throw new Error('Missing required foundation chapter');
  const byId = new Map(records.map((record) => [record.lessonId, record]));
  const built = core.lessonIds.filter((id) => byId.get(id)?.buildCompletedAt).length;
  const ready = built === core.lessonIds.length;
  const activeCore = core.lessonIds.find((id) => byId.get(id)?.state === 'IN_PROGRESS');
  const firstCore = core.lessonIds.find((id) => !byId.get(id)?.buildCompletedAt);
  const active = [...records].reverse().find((record) => record.state === 'IN_PROGRESS');
  const nextId =
    (!ready && (activeCore || firstCore)) ||
    active?.lessonId ||
    curriculum.lessons.find((lesson) => !byId.get(lesson.id)?.buildCompletedAt)?.id ||
    core.lessonIds[0];
  return { core, built, ready, next: curriculum.lessons.find((lesson) => lesson.id === nextId)! };
}

export function canStudyLesson(
  curriculum: Curriculum,
  records: Progress[],
  lesson: Pick<Lesson, 'id'>,
) {
  // Historic releases had no chapter prerequisite. Preserve their repository/migration semantics.
  if (!curriculum.modules) return true;
  const path = learningPath(curriculum, records);
  return (
    path.ready ||
    path.core.lessonIds.includes(lesson.id) ||
    records.some((record) => record.lessonId === lesson.id && record.state !== 'NOT_STARTED')
  );
}
