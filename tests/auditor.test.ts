import { describe, it, expect, afterEach, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadCurriculum, readLesson, readCatalogLesson } from '../src/lib/curriculum/load';
import {
  candidateRelease,
  createProposal,
  dependencyImpact,
  fingerprint,
  laterVersion,
  sectionRange,
  textHash,
} from '../src/lib/auditor/analysis';
import { proposalInputSchema } from '../src/lib/auditor/schema';
import { auditorStore, currentAuditorCatalog } from '../src/lib/auditor/store';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { quizRepository } from '../src/lib/db/quizzes';
import { questionHash } from '../src/lib/quizzes/catalog';
import { checkedPath, withAuditorLock } from '../src/lib/auditor/files';

const c = loadCurriculum();
const bodies = Object.fromEntries(
  c.lessons
    .filter((lesson) => lesson.publicationStatus === 'published')
    .map((lesson) => [lesson.id, readLesson(lesson.id)]),
);
const lesson = c.lessons.find((lesson) => lesson.id === 'W01D01_FIRST_AI_PROGRAM')!;
export const proposalFixture = () => ({
  id: randomUUID(),
  baseVersion: c.version,
  baseHash: fingerprint(c),
  targetVersion: '2.2.1',
  title: 'בדיקה מבודדת של מנגנון פרסום',
  newInformation: 'זהו נוסח לבדיקת המערכת בלבד, ולא עדכון טכני שנבדק או חומר לפרסום.',
  reason: 'לוודא שגרסה חדשה נשמרת בלי לשנות מזהים או התקדמות של לומדים.',
  confidence: 'low' as const,
  estimatedMinutes: 20,
  severity: 'LOW' as const,
  action: 'UPDATE' as const,
  evidence: [
    {
      sourceId: lesson.sourceIds[0],
      summary: 'מקור זה משמש רק לבדיקת הפניה קיימת; הבדיקה אינה מאמתת טענה טכנית חדשה.',
    },
  ],
  changes: [
    {
      lessonId: lesson.id,
      section: 'Engineering Notes' as const,
      beforeHash: textHash(bodies[lesson.id]),
      newText: `${sectionRange(bodies[lesson.id], 'Engineering Notes').text}\n\nנוסח נוסף לבדיקת מערכת פרסום מבודדת בלבד.`,
    },
  ],
});

const resources: { directory: string; connection: Connection }[] = [];
afterEach(() => {
  for (const item of resources.splice(0)) {
    item.connection.sqlite.close();
    fs.rmSync(item.directory, { recursive: true, force: true });
  }
  vi.unstubAllEnvs();
});
const actor = { id: 'qa-operator', email: 'qa-operator@example.test', emailVerified: true };
function workspace(fault?: (stage: string) => void) {
  vi.stubEnv('ADMIN_EMAILS', actor.email);
  const directory = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'auditor-isolated-'));
  const connection = connect(':memory:');
  setupDatabase(connection, c);
  resources.push({ directory, connection });
  return {
    directory,
    connection,
    store: auditorStore(connection, actor, { directory, now: () => now, fault }),
  };
}
function approved(store: ReturnType<typeof auditorStore>, input = proposalFixture()) {
  const proposed = store.propose(input);
  store.decide({
    id: proposed.id,
    proposalHash: proposed.hash,
    decision: 'approve',
    rationale: 'בדיקה מבודדת של המנגנון; זה אינו אישור אנושי לפרסום תוכן בקורס האמיתי.',
    checkedPrimarySources: true,
    checkedTeaching: true,
    foundationRationale:
      'בדיקה מבודדת בלבד. נבדק שמנגנון הפרסום מחייב התייחסות מפורשת לשינוי יסודות ושאינו מחליף אותם עקב פרסום שיווקי.',
  });
  return proposed;
}
describe('immutable reviewed publication and rollback', () => {
  it('requires a verified operator and explicit exact-hash review before activation', () => {
    const { store, connection, directory } = workspace();
    expect(() =>
      auditorStore(connection, { ...actor, emailVerified: false }, { directory }),
    ).toThrow('NOT_FOUND');
    const p = store.propose(proposalFixture());
    expect(() => store.apply(p.id, p.hash)).toThrow('APPROVAL_REQUIRED');
    const decision = {
      id: p.id,
      proposalHash: p.hash,
      decision: 'approve',
      rationale: 'זהו הסבר ארוך מספיק לבדיקת הצורך באישור מפורש לפני פרסום.',
      checkedPrimarySources: false,
      checkedTeaching: true,
      foundationRationale: '',
    };
    expect(() => store.decide(decision)).toThrow('REVIEW_REQUIRED');
    expect(() => store.decide({ ...decision, checkedPrimarySources: true })).toThrow(
      'FOUNDATION_REVIEW',
    );
    expect(() => store.decide({ ...decision, proposalHash: '0'.repeat(64) })).toThrow(
      'PROPOSAL_CONFLICT',
    );
    expect(currentAuditorCatalog(directory).version).toBe(c.version);
  });
  it('publishes a real immutable release, registers it, and rolls back without changing any owned records', () => {
    const { store, connection, directory } = workspace();
    const repo = repository(connection, c, 'local');
    repo.updateProgress(lesson.id, 'start');
    repo.updateProgress(lesson.id, 'complete-build');
    repo.saveNote(lesson.id, 'הערה פרטית של חשבון בדיקה, שאינה נכתבת לתוכן הקורס.');
    repo.savePosition(lesson.id, 'section-1-0');
    const rubric = c.assessments.find((item) => item.lessonId === lesson.id)!;
    assessmentRepository(connection, c, 'local').submit({
      submissionId: randomUUID(),
      assessmentId: rubric.id,
      rubricVersion: rubric.version,
      curriculumVersion: c.version,
      evidence: Object.fromEntries(
        rubric.criteria.map((item) => [
          item.id,
          'ראיות מדומות עם הסבר מלא לבדיקת שמירת ההגשה במהלך שינוי גרסה. '.repeat(3),
        ]),
      ),
      artifacts: [
        {
          id: randomUUID(),
          criterionId: rubric.criteria[0].id,
          name: 'isolated-evidence.txt',
          data: new TextEncoder().encode(
            'Synthetic proof bytes for immutable release preservation.',
          ),
        },
      ],
      portfolio: {
        included: true,
        title: 'עבודת בדיקה מבודדת',
        summary: 'תיק עבודות מדומה לבדיקת שמירת הגרסה והראיות.',
      },
    });
    quizRepository(connection, c, 'local').save({
      requestId: randomUUID(),
      lessonId: lesson.id,
      curriculumVersion: c.version,
      questionHash,
      optionId: 'evidence',
    });
    const ownedBefore = repo.exportData(),
      baseBody = readCatalogLesson(c, lesson.id),
      p = approved(store);
    expect(store.apply(p.id, p.hash)).toEqual({ state: 'APPLIED', version: '2.2.1' });
    const next = currentAuditorCatalog(directory);
    expect(next.version).toBe('2.2.1');
    expect(readCatalogLesson(next, lesson.id)).toContain(
      'נוסח נוסף לבדיקת מערכת פרסום מבודדת בלבד',
    );
    expect(readCatalogLesson(c, lesson.id)).toBe(baseBody);
    expect(
      connection.sqlite
        .prepare('SELECT version FROM curriculum_versions WHERE version=?')
        .get('2.2.1'),
    ).toBeTruthy();
    expect(ownedRecords(repository(connection, next, 'local').exportData())).toEqual(
      ownedRecords(ownedBefore),
    );
    expect(store.apply(p.id, p.hash).version).toBe('2.2.1');
    expect(store.rollback(p.id, p.hash)).toEqual({ state: 'ROLLED_BACK', version: c.version });
    expect(readCatalogLesson(currentAuditorCatalog(directory), lesson.id)).toBe(baseBody);
    expect(ownedRecords(repo.exportData())).toEqual(ownedRecords(ownedBefore));
    expect(store.rollback(p.id, p.hash).state).toBe('ROLLED_BACK');
    expect(() => store.apply(p.id, p.hash)).toThrow('ALREADY_ROLLED_BACK');
  });
  it('does not overwrite proposals or decisions, and watch/defer cannot publish', () => {
    const { store } = workspace(),
      input = proposalFixture(),
      p = store.propose(input);
    expect(store.propose(input)).toEqual(p);
    expect(() =>
      store.propose({ ...input, reason: `${input.reason} שינוי אחרי הקפאת ההצעה.` }),
    ).toThrow('PROPOSAL_CONFLICT');
    const decision = {
      id: p.id,
      proposalHash: p.hash,
      decision: 'defer',
      rationale: 'ההצעה נשמרת לבדיקה נוספת; עדיין לא בוצעה קריאה של המקורות ונדרשת החלטה אנושית.',
      checkedPrimarySources: false,
      checkedTeaching: false,
      foundationRationale: '',
    };
    expect(store.decide(decision).state).toBe('DEFERRED');
    expect(store.decide(decision).state).toBe('DEFERRED');
    expect(() => store.decide({ ...decision, decision: 'watch' })).toThrow('DECISION_CONFLICT');
    expect(() => store.apply(p.id, p.hash)).toThrow('APPROVAL_REQUIRED');
    const watched = store.propose({ ...proposalFixture(), action: 'WATCH', changes: [] });
    expect(() =>
      store.decide({
        ...decision,
        id: watched.id,
        proposalHash: watched.hash,
        decision: 'approve',
        checkedPrimarySources: true,
        checkedTeaching: true,
      }),
    ).toThrow('WATCH_ONLY');
  });
  it('keeps the active curriculum intact when validation or activation fails and supports an explicit retry', () => {
    let failingStage = 'afterValidation';
    const { store, directory } = workspace((stage) => {
      if (stage === failingStage) throw new Error('INJECTED_IO_FAILURE');
    });
    const p = approved(store);
    expect(() => store.apply(p.id, p.hash)).toThrow('INJECTED_IO_FAILURE');
    expect(currentAuditorCatalog(directory).version).toBe(c.version);
    failingStage = 'afterActivation';
    expect(() => store.apply(p.id, p.hash)).toThrow('INJECTED_IO_FAILURE');
    expect(currentAuditorCatalog(directory).version).toBe(c.version);
    expect(store.details(p.id).state).toBe('APPROVED');
    failingStage = '';
    expect(store.apply(p.id, p.hash).state).toBe('APPLIED');
    failingStage = 'afterRollbackActivation';
    expect(() => store.rollback(p.id, p.hash)).toThrow('INJECTED_IO_FAILURE');
    expect(currentAuditorCatalog(directory).version).toBe('2.2.1');
    failingStage = '';
    expect(store.rollback(p.id, p.hash).state).toBe('ROLLED_BACK');
  });
  it('rejects stale bases, later-release rollback, edited release bytes, symlinks and concurrent locks', () => {
    const { store, directory } = workspace();
    const first = approved(store),
      stale = approved(store, { ...proposalFixture(), targetVersion: '2.2.2' });
    store.apply(first.id, first.hash);
    expect(() => store.apply(stale.id, stale.hash)).toThrow('STALE_BASE');
    const latest = currentAuditorCatalog(directory),
      latestBody = readCatalogLesson(latest, lesson.id),
      input = proposalFixture();
    const second = approved(store, {
      ...input,
      baseVersion: latest.version,
      baseHash: fingerprint(latest),
      targetVersion: '2.2.2',
      changes: [
        {
          ...input.changes[0],
          beforeHash: textHash(latestBody),
          newText: `${sectionRange(latestBody, 'Engineering Notes').text}\n\nתוספת שנייה לבדיקת סדר גרסאות מבודדת בלבד.`,
        },
      ],
    });
    store.apply(second.id, second.hash);
    expect(() => store.rollback(first.id, first.hash)).toThrow('ROLLBACK_CONFLICT');
    withAuditorLock(directory, () =>
      expect(() => store.propose(proposalFixture())).toThrow('AUDITOR_BUSY'),
    );
    fs.symlinkSync('/private/tmp', path.join(directory, 'foreign'));
    expect(() => checkedPath(directory, 'foreign/private.json')).toThrow('SYMLINK');
    fs.appendFileSync(
      path.join(directory, 'releases/2.2.2/lessons', `${lesson.id}.md`),
      '\nשינוי שלא אושר.',
    );
    expect(() => currentAuditorCatalog(directory)).toThrow('RELEASE_INTEGRITY');
    expect(() => checkedPath(directory, '../outside')).toThrow('AUDITOR_PATH');
  });
  it('reconciles interrupted apply and rollback from the actual pointer before another mutation', () => {
    const { store, directory } = workspace(),
      p = approved(store);
    store.apply(p.id, p.hash);
    const applicationPath = path.join(directory, `applications/${p.id}.json`),
      applied = JSON.parse(fs.readFileSync(applicationPath, 'utf8'));
    fs.writeFileSync(
      applicationPath,
      JSON.stringify({ ...applied, state: 'prepared', completedAt: null }),
    );
    expect(store.details(p.id).state).toBe('APPLIED');
    expect(store.apply(p.id, p.hash).state).toBe('APPLIED');
    expect(JSON.parse(fs.readFileSync(applicationPath, 'utf8')).state).toBe('applied');
    store.rollback(p.id, p.hash);
    fs.writeFileSync(
      applicationPath,
      JSON.stringify({ ...applied, state: 'rollback-prepared', completedAt: null }),
    );
    expect(store.details(p.id).state).toBe('ROLLED_BACK');
    expect(store.rollback(p.id, p.hash).state).toBe('ROLLED_BACK');
    expect(JSON.parse(fs.readFileSync(applicationPath, 'utf8')).state).toBe('rolled-back');
  });
});
const now = new Date('2026-10-03T12:00:00Z');
const ownedRecords = (value: ReturnType<ReturnType<typeof repository>['exportData']>) => {
  const {
    exportedAt: _time,
    curriculumVersion: _version,
    curriculumVersions: _versions,
    ...owned
  } = value;
  void _time;
  void _version;
  void _versions;
  return owned;
};
describe('reviewed curriculum proposals', () => {
  it('freezes the exact baseline, complete old/new text and real references without claiming source verification', () => {
    const proposal = createProposal(c, bodies, proposalFixture(), now);
    expect(proposal.input.baseHash).toBe(fingerprint(c));
    expect(proposal.comparison[0].beforeText).toBe(
      sectionRange(bodies[lesson.id], 'Engineering Notes').text,
    );
    expect(proposal.comparison[0].afterText).toContain('מבודדת בלבד');
    expect(proposal.evidence[0].url).toBe(
      c.sources.find((source) => source.id === lesson.sourceIds[0])!.url,
    );
    expect(proposal.evidence[0].verification).toBe('human-review-required');
    expect(proposal.impact.directLessonIds).toEqual([lesson.id]);
    expect(proposal.impact.foundationTouched).toBe(true);
    expect(proposal.candidateHash).toMatch(/^[a-f0-9]{64}$/);
  });
  it('builds a new valid version and leaves the base, IDs, rubrics and verification dates unchanged', () => {
    const before = fingerprint(c),
      input = proposalFixture();
    const candidate = candidateRelease(c, bodies, input, '2026-10-03');
    expect(fingerprint(c)).toBe(before);
    expect(candidate.catalog.version).toBe('2.2.1');
    expect(candidate.catalog.lessons.map((item) => item.id)).toEqual(
      c.lessons.map((item) => item.id),
    );
    expect(candidate.catalog.assessments).toEqual(c.assessments);
    expect(candidate.catalog.lastVerified).toBe(c.lastVerified);
    expect(candidate.catalog.lessons.find((item) => item.id === lesson.id)!.lastVerified).toBe(
      lesson.lastVerified,
    );
    expect(candidate.catalog.lessonBodyHashes[lesson.id]).not.toBe(c.lessonBodyHashes[lesson.id]);
    for (const other of c.lessons.filter((item) => item.id !== lesson.id)) {
      expect(candidate.bodies[other.id]).toBe(bodies[other.id]);
      expect(candidate.catalog.lessons.find((item) => item.id === other.id)!.version).toBe(
        other.version,
      );
    }
  });
  it('rejects stale bases, unchanged/stale bodies, injected headings, duplicate edits and invalid references', () => {
    expect(() =>
      createProposal(c, bodies, { ...proposalFixture(), baseHash: '0'.repeat(64) }, now),
    ).toThrow('STALE_BASE');
    expect(() =>
      createProposal(c, bodies, { ...proposalFixture(), targetVersion: '2.2.0' }, now),
    ).toThrow('VERSION_ORDER');
    const input = proposalFixture();
    expect(() =>
      createProposal(
        c,
        bodies,
        { ...input, changes: [{ ...input.changes[0], beforeHash: '0'.repeat(64) }] },
        now,
      ),
    ).toThrow('STALE_BODY');
    expect(() =>
      createProposal(
        c,
        bodies,
        {
          ...input,
          changes: [
            {
              ...input.changes[0],
              newText: input.changes[0].newText + '\n## Injected\nInvalid heading',
            },
          ],
        },
        now,
      ),
    ).toThrow('SECTION_BOUNDARY');
    expect(() =>
      createProposal(
        c,
        bodies,
        {
          ...input,
          changes: [
            {
              ...input.changes[0],
              newText: sectionRange(bodies[lesson.id], 'Engineering Notes').text,
            },
          ],
        },
        now,
      ),
    ).toThrow('NO_CHANGE');
    expect(
      proposalInputSchema.safeParse({ ...input, changes: [...input.changes, ...input.changes] })
        .success,
    ).toBe(false);
    expect(() =>
      createProposal(
        c,
        bodies,
        { ...input, evidence: [{ ...input.evidence[0], sourceId: 'UNKNOWN' }] },
        now,
      ),
    ).toThrow('UNKNOWN_SOURCE');
    expect(() =>
      createProposal(
        c,
        bodies,
        {
          ...input,
          evidence: [
            {
              ...input.evidence[0],
              sourceId: c.sources.find(
                (source) =>
                  !source.lessonIds.includes(lesson.id) && !lesson.sourceIds.includes(source.id),
              )!.id,
            },
          ],
        },
        now,
      ),
    ).toThrow('UNRELATED_SOURCE');
    expect(() => createProposal(c, bodies, { ...input, severity: 'CRITICAL' }, now)).toThrow(
      'MORE_EVIDENCE',
    );
  });
  it('supports watch without silently preparing a teaching change and compares semantic versions numerically', () => {
    const proposal = createProposal(
      c,
      bodies,
      { ...proposalFixture(), action: 'WATCH', changes: [] },
      now,
    );
    expect(proposal.candidateHash).toBeNull();
    expect(proposal.comparison).toEqual([]);
    expect(proposal.impact.directLessonIds).toEqual([]);
    expect(proposalInputSchema.safeParse({ ...proposalFixture(), action: 'WATCH' }).success).toBe(
      false,
    );
    expect(laterVersion('2.10.0', '2.9.9')).toBe(true);
    expect(laterVersion('2.9.9', '2.10.0')).toBe(false);
  });
  it('computes downstream lesson, skill and module prerequisites without returning unrelated leaves', () => {
    const fixture = structuredClone(c);
    fixture.lessons = [
      { ...lesson, id: 'ROOT', skillIds: ['ONE'], prerequisiteLessonIds: [] },
      { ...lesson, id: 'CHILD', skillIds: ['TWO'], prerequisiteLessonIds: ['ROOT'] },
      { ...lesson, id: 'OTHER', skillIds: ['OTHER'], prerequisiteLessonIds: [] },
      { ...lesson, id: 'MODULE_CHILD', skillIds: ['OTHER'], prerequisiteLessonIds: [] },
    ];
    fixture.skills = [
      { ...c.skills[0], id: 'ONE', prerequisiteSkillIds: [] },
      { ...c.skills[0], id: 'TWO', prerequisiteSkillIds: ['ONE'] },
      { ...c.skills[0], id: 'OTHER', prerequisiteSkillIds: [] },
    ];
    fixture.modules = [
      { ...c.modules![0], id: 'A', lessonIds: ['ROOT', 'CHILD'], prerequisiteModuleIds: [] },
      { ...c.modules![0], id: 'B', lessonIds: ['MODULE_CHILD'], prerequisiteModuleIds: ['A'] },
      { ...c.modules![0], id: 'C', lessonIds: ['OTHER'], prerequisiteModuleIds: [] },
    ];
    const impact = dependencyImpact(fixture, ['ROOT']);
    // Sharing an affected downstream skill is a real review dependency, so OTHER is included.
    expect(impact.downstreamLessonIds).toEqual(['CHILD', 'OTHER', 'MODULE_CHILD']);
    expect(new Set(impact.affectedSkillIds)).toEqual(new Set(['ONE', 'TWO', 'OTHER']));
    expect(dependencyImpact(fixture, []).downstreamLessonIds).toEqual([]);
  });
});
