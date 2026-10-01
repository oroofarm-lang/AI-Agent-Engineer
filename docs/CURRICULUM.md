# Curriculum contribution guide

## Authority and current scope

Read `../MASTER_SPEC.md` and `master-curriculum-spec.md` before editing. Curriculum content is data, never embedded in a React component. Version `1.0.0` begins with all 80 source-derived outlines and one published lesson. The source-derived English outlines remain visible while authored Hebrew lessons are developed. No generated outline should be presented as a complete course day.

## Publish a lesson

1. Find its existing stable ID in `content/curriculum/curriculum.json`. Never rename an ID because its display title changes.
2. Author `content/curriculum/lessons/<ID>.md` in Hebrew. Use exactly these H2 headings, in order: Mission, Build First, Concepts, Mental Model, Deep Dive, Failure Lab, Challenge, Mastery Check, Documentation, Engineering Notes.
3. Provide substantive teaching, a runnable build, diagnostic failure experiments, an independent challenge and practical evidence criteria. Optional depth may be advanced; ordinary daily effort must not exceed 240 minutes.
4. Link skill IDs, prerequisite lesson IDs and source IDs. Primary sources are preferred. Use fenced code blocks; the renderer provides LTR display and copying. Raw HTML and executable MDX are not supported.
5. Set publicationStatus to published only when the lesson is usable. Planned lessons cannot receive progress. Version 2.0.0 explicitly expands to 139 units after user approval; retain the original 80 stable IDs and optional legacy day/week positions. Every unit belongs to exactly one topic module.
6. Run the content checker and tests, inspect the page, and release with an appropriate new curriculum version. Do not change an already registered metadata manifest in place.

## Skills and dependency edges

`skills.json` defines stable skill IDs, domain, label, description and prerequisite IDs. Add a node before referencing it. Use prerequisite edges for actual learning dependencies, not broad topical similarity. Validate both skill and lesson graphs as acyclic. Progress records refer to stable lesson IDs; future assessment records refer to stable skill and rubric IDs. A title edit must not reset progress.

The first catalog uses week-level skill mappings. Refine them at lesson level as lessons are authored; this initial mapping is not a completed assessment rubric.

## Projects and Boss Levels (phase 2)

Project entities, briefs, rubric schemas and starter folders are proposed in ARCHITECTURE.md but have not been materialized yet. Add those contracts and validators alongside the feature. Require stable project and assessment IDs, business context, requirements, acceptance criteria, test checklist, architecture/reflection prompts and relevant skill/lesson references. Starter code provides interfaces, empty functions and tests, not solved projects. Boss Levels cannot be automatically skipped.

## Technology-sensitive sources

`sources.json` stores source metadata. Each source stores stable ID, title, HTTPS URL, type, vendor, related lesson IDs, technology IDs and nullable lastVerified. A source link alone does not mean verification. Keep lastVerified null until someone has checked what is taught against the source and recorded a rationale. A baseline/release date is not a verification date.

The full technology registry and audited evidence storage are phase 4 work. Until then, update references manually through a reviewed content change and record the reason. Foundation content should not change in response to vendor marketing. The UI explicitly states that freshness has not been audited.

## Version releases and progress

- Initial curriculum version: `1.0.0`; baseline: September 2026.
- Change curriculum version and affected lesson versions for a release; record releaseDate, minimumMigrationVersion, majorChanges and `changelog.json`.
- Preserve stable IDs and old learner rows. `npm run db:setup` registers the new metadata manifest and never overwrites earlier progress versions.
- Applied SQL migrations are immutable. Create a new migration file for schema changes.
- Setup rejects in-place changes to a registered manifest. From 1.1.0 this includes published Markdown body hashes and rubric definitions. Approval-bound proposals, supplements and transactional release rollback remain phase 4 work; the setup check is not a complete release-management system.
- Never delete a database to fix a version mismatch. Restore the prior manifest or intentionally publish a new version.

## Validation

```bash
npm run curriculum:check
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

The checker validates 139 units, the preserved 80 day records, 14 modules and 16 legacy weeks, ID/day/week alignment, required sections, uniqueness, skill/source references and dependency cycles. Future project/technology/assessment schemas need corresponding reference checks as they ship.

## Practical rubrics (available from 1.1.0)

`assessments.json` contains strict assessment records: stable ID, published lesson ID, rubric semantic version, title, instructions, and uniquely identified criteria. Each criterion names a skill already linked to its lesson, a practical prompt and an evidence hint. One rubric per lesson is currently supported. Validate with the curriculum checker. Rubric edits require a rubric version and curriculum release bump. Every submitted attempt stores the original rubric, so later edits cannot change its interpretation.

Evidence submissions do not grant mastery. They require build completion and exact current version tokens; a rejected or stale submission must preserve the learner's typed text. Do not add automatic scoring based on answer length or keywords. A future grading workflow must assess the practical evidence.

From 1.1.0, setup also hashes published lesson bodies and rubric data as part of the registered manifest. Preserve prior content snapshots; do not change an already registered release in place. Approval-bound application/rollback is still not implemented.

## Topic extension and workbook availability (2.0.0)

See `CONTENT_QA.md` for the approved scope and actual depth. `contentStage` distinguishes a guided lesson from a compact practice workbook. `verification` separates Hebrew review, source audit and local execution. Publication is availability, not a certificate of technical verification. Record a command only after running it. The module dependency graph, lesson graph, complete module membership, stable IDs and rubric references are validated. All units have evidence rubrics; mastery remains ungraded.
