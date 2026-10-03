# Template draft persistence and public Volt graph — 2026-10-03

Owned template drafts now persist through an authenticated API with exact definition hashes, optimistic revisions, atomic retry receipts, private account export and account deletion. The additive migration ran successfully after a consistent private backup. No learner rows were read for this report.

The full quality gate passed: 195 unit/integration tests, 18 Python labs, production build, 40 privacy trace checks and 30 Chromium journeys. The new browser journey tested authenticated persistence, owner isolation, stale revisions, retries, export and deletion against an isolated database. Runtime warnings about interrupted response streams and unavailable trusted client IP detection were observed; these results do not establish production proxy configuration or WCAG certification.

The protected public Volt export contains 139 lessons, 418 template definitions, 21 agent definitions, 15 API contracts and 24 public assets. All 1,461 current Root Canvas file nodes and 16,211 reciprocal edges were checked, together with 37 canvases and 65,203 current-note wikilink occurrences. No broken link or integrity error was found. Personal Obsidian settings were excluded.

The learner template editor, UI autosave, one-click template submission and template-aware Mentor context remain unfinished. This checkpoint establishes backend persistence and public architectural connections only. Native Sidian was not verified. Course teaching changes and configured-provider acceptance require their own evidence.
