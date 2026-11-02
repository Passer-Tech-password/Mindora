import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MoodHistoryClient } from "@/components/dashboard/MoodHistoryClient";

export const metadata: Metadata = {
  title: "Mood History | Mindora",
  description:
    "Review your Mindora mood check-ins, spot patterns over the last two weeks, and log how you feel today.",
  alternates: {
    canonical: "/mood-history",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Mood History | Mindora",
    description:
      "Track your mood check-ins over time and start seeing gentle, honest patterns.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function MoodHistoryPage() {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <MoodHistoryClient />
      </ProtectedRoute>
    </Suspense>
  );
}
