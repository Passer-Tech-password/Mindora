"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthContext";
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function SignupClient() {
  const { signup, loginWithGoogle, error, isLoading } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [googleBusy, setGoogleBusy] = React.useState(false);

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

  const onGoogle = async () => {
    setLocalError(null);
    setGoogleBusy(true);
    try {
      const authenticated = await loginWithGoogle();
      const role = authenticated.role === "admin" ? "admin" : "user";
      router.push(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Unable to sign in with Google."
      );
    } finally {
      setGoogleBusy(false);
    }
  };

  const busy = submitting || googleBusy || isLoading;
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
                <Link
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brightPurple hover:text-primaryPurple underline underline-offset-2"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brightPurple hover:text-primaryPurple underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
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
            onClick={onGoogle}
            disabled={busy}
            leftIcon={
              googleBusy ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleMark className="h-5 w-5" />
              )
            }
          >
            {googleBusy ? "Connecting…" : "Continue with Google"}
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

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
