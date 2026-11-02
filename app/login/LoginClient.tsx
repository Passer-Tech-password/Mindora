"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function LoginClient() {
  const { login, loginWithGoogle, sendPasswordReset, error, isLoading } =
    useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [localError, setLocalError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [googleBusy, setGoogleBusy] = React.useState(false);
  const [resetting, setResetting] = React.useState(false);

  const explicitFrom = React.useMemo(() => {
    const raw = params.get("from");
    if (!raw) return null;
    try {
      const decoded = decodeURIComponent(raw.startsWith("/") ? raw : "/dashboard");
      if (decoded === "/admin" || decoded === "/dashboard") return decoded;
      if (decoded.startsWith("/admin/") || decoded.startsWith("/dashboard/")) return decoded;
      return null;
    } catch {
      return null;
    }
  }, [params]);

  const defaultFor = (role: "admin" | "user") => (role === "admin" ? "/admin" : "/dashboard");

  const resolveTarget = (role: "admin" | "user") => {
    const fallback = defaultFor(role);
    if (!explicitFrom) return fallback;
    if (role === "admin" && explicitFrom.startsWith("/dashboard")) return fallback;
    if (role === "user" && explicitFrom.startsWith("/admin")) return defaultFor("user");
    return explicitFrom;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    setNotice(null);
    setSubmitting(true);
    try {
      const authenticated = await login(email, password);
      const role = authenticated.role === "admin" ? "admin" : "user";
      router.push(resolveTarget(role));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to log in.";
      setLocalError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    setLocalError(null);
    setNotice(null);
    setGoogleBusy(true);
    try {
      const authenticated = await loginWithGoogle();
      const role = authenticated.role === "admin" ? "admin" : "user";
      router.push(resolveTarget(role));
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Unable to sign in with Google."
      );
    } finally {
      setGoogleBusy(false);
    }
  };

  const onForgotPassword = async () => {
    setLocalError(null);
    setNotice(null);
    if (!email.trim()) {
      setLocalError("Enter your email address above, then tap \u201cForgot password?\u201d.");
      return;
    }
    setResetting(true);
    try {
      await sendPasswordReset(email.trim());
      setNotice(
        `If an account exists for ${email.trim()}, a password reset link is on its way.`
      );
    } catch (err) {
      setLocalError(
        err instanceof Error ? err.message : "Unable to send the reset email right now."
      );
    } finally {
      setResetting(false);
    }
  };

  const busy = submitting || googleBusy || resetting || isLoading;
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

            {notice && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700"
              >
                <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden />
                <div className="leading-relaxed">{notice}</div>
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
                <button
                  type="button"
                  onClick={onForgotPassword}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brightPurple hover:text-primaryPurple transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {resetting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Forgot password?
                </button>
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
