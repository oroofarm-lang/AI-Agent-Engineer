# Git backup

Repository: `https://github.com/oroofarm-lang/AI-Agent-Engineer`.

The configured Git remote is
`git@github.com:oroofarm-lang/AI-Agent-Engineer.git`. SSH authentication already
available on this machine was verified before uploading.

This source checkpoint includes the application, curriculum release 2.2.0,
prior release snapshots, authoring drafts, tests, deployment instructions,
quality-review reports and generated Obsidian course notes in `Volt`.
FND_01 and Python I now include published guided instruction and interactive
diagrams. Other authoring drafts are not automatically published lessons.

Local environment files, authentication secrets, SQLite databases, personal
Obsidian notes, attachments, dependencies, build output, and test traces are
excluded by `.gitignore`. A Git source backup does not replace a separate,
private database backup. Secrets must be configured locally after cloning.

Validation on 2026-10-01: `npm run quality:audit` passed: inventory generation,
lint, TypeScript, 54 unit tests, 18 Python lab tests, curriculum integrity,
production build, and all 20 Playwright tests. The browser audit includes all
139 published lessons and the mandatory foundation unlock.
The generated course notes contain no broken Obsidian links.

The user explicitly approved uploading the source checkpoint to this public
repository on 2026-10-01. HTTPS Git authentication was unavailable, so the
backup uses the existing authenticated SSH connection. No new credentials
were created or read. The backup includes local source commit history.

After a remote backup is established, create subsequent source checkpoints
with `git add` and `git commit`, then use `git push`. Inspect staged files before
each commit. Do not commit `.env.local` or `.data`.
