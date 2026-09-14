import type { Metadata } from "next";
import { HowItWorksClient } from "@/components/home/HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works | Mindora",
  description:
    "Simple steps to a better you. Check in with your mood, get your daily affirmation, explore calming audio, connect with a positive community, and build your streak — all in five gentle daily steps with Mindora.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How It Works | Mindora — Simple Steps to a Better You",
    description:
      "Your daily journey in 5 simple steps. Check in, receive affirmations, find calm, connect, and grow with Mindora.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
