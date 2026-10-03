CREATE UNIQUE INDEX mentor_runs_owned_id ON mentor_runs(id, user_id);
CREATE TABLE agent_steps (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  sequence INTEGER NOT NULL CHECK(sequence BETWEEN 0 AND 4),
  agent_id TEXT NOT NULL,
  agent_version TEXT NOT NULL,
  registry_version TEXT NOT NULL,
  definition_snapshot TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('orchestrator','specialist','synthesis')),
  state TEXT NOT NULL CHECK(state IN ('RUNNING','COMPLETE','FAILED')),
  output TEXT NOT NULL DEFAULT '' CHECK(length(output) <= 20000),
  tool_events TEXT NOT NULL DEFAULT '[]',
  error_code TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  created_at TEXT NOT NULL,
  finished_at TEXT,
  UNIQUE(run_id, sequence),
  FOREIGN KEY(run_id,user_id) REFERENCES mentor_runs(id,user_id) ON DELETE CASCADE
);
CREATE INDEX agent_steps_owner ON agent_steps(user_id,run_id,sequence);
