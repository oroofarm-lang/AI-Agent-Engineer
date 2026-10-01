import type { Curriculum, Skill, Source } from './schema';
import { requiredSections } from './schema';
export function assertUnique(values: string[], label: string) {
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label}`);
}
export function assertDag(nodes: { id: string; dependencies: string[] }[]) {
  const graph = new Map(nodes.map((n) => [n.id, n.dependencies]));
  const active = new Set<string>();
  const visited = new Set<string>();
  function visit(id: string) {
    if (!graph.has(id)) throw new Error(`Unknown dependency: ${id}`);
    if (active.has(id)) throw new Error(`Dependency cycle: ${id}`);
    if (visited.has(id)) return;
    active.add(id);
    for (const dep of graph.get(id)!) visit(dep);
    active.delete(id);
    visited.add(id);
  }
  for (const id of graph.keys()) visit(id);
}
export function validateIntegrity(c: Curriculum, skills: Skill[], sources: Source[]) {
  assertUnique(
    c.lessons.map((l) => l.id),
    'lesson ID',
  );
  assertUnique(
    c.lessons.filter((l) => l.day !== undefined).map((l) => String(l.day)),
    'day',
  );
  assertUnique(
    c.weeks.map((w) => w.id),
    'week ID',
  );
  assertUnique(
    c.weeks.map((w) => String(w.number)),
    'week number',
  );
  assertUnique(
    skills.map((s) => s.id),
    'skill ID',
  );
  assertUnique(
    sources.map((s) => s.id),
    'source ID',
  );
  const skillIds = new Set(skills.map((s) => s.id)),
    sourceIds = new Set(sources.map((s) => s.id)),
    lessonIds = new Set(c.lessons.map((l) => l.id));
  for (const lesson of c.lessons) {
    if ((lesson.week === undefined) !== (lesson.day === undefined))
      throw new Error(`Incomplete legacy position: ${lesson.id}`);
    if (lesson.week !== undefined && lesson.day !== undefined) {
      if (
        lesson.week !== Math.ceil(lesson.day / 5) ||
        !c.weeks.some((w) => w.number === lesson.week)
      )
        throw new Error(`Invalid week: ${lesson.id}`);
      if (
        !lesson.id.startsWith(
          `W${String(lesson.week).padStart(2, '0')}D${String(lesson.day).padStart(2, '0')}_`,
        )
      )
        throw new Error(`ID/day mismatch: ${lesson.id}`);
    } else if (/^W\d{2}D\d{2}_/.test(lesson.id)) {
      throw new Error(`Missing legacy position: ${lesson.id}`);
    }
    for (const id of lesson.skillIds)
      if (!skillIds.has(id)) throw new Error(`Unknown skill: ${id}`);
    for (const id of lesson.sourceIds)
      if (!sourceIds.has(id)) throw new Error(`Unknown source: ${id}`);
    if (lesson.publicationStatus === 'published' && !lesson.sourceIds.length)
      throw new Error(`Missing documentation: ${lesson.id}`);
  }
  for (const source of sources)
    for (const id of source.lessonIds)
      if (!lessonIds.has(id)) throw new Error(`Unknown source lesson: ${id}`);
  assertDag(c.lessons.map((l) => ({ id: l.id, dependencies: l.prerequisiteLessonIds })));
  assertDag(skills.map((s) => ({ id: s.id, dependencies: s.prerequisiteSkillIds })));
  if (c.modules) {
    assertUnique(
      c.modules.map((m) => m.id),
      'module ID',
    );
    const covered = new Set<string>();
    for (const m of c.modules) {
      assertUnique(m.lessonIds, 'module lesson');
      for (const id of m.lessonIds) {
        if (!lessonIds.has(id)) throw new Error(`Unknown module lesson: ${id}`);
        if (covered.has(id)) throw new Error(`Lesson assigned to multiple modules: ${id}`);
        covered.add(id);
      }
    }
    if (covered.size !== lessonIds.size) throw new Error('Unassigned curriculum lesson');
    assertDag(c.modules.map((m) => ({ id: m.id, dependencies: m.prerequisiteModuleIds })));
  }
}
export function validateBody(body: string, id: string) {
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  if (headings.join('|') !== requiredSections.join('|'))
    throw new Error(`Invalid lesson sections: ${id}`);
  for (const section of body.split(/^## .+$/m).slice(1))
    if (section.trim().length < 20) throw new Error(`Empty lesson section: ${id}`);
}
