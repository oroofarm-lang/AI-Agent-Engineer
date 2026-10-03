# Focused Volt maps and owned reinforcement answers — 2026-10-03

This checkpoint completes the current public Vault navigation update and the previously unfinished persistence of the existing reinforcement question. It does not certify completion of the entire platform goal.

## Public knowledge graph

- Active curriculum: 2.2.0; 139 released lessons, 14 chapters, 53 skills, 47 sources, 139 exercises and 139 rubrics. Released lessons were not edited.
- The master Canvas contains all 1,033 current public Markdown records and 8,154 unique relationship edges; Markdown records retain 16,558 directed, typed relationships.
- There are 37 Canvas files: the master map, the entry overview, 14 chapter maps and 21 specialist maps. Chapter and specialist views include only actual notes and actual relationships from the master graph. `Volt/Index.md` and the relevant chapter/agent records link to them.
- The entry overview uses five labeled groups, 17 real file cards and a connected tree of 16 real relationships. It omits dense cross-links from this entry view; all cross-links and relationship labels remain in the full graph and linked notes. This presentation change followed actual native inspection of overlapping labels.
- `npm run vault:sync` produces 1,224 current targets. Historical exports remain in the manifest. The writer still rejects manual edits before writing, validates public paths, rejects symlinks and preserves personal folders and Obsidian preferences.
- The final repeated sync reported zero changed files, 1,224 unchanged targets and an unchanged manifest. All 1,379 current/historical manifest target hashes were checked and matched. A dated hash inventory was saved privately under `.data/quality`; it contains public generated paths/hashes only.
- Canvas format reference: [JSON Canvas 1.0 specification](https://jsoncanvas.org/spec/1.0/). No custom plugin is required for the standard file/group nodes.

## Existing question persistence

- The already displayed practice question is now a versioned public definition in `content/quizzes/system/1.0.0.json`. The 139 separate teaching-question drafts remain drafts and have not been activated.
- Authenticated `/api/quizzes` stores a frozen question snapshot, selected option, actual correctness and feedback for the signed-in learner. Reload and login restore the saved answer. The Mentor receives at most 12 actual, owned attempts as practice context.
- A same-attempt retry is idempotent, including after a lost acknowledgement. Altered payloads conflict; accounts are isolated; published lesson/foundation access, version/hash, origin, body limits and daily limits are enforced.
- Practice attempts do not change XP, lesson progress, submitted assessments or human mastery decisions. Account export schema 10 and account deletion include only owned attempts.
- Approved private SQLite backup and additive migration `0012_quiz_attempts.sql` completed successfully through `npm run db:migrate:backup`. No personal record contents were inspected or published.
- The dashboard mission summary now extracts a prose paragraph instead of leaking Markdown headings or cutting off URLs/decimal numbers.

## Verification actually completed

- `npm run quality:audit`: public inventory of 139 lessons, 14 chapters, 65 interface/source files and 1,849 structured text fields; lint; TypeScript; 124 Vitest tests in 24 files; 18 Python lab tests; released curriculum integrity; production build; privacy checks for 35 route traces; and 27 isolated Chromium end-to-end scenarios, including the complete 139-lesson audit.
- The isolated browser scenario proves save → reload, a server save with a deliberately lost acknowledgement → same-attempt retry, actual sign-out/sign-in restoration, owner isolation and unchanged progress/mastery. It uses generated test accounts and an isolated test database.
- After the final Canvas presentation changes, `npm test -- tests/vault-graph.test.ts` passed all 14 tests, and lint and TypeScript passed again. The overview has a tested connected tree; focused maps retain the tested public-note, relationship and overlap constraints. These were the only changes after the full production gate.
- Actual native Obsidian 1.13.7 inspection opened the existing Volt vault, rendered the public Index in reading mode, rendered the overview, and used Zoom to fit. A second visual inspection confirmed the final five group headings and the cleaner tree. Sidian itself was not installed or tested.
- The real local app dashboard was read in the browser; no answers, progress changes or paid AI requests were submitted through the real learner account during this check. Updated checked-in dashboard/mobile screenshots come from isolated Playwright fixtures.
- [Scoped Hebrew review](2026-10-03-focused-vault-hebrew.md) records exact read ranges, hashes, original text, suggestions and applied corrections. It is not a claim that all course prose was reread in this checkpoint. The subsequent overview-tree code change added no Hebrew copy; the review's earlier hash remains the hash of its actual read.
- A nonfatal Next stream-close diagnostic appeared during fast test navigation; the end-to-end assertions passed. Its cause has not been declared resolved.

## Boundaries and remaining work

No paid Mentor response, SMTP delivery, public deployment, human screen-reader certification or full WCAG certification is claimed. The teaching-question drafts still require review. The full Curriculum Auditor proposal/review/apply/version/rollback workflow remains outstanding. Private attempts, conversations, submissions, notebooks, credentials and databases are outside the public Vault and Git backup.
