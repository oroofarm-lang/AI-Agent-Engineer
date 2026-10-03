# Official discovery and Volt links — 2026-10-03

This checkpoint adds actual public-source discovery and completes the corresponding graph links. It does not certify a live paid Mentor, deploy the platform, verify announced technical capabilities or release the question draft.

## Implemented

- Versioned public registry: six technologies, eight fixed official sources, mappings through actual course source IDs to lessons, modules and skills.
- Schema 2 separates attempted/retrieval timestamps from publisher dates, records observed-item fingerprints and discovery-only status, and keeps schema 1 readable. New legacy feeds are marked not checked. Parsing validates provenance and mappings again on cache load.
- Fixed HTTPS requests reject redirects, use ten-second abort signals and streaming limits, reject RSS external entities, and retain bounded public metadata. Model catalog references are document links, not account availability or API compatibility guarantees.
- Path-scoped in-flight coalescing, current-slot reuse, atomic mode-0600 writes and bounded storage. A legacy cache does not suppress the first expanded refresh. No learner database or provider-generation call is involved.
- `/updates` reads saved observations without an AI key; GET `/api/knowledge` requires a signed-in account. Same-origin POST requires a verified configured operator and an empty strict object; it accepts no URL/path or forced retry. Mentor context includes bounded lesson-relevant observations.
- Volt exports source/technology notes with reciprocal links to actual course material, agents and interfaces. Full Canvas edges preserve all relation labels for each pair. A separate overview uses 17 real notes to keep the initial view readable.

## Actual evidence

The manual `npm run mentor:refresh` at 2026-10-03T10:02:43.942Z returned all eight sources successfully: Agents SDK 3, LangGraph 3, MCP SDK 3, n8n 3, Ollama 2, news 3, model-catalog observations 1, changelog entries 3. The resulting schema-2 public-metadata cache was 32,376 bytes. No key or model-generation request was used.

`npm run vault:sync` generated 1,186 current targets: 154 established course exports plus 1,030 graph notes and two Canvas files. It includes all 139 released lessons, 14 modules, 53 skills, 47 curriculum sources, 139 rubrics/exercises, 21 agents, six tools, 11 APIs, 17 public assets and 139 explicitly labeled draft quizzes. The full Canvas has 1,030 file nodes, five groups and 7,860 edges; relation metadata has 15,970 directed labeled records. Every file node resolves on disk. A repeat sync returned zero changed files, 1,186 unchanged and no manifest change.

The final `npm run quality:audit` passed: public inventory, lint, TypeScript, 114 unit/integration tests in 23 files, 18 Python lab tests, integrity checks for all 139 published lessons, production build, privacy checks for 34 route traces and 26 isolated Chromium journeys. The added updates journey covers filtering, real catalog-link destinations, related lessons, no-key reading, read/refresh access restrictions and axe/overflow checks at 390, 768 and 1,440 pixels. Test setup uses a random isolated database and metadata cache, controlled public fixtures and empty paid-provider credentials. An initial run failed before browser startup because the test-fixture script used top-level await with CommonJS; wrapping setup in an async function fixed it and the complete gate was rerun successfully.

A separate in-app browser opened the actual local `/updates` page and showed all eight genuinely retrieved source results, dates and filters. The overview was sent to Obsidian through its documented open URI; this is a launch action, not visual confirmation of the native app. The local 09:00 Monday/Wednesday/Friday heartbeat remains ACTIVE and now lists all eight registry endpoints. No scheduled execution or hosted cron was observed. Native Obsidian preferences and personal notes were preserved.

## Language and remaining review

The independent Hebrew reviewer read both new interface components in full, reread the applied fixes, and read the new source/technology export block. Changes distinguish an attempted metadata collection from technical verification and avoid grammatical count errors. Its separate report records exact locations, original/suggested wording and hashes. It also completed a full reading of all 139 draft questions, 417 options and 139 explanations, with 17 proposed rewrites. That is linguistic review, not technical verification or human pedagogic approval; the draft remains inactive.

Source discovery does not complete the Curriculum Auditor's evidence comparison, proposal review, approved release application or rollback workflow. Paid generation, SMTP delivery, deployment, human screen-reader review and WCAG certification are not claimed. A non-fatal Next.js “destination stream closed early” log occurred during fast browser navigation while all assertions passed; this report does not infer its cause or certify its resolution.
