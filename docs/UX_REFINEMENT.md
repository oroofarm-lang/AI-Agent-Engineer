# Refinement contract — 2026-10-02

Authority: MASTER_SPEC.md and the user's five-part refinement objective. Keep the
cream arcade theme, Hebrew RTL, authenticated tenant boundaries, existing stable
curriculum IDs, immutable releases and progress. No curriculum rewrite is needed.

## Architecture and schemas

Extend the existing Next.js/React/TypeScript/Better Auth/Drizzle/SQLite monolith.
Practical rubric criteria remain the curriculum source; a client wizard presents
one criterion at a time with numbered navigation and completeness feedback. An
optional reinforcement question distinguishes submission from proven mastery.
Completeness checks never claim to grade correctness or run code.

`src/components/assessment/` owns file selection, question navigation and portfolio
preview; `src/lib/domain/artifacts.ts` owns shared limits and server validation.
Authenticated Server Actions submit answers and actual file bytes atomically.
New migration 0009 stores private artifacts as bounded SQLite BLOBs linked to
immutable assessment attempts. Downloads require the owner or a verified reviewer,
use attachment disposition and never execute uploaded code. Export includes bytes;
account deletion removes child rows. No external object-storage credentials needed.

Portfolio entries reference a user's saved assessment, with title, summary and a
reversible visibility flag. The portfolio is private, shows real review status and
does not publish or certify work. Preview uses the same card as the saved page.

The Journey Map retains server-enforced foundation gating. A full-height responsive
container, explicit foundation banner, icon/text legend and selected-node summary
must work with enlarged text. Byte uses an accessible button over the robot and
a live speech bubble, keyboard activation and reduced-motion-safe feedback.

Mentor stays server-side behind the existing provider interface. Shared client
context reports the active lesson/card/assessment criterion; the server resolves
criterion text from its own catalog and includes actual progress/mastery. Public
knowledge feeds use fixed official release endpoints, bounded retrieval, provenance
and three weekly refresh slots. Feed text is untrusted and cannot alter policy or
silently change lessons. No credentials or paid model responses are fabricated.

The Auditor remains separate: discover/verify/compare/propose/approval/validate/version.
Knowledge refresh adds references for Mentor guidance, never applies a curriculum
release. Released content and prior progress are retained.

## Implementation and verification phases

1. Atomic artifacts, download authorization, export/deletion and portfolio models;
   meaningful repository tests for rollback, isolation, limits and idempotency.
2. Assessment wizard, upload previews/replacement/removal, portfolio page and status;
   browser journeys through real file upload, reload, download and private showcase.
3. Map/Byte/accessibility polish; keyboard, mobile and enlarged-text checks.
4. Contextual Mentor and bounded official feeds; injected provider/network tests,
   missing-key disclosure and three-times-weekly automation configuration.
5. Full lint/types/unit/lab/build/E2E gate, visual review, docs and completion audit.

Exactly one global accessibility trigger remains in RootLayout. Move it to a safe
bottom corner and reserve page space rather than creating a second trigger.

## Acceptance boundaries

- Artifacts: actual private bytes, owner/reviewer downloads, code/image previews,
  PDF metadata preview, replace/remove, atomic submission, quota and rollback tests.
- Portfolio: preview and saved card share a component, opt-in defaults off, visibility
  is reversible. No public publication or automatic mastery claim.
- Map/Byte: foundation banner, current-node summary and CTA, responsive map container,
  keyboard greeting, live bubble, reduced-motion support and one accessibility trigger.
- Mentor: embedded context is server-resolved; answers/files are not silently sent.
  Persona gives expert guidance without claiming omniscience, execution or grading.
  Three official release feeds contain titles/dates/links only. A real manual refresh
  returned nine references from three successful sources on 2026-10-02. No paid model
  generation or complete technical audit of those releases was performed.
- Scheduling: Monday/Wednesday/Friday due slots and on-demand stale-cache refresh are
  implemented. After explicit approval on 2026-10-02, local heartbeat `automation`
  was created ACTIVE for Monday/Wednesday/Friday at 09:00 Asia/Jerusalem. It requires
  the computer and desktop app running; its first scheduled run has not yet been
  observed. Manual GitHub dispatch remains separate.
- Curriculum: release 2.2.0, stable IDs and released teaching content unchanged.

Local database backup and additive migration were explicitly approved and executed.
All pre-existing rows in 22 tables matched the backup under their previous columns.
No private data or backup is included in the public repository.
