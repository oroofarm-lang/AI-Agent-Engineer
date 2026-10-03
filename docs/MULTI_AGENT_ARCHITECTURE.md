# Multi-agent engine and linked knowledge vault

Status: implementation in progress. This design extends the existing application; it does not certify a live provider connection or a deployment.

## Architecture and defaults

Keep Next.js route handlers, React, Better Auth, Drizzle/SQLite and the immutable curriculum catalog. Orchestrator-Prime validates the authenticated context, selects specialists from a versioned registry, invokes their distinct provider instructions, and asks Agent-Hebrew-UX to synthesize the actual results. A saved trace records real participation and failures. A configured key and model are required for all model calls; no-key mode keeps learning operational.

There is no fixed registry size. Trusted module/skill coverage can create additional specialist definitions through a validated template. A run has bounded cost and duration: one structured routing call, at most three domain specialists, one synthesis call, 55 seconds overall and 220,000 input characters across calls. This execution budget is separate from how many registered specialties the platform can support. Selection includes task, module, skills and explicit request relevance. All calls retain the existing help ladder, including Boss/interview restrictions.

Real initial tools read the published catalog, primary source references, the signed-in learner's progress, and explicitly selected owned evidence. Tool permissions are an allowlist. The model cannot grant itself capabilities, execute arbitrary code, inspect a computer, write mastery, or send customer messages. Media review must describe exactly which bytes were inspected; metadata alone never counts as content review.

## File structure and shared contracts

```text
content/agents/registry.json         # versioned public definitions and implemented tool contracts
src/lib/agents/registry.ts          # strict schemas, curriculum references, extensible selection
src/lib/agents/orchestrator.ts      # actual specialist calls and Hebrew synthesis
src/lib/agents/evaluate.ts          # owned frozen-rubric advisory evaluation
src/lib/db/agents.ts                # tenant-scoped traces and evaluations
src/app/api/agents/orchestrate/     # authenticated bounded Mentor-compatible API
src/app/api/agents/evaluate/        # authenticated advisory feedback API
src/app/api/vault/sync/             # verified operator; public generated graph only
scripts/lib/vault-export.mjs        # pure public inputs -> notes, relations and Canvas
Volt/00_ORCHESTRATION/
Volt/01_AGENTS/
Volt/02_CURRICULUM/<version>/
Volt/03_PRACTICAL_PROOFS/<version>/
Volt/04_AUTOMATIONS_AND_APIS/
Volt/Index.md
Volt/Root_Knowledge_Graph.canvas
```

Registry schema: `{schemaVersion: 1, version: string, tools: Tool[], agents: Agent[]}`. `Tool` has `id`, `title`, `description`, `scope: 'public' | 'own'`, and `implementation` (real source file/function). `Agent` has `id`, `version`, `name`, `titleHebrew`, `description`, `instructions`, `domains`, `moduleIds`, `skillIds`, `sourceIds`, `allowedTools`, `keywords`, `role: 'orchestrator' | 'specialist' | 'synthesis'`. All arrays and referenced IDs are validated; all modules and skills require ownership. Initial named roles are mandatory, additional roles are allowed. Runtime definitions inherit trusted module context and existing tool permissions; user text cannot create permissions.

Curriculum schemas remain authoritative at version 2.2.0: 139 stable lesson IDs, 14 modules, 53 skills, 47 sources and 139 frozen assessment rubrics. New explanation levels are request policies, distinct from help level: `eli5` (analogy, limits and example), `practical` (steps, expected observation and check), `advanced` (mechanism, tradeoffs, failure modes and primary references). Released lesson bodies remain unchanged. A per-lesson reinforcement bank must contain actual authored questions, answers, rationale and source section references; its version and review status are separate from curriculum release status.

## Database models and integrity

Reuse `mentor_runs` for UUID/fingerprint deduplication, one active request per user, 20 requests/day, failure persistence and no automatic paid retry. Add `agent_steps` linked to the owned Mentor run: sequence, agent ID/version, state, bounded output, error code, token counts and timestamps. Add `agent_evaluations`: owned submission, frozen rubric/evidence fingerprints, selected artifact fingerprints, actual coverage, criterion feedback and timestamps. Add versioned runtime definition records only when a definition was genuinely instantiated. All additions are additive migrations. Personal export and account deletion cover every new owned table.

An AI evaluation provides advisory feedback only. It never inserts human assessment reviews or writes skill mastery. Existing verified reviewer authorization, self-review protection and immutable rubric decisions remain authoritative. Quiz results are reinforcement evidence, distinct from completed builds and assessed mastery.

## Mentor and Curriculum Auditor

The Mentor UI sends to `/api/agents/orchestrate`; the existing `/api/mentor` history and compatibility path share the same reservation and engine. It exposes plain Hebrew explanation choices, actual participating specialties and honest configuration/failure states. No implementation planning text is added to learner screens.

The Auditor ingests allowlisted primary-source update evidence with retrieval date, source ID, technology/module mappings and separate discovery/verification statuses. The existing three-times-weekly schedule remains active. Release titles do not establish API behavior. Updates propose a versioned change with affected lesson/skill dependencies; teaching changes require human review before release. Neither refresh nor Vault export can silently rewrite released course content.

## Vault and API behavior

Generate only public curriculum, registry, tool/API contracts, rubrics and public assets. Explicit reciprocal wikilinks connect all entities and a root Canvas contains all lessons and agents. Preserve historical exports and personal notes. Reject path traversal/symlinks, serialize syncs, preflight every existing generated hash before writes and make unchanged exports byte-identical. `/api/vault/sync` accepts no filesystem path and requires a verified configured operator.

## Implementation phases and verification

1. Registry, truthful capability contracts, coverage validation and explanation policies. Tests prove named roles and module/skill ownership.
2. Real specialist dispatch, Hebrew synthesis, persisted tenant-scoped traces, shared limits, authenticated endpoint and Mentor UI. Tests prove multiple provider calls, deduplication, failure behavior and no-key operation.
3. Frozen-rubric advisory evaluation with owned artifact content and explicit coverage, quiz persistence, personal export/deletion and isolated migration tests.
4. Full public Vault graph, reciprocal links, Canvas and protected operator sync; verify all 139 lessons and actual registries, preserving edited/personal files.
5. Expanded primary-source ingestion, review workflow and remaining interactive pedagogy. Human-reviewed authored bank before learner publication.
6. Full lint/typecheck/unit/lab/build/E2E milestones; inspect rendered mobile/desktop, contrast, keyboard navigation, numbered slides, scroll, foundation locks and single accessibility widget. Production hosting and a real provider smoke test need their actual external credentials; readiness tests alone never prove those deployments.

The 2026-10-03 checkpoint implements phases 1–4 except live quiz publication: the initial registry, real specialist orchestration, owned advisory evaluation, complete linked public Vault and separately labeled 139-question draft are present. `npm run quality:audit` passed lint, type checking, 107 unit/integration tests, 18 Python lab tests, production build/private-trace checks and 25 isolated browser tests. The Vault sync repeated with zero changed files; all 1,015 Canvas file nodes resolve. A local browser showed the real Mentor configuration state and explanation controls. No paid provider generation or public deployment was verified; the known local API-key field is empty. Phase 5, quiz human review/publication and live deployment remain outstanding. The full goal remains active.

Later on 2026-10-03, phase 5 gained the eight-source/six-technology registry, schema-2 bounded readers and legacy migration, due-slot coalescing, lesson-relevant Mentor context, an authenticated updates page/API and public source/technology links in Volt. A real no-key refresh succeeded for all eight sources. That checkpoint contained 1,030 public notes, plus a 17-note overview. Discovery, source verification and curriculum approval remain separate. The 139-question draft received a complete independent Hebrew reading with 17 suggested rewrites; it still requires technical/pedagogical human review before publication.

The next 2026-10-03 checkpoint adds owned reinforcement-answer persistence for the question that was already shipped in the practical-proof wizard. Migration 0012 was applied after a private online backup. Frozen questions and correctness are exported in schema 10, removed on account deletion and supplied as bounded real practice facts to the Orchestrator progress tool. Correct practice answers do not award XP or mastery. The separate teaching draft remains inactive. All 139 published lesson bodies remain unchanged.

Volt then contained 1,033 current graph notes, the full Canvas and 17-note overview, plus 14 complete chapter views and 21 specialist views. There were 37 Canvas files in total; focused views reuse actual full-graph node and edge identities, and the overview has five labeled groups. Native Obsidian opened the public Index and rendered the overview's file cards and relationships. That application gate passed 124 unit/integration tests, 18 Python labs, production build/35 privacy traces and 27 isolated Chromium journeys; the final overview-label change received an additional graph test/lint/type-check pass. Curriculum Auditor review/apply/rollback was still outstanding at that checkpoint.

The next 2026-10-03 checkpoint implements the [reviewed section-release workflow](CURRICULUM_AUDITOR.md): bounded immutable proposals, canonical evidence references, old/new comparisons, computed lesson/skill dependencies, verified-operator exact-hash approval, immutable full release snapshots, atomic activation, failure reconciliation and rollback. Each request binds its lesson bytes to the exact catalog it loaded. Publication touches only curriculum-version registration; populated owned progress, notes, positions, frozen assessments, uploaded fixture bytes, portfolio and quiz answers were preserved in isolated tests. New catalog IDs, dependency/rubric edits and supplements require a separately reviewed catalog extension; this section editor does not implement those changes.

The full gate passed lint/typecheck, 137 unit/integration tests, 18 Python labs, production build/37 private-trace checks and 28 isolated Chromium journeys, including review → publish → learner-visible content → rollback and all 139 lesson screens. The final Vault warning wording received another 16 graph tests, lint/typecheck and production build. Volt has 1,035 current graph notes, 8,184 unique Canvas edges and 37 Canvas files; all 1,381 retained public hashes matched, and a repeated sync changed zero of 1,226 targets. Older unpublished quiz drafts retain their source version and require version review; mismatched published banks fail. Hebrew review coverage is recorded precisely in the [dated report](quality-reports/2026-10-03-auditor-hebrew.md). No real teaching change was published to demonstrate this workflow. Human teaching/quiz publication review, actual hosting and a real provider acceptance run remain unproven, so the full goal remains active.

The subsequent [public projection checkpoint](quality-reports/2026-10-03-vault-sync-checkpoint.md) connects approved publication/rollback to real Volt writes, adds separate truthful projection status/retry and constructs snapshots inside the writer lock. Failed export preserves the course operation and edited notes; a real activation-during-export case verified reconciliation. The full quality gate passed 141 unit tests, 18 labs and 28 browser journeys; a final unit milestone passed 142 tests, and the final request-validation build and focused browser journey passed. Playwright now uses its own fresh Vault as well as isolated private test storage. The actual public graph has 1,036 file notes, 8,195 root edges and 37 Canvas files; all 1,382 retained hashes matched and repeat sync changed zero of 1,227 generated targets. The new component received full final Hebrew reading. This is an automatic projection of approved course changes, not an autonomous approval of teaching; the broader human/provider/hosting acceptance remains unproven.

A further [native Canvas checkpoint](quality-reports/2026-10-03-native-canvas-sync.md) verified the actual public overview and complete Canvas in Obsidian 1.13.7 and fixed the formatting-only save that had blocked byte-based synchronization. Structural fingerprints preserve native JSON formatting while continuing to reject real graph edits. The full quality gate passed 148 unit/integration cases, 18 labs, the production build/37 privacy traces and 28 isolated Chromium journeys. All 1,382 public hashes and 37 Canvas paths/endpoints resolved after actual sync; repeat sync changed neither files nor manifest. Native Sidian and the broader human/provider/hosting acceptance remain unproven.
