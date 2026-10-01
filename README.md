# AI Agent Engineer · Personal Learning OS

A local-first, Hebrew RTL learning environment for AI agent engineering. The teaching loop is **Build → Understand → Break → Debug → Rebuild → Prove**.

**Current checkpoint: authenticated learning workspace; the curriculum and AI features are still incremental.**

Implemented: cream retro-arcade responsive workspace, authentication and per-account progress, 14 topic modules containing 139 units, skill dependencies, lesson cards with saved resume positions, engineering notes, evidence submissions and JSON export. Original 80 stable lesson IDs remain intact. Day 1 is guided; the other units are practical workbooks with unique tasks, failure labs, challenges, sources and rubrics. Core units include added instruction and four locally tested Python examples. This is not a claim that all external integrations or 139 full tutorials have been verified. See [content depth and verification](docs/CONTENT_QA.md).

The server-side Mentor, SMTP verification/reset flow, verified-operator account directory, journal and Failure Library are implemented. Live provider execution still requires credentials. Human assessment/mastery, projects/Boss attempts and Curriculum Auditor remain incremental milestones.

## Run locally

Requirements: Python 3.12+ for course-lab tests; Node.js 22.13+ (tested on 24.18.0), npm, Git. No API key is needed to run the platform. Native SQLite dependencies may need a compiler if no prebuilt binary is available for your platform.

From this repository:

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Servers bind to loopback. Register at `/auth`. Better Auth provides per-user login and progress. Public hosting requires the configuration and release checks in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

For a production-mode local preview:

```bash
npm run build
npm run start
```

Stop the development server first if it is using port 3000. A schema migration must be applied before starting the app. Database setup is idempotent and never deletes existing progress. `npm run db:seed` is an alias for setup.

## Environment

| Variable         | Default / purpose                                                                   |
| ---------------- | ----------------------------------------------------------------------------------- |
| `DATABASE_URL`   | `.data/learning.sqlite`; a SQLite filesystem path, not a network URL or `file:` URI |
| `OPENAI_API_KEY` | Empty; server-only key for the optional OpenAI Mentor                       |
| `AI_MODEL`       | Empty; explicit Responses-compatible model available to your project                             |

Never commit `.env` or include credentials in notes. Configuring both AI settings enables real, potentially billable Mentor calls from the server. Without them, the app refuses generation and shows setup instructions. Day 1 teaches a separate Python program, which requires the learner's own API configuration and may incur API usage charges; it does not execute within the site.

## Checks

```bash
npm run curriculum:check
npm run test:labs
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

E2E uses the production build on port 3100 and creates its own unique database under ignored `.data/`; it does not alter the learner database. Test coverage includes curriculum integrity and cycles, progress/completion separation, idempotency, persistence across database reopen, version preservation, export, lesson flows, topic navigation and new stable-ID resume, Mentor disclosure, mobile overflow and not-found recovery. See `docs/IMPLEMENTATION.md` for actual outcomes.

## Architecture

Next.js App Router + React + TypeScript; Tailwind and local CSS design tokens; Zod contracts; Drizzle + SQLite; Vitest + Playwright. Markdown is rendered without executable MDX or raw HTML. AI and database boundaries are server-side. No external analytics, remote fonts or tracking.

- `MASTER_SPEC.md.rtf`: original supplied source, preserved.
- `MASTER_SPEC.md`: full readable text extracted from the original.
- `docs/master-curriculum-spec.md`: exact Part II extraction, pedagogical authority.
- `docs/ARCHITECTURE.md`: proposal, data models, policies and implementation phases.
- `docs/CURRICULUM.md`: contribution and release guide.
- `content/curriculum`: stable, versioned catalogs and instructional Markdown.
- `src/lib/domain`: deterministic progress policies.
- `src/lib/db`: migrations, models and repository layer.

Opening a lesson does not change progress. An explicit start records IN_PROGRESS, and build completion records BUILD_COMPLETE. It never grants mastery or full lesson completion. Mastery remains unassessed until evidence-based assessment ships. Curriculum freshness remains unverified rather than displaying a fabricated score.

## Database and backups

Migrations in `src/lib/db/migrations` run transactionally and are checksum-tracked. Do not edit applied migrations; add a new migration. The initial content version is `1.0.0` with September 2026 baseline. Database setup records a hash of the curriculum metadata/skill/source manifest and refuses changed metadata under the same version. Curriculum 1.1.0 adds rubric metadata and published Markdown body hashes to the registered manifest. The original 1.0.0 and 1.1.0 content is preserved in `content/releases`. Version 2.0.0 adds topic modules; 2.1.0 improves Hebrew and marks CORE as the mandatory entry chapter, without resetting progress. Setup rejects in-place changes, but a full approval/rollback release workflow remains phase 4 work.

Use **Settings → Export my data** for JSON including learner profile, progress, notes, assessment submissions with rubric snapshots, journal/failure records and test-case snapshots, Mentor history/usage, and registered versions. Export excludes credentials. For a complete physical backup, stop the server, then copy the `.data` directory (including any SQLite sidecar files) to a safe location. There is no destructive reset or UI restore feature. Do not treat the JSON export as an automatic recovery/import workflow.

## Mentor and Curriculum Auditor

The Mentor implements server-only Responses calls, persistent user-owned threads, explicit context selection, learning modes and help levels, timeouts, idempotency and usage limits. No paid call has been performed for acceptance. SMTP code handles verification/reset; the admin account directory requires a configured allowlist plus verified ownership. Follow [the Hebrew setup guide](docs/CONNECTION_SETUP_HE.md); enter secrets locally, never in chat.

Phase 4 will add a technology registry, official-source verification, evidence-backed proposals, diffs, human approval and validated version application with rollback. No source scan, background update, freshness verification or curriculum rewriting currently runs. The architecture requires preserving prior progress and mastery with update supplements.

## Next milestone

Expand the instructional content and implement the phase 2 evidence-based learning system in small, tested slices: practical assessments/mastery, skills, projects/Boss Levels, journal, failure library. Finish these in independent working slices; curriculum update automation follows.

## Evidence checkpoint

After updating an existing installation, run `npm run db:setup` before restarting. Migration 0002 adds assessment storage without resetting prior data. The current curriculum is 2.1.0; the baseline remains September 2026.

A build must be complete before evidence submission. All rubric criteria require 80–12,000 non-padding characters (the submitted text, including code indentation, is preserved). Submissions are stored with an exact rubric snapshot and content version, are idempotent per submission ID, and set MASTERY_PENDING without awarding a score. They are not code execution or AI review. The history is append-only. A later grading feature must validate evidence before awarding mastery.

## Interactive learning layout

The interface now uses a cream retro-arcade theme with a focused lesson-card canvas, reactive CSS mascot, a concrete instruction-writing exercise with task, audience and output format, topic catalog and the original week-selectable lesson path, and activity-based XP/streaks. Card acknowledgements celebrate reading progress for the current session only; they never award course completion or mastery. No Spline/WebGL scene is loaded yet; an optional scene slot is provided. See `docs/UI-DESIGN.md`.

## Authentication, accessibility and release QA

Better Auth uses database sessions and email/password login; all learner repositories require a server-derived user ID. Resume positions, XP and streaks persist per account. Export, name update and account deletion are available in Settings. Original local records remain preserved separately.

The accessibility menu offers contrast, grayscale, 100–200% text and motion preferences. Inline code uses an explicit high-contrast color pair; lesson navigation scrolls and focuses the new card. Terms, privacy and accessibility statement dialogs document current behavior and configuration gaps.

Run `npm run verify` for the complete release gate. GitHub Actions runs it on pushes and PRs. See [deployment, email, legal configuration and QA requirements](docs/DEPLOYMENT.md) before public hosting.

## Course navigation

Open **ספריית פרקים** (`/topics`) to follow the core and specializations. Each unit displays its content type, language review and code execution status. Topic next links stay within the selected chapter. `/learn` also retains the original 80-day map. Course examples are run on your own computer, never silently executed in the site.
