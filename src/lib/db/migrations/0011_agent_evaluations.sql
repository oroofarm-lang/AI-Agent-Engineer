CREATE UNIQUE INDEX assessment_results_owned_id ON assessment_results(id,user_id);
CREATE TABLE agent_evaluations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  run_id TEXT NOT NULL UNIQUE,
  submission_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL,
  rubric_version TEXT NOT NULL,
  rubric_fingerprint TEXT NOT NULL,
  evidence_fingerprint TEXT NOT NULL,
  artifact_fingerprint TEXT NOT NULL,
  payload_fingerprint TEXT NOT NULL,
  coverage TEXT NOT NULL CHECK(json_valid(coverage)),
  feedback TEXT NOT NULL CHECK(json_valid(feedback)),
  created_at TEXT NOT NULL,
  FOREIGN KEY(run_id,user_id) REFERENCES mentor_runs(id,user_id) ON DELETE CASCADE,
  FOREIGN KEY(submission_id,user_id) REFERENCES assessment_results(id,user_id) ON DELETE CASCADE
);
CREATE INDEX agent_evaluations_owner ON agent_evaluations(user_id,submission_id,created_at);
