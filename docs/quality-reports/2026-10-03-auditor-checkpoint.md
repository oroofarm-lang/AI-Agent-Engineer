# Reviewed curriculum release checkpoint — 2026-10-03

## Implemented behavior

Verified configured operators can prepare a section proposal, read its full comparison and canonical source references, inspect computed dependencies, record an exact-hash human decision, explicitly publish a preserved new course version and return to the prior version. Source discovery and model feedback cannot approve a release. Learners cannot access the operator page or ledger. A stale base, missing review, changed proposal, locked writer, edited release or later-version rollback is rejected.

The ledger lives in a private persistent local directory. It stores proposals, review attestations, decisions, snapshots and recovery journals. The active catalog is bound to its exact body directory for the entire request. Publication inserts only curriculum-version metadata; it never updates learner rows. No real course edit was published as a demonstration. Catalog extensions, new IDs, prerequisite/rubric changes and supplements remain outside section editing and need a separately reviewed release.

## Evidence from commands and rendered behavior

| Check | Actual result |
| --- | --- |
| `npm run quality:audit` | Exit 0: inventory, lint, type checking, 137 tests in 25 Vitest files, 18 Python tests, production build/private tracing, 28 Chromium tests |
| Public-copy inventory | 139 published lessons, 14 chapters, 67 UI/source files, 1,849 structured text records; listing/hashes do not claim linguistic review |
| Auditor unit/storage cases | 11 passing cases: evidence, exact review, foundation reasoning, stable IDs/rubrics/dates, stale bases, immutable decisions, lock/symlink checks, injected write/validation failures, pointer reconciliation and rollback |
| Populated isolated learner | Progress, note, position, assessment evidence and frozen rubric, real fixture bytes, private portfolio and quiz answer survived publication/rollback unchanged |
| Reviewer Chromium journey | Synthetic verified operator and separate learner; unauthenticated/learner/origin rejection; source selection, old/new text, explicit review, publication, visible learner text and rollback; owned export unchanged |
| Responsive/axe checks | Review page at 390/768/1440px with 200% text; full course journey visited all 139 published lessons; automated checks do not certify WCAG or assistive-technology usability |
| Screenshot | `.data/quality/auditor-review-fixture.png` captured and visually inspected; synthetic isolated identities/content only |
| Final copy adjustment | 16 graph tests passed again after the truthful version-warning rewrite; subsequent lint, typecheck and production build passed |
| Production privacy | All 37 trace manifests excluded private configuration, user databases, ledger and personal Volt notes |
| Public Volt export | 1,035 current graph notes, 8,184 unique Canvas edges, 37 canvases, 13 real API contracts and 19 public assets; 1,381 retained public file hashes matched |
| Repeated public sync | Zero changes to 1,226 generated targets; user settings and personal notes were preserved |
| Unit fixture boundary | Vitest's existing include/alias configuration gained a fresh isolated ledger path. All 137 tests passed with a malformed synthetic external active-pointer sentinel, which remained unchanged; final lint/typecheck passed. |

The first browser run exposed unusable exact labels on nested selects. The next run exposed the editable body being included in its implicit label. Stable explicit ARIA names now match the visible field titles, and the complete journey passed. Same-selection loading and aborted fetch handling were also corrected. No claim is made that the failed runs passed. A Next stream-close log appeared during a responsive navigation test; its assertions passed. This checkpoint does not claim a log-free runtime or infer an unobserved cause.

A temporary test-isolation probe created a competing Vitest configuration and incorrectly included Playwright files; that run failed. The temporary file was removed, and the existing `vitest.config.mts` was updated while preserving its test include and alias. The subsequent isolated run passed all 137 unit tests; no competing configuration was retained or staged.

## Hebrew review and remaining acceptance

The authorized Hebrew reviewer read the complete 673-line review component, the complete 32-line operator page and specifically recorded public exporter excerpts. Original wording, suggestions, explanations, read coverage and hashes are in [the language report](2026-10-03-auditor-hebrew.md). Reading coverage does not imply server testing, technical correctness of teaching or absolute linguistic certainty. Previously released lesson bodies were not edited in place.

The 139-question teaching bank remains an unpublished human-review draft. An older draft can remain visible in Volt with explicit source/active curriculum versions and a request to check suitability. A published mismatched bank is rejected. No AI response, mail delivery, provider availability, external code execution or public deployment was fabricated. Real provider/hosting acceptance and human approval of substantive teaching changes remain required before the full project goal can be marked complete.
