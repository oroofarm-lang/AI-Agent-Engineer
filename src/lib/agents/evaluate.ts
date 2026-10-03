import { createHash } from 'node:crypto';
import { z } from 'zod';
import type { Connection } from '../db/connection';
import type { ReturnTypeOfCurriculum } from '../ai/types';
import type { MentorProvider, ProviderAsset, ProviderReply } from '../ai/provider';
import type { KnowledgeSnapshot } from '../ai/knowledge';
import { assessmentSchema } from '../curriculum/assessment';
import { artifactMime, MAX_FILES, MAX_TOTAL_BYTES } from '../domain/artifacts';
import { agentInput, sendAgentMessage } from './orchestrator';

export const evaluationInput = z.strictObject({
  requestId: z.uuid(),
  submissionId: z.uuid(),
  artifactIds: z.array(z.uuid()).max(MAX_FILES).default([]),
  consent: z.literal(true),
  explanationLevel: z.enum(['eli5', 'practical', 'advanced']).default('practical'),
});
export type EvaluationInput = z.infer<typeof evaluationInput>;
export const evaluationFeedbackSchema = z.strictObject({
  summary: z.string().trim().min(20).max(2400),
  criteria: z
    .array(
      z.strictObject({
        criterionId: z.string().min(1).max(100),
        status: z.enum(['supported', 'needs-work', 'unclear']),
        feedback: z.string().trim().min(20).max(2000),
        evidence: z.string().trim().max(2000),
        nextStep: z.string().trim().min(10).max(1000),
      }),
    )
    .min(1)
    .max(12),
});
export type EvaluationFeedback = z.infer<typeof evaluationFeedbackSchema>;
export type EvaluationCoverage = {
  evidence: {
    criterionId: string;
    charactersProvided: number;
    totalCharacters: number;
    status: 'full-text' | 'partial-text';
  }[];
  artifacts: {
    id: string;
    criterionId: string;
    name: string;
    mime: string;
    size: number;
    sha256: string;
    status: 'full-text' | 'partial-text' | 'provided-to-model' | 'not-selected' | 'excluded';
    charactersProvided?: number;
    reason: string;
  }[];
  execution: 'not-run';
  masteryDecision: null;
  notice: string;
};
export type AgentEvaluation = {
  id: string;
  run_id: string;
  submission_id: string;
  curriculum_version: string;
  rubric_version: string;
  rubric_fingerprint: string;
  evidence_fingerprint: string;
  artifact_fingerprint: string;
  payload_fingerprint: string;
  coverage: EvaluationCoverage;
  feedback: EvaluationFeedback;
  created_at: string;
};
type EvaluationRow = Omit<AgentEvaluation, 'coverage' | 'feedback'> & {
  coverage: string;
  feedback: string;
};
const columns =
  'id,run_id,submission_id,curriculum_version,rubric_version,rubric_fingerprint,evidence_fingerprint,artifact_fingerprint,payload_fingerprint,coverage,feedback,created_at';
const sha = (value: string | Uint8Array) => createHash('sha256').update(value).digest('hex');
function unpack(row: EvaluationRow): AgentEvaluation {
  return {
    ...row,
    feedback: evaluationFeedbackSchema.parse(JSON.parse(row.feedback)),
    coverage: JSON.parse(row.coverage) as EvaluationCoverage,
  };
}

/** Read access never accepts an operator override: feedback belongs to the signed-in learner. */
export function evaluationRepository({ sqlite }: Connection, userId: string) {
  return {
    list(submissionId?: string) {
      const rows = (
        submissionId
          ? sqlite
              .prepare(
                `SELECT ${columns} FROM agent_evaluations WHERE user_id=? AND submission_id=? ORDER BY rowid DESC LIMIT 50`,
              )
              .all(userId, submissionId)
          : sqlite
              .prepare(
                `SELECT ${columns} FROM agent_evaluations WHERE user_id=? ORDER BY rowid DESC LIMIT 50`,
              )
              .all(userId)
      ) as EvaluationRow[];
      return rows.map(unpack);
    },
    byRun(runId: string) {
      const row = sqlite
        .prepare(`SELECT ${columns} FROM agent_evaluations WHERE user_id=? AND run_id=?`)
        .get(userId, runId) as EvaluationRow | undefined;
      return row ? unpack(row) : undefined;
    },
  };
}

function feedbackFormat(criterionIds: string[]) {
  return {
    name: 'advisory_submission_feedback',
    schema: {
      type: 'object',
      properties: {
        summary: { type: 'string' },
        criteria: {
          type: 'array',
          minItems: criterionIds.length,
          maxItems: criterionIds.length,
          items: {
            type: 'object',
            properties: {
              criterionId: { type: 'string', enum: criterionIds },
              status: { type: 'string', enum: ['supported', 'needs-work', 'unclear'] },
              feedback: { type: 'string' },
              evidence: { type: 'string' },
              nextStep: { type: 'string' },
            },
            required: ['criterionId', 'status', 'feedback', 'evidence', 'nextStep'],
            additionalProperties: false,
          },
        },
      },
      required: ['summary', 'criteria'],
      additionalProperties: false,
    },
  };
}

export async function evaluateSubmission(
  connection: Connection,
  curriculum: ReturnTypeOfCurriculum,
  userId: string,
  raw: EvaluationInput,
  provider: MentorProvider,
  knowledge?: KnowledgeSnapshot,
) {
  const input = evaluationInput.parse(raw);
  if (new Set(input.artifactIds).size !== input.artifactIds.length)
    throw new Error('DUPLICATE_ARTIFACT');
  const { sqlite } = connection;
  const submission = sqlite
    .prepare(
      'SELECT id,lesson_id,curriculum_version,rubric_version,rubric_snapshot,evidence FROM assessment_results WHERE id=? AND user_id=?',
    )
    .get(input.submissionId, userId) as
    | {
        id: string;
        lesson_id: string;
        curriculum_version: string;
        rubric_version: string;
        rubric_snapshot: string;
        evidence: string;
      }
    | undefined;
  if (!submission) throw new Error('UNKNOWN_SUBMISSION');
  const rubric = assessmentSchema.parse(JSON.parse(submission.rubric_snapshot));
  if (rubric.lessonId !== submission.lesson_id || rubric.version !== submission.rubric_version)
    throw new Error('INVALID_SAVED_EVIDENCE');
  const evidence = z
    .record(z.string(), z.string().max(12000))
    .parse(JSON.parse(submission.evidence));
  const expectedIds = rubric.criteria.map((criterion) => criterion.id);
  if (Object.keys(evidence).sort().join('|') !== [...expectedIds].sort().join('|'))
    throw new Error('INVALID_SAVED_EVIDENCE');
  const files = sqlite
    .prepare(
      'SELECT id,criterion_id,name,mime,size,sha256 FROM assessment_artifacts WHERE submission_id=? AND user_id=? ORDER BY id',
    )
    .all(input.submissionId, userId) as {
    id: string;
    criterion_id: string;
    name: string;
    mime: string;
    size: number;
    sha256: string;
  }[];
  if (input.artifactIds.some((id) => !files.some((file) => file.id === id)))
    throw new Error('UNKNOWN_ARTIFACT');
  const selectedBytes = input.artifactIds.length
    ? (sqlite
        .prepare(
          `SELECT id,data FROM assessment_artifacts WHERE submission_id=? AND user_id=? AND id IN (${input.artifactIds.map(() => '?').join(',')})`,
        )
        .all(input.submissionId, userId, ...input.artifactIds) as { id: string; data: Buffer }[])
    : [];
  const bytesById = new Map(selectedBytes.map((file) => [file.id, file.data]));
  const selected = files
    .filter((file) => input.artifactIds.includes(file.id))
    .map((file) => {
      const data = bytesById.get(file.id);
      if (!data) throw new Error('UNKNOWN_ARTIFACT');
      return { ...file, data };
    });
  if (selected.reduce((total, file) => total + file.data.byteLength, 0) > MAX_TOTAL_BYTES)
    throw new Error('FILES_TOO_LARGE');
  for (const file of selected) {
    if (
      sha(file.data) !== file.sha256 ||
      file.data.byteLength !== file.size ||
      artifactMime(file.name, file.data) !== file.mime ||
      !expectedIds.includes(file.criterion_id)
    )
      throw new Error('ARTIFACT_INTEGRITY');
  }
  const fingerprints = {
    rubric: sha(submission.rubric_snapshot),
    evidence: sha(submission.evidence),
    artifacts: sha(
      JSON.stringify(
        selected.map(({ id, criterion_id, name, mime, size, sha256 }) => ({
          id,
          criterionId: criterion_id,
          name,
          mime,
          size,
          sha256,
        })),
      ),
    ),
  };
  const payloadFingerprint = sha(
    JSON.stringify({
      submissionId: submission.id,
      curriculumVersion: submission.curriculum_version,
      rubricVersion: submission.rubric_version,
      fingerprints,
      explanationLevel: input.explanationLevel,
    }),
  );
  const evaluations = evaluationRepository(connection, userId);
  const previous = evaluations.byRun(input.requestId);
  if (previous) {
    if (previous.payload_fingerprint !== payloadFingerprint) throw new Error('REQUEST_CONFLICT');
    return previous;
  }

  // Allocate text fairly across criteria; partial coverage is explicit, never a full-review claim.
  const perCriterion = Math.floor(10500 / expectedIds.length);
  const selectedEvidence = Object.fromEntries(
    expectedIds.map((id) => [id, evidence[id].slice(0, perCriterion)]),
  );
  const textFiles: { id: string; criterionId: string; name: string; text: string }[] = [];
  const assets: ProviderAsset[] = [];
  let textBudget = 3000;
  const coverage: EvaluationCoverage = {
    evidence: expectedIds.map((id) => ({
      criterionId: id,
      charactersProvided: selectedEvidence[id].length,
      totalCharacters: evidence[id].length,
      status: selectedEvidence[id].length === evidence[id].length ? 'full-text' : 'partial-text',
    })),
    artifacts: files.map((file): EvaluationCoverage['artifacts'][number] => {
      const metadata = {
        id: file.id,
        criterionId: file.criterion_id,
        name: file.name,
        mime: file.mime,
        size: file.size,
        sha256: file.sha256,
      };
      if (!input.artifactIds.includes(file.id))
        return {
          ...metadata,
          status: 'not-selected',
          reason: 'הקובץ לא נבחר לשליחה ל־AI; תוכנו לא נבדק.',
        };
      const data = bytesById.get(file.id)!;
      if (file.mime.startsWith('text/')) {
        const full = new TextDecoder('utf-8', { fatal: true }).decode(data);
        const text = full.slice(0, Math.min(2000, textBudget));
        textBudget -= text.length;
        if (!text.length)
          return {
            ...metadata,
            status: 'excluded',
            charactersProvided: 0,
            reason: 'הטקסט לא נשלח בגלל מגבלת ההקשר; תוכן הקובץ לא נבדק.',
          };
        textFiles.push({ id: file.id, criterionId: file.criterion_id, name: file.name, text });
        return {
          ...metadata,
          status: text.length === full.length ? 'full-text' : 'partial-text',
          charactersProvided: text.length,
          reason:
            text.length === full.length
              ? 'תוכן הטקסט נשלח למודל לקריאה; הקוד לא הורץ.'
              : 'רק תחילת הטקסט נשלחה למודל בגלל מגבלת ההקשר; הקוד לא הורץ.',
        };
      }
      assets.push({
        filename: file.name,
        mimeType: z.enum(['application/pdf', 'image/png', 'image/jpeg']).parse(file.mime),
        dataBase64: data.toString('base64'),
      });
      return {
        ...metadata,
        status: 'provided-to-model',
        reason: 'הקובץ נשלח למודל כתמונה או כ־PDF. משוב המודל אינו אימות טכני של התוכן.',
      };
    }),
    execution: 'not-run',
    masteryDecision: null,
    notice:
      'זהו משוב AI על החומר שנשלח בלבד. הוא אינו ציון, אינו הרצת קוד ואינו מחליף בדיקה של בודק מורשה.',
  };
  const context = {
    submissionId: submission.id,
    savedCurriculumVersion: submission.curriculum_version,
    frozenRubric: rubric,
    selectedEvidence,
    textFiles,
    coverage,
  };
  if (JSON.stringify(context).length > 22000) throw new Error('EVALUATION_CONTEXT_LIMIT');
  const parseFeedback = (reply: ProviderReply) => {
    try {
      const parsed = evaluationFeedbackSchema.parse(JSON.parse(reply.text));
      const ids = parsed.criteria.map((criterion) => criterion.criterionId);
      if (ids.sort().join('|') !== [...expectedIds].sort().join('|')) throw new Error();
      return parsed;
    } catch {
      throw new Error('AI_INVALID_RESPONSE');
    }
  };
  const result = await sendAgentMessage(
    connection,
    curriculum,
    userId,
    agentInput.parse({
      requestId: input.requestId,
      lessonId: submission.lesson_id,
      message:
        'תן משוב לימודי על ההגשה השמורה שנבחרה לפי המחוון המקורי בלבד. זה אינו ציון או אישור שליטה.',
      mode: 'review',
      learningMode: 'builder',
      helpLevel: 2,
      explanationLevel: input.explanationLevel,
    }),
    provider,
    '',
    knowledge,
    {
      contextFingerprint: payloadFingerprint,
      specialistContext: context,
      assets,
      allowedAgentIds: ['Agent-Progress-Tracker', 'Agent-Code-Reviewer', 'Agent-Security-Auditor'],
      requiredAgentIds: ['Agent-Progress-Tracker'],
      finalFormat: feedbackFormat(expectedIds),
      finalInstructions:
        'Return structured advisory feedback for EVERY EXACT frozen rubric criterion ID, once each. ' +
        'Use only selectedSubmission.frozenRubric and the actual supplied evidence/coverage. ' +
        'Never substitute current course criteria. If evidence is partial, missing or inaccessible, say what remains unknown and choose unclear as appropriate. ' +
        'A supported observation is not a grade or mastery decision. Do not claim code execution, full review of a truncated file, successful business operation or human approval. ' +
        'The summary, feedback, evidence explanation and nextStep must use natural Hebrew.',
      validateFinal: (reply) => {
        parseFeedback(reply);
      },
    },
  );
  if (result.state !== 'COMPLETE')
    throw new Error(result.state === 'RUNNING' ? 'MENTOR_BUSY' : 'MENTOR_PREVIOUS_FAILED');
  const last = result.messages.at(-1);
  if (!last || last.role !== 'assistant') throw new Error('AI_INVALID_RESPONSE');
  const feedback = parseFeedback({ text: last.body, inputTokens: null, outputTokens: null });
  const createdAt = new Date().toISOString();
  sqlite.transaction(() => {
    const existing = evaluations.byRun(input.requestId);
    if (existing) {
      if (existing.payload_fingerprint !== payloadFingerprint) throw new Error('REQUEST_CONFLICT');
      return;
    }
    const run = sqlite
      .prepare("SELECT id FROM mentor_runs WHERE id=? AND user_id=? AND state='COMPLETE'")
      .get(input.requestId, userId);
    if (!run) throw new Error('UNKNOWN_RUN');
    sqlite
      .prepare(
        'INSERT INTO agent_evaluations(id,user_id,run_id,submission_id,curriculum_version,rubric_version,rubric_fingerprint,evidence_fingerprint,artifact_fingerprint,payload_fingerprint,coverage,feedback,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
      )
      .run(
        input.requestId,
        userId,
        input.requestId,
        submission.id,
        submission.curriculum_version,
        submission.rubric_version,
        fingerprints.rubric,
        fingerprints.evidence,
        fingerprints.artifacts,
        payloadFingerprint,
        JSON.stringify(coverage),
        JSON.stringify(feedback),
        createdAt,
      );
  })();
  return evaluations.byRun(input.requestId)!;
}
