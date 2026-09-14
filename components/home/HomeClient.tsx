"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import {
  affirmations,
  benefitsHome,
  exploreCategories,
  moods,
  premiumBenefits,
} from "@/constants";
import { posts, weekStreakData } from "@/data/mockData";
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  Heart,
  Headphones,
  Play,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

function HomePhoneScreen() {
  return (
    <div className="flex flex-col h-full px-4 pb-4 text-[11px]">
      <div className="flex items-center justify-between px-1 pt-2 pb-2">
        <div>
          <div className="text-[10px] text-brandSecondaryText">Good morning,</div>
          <div className="text-sm font-semibold text-brandText">Sarah ✨</div>
        </div>
        <button className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-softLavender" aria-label="More options">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brandSecondaryText" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="mt-1 rounded-2xl bg-white/80 backdrop-blur border border-lavender/40 p-3">
        <div className="text-[10px] font-semibold text-brandSecondaryText mb-2">
          How are you feeling today?
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { emoji: "😊", label: "Happy", bg: "#FEF3C7" },
            { emoji: "😌", label: "Calm", bg: "#E0E7FF" },
            { emoji: "🥰", label: "Love", bg: "#FCE7F3", active: true },
            { emoji: "😔", label: "Low", bg: "#F3E8FF" },
          ].map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl py-1.5",
                m.active ? "ring-2 ring-brightPurple ring-offset-1" : ""
              )}
              style={{ backgroundColor: m.bg }}
            >
              <span className="text-sm leading-none">{m.emoji}</span>
              <span className="text-[8px] font-semibold text-brandText">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
          {[
            { emoji: "😰", label: "Anxious", bg: "#EDE9FE" },
            { emoji: "😴", label: "Tired", bg: "#DDD6FE" },
            { emoji: "😡", label: "Stressed", bg: "#F5D0FE" },
            { emoji: "🤔", label: "Meh", bg: "#F3E8FF" },
          ].map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-0.5 rounded-xl py-1.5"
              style={{ backgroundColor: m.bg }}
            >
              <span className="text-sm leading-none">{m.emoji}</span>
              <span className="text-[8px] font-semibold text-brandText">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-white border border-lavender/50 p-3 shadow-soft">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Quote className="h-3 w-3 text-brightPurple" />
            <span className="text-[9px] font-semibold uppercase tracking-widest text-brightPurple">
              Today&apos;s Affirmation
            </span>
          </div>
          <Bookmark className="h-3 w-3 text-brandSecondaryText" />
        </div>
        <p className="text-[12px] font-medium leading-snug text-brandText">
          You don&apos;t have to have everything figured out today.
        </p>
        <button className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-brightPurple text-offWhite px-2.5 py-1.5 text-[10px] font-semibold">
          <Play className="h-3 w-3 fill-current" /> Listen
        </button>
      </div>

      <div className="mt-3 rounded-2xl bg-white/80 border border-lavender/40 p-3">
        <div className="flex items-center gap-2 mb-2.5">
          <Flame className="h-3.5 w-3.5 text-softGold fill-softGold" />
          <span className="text-[10px] font-semibold text-brandText">7 Day Streak 🔥</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "aspect-square w-full rounded-full flex items-center justify-center text-[9px] font-bold",
                  i < 6
                    ? "bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite"
                    : "bg-softLavender/60 text-brandSecondaryText"
                )}
              >
                {i < 6 ? "✓" : d}
              </div>
              <span className="text-[8px] text-brandSecondaryText">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AudioPhoneScreen() {
  return (
    <div className="flex flex-col h-full px-4 py-4 text-[11px] bg-gradient-to-b from-deepPurple via-[#2a1850] to-[#1a0f30]">
      <div className="flex items-center justify-between px-1 pt-1 pb-3 text-offWhite">
        <button type="button" aria-label="Go back" className="hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[10px] font-semibold">Moonlit Calm</span>
        <button type="button" aria-label="More audio options" className="hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="mx-2 mt-2 aspect-square rounded-3xl overflow-hidden shadow-glow relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#24143D] via-[#3a1f6b] to-[#1a0f30]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-3/4 h-3/4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4a3080]/60 via-[#2a1850]/80 to-[#1a0f30]" />
            <div className="absolute top-6 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#f5f5f5] via-[#e8e0ff] to-[#b9a5e8] shadow-[0_0_40px_rgba(255,255,255,0.3)]" />
          </div>
        </div>
      </div>

      <div className="mt-4 px-2">
        <div className="text-offWhite font-semibold text-sm">Moonlit Calm</div>
        <div className="text-lavender/70 text-[10px] mt-0.5">Ambient • 45 min</div>
      </div>

      <div className="mt-4 mx-2">
        <div className="h-1 w-full rounded-full bg-offWhite/15 overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-softGold to-lavender" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 text-offWhite">
        <button type="button" aria-label="Previous track" className="hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button type="button" aria-label="Pause audio" className="h-12 w-12 rounded-full bg-offWhite flex items-center justify-center text-deepPurple shadow-glow hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5" fill="currentColor" aria-hidden="true">
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
        </button>
        <button type="button" aria-label="Next track" className="hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function getIcon(name: string) {
  const map: Record<string, keyof typeof LucideIcons> = {
    smile: "Smile",
    quote: "Quote",
    headphones: "Headphones",
    users: "Users",
    heart: "Heart",
    wind: "Wind",
    moon: "Moon",
    sparkles: "Sparkles",
    zap: "Zap",
    flame: "Flame",
    bookmark: "Bookmark",
    "shield-check": "ShieldCheck",
    trophy: "Trophy",
    shield: "Shield",
    sunrise: "Sunrise",
  };
  const resolved = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    map[name] ?? "Sparkles"
  ] ?? LucideIcons.Sparkles;
  return resolved;
}

function Benefits() {
  const icons = [LucideIcons.Smile, LucideIcons.Quote, LucideIcons.Headphones, LucideIcons.Users];
  return (
    <section className="container py-12 md:py-16 -mt-4 relative z-10">
      <div className="rounded-[2rem] bg-white/80 backdrop-blur border border-lavender/50 p-6 md:p-8 shadow-card">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefitsHome.map((b, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <div key={b.id} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-brandText tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-xs md:text-sm text-brandSecondaryText leading-relaxed max-w-[200px] mx-auto">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MoodSection() {
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          Your mood. Your moment.{" "}
          <span className="text-gradient">Your Mindora.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-brandSecondaryText">
          How are you feeling right now?
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              className="group relative flex flex-col items-center justify-center rounded-3xl transition-colors duration-300 p-4 md:p-5 bg-white hover:bg-white/80 hover:shadow-card border border-lavender/40"
            >
              <span className="text-4xl sm:text-5xl leading-none transition-transform duration-300 group-hover:scale-110 select-none">
                {m.emoji}
              </span>
              <span className="mt-2 text-sm font-semibold text-brandSecondaryText group-hover:text-brandText">
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="rounded-[2rem] bg-gradient-to-br from-softLavender/80 via-offWhite to-softLavender/60 border border-lavender/50 p-6 md:p-8 overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="relative flex justify-center md:justify-start">
                <div className="relative w-56 h-48">
                  <svg viewBox="0 0 300 250" className="w-full h-full">
                    <defs>
                      <linearGradient id="leaf1g" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#B9A5E8" />
                        <stop offset="100%" stopColor="#6D3FE8" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="50" cy="70" rx="40" ry="20" fill="#F0EAFB" transform="rotate(-20 50 70)" opacity="0.6" />
                    <ellipse cx="260" cy="50" rx="30" ry="15" fill="url(#leaf1g)" transform="rotate(30 260 50)" opacity="0.5" />
                    <circle cx="150" cy="130" r="75" fill="#6D3FE8" opacity="0.08" />
                    <circle cx="150" cy="120" r="30" fill="#D9B86C" opacity="0.3" />
                    <ellipse cx="150" cy="150" rx="45" ry="22" fill="#24143D" opacity="0.85" />
                    <path d="M115 150 Q115 170 150 175 Q185 170 185 150 L180 155 Q180 168 150 172 Q120 168 120 155 Z" fill="#6D3FE8" opacity="0.9" />
                    <circle cx="130" cy="118" r="10" fill="white" />
                    <circle cx="170" cy="118" r="10" fill="white" />
                    <circle cx="132" cy="118" r="5" fill="#24143D" />
                    <circle cx="172" cy="118" r="5" fill="#24143D" />
                    <path d="M140 140 Q150 148 160 140" stroke="#24143D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M100 95 L105 80 L112 92 L125 78 L128 95 Z" fill="#24143D" opacity="0.9" />
                    <path d="M200 95 L195 80 L188 92 L175 78 L172 95 Z" fill="#24143D" opacity="0.9" />
                    <rect x="110" y="175" width="80" height="55" rx="12" fill="#B7410E" opacity="0.9" />
                    <rect x="105" y="172" width="90" height="8" rx="4" fill="#6D3FE8" opacity="0.9" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-brandText tracking-tight">
                Feeling anxious?
              </h3>
              <p className="mt-2 text-sm md:text-base text-brandSecondaryText leading-relaxed">
                Take a breath. You&apos;re allowed to slow down.
              </p>
              <div className="mt-5">
                <Button size="md" rightIcon={<Play className="h-4 w-4 fill-current" />}>
                  Start a 2-Minute Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Affirmations() {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [saved, setSaved] = React.useState(false);

  const next = () => setCurrentIdx((i) => (i + 1) % affirmations.length);
  const prev = () => setCurrentIdx((i) => (i - 1 + affirmations.length) % affirmations.length);
  const current = affirmations[currentIdx];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-12 md:py-16 bg-gradient-to-r from-primaryPurple via-brightPurple to-[#8b5cf6] text-offWhite">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-softGold/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-deepPurple/40 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-offWhite">
                A little reminder can <span className="text-softGold">change your day.</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-lavender/90 leading-relaxed max-w-md">
                Beautiful affirmations to uplift your mind and soul.
              </p>
              <div className="mt-8">
                <Button
                  variant="ghost"
                  size="md"
                  className="bg-offWhite text-primaryPurple hover:bg-lavender/20 hover:text-offWhite border border-offWhite/20"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Affirmations
                </Button>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-offWhite/15 backdrop-blur border border-offWhite/20 text-offWhite hover:bg-offWhite/25 flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-offWhite/15 backdrop-blur border border-offWhite/20 text-offWhite hover:bg-offWhite/25 flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div key={currentIdx} className="mx-4 md:mx-10 rounded-3xl p-7 md:p-9 bg-white/95 text-brandText shadow-glow relative overflow-hidden">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSaved((s) => !s)}
                    aria-label={saved ? "Unsave affirmation" : "Save affirmation"}
                    className="absolute -top-1 right-0 h-8 w-8 rounded-full bg-softLavender/80 flex items-center justify-center text-brightPurple hover:bg-softLavender transition-colors"
                  >
                    <Heart className={cn("h-4 w-4", saved && "fill-brightPurple")} />
                  </button>
                  <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight text-brandText pr-8">
                    &ldquo;{current.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-brightPurple/10 text-brightPurple px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-brightPurple/15">
                      <Headphones className="h-4 w-4" />
                      Listen to Affirmation
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {affirmations.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Go to affirmation ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === currentIdx ? "w-8 bg-softGold" : "w-2 bg-offWhite/40 hover:bg-offWhite/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Explore() {
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          Something for whatever <span className="text-gradient">today feels like.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-brandSecondaryText leading-relaxed max-w-2xl mx-auto">
          Explore content that supports your mind, mood, and growth.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        {exploreCategories.map((c) => {
          const Icon = getIcon(c.icon);
          return (
            <Link
              key={c.id}
              href="#"
              className="group relative overflow-hidden rounded-3xl p-6 h-full min-h-[168px] border border-lavender/50 bg-white shadow-card hover:shadow-glow hover:-translate-y-1 transition-transform"
            >
              <div aria-hidden className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60", c.gradient)} />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 shadow-soft text-brightPurple group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base md:text-lg font-semibold text-brandText tracking-tight">
                  {c.name}
                </h3>
                {c.description && (
                  <p className="mt-1.5 text-xs md:text-sm text-brandSecondaryText leading-relaxed">
                    {c.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function AudioSection() {
  const chips = [
    { label: "Rain", colors: ["#5B3FA8", "#24143D"] },
    { label: "Ocean", colors: ["#6D3FE8", "#B9A5E8"] },
    { label: "Forest", colors: ["#B9A5E8", "#5B3FA8"] },
    { label: "Breathe", colors: ["#D9B86C", "#5B3FA8"] },
    { label: "Piano", colors: ["#F0EAFB", "#B9A5E8"] },
  ];
  return (
    <section className="container py-16 md:py-20 relative overflow-hidden">
      <svg aria-hidden className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-48 opacity-[0.12] pointer-events-none" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,100 Q60,20 120,100 T240,100 T360,100 T480,100 T600,100 T720,100 T840,100 T960,100 T1080,100 T1200,100" fill="none" stroke="#6D3FE8" strokeWidth="2" />
        <path d="M0,120 Q60,60 120,120 T240,120 T360,120 T480,120 T600,120 T720,120 T840,120 T960,120 T1080,120 T1200,120" fill="none" stroke="#B9A5E8" strokeWidth="2" />
      </svg>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex justify-center order-2 lg:order-1">
          <PhoneMockup floating blobs>
            <AudioPhoneScreen />
          </PhoneMockup>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
            Press play. <span className="text-gradient">Let the world slow down.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-brandSecondaryText leading-relaxed max-w-xl">
            From peaceful sleep sounds to guided breathing and calming affirmations, find your sound for the moment.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 md:gap-5">
            {chips.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div
                  className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-card group-hover:shadow-glow group-hover:scale-110 transition-transform ring-2 ring-white"
                  style={{ background: `linear-gradient(135deg, ${s.colors[0]}, ${s.colors[1]})` }}
                />
                <span className="text-xs md:text-sm font-medium text-brandSecondaryText group-hover:text-brightPurple transition-colors">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button variant="outline" size="md" rightIcon={<Play className="h-4 w-4 fill-current" />}>
              Explore All Sounds
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StreakSection() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-10 md:py-14 bg-gradient-to-br from-deepPurple via-[#2a1850] to-primaryPurple text-offWhite">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brightPurple/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-softGold/15 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-offWhite">
              Small steps. <span className="text-softGold">Every day.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-lavender/90 leading-relaxed max-w-md">
              Consistency is the key to a better you soul.
            </p>
            <div className="mt-8">
              <Button variant="outline" size="md" className="border-offWhite/20 text-offWhite hover:bg-offWhite/10" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Explore My Progress
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-offWhite/8 backdrop-blur border border-offWhite/10 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-offWhite">14 Day Streak</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-softGold/20 text-softGold px-2.5 py-1 text-xs font-bold">🔥 Hot</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
              {weekStreakData.map((done, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "aspect-square w-full rounded-2xl transition-colors flex items-center justify-center",
                      done
                        ? "bg-gradient-to-br from-softGold to-[#e6c97e] text-deepPurple shadow-soft"
                        : "bg-offWhite/10 text-lavender/50"
                    )}
                  >
                    {done ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-lavender/80">{days[i]}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3 pt-5 border-t border-offWhite/10">
              <p className="text-xs md:text-sm text-lavender/85">Keep going! You&apos;re doing amazing.</p>
              <button type="button" aria-label="Save progress" className="h-9 w-9 rounded-full bg-offWhite/10 flex items-center justify-center text-softGold hover:bg-offWhite/15 transition-colors">
                <Heart className="h-4 w-4 fill-softGold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const joinPosts = posts.slice(0, 3);
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          You don&apos;t have to <span className="text-gradient">grow alone.</span>
        </h2>
        <p className="mt-4 text-base md:text-lg text-brandSecondaryText leading-relaxed max-w-2xl mx-auto">
          A positive space to share, inspire and be inspired.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {joinPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl bg-gradient-to-br from-white to-softLavender/30 border border-lavender/50 shadow-card hover:shadow-glow transition-colors p-5"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brandSecondaryText to-[#766D80] flex items-center justify-center shadow-soft shrink-0">
                <LucideIcons.User className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-semibold text-brandText">Anonymous</p>
                  <span className="inline-flex items-center rounded-full bg-brightPurple/10 text-brightPurple px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                    {post.category.replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-brandText/90 line-clamp-5">{post.content}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-brandSecondaryText">
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-brightPurple fill-brightPurple/20" />
                {post.likesCount}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LucideIcons.MessageCircle className="h-3.5 w-3.5" />
                {post.commentsCount}
              </span>
            </div>
          </div>
        ))}

        <div className="rounded-3xl bg-gradient-to-br from-brightPurple/10 via-softLavender/60 to-lavender/30 border border-lavender/50 p-6 md:p-7 flex flex-col">
          <h3 className="text-lg md:text-xl font-semibold text-brandText tracking-tight leading-tight">
            Share your win or kind words
          </h3>
          <div className="mt-5 flex-1">
            <Button asChild size="md" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/community">Join the Community</Link>
            </Button>
          </div>
          <div className="mt-5 flex items-center gap-3 pt-4 border-t border-lavender/50">
            <div className="flex -space-x-2">
              {["#6D3FE8", "#5B3FA8", "#B9A5E8"].map((c, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white shadow-soft flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${c}, #24143D)` }}
                >
                  {["M", "S", "A"][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-brandSecondaryText">10,000+ members</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumCTASection() {
  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-12 md:py-16 bg-gradient-to-br from-deepPurple via-[#2a1850] to-primaryPurple text-offWhite">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brightPurple/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-softGold/15 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-softGold/20 text-softGold">
                <Crown className="h-6 w-6" />
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-offWhite">
              Give your mind <span className="text-softGold">more.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-lavender/90 leading-relaxed max-w-md">
              Unlock premium content, exclusive audios, and a more personalized experience.
            </p>

            <ul className="mt-8 space-y-3.5">
              {premiumBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3.5">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-softGold text-deepPurple shadow-soft">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm md:text-[15px] font-medium text-offWhite/95">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Button variant="gold" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start Premium Today
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-[2rem] bg-gradient-to-br from-deepPurple/80 via-[#1f1038]/90 to-deepPurple border border-offWhite/10 p-7 md:p-9 shadow-glow backdrop-blur">
              <h3 className="text-xl md:text-2xl font-bold text-softGold tracking-tight">Mindora Premium</h3>

              <div className="mt-6 space-y-3">
                {[
                  "Full affirmation library",
                  "Exclusive calming sounds",
                  "Advanced wellness content",
                  "Ad free experience",
                  "Premium audio sessions",
                  "Expanded emotional library",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-softGold/90 text-deepPurple">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-offWhite/95">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-7 border-t border-offWhite/10 text-center">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-offWhite">$4.99</span>
                  <span className="pb-2 text-sm font-medium text-lavender/80">/month</span>
                </div>
                <p className="mt-2 text-sm text-lavender/80">or <span className="font-semibold text-offWhite">$39.99</span> / year</p>
                <p className="mt-3 text-xs text-lavender/60">Cancel anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeClient() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-lavender/50 blur-3xl animate-blob" />
        <div aria-hidden className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-softGold/20 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="container pt-10 md:pt-16 pb-16 md:pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-softLavender border border-lavender/50 px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple mb-6">
                <Sparkles className="h-3.5 w-3.5 text-softGold" />
                Elevate Your Mind Daily
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold tracking-tight text-brandText leading-[1.05]">
                Your daily space to <span className="text-gradient">feel better,</span> grow stronger, and <span className="text-gradient">live mindfully.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-brandSecondaryText leading-relaxed max-w-xl lg:mx-0 mx-auto">
                Mindora helps you understand your feelings, build positive habits, and find peace in everyday moments.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:justify-start justify-center">
                <Button asChild size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  <Link href="/signup">Start Your Journey</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/features">
                    <span className="flex items-center gap-2.5">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brightPurple text-offWhite">
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      </span>
                      Explore the App
                    </span>
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-4 lg:justify-start justify-center flex-wrap">
                <div className="flex -space-x-3">
                  {[
                    { c1: "#6D3FE8", c2: "#24143D", i: "A" },
                    { c1: "#D9B86C", c2: "#5B3FA8", i: "J" },
                    { c1: "#B9A5E8", c2: "#6D3FE8", i: "M" },
                  ].map((a, idx) => (
                    <div
                      key={idx}
                      className="h-10 w-10 rounded-full border-[3px] border-white shadow-card flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${a.c1}, ${a.c2})` }}
                    >
                      {a.i}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col lg:items-start items-start gap-0.5">
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < 4 ? "text-softGold fill-softGold" : "text-softGold fill-softGold/40"
                        )}
                      />
                    ))}
                    <span className="ml-1.5 text-sm font-bold text-brandText">4.8/5</span>
                  </div>
                  <span className="text-xs md:text-sm text-brandSecondaryText">from 10,000+ users</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center relative">
              <PhoneMockup floating blobs>
                <HomePhoneScreen />
              </PhoneMockup>

              <div aria-hidden className="hidden md:block absolute -bottom-2 -right-4 lg:-right-10 w-[180px] animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="rounded-3xl bg-white border border-lavender/50 shadow-glow p-4 relative overflow-hidden">
                  <div className="relative text-center">
                    <span className="text-[11px] font-semibold text-brandSecondaryText">Take a deep breath.</span>
                    <p className="mt-1 text-sm font-semibold text-brandText leading-snug">You&apos;ve got this.</p>
                    <div className="mt-3 flex justify-center">
                      <div className="h-9 w-9 rounded-full bg-brightPurple/15 flex items-center justify-center text-brightPurple">
                        <Heart className="h-4 w-4 fill-brightPurple" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Benefits />
      <MoodSection />
      <Affirmations />
      <Explore />
      <AudioSection />
      <StreakSection />
      <CommunitySection />
      <PremiumCTASection />
    </>
  );
}
