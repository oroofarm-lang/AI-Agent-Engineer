import { z } from 'zod';
import type { AgentDefinition } from './registry';

// This input is assembled by sendMentorMessage after identity/lesson/task/opt-in checks.
// Tool names and arguments never come from arbitrary instructions inside learner content.
const serverContext = z.object({
  curriculumVersion: z.string(),
  activeTask: z.unknown(),
  lesson: z.unknown(),
  sources: z.unknown().optional(),
  progress: z.unknown(),
  quizResults: z.unknown().optional(),
  skillMastery: z.unknown(),
  knowledge: z.unknown(),
  selectedNotes: z.string(),
  selectedReflections: z.unknown().optional(),
  selectedCode: z.string(),
});
export type AgentToolContext = z.infer<typeof serverContext>;
export function parseToolContext(raw: string) {
  return serverContext.parse(JSON.parse(raw));
}
export function executeAgentTool(
  agent: { allowedTools: readonly string[] },
  id: string,
  context: AgentToolContext,
) {
  if (!agent.allowedTools.includes(id)) throw new Error('AGENT_TOOL_DENIED');
  switch (id) {
    case 'course.read':
      return {
        curriculumVersion: context.curriculumVersion,
        lesson: context.lesson,
        activeTask: context.activeTask,
      };
    case 'sources.read':
      return context.sources ?? [];
    case 'progress.read':
      return {
        progress: context.progress,
        quizResults: context.quizResults ?? [],
        skillMastery: context.skillMastery,
        mastery: 'Only stored human assessment decisions establish mastery.',
      };
    case 'knowledge.read':
      return context.knowledge;
    case 'evidence.read':
      return {
        selectedCode: context.selectedCode,
        selectedNotes: context.selectedNotes,
        selectedReflections: context.selectedReflections ?? null,
        execution: 'not-run',
        coverage: 'Only the supplied text. No access to other files or artifacts.',
      };
    case 'rubric.check': {
      const text = context.selectedCode.trim();
      return {
        activeTask: context.activeTask,
        selectedTextPresent: text.length > 0,
        selectedTextCharacters: text.length,
        grade: null,
        masteryDecision: null,
      };
    }
    default:
      throw new Error('UNKNOWN_AGENT_TOOL');
  }
}
export function collectAgentTools(agent: AgentDefinition, context: AgentToolContext) {
  const data = Object.fromEntries(
    agent.allowedTools.map((id) => [id, executeAgentTool(agent, id, context)]),
  );
  return {
    data,
    events: agent.allowedTools.map((id) => ({
      toolId: id,
      status: 'COMPLETE',
      scope: ['progress.read', 'evidence.read', 'rubric.check'].includes(id) ? 'own' : 'public',
    })),
  };
}
