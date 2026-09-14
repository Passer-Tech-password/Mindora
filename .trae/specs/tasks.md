# Mindora Website - Implementation Plan

## Task 1: Project Bootstrap (Next.js + TS + Tailwind + Config)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Initialize Next.js 14+ project with App Router, TypeScript, Tailwind CSS, ESLint
  - Install dependencies: firebase, lucide-react, clsx, tailwind-merge, framer-motion (or equivalent scroll lib)
  - Create `tsconfig.json` with `strict: true`
  - Configure `tailwind.config.ts` with all 9 Mindora brand colors, Poppins font via `next/font/google`, border-radius presets (20-32px), shadows
  - Create `app/globals.css` with base typography, smooth scroll, reduced-motion overrides, horizontal overflow prevention
  - Create `next.config.mjs` with image domains, React strict mode
  - Create `.env.example` with all 6 `NEXT_PUBLIC_FIREBASE_*` placeholders
  - Create empty `public/` dir; ensure standard ignore files (`.gitignore`, `.eslintrc.json`)
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-14
- **Test Requirements**:
  - `rule` TR-1.1: `npm install` succeeds and `package.json` contains next, react, typescript, tailwindcss, firebase, lucide-react; Evidence: package.json dependencies list
  - `rule` TR-1.2: tailwind.config.ts contains all 9 hex color values (#24143D through #766D80) and Poppins font config; Evidence: file contents
  - `rule` TR-1.3: `npx tsc --noEmit` exits with code 0 on initial scaffold; Evidence: terminal output
  - `rubric` TR-1.4: Project structure clarity; scale 1-5; anchors 1=no folders mixed files, 3=app folder only, 5=app/components/lib/types/constants folders planned with index barrels; threshold >=4; Evidence: directory listing

## Task 2: Type Definitions, Constants, and Mock Data
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create `types/index.ts` with interfaces: `User`, `Mood`, `Affirmation`, `AudioTrack`, `Post`, `Comment`, `Subscription`, `Category`, `FeatureItem`, `FAQItem`, `PricingTier`
  - Create `constants/index.ts` with brand strings (navLinks, footerLinks, brand colors refs, socialLinks), mood list (6 moods with emoji/label/color), affirmations (sample 5+), audio tracks (6: Rain, Ocean, Forest, Night, Breathing, Piano), feature list (8), values list (5), steps list (5), categories (5 community + 5 explore)
  - Create `data/mockData.ts` with community posts (4-6 anonymous), comments, FAQ items (5-6), pricing tiers (2 tiers with Best Value flag), streak sample data (14-day weekly viz)
- **Acceptance Criteria Addressed**: AC-10
- **Test Requirements**:
  - `rule` TR-2.1: `types/index.ts` exports all 7 required interfaces (User, Mood, Affirmation, AudioTrack, Post, Comment, Subscription) with correct fields (User has uid, firstName, lastName, email, photoURL, createdAt, updatedAt, subscriptionStatus, streak, lastMood, onboardingCompleted); Evidence: grep for each `export interface`
  - `rule` TR-2.2: constants/data files contain exactly 6 moods (Happy, Calm, Low, Anxious, Tired, Stressed) and 6 audio tracks matching prompt; Evidence: array length and string match

## Task 3: Utility and Primitive Shared Components (Button, SectionHeading, etc.)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Create `lib/utils.ts` with `cn()` (clsx + tailwind-merge) and any other small helpers
  - Create `components/ui/Button.tsx` with variants (primary, secondary, ghost, outline), sizes (sm, md, lg), loading state, asChild support; respect brand purple/gold; ensure 44px+ touch targets for md/lg
  - Create `components/ui/SectionHeading.tsx` (eyebrow + heading + subheading layout)
  - Create `components/ui/PhoneMockup.tsx` (rounded smartphone frame with screen slot + decorative lavender/purple background blobs + floating animation with reduced-motion support)
  - Create `components/ui/FeatureCard.tsx` (icon + title + description, soft rounded card, hover lift)
  - Create `components/ui/CTASection.tsx` (dark purple reusable CTA band with heading + sub + CTA button)
- **Acceptance Criteria Addressed**: AC-5 (dependency), AC-10, AC-11
- **Test Requirements**:
  - `rule` TR-3.1: Button component has primary variant with purple bg, white text, hover state, and md variant height >= 44px; Evidence: rendered CSS in dev or computed height
  - `rule` TR-3.2: PhoneMockup renders an outer frame (with notches/corners rounded 28-32px) and accepts `children` as screen content with reduced-motion override; Evidence: component snapshot

## Task 4: Domain Shared Components (MoodSelector, AffirmationCard, AudioPlayer, StreakCard, PricingCard, FAQAccordion, CommunityPost)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - `components/MoodSelector.tsx` / `MoodCard.tsx`: 6 clickable moods (emoji + label); selected state with color ring; selecting updates supporting message below (controlled pattern via onSelect)
  - `components/AffirmationCard.tsx`: quote text, Listen (play icon), Save (bookmark), Share (share) action buttons; selected/active state styling
  - `components/AudioPlayer.tsx` with track list (6 tracks); click selects track; central play/pause button; progress bar UI; track title; no actual audio required but state is functional
  - `components/StreakCard.tsx`: streak count (e.g., "14 Day Streak 🔥"), 7-day weekly progress viz (7 cells with fill state), label
  - `components/PricingCard.tsx`: tier name, price/mo or /yr, benefit bullets, CTA Button, "Best Value" ribbon/badge support
  - `components/FAQAccordion.tsx`: array of FAQ items, animated expand/collapse with reduced-motion, single-open or multi-open (multi-open OK)
  - `components/CommunityPost.tsx` / `CommunityFeed.tsx`: avatar (initials or silhouette), timestamp, category badge, text body, like/comment/share/report action icons; anonymous-friendly styling
- **Acceptance Criteria Addressed**: AC-4, AC-6, AC-7, AC-10
- **Test Requirements**:
  - `rule` TR-4.1: MoodSelector with 6 mood buttons; clicking a mood toggles its selected state and fires onSelect callback with mood id; Evidence: interactive click test
  - `rule` TR-4.2: FAQAccordion expands/collapses item body on click; reduced-motion disables transition animation; Evidence: manual interaction + reduced-motion override test
  - `rubric` TR-4.3: CommunityPost visual design; scale 1-5; anchors 1=social network clone (bright borders, aggressive engagement UI), 3=plain text with icons, 5=calm/wellness-focused (lavender cards, generous padding, anonymous-friendly emphasis, soft buttons); threshold >=4; Evidence: screenshot + DOM review

## Task 5: Navbar and Footer Components
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - `components/layout/Navbar.tsx`: logo "Mindora", 6 nav links array, right side Log In (ghost) + Get Started (primary), sticky top with subtle background blur, active route highlighting (use usePathname), smooth transitions; mobile: hamburger toggle with slide-in drawer, backdrop, close button
  - `components/layout/Footer.tsx`: columns Product (Features, How It Works, Premium, Community) / Company (About, Careers, Press, Blog placeholder) / Support (Help Center, Contact, Privacy, Terms); newsletter signup form (email input + submit button, no actual backend); social icons (Twitter/X, Instagram, LinkedIn, Facebook placeholder); bottom copyright bar
  - Wire Navbar and Footer into Root Layout `app/layout.tsx` so all pages inherit them
- **Acceptance Criteria Addressed**: AC-3, AC-10, AC-11
- **Test Requirements**:
  - `rule` TR-5.1: Navbar renders exactly 6 links (Home, Features, How It Works, Community, Premium, About) plus Log In and Get Started; active link for current page shows highlight style; Evidence: DOM + route change test
  - `rule` TR-5.2: Mobile viewport (width < 768px) shows hamburger; hamburger click reveals drawer with all 6 links and close button; Evidence: DevTools mobile view interaction
  - `rule` TR-5.3: Footer contains 3 link columns, newsletter email input UI, 4 social icons, and copyright line; Evidence: DOM inspection

## Task 6: Home Page (`/`)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4, Task 5
- **Description**:
  - `app/page.tsx` — all components Server by default; wrap interactive children with Client Component boundaries
  - Hero: exact headline "Your daily space to feel better, grow stronger, and live mindfully."; subtext as specified; 2 buttons (Start Your Journey primary, Explore the App secondary); PhoneMockup screen contains dashboard-like UI: greeting, mood check-in (6 moods mini), affirmation line, listen button, streak badge; decorative lavender purple blobs behind
  - Benefits: 4 items (Mood Check-ins, Daily Affirmations, Calming Audio, Positive Community) with icons
  - Mood Section: heading "Your mood. Your moment. Your Mindora."; interactive MoodSelector; supporting message that changes per selection
  - Affirmations: heading "A little reminder can change your day."; AffirmationCard with "You are doing better than you think." and 3 actions
  - Explore: 5 cards (Self Love, Anxiety Relief, Better Sleep, Motivation, Confidence) with decorative gradients
  - Audio Section: heading "Press play. Let the world slow down."; AudioPlayer with 6 tracks
  - Streak Section: StreakCard with 14 Day Streak 🔥 + weekly viz
  - Community Preview: heading "You don't have to grow alone."; 2-3 sample CommunityPosts
  - Premium CTA: dark purple (#24143D) section; heading "Give your mind more."; 6 benefits (library, sounds, advanced, ad-free, offline, unlimited saves); prices $4.99/month and $39.99/year; CTA "Start Free Trial"
  - Final CTA: "Your better days can start today." + subtext + CTA button
- **Acceptance Criteria Addressed**: AC-4, AC-2, AC-11
- **Test Requirements**:
  - `rule` TR-6.1: Home page DOM contains the exact hero headline, Mood Section heading, Affirmation heading, Audio heading, Community heading, Premium CTA heading, and Final CTA heading strings; Evidence: grep DOM text
  - `rule` TR-6.2: Mood selection changes selected UI state and the supporting message text updates; Evidence: interaction test
  - `rule` TR-6.3: Premium CTA section background uses dark purple (#24143D or bg-deepPurple) with light text; action buttons are high contrast against dark bg; Evidence: computed styles + screenshot review

## Task 7: Features Page (`/features`)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 3
- **Description**:
  - `app/features/page.tsx` with metadata
  - Hero: heading "Everything you need for a healthier mind, in one beautiful app." + subhead
  - 8 feature sections alternating left/right image-text layouts:
    1. Mood Check-ins
    2. Daily Affirmations
    3. Calming Audio
    4. Positive Community
    5. Daily Streaks
    6. Saved Content
    7. Personalized Experience
    8. Privacy & Security
  - Each section: SectionHeading + description bullets + PhoneMockup or illustration card
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-7.1: DOM contains exactly 8 feature section headings matching the exact 8 names above; alternating layout (odd sections image left, even right or vice versa); Evidence: DOM structure

## Task 8: How It Works Page (`/how-it-works`)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 3
- **Description**:
  - `app/how-it-works/page.tsx` with metadata
  - Hero: "Simple steps to a better you."
  - 5 numbered steps (01-05) each with number badge, title, description, visual placeholder:
    01 — Check In: "Tell Mindora how you're feeling."
    02 — Receive: "Get your daily affirmation."
    03 — Reset: "Use calming audio and breathing tools."
    04 — Connect: "Share and encourage others."
    05 — Grow: "Build your daily streak."
  - Strong final CTA section at bottom
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-8.1: DOM contains exactly 5 step sections numbered 01 through 05 with exact titles + descriptions above; Evidence: text grep

## Task 9: Community Page (`/community`)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 5, Task 4
- **Description**:
  - `app/community/page.tsx` with metadata
  - Hero: "You don't have to grow alone." + tagline
  - Tabs (Top / Recent / Following) — interactive state; "New Post" primary button
  - Category chips (5): Daily Wins, Self Love, Anxiety Support, Motivation, Gratitude
  - CommunityFeed with 4-6 posts from mockData; each post supports like (toggle state), comment count display, share (UI), report (UI with modal/dropdown placeholder); anonymous posting indicated visually
  - Do NOT look like FB/IG: calm lavender cards, rounded, generous whitespace, no aggressive engagement counters; wellness-focused aesthetic
- **Acceptance Criteria Addressed**: AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-9.1: Tabs component has 3 tabs with click interaction; active tab visually distinguished; "New Post" button present; 5 category chips present; Evidence: DOM + interaction
  - `rubric` TR-9.2: Community page calm/wellness aesthetic; scale 1-5; anchors 1=FB/IG clone, 3=neutral/ugly, 5=clearly calm/supportive; threshold >=4; Evidence: visual screenshot review

## Task 10: Premium Page (`/premium`)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 5, Task 4
- **Description**:
  - `app/premium/page.tsx` with metadata
  - Hero: "Give your mind the care it deserves." + subhead
  - Benefits list (6 bullet cards): Full Audio Library, Exclusive Content, Ad-Free Experience, Advanced Mood Insights, Offline Access, Unlimited Saves
  - Pricing section: 2 PricingCard components — $4.99/month and $39.99/year with yearly card showing "Best Value" highlight/badge
  - FAQAccordion with 5-6 questions (e.g., "Can I cancel anytime?", "What's included in Premium?", etc. — plausible wellness-app FAQ)
  - Final CTA
- **Acceptance Criteria Addressed**: AC-5, AC-7
- **Test Requirements**:
  - `rule` TR-10.1: DOM contains both exact prices ($4.99/month, $39.99/year); yearly card has a visible "Best Value" badge element and visually distinct accent (e.g., gold border or background pop); Evidence: DOM text + screenshot
  - `rule` TR-10.2: FAQAccordion has >= 4 FAQ items; each expands on click to reveal answer; Evidence: interaction test

## Task 11: About Page (`/about`)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 3
- **Description**:
  - `app/about/page.tsx` with metadata
  - Hero: "Building a kinder world, one mind at a time."
  - Mission block: "To make emotional wellness simple, personal, and accessible for everyone." (bold title Mission + the statement)
  - Values grid (5 cards): Empathy First, Trust & Safety, Authentic Community, Growth Mindset, Positivity Always
  - Story section (2-3 paragraphs placeholder narrative about creating Mindora for accessible wellness)
  - Team section placeholders: 3-4 anonymous profile cards (silhouette avatar, generic title "Co-Founder", "Wellness Lead", "Engineering Lead" — NO real names or faces)
  - Final CTA
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-11.1: DOM contains Mission statement exact copy, 5 named Values cards, and team section with 3-4 placeholder cards that do NOT contain real human names/photos (use initials or generic avatars); Evidence: text/DOM review

## Task 12: Authenticated Route Scaffolds
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 3
- **Description**:
  - `app/login/page.tsx`: page shell, "Welcome back" heading, email + password form UI (fields only, submission logs or no-op), link to signup, metadata title "Log In | Mindora"
  - `app/signup/page.tsx`: "Create your account" heading, firstName/lastName/email/password UI fields, link to login, metadata title "Create Account | Mindora"
  - `app/dashboard/page.tsx`: dashboard shell with heading "Your Dashboard", placeholder grid (recent mood, affirmation, streak, community summary cards), metadata title "Dashboard | Mindora"
  - `app/profile/page.tsx`: profile shell (avatar, name, email display, edit UI placeholder), metadata
  - `app/settings/page.tsx`: settings sections (Account, Notifications, Privacy, Appearance) with placeholder toggles/inputs, metadata
  - Optional (useful but not required): `(auth)` or `(dashboard)` route groups if it simplifies layout — ensure routes remain at the exact paths specified.
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `rule` TR-12.1: GET `/login`, `/signup`, `/dashboard`, `/profile`, `/settings` each return HTTP 200; each page `<title>` matches intent; Evidence: dev server HTTP log + `<title>` extract

## Task 13: Firebase Integration (Auth + Firestore + Rules + Services)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Create `lib/firebase/config.ts`: initializeApp only when all NEXT_PUBLIC_FIREBASE env vars exist; else return null/noop; getAuth, getFirestore, getStorage exports
  - Create `lib/firebase/auth.ts`: typed wrappers `signInWithEmail`, `signUpWithEmail`, `signOut`, `onAuthStateChange` (with typed User); gracefully no-op when Firebase is not configured
  - Create `lib/firebase/firestore.ts`: typed functions `createUserDoc`, `getUserDoc`, `updateUserDoc`, `createPost`, `getPosts`, `addComment`, `toggleLike`, `createReport`, etc. with collection path constants matching required collections (users, posts, comments, likes, reports, communityChallenges, notifications)
  - Create `firestore.rules` in project root: secure rules — users can read/write only their own /users/{uid} doc; cannot modify fields subscriptionStatus, admin, role; posts: author can write own, all read public; comments/likes/reports — standard ownership; functions for ownership checks
  - Create `storage.rules` placeholder if desired (optional)
- **Acceptance Criteria Addressed**: AC-9, AC-14
- **Test Requirements**:
  - `rule` TR-13.1: Source files contain zero hardcoded `AIza` API keys; all Firebase config comes from `process.env.NEXT_PUBLIC_FIREBASE_*`; Evidence: `rg -n "AIza" src/ app/ lib/` returns 0 matches
  - `rule` TR-13.2: `firestore.rules` enforces that a user can only update their own user doc AND prohibits updating `subscriptionStatus` via `request.resource.data.keys().hasAny(['subscriptionStatus'])` style guard; Evidence: rules file content inspection
  - `rule` TR-13.3: All 7 named collections are referenced as constants or string paths in firestore service file: users, posts, comments, likes, reports, communityChallenges, notifications; Evidence: grep

## Task 14: SEO, Metadata, Sitemap, Robots
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6-Task 12 (pages)
- **Description**:
  - Each public page `page.tsx` exports `export const metadata: Metadata = { title, description, openGraph: {...} }` with unique title and OG
  - `app/sitemap.ts`: generate sitemap entries for all 6 public pages
  - `app/robots.ts`: allow all, sitemap URL
  - Default metadata and icons in Root Layout: favicon placeholders, apple-touch-icon via public folder or metadata
  - Run audit: every public page has exactly one `<h1>`; heading order respected; all `<img>` have non-empty alt
- **Acceptance Criteria Addressed**: AC-12, AC-14
- **Test Requirements**:
  - `rule` TR-14.1: Each of 6 public pages exports `metadata` with unique `title` containing "Mindora"; `app/sitemap.ts` and `app/robots.ts` exist; `/sitemap.xml` and `/robots.txt` return 200 with valid content; Evidence: metadata object per page + HTTP responses
  - `rule` TR-14.2: Home page heading hierarchy has exactly one `<h1>`; all `<h2>` are top-level sections; no skipped levels (h1→h3 without h2); all `<Image>` / `<img>` have non-empty alt; Evidence: axe/html-validate style DOM crawl

## Task 15: Responsive Polish, Animation Polish, Reduced Motion Final Pass
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6-Task 12
- **Description**:
  - Audit every page at widths 375px (iPhone), 768px (iPad), 1024px, 1440px: ensure no horizontal overflow, card stacking works, nav menu collapses, typography readable
  - Ensure all primary action buttons have min height/width >= 44px on mobile
  - Verify scroll animations (fade/slide) and phone floating with framer-motion or CSS; add `@media (prefers-reduced-motion: reduce)` overrides for every decorative animation
  - Add `scroll-behavior: smooth` with reduced-motion override
  - Verify card hover, button hover, and mood selection transitions are present but subtle
- **Acceptance Criteria Addressed**: AC-11, AC-13, AC-2
- **Test Requirements**:
  - `rule` TR-15.1: In viewport width 375px, `document.documentElement.scrollWidth === clientWidth` (no horizontal overflow) on every public page; Evidence: DevTools JS check on each page
  - `rule` TR-15.2: Source code references `prefers-reduced-motion: reduce` at least 3 times (globals + specific animations); Evidence: grep count
  - `rubric` TR-15.3: Overall responsive layout quality; scale 1-5; anchors 1=broken mobile, 3=works but cramped, 5=polished with dedicated mobile stacking decisions; threshold >=4; Evidence: breakpoint screenshots

## Task 16: Final Verification — Lint, Type-Check, Build, Smoke Test
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-Task 15
- **Description**:
  - Run `npm run lint` and fix any errors
  - Run `npx tsc --noEmit` and fix all TypeScript strict errors
  - Run `npm run build` and fix build errors
  - Manually start dev server and walk every route (11 pages: 6 public + 5 auth scaffolds) to verify:
    - No red console errors
    - No hydration mismatches (React warnings)
    - No Firebase errors when env vars absent (graceful no-op)
    - Nav links work, active page styles correct, mobile nav works
- **Acceptance Criteria Addressed**: AC-1, AC-14, NFR-1..NFR-4
- **Test Requirements**:
  - `rule` TR-16.1: `npm run lint` exits with 0 errors; `npx tsc --noEmit` exits 0; `npm run build` exits 0; Evidence: terminal output of all three commands pasted
  - `rule` TR-16.2: Manual smoke test — all 11 routes render in dev server without red console errors and without hydration warnings; no horizontal overflow detected on any page at mobile width; Evidence: checklist of pages with findings
