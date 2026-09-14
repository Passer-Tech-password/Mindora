import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  User,
  Mail,
  Flame,
  Bookmark,
  Pencil,
  Save,
  Trophy,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profile | Mindora",
  description:
    "Your Mindora profile. View and edit your personal information, check your wellness streak, and see your saved content.",
  alternates: {
    canonical: "/profile",
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
  const firstName = "Alex";
  const lastName = "Taylor";
  const email = "alex.taylor@example.com";
  const initials = `${firstName[0]}${lastName[0]}`;
  const streak = 14;
  const saves = 47;
  const joinedAt = "March 2025";

  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-brandText mb-10">
          Your Profile
        </h1>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple text-offWhite p-8 shadow-glow overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-softGold/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-lavender/20 blur-3xl"
              />
              <div className="relative flex flex-col items-center text-center">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-offWhite/15 border-2 border-softGold/60 text-3xl font-bold text-softGold backdrop-blur-sm mb-5">
                  {initials}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {firstName} {lastName}
                </h2>
                <p className="mt-1.5 text-sm text-lavender/85">{email}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-softGold/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deepPurple">
                  <Trophy className="h-3.5 w-3.5" />
                  Free Plan
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-white border border-lavender/50 p-5 shadow-card text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-brandText">
                  {streak}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">
                  Day streak
                </div>
              </div>
              <div className="rounded-3xl bg-white border border-lavender/50 p-5 shadow-card text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-brandText">
                  {saves}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">
                  Saves
                </div>
              </div>
              <div className="rounded-3xl bg-white border border-lavender/50 p-5 shadow-card text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold text-brandText pt-2">
                  {joinedAt}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">
                  Joined
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-softLavender/70 p-8 shadow-card">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-brandText tracking-tight">
                    Personal Information
                  </h3>
                  <p className="mt-1.5 text-sm text-brandSecondaryText">
                    Update your profile details below.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-1.5" />
                    Edit
                  </Button>
                  <Button type="button" variant="primary" size="sm">
                    <Save className="h-4 w-4 mr-1.5" />
                    Save
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-brandText"
                    >
                      First name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                        <User className="h-5 w-5" aria-hidden />
                      </span>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        defaultValue={firstName}
                        className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-brandText"
                    >
                      Last name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                        <User className="h-5 w-5" aria-hidden />
                      </span>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        defaultValue={lastName}
                        className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brandText"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                      <Mail className="h-5 w-5" aria-hidden />
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={email}
                      className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all"
                    />
                  </div>
                  <p className="text-xs text-brandSecondaryText">
                    We&apos;ll never share your email with anyone else.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-brandText"
                  >
                    About you
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Share a little about your wellness journey..."
                    className="block w-full rounded-2xl border border-lavender/50 bg-softLavender/40 px-4 py-3 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
