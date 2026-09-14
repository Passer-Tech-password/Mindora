"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Flower2, Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import { footerLinks, socialLinks, startsWithAppPath, type LabelledLink } from "@/constants";
import { cn } from "@/lib/utils";

const SOCIAL_ICON_MAP: Record<"twitter" | "instagram" | "linkedin" | "facebook", React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
};

function FooterLink({ link, variant = "default" }: { link: LabelledLink; variant?: "default" | "legal" }) {
  const disabled = !!link.comingSoon;
  const title = disabled ? `${link.label} — coming soon` : undefined;
  const common = cn(
    "text-sm transition-colors",
    disabled
      ? "text-lavender/50 cursor-not-allowed select-none"
      : "text-lavender/85 hover:text-offWhite",
    variant === "legal" && "text-xs"
  );

  if (disabled) {
    return (
      <span aria-disabled="true" aria-label={title} title={title} className={common}>
        {link.label}
        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-softGold/80">
          Soon
        </span>
      </span>
    );
  }

  return (
    <Link href={link.href} title={title} className={common}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const liveRegionRef = React.useRef<HTMLDivElement>(null);

  if (startsWithAppPath(pathname || "")) return null;

  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setSubscribed(false);
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden text-offWhite">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #24143D 0%, #1a0f30 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-brightPurple/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-deepPurple/80 blur-3xl"
      />

      <div className="container relative pt-16 pb-8">
        <div className="grid gap-10 md:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group focus-visible:outline-none" aria-label="Mindora home">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primaryPurple via-brightPurple to-softGold text-offWhite shadow-soft group-hover:scale-105 transition-transform">
                <Flower2 className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="leading-tight">
                <div className="text-xl font-bold tracking-tight text-offWhite">
                  Mindora
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-lavender/80">
                  Elevate Your Mind Daily
                </div>
              </div>
            </Link>

            <p className="max-w-sm text-sm text-lavender/80 leading-relaxed mb-6">
              A calm, positive space to support your mind, your mood, and your
              growth every day.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = SOCIAL_ICON_MAP[s.platform];
                const disabled = !!s.comingSoon;
                const title = disabled ? `${s.label} — coming soon` : s.label;
                return disabled ? (
                  <span
                    key={s.label}
                    title={title}
                    aria-disabled="true"
                    aria-label={title}
                    className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lavender/50 cursor-not-allowed select-none"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lavender/90 hover:text-offWhite hover:bg-white/10 hover:border-lavender/40 transition"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.18em] text-lavender/70 font-semibold mb-4">
              Product
            </h2>
            <ul className="space-y-3">
              {footerLinks.product.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.18em] text-lavender/70 font-semibold mb-4">
              Company
            </h2>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xs uppercase tracking-[0.18em] text-lavender/70 font-semibold mb-4">
              Support
            </h2>
            <ul className="space-y-3">
              {footerLinks.support.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.18em] text-lavender/70 font-semibold mb-4">
              Stay in the loop
            </h2>
            <p className="text-sm text-lavender/85 mb-4 max-w-xs">
              Get tips, inspiration, and updates straight to your inbox.
            </p>

            <form
              onSubmit={onSubscribe}
              className="relative flex items-stretch rounded-2xl border border-white/10 bg-white/5 p-1 focus-within:border-brightPurple/60 transition"
              noValidate
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Newsletter email
              </label>
              <input
                id="footer-newsletter"
                type="email"
                required
                aria-invalid={!!error}
                aria-describedby={error ? "footer-newsletter-error" : "footer-newsletter-live"}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent pl-3 pr-3 py-2.5 text-sm text-offWhite placeholder:text-lavender/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite flex items-center justify-center hover:brightness-110 active:brightness-100 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div ref={liveRegionRef} id="footer-newsletter-live" aria-live="polite" aria-atomic="true" className="sr-only">
              {subscribed ? "Subscribed. Thank you." : error ? "" : ""}
            </div>
            {error && (
              <p id="footer-newsletter-error" role="alert" className="mt-2 text-xs text-pink-300">
                {error}
              </p>
            )}
            {subscribed && !error && (
              <p role="status" className="mt-2 text-xs text-softGold">
                🎉 Thank you! You&apos;re on the list.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-lavender/70">
          <span>© {new Date().getFullYear()} Mindora. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <FooterLink link={{ href: "#", label: "Privacy Policy", comingSoon: true }} variant="legal" />
            <FooterLink link={{ href: "#", label: "Terms of Service", comingSoon: true }} variant="legal" />
          </div>
        </div>
      </div>
    </footer>
  );
}
