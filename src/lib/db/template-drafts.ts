import { createHash } from 'node:crypto';
import type { Connection } from './connection';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import rawCatalog from '../../../content/templates/releases/1.0.0.json';
import { repository } from './repository';
import { canStudyLesson } from '../domain/learning-path';
import { templateHash } from '../templates/hash';
import { draftQuerySchema, draftSaveSchema, type DraftSaveInput } from '../templates/persistence';
import {
  starterDocument,
  templateCatalogSchema,
  templateDefinitionSchema,
  validateTemplateDocument,
  templateCompletion,
  type TemplateCatalog,
} from '../templates/schema';

export const MAX_DRAFT_STORAGE = 16 * 1024 * 1024;
export const MAX_DAILY_DRAFT_SAVES = 10_000;
export const RECEIPT_RETENTION_DAYS = 30;
const defaultCatalog = templateCatalogSchema.parse(rawCatalog);
const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');
type DraftRow = {
  user_id: string;
  template_id: string;
  definition_hash: string;
  definition_snapshot: string;
  document: string;
  document_hash: string;
  document_bytes: number;
  curriculum_version: string;
  revision: number;
  created_at: string;
  updated_at: string;
};
type Receipt = {
  id: string;
  template_id: string;
  definition_hash: string;
  payload_fingerprint: string;
  revision: number;
  created_at: string;
};

/** Every lookup is scoped by the authenticated owner; drafts never change mastery or progress. */
export function templateDraftRepository(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
  rawDefinitions: TemplateCatalog = defaultCatalog,
) {
  const { sqlite } = connection;
  const catalog = templateCatalogSchema.parse(rawDefinitions);
  const find = (id: string) => catalog.templates.find((definition) => definition.id === id);
  function bound(id: string) {
    const definition = find(id);
    const rubric = curriculum.assessments.find(
      (assessment) => assessment.id === definition?.assessmentId,
    );
    const criterion = rubric?.criteria.find((item) => item.id === definition?.criterionId);
    return definition &&
      rubric &&
      criterion &&
      definition.lessonId === rubric.lessonId &&
      definition.rubricVersion === rubric.version &&
      definition.prompt === criterion.prompt &&
      definition.evidenceHint === criterion.evidenceHint
      ? definition
      : undefined;
  }
  function access(lessonId: string) {
    const lesson = curriculum.lessons.find(
      (item) => item.id === lessonId && item.publicationStatus === 'published',
    );
    if (!lesson) throw new Error('TEMPLATE_UNKNOWN_LESSON');
    if (!canStudyLesson(curriculum, repository(connection, curriculum, userId).progress(), lesson))
      throw new Error('FOUNDATION_REQUIRED');
  }
  const row = (templateId: string, hash: string) =>
    sqlite
      .prepare(
        'SELECT * FROM template_drafts WHERE user_id=? AND template_id=? AND definition_hash=?',
      )
      .get(userId, templateId, hash) as DraftRow | undefined;
  function decode(saved: DraftRow) {
    const definition = templateDefinitionSchema.parse(JSON.parse(saved.definition_snapshot));
    const document = validateTemplateDocument(JSON.parse(saved.document), definition);
    if (
      saved.user_id !== userId ||
      definition.id !== saved.template_id ||
      templateHash(definition) !== saved.definition_hash ||
      digest(document) !== saved.document_hash ||
      Buffer.byteLength(JSON.stringify(document)) !== saved.document_bytes ||
      saved.revision < 1
    )
      throw new Error('TEMPLATE_CORRUPT_DRAFT');
    return { definition, document };
  }
  function get(raw: { templateId: string; definitionHash?: string }) {
    const query = draftQuerySchema.parse(raw);
    const active = bound(query.templateId);
    const hash = query.definitionHash || (active && templateHash(active));
    if (!hash)
      throw new Error(find(query.templateId) ? 'TEMPLATE_VERSION_CONFLICT' : 'TEMPLATE_NOT_FOUND');
    const saved = row(query.templateId, hash);
    if (saved) {
      const frozen = decode(saved);
      access(frozen.definition.lessonId);
      return {
        ...frozen,
        definitionHash: hash,
        revision: saved.revision,
        curriculumVersion: saved.curriculum_version,
        updatedAt: saved.updated_at,
        readOnly: !active || templateHash(active) !== hash,
        completion: templateCompletion(frozen.document, frozen.definition),
      };
    }
    if (!active || templateHash(active) !== hash) throw new Error('TEMPLATE_NOT_FOUND');
    access(active.lessonId);
    const document = starterDocument(active);
    return {
      definition: active,
      document,
      definitionHash: hash,
      revision: 0,
      curriculumVersion: curriculum.version,
      updatedAt: null,
      readOnly: false,
      completion: templateCompletion(document, active),
    };
  }
  return {
    get,
    mentorSummary(lessonId: string | null) {
      const owned = sqlite
        .prepare('SELECT COUNT(*) AS n FROM template_drafts WHERE user_id=?')
        .get(userId) as { n: number };
      const definitions = lessonId
        ? catalog.templates.filter((definition) => definition.lessonId === lessonId)
        : [];
      return {
        ownedStoredDocuments: owned.n,
        scope: 'Current lesson exact definitions; aggregate includes historical saved documents.',
        lessonId,
        drafts: definitions.map((definition) => {
          if (!bound(definition.id))
            return {
              templateId: definition.id,
              criterionId: definition.criterionId,
              state: 'definition-unavailable',
              meaning:
                'No exact template binding for this rubric snapshot; no content or completion inferred.',
            };
          const draft = get({ templateId: definition.id });
          return {
            templateId: definition.id,
            criterionId: definition.criterionId,
            definitionHash: draft.definitionHash,
            revision: draft.revision,
            updatedAt: draft.updatedAt,
            ...draft.completion,
            meaning: 'Saved content structure only; not submitted, executed or graded.',
          };
        }),
      };
    },
    save(raw: DraftSaveInput, now = new Date()) {
      const input = draftSaveSchema.parse(raw);
      const fingerprint = digest(input);
      return sqlite
        .transaction(() => {
          const cutoff = new Date(
            now.getTime() - RECEIPT_RETENTION_DAYS * 86_400_000,
          ).toISOString();
          sqlite
            .prepare('DELETE FROM template_draft_requests WHERE user_id=? AND created_at<?')
            .run(userId, cutoff);
          const prior = sqlite
            .prepare('SELECT * FROM template_draft_requests WHERE user_id=? AND id=?')
            .get(userId, input.requestId) as Receipt | undefined;
          if (prior) {
            if (prior.payload_fingerprint !== fingerprint)
              throw new Error('TEMPLATE_REQUEST_CONFLICT');
            return {
              acknowledgedRevision: prior.revision,
              requestId: prior.id,
              draft: get({ templateId: prior.template_id, definitionHash: prior.definition_hash }),
              replayed: true,
            };
          }
          const definition = bound(input.templateId);
          if (!definition)
            throw new Error(
              find(input.templateId) ? 'TEMPLATE_VERSION_CONFLICT' : 'TEMPLATE_NOT_FOUND',
            );
          access(definition.lessonId);
          if (
            input.curriculumVersion !== curriculum.version ||
            input.definitionHash !== templateHash(definition)
          )
            throw new Error('TEMPLATE_VERSION_CONFLICT');
          const document = validateTemplateDocument(input.document, definition);
          const existing = row(input.templateId, input.definitionHash);
          if (existing) decode(existing);
          if ((existing?.revision || 0) !== input.expectedRevision)
            throw new Error('TEMPLATE_REVISION_CONFLICT');
          const serialized = JSON.stringify(document),
            bytes = Buffer.byteLength(serialized);
          const storage = sqlite
            .prepare(
              'SELECT COALESCE(SUM(document_bytes),0) AS bytes, COUNT(*) AS n FROM template_drafts WHERE user_id=?',
            )
            .get(userId) as { bytes: number; n: number };
          if (storage.bytes - (existing?.document_bytes || 0) + bytes > MAX_DRAFT_STORAGE)
            throw new Error('TEMPLATE_STORAGE_LIMIT');
          if (!existing && storage.n >= 2000) throw new Error('TEMPLATE_DRAFT_LIMIT');
          const daily = sqlite
            .prepare(
              'SELECT COUNT(*) AS n FROM template_draft_requests WHERE user_id=? AND created_at>=?',
            )
            .get(userId, `${now.toISOString().slice(0, 10)}T00:00:00.000Z`) as { n: number };
          if (daily.n >= MAX_DAILY_DRAFT_SAVES) throw new Error('TEMPLATE_DAILY_LIMIT');
          const revision = input.expectedRevision + 1,
            timestamp = now.toISOString();
          if (existing) {
            const changed = sqlite
              .prepare(
                'UPDATE template_drafts SET document=?,document_hash=?,document_bytes=?,curriculum_version=?,revision=?,updated_at=? WHERE user_id=? AND template_id=? AND definition_hash=? AND revision=?',
              )
              .run(
                serialized,
                digest(document),
                bytes,
                curriculum.version,
                revision,
                timestamp,
                userId,
                input.templateId,
                input.definitionHash,
                input.expectedRevision,
              );
            if (changed.changes !== 1) throw new Error('TEMPLATE_REVISION_CONFLICT');
          } else {
            sqlite
              .prepare(
                'INSERT INTO template_drafts(user_id,template_id,definition_hash,definition_snapshot,document,document_hash,document_bytes,curriculum_version,revision,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
              )
              .run(
                userId,
                input.templateId,
                input.definitionHash,
                JSON.stringify(definition),
                serialized,
                digest(document),
                bytes,
                curriculum.version,
                revision,
                timestamp,
                timestamp,
              );
          }
          sqlite
            .prepare(
              'INSERT INTO template_draft_requests(user_id,id,template_id,definition_hash,payload_fingerprint,revision,created_at) VALUES(?,?,?,?,?,?,?)',
            )
            .run(
              userId,
              input.requestId,
              input.templateId,
              input.definitionHash,
              fingerprint,
              revision,
              timestamp,
            );
          return {
            acknowledgedRevision: revision,
            requestId: input.requestId,
            draft: get({ templateId: input.templateId, definitionHash: input.definitionHash }),
            replayed: false,
          };
        })
        .immediate();
    },
  };
}
