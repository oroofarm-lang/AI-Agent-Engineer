# Public Vault projection and reviewed releases

## Architecture decision — 2026-10-03

The public Volt graph is a projection of the active validated curriculum, trusted agent registry and explicitly listed public assets. Reviewed section publication and rollback currently change the course pointer without updating that projection. Connect both successful release operations to the same public exporter used by the verified-operator `/api/vault/sync` endpoint and CLI.

Course publication remains the primary transaction. A failed public export must not silently undo an already acknowledged course release, rewrite learner rows or report that approval failed. Its response reports course state and a separate `vaultSync` outcome. Operator UI provides a version/hash status and a safe retry of public sync only. The saved public manifest makes pending synchronization detectable after a restart; it is not a background worker or an outbox with unlimited retries.

Prepare the complete graph inside the existing cross-process Vault lock, rather than constructing a snapshot before waiting for another writer. Immediately after writing, compare the exported curriculum fingerprint with a fresh active catalog. Retry at most three times when the active release changed during export. A busy external writer, edited generated note, invalid path, failed write or persistently changing active release is reported honestly. Never discard a surviving lock after a timeout.

`VAULT_EXPORT_DIR` is a trusted server-only root (default `Volt`), never a request field. Every exported path remains on the public prefix allowlist. No directory crawl, notebook read, user database export, credentials, private operator decisions or automatic Git push is added. Playwright receives a fresh `.data/e2e-<UUID>-vault` root, independent of the host's actual Volt.

## Contracts, files and models

- Extend the existing version-2 `.course-export.json` with an optional `curriculumHash`. Older manifests require one successful sync before they can claim the same curriculum fingerprint. Historical file hashes remain retained.
- `GET /api/vault/sync`: verified configured operator only; no-store metadata with `CURRENT | PENDING | UNAVAILABLE`, active/exported versions and curriculum fingerprints. A current manifest identifies the last successful curriculum export; it does not certify later manual file edits or visual usability.
- `POST /api/vault/sync`: same permission/origin/bounded empty-body contract; performs the real protected write and returns actual counts/version/hash. No client-supplied paths.
- `POST /api/auditor` apply/rollback: successful course result plus `vaultSync: { status: SYNCED, ...actual projection } | { status: FAILED, error: safe code }`. Propose/decide never export a draft.
- `src/lib/vault/sync.ts`: active-catalog projection and bounded reconciliation.
- `scripts/lib/vault-write.mjs`: lock-bound preparation, manifest fingerprint and metadata-only reads.
- `src/components/vault-sync-status.tsx`: separate operator status/retry, with plain Hebrew and accessible live feedback.

No database migration or learner schema change is needed. Public projection failure is derived from the persisted manifest and current course identity; learner records and curriculum approval are independent.

## Implementation and verification phases

1. Preserve the public writer's preflight, edit protection, historical hashes and rollback; add lock-bound preparation and fingerprint status with meaningful filesystem cases.
2. Connect actual approved activation/rollback and expose verified-operator status/retry; show acknowledged publication separately from projection failure.
3. Exercise real public files after a synthetic release, a protected manual-edit conflict, rollback and successful retry in a fresh isolated Vault. Check access/origin boundaries and unchanged owned learner export.
4. Review new Hebrew copy, run the appropriate quality gate and production tracing, regenerate the real public graph and back up only reviewed public changes to Git.

This connection publishes only an already human-approved curriculum. It does not approve teaching, publish the question draft, provision hosting, supply model credentials or establish native Sidian acceptance.

## Question-bank projection — 2026-10-03

The same protected exporter now projects a published, curriculum-compatible question bank alongside the distinctly labeled authoring draft. Public question notes link reciprocally to actual lesson, exercise, rubric, specialist, canonical sources, practice-save API and the verified-operator review API. Reviewers, private decisions and learner answers are never supplied to the exporter. The existing public bank paths and historical hashes remain retained after rollback.

The optional nullable `quizBankHash` in the version-2 manifest identifies the currently eligible public bank independently of curriculum version. A null value represents no compatible published bank. Status compares both course and bank identity; older manifests normalize an absent bank fingerprint to null. The export loop reconciles both fingerprints after writing, at most three times. A saved manifest still does not certify subsequent manual file edits.

Question publication and rollback return their committed review-store operation plus a separate `vaultSync` result. A failed public write cannot revoke an acknowledged publication. `/admin/quizzes` provides the same protected status/retry controls; browser tests use a fresh private `QUIZ_REVIEW_DIR` as well as the isolated database and Vault.

## Native Canvas formatting — 2026-10-03

Opening and fitting the actual public overview in Obsidian 1.13.7 caused the application to serialize the same Canvas with different indentation and property order. The existing byte-only edit guard then rejected the otherwise unchanged export. Treat Canvas JSON formatting separately from changes to its data.

Add optional `canvasFiles` structural SHA-256 fingerprints to the version-2 manifest. Fingerprint complete parsed Canvas objects with recursively sorted object keys; preserve array order, all string values, coordinates, edges and unknown properties. Invalid or excessively nested JSON fails closed. Existing manifests can establish this fingerprint only when the current bytes are still trusted or the parsed current Canvas exactly equals the newly generated Canvas. Historical entries remain retained. Markdown protection continues to use exact bytes.

Preserve an existing Canvas's bytes when only formatting differs. Record its actual byte hash and structural fingerprint; use the saved structural fingerprint to allow a later generated update after another formatting-only save. Real node moves, added properties, content changes, array reordering and invalid JSON continue to stop the entire preflight. Recheck newly adopted file bytes before committing the manifest, and roll back this run's writes if a concurrent editor changes them.

Verify with isolated filesystem cases covering old manifests, native-style serialization followed by a new graph version, genuine edits, malformed manifests, concurrent editing and failed manifest publication. Then rerun the appropriate quality gate, export the public Volt and inspect its native overview and full Canvas again. No private notes, learner rows or Obsidian preferences need to be read or changed.
