"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, ShieldAlert, ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "./AuthContext";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const redirectTo = React.useMemo(() => {
    if (typeof window === "undefined") return "/admin";
    return pathname || "/admin";
  }, [pathname]);

  React.useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?from=" + encodeURIComponent(redirectTo));
      return;
    }
    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-softLavender/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-brightPurple animate-spin" />
          <p className="text-brandText/70">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-softLavender/40 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-offWhite rounded-3xl shadow-card border border-softLavender p-8 text-center">
          <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-softLavender flex items-center justify-center">
            <LogIn className="h-8 w-8 text-primaryPurple" />
          </div>
          <h2 className="text-2xl font-bold text-brandText mb-2">Admin login required</h2>
          <p className="text-brandText/70 mb-6">
            Sign in with your admin credentials to access the Mindora Admin Panel.
          </p>
          <Link href={`/login?from=${encodeURIComponent(redirectTo)}`}>
            <Button className="w-full gap-2">
              Sign in to admin <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-brandText/60">
            Administrators: sign in with your admin email address.
          </p>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen w-full bg-softLavender/40 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-offWhite rounded-3xl shadow-card border border-softLavender p-8 text-center">
          <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-amber-50 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-brandText mb-2">Admin access only</h2>
          <p className="text-brandText/70 mb-6">
            You are signed in as <span className="font-semibold">{user.email}</span>, which does not have admin permissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Back to my dashboard
              </Button>
            </Link>
            <Link href={`/login?from=${encodeURIComponent("/admin")}`}>
              <Button className="w-full gap-2">
                Sign in as different user <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-5 text-xs text-brandText/60">
            If you are an administrator, sign in with your admin email address.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
