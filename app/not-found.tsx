import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found — Mindora",
  description:
    "The page you're looking for doesn't exist. Let's get you back to Mindora.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-2xl w-full text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-softLavender/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-lavender/30 blur-3xl"
        />

        <div className="relative">
          <div className="mb-10 mx-auto w-full max-w-sm animate-float">
            <img
              src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=serene%20dreamy%20abstract%20illustration%20soft%20lavender%20purple%20pastel%20clouds%20stars%20gentle%20moon%20floating%20leaves%20minimalist%20flat%20design%20calm%20peaceful%20mental%20wellness%20aesthetic&image_size=square_hd"
              alt="Calm abstract illustration"
              className="w-full h-auto rounded-3xl shadow-card"
              loading="lazy"
            />
          </div>

          <p className="inline-block rounded-full bg-softLavender px-4 py-1.5 text-sm font-medium text-primaryPurple mb-5">
            404
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-brandText leading-tight animate-fade-in-up">
            We couldn&apos;t find that page
          </h1>

          <p
            className="mt-5 text-base md:text-lg leading-relaxed text-brandSecondaryText max-w-xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            It looks like the page you&apos;re looking for has drifted away.
            Don&apos;t worry — let&apos;s guide you back to a calmer place.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            <Button
              variant="primary"
              size="lg"
              asChild
              leftIcon={<ArrowLeft className="h-5 w-5" />}
            >
              <Link href="/">Back to Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
