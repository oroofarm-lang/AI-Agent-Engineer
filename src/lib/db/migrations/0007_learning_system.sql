CREATE TABLE assessment_reviews (
  id TEXT PRIMARY KEY NOT NULL,
  submission_id TEXT NOT NULL UNIQUE REFERENCES assessment_results(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  reviewer_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  criteria TEXT NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('PASS','REVISE')),
  reviewed_at TEXT NOT NULL
);
CREATE INDEX assessment_reviews_owner ON assessment_reviews(user_id, reviewed_at);
CREATE TABLE skill_mastery (
  user_id TEXT NOT NULL REFERENCES users(id),
  skill_id TEXT NOT NULL,
  level INTEGER NOT NULL CHECK(level BETWEEN 1 AND 3),
  review_id TEXT NOT NULL REFERENCES assessment_reviews(id),
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  updated_at TEXT NOT NULL,
  PRIMARY KEY(user_id, skill_id)
);
CREATE TABLE project_workspaces (
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  architecture TEXT NOT NULL,
  test_log TEXT NOT NULL,
  reflection TEXT NOT NULL,
  revision INTEGER NOT NULL CHECK(revision > 0),
  updated_at TEXT NOT NULL,
  PRIMARY KEY(user_id, lesson_id)
);
CREATE TABLE boss_attempts (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  state TEXT NOT NULL CHECK(state IN ('ACTIVE','SUBMITTED')),
  submission_id TEXT UNIQUE REFERENCES assessment_results(id),
  started_at TEXT NOT NULL,
  submitted_at TEXT
);
CREATE UNIQUE INDEX boss_one_active ON boss_attempts(user_id, lesson_id) WHERE state='ACTIVE';
