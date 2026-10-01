# Implementation ledger

## Current checkpoint — 2026-10-01, curriculum 2.2.0

Older entries below are dated historical milestones, not current capability claims.
The latest slice enforces all 24 CORE foundation exercises before advanced lessons,
preserves prior progress, simplifies learner navigation and labels, and adds numbered
reading progress, guided FND_01/Python I teaching and keyboard-accessible diagrams.
Human rubric assessment, project starters and Boss attempts are implemented.

Optional course-update consent defaults off, persists as append-only account events,
can be withdrawn, and is included in personal export/deletion. Verified, allowlisted
operators can export only verified opted-in contacts. No marketing email is sent.
A daily ACTIVE Codex heartbeat (`ux`) and source-copy inventory support ongoing
Hebrew/UX review; no scheduled run or paid API call is claimed as already executed.

Executed `npm run quality:audit`: lint and types passed, 54 unit tests and 18 Python
tests passed, curriculum integrity and production build passed, all 20 Chromium
E2E tests passed. The browser audit opens all 139 lessons after completing foundation
builds through real test-account UI. Test databases are isolated from learner data.
The real database was privately backed up before migration; comparison across
migration/release registration preserved all original learner/auth rows.

Hebrew review read 707 public-copy segments across 53 source files, then checked
all 57 proposed corrections against the final 25 affected files. Two new guided
lessons and their rubrics were read in full; the shared documentation change was
reviewed separately. This is not a new claim-by-claim technical audit of all lessons.
See `QUALITY_AGENT.md` and `quality-reports/2026-10-01-final-hebrew.md`.

Remaining system milestones: deeper instruction for the 136 remaining workbooks,
trusted-source Curriculum Auditor with proposals/approval/rollback, search/palette,
and deployment-specific email/provider/manual accessibility acceptance.

## Milestone 1 — foundation delivered

Read the full supplied RTF specification, preserved it and extracted `MASTER_SPEC.md` and Part II. Documented architecture, folder structure, content/database contracts, Mentor/Auditor design and phases before implementation. Initialized clean Git repository.

Working: Hebrew RTL dashboard, 80-day source-derived catalog, Day 1 authored lesson, curriculum validation, SQLite setup/migrations, explicit start/build states, persistent notes, JSON export and responsive lesson rendering. Opening a lesson does not record progress. No simulated AI or audit behavior.

## Milestone 2a — evidence and skill navigation delivered

- Searchable/filterable 46-skill catalog with prerequisite/downstream navigation, related lessons and pending evidence indicators.
- Practical Day 1 rubric; evidence submission requires completed build and answers for all criteria.
- Append-only attempt history stores exact evidence, rubric snapshot, curriculum/rubric versions and timestamp.
- Duplicate requests are idempotent; conflicting reuse, stale versions and incomplete evidence are rejected transactionally.
- Submission sets MASTERY_PENDING and does not award mastery, execute code or claim grading.
- Failed submissions retain typed answers; lesson notes also retain text on rejected saves.
- Curriculum 1.1.0 preserves original 1.0.0 content under `content/releases/1.0.0`; prior progress remains attached to its original version.
- Manifest hashes now include published lesson-body hashes and rubric data. SQL migration 0002 preserves existing tables/rows. JSON backup schema 2 includes submissions.

## Verification executed

Latest milestone checks:

| Command             | Result                                                                     |
| ------------------- | -------------------------------------------------------------------------- |
| `npm run db:setup`  | Passed; migration 0002 and curriculum 1.1.0 registered without reset       |
| `npm run lint`      | Passed with no warnings                                                    |
| `npm run typecheck` | Passed                                                                     |
| `npm test`          | 23 tests passed across 4 files                                             |
| `npm run build`     | Passed; includes curriculum integrity check and optimized production build |
| `npm run test:e2e`  | 5 Chromium tests passed against production build with isolated database    |
| `npm run start`     | Running on 127.0.0.1:3000 for preview                                      |

Browser coverage: dashboard and lesson navigation; explicit start/build; notes save/reload; export; rejected evidence retains text; valid evidence saves as pending; history renders original answers; planned lessons have no completion controls; no-key Mentor disclosure; mobile overflow; missing lesson recovery; skill filtering and prerequisite traversal.

Earlier issues resolved: sandbox blocked npm network and tsx IPC (used approved escalation); initial E2E lacked Chromium (installed official Playwright browser); evidence validation initially trimmed code whitespace (now validates length without modifying submitted text). No paid model calls were run.

## Remaining, in order

1. Finish phase 2: assessed mastery with a real review policy, authored lessons 2–80, project briefs/starters, Boss attempts, journal and Failure Library.
2. Phase 3: real server-side AI Mentor, persisted conversations, selected context and help-level policy.
3. Phase 4: trusted-source Auditor, proposals/diffs, explicit approval, atomic release/rollback and update supplements.
4. Phase 5: global search, command palette, adaptive path, wider accessibility coverage and full-product E2E.

This is an incremental working checkpoint, not a completed Learning OS. There is still only one authored lesson and one rubric; the other 79 days are clearly labeled outlines. All evidence remains pending until a genuine grading workflow is implemented.

## UI redesign — neon learning workspace

Implemented the user's subsequent explicit Spline/Brilliant-inspired visual request: glass cards, violet/cyan/green accents, dimensional reactive CSS mascot, activity header, one-card-at-a-time lesson canvas, local temperature playground, connected selectable lesson map and session-only celebration. Existing persisted progress, assessments, notes and no-key behavior remain intact. The new visual gamification overrides the original subdued design preference without changing mastery policy.

Verification now totals 30 unit/integration tests and 8 E2E flows. Lint, type checking and production build pass. See `UI-DESIGN.md` for component boundaries, honest simulation/reward semantics and integration limitations.

## Authentication and accessibility checkpoint

Added Better Auth signup/login/logout, protected pages/actions/APIs, tenant-scoped repositories, per-account progress/XP/streak/resume, export/profile edit/deletion, public email verification/reset hooks and database-backed throttling. Added accessibility controls, full-contrast inline code, focus/scroll restoration and legal disclosure dialogs. GitHub Actions runs the release gate on pushes/PRs. Public email delivery, operator legal details, hosting and manual assistive-technology review require deployment-specific completion; see `DEPLOYMENT.md`.

Verification: lint and TypeScript passed; 35 unit/integration tests passed; all 13 browser scenarios were validated, with the three accessibility scenarios rerun successfully after the final modal focus-loop fix. Production build passed. Auth verification/reset tests used a mocked mail transport; no real email delivery was exercised. Screenshots reviewed: login, accessibility menu, default cream dashboard/lesson, and mobile with 200% text. The GitHub workflow is committed as configuration only; it has not run on a remote repository or deployment service.

## 2026-10-01 — topic curriculum 2.0.0

Added 14 topic modules, 139 readable units and 139 evidence rubrics; preserved all original 80 stable lesson IDs and earlier release snapshots. Day 1 remains guided; the other units are practical workbooks. Added foundational depth, module study notes, 47 primary references, four local Python labs and versioned synthetic business fixtures. Sources and execution status remain explicit; no blanket technical certification is implied. Five Hebrew review rounds are recorded in `content/authoring/hebrew-review.md`.

New topic routes are authenticated. Chapter links and next-unit navigation follow validated membership. Progress and note actions now accept general stable IDs with catalog validation. Original day links retain their day ordering. Actual local database registration preserved every prior progress, note, evidence and reading-position row; versions 1.0.0, 1.1.0 and 2.0.0 are retained.

Verification executed: `npm run check` (lint, TypeScript, 39 tests); `npm run test:labs` (15 Python tests); `npm run build` (catalog integrity and production build); `npm run test:e2e` (14 browser tests). The first browser run exposed title-selector mismatches and a real specialization progress-ID validation defect; these were fixed and all 14 passed on rerun. A visual browser review exposed missing padding on chapter cards; spacing was repaired and the final course-library view was inspected. The final 14-test browser run passed, including accessibility, resource downloads, new-unit notes and evidence submission, and persistence after reload. Automated accessibility checks do not constitute full WCAG certification or manual assistive-technology review.

Paid model/service APIs, all learner-generated project variations, automatic mastery grading, Mentor and Auditor are not verified or implemented by this content milestone. See `CONTENT_QA.md` for the depth and evidence boundary.

## 2026-10-01 — clarity, Hebrew and connections, 2.1.0

Whole-course language review: 138 authored workbooks, 23 depth sections, 14 chapter handbooks and guided Day 1; review is linguistic and structural, not a new technical verification. New CORE marker and server-enforced prerequisite apply to new specialization work; old progress can still be revisited. Removed the sampling demo in favor of a concrete local instruction exercise. Main progress tracks builds separately from assessment and reading.

Implemented optional SMTP transport/verification/reset, verified owner allowlist/directory, real server-side Responses adapter and user-owned Mentor persistence/limits/context selection, journal/failure UI and revisioned case snapshots. Export/deletion cover new records. Missing provider credentials cause explicit unavailable states, never simulated responses. Owner configuration is local and ignored by Git.

Release checks: lint, TypeScript, 46 unit/integration tests, 15 Python lab tests, schema integrity and production build passed. Full browser run passed 15/16; the remaining failure was an exact label locator that included prefilled textarea text. The corrected accessible-role test and no-provider/administrator denial test both passed in the targeted two-test rerun. Journal export proves revision 2 and failure snapshots persist after reload. No real SMTP delivery or paid AI call was exercised. The local SQLite backup and all existing table rows were compared across migration and release registration; all matched.

Remaining: projects/starters/Boss attempts, real human mastery review, Auditor evidence/proposals/approval/apply/rollback, global search/palette and deployment acceptance. The goal remains active.
