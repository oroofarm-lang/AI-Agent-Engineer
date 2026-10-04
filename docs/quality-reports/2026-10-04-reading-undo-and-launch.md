# Reading acknowledgement reversal and release checkpoint — 2026-10-04

The screenshot refers to session-local card reading acknowledgement, not database-backed build completion. Every acknowledged card now exposes `ביטול סימון הקריאה`, including the final card. Removal clears only that card acknowledgement; advancing, numbered navigation, frozen submissions and persisted build/XP remain separate. Existing final confirmation remains disabled until acknowledgement is undone, then becomes available again.

The actual focused browser journey verifies undo on a revisited first card, undo and re-acknowledgement on the final card, and unchanged persisted lesson progress. All three neon browser cases passed. Lint, TypeScript and production build passed; build privacy check covered 40 traces. The test server logged an early destination-stream close during navigation; assertions nevertheless passed. A broader suite is being run separately; its completion is not inferred here.

Public Volt synchronization succeeded with zero content rewrites and a manifest update that adopts native Canvas formatting. The independent verifier checked 1,808 retained public files, 37 Canvases, 1,462 current file nodes, 17,057 reciprocal root edges and 68,587 wikilink occurrences, with zero reported errors. Personal Obsidian preferences were not read or changed. Native application rendering is not newly certified.

Public deployment configuration check failed on missing BETTER_AUTH_URL, BETTER_AUTH_SECRET, MAIL_FROM, LEGAL_OPERATOR and LEGAL_CONTACT_EMAIL. It stopped before mail transport checks. No public host or actual email delivery is claimed. See PUBLIC_LAUNCH_HE.md for remaining configuration and live acceptance.

Scope: existing automated journeys cover many interaction families; they do not prove every clickable element in every lesson or every authenticated role. Full manual click coverage and live provider/email acceptance remain outstanding.

## Additional evidence

A second public Vault sync reported changed=0 and manifestChanged=false. Both modified public Canvases were compared with HEAD as complete parsed JSON objects with recursively sorted object keys: changes were formatting only, including all node coordinates and edges. Their existing bytes were preserved.

The requested Hebrew reviewer read lesson-canvas.tsx lines 27–206, with a reread of 160–185 (partial file review; SHA-256 bfef3382e1332c745a25e0fafeb6a88a26f155350dbb0f6f8220fdd690fd16fa). It found the new undo label clear and natural, and suggested making the temporary nature explicit in the active status text. No claim of full Hebrew coverage or browser review by that agent is made.

The actual local HTTP check returned 307 redirect to /auth?next=%2F on port 3000 for an unauthenticated request. This is local availability, not public hosting.

## Completed broad regression gate

The real follow-up command `npm test && npm run test:e2e` exited 0: all 211 tests in 32 unit/integration files passed, followed by all 33 Chromium browser journeys (5.0 minutes). This includes the course-wide continuous-reading/axe check for every published lesson, real synthetic two-account signup/build/resume/isolation/deletion, reading reversal, imports/exports, autosave/conflicts, frozen submissions/retry, private portfolio, quiz persistence, operator release/rollback, keyboard/scroll/navigation and responsive layouts. Provider generation and SMTP are disabled in isolated browser configuration; these passes do not certify live model calls, delivered email, all manual clicks or a public deployment. Early destination-stream closure and missing test-client-IP warnings appeared in server logs without failed assertions.
