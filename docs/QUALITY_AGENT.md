# Recurring UX and Hebrew quality review

## Repeatable checks

`npm run quality:inventory` extracts every published lesson and chapter, plus
Hebrew JSX text, source strings, and template fragments with file/line locations.
Schema 2 also collects Hebrew strings and JSON paths from the five public curriculum manifests, public agent registry and shipped system-question catalog, including assessment prompts, skill descriptions, specialist instructions and practice feedback. The inventory is `.data/quality/public-copy.json`. It contains source-authored
copy only: never read `.env.local`, account data, private notes, or conversations
for a linguistic review.

`npm run quality:audit` generates that inventory and runs the full verification
gate. This includes the browser audit that unlocks the foundation through real
test-account UI actions, opens all published lessons in continuous reading,
checks rendered headings, overflow, and axe accessibility/contrast rules.
Other browser journeys cover numbered navigation, automatic advance, scroll
and focus, responsive layouts, consent, authentication and progress persistence.
Tests run with isolated databases and no paid API keys. GitHub Actions runs the
verification gate on pushes, pull requests, or manual dispatch.

## AI reviewer

The ACTIVE Codex heartbeat `ux` ("בדיקת UX ועברית של הקורס"), created on 2026-10-01, is currently scheduled weekly on Sunday at 09:00 in the local scheduler (configuration checked on 2026-10-03). Its first scheduled review started on 2026-10-02. It reviews source-authored copy against
`content/authoring/HEBREW_STYLE_GUIDE.md`. The reviewer reads changed copy in
full, reviews UI instructions/buttons and their actual behavior, identifies
unexplained jargon, unnatural Hebrew, unclear referents, misleading claims, and
inconsistent tone. Its first run establishes full-course language coverage;
later runs compare file hashes and re-review changed copy while rotating
through unchanged chapters.

For each finding, report file/line, exact original wording, suggested rewrite,
and reason. Save dated reports and reviewed hashes under `.data/quality`.
When appropriate, save non-personal actionable findings in
`docs/quality-reports` for review. Never report a lesson as reviewed unless its
body was actually read; explicitly report remaining coverage if a run ends.
Apply reversible UI-copy corrections and rerun relevant checks. Released
lesson edits require a new staged version, review, integrity validation and
preservation of prior content and learner progress. Meaningful teaching or
architecture changes require human review.

The schedule uses the Codex account's model; no additional external API key is
required for this workflow. It requires the local Codex scheduler and workspace
to be available. It is not a deployed production service. Report changes,
failures, or required user action; stay quiet when nothing actionable changed.
The in-app Mentor is a separate OpenAI integration with separate credentials.

## Evidence and limits

Inventory generation is not AI proofreading. AI proofreading is judgment, not
a guarantee that every Hebrew phrase is correct. A passing axe audit is not a
full WCAG certification or a human screen-reader test. Report actual commands,
results, coverage, and limitations. Do not claim SMTP delivery or paid model
execution without evidence. These constraints keep the quality agent honest.
