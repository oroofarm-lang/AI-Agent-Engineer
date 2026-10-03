# AI Agent Engineer · Personal Learning OS

A local-first, Hebrew RTL learning environment for AI agent engineering. The teaching loop is **Build → Understand → Break → Debug → Rebuild → Prove**.

**Current checkpoint: curriculum 2.2.0, mandatory foundation, account-scoped learning, specialist Mentor and a complete public knowledge graph.**

Implemented: cream retro-arcade responsive workspace, authentication and per-account progress, 14 topic modules containing 139 units, skill dependencies, numbered lesson cards with saved resume positions, notes, evidence submissions and JSON export. Original 80 stable lesson IDs remain intact. Day 1, FND_01 and Python I have guided instruction; the other 136 units are practical workbooks. Interactive diagrams illustrate the two newly guided units. This is not a claim that all external integrations or 139 full tutorials have been verified. See [content depth and verification](docs/CONTENT_QA.md).

The server-side Mentor, SMTP verification/reset flow, verified-operator directory, human assessment workflow, project starters/Boss attempts, journal and Failure Library are implemented. Live provider execution still requires credentials. The human-reviewed Curriculum Auditor is implemented. The subject-question bank stays a draft until its exact version is approved and published by a human reviewer.

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
| `OPENAI_API_KEY` | Empty; server-only key for the optional OpenAI Mentor                               |
| `AI_MODEL`       | Empty; explicit Responses-compatible model available to your project                |

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

Opening a lesson does not grant completion. An explicit start records IN_PROGRESS, and build completion records BUILD_COMPLETE. Mastery requires evidence and a verified operator's rubric review; reading does not award mastery. Curriculum freshness remains unverified rather than displaying a fabricated score.

## Database and backups

Migrations in `src/lib/db/migrations` run transactionally and are checksum-tracked. Do not edit applied migrations; add a new migration. The initial content version is `1.0.0` with September 2026 baseline. Database setup records a hash of the curriculum metadata/skill/source manifest and refuses changed metadata under the same version. Curriculum 1.1.0 adds rubric metadata and published Markdown body hashes to the registered manifest. The original 1.0.0 and 1.1.0 content is preserved in `content/releases`. Version 2.0.0 adds topic modules; 2.1.0 improves Hebrew and marks CORE as the mandatory entry chapter; 2.2.0 enforces the full foundation gate and adds two guided units and interactive diagrams, without resetting progress. Setup rejects in-place changes. Verified operators can review and publish immutable section releases and return to the prior release without resetting learner records.

Use **Settings → Export my data** for JSON including learner profile, progress, notes, assessment submissions with rubric snapshots, journal/failure records and test-case snapshots, Mentor history/usage, and registered versions. Export excludes credentials. For a complete physical backup, stop the server, then copy the `.data` directory (including any SQLite sidecar files) to a safe location. There is no destructive reset or UI restore feature. Do not treat the JSON export as an automatic recovery/import workflow.

For an existing installation, `npm run db:migrate:backup` first makes a consistent private SQLite online backup, then applies additive migrations. Migrations 0010/0011 add owned specialist traces and advisory AI feedback. Backups stay under ignored `.data`; they must never be published.

## Mentor and Curriculum Auditor

The Mentor implements server-only Responses calls, persistent user-owned threads, explicit context selection, learning modes and help levels, timeouts, idempotency and usage limits. No paid call has been performed for acceptance. SMTP code handles verification/reset; the admin account directory requires a configured allowlist plus verified ownership. Follow [the Hebrew setup guide](docs/CONNECTION_SETUP_HE.md); enter secrets locally, never in chat.

The specialist engine uses 21 validated initial roles with coverage of every course module and skill, plus trusted templates for additional domain definitions. A question triggers one routing call, one to three distinct specialist calls and a Hebrew synthesis, at most five model calls. Choose a simple analogy, practical steps or an advanced explanation. `/api/agents/orchestrate` and the compatible `/api/mentor` share the same owned reservation, history and daily limits. The interface lists actual completed participants only. See [engine architecture and remaining phases](docs/MULTI_AGENT_ARCHITECTURE.md).

Saved submissions support optional `/api/agents/evaluate` feedback against their frozen rubric. Learners explicitly consent and select which owned files to send; code/text, images and PDFs use their actual selected content. Coverage reports partial/excluded text and bytes supplied to the provider. The model does not execute code or award mastery. Feedback, traces, export and account deletion remain scoped to the authenticated owner.

The technology/source registry, bounded official-source discovery and reviewed section proposals, diffs, exact-version human approval, immutable publication and rollback are implemented. Reading a source and approving its teaching claims remain explicit human decisions. Discovery does not verify announced API behavior or authorize curriculum rewriting. The architecture preserves prior progress and mastery with update supplements.

## Next milestone

Expand the remaining workbook instruction incrementally and review the authored subject-question bank through `/admin/quizzes`. Configure SMTP and the optional Mentor locally before public deployment; see the deployment guide.

## Evidence checkpoint

After updating an existing installation, run `npm run db:setup` before restarting. Migration 0008 adds consent history; migration 0009 adds private uploaded artifacts and portfolio entries without resetting prior data. The current curriculum is 2.2.0; the baseline remains September 2026.

A build must be complete before evidence submission. All rubric criteria require 80–12,000 non-padding characters (the submitted text, including code indentation, is preserved). Submissions store exact rubric snapshots and content versions, are idempotent and set MASTERY_PENDING without awarding a score. A verified, allowlisted operator can assess evidence, record rubric-level reasoning and award the corresponding mastery. Submission is not code execution or AI review; history is append-only.

## Interactive learning layout

The interface now uses a cream retro-arcade theme with a focused lesson-card canvas, reactive CSS mascot, a concrete instruction-writing exercise with task, audience and output format, topic catalog and the original week-selectable lesson path, and activity-based XP/streaks. Card acknowledgements celebrate reading progress for the current session only; they never award course completion or mastery. No Spline/WebGL scene is loaded yet; an optional scene slot is provided. See `docs/UI-DESIGN.md`.

## Authentication, accessibility and release QA

Better Auth uses database sessions and email/password login; all learner repositories require a server-derived user ID. Resume positions, XP and streaks persist per account. Export, name update and account deletion are available in Settings. Original local records remain preserved separately.

The accessibility menu offers contrast, grayscale, 100–200% text and motion preferences. Inline code uses an explicit high-contrast color pair; lesson navigation scrolls and focuses the new card. Terms, privacy and accessibility statement dialogs document current behavior and configuration gaps.

Run `npm run verify` for the complete release gate. GitHub Actions runs it on pushes and PRs. See [deployment, email, legal configuration and QA requirements](docs/DEPLOYMENT.md) before public hosting.

## Course navigation

Open **פרקי הקורס** (`/topics`) to follow the foundation and specializations. The 24 foundation exercises must be marked complete before advanced lessons unlock; earlier records remain preserved. Topic next links stay within the selected chapter. `/learn` retains the original weekly view in an expandable section. Course examples run on your own computer, never silently inside the site.

## Contacts and ongoing quality review

Name, email and progress are stored per account in SQLite. Course-update consent is separate, optional and off by default; withdrawal takes effect immediately. Only a verified, allowlisted operator can export verified opt-in contacts as CSV. No marketing email is sent by this phase.

`npm run quality:audit` creates a public-copy inventory and runs all verification checks, including browser inspection of all 139 lessons. A weekly Codex heartbeat reviews Hebrew and UX; it needs the local scheduler/workspace, not an extra API key. This is separate from the Curriculum Auditor and operator publication workflow. See [quality agent scope and limitations](docs/QUALITY_AGENT.md).

## Assessment and portfolio refinement — 2026-10-02

Practical evidence now uses one question at a time, numbered navigation, immediate
completeness feedback and an optional reinforcement quiz. Text remains subject to
human rubric review. Files can be picked or dropped, previewed, replaced or removed
before submission. Code/text and images have local previews; PDFs show file metadata.
Selected files upload only with the final submission. `/portfolio` is a private,
reversible showcase of saved work, with actual review status and authorized downloads.

`npm run mentor:refresh` collects bounded public metadata from eight fixed official
sources: release feeds for OpenAI Agents Python, LangGraph, MCP TypeScript SDK,
n8n and Ollama, plus OpenAI News RSS, model catalog and API changelog. Schema 2
records retrieval/publisher dates separately, change fingerprints and actual
course mappings; legacy schema 1 remains readable with new feeds marked unchecked.
This is discovery, not technical verification. `/updates` shows saved observations
without an AI key. Signed-in users can read `/api/knowledge`; only a verified
configured operator can refresh, without supplying a URL or path or forcing retries.
The Mentor uses bounded lesson-relevant observations and still needs generation
credentials. Refresh slots remain Monday/Wednesday/Friday. The approved local
heartbeat runs at 09:00 Asia/Jerusalem and requires the computer/app to be running;
scheduled execution has not been observed. Manual GitHub dispatch is separate.
See [knowledge discovery and its limits](docs/KNOWLEDGE_UPDATES.md).

Verified configured operators can open `/admin/curriculum` to compare an exact section proposal against the current course, inspect canonical source links and affected learning dependencies, record human review, publish a new immutable version and return to the prior version. Source collection and AI feedback cannot approve a release. `CURRICULUM_AUDITOR_DIR` stores the private persistent ledger; no reviewer identities or private proposals enter Volt. [Curriculum Auditor architecture and operations](docs/CURRICULUM_AUDITOR.md) describes the boundaries, recovery and required human teaching review.

## Public Obsidian / Sidian graph

Open `Volt` as a vault and start with `Index.md`. `00_ORCHESTRATION/System_Overview.canvas` gives a 17-note entry map with five labeled sections; `Root_Knowledge_Graph.canvas` contains the complete current public graph. Open any of the 14 chapter maps under `02_CURRICULUM/2.2.0/maps/` to see its lessons, exercises, rubrics, question status and related specialists/sources. The 21 specialist maps under `01_AGENTS/maps/` show connected chapters, allowed tools and primary references. All 37 Canvas files use actual note paths and existing graph relationships. `Index.md`, each chapter and each specialist link to their focused maps.

The five directories connect all 139 lessons, 14 modules, skills, sources, rubrics, exercise/submission templates, 21 agents, tool/API contracts, assets, six tracked technologies and eight discovery sources with reciprocal links. The existing application question about evidence submission has its own public note; the separate 139-question teaching draft remains labeled for human review. Canvas edges retain every relationship label between the same pair. Historical course exports and personal notes are retained. Run `npm run vault:sync` to update generated files; an edited generated note or symlink aborts before overwriting anything. `/api/vault/sync` offers status and the same write operation to a verified configured operator. It accepts no filesystem path and exports no account records.

Approved course and question-bank publication and rollback also synchronize the public graph. `/admin/curriculum` shows the last exported course version and content fingerprint match, and permits retrying a failed export separately. A Vault conflict never undoes an acknowledged course release or overwrites an edited note. `VAULT_EXPORT_DIR` is the server-only writable root (default `Volt`); browser tests always use a fresh synthetic Vault. [Public projection architecture and recovery](docs/VAULT_SYNC.md) explains the bounded publication-race retries and the scope of the manifest status.

Obsidian can reformat Canvas JSON while opening a map. The exporter preserves that formatting and uses a separate structural fingerprint to distinguish it from genuine graph edits. Changes to node positions, edges, array order or other properties remain protected; Markdown edits still require exact byte equality. An old manifest can safely establish the structural fingerprint only against trusted bytes or an identical generated Canvas.

Reinforcement answers now persist per signed-in account and lesson through `/api/quizzes`. The server stores a frozen question, exact choice, feedback and request fingerprint; retries with the same token are idempotent. Export schema 10 includes attempts, and account deletion removes them. The Mentor's progress tool receives at most 12 relevant actual attempts. Practice answers do not award XP, mark a build complete or certify mastery. See [quiz persistence](docs/QUIZ_PERSISTENCE.md).

Verified operators can open `/admin/quizzes`, freeze an exact draft version, compare every question with its actual lesson section and canonical sources, and record answer/source/Hebrew review with explanatory notes. Publication requires all questions to be approved. A published bank supplies the lesson-specific practice questions, while old answers and the original workflow question remain preserved. `QUIZ_REVIEW_DIR` stores the private review ledger; no identities or decisions enter the public graph. Changes to the course pause an incompatible bank until it is reviewed again. Publication/rollback update Volt and record the question-bank fingerprint independently of the course version. See [question-release contracts and review workflow](docs/QUIZ_RELEASES.md). The real 139-question draft has not been approved or published automatically.

The production build checks that Next.js file traces exclude local secrets, databases and personal vault folders. Public deployment, live provider acceptance and actual human teaching approval of the per-lesson question bank remain unverified; the operator review/publication mechanisms are implemented.
