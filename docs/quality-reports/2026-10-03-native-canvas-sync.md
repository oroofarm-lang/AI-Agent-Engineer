# Native Obsidian Canvas synchronization — 2026-10-03

## Finding and resulting behavior

The actual AI-Agent-Engineer Volt opened in Obsidian 1.13.7. Its overview rendered public file cards, five section groups and relationships; the complete Root_Knowledge_Graph Canvas also loaded. During this native inspection, Obsidian reserialized System_Overview.canvas with different indentation and object-property order. A byte-integrity check failed on that file. Comparing its complete parsed object to the Git baseline confirmed that every node, edge and property remained unchanged.

The protected writer now records optional complete-object structural fingerprints for Canvas files, while retaining actual byte hashes. A formatting-only save is preserved byte-for-byte and does not block later graph updates. Genuine structural edits, invalid JSON and untrusted paths still abort preflight. A concurrent editor change during adoption aborts manifest publication and rolls back only this run's written targets. Historical hashes/fingerprints and Markdown edit protection remain intact. See [the architecture decision](../VAULT_SYNC.md).

## Executed checks

| Check | Observed result |
| --- | --- |
| Focused graph/writer suite | 25 cases passed, including six new filesystem cases for native formatting, old manifests, later releases, real edits, malformed data, concurrency and rollback |
| `npm run quality:audit` | Exit 0: public inventory, lint, typecheck, 148 unit/integration tests in 25 files, 18 Python lab tests, production build and 28 isolated Chromium journeys |
| Complete course browser audit | Every one of the 139 published lesson screens rendered; mandatory foundation unlocking and automated accessibility/layout assertions passed |
| Production tracing | All 37 trace manifests excluded private configuration, user databases and personal Vault notes |
| Actual public export | 0 changed files, 1,227 unchanged targets; the manifest gained 37 structural Canvas fingerprints and adopted the actual native overview bytes |
| Repeat export | 0 changed files, 1,227 unchanged targets; manifest unchanged |
| Actual retained export integrity | All 1,382 public file hashes matched; all 37 Canvas file paths and edge endpoints resolved. The current graph contains 1,036 file nodes and 8,195 root edges; 33,139 wikilink occurrences resolved within the public manifest |
| Local application availability | A read-only request to localhost:3000/auth returned HTTP 200 |
| Native application | Public overview and complete Canvas opened in Obsidian 1.13.7. The user then selected the Volt graph view, which was left selected |

The first new test run failed two fixture checks because macOS resolves temporary paths from /var to /private/var. The rename assertion and concurrent-edit injection were corrected to compare resolved paths; the injection now explicitly asserts that it actually executed. The focused suite and subsequent complete gate passed. The browser run logged one destination-stream-closed message during navigation; all 28 journeys completed successfully. These outcomes do not establish human screen-reader acceptance or WCAG certification.

The initial sandboxed CLI attempt could not create the tsx IPC socket. The authorized runtime invocation succeeded. No rejection was treated as proof of an export failure, and no secrets were printed.

## Scope and remaining acceptance

The integrity scan read only manifest-listed generated public files, not personal notebooks, uploaded work, learner database rows or credentials. A dated public-path/hash record is stored locally in .data/quality/vault-integrity-2026-10-03.json. That is byte/link verification, not a new linguistic or technical review of all lessons. No Hebrew learner copy, released lesson body, question bank or learner schema was changed.

The full Canvas intentionally contains thousands of relationships and is dense when zoomed out. Index.md and the overview, chapter and specialist maps provide entry views for navigation; this inspection does not claim every relationship is readable simultaneously. Native Sidian has not been tested. The full platform goal's human teaching review, live provider acceptance and public hosting remain unproven.
