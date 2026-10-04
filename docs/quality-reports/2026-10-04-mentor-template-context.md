# Mentor template context review — 2026-10-04

Saved template counts now accompany Mentor requests without answer text. Sending
answer text requires explicit opt-in to one template ID, definition hash and
saved revision. The server resolves the document from the authenticated owner's
repository, verifies lesson and assessment criterion, rejects stale versions,
and limits included Markdown to 8,000 characters with truncation metadata.
The client sends references, never the filled document. Reopening clears consent.
Routing receives counts only; selected content is restricted to agents permitted
to use evidence.read. Counts are not execution, grading or submission evidence.
Completed request replay returns the original answer even if the draft changes.
Frozen rubric snapshots without matching template definitions return an explicit
unavailable state rather than inferred progress.

Hebrew review read mentor-info.tsx in full (389 lines, prior source SHA256
b08ccfc806ef92ab9a879c036033985b6f01fb2a7c227f54842e828116babe12).
Its final agent turn failed on an account usage limit after reporting findings;
this is not a claim of completed whole-course proofreading.

Applied reversible copy findings:

- Original: “מצב מילוי התבניות מצורף ללא תוכן התשובות. מתחילים ברמז, ובוחרים כמה עזרה לקבל.”
  Added: “תוכן הטיוטה מצורף רק אם תבחר בכך.” This distinguishes counts from consented text.
- Original: “מצורפת רק הגרסה השמורה שנבחרה, ללא שינויים שטרם נשמרו.”
  Rewrite: “אם תבחר לצרף את הטיוטה, תישלח רק הגרסה השמורה שבחרת, ללא שינויים שטרם נשמרו.”
  The conditional avoids suggesting an unchecked option has already sent data.

No published lesson text was edited. No live model output or email delivery is
claimed. Service tests use synthetic in-memory owners and model doubles;
browser tests mock AI responses only and use the actual isolated draft server.

## Final validation checkpoint

`npm run quality:audit` completed lint, TypeScript, all 214 unit tests,
18 Python lab tests and the production build with 40 privacy traces. Its
browser run passed 35 journeys; the new consent test failed because it wrongly
expected an empty-message submit button to stay enabled after sending.
Corrected that test assertion to observe the acknowledgement. The focused
rerun passed (1 journey, 6.8 seconds), with lint and TypeScript rerun passed.
Thus all 36 browser journeys passed across the full run and focused rerun;
the original aggregate command exited with that test assertion failure.
No live provider calls were made by these tests.

Public Volt sync added three actual implementation assets and linked all 418
workspaces to the Mentor context contracts. The known-public-file verifier
checked 1,818 retained files, 37 Canvases, 1,472 current file nodes, 20,944
reciprocal root edges and 84,135 wikilink occurrences: zero errors. Repeat sync
changed zero files. Native Sidian rendering remains unverified.
