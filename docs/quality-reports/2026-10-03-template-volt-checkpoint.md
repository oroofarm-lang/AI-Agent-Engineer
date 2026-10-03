# Assignment definitions and complete public Volt links — 2026-10-03

The public graph now includes all 418 exact-bound assessment criterion definitions: 403 Markdown definitions and 15 authored table structures. Each connects reciprocally to its actual lesson, exercise, rubric, evaluation key, skill, sources, relevant specialists and the implemented schema/format code. The full graph, all 14 chapter maps and relevant specialist maps reflect these relationships. No filled learner documents, private submissions, review decisions or account data enter the exporter.

## Implemented scope

The versioned catalog, bounded strict document schemas, exact rubric coverage validator, meaningful-content checks and deterministic JSON/CSV/Markdown formats are implemented and tested. CSV export neutralizes spreadsheet formula prefixes; JSON preserves original values. Empty starter rows and headings cannot qualify as completed work. The production build validates this catalog. The export manifest and status now independently bind course, published question bank and template definitions, with the existing protected write/reconciliation behavior. Course-body updates can reuse definitions only when every criterion binding remains exact.

This is the structural foundation described in [workspace architecture](../INTERACTIVE_TEMPLATES.md). Learner table/Markdown editors, owned autosave, one-click template submission, PDF export and template Mentor state remain separate unfinished phases. No template UI capability is claimed from a public definition file. Released lesson bodies, rubric requirements and learner progress were not changed. The actual 139-question teaching draft remains unapproved.

## Executed verification

An initial full quality run passed lint/type checking and 184 cases but timed out on one 30-second filesystem integration journey; it did not pass. That journey performs three full protected exports (initial, reviewed activation, rollback retry) of the expanded graph. Only its per-case budget changed to 60 seconds, matching the adjacent publication-race case; the isolated journey then passed in 31.90 seconds. All assertions, edited-note protection and history checks remain intact.

The final `npm run quality:audit` completed with exit code 0: lint, type checking, all 185 unit/integration cases in 28 files, 18 Python labs, curriculum/template validation, production build, 39 private-file trace checks and all 29 isolated Chromium journeys. The browser suite inspected all 139 published lesson screens and exercised actual review/publication/rollback, persistence, account isolation, foundation gates, navigation/scrolling, responsiveness, keyboard behavior and automated accessibility rules. This is not a blanket WCAG certification or paid provider execution.

Actual `npm run vault:sync` changed 1,262 of 1,650 generated targets. A repeat after native Canvas inspection changed zero files and no manifest. The current root graph contains 1,459 file nodes and 15,362 unique edges; all those edges have reciprocal wikilinks. All 1,805 retained public file hashes matched. All 37 Canvas file paths/endpoints and 61,807 wikilink occurrences in the current root graph's notes resolved. Older non-projection guide links and personal notebooks were not traversed. Exact results are retained privately in `.data/quality/volt-templates-final-2026-10-03.json`.

The public overview, updated CORE chapter map and full graph were opened in native Obsidian 1.13.7. The overview provides the readable five-section entry point; full/chapter maps are dense and require zooming. Native Sidian acceptance remains unverified. Personal preferences and notes were retained.

## Hebrew review scope

The independent reviewer read all new unique guidance, 85 table column labels and 15 nonempty public starter strings. The complete final exporter helper (137 lines) and status component (117 lines) were read; only the documented new asset/map-label sections of the main exporter were read. Table guidance now distinguishes actual results from expected results and planned checks, and the database Transaction column is explicit. The helper received a complete final follow-up after row-count and Markdown wording corrections (SHA-256 `500d73a4c7316650352bdb30767727db56e00b3685c7302a67841219cf42da26`); no further practical linguistic finding was reported. Exact hashes and partial scopes are stored in `.data/quality/template-copy-2026-10-03.json`. Existing copied assessment prompts/hints and all 139 lesson bodies were not reread in this checkpoint. Language review is not technical or teaching approval.

The broader goal remains active: owned interactive editors/submissions, real configured-provider acceptance, human teaching publication and hosting each need their own evidence.
