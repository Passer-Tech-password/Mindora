"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { values } from "@/constants";
import { teamMembers } from "@/data/mockData";
import {
  Target,
  Sparkles,
  Star,
  Heart,
  Shield,
  ShieldCheck,
  Users,
  UsersRound,
  Sprout,
  Quote,
  Globe,
  Smile,
  Flame,
  Crown,
  Check,
  Linkedin,
  ArrowRight,
  User,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getValueIcon(iconName: string) {
  const lookup: Record<string, React.ComponentType<{ className?: string }>> = {
    "heart-handshake": Heart,
    "shield-check": ShieldCheck,
    users: Users,
    sprout: Sprout,
    sunrise: Star,
  };
  return lookup[iconName] ?? Heart;
}

function MissionSection() {
  return (
    <section className="container py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold tracking-widest text-brightPurple mb-6">
            OUR MISSION —
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
            To make emotional wellness simple, personal, and accessible for everyone.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
            Small, daily acts of self-care don&apos;t just add up — they multiply into real, lasting change. Mindora empowers you with the tools, insights, and supportive community to elevate your mind every single day.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-lavender/40 p-5 shadow-card">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brightPurple/15 text-brightPurple mb-4">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-brandText tracking-tight">Simple</h3>
              <p className="mt-1.5 text-xs text-brandSecondaryText leading-relaxed">
                Easy to use, built for real life.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-lavender/40 p-5 shadow-card">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-softGold/25 text-deepPurple mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-brandText tracking-tight">Personal</h3>
              <p className="mt-1.5 text-xs text-brandSecondaryText leading-relaxed">
                Made for your unique journey.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-lavender/40 p-5 shadow-card">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pink-400/15 text-pink-500 mb-4">
                <Star className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-brandText tracking-tight">Meaningful</h3>
              <p className="mt-1.5 text-xs text-brandSecondaryText leading-relaxed">
                Tools that truly make a difference.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-glow aspect-[16/9]">
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=silhouette%20of%20a%20woman%20meditating%20peacefully%20at%20sunset%20over%20sea%20of%20clouds%20warm%20gradient%20sky&image_size=landscape_16_9"
              alt="Woman meditating at sunset"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deepPurple/40" />
            <div className="absolute top-8 left-6 right-6 md:top-12 md:left-10 md:right-10">
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-brightPurple mb-3" />
              <blockquote className="text-lg md:text-2xl font-bold text-white leading-snug drop-shadow-lg">
                Your mind deserves care, attention, and compassion.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const valueIcons = [Heart, Shield, UsersRound, Sprout, Star];
  const valueColors = [
    "bg-brightPurple/15 text-brightPurple",
    "bg-softGold/25 text-deepPurple",
    "bg-pink-400/15 text-pink-500",
    "bg-green-400/15 text-green-500",
    "bg-brightPurple/15 text-brightPurple",
  ];
  const valueDescriptions = [
    "Empathy guides everything we build.",
    "Privacy and safety are our priority.",
    "Real people, real stories, real support.",
    "Progress over perfection, always.",
    "We focus on hope, not judgment.",
  ];

  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          The values that guide{" "}
          <span className="text-gradient">everything we do</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {values.slice(0, 5).map((value, i) => {
          const Icon = valueIcons[i] ?? Heart;
          return (
            <div
              key={value.id}
              className="rounded-2xl bg-white border border-lavender/40 p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition-transform duration-300 text-center"
            >
              <div
                className={cn(
                  "inline-flex h-14 w-14 items-center justify-center rounded-full mb-5",
                  valueColors[i]
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-brandText tracking-tight">
                {value.title}
              </h3>
              <p className="mt-2 text-xs text-brandSecondaryText leading-relaxed">
                {valueDescriptions[i]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ImpactStatsSection() {
  const stats = [
    { icon: Users, number: "500K+", subtitle: "Happy Users" },
    { icon: Globe, number: "120+", subtitle: "Countries" },
    { icon: Smile, number: "2M+", subtitle: "Positive Moments Shared" },
    { icon: Star, number: "4.8", subtitle: "Average Rating", hasStars: true },
  ];

  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-deepPurple via-primaryPurple to-brightPurple px-8 py-12 md:px-14 md:py-16">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-96 w-96 rounded-full bg-brightPurple/40 blur-3xl" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-softGold" />
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm md:text-base text-white/80 font-medium">
                  {stat.subtitle}
                </div>
                {stat.hasStars && (
                  <div className="mt-2 flex items-center justify-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-3.5 w-3.5 md:h-4 md:w-4 fill-softGold text-softGold"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const bullets = [
    "Make mental wellness simple and approachable",
    "Help you understand and manage your emotions",
    "Inspire small daily habits that create big change",
    "Connect you with a community that uplifts you",
  ];

  return (
    <section className="container py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold tracking-widest text-brightPurple mb-6">
            OUR STORY —
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
            A personal experience that became a purpose.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
            Mindora was born from a simple belief: no one should have to face their thoughts alone. Our founders experienced firsthand the power of daily mindset practices and wanted to create a beautiful, safe space where everyone could access that same support, guidance, and encouragement.
          </p>
          <p className="mt-5 text-base md:text-lg text-brandSecondaryText leading-relaxed">
            What started as a quiet journal of personal affirmations slowly grew into something bigger — a community of people lifting each other up, one small kind moment at a time. Today, Mindora carries that same gentle spirit into every feature, every word, and every pixel.
          </p>
        </div>
        <div className="relative">
          <div className="relative rounded-3xl bg-white border border-lavender/40 p-8 md:p-10 shadow-card overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-brandText tracking-tight mb-7">
                Mindora was built to...
              </h3>
              <ul className="space-y-5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brightPurple text-white shadow-soft mt-0.5">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm md:text-base font-medium text-brandText leading-relaxed pt-0.5">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden className="pointer-events-none absolute -bottom-8 -right-8 w-32 h-32 md:w-40 md:h-40 opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full text-brightPurple" fill="currentColor">
                <path d="M100 20 C100 20 70 40 70 75 C70 100 90 115 100 130 C110 115 130 100 130 75 C130 40 100 20 100 20 Z M60 90 C60 90 35 110 35 135 C35 155 50 165 60 175 C70 165 85 155 85 135 C85 110 60 90 60 90 Z M140 90 C140 90 115 110 115 135 C115 155 130 165 140 175 C150 165 165 155 165 135 C165 110 140 90 140 90 Z M100 150 C100 150 75 170 75 185 C75 195 88 200 100 200 C112 200 125 195 125 185 C125 170 100 150 100 150 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const teamData = [
    {
      name: "Amara Okonkwo",
      role: "Co-Founder & CEO",
      bio: "Passionate about making mental wellness accessible to everyone, everywhere.",
      image:
        "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20confident%20young%20black%20woman%20ceo%20warm%20smile%20soft%20studio%20lighting&image_size=square",
    },
    {
      name: "David Nwosu",
      role: "Co-Founder & CTO",
      bio: "Tech lover and problem solver who believes technology can make a real, human difference.",
      image:
        "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20friendly%20young%20black%20man%20cto%20tech%20casual%20warm%20portrait&image_size=square",
    },
    {
      name: "Tolu Adebayo",
      role: "Head of Community",
      bio: "Ensures Mindora feels like home for every single user who walks through our digital doors.",
      image:
        "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=professional%20headshot%20of%20warm%20smiling%20young%20black%20woman%20community%20manager%20natural%20studio&image_size=square",
    },
  ];
  const accentColors = [
    "from-brightPurple via-primaryPurple to-deepPurple",
    "from-softGold via-[#c49f50] to-deepPurple",
    "from-lavender via-brightPurple to-primaryPurple",
  ];

  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          Meet the minds behind Mindora
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamData.map((member, i) => (
          <div
            key={member.name}
            className="group relative rounded-3xl bg-white border border-lavender/40 p-6 md:p-8 shadow-card hover:shadow-glow hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full blur-3xl opacity-70",
                i === 0
                  ? "bg-brightPurple/20"
                  : i === 1
                  ? "bg-softGold/30"
                  : "bg-lavender/60"
              )}
            />
            <div className="relative">
              <div
                className={cn(
                  "h-20 w-20 md:h-24 md:w-24 rounded-full p-1 shadow-card mb-6 bg-gradient-to-br",
                  accentColors[i]
                )}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brandText tracking-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-brandSecondaryText font-medium">
                {member.role}
              </p>
              <p className="mt-4 text-sm md:text-[15px] text-brandSecondaryText leading-relaxed">
                {member.bio}
              </p>
              <div className="mt-6 flex items-center justify-start">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-softLavender px-3 py-1.5 text-xs font-semibold text-brightPurple hover:bg-lavender/50 transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-deepPurple via-primaryPurple to-brightPurple px-8 py-12 md:px-14 md:py-16 text-white">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-96 w-96 rounded-full bg-brightPurple/40 blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="inline-flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20">
              <Heart className="h-10 w-10 md:h-12 md:w-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
              Let&apos;s build a world where every mind feels seen, supported, and strong.
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <Button
              asChild
              size="lg"
              variant="gold"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              <Link href="/signup">Start Your Journey</Link>
            </Button>
            <p className="text-sm md:text-base italic text-white/80 font-medium">
              Elevate Your Mind Daily
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutClient() {
  return (
    <>
      <MissionSection />
      <ValuesSection />
      <ImpactStatsSection />
      <StorySection />
      <TeamSection />
      <FinalCTASection />
    </>
  );
}
