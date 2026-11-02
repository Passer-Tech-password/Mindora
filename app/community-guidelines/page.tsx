import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Guidelines | Mindora",
  description:
    "How we keep the Mindora community kind, safe, and supportive — our guidelines, how we moderate, and how to report or appeal.",
  alternates: {
    canonical: "/community-guidelines",
  },
  openGraph: {
    title: "Community Guidelines | Mindora",
    description:
      "Kindness, privacy, and safety — the shared guidelines that keep Mindora a supportive space.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

const inShortRules = [
  "Be kind — treat every person here like a friend.",
  "Share from your own experience, not as a professional.",
  "Protect privacy — yours and everyone else's.",
  "No harassment, hate, or harmful content.",
  "No spam, promotion, or misinformation.",
];

export default function CommunityGuidelinesPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div aria-hidden className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-10 h-96 w-96 rounded-full bg-softGold/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-10 -left-24 h-96 w-96 rounded-full bg-lavender/50 blur-3xl" />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-softLavender px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple tracking-wide mb-6">
              <Users className="h-3.5 w-3.5 text-brightPurple" />
              Our Community
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-brandText leading-[1.1]">
              Community{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                Guidelines
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              Mindora is a soft place to land. These guidelines help us keep it
              warm, honest, and safe for everyone who shows up here.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-lavender/50 bg-white p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-brightPurple" />
              <h2 className="text-lg font-semibold text-brandText">In short</h2>
            </div>
            <ul className="space-y-3">
              {inShortRules.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-brandSecondaryText"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brightPurple" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container relative">
          <article className="mx-auto max-w-3xl space-y-10">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Our Promise
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                We built Mindora to be a place where you can be honest about how
                you feel without fear of judgement. In return, we ask everyone
                who joins to help keep it that way. These guidelines apply to
                every post, comment, and interaction in the community.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Be Kind, Always
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Lead with empathy. You never know what someone is carrying
                today. Offer encouragement instead of criticism, and remember
                that behind every post is a real person doing their best.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Share From Your Experience
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Your story is powerful — share it as your story. Please don&apos;t
                give medical, legal, or financial advice as though you were a
                professional. Mindora is a peer space, not a clinic. If someone
                needs professional help, gently point them toward qualified
                support.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Protect Privacy
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Respect your own privacy and everyone else&apos;s. Don&apos;t
                share personal details — yours or someone else&apos;s — like full
                names, addresses, phone numbers, or workplace information. If
                you&apos;d rather not be identified, you can post and comment
                anonymously, and your identity stays protected.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                No Harassment or Hate
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                There is no place here for bullying, threats, hate speech,
                discrimination, or targeted attacks of any kind. Content that
                harms or demeans people based on their identity, or that
                intentionally hurts another member, will be removed and may
                result in losing access to the community.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                No Spam, Promotion, or Misinformation
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Keep the space free of advertising, self-promotion, spam,
                scams, and misleading health claims. Don&apos;t share links or
                content designed to sell something or to mislead others about
                mental health or treatment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Crisis &amp; Safety
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                If you believe someone is in immediate danger or at risk of
                harming themselves, please contact your local emergency services
                right away. You can also report the post to us so our team can
                review it quickly. For non-emergency concerns, encourage the
                person to reach out to a trusted professional or helpline, and
                let them know they&apos;re not alone.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                How We Moderate
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Our team reviews reports and may also act proactively on content
                that breaks these guidelines. We aim to review reports promptly,
                and we take action in proportion to the issue:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-sm md:text-base leading-relaxed text-brandSecondaryText">
                <li>
                  <span className="font-medium text-brandText">Warning</span> —
                  for a first, minor slip, we may send a gentle reminder.
                </li>
                <li>
                  <span className="font-medium text-brandText">
                    Content removal
                  </span>{" "}
                  — removing a post or comment that breaks the rules.
                </li>
                <li>
                  <span className="font-medium text-brandText">Suspension</span>{" "}
                  — temporarily restricting access for repeated or serious
                  issues.
                </li>
                <li>
                  <span className="font-medium text-brandText">Ban</span> — for
                  severe or repeated violations, we may permanently remove
                  access.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                How to Report
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                Seen something that doesn&apos;t feel right? Every post and
                comment in the app has a report button — tap it and let us know
                what&apos;s wrong. You can also reach out through our{" "}
                <Link
                  href="/contact"
                  className="font-medium text-brightPurple underline-offset-4 hover:underline"
                >
                  contact page
                </Link>{" "}
                if you need to share more detail. Reports are confidential, and
                we never tell the other person who reported them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-brandText">
                Appeal Process
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                If you believe a moderation decision was made in error, you&apos;re
                welcome to appeal. Contact us with the details of what happened,
                and a member of our team will review it fairly and get back to
                you. We&apos;re human, and we&apos;re always willing to take
                another look.
              </p>
            </section>

            <div className="rounded-3xl border border-lavender/50 bg-softLavender/60 p-6 md:p-8 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brightPurple shadow-soft">
                  <Heart className="h-5 w-5 fill-brightPurple/20" />
                </span>
                <p className="text-sm md:text-base leading-relaxed text-brandSecondaryText">
                  Thank you for helping make Mindora a kinder place. We&apos;re
                  glad you&apos;re here.
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
