"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Bookmark, BookmarkCheck, Play, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffirmationCardProps {
  text: string;
  author?: string;
  onListen?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  saved?: boolean;
  listening?: boolean;
  className?: string;
}

export function AffirmationCard({
  text,
  author = "Mindora",
  onListen,
  onSave,
  onShare,
  saved = false,
  listening = false,
  className,
}: AffirmationCardProps) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-3xl rounded-[2rem] md:rounded-[2.25rem] p-8 md:p-12 bg-gradient-to-br from-softLavender via-white to-lavender/40 border border-lavender/50 shadow-card overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-16 h-60 w-60 rounded-full bg-brightPurple/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-softGold/20 blur-3xl"
      />
      <div className="relative">
        <svg
          aria-hidden
          viewBox="0 0 56 56"
          className="h-10 w-10 md:h-14 md:w-14 text-brightPurple/30 mb-4"
          fill="currentColor"
        >
          <path d="M8 32c2-9 9-15 18-17l1 5c-5 1.5-8.5 4.5-10 8l4 2-8 12H0L8 32zm28 0c2-9 9-15 18-17l1 5c-5 1.5-8.5 4.5-10 8l4 2-8 12H28L36 32z" />
        </svg>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium leading-relaxed tracking-tight text-brandText">
          &ldquo;{text}&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm md:text-base text-brandSecondaryText">
            — {author}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={listening ? "primary" : "outline"}
              size="sm"
              leftIcon={
                <Play
                  className={cn("h-4 w-4", listening && "fill-current")}
                />
              }
              onClick={onListen}
              aria-label="Listen to affirmation"
            >
              Listen
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSave}
              aria-label={saved ? "Remove from saved" : "Save affirmation"}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-brightPurple fill-brightPurple/20" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              aria-label="Share affirmation"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
