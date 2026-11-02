import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { CTASection } from "@/components/ui/CTASection";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog | Mindora",
  description:
    "Stories, science, and small kindnesses about mental and emotional wellness. Read the Mindora blog for mindful tips, guides, and honest conversations.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Mindora",
    description:
      "Mindful tips, thoughtful guides, and honest conversations about mental and emotional wellness.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function BlogPage() {
  return (
    <div className="flex-1">
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16">
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
              <BookOpen className="h-3.5 w-3.5 text-brightPurple" />
              Blog
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-[1.05]">
              Stories, science, and{" "}
              <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                small kindnesses.
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-brandSecondaryText leading-relaxed">
              Gentle, grounded reads about mental and emotional wellness — the
              kind of words you can return to whenever you need them.
            </p>
          </div>
        </div>
      </section>

      <section className="container pb-16 md:pb-20">
        <BlogList />
      </section>

      <section className="container pb-20 md:pb-24">
        <CTASection
          eyebrow="Never miss a story"
          title="Gentle inspiration, delivered with care."
          description="Subscribe for new articles, mindful tips, and product updates. You can unsubscribe anytime."
          primaryCta={{ label: "Subscribe", href: "/signup" }}
        />
      </section>
    </div>
  );
}
