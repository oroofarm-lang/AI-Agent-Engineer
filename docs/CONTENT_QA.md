# Curriculum 2.0.0 — content and verification contract

## Approved scope

The user requested a practical AI implementation and services curriculum extending the original 80-day agent-engineering course. Version 2.0.0 preserves those 80 stable IDs and adds 59 specialization units in 14 topic modules. Original 16-week metadata remains a compatibility view, not a promise that the expanded course fits into 16 weeks. `docs/master-curriculum-spec.md` remains the original pedagogical baseline. This dated addendum records the user-authorized extension.

All units retain Build → Understand → Break → Debug → Rebuild → Prove and the ten required lesson sections. Topic order is independent of original day numbers. Original `/learn/W…` URLs continue to navigate by day; topic links pass `?module=<ID>` and navigate within that module. Foreign module IDs are ignored. Requirements are learning recommendations, not artificial content locks.

## Actual content depth

- Day 1 is a guided lesson with installation steps and a provider SDK example.
- The other 138 units are **practical workbooks**, with a unique mission, technical explanation, build task, failure experiment, independent challenge, primary references and evidence rubric. Core units have additional beginner explanations; four include runnable local Python examples. Module study notes provide wider context.
- These compact workbooks are available for learning; they are **not 138 fully developed beginner tutorials or solved production projects**. Some require independent documentation study. Further step-by-step instruction, datasets and project starter interfaces should be added incrementally.
- Projects and Boss units intentionally provide contracts and evidence requirements rather than finished solutions. The application stores submitted evidence and never grants mastery based on text length or reading completion.

## What verification means

`publicationStatus=published` means the body is available and usable as a workbook. `contentStage` distinguishes guided instruction from a practice workbook. Neither implies certified correctness.

`verification.hebrewReviewedAt` records the language reviewer’s actual pass. The reviewer read all unique lesson packets, reviewed the shared prose, checked compiled files against their reviewed packets, separately read Day 1, reviewed core-depth additions and topic notes, and reviewed UI copy. This is a language review, **not a technical endorsement**. See `content/authoring/hebrew-review.md`.

`verification.execution=local-tested` applies only to the exact local examples in days 2, 3, 4 and 13. The reproducible suite covers routing validation, UTF-8 round trips, preservation of corrupt data, local HTTP responses, tool allowlists, observations and bounded loops. The scripted model is a test double and is explicitly labeled. Provider adapters and external accounts were not exercised.

`lastVerified` and `verification.sourcesCheckedAt` remain null where a complete technical claim-by-claim audit has not been performed. Primary documents were consulted during research and authoring; links alone are not a full audit. Do not replace these nulls with the release date. Do not call paid API examples tested without an actual recorded execution.

No blanket “100% verified” or outcome guarantee is appropriate. Business cases, thresholds and numerical examples are course exercises, not observed client results, vendor guarantees or market-price claims. Availability, licensing, account permissions, model support and current prices require checks in the learner's environment.

## Authoring and review

- `content/authoring/legacy-lessons.tsv`: original days 2–80, six reviewed fields per row.
- `content/authoring/specializations.tsv`: 59 additional units.
- `content/authoring/depth.json`: detailed foundational explanations.
- `content/authoring/topic-handbooks.json`: module study notes.
- `compile-course.py` and `finalize-course.py`: pre-release authoring utilities; never runtime generators or technical validators. Generated prose must be reviewed before release. They are not commands to casually rerun against a registered version.
- `content/curriculum`: released, source-controlled catalog, Markdown bodies, skills, references and rubrics. The application reads these files, not authoring templates.

Any edit after registration must bump the content release version, including prose corrections. Preserve earlier snapshots and learner records. Use `npm run db:setup` to register the final reviewed release; never delete the learner database to work around a mismatch.

## Reproduce verification

```bash
npm run curriculum:check
npm run check
npm run test:labs
npm run build
npm run test:e2e
```

Python 3.12+ is needed for the laboratory checks. No paid API credentials are needed. The HTTP lab binds only to loopback. E2E runs against a unique test database on port 3100; it does not overwrite the learner database. `npm run verify` and CI include all checks above.

## Laboratory data

`public/course-data/v1` contains explicitly synthetic business data, ten products, requests, document versions, a hostile test document, CSV import duplicates, campaign arithmetic cases and a call script. The lesson UI provides downloads and a README with expectations. None are real customers, real campaign results or market prices. Assets use their own versioned path and should remain immutable once learners use them. The Hebrew reviewer reviewed the new asset copy in round 5.
