# Reviewed reinforcement-question releases

## Decision and scope — 2026-10-03

The authored 139-question bank is an isolated teaching draft. The current learner component imports one workflow-practice question, and its repository can save only that question. A successful structural or Hebrew audit cannot approve the draft's answers. Add a concrete operator review and publication path before connecting subject questions to learner screens.

Keep questions independent of practical assessment rubrics and course progress. An approved question provides reinforcement feedback, not XP, completed builds, human assessment decisions or skill mastery. Preserve the existing generic practice question and all frozen attempts. Do not publish the real draft automatically during implementation or testing.

## Contracts and models

- A strict, versioned bank contains unique stable question IDs, one question for each published lesson, distinct options, a correct option, explanation, an existing source section and canonical lesson-assigned source IDs. It records its source curriculum version and draft/review status.
- An immutable review proposal freezes the complete draft, target bank version, active curriculum fingerprint, per-question lesson-body/source-section hashes and canonical source references. Its hash binds all review decisions to the exact proposal. A changed curriculum or question requires a new review.
- Each immutable question decision records the exact question/context fingerprint, reviewer identity, approval/rejection, explanatory notes and explicit answer/source/Hebrew review acknowledgements. Approval requires all three acknowledgements. Replayed identical requests are idempotent; a contradictory decision cannot overwrite the original.
- Publishing requires every question's explicit approval and a matching active curriculum. It writes an immutable release, then atomically changes a small active pointer. A release written before an interrupted pointer update can be validated and reused on retry. Rollback requires the exact active identity and changes only the pointer; prior releases and learner attempts remain intact.
- `QUIZ_REVIEW_DIR` is a trusted server-only private persistent root, default `.data/quiz-releases`. Reuse the existing bounded, no-symlink atomic record/lock implementation. No request accepts paths, reviewer identities or arbitrary provider output as approval. No database migration is needed for review records.
- Runtime exposes only a validated published bank whose curriculum fingerprint still matches. Unpublished proposals, reviewers and decisions stay private. An unrelated course release pauses stale subject questions without deleting historical attempts.

## Files and integration

```text
src/lib/quizzes/bank.ts             strict shared bank/context validation
src/lib/quizzes/review-store.ts     immutable review, release and rollback state
src/lib/quizzes/draft.ts            server-only operator draft entry point
src/lib/quizzes/release-runtime.ts  published-bank selection; never selects a draft
src/app/admin/quizzes/              verified-operator review screen
src/app/api/quizzes/review/         authorized bounded review mutations
src/components/quiz-bank-review.tsx human review and exact-version publication UI
```

The subsequent learner integration generalizes the existing frozen question snapshot and owned attempt repository, retaining old hashes and UUID replay behavior. The practical-proof area receives only the selected published question. The public Vault exporter includes the published bank alongside the distinctly labeled draft; publication and rollback synchronize only public content. Browser tests receive their own fresh question-review directory, database and Volt.

## Implementation phases and evidence

1. Implement strict bank/context validation and the private immutable review/release store. Use real isolated filesystem cases for incomplete approvals, stale curriculum, duplicate decisions, publication replay, pointer failures, rollback, corrupt records and path/symlink boundaries.
2. Add the verified-operator screen/API and precise Hebrew review copy. Exercise the exact approval controls and anonymous/learner/origin/body restrictions in a synthetic environment.
3. Connect only published questions to learner answers, exports, Mentor context and the public graph. Verify persistence, historical attempts, tenant isolation, unchanged mastery/XP, stale-course behavior and rollback with actual files and browser interactions.
4. Run the full quality gate, inspect rendered layouts, regenerate public Volt and back up the reviewed code. Present the real draft for human teaching review; do not claim its publication or a real provider/hosting acceptance before they occur.

## Operator use and history

Open `/admin/quizzes` with a verified allowlisted account. Create a review using the suggested unused bank version, then select a question by number. Read its actual lesson section, all answer choices, explanation and linked primary sources. Record an approval or rejection with explanatory notes; approval additionally requires explicit answer, source and Hebrew checks. Decisions cannot be replaced. Correcting a rejected or changed draft requires a newly frozen review, not editing a previous decision.

The approval counter and saved review list allow pausing and resuming. Only a complete current approval enables the separate publication button. A rollback selects the preceding bank or no bank, preserving releases and answers. The version suggestion considers reserved historical files, including a sealed file from an interrupted pointer write, so rollback does not suggest an occupied version. The fixed authoring entry point currently reads `1.0.0-draft.json`; preparing a later authoring version is a deliberate code/content change, never a browser-supplied file path.

The runtime falls back to the existing workflow-practice question when no compatible subject bank is published. It never selects the draft. An identical owned answer request can still replay its frozen acknowledgment after replacement or rollback; new answers must match the current eligible question. Public sync includes only the eligible published bank plus the explicitly labeled draft, and records a bank fingerprint without private reviewer metadata.
