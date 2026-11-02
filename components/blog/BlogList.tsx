"use client";

import * as React from "react";
import { CalendarDays, Clock, FileText, RefreshCw, User } from "lucide-react";
import { callables, type BlogPostRecord } from "@/lib/firebase/functions";
import { Button } from "@/components/ui/Button";

type LoadState = "loading" | "ready" | "empty" | "unavailable";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogList() {
  const [state, setState] = React.useState<LoadState>("loading");
  const [posts, setPosts] = React.useState<BlogPostRecord[]>([]);
  const cancelledRef = React.useRef(false);

  const load = React.useCallback(async () => {
    setState("loading");
    try {
      const result = await callables.blogListPosts({ limit: 12 });
      if (cancelledRef.current) return;
      if (result.status === "ok") {
        const items = result.data ?? [];
        setPosts(items);
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
      <div aria-busy="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <span className="sr-only">Loading articles…</span>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-3xl border border-lavender/50 bg-white p-6 shadow-card"
          >
            <div className="h-4 w-20 rounded-full bg-softLavender" />
            <div className="mt-4 h-5 w-4/5 rounded-full bg-lavender/40" />
            <div className="mt-3 space-y-2">
              <div className="h-3 w-full rounded-full bg-softLavender" />
              <div className="h-3 w-11/12 rounded-full bg-softLavender" />
              <div className="h-3 w-3/4 rounded-full bg-softLavender" />
            </div>
            <div className="mt-6 h-3 w-1/2 rounded-full bg-softLavender" />
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
          <FileText className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brandText tracking-tight">
          We couldn&apos;t load the blog right now.
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
          <FileText className="h-8 w-8" aria-hidden />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brandText tracking-tight">
          No articles published yet.
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-brandSecondaryText leading-relaxed">
          Subscribe below and we&apos;ll let you know the moment we publish.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const published = formatDate(post.createdAt);
        return (
          <article
            key={post.id}
            className="flex h-full flex-col rounded-3xl border border-lavender/50 bg-white p-6 shadow-card"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-softLavender px-3 py-1 text-xs font-medium text-primaryPurple">
              {post.category}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-brandText tracking-tight leading-snug">
              {post.title}
            </h3>
            <p className="mt-3 flex-1 text-sm text-brandSecondaryText leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brandSecondaryText">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" aria-hidden />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {post.readMinutes} min read
              </span>
              {published && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  {published}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
