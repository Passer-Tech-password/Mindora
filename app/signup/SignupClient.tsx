"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthContext";
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function SignupClient() {
  const { signup, error, isLoading } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    if (!terms) {
      setLocalError("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const created = await signup({ firstName, lastName, email, password });
      const role = created.role === "admin" ? "admin" : "user";
      router.push(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to create your account.";
      setLocalError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const busy = submitting || isLoading;
  const displayError = localError || error;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 md:py-16 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-brandText">
            Create your account
          </h1>
          <p className="mt-3 text-base text-brandSecondaryText">
            Welcome to Mindora. Let&apos;s build a calmer you together.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-softLavender/70 p-8 shadow-card">
          <form className="space-y-5" onSubmit={onSubmit} noValidate>
            {displayError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden />
                <div className="leading-relaxed">{displayError}</div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
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
                    disabled={busy}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Sarah"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-60"
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
                    required
                    disabled={busy}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Johnson"
                    className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-60"
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
                  autoComplete="email"
                  required
                  disabled={busy}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brandText"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                  <Lock className="h-5 w-5" aria-hidden />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  disabled={busy}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-60"
                />
              </div>
              <p className="text-xs text-brandSecondaryText">
                Use 8+ characters with a mix of letters, numbers, and symbols.
              </p>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-lavender text-brightPurple focus:ring-brightPurple/30"
              />
              <label htmlFor="terms" className="text-sm text-brandSecondaryText">
                I agree to the{" "}
                <span
                  title="Terms of Service — coming soon"
                  aria-disabled="true"
                  className="font-medium text-brightPurple/80 cursor-not-allowed select-none underline decoration-dotted underline-offset-2"
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  title="Privacy Policy — coming soon"
                  aria-disabled="true"
                  className="font-medium text-brightPurple/80 cursor-not-allowed select-none underline decoration-dotted underline-offset-2"
                >
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={busy}
              rightIcon={
                busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )
              }
            >
              {busy ? "Creating your account…" : "Create Account"}
            </Button>
          </form>

          <div className="relative my-8">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-lavender/60" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-brandSecondaryText">
                or
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            disabled
            aria-disabled="true"
            title="Google sign-in coming soon"
          >
            Continue with Google
            <span className="ml-2 text-[10px] uppercase tracking-wider text-softGold/80">
              Soon
            </span>
          </Button>

          <p className="mt-8 text-center text-sm text-brandSecondaryText">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-brightPurple hover:text-primaryPurple"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
