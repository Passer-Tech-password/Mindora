# Mindora Website - Product Requirements Document

## Overview
- **Summary**: Build a premium, production-quality marketing and web-app website for the mental wellness brand "Mindora" using Next.js App Router, TypeScript, Tailwind CSS, and Firebase. The site comprises 6 public pages (Home, Features, How It Works, Community, Premium, About) plus scaffolding for authenticated routes (login, signup, dashboard, profile, settings), with a premium calm/warm/modern design identity.
- **Purpose**: Establish the Mindora brand's public web presence as a calm, trustworthy, emotionally engaging wellness platform while preparing the architecture for future authenticated app functionality.
- **Target Users**: Individuals seeking mental and emotional wellness tools; potential Mindora app subscribers; community members who want to share, connect, and grow.

## Goals
- Deliver a cohesive premium visual identity across all pages matching the Mindora brand system (colors, typography, spacing, rounded corners, shadows, gradients).
- Implement 6 complete, production-ready public pages with rich content, interactive components, and responsive layouts.
- Architect a scalable component library with reusable UI primitives and proper TypeScript typing.
- Integrate Firebase (Auth, Firestore, Storage) via environment variables only; no hardcoded secrets.
- Implement SEO, accessibility, animations (with reduced-motion respect), and mobile-first responsive design.
- Scaffold authenticated route skeletons (/login, /signup, /dashboard, /profile, /settings) for future development.
- Ensure the project type-checks, lints cleanly, and builds successfully with Next.js.

## Non-Goals
- No real payment-processing / Stripe integration. Premium pages present pricing only; prepare clean architecture.
- No actual production Firebase content. Use mock data initially; prepare hooks and services for future connection.
- No real team members, testimonials with real people, or fabricated user-identifiable data.
- No admin panel, moderation tooling, or full community moderation workflows beyond report scaffolding.
- No native mobile apps. Web only.
- No deployment / CI/CD pipelines beyond what `next build` requires.

## Background & Context
- Greenfield repository: `c:\projects\Mindora-App` is empty at the start of this work.
- Brand identity and page copy are provided in the user's development prompt verbatim and should be followed closely.
- User explicitly requests a "premium, calm, warm, modern, elegant, human, trustworthy" aesthetic — not a hospital, generic SaaS, bank dashboard, or social-media clone.
- User profile preference: prioritize text legibility, high-contrast action buttons on dark backgrounds; robust long-term structural solutions; strict scoping.

## Functional Requirements

### Design System
- **FR-1**: A Tailwind configuration defines the exact Mindora brand colors (Deep Purple `#24143D`, Primary Purple `#5B3FA8`, Bright Purple `#6D3FE8`, Lavender `#B9A5E8`, Soft Lavender `#F0EAFB`, Off White `#FCFAFF`, Soft Gold `#D9B86C`, Text `#211A2B`, Secondary Text `#766D80`), Poppins or equivalent premium font, 20-32px rounded corners, soft shadows, and restrained gradients.
- **FR-2**: Global styles implement accessible base typography, smooth scrolling, reduced-motion support, and prevent horizontal overflow.

### Shared Components
- **FR-3**: Reusable `Navbar` component with logo, 6 nav links (Home, Features, How It Works, Community, Premium, About), right-side "Log In" and "Get Started" buttons, sticky behavior, active-page styling, mobile hamburger menu, and smooth transitions.
- **FR-4**: Reusable `Footer` with product/company/support link columns, newsletter signup UI, social icons.
- **FR-5**: Reusable primitive components: `Button`, `SectionHeading`, `PhoneMockup`, `MoodSelector`, `MoodCard`, `AffirmationCard`, `AudioPlayer`, `StreakCard`, `FeatureCard`, `CommunityPost`, `CommunityFeed`, `PricingCard`, `FAQAccordion`, `CTASection`.
- **FR-6**: Proper TypeScript types for: `User`, `Mood`, `Affirmation`, `AudioTrack`, `Post`, `Comment`, `Subscription`, and any additional domain entities.

### Public Pages
- **FR-7**: `/` (Home): Hero with headline/subheadline/CTAs + premium phone mockup; Benefits; Interactive Mood Section with 6 moods changing selected state and supporting message; Affirmations card with Listen/Save/Share; Explore cards (Self Love, Anxiety Relief, Better Sleep, Motivation, Confidence); Audio player section (Rain, Ocean, Forest, Night, Breathing, Piano); Streak visualization (14-day); Community preview posts; Dark purple Premium CTA with benefit list and pricing; Final CTA.
- **FR-8**: `/features`: Hero headline + 8 feature sections (Mood Check-ins, Daily Affirmations, Calming Audio, Positive Community, Daily Streaks, Saved Content, Personalized Experience, Privacy & Security) with alternating image/text layouts and app UI mockups.
- **FR-9**: `/how-it-works`: Hero + five numbered steps (Check In, Receive, Reset, Connect, Grow) with descriptions + final CTA.
- **FR-10**: `/community`: Hero + tabs (Top / Recent / Following) + New Post button + category chips (Daily Wins, Self Love, Anxiety Support, Motivation, Gratitude) + feed of anonymous-safe posts supporting likes/comments/shares/reporting/categories — calm wellness-focused aesthetic, not FB/IG.
- **FR-11**: `/premium`: Hero + benefits list + pricing ($4.99/month, $39.99/year, yearly highlighted as Best Value) + FAQ accordion. No payment processing.
- **FR-12**: `/about`: Hero + Mission statement + Values (Empathy First, Trust & Safety, Authentic Community, Growth Mindset, Positivity Always) + Story section + team placeholders (no real people) + final CTA.

### Authenticated Route Scaffolding
- **FR-13**: Route pages exist at `/login`, `/signup`, `/dashboard`, `/profile`, `/settings` with appropriate page shells and metadata. Minimal placeholder content. Ready for future feature development.

### Firebase
- **FR-14**: Firebase is initialized client-side only, reading from `NEXT_PUBLIC_FIREBASE_*` environment variables (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID). No hardcoded keys.
- **FR-15**: Auth service layer exposes typed helpers for email sign-in, sign-up, sign-out, and auth-state listening (Firebase Auth).
- **FR-16**: Firestore service layer exposes typed access for collections: `users`, `posts`, `comments`, `likes`, `reports`, `communityChallenges`, `notifications`. User doc fields: `uid, firstName, lastName, email, photoURL, createdAt, updatedAt, subscriptionStatus, streak, lastMood, onboardingCompleted`.
- **FR-17**: Secure Firestore security rules file is provided, enforcing: users can only read/write their own profile and own posts; cannot modify `subscriptionStatus`, admin roles, or other users' data; anonymous reads for public community content where allowed.
- **FR-18**: `.env.example` documents all required Firebase env vars.

### Animations
- **FR-19**: Subtle premium animations: fade/slide-on-scroll, floating phone mockup, card hover, button hover, mood selection smooth transitions, smooth navigation, soft background effects.
- **FR-20**: All animations respect `prefers-reduced-motion`; visually hidden / reduced variants exist where applicable.

### SEO & Accessibility
- **FR-21**: Every public page has unique SEO metadata (title, description), Open Graph tags, and properly structured headings (h1 → h2 → h3 hierarchy).
- **FR-22**: `sitemap.xml` and `robots.txt` are provided via Next.js metadata routes or static public files.
- **FR-23**: Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`) throughout; images have alt text; form inputs have labels; keyboard navigation works; visible focus states; color contrast meets WCAG AA at minimum.

### Responsive
- **FR-24**: All pages are excellent on Desktop, Laptop, Tablet, iPhone, Android. Intentional mobile layouts, not just shrunk desktop. Touch-friendly buttons (>= 44px hit area). No horizontal overflow. Responsive typography (fluid sizing or breakpoints). Proper card stacking. Mobile nav.

## Non-Functional Requirements
- **NFR-1**: TypeScript strict mode enabled; zero TypeScript errors in production build.
- **NFR-2**: Next.js lint (`next lint`) passes with no errors (warnings acceptable when justified).
- **NFR-3**: `next build` completes successfully and emits a production build.
- **NFR-4**: No console errors (red) during client navigation of public pages in dev mode; no hydration mismatches.
- **NFR-5**: All public routes are reachable via Next.js App Router under `/app` directory.
- **NFR-6**: Architecture is modular and scalable: components, hooks, services, lib, types, constants, mock data each have their own folders with clear separation.
- **NFR-7**: Performance: fonts are optimized via `next/font`; images use `next/image` where possible; layout shift is minimized.

## Constraints
- **Technical**: Next.js 14+ with App Router; TypeScript; React; Tailwind CSS; Firebase JS SDK; Lucide React icons. Server Components by default; Client Components only when interactivity required.
- **Business**: No fake payment processing. No invented real humans. No overwriting existing working functionality (currently none, greenfield).
- **Dependencies**: npm for package management. Node.js 18+.

## Assumptions
- Firebase env vars will be provided by the user; code defaults to graceful no-op when vars are absent (for local dev without Firebase credentials).
- Audio/visual assets: where actual audio files don't exist, UI is functional and visual only with state transitions.
- Lucide React icons are sufficient for all iconography; no custom icon font.
- Images use the provided text-to-image URL scheme from the engineering guidelines when concrete product photos are needed.

## Acceptance Criteria

### AC-1: Project Initialization and Buildability
- **Type**: `rule`
- **Given**: An empty repository
- **When**: A developer runs `npm install` followed by `npm run build`
- **Then**: The Next.js project initializes successfully and produces a clean production build with exit code 0
- **Pass Condition**: `next build` exits with code 0; TypeScript strict mode has 0 errors; lint errors do not block build
- **Evidence**: Terminal output of `npm run build` and `npx tsc --noEmit`

### AC-2: Design System and Brand Colors
- **Type**: `rule`
- **Given**: The Tailwind configuration
- **When**: Inspecting the color tokens and global styles
- **Then**: All 9 brand color values are present and mapped to semantic Tailwind color keys; global Poppins font is configured; border-radius and shadow presets match 20-32px rounded aesthetic
- **Pass Condition**: grep in tailwind config finds `#24143D`, `#5B3FA8`, `#6D3FE8`, `#B9A5E8`, `#F0EAFB`, `#FCFAFF`, `#D9B86C`, `#211A2B`, `#766D80`; font config references Poppins
- **Evidence**: `tailwind.config.ts` contents; `app/globals.css` contents

### AC-3: Navbar and Footer Across All Public Pages
- **Type**: `rule`
- **Given**: Any public page is rendered
- **When**: A user scrolls, resizes to mobile, or hovers nav items
- **Then**: A sticky Navbar with 6 links + 2 right buttons + working mobile menu + active-page styling is visible; Footer with 3 link columns, newsletter UI, and social icons is present below fold
- **Pass Condition**: `/`, `/features`, `/how-it-works`, `/community`, `/premium`, `/about` all render `<nav>` with exact 6 links and `<footer>`; mobile breakpoint shows hamburger
- **Evidence**: Dev-tool inspection of each public route; visual screenshot review

### AC-4: Home Page Completeness
- **Type**: `rule`
- **Given**: Route `/`
- **When**: The page is rendered and each section is inspected
- **Then**: Hero (headline + 2 CTAs + phone mockup), Benefits (4 items), Mood Section (6 interactive moods with state-change + message), Affirmation card (3 actions), Explore (5 cards), Audio (6 tracks + player), Streak (14-day + viz), Community preview posts, Premium CTA (6 benefits + 2 prices), Final CTA all exist and contain correct copy
- **Pass Condition**: DOM contains the exact hero headline and all section headings from the prompt; 6 mood buttons exist and respond to click (change selected state); affirmation card has Listen/Save/Share
- **Evidence**: DOM snapshot; interactive behavior verified in browser

### AC-5: Features / How It Works / About Pages Completeness
- **Type**: `rule`
- **Given**: Routes `/features`, `/how-it-works`, `/about`
- **When**: Each page is rendered
- **Then**: `/features` contains 8 named feature sections with alternating layouts; `/how-it-works` contains 5 numbered steps (01-05) plus CTA; `/about` contains Mission, 5 Values, Story, team placeholders, CTA
- **Pass Condition**: Page content matches the specified section headings and item counts exactly
- **Evidence**: DOM text content extraction

### AC-6: Community Page UX and Aesthetics
- **Type**: `rubric`
- **Dimension**: Calm, wellness-focused community page design and interaction quality
- **Scale**: 1-5
- **Anchors**: 1 = looks like generic social (FB/IG), cluttered, harsh contrast; 3 = functional feed with required widgets but flat/crowded aesthetic and minimal state; 5 = clearly calm/supportive/wellness-focused, generous whitespace, lavender accents, tabs/categories/posts all interactive with soft transitions, anonymous-friendly feel
- **Pass Threshold**: >= 4
- **Evidence**: Browser visual review + interaction (tab switch, category click, post like/comment mock)

### AC-7: Premium Page with Pricing and FAQ
- **Type**: `rule`
- **Given**: Route `/premium`
- **When**: Page renders and FAQ items are clicked
- **Then**: Hero, benefits list (6 items), two pricing cards ($4.99/month, $39.99/year with yearly "Best Value" highlight), and an accordion FAQ are all present; FAQ items expand/collapse
- **Pass Condition**: Both prices present exactly; yearly card has a visual "Best Value" badge; FAQ has >= 4 expandable items
- **Evidence**: DOM + click interaction

### AC-8: Authenticated Route Scaffolds
- **Type**: `rule`
- **Given**: Routes `/login`, `/signup`, `/dashboard`, `/profile`, `/settings`
- **When**: Navigating to each route
- **Then**: Each route returns HTTP 200, renders a page shell with proper title metadata, appropriate heading, and future-ready layout (e.g., login has email/password fields UI; dashboard has card placeholder grid)
- **Pass Condition**: All 5 routes return 200 in dev server; page titles match intent ("Log In | Mindora", etc.)
- **Evidence**: Dev server HTTP responses + DOM titles

### AC-9: Firebase Architecture and Security
- **Type**: `rule`
- **Given**: Firebase-related source files
- **When**: Inspecting code and rules
- **Then**: Initialization reads all 6 `NEXT_PUBLIC_FIREBASE_*` vars from env (no hardcoded keys); Auth and Firestore service layers exist with typed functions for the required collections; User type has all required fields; `firestore.rules` enforces per-user access and prohibits `subscriptionStatus` modification by end users
- **Pass Condition**: grep for hardcoded `"AIza"` etc. in source returns 0 matches; `.env.example` lists all 6 vars; rules file exists with `allow update: if ... isSubsetOf(["subscriptionStatus"])` style protections
- **Evidence**: File contents of `lib/firebase/`, `.env.example`, `firestore.rules`

### AC-10: Type Safety and Component Reuse
- **Type**: `rule`
- **Given**: The component library
- **When**: Inspecting page implementations
- **Then**: All pages reuse components from the shared component library (Navbar, Footer, Button, SectionHeading, cards listed in FR-5); types for User/Mood/Affirmation/AudioTrack/Post/Comment/Subscription exist as exported interfaces in a dedicated types file; pages do not inline those types
- **Pass Condition**: TS types file exists with all 7 named interfaces; every public page imports shared Navbar+Footer+at least 3 more shared components
- **Evidence**: `grep` for `export interface` in types; imports across pages

### AC-11: Responsive and Mobile Experience
- **Type**: `rubric`
- **Dimension**: Responsive layout quality across breakpoints
- **Scale**: 1-5
- **Anchors**: 1 = desktop-only with horizontal scroll on mobile; 3 = works on mobile but cramped, tiny hit targets, awkward card stacking; 5 = intentional mobile layouts at every breakpoint, no horizontal overflow, >=44px touch targets, smooth card stacking, dedicated mobile nav UX, readable typography
- **Pass Threshold**: >= 4
- **Evidence**: Chrome DevTools device emulation (iPhone 12, iPad, 1440p) screenshots + scroll tests

### AC-12: SEO and Accessibility Baseline
- **Type**: `rule`
- **Given**: The built site
- **When**: Checking metadata files and running axe-core or manual accessibility smoke tests
- **Then**: Each public page exports Next.js `metadata` with unique title/description; `sitemap.xml` is reachable; `robots.txt` is reachable; all images have `alt`; color contrast for body text and primary buttons >= AA (4.5:1); keyboard can tab through navbar links with visible focus ring; heading hierarchy has exactly one h1 per page
- **Pass Condition**: 6 public pages export `metadata`; `/sitemap.xml` 200 OK; `/robots.txt` 200 OK; axe smoke test returns 0 critical or serious violations on home page
- **Evidence**: Metadata file exports; HTTP checks for sitemap/robots; axe or lighthouse output

### AC-13: Animations and Reduced Motion
- **Type**: `rule`
- **Given**: Any page with scroll animations
- **When**: A user with `prefers-reduced-motion: reduce` enabled visits
- **Then**: Scroll-triggered fades, floating phone, and other decorative animations are disabled or reduced to opacity-only/instant transitions; functional hover/focus feedback still works
- **Pass Condition**: CSS uses `@media (prefers-reduced-motion: reduce)` overrides; animation JS hooks check matchMedia
- **Evidence**: Code search for `prefers-reduced-motion`; manual DevTools override test

### AC-14: Lint, Type-Check, Build Pass
- **Type**: `rule`
- **Given**: Final code state
- **When**: Running `npm run lint`, `npx tsc --noEmit`, `npm run build`
- **Then**: All three commands complete successfully (tsc exit 0 errors; build exit 0; lint exit 0 or non-blocking warnings only per agreed lint config)
- **Pass Condition**: Exit code 0 for tsc and build; lint has zero errors
- **Evidence**: Terminal output of all three commands

## Open Questions
- [ ] Confirm exact Firebase env values will be provided separately; proceed with `.env.example` and graceful fallbacks only.
- [ ] FAQ item count/content on Premium page not specified exactly — will use 5-6 sensible mental-wellness FAQs.
- [ ] Team placeholders on About page: will use anonymous silhouette-style avatars and generic titles (e.g., "Founder", "Wellness Lead") with no names.
- [ ] Audio track assets: no real audio files provided; will implement fully interactive UI-only player with play/pause/progress state visuals.
