import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProfileClient } from "@/components/dashboard/ProfileClient";

export const metadata: Metadata = {
  title: "Profile | Mindora",
  description:
    "Your Mindora profile. View and edit your personal information, check your wellness streak, and see your saved content.",
  alternates: {
    canonical: "/profile",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Profile | Mindora",
    description:
      "Manage your profile, track your streak, and review your saved affirmations.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <ProfileClient />
      </ProtectedRoute>
    </Suspense>
  );
}
