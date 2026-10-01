import { afterEach, describe, expect, it } from 'vitest';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { repository } from '../src/lib/db/repository';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const open: Connection[] = [];
const dirs: string[] = [];
const make = (name = ':memory:') => {
  const c = connect(name);
  open.push(c);
  return c;
};
afterEach(() => {
  for (const c of open.splice(0)) if (c.sqlite.open) c.sqlite.close();
  for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
});
describe('SQLite learner persistence', () => {
  it('setup is non-destructive; duplicate actions are idempotent', () => {
    const c = loadCurriculum(),
      connection = make();
    setupDatabase(connection, c);
    const r = repository(connection, c, 'local'),
      id = c.lessons[0].id;
    r.updateProgress(id, 'start');
    r.updateProgress(id, 'complete-build');
    const before = r.progress();
    r.updateProgress(id, 'complete-build');
    r.updateProgress(id, 'start');
    setupDatabase(connection, c);
    expect(r.progress()).toEqual(before);
    expect(r.progress()[0].state).toBe('BUILD_COMPLETE');
  });
  it('notes survive database reconnect and export includes stable references', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-engineer-test-'));
    dirs.push(dir);
    const filename = join(dir, 'test.sqlite');
    const c = loadCurriculum(),
      connection = make(filename);
    setupDatabase(connection, c);
    const r = repository(connection, c, 'local');
    r.saveNote(c.lessons[0].id, 'תיקנתי את הגדרת הסביבה');
    connection.sqlite.close();
    const reopened = repository(make(filename), c, 'local');
    expect(reopened.note(c.lessons[0].id)).toContain('תיקנתי');
    expect(reopened.exportData().lessonNotes[0].lessonId).toBe(c.lessons[0].id);
    expect(JSON.stringify(reopened.exportData())).not.toContain('OPENAI_API_KEY');
  });
  it('refuses planned and unknown lessons and oversized notes', () => {
    const c = loadCurriculum(),
      connection = make();
    setupDatabase(connection, c);
    const policyFixture = structuredClone(c);
    policyFixture.lessons[1].publicationStatus = 'planned';
    const r = repository(connection, policyFixture, 'local');
    expect(() => r.updateProgress(c.lessons[1].id, 'complete-build')).toThrow();
    expect(() => r.updateProgress('MISSING', 'start')).toThrow();
    expect(() => r.saveNote(c.lessons[0].id, 'x'.repeat(20001))).toThrow();
    expect(r.progress()).toHaveLength(0);
  });
  it('preserves old-version progress when registering a new curriculum', () => {
    const c = loadCurriculum(),
      connection = make();
    setupDatabase(connection, c);
    repository(connection, c, 'local').updateProgress(c.lessons[0].id, 'complete-build');
    const updated = { ...c, version: '2.2.0' };
    setupDatabase(connection, updated);
    expect(repository(connection, updated, 'local').progress()[0].curriculumVersion).toBe(
      c.version,
    );
    expect(repository(connection, updated, 'local').exportData().curriculumVersions).toHaveLength(
      2,
    );
  });
  it('rejects mutation of a registered version and leaves progress intact', () => {
    const c = loadCurriculum(),
      connection = make();
    setupDatabase(connection, c);
    const r = repository(connection, c, 'local');
    r.updateProgress(c.lessons[0].id, 'start');
    const changed = structuredClone(c);
    changed.lessons[0].title = 'Changed title';
    expect(() => setupDatabase(connection, changed)).toThrow('version bump');
    expect(r.progress()).toHaveLength(1);
  });
});
