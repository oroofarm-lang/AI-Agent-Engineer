import { randomUUID } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { createAuth } from '../src/lib/auth/config';
import { connect } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import {
  templateDraftRepository,
  MAX_DAILY_DRAFT_SAVES,
  MAX_DRAFT_STORAGE,
} from '../src/lib/db/template-drafts';
import { templateHash } from '../src/lib/templates/hash';
import { starterDocument, templateCatalogSchema } from '../src/lib/templates/schema';
import rawCatalog from '../content/templates/releases/1.0.0.json';
const catalog = templateCatalogSchema.parse(rawCatalog);
const definition = catalog.templates.find(
  (item) => item.lessonId === 'FND_01' && item.kind === 'markdown',
)!;
const open: ReturnType<typeof connect>[] = [];
afterEach(() => {
  for (const c of open.splice(0)) c.sqlite.close();
  vi.unstubAllEnvs();
});
function fixture() {
  const curriculum = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, curriculum);
  connection.sqlite
    .prepare("INSERT INTO users(id,locale,created_at) VALUES('other','he-IL',?)")
    .run(new Date().toISOString());
  return {
    connection,
    curriculum,
    drafts: templateDraftRepository(connection, curriculum, 'local'),
  };
}
const input = () => ({
  requestId: randomUUID(),
  templateId: definition.id,
  definitionHash: templateHash(definition),
  curriculumVersion: loadCurriculum().version,
  expectedRevision: 0,
  document: {
    ...starterDocument(definition),
    notes: 'עבודה אישית של חשבון בדיקה בלבד. אין כאן ביצוע של תרגיל או נתוני משתמש אמיתי.',
  },
});

it('saves exact owned documents, freezes definitions and returns the real latest draft on a historical retry without rewinding it', () => {
  const { connection, curriculum, drafts } = fixture(),
    first = input();
  const before = repository(connection, curriculum, 'local').exportData();
  expect(drafts.get({ templateId: definition.id }).revision).toBe(0);
  const saved = drafts.save(first);
  expect(saved).toMatchObject({
    acknowledgedRevision: 1,
    replayed: false,
    draft: { revision: 1, document: first.document, readOnly: false },
  });
  expect(drafts.save(first)).toMatchObject({ acknowledgedRevision: 1, replayed: true });
  const second = {
    ...input(),
    expectedRevision: 1,
    document: { ...first.document, notes: 'עריכה חדשה שנשמרה אחרי העבודה הראשונה.' },
  };
  drafts.save(second);
  expect(drafts.save(first)).toMatchObject({
    acknowledgedRevision: 1,
    replayed: true,
    draft: { revision: 2, document: second.document },
  });
  const stored = connection.sqlite.prepare('SELECT * FROM template_drafts').get() as {
    definition_snapshot: string;
  };
  expect(JSON.parse(stored.definition_snapshot)).toEqual(definition);
  const after = repository(connection, curriculum, 'local').exportData();
  expect(after.lessonProgress).toEqual(before.lessonProgress);
  expect(after.skillMastery).toEqual(before.skillMastery);
  expect(after.assessmentResults).toEqual(before.assessmentResults);
  expect(
    connection.sqlite.prepare('SELECT COUNT(*) AS n FROM template_draft_requests').get(),
  ).toEqual({ n: 2 });
});
it('rejects stale-tab revisions and UUID payload reuse without changing the saved work', () => {
  const { drafts } = fixture(),
    first = input();
  drafts.save(first);
  expect(() =>
    drafts.save({ ...input(), document: { ...first.document, notes: 'לשונית אחרת' } }),
  ).toThrow('TEMPLATE_REVISION_CONFLICT');
  expect(() =>
    drafts.save({ ...first, document: { ...first.document, notes: 'אותו מזהה עם תוכן אחר' } }),
  ).toThrow('TEMPLATE_REQUEST_CONFLICT');
  expect(drafts.get({ templateId: definition.id })).toMatchObject({
    revision: 1,
    document: first.document,
  });
});
it('isolates identical template IDs and request UUIDs by owner and never accepts an injected owner', () => {
  const { connection, curriculum, drafts } = fixture(),
    first = input();
  drafts.save(first);
  const other = templateDraftRepository(connection, curriculum, 'other');
  expect(other.get({ templateId: definition.id })).toMatchObject({
    revision: 0,
    document: { notes: '' },
  });
  other.save({ ...first, document: { ...first.document, notes: 'תוכן נפרד לחשבון הבדיקה השני.' } });
  expect(drafts.get({ templateId: definition.id }).document.notes).toBe(first.document.notes);
  expect(() => drafts.save({ ...input(), userId: 'other' } as ReturnType<typeof input>)).toThrow();
  expect(() => other.get({ templateId: definition.id, definitionHash: '0'.repeat(64) })).toThrow(
    'TEMPLATE_NOT_FOUND',
  );
});
it('enforces foundation access, current exact binding, document bounds and active course version before writing', () => {
  const { connection, curriculum, drafts } = fixture(),
    first = input();
  const advanced = catalog.templates.find((item) => item.lessonId === 'AUT_01')!;
  expect(() => drafts.get({ templateId: advanced.id })).toThrow('FOUNDATION_REQUIRED');
  expect(() =>
    drafts.save({
      ...first,
      templateId: advanced.id,
      definitionHash: templateHash(advanced),
      document: starterDocument(advanced),
    }),
  ).toThrow('FOUNDATION_REQUIRED');
  expect(() => drafts.get({ templateId: 'UNKNOWN' })).toThrow('TEMPLATE_NOT_FOUND');
  expect(() => drafts.save({ ...first, curriculumVersion: '0.0.0' })).toThrow(
    'TEMPLATE_VERSION_CONFLICT',
  );
  expect(() => drafts.save({ ...first, definitionHash: '0'.repeat(64) })).toThrow(
    'TEMPLATE_VERSION_CONFLICT',
  );
  expect(() =>
    drafts.save({ ...first, document: { ...first.document, notes: 'a'.repeat(12001) } }),
  ).toThrow();
  expect(() =>
    drafts.save({
      ...first,
      document: {
        ...first.document,
        table: { columns: [{ id: 'X', label: 'Injected' }], rows: [['value']] },
      },
    }),
  ).toThrow('UNEXPECTED_TABLE');
  const changed = structuredClone(curriculum);
  changed.assessments
    .find((a) => a.id === definition.assessmentId)!
    .criteria.find((c) => c.id === definition.criterionId)!.prompt += ' שינוי';
  expect(() => templateDraftRepository(connection, changed, 'local').save(first)).toThrow(
    'TEMPLATE_VERSION_CONFLICT',
  );
  expect(connection.sqlite.prepare('SELECT COUNT(*) AS n FROM template_drafts').get()).toEqual({
    n: 0,
  });
});
it('retains historical definitions as read-only across new template versions and permits an exact old receipt replay', () => {
  const { connection, curriculum, drafts } = fixture(),
    first = input();
  drafts.save(first);
  const next = structuredClone(catalog);
  next.version = '1.1.0';
  next.templates.forEach((d) => (d.version = next.version));
  const later = templateDraftRepository(connection, curriculum, 'local', next);
  expect(later.get({ templateId: definition.id })).toMatchObject({
    revision: 0,
    document: { templateVersion: '1.1.0' },
  });
  expect(
    later.get({ templateId: definition.id, definitionHash: first.definitionHash }),
  ).toMatchObject({ revision: 1, readOnly: true, document: first.document });
  expect(later.save(first)).toMatchObject({ replayed: true, draft: { readOnly: true } });
  expect(() => later.save({ ...first, requestId: randomUUID(), expectedRevision: 1 })).toThrow(
    'TEMPLATE_VERSION_CONFLICT',
  );
  expect(connection.sqlite.prepare('SELECT COUNT(*) AS n FROM template_drafts').get()).toEqual({
    n: 1,
  });
});
it('detects damaged frozen documents and rolls back an updated draft if receipt persistence fails', () => {
  const { connection, drafts } = fixture(),
    first = input();
  drafts.save(first);
  connection.sqlite.exec(
    "CREATE TEMP TRIGGER reject_receipt BEFORE INSERT ON template_draft_requests BEGIN SELECT RAISE(ABORT,'synthetic receipt failure'); END;",
  );
  expect(() =>
    drafts.save({
      ...input(),
      expectedRevision: 1,
      document: { ...first.document, notes: 'תוכן שלא יישמר בגלל כשל בדיקה מבודד.' },
    }),
  ).toThrow('synthetic receipt failure');
  expect(drafts.get({ templateId: definition.id })).toMatchObject({
    revision: 1,
    document: first.document,
  });
  connection.sqlite.exec('DROP TRIGGER reject_receipt');
  connection.sqlite
    .prepare('UPDATE template_drafts SET document=? WHERE user_id=?')
    .run(JSON.stringify({ ...first.document, notes: 'עריכה ללא hash' }), 'local');
  expect(() => drafts.get({ templateId: definition.id })).toThrow('TEMPLATE_CORRUPT_DRAFT');
});
it('expires old retry receipts without letting an obsolete request overwrite newer work', () => {
  const { connection, drafts } = fixture(),
    first = input();
  drafts.save(first, new Date('2026-01-01T12:00:00Z'));
  const second = { ...input(), expectedRevision: 1 };
  drafts.save(second, new Date('2026-02-02T12:00:00Z'));
  expect(
    connection.sqlite.prepare('SELECT COUNT(*) AS n FROM template_draft_requests').get(),
  ).toEqual({ n: 1 });
  expect(() => drafts.save(first, new Date('2026-02-02T13:00:00Z'))).toThrow(
    'TEMPLATE_REVISION_CONFLICT',
  );
  expect(drafts.get({ templateId: definition.id }).revision).toBe(2);
});
it('enforces daily save limits while permitting exact retries and resets the limit on the next UTC day', () => {
  const { connection, drafts } = fixture(),
    first = input(),
    now = new Date('2026-10-03T23:59:59Z');
  drafts.save(first, now);
  const insert = connection.sqlite.prepare(
    'INSERT INTO template_draft_requests SELECT user_id,?,template_id,definition_hash,payload_fingerprint,revision,created_at FROM template_draft_requests WHERE user_id=? AND id=?',
  );
  connection.sqlite.transaction(() => {
    for (let i = 1; i < MAX_DAILY_DRAFT_SAVES; i++)
      insert.run(randomUUID(), 'local', first.requestId);
  })();
  expect(drafts.save(first, now).replayed).toBe(true);
  expect(() => drafts.save({ ...input(), expectedRevision: 1 }, now)).toThrow(
    'TEMPLATE_DAILY_LIMIT',
  );
  expect(
    drafts.save({ ...input(), expectedRevision: 1 }, new Date('2026-10-04T00:00:00Z')).draft
      .revision,
  ).toBe(2);
});
it('limits total owned document bytes across retained definitions without affecting another owner', () => {
  const { connection, curriculum } = fixture();
  const table = catalog.templates.find((d) => d.lessonId === 'FND_01' && d.kind === 'table')!;
  if (table.kind !== 'table') throw new Error('Missing authored fixture');
  let writes = 0,
    limited = false;
  for (let i = 1; i < 150; i++) {
    const next = structuredClone(catalog);
    next.version = `1.0.${i}`;
    next.templates.forEach((d) => (d.version = next.version));
    const def = next.templates.find((d) => d.id === table.id)!;
    const document = starterDocument(def);
    document.table!.columns.push(
      ...Array.from({ length: 7 }, (_, j) => ({ id: `EXTRA_${j}`, label: `עמודה ${j}` })),
    );
    document.table!.rows = Array.from({ length: 100 }, () => Array(12).fill('x'.repeat(120)));
    document.notes = 'n'.repeat(12000);
    try {
      templateDraftRepository(connection, curriculum, 'local', next).save({
        ...input(),
        templateId: def.id,
        definitionHash: templateHash(def),
        document,
      });
      writes++;
    } catch (error) {
      expect((error as Error).message).toBe('TEMPLATE_STORAGE_LIMIT');
      limited = true;
      break;
    }
  }
  expect(limited).toBe(true);
  expect(writes).toBeGreaterThan(1);
  const usage = connection.sqlite
    .prepare('SELECT SUM(document_bytes) AS bytes FROM template_drafts WHERE user_id=?')
    .get('local') as { bytes: number };
  expect(usage.bytes).toBeLessThanOrEqual(MAX_DRAFT_STORAGE);
  expect(
    templateDraftRepository(connection, curriculum, 'other').save(input()).draft.revision,
  ).toBe(1);
}, 20000); // Fills the real 16 MiB quota across retained versions; default 5 seconds is not a performance requirement.

it('exports only owned frozen drafts and receipts, and real authenticated account deletion removes them without touching another owner', async () => {
  const { connection, curriculum, drafts } = fixture();
  vi.stubEnv('BETTER_AUTH_URL', 'http://127.0.0.1:3000');
  vi.stubEnv('BETTER_AUTH_SECRET', 'isolated-template-test-secret-01234567890123456789');
  vi.stubEnv('SMTP_URL', '');
  vi.stubEnv('SMTP_HOST', '');
  const auth = createAuth(connection);
  const response = await auth.api.signUpEmail({
    asResponse: true,
    body: {
      email: 'draft-fixture@example.test',
      password: 'Fixture-password-0912',
      name: 'Draft test',
    },
  });
  const signed = await response.json();
  const cookie = response.headers
    .getSetCookie()
    .map((value) => value.split(';')[0])
    .join('; ');
  const own = templateDraftRepository(connection, curriculum, signed.user.id);
  own.save(input());
  drafts.save(input());
  const exported = repository(connection, curriculum, signed.user.id).exportData();
  expect(exported.schemaVersion).toBe(11);
  expect(exported.templateDrafts).toHaveLength(1);
  expect(exported.templateDraftRequests).toHaveLength(1);
  expect(exported.templateDrafts).toEqual(
    connection.sqlite.prepare('SELECT * FROM template_drafts WHERE user_id=?').all(signed.user.id),
  );
  expect(repository(connection, curriculum, 'other').exportData().templateDrafts).toEqual([]);
  await auth.api.deleteUser({
    headers: new Headers({ cookie }),
    body: { password: 'Fixture-password-0912' },
  });
  expect(
    connection.sqlite
      .prepare('SELECT COUNT(*) AS n FROM template_drafts WHERE user_id=?')
      .get(signed.user.id),
  ).toEqual({ n: 0 });
  expect(
    connection.sqlite
      .prepare('SELECT COUNT(*) AS n FROM template_draft_requests WHERE user_id=?')
      .get(signed.user.id),
  ).toEqual({ n: 0 });
  expect(drafts.get({ templateId: definition.id }).revision).toBe(1);
});
