"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { premiumBenefits } from "@/constants";
import { faqItems } from "@/data/mockData";
import {
  ArrowRight,
  Headphones,
  Heart,
  Ban,
  BarChart2,
  CloudDownload,
  BookmarkCheck,
  Crown,
  Check,
  Sparkles,
  Star,
  CreditCard,
  Lock,
  CloudOff,
  Plus,
  Minus,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const benefitCards = [
  {
    title: "Full Audio Library",
    description:
      "Unlimited access to our complete library of sleep meditations, breathing exercises, and affirmations.",
    icon: Headphones,
    gradient: "from-brightPurple via-primaryPurple to-deepPurple",
  },
  {
    title: "Exclusive Content",
    description:
      "Premium affirmations, advanced workshops, and expert-curated wellness sessions.",
    icon: Heart,
    gradient: "from-pink-400 via-fuchsia-500 to-primaryPurple",
  },
  {
    title: "Ad-Free Experience",
    description:
      "A completely ad-free, peaceful experience so you can focus on what matters most.",
    icon: Ban,
    gradient: "from-softGold via-amber-400 to-yellow-500",
  },
  {
    title: "Advanced Mood Insights",
    description:
      "Detailed mood analytics, trends, personalized insights, and emotional pattern tracking.",
    icon: BarChart2,
    gradient: "from-emerald-400 via-green-500 to-teal-500",
  },
  {
    title: "Offline Access",
    description:
      "Download your favorite audios and affirmations to enjoy anytime, anywhere.",
    icon: CloudDownload,
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
  },
  {
    title: "Unlimited Saves",
    description:
      "Save unlimited affirmations and audio content to your personal wellness collection.",
    icon: BookmarkCheck,
    gradient: "from-brightPurple via-primaryPurple to-deepPurple",
  },
];

function PremiumBenefits() {
  return (
    <section className="container py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
          Everything you love, plus <span className="text-gradient">so much more.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="relative rounded-[1.75rem] bg-offWhite border border-lavender/50 p-6 md:p-7 shadow-card hover:shadow-glow hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-offWhite shadow-soft",
                    card.gradient
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-softGold/15 text-softGold border border-softGold/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" />
                  Premium
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-brandText tracking-tight mb-3">
                {card.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed text-brandSecondaryText">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PremiumPricing() {
  const featuresList = [
    "Everything in Premium",
    "Full audio & content",
    "Offline access",
    "Advanced mood insights",
    "Ad-free",
    "Unlimited saves",
    "New content weekly",
  ];

  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-deepPurple via-[#2a1850] to-primaryPurple text-offWhite px-6 sm:px-10 py-12 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brightPurple/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-softGold/15 blur-3xl"
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-6 md:left-10 w-32 md:w-48 h-32 md:h-48 opacity-70"
          viewBox="0 0 200 200"
        >
          <g transform="translate(100 100)">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={`outer-${i}`}
                cx="0"
                cy="-55"
                rx="22"
                ry="42"
                fill="#B9A5E8"
                opacity="0.55"
                transform={`rotate(${i * 45})`}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={`mid-${i}`}
                cx="0"
                cy="-38"
                rx="15"
                ry="30"
                fill="#6D3FE8"
                opacity="0.75"
                transform={`rotate(${i * 45 + 22.5})`}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={`inner-${i}`}
                cx="0"
                cy="-22"
                rx="9"
                ry="18"
                fill="#5B3FA8"
                opacity="0.9"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle cx="0" cy="0" r="10" fill="#D9B86C" opacity="0.95" />
            <circle cx="0" cy="0" r="5" fill="#FCFAFF" opacity="0.9" />
          </g>
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute top-8 right-10 md:top-14 md:right-20 w-6 h-6 animate-twinkle"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
            className="text-softGold"
          />
        </svg>
        <svg
          aria-hidden
          className="pointer-events-none absolute top-20 right-1/3 w-4 h-4 animate-twinkle"
          style={{ animationDelay: "1.2s" }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
            className="text-lavender"
          />
        </svg>
        <svg
          aria-hidden
          className="pointer-events-none absolute bottom-20 right-16 w-5 h-5 animate-twinkle"
          style={{ animationDelay: "2.1s" }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
            className="text-softGold"
          />
        </svg>

        <div className="relative grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-1 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-offWhite/10 border border-offWhite/15 px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-widest text-lavender mb-5">
              CHOOSE YOUR PLAN
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-offWhite">
              Simple pricing.{" "}
              <span className="text-softGold">Powerful benefits.</span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-lavender/85 leading-relaxed">
              Every plan includes everything Mindora Premium has to offer.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "7-day free trial on all plans",
                "Cancel anytime",
                "Secure and private",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brightPurple text-offWhite shadow-soft">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <span className="text-sm md:text-[15px] font-medium text-offWhite/95">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
            <div className="relative rounded-[2rem] bg-gradient-to-br from-deepPurple/70 via-[#2a1850]/80 to-deepPurple/60 text-offWhite border-2 border-softGold/60 shadow-glow backdrop-blur p-7 md:p-8 scale-[1.02] -mt-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-softGold px-5 py-2 text-[11px] md:text-xs font-bold uppercase tracking-wider text-deepPurple shadow-soft">
                  <Sparkles className="h-3.5 w-3.5" />
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-6 pt-1">
                <h3 className="text-lg md:text-xl font-semibold text-lavender tracking-tight">
                  Yearly Best Value
                </h3>
                <div className="mt-4 flex items-end justify-between gap-3 flex-wrap">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl md:text-6xl font-bold tracking-tight text-offWhite">
                      $39.99
                    </span>
                    <span className="pb-2 text-sm md:text-base font-medium text-lavender/80">
                      /year
                    </span>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 text-[11px] md:text-xs font-bold">
                    Save 33%
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-lavender/75">
                  Just <span className="text-offWhite font-semibold">$3.33</span> /month
                </p>
              </div>

              <ul className="space-y-3 mb-7">
                {featuresList.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-softGold/90 text-deepPurple">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                    <span className="text-sm md:text-[15px] leading-relaxed text-offWhite/92">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-brightPurple via-primaryPurple to-brightPurple"
              >
                Start Free Trial
              </Button>
              <p className="mt-3 text-center text-xs text-lavender/70">
                Billed annually
              </p>
            </div>

            <div className="relative rounded-[2rem] bg-offWhite/8 backdrop-blur border border-offWhite/15 text-offWhite p-7 md:p-8 shadow-card hover:shadow-glow transition-shadow duration-300">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-lavender tracking-tight">
                  Monthly Flexible
                </h3>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight text-offWhite">
                    $4.99
                  </span>
                  <span className="pb-2 text-sm md:text-base font-medium text-lavender/80">
                    /month
                  </span>
                </div>
                <p className="mt-2 text-xs md:text-sm text-lavender/75">
                  Perfect for trying Premium
                </p>
              </div>

              <ul className="space-y-3 mb-7">
                {featuresList.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brightPurple/85 text-offWhite">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                    <span className="text-sm md:text-[15px] leading-relaxed text-offWhite/92">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-lavender/60 text-offWhite hover:bg-offWhite/10"
              >
                Start Free Trial
              </Button>
              <p className="mt-3 text-center text-xs text-lavender/70">
                Billed monthly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustRow() {
  const avatarGrads = [
    "from-brightPurple to-deepPurple",
    "from-softGold to-primaryPurple",
    "from-lavender to-brightPurple",
    "from-pink-500 to-brightPurple",
  ];
  const avatarInitials = ["M", "S", "A", "J"];

  return (
    <section className="container py-8 md:py-10">
      <div className="relative rounded-[2rem] bg-softLavender border border-lavender/50 shadow-card px-6 sm:px-10 py-8 md:py-10 overflow-hidden">
        <svg
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-lavender/60 blur-3xl"
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-softGold/25 blur-3xl"
        />

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-10 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-brandText tracking-tight leading-tight">
              Loved by thousands
            </h3>
            <p className="mt-2 text-sm md:text-base text-brandSecondaryText leading-relaxed">
              Join a growing community of caring minds.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-bold tracking-tight text-brandText">
                4.8
              </span>
              <span className="text-lg md:text-xl font-semibold text-brandSecondaryText">
                /5
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 md:h-6 md:w-6 text-softGold fill-softGold"
                />
              ))}
            </div>
            <p className="mt-2 text-xs md:text-sm text-brandSecondaryText">
              from 10,000+ reviews
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center gap-4">
            <div className="flex -space-x-3">
              {avatarGrads.map((g, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-11 w-11 md:h-12 md:w-12 rounded-full border-[3px] border-offWhite shadow-card flex items-center justify-center text-xs md:text-sm font-bold text-offWhite bg-gradient-to-br",
                    g
                  )}
                >
                  {avatarInitials[i]}
                </div>
              ))}
              <div className="h-11 w-11 md:h-12 md:w-12 rounded-full border-[3px] border-offWhite shadow-card flex items-center justify-center text-[11px] md:text-xs font-bold text-offWhite bg-gradient-to-br from-brightPurple to-primaryPurple">
                10K+
              </div>
            </div>
            <span className="text-xs md:text-sm font-medium text-brandSecondaryText">
              and counting&hellip;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqIcons = [
  { icon: Crown, color: "from-softGold via-amber-400 to-yellow-500" },
  { icon: CreditCard, color: "from-sky-400 via-blue-500 to-indigo-500" },
  { icon: Lock, color: "from-emerald-400 via-green-500 to-teal-500" },
  { icon: CloudOff, color: "from-brightPurple via-primaryPurple to-deepPurple" },
];

function PremiumFAQ() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const faqsToShow = faqItems.slice(0, 4);

  return (
    <section className="container py-16 md:py-20">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-14">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brandText leading-tight">
            Frequently asked questions
          </h2>
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-brightPurple hover:text-primaryPurple transition-colors group"
        >
          <Mail className="h-4 w-4" />
          Have another question? Contact us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="divide-y divide-lavender/60 rounded-[2rem] md:rounded-[2.5rem] bg-offWhite border border-lavender/50 shadow-card overflow-hidden">
        {faqsToShow.map((item, idx) => {
          const openState = open === item.id;
          const { icon: Icon, color } = faqIcons[idx] ?? faqIcons[0];
          const contentId = `premium-faq-content-${item.id}`;
          const btnId = `premium-faq-btn-${item.id}`;
          return (
            <div key={item.id}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={openState}
                  aria-controls={contentId}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-4 md:gap-5 text-left px-5 md:px-8 py-5 md:py-7 hover:bg-softLavender/40 transition-colors"
                >
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-offWhite shadow-soft",
                      color
                    )}
                  >
                    <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                  </span>
                  <span className="flex-1 text-base md:text-lg font-semibold text-brandText tracking-tight pr-3 md:pr-4">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300",
                      openState
                        ? "bg-brightPurple text-offWhite rotate-0"
                        : "bg-softLavender text-primaryPurple"
                    )}
                  >
                    {openState ? (
                      <Minus className="h-5 w-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="h-5 w-5 stroke-[2.5]" />
                    )}
                  </span>
                </button>
              </h3>
              <div
                id={contentId}
                role="region"
                aria-labelledby={btnId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:duration-0",
                  openState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-8 pb-7 md:pb-8 pl-20 md:pl-[112px]">
                    <p className="text-base md:text-[15px] leading-relaxed text-brandSecondaryText max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="container py-16 md:py-20">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-primaryPurple via-brightPurple to-[#8b5cf6] text-offWhite px-6 sm:px-10 py-12 md:py-16 shadow-glow">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-softGold/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full bg-deepPurple/50 blur-3xl"
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute top-6 right-12 w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
            className="text-softGold"
          />
        </svg>
        <svg
          aria-hidden
          className="pointer-events-none absolute bottom-14 left-1/2 w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0L13.5 9.5L24 12L13.5 14.5L12 24L10.5 14.5L0 12L10.5 9.5Z"
            className="text-lavender"
          />
        </svg>

        <div className="relative grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="flex items-start gap-5 lg:col-span-2">
            <div className="relative shrink-0">
              <div className="absolute -inset-3 rounded-3xl bg-softGold/20 blur-xl" />
              <svg
                className="relative h-16 w-16 md:h-20 md:w-20 text-offWhite"
                viewBox="0 0 200 200"
              >
                <g transform="translate(100 100)">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <ellipse
                      key={`c-outer-${i}`}
                      cx="0"
                      cy="-55"
                      rx="22"
                      ry="42"
                      fill="#B9A5E8"
                      opacity="0.65"
                      transform={`rotate(${i * 45})`}
                    />
                  ))}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <ellipse
                      key={`c-mid-${i}`}
                      cx="0"
                      cy="-38"
                      rx="15"
                      ry="30"
                      fill="#FCFAFF"
                      opacity="0.85"
                      transform={`rotate(${i * 45 + 22.5})`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="12" fill="#D9B86C" />
                  <circle cx="0" cy="0" r="6" fill="#24143D" opacity="0.85" />
                </g>
              </svg>
            </div>
            <div className="pt-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-offWhite">
                Ready to elevate your mind daily?
              </h3>
              <p className="mt-3 text-base md:text-lg text-lavender/90 leading-relaxed max-w-xl">
                Start your free 7-day trial with the full power of Mindora.
              </p>
            </div>
          </div>

          <div className="flex lg:justify-end">
            <Button
              variant="secondary"
              size="lg"
              className="bg-offWhite text-primaryPurple hover:bg-lavender/20 hover:text-offWhite border border-offWhite shadow-soft"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PremiumClient() {
  return (
    <>
      <PremiumBenefits />
      <PremiumPricing />
      <TrustRow />
      <PremiumFAQ />
      <FinalCTA />
    </>
  );
}
