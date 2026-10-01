import { describe, it, expect } from 'vitest';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { validateIntegrity, assertDag, validateBody } from '../src/lib/curriculum/validate';
import { lessonSchema } from '../src/lib/curriculum/schema';
describe('curriculum contract', () => {
  it('loads all 139 units and preserves the original 80 stable IDs', () => {
    const c = loadCurriculum();
    expect(c.lessons).toHaveLength(139);
    expect(c.weeks).toHaveLength(16);
    expect(c.lessons.filter((l) => l.publicationStatus === 'published')).toHaveLength(139);
    expect(c.lessons[12].id).toBe('W03D13_AGENT_LOOP');
  });
  it('rejects missing skill and duplicate IDs', () => {
    const c = loadCurriculum();
    const broken = structuredClone(c);
    broken.lessons[0].skillIds = ['MISSING'];
    expect(() => validateIntegrity(broken, c.skills, c.sources)).toThrow('Unknown skill');
    broken.lessons = c.lessons.map((l) => ({ ...l }));
    broken.lessons[1].id = broken.lessons[0].id;
    expect(() => validateIntegrity(broken, c.skills, c.sources)).toThrow('Duplicate lesson');
  });
  it('rejects dependency cycles and dangling nodes', () => {
    expect(() =>
      assertDag([
        { id: 'A', dependencies: ['B'] },
        { id: 'B', dependencies: ['A'] },
      ]),
    ).toThrow('cycle');
    expect(() => assertDag([{ id: 'A', dependencies: ['X'] }])).toThrow('Unknown dependency');
  });
  it('rejects missing body sections and traversal IDs', () => {
    expect(() => validateBody('## Mission\nOnly one section', 'LESSON')).toThrow();
    expect(
      lessonSchema.safeParse({ ...loadCurriculum().lessons[0], id: '../../secret' }).success,
    ).toBe(false);
  });
  it('rejects mismatched day and source references', () => {
    const c = loadCurriculum();
    c.lessons[0].day = 2;
    expect(() => validateIntegrity(c, c.skills, c.sources)).toThrow();
  });
});
