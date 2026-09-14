"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CommunityFeed } from "@/components/CommunityPost";
import { communityCategories } from "@/constants";
import { posts } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";
import * as LucideIcons from "lucide-react";
import {
  Clock,
  Filter,
  Heart,
  PenSquare,
  Shield,
  Sparkles,
  Sunrise,
  TrendingUp,
  Trophy,
  UserPlus,
} from "lucide-react";

type TabId = "top" | "recent" | "following";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "top", label: "Top", icon: TrendingUp },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "following", label: "Following", icon: UserPlus },
];

function getCategoryIcon(name: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    trophy: Trophy,
    heart: Heart,
    shield: Shield,
    sparkles: Sparkles,
    sunrise: Sunrise,
  };
  return map[name] ?? Sparkles;
}

export function CommunityClient() {
  const [activeTab, setActiveTab] = React.useState<TabId>("top");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const filteredPosts = React.useMemo(() => {
    let result: Post[] = [...posts];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (activeTab === "top") {
      result.sort((a, b) => b.likesCount - a.likesCount);
    } else if (activeTab === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [activeTab, selectedCategory]);

  return (
    <section className="container py-10 md:py-16">
      <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div
              role="tablist"
              aria-label="Community feed sort"
              className="inline-flex items-center gap-1 rounded-3xl bg-softLavender/70 p-1.5 border border-lavender/40"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-white text-primaryPurple shadow-soft"
                        : "text-brandSecondaryText hover:text-brandText hover:bg-white/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <Button
              asChild
              size="md"
              leftIcon={<PenSquare className="h-4.5 w-4.5" />}
            >
              <Link href="/signup">New Post</Link>
            </Button>
          </div>

          <div
            className="rounded-3xl bg-gradient-to-br from-softLavender/60 via-white to-softLavender/30 p-5 md:p-6 border border-lavender/40"
            aria-label="Filter by category"
          >
            <div className="flex items-center gap-2 mb-4 text-xs md:text-sm font-semibold uppercase tracking-widest text-brandSecondaryText">
              <Filter className="h-4 w-4" />
              Browse by category
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all border",
                  selectedCategory === null
                    ? "bg-brightPurple text-offWhite border-brightPurple shadow-soft"
                    : "bg-white text-brandSecondaryText border-lavender/40 hover:border-lavender hover:text-brandText"
                )}
              >
                <Sparkles className="h-4 w-4" />
                All
              </button>
              {communityCategories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(isSelected ? null : cat.id)
                    }
                    aria-pressed={isSelected}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all border",
                      isSelected
                        ? "bg-brightPurple text-offWhite border-brightPurple shadow-soft"
                        : cn(
                            "bg-gradient-to-br bg-opacity-50 text-brandSecondaryText border-lavender/40 hover:border-lavender hover:text-brandText",
                            cat.gradient
                          )
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <CommunityFeed posts={filteredPosts} />
          ) : (
            <div className="rounded-3xl bg-white border border-lavender/40 p-10 md:p-14 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-softLavender mb-5">
                <Heart className="h-8 w-8 text-primaryPurple" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brandText tracking-tight">
                Nothing here yet
              </h3>
              <p className="mt-3 text-brandSecondaryText leading-relaxed max-w-md mx-auto">
                Be the first to share in this space. Your voice matters — and
                someone out there needs to hear it today.
              </p>
              <div className="mt-7">
                <Button
                  asChild
                  size="md"
                  leftIcon={<PenSquare className="h-4.5 w-4.5" />}
                >
                  <Link href="/signup">Share a Thought</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <aside className="hidden lg:block space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-softLavender via-white to-softLavender/60 p-6 border border-lavender/40 shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brightPurple/10 text-brightPurple mb-5">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-brandText tracking-tight">
                A kind, safe space
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brandSecondaryText">
                Our community is gently moderated, anonymous-first, and built
                on one rule: meet each other where they are.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "No clout. No numbers chasing.",
                  "Anonymous posting always available.",
                  "Report and block tools built in.",
                  "Human moderators review every day.",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brightPurple/10 text-brightPurple">
                      <Heart className="h-3 w-3 fill-current" />
                    </span>
                    <span className="text-sm text-brandText/90">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-lavender/40 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-widest text-brandSecondaryText mb-4">
                Community guidelines
              </div>
              <ol className="space-y-4 text-sm">
                {[
                  "Speak from your own experience, using \"I\" statements.",
                  "Hold space for feelings you don't fully understand.",
                  "No advice-giving unless someone explicitly asks.",
                  "Protect privacy — never share what's not yours.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-xl bg-softLavender text-xs font-semibold text-primaryPurple">
                      {i + 1}
                    </span>
                    <span className="text-brandText/90 leading-relaxed pt-0.5">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
