import { z } from 'zod';
import type { Assessment } from '../curriculum/assessment';
import type { ProgressState } from './progress';
export const evidenceInputSchema = z.strictObject({
  submissionId: z.uuid(),
  assessmentId: z.string().min(1).max(100),
  rubricVersion: z.string().max(30),
  curriculumVersion: z.string().max(30),
  evidence: z.record(
    z.string().min(1).max(100),
    z
      .string()
      .max(12000)
      .refine(
        (value) => value.trim().length >= 80,
        'Evidence needs at least 80 non-padding characters',
      ),
  ),
});
export type EvidenceInput = z.infer<typeof evidenceInputSchema>;
export function validateEvidence(
  input: unknown,
  assessment: Assessment,
  curriculumVersion: string,
) {
  const parsed = evidenceInputSchema.parse(input);
  if (
    parsed.assessmentId !== assessment.id ||
    parsed.rubricVersion !== assessment.version ||
    parsed.curriculumVersion !== curriculumVersion
  )
    throw new Error('STALE_ASSESSMENT');
  const expected = assessment.criteria.map((c) => c.id).sort(),
    actual = Object.keys(parsed.evidence).sort();
  if (expected.join('|') !== actual.join('|')) throw new Error('INCOMPLETE_EVIDENCE');
  return {
    ...parsed,
    evidence: Object.fromEntries(assessment.criteria.map((c) => [c.id, parsed.evidence[c.id]])),
  };
}
export function submissionState(current: ProgressState): ProgressState {
  return current === 'MASTERED' || current === 'COMPLETED_WITHOUT_MASTERY'
    ? current
    : 'MASTERY_PENDING';
}
