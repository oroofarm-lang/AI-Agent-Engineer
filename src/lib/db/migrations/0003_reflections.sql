CREATE TABLE journal_entries (
 id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL REFERENCES users(id),
 curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
 lesson_id TEXT, title TEXT NOT NULL, content TEXT NOT NULL,
 revision INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX journal_user_updated ON journal_entries(user_id, updated_at);
CREATE TABLE failure_entries (
 id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL REFERENCES users(id),
 curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
 lesson_id TEXT, skill_id TEXT, category TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL,
 revision INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX failure_user_updated ON failure_entries(user_id, updated_at);
CREATE TABLE failure_test_cases (
 id TEXT PRIMARY KEY NOT NULL, user_id TEXT NOT NULL REFERENCES users(id),
 failure_id TEXT NOT NULL REFERENCES failure_entries(id),
 failure_revision INTEGER NOT NULL, failure_snapshot TEXT NOT NULL,
 kind TEXT NOT NULL CHECK(kind IN ('REGRESSION','EVAL','SECURITY','EDGE_CASE')),
 input TEXT NOT NULL, expected TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE INDEX test_cases_failure ON failure_test_cases(user_id, failure_id);
