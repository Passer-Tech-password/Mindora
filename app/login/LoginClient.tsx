"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthContext";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginClient() {
  const { login, error, isLoading } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const from = React.useMemo(() => {
    const raw = params.get("from");
    if (!raw) return "/dashboard";
    try {
      return decodeURIComponent(raw.startsWith("/") ? raw : "/dashboard");
    } catch {
      return "/dashboard";
    }
  }, [params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(from);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to log in.";
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
            Welcome back
          </h1>
          <p className="mt-3 text-base text-brandSecondaryText">
            Log in to pick up right where you left off.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-softLavender/70 p-8 shadow-card">
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            {displayError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden />
                <div className="leading-relaxed">{displayError}</div>
              </div>
            )}

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
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-brandText"
                >
                  Password
                </label>
                <span
                  title="Password recovery coming soon"
                  aria-disabled="true"
                  className="text-sm font-medium text-brandSecondaryText/70 cursor-not-allowed select-none"
                >
                  Forgot password?
                  <span className="ml-1.5 text-[10px] uppercase tracking-wider text-softGold/80">
                    Soon
                  </span>
                </span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
                  <Lock className="h-5 w-5" aria-hidden />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={busy}
                  minLength={8}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-12 rounded-2xl border border-lavender/50 bg-softLavender/40 pl-12 pr-4 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-colors disabled:opacity-60"
                />
              </div>
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
              {busy ? "Signing you in…" : "Log In"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-brightPurple hover:text-primaryPurple"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
