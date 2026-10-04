import { createHash } from 'node:crypto';
import { z } from 'zod';
import type { Connection } from './connection';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import { assessmentRepository } from './assessments';
import { templateDraftRepository } from './template-drafts';
import { templateReferencesSchema } from '../templates/submission';
import { templateHash } from '../templates/hash';
import { templateDefinitionSchema, templateDocumentSchema } from '../templates/schema';
import { templateSubmission } from '../templates/formats';
import { MAX_FILES, type ArtifactInput } from '../domain/artifacts';

const frozenSchema = z.strictObject({
  schemaVersion: z.literal(1),
  curriculumVersion: z.string().min(1).max(80),
  definitionHash: z.string().regex(/^[a-f0-9]{64}$/),
  revision: z.number().int().positive(),
  definition: templateDefinitionSchema,
  document: templateDocumentSchema,
});
function artifactId(submissionId: string, criterionId: string) {
  const bytes = createHash('sha256')
    .update(`template-artifact:v1:${submissionId}:${criterionId}`)
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 15) | 0x50;
  bytes[8] = (bytes[8] & 63) | 0x80;
  const value = bytes.toString('hex');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
}
/** Saved draft reads and ordinary submission writes share one immediate owned transaction. */
export function submitTemplateEvidence(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
  raw: {
    submissionId: unknown;
    assessmentId: unknown;
    rubricVersion: unknown;
    curriculumVersion: unknown;
    evidence: Record<string, unknown>;
    artifacts: ArtifactInput[];
    templates: unknown;
    portfolio?: unknown;
  },
) {
  const refs = templateReferencesSchema.parse(raw.templates);
  const submissionId = z.uuid().parse(raw.submissionId);
  const assessment = curriculum.assessments.find((item) => item.id === raw.assessmentId);
  if (!assessment) throw new Error('UNKNOWN_ASSESSMENT');
  return connection.sqlite
    .transaction(() => {
      const existing = connection.sqlite
        .prepare('SELECT id FROM assessment_results WHERE id=? AND user_id=?')
        .get(submissionId, userId);
      const evidence = { ...raw.evidence },
        artifacts = [...raw.artifacts];
      const criteria = new Set<string>();
      for (const reference of refs) {
        let frozen: z.infer<typeof frozenSchema>, data: ArtifactInput['data'];
        if (existing) {
          const criterion = assessment.criteria.find(
            (item) => reference.templateId === `TEMPLATE_${assessment.id}_${item.id}`,
          );
          if (!criterion) throw new Error('SUBMISSION_CONFLICT');
          const file = connection.sqlite
            .prepare(
              'SELECT criterion_id,data FROM assessment_artifacts WHERE id=? AND user_id=? AND submission_id=?',
            )
            .get(artifactId(submissionId, criterion.id), userId, submissionId) as
            { criterion_id: string; data: Buffer } | undefined;
          if (!file) throw new Error('SUBMISSION_CONFLICT');
          frozen = frozenSchema.parse(JSON.parse(file.data.toString('utf8')));
          if (
            frozen.definition.id !== reference.templateId ||
            frozen.definitionHash !== reference.definitionHash ||
            frozen.revision !== reference.revision ||
            frozen.curriculumVersion !== raw.curriculumVersion
          )
            throw new Error('SUBMISSION_CONFLICT');
          data = new Uint8Array(file.data);
        } else {
          const draft = templateDraftRepository(connection, curriculum, userId).get({
            templateId: reference.templateId,
            definitionHash: reference.definitionHash,
          });
          if (draft.readOnly) throw new Error('TEMPLATE_VERSION_CONFLICT');
          if (draft.revision !== reference.revision) throw new Error('TEMPLATE_REVISION_CONFLICT');
          frozen = {
            schemaVersion: 1,
            curriculumVersion: curriculum.version,
            definitionHash: reference.definitionHash,
            revision: reference.revision,
            definition: draft.definition,
            document: draft.document,
          };
          data = new TextEncoder().encode(JSON.stringify(frozen) + '\n');
        }
        const definition = frozen.definition;
        const criterion = assessment.criteria.find((item) => item.id === definition.criterionId);
        if (
          !criterion ||
          definition.assessmentId !== assessment.id ||
          definition.lessonId !== assessment.lessonId ||
          definition.rubricVersion !== assessment.version ||
          definition.prompt !== criterion.prompt ||
          definition.evidenceHint !== criterion.evidenceHint ||
          templateHash(definition) !== reference.definitionHash ||
          criteria.has(criterion.id)
        )
          throw new Error('TEMPLATE_VERSION_CONFLICT');
        criteria.add(criterion.id);
        evidence[criterion.id] = templateSubmission(frozen.document, definition).text;
        artifacts.push({
          id: artifactId(submissionId, criterion.id),
          criterionId: criterion.id,
          name: `template-${criterion.id.slice(0, 80)}.json`,
          data,
        });
      }
      if (artifacts.length > MAX_FILES) throw new Error('FILES_TOO_LARGE');
      const { templates: _templates, ...base } = raw;
      void _templates;
      return assessmentRepository(connection, curriculum, userId).submit({
        ...base,
        submissionId,
        evidence,
        artifacts,
      });
    })
    .immediate();
}
