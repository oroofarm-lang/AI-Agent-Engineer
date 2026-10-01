CREATE TABLE marketing_consent_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  enabled INTEGER NOT NULL CHECK (enabled IN (0,1)),
  policy_version TEXT NOT NULL,
  recorded_at TEXT NOT NULL
);
CREATE INDEX marketing_consent_owner ON marketing_consent_events(user_id);
