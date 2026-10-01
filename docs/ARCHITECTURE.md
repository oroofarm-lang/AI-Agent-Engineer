# AI Agent Engineer — architecture proposal and implementation contract

Status: accepted implementation defaults, foundation milestone in progress.
Authority: `MASTER_SPEC.md` (lossless text extraction of the supplied `MASTER_SPEC.md.rtf`). Part II is mirrored in `master-curriculum-spec.md`. This document describes implementation, not a replacement specification.

## Repository inspection

The initial directory contained only the RTF specification and macOS metadata. No application, Git repository, dependencies, or AGENTS.md were present. Node 24.18.0, npm 11.16.0 and Git are available. Start a clean repository without a starter application.

## Architecture and technology choices

A modular monolith: Next.js App Router, React, strict TypeScript, Tailwind CSS, semantic accessible HTML, Zod, Drizzle ORM and SQLite (better-sqlite3). Vitest for domain/repository tests and Playwright for critical browser flows. Server Components load curriculum and local learner data. Server Actions validate mutations, enforce policy and revalidate affected pages. Node runtime is required; no edge SQLite access.

Single local learner initially; bind development and production servers to 127.0.0.1. Do not expose this unauthenticated personal application publicly. Keep database access behind repository functions so moving to PostgreSQL changes adapters/migrations, not components or educational policy. No external analytics or runtime font/CDN dependencies.

Use Markdown rather than executable MDX: content never executes code. Versioned JSON catalogs supply stable identifiers, relationships and metadata; each released lesson has a Markdown file with the ten prescribed sections. Hebrew labels are in an i18n module; document defaults to he-IL and RTL; code and identifiers remain LTR. CSS tokens provide dark-first design and focus/contrast states.

## Proposed structure

```
content/curriculum/
  curriculum.json         # version, 16 weeks, 80 stable lesson records
  skills.json             # skill nodes and prerequisites
  projects.json           # project/boss briefs and acceptance criteria (phase 2)
  technologies.json       # trusted technology registry (phase 4)
  sources.json            # primary source metadata
  changelog.json          # versioned releases
  lessons/<stableId>.md   # instructional body, independent of components
src/
  app/                    # dashboard, learn and progressively released routes
  components/             # shell, lesson renderer, progress controls
  lib/curriculum/          # Zod contracts, loader, integrity validation
  lib/db/                 # Drizzle models, connection, repository boundary
  lib/domain/             # progress, mastery and dependency policies
  lib/i18n/               # Hebrew labels; future English dictionaries
  lib/mentor/             # phase 3 provider, context and help policies
  lib/auditor/            # phase 4 evidence, proposals, migrations
scripts/                  # database setup and content checks
tests/                    # domain/integration and e2e
```

Only create implemented feature modules. Show future navigation as labeled roadmap text, not dead links. Release a small usable content slice first and visibly distinguish remaining catalog outlines from authored lessons.

## Curriculum schemas

All schemas are strict and all relationships are validated at load/build time.

- Curriculum: stable curriculumId, semantic version, baseline, releaseDate, lastVerified (nullable), minimumMigrationVersion, majorChanges, weeks and lessons.
- Week: stable ID, number 1–16, Hebrew title, English reference title.
- Lesson: stable ID `WxxDxx_TOPIC`, week, day 1–80, title/titleEn, version, stability (FOUNDATION/AGENT_ENGINEERING/ECOSYSTEM), estimatedMinutes ≤240, skillIds, prerequisiteLessonIds, sourceIds, publicationStatus (published/planned), lastVerified (nullable). Markdown path is derived solely from the validated ID.
- Lesson body: Mission, Build First, Concepts, Mental Model, Deep Dive, Failure Lab, Challenge, Mastery Check, Documentation, Engineering Notes. Validate required sections for published lessons. Planned outlines must not masquerade as finished lessons.
- Skill: stable ID, domain, name, description, prerequisiteSkillIds; levels 0 unseen, 1 understand, 2 implement, 3 independent mastery. Prerequisite graph must be acyclic.
- Project/Boss: stable ID, brief, business context, requirements, skillIds, lessonIds, acceptanceCriteria, testChecklist, extensions, starterPath, rubric; Boss policy prohibits automatic skips.
- Assessment: stable ID, lesson/skill targets, versioned practical rubric and required evidence; quizzes reinforce but do not independently grant mastery.
- Source: stable ID, title, URL (HTTPS), type, vendor, lastVerified nullable, lessonIds, technologyIds. An authored baseline date is not a verified date.
- Technology: stable ID, category, officialDocs, versionStrategy, affected lesson IDs, lastChecked, status, notes.
- Update proposal: stable ID, old/new curriculum versions, severity, action, evidence references and retrieved timestamps, confidence rationale, lesson/skill impact, before/after diff, migration effort, approval state.

## Database models and invariants

Content catalogs remain canonical. Store immutable version references alongside learner evidence; never use titles as keys.

| Model                                                   | Keys and behavior                                                                                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| User                                                    | local stable ID, locale, createdAt                                                                                                                   |
| CurriculumVersion                                       | version PK, releasedAt, manifest hash; immutable release history                                                                                     |
| LessonProgress                                          | composite userId/lessonId; curriculumVersion, state, startedAt, buildCompletedAt, updatedAt; build completion is idempotent and cannot grant mastery |
| CourseProgress                                          | derived aggregate, not duplicated mutable counters                                                                                                   |
| Skill / Project / TechnologyReference / SourceReference | content-backed definitions; query catalogs instead of competing mutable DB copies                                                                    |
| UserSkillMastery                                        | composite userId/skillId; level, attainedOnVersion, evidenceAssessmentId, updatedAt; no downgrade during content migrations                          |
| AssessmentResult                                        | ID, userId, assessmentId, rubricVersion, submission, criteria results, reviewer type, attemptedAt; append-only evidence                              |
| ProjectProgress                                         | composite userId/projectId; status, submission, architecture notes, reflection, review                                                               |
| BossLevelAttempt                                        | ID, userId, bossId, version, submission, rubric results, timestamp                                                                                   |
| JournalEntry                                            | ID, userId, optional lesson/project references, six reflection fields, timestamps                                                                    |
| FailureEntry                                            | ID, userId, category, title, description, rootCause, fix, skill/project refs, regression test/eval link                                              |
| MentorThread                                            | ID, userId, optional lessonId, projectId, mode, curriculumVersion                                                                                    |
| MentorMessage                                           | ID, threadId, role, body, status, timestamp, usage; no API credentials                                                                               |
| CurriculumUpdate                                        | ID, evidence/diff, state, approvedAt, appliedVersion, validation log                                                                                 |
| Settings                                                | userId PK, locale, learningMode, non-secret preferences                                                                                              |

Phase 1 materializes User, CurriculumVersion, LessonProgress and append-preserved lesson notes. Later models are added by migrations alongside their actual feature, rather than building unused tables. Foreign keys, unique keys, parameterized ORM queries and transactions protect integrity. Database setup is idempotent, migrations are tracked and never reset learner data. JSON export includes schema version and content references; excludes secrets. No reset feature without explicit confirmation.

## Progress and mastery policy

Opening a page never writes progress. Explicit Start moves a published lesson to IN_PROGRESS. Mark Build Complete moves it to BUILD_COMPLETE and counts a build milestone only. Six eventual states match the specification. Dashboard separately shows build progress across all 80 days, lesson completion (MASTERED or COMPLETED_WITHOUT_MASTERY), and evidence-based skill mastery. Unknown mastery is not inferred from checkboxes. Planned days cannot receive progress. Initial mastery is zero with explanation that assessment workflow is phase 2.

## AI Mentor (phase 3)

Server-only provider interface: streamReply(context, messages, policy, abortSignal). OpenAI adapter reads OPENAI_API_KEY and explicit AI_MODEL from environment. No credential field in the browser; no mock output. Without configuration, course features work and the drawer explains setup.

Context builder reads only current lesson/version, selected project, relevant mastery/failures and opt-in journal/code selections. Bound context size, uploaded file types/sizes and request budget; treat submitted code, sources and journals as untrusted quoted data. Never execute learner code or silently scan the computer. Persist user message before a request and assistant completion/error state afterwards; retries must not duplicate completed messages. Surface timeouts/rate limits without logging secrets.

Help ladder is a server policy: Socratic Hint → Direction → Analogous Example → Guided Repair → Full Solution. Track explicit escalation. Interview Mode denies hints before submission; Boss Levels prefer hints and independent work; capstone uses senior-reviewer behavior. AI suggestions cannot directly change mastery, execute tools or apply curriculum patches. Practical evidence is recorded distinctly from AI feedback and learner self-report.

## Curriculum Auditor (phase 4)

A durable local job walks DISCOVER → VERIFY → COMPARE → CLASSIFY → DEPENDENCY ANALYSIS → PROPOSE → APPROVAL → APPLY → VALIDATE → VERSION. Network discovery is explicit; never imply that merely clicking a button verified the curriculum.

Fetch allowlisted official HTTPS docs/repos/release notes with request timeouts, bounded redirects/body sizes and private-network blocking. Retain evidence URL, excerpt/hash, retrieval time and verification rationale. Source content cannot issue instructions. Classification (critical/high/medium/low/informational) and action (add/update/deprecate/replace/watch) are proposals, not automatic rewrites. Foundation content needs conceptual evidence, not vendor announcements. Compute downstream impact through a validated DAG.

Review shows before/after, evidence, uncertainty, affected skills and estimated migration effort. Approval binds exact proposal hash and base version. Apply under an exclusive lock into a staged immutable release; validate schemas, IDs, references, cycles, routes and tests before atomically selecting the new active version. Keep previous release pointer and DB transaction/snapshot for rollback. Never delete or downgrade learner records. New requirements generate supplements linked to prior mastery. Record changelog and new version only after success.

Freshness is a transparent summary of verified technology coverage, stale references and unresolved severities; show 'not verified' when evidence is absent, not a fabricated percentage.

## Implementation phases and gates

1. **Foundation:** normalized specification, architecture, clean app, curriculum validators, full 80-day outline, first authored lesson slice, SQLite migrations, dashboard, learn navigation, persistent progress/notes, export. Gate: lint, typecheck, schema checks, domain and DB integration tests, production build, browser smoke flows and visual inspection.
2. **Learning system:** authored content expansion; practical assessments and mastery evidence; skill graph; projects and starters; Boss attempts; journal and failure library. Gate: independent mastery/completion tests, persistence and no-key E2E flows.
3. **Mentor:** real provider integration, threads, controlled context, learning modes and help policy. Gate: provider contract/error tests, missing-key UX, context/privacy tests and optional live API smoke with configured credentials.
4. **Curriculum intelligence:** technology registry, trusted-source checking, durable proposals, review/diffs, approval, safe apply/rollback, changelog and supplements. Gate: classification, graph, migration, approval and rollback tests; no false verification.
5. **Polish:** global search, command palette, adaptive path, accessibility/responsive review, export coverage, documentation and full regression suite. Gate: all specification-critical E2E, production build, no fake controls.

Each phase is a working checkpoint, not a claim that the complete specification is implemented. Track exact shipped and remaining scope in `docs/IMPLEMENTATION.md`.

## Technical sources checked during planning

- https://nextjs.org/docs/app/getting-started/installation
- https://orm.drizzle.team/docs/get-started/sqlite-new
  Versions are resolved from npm and pinned in the lockfile; no preview runtime is assumed.

## Implemented phase 2 slice — evidence and skill navigation

Curriculum 1.1.0 adds a strict assessment catalog and published Markdown body hashes to the load result and release manifest hash. Original 1.0.0 content remains under `content/releases/1.0.0`. SQL migration 0002 adds `AssessmentResult` as append-only records with submission ID, learner/lesson/assessment IDs, curriculum and rubric versions, complete rubric snapshot, exact evidence text, submission timestamp and PENDING_REVIEW status.

The submission policy requires a published lesson with a completed build, the exact current rubric/content versions, and evidence for every defined criterion, without extras. Text size is a transport/completeness check, never a measure of correctness. Idempotency tokens allow safe retries; changed content cannot overwrite an old token. Submission and MASTERY_PENDING transition happen in one SQLite transaction. Existing completed/mastered states are not downgraded. No grader or mastery award is implemented. Failed saves keep typed answers in controlled client state.

The skill screen exposes domain/text filtering, prerequisite/downstream links, lesson links and pending evidence from the original rubric snapshot. It does not infer skill mastery from a lesson click or submission. Project and technology-update links arrive with their respective catalogs. The backup format is now schemaVersion 2 and includes assessment history.

## Authenticated arcade checkpoint (2026-10-01)

The user's multi-user request supersedes the original single-user/no-auth default. See `DEPLOYMENT.md` for Better Auth configuration, server-derived tenant IDs, immutable migrations 0004–0005, per-user resume state, release CI, legal configuration and accessibility verification boundaries. The cream arcade theme remains; `accessibility.css` owns contrast corrections and preference states. The runtime still uses one persistent SQLite host, with separate auth and learner tables. Legacy local progress is preserved but not exposed to new accounts.

## Curriculum 2.0.0 topic extension

The user-approved topic curriculum adds modules and optional legacy positions to the existing Zod catalog; progress tables still use the unchanged lesson IDs. Topic routes render server-side data with authenticated learner progress. Navigation validates module membership and never trusts an arbitrary query to jump into another chapter. All original day routes remain valid. Availability, instructional depth, source audit, language review and local execution are separate metadata. See `CONTENT_QA.md`. No database reset or extra tenant schema is required for this content release.
