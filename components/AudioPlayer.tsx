"use client";

import * as React from "react";
import type { AudioTrack } from "@/types";
import { cn, formatDuration } from "@/lib/utils";
import { Lock, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  tracks: AudioTrack[];
  className?: string;
}

export function AudioPlayer({ tracks, className }: AudioPlayerProps) {
  const [activeId, setActiveId] = React.useState<string>(tracks[0]?.id ?? "");
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const isPremiumLocked =
    tracks.find((t) => t.id === activeId)?.isPremium ?? false;

  const active = tracks.find((t) => t.id === activeId) ?? tracks[0];
  const durationSeconds = active?.durationSeconds ?? 60;
  const currentSeconds = Math.floor((progress / 100) * durationSeconds);

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (durationSeconds * 2);
        return next >= 100 ? 0 : next;
      });
    }, 500);
    return () => window.clearInterval(id);
  }, [playing, durationSeconds]);

  const togglePlay = () => {
    if (isPremiumLocked) return;
    setPlaying((p) => !p);
  };

  const jump = (delta: number) => {
    const idx = tracks.findIndex((t) => t.id === activeId);
    const next = (idx + delta + tracks.length) % tracks.length;
    setActiveId(tracks[next].id);
    setProgress(0);
    setPlaying(false);
  };

  return (
    <div
      className={cn(
        "rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-deepPurple via-primaryPurple to-brightPurple p-6 md:p-10 text-offWhite shadow-glow overflow-hidden relative",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-60 w-60 rounded-full bg-softGold/20 blur-3xl"
      />
      <div className="relative grid lg:grid-cols-[1fr,1.3fr] gap-8 lg:gap-10 items-stretch">
        <div className="relative">
          {active && (
            <div
              className={cn(
                "aspect-[4/3] w-full rounded-3xl bg-gradient-to-br p-6 md:p-8 flex flex-col justify-between shadow-card",
                active.coverGradient
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
                  <Volume2 className="h-3.5 w-3.5" />
                  {active.category}
                </span>
                {active.isPremium && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-softGold text-deepPurple px-3 py-1 text-xs font-semibold">
                    <Lock className="h-3 w-3" /> Premium
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  {active.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-white/80 max-w-sm">
                  {active.description}
                </p>
                <div className="mt-4 text-sm text-white/70 font-medium">
                  {formatDuration(currentSeconds)}{" "}
                  <span className="opacity-60">/ {formatDuration(durationSeconds)}</span>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 space-y-4">
            <div
              aria-hidden
              className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-softGold via-lavender to-white transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => jump(-1)}
                className="h-11 w-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous track"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                disabled={isPremiumLocked}
                className={cn(
                  "h-16 w-16 rounded-full flex items-center justify-center shadow-glow transition-all disabled:opacity-60",
                  isPremiumLocked
                    ? "bg-softGold text-deepPurple"
                    : "bg-offWhite text-deepPurple hover:scale-105"
                )}
                aria-label={playing ? "Pause" : "Play"}
              >
                {isPremiumLocked ? (
                  <Lock className="h-6 w-6" />
                ) : playing ? (
                  <Pause className="h-7 w-7 fill-current" />
                ) : (
                  <Play className="h-7 w-7 fill-current ml-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => jump(1)}
                className="h-11 w-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next track"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-lavender/80 mb-1">
            Library
          </p>
          <ul role="list" className="space-y-2.5">
            {tracks.map((t, i) => {
              const isActive = t.id === activeId;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveId(t.id);
                      setProgress(0);
                      setPlaying(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all",
                      isActive
                        ? "bg-white/15 ring-1 ring-white/20 shadow-card"
                        : "hover:bg-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                        t.coverGradient
                      )}
                    >
                      {isActive && playing ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "truncate font-semibold tracking-tight",
                            isActive ? "text-white" : "text-white/90"
                          )}
                        >
                          {t.title}
                        </p>
                        {t.isPremium && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-softGold/90 text-deepPurple px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <Lock className="h-2.5 w-2.5" /> Pro
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs md:text-sm text-white/60 truncate">
                        {t.description}
                      </p>
                    </div>
                    <div className="text-xs md:text-sm text-white/60 tabular-nums shrink-0">
                      {formatDuration(t.durationSeconds)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
