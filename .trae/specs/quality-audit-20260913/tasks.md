# Mindora Quality Audit · Implementation Tasks

Every task maps one or more Acceptance Criteria from [spec.md](./spec.md). Task statuses are `pending` → `in_progress` → `completed`. Each completed task records passing evidence for every task-local Test Requirement (TR). Status updates are stored in the `Status` field per task. Headings stay stable — no status markers inside headings.

---

## Task 1: Core UI primitives · Button + globals.css audit

**Priority:** high
**Status:** pending
**Coverage:** AC-12, AC-13, AC-14, AC-16, AC-24, AC-26, AC-27, AC-44, AC-45

### Scope of changes
- `components/ui/Button.tsx`: variant shadow-invert, disabled pointer-events remove, loading aria-busy, transition-all → targeted transition, asChild prop resolution.
- `app/globals.css`: remove `overflow-x: hidden` on `<html>` / `<body>`. Tune focus-visible offset. Fix `.scrollbar-none` to apply only on mobile.
- `lib/utils.ts`: remove dead `classNames` alias.

### Task-local TRs

TR-1.1. **rule:** Inspect `Button.tsx` — primary button gains elevation on hover. Grep: `primary.*shadow-glow hover:shadow-soft hover:brightness-110` equivalent present, hover does not remove shadow. Evidence source: components/ui/Button.tsx line inspection after edit.

TR-1.2. **rule:** `Button.tsx` class string contains `disabled:cursor-not-allowed` and does NOT contain `disabled:pointer-events-none`. Evidence: Button.tsx after edit.

TR-1.3. **rule:** `<button>` element in Button.tsx renders `aria-busy={loading}` when loading=true. Evidence: Button.tsx.

TR-1.4. **rule:** Button common classes use `transition-colors transition-transform` (or similar targeted) instead of `transition-all`. Evidence: Button.tsx diff.

TR-1.5. **rule:** `asChild` either removed from the props type signature OR implemented via conditional `React.cloneElement` / Slot-like pattern. Evidence: Button.tsx type + render output match.

TR-1.6. **rule:** `globals.css` `html` and `body` selectors contain NO `overflow-x: hidden`. Evidence: app/globals.css after edit.

TR-1.7. **rule:** Focus-visible `ring-offset-offWhite` is replaced with a simpler `ring-offset-0 ring-2 ring-brightPurple rounded` or conditional pattern that still yields 3:1 contrast on dark backgrounds. Evidence: globals.css.

TR-1.8. **rule:** `.scrollbar-none` in globals.css only applies on mobile (e.g., wrapped in `@media (max-width: 767px)`) or the utility is renamed `.scrollbar-none-mobile` and desktop scroll containers get a visible thin custom scrollbar. Evidence: globals.css.

TR-1.9. **rule:** `lib/utils.ts` exports exactly one `cn` helper function and NO `classNames` duplicate alias. Evidence: lib/utils.ts after edit.

---

## Task 2: Extract shared layout helpers (dedup Navbar/Footer)

**Priority:** high
**Status:** pending
**Coverage:** AC-20, AC-22, AC-47

### Scope
Create a single shared `APP_PATHS` list + `startsWithAppPath()` helper in `constants/index.ts` or `lib/layout.ts`. Navbar and Footer both consume the shared helper. No more duplicated literal arrays.

### Task-local TRs
TR-2.1. **rule:** Grep for `const APP_PATHS =` across the repo returns exactly one hit (shared source); Navbar and Footer import it from shared. Evidence: repo grep.

TR-2.2. **rule:** Grep for `startsWithAppPath(` → the helper definition exists once, used by Navbar and Footer. Evidence: repo grep.

TR-2.3. **rule:** Visiting `/admin` manually in build still hides public Navbar/Footer (as before; regression guard). Evidence: visual confirm or layout logic unchanged.

---

## Task 3: SEO · metadata, JSON-LD, sitemap

**Priority:** medium
**Status:** pending
**Coverage:** AC-29, AC-30, AC-31, AC-32, AC-29 (regression)

### Scope
- `app/layout.tsx`: add OG images, twitter images (via text_to_image endpoint), theme-color meta, apple-touch-icon reference.
- `app/sitemap.ts`: generate sitemap for all marketing routes (/, /features, /how-it-works, /community, /premium, /about, /login, /signup). Exclude /dashboard, /admin.
- `app/page.tsx` OR root layout inject JSON-LD Organization schema on Home only.
- Confirm every route still has metadata.

### TRs
TR-3.1. **rule:** Root layout metadata includes `openGraph.images[0]` with a valid URL, `twitter.images[0]` with a valid URL, `<meta name="theme-color">` is present, `apple-touch-icon` is present. Evidence: app/layout.tsx.

TR-3.2. **rule:** `app/sitemap.ts` exists and exports a default function returning a list including `/`, `/features`, `/how-it-works`, `/community`, `/premium`, `/about`. Evidence: file existence + contents.

TR-3.3. **rule:** Home route (`app/page.tsx` or a Script child injected) renders a `<script type="application/ld+json">` with Organization schema including name, url, logo, description. Evidence: rendered head or component tree.

TR-3.4. **rule:** Dashboard/admin page metadata still disables index/follow robots. Evidence: app/dashboard/page.tsx + app/admin/page.tsx.

---

## Task 4: Accessibility · icon aria-labels / form labels / img alt

**Priority:** high
**Status:** pending
**Coverage:** AC-8, AC-25, plus keyboard-navigation escape for drawers AC-9

### Scope
Audit and add `aria-label` on all icon-only buttons across: Navbar, Footer, DashboardClient sidebar/player/bookmarks, AdminClient sidebar, LoginClient, SignupClient, all marketing pages.

### TRs
TR-4.1. **rule:** A manual text sweep of `components/` finds zero `Button` or `<button>` tags that have only an icon child without either nested text or an explicit `aria-label` attribute. (Dashboard audio play button, bookmarks, hamburger/close, search submit, notification bell, upload icons, etc.) Evidence: grep audit after edits.

TR-4.2. **rule:** All `<form>` inputs have associated `<label>` or `aria-label`. Login email, Signup names, Newsletter email, Audio upload file picker, Affirmation textarea all labeled. Evidence: source inspection of LoginClient/SignupClient/Footer/AdminClient modals.

TR-4.3. **rule:** Every `<img>` has a non-empty `alt` attribute. (Dynamic user avatars: `alt={u.fullName}` is fine.) Evidence: repo grep for `<img ` tags and confirm.

TR-4.4. **rule:** Navbar mobile menu, Dashboard sidebar drawer, Admin sidebar drawer all register an Escape keydown listener that closes them. (AC-9 evidence.)

---

## Task 5: Typography + spacing system sweep

**Priority:** medium
**Status:** pending
**Coverage:** AC-1, AC-3, AC-4, AC-5 (rubric)

### Scope
Grep across all components for pixel-class ad-hoc sizing: `text-[13px]`, `p-[22px]`, `gap-[9px]`, `space-y-[11px]`, `m-[18px]`, `rounded-[19px]`, and replace each with nearest Tailwind scale token (8 px grid).

Apply typography line-height fixes (multi-line body → leading-relaxed; helper text → leading-snug; headings → leading-tight + tracking-tight).

### TRs
TR-5.1. **rule:** Grep `pattern: '\[(?:\d+(?:\.\d+)?)px\]'` across `.tsx` files → zero hits for `p-`, `m-`, `gap-`, `space-`, `text-`, `rounded-` utilities using inline pixel sizes. (Bespoke SVG `width="[120px]"` allowed.) Evidence: grep output.

TR-5.2. **rule:** Multi-line marketing body paragraphs use `leading-relaxed`. Section subheaders use `leading-snug`. H1/H2/H3 use `leading-tight tracking-tight`. Evidence: spot-check HomeClient and FeaturesClient sections.

TR-5.3. **rubric: Spacing cohesion (0–2):**
- `2`: All landing section blocks use a consistent bottom spacing pattern (e.g. `py-16 md:py-20` — multiple of 8), card inner padding is either `p-5` or `p-6`; no 6/10/14 px rogue paddings.
- `1`: 1–2 sections still use ad-hoc padding values clearly off the scale.
- `0`: Multiple sections (> 3) have bespoke spacings.
Pass threshold: ≥ 1. Evidence: visual scan of rendered page + source inspection.

---

## Task 6: Card + button consistency sweep

**Priority:** medium
**Status:** pending
**Coverage:** AC-15, AC-11 (rubric)

### Scope
Unify marketing feature cards across Home/Features/How It Works/Community/Premium/About into two card primitives:
- Content card: `rounded-2xl border border-softLavender bg-offWhite shadow-soft p-5`
- Highlight/premium card: `rounded-3xl border border-primaryPurple/10 bg-gradient-to-br from-offWhite to-softLavender/40 shadow-card p-6`
Also hunt inline hex `style={{ color: '#...' }}` duplicates of palette tokens and replace with Tailwind class.

### TRs
TR-6.1. **rule:** Manual inspection of marketing clients (Home, Features, How It Works, Community, Premium, About) — every card container uses one of the two primitives above or a very close semantic variant; no 5+ different padding/shadow combos. Evidence: source diffs.

TR-6.2. **rubric: Inline hex color cleanup (0–2):**
- `2`: No inline `style={{ color: '#xxxxxx' }}` or `style={{ background: '#xxxxxx' }}` hex colors remain that match existing palette tokens. Only novel colors (chart gradients, AI image URLs) are allowed inline.
- `1`: 1–3 remain.
- `0`: 4+ remain.
Pass threshold: ≥ 1. Evidence: grep after edits.

---

## Task 7: PhoneMockup duplication consolidation

**Priority:** medium
**Status:** pending
**Coverage:** AC-18, AC-19 (rubric)

### Scope
Audit all `HomePhoneScreen`, `HeroHomePhoneScreen`, `AboutHeroDashboard`, `PremiumHeroDashboard`, `HomeDashboardPhoneScreen` and their audio variants inside:
- `components/home/HomeClient.tsx`
- `components/home/FeaturesClient.tsx`
- `components/home/HowItWorksClient.tsx`
- `app/about/page.tsx`
- `app/premium/page.tsx`

Create 1–2 reusable base components (e.g. `DashboardPhoneMockup`, `AudioPhoneMockup`) with props for text/gradient, and replace 80%-duplicate inline sub-components with the shared base.

Also move inline heroes currently in route page files (`about/page.tsx`, `premium/page.tsx`, `community/page.tsx`) under `components/home/` alongside other clients.

### TRs
TR-7.1. **rule:** Files affected no longer contain 100-line inline phone mockups. Grep for `function HomePhoneScreen`/`function HeroHomePhoneScreen` → only 1 or 2 shared definitions remain in a shared component file. Evidence: source layout.

TR-7.2. **rule:** `about/page.tsx` ≤ 50 lines of thin metadata wrapper + client import (no 240 line monster pages with inline components). Same for premium/page.tsx, community/page.tsx. Evidence: post-move file sizes.

TR-7.3. **rubric: Phone mockup polish (0–2):**
- `2`: All existing phone mockups have rounded-4xl frames, internal content padded, no clipped text, avatars rounded-full object-cover, consistent aspect ratio.
- `1`: 1 mockup variant has a clipping issue.
- `0`: Multiple.
Pass threshold: ≥ 1. Evidence: visual browser spot check or source inspection.

---

## Task 8: Constants + data link placeholders + stressed-mood fix

**Priority:** high
**Status:** pending
**Coverage:** AC-10, AC-42 (footer links portion), AC-21 (Navbar active indicator portion)

### Scope
- `constants/index.ts`: fix `moods` Stressed object — bgColor should be derived from purple `#5B3FA8`, not gold.
- Replace `href="#"` placeholder links in navLinks/footerLinks/socialLinks with either (a) route to an existing page where one exists, (b) render a disabled "Coming soon" pill/tooltip pattern in the Footer consumer so no active `#` anchor is ever rendered.

### TRs
TR-8.1. **rule:** `constants/index.ts` `moods` Stressed entry: `color` and `bgColor` share a purple hue family (e.g. bgColor = `rgba(91,63,168,0.12)`). Evidence: constants file after edit.

TR-8.2. **rule:** A repo-wide grep for `href="#"` returns zero hits on links rendered in Navbar, Footer, LoginClient, SignupClient. Allow `href="#"` only inside temporary test comments; never on a rendered anchor user can click. Evidence: grep output.

---

## Task 9: Login + Signup polish (remove dead remember, wire stubs)

**Priority:** high
**Status:** pending
**Coverage:** AC-42 (non-footer links portion), AC-43

### Scope
- Login: remove `remember` state checkbox; replace "Continue with Google" with a disabled "Continue with Google (coming soon)" styled tile. "Forgot password" becomes `href="#forgot"` with tooltip "Reset flow coming soon".
- Signup: TOS / Privacy check → labels link to in-page anchors with tooltip. Google button same disabled "coming soon" treatment.

### TRs
TR-9.1. **rule:** LoginClient component renders NO `useState` for `remember` (variable deleted). Evidence: source file.

TR-9.2. **rule:** Grep `app/login/LoginClient.tsx` and `app/signup/SignupClient.tsx` for `href="#"` → 0 matches.

TR-9.3. **rule:** Google sign-in buttons (login/signup) have `aria-disabled="true"` or equivalent and tooltip "coming soon".

---

## Task 10: PremiumClient copy proofread

**Priority:** medium
**Status:** pending
**Coverage:** AC-46

### Scope
Edit PremiumClient `benefitCards` descriptions to make grammatically complete sentences. Proofread TrustRow subtitle "Join growing community caring minds." → "Join a growing community of caring minds." Proofread Final CTA text.

### TRs
TR-10.1. **rule:** Manual text proofread of all 6 benefit descriptions in PremiumClient: they are all complete sentences with subject/verb/prepositions (no telegram English). Evidence: source lines after edit.

TR-10.2. **rule:** Final CTA + TrustRow subtitle sentences parse as standard English when read aloud. Evidence: grep.

---

## Task 11: AuthContext · runtime bug fixes (reviewReport, admin seeds)

**Priority:** high
**Status:** pending
**Coverage:** AC-38

### Scope
- `reviewReport()` in AuthContext: currently writes to `mindora.admin.reports.v1`; `getAdminStats()` reads `SEED_REPORTS` const array → reports never restore. Fix: getAdminStats() should merge `safeGet("mindora.admin.reports.v1", SEED_REPORTS)` overriding the seed, so that reviews are persisted.

### TRs
TR-11.1. **rule:** `getAdminStats()` body reads the reports from localStorage via `safeGet("mindora.admin.reports.v1", SEED_REPORTS)` first, so updated reports round-trip. Evidence: AuthContext code after edit.

TR-11.2. **rule:** `addAffirmation / uploadAudio / createChallenge` — confirm all three still correctly call `safeSet` to their respective keys (no regressions). Evidence: quick read.

---

## Task 12: AdminRoute security · remove hardcoded admin escalator

**Priority:** high
**Status:** pending
**Coverage:** AC-36

### Scope
In `AdminRoute.tsx`, the non-admin fallback block has a button that auto logs-in `await login("admin@mindora.app", "password8")`. Delete this button and replace with a standard link to `/login?from=…` so there's no embedded credentials in shipped code. Keep a subtle hint *"If you are an administrator, sign in with your admin email address."* but no password, no one-click escalator.

### TRs
TR-12.1. **rule:** AdminRoute.tsx contains NO literal string `"password8"`, NO hardcoded login call with admin credentials. Evidence: grep `password8` across entire repo returns 0 matches after edit.

TR-12.2. **rule:** Non-admin card includes a "Sign in as different user" button that navigates to `/login?from=%2Fadmin` — safe behavior. Evidence: AdminRoute source.

---

## Task 13: AdminClient · runtime + UI fixes

**Priority:** high
**Status:** pending
**Coverage:** AC-37, AC-39

### Scope
- Define `defaultAvatarUrl` helper locally in AdminClient (already being defined at the bottom of the file! — verify it's actually hoisted/called in right order, or move it above render function, or import from shared util). Make avatar `<img>` have `onError` to letter initials div fallback.
- Range tab buttons: 7D/90D/1Y currently do nothing. Disable them with `disabled` + `title="Demo dataset: 30-day window"` and leave only "30D" enabled to avoid misleading dead UI toggle.
- Reports "Resolved": keep current implementation but ensure it's visible. Optional: no need to implement if out of scope. This just verifies no other dead toggles.

### TRs
TR-13.1. **rule:** AdminClient has `defaultAvatarUrl` defined before first reference (no ReferenceError crash in dev runtime). Either locally defined helper or imported from a util. Evidence: source code order.

TR-13.2. **rule:** Avatar `<img>` in AdminClient top bar + tables have `onError` handler swapping to a `<div>` with user initials. Evidence: source inspection.

TR-13.3. **rule:** Range tab buttons 7D, 90D, 1Y in User Growth chart are `disabled`; only `30D` is enabled, with tooltip/explanation. Evidence: AdminClient render output.

---

## Task 14: DashboardClient · dead UI cleanup

**Priority:** medium
**Status:** pending
**Coverage:** AC-40, AC-41

### Scope
- Profile dropdown button currently calls `updateProfile({})` onClick. That's a no-op localStorage waste. Remove that onClick. If the button opens nothing, and there's no menu, replace the dropdown chevron with a simple avatar link to /profile (which will render a 404 since there's no route — just disable the button and add a "Profile coming soon" tooltip). Simpler is fine: remove onClick entirely and add aria.
- Top bar search input: wire it to filter community feed posts by substring OR saved list OR if wiring is too complex, disable it with tooltip "Search coming soon". We just need it NOT to look alive while dead.

### TRs
TR-14.1. **rule:** DashboardClient profile button does NOT call `updateProfile({})`. No-op removed. Evidence: line with `updateProfile({})` deleted.

TR-14.2. **rule:** DashboardClient top search bar is either controlled and actually filters a local dataset (community feed / saved), OR is explicitly disabled with `disabled` + tooltip. No "looks alive, does nothing".

---

## Task 15: Navbar active state + aria-current + Footer newsletter ARIA-live

**Priority:** low
**Status:** pending
**Coverage:** AC-21, AC-23

### Scope
- Navbar: active nav link item wraps with `aria-current="page"` and has a visible underline/highlight.
- Footer newsletter: success toast should announce via `<div role="status" aria-live="polite">` so screen readers know the email was accepted.

### TRs
TR-15.1. **rule:** NavLink render uses `aria-current="page"` on the route matching current pathname. Evidence: Navbar source diff.

TR-15.2. **rule:** Footer contains `<div role="status" aria-live="polite">` wrapping the success/error state message for newsletter subscribe. Evidence: Footer source.

---

## Task 16: Performance · lazy-load below-the-fold images

**Priority:** medium
**Status:** pending
**Coverage:** AC-33

### Scope
Audit all `<img>` tags:
- Hero LCP images (homepage hero, about/premium hero phone mockups, first sections) → add `priority`.
- Avatars in comment/community post cards further down the page → `loading="lazy"`.
- Section badges, offscreen members of team lists → lazy.

### TRs
TR-16.1. **rule:** Hero LCP images (<img> in top 50vh hero of marketing pages, or first phone mockup on Home) have `priority` attribute OR `loading="eager"` + `fetchpriority="high"` if Next treats them. (Rule of thumb: one priority per marketing route.)

TR-16.2. **rule:** Team avatars, footer/decorative images, and secondary section badges have `loading="lazy"`.

---

## Task 17: Quality gate · lint, build, type-check, diagnostics

**Priority:** high (blocking)
**Status:** pending
**Coverage:** AC-48, AC-49, plus AC-34 (performance rubric)

### Scope
Run, in order:
1. `npm run lint` — fix any new lint errors.
2. `npm run build` — fix any type errors or import warnings.
3. Capture build output routes table sizes; compare to budget in AC-34.

### TRs
TR-17.1. **rule:** `npm run lint` exits code 0 with no errors. Evidence: terminal output.

TR-17.2. **rule:** `npm run build` exits code 0 with no type errors, no import warnings. Evidence: terminal output.

TR-17.3. **rubric: Bundle sizes (0–2):**
- `2`: all routes ≤ 200 kB, shared ≤ 90 kB.
- `1`: one route 200–240 kB, and/or one minor case-only import warning left unfixed.
- `0`: multiple violations.
Pass threshold: ≥ 1. Evidence: `Route (app)` table in build output.

---

## Task 18: IDE diagnostics pass

**Priority:** high
**Status:** pending
**Coverage:** AC-50

### Scope
Run `GetDiagnostics` with no URI (across all files). Address any TS/lint issues surfaced.

### TRs
TR-18.1. **rule:** `GetDiagnostics` output reports zero errors and zero warnings (excepting info-only).

---

### Dependencies / Order
- Tasks 1, 2, 3, 8 are independent (run first).
- Then 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16 in parallel or any order; they do not overlap files.
- 17 must come last (all other tasks complete).
- 18 runs immediately after 17 succeeds.
