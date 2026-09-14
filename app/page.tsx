import type { Metadata } from "next";
import Script from "next/script";
import { HomeClient } from "@/components/home/HomeClient";

const logoUrl =
  "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Mindora%20wellness%20app%20brand%20cover%2C%20purple%20lotus%20logo%2C%20soft%20lavender%20gradient%20background%2C%20premium%20minimalist%20design&image_size=square_hd";

export const metadata: Metadata = {
  title: "Mindora — Elevate Your Mind Daily",
  description:
    "Your daily space to feel better, grow stronger, and live mindfully. Mood check-ins, affirmations, calming audio, and a positive community.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mindora — Elevate Your Mind Daily",
    description:
      "Your daily space to feel better, grow stronger, and live mindfully. Mood check-ins, affirmations, calming audio, and a positive community.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

const orgLdJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mindora",
  url: "https://mindora.app",
  logo: logoUrl,
  sameAs: [logoUrl],
  description:
    "Mindora is a daily mindfulness companion app: mood check-ins, affirmations, calming audio, streaks, and a kind community.",
  founder: {
    "@type": "Person",
    name: "Mindora Team",
  },
  foundingDate: new Date().toISOString().split("T")[0],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@mindora.app",
    availableLanguage: ["English"],
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="ld-json-org"
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLdJson) }}
      />
      <HomeClient />
    </>
  );
}
