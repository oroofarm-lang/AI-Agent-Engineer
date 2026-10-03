# Reviewed release → public Volt checkpoint — 2026-10-03

## Result

Approved section publication and rollback now invoke the protected public exporter. Course state and export outcome are reported separately: a failed export cannot undo an acknowledged release or overwrite an edited note. The operator page shows last-exported curriculum identity and supports retrying only the public projection. No teaching change or question-bank publication was performed on the real course.

The graph is built inside the actual writer lock. A final active-catalog check reconciles a publication race, with at most three attempts. An actual isolated activation injected after the first manifest rename verified that the next export selected the new release and retained the prior files. The manifest records curriculum version/hash; status describes that saved identity, not later manual edits to files. See [architecture and operating limits](../VAULT_SYNC.md).

## Actual verification

| Command or evidence | Observed outcome |
| --- | --- |
| Initial writer/Auditor cases | 31 cases passed across the two files, including lock-bound preparation, older manifests, failure cleanup and real release/export/rollback conflict |
| `npm run quality:audit` | Exit 0: inventory, lint, typecheck, 141 unit/integration tests in 25 files, 18 Python lab tests, production build/private tracing and 28 Chromium journeys |
| Complete course browser audit | All 139 published lesson screens and mandatory foundation gating; automated layout/axe checks, not human screen-reader acceptance or WCAG certification |
| Final request-validation milestone | Lint/typecheck/build passed; isolated Chromium Auditor journey passed again, including malformed JSON, wrong content type, bounded body, forbidden paths, unauthorized/learner/origin restrictions |
| Final unit milestone | Lint/typecheck and all 142 unit/integration tests passed after adding the real activation-during-export regression case |
| Publication and retry journey | Actual fresh synthetic Vault files contained the new lesson bytes. A manual synthetic Index edit survived failed rollback export and a rejected retry; restoring only that fixture allowed a real successful retry. Learner-owned export stayed unchanged; a synthetic notebook note was untouched and absent from the manifest |
| Storage isolation | Playwright assigned fresh database, knowledge, Auditor and Vault paths. Tests never exported into the actual Volt directory |
| Visual evidence | The synthetic operator screenshot `.data/quality/auditor-review-fixture.png` was inspected; the new status card uses the existing cream layout and clear loading/current/pending/error copy |
| Production privacy | All 37 trace manifests excluded private configuration, user databases, ledger and personal Volt notes |
| Actual public CLI export | 18 changed, 1,209 unchanged, 1,227 generated targets; version 2.2.0. Repeated sync: 0 changed, 1,227 unchanged, manifest unchanged |
| Actual graph integrity | 1,036 current public file nodes; 37 Canvas files; 8,195 root edges. All 1,382 retained public hashes matched; every Canvas file path and edge endpoint resolved |

The first browser run failed because its five-second status expectation expired while the real export request was still pending. The captured UI showed a disabled loading button, and the trace showed an unfinished POST. The corrected test waits for the actual response, then checks the rendered result; the complete gate and final focused journey passed. No timeout was treated as evidence that the writer had stopped.

The first environment-aware CLI invocation failed before export because its default `@next/env` import was undefined under tsx/CommonJS. A named import fixed that observed runtime error. The actual CLI then succeeded and a repeat was unchanged. Type checking and a server build alone had not proved that entry point worked.

## Hebrew review and acceptance boundaries

The authorized reviewer read the final new component in full (117 lines), recorded its SHA-256 and reread the changed publication messages and public API descriptions in precisely recorded excerpts. Six wording suggestions were applied and reread. See [the dated linguistic report](2026-10-03-vault-sync-hebrew.md); the other files were not claimed as fully read. Released lesson bodies remain unchanged.

This milestone adds no learner schema migration, no private-data export, no automatic Git push from the application, no hosted worker and no automatic teaching approval. A surviving external lock or manual-edit conflict requires operator recovery/retry. Native Sidian, real provider generation and public hosting were not newly verified. Human teaching/question-bank review and the remaining full-goal acceptance are still outstanding.
