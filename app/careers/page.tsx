import type { Metadata } from "next";
import type { ComponentType } from "react";
import { CTASection } from "@/components/ui/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareersOpenings } from "@/components/careers/CareersOpenings";
import { values } from "@/constants";
import { Heart, HeartHandshake, ShieldCheck, Sprout, Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | Mindora",
  description:
    "Join Mindora and help build a kinder world. Explore open roles across engineering, product, and community — or send a speculative application.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Mindora — Build a Kinder World With Us",
    description:
      "We're a small, mission-driven team building technology that helps people feel better every day. Find your place at Mindora.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

const valueIcons: Record<string, ComponentType<{ className?: string }>> = {
  "heart-handshake": HeartHandshake,
  "shield-check": ShieldCheck,
  users: Users,
  sprout: Sprout,
  sunrise: Star,
};

export default function CareersPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl"
        />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <Sprout className="h-3.5 w-3.5 text-brightPurple" />
              Careers
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-[1.05]">
              Build a kinder world{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                with us.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              We&apos;re a small, mission-driven team building technology that
              helps people feel better every day. If you believe emotional
              wellness should be simple, personal, and accessible, you&apos;ll
              feel at home here.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <SectionHeading
          eyebrow="Why Mindora"
          title={
            <>
              A team that cares as much as{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                you do.
              </span>
            </>
          }
          description="The values that guide everything we build also shape how we work together every day."
        />
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.slice(0, 4).map((value) => {
            const Icon = valueIcons[value.icon] ?? Heart;
            return (
              <div
                key={value.id}
                className="rounded-3xl border border-lavender/50 bg-white p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 text-base font-semibold text-brandText tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-brandSecondaryText leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <SectionHeading
          eyebrow="Open roles"
          align="left"
          className="mx-0"
          title="Find your place at Mindora"
          description="Every role here is a chance to make emotional wellness feel a little more human."
        />
        <div className="mt-10 md:mt-12">
          <CareersOpenings />
        </div>
      </section>

      <section className="container pb-20 md:pb-24">
        <CTASection
          eyebrow="Don't see the perfect role?"
          title="We'd still love to hear from you."
          description="Send us your resume and a note about what you'd love to work on. We keep great people in mind as we grow."
          primaryCta={{ label: "Send us your resume", href: "/contact" }}
        />
      </section>
    </div>
  );
}
