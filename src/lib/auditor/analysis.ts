import { createHash } from 'node:crypto';
import { curriculumSchema } from '../curriculum/schema';
import { validateBody, validateIntegrity } from '../curriculum/validate';
import { validateAssessments } from '../curriculum/assessment';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import { proposalInputSchema, proposalSchema, type ProposalInput } from './schema';

export const fingerprint = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
export const textHash = (value: string) => createHash('sha256').update(value).digest('hex');
export function laterVersion(next: string, previous: string) {
  const a = next.split('.').map(Number),
    b = previous.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return false;
}

export function sectionRange(body: string, section: string) {
  const headings = [...body.matchAll(/^## (.+)\r?\n/gm)];
  const position = headings.findIndex((heading) => heading[1] === section);
  if (position < 0) throw new Error('AUDITOR_UNKNOWN_SECTION');
  const start = headings[position].index! + headings[position][0].length;
  const end = headings[position + 1]?.index ?? body.length;
  return { start, end, text: body.slice(start, end).trim() };
}

/** Actual reverse dependencies, including skill and module prerequisites; no model-supplied edges. */
export function dependencyImpact(c: ReturnTypeOfCurriculum, directLessonIds: string[]) {
  const reached = new Set(directLessonIds),
    skills = new Set<string>(),
    modules = new Set<string>();
  let changed = true;
  while (changed) {
    const previous = `${reached.size}:${skills.size}:${modules.size}`;
    for (const lesson of c.lessons)
      if (reached.has(lesson.id)) for (const id of lesson.skillIds) skills.add(id);
    for (const skill of c.skills)
      if (skill.prerequisiteSkillIds.some((id) => skills.has(id))) skills.add(skill.id);
    for (const chapter of c.modules ?? [])
      if (
        chapter.lessonIds.some((id) => reached.has(id)) ||
        chapter.prerequisiteModuleIds.some((id) => modules.has(id))
      )
        modules.add(chapter.id);
    for (const lesson of c.lessons)
      if (
        lesson.prerequisiteLessonIds.some((id) => reached.has(id)) ||
        lesson.skillIds.some((id) => skills.has(id))
      )
        reached.add(lesson.id);
    for (const chapter of c.modules ?? [])
      if (chapter.prerequisiteModuleIds.some((id) => modules.has(id)))
        for (const id of chapter.lessonIds) reached.add(id);
    changed = previous !== `${reached.size}:${skills.size}:${modules.size}`;
  }
  return {
    directLessonIds,
    downstreamLessonIds: c.lessons
      .filter((lesson) => reached.has(lesson.id) && !directLessonIds.includes(lesson.id))
      .map((lesson) => lesson.id),
    affectedSkillIds: c.skills.filter((skill) => skills.has(skill.id)).map((skill) => skill.id),
    foundationTouched: c.lessons.some(
      (lesson) =>
        directLessonIds.includes(lesson.id) &&
        (lesson.stability === 'FOUNDATION' ||
          c.modules?.some(
            (chapter) => chapter.requiredEntry && chapter.lessonIds.includes(lesson.id),
          )),
    ),
  };
}

/** Build a full new release while preserving every existing ID, rubric and historical teaching. */
export function candidateRelease(
  c: ReturnTypeOfCurriculum,
  bodies: Record<string, string>,
  input: ProposalInput,
  releaseDate: string,
) {
  const { skills, sources, assessments, lessonBodyHashes: _oldHashes, ...manifest } = c;
  void _oldHashes;
  const curriculum = curriculumSchema.parse({
    ...manifest,
    version: input.targetVersion,
    releaseDate,
    majorChanges: [input.title, input.reason],
  });
  const nextBodies = { ...bodies };
  const changedLessons = new Set(input.changes.map((change) => change.lessonId));
  for (const change of input.changes) {
    const original = bodies[change.lessonId];
    if (!original || textHash(original) !== change.beforeHash)
      throw new Error('AUDITOR_STALE_BODY');
    if (/^## /m.test(change.newText)) throw new Error('AUDITOR_SECTION_BOUNDARY');
    const range = sectionRange(nextBodies[change.lessonId], change.section);
    if (sectionRange(original, change.section).text === change.newText)
      throw new Error('AUDITOR_NO_CHANGE');
    nextBodies[change.lessonId] =
      `${nextBodies[change.lessonId].slice(0, range.start)}\n${change.newText}\n\n${nextBodies[change.lessonId].slice(range.end)}`;
  }
  curriculum.lessons = curriculum.lessons.map((lesson) =>
    changedLessons.has(lesson.id) ? { ...lesson, version: input.targetVersion } : lesson,
  );
  validateIntegrity(curriculum, skills, sources);
  validateAssessments(assessments, curriculum);
  for (const lesson of curriculum.lessons.filter(
    (lesson) => lesson.publicationStatus === 'published',
  ))
    validateBody(nextBodies[lesson.id], lesson.id);
  const lessonBodyHashes = Object.fromEntries(
    curriculum.lessons
      .filter((lesson) => lesson.publicationStatus === 'published')
      .map((lesson) => [lesson.id, textHash(nextBodies[lesson.id])]),
  );
  // Property order matches loadCurriculum and existing immutable DB manifest registration.
  return {
    catalog: { ...curriculum, skills, sources, assessments, lessonBodyHashes },
    bodies: nextBodies,
  };
}

export function createProposal(
  c: ReturnTypeOfCurriculum,
  bodies: Record<string, string>,
  raw: unknown,
  now = new Date(),
) {
  const input = proposalInputSchema.parse(raw);
  if (input.baseVersion !== c.version || input.baseHash !== fingerprint(c))
    throw new Error('AUDITOR_STALE_BASE');
  if (!laterVersion(input.targetVersion, c.version)) throw new Error('AUDITOR_VERSION_ORDER');
  const published = c.lessons.filter((lesson) => lesson.publicationStatus === 'published');
  if (input.changes.some((change) => !published.some((lesson) => lesson.id === change.lessonId)))
    throw new Error('AUDITOR_UNKNOWN_LESSON');
  const evidence = input.evidence.map((item) => {
    const source = c.sources.find((source) => source.id === item.sourceId);
    if (!source) throw new Error('AUDITOR_UNKNOWN_SOURCE');
    if (
      input.changes.length &&
      !input.changes.some(
        (change) =>
          source.lessonIds.includes(change.lessonId) ||
          c.lessons.find((lesson) => lesson.id === change.lessonId)?.sourceIds.includes(source.id),
      )
    )
      throw new Error('AUDITOR_UNRELATED_SOURCE');
    return {
      sourceId: source.id,
      title: source.title,
      url: source.url,
      type: source.type,
      summary: item.summary,
      verification: 'human-review-required' as const,
    };
  });
  if (
    ['CRITICAL', 'HIGH'].includes(input.severity) &&
    new Set(evidence.map((source) => source.url)).size < 2
  )
    throw new Error('AUDITOR_MORE_EVIDENCE_REQUIRED');
  const candidate =
    input.action === 'WATCH'
      ? null
      : candidateRelease(c, bodies, input, now.toISOString().slice(0, 10));
  return proposalSchema.parse({
    schemaVersion: 1,
    createdAt: now.toISOString(),
    input,
    evidence,
    comparison: input.changes.map((change) => ({
      lessonId: change.lessonId,
      section: change.section,
      beforeText: sectionRange(bodies[change.lessonId], change.section).text,
      afterText: change.newText,
    })),
    impact: dependencyImpact(c, [...new Set(input.changes.map((change) => change.lessonId))]),
    candidateHash: candidate ? fingerprint(candidate.catalog) : null,
  });
}
