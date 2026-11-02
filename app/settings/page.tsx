import type { Metadata } from "next";
import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Settings | Mindora",
  description:
    "Manage your Mindora settings. Adjust account details, notifications, and privacy preferences.",
  alternates: {
    canonical: "/settings",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Settings | Mindora",
    description:
      "Customize your Mindora experience: notifications, privacy, and account settings.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <ProtectedRoute>
        <SettingsClient />
      </ProtectedRoute>
    </Suspense>
  );
}
