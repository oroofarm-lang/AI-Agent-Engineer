import { requireUser } from './auth/session';
import { reflectionRepository } from './db/reflections';
import 'server-only';
import { cache } from 'react';
import { loadCurriculum } from './curriculum/load';
import { getConnection } from './db/connection';
import { assessmentRepository } from './db/assessments';
import { repository } from './db/repository';
import { learningSystem } from './db/learning-system';
export const getCurriculum = cache(loadCurriculum);
export async function getRepository() {
  return repository(getConnection(), getCurriculum(), (await requireUser()).id);
}

export async function getAssessmentRepository() {
  return assessmentRepository(getConnection(), getCurriculum(), (await requireUser()).id);
}

export async function getReflectionRepository() {
  return reflectionRepository(getConnection(), getCurriculum(), (await requireUser()).id);
}

export async function getLearningSystem() {
  return learningSystem(getConnection(), getCurriculum(), (await requireUser()).id);
}
