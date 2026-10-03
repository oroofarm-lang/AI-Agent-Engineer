import { randomUUID } from 'node:crypto';
import type { Connection } from './connection';
import type { ProviderReply } from '../ai/provider';

export type AgentStep = {
  id: string;
  run_id: string;
  sequence: number;
  agent_id: string;
  agent_version: string;
  registry_version: string;
  role: 'orchestrator' | 'specialist' | 'synthesis';
  state: 'RUNNING' | 'COMPLETE' | 'FAILED';
  output: string;
  error_code: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
};
export function agentRepository({ sqlite }: Connection, userId: string) {
  function ownedRun(runId: string) {
    const run = sqlite
      .prepare('SELECT state FROM mentor_runs WHERE id=? AND user_id=?')
      .get(runId, userId) as { state: string } | undefined;
    if (!run) throw new Error('UNKNOWN_RUN');
    return run;
  }
  function steps(runId: string) {
    ownedRun(runId);
    return sqlite
      .prepare(
        'SELECT id,run_id,sequence,agent_id,agent_version,registry_version,role,state,output,error_code,input_tokens,output_tokens FROM agent_steps WHERE run_id=? AND user_id=? ORDER BY sequence',
      )
      .all(runId, userId) as AgentStep[];
  }
  return {
    steps,
    latest(threadId: string) {
      const run = sqlite
        .prepare(
          'SELECT id,state FROM mentor_runs WHERE thread_id=? AND user_id=? ORDER BY rowid DESC LIMIT 1',
        )
        .get(threadId, userId) as { id: string; state: string } | undefined;
      return run?.state === 'COMPLETE' ? steps(run.id) : [];
    },
    start(
      runId: string,
      sequence: number,
      definition: { id: string; version: string; role: AgentStep['role'] },
      registryVersion: string,
      toolEvents: unknown[],
    ) {
      if (ownedRun(runId).state !== 'RUNNING') throw new Error('RUN_NOT_ACTIVE');
      const id = randomUUID();
      sqlite
        .prepare(
          'INSERT INTO agent_steps(id,run_id,user_id,sequence,agent_id,agent_version,registry_version,definition_snapshot,role,state,tool_events,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
        )
        .run(
          id,
          runId,
          userId,
          sequence,
          definition.id,
          definition.version,
          registryVersion,
          JSON.stringify(definition),
          definition.role,
          'RUNNING',
          JSON.stringify(toolEvents),
          new Date().toISOString(),
        );
      return id;
    },
    finish(id: string, reply?: ProviderReply, errorCode?: string) {
      const changed = sqlite
        .prepare(
          "UPDATE agent_steps SET state=?,output=?,error_code=?,input_tokens=?,output_tokens=?,finished_at=? WHERE id=? AND user_id=? AND state='RUNNING' AND EXISTS(SELECT 1 FROM mentor_runs r WHERE r.id=agent_steps.run_id AND r.user_id=agent_steps.user_id AND r.state='RUNNING')",
        )
        .run(
          reply ? 'COMPLETE' : 'FAILED',
          reply?.text || '',
          errorCode || null,
          reply?.inputTokens ?? null,
          reply?.outputTokens ?? null,
          new Date().toISOString(),
          id,
          userId,
        ).changes;
      if (changed !== 1) throw new Error('STEP_NOT_ACTIVE');
    },
    failActive(runId: string, errorCode: string) {
      ownedRun(runId);
      sqlite
        .prepare(
          "UPDATE agent_steps SET state='FAILED',error_code=?,finished_at=? WHERE run_id=? AND user_id=? AND state='RUNNING'",
        )
        .run(errorCode, new Date().toISOString(), runId, userId);
    },
  };
}
