import { describe, it, expect } from 'vitest';
import { calculateProgress, nextState, nextLesson, states } from '../src/lib/domain/progress';
import { loadCurriculum } from '../src/lib/curriculum/load';
describe('progress is not mastery', () => {
  it('build completion grants no lesson completion', () => {
    expect(
      calculateProgress(
        [{ id: 'A' }],
        [{ lessonId: 'A', state: 'BUILD_COMPLETE', buildCompletedAt: '2026-09-30' }],
      ),
    ).toEqual({ built: 1, completed: 0, total: 1, buildPercent: 100, completionPercent: 0 });
  });
  it('counts only current stable IDs and handles an empty curriculum', () => {
    expect(
      calculateProgress(
        [{ id: 'A' }],
        [{ lessonId: 'OLD', state: 'MASTERED', buildCompletedAt: 'date' }],
      ).completed,
    ).toBe(0);
    expect(calculateProgress([], []).completionPercent).toBe(0);
  });
  it('never demotes existing mastery or completed states', () => {
    for (const state of states.slice(2)) {
      expect(nextState(state, 'start')).toBe(state);
      expect(nextState(state, 'complete-build')).toBe(state);
    }
  });
  it('deduplicates records and has bounded percentages', () => {
    const p = { lessonId: 'A', state: 'MASTERED' as const, buildCompletedAt: 'date' };
    expect(calculateProgress([{ id: 'A' }], [p, p]).completionPercent).toBe(100);
  });
  it('routes only to published content', () => {
    const c = loadCurriculum();
    expect(nextLesson(c.lessons, [])?.day).toBe(1);
  });
});
