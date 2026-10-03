import { z } from 'zod';
import { stableId, requiredSections } from '../curriculum/schema';

export const digestSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const releaseVersionSchema = z.string().regex(/^\d{1,6}\.\d{1,6}\.\d{1,6}$/);
export const severitySchema = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL']);
export const actionSchema = z.enum(['ADD', 'UPDATE', 'DEPRECATE', 'REPLACE', 'WATCH']);
export const proposalInputSchema = z
  .strictObject({
    id: z.uuid(),
    baseVersion: releaseVersionSchema,
    baseHash: digestSchema,
    targetVersion: releaseVersionSchema,
    title: z.string().trim().min(5).max(180),
    newInformation: z.string().trim().min(30).max(6000),
    reason: z.string().trim().min(30).max(4000),
    confidence: z.enum(['low', 'medium', 'high']),
    estimatedMinutes: z.number().int().min(1).max(960),
    severity: severitySchema,
    action: actionSchema,
    evidence: z
      .array(
        z.strictObject({
          sourceId: stableId,
          summary: z.string().trim().min(30).max(1500),
        }),
      )
      .min(1)
      .max(12),
    changes: z
      .array(
        z.strictObject({
          lessonId: stableId,
          section: z.enum(requiredSections),
          beforeHash: digestSchema,
          newText: z.string().trim().min(20).max(40000),
        }),
      )
      .max(12),
  })
  .superRefine((input, context) => {
    const unique = (values: string[], field: string) => {
      if (new Set(values).size !== values.length)
        context.addIssue({ code: 'custom', message: 'Duplicate reference', path: [field] });
    };
    unique(
      input.evidence.map((item) => item.sourceId),
      'evidence',
    );
    unique(
      input.changes.map((item) => `${item.lessonId}:${item.section}`),
      'changes',
    );
    if (input.action === 'WATCH' ? input.changes.length !== 0 : !input.changes.length)
      context.addIssue({ code: 'custom', message: 'Changes must match action', path: ['changes'] });
  });

export const proposalSchema = z.strictObject({
  schemaVersion: z.literal(1),
  createdAt: z.iso.datetime(),
  input: proposalInputSchema,
  evidence: z
    .array(
      z.strictObject({
        sourceId: stableId,
        title: z.string(),
        url: z.url(),
        type: z.string(),
        summary: z.string(),
        verification: z.literal('human-review-required'),
      }),
    )
    .max(12),
  comparison: z
    .array(
      z.strictObject({
        lessonId: stableId,
        section: z.enum(requiredSections),
        beforeText: z.string(),
        afterText: z.string(),
      }),
    )
    .max(12),
  impact: z.strictObject({
    directLessonIds: z.array(stableId),
    downstreamLessonIds: z.array(stableId),
    affectedSkillIds: z.array(stableId),
    foundationTouched: z.boolean(),
  }),
  candidateHash: digestSchema.nullable(),
});
export type Proposal = z.infer<typeof proposalSchema>;
export type ProposalInput = z.infer<typeof proposalInputSchema>;
export const decisionInputSchema = z.strictObject({
  id: z.uuid(),
  proposalHash: digestSchema,
  decision: z.enum(['approve', 'defer', 'watch']),
  rationale: z.string().trim().min(40).max(4000),
  checkedPrimarySources: z.boolean(),
  checkedTeaching: z.boolean(),
  foundationRationale: z.string().trim().max(4000),
});
export const decisionSchema = z.strictObject({
  schemaVersion: z.literal(1),
  proposalId: z.uuid(),
  proposalHash: digestSchema,
  actorId: z.string().min(1).max(200),
  decidedAt: z.iso.datetime(),
  decision: decisionInputSchema.shape.decision,
  rationale: decisionInputSchema.shape.rationale,
  checkedPrimarySources: z.boolean(),
  checkedTeaching: z.boolean(),
  foundationRationale: z.string(),
});
export const pointerSchema = z.strictObject({
  schemaVersion: z.literal(1),
  version: releaseVersionSchema,
  manifestHash: digestSchema,
});
export type ReleasePointer = z.infer<typeof pointerSchema>;
export const applicationSchema = z.strictObject({
  schemaVersion: z.literal(1),
  proposalId: z.uuid(),
  proposalHash: digestSchema,
  actorId: z.string().min(1).max(200),
  preparedAt: z.iso.datetime(),
  previous: pointerSchema,
  next: pointerSchema,
  state: z.enum(['prepared', 'applied', 'rollback-prepared', 'rolled-back']),
  completedAt: z.iso.datetime().nullable(),
});
export const mutationSchema = z.discriminatedUnion('operation', [
  z.strictObject({ operation: z.literal('propose'), input: proposalInputSchema }),
  z.strictObject({ operation: z.literal('decide'), input: decisionInputSchema }),
  z.strictObject({ operation: z.literal('apply'), id: z.uuid(), proposalHash: digestSchema }),
  z.strictObject({ operation: z.literal('rollback'), id: z.uuid(), proposalHash: digestSchema }),
]);
