import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/data/mockData";
import { HelpSearch } from "@/components/help/HelpSearch";
import { CTASection } from "@/components/ui/CTASection";
import {
  ArrowRight,
  FileText,
  LifeBuoy,
  Mail,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | Mindora",
  description:
    "Find answers to common questions about Mindora, from subscriptions and privacy to the community. Search help articles or reach out to our support team.",
  alternates: {
    canonical: "/help-center",
  },
  openGraph: {
    title: "Help Center | Mindora",
    description:
      "Answers, guides, and quick links to help you get the most out of Mindora.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

const quickLinks = [
  {
    href: "/contact",
    title: "Contact support",
    description: "Can't find an answer? Our team is here to help.",
    icon: Mail,
  },
  {
    href: "/community-guidelines",
    title: "Community Guidelines",
    description: "How we keep Mindora kind, safe, and supportive.",
    icon: Users,
  },
  {
    href: "/privacy-policy",
    title: "Privacy Policy",
    description: "What we collect, how we use it, and your rights.",
    icon: Shield,
  },
  {
    href: "/terms-of-service",
    title: "Terms of Service",
    description: "The agreement that governs your use of Mindora.",
    icon: FileText,
  },
  {
    href: "/features",
    title: "Features",
    description: "Explore mood check-ins, affirmations, audio, and more.",
    icon: Sparkles,
  },
  {
    href: "/how-it-works",
    title: "How it works",
    description: "A simple walkthrough of the Mindora experience.",
    icon: LifeBuoy,
  },
];

export default function HelpCenterPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <LifeBuoy className="h-3.5 w-3.5 text-brightPurple" />
              Help Center
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
              How can we{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              Search our help articles, browse quick links, or reach out to us
              directly. We&apos;re always happy to lend a hand.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container relative">
          <HelpSearch items={faqItems} />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-brandText">
              Quick links
            </h2>
            <p className="mt-4 text-base text-brandSecondaryText leading-relaxed">
              Jump straight to the resources people ask about most.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col rounded-3xl border border-lavender/50 bg-white p-6 shadow-card transition-colors hover:bg-softLavender/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brandText">
                    {link.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brandSecondaryText">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brightPurple">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container relative">
          <CTASection
            eyebrow="Still need a hand?"
            title="We're here to help"
            description="Our support team reads every message. Tell us what's going on and we'll get back to you as soon as we can."
            primaryCta={{ label: "Contact support", href: "/contact" }}
          />
        </div>
      </section>
    </div>
  );
}
