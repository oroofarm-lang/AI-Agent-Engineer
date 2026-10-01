import { expect, it } from 'vitest';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { learningPath, canStudyLesson } from '../src/lib/domain/learning-path';
import { calculateProgress, type Progress } from '../src/lib/domain/progress';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { repository } from '../src/lib/db/repository';
it('starts with the first ordered core unit, gates new specialist work and preserves prior work', () => {
  const c = loadCurriculum();
  const path = learningPath(c, []);
  expect(path.next.id).toBe(path.core.lessonIds[0]);
  const special = c.lessons.find((lesson) => lesson.id === 'MKT_01')!;
  expect(canStudyLesson(c, [], special)).toBe(false);
  const prior: Progress[] = [
    { lessonId: special.id, state: 'IN_PROGRESS', buildCompletedAt: null },
  ];
  expect(canStudyLesson(c, prior, special)).toBe(true);
  expect(learningPath(c, prior).next.id).toBe(path.core.lessonIds[0]);
  const complete: Progress[] = path.core.lessonIds.map((lessonId) => ({
    lessonId,
    state: 'BUILD_COMPLETE',
    buildCompletedAt: '2026-10-01T10:00:00Z',
  }));
  expect(learningPath(c, complete).ready).toBe(true);
  expect(canStudyLesson(c, complete, special)).toBe(true);
  expect(calculateProgress(c.lessons, complete).completed).toBe(0);
  expect(calculateProgress(c.lessons, complete).built).toBe(24);
});
it('enforces the prerequisite in the repository rather than only hiding a UI button', () => {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  try {
    setupDatabase(connection, c);
    const repo = repository(connection, c, 'local');
    expect(() => repo.updateProgress('MKT_01', 'start')).toThrow('FOUNDATION_REQUIRED');
    for (const id of learningPath(c, []).core.lessonIds) repo.updateProgress(id, 'complete-build');
    repo.updateProgress('MKT_01', 'start');
    expect(repo.progress().find((record) => record.lessonId === 'MKT_01')?.state).toBe(
      'IN_PROGRESS',
    );
  } finally {
    connection.sqlite.close();
  }
});
