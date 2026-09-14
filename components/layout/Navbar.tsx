"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { navLinks, startsWithAppPath } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";
import { Menu, X, LogOut, LayoutDashboard, UserCircle2, Crown } from "lucide-react";

const NAV_ESCAPE_HANDLE = "Navbar-mobile-nav-escape";
void NAV_ESCAPE_HANDLE;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (startsWithAppPath(pathname || "")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-offWhite/80 backdrop-blur-xl border-b border-lavender/40 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl">
        <div className="h-16 md:h-20 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Mindora home"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primaryPurple via-brightPurple to-softGold text-offWhite shadow-soft group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 22c-5.5 0-10-3.8-10-9.5S6.5 3 12 3s10 3.8 10 9.5S17.5 22 12 22zm0-18c-4.4 0-8 2.9-8 8s3.6 8 8 8 8-2.9 8-8-3.6-8-8-8zm-3.2 11c1.3 0 2.2-.7 2.8-1.7l1.1-.4 1.1.4c.6 1 1.5 1.7 2.8 1.7.8 0 1.4-.4 1.4-1 0-.6-.6-1-1.4-1-.7 0-1.3.2-2-.5l-1-1-1 1c-.7.7-1.3.5-2 .5-.8 0-1.4.4-1.4 1 0 .6.6 1 1.4 1z" />
              </svg>
            </span>
            <div className="leading-tight">
              <span className="text-lg font-bold text-brandText tracking-tight">
                Mindora
              </span>
            </div>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    active
                      ? "text-brightPurple bg-softLavender"
                      : "text-brandSecondaryText hover:text-brandText hover:bg-softLavender/60"
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brightPurple via-primaryPurple to-softGold"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="text-brandText">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <div className="flex items-center gap-2 rounded-2xl border border-lavender/60 bg-white pl-1 pr-2 py-1">
                  <div className="h-8 w-8 rounded-xl overflow-hidden bg-lavender ring-2 ring-lavender/60">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <UserCircle2 className="h-5 w-5 text-brightPurple" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-brandText max-w-[120px] truncate">
                    {user.firstName}
                  </span>
                  {user.plan === "premium" && (
                    <span className="h-5 px-2 rounded-full bg-gradient-to-r from-softGold to-[#e6c97e] text-[10px] font-bold text-deepPurple flex items-center gap-1">
                      <Crown className="h-2.5 w-2.5" />
                      Premium
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brandSecondaryText hover:text-red-500"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="text-brandText">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl text-brandText hover:bg-softLavender"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container max-w-7xl pb-6">
          <div className="rounded-3xl bg-white border border-lavender/50 shadow-card p-3">
            <nav aria-label="Mobile" className="flex flex-col gap-1 mb-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                      active
                        ? "text-brightPurple bg-softLavender"
                        : "text-brandText hover:bg-softLavender/70"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-2 pt-3 border-t border-lavender/50">
              {user ? (
                <>
                  <Button asChild size="md" className="w-full">
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Open Dashboard
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full text-red-500 hover:text-red-600"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="md" className="w-full">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild size="md" className="w-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
