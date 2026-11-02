"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Inbox, RefreshCw, Sprout } from "lucide-react";
import { callables, type JobOpeningRecord } from "@/lib/firebase/functions";
import { Button } from "@/components/ui/Button";

type LoadState = "loading" | "ready" | "empty" | "unavailable";

export function CareersOpenings() {
  const [state, setState] = React.useState<LoadState>("loading");
  const [openings, setOpenings] = React.useState<JobOpeningRecord[]>([]);
  const cancelledRef = React.useRef(false);

  const load = React.useCallback(async () => {
    setState("loading");
    try {
      const result = await callables.careersListOpenings();
      if (cancelledRef.current) return;
      if (result.status === "ok") {
        const items = result.data ?? [];
        setOpenings(items);
        setState(items.length > 0 ? "ready" : "empty");
      } else {
        setState("unavailable");
      }
    } catch {
      if (cancelledRef.current) return;
      setState("unavailable");
    }
  }, []);

  React.useEffect(() => {
    cancelledRef.current = false;
    void load();
    return () => {
      cancelledRef.current = true;
    };
  }, [load]);

  if (state === "loading") {
    return (
      <div aria-busy="true" className="grid gap-5">
        <span className="sr-only">Loading open roles…</span>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-3xl border border-lavender/50 bg-white p-6 md:p-8 shadow-card"
          >
            <div className="h-5 w-2/5 rounded-full bg-lavender/40" />
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="h-4 w-24 rounded-full bg-softLavender" />
              <div className="h-4 w-20 rounded-full bg-softLavender" />
              <div className="h-4 w-16 rounded-full bg-softLavender" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-3 w-full rounded-full bg-softLavender" />
              <div className="h-3 w-4/5 rounded-full bg-softLavender" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div
        role="alert"
        className="rounded-3xl border border-lavender/50 bg-white p-8 md:p-12 text-center shadow-card"
      >
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-softLavender text-primaryPurple">
          <Inbox className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brandText tracking-tight">
          We couldn&apos;t load our open roles right now.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-brandSecondaryText leading-relaxed">
          Something went wrong on our end. Please try again in a moment.
        </p>
        <div className="mt-7 flex justify-center">
          <Button
            size="lg"
            onClick={load}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="rounded-3xl border border-lavender/50 bg-white p-8 md:p-12 text-center shadow-card">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-softLavender text-brightPurple">
          <Sprout className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brandText tracking-tight">
          There are no open roles right now.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-brandSecondaryText leading-relaxed">
          We&apos;re always growing, and we love meeting people who care about
          mental wellness. If that&apos;s you, we&apos;d love to hear from you.
        </p>
        <div className="mt-7 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Send us your resume
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {openings.map((job) => (
        <article
          key={job.id}
          className="rounded-3xl border border-lavender/50 bg-white p-6 md:p-8 shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-brandText tracking-tight">
                {job.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-softLavender px-3 py-1 text-xs font-medium text-primaryPurple">
                  {job.team}
                </span>
                <span className="inline-flex items-center rounded-full border border-lavender/50 px-3 py-1 text-xs font-medium text-brandSecondaryText">
                  {job.location}
                </span>
                <span className="inline-flex items-center rounded-full border border-lavender/50 px-3 py-1 text-xs font-medium text-brandSecondaryText">
                  {job.type}
                </span>
              </div>
            </div>
            <Button asChild className="shrink-0">
              <Link href="/contact">
                Apply now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm md:text-[15px] text-brandSecondaryText leading-relaxed">
            {job.description}
          </p>
        </article>
      ))}
    </div>
  );
}
