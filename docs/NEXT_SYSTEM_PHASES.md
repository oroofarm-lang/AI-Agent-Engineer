# User-requested system completion — 2026-10-01

The active goal includes comprehensible practice, natural Hebrew throughout the course, a mandatory beginner chapter and clear progression, registration visibility for the operator, real email delivery, the AI Mentor, and remaining Master Spec features. This document records the full scope; a checkpoint does not mean the goal is complete.

## Architecture and first milestone

Keep Next.js, TypeScript, Better Auth, Drizzle/SQLite and immutable course releases. Add no second identity store. A server-only operator allowlist (`ADMIN_EMAILS`) authorizes an authenticated administrator; never grant ownership to the first signup. The operator sees a paginated account directory and verification/progress counts, never hashes or session credentials. SMTP handles verification and reset; connection verification checks the transport without sending unsolicited messages. Actual delivery requires operator credentials and an explicit delivery test.

Replace the token-sampling demo with a concrete instruction-writing exercise: choose a task, audience and output format; see the assembled instruction and missing fields. This is deterministic, explicitly labelled, and appears only in relevant beginner lessons.

`CORE` remains the stable beginner chapter. Its ordered 24 units define the required foundation. All users can preview chapter plans. New work in specialist units requires the core builds to be recorded. Existing specialist progress is retained and may be revisited; it does not bypass prerequisites for starting new specialist units. Build completion is self-reported practice, not proven mastery. The dashboard resumes a saved active core unit first, otherwise the first unfinished core unit, then recent specialist work. Show separate cards read, builds recorded and assessments awaiting review; the main progress meter reflects builds, not an unreachable assessment state.

Mentor uses a provider interface and a server-side Responses API adapter, with explicit configured model (no invented default). Persist user-owned lesson/global threads and messages in additive migrations. Each request uses server-selected lesson text, curriculum version, progress, and optionally selected notes/reflections/code; never read arbitrary files. Learning modes and five help levels form the policy, with lower help on Boss/interview challenges. Store request IDs, statuses and bounded usage. Single active run per user, a daily request cap, output cap, timeout, CSRF/origin checks, bounded bodies, and no automatic retry of a charged request. Missing credentials produce setup instructions, not mocked learner answers. Tests may inject clearly identified provider doubles; they do not prove external execution. Export/deletion include the new records.

## Files and data

- `src/lib/domain/learning-path.ts`: core requirements, next unit, progress summaries.
- `src/components/learning/instruction-practice.tsx`: concrete local exercise.
- `src/lib/admin/*`, `/admin`: allowlist and registration directory.
- `src/lib/mail/*`, `scripts/check-mail.mjs`: shared SMTP service and connection check.
- `src/lib/ai/*`, `src/lib/db/mentor.ts`, `/api/mentor`: provider/policy, persistence, server orchestration.
- `src/components/mentor-info.tsx`: functioning accessible drawer, context selection and history.
- `0006_mentor.sql`: threads/messages/request ledger, tenant-scoped persistence and limits.
- `content/authoring/HEBREW_STYLE_GUIDE.md`: reviewer rules and scope; revised authoring data become a new release, preserving 2.0.0.

Curriculum schema adds a required-entry marker on modules; stable IDs and all original 80 IDs remain unchanged. Course body changes require version 2.1.0 and a snapshot. DB tables: mentor_threads(id,user_id,lesson_id,version,timestamps); mentor_messages(id,thread_id,user_id,role,body,mode,help_level,status,usage,timestamp); mentor_runs(id,user_id,thread_id,state,created_at,finished_at). Foreign keys, transactions and conditional updates enforce ownership/concurrency. Operator permissions are configuration, never client input.

## Remaining phases and completion evidence

1. **Learning clarity, Hebrew, connections:** actual UI review; whole-course language pass; prerequisite tests; isolated E2E registration → lesson → persistence; admin denial/isolation; fake-transport auth tests; live SMTP and model acceptance after operator setup.
2. **Learning system:** projects and starter interfaces, Boss attempts, journal and Failure Library UI over existing repositories, human-reviewed mastery and audit trail, skill levels from assessment evidence. Tests prove review transitions and isolation; never infer mastery from reading or text length.
3. **Curriculum intelligence:** technology registry, bounded official-source checks, stored evidence and proposals, severity/dependency analysis, diff view, explicit approval, validate/apply/version/rollback without resetting progress. Live checks and release rollback tests are required.
4. **Product completion:** searchable lessons/skills/projects/private reflections, command palette, updates and freshness with explained evidence, adaptive suggestions, full navigation, accessibility/manual acceptance and deployment checklist.

Credentials, domain ownership, public hosting, mail delivery and provider access are external dependencies, not simulated completion. Ask for the operator email and existing domain/provider; do not request secrets in chat. Keep a working production build at each milestone and document remaining evidence.
