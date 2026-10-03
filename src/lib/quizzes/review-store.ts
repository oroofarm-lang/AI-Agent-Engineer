import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { isOperator } from '../admin/access';
import { checkedPath, readRecord, writeRecord, withAuditorLock } from '../auditor/files';
import { fingerprint, laterVersion } from '../auditor/analysis';
import { loadCurriculum, readCatalogLesson } from '../curriculum/load';
import { stableId } from '../curriculum/schema';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import {
  bankVersion,
  digest,
  teachingBankSchema,
  questionContextSchema,
  validateTeachingBank,
  questionContext,
  teachingSection,
  type TeachingBank,
} from './bank';

const actorSchema = z.strictObject({
  id: z.string().min(1).max(200),
  email: z.email(),
  emailVerified: z.boolean(),
});
type Actor = z.infer<typeof actorSchema>;
const selectionSchema = z.strictObject({ version: bankVersion, releaseHash: digest });
const pointerSchema = z.strictObject({
  schemaVersion: z.literal(1),
  selection: selectionSchema.nullable(),
  operation: z.strictObject({
    requestId: z.uuid(),
    kind: z.enum(['publish', 'rollback']),
    payloadHash: digest,
  }),
});
const proposalSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: z.uuid(),
  targetVersion: bankVersion,
  createdAt: z.iso.datetime(),
  createdBy: z.string().min(1).max(200),
  requestHash: digest,
  curriculumHash: digest,
  bank: teachingBankSchema,
  contexts: z.array(questionContextSchema).min(1).max(5000),
});
export const questionDecisionInput = z
  .strictObject({
    proposalId: z.uuid(),
    proposalHash: digest,
    questionId: stableId,
    questionHash: digest,
    decision: z.enum(['approve', 'reject']),
    answerChecked: z.boolean(),
    sourcesChecked: z.boolean(),
    hebrewChecked: z.boolean(),
    notes: z.string().trim().min(40).max(4000),
  })
  .superRefine((value, context) => {
    if (
      value.decision === 'approve' &&
      !(value.answerChecked && value.sourcesChecked && value.hebrewChecked)
    )
      context.addIssue({
        code: 'custom',
        message: 'Approval requires explicit answer, source and Hebrew review',
      });
  });
const decisionSchema = z.strictObject({
  schemaVersion: z.literal(1),
  input: questionDecisionInput,
  reviewerId: z.string().min(1).max(200),
  reviewedAt: z.iso.datetime(),
});
const releaseSchema = z.strictObject({
  schemaVersion: z.literal(1),
  version: bankVersion,
  proposalId: z.uuid(),
  proposalHash: digest,
  curriculumHash: digest,
  bank: teachingBankSchema,
  decisionHashes: z.array(digest).min(1).max(5000),
  previous: selectionSchema.nullable(),
  publishedAt: z.iso.datetime(),
  publishedBy: z.string().min(1).max(200),
});
type Selection = z.infer<typeof selectionSchema>;
type Proposal = z.infer<typeof proposalSchema>;

export const quizReviewDirectory = () =>
  path.resolve(/* turbopackIgnore: true */ process.env.QUIZ_REVIEW_DIR || '.data/quiz-releases');
const readPointer = (root: string) => readRecord(root, 'active.json', pointerSchema);
function readRelease(root: string, selection: Selection) {
  const value = selectionSchema.parse(selection);
  const release = readRecord(root, `releases/${value.version}.json`, releaseSchema);
  if (
    !release ||
    release.version !== value.version ||
    fingerprint(release) !== value.releaseHash ||
    release.bank.version !== release.version ||
    release.bank.status !== 'published' ||
    release.bank.reviewStatus !== 'approved' ||
    release.decisionHashes.length !== release.bank.quizzes.length
  )
    throw new Error('QUIZ_REVIEW_CORRUPT_RELEASE');
  return release;
}

/** Only an approved release is eligible. A course change pauses it without touching old attempts. */
export function publishedTeachingBank(
  curriculum: ReturnTypeOfCurriculum,
  root = quizReviewDirectory(),
): TeachingBank | null {
  const selected = readPointer(root)?.selection;
  if (!selected) return null;
  const release = readRelease(root, selected);
  if (release.curriculumHash !== fingerprint(curriculum)) return null;
  return validateTeachingBank(release.bank, curriculum);
}

/** The constructor receives the server session actor and trusted configuration, never HTTP fields. */
export function quizReviewStore(
  rawActor: Actor,
  options: { root?: string; curriculum?: () => ReturnTypeOfCurriculum } = {},
) {
  const actor = actorSchema.parse({
    id: rawActor.id,
    email: rawActor.email,
    emailVerified: rawActor.emailVerified,
  });
  if (!isOperator(actor)) throw new Error('QUIZ_REVIEW_FORBIDDEN');
  const root = options.root ? path.resolve(options.root) : quizReviewDirectory();
  const curriculum = options.curriculum || loadCurriculum;
  const readProposal = (id: string) => {
    const uuid = z.uuid().parse(id);
    const proposal = readRecord(root, `proposals/${uuid}.json`, proposalSchema);
    if (!proposal || proposal.id !== uuid) throw new Error('QUIZ_REVIEW_NOT_FOUND');
    return proposal;
  };
  const decisions = (proposal: Proposal) =>
    proposal.bank.quizzes.map((question) => {
      const record = readRecord(
        root,
        `decisions/${proposal.id}/${question.id}.json`,
        decisionSchema,
      );
      if (
        record &&
        (record.input.proposalId !== proposal.id ||
          record.input.proposalHash !== fingerprint(proposal) ||
          record.input.questionId !== question.id ||
          record.input.questionHash !==
            proposal.contexts.find((context) => context.questionId === question.id)?.questionHash)
      )
        throw new Error('QUIZ_REVIEW_CORRUPT_DECISION');
      return record || null;
    });
  const assertCurrent = (proposal: Proposal) => {
    const current = curriculum();
    if (proposal.curriculumHash !== fingerprint(current))
      throw new Error('QUIZ_REVIEW_STALE_COURSE');
    const bank = validateTeachingBank(proposal.bank, current);
    if (
      bank.status !== 'draft' ||
      fingerprint(bank.quizzes.map((quiz) => questionContext(quiz, current))) !==
        fingerprint(proposal.contexts)
    )
      throw new Error('QUIZ_REVIEW_CORRUPT_PROPOSAL');
    return current;
  };
  const describe = (proposal: Proposal) => ({
    proposal,
    proposalHash: fingerprint(proposal),
    decisions: decisions(proposal),
    active: readPointer(root)?.selection || null,
    current: proposal.curriculumHash === fingerprint(curriculum()),
  });

  return {
    status() {
      const selected = readPointer(root)?.selection || null;
      const release = selected ? readRelease(root, selected) : null;
      const current = curriculum();
      const folder = checkedPath(root, 'releases');
      // Reserve even a sealed release whose pointer write was interrupted; it cannot be overwritten.
      const reservedVersion = fs.existsSync(folder)
        ? fs
            .readdirSync(folder)
            .filter((name) => /^\d{1,4}\.\d{1,4}\.\d{1,4}\.json$/.test(name))
            .map((name) => name.slice(0, -5))
            .reduce<string | null>(
              (latest, version) => (!latest || laterVersion(version, latest) ? version : latest),
              null,
            )
        : null;
      return {
        active: selected,
        reservedVersion,
        curriculumVersion: current.version,
        curriculumHash: fingerprint(current),
        available: Boolean(release && release.curriculumHash === fingerprint(current)),
      };
    },
    list() {
      const folder = checkedPath(root, 'proposals');
      if (!fs.existsSync(folder)) return { total: 0, proposals: [] };
      const records = fs
        .readdirSync(folder)
        .filter((name) => /^[a-f0-9-]{36}\.json$/.test(name))
        .map((name) => readProposal(name.slice(0, -5)))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
      return {
        total: records.length,
        proposals: records.slice(0, 100).map((record) => ({
          id: record.id,
          targetVersion: record.targetVersion,
          createdAt: record.createdAt,
          curriculumVersion: record.bank.curriculumVersion,
          questionCount: record.bank.quizzes.length,
          proposalHash: fingerprint(record),
        })),
      };
    },
    details(id: string) {
      return describe(readProposal(id));
    },
    question(proposalId: string, questionId: string) {
      const proposal = readProposal(proposalId),
        current = assertCurrent(proposal);
      const question = proposal.bank.quizzes.find((quiz) => quiz.id === stableId.parse(questionId));
      if (!question) throw new Error('QUIZ_REVIEW_NOT_FOUND');
      return {
        question,
        context: proposal.contexts.find((item) => item.questionId === question.id)!,
        lessonTitle: current.lessons.find((lesson) => lesson.id === question.lessonId)!.title,
        sourceText: teachingSection(
          readCatalogLesson(current, question.lessonId),
          question.sourceSection,
        ),
      };
    },
    create(
      requestId: string,
      targetVersion: string,
      rawDraft: unknown,
      now = new Date(),
      expectedCurriculumHash?: string,
    ) {
      const id = z.uuid().parse(requestId),
        target = bankVersion.parse(targetVersion);
      return withAuditorLock(root, () => {
        const current = curriculum(),
          bank = validateTeachingBank(rawDraft, current);
        if (expectedCurriculumHash && fingerprint(current) !== digest.parse(expectedCurriculumHash))
          throw new Error('QUIZ_REVIEW_STALE_COURSE');
        if (bank.status !== 'draft') throw new Error('QUIZ_REVIEW_DRAFT_REQUIRED');
        const requestHash = fingerprint({
          targetVersion: target,
          bank,
          curriculumHash: fingerprint(current),
        });
        const existing = readRecord(root, `proposals/${id}.json`, proposalSchema);
        if (existing) {
          if (existing.createdBy !== actor.id || existing.requestHash !== requestHash)
            throw new Error('QUIZ_REVIEW_REQUEST_CONFLICT');
          return describe(existing);
        }
        const active = readPointer(root)?.selection;
        if (active && !laterVersion(target, active.version))
          throw new Error('QUIZ_REVIEW_VERSION_ORDER');
        if (readRecord(root, `releases/${target}.json`, releaseSchema))
          throw new Error('QUIZ_REVIEW_VERSION_USED');
        const proposal = proposalSchema.parse({
          schemaVersion: 1,
          id,
          targetVersion: target,
          createdAt: now.toISOString(),
          createdBy: actor.id,
          requestHash,
          curriculumHash: fingerprint(current),
          bank,
          contexts: bank.quizzes.map((quiz) => questionContext(quiz, current)),
        });
        writeRecord(root, `proposals/${id}.json`, proposal);
        return describe(proposal);
      });
    },
    decide(raw: unknown, now = new Date()) {
      const input = questionDecisionInput.parse(raw);
      return withAuditorLock(root, () => {
        const proposal = readProposal(input.proposalId);
        assertCurrent(proposal);
        if (fingerprint(proposal) !== input.proposalHash)
          throw new Error('QUIZ_REVIEW_STALE_PROPOSAL');
        if (
          proposal.contexts.find((context) => context.questionId === input.questionId)
            ?.questionHash !== input.questionHash
        )
          throw new Error('QUIZ_REVIEW_STALE_QUESTION');
        const relative = `decisions/${proposal.id}/${input.questionId}.json`;
        const old = readRecord(root, relative, decisionSchema);
        if (old) {
          if (old.reviewerId !== actor.id || fingerprint(old.input) !== fingerprint(input))
            throw new Error('QUIZ_REVIEW_ALREADY_DECIDED');
          return old;
        }
        const decision = decisionSchema.parse({
          schemaVersion: 1,
          input,
          reviewerId: actor.id,
          reviewedAt: now.toISOString(),
        });
        writeRecord(root, relative, decision);
        return decision;
      });
    },
    publish(proposalId: string, proposalHash: string, requestId: string, now = new Date()) {
      const id = z.uuid().parse(requestId),
        expected = digest.parse(proposalHash);
      return withAuditorLock(root, () => {
        const proposal = readProposal(proposalId);
        assertCurrent(proposal);
        if (fingerprint(proposal) !== expected) throw new Error('QUIZ_REVIEW_STALE_PROPOSAL');
        const approval = decisions(proposal);
        if (approval.some((decision) => decision?.input.decision !== 'approve'))
          throw new Error('QUIZ_REVIEW_INCOMPLETE');
        const payloadHash = fingerprint({
          kind: 'publish',
          proposalId,
          proposalHash: expected,
          actorId: actor.id,
        });
        const pointer = readPointer(root);
        if (pointer?.operation.requestId === id) {
          if (pointer.operation.kind !== 'publish' || pointer.operation.payloadHash !== payloadHash)
            throw new Error('QUIZ_REVIEW_REQUEST_CONFLICT');
          if (pointer.selection) readRelease(root, pointer.selection);
          return pointer;
        }
        if (pointer?.selection && !laterVersion(proposal.targetVersion, pointer.selection.version))
          throw new Error('QUIZ_REVIEW_VERSION_ORDER');
        const relative = `releases/${proposal.targetVersion}.json`;
        let release = readRecord(root, relative, releaseSchema);
        if (release) {
          if (
            release.proposalId !== proposal.id ||
            release.proposalHash !== expected ||
            fingerprint(release.previous) !== fingerprint(pointer?.selection || null)
          )
            throw new Error('QUIZ_REVIEW_RELEASE_CONFLICT');
          readRelease(root, { version: release.version, releaseHash: fingerprint(release) });
          if (
            fingerprint(release.decisionHashes) !==
              fingerprint(approval.map((decision) => fingerprint(decision))) ||
            release.curriculumHash !== proposal.curriculumHash ||
            release.bank.curriculumVersion !== proposal.bank.curriculumVersion ||
            fingerprint(release.bank.quizzes) !== fingerprint(proposal.bank.quizzes)
          )
            throw new Error('QUIZ_REVIEW_CORRUPT_RELEASE');
        } else {
          release = releaseSchema.parse({
            schemaVersion: 1,
            version: proposal.targetVersion,
            proposalId: proposal.id,
            proposalHash: expected,
            curriculumHash: proposal.curriculumHash,
            bank: {
              ...proposal.bank,
              version: proposal.targetVersion,
              status: 'published',
              reviewStatus: 'approved',
            },
            decisionHashes: approval.map((decision) => fingerprint(decision)),
            previous: pointer?.selection || null,
            publishedAt: now.toISOString(),
            publishedBy: actor.id,
          });
          writeRecord(root, relative, release);
        }
        const next = pointerSchema.parse({
          schemaVersion: 1,
          selection: { version: release.version, releaseHash: fingerprint(release) },
          operation: { requestId: id, kind: 'publish', payloadHash },
        });
        writeRecord(root, 'active.json', next, true);
        return next;
      });
    },
    rollback(requestId: string, expectedReleaseHash: string) {
      const id = z.uuid().parse(requestId),
        expected = digest.parse(expectedReleaseHash);
      return withAuditorLock(root, () => {
        const payloadHash = fingerprint({
          kind: 'rollback',
          expectedReleaseHash: expected,
          actorId: actor.id,
        });
        const pointer = readPointer(root);
        if (pointer?.operation.requestId === id) {
          if (
            pointer.operation.kind !== 'rollback' ||
            pointer.operation.payloadHash !== payloadHash
          )
            throw new Error('QUIZ_REVIEW_REQUEST_CONFLICT');
          if (pointer.selection) readRelease(root, pointer.selection);
          return pointer;
        }
        if (!pointer?.selection || pointer.selection.releaseHash !== expected)
          throw new Error('QUIZ_REVIEW_STALE_RELEASE');
        const release = readRelease(root, pointer.selection);
        if (release.previous) readRelease(root, release.previous);
        const next = pointerSchema.parse({
          schemaVersion: 1,
          selection: release.previous,
          operation: { requestId: id, kind: 'rollback', payloadHash },
        });
        writeRecord(root, 'active.json', next, true);
        return next;
      });
    },
  };
}
