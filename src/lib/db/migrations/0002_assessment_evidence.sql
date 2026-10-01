CREATE TABLE assessment_results (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  assessment_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  rubric_version TEXT NOT NULL,
  rubric_snapshot TEXT NOT NULL,
  evidence TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status = 'PENDING_REVIEW'),
  submitted_at TEXT NOT NULL
);
CREATE INDEX assessment_results_user_lesson ON assessment_results(user_id, lesson_id, submitted_at);
