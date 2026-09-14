"use client";

import * as React from "react";
import type { PricingTier } from "@/types";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: PricingTier;
  className?: string;
  onCtaClick?: () => void;
}

export function PricingCard({
  tier,
  className,
  onCtaClick,
}: PricingCardProps) {
  const period = tier.period === "month" ? "month" : "year";
  return (
    <div
      className={cn(
        "relative rounded-[2rem] p-8 flex flex-col transition-all duration-300",
        tier.highlight
          ? "bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple text-offWhite shadow-glow scale-[1.02]"
          : "bg-offWhite border border-lavender/50 text-brandText shadow-card hover:shadow-glow hover:-translate-y-1",
        className
      )}
    >
      {tier.badgeText && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-softGold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-deepPurple shadow-soft">
            <Sparkles className="h-3.5 w-3.5" />
            {tier.badgeText}
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3
          className={cn(
            "text-lg md:text-xl font-semibold tracking-tight",
            tier.highlight ? "text-lavender" : "text-brandSecondaryText"
          )}
        >
          {tier.name}
        </h3>
        <div className="mt-3 flex items-end gap-2">
          <span
            className={cn(
              "text-5xl md:text-6xl font-bold tracking-tight",
              tier.highlight ? "text-offWhite" : "text-brandText"
            )}
          >
            ${tier.price.toFixed(2)}
          </span>
          <span
            className={cn(
              "pb-2 text-sm md:text-base font-medium",
              tier.highlight ? "text-lavender/80" : "text-brandSecondaryText"
            )}
          >
            /{period}
          </span>
        </div>
        <p
          className={cn(
            "mt-3 text-sm md:text-base",
            tier.highlight ? "text-lavender/80" : "text-brandSecondaryText"
          )}
        >
          {tier.description}
        </p>
      </div>
      <ul className="space-y-3 flex-1 mb-7">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                tier.highlight
                  ? "bg-softGold/90 text-deepPurple"
                  : "bg-brightPurple/15 text-brightPurple"
              )}
            >
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </span>
            <span
              className={cn(
                "text-sm md:text-[15px] leading-relaxed",
                tier.highlight ? "text-offWhite/90" : "text-brandText/85"
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={tier.highlight ? "gold" : "primary"}
        size="lg"
        className="w-full"
        onClick={onCtaClick}
      >
        {tier.cta}
      </Button>
    </div>
  );
}
