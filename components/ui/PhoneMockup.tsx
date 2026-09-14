"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  frameClassName?: string;
  screenClassName?: string;
  floating?: boolean;
  blobs?: boolean;
}

export function PhoneMockup({
  children,
  className,
  frameClassName,
  screenClassName,
  floating = true,
  blobs = true,
}: PhoneMockupProps) {
  return (
    <div className={cn("relative isolate", className)} aria-hidden={false}>
      {blobs && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-14 h-64 w-64 rounded-full bg-lavender/50 blur-3xl animate-blob"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-brightPurple/20 blur-3xl animate-blob [animation-delay:3s]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-softGold/20 blur-3xl animate-blob [animation-delay:6s]"
          />
        </>
      )}
      <div
        className={cn(
          "relative mx-auto w-[280px] sm:w-[320px]",
          floating && "animate-float"
        )}
      >
        <div
          className={cn(
            "relative rounded-[2.5rem] bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple p-[10px] shadow-glow",
            frameClassName
          )}
        >
          <div className="relative rounded-[2rem] bg-[#1a0f30] aspect-[9/19] overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 inset-x-0 h-7 flex justify-center pointer-events-none z-10"
            >
              <div className="h-5 w-32 bg-black/80 rounded-b-2xl" />
            </div>
            <div
              className={cn(
                "absolute inset-0 pt-7 flex flex-col bg-gradient-to-b from-offWhite via-softLavender/60 to-offWhite",
                screenClassName
              )}
            >
              {children ?? (
                <div className="flex-1 flex items-center justify-center text-brandSecondaryText text-sm px-6 text-center">
                  Mindora Dashboard
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
