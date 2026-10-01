CREATE TABLE users (id TEXT PRIMARY KEY NOT NULL, locale TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE curriculum_versions (version TEXT PRIMARY KEY NOT NULL, released_at TEXT NOT NULL, manifest_hash TEXT NOT NULL);
CREATE TABLE lesson_progress (
  user_id TEXT NOT NULL REFERENCES users(id), lesson_id TEXT NOT NULL,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  state TEXT NOT NULL CHECK (state IN ('NOT_STARTED','IN_PROGRESS','BUILD_COMPLETE','MASTERY_PENDING','MASTERED','COMPLETED_WITHOUT_MASTERY')),
  started_at TEXT NOT NULL, build_completed_at TEXT, updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);
CREATE TABLE lesson_notes (
  user_id TEXT NOT NULL REFERENCES users(id), lesson_id TEXT NOT NULL, body TEXT NOT NULL,
  updated_at TEXT NOT NULL, PRIMARY KEY (user_id, lesson_id)
);
