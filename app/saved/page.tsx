import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SavedClient } from "@/components/dashboard/SavedClient";

export const metadata: Metadata = {
  title: "Saved Content | Mindora",
  description:
    "Every affirmation, calming audio track and article you've bookmarked in Mindora — kept in one calm, personal place.",
  alternates: {
    canonical: "/saved",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Saved Content | Mindora",
    description:
      "Revisit the affirmations, audio and articles you've saved to support your wellbeing.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function SavedPage() {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <SavedClient />
      </ProtectedRoute>
    </Suspense>
  );
}
