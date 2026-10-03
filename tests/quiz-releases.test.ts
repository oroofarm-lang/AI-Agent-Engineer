import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { bindCatalogDirectory } from '../src/lib/curriculum/runtime';
import { fingerprint } from '../src/lib/auditor/analysis';
import { teachingBankSchema, teachingSection, validateTeachingBank } from '../src/lib/quizzes/bank';
import { publishedTeachingBank, quizReviewStore } from '../src/lib/quizzes/review-store';

// All review writes are synthetic and isolated. The real authoring file is read, never approved.
const courseRoot = path.resolve('content/releases/2.2.0');
const completeCourse = loadCurriculum(courseRoot);
const completeDraft = teachingBankSchema.parse(
  JSON.parse(fs.readFileSync('content/authoring/quiz-bank/1.0.0-draft.json', 'utf8')),
);
const lessonIds = completeDraft.quizzes.slice(0, 2).map((question) => question.lessonId);
const course = {
  ...completeCourse,
  lessons: completeCourse.lessons.filter((lesson) => lessonIds.includes(lesson.id)),
  lessonBodyHashes: Object.fromEntries(
    lessonIds.map((id) => [id, completeCourse.lessonBodyHashes[id]]),
  ),
};
bindCatalogDirectory(course, courseRoot);
const draft = { ...completeDraft, quizzes: completeDraft.quizzes.slice(0, 2) };
const actor = { id: 'synthetic-reviewer', email: 'qa-reviewer@example.test', emailVerified: true };
let temp: string;
let root: string;
let current = course;
const store = () => quizReviewStore(actor, { root, curriculum: () => current });
function proposal(version = '1.0.0') {
  return store().create(randomUUID(), version, draft);
}
function decision(
  review: ReturnType<typeof proposal>,
  index = 0,
  outcome: 'approve' | 'reject' = 'approve',
) {
  const question = review.proposal.contexts[index];
  return {
    proposalId: review.proposal.id,
    proposalHash: review.proposalHash,
    questionId: question.questionId,
    questionHash: question.questionHash,
    decision: outcome,
    answerChecked: true,
    sourcesChecked: true,
    hebrewChecked: true,
    notes:
      'Synthetic isolated decision for a persistence test; this is not a human teaching approval.',
  };
}
function approve(review: ReturnType<typeof proposal>) {
  review.proposal.contexts.forEach((_, index) => store().decide(decision(review, index)));
}
function publish(version = '1.0.0') {
  const review = proposal(version);
  approve(review);
  return store().publish(review.proposal.id, review.proposalHash, randomUUID());
}
beforeEach(() => {
  vi.stubEnv('ADMIN_EMAILS', actor.email);
  temp = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'quiz-review-test-')));
  root = path.join(temp, 'private-review');
  current = course;
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  fs.rmSync(temp, { recursive: true, force: true });
});

describe('reviewed teaching-question releases', () => {
  it('validates actual complete draft linkage without treating it as published', () => {
    expect(validateTeachingBank(completeDraft, completeCourse).quizzes).toHaveLength(139);
    expect(publishedTeachingBank(completeCourse, root)).toBeNull();
    expect(fs.existsSync(root)).toBe(false);
  });

  it('resolves genuine sections while ignoring nested-looking headings inside longer fences', () => {
    const body =
      '## Concepts\nThis substantive section must be returned intact.\n````md\n```\n## Fake\nnot another section\n````\nMore real content here.\n## Lab\nAnother substantive real section follows here.';
    const text = teachingSection(body, 'Concepts');
    expect(text).toContain('## Fake');
    expect(text).toContain('More real content here.');
    expect(text).not.toContain('Another substantive');
    expect(() => teachingSection(body, 'Fake')).toThrow('QUIZ_REVIEW_SOURCE_SECTION');
  });

  it('rejects duplicate coverage, normalized duplicate choices and unassigned sources', () => {
    expect(() =>
      validateTeachingBank({ ...draft, quizzes: [draft.quizzes[0], draft.quizzes[0]] }, course),
    ).toThrow('QUIZ_REVIEW_COVERAGE');
    const copy = structuredClone(draft);
    copy.quizzes[0].options[1].text = ` ${copy.quizzes[0].options[0].text} `;
    expect(() => validateTeachingBank(copy, course)).toThrow('QUIZ_REVIEW_QUESTION');
    copy.quizzes[0].options = draft.quizzes[0].options;
    copy.quizzes[0].sourceIds = ['NONEXISTENT_SOURCE'];
    expect(() => validateTeachingBank(copy, course)).toThrow('QUIZ_REVIEW_QUESTION');
    expect(() => validateTeachingBank({ ...draft, status: 'published' }, course)).toThrow(
      'QUIZ_REVIEW_STATUS',
    );
  });

  it('requires verified allowlisted operators even for a trusted local store', () => {
    expect(() => quizReviewStore({ ...actor, emailVerified: false }, { root })).toThrow(
      'QUIZ_REVIEW_FORBIDDEN',
    );
    expect(() => quizReviewStore({ ...actor, email: 'learner@example.test' }, { root })).toThrow(
      'QUIZ_REVIEW_FORBIDDEN',
    );
    expect(fs.existsSync(root)).toBe(false);
  });

  it('freezes proposals and actual question/source contexts with idempotent creation', () => {
    const id = randomUUID();
    const first = store().create(id, '1.0.0', draft, new Date('2026-10-01T00:00:00Z'));
    expect(store().create(id, '1.0.0', draft).proposal).toEqual(first.proposal);
    expect(() => store().create(id, '1.1.0', draft)).toThrow('QUIZ_REVIEW_REQUEST_CONFLICT');
    const read = store().question(id, first.proposal.bank.quizzes[0].id);
    expect(read.context.questionHash).toBe(first.proposal.contexts[0].questionHash);
    expect(read.sourceText.length).toBeGreaterThan(30);
    expect(read.context.sources[0].url).toMatch(/^https:\/\//);
    expect(store().list()).toMatchObject({ total: 1, proposals: [{ id, questionCount: 2 }] });
    expect(first.decisions).toEqual([null, null]);
    expect(publishedTeachingBank(course, root)).toBeNull();
  });

  it('requires explicit answer/source/Hebrew acknowledgements and binds immutable decisions to exact bytes', () => {
    const review = proposal();
    for (const field of ['answerChecked', 'sourcesChecked', 'hebrewChecked']) {
      expect(() => store().decide({ ...decision(review), [field]: false })).toThrow();
    }
    expect(() => store().decide({ ...decision(review), notes: 'too short' })).toThrow();
    expect(() => store().decide({ ...decision(review), proposalHash: '0'.repeat(64) })).toThrow(
      'QUIZ_REVIEW_STALE_PROPOSAL',
    );
    expect(() => store().decide({ ...decision(review), questionHash: '0'.repeat(64) })).toThrow(
      'QUIZ_REVIEW_STALE_QUESTION',
    );
    const first = store().decide(decision(review), new Date('2026-10-01T00:00:00Z'));
    expect(store().decide(decision(review))).toEqual(first);
    expect(() => store().decide(decision(review, 0, 'reject'))).toThrow(
      'QUIZ_REVIEW_ALREADY_DECIDED',
    );
    expect(publishedTeachingBank(course, root)).toBeNull();
  });

  it('cannot publish incomplete or rejected proposals and never silently approves a question', () => {
    const review = proposal();
    expect(() => store().publish(review.proposal.id, review.proposalHash, randomUUID())).toThrow(
      'QUIZ_REVIEW_INCOMPLETE',
    );
    store().decide(decision(review));
    store().decide({ ...decision(review, 1, 'reject'), answerChecked: false });
    expect(() => store().publish(review.proposal.id, review.proposalHash, randomUUID())).toThrow(
      'QUIZ_REVIEW_INCOMPLETE',
    );
    expect(publishedTeachingBank(course, root)).toBeNull();
  });

  it('publishes only after all approvals, persists exact release bytes and replays the same publication', () => {
    const review = proposal();
    approve(review);
    const id = randomUUID();
    const first = store().publish(
      review.proposal.id,
      review.proposalHash,
      id,
      new Date('2026-10-01T00:00:00Z'),
    );
    const bytes = fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8');
    expect(store().publish(review.proposal.id, review.proposalHash, id)).toEqual(first);
    expect(fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8')).toBe(bytes);
    expect(publishedTeachingBank(course, root)).toMatchObject({
      version: '1.0.0',
      status: 'published',
      reviewStatus: 'approved',
      quizzes: draft.quizzes,
    });
    expect(JSON.parse(bytes).decisionHashes).toHaveLength(2);
    expect(() => store().create(randomUUID(), '1.0.0', draft)).toThrow('QUIZ_REVIEW_VERSION_ORDER');
  });

  it('pauses stale-course releases without altering stored decisions or historical release bytes', () => {
    publish();
    const review = proposal('1.1.0');
    const release = fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8');
    current = { ...course, version: '2.3.0' };
    expect(publishedTeachingBank(current, root)).toBeNull();
    expect(() => store().decide(decision(review))).toThrow('QUIZ_REVIEW_STALE_COURSE');
    expect(() => store().publish(review.proposal.id, review.proposalHash, randomUUID())).toThrow(
      'QUIZ_REVIEW_STALE_COURSE',
    );
    expect(fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8')).toBe(release);
    current = course;
    expect(publishedTeachingBank(current, root)?.version).toBe('1.0.0');
  });

  it('recovers a real interrupted pointer update using the sealed release without rewriting it', () => {
    const review = proposal();
    approve(review);
    const rename = fs.renameSync;
    let injected = false;
    vi.spyOn(fs, 'renameSync').mockImplementation((from, to) => {
      if (String(to) === path.join(root, 'active.json')) {
        injected = true;
        throw new Error('synthetic-pointer-write-failure');
      }
      return rename(from, to);
    });
    const id = randomUUID();
    expect(() => store().publish(review.proposal.id, review.proposalHash, id)).toThrow(
      'synthetic-pointer-write-failure',
    );
    expect(injected).toBe(true);
    const bytes = fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8');
    expect(publishedTeachingBank(course, root)).toBeNull();
    expect(fs.existsSync(path.join(root, 'mutation.lock'))).toBe(false);
    vi.restoreAllMocks();
    store().publish(review.proposal.id, review.proposalHash, id);
    expect(fs.readFileSync(path.join(root, 'releases/1.0.0.json'), 'utf8')).toBe(bytes);
    expect(publishedTeachingBank(course, root)?.version).toBe('1.0.0');
  });

  it('rolls back the exact active identity, retains releases and rejects stale rollback and UUID conflicts', () => {
    const first = publish();
    const second = publish('1.1.0');
    expect(() => store().rollback(randomUUID(), first.selection!.releaseHash)).toThrow(
      'QUIZ_REVIEW_STALE_RELEASE',
    );
    const id = randomUUID();
    const rollback = store().rollback(id, second.selection!.releaseHash);
    expect(rollback.selection).toEqual(first.selection);
    expect(store().rollback(id, second.selection!.releaseHash)).toEqual(rollback);
    expect(() => store().rollback(id, first.selection!.releaseHash)).toThrow(
      'QUIZ_REVIEW_REQUEST_CONFLICT',
    );
    expect(fs.existsSync(path.join(root, 'releases/1.1.0.json'))).toBe(true);
    expect(publishedTeachingBank(course, root)?.version).toBe('1.0.0');
    store().rollback(randomUUID(), first.selection!.releaseHash);
    expect(publishedTeachingBank(course, root)).toBeNull();
    expect(store().status()).toMatchObject({ active: null, reservedVersion: '1.1.0' });
    expect(() => proposal('1.0.0')).toThrow('QUIZ_REVIEW_VERSION_USED');
  });

  it('rejects edited release hashes and contradictory stored decision context', () => {
    publish();
    const file = path.join(root, 'releases/1.0.0.json');
    const release = JSON.parse(fs.readFileSync(file, 'utf8'));
    release.bank.quizzes[0].explanation += ' Changed after release.';
    fs.writeFileSync(file, JSON.stringify(release));
    expect(() => publishedTeachingBank(course, root)).toThrow('QUIZ_REVIEW_CORRUPT_RELEASE');
    const review = proposal('1.1.0');
    store().decide(decision(review));
    const decisionFile = path.join(
      root,
      `decisions/${review.proposal.id}/${draft.quizzes[0].id}.json`,
    );
    const saved = JSON.parse(fs.readFileSync(decisionFile, 'utf8'));
    saved.input.questionHash = '0'.repeat(64);
    fs.writeFileSync(decisionFile, JSON.stringify(saved));
    expect(() => store().details(review.proposal.id)).toThrow('QUIZ_REVIEW_CORRUPT_DECISION');
  });

  it('fails closed on symlinks, oversized records and surviving external locks', () => {
    const outside = path.join(temp, 'outside');
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, root, 'dir');
    expect(() => proposal()).toThrow('AUDITOR_SYMLINK');
    fs.unlinkSync(root);
    const review = proposal();
    const proposalFile = path.join(root, `proposals/${review.proposal.id}.json`);
    fs.writeFileSync(proposalFile, 'x'.repeat(1_200_001));
    expect(() => store().details(review.proposal.id)).toThrow('AUDITOR_RECORD_SIZE');
    fs.writeFileSync(path.join(root, 'mutation.lock'), 'external lock');
    expect(() => proposal()).toThrow('AUDITOR_BUSY');
    expect(fs.readFileSync(path.join(root, 'mutation.lock'), 'utf8')).toBe('external lock');
    expect(fs.readdirSync(outside)).toEqual([]);
  });

  it('does not trust a changed question context even when a proposal record is structurally valid', () => {
    const review = proposal();
    const file = path.join(root, `proposals/${review.proposal.id}.json`);
    const edited = JSON.parse(fs.readFileSync(file, 'utf8'));
    edited.contexts[0].sectionHash = '0'.repeat(64);
    fs.writeFileSync(file, JSON.stringify(edited));
    expect(fingerprint(edited)).not.toBe(review.proposalHash);
    expect(() => store().question(review.proposal.id, draft.quizzes[0].id)).toThrow(
      'QUIZ_REVIEW_CORRUPT_PROPOSAL',
    );
  });
});
