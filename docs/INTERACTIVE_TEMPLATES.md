# In-app assignment workspaces

## Architecture proposal — 2026-10-03

The actual platform has 139 frozen assessment rubrics with 418 criteria. Learners currently type evidence and select external files; neither is an interactive table workspace or an autosaved submission template. Preserve the existing owned submission transaction, reviewer authority, foundation gates, numbered steps, frozen rubric history and cream RTL visual language.

Use the current React/Next.js, TypeScript, Zod, Better Auth and Drizzle/SQLite stack. A versioned public template catalog is separate from released lessons and rubrics. Each criterion has an exact-bound Markdown workspace. Assignments that explicitly require tables additionally have authored column sets and blank starter rows, including eight rows for the first foundation exercise. A SQLite or JOIN assignment remains a coding task: a table widget can organize its evidence but cannot claim to execute SQL. Likewise, external integrations and model experiments must record actual results or unavailable access; prefilled editor structure is not evidence of execution.

No arbitrary table-detection heuristic selects the learner editor at runtime. The public catalog enumerates every assessment/criterion binding and its type. Existing prompts are copied exactly for binding, rather than rewritten. Editable columns and blank cells are scaffolding, not completed answers. A complete structural inventory does not certify pedagogical correctness.

## Files and curriculum schemas

```text
content/templates/releases/1.0.0.json  immutable public criterion definitions
src/lib/templates/schema.ts           bounded shared definitions and documents
src/lib/templates/catalog.ts          server-only exact-rubric lookup and fingerprints
src/lib/templates/formats.ts          browser/server CSV, JSON and Markdown formats
src/lib/db/template-drafts.ts          authenticated-owned revisioned persistence
src/lib/db/migrations/0013_*.sql       additive workspace drafts
src/app/api/templates/drafts/         bounded authenticated GET/POST, same origin
src/components/assessment/workspace/  table, Markdown toolbar, safe live preview
```

Catalog: `{schemaVersion: 1, version, sourceCurriculumVersion, templates: Definition[]}`. A definition has stable template/assessment/lesson/criterion IDs, rubric version and the exact criterion prompt/hint, editor type, notes guidance, and optional authored table columns/default blank rows. Validate one definition for every actual published criterion, unique identities, ordered columns, row bounds and exact source binding. A definition fingerprint binds saved work to its actual version and fields; runtime never silently migrates an edited template.

Document: `{schemaVersion: 1, templateId, templateVersion, notes, table?: {columns, rows}}`. Tables support 1–12 uniquely identified, labeled columns and at most 100 rows; required starter columns remain present, labels can be edited and optional columns added. Bound cells, total serialized bytes and submission text to existing evidence limits. Filled cells/notes must satisfy meaningful-content requirements; long headings and empty default rows cannot qualify a submission. Strict JSON/CSV import validates shape and size before replacement. Export quotes CSV correctly and neutralizes spreadsheet formula prefixes; raw source values remain in JSON. A preview renders escaped Markdown without raw HTML or executable scripts.

## Database models, ownership and submission

Add `template_drafts` keyed by `(user_id, template_id, definition_hash)`: frozen definition, validated document, revision, latest request UUID/fingerprint, timestamps. Optimistic revision checks prevent two tabs overwriting one another; identical retry acknowledgements do not duplicate writes. Expose actual saved/pending/failed/conflict states and retain the editor's unsaved work on failure. Start with server autosave after a brief debounce; no secret-dependent service or anonymous shared cache.

The existing `assessment_results` keeps frozen evidence and rubric. A completed template is serialized server-side into evidence and a frozen structured JSON artifact in the same existing submission transaction. External files remain available. The exact `הגש מתוך הטמפלייט` action submits only after every required criterion is complete, preserves stable submission/file identities for retries and includes the ordinary private portfolio option. No hidden mastery or XP award is introduced. Personal backup/export and account deletion cover draft documents; reviewer artifact access retains its existing authorization.

## Mentor, Auditor and public graph

Orchestrator progress context can include bounded owned draft completion metadata; document content is included only when the learner explicitly selects it. Specialists receive true template state and implemented editing/submission capabilities. The Curriculum Auditor still requires human approval for substantive instruction changes. Template definition changes create a separate new version and leave old drafts/submissions intact.

Volt receives public definitions, editor/API contracts and reciprocal rubric/lesson/specialist links. It never receives learner cells, notes, revision conflicts or filled artifacts. Existing protected export/history behavior remains authoritative. Include templates in the full Canvas and focused chapter/specialist maps without exporting personal data.

## Incremental phases and acceptance

1. Define and validate all 418 public workspaces; author table structures, bounded documents and safe deterministic formats. Test exact coverage, source drift, malformed/oversized imports, CSV quoting/formula safety and meaningful-content checks. This phase alone does **not** deliver the in-app editor.
2. Implement additive owned autosave with revision conflicts, idempotent retry, stale-definition behavior and export/deletion. Prove with isolated SQLite cases before a backed-up actual migration.
3. Build accessible table and Markdown controls, code highlighting, live previews, autosave feedback, import/export and dual-mode proof flow. Integrate server-generated template artifacts and one-click submission with owned portfolio. Exercise actual browser journeys, keyboard/mobile/contrast, refresh persistence, two-account isolation and conflict/retry behavior.
4. Add bounded Mentor state and public Volt backlinks, run the appropriate full gate, inspect the real UI, sync/verify Volt and back up public changes to Git. Real provider execution, deployment and human teaching approval need separate evidence.

## Owned persistence decision — 2026-10-03

Phase 2 uses additive `template_drafts` and `template_draft_requests` tables. A frozen definition and document hash bind each owned draft to its exact public template. Save requests carry a UUID, expected revision, exact definition hash and current course version. An immediate SQLite transaction compares revisions and stores a separate acknowledgement; replay returns the acknowledged revision alongside the actual latest draft without rewinding newer work. Receipts are retained for 30 days, with a 10,000-save UTC daily limit. An expired old request still cannot overwrite newer work with its obsolete revision. Draft documents have a 16 MiB aggregate per-account budget and the existing per-document bounds.

GET can retrieve an owned historical definition as read-only. New saves require the active exact criterion binding and current definition hash. Changed definitions leave old drafts intact. Anonymous/shared caches are excluded; the endpoint uses the session owner and same-origin JSON writes. Export schema 11 includes owned drafts and receipts, and account deletion covers both tables in dependency order. This is persistence infrastructure; autosave feedback and editing controls are phase 3. Prove these contracts in isolated SQLite and request tests before applying the additive migration through the approved private backup workflow.
