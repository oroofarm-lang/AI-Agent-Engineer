import { z } from 'zod';
import type { Connection } from './connection';
import type { loadCurriculum } from '../curriculum/load';
import { assessmentSchema } from '../curriculum/assessment';
import { isOperator } from '../admin/access';
import { repository } from './repository';
import { canStudyLesson } from '../domain/learning-path';
import { isBoss, isProject } from '../domain/projects';

type Curriculum = ReturnType<typeof loadCurriculum>;
export type Review = {
  id: string;
  submission_id: string;
  user_id: string;
  reviewer_id: string | null;
  criteria: string;
  outcome: 'PASS' | 'REVISE';
  reviewed_at: string;
};
export type Mastery = {
  skill_id: string;
  level: number;
  curriculum_version: string;
  review_id: string;
  updated_at: string;
};
export type Workspace = {
  lesson_id: string;
  architecture: string;
  test_log: string;
  reflection: string;
  revision: number;
  curriculum_version: string;
  updated_at: string;
};
export type BossAttempt = {
  id: string;
  lesson_id: string;
  state: 'ACTIVE' | 'SUBMITTED';
  submission_id: string | null;
  curriculum_version: string;
  started_at: string;
  submitted_at: string | null;
};
const criterion = z.strictObject({
  level: z.number().int().min(0).max(3),
  feedback: z.string().trim().min(20).max(3000),
});
export const reviewInput = z.strictObject({
  id: z.uuid(),
  submissionId: z.uuid(),
  criteria: z.record(z.string(), criterion),
});
const workspaceInput = z.strictObject({
  lessonId: z.string().max(100),
  revision: z.number().int().nonnegative(),
  architecture: z.string().max(12000),
  testLog: z.string().max(12000),
  reflection: z.string().max(12000),
});

export function learningSystem(connection: Connection, c: Curriculum, userId: string) {
  const { sqlite } = connection;
  function available(id: string, bossOnly = false) {
    const lesson = c.lessons.find((l) => l.id === id && l.publicationStatus === 'published');
    if (!lesson || !(bossOnly ? isBoss(lesson) : isProject(lesson) || isBoss(lesson)))
      throw new Error('UNKNOWN_PROJECT');
    if (!canStudyLesson(c, repository(connection, c, userId).progress(), lesson))
      throw new Error('FOUNDATION_REQUIRED');
    return lesson;
  }
  return {
    reviews: () =>
      sqlite
        .prepare('SELECT * FROM assessment_reviews WHERE user_id=? ORDER BY reviewed_at DESC')
        .all(userId) as Review[],
    mastery: () =>
      sqlite
        .prepare(
          'SELECT skill_id, level, curriculum_version, review_id, updated_at FROM skill_mastery WHERE user_id=?',
        )
        .all(userId) as Mastery[],
    workspaces: () =>
      sqlite.prepare('SELECT * FROM project_workspaces WHERE user_id=?').all(userId) as Workspace[],
    bosses: () =>
      sqlite
        .prepare('SELECT * FROM boss_attempts WHERE user_id=? ORDER BY started_at DESC')
        .all(userId) as BossAttempt[],
    saveWorkspace(raw: unknown) {
      const input = workspaceInput.parse(raw);
      available(input.lessonId);
      return sqlite.transaction(() => {
        const old = sqlite
          .prepare('SELECT revision FROM project_workspaces WHERE user_id=? AND lesson_id=?')
          .get(userId, input.lessonId) as { revision: number } | undefined;
        if ((old?.revision || 0) !== input.revision) throw new Error('STALE_WORKSPACE');
        const revision = input.revision + 1;
        sqlite
          .prepare(
            `INSERT INTO project_workspaces VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(user_id,lesson_id) DO UPDATE SET curriculum_version=excluded.curriculum_version,architecture=excluded.architecture,test_log=excluded.test_log,reflection=excluded.reflection,revision=excluded.revision,updated_at=excluded.updated_at`,
          )
          .run(
            userId,
            input.lessonId,
            c.version,
            input.architecture,
            input.testLog,
            input.reflection,
            revision,
            new Date().toISOString(),
          );
        return revision;
      })();
    },
    startBoss(raw: unknown) {
      const input = z.strictObject({ id: z.uuid(), lessonId: z.string().max(100) }).parse(raw);
      available(input.lessonId, true);
      return sqlite.transaction(() => {
        const old = sqlite.prepare('SELECT * FROM boss_attempts WHERE id=?').get(input.id) as
          (BossAttempt & { user_id: string }) | undefined;
        if (old) {
          if (old.user_id !== userId || old.lesson_id !== input.lessonId)
            throw new Error('ATTEMPT_CONFLICT');
          return old.id;
        }
        const active = sqlite
          .prepare(
            "SELECT id FROM boss_attempts WHERE user_id=? AND lesson_id=? AND state='ACTIVE'",
          )
          .get(userId, input.lessonId) as { id: string } | undefined;
        if (active) return active.id;
        repository(connection, c, userId).updateProgress(input.lessonId, 'start');
        sqlite
          .prepare("INSERT INTO boss_attempts VALUES (?,?,?,?,'ACTIVE',NULL,?,NULL)")
          .run(input.id, userId, input.lessonId, c.version, new Date().toISOString());
        return input.id;
      })();
    },
    submitBoss(raw: unknown) {
      const input = z.strictObject({ id: z.uuid(), submissionId: z.uuid() }).parse(raw);
      return sqlite.transaction(() => {
        const attempt = sqlite
          .prepare('SELECT * FROM boss_attempts WHERE id=? AND user_id=?')
          .get(input.id, userId) as BossAttempt | undefined;
        const evidence = sqlite
          .prepare(
            'SELECT lesson_id,curriculum_version FROM assessment_results WHERE id=? AND user_id=?',
          )
          .get(input.submissionId, userId) as
          { lesson_id: string; curriculum_version: string } | undefined;
        if (
          !attempt ||
          !evidence ||
          evidence.lesson_id !== attempt.lesson_id ||
          evidence.curriculum_version !== attempt.curriculum_version
        )
          throw new Error('EVIDENCE_REQUIRED');
        if (attempt.state === 'SUBMITTED') {
          if (attempt.submission_id !== input.submissionId) throw new Error('ATTEMPT_CONFLICT');
          return;
        }
        sqlite
          .prepare(
            "UPDATE boss_attempts SET state='SUBMITTED',submission_id=?,submitted_at=? WHERE id=? AND user_id=?",
          )
          .run(input.submissionId, new Date().toISOString(), input.id, userId);
      })();
    },
  };
}

/** Caller identity comes from the server session. Re-check verification and the allowlist here. */
export function assessmentReviewer(
  connection: Connection,
  actor: { id: string; email: string; emailVerified: boolean },
) {
  if (!isOperator(actor)) throw new Error('FORBIDDEN');
  const { sqlite } = connection;
  return {
    pending: () =>
      sqlite
        .prepare(
          `SELECT a.*,u.name AS learner_name FROM assessment_results a JOIN "user" u ON u.id=a.user_id LEFT JOIN assessment_reviews r ON r.submission_id=a.id WHERE r.id IS NULL ORDER BY a.submitted_at LIMIT 25`,
        )
        .all() as {
        id: string;
        user_id: string;
        learner_name: string;
        rubric_snapshot: string;
        evidence: string;
        curriculum_version: string;
        submitted_at: string;
      }[],
    review(raw: unknown) {
      const input = reviewInput.parse(raw);
      return sqlite.transaction(() => {
        const attempt = sqlite
          .prepare('SELECT * FROM assessment_results WHERE id=?')
          .get(input.submissionId) as
          | {
              user_id: string;
              lesson_id: string;
              rubric_snapshot: string;
              curriculum_version: string;
            }
          | undefined;
        if (!attempt) throw new Error('UNKNOWN_SUBMISSION');
        if (attempt.user_id === actor.id) throw new Error('SELF_REVIEW');
        const rubric = assessmentSchema.parse(JSON.parse(attempt.rubric_snapshot));
        const expected = rubric.criteria.map((x) => x.id).sort(),
          actual = Object.keys(input.criteria).sort();
        if (expected.join('|') !== actual.join('|')) throw new Error('INCOMPLETE_REVIEW');
        const criteria = JSON.stringify(
          Object.fromEntries(rubric.criteria.map((x) => [x.id, input.criteria[x.id]])),
        );
        const existing = sqlite
          .prepare('SELECT * FROM assessment_reviews WHERE submission_id=? OR id=?')
          .get(input.submissionId, input.id) as Review | undefined;
        if (existing) {
          if (
            existing.id !== input.id ||
            existing.submission_id !== input.submissionId ||
            existing.reviewer_id !== actor.id ||
            existing.criteria !== criteria
          )
            throw new Error('REVIEW_CONFLICT');
          return existing.outcome;
        }
        const outcome = rubric.criteria.every((x) => input.criteria[x.id].level >= 2)
          ? 'PASS'
          : 'REVISE';
        const now = new Date().toISOString();
        sqlite
          .prepare('INSERT INTO assessment_reviews VALUES (?,?,?,?,?,?,?)')
          .run(input.id, input.submissionId, attempt.user_id, actor.id, criteria, outcome, now);
        if (outcome === 'PASS') {
          sqlite
            .prepare(
              "UPDATE lesson_progress SET state='MASTERED',updated_at=? WHERE user_id=? AND lesson_id=?",
            )
            .run(now, attempt.user_id, attempt.lesson_id);
          const demonstrated = new Map<string, number>();
          for (const item of rubric.criteria)
            demonstrated.set(
              item.skillId,
              Math.min(demonstrated.get(item.skillId) ?? 3, input.criteria[item.id].level),
            );
          for (const [skillId, level] of demonstrated) {
            sqlite
              .prepare(
                `INSERT INTO skill_mastery VALUES (?,?,?,?,?,?) ON CONFLICT(user_id,skill_id) DO UPDATE SET level=excluded.level,review_id=excluded.review_id,curriculum_version=excluded.curriculum_version,updated_at=excluded.updated_at WHERE excluded.level>skill_mastery.level`,
              )
              .run(attempt.user_id, skillId, level, input.id, attempt.curriculum_version, now);
          }
        }
        return outcome;
      })();
    },
  };
}
