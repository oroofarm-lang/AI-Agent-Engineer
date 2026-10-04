import { afterEach, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import type { ArtifactInput } from '../src/lib/domain/artifacts';
import { connect, type Connection } from '../src/lib/db/connection';
import { setupDatabase } from '../src/lib/db/migrate';
import { loadCurriculum } from '../src/lib/curriculum/load';
import { repository } from '../src/lib/db/repository';
import { templateDraftRepository } from '../src/lib/db/template-drafts';
import { submitTemplateEvidence } from '../src/lib/db/template-submissions';
import { artifactRepository } from '../src/lib/db/artifacts';
import { starterDocument, templateCatalogSchema } from '../src/lib/templates/schema';
import { templateHash } from '../src/lib/templates/hash';
import rawCatalog from '../content/templates/releases/1.0.0.json';
const definitions = templateCatalogSchema.parse(rawCatalog).templates;
const open: Connection[] = [];
afterEach(() => open.splice(0).forEach((c) => c.sqlite.close()));
function fixture() {
  const curriculum = loadCurriculum(),
    connection = connect(':memory:');
  open.push(connection);
  setupDatabase(connection, curriculum);
  connection.sqlite
    .prepare('INSERT INTO users VALUES (?,?,?)')
    .run('other', 'he-IL', new Date().toISOString());
  const assessment = curriculum.assessments.find((a) => a.lessonId === 'FND_01')!;
  const drafts = templateDraftRepository(connection, curriculum, 'local');
  const definition = definitions.find(
    (d) => d.assessmentId === assessment.id && d.kind === 'markdown',
  )!;
  const document = {
    ...starterDocument(definition),
    notes:
      'נתונים סינתטיים לבדיקת מנגנון ההגשה בלבד. אין כאן הטמעה אמיתית, מידע על עסק או תוצאה של הרצת קוד. '.repeat(
        2,
      ),
  };
  const save = {
    requestId: randomUUID(),
    templateId: definition.id,
    definitionHash: templateHash(definition),
    curriculumVersion: curriculum.version,
    expectedRevision: 0,
    document,
  };
  drafts.save(save);
  const learner = repository(connection, curriculum, 'local');
  learner.updateProgress(assessment.lessonId, 'complete-build');
  const input = {
    submissionId: randomUUID(),
    assessmentId: assessment.id,
    rubricVersion: assessment.version,
    curriculumVersion: curriculum.version,
    evidence: Object.fromEntries(
      assessment.criteria.map((c) => [
        c.id,
        'ראיות סינתטיות לבדיקה בלבד: קלט, תוצאה, מגבלה ואופן בדיקה מוצע ללא טענה להרצת קוד או שימוש במערכת אמיתית. '.repeat(
          2,
        ),
      ]),
    ),
    artifacts: [] as ArtifactInput[],
    templates: [{ templateId: definition.id, definitionHash: save.definitionHash, revision: 1 }],
    portfolio: { included: true, title: 'תיק בדיקה סינתטי', summary: 'מנגנון הגשה בלבד' },
  };
  return {
    curriculum,
    connection,
    definition,
    document,
    save,
    drafts,
    learner,
    input,
    submit: (raw = input, owner = 'local') =>
      submitTemplateEvidence(connection, curriculum, owner, raw),
  };
}
it('freezes saved documents and definitions in the existing owned submission and portfolio, with no mastery grant', () => {
  const f = fixture();
  const before = f.learner.exportData();
  f.submit();
  const after = f.learner.exportData();
  expect(after.assessmentResults).toHaveLength(1);
  expect(after.portfolioEntries[0]).toMatchObject({ included: 1 });
  expect(after.assessmentResults[0].status).toBe('PENDING_REVIEW');
  expect(after.skillMastery).toEqual(before.skillMastery);
  const file = after.assessmentArtifacts[0];
  const frozen = JSON.parse(Buffer.from(file.data, 'base64').toString('utf8'));
  expect(frozen).toEqual({
    schemaVersion: 1,
    curriculumVersion: f.curriculum.version,
    definitionHash: f.save.definitionHash,
    revision: 1,
    definition: f.definition,
    document: f.document,
  });
  expect(JSON.parse(after.assessmentResults[0].evidence)[f.definition.criterionId]).toBe(
    f.document.notes,
  );
  expect(artifactRepository(f.connection, 'other').metadata()).toEqual([]);
});
it('replays the same frozen submission even after newer draft edits, and rejects changed portfolio or refs', () => {
  const f = fixture();
  f.submit();
  const before = f.learner.exportData();
  f.drafts.save({
    ...f.save,
    requestId: randomUUID(),
    expectedRevision: 1,
    document: { ...f.document, notes: 'טיוטה חדשה שלא תחליף הגשה קודמת. '.repeat(4) },
  });
  expect(f.submit()).toBe(f.input.submissionId);
  expect(f.learner.exportData().assessmentArtifacts).toEqual(before.assessmentArtifacts);
  expect(() =>
    f.submit({ ...f.input, templates: [{ ...f.input.templates[0], revision: 2 }] }),
  ).toThrow('SUBMISSION_CONFLICT');
  expect(() =>
    f.submit({ ...f.input, portfolio: { ...f.input.portfolio, title: 'changed' } }),
  ).toThrow('SUBMISSION_CONFLICT');
});
it('rejects stale revisions, another owner, another assessment, and duplicate refs without partial writes', () => {
  const f = fixture();
  f.drafts.save({ ...f.save, requestId: randomUUID(), expectedRevision: 1 });
  expect(() => f.submit()).toThrow('TEMPLATE_REVISION_CONFLICT');
  expect(() => f.submit(f.input, 'other')).toThrow('TEMPLATE_REVISION_CONFLICT');
  expect(() =>
    f.submit({
      ...f.input,
      assessmentId: f.curriculum.assessments.find((a) => a.id !== f.input.assessmentId)!.id,
      templates: [{ ...f.input.templates[0], revision: 2 }],
    }),
  ).toThrow('TEMPLATE_VERSION_CONFLICT');
  expect(() =>
    f.submit({ ...f.input, templates: [f.input.templates[0], f.input.templates[0]] }),
  ).toThrow();
  expect(f.learner.exportData().assessmentResults).toEqual([]);
  expect(f.learner.exportData().assessmentArtifacts).toEqual([]);
});
it('rolls back evidence, files, portfolio and progress when artifact persistence fails', () => {
  const f = fixture(),
    before = f.learner.exportData();
  f.connection.sqlite.exec(
    "CREATE TEMP TRIGGER reject_artifact BEFORE INSERT ON assessment_artifacts BEGIN SELECT RAISE(ABORT,'synthetic artifact failure'); END;",
  );
  expect(() => f.submit()).toThrow('synthetic artifact failure');
  const after = f.learner.exportData();
  expect(after.assessmentResults).toEqual(before.assessmentResults);
  expect(after.assessmentArtifacts).toEqual(before.assessmentArtifacts);
  expect(after.portfolioEntries).toEqual(before.portfolioEntries);
  expect(after.lessonProgress).toEqual(before.lessonProgress);
});
it('rejects incomplete templates and preserves external file limits and the build gate', () => {
  const f = fixture();
  f.drafts.save({
    ...f.save,
    requestId: randomUUID(),
    expectedRevision: 1,
    document: { ...f.document, notes: '' },
  });
  expect(() =>
    f.submit({ ...f.input, templates: [{ ...f.input.templates[0], revision: 2 }] }),
  ).toThrow('TEMPLATE_INCOMPLETE');
  f.drafts.save({ ...f.save, requestId: randomUUID(), expectedRevision: 2 });
  const ready = { ...f.input, templates: [{ ...f.input.templates[0], revision: 3 }] };
  expect(() =>
    f.submit({
      ...ready,
      artifacts: Array.from({ length: 6 }, () => ({
        id: randomUUID(),
        criterionId: f.definition.criterionId,
        name: 'external.txt',
        data: new TextEncoder().encode('Synthetic file only'),
      })),
    }),
  ).toThrow('FILES_TOO_LARGE');
  f.connection.sqlite
    .prepare('UPDATE lesson_progress SET build_completed_at=NULL WHERE user_id=? AND lesson_id=?')
    .run('local', f.definition.lessonId);
  expect(() => f.submit(ready)).toThrow('BUILD_REQUIRED');
  expect(f.learner.exportData().assessmentResults).toEqual([]);
});

it('does not accept Markdown headings, fences or separators alone as completed learner work', () => {
  const f = fixture();
  const decorative = '# ' + 'כותרת בלבד '.repeat(30) + '\n\n```js\n```\n---\n';
  f.drafts.save({
    ...f.save,
    requestId: randomUUID(),
    expectedRevision: 1,
    document: { ...f.document, notes: decorative },
  });
  expect(() =>
    f.submit({ ...f.input, templates: [{ ...f.input.templates[0], revision: 2 }] }),
  ).toThrow('TEMPLATE_INCOMPLETE');
  expect(f.learner.exportData().assessmentResults).toEqual([]);
});
