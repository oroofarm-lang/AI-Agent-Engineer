CREATE TABLE lesson_positions (
 user_id TEXT NOT NULL REFERENCES users(id),
 lesson_id TEXT NOT NULL,
 step_id TEXT NOT NULL,
 updated_at TEXT NOT NULL,
 PRIMARY KEY(user_id, lesson_id)
);
CREATE INDEX positions_user_updated ON lesson_positions(user_id, updated_at);
