# Git backup

The configured remote is `https://github.com/oroofarm-lang/AI-Agent-Engineer.git`.

This source checkpoint includes the application, curriculum release 2.1.0,
authoring drafts, tests, deployment instructions, and generated Obsidian course
notes in `Volt`. Drafts in `content/authoring/guided-lessons` are not published
lessons. The interactive diagram renderer is prepared but not yet connected to
the published curriculum.

Local environment files, authentication secrets, SQLite databases, personal
Obsidian notes, attachments, dependencies, build output, and test traces are
excluded by `.gitignore`. A Git source backup does not replace a separate,
private database backup. Secrets must be configured locally after cloning.

Validation on 2026-10-01: lint, TypeScript, 51 unit tests, 15 Python lab tests,
curriculum integrity, production build, and all 17 Playwright tests passed.
The generated course notes contain no broken Obsidian links.

The repository was public when first inspected. Upload is pending either a
change to private visibility (the user's original preference) or explicit
approval to publish this source checkpoint publicly.

After a remote backup is established, create subsequent source checkpoints
with `git add` and `git commit`, then use `git push`. Inspect staged files before
each commit. Do not commit `.env.local` or `.data`.
