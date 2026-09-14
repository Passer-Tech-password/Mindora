"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonProps["variant"];
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  tone?: "purple" | "light";
  className?: string;
  id?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  tone = "purple",
  className,
  id,
}: CTASectionProps) {
  const dark = tone === "purple";
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-14 md:py-20",
        dark
          ? "bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple text-offWhite"
          : "bg-softLavender text-brandText border border-lavender/40",
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl",
          dark ? "bg-brightPurple/40" : "bg-lavender/60"
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-32 -right-10 h-96 w-96 rounded-full blur-3xl",
          dark ? "bg-softGold/20" : "bg-softGold/30"
        )}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div
            className={cn(
              "inline-block rounded-full px-4 py-1.5 text-xs md:text-sm font-medium tracking-wide mb-5",
              dark
                ? "bg-offWhite/10 text-lavender"
                : "bg-white/70 text-primaryPurple"
            )}
          >
            {eyebrow}
          </div>
        )}
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight",
            dark ? "text-offWhite" : "text-brandText"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed",
              dark ? "text-lavender/90" : "text-brandSecondaryText"
            )}
          >
            {description}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Button
                variant={dark ? "gold" : "primary"}
                size="lg"
                asChild={!!primaryCta.href}
                rightIcon={<ArrowRight className="h-5 w-5" />}
                onClick={primaryCta.onClick}
              >
                {primaryCta.href ? (
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                ) : (
                  primaryCta.label
                )}
              </Button>
            )}
            {secondaryCta && (
              <Button
                variant={dark ? "ghost" : "outline"}
                size="lg"
                asChild={!!secondaryCta.href}
                onClick={secondaryCta.onClick}
                className={dark ? "text-offWhite hover:bg-offWhite/10" : ""}
              >
                {secondaryCta.href ? (
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                ) : (
                  secondaryCta.label
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
