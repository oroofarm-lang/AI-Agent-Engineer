import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { curriculumSchema, skillSchema, sourceSchema } from './schema';
import { validateIntegrity, validateBody } from './validate';
import { assessmentSchema, validateAssessments } from './assessment';
import { createHash } from 'node:crypto';
const defaultRoot = path.join(process.cwd(), 'content/curriculum');
const json = (root: string, name: string): unknown =>
  JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
/** The optional directory is for local release validation; it is never taken from an HTTP request. */
export function loadCurriculum(root = defaultRoot) {
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
  return { ...curriculum, skills, sources, assessments, lessonBodyHashes };
}
export function readLesson(id: string, root = defaultRoot) {
  if (!/^[A-Z][A-Z0-9_]+$/.test(id)) throw new Error('Invalid lesson ID');
  return fs.readFileSync(path.join(root, 'lessons', `${id}.md`), 'utf8');
}
