import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { PremiumClient } from "@/components/home/PremiumClient";
import { Star, Play, ShieldCheck, ArrowRight, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Premium | Mindora",
  description:
    "Give your mind the care it deserves with Mindora Premium. Full audio library, exclusive content, advanced mood insights, offline access, unlimited saves, and completely ad-free.",
  alternates: {
    canonical: "/premium",
  },
  openGraph: {
    title: "Premium | Mindora — Give Your Mind the Care It Deserves",
    description:
      "Everything you love about Mindora, plus so much more. Unlock Premium today with a 7-day free trial.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

function PremiumHeroDashboard() {
  return (
    <div className="flex flex-col h-full px-4 pb-4 text-[11px]">
      <div className="flex items-center justify-between px-1 pt-2 pb-2">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-brandSecondaryText" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-softGold to-[#e6c97e] px-2 py-0.5 text-[9px] font-bold text-deepPurple">
          <Crown className="h-2.5 w-2.5" /> Premium
        </div>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur border border-lavender/40 p-3 mb-2">
        <div className="text-[10px] text-brandSecondaryText">Good morning,</div>
        <div className="text-sm font-semibold text-brandText">Sarah ✨</div>
      </div>

      <div className="rounded-2xl bg-white/80 backdrop-blur border border-lavender/40 p-3 mb-2">
        <div className="text-[10px] font-semibold text-brandSecondaryText mb-2">
          How are you feeling today?
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { e: "😊", l: "Happy", bg: "#FEF3C7" },
            { e: "😌", l: "Calm", bg: "#E0E7FF", active: true },
            { e: "🥰", l: "Love", bg: "#FCE7F3" },
            { e: "😔", l: "Low", bg: "#F3E8FF" },
          ].map((m, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-base"
              style={{ backgroundColor: m.bg, border: m.active ? "2px solid #6D3FE8" : "none" }}
            >
              {m.e}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
          {[
            { e: "😠", l: "Anxious", bg: "#E9D5FF" },
            { e: "😴", l: "Tired", bg: "#FFEDD5" },
            { e: "🤗", l: "Grateful", bg: "#DCFCE7" },
            { e: "😤", l: "Stressed", bg: "#FEE2E2" },
          ].map((m, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center text-base"
              style={{ backgroundColor: m.bg }}
            >
              {m.e}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-lavender via-softLavender to-brightPurple/10 p-3 mb-2 border border-lavender/40">
        <div className="flex items-start justify-between mb-1">
          <span className="text-[9px] font-semibold text-primaryPurple tracking-wider uppercase">
            Today&apos;s Affirmation
          </span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brightPurple fill-brightPurple/20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p className="text-[11px] leading-snug font-semibold text-brandText/90">
          &quot;You are enough just as you are.&quot;
        </p>
        <button className="mt-2 inline-flex items-center gap-1 rounded-full bg-brightPurple px-3 py-1 text-[9px] font-semibold text-offWhite">
          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Listen 0:00
        </button>
      </div>

      <div className="rounded-2xl bg-white/80 backdrop-blur border border-lavender/40 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-brandText flex items-center gap-1">
            14 Day Streak <span className="text-[10px]">🔥</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] text-offWhite"
                style={{ background: i < 6 ? "linear-gradient(135deg,#6D3FE8,#5B3FA8)" : "#E9D5FF" }}>
                {i < 6 ? "✓" : ""}
              </div>
              <span className="text-[8px] text-brandSecondaryText">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PremiumHeroAudio() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-deepPurple via-[#2E1855] to-[#1a0f30] text-offWhite">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-lavender/80" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <div className="text-[10px] font-semibold tracking-wide text-lavender">
          Moonlit Calm
        </div>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-lavender/80" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </div>
      <div className="px-4 text-[9px] text-lavender/70 mb-2">Sleep Sound</div>

      <div className="relative mx-4 h-40 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(180deg,#3B1F6B 0%,#1a0f30 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(201,184,243,0.35) 0%, transparent 55%)" }} />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full" style={{ background: "radial-gradient(circle,#E9E4F5 0%,#C9B8F3 40%, rgba(201,184,243,0.0) 70%)" }} />
        <svg viewBox="0 0 200 100" className="absolute bottom-0 w-full h-16" preserveAspectRatio="none">
          <path d="M0,100 L0,70 L40,40 L60,60 L90,20 L120,55 L160,30 L200,55 L200,100 Z" fill="#2E1855" />
          <path d="M0,100 L0,82 L30,60 L50,70 L80,45 L110,70 L150,50 L200,72 L200,100 Z" fill="#1a0f30" />
        </svg>
        <svg className="absolute top-3 right-5 h-3 w-3" viewBox="0 0 24 24" fill="#C9B8F3" opacity="0.6"><circle cx="12" cy="12" r="1.5" /><circle cx="3" cy="6" r="0.8" /><circle cx="20" cy="8" r="0.8" /><circle cx="15" cy="3" r="0.6" /></svg>
      </div>

      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <span className="text-[9px] text-lavender/80">24:35</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-softGold fill-softGold/30" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <div className="px-5 h-1 rounded-full bg-lavender/20 mb-3">
        <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-softGold to-brightPurple" />
      </div>

      <div className="px-5 flex items-center justify-between text-lavender/80 text-[10px] mb-4">
        <span>09:44</span>
        <span>-14:51</span>
      </div>

      <div className="px-6 flex items-center justify-around pb-6">
        <button aria-label="Prev" className="h-9 w-9 rounded-full flex items-center justify-center text-lavender/90">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 20L9 12l10-8v16zM5 19V5" /></svg>
        </button>
        <button aria-label="Pause" className="h-12 w-12 rounded-full bg-lavender/20 border border-lavender/40 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg>
        </button>
        <button aria-label="Next" className="h-9 w-9 rounded-full flex items-center justify-center text-lavender/90">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4l10 8-10 8V4zM19 5v14" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function PremiumPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-radial-fade"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brightPurple/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-softGold/25 blur-3xl"
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-softLavender border border-lavender/50 px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple mb-6">
                <Star className="h-3.5 w-3.5 text-softGold fill-softGold" />
                Mindora Premium
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-[1.05]">
                Give your mind the{" "}
                <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-deepPurple bg-clip-text text-transparent">
                  care it deserves.
                </span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mindora Premium unlocks powerful tools, exclusive content, and
                a deeper experience for your daily emotional wellness.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  asChild
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
                >
                  <Link href="/signup">Start 7-Day Free Trial</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/features">
                    <Play className="h-4 w-4 mr-2 fill-brandText/20" />
                    See All Features
                  </Link>
                </Button>
              </div>
              <div className="mt-5 flex items-center justify-center lg:justify-start gap-2 text-sm text-brandSecondaryText">
                <ShieldCheck className="h-4 w-4 text-brightPurple" />
                <span>Cancel anytime. No hidden charges.</span>
              </div>
            </div>

            <div className="relative mx-auto max-w-lg w-full">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-6 right-0 h-80 w-[420px] rounded-full bg-lavender/50 blur-3xl"
              />
              <div aria-hidden className="absolute -top-4 -right-2 h-14 w-14 rounded-full bg-white shadow-card flex items-center justify-center animate-float">
                <Crown className="h-6 w-6 text-softGold fill-softGold/40" />
              </div>

              <div className="relative h-[480px] md:h-[520px]">
                <div className="absolute right-0 top-0 z-0 translate-x-6 -rotate-3 scale-95 opacity-90">
                  <PhoneMockup floating={false} blobs={false} className="h-[480px] md:h-[520px] w-[240px] md:w-[260px]">
                    <PremiumHeroAudio />
                  </PhoneMockup>
                </div>
                <div className="absolute left-0 top-8 z-10 translate-x-4 rotate-2">
                  <PhoneMockup floating blobs={false} className="h-[480px] md:h-[520px] w-[240px] md:w-[260px]">
                    <PremiumHeroDashboard />
                  </PhoneMockup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumClient />
    </div>
  );
}
