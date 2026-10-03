import { and, eq } from 'drizzle-orm';
import type { Connection } from './connection';
import {
  lessonProgress,
  lessonNotes,
  users,
  curriculumVersions,
  assessmentResults,
  journalEntries,
  failureEntries,
  failureTestCases,
  lessonPositions,
} from './schema';
import type { Curriculum } from '../curriculum/schema';
import { nextState } from '../domain/progress';
import { canStudyLesson } from '../domain/learning-path';
export function repository(connection: Connection, curriculum: Curriculum, userId: string) {
  const { db, sqlite } = connection;
  const publishedLesson = (id: string) => {
    const lesson = curriculum.lessons.find(
      (l) => l.id === id && l.publicationStatus === 'published',
    );
    if (!lesson) throw new Error('Lesson is not available');
    const records = db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)).all();
    if (!canStudyLesson(curriculum, records, lesson)) throw new Error('FOUNDATION_REQUIRED');
    return lesson;
  };
  const whereLesson = (id: string) =>
    and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, id));
  return {
    position: (id: string) =>
      db
        .select()
        .from(lessonPositions)
        .where(and(eq(lessonPositions.userId, userId), eq(lessonPositions.lessonId, id)))
        .get(),
    savePosition(id: string, stepId: string) {
      publishedLesson(id);
      if (!/^section-\d+-\d+$/.test(stepId)) throw new Error('Invalid step');
      const updatedAt = new Date().toISOString();
      db.insert(lessonPositions)
        .values({ userId, lessonId: id, stepId, updatedAt })
        .onConflictDoUpdate({
          target: [lessonPositions.userId, lessonPositions.lessonId],
          set: { stepId, updatedAt },
        })
        .run();
    },
    progress: () => db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)).all(),
    note: (id: string) =>
      db
        .select()
        .from(lessonNotes)
        .where(and(eq(lessonNotes.userId, userId), eq(lessonNotes.lessonId, id)))
        .get()?.body ?? '',
    updateProgress(id: string, action: 'start' | 'complete-build') {
      publishedLesson(id);
      return sqlite.transaction(() => {
        const current = db.select().from(lessonProgress).where(whereLesson(id)).get();
        const now = new Date().toISOString();
        const state = nextState(current?.state ?? 'NOT_STARTED', action);
        const buildCompletedAt =
          current?.buildCompletedAt ?? (action === 'complete-build' ? now : null);
        if (current && current.state === state && current.buildCompletedAt === buildCompletedAt)
          return;
        db.insert(lessonProgress)
          .values({
            userId,
            lessonId: id,
            curriculumVersion: curriculum.version,
            state,
            startedAt: current?.startedAt ?? now,
            buildCompletedAt,
            updatedAt: now,
          })
          .onConflictDoUpdate({
            target: [lessonProgress.userId, lessonProgress.lessonId],
            set: { state, buildCompletedAt, updatedAt: now },
          })
          .run();
      })();
    },
    saveNote(id: string, body: string) {
      publishedLesson(id);
      if (body.length > 20000) throw new Error('Note too long');
      const updatedAt = new Date().toISOString();
      db.insert(lessonNotes)
        .values({ userId, lessonId: id, body, updatedAt })
        .onConflictDoUpdate({
          target: [lessonNotes.userId, lessonNotes.lessonId],
          set: { body, updatedAt },
        })
        .run();
    },
    exportData() {
      return sqlite.transaction(() => ({
        schemaVersion: 9,
        agentEvaluations: sqlite.prepare('SELECT * FROM agent_evaluations WHERE user_id=? ORDER BY rowid').all(userId),
        agentSteps: sqlite.prepare('SELECT * FROM agent_steps WHERE user_id=? ORDER BY run_id,sequence').all(userId),
        assessmentArtifacts: (
          sqlite
            .prepare('SELECT * FROM assessment_artifacts WHERE user_id=? ORDER BY rowid')
            .all(userId) as { data: Buffer }[]
        ).map(({ data, ...metadata }) => ({
          ...metadata,
          encoding: 'base64',
          data: data.toString('base64'),
        })),
        portfolioEntries: sqlite
          .prepare('SELECT * FROM portfolio_entries WHERE user_id=?')
          .all(userId),
        contactConsentEvents: sqlite
          .prepare('SELECT * FROM marketing_consent_events WHERE user_id=? ORDER BY rowid')
          .all(userId),
        assessmentReviews: sqlite
          .prepare('SELECT * FROM assessment_reviews WHERE user_id=?')
          .all(userId),
        skillMastery: sqlite.prepare('SELECT * FROM skill_mastery WHERE user_id=?').all(userId),
        projectWorkspaces: sqlite
          .prepare('SELECT * FROM project_workspaces WHERE user_id=?')
          .all(userId),
        bossAttempts: sqlite.prepare('SELECT * FROM boss_attempts WHERE user_id=?').all(userId),
        mentorThreads: sqlite.prepare('SELECT * FROM mentor_threads WHERE user_id = ?').all(userId),
        mentorMessages: sqlite
          .prepare('SELECT * FROM mentor_messages WHERE user_id = ? ORDER BY rowid')
          .all(userId),
        mentorRuns: sqlite
          .prepare(
            'SELECT id, thread_id, state, input_tokens, output_tokens, created_at, finished_at FROM mentor_runs WHERE user_id = ?',
          )
          .all(userId),
        lessonPositions: db
          .select()
          .from(lessonPositions)
          .where(eq(lessonPositions.userId, userId))
          .all(),
        journalEntries: db
          .select()
          .from(journalEntries)
          .where(eq(journalEntries.userId, userId))
          .all(),
        failureEntries: db
          .select()
          .from(failureEntries)
          .where(eq(failureEntries.userId, userId))
          .all(),
        failureTestCases: db
          .select()
          .from(failureTestCases)
          .where(eq(failureTestCases.userId, userId))
          .all(),
        exportedAt: new Date().toISOString(),
        curriculumVersion: curriculum.version,
        user: db.select().from(users).where(eq(users.id, userId)).get(),
        curriculumVersions: db.select().from(curriculumVersions).all(),
        lessonProgress: db
          .select()
          .from(lessonProgress)
          .where(eq(lessonProgress.userId, userId))
          .all(),
        assessmentResults: db
          .select()
          .from(assessmentResults)
          .where(eq(assessmentResults.userId, userId))
          .all(),
        lessonNotes: db.select().from(lessonNotes).where(eq(lessonNotes.userId, userId)).all(),
      }))();
    },
  };
}
