"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/components/auth/AuthContext";
import {
  User,
  Mail,
  Flame,
  Bookmark,
  Pencil,
  Save,
  X,
  Trophy,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const joinedFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

function formatJoined(value: string | undefined) {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return joinedFormatter.format(parsed);
}

export function ProfileClient() {
  const { user, updateDisplayName } = useAuth();

  const [editing, setEditing] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  if (!user) return null;

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
    user.email[0]?.toUpperCase() ||
    "M";

  const startEditing = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setError(null);
    setNotice(null);
    setEditing(true);
  };

  const cancelEditing = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setError(null);
    setEditing(false);
  };

  const onSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (fullName.length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    setSaving(true);
    try {
      await updateDisplayName(fullName);
      setNotice("Your profile has been updated.");
      setEditing(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't save your profile right now."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-70";

  return (
    <DashboardShell
      title="Your Profile"
      subtitle="View and update your personal information"
    >
      <div className="max-w-4xl">
        {(error || notice) && (
          <div
            role={error ? "alert" : "status"}
            aria-live="polite"
            className={`mb-6 flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {error ? (
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
            )}
            <span>{error ?? notice}</span>
          </div>
        )}

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
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt=""
                    className="h-24 w-24 rounded-[2rem] border-2 border-softGold/60 object-cover mb-5"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-offWhite/15 border-2 border-softGold/60 text-3xl font-bold text-softGold backdrop-blur-sm mb-5">
                    {initials}
                  </div>
                )}
                <h2 className="text-2xl font-semibold tracking-tight">
                  {user.fullName || user.email}
                </h2>
                <p className="mt-1.5 text-sm text-lavender/85 break-all">
                  {user.email}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-softGold/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deepPurple">
                  <Trophy className="h-3.5 w-3.5" />
                  {user.plan === "premium" ? "Premium Plan" : "Free Plan"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="rounded-3xl bg-white border border-lavender/50 p-3 sm:p-5 shadow-card text-center">
                <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-brandText">
                  {user.stats.currentStreak}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">
                  Day streak
                </div>
              </div>
              <div className="rounded-3xl bg-white border border-lavender/50 p-3 sm:p-5 shadow-card text-center">
                <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-brandText">
                  {user.stats.savedItems}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">Saves</div>
              </div>
              <div className="rounded-3xl bg-white border border-lavender/50 p-3 sm:p-5 shadow-card text-center">
                <div className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-softLavender text-brightPurple mb-3 mx-auto">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-brandText pt-2 break-words">
                  {formatJoined(user.createdAt)}
                </div>
                <div className="mt-1 text-xs text-brandSecondaryText">
                  Joined
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={onSave}
              className="rounded-3xl bg-white border border-softLavender/70 p-8 shadow-card"
            >
              <div className="flex items-center justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-brandText tracking-tight">
                    Personal Information
                  </h3>
                  <p className="mt-1.5 text-sm text-brandSecondaryText">
                    {editing
                      ? "Update your profile details below."
                      : "Your account details on Mindora."}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {editing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={cancelEditing}
                        leftIcon={<X className="h-4 w-4" />}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        loading={saving}
                        leftIcon={<Save className="h-4 w-4" />}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={startEditing}
                      leftIcon={<Pencil className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                  )}
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
                        autoComplete="given-name"
                        required
                        disabled={!editing}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClass}
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
                        autoComplete="family-name"
                        disabled={!editing}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClass}
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
                      value={user.email}
                      readOnly
                      disabled
                      className={inputClass}
                    />
                  </div>
                  <p className="text-xs text-brandSecondaryText">
                    We&apos;ll never share your email with anyone else.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
