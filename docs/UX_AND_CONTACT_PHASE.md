# Foundation, contacts, and recurring quality review

## Scope and implementation order

1. Keep Better Auth and the existing SQLite database as the local-first identity
   and progress store. Name, email, and progress already belong to the account.
   Add an optional, separate opt-in for course updates in account settings.
2. Store immutable consent events (`id`, `user_id`, `enabled`, `policy_version`,
   `recorded_at`) in migration 0008. No opt-in exists unless explicitly selected.
   Withdrawal immediately removes a verified address from the exportable list.
   Only a verified, allowlisted administrator may export contacts as CSV.
3. Enforce the mandatory CORE chapter on the server for every current lesson.
   Keep previous progress and evidence intact; accessing advanced lessons waits
   for completion of the foundation exercises. Build completion is self-reported
   practice, not a certification of mastery.
4. Publish improved foundation teaching as release 2.2.0. Preserve 2.1.0 and
   stable IDs. Render validated `learning-flow` diagrams as keyboard-accessible,
   learner-paced illustrations. No simulated model calls or automatic grading.
5. Keep system implementation details in operator screens and documentation.
6. Create a repeatable public-copy inventory and UX/Hebrew audit workflow. The
   scheduled Codex reviewer examines course/UI copy and runs actual checks,
   using the Hebrew style guide. It suggests substantive teaching changes;
   released content is never edited silently. Notify only actionable changes.

## Files and contracts

- `src/lib/db/contact-consent.ts`: append-only, account-scoped consent history.
- `src/app/settings/consent-actions.ts`: authenticated consent mutation.
- `src/components/contact-consent.tsx`: optional checkbox and save feedback.
- `src/app/api/admin/contacts/route.ts`: authorized, formula-safe CSV export.
- `scripts/quality-inventory.mjs`: deterministic inventory of public copy;
  excludes account data, secrets, and personal notes.
- `docs/QUALITY_AGENT.md`: scope, evidence requirements, language policy,
  scheduled operation, and technical limitations.

The database satisfies contact retention without an external marketing service.
CSV can be imported into a provider later. This phase sends no marketing mail.
SMTP remains separately required for public account verification. No external
AI credentials are needed for the scheduled Codex review; the in-app Mentor
still requires its documented OpenAI configuration.

## Verification

Consent tests cover default-off, idempotency, withdrawal, verified-address
filtering, authorization, export, and deletion. Foundation tests cover direct
access and mutations with previously started advanced progress preserved.
Diagram tests cover schema validation and keyboard interaction. Run lint,
types, unit tests, Python labs, production build, and relevant/full Playwright
journeys before publishing the release. Back up the real database before
migration and preserve all existing learner rows.
