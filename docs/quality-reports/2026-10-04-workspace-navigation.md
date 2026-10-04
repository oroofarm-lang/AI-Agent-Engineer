# Pending workspace navigation — 2026-10-04

A root registry aggregates live pending-save predicates from every mounted workspace, including hidden question cards. All existing Next Link imports use a guarded client wrapper with the documented onNavigate callback. Cancellation keeps the same route and local buffers; acknowledged saved/read-only work does not block. Downloads, modified/new-tab links and full-document beforeunload remain governed by their browser/Next behavior. Registry cleanup removes an unmounted workspace. No database migration, learner-data export or progress award is added.

The initial real production-browser gate passed five cases, including one saved workspace and another failed hidden workspace, cancellation with retained text, JSON export, actual saved receipt after retry and unblocked navigation. The broader updated journey also tests explicit permission to leave and absence of a stale guard afterward; its result is recorded only after the full gate finishes.

The Hebrew reviewer read workspace-navigation.tsx in full (62 lines; SHA-256 5ccd2545b742204a1828290a02d8f8eafaf322c077856b6dfd2034b4b17825c3). It read vault-export.mjs lines 1–85 (new records 13–68) and vault-templates.mjs lines 21–36 plus line 89 only. The source snapshots, hashes and exact replacements are recorded privately under .data/quality/2026-10-04-workspace-navigation-review.json. Its two public-graph recommendations were applied: describe warning rather than saving, and distinguish save acknowledgement from permission to navigate. No new full-course language coverage is claimed.

Seven public assets now project the workspace, table editor, Markdown editor, navigation guard and three PDF source files. All 418 templates link reciprocally to their shared editor/export/guard contracts; only authored table templates link to the table editor. The public asset preparation allowlist adds exactly the three PDF filenames, not arbitrary private storage. No filled learner work enters the export.

Remaining scope: onNavigate does not intercept browser Back/Forward or arbitrary programmatic router changes. Unsaved manual evidence, uploads and other forms are outside this workspace-only registry. Provider-backed template context, live model execution, all PDF edge cases, human teaching approval, native Sidian acceptance and public deployment remain unproven or unfinished; this is not completion of the full goal.

## Full gate completed

`npm run quality:audit` exited 0: inventory of 139 lessons, 14 chapters, 77 UI/source files and 3,186 structured text records; lint and TypeScript passed; all 211 unit/integration tests in 32 files passed; all 18 Python lab tests passed; production build and 40 privacy traces passed; all 34 Chromium journeys passed in 5.3 minutes. The expanded navigation journey verified explicit permission to leave with a failed draft and no stale guard on subsequent navigation. Test model/SMTP credentials were disabled; no live provider or delivered-email evidence is inferred.

After the two public-copy corrections, actual Volt sync plus independent verification covered 1,815 retained public files, 37 Canvases, 1,469 current file nodes, 19,657 reciprocal root edges and 78,987 wikilink occurrences with no errors. Additional final-source graph tests, rebuild and stable-repeat verification are run separately.

Final-source follow-up exited 0: all 30 vault-graph tests passed, the production rebuild and 40 privacy traces passed, and the subsequent real Volt sync reported changed=0 and manifestChanged=false. The independent verifier again reported zero errors with the same counts. Native Sidian rendering remains unverified.
