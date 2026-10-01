import { afterEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { validateAssessments } from '../src/lib/curriculum/assessment';
import { validateEvidence, submissionState } from '../src/lib/domain/assessment';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { calculateProgress } from '../src/lib/domain/progress';
const connections: Connection[] = [];
afterEach(() => {
  for (const c of connections.splice(0)) c.sqlite.close();
});
function fixture() {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  connections.push(connection);
  setupDatabase(connection, c);
  const a = c.assessments[0],
    r = repository(connection, c, 'local'),
    assessments = assessmentRepository(connection, c, 'local');
  const input = {
    submissionId: randomUUID(),
    assessmentId: a.id,
    rubricVersion: a.version,
    curriculumVersion: c.version,
    evidence: Object.fromEntries(
      a.criteria.map((x) => [
        x.id,
        'ראיות מעשיות מהרצה מקומית עם הסבר על הבחירות ותיקון השגיאה. '.repeat(3),
      ]),
    ),
  };
  return { c, connection, a, r, assessments, input };
}
describe('practical evidence without fabricated grading', () => {
  it('requires complete evidence for the exact current rubric', () => {
    const { c, a, input } = fixture();
    expect(() => validateEvidence({ ...input, evidence: {} }, a, c.version)).toThrow('INCOMPLETE');
    expect(() => validateEvidence({ ...input, rubricVersion: '0.0.1' }, a, c.version)).toThrow(
      'STALE',
    );
    expect(() =>
      validateEvidence(
        { ...input, evidence: { ...input.evidence, EXTRA: 'x'.repeat(80) } },
        a,
        c.version,
      ),
    ).toThrow('INCOMPLETE');
  });
  it('rejects whitespace-only evidence and invalid UUIDs', () => {
    const { c, a, input } = fixture();
    expect(() => validateEvidence({ ...input, submissionId: 'bad' }, a, c.version)).toThrow();
    expect(() =>
      validateEvidence(
        { ...input, evidence: { [a.criteria[0].id]: ' '.repeat(100) } },
        a,
        c.version,
      ),
    ).toThrow();
  });
  it('requires build completion and leaves no partial attempt', () => {
    const { r, assessments, input } = fixture();
    expect(() => assessments.submit(input)).toThrow('BUILD_REQUIRED');
    expect(assessments.attempts()).toEqual([]);
    expect(r.progress()).toEqual([]);
  });
  it('stores a rubric snapshot, is idempotent and never grants mastery', () => {
    const { c, a, r, assessments, input } = fixture();
    r.updateProgress(a.lessonId, 'complete-build');
    assessments.submit(input);
    assessments.submit(input);
    expect(assessments.attempts()).toHaveLength(1);
    expect(JSON.parse(assessments.attempts()[0].rubricSnapshot)).toEqual(a);
    expect(r.progress()[0].state).toBe('MASTERY_PENDING');
    expect(calculateProgress(c.lessons, r.progress()).completed).toBe(0);
    expect(r.exportData().assessmentResults).toHaveLength(1);
  });
  it('prevents overwrite through a reused submission ID', () => {
    const { a, r, assessments, input } = fixture();
    r.updateProgress(a.lessonId, 'complete-build');
    assessments.submit(input);
    const changed = {
      ...input,
      evidence: { ...input.evidence, [a.criteria[0].id]: 'שינוי בראיות '.repeat(20) },
    };
    expect(() => assessments.submit(changed)).toThrow('CONFLICT');
    expect(JSON.parse(assessments.attempts()[0].evidence)).toEqual(input.evidence);
  });
  it('stores a new attempt independently and preserves terminal lesson states', () => {
    const { a, r, assessments, input } = fixture();
    r.updateProgress(a.lessonId, 'complete-build');
    assessments.submit(input);
    assessments.submit({ ...input, submissionId: randomUUID() });
    expect(assessments.attempts()).toHaveLength(2);
    expect(submissionState('MASTERED')).toBe('MASTERED');
    expect(submissionState('COMPLETED_WITHOUT_MASTERY')).toBe('COMPLETED_WITHOUT_MASTERY');
  });
  it('rejects rubric references outside the lesson', () => {
    const { c, a } = fixture();
    c.lessons[1].publicationStatus = 'planned';
    expect(() => validateAssessments([{ ...a, lessonId: c.lessons[1].id }], c)).toThrow(
      'published',
    );
    expect(() =>
      validateAssessments([{ ...a, criteria: [{ ...a.criteria[0], skillId: 'MISSING' }] }], c),
    ).toThrow('outside');
  });
  it('registers the real 1.0.0 → 2.1.0 release without losing prior data', () => {
    const { c, connection } = fixture();
    const read = (name: string) =>
      JSON.parse(fs.readFileSync(`content/releases/1.0.0/${name}.json`, 'utf8'));
    const old = { ...read('curriculum'), skills: read('skills'), sources: read('sources') };
    setupDatabase(connection, old);
    const before = repository(connection, old, 'local');
    const id = old.lessons[0].id;
    before.updateProgress(id, 'complete-build');
    before.saveNote(id, 'ראיות שנשמרו לפני השדרוג');
    setupDatabase(connection, c);
    const after = repository(connection, c, 'local');
    expect(after.progress()[0].curriculumVersion).toBe('1.0.0');
    expect(after.note(id)).toBe('ראיות שנשמרו לפני השדרוג');
  });
});
