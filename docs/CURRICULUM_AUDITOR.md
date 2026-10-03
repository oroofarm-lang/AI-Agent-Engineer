# Curriculum Auditor: reviewed, immutable runtime releases

## Architecture decision — 2026-10-03

The existing primary-source discovery registry and three-times-weekly collector remain the discovery layer. Discovery metadata never establishes that a teaching claim is correct. The next layer stores bounded, immutable proposals based on the exact current public curriculum hash. Each proposal records classification, primary-source references and author paraphrases, old/new section text, affected lessons and transitive learning dependencies.

Technical verification is an explicit human review of the proposal against the linked primary sources, with a recorded rationale. A verified allowlisted operator approves the exact proposal hash; model suggestions and feed refreshes cannot approve or publish. Foundation edits require an additional explicit rationale. High/critical changes require at least two distinct primary references. Verification dates are not invented from retrieval dates.

Use a private filesystem ledger under `CURRICULUM_AUDITOR_DIR` (default `.data/curriculum-auditor`) for proposals, decisions and immutable public release snapshots. This separates content publication from learner data and needs no new user-data table. IDs, versions and filenames are server-defined and validated; requests never supply filesystem paths. Serialize mutations across processes with an exclusive lock, reject symlinks, bound reads/writes and use atomic JSON replacement.

The active pointer selects an immutable validated snapshot. Publishing stages the complete catalog and bodies, validates schemas, stable IDs, DAGs, navigation structure and rubrics, registers only the new curriculum manifest in the existing version table, then atomically switches the pointer. Existing progress, mastery, journal, submissions, rubric snapshots, conversations and quiz attempts are never rewritten. A journal records the previous snapshot so rollback restores exactly that curriculum, not whatever happens to be in the source checkout later. Failed validation leaves the active pointer unchanged. Interrupted activation is reconciled from the journal and actual pointer.

Bind each loaded catalog to its exact content directory with a WeakMap; `readCatalogLesson(catalog, id)` keeps one request's bodies aligned with the manifest it loaded, even if a different request publishes a release. The private pointer and operator ledger must not enter production traces or Volt. Volt exports the active public curriculum and keeps historical versions.

## Files and contracts

```text
src/lib/auditor/schema.ts          strict request, proposal, decision and pointer contracts
src/lib/auditor/analysis.ts        real section comparison, dependency impact and candidate creation
src/lib/auditor/store.ts           protected ledger, immutable snapshots, apply/rollback journal
src/lib/curriculum/runtime.ts      active snapshot resolution and request-bound lesson reading
src/app/api/auditor/route.ts       verified operator API; origin and request limits
src/app/admin/curriculum/page.tsx  review screen, source links, full old/new text and decisions
src/components/curriculum-review.tsx bounded forms and truthful mutation feedback
tests/auditor.test.ts              state, evidence, integrity, failures, rollback and progress tests
tests/e2e/auditor.spec.ts           isolated verified-operator and learner journeys
```

Proposals use UUIDs, a SHA-256 base manifest hash, a semantic target version, `CRITICAL | HIGH | MEDIUM | LOW | INFORMATIONAL`, and `ADD | UPDATE | DEPRECATE | REPLACE | WATCH`. Section changes are keyed by stable lesson IDs and the existing ten section names, with exact before hashes and complete replacement section text. ADD adds teaching within a section; DEPRECATE describes an obsolete technique without deleting a stable lesson. Changes to lesson IDs, assessment criteria or prerequisites are outside section editing and require a separately reviewed catalog extension.

Workflow: DISCOVER → human VERIFY → exact COMPARE → author CLASSIFY → computed DEPENDENCY ANALYSIS → frozen PROPOSE → exact USER APPROVAL → staged APPLY → VALIDATE → new VERSION. Operators can defer or watch proposals. Only approved content can be activated. The operator screen explains that a successful structural check is not proof of teaching correctness or external code execution.

## Implementation phases

1. Pure schemas, comparisons, candidate construction, dependency analysis and immutable manifest identity.
2. Protected storage, exact-hash approval, release registration, atomic activation and rollback, with fault-injection tests and learner-row preservation checks.
3. Operator API and review UI; bind all lesson readers to loaded snapshots and keep learner-facing updates concise.
4. Isolated end-to-end scenarios, production tracing checks, Hebrew review, public Vault contracts, documentation and Git backup.

Never publish a teaching change merely to demonstrate this mechanism; real teaching publication still requires the named human review. A proposed explanation and source links are not a claim that external code was run. The current section editor preserves catalog IDs, prerequisites and rubrics; extending those contracts remains a separate human-reviewed release operation.

## Operator workflow and recovery

1. Sign in with a verified account included in the server's `ADMIN_EMAILS`; open `/admin/curriculum` from the administration page. Learners cannot read or write proposals. The mutation endpoint also checks the configured origin and bounded strict request.
2. Read the actual official material, choose the lesson and section, explain the new information and why a change is needed, select canonical source references and write the complete replacement section. The full comparison and computed dependencies are retained. Confidence and effort are author estimates.
3. Save the proposal, inspect the full old/new text, and record a decision with rationale. Approval requires explicit source and teaching review attestations; foundation approval needs an additional 60-character rationale. High/critical proposals need two distinct canonical primary URLs. Saving or approving a proposal does not publish it.
4. Publish using the separate button. The server rebuilds the exact candidate from the stored proposal and revalidates the current base hash. A stale proposal cannot publish over another release. The immutable baseline and new release remain on disk. Failed activation returns to the previous pointer; a registration row for an inactive candidate may remain as historical metadata.
5. Return to the prior version only while this proposal's release is active. A rollback cannot skip a newer release. A successfully rolled-back proposal cannot be applied again; prepare a new reviewed proposal if another change is wanted. Repeating the same UUID/payload after a lost response is idempotent.

The private ledger must remain on one persistent local filesystem alongside the single-host deployment. Keep private backups of the entire ledger and the SQLite database; do not copy proposals, actor identities or the active pointer into Volt or Git. Public Vault sync uses the active catalog's exact bound lesson bytes. An older unpublished question draft remains marked with its source curriculum version and requires renewed version review; a mismatched published bank is rejected.

There is a bounded limit of 500 stored proposals and 50 visible recent summaries. Retain and archive historical records under an operator-reviewed maintenance process before expanding that limit. Do not delete proposals or releases to resolve a version conflict.

The lock is held until a mutation completes. A lock file alone does not prove that work stopped: check the recorded process on the actual host before recovery. Do not restart an active publication or remove its lock after an observation timeout. If the process is confirmed dead, stop writes, make a private ledger backup, verify the active pointer and corresponding complete release, then remove only that confirmed stale lock. The next mutation reconciles prepared journals against the actual pointer. Never edit a release snapshot or learner rows during this recovery.

## Verification checkpoint

On 2026-10-03 the pure and storage suites passed 11 isolated tests covering evidence, exact approval, stale proposals, immutable IDs/rubrics/dates, failure injection, locking/symlinks, journal reconciliation, activation and rollback. A populated in-memory learner retained progress, notes, position, frozen assessment evidence, real fixture bytes, portfolio entry and quiz answer across release/rollback. An isolated production-server Chromium journey passed proposal → review → publication → learner-visible text → rollback, checked unauthenticated/learner/origin restrictions, and ran axe/layout checks at 390/768/1440px with 200% text. These are automated checks, not WCAG certification or human teaching approval. Full-project gate results are recorded after the final milestone; no real teaching change has been published as a demonstration.

Vitest assigns a fresh nonexistent test ledger path for each run, so unit fixtures always use the source baseline rather than the host's active publication. Playwright independently assigns fresh database, knowledge and Auditor paths. The boundary was exercised with a deliberately malformed external `active.json` in a newly created synthetic directory: all 137 unit tests passed and that sentinel was unchanged. This check did not use the real ledger or user database.
