# Mindora Quality Audit + Remediation Specification

## 1. Problem Statement

Mindora has reached a functional "first pass" across its entire surface: marketing (Home, Features, How It Works, Community, Premium, About), authentication (Login, Signup), the authenticated member dashboard, and an admin control panel. However, the codebase exhibits the symptoms of rapid sequential feature additions:

- **Cross-page visual drift.** Spacing, typography scale, button variants, card padding/shadows, and border radii are applied inconsistently by authors hand-picking classes rather than composing from documented primitives.
- **Incomplete implementations.** Several UI elements render visibly but do nothing: button click handlers point to `#` placeholder links, toggle buttons update local UI-only state without wiring to persistence, chart range tabs switch selection state but re-render the exact same dataset.
- **Crowding / insufficient breathing room.** A handful of sections (signup forms, dashboard CTA stacks, admin tables) compress labels, paddings, and gutters to fit more content per row, producing layouts that feel cramped on tablets and unusable on narrow viewports.
- **Accessibility / SEO / quality debt.** Missing image alt text, bare `href="#"` links, disabled-button pointer-events, focus-ring offsets that conflict with dark surfaces, missing OG/Twitter images, no structured data, and dead CSS utilities were discovered during exploratory auditing.
- **Usability friction on mobile.** Navigation drawers, sidebars, and horizontally-scrolling tables have inconsistent touch-target sizing; search inputs render on top bars with no visible submit affordance; content grids don't always break to 1 column on `< 640px`.

The user is asking for a **production-quality polishing pass** that *does not add new features*, but instead identifies every inconsistency, incomplete element, accessibility gap, performance issue, SEO gap, and cross-page mismatch — then systematically remediates each one, and ends with a full build/typecheck/lint pass that exits clean.

## 2. Users / Stakeholders

1. **End users (prospects & members)** visit the marketing site on mobile (iOS/Android), tablet, and desktop browsers and expect a premium, fast, accessible wellness-app experience.
2. **Search engines** crawl the marketing pages and expect meta tags, semantic HTML, alt text, and structured data to return good organic rankings.
3. **Screen-reader and keyboard-only users** rely on consistent semantics, visible focus states, ARIA attributes, and WCAG 2.1 AA contrast.
4. **Admin operators** expect the `/admin` panel to be non-destructively usable (no hardcoded credential escalation, reports persist, CRUD operations round-trip).
5. **Future Mindora engineers** inherit this codebase and deserve a single source of truth for spacing/typography/button/card primitives rather than re-copying patterns from page to page.

## 3. Goals

1. Make the Mindora surface feel **visually cohesive** across all 8 core pages so no single page reads as "designed by a different person."
2. Ensure the **full production build pipeline passes**: TypeScript strict type-check, ESLint via Next, and `next build` all exit `0` with zero errors and no warnings of practical consequence (casing warnings fixed, unused imports removed).
3. Resolve every **incomplete implementation / placeholder UI** discovered during audit without expanding feature scope (i.e., if an action cannot realistically be wired, provide a sensible disabled+tooltip or remove it — never leave a deceptive active-looking dead button).
4. Lift baseline accessibility to **WCAG 2.1 AA** for keyboard navigation, focus visibility, color contrast, and screen-reader semantics (image `alt`, form labels, `aria-label`s on icon-only controls).
5. Improve SEO hygiene: metadata complete, OG/Twitter images specified on root layout, semantic sectioning landmarks, JSON-LD on the landing page.
6. Apply a consistent **8 px baseline spacing grid** across all section gutters, card paddings, and typography rhythm; eliminate hand-rolled px-based gaps that don't align to the scale.

## 4. Non-Goals (Out of Scope)

- **No new features.** We explicitly do NOT add:
  - Firebase / Supabase / real backend.
  - Real OAuth (Google, Apple).
  - Real payments / Stripe.
  - Real file uploads to object storage.
  - Dark mode themes.
  - i18n / localization.
  - New routes or pages beyond those already present in the repo.
- **No middleware rearchitecture.** Route protection is client-side via ProtectedRoute / AdminRoute. We will NOT introduce Next.js middleware.ts.
- **No visual redesign.** We preserve the Mindora brand look (purple/lavender/gold palette, Poppins font, rounded-3xl cards, Flower2 lotus treatment). Remediation is alignment, not reinvention.
- **No server actions, no API routes.** Existing client-side mock localStorage CRUD stays; we simply fix its broken writes (e.g., reports review persisting to wrong key).
- **No CVA/Radix/shadcn migration.** Button component variants are refined in place, not rewritten.

## 5. Constraints

- **Technology stack is fixed:** Next.js 14.2.4 App Router, Tailwind 3.4, React 18.3, TypeScript 5.4, lucide-react 0.395. No new runtime dependencies added unless they are *tiny* pure utilities.
- **No file is allowed to grow indefinitely.** Any component already > 700 lines must be split into smaller, colocated section sub-components under the same folder.
- **Breakpoints use existing Tailwind convention:** mobile-first, semantic breakpoints `sm (640px) / md (768px) / lg (1024px) / xl (1280px)`. No arbitrary `max-w-583px` classes.
- **`href="#"` placeholder links are forbidden on production links.** Either route to a real page (including an in-page anchor to `#` being replaced with `/about#contact` etc.), or render as disabled non-link text, or remove.
- **All `img` tags require meaningful `alt` text.** Avatar `alt="{name}"` is acceptable for user headshots. Decorative SVG-only illustrations that live inside `<svg>` get `role="img"` + `aria-label` *or* `aria-hidden="true"` if purely aesthetic.

## 6. Dependencies / Assumptions

- Existing image generator endpoint (`coresg-normal.trae.ai/.../text_to_image`) remains online during testing — we will not add fallback static avatars beyond `onError` handling to a letter-avatar div.
- No existing feature/pages break: Home, Features, How It Works, Community, Premium, About, Login, Signup, Dashboard, Admin all render.
- Node 18+/npm 9 environment is able to install from existing lockfile and run `npm run lint`/`build`/`type-check` (if no dedicated type-check script exists we rely on the build typecheck step).

## 7. Open Questions / Assumptions

> Items that were not directly specified, we assume the following defaults. If any default is incorrect, cancel and request clarification:
> 1. For footer/social links that point at pages that don't yet exist (Press, Careers, Community Guidelines, etc.): **render as bold disabled text with `aria-disabled="true"` tooltip "Coming soon" instead of `#` dead links.** So they look premium without producing 404s.
> 2. OG/Twitter image: since no image assets are provided, we will build a single inline `<meta property="og:image">` (and twitter:image) using a text_to_image URL describing "Mindora wellness app purple lotus logo gradient cover", which satisfies the SEO requirement of having an OG image specified — we don't commit pixel-perfect brand creative.
> 3. TOS/Privacy routes are **not** created. Signup form TOS links point to `href="#terms"` with an in-page anchor explanation "Legal docs coming soon" tooltip instead of `#`.
> 4. 8 px baseline grid: we map spacing to Tailwind's default scale (which is already 4px-based, so 8px = `space-y-2`, `p-4` = 16px, `gap-6` = 24px, etc.) — we simply hunt down any arbitrary `gap-[17px]` or `p-[22px]` classes and round to the nearest multiple of 2 on the Tailwind scale.
> 5. Button `shadow-glow` on hover: we will **invert the direction** (adds glow on hover, does not remove it) since removing elevation on hover produces a "pressed-in" feel opposite platform conventions. User did not explicitly specify, this is a common convention.

---

## 8. Acceptance Criteria (AC)

### 8.1 Spacing System (8px baseline grid)

AC-1. **rule:** A manual visual/text scan across all 8 route files + dashboard/admin client files finds zero ad-hoc pixel paddings like `p-[13px]`, `gap-[17px]`, or `space-y-[9px]`. Every `p*`/`m*`/`gap`/`space-*` utility uses the standard Tailwind scale or a small semantic custom token.

AC-2. **rubric: Section gutters (0–2):**
- `2`: All landing sections, dashboard widget cards, admin stat rows use consistent vertical rhythm: section hero blocks use 80–96px bottom spacing, content blocks use 48px, cards use 20–24px inner padding; no single section feels "too cramped" or "too empty" relative to its neighbors.
- `1`: Majority are consistent; 1–2 sections visibly misaligned.
- `0`: Three+ sections have divergent rhythm; some cards bump directly against each other with no gutter, others sport > 120px whitespace.

**Pass threshold: >= 1.**

### 8.2 Typography

AC-3. **rule:** A grep across `components/` + `app/` finds no `text-[15px]`, `text-[22px]`, arbitrary pixel font sizing beyond allowed heading gradients. All headings and body copy use Tailwind default scale (`text-xs` / `sm` / `base` / `lg` / `xl` / `2xl` / `3xl` / `4xl` / `5xl`). The only exception: inside bespoke SVG `text` elements for art.

AC-4. **rule:** Line height is consistent: headings use `leading-tight` / `tracking-tight`, body copy uses `leading-relaxed` / `tracking-normal`, small helper text uses `leading-snug`. No `leading-none` on multi-line copy unless it's a single-word hero.

AC-5. **rubric: Typography scale cohesion (0–2):**
- `2`: Pages feel like one typography system; `h1` is never smaller than subsequent subheads; there is at most 1 text-size step between adjacent section heading / subheading / body.
- `1`: One or two mis-sized headings / odd jumps in scale.
- `0`: No hierarchy pattern discernible, section titles alternate sizes randomly.

**Pass threshold: >= 1.**

### 8.3 Responsive Layout

AC-6. **rule:** `DashboardClient` and `AdminClient` layouts reflow to 1 column on `<1024px` viewports with no horizontal scroll (verified by wrapping each grid container in responsive Tailwind class variants; any overflowing element has `overflow-x-auto` + a min-width and is *designed* to scroll horizontally, like data tables).

AC-7. **rubric: Marketing hero responsiveness (0–2):**
- `2`: Every marketing page hero (Home, Features, How It Works, Community, Premium, About) stacks to single-column on mobile, center-aligns CTAs, drops text sizes one step down, and phone mockups scale to 90–100% screen width without clipping.
- `1`: One hero section clips phone mockups or mis-aligns CTA on narrow widths.
- `0`: Two+ hero sections need significant work on mobile.

**Pass threshold: >= 1.**

### 8.4 Mobile Experience / Touch

AC-8. **rule:** Every icon-only button, hamburger toggle, sidebar close button, and audio-player control has a minimum hit area of `h-10 w-10` (40×40 px, WCAG 2.2 target-size AA).

AC-9. **rule:** Navigation drawer (mobile menu) + sidebar (admin / dashboard) close on route change and on `Escape` keypress.

### 8.5 Colors & Contrast

AC-10. **rule:** All `constants/index.ts` mood color + bgColor pairs use derived matching colors. Manual inspection: every mood's `bgColor = hexToRgba(color, alpha)` so that color ring on the matching tile background is cohesive (fixes the "Stressed" gold/purple cross-wire specifically).

AC-11. **rubric: Brand color consistency (0–2):**
- `2`: There are exactly zero bespoke hex colors sprinkled inline inside component files (e.g. `style={{ color: '#7a74ec' }}`) that duplicate existing tokens; every bespoke color that matches a token is replaced with the Tailwind class.
- `1`: 1–3 ad-hoc inline hex colors remain that are "close enough" to the palette.
- `0`: Four+ inline custom hex colors that clearly duplicate the palette.

**Pass threshold: >= 1.**

### 8.6 Buttons

AC-12. **rule:** `primary` button variant GAINS elevation on hover. `shadow-glow` is present on hover, not removed. Explicit: `className` reads something like `shadow-glow hover:shadow-glow hover:brightness-110` or similar that adds energy on hover, not takes away.

AC-13. **rule:** `Button` disabled state uses `disabled:opacity-60 disabled:cursor-not-allowed` and **does not** use `disabled:pointer-events-none`.

AC-14. **rule:** `loading=true` renders button with `aria-busy="true"`, and visually hides children text if loading to avoid spinner + text jitter (or keeps text + adds spinner, just announces busy state correctly via `aria-busy`).

### 8.7 Cards

AC-15. **rule:** All marketing feature cards, dashboard widgets, and admin stat cards use a single consistent card primitive via one of:
- `rounded-2xl border border-softLavender bg-offWhite shadow-soft p-5` (content card), or
- `rounded-3xl border border-softLavender/70 bg-offWhite/90 backdrop-blur-sm shadow-card p-6` (hero / premium / highlight card).
No card uses `rounded-xl border-lavender/20 bg-white shadow-none p-3.5` unless intentionally a nested child tile.

### 8.8 Animations

AC-16. **rule:** Every `Button`, card hover, and sidebar transition uses `transition-colors` / `transition-transform` / `transition-shadow` targeted properties. No standalone `transition-all` unless the component legitimately animates 4+ properties and has reduced-motion overrides.

AC-17. **rule:** `prefers-reduced-motion` overrides exist and correctly kill animations on custom animations (`animate-float`, `animate-blob`) and Button `active:scale-[0.98]` via `motion-reduce:transform-none` (already present — verify it compiles correctly, no dead CSS).

### 8.9 App Mockups (PhoneMockup)

AC-18. **rule:** No duplicate phone-screen sub-components (>80% identical by diff) remain. If variants like `HomePhoneScreen` vs `HeroHomePhoneScreen` vs `AboutHeroDashboard` are > 80% identical, unify them into one reusable base component with 2–3 props for gradient/title/stats.

AC-19. **rubric: Mockup polish (0–2):**
- `2`: All phone mockup SVGs are crisp, consistent rounded corners, content inside is padded correctly; no text is clipped, AI-generated headshot rectangles have proper rounded corners and `object-cover`.
- `1`: One mockup clips text or uses a different aspect ratio than the others.
- `0`: Multiple broken mockups.

**Pass threshold: >= 1.**

### 8.10 Navigation

AC-20. **rule:** Navbar uses a single `APP_PATHS` list imported from a shared utility/constants location (not duplicated in Navbar + Footer). `startsWithAppPath()` is also a shared helper.

AC-21. **rule:** Every nav link item has a visible active-state indicator (border/background/text-color) when on its route — `aria-current="page"` is set for active items.

### 8.11 Footer

AC-22. **rule:** Footer follows the same APP_PATHS hiding rule as Navbar (both read from shared helper). No duplicate path list.

AC-23. **rule:** Footer newsletter form has success and error states that correctly clear after timeout, with ARIA live region announcing submission success / failure.

### 8.12 Accessibility (WCAG 2.1 AA)

AC-24. **rule:** `overflow-x: hidden` is REMOVED from `<html>` and `<body>` base layer CSS. If individual components produce horizontal overflow, fix *them* rather than globally clipping.

AC-25. **rule:** All icon-only buttons have `aria-label` describing their action. E.g., `<button aria-label="Search">`, `<button aria-label="Open main menu">`.

AC-26. **rule:** Focus ring offset (`ring-offset-offWhite`) is only applied conditionally, or offset is removed in favor of a solid 2px ring that works on both light and dark backgrounds (test with focus visible on a purple Button — ensure 3:1 contrast).

AC-27. **rule:** `.scrollbar-none` utility is NOT applied to content areas on desktop; only on mobile (e.g. `.md:scrollbar-none` removed from desktop). We add a visible WebKit custom scrollbar thin-style fallback on horizontal tables/scroll containers on desktop widths.

AC-28. **rule:** `lang="en"` is present on `<html>` (verified), and any foreign script/quotes (e.g. French accents) are either wrapped with `lang` attribute or are brand-safe — in practice we just verify the baseline.

### 8.13 SEO

AC-29. **rule:** Every route `page.tsx` exports `Metadata` with canonical, title, description, and OpenGraph tags. Auth-gated dashboard/admin pages include `robots: {index: false, follow: false}` (already present — confirm it is retained across all app routes).

AC-30. **rule:** Root layout metadata (`app/layout.tsx`) includes `openGraph.images`, `twitter.images`, `apple-touch-icon` reference, and `<meta name="theme-color">`.

AC-31. **rule:** `app/sitemap.ts` or similar sitemap producer exists listing all marketing routes. Dashboard/admin are excluded.

AC-32. **rule:** Marketing landing page (Home) has a JSON-LD structured data `<script type="application/ld+json">` in document head rendering Organization schema with name/url/logo/description.

### 8.14 Performance

AC-33. **rule:** All `<img>` tags outside of dashboard/admin dynamic user avatars: `loading="lazy"` for anything below-the-fold, `priority` for hero LCP images. Dashboard/user avatars default to lazy loading.

AC-34. **rubric: Build artifact size (0–2):**
- `2`: The `next build` output shows First Load JS shared by all is <= 100 KB, individual routes (Home, Features, etc.) <= 200 KB, no route exceeds 350 KB. No runtime import warnings, no "lucide-react/Lotus" or missing export warnings.
- `1`: One route exceeds the budget by 20% or there's one lingering warning category (e.g. case-sensitivity on a Button file).
- `0`: Two+ routes over budget and/or multiple import warnings.

**Pass threshold: >= 1.**

### 8.15 Bug Fixes (Confirmed Findings)

AC-36. **rule:** `AdminRoute` does NOT expose a hardcoded one-click admin escalator. The non-admin fallback card displays a descriptive error ("You do not have admin access") with a "Log in as different user" button that routes to `/login?from=%2Fadmin` — no embedded credentials, no auto `login("admin@mindora.app","password8")`.

AC-37. **rule:** `AdminClient` defines its own `defaultAvatarUrl()` helper (or imports from a shared util), and is NOT referencing an undefined function. Avatar image tags also have `onError` fallback to a letter-avatar div.

AC-38. **rule:** `reviewReport()` in AuthContext writes to the same localStorage key that `getAdminStats()` reads back from. After reviewing a report and reloading, the status is preserved.

AC-39. **rule:** AdminClient range tab buttons (7D/30D/90D/1Y) are either wired to distinct datasets or replaced with a disabled pill "30D" indicating only 30-day data is shown. UI that appears to toggle but does nothing is illegal per AC-35.

AC-40. **rule:** DashboardClient profile dropdown button does NOT call `updateProfile({})` (useless localStorage write + re-render) — wire to a menu toggle or remove the onClick entirely if the menu doesn't exist.

AC-41. **rule:** DashboardClient search input (top bar) is either a controlled input with a clear local filter (filters `SAVED_TABS` or community feed posts by substring) OR the search input is disabled/removed. No "search" that does nothing.

AC-42. **rule:** "Continue with Google", "Forgot password", TOS, Privacy, and Social links are NOT `href="#"`. They receive the treatment described in §7 assumption 1 (tooltip / disabled / in-page anchor / route to real marketing page where one exists).

AC-43. **rule:** `LoginClient` "Remember me" checkbox either persists user to localStorage with longer TTL OR is removed from rendered DOM. No "checkbox that does nothing". (Simplicity preferred: remove it, since local persistence is indefinite already.)

AC-44. **rule:** `Button` component's `asChild` prop is EITHER (a) removed from the type/signature because the code never renders a Slot, OR (b) genuinely implemented using `React.cloneElement` pattern. No prop that exists in the type but silently does nothing.

AC-45. **rule:** Duplicate `classNames` function in `lib/utils.ts` is removed. Only `cn()` remains. Dead code produces confusion.

AC-46. **rule:** Premium benefit descriptions in `PremiumClient` benefitCards are grammatically complete English sentences. No "Unlimited access complete library sleep meditation..." telegram style. Final CTA and copy on the TrustRow are similarly proofread.

AC-47. **rule:** Duplicate "APP_PATHS + startsWithAppPath" helper is extracted to a shared location (constants or a dedicated util file) and imported by both Navbar.tsx and Footer.tsx. No more copy pasta.

### 8.16 Build Quality Gate

AC-48. **rule:** Running `npm run lint` from repo root exits with code 0.

AC-49. **rule:** Running `npm run build` (which performs the TS type-check + ESLint + production build) exits with code 0 and produces a complete `.next` build output with no import warnings, no type errors, no lint errors.

AC-50. **rule:** Running IDE diagnostics (`GetDiagnostics`) after build passes reports zero TypeScript errors and zero lint errors.

## 9. Evidence References

The findings that gave rise to these ACs are sourced from three parallel exploratory audits performed 2026-09-13:
- **Stack audit:** package.json, tailwind, globals.css, Button.tsx, lib/utils, constants, types, SEO metadata.
- **Auth + dashboard/admin audit:** AuthContext, ProtectedRoute, AdminRoute, LoginClient, SignupClient, DashboardClient, AdminClient.
- **Route + layout audit:** app/* routes, components/home/* clients, Navbar.tsx, Footer.tsx.
