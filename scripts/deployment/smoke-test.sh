#!/bin/sh
set -eu
image="${1:?Pass the built image name}"
task_id="ai-engineer-smoke-$$"
cleanup() {
  docker rm -f "$task_id" >/dev/null 2>&1 || true
  docker volume rm "$task_id-data" "$task_id-vault" "$task_id-cache" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

# Image must not contain a database, personal Vault or local secrets.
docker run --rm --entrypoint node "$image" -e '
const fs = require("node:fs");
for (const file of [".env.local", ".env.production", ".git", ".data/learning.sqlite", "Volt/מחברת"])
  if (fs.existsSync(file)) throw new Error("Private build content detected");'

start() {
  docker run -d --name "$task_id" --read-only --tmpfs /tmp:rw,noexec,nosuid,size=64m \
    --mount "type=volume,src=$task_id-data,dst=/app/.data" \
    --mount "type=volume,src=$task_id-vault,dst=/app/Volt" \
    --mount "type=volume,src=$task_id-cache,dst=/app/.next/cache" \
    -e DATABASE_URL=/app/.data/learning.sqlite \
    -e CURRICULUM_AUDITOR_DIR=/app/.data/curriculum-auditor \
    -e QUIZ_REVIEW_DIR=/app/.data/quiz-releases \
    -e MENTOR_KNOWLEDGE_PATH=/app/.data/mentor/knowledge.json \
    -e VAULT_EXPORT_DIR=/app/Volt \
    -e BETTER_AUTH_URL=https://academy.example.test \
    -e BETTER_AUTH_SECRET=synthetic-container-test-secret-0123456789 \
    -e MAIL_PROVIDER=smtp -e SMTP_HOST=mail.example.test -e SMTP_PORT=465 \
    -e SMTP_USER=synthetic -e SMTP_PASSWORD=synthetic \
    -e MAIL_FROM=qa@example.test -e ADMIN_EMAILS=qa@example.test \
    -e LEGAL_OPERATOR=Synthetic-QA -e LEGAL_CONTACT_EMAIL=qa@example.test \
    "$image" >/dev/null
}
wait_ready() {
  for attempt in $(seq 1 100); do
    status="$(docker inspect --format '{{.State.Health.Status}}' "$task_id")"
    if [ "$status" = healthy ]; then return; fi
    if [ "$(docker inspect --format '{{.State.Running}}' "$task_id")" != true ]; then
      docker logs "$task_id"
      return 1
    fi
    sleep 3
  done
  docker logs "$task_id"
  return 1
}
start
wait_ready
# Synthetic marker proves the mounted database survives container replacement.
docker exec "$task_id" node -e '
const Database = require("better-sqlite3"); const db = new Database(process.env.DATABASE_URL);
db.exec("CREATE TABLE deployment_smoke_marker(value TEXT); INSERT INTO deployment_smoke_marker VALUES (\u0027synthetic-only\u0027)"); db.close();'
docker stop --time 30 "$task_id" >/dev/null
docker rm "$task_id" >/dev/null
start
wait_ready
docker exec "$task_id" node -e '
const fs = require("node:fs"); const Database = require("better-sqlite3");
const db = new Database(process.env.DATABASE_URL, {readonly:true});
if (db.prepare("SELECT value FROM deployment_smoke_marker").get().value !== "synthetic-only") throw new Error("Storage lost");
db.close();
const backups = fs.readdirSync(".data/backups").filter(name => name.endsWith(".sqlite"));
if (!backups.length) throw new Error("Missing pre-migration backup");'
# Restore drill touches only this smoke run's isolated synthetic volume.
# Change the live marker after backup, so persistence alone cannot pass restoration.
docker exec "$task_id" node -e '
const Database = require("better-sqlite3"); const db = new Database(process.env.DATABASE_URL);
db.prepare("UPDATE deployment_smoke_marker SET value = ?").run("changed-after-backup"); db.close();'
docker stop --time 30 "$task_id" >/dev/null
docker rm "$task_id" >/dev/null
docker run --rm --read-only --entrypoint node \
  --mount "type=volume,src=$task_id-data,dst=/app/.data" "$image" -e '
const fs = require("node:fs"); const Database = require("better-sqlite3");
const filename = ".data/learning.sqlite";
const backup = ".data/backups/" + fs.readdirSync(".data/backups").filter(name => name.endsWith(".sqlite")).sort().at(-1);
const source = new Database(backup, {readonly:true, fileMustExist:true});
if (source.prepare("PRAGMA integrity_check").pluck().get() !== "ok") throw new Error("Backup integrity failed");
if (source.prepare("SELECT value FROM deployment_smoke_marker").get().value !== "synthetic-only") throw new Error("Backup content mismatch");
source.close();
for (const suffix of ["-wal", "-shm"]) fs.rmSync(filename + suffix, {force:true});
fs.copyFileSync(backup, filename); fs.chmodSync(filename, 0o600);'
start
wait_ready
docker exec "$task_id" node -e '
const Database = require("better-sqlite3");
const db = new Database(process.env.DATABASE_URL, {readonly:true, fileMustExist:true});
if (db.prepare("SELECT value FROM deployment_smoke_marker").get().value !== "synthetic-only") throw new Error("Restored data mismatch");
db.close();'
printf '%s\n' 'Container smoke passed: read-only runtime, readiness, retained synthetic storage, pre-migration backup and isolated restore. No real email, AI call or public deployment.'
