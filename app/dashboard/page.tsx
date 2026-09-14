import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | Mindora",
  description:
    "Your personalized Mindora dashboard: mood check-ins, daily affirmations, streak tracking, calming audio, saved content, and your positive community feed.",
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Dashboard | Mindora",
    description:
      "Your dashboard for daily wellness: check your mood, read today's affirmation, track streaks, save content, and connect with the community.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <DashboardClient />
      </ProtectedRoute>
    </Suspense>
  );
}
