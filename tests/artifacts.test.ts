import { afterEach, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import { assessmentRepository } from '../src/lib/db/assessments';
import { artifactRepository, downloadArtifact } from '../src/lib/db/artifacts';
import { portfolioRepository } from '../src/lib/db/portfolio';
import { MAX_FILE_BYTES, MAX_ACCOUNT_BYTES } from '../src/lib/domain/artifacts';
const connections: Connection[] = [];
afterEach(() => connections.splice(0).forEach((item) => item.sqlite.close()));
function fixture() {
  const c = loadCurriculum(),
    connection = connect(':memory:');
  connections.push(connection);
  setupDatabase(connection, c);
  connection.sqlite
    .prepare('INSERT INTO users VALUES (?,?,?)')
    .run('other', 'he-IL', new Date().toISOString());
  const rubric = c.assessments[0],
    learner = repository(connection, c, 'local');
  learner.updateProgress(rubric.lessonId, 'complete-build');
  const file = {
    id: randomUUID(),
    criterionId: rubric.criteria[0].id,
    name: 'evidence.py',
    data: new TextEncoder().encode('print("hello")\n'),
  };
  const input = {
    submissionId: randomUUID(),
    assessmentId: rubric.id,
    rubricVersion: rubric.version,
    curriculumVersion: c.version,
    evidence: Object.fromEntries(
      rubric.criteria.map((x) => [
        x.id,
        'ראיות מקומיות לבדיקה עם הסבר של הבחירות והכשל ומה תוקן. '.repeat(3),
      ]),
    ),
    artifacts: [file],
    portfolio: { included: true, title: 'התוכנית שלי', summary: 'שמרתי את תוצאות הבדיקה' },
  };
  return {
    c,
    connection,
    input,
    file,
    learner,
    repo: assessmentRepository(connection, c, 'local'),
  };
}
it('stores real bytes atomically, retries exactly once and exports complete file content', () => {
  const { connection, input, file, learner, repo } = fixture();
  repo.submit(input);
  repo.submit(input);
  const stored = downloadArtifact(
    connection,
    { id: 'local', email: 'x@example.test', emailVerified: false },
    file.id,
  )!;
  expect(stored.data.equals(Buffer.from(file.data))).toBe(true);
  expect(artifactRepository(connection, 'local').metadata()).toHaveLength(1);
  const exported = learner.exportData();
  expect(Buffer.from(exported.assessmentArtifacts[0].data, 'base64')).toEqual(
    Buffer.from(file.data),
  );
  expect(exported.portfolioEntries).toHaveLength(1);
  expect(exported.assessmentResults[0].status).toBe('PENDING_REVIEW');
});
it('rejects changed files and portfolio under a reused attempt ID', () => {
  const { repo, input, file } = fixture();
  repo.submit(input);
  expect(() =>
    repo.submit({ ...input, artifacts: [{ ...file, data: new TextEncoder().encode('changed') }] }),
  ).toThrow('CONFLICT');
  expect(() =>
    repo.submit({ ...input, portfolio: { ...input.portfolio, title: 'changed' } }),
  ).toThrow('CONFLICT');
});
it('blocks another tenant from downloading, listing, attaching or toggling work', () => {
  const { connection, input, file, repo } = fixture();
  repo.submit(input);
  expect(
    downloadArtifact(
      connection,
      { id: 'other', email: 'other@example.test', emailVerified: false },
      file.id,
    ),
  ).toBeUndefined();
  expect(artifactRepository(connection, 'other').metadata()).toEqual([]);
  expect(() => artifactRepository(connection, 'other').save(input.submissionId, [])).toThrow(
    'UNKNOWN_SUBMISSION',
  );
  expect(() =>
    portfolioRepository(connection, 'other').setIncluded(input.submissionId, false),
  ).toThrow('UNKNOWN_PORTFOLIO_ENTRY');
  expect(portfolioRepository(connection, 'other').entries()).toEqual([]);
});
it('operator downloads require verified allowlisted identity', () => {
  const { connection, input, file, repo } = fixture();
  repo.submit(input);
  const saved = process.env.ADMIN_EMAILS;
  process.env.ADMIN_EMAILS = 'reviewer@example.test';
  try {
    expect(
      downloadArtifact(
        connection,
        { id: 'other', email: 'reviewer@example.test', emailVerified: false },
        file.id,
      ),
    ).toBeUndefined();
    expect(
      downloadArtifact(
        connection,
        { id: 'other', email: 'reviewer@example.test', emailVerified: true },
        file.id,
      )?.name,
    ).toBe(file.name);
  } finally {
    if (saved === undefined) delete process.env.ADMIN_EMAILS;
    else process.env.ADMIN_EMAILS = saved;
  }
});
it('rejects active formats, fake images, path names and oversized bytes before saving', () => {
  const { repo, input, file } = fixture();
  for (const modified of [
    { name: 'page.html' },
    { name: 'photo.png' },
    { name: '../private.py' },
    { data: new Uint8Array(MAX_FILE_BYTES + 1) },
  ]) {
    expect(() => repo.submit({ ...input, artifacts: [{ ...file, ...modified }] })).toThrow();
    expect(repo.attempts()).toEqual([]);
  }
});
it('rolls back the whole submission when storage quota or duplicate artifact IDs fail', () => {
  const { connection, repo, input, file, learner } = fixture();
  repo.submit(input);
  expect(() => repo.submit({ ...input, submissionId: randomUUID() })).toThrow();
  expect(repo.attempts()).toHaveLength(1);
  connection.sqlite
    .prepare('UPDATE assessment_artifacts SET size=? WHERE id=?')
    .run(MAX_FILE_BYTES, file.id);
  // A quota fixture uses real individually bounded rows, never a user database.
  const insert = connection.sqlite.prepare(
    'INSERT INTO assessment_artifacts SELECT ?,user_id,submission_id,criterion_id,name,mime,size,sha256,data,created_at FROM assessment_artifacts WHERE id=?',
  );
  for (let i = 0; i < Math.ceil(MAX_ACCOUNT_BYTES / MAX_FILE_BYTES); i++)
    insert.run(randomUUID(), file.id);
  const count = repo.attempts().length;
  expect(() =>
    repo.submit({
      ...input,
      submissionId: randomUUID(),
      artifacts: [{ ...file, id: randomUUID() }],
    }),
  ).toThrow('STORAGE_LIMIT');
  expect(repo.attempts()).toHaveLength(count);
  expect(learner.progress()[0].state).toBe('MASTERY_PENDING');
});
it('preserves old attempts while supporting reversible portfolio selection', () => {
  const { connection, repo, input } = fixture();
  repo.submit({ ...input, artifacts: [], portfolio: undefined });
  const portfolio = portfolioRepository(connection, 'local');
  expect(portfolio.entries()[0].included).toBe(0);
  portfolio.setIncluded(input.submissionId, true);
  expect(portfolio.entries()[0].included).toBe(1);
  portfolio.setIncluded(input.submissionId, false);
  expect(portfolio.entries()[0].included).toBe(0);
  expect(repo.attempts()).toHaveLength(1);
});
