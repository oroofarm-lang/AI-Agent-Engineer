# Multi-user release checkpoint

## Architecture decision (2026-10-01)

Better Auth owns password hashing, verification/reset tokens, cookie sessions, CSRF/origin checks and database-backed auth throttling. Its native SQLite adapter is used alongside Drizzle learner repositories. The generated core auth schema is committed as immutable migration 0004; lesson resume positions are migration 0005. No custom password hashing or browser-stored bearer token is used.

`src/lib/auth/` separates server configuration, request-scoped session access and the client SDK. Repositories require an explicit learner ID. Only server session identity supplies it in application code; request bodies never select a tenant. Protected page navigation validates the session in Next proxy; server actions and repositories independently require it. Export and resume endpoints return 401 without a session. Export contains the requesting profile and learning data, never password hashes, auth sessions or another learner's data.

XP and streaks are derived from the user's persisted build timestamps: 100 XP once per unique build, calendar streak in Asia/Jerusalem. Reading acknowledgements do not award mastery. The resume table stores stable card IDs, validated against the published lesson; navigation saves are serialized. Saving errors remain visible with retry. Planned lessons remain outlines; this release does not fabricate their content or mark them completed.

SQLite remains appropriate for one persistent Node host with multiple users. It requires a persistent local volume and backups. Do not deploy this database on ephemeral/serverless storage or share its file over a network filesystem. Horizontal scaling requires a deliberate PostgreSQL migration of both learner and auth adapters; this release does not pretend to include such an infrastructure deployment.

The Curriculum Auditor also requires a private persistent local directory: `CURRICULUM_AUDITOR_DIR`, default `.data/curriculum-auditor`. Preserve its active pointer, immutable release snapshots, proposals, decisions and journal across deploys. Keep it outside public assets and production traces; it must be an actual directory, without symlink path components. Back up this ledger alongside the database and recover the matching active release before serving traffic. See [release operations](CURRICULUM_AUDITOR.md). Section publication adds only a curriculum-version registration; it does not migrate or rewrite learner tables.

The question-review ledger similarly requires private persistent `QUIZ_REVIEW_DIR`, default `.data/quiz-releases`. Preserve its immutable proposals, per-question decisions, sealed releases and active pointer alongside the course ledger and database. It is not a public asset and must have no symlink path components. No learner database migration is needed for review records; published subject answers reuse migration 0012's owned frozen snapshots. `/admin/quizzes` is restricted to verified configured operators. All-question approval and explicit publication are separate, and real teaching approval must not be inferred from synthetic QA decisions. See [question releases](QUIZ_RELEASES.md).

The public Vault requires a writable persistent `VAULT_EXPORT_DIR` (default `Volt`). Preserve `.course-export.json` and historical exports when redeploying so edited generated notes remain protected. Reviewed course/question publication and rollback update this projection; failures keep the primary operation committed and expose an operator retry. Status compares the last saved curriculum version/hash and eligible question-bank fingerprint, without crawling personal notes or verifying later manual edits. Do not deploy the Vault on read-only or ephemeral storage and claim synchronization works. See [public projection design](VAULT_SYNC.md). The isolated browser suite assigns its own fresh Vault in addition to its database, Auditor and question-review directories.

## Local setup

1. `npm ci`
2. Copy `.env.example` to `.env.local`, if configuration overrides are needed.
3. `npm run db:setup` — additive migrations, preserves prior progress, creates a random local secret with mode 0600 if no environment secret exists.
4. `npm run build && npm run start` (or `npm run dev`).
5. Register at `/auth`. Each account starts independently. The previous `local` learner is preserved in the database and is never given to the first visitor. Transferring that data requires an explicit operator-approved migration after identifying the intended account.

Loopback-only origins permit signup without mail verification only when SMTP is unconfigured. Configuring SMTP enables verification locally too. The UI clearly labels this and hides unavailable mail reset. Public origins require HTTPS, an environment secret and mail configuration. Secrets are never checked into Git. The local secret path is alongside DATABASE_URL; preserve it across restarts.

## Public deployment requirements

Set BETTER_AUTH_URL (exact HTTPS origin), BETTER_AUTH_SECRET (cryptographically random, at least 32 characters), SMTP_URL (or SMTP_HOST/SMTP_USER/SMTP_PASSWORD), MAIL_FROM and ADMIN_EMAILS. Public signup requires email verification, reset emails use expiring single-use library tokens, reset revokes sessions. Configure a real delivery service and test delivery/abuse handling. TLS termination must strip and replace `X-Real-IP` with the real client IP: the auth limiter trusts only that header. Add infrastructure-level request/body-size throttling before exposing the Node server.

Set LEGAL_OPERATOR and LEGAL_CONTACT_EMAIL; run `npm run deploy:check`. Complete and review the published policy sections for the actual business, hosting location/processors, retention/backup expiry, transfer safeguards and applicable jurisdiction. No autogenerated text or accessibility overlay establishes legal compliance by itself. Provide a monitored rights/accessibility contact and a procedure for requests not handled by export, profile edit or account deletion. Review email provider logs and infrastructure logging too.

Daily, run `npm run db:cleanup` to remove expired sessions/verification and stale rate-limit records. Back up consistently using SQLite's backup mechanism; account deletion removes active learning data and auth rows, while backup expiry is the operator's responsibility. Never restore deleted accounts inadvertently from old backups.

## Release verification

`npm run verify` runs lint, type checking, unit/integration tests, production build and Playwright. `npm run test:e2e` uses a fresh isolated database and test-only secret on port 3100; it never uses personal learner data. `npm run test:a11y` filters accessibility scenarios. `npm run test:e2e:ui` is the interactive runner. Build first for standalone E2E commands.

The GitHub Actions workflow executes verification on every push and pull request and supports manual runs. Make its `verify` job a required branch/deployment check in the hosting service; this repository does not currently contain a deployment pipeline to attach to. Failure artifacts may contain test data only and expire after seven days. No recurring hosted agent has been provisioned.

The automated suite checks signup/login/logout, revocation, throttling, tenant isolation, account deletion, persistent progress/XP/resume, card scroll/focus, reduced motion, dialog focus return, font resizing and layouts at 390/768/1440px. Axe tests WCAG 2.1 AA rules, including text contrast, on all app views. Manual VoiceOver/NVDA, browser zoom, touch and email-delivery acceptance checks remain part of release acceptance; automated checks alone cannot certify screen-reader usability.

## Sources

- [Better Auth installation](https://better-auth.com/docs/installation), [Next.js integration](https://better-auth.com/docs/integrations/next), [rate limiting](https://better-auth.com/docs/concepts/rate-limit).
- [W3C WCAG 2.1](https://www.w3.org/TR/WCAG21/) and [minimum contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum).
- [European Commission: individuals' data rights](https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en), [California privacy rights](https://privacy.ca.gov/california-privacy-rights/rights-under-the-california-consumer-privacy-act/).

## Connection checkpoint — 2.1.0

See `CONNECTION_SETUP_HE.md` for Gmail app-password prerequisites, the no-send `mail:check`, verified operator access and the optional real Mentor. SMTP transport tests and model doubles are not live acceptance. There are no configured provider credentials in this installation. The owner email is saved in ignored local configuration. Project/mastery review and curriculum auditing are still pending.

## Private artifacts and knowledge cache — migration 0009

Back up the existing SQLite database consistently before `npm run db:setup`, then
restart the app. Migration 0009 adds tables and a nullable fingerprint column;
it does not overwrite learning records. Artifact bytes, answers and portfolio
metadata commit in one transaction. Limits: 3 MiB per file, six files and 8 MiB per
submission, 100 MiB per learner. Configure request/body limits at the reverse proxy;
the Server Action limit is 12 MiB including multipart overhead. Accepted text/code,
CSV/JSON/Markdown, PDF and PNG/JPEG files are validated on the server. Downloads
always use attachment disposition, no-store and nosniff, and require the owner or
a verified allowlisted reviewer. There is no antivirus scanning or public sharing.

Profile export includes uploaded bytes as base64, private portfolio metadata and
assessment records. Treat exports and backups as private; they are excluded from
Git. Account deletion removes active artifact and portfolio rows, while operators
must enforce backup retention separately. Review upload limits against expected
volume before expanding beyond a single persistent Node host.

The optional Mentor knowledge cache defaults to `.data/mentor/knowledge.json`.
`MENTOR_KNOWLEDGE_PATH` overrides its path. Preserve a writable private directory
outside the deploy bundle. `npm run mentor:refresh` uses no model key and reads only
fixed public official release APIs. It records unavailable sources honestly; it
never applies a curriculum release. The command loads the project environment before
initializing readers, so its configured cache path matches the server. A GitHub workflow scheduled Monday/Wednesday/Friday at 06:17 UTC, also
triggered manually or by discovery-code changes, produces a cache artifact; it does not synchronize that artifact to the running application.
User-approved local heartbeat `automation` is active for Monday/Wednesday/Friday
at 09:00 Asia/Jerusalem. Keep the computer on and the desktop app running; the
project must remain available. This is not a hosted scheduler and the first scheduled
run has not yet been observed. See the [official scheduled-task documentation](https://learn.chatgpt.com/docs/automations?surface=app). On-demand configured
Mentor requests refresh once per Monday/Wednesday/Friday UTC slot when stale.

The implementation follows [Next.js Server Actions request limits](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions)
and [GitHub's release API](https://docs.github.com/en/rest/releases/releases#list-releases).
Release metadata is a discovery aid, not evidence of API correctness. Actual
provider generation still needs an explicit available model and server key; follow
the connection setup guide for live acceptance.

## Persistent container package — 2026-10-04

A concrete Docker/Compose/Caddy package is prepared for the single persistent Node host: see [the Hebrew operations guide](DEPLOY_CONTAINER_HE.md). Startup checks public deployment configuration, creates a fresh schema or takes a consistent backup before migration, and preserves edited public Vault notes. The internal healthcheck inspects migration metadata and an actual /auth response without exposing learner data. Private data and configuration are excluded from the image. The container workflow tests only isolated synthetic volumes. No public hostname or host has been provisioned; actual container and HTTPS acceptance must be reported from their measured runs, not inferred from this package.
