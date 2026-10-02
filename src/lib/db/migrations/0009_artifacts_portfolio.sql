ALTER TABLE assessment_results ADD COLUMN payload_fingerprint TEXT;
CREATE TABLE assessment_artifacts (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  submission_id TEXT NOT NULL REFERENCES assessment_results(id),
  criterion_id TEXT NOT NULL,
  name TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL CHECK(size > 0 AND size <= 3145728),
  sha256 TEXT NOT NULL,
  data BLOB NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX assessment_artifacts_owner ON assessment_artifacts(user_id, submission_id);
CREATE TABLE portfolio_entries (
  submission_id TEXT PRIMARY KEY NOT NULL REFERENCES assessment_results(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  included INTEGER NOT NULL CHECK(included IN (0,1)),
  updated_at TEXT NOT NULL
);
CREATE INDEX portfolio_entries_owner ON portfolio_entries(user_id, included);
