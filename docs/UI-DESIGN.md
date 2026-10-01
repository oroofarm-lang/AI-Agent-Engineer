# Neon learning workspace

The user's explicit redesign request supersedes the earlier subdued visual direction. The existing Hebrew/RTL curriculum, server actions and learner records are preserved.

## Layout and visuals

Next.js client navigation keeps dashboard, lesson canvas, syllabus and existing learning features in the same application shell. A shared header shows profile access, actual streak/XP and native accessible course progress. `neon.css` layers violet (#8A2BE2), cyan (#00F5FF) and green (#00FF66) over #0A0A0C with translucent cards, gradients, blurred backdrops and subtle hover glow. System sans-serif fonts keep the app offline-compatible.

The dashboard centers the next lesson with a dimensional companion, actual learning metrics and a selectable node path. Week selection covers the 80-day catalog. Green means the build milestone is recorded, cyan means available content, and locked nodes disclose planned content with an outline link. No lesson or prerequisite is silently unlocked by visual feedback.

## Interaction boundaries

- `LessonCanvas`: controlled previous/next navigation, direct step selection, read-through mode and session-local card acknowledgement/confetti. Acknowledgements do not change database progress, XP or mastery. Long Markdown is split at paragraph boundaries without breaking code fences.
- `TemperaturePlayground`: local softmax demonstration over four fixed candidate scores, temperature slider and probabilistic sampling. Explicitly labeled as a simulation without AI calls. No model API or generated claims.
- `AiMascot`: CSS 3D-style fallback with pointer eye tracking, a wave toggle and happy state after card acknowledgement. The optional `scene` ReactNode and `data-spline-slot` mark the Spline/WebGL integration point. No Spline scene, remote model or WebGL dependency is currently loaded. Any eventual third-party scene needs separate performance and privacy review.
- `learningActivity`: 100 XP per unique recorded build; streak uses consecutive build dates in Asia/Jerusalem and remains live through the next day. Multiple builds on one day do not multiply streak length. XP is practice feedback, not mastery evidence.

## Accessibility and responsive behavior

Semantic buttons, native range/select/progress controls, named navigation and status regions. Keyboard navigation is preserved and changing a card focuses its new heading. Reduced-motion preference disables confetti, idle animation and eye tracking. Narrow viewports use a horizontally scrollable navigation bar, stacked hero/canvas, compact metrics and a responsive node map. Reading/code remain RTL/LTR as appropriate.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: 30 tests passed, including calendar rewards, probability normalization and code-fence preservation.
- `npm run build`: production build and curriculum integrity validation passed.
- `npm run test:e2e`: 8 browser scenarios cover original learning flows plus cards, slider/sampling, acknowledgement isolation, map/week controls, mobile fit and reduced motion.
- Desktop screenshots are captured under `docs/screenshots` by the browser suite. They use the isolated E2E learner, never the personal database.

## Arcade revision — September 30, 2026

The latest user direction replaces the glass/neon appearance with a retro arcade skin. `src/app/arcade.css` is the presentation layer over existing responsive layout rules: #0E0F12 background, #1A1C23 cards, crisp 2px outlines, hard offset shadows, cyan/pink/yellow/lime accents, stepped mascot animation, terminal mixer and orthogonal level paths. VT323 is locally bundled from `@fontsource/vt323` (OFL); Hebrew body copy uses the system sans-serif fallback. No external font requests are needed.

The HUD zero-pads actual XP as SCORE and shows a seven-segment streak meter (visual segments capped at seven; numeric streak remains exact). Course completion retains its existing distinction from build completion. The pixel companion keeps eye tracking, greeting and acknowledgement reactions; it does not grade answers. Confetti remains session-local. No audio is played. Scanlines are confined to the decorative robot display, and the brief hover glitch affects the heading marker rather than reading content. Reduced-motion settings disable animation.

The foundation for engineering journals/failures was saved before the visual redirection: migration 0003, validated repositories, revision guards and failure-test snapshots. These are not yet exposed as user workflows and remain marked planned in navigation. Export schema 3 includes these tables. The next functional milestone is their forms and list/detail views.

Validation for this revision: 32 unit/integration tests; existing 8 E2E scenarios reused for navigation, lessons, persistence, sampling, map selection and mobile/reduced motion. Arcade screenshots are generated in `docs/screenshots/arcade-*.png` using the isolated test learner.

## Cream monitor palette

The user requested a light cream revision. `cream.css` overrides presentation tokens and legacy dark surfaces with warm #F3EEDF paper, #FFFAF0 cards, dark ink, beige hard shadows and muted teal/rose/ochre accents. Native controls use `color-scheme: light`. The companion has a beige monitor casing with a small green phosphor screen; the application, lesson console, code blocks, forms, navigation and dialogs use light surfaces. Arcade layout and interactions are unchanged.
