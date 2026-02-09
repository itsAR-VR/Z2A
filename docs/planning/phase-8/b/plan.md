# Phase 8b — Speakers Simplification (LinkedIn-Only Cards)

## Focus
Make the Speakers section simpler: remove the dialog, remove bullet lists/details, remove the award plaque, and link cards directly to each speaker's LinkedIn.

## Inputs
- Root plan: `docs/planning/phase-8/plan.md`
- Current speakers implementation: `src/components/sections/Speakers.tsx`
  - Speaker type: lines 11–26 (includes `highlights`, `details`, `links`, `awardPlaqueSrc`, `linkedinUrl`)
  - Speaker data: lines 28–82 (two entries, both have `linkedinUrl`)
  - Card rendering: lines 284–349 (`<button>` with `onClick`, highlights bullet list, badges)
  - Dialog state: lines 85–93 (`activeSpeaker`, `dialogIds`, `titleId`, `descId`, `dialogTitle`, `close`)
  - Dialog body: lines 95–265 (`useMemo` with full speaker detail rendering including plaque)
  - Dialog component: lines 353–374 (shared `<Dialog>` usage)
- Existing E2E coverage: `z2a/speakers.spec.ts`
- Also check: `z2a/landing.spec.ts` for any speaker dialog assertions
- Speaker assets in `public/speakers/*` (headshots: `aadil-headshot.jpg`, `abdur-headshot.jpg`; also: `cold2close-logo.svg`, `openai-award-plaque.jpeg`).

## Work
1. **Convert speaker cards from `<button>` to `<a>`**
   - Replace the `<button type="button" onClick={() => setActiveSpeaker(speaker)}>` (line 286–289) with `<a href={speaker.linkedinUrl} target="_blank" rel="noreferrer">`.
   - Update `aria-haspopup="dialog"` → remove (it's a link now).
   - Update `aria-label` from "View {name} details" to "View {name} on LinkedIn" (or similar).
   - Keep the same visual card styling (border, shadow, hover transform).
   - Replace the chevron icon (right arrow, lines 308–323) with an external-link icon to signal "opens in new tab."
2. **Remove highlights bullet list from cards**
   - Remove the `<ul>` rendering highlights (lines 326–336).
   - Keep the speaker bio as a 1-line summary on the card: add `<p>{speaker.bio}</p>` after role text.
3. **Keep badge pills**
   - Preserve the `<div className="flex flex-wrap gap-2">` badge row (lines 338–347).
4. **Remove all dialog-related code**
   - Remove imports: `useCallback`, `useId`, `useMemo`, `useState` (if no longer used), `Image` (only used for plaque), `Dialog`.
   - Remove state: `activeSpeaker`, `dialogIds`, `titleId`, `descId`, `open`, `close`, `dialogTitle`, `dialogBody`.
   - Remove the `<Dialog>` component block (lines 353–374).
   - Remove the `dialogBody` `useMemo` (lines 95–265).
5. **Simplify the Speaker type and data**
   - Remove unused type fields: `highlights`, `details`, `links`, `awardPlaqueSrc`, `awardPlaqueAlt`, `companyLogoSrc`, `companyLogoAlt`.
   - Remove corresponding data from the speaker objects (keep: `name`, `role`, `bio`, `badges`, `initials`, `headshotSrc`, `linkedinUrl`).
   - Make `linkedinUrl` required (not optional) since all speakers have it and it's now the primary action.
6. **Decide on speaker assets**
   - Headshots (`aadil-headshot.jpg`, `abdur-headshot.jpg`) — **keep** (still used in cards via `SpeakerAvatar`).
   - Award plaque (`openai-award-plaque.jpeg`) — **remove reference from code**. Optionally delete the file or leave it (no code references it after cleanup).
   - Company logo (`cold2close-logo.svg`) — **remove reference from code** (only shown in dialog).
7. **Update tests**
   - In `z2a/speakers.spec.ts`:
     - Remove dialog-opening assertions (click card → dialog visible → close).
     - Add: assert each speaker card is an `<a>` with `href` matching the LinkedIn URL.
     - Add: assert each card has `target="_blank"`.
     - Add regression: assert no dialog is present in the DOM (no `role="dialog"` in speakers section).
     - Add regression: assert award plaque image is absent.
   - In `z2a/landing.spec.ts`:
     - Check if any speaker dialog assertions exist. If so, remove them.
8. **Smoke test**
   - `npm run lint && npm run typecheck && npm run build`
   - `npm run test:e2e` (speakers + landing subset)

## Validation (RED TEAM)
- `git grep "activeSpeaker"` returns zero results in `Speakers.tsx`.
- `git grep "Dialog"` returns zero results in `Speakers.tsx`.
- `git grep "awardPlaque"` returns zero results in `src/`.
- Speaker cards render as `<a>` tags (verify in browser or test output).
- Each `<a>` has correct `href` (LinkedIn URLs) and `target="_blank"`.
- `npm run lint` — no unused imports/variables.
- `npm run test:e2e` — speakers + landing specs pass.

## Output
Speakers section has no dialog and no plaque; cards are simple LinkedIn-linked cards with bio + badges; tests updated. Playwright execution is blocked in this environment due to missing Playwright browsers.

## Handoff
- Proceed to Phase 8c to collapse Pricing to a single plan and relocate hero trust cues into Pricing copy.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Replaced speaker dialogs with outbound LinkedIn cards (anchors).
  - Removed bullet highlights, details blocks, external links, and award plaque rendering.
  - Updated `z2a/speakers.spec.ts` to assert LinkedIn links and absence of removed content.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - Playwright browsers are not installed and cannot be downloaded in this sandbox → run `npx playwright install` locally and rerun `npm run test:e2e:prod`.
- Next concrete steps:
  - Execute Phase 8c (Pricing single plan + trust cues + apply code copy).
