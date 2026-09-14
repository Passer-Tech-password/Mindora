"use client";

import * as React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCardProps {
  streak: number;
  week?: boolean[];
  className?: string;
  size?: "sm" | "md";
}

const days = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakCard({
  streak,
  week = [true, true, true, true, true, true, true],
  className,
  size = "md",
}: StreakCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-gradient-to-br from-softLavender via-white to-lavender/40 border border-lavender/50 p-6 md:p-7 shadow-card",
        size === "sm" ? "p-5" : "",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-softGold to-[#e6c97e] text-deepPurple shadow-soft">
              <Flame className="h-6 w-6 fill-current" />
              <span
                aria-hidden
                className="absolute -inset-1 rounded-2xl bg-softGold/30 blur-md -z-10"
              />
            </div>
            <div>
              <div className="text-sm font-medium text-brandSecondaryText">
                Current streak
              </div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-brandText">
                {streak}
                <span className="text-lg md:text-xl font-semibold text-brandSecondaryText ml-1.5">
                  Days
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-brandSecondaryText font-semibold">
            This Week
          </div>
          <div className="mt-2 text-sm font-medium text-brandText">
            {week.filter(Boolean).length} / 7 days
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-2 sm:gap-3">
        {week.map((done, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "aspect-square w-full rounded-2xl transition-all flex items-center justify-center text-sm font-semibold",
                done
                  ? "bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite shadow-soft"
                  : "bg-softLavender/60 text-brandSecondaryText/60"
              )}
            >
              {done ? (
                <span className="text-xs sm:text-sm">✓</span>
              ) : (
                <span className="text-xs sm:text-sm opacity-60">·</span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-brandSecondaryText">
              {days[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
