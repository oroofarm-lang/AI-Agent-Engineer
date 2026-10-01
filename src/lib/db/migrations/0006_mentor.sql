CREATE TABLE mentor_threads (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  lesson_id TEXT,
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(id, user_id)
);
CREATE INDEX mentor_threads_owner ON mentor_threads(user_id, lesson_id, updated_at);
CREATE TABLE mentor_messages (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  role TEXT NOT NULL CHECK(role IN ('user','assistant')),
  body TEXT NOT NULL,
  mode TEXT NOT NULL,
  help_level INTEGER NOT NULL CHECK(help_level BETWEEN 1 AND 5),
  created_at TEXT NOT NULL,
  FOREIGN KEY(thread_id, user_id) REFERENCES mentor_threads(id, user_id) ON DELETE CASCADE
);
CREATE INDEX mentor_messages_thread ON mentor_messages(user_id, thread_id, created_at, id);
CREATE TABLE mentor_runs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  thread_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('RUNNING','COMPLETE','FAILED')),
  input_tokens INTEGER,
  output_tokens INTEGER,
  created_at TEXT NOT NULL,
  finished_at TEXT,
  FOREIGN KEY(thread_id, user_id) REFERENCES mentor_threads(id, user_id) ON DELETE CASCADE
);
CREATE INDEX mentor_runs_limits ON mentor_runs(user_id, state, created_at);
