import fs from 'node:fs';
import { z } from 'zod';
import { curriculumSchema, skillSchema, sourceSchema } from './schema';
import { validateIntegrity, validateBody } from './validate';
import { assessmentSchema, validateAssessments } from './assessment';
import { createHash } from 'node:crypto';
import { activeCurriculumSelection, bindCatalogDirectory, catalogDirectory } from './runtime';
import { checkedPath } from '../auditor/files';
const json = (root: string, name: string): unknown =>
  JSON.parse(fs.readFileSync(checkedPath(root, name), 'utf8'));
/** The optional directory is for local release validation; it is never taken from an HTTP request. */
export function loadCurriculum(directory?: string) {
  const selection = directory
    ? { root: directory, expectedHash: null }
    : activeCurriculumSelection();
  const root = selection.root;
  const curriculum = curriculumSchema.parse(json(root, 'curriculum.json'));
  const skills = z.array(skillSchema).parse(json(root, 'skills.json'));
  const sources = z.array(sourceSchema).parse(json(root, 'sources.json'));
  validateIntegrity(curriculum, skills, sources);
  for (const lesson of curriculum.lessons.filter((l) => l.publicationStatus === 'published'))
    validateBody(readLesson(lesson.id, root), lesson.id);
  const assessments = z.array(assessmentSchema).parse(json(root, 'assessments.json'));
  validateAssessments(assessments, curriculum);
  const lessonBodyHashes = Object.fromEntries(
    curriculum.lessons
      .filter((l) => l.publicationStatus === 'published')
      .map((l) => [l.id, createHash('sha256').update(readLesson(l.id, root)).digest('hex')]),
  );
  const catalog = { ...curriculum, skills, sources, assessments, lessonBodyHashes };
  if (
    selection.expectedHash &&
    createHash('sha256').update(JSON.stringify(catalog)).digest('hex') !== selection.expectedHash
  )
    throw new Error('CURRICULUM_RELEASE_INTEGRITY');
  bindCatalogDirectory(catalog, root);
  return catalog;
}
export function readLesson(id: string, root = activeCurriculumSelection().root) {
  if (!/^[A-Z][A-Z0-9_]+$/.test(id)) throw new Error('Invalid lesson ID');
  return fs.readFileSync(checkedPath(root, `lessons/${id}.md`), 'utf8');
}
/** A request's lesson bytes always come from the exact immutable catalog it loaded. */
export function readCatalogLesson(catalog: ReturnType<typeof loadCurriculum>, id: string) {
  if (
    !catalog.lessons.some((lesson) => lesson.id === id && lesson.publicationStatus === 'published')
  )
    throw new Error('UNKNOWN_LESSON');
  const body = readLesson(id, catalogDirectory(catalog));
  if (createHash('sha256').update(body).digest('hex') !== catalog.lessonBodyHashes[id])
    throw new Error('CURRICULUM_RELEASE_INTEGRITY');
  return body;
}
