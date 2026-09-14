import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Create Account | Mindora",
  description:
    "Create your Mindora account and begin your wellness journey. Mood check-ins, daily affirmations, calming audio, and a kind community await.",
  alternates: {
    canonical: "/signup",
  },
  openGraph: {
    title: "Create Account | Mindora",
    description:
      "Start your wellness journey today with mood check-ins, daily affirmations, and calming audio.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
