import { getSession } from '@/lib/auth/session';
import { getCurriculum } from '@/lib/data';
import { getConnection } from '@/lib/db/connection';
import { evaluationInput, evaluateSubmission, evaluationRepository } from '@/lib/agents/evaluate';
import { mentorConfiguration, openAIProvider } from '@/lib/ai/provider';
import { readKnowledge } from '@/lib/ai/knowledge-store';
import { boundedJSON } from '@/lib/http/body';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  const value = new URL(request.url).searchParams.get('submissionId');
  const submissionId = z.uuid().safeParse(value);
  if (!submissionId.success)
    return Response.json({ error: 'INVALID_REQUEST' }, { status: 400, headers });
  const connection = getConnection();
  if (
    !connection.sqlite
      .prepare('SELECT id FROM assessment_results WHERE id=? AND user_id=?')
      .get(submissionId.data, session.user.id)
  )
    return Response.json({ error: 'UNKNOWN_SUBMISSION' }, { status: 404, headers });
  return Response.json(
    {
      configuration: mentorConfiguration(),
      evaluations: evaluationRepository(connection, session.user.id).list(submissionId.data),
    },
    { headers },
  );
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  if (
    request.headers.get('origin') !==
    new URL(process.env.BETTER_AUTH_URL || 'http://127.0.0.1:3000').origin
  )
    return Response.json({ error: 'ORIGIN' }, { status: 403, headers });
  if (!mentorConfiguration().ready)
    return Response.json({ error: 'AI_NOT_CONFIGURED' }, { status: 503, headers });
  try {
    const input = evaluationInput.parse(await boundedJSON(request, 8000));
    const result = await evaluateSubmission(
      getConnection(),
      getCurriculum(),
      session.user.id,
      input,
      openAIProvider(),
      await readKnowledge(),
    );
    return Response.json({ evaluation: result }, { headers });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    const permitted = [
      'BODY_TOO_LARGE',
      'UNKNOWN_SUBMISSION',
      'UNKNOWN_ARTIFACT',
      'DUPLICATE_ARTIFACT',
      'FILES_TOO_LARGE',
      'ARTIFACT_INTEGRITY',
      'INVALID_SAVED_EVIDENCE',
      'EVALUATION_CONTEXT_LIMIT',
      'FOUNDATION_REQUIRED',
      'UNKNOWN_LESSON',
      'REQUEST_CONFLICT',
      'MENTOR_BUSY',
      'MENTOR_DAILY_LIMIT',
      'MENTOR_PREVIOUS_FAILED',
      'AI_CONNECTION_FAILED',
      'AI_RATE_LIMIT',
      'AI_PROVIDER_FAILED',
      'AI_INCOMPLETE',
      'AI_INVALID_RESPONSE',
      'AGENT_ROUTING_INVALID',
      'AGENT_CONTEXT_LIMIT',
      'AGENT_TOOL_DENIED',
      'AGENT_RUN_TIMEOUT',
    ];
    const safe = permitted.includes(code) ? code : 'INVALID_REQUEST';
    return Response.json(
      { error: safe },
      {
        status: ['UNKNOWN_SUBMISSION', 'UNKNOWN_ARTIFACT'].includes(safe)
          ? 404
          : ['REQUEST_CONFLICT', 'MENTOR_PREVIOUS_FAILED'].includes(safe)
            ? 409
            : ['MENTOR_BUSY', 'MENTOR_DAILY_LIMIT'].includes(safe)
              ? 429
              : safe.startsWith('AI_') || safe.startsWith('AGENT_')
                ? 502
                : 400,
        headers,
      },
    );
  }
}
