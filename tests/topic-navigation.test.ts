import { describe, expect, it } from 'vitest';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { lessonNavigation } from '../src/lib/curriculum/navigation';
import { validateIntegrity } from '../src/lib/curriculum/validate';

describe('topic curriculum and legacy progress compatibility', () => {
  it('assigns every stable ID exactly once and retains the original release IDs', () => {
    const c = loadCurriculum();
    const assigned = c.modules!.flatMap((module) => module.lessonIds);
    expect(c.modules).toHaveLength(14);
    expect(new Set(assigned).size).toBe(139);
    expect(assigned).toHaveLength(139);
    expect(c.lessons.filter((lesson) => lesson.day !== undefined)).toHaveLength(80);
  });
  it('follows topic order across original and specialization IDs', () => {
    const c = loadCurriculum();
    const start = c.lessons.find((lesson) => lesson.id === 'FND_01')!;
    expect(lessonNavigation(c, start, 'CORE').next?.day).toBe(1);
    const six = c.lessons.find((lesson) => lesson.day === 6)!;
    expect(lessonNavigation(c, six, 'CORE').next?.id).toBe('FND_02');
    expect(lessonNavigation(c, six).next?.day).toBe(7);
  });
  it('ignores a foreign module and does not wrap at the end of a topic', () => {
    const c = loadCurriculum();
    const end = c.lessons.find((lesson) => lesson.id === 'MKT_10')!;
    expect(lessonNavigation(c, end, 'ADS').next).toBeUndefined();
    expect(lessonNavigation(c, end).next).toBeUndefined();
    expect(lessonNavigation(c, end, 'MARKETING').query).toBe('?module=MARKETING');
  });
  it('rejects uncovered units, dangling module references and module cycles', () => {
    const c = loadCurriculum();
    const broken = structuredClone(c);
    broken.modules![0].lessonIds.shift();
    expect(() => validateIntegrity(broken, c.skills, c.sources)).toThrow('Unassigned');
    broken.modules = structuredClone(c.modules);
    broken.modules![0].lessonIds.push('MISSING');
    expect(() => validateIntegrity(broken, c.skills, c.sources)).toThrow('Unknown module lesson');
    broken.modules = structuredClone(c.modules);
    broken.modules![0].prerequisiteModuleIds = ['AGENTS'];
    expect(() => validateIntegrity(broken, c.skills, c.sources)).toThrow('cycle');
  });
});
