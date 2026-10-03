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
