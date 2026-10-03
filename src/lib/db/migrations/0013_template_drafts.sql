CREATE TABLE template_drafts (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  definition_hash TEXT NOT NULL CHECK(length(definition_hash)=64),
  definition_snapshot TEXT NOT NULL,
  document TEXT NOT NULL,
  document_hash TEXT NOT NULL CHECK(length(document_hash)=64),
  document_bytes INTEGER NOT NULL CHECK(document_bytes BETWEEN 1 AND 180000),
  curriculum_version TEXT NOT NULL REFERENCES curriculum_versions(version),
  revision INTEGER NOT NULL CHECK(revision>=1),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY(user_id,template_id,definition_hash)
);
CREATE TABLE template_draft_requests (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  definition_hash TEXT NOT NULL,
  payload_fingerprint TEXT NOT NULL CHECK(length(payload_fingerprint)=64),
  revision INTEGER NOT NULL CHECK(revision>=1),
  created_at TEXT NOT NULL,
  PRIMARY KEY(user_id,id),
  FOREIGN KEY(user_id,template_id,definition_hash)
    REFERENCES template_drafts(user_id,template_id,definition_hash) ON DELETE CASCADE
);
CREATE INDEX template_draft_requests_daily ON template_draft_requests(user_id,created_at);
