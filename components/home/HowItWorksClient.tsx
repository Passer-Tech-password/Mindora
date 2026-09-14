"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { affirmations, audioTracks, moods } from "@/constants";
import { posts, weekStreakData } from "@/data/mockData";
import {
  ArrowRight,
  Heart,
  Smile,
  Play,
  Users,
  Flame,
  Trophy,
  Check,
  MoreHorizontal,
  MessageCircle,
  Music2,
  Sparkles,
  Crown,
  User,
  Headphones,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- PHONE SCREENS ---------- */

function HomeDashboardPhoneScreen() {
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
          <Heart className="h-3 w-3 text-brandSecondaryText" />
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

function MoonlitCalmAudioPhoneScreen() {
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

      <div className="text-center text-offWhite text-[9px] mb-3">Sleep Sound</div>

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

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 md:pt-28 pb-16 md:pb-24">
      <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div aria-hidden className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-brightPurple/15 blur-3xl animate-blob" />
      <div aria-hidden className="pointer-events-none absolute -bottom-10 left-10 h-64 w-64 rounded-full bg-softGold/15 blur-3xl animate-blob [animation-delay:4s]" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-softLavender border border-lavender/50 px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple mb-6">
              <Heart className="h-3.5 w-3.5 text-brightPurple fill-brightPurple" />
              HOW IT WORKS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-[1.05]">
              Simple steps to a{" "}
              <span className="bg-gradient-to-r from-softGold via-brightPurple to-primaryPurple bg-clip-text text-transparent">
                better you
              </span>
              .
            </h1>
            <p className="mt-6 text-base md:text-[17px] text-brandSecondaryText leading-relaxed max-w-lg">
              Mindora makes emotional wellness easy and personal. From quick mood check-ins to calming audio and a kind community — everything you need to show up for yourself, one small step at a time.
            </p>
            <div className="mt-9">
              <Button
                asChild
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href="/signup">Start Your Journey</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] h-[520px] sm:h-[560px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-lavender/60 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-softLavender blur-3xl"
              />
              <div className="absolute left-0 top-0 w-[60%] h-[92%] z-20">
                <PhoneMockup floating blobs={false} className="w-full h-full">
                  <HomeDashboardPhoneScreen />
                </PhoneMockup>
              </div>
              <div className="absolute right-0 bottom-0 w-[58%] h-[82%] z-10 scale-[0.92]">
                <PhoneMockup floating blobs={false} className="w-full h-full">
                  <MoonlitCalmAudioPhoneScreen />
                </PhoneMockup>
              </div>
              <svg
                aria-hidden
                className="absolute bottom-20 left-0 h-16 w-16 text-brightPurple"
                viewBox="0 0 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M4 56 C 4 20, 24 8, 56 12 C 70 14, 74 24, 76 36 L 70 30 M 76 36 L 66 38" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEPS HEADING ---------- */

function StepsHeading() {
  return (
    <section className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          Your daily journey in 5 simple steps
        </h2>
      </div>
    </section>
  );
}

/* ---------- STEP 1: CHECK IN ---------- */

function Step1CheckIn() {
  const stepMoods = moods.slice(0, 6);

  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex flex-col items-start gap-3 mb-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple text-2xl font-bold shadow-soft">
              1
            </div>
            <Smile className="h-5 w-5 text-lavender ml-2" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brandText leading-[1.1]">
            Check in with your mood
          </h3>
          <p className="mt-5 text-base text-brandSecondaryText leading-relaxed max-w-md">
            Choose how you&apos;re feeling right now — in seconds. Mindora takes that and personalizes your whole day: the affirmation you see, the audio it suggests, and the little nudges that help.
          </p>
        </div>

        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-white border border-lavender/50 p-6 md:p-8 shadow-card">
          <h3 className="text-lg md:text-xl font-semibold text-brandText text-center mb-6 tracking-tight">
            How are you feeling today?
          </h3>
          <div className="grid grid-cols-6 md:grid-cols-6 gap-2 md:gap-3">
            {stepMoods.map((m, i) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl md:rounded-3xl p-2 md:p-4 transition-colors",
                  i === 1
                    ? "bg-brightPurple/10 border-2 border-brightPurple/30 shadow-soft"
                    : "bg-white border border-lavender/40"
                )}
              >
                <div
                  className="h-10 w-10 md:h-14 md:w-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: m.bgColor }}
                >
                  <span className="text-xl md:text-3xl leading-none select-none">{m.emoji}</span>
                </div>
                <span
                  className={cn(
                    "mt-1.5 md:mt-2 text-[10px] md:text-sm font-semibold",
                    i === 1 ? "text-brightPurple" : "text-brandText"
                  )}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 2: AFFIRMATION (REVERSED) ---------- */

function Step2Affirmation() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-softLavender/80 via-brightPurple/20 to-lavender/60 blur-2xl opacity-60"
            />
            <div className="relative rounded-[1.75rem] md:rounded-[2rem] overflow-hidden aspect-[16/10] max-w-md mx-auto lg:mx-0 shadow-glow">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-brightPurple/80 via-primaryPurple to-deepPurple"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 10%, rgba(217,184,108,0.5), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(255,255,255,0.1), transparent 60%)",
                }}
              />
              <svg aria-hidden viewBox="0 0 600 400" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-1/2 opacity-80">
                <path d="M0,280 L100,220 L180,270 L260,200 L340,260 L420,210 L500,250 L600,200 L600,400 L0,400 Z" fill="rgba(91,63,168,0.5)" />
                <path d="M0,320 L120,280 L220,310 L300,260 L400,300 L480,270 L600,300 L600,400 L0,400 Z" fill="rgba(36,20,61,0.7)" />
                <path d="M0,360 L80,340 L180,355 L280,330 L380,350 L480,335 L600,355 L600,400 L0,400 Z" fill="rgba(20,10,38,0.9)" />
              </svg>
              <button
                type="button"
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-offWhite/90 flex items-center justify-center text-brightPurple hover:bg-offWhite transition-colors shadow-soft"
                aria-label="Save affirmation"
              >
                <Heart className="h-4.5 w-4.5" />
              </button>
              <div className="relative h-full flex items-center justify-center px-8 py-8 text-center">
                <blockquote className="text-xl sm:text-2xl md:text-[28px] font-semibold text-offWhite leading-snug tracking-tight">
                  &ldquo;You are doing better than you think.&rdquo;
                </blockquote>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-offWhite/95 text-primaryPurple px-4 py-2.5 text-xs md:text-sm font-semibold hover:bg-offWhite transition-colors shadow-soft">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brightPurple/15">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                  Listen
                </button>
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brightPurple" />
                <span className="h-2 w-2 rounded-full bg-offWhite/40" />
                <span className="h-2 w-2 rounded-full bg-offWhite/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex flex-col items-start gap-3 mb-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple text-2xl font-bold shadow-soft">
              2
            </div>
            <Heart className="h-5 w-5 text-softGold fill-softGold ml-2" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brandText leading-[1.1]">
            Get your daily affirmation
          </h3>
          <p className="mt-5 text-base text-brandSecondaryText leading-relaxed max-w-md">
            Receive a powerful, uplifting affirmation personalized to how you&apos;re feeling. Save your favorites, listen to them in a calming voice, and let the words settle in.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 3: AUDIO ---------- */

function Step3Audio() {
  const tracks = audioTracks.slice(0, 5);

  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex flex-col items-start gap-3 mb-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple text-2xl font-bold shadow-soft">
              3
            </div>
            <Music2 className="h-5 w-5 text-lavender ml-2" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brandText leading-[1.1]">
            Explore & play calming audio
          </h3>
          <p className="mt-5 text-base text-brandSecondaryText leading-relaxed max-w-md">
            Choose from sleep sounds, breathing exercises, and guided sessions designed to help you relax, focus, and sleep better. Press play and let your mind slow down.
          </p>
        </div>

        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-deepPurple via-[#2a1850] to-primaryPurple p-6 md:p-8 shadow-glow text-offWhite overflow-hidden relative">
          <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brightPurple/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-softGold/15 blur-3xl" />

          <div className="relative">
            <h3 className="text-sm font-bold text-softGold tracking-wide mb-5">Featured</h3>
            <div className="flex flex-wrap gap-4 md:gap-5 mb-7">
              {tracks.map((t, i) => (
                <div key={t.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div
                    className={cn(
                      "relative h-14 w-14 md:h-16 md:w-16 rounded-full shadow-card group-hover:scale-110 transition-transform",
                      i === 1 && "ring-[3px] ring-softGold ring-offset-2 ring-offset-deepPurple"
                    )}
                    style={{
                      background: t.coverGradient.includes("from-")
                        ? "linear-gradient(135deg, #5B3FA8, #B9A5E8)"
                        : `linear-gradient(135deg, ${t.coverGradient.split(" ")[0].replace("from-", "")}, ${t.coverGradient.split(" ")[1]?.replace("to-", "") ?? "#6D3FE8"})`,
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-6 w-6 md:h-7 md:w-7 text-offWhite/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {t.id === "rain" && (
                        <>
                          <path d="M16 13v8M8 13v8M12 15v8" />
                          <path d="M16 9a4 4 0 00-8-.5 3.5 3.5 0 00-2 6.5" />
                        </>
                      )}
                      {t.id === "ocean" && (
                        <>
                          <circle cx="12" cy="12" r="8" fill="none" />
                          <path d="M4 14c3 0 3-2 6-2s3 2 6 2 3-2 4-2 M4 18c3 0 3-2 6-2s3 2 6 2 3-2 4-2" />
                        </>
                      )}
                      {t.id === "forest" && (
                        <>
                          <path d="M12 3l-5 8h4l-5 8h12l-5-8h4z" />
                          <path d="M12 19v2" />
                        </>
                      )}
                      {t.id === "night" && (
                        <path d="M21 13A8 8 0 1111 3a7 7 0 0010 10z" />
                      )}
                      {t.id === "breathing" && (
                        <>
                          <circle cx="12" cy="12" r="3" />
                          <circle cx="12" cy="12" r="7" fill="none" />
                        </>
                      )}
                    </svg>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-lavender/90 group-hover:text-offWhite transition-colors">
                    {t.title}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-lavender/70 mb-3">Now Playing</h4>
              <div className="rounded-2xl bg-offWhite/8 backdrop-blur border border-offWhite/10 p-4 md:p-5 flex items-center gap-4">
                <div
                  className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-2xl overflow-hidden shadow-soft relative bg-gradient-to-br from-deepPurple to-primaryPurple"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#f5f5f5] via-[#e8e0ff] to-[#b9a5e8] shadow-[0_0_25px_rgba(255,255,255,0.3)]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base md:text-lg font-semibold text-offWhite truncate">Deep Sleep</div>
                  <div className="text-xs text-lavender/70 mt-0.5">Sleep Sound</div>
                  <div className="mt-2.5 h-1 w-full rounded-full bg-offWhite/12 overflow-hidden">
                    <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-softGold to-lavender" />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-lavender/55">
                    <span>02:45</span>
                    <span>34:20</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <button type="button" aria-label="Play audio" className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-offWhite text-deepPurple flex items-center justify-center shadow-glow hover:scale-105 transition-transform">
                    <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                  </button>
                  <button type="button" aria-label="Like audio" className="h-7 w-7 rounded-full bg-offWhite/8 text-lavender/70 flex items-center justify-center hover:text-offWhite transition-colors">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 4: COMMUNITY (REVERSED) ---------- */

function Step4Community() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="rounded-[1.75rem] bg-white border border-lavender/50 p-5 md:p-6 shadow-card hover:shadow-glow transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brandSecondaryText to-[#766D80] flex items-center justify-center shadow-soft shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brandText">Anonymous</div>
                    <div className="text-[11px] text-brandSecondaryText mt-0.5">2h ago</div>
                  </div>
                </div>
                <button className="h-8 w-8 rounded-xl flex items-center justify-center text-brandSecondaryText hover:text-brandText hover:bg-softLavender transition-colors" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm md:text-[15px] leading-relaxed text-brandText/90">
                Today I chose myself. Small steps, big changes. Grateful for this journey.
              </p>
              <div className="mt-4 flex items-center gap-5 text-xs text-brandSecondaryText">
                <span className="inline-flex items-center gap-1.5 group cursor-pointer">
                  <Heart className="h-4 w-4 text-brightPurple fill-brightPurple group-hover:scale-110 transition-transform" />
                  <span className="font-medium">128</span>
                </span>
                <span className="inline-flex items-center gap-1.5 group cursor-pointer">
                  <MessageCircle className="h-4 w-4 group-hover:text-brightPurple transition-colors" />
                  <span className="font-medium">24</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex flex-col items-start gap-3 mb-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple text-2xl font-bold shadow-soft">
              4
            </div>
            <Users className="h-5 w-5 text-lavender ml-2" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brandText leading-[1.1]">
            Connect with a positive community
          </h3>
          <p className="mt-5 text-base text-brandSecondaryText leading-relaxed max-w-md">
            Share your wins, encourage someone else, or just read what others are going through. A safe, anonymous space with kindness-first guidelines — no clout, no judgment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- STEP 5: STREAK ---------- */

function Step5Streak() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <div className="flex flex-col items-start gap-3 mb-5">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple text-2xl font-bold shadow-soft">
              5
            </div>
            <Flame className="h-5 w-5 text-softGold fill-softGold ml-2" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brandText leading-[1.1]">
            Build your streak & grow daily
          </h3>
          <p className="mt-5 text-base text-brandSecondaryText leading-relaxed max-w-md">
            Consistency is powerful. Show up for yourself each day, keep your streak alive, and watch yourself become the best version of you — one kind, small step at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <div className="rounded-[1.75rem] bg-white border border-lavender/50 p-5 md:p-6 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-base md:text-lg font-bold text-brandText tracking-tight">
                14 Day Streak
              </h4>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-softGold/20 text-softGold">
                <Flame className="h-4 w-4 fill-softGold" />
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="aspect-square w-full rounded-full bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite flex items-center justify-center shadow-soft">
                    <Check className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={3} />
                  </div>
                  <span className="text-[10px] md:text-[11px] font-medium text-brandSecondaryText">{d.slice(0, 3)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-gradient-to-br from-brightPurple/10 via-softLavender/60 to-lavender/30 border border-lavender/50 p-5 md:p-6 flex flex-col justify-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-softGold to-[#e6c97e] text-deepPurple shadow-soft mb-4">
              <Trophy className="h-6 w-6" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-brandText tracking-tight mb-2">
              Amazing!
            </h4>
            <p className="text-sm md:text-[15px] text-brandSecondaryText leading-relaxed">
              You&apos;re building a better mind every day. Keep going — we&apos;re so proud of you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA BANNER ---------- */

function LotusMeditationIllustration() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="lotusBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6D3FE8" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#5B3FA8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#24143D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="petal1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B3FA8" />
          <stop offset="100%" stopColor="#B9A5E8" />
        </linearGradient>
        <linearGradient id="petal2" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#6D3FE8" />
          <stop offset="100%" stopColor="#D9B86C" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="petal3" x1="0%" y1="100%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#5B3FA8" />
          <stop offset="100%" stopColor="#B9A5E8" />
        </linearGradient>
        <linearGradient id="womanSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0EAFB" />
          <stop offset="100%" stopColor="#B9A5E8" />
        </linearGradient>
        <linearGradient id="womanCloth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D9B86C" />
          <stop offset="100%" stopColor="#B79553" />
        </linearGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#24143D" />
          <stop offset="100%" stopColor="#5B3FA8" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="230" r="160" fill="url(#lotusBg)" />

      <g transform="translate(200, 260)">
        <path d="M-150 30 C -140 -10, -100 -40, -60 -35 C -30 -32, -10 -15, 0 0 C 10 -15, 30 -32, 60 -35 C 100 -40, 140 -10, 150 30 L 130 50 C 120 20, 80 0, 50 5 C 20 8, 5 20, 0 30 C -5 20, -20 8, -50 5 C -80 0, -120 20, -130 50 Z" fill="url(#petal1)" opacity="0.9" />
      </g>

      <g transform="translate(200, 245)">
        <path d="M-120 10 C -110 -30, -70 -60, -40 -55 C -20 -52, -5 -35, 0 -20 C 5 -35, 20 -52, 40 -55 C 70 -60, 110 -30, 120 10 L 105 30 C 95 0, 55 -18, 35 -15 C 15 -12, 5 0, 0 10 C -5 0, -15 -12, -35 -15 C -55 -18, -95 0, -105 30 Z" fill="url(#petal2)" opacity="0.85" />
      </g>

      <g transform="translate(200, 230)">
        <path d="M-90 -10 C -82 -45, -45 -75, -25 -70 C -10 -66, -2 -50, 0 -35 C 2 -50, 10 -66, 25 -70 C 45 -75, 82 -45, 90 -10 L 78 15 C 70 -15, 35 -35, 20 -32 C 8 -30, 2 -18, 0 -10 C -2 -18, -8 -30, -20 -32 C -35 -35, -70 -15, -78 15 Z" fill="url(#petal3)" opacity="0.9" />
      </g>

      <g transform="translate(200, 218)">
        <path d="M-60 -25 C -54 -55, -28 -80, -15 -76 C -5 -73, 2 -60, 0 -48 C 2 -60, 5 -73, 15 -76 C 28 -80, 54 -55, 60 -25 L 50 -2 C 45 -22, 25 -38, 15 -36 C 6 -34, 2 -25, 0 -18 C -2 -25, -6 -34, -15 -36 C -25 -38, -45 -22, -50 -2 Z" fill="url(#petal1)" opacity="0.95" />
      </g>

      <g transform="translate(200, 208)">
        <path d="M-35 -35 C -32 -58, -15 -75, -8 -73 C -2 -71, 2 -62, 0 -53 C 2 -62, 2 -71, 8 -73 C 15 -75, 32 -58, 35 -35 L 28 -18 C 26 -33, 15 -42, 8 -41 C 3 -40, 1 -33, 0 -28 C -1 -33, -3 -40, -8 -41 C -15 -42, -26 -33, -28 -18 Z" fill="url(#petal2)" opacity="1" />
      </g>

      <g transform="translate(200, 140)">
        <g transform="translate(0, 20)">
          <path d="M-35 45 C -45 30, -40 10, -25 0 C -18 -5, -10 -8, 0 -8 C 10 -8, 18 -5, 25 0 C 40 10, 45 30, 35 45 C 25 55, -25 55, -35 45 Z" fill="url(#womanCloth)" />
          <path d="M-35 45 L -55 65 L 55 65 L 35 45" fill="#B79553" opacity="0.7" />
          <circle cx="-12" cy="35" r="4" fill="#D9B86C" opacity="0.4" />
          <circle cx="15" cy="38" r="3" fill="#D9B86C" opacity="0.4" />
        </g>

        <g>
          <path d="M-25 -5 C -22 -28, -12 -48, 0 -52 C 12 -48, 22 -28, 25 -5 C 22 8, 12 12, 0 12 C -12 12, -22 8, -25 -5 Z" fill="url(#womanSkin)" />
          <path d="M0 -52 C -18 -48, -28 -28, -25 -5 C -18 -10, -10 -15, 0 -15 C 10 -15, 18 -10, 25 -5 C 28 -28, 18 -48, 0 -52 Z" fill="url(#hairGrad)" />
          <path d="M-22 -20 C -28 -12, -30 5, -22 15 L -28 20 C -40 5, -35 -18, -22 -20 Z" fill="url(#hairGrad)" />
          <path d="M22 -20 C 28 -12, 30 5, 22 15 L 28 20 C 40 5, 35 -18, 22 -20 Z" fill="url(#hairGrad)" />
          <ellipse cx="-8" cy="-18" rx="2" ry="3" fill="#24143D" />
          <ellipse cx="8" cy="-18" rx="2" ry="3" fill="#24143D" />
          <path d="M-5 -8 C -3 -5, 3 -5, 5 -8" stroke="#B79553" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <ellipse cx="-12" cy="-10" rx="3" ry="2" fill="#F0EAFB" opacity="0.6" />
          <ellipse cx="12" cy="-10" rx="3" ry="2" fill="#F0EAFB" opacity="0.6" />
          <circle cx="0" cy="-38" r="3" fill="#D9B86C" opacity="0.6" />
        </g>

        <g>
          <path d="M-45 20 C -55 10, -50 -5, -35 -10 C -30 -12, -25 -12, -22 -10 C -25 -5, -28 0, -30 8 C -32 15, -38 18, -45 20 Z" fill="url(#womanSkin)" />
          <path d="M45 20 C 55 10, 50 -5, 35 -10 C 30 -12, 25 -12, 22 -10 C 25 -5, 28 0, 30 8 C 32 15, 38 18, 45 20 Z" fill="url(#womanSkin)" />
          <circle cx="-50" cy="12" r="2" fill="#B79553" opacity="0.5" />
          <circle cx="50" cy="12" r="2" fill="#B79553" opacity="0.5" />
        </g>
      </g>

      <g opacity="0.6">
        <circle cx="100" cy="120" r="2" fill="#D9B86C" />
        <circle cx="310" cy="100" r="1.5" fill="#B9A5E8" />
        <circle cx="320" cy="280" r="2" fill="#D9B86C" />
        <circle cx="80" cy="300" r="1.5" fill="#B9A5E8" />
      </g>
    </svg>
  );
}

function FinalCTA() {
  return (
    <section className="container pb-24 md:pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] px-6 sm:px-10 md:px-14 py-12 md:py-16 bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple text-offWhite">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-lavender/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-deepPurple/50 blur-3xl" />

        <svg aria-hidden className="absolute top-6 left-8 h-5 w-5 text-softGold" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.6H20l-4.8 3.5L17 17l-5-3.6L7 17l1.8-5.9L4 7.6h6.2z" />
        </svg>
        <svg aria-hidden className="absolute top-10 right-48 h-6 w-6 text-softGold/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.6H20l-4.8 3.5L17 17l-5-3.6L7 17l1.8-5.9L4 7.6h6.2z" />
        </svg>
        <svg aria-hidden className="absolute bottom-12 left-20 h-4 w-4 text-softGold/70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.6H20l-4.8 3.5L17 17l-5-3.6L7 17l1.8-5.9L4 7.6h6.2z" />
        </svg>
        <svg aria-hidden className="absolute top-1/2 right-6 h-5 w-5 text-lavender/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.6H20l-4.8 3.5L17 17l-5-3.6L7 17l1.8-5.9L4 7.6h6.2z" />
        </svg>
        <svg aria-hidden className="absolute top-28 left-1/3 h-3 w-3 text-softGold/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.8 5.6H20l-4.8 3.5L17 17l-5-3.6L7 17l1.8-5.9L4 7.6h6.2z" />
        </svg>

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-offWhite/10 border border-offWhite/15 px-4 py-1.5 text-xs md:text-sm font-medium text-softGold mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Small steps. Big change.
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Elevate your mind daily.
            </h2>
            <p className="mt-5 text-base md:text-lg text-lavender/90 leading-relaxed max-w-md">
              Join thousands building a healthier, happier mindset — one breath, one affirmation, one kind day at a time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="bg-offWhite text-primaryPurple hover:bg-lavender/20 hover:text-offWhite border border-offWhite/20"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href="/signup">Start Your Journey</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-offWhite/20 text-offWhite hover:bg-offWhite/10"
              >
                <Link href="/features">
                  <span className="flex items-center gap-2.5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-offWhite/15 border border-offWhite/20">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </span>
                    Explore the App
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[320px] md:h-[380px]">
            <LotusMeditationIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPORT ---------- */

export function HowItWorksClient() {
  return (
    <div className="flex-1">
      <Hero />
      <StepsHeading />
      <Step1CheckIn />
      <Step2Affirmation />
      <Step3Audio />
      <Step4Community />
      <Step5Streak />
      <FinalCTA />
    </div>
  );
}
