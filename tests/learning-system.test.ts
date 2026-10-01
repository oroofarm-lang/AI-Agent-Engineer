import { afterEach, describe, it, expect, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { learningSystem, assessmentReviewer } from '../src/lib/db/learning-system';
const connections: Connection[] = [];
afterEach(() => {
  for (const c of connections.splice(0)) c.sqlite.close();
  vi.unstubAllEnvs();
});
function fixture() {
  const c = loadCurriculum(),
    db = connect(':memory:');
  connections.push(db);
  setupDatabase(db, c);
  for (const id of ['reviewer', 'other'])
    db.sqlite
      .prepare('INSERT INTO users VALUES (?, ?, ?)')
      .run(id, 'he-IL', new Date().toISOString());
  vi.stubEnv('ADMIN_EMAILS', 'reviewer@example.test');
  const actor = { id: 'reviewer', email: 'reviewer@example.test', emailVerified: true },
    r = repository(db, c, 'local'),
    a = c.assessments[0],
    assessments = assessmentRepository(db, c, 'local'),
    system = learningSystem(db, c, 'local');
  const submission = {
    submissionId: randomUUID(),
    assessmentId: a.id,
    rubricVersion: a.version,
    curriculumVersion: c.version,
    evidence: Object.fromEntries(
      a.criteria.map((x) => [
        x.id,
        'ראיות מהרצה מקומית והסבר מפורט להחלטות התכנון, לאישור בדיקה אנושית בלבד. '.repeat(3),
      ]),
    ),
  };
  r.updateProgress(a.lessonId, 'complete-build');
  assessments.submit(submission);
  const review = {
    id: randomUUID(),
    submissionId: submission.submissionId,
    criteria: Object.fromEntries(
      a.criteria.map((x) => [
        x.id,
        {
          level: 2,
          feedback: 'נבדקו הראיות שהוגשו לפי הקריטריון; זהו משוב סינתטי לבדיקת תהליך השמירה.',
        },
      ]),
    ),
  };
  return { c, db, r, a, system, actor, submission, review, assessments };
}
describe('human assessment and project evidence', () => {
  it('rejects unauthorized/self/partial review and never changes progress on rejection', () => {
    const f = fixture();
    expect(() => assessmentReviewer(f.db, { ...f.actor, emailVerified: false })).toThrow(
      'FORBIDDEN',
    );
    expect(() => assessmentReviewer(f.db, { ...f.actor, id: 'local' }).review(f.review)).toThrow(
      'SELF_REVIEW',
    );
    expect(() => assessmentReviewer(f.db, f.actor).review({ ...f.review, criteria: {} })).toThrow(
      'INCOMPLETE_REVIEW',
    );
    expect(f.system.reviews()).toEqual([]);
    expect(f.r.progress()[0].state).toBe('MASTERY_PENDING');
  });
  it('stores immutable idempotent feedback and never downgrades mastery after later failure', () => {
    const f = fixture(),
      reviewer = assessmentReviewer(f.db, f.actor);
    expect(reviewer.review(f.review)).toBe('PASS');
    reviewer.review(f.review);
    expect(f.system.reviews()).toHaveLength(1);
    expect(f.system.mastery().every((m) => m.level === 2)).toBe(true);
    expect(f.r.progress()[0].state).toBe('MASTERED');
    expect(() => reviewer.review({ ...f.review, id: randomUUID() })).toThrow('CONFLICT');
    const next = { ...f.submission, submissionId: randomUUID() };
    f.assessments.submit(next);
    reviewer.review({
      ...f.review,
      id: randomUUID(),
      submissionId: next.submissionId,
      criteria: Object.fromEntries(
        f.a.criteria.map((x) => [x.id, { ...f.review.criteria[x.id], level: 0 }]),
      ),
    });
    expect(f.r.progress()[0].state).toBe('MASTERED');
    expect(f.system.mastery().every((m) => m.level === 2)).toBe(true);
    expect(learningSystem(f.db, f.c, 'other').reviews()).toEqual([]);
    expect(learningSystem(f.db, f.c, 'other').mastery()).toEqual([]);
    expect(f.r.exportData().assessmentReviews).toHaveLength(2);
  });
  it('uses the lowest demonstrated criterion for a skill rather than overstating its level', () => {
    const f = fixture();
    const rubric = {
      ...f.a,
      criteria: f.a.criteria.map((x) => ({ ...x, skillId: f.a.criteria[0].skillId })),
    };
    f.db.sqlite
      .prepare('UPDATE assessment_results SET rubric_snapshot=? WHERE id=?')
      .run(JSON.stringify(rubric), f.submission.submissionId);
    f.review.criteria[f.a.criteria[0].id].level = 3;
    assessmentReviewer(f.db, f.actor).review(f.review);
    expect(f.system.mastery()).toHaveLength(1);
    expect(f.system.mastery()[0].level).toBe(2);
  });
  it('isolates project workspaces and rejects concurrent edits without losing previous text', () => {
    const f = fixture(),
      lessonId = 'W01D05_PROJECT_AGENT_ZERO',
      input = {
        lessonId,
        revision: 0,
        architecture: 'תכנון מקורי',
        testLog: 'תוצאות שבדקתי',
        reflection: 'מה למדתי',
      };
    expect(f.system.saveWorkspace(input)).toBe(1);
    expect(() => f.system.saveWorkspace({ ...input, architecture: 'עריכה ישנה' })).toThrow('STALE');
    expect(f.system.workspaces()[0].architecture).toBe('תכנון מקורי');
    expect(learningSystem(f.db, f.c, 'other').workspaces()).toEqual([]);
  });
  it('requires foundations and same-owner/same-version evidence for explicit Boss attempts', () => {
    const f = fixture(),
      lessonId = 'W04D20_BOSS_LEVEL_1_RESEARCH_AGENT',
      id = randomUUID();
    expect(() => f.system.startBoss({ id, lessonId })).toThrow('FOUNDATION');
    for (const core of f.c.modules!.find((m) => m.id === 'CORE')!.lessonIds)
      f.r.updateProgress(core, 'complete-build');
    f.system.startBoss({ id, lessonId });
    expect(f.system.startBoss({ id: randomUUID(), lessonId })).toBe(id);
    expect(f.system.bosses()).toHaveLength(1);
    expect(() => f.system.submitBoss({ id, submissionId: f.submission.submissionId })).toThrow(
      'EVIDENCE_REQUIRED',
    );
    f.r.updateProgress(lessonId, 'complete-build');
    const a = f.c.assessments.find((a) => a.lessonId === lessonId)!;
    const submission = {
      ...f.submission,
      submissionId: randomUUID(),
      assessmentId: a.id,
      rubricVersion: a.version,
      evidence: Object.fromEntries(
        a.criteria.map((x) => [
          x.id,
          'ראיות מלאות לניסיון מבחן סינתטי לבדיקת השמירה והבעלות על ההגשה. '.repeat(3),
        ]),
      ),
    };
    f.assessments.submit(submission);
    expect(() =>
      learningSystem(f.db, f.c, 'other').submitBoss({ id, submissionId: submission.submissionId }),
    ).toThrow('EVIDENCE_REQUIRED');
    f.system.submitBoss({ id, submissionId: submission.submissionId });
    f.system.submitBoss({ id, submissionId: submission.submissionId });
    expect(f.system.bosses()[0].state).toBe('SUBMITTED');
    expect(f.r.progress().find((p) => p.lessonId === lessonId)!.state).toBe('MASTERY_PENDING');
  });
});
