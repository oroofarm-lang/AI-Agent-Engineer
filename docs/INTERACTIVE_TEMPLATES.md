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

## Editor save coordination — 2026-10-04

Use a browser-safe save coordinator with an injected transport and UUID generator. Only one request is in flight. Edits made during a request remain local and queue a subsequent revision. An uncertain network acknowledgement retains the exact UUID and payload for an explicit retry; a retry acknowledges the original revision but must not replace newer local work. A replay exposing a newer server revision becomes a visible conflict, preserving local work for export. Explicit reload is the only action that replaces conflicted local work. Never infer persistence from a timer or response status alone: validate the response definition, document and revision. Server page course version, rather than the last saved draft version, determines the next save request. Read-only historical drafts cannot enter the save pipeline.

## Lesson editor integration — 2026-10-04

Authenticated lesson rendering now loads only the session owner's exact-bound drafts and passes them to lazily opened workspaces. The controlled local buffer preserves temporarily invalid column names, while validated edits feed the revision coordinator. Invalid work pauses new autosave and remains downloadable as an explicitly unvalidated local repair copy. Browser unload warns about outstanding edits. Conflict replacement and replacing an existing answer require explicit confirmation. JSON/CSV import validates before replacement; normal exports use validated format helpers. Selected rendered responsiveness and accessibility are tested on actual production pages. Existing text answers and uploads remain available. Direct frozen template artifacts and the exact one-click submission action are still the next step; copying a template into evidence does not satisfy that requirement.

## Direct submission decision — 2026-10-04

The form selects owned saved draft references (template ID, exact definition hash, revision), rather than trusting posted template content. An immediate SQLite transaction reads those owner-scoped revisions, serializes evidence and freezes a definition/document JSON artifact, then invokes the existing assessment/artifact/portfolio transaction. Template artifacts share existing six-file and storage limits with external uploads. Stable artifact UUIDs derive from the submission UUID and criterion. Identical submission retries reuse the owned frozen artifact bytes, even if a draft has subsequently changed, and still pass the existing payload fingerprint checks. A stale draft revision rejects before any write. No XP, mastery, execution result or reviewer approval is inferred. Choosing template mode preserves the separate manually typed answer; deselecting returns to it.


## Direct submission integration — 2026-10-04

The implemented dual-mode form preserves manual answers independently of selected templates. Readiness tracks acknowledged revisions and immediately becomes false on editing. Server submission reads the owned saved revision and creates frozen JSON artifacts containing the exact definition, document, definition fingerprint, revision and curriculum version. It uses the existing owned submission and optional private portfolio transaction. Failed file writes roll back everything. Both client and server count frozen templates in the six-file limit.

A production-browser test filled the eight-row foundation table and other criterion workspaces, checked manual-answer mode switching, rejected an excess combined file count without inserting a submission, and submitted templates plus an external file with the private portfolio enabled. It deliberately let the server commit and then discarded the network response. This exposed native form reset clearing the portfolio checkbox. Preventing the reset preserves selections for an identical retry; the repaired journey returned one submission and byte-identical artifacts. Downloads matched actual saved documents/revisions and a second account received 404 for every file. The same journey checked automated accessibility rules. These synthetic examples test the mechanism, not learner proficiency or instructional correctness.

The broader full gate and public graph synchronization are recorded in the dated checkpoint after their actual results. PDF export, template-aware Mentor context and protection for pending edits during internal navigation remain separate unfinished requirements.

## Submission identity through revalidation — 2026-10-04

A new isolated production-browser regression reproduced replacement of the assessment submission UUID when a learner saved lesson notes after a committed submission lost its network confirmation. The form now retains its initial UUID for the mounted assessment instance using client state. Unrelated Server Action revalidation cannot turn the retry into a new submission. The regression saves actual synthetic lesson notes between the lost confirmation and retry, checks the retained UUID, and verifies a single owned submission with unchanged frozen artifacts. This does not claim deduplication across a full page reload or a newly mounted form.

## PDF export decision — 2026-10-04

Generate real PDF bytes locally in the browser using a lazily imported React PDF renderer, with bundled licensed Hebrew and Latin font subsets. Export the validated current local document, including unsaved edits, without transmitting it to a server or granting submission status. For tables, use numbered records with column labels repeated per record to retain readability across up to twelve columns and long cells; this layout must paginate without truncating text. Preserve Markdown source text in the first export iteration, explicitly retaining formatting characters rather than claiming rich Markdown PDF rendering. Validate actual downloaded bytes and visually inspect mixed-direction content before describing PDF export as verified.

The subsequent implementation parses Markdown into an inert PDF layout: headings, bold, lists, code blocks, blockquotes and labeled table records. Each text node receives explicit RTL direction because the renderer does not inherit it; code blocks retain explicit LTR. Italic emphasis is represented by underlining with the available regular/bold fonts. PDF export is not a submission and does not claim tagged-PDF accessibility or full Markdown visual parity.

## Pending workspace navigation — 2026-10-04

Add one root navigation guard registry. Each mounted workspace registers a live predicate for invalid data or save states other than acknowledged saved/read-only; hidden question workspaces remain registered. Guard every current Next Link through its documented onNavigate callback. A rejected native confirmation prevents the SPA route transition and retains the buffers; downloads and new-tab navigation do not invoke onNavigate. A root beforeunload listener covers full document exits. Do not claim that this callback intercepts browser history traversal or arbitrary router.push calls; those require separate acceptance. The registry contains predicates, never exported learner content, and unregisters workspaces on unmount. Verify one saved workspace plus another hidden failed workspace, export without exit, cancelled internal navigation, explicit retry and unblocked navigation only after real save acknowledgement.
