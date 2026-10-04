# Gmail setup and editor refinement — 2026-10-04

User selected Gmail for transactional account email. Added `mail:setup:gmail`
interactive setup with hidden input, 16-character app-password validation,
competing SMTP_URL removal and preservation of unrelated .env.local settings.
The CLI writes atomically with mode 0600; it neither sends mail nor reads an
inbox. The coding agent did not run it against real private configuration.
Synthetic PTY validation initially exposed prompt-before-raw-mode echo; moving
raw-mode activation before the password prompt fixed it. The repeated synthetic
PTY check passed, including no password echo and file permissions 0600.
No live Google authentication or inbox delivery is claimed.

Markdown formatting now catches an over-limit transformation and retains the
entire existing value with a clear status message. Removed the approximate
11,980-character blanket button cutoff. Ctrl/Meta+B and Ctrl/Meta+I operate on
the current selection; composition and conflicting modifier shortcuts remain
untouched. Browser test verifies multiline overflow preservation, emphasis
preview, actual save acknowledgement and recovery after reload.

Validation: lint and TypeScript passed; 7 focused unit tests passed; production
build and 40 privacy traces passed. Initial browser stress fixture timed out
using 5,500 short lines; replacement still exceeds the format limit using 1,460
longer lines, and explicitly opens the preview. The rerun passed in 13 seconds.
Public Volt sync changed one known editor snapshot and its public manifest.
No lesson release, account progress or private notebook was changed.
