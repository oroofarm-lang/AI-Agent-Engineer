CREATE TABLE quiz_attempts (
  id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  question_id TEXT NOT NULL,
  question_version TEXT NOT NULL,
  question_hash TEXT NOT NULL,
  question_snapshot TEXT NOT NULL CHECK(json_valid(question_snapshot)),
  option_id TEXT NOT NULL,
  correct INTEGER NOT NULL CHECK(correct IN (0,1)),
  payload_fingerprint TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY(id,user_id)
);
CREATE INDEX quiz_attempts_owner_lesson ON quiz_attempts(user_id,lesson_id,created_at);
CREATE INDEX quiz_attempts_daily ON quiz_attempts(user_id,created_at);
