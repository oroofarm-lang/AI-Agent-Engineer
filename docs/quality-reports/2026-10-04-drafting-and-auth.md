# Drafting and authentication regression review — 2026-10-04

The assessment form disabled its entire fieldset until the build exercise was
complete. This prevented both real table editing and native file selection.
Draft editing and attachment selection now remain available before completion;
only submission retains the build requirement, also enforced on the server.

Password creation and reset now require 8–128 characters. Login accepts existing
password input without imposing the new-account minimum. Password reset remains
connected to the existing Better Auth one-use token and SMTP adapter. Its link
is visible even without configured mail, with the request button disabled and
an explicit unavailable notice. No successful SMTP delivery is claimed.

Changed UI copy: “השאלות זמינות לקריאה. כדי לענות ולהגיש…” becomes
“אפשר למלא טבלאות, לכתוב תשובות ולבחור קבצים כבר עכשיו. כדי להגיש…”:
the wording distinguishes preparing work from submitting it.

This review covers changed controls and their regression cases. It does not
claim a full linguistic review of the 139 published lessons.

## Executed validation

- Lint and TypeScript checks passed.
- Focused auth and Mentor tests: 5 passed; email transport mocked.
- Production build and privacy trace check passed (40 traces).
- Real Chromium regression: 1 passed, native filechooser selection and saved
  table value recovered after reload on an unbuilt lesson.
- Full unit run: 213 passed, one graph test exceeded its five-second timeout.
  The isolated graph rerun passed all 30 cases with a 20-second limit.
  The full quality gate therefore did not complete in this run.
- SMTP connection verification failed; no successful email sending claimed.
