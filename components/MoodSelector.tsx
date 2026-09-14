"use client";

import * as React from "react";
import type { Mood } from "@/types";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  mood: Mood;
  selected: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function MoodCard({
  mood,
  selected,
  onClick,
  size = "md",
}: MoodCardProps) {
  const sizeMap = {
    sm: "h-16 w-16 sm:h-20 sm:w-20 text-2xl sm:text-3xl",
    md: "h-24 w-24 sm:h-28 sm:w-28 text-4xl sm:text-5xl",
    lg: "h-28 w-28 sm:h-32 sm:w-32 text-5xl sm:text-6xl",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-3xl transition-all duration-300 focus-visible:outline-none",
        selected
          ? "bg-white shadow-glow ring-2 ring-offset-2 ring-offset-softLavender"
          : "bg-offWhite hover:bg-white hover:shadow-card",
        sizeMap[size]
      )}
      style={{
        ...(selected
          ? {
              backgroundColor: mood.bgColor,
              borderColor: mood.color,
              borderWidth: 2,
              boxShadow: `0 10px 30px -10px ${mood.color}55`,
            }
          : {
              backgroundColor: "rgba(240, 234, 251, 0.5)",
              border: "1px solid rgba(185, 165, 232, 0.4)",
            }),
      }}
      aria-pressed={selected}
      aria-label={`Mood: ${mood.label}`}
    >
      <span className="leading-none transition-transform duration-300 group-hover:scale-110 select-none">
        {mood.emoji}
      </span>
      <span
        className={cn(
          "mt-1.5 text-xs sm:text-sm font-medium transition-colors",
          size === "sm" ? "text-[11px]" : "text-xs sm:text-sm",
          selected ? "text-brandText" : "text-brandSecondaryText"
        )}
      >
        {mood.label}
      </span>
    </button>
  );
}

interface MoodSelectorProps {
  moods: Mood[];
  value?: string;
  onChange?: (mood: Mood) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MoodSelector({
  moods,
  value,
  onChange,
  size = "md",
  className,
}: MoodSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select your mood"
      className={cn(
        "grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 justify-items-center",
        className
      )}
    >
      {moods.map((m) => (
        <MoodCard
          key={m.id}
          mood={m}
          size={size}
          selected={value === m.id}
          onClick={() => onChange?.(m)}
        />
      ))}
    </div>
  );
}
