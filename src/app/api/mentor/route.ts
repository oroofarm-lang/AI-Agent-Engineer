import { getSession } from '@/lib/auth/session';
import { getCurriculum } from '@/lib/data';
import { getConnection } from '@/lib/db/connection';
import { mentorRepository } from '@/lib/db/mentor';
import { agentInput, sendAgentMessage } from '@/lib/agents/orchestrator';
import { agentRepository } from '@/lib/db/agents';
import { loadAgentRegistry } from '@/lib/agents/registry';
import { mentorConfiguration, openAIProvider } from '@/lib/ai/provider';
import { readCatalogLesson } from '@/lib/curriculum/load';
import { boundedJSON } from '@/lib/http/body';
import { ensureKnowledge, readKnowledge } from '@/lib/ai/knowledge-store';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store' };
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'UNAUTHORIZED' }, { status: 401, headers });
  const lessonId = new URL(request.url).searchParams.get('lessonId');
  if (lessonId && !getCurriculum().lessons.some((lesson) => lesson.id === lessonId))
    return Response.json({ error: 'UNKNOWN_LESSON' }, { status: 400, headers });
  const repo = mentorRepository(getConnection(), session.user.id);
  const thread = repo.latest(lessonId);
  const registry = loadAgentRegistry(getCurriculum());
  return Response.json(
    {
      configuration: mentorConfiguration(),
      threadId: thread?.id,
      messages: thread ? repo.messages(thread.id) : [],
      steps: thread
        ? agentRepository(getConnection(), session.user.id)
            .latest(thread.id)
            .map((step) => ({
              agentId: step.agent_id,
              title:
                registry.agents.find((agent) => agent.id === step.agent_id)?.titleHebrew ||
                step.agent_id,
              role: step.role,
              state: step.state,
            }))
        : [],
      knowledge: await readKnowledge(),
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
    const input = agentInput.parse(await boundedJSON(request));
    const c = getCurriculum();
    const body =
      input.lessonId && c.lessons.some((lesson) => lesson.id === input.lessonId)
        ? readCatalogLesson(c, input.lessonId)
        : '';
    const result = await sendAgentMessage(
      getConnection(),
      c,
      session.user.id,
      input,
      openAIProvider(),
      body,
      await ensureKnowledge().catch(() => undefined),
    );
    if (result.state !== 'COMPLETE')
      return Response.json(
        { error: result.state === 'RUNNING' ? 'MENTOR_BUSY' : 'MENTOR_PREVIOUS_FAILED' },
        { status: result.state === 'RUNNING' ? 429 : 409, headers },
      );
    return Response.json(result, { headers });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    const allowed = [
      'BODY_TOO_LARGE',
      'INVALID_TASK_CONTEXT',
      'INVALID_TEMPLATE_CONTEXT',
      'TEMPLATE_REVISION_CONFLICT',
      'FOUNDATION_REQUIRED',
      'UNKNOWN_LESSON',
      'UNKNOWN_THREAD',
      'THREAD_CONTEXT_CONFLICT',
      'REQUEST_CONFLICT',
      'MENTOR_BUSY',
      'MENTOR_DAILY_LIMIT',
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
    const safe = allowed.includes(code) ? code : 'INVALID_REQUEST';
    return Response.json(
      { error: safe },
      {
        status:
          safe.startsWith('AI_') || safe.startsWith('AGENT_')
            ? 502
            : ['MENTOR_BUSY', 'MENTOR_DAILY_LIMIT'].includes(safe)
              ? 429
              : 400,
        headers,
      },
    );
  }
}
