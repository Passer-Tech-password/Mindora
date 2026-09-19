"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth, type MindoraUser } from "@/components/auth/AuthContext";
import {
  LayoutDashboard,
  UserCircle2,
  Bookmark,
  History,
  Users2,
  Crown,
  Settings as SettingsIcon,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  SmilePlus,
  Heart,
  Flame,
  Play,
  Sparkles,
  Headphones,
  ArrowRight,
  Quote,
  Share2,
  Share,
  BookmarkCheck,
  MoreHorizontal,
  MessageCircle,
  SkipBack,
  SkipForward,
  Volume2,
  ListPlus,
  Plus,
  Flower2,
  Menu,
  X,
} from "lucide-react";

/* ---------------- Nav ----------------- */

const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: UserCircle2 },
  { href: "/saved", label: "Saved Content", icon: Bookmark },
  { href: "/mood-history", label: "Mood History", icon: History },
  { href: "/community", label: "Community", icon: Users2 },
  { href: "/premium", label: "Premium", icon: Crown },
];

const MOODS = [
  { e: "😊", label: "Happy", bg: "#FEF3C7", ring: "#FACC15" },
  { e: "😌", label: "Calm", bg: "#E0E7FF", ring: "#6D3FE8" },
  { e: "😔", label: "Low", bg: "#EFF6FF", ring: "#93A6F1" },
  { e: "😟", label: "Anxious", bg: "#F3E8FF", ring: "#6D3FE8", active: true },
  { e: "😴", label: "Tired", bg: "#F3E8FF", ring: "#A78BFA" },
  { e: "😤", label: "Stressed", bg: "#FEE2E2", ring: "#F87171" },
];

const AUDIO_ICONS = [
  { label: "Rain", icon: "💧", bg: "linear-gradient(135deg,#3B1F6B,#5B3FA8)" },
  { label: "Ocean", icon: "🌊", bg: "linear-gradient(135deg,#4B6BFF,#5B3FA8)" },
  { label: "Forest", icon: "🌲", bg: "linear-gradient(135deg,#14532D,#1E6F5C)" },
  { label: "Night", icon: "🌙", bg: "linear-gradient(135deg,#1a0f30,#3B1F6B)" },
  { label: "Breathing", icon: "🫧", bg: "linear-gradient(135deg,#5B3FA8,#8B5CF6)" },
  { label: "Piano", icon: "🎵", bg: "linear-gradient(135deg,#6D3FE8,#C9B8F3)" },
];

const SAVED_TABS = ["Affirmations", "Audio", "Articles"] as const;

const AFFIRMATION_SAVED = [
  {
    title: "You are stronger than you think.",
    kind: "Affirmation",
    gradient:
      "linear-gradient(135deg,#E9D5FF 0%,#C9B8F3 40%,#6D3FE8 100%)",
  },
  {
    title: "Better Days Ahead",
    kind: "Affirmation",
    gradient:
      "linear-gradient(135deg,#FDE68A 0%,#F9A8D4 45%,#8B5CF6 100%)",
  },
  {
    title: "Peace begins within.",
    kind: "Affirmation",
    gradient:
      "linear-gradient(135deg,#C7D2FE 0%,#A7F3D0 55%,#818CF8 100%)",
  },
];

const FEED_TABS = ["Top", "Recent", "Following"] as const;

const COMMUNITY_POSTS = [
  {
    category: "Daily Wins",
    categoryColor: "bg-lavender/40 text-primaryPurple border-lavender",
    time: "2h ago",
    text: "Today I finally did something I've been putting off for months. Small win, but I'm proud of myself. 💜",
    likes: 128,
    comments: 24,
  },
  {
    category: "Self Love",
    categoryColor: "bg-pink-100/60 text-pink-600 border-pink-200/60",
    time: "4h ago",
    text: "Day 30 of choosing myself. I'm becoming someone I'm really proud of. ✨",
    likes: 96,
    comments: 18,
  },
  {
    category: "Anxiety Support",
    categoryColor: "bg-blue-100/60 text-blue-600 border-blue-200/60",
    time: "6h ago",
    text: "Progress isn't always loud. Sometimes it's just showing up, even when it's hard. 💙",
    likes: 74,
    comments: 12,
  },
];

/* ------------- Greeting helper ------------- */
function greetingFor(fullName: string) {
  const first = fullName.split(" ")[0] ?? "Friend";
  const hour =
    typeof window !== "undefined" ? new Date().getHours() : 9;
  if (hour < 12) return { phrase: "Good morning", emoji: "👋" };
  if (hour < 18) return { phrase: "Good afternoon", emoji: "☀️" };
  return { phrase: "Good evening", emoji: "🌙" };
}

/* =========================================================
    MAIN
========================================================= */

export function DashboardClient() {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTabSaved, setActiveTabSaved] =
    React.useState<(typeof SAVED_TABS)[number]>("Affirmations");
  const [feedTab, setFeedTab] =
    React.useState<(typeof FEED_TABS)[number]>("Top");
  const [moodPicked, setMoodPicked] = React.useState<string>("Anxious");
  const [likedPosts, setLikedPosts] = React.useState<Record<number, boolean>>({});
  const [savedSaved, setSavedSaved] = React.useState<Record<number, boolean>>({});
  const [likedAffirmation, setLikedAffirmation] = React.useState(false);
  const [savedAffirmation, setSavedAffirmation] = React.useState(false);
  const [audioPlaying, setAudioPlaying] = React.useState(true);
  const [audioProgress, setAudioProgress] = React.useState(34);
  const [volume, setVolume] = React.useState(70);

  React.useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  const greeting = user ? greetingFor(user.fullName) : greetingFor("Friend");

  if (!user) return null;

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-softLavender/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-deepPurple/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 bg-white/95 backdrop-blur-md border-r border-lavender/50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-lavender/40">
          <Link href="/" className="flex items-center gap-2">
            <div
              aria-hidden
              className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primaryPurple to-brightPurple"
            >
              <Flower2 className="h-5 w-5 text-offWhite" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold text-brandText">Mindora</div>
              <div className="text-[10px] text-brandSecondaryText tracking-widest uppercase">
                Elevate Your Mind Daily
              </div>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            className="lg:hidden h-9 w-9 rounded-xl border border-lavender/60 flex items-center justify-center text-brandSecondaryText hover:text-brandText"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard";
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brightPurple/10 text-brightPurple"
                    : "text-brandSecondaryText hover:text-brandText hover:bg-softLavender/60"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}

          <div className="my-5 border-t border-lavender/40" />

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-brandSecondaryText hover:text-brandText hover:bg-softLavender/60"
            onClick={() => setSidebarOpen(false)}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-brandSecondaryText hover:text-red-500 hover:bg-red-50/60"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </nav>

        <div className="p-5 pt-3">
          <div className="rounded-3xl p-5 text-center bg-gradient-to-b from-softLavender to-lavender">
            <svg viewBox="0 0 120 100" className="w-full h-20 mb-1" aria-hidden>
              <defs>
                <radialGradient id="lg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 30) rotate(90) scale(40 60)">
                  <stop stopColor="#6D3FE8" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#C9B8F3" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="60" cy="54" rx="46" ry="26" fill="url(#lg)" />
              <path d="M60 76 L32 60 C 24 46 32 30 50 30 C 56 24 68 24 74 30 C 92 30 100 46 92 60 L60 76Z" fill="#5B3FA8" opacity="0.9" />
              <path d="M60 68 L44 58 C 40 52 44 44 54 44 C 58 40 66 40 70 44 C 80 44 84 52 80 58 L60 68Z" fill="#6D3FE8" />
              <path d="M60 62 L50 54 C 48 50 50 46 56 46 C 58 44 66 44 68 46 C 74 46 76 50 74 54 L60 62Z" fill="#8B5CF6" />
              <circle cx="52" cy="50" r="1.4" fill="#D9B86C" />
              <circle cx="72" cy="50" r="1.4" fill="#D9B86C" />
            </svg>
            <div className="text-[13px] font-semibold text-brandText leading-tight">
              A calmer mind builds a brighter future.
            </div>
            <div className="h-1.5 w-4 mx-auto mt-3 rounded-full bg-brightPurple/70" />
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-offWhite/85 backdrop-blur-md border-b border-lavender/40">
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-10 py-4">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-10 w-10 rounded-2xl border border-lavender/60 bg-white flex items-center justify-center text-brandSecondaryText"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative flex-1 max-w-xl">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText/70">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="search"
                disabled
                aria-disabled="true"
                title="Search is coming soon"
                placeholder="Search Mindora (coming soon)"
                className="block w-full h-11 rounded-2xl border border-lavender/50 bg-white pl-11 pr-11 text-sm text-brandText placeholder:text-brandSecondaryText/50 disabled:opacity-80 disabled:cursor-not-allowed focus:outline-none"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-2 my-1.5 h-auto w-9 rounded-xl bg-lavender text-brandSecondaryText/70 flex items-center justify-center"
              >
                <Search className="h-4 w-4" />
              </span>
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="relative h-11 w-11 rounded-2xl border border-lavender/50 bg-white flex items-center justify-center text-brandSecondaryText hover:text-brandText transition"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                type="button"
                aria-label="Profile menu"
                className="flex items-center gap-2 rounded-2xl border border-lavender/50 bg-white py-1 pl-1 pr-3 h-11 hover:bg-softLavender transition-colors"
              >
                <div className="h-9 w-9 rounded-xl overflow-hidden ring-2 ring-lavender/50 bg-lavender">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <UserCircle2 className="h-6 w-6 text-brightPurple" />
                    </div>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 text-brandSecondaryText" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          {/* Hero Banner */}
          <section className="relative rounded-[2rem] overflow-hidden p-6 md:p-10 mb-6 lg:mb-8">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-softLavender via-indigo-100 to-violet-200"
            />
            <svg
              viewBox="0 0 800 220"
              aria-hidden
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <g opacity="0.95">
                <path d="M0,150 L80,110 L140,130 L200,90 L260,120 L320,80 L380,110 L440,95 L500,130 L560,100 L620,125 L680,95 L740,120 L800,100 L800,220 L0,220 Z" fill="#DDD6FE" opacity="0.6" />
                <path d="M0,170 L80,150 L150,165 L220,140 L300,160 L370,140 L430,160 L500,145 L560,170 L630,150 L700,170 L760,155 L800,170 L800,220 L0,220 Z" fill="#C7D2FE" opacity="0.75" />
                <path d="M0,190 L90,178 L170,190 L250,172 L330,190 L410,175 L500,192 L580,170 L660,190 L740,180 L800,195 L800,220 L0,220 Z" fill="#A78BFA" opacity="0.75" />
              </g>
              <g opacity="0.7">
                <path d="M0,200 L90,196 L170,200 L250,192 L330,200 L410,194 L500,200 L580,192 L660,200 L740,196 L800,202 L800,220 L0,220 Z" fill="#5B3FA8" />
              </g>
              <g>
                <path d="M640 34 L648 42 L660 44 L650 52 L652 64 L640 58 L628 64 L630 52 L620 44 L632 42 Z" fill="#24143D" />
                <path d="M680 28 Q684 34 690 34 Q684 38 684 44 Q680 38 674 38 Q676 34 680 28Z" fill="#24143D" />
              </g>
            </svg>
            <div
              aria-hidden
              className="absolute top-0 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-white/40 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-brandText">
                {greeting.phrase}, {user.firstName}! {greeting.emoji}
              </h1>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-brandSecondaryText/90">
                Take a moment for yourself. You&apos;re doing great.
              </p>
            </div>
            <div
              aria-hidden
              className="hidden md:block absolute right-6 md:right-10 top-6 md:top-10 max-w-[220px]"
            >
              <svg viewBox="0 0 220 80" className="w-full h-auto">
                <text
                  x="0"
                  y="30"
                  fontSize="20"
                  fontFamily="'Dancing Script', cursive, 'Brush Script MT', serif"
                  fill="#5B3FA8"
                  fontStyle="italic"
                  opacity="0.9"
                >
                  Small steps
                </text>
                <text
                  x="44"
                  y="58"
                  fontSize="20"
                  fontFamily="'Dancing Script', cursive, 'Brush Script MT', serif"
                  fill="#6D3FE8"
                  fontStyle="italic"
                  opacity="0.9"
                >
                  make big changes
                </text>
                <text x="170" y="46" fontSize="20" fill="#D946EF" opacity="0.8">
                  ♡
                </text>
              </svg>
            </div>
          </section>

          {/* Grid: left main widgets + right sidebar */}
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* LEFT COLUMN */}
            <div className="space-y-6 lg:space-y-8">
              {/* Mood Check-in + Daily Affirmation + 14 Day Streak row */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,0.8fr)]">
                {/* MOOD */}
                <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-softLavender flex items-center justify-center text-brightPurple">
                        <SmilePlus className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brandText tracking-tight">
                          Mood Check-in
                        </h3>
                        <p className="text-[13px] text-brandSecondaryText -mt-0.5">
                          How are you feeling right now?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3">
                    {MOODS.map((m) => {
                      const picked = moodPicked === m.label;
                      return (
                        <button
                          key={m.label}
                          type="button"
                          onClick={() => setMoodPicked(m.label)}
                          className={`group flex flex-col items-center gap-2 rounded-2xl py-3 px-1 border transition-colors ${
                            picked
                              ? "border-brightPurple bg-brightPurple/10 shadow-card"
                              : "border-transparent hover:bg-softLavender/60"
                          }`}
                          style={
                            picked
                              ? { boxShadow: `0 0 0 2px ${m.ring}55` }
                              : undefined
                          }
                          aria-label={`Pick ${m.label} mood`}
                        >
                          <div
                            className="h-11 w-11 md:h-12 md:w-12 rounded-2xl flex items-center justify-center text-xl"
                            style={{ backgroundColor: m.bg }}
                          >
                            {m.e}
                          </div>
                          <span className="text-[11px] font-medium text-brandText">
                            {m.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className="mt-5 rounded-2xl p-5 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(120deg,#F3EDFF 0%,#E0E7FF 55%,#F5F3FF 100%)",
                    }}
                  >
                    <div className="absolute right-0 -bottom-1 w-28 h-28 opacity-60">
                      <svg viewBox="0 0 100 100" aria-hidden>
                        <g fill="#6D3FE8" opacity="0.55">
                          <path d="M50 10 C 58 20 62 28 56 38 C 66 40 72 48 64 56 C 74 60 82 70 72 80 C 78 88 70 96 60 92 L 50 98 L 40 92 C 30 96 22 88 28 80 C 18 70 26 60 36 56 C 28 48 34 40 44 38 C 38 28 42 20 50 10 Z" />
                          <ellipse cx="50" cy="58" rx="18" ry="14" fill="#C9B8F3" />
                          <path d="M32 62 C 40 72 60 72 68 62" stroke="#5B3FA8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </g>
                      </svg>
                    </div>
                    <div className="relative max-w-[78%]">
                      <div className="flex items-center gap-2">
                        <Flower2 className="h-4.5 w-4.5 text-brightPurple" />
                        <h4 className="font-semibold text-brandText">
                          Feeling anxious?
                        </h4>
                      </div>
                      <p className="mt-1 text-[13px] text-brandSecondaryText leading-snug">
                        Take a breath. You&apos;re allowed to slow down.
                      </p>
                      <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-brightPurple text-offWhite text-sm font-medium px-4 py-2 hover:bg-primaryPurple transition">
                        Start a 2-Minute Reset
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* DAILY AFFIRMATION */}
                <section
                  className="relative rounded-3xl overflow-hidden shadow-card border border-white/40 p-5 md:p-6 text-offWhite"
                  style={{
                    background:
                      "linear-gradient(150deg,#C7D2FE 0%,#818CF8 25%,#7C3AED 55%,#24143D 100%)",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-80"
                    style={{
                      background:
                        "radial-gradient(circle at 70% 20%, rgba(251,191,36,0.25), transparent 45%), radial-gradient(circle at 30% 30%, rgba(253,224,71,0.35), transparent 40%)",
                    }}
                  />
                  <svg
                    viewBox="0 0 500 340"
                    aria-hidden
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <g opacity="0.95">
                      <path d="M0,200 L60,170 L110,190 L170,150 L220,180 L280,140 L340,170 L400,160 L460,190 L500,170 L500,340 L0,340 Z" fill="#5B3FA8" opacity="0.55" />
                      <path d="M0,240 L70,215 L140,230 L210,200 L270,230 L340,205 L400,230 L460,215 L500,232 L500,340 L0,340 Z" fill="#3B1F6B" opacity="0.7" />
                      <path d="M0,280 L80,262 L160,280 L240,258 L320,280 L400,260 L500,285 L500,340 L0,340 Z" fill="#1a0f30" opacity="0.9" />
                    </g>
                  </svg>
                  <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        <Sparkles className="h-4.5 w-4.5 text-softGold" />
                      </div>
                      <span className="font-semibold tracking-wider text-[13px]">
                        Daily Affirmation
                      </span>
                    </div>
                    <span className="text-[11px] bg-white/15 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                      Today
                    </span>
                  </div>

                  <div className="relative py-6 md:py-8 text-center px-2 md:px-6">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 opacity-80">
                      <Quote className="h-7 w-7 text-softGold/80" />
                    </div>
                    <blockquote className="text-2xl md:text-3xl lg:text-[32px] font-semibold tracking-tight leading-tight max-w-md mx-auto">
                      &ldquo;You are doing better than you think.&rdquo;
                    </blockquote>
                  </div>

                  <div className="relative flex items-center justify-between mt-2 md:mt-4 gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-full bg-white/95 text-deepPurple font-semibold text-sm px-4 py-2.5 hover:bg-white transition shadow-card"
                        onClick={() => setAudioPlaying((p) => !p)}
                        aria-label={audioPlaying ? "Pause affirmation" : "Play affirmation"}
                      >
                        <span className="h-6 w-6 rounded-full bg-brightPurple text-offWhite flex items-center justify-center">
                          <Play className="h-3 w-3 ml-0.5" fill="currentColor" />
                        </span>
                        Listen
                      </button>
                      <button
                        type="button"
                        onClick={() => setSavedAffirmation((s) => !s)}
                        aria-label="Save affirmation"
                        className={`h-10 w-10 rounded-full border backdrop-blur-sm flex items-center justify-center transition ${
                          savedAffirmation
                            ? "bg-softGold/20 border-softGold/60 text-softGold"
                            : "bg-white/15 border-white/25 text-white hover:bg-white/25"
                        }`}
                      >
                        <Bookmark
                          className="h-4.5 w-4.5"
                          fill={savedAffirmation ? "currentColor" : "none"}
                        />
                      </button>
                      <button
                        type="button"
                        aria-label="Share affirmation"
                        className="h-10 w-10 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center hover:bg-white/25 backdrop-blur-sm"
                      >
                        <Share2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* 14 DAY STREAK */}
                <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-brandText tracking-tight flex items-center gap-2">
                        <Flame className="h-4.5 w-4.5 text-orange-500 fill-orange-400" />
                        14 Day Streak
                        <Flame className="h-4.5 w-4.5 text-orange-500 fill-orange-400" />
                      </h3>
                      <p className="text-[12px] text-brandSecondaryText mt-1">
                        Consistency is the key to a better you.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mt-4 mb-2">
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => {
                      const filled = i < 6;
                      return (
                        <div key={d} className="flex flex-col items-center gap-2">
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs ${
                              filled
                                ? ""
                                : "bg-softLavender text-brandSecondaryText border border-lavender"
                            }`}
                            style={
                              filled
                                ? {
                                    background:
                                      "linear-gradient(135deg,#6D3FE8,#5B3FA8)",
                                    boxShadow:
                                      "0 4px 14px rgba(109,63,232,0.28)",
                                  }
                                : undefined
                            }
                          >
                            {filled ? (
                              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                                <path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : null}
                          </div>
                          <span className="text-[10px] text-brandSecondaryText">
                            {d}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="mt-3 w-full flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-medium text-brightPurple hover:bg-softLavender/60 transition"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* Quick actions card section below */}
                  <div className="mt-5 rounded-2xl bg-softLavender/60 p-4">
                    <h4 className="font-semibold text-brandText mb-3 text-[15px]">
                      Quick Actions
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        {
                          icon: Headphones,
                          title: "Explore Audio",
                          sub: "Relax, focus, sleep",
                          color: "#6D3FE8",
                        },
                        {
                          icon: Sparkles,
                          title: "Browse Affirmations",
                          sub: "Find your daily boost",
                          color: "#D9B86C",
                        },
                        {
                          icon: Users2,
                          title: "Join Community",
                          sub: "Share and grow",
                          color: "#7C3AED",
                        },
                        {
                          icon: Crown,
                          title: "Upgrade to Premium",
                          sub: "Unlock more features",
                          color: "#F59E0B",
                        },
                      ].map(({ icon: Icon, title, sub, color }) => (
                        <button
                          key={title}
                          type="button"
                          className="w-full flex items-center gap-3 rounded-2xl bg-white border border-lavender/60 p-3 text-left hover:border-brightPurple/50 hover:shadow-soft transition group"
                        >
                          <span
                            className="h-9 w-9 rounded-2xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: `${color}18`,
                              color,
                            }}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-brandText leading-tight">
                              {title}
                            </span>
                            <span className="block text-[11px] text-brandSecondaryText truncate">
                              {sub}
                            </span>
                          </span>
                          <ArrowRight className="h-4 w-4 text-brandSecondaryText group-hover:text-brightPurple transition" />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* CALMING AUDIO + SAVED FOR LATER */}
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                {/* Audio */}
                <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-softLavender flex items-center justify-center text-brightPurple">
                        <Headphones className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brandText tracking-tight">
                          Calming Audio
                        </h3>
                        <p className="text-[13px] text-brandSecondaryText -mt-0.5">
                          Press play. Let the world slow down.
                        </p>
                      </div>
                    </div>
                    <button className="text-[12px] font-semibold text-brightPurple flex items-center gap-1 hover:text-primaryPurple">
                      View All
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 mb-5">
                    {AUDIO_ICONS.map((s, idx) => {
                      const active = idx === 0;
                      return (
                        <button
                          key={s.label}
                          type="button"
                          className={`group flex flex-col items-center gap-2 rounded-2xl py-3 border transition-all ${
                            active
                              ? "bg-softLavender border-brightPurple/60 shadow-soft"
                              : "bg-softLavender/40 border-transparent hover:bg-softLavender"
                          }`}
                        >
                          <div
                            className="h-11 w-11 md:h-12 md:w-12 rounded-full flex items-center justify-center text-lg"
                            style={{ background: s.bg }}
                          >
                            <span className="drop-shadow">{s.icon}</span>
                          </div>
                          <span className="text-[11px] font-medium text-brandText">
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Now Playing row */}
                  <div className="rounded-2xl bg-softLavender/70 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-16 w-20 rounded-2xl overflow-hidden shrink-0"
                        style={{
                          background:
                            "linear-gradient(180deg,#3B1F6B 0%,#1a0f30 100%)",
                        }}
                      >
                        <div className="relative w-full h-full flex items-end p-2">
                          <div className="absolute top-2 left-3 h-6 w-6 rounded-full bg-[#C9B8F3]/80 blur-[1px]" />
                          <div
                            className="absolute top-3 right-2 text-[10px] text-white/90"
                            aria-hidden
                          >
                            💧
                          </div>
                          <svg
                            viewBox="0 0 80 40"
                            className="w-full h-6"
                            aria-hidden
                          >
                            <path
                              d="M0 32 L15 24 L30 28 L45 16 L60 26 L80 20"
                              fill="none"
                              stroke="#6D3FE8"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-brandText truncate">
                          Rain Sounds
                        </div>
                        <div className="text-[12px] text-brandSecondaryText truncate">
                          Deep relaxation · 10 min
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-lavender/70 overflow-hidden">
                          <div
                            className="h-full bg-brightPurple rounded-full transition-all"
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-brandSecondaryText">
                          <span>
                            0{Math.floor((audioProgress / 100) * 10)}:
                            {String(
                              Math.floor(((audioProgress / 100) * 600) % 60)
                            ).padStart(2, "0")}
                          </span>
                          <span>10:00</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          type="button"
                          aria-label="Previous track"
                          className="h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-brandSecondaryText hover:text-brandText hover:bg-white"
                        >
                          <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                        <button
                          type="button"
                          aria-label={audioPlaying ? "Pause track" : "Play track"}
                          onClick={() => setAudioPlaying((p) => !p)}
                          className="h-11 w-11 md:h-12 md:w-12 rounded-full text-offWhite flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg,#6D3FE8 0%,#5B3FA8 100%)",
                            boxShadow:
                              "0 8px 22px rgba(109,63,232,0.35)",
                          }}
                        >
                          {audioPlaying ? (
                            <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-5.5 md:w-5.5" fill="currentColor">
                              <rect x="6" y="5" width="4" height="14" rx="1.5" />
                              <rect x="14" y="5" width="4" height="14" rx="1.5" />
                            </svg>
                          ) : (
                            <Play
                              className="h-5 w-5 md:h-5.5 md:w-5.5 ml-0.5"
                              fill="currentColor"
                            />
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label="Next track"
                          className="h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-brandSecondaryText hover:text-brandText hover:bg-white"
                        >
                          <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setLikedAffirmation((p) => !p)}
                          aria-label={likedAffirmation ? "Unlike audio" : "Like audio"}
                          className={`h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center transition ${
                            likedAffirmation
                              ? "text-pink-500 bg-pink-50"
                              : "text-brandSecondaryText hover:text-pink-500 hover:bg-pink-50"
                          }`}
                        >
                          <Heart
                            className="h-4.5 w-4.5"
                            fill={likedAffirmation ? "currentColor" : "none"}
                          />
                        </button>
                        <button
                          type="button"
                          aria-label="Playlist"
                          className="hidden md:flex h-9 w-9 rounded-full items-center justify-center text-brandSecondaryText hover:text-brandText hover:bg-white"
                        >
                          <ListPlus className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-brandSecondaryText" />
                          <input
                            aria-label="Volume"
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="accent-brightPurple h-1 w-16 md:w-20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Saved For Later */}
                <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-softLavender flex items-center justify-center text-brightPurple">
                        <Bookmark className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brandText tracking-tight">
                          Saved for Later
                        </h3>
                      </div>
                    </div>
                    <button className="text-[12px] font-semibold text-brightPurple flex items-center gap-1 hover:text-primaryPurple">
                      View All
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Tab filter */}
                  <div className="flex items-center gap-1 rounded-2xl bg-softLavender/60 p-1 mb-4 w-fit">
                    {SAVED_TABS.map((tab) => {
                      const active = activeTabSaved === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setActiveTabSaved(tab)}
                          className={`px-3.5 py-1.5 rounded-xl text-[12px] font-medium transition ${
                            active
                              ? "bg-white text-brightPurple shadow-card"
                              : "text-brandSecondaryText hover:text-brandText"
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    {AFFIRMATION_SAVED.map((item, i) => {
                      const isSaved = savedSaved[i];
                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-2xl bg-softLavender/40 p-2.5 hover:bg-softLavender/70 transition"
                        >
                          <div
                            className="h-14 w-14 rounded-2xl shrink-0 overflow-hidden"
                            style={{ background: item.gradient }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[14px] font-semibold text-brandText truncate">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-brandSecondaryText">
                              {item.kind}
                            </div>
                          </div>
                          <button
                            type="button"
                            aria-label={isSaved ? "Unsave" : "Save"}
                            onClick={() =>
                              setSavedSaved((s) => ({ ...s, [i]: !s[i] }))
                            }
                            className={`h-8 w-8 rounded-xl flex items-center justify-center transition ${
                              isSaved
                                ? "text-brightPurple bg-white"
                                : "text-brandSecondaryText hover:text-brightPurple hover:bg-white/80"
                            }`}
                          >
                            <BookmarkCheck
                              className="h-4 w-4"
                              fill={isSaved ? "currentColor" : "none"}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* PROFILE CARD (mobile-only at top of right col via grid order - keep here for desktop via xl-grid, mobile place after community) */}
              <div className="order-last xl:order-none xl:hidden">
                <UserProfileCard user={user} />
              </div>

              {/* COMMUNITY FEED */}
              <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-softLavender flex items-center justify-center text-brightPurple">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brandText tracking-tight">
                        Community Feed
                      </h3>
                      <p className="text-[12px] text-brandSecondaryText -mt-0.5">
                        You&apos;re not alone. Share, read and grow together.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 rounded-2xl bg-softLavender/60 p-1">
                      {FEED_TABS.map((t) => {
                        const active = feedTab === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFeedTab(t)}
                            className={`px-3 py-1.5 rounded-xl text-[12px] font-medium transition ${
                              active
                                ? "bg-brightPurple text-white shadow-card"
                                : "text-brandSecondaryText hover:text-brandText"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      rightIcon={<Plus className="h-3.5 w-3.5" />}
                    >
                      New Post
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {COMMUNITY_POSTS.map((post, idx) => {
                    const liked = !!likedPosts[idx];
                    const likeCount = post.likes + (liked ? 1 : 0);
                    return (
                      <article
                        key={idx}
                        className="rounded-2xl bg-softLavender/50 p-4 border border-transparent hover:border-lavender hover:bg-white hover:shadow-soft transition"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10.5px] font-semibold ${post.categoryColor}`}
                          >
                            {post.category}
                          </span>
                          <button
                            type="button"
                            aria-label="More options"
                            className="h-7 w-7 rounded-full hover:bg-white flex items-center justify-center text-brandSecondaryText"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="h-8 w-8 rounded-full bg-lavender flex items-center justify-center">
                            <UserCircle2 className="h-5 w-5 text-brightPurple/80" />
                          </div>
                          <div className="leading-tight">
                            <div className="text-[13px] font-semibold text-brandText">
                              Anonymous
                            </div>
                            <div className="text-[11px] text-brandSecondaryText">
                              {post.time}
                            </div>
                          </div>
                        </div>
                        <p className="text-[13.5px] text-brandText leading-relaxed mb-4">
                          {post.text}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setLikedPosts((s) => ({
                                  ...s,
                                  [idx]: !s[idx],
                                }))
                              }
                              aria-label={liked ? "Unlike post" : "Like post"}
                              className={`inline-flex items-center gap-1.5 text-[12px] font-medium transition ${
                                liked
                                  ? "text-pink-500"
                                  : "text-brandSecondaryText hover:text-pink-500"
                              }`}
                            >
                              <Heart
                                className="h-4 w-4"
                                fill={liked ? "currentColor" : "none"}
                              />
                              {likeCount}
                            </button>
                            <button
                              type="button"
                              aria-label="Comment"
                              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brandSecondaryText hover:text-brightPurple transition"
                            >
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </button>
                            <button
                              type="button"
                              aria-label="Share"
                              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brandSecondaryText hover:text-brightPurple transition"
                            >
                              <Share className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* PREMIUM CTA */}
              <section
                className="relative rounded-[1.75rem] overflow-hidden p-6 md:p-7 text-offWhite"
                style={{
                  background:
                    "linear-gradient(120deg,#24143D 0%,#4C1D95 45%,#6D3FE8 100%)",
                }}
              >
                <svg
                  viewBox="0 0 600 200"
                  aria-hidden
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <g opacity="0.45">
                    <path d="M0,160 L60,120 L120,140 L180,110 L240,130 L300,100 L360,130 L420,115 L480,140 L540,120 L600,135 L600,200 L0,200 Z" fill="#3B1F6B" />
                  </g>
                  <g fill="#C9B8F3" opacity="0.12">
                    <circle cx="500" cy="30" r="4" />
                    <circle cx="540" cy="60" r="2" />
                    <circle cx="440" cy="50" r="2.5" />
                    <circle cx="480" cy="90" r="2" />
                  </g>
                </svg>
                <div className="relative flex items-center gap-4 md:gap-6">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#C9B8F3,#6D3FE8)" }}
                  >
                    <Flower2 className="h-8 w-8 text-white" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                      Ready for more?
                    </h3>
                    <p className="text-[13px] md:text-sm text-white/80 mt-1 max-w-xl">
                      Unlock premium features and get the most out of your
                      Mindora experience.
                    </p>
                  </div>
                  <Button
                    size="md"
                    variant="secondary"
                    asChild
                    className="bg-white !text-deepPurple hover:!bg-white/90 border-0 shadow-card shrink-0"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    <Link href="/premium">Upgrade to Premium</Link>
                  </Button>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (desktop only profile etc.) */}
            <div className="hidden xl:flex flex-col gap-6 lg:gap-8">
              <UserProfileCard user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Subcomponent: right sidebar profile card --------- */
function UserProfileCard({ user }: { user: MindoraUser }) {
  const stats = user.stats;
  return (
    <section className="rounded-3xl bg-white border border-lavender/50 shadow-card p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-softGold via-brightPurple to-primaryPurple p-[2px]">
            <div className="h-full w-full rounded-[14px] overflow-hidden bg-lavender">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <UserCircle2 className="h-9 w-9 text-brightPurple" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-brandText truncate">
            {user.fullName}
          </h4>
          <p className="text-[12px] text-brandSecondaryText truncate">
            Mindora Member
          </p>
          <span className="mt-1 inline-flex items-center rounded-full border border-lavender bg-softLavender text-[10.5px] font-semibold text-brightPurple px-2.5 py-0.5 tracking-wide">
            {user.plan === "premium" ? "Premium Plan" : "Free Plan"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-5">
        {[
          { label: "Day Streak", value: stats.currentStreak },
          { label: "Saved Items", value: stats.savedItems },
          { label: "Community Posts", value: stats.communityPosts },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-softLavender/60 py-3 text-center"
          >
            <div className="text-lg font-bold text-brandText leading-none">
              {s.value}
            </div>
            <div className="text-[10.5px] text-brandSecondaryText mt-1 leading-tight">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-brandText">
            Your Wellness Journey
          </div>
          <div className="text-[12px] font-bold text-brightPurple">
            Level {stats.level}
          </div>
        </div>
        <div className="h-2.5 rounded-full bg-softLavender overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${stats.wellnessProgress}%`,
              background:
                "linear-gradient(90deg,#D9B86C 0%,#6D3FE8 100%)",
            }}
          />
        </div>
        <p className="mt-2 text-[11px] text-brandSecondaryText">
          Keep going! You&apos;re making progress.
        </p>
      </div>
    </section>
  );
}
