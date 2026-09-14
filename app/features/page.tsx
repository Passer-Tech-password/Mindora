import type { Metadata } from "next";
import { FeaturesClient } from "@/components/home/FeaturesClient";

export const metadata: Metadata = {
  title: "Features | Mindora",
  description:
    "Everything you need for a healthier mind, in one beautiful app. Mood check-ins, daily affirmations, calming audio library, and a safe positive community.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features | Mindora",
    description:
      "Everything you need for a healthier mind in one beautiful app. Mood check-ins, affirmations, calming audio, community and more.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
