import { and, desc, eq } from 'drizzle-orm';
import type { Connection } from './connection';
import type { Assessment } from '../curriculum/assessment';
import type { Curriculum } from '../curriculum/schema';
import { assessmentResults, lessonProgress } from './schema';
import { evidenceInputSchema, submissionState, validateEvidence } from '../domain/assessment';
import { createHash } from 'node:crypto';
import { artifactRepository } from './artifacts';
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
      const fingerprint = createHash('sha256')
        .update(
          JSON.stringify({
            evidence: parsed.evidence,
            artifacts: parsed.artifacts.map(({ data, ...metadata }) => ({
              ...metadata,
              sha256: createHash('sha256').update(data).digest('hex'),
            })),
            portfolio: parsed.portfolio,
          }),
        )
        .digest('hex');
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
            existing.evidence !== evidence ||
            (existing.payloadFingerprint && existing.payloadFingerprint !== fingerprint)
          )
            throw new Error('SUBMISSION_CONFLICT');
          const saved = artifactRepository(connection, userId).metadata(existing.id);
          if (
            saved.length !== parsed.artifacts.length ||
            parsed.artifacts.some((file) => {
              const old = saved.find((item) => item.id === file.id);
              return (
                !old ||
                old.name !== file.name ||
                old.criterion_id !== file.criterionId ||
                old.sha256 !== createHash('sha256').update(file.data).digest('hex')
              );
            })
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
            payloadFingerprint: fingerprint,
          })
          .run();
        artifactRepository(connection, userId).save(parsed.submissionId, parsed.artifacts);
        if (parsed.portfolio)
          sqlite
            .prepare('INSERT INTO portfolio_entries VALUES (?,?,?,?,?,?)')
            .run(
              parsed.submissionId,
              userId,
              parsed.portfolio.title,
              parsed.portfolio.summary,
              parsed.portfolio.included ? 1 : 0,
              now,
            );
        db.update(lessonProgress)
          .set({ state: submissionState(progress.state), updatedAt: now })
          .where(where)
          .run();
        return parsed.submissionId;
      })();
    },
  };
}
