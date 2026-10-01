import { and, desc, eq } from 'drizzle-orm';
import type { Connection } from './connection';
import type { Assessment } from '../curriculum/assessment';
import type { Curriculum } from '../curriculum/schema';
import { assessmentResults, lessonProgress } from './schema';
import { evidenceInputSchema, submissionState, validateEvidence } from '../domain/assessment';
export function assessmentRepository(
  connection: Connection,
  curriculum: Curriculum & { assessments: Assessment[] },
  userId: string,
) {
  const { db, sqlite } = connection;
  return {
    attempts: () =>
      db
        .select()
        .from(assessmentResults)
        .where(eq(assessmentResults.userId, userId))
        .orderBy(desc(assessmentResults.submittedAt))
        .all(),
    submit(raw: unknown) {
      const input = evidenceInputSchema.parse(raw);
      const assessment = curriculum.assessments.find((a) => a.id === input.assessmentId);
      if (!assessment) throw new Error('UNKNOWN_ASSESSMENT');
      const lesson = curriculum.lessons.find(
        (l) => l.id === assessment.lessonId && l.publicationStatus === 'published',
      );
      if (!lesson) throw new Error('UNPUBLISHED_LESSON');
      const parsed = validateEvidence(input, assessment, curriculum.version);
      return sqlite.transaction(() => {
        const existing = db
          .select()
          .from(assessmentResults)
          .where(eq(assessmentResults.id, parsed.submissionId))
          .get();
        const evidence = JSON.stringify(parsed.evidence);
        if (existing) {
          if (
            existing.userId !== userId ||
            existing.assessmentId !== assessment.id ||
            existing.curriculumVersion !== curriculum.version ||
            existing.rubricVersion !== assessment.version ||
            existing.evidence !== evidence
          )
            throw new Error('SUBMISSION_CONFLICT');
          return existing.id;
        }
        const where = and(
          eq(lessonProgress.userId, userId),
          eq(lessonProgress.lessonId, lesson.id),
        );
        const progress = db.select().from(lessonProgress).where(where).get();
        if (!progress?.buildCompletedAt) throw new Error('BUILD_REQUIRED');
        const now = new Date().toISOString();
        db.insert(assessmentResults)
          .values({
            id: parsed.submissionId,
            userId,
            lessonId: lesson.id,
            assessmentId: assessment.id,
            curriculumVersion: curriculum.version,
            rubricVersion: assessment.version,
            rubricSnapshot: JSON.stringify(assessment),
            evidence,
            status: 'PENDING_REVIEW',
            submittedAt: now,
          })
          .run();
        db.update(lessonProgress)
          .set({ state: submissionState(progress.state), updatedAt: now })
          .where(where)
          .run();
        return parsed.submissionId;
      })();
    },
  };
}
