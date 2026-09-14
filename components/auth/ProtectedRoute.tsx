"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/Button";
import { Loader2, LockKeyhole, ArrowRight } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isLoading) return;
    if (!user) {
      const redirect = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?from=${redirect}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm px-6">
          <div className="h-16 w-16 rounded-3xl bg-softLavender flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-brightPurple animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-brandText">Loading your dashboard…</h2>
          <p className="text-sm text-brandSecondaryText">
            Please hold on while we confirm your session.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] py-14 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white border border-lavender/60 shadow-card p-8 md:p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-softLavender flex items-center justify-center mb-5">
            <LockKeyhole className="h-7 w-7 text-brightPurple" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-brandText">
            Sign in required
          </h2>
          <p className="mt-3 text-brandSecondaryText leading-relaxed">
            This dashboard is only accessible to Mindora members. Please log in
            or create an account to continue.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 items-stretch justify-center">
            <Button asChild size="lg" rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/signup">Create account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
