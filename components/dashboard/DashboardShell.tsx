"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import {
  LayoutDashboard,
  UserCircle2,
  Bookmark,
  History,
  Users2,
  Crown,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Flower2,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: UserCircle2 },
  { href: "/saved", label: "Saved Content", icon: Bookmark },
  { href: "/mood-history", label: "Mood History", icon: History },
  { href: "/community", label: "Community", icon: Users2 },
  { href: "/premium", label: "Premium", icon: Crown },
];

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-softLavender/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-deepPurple/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 bg-white/95 backdrop-blur-md border-r border-lavender/50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-lavender/40">
          <Link href="/" className="flex items-center gap-2">
            <div
              aria-hidden
              className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-primaryPurple to-brightPurple"
            >
              <Flower2 className="h-5 w-5 text-offWhite" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold text-brandText">Mindora</div>
              <div className="text-[10px] text-brandSecondaryText tracking-widest uppercase">
                Elevate Your Mind Daily
              </div>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            className="lg:hidden h-9 w-9 rounded-xl border border-lavender/60 flex items-center justify-center text-brandSecondaryText hover:text-brandText"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brightPurple/10 text-brightPurple"
                    : "text-brandSecondaryText hover:text-brandText hover:bg-softLavender/60"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}

          <div className="my-5 border-t border-lavender/40" />

          <Link
            href="/settings"
            aria-current={isActive("/settings") ? "page" : undefined}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
              isActive("/settings")
                ? "bg-brightPurple/10 text-brightPurple"
                : "text-brandSecondaryText hover:text-brandText hover:bg-softLavender/60"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <SettingsIcon className="h-5 w-5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-brandSecondaryText hover:text-red-500 hover:bg-red-50/60"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </nav>

        <div className="p-5 pt-3">
          <div className="rounded-3xl p-5 text-center bg-gradient-to-b from-softLavender to-lavender">
            <svg viewBox="0 0 120 100" className="w-full h-20 mb-1" aria-hidden>
              <defs>
                <radialGradient id="lg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 30) rotate(90) scale(40 60)">
                  <stop stopColor="#6D3FE8" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#C9B8F3" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="60" cy="54" rx="46" ry="26" fill="url(#lg)" />
              <path d="M60 76 L32 60 C 24 46 32 30 50 30 C 56 24 68 24 74 30 C 92 30 100 46 92 60 L60 76Z" fill="#5B3FA8" opacity="0.9" />
              <path d="M60 68 L44 58 C 40 52 44 44 54 44 C 58 40 66 40 70 44 C 80 44 84 52 80 58 L60 68Z" fill="#6D3FE8" />
              <path d="M60 62 L50 54 C 48 50 50 46 56 46 C 58 44 66 44 68 46 C 74 46 76 50 74 54 L60 62Z" fill="#8B5CF6" />
              <circle cx="52" cy="50" r="1.4" fill="#D9B86C" />
              <circle cx="72" cy="50" r="1.4" fill="#D9B86C" />
            </svg>
            <div className="text-[13px] font-semibold text-brandText leading-tight">
              A calmer mind builds a brighter future.
            </div>
            <div className="h-1.5 w-4 mx-auto mt-3 rounded-full bg-brightPurple/70" />
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-offWhite/85 backdrop-blur-md border-b border-lavender/40">
          <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-10 py-4">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-10 w-10 rounded-2xl border border-lavender/60 bg-white flex items-center justify-center text-brandSecondaryText"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-brandText truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-brandSecondaryText truncate">{subtitle}</p>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
