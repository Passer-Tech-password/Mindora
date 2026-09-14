import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Log In | Mindora",
  description:
    "Welcome back to Mindora. Log in to continue your wellness journey, check your mood streak, and revisit your saved affirmations.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Log In | Mindora",
    description:
      "Welcome back. Access your mood history, saves, streaks, and community activity.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}
