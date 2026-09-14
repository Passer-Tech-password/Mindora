"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  moods,
  affirmations,
  audioTracks,
  communityCategories,
} from "@/constants";
import { posts } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Heart,
  Users,
  ShieldCheck,
  Star,
  Sparkles,
  Flower2,
  Trophy,
  Filter,
  Clock,
  TrendingUp,
  UserPlus,
  PenSquare,
  MoreHorizontal,
  MessageCircle,
  Share2,
  ChevronDown,
  Calendar,
  User,
  Hash,
  Eye,
  Check,
} from "lucide-react";

type TabId = "top" | "recent" | "following";

const tabs: { id: TabId; label: string }[] = [
  { id: "top", label: "Top" },
  { id: "recent", label: "Recent" },
  { id: "following", label: "Following" },
];

const featureBadges = [
  {
    id: "anonymous",
    title: "Anonymous & Safe",
    description: "Share freely supportive judgment-free",
    icon: Users,
    iconBg: "bg-brightPurple/15",
    iconColor: "text-primaryPurple",
  },
  {
    id: "encouraging",
    title: "Encouraging Community",
    description: "Real people real stories real support",
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    id: "celebrate",
    title: "Celebrate Wins",
    description: "Big small every win deserves recognition",
    icon: Flower2,
    iconBg: "bg-gradient-to-br from-brightPurple/20 to-lavender/40",
    iconColor: "text-primaryPurple",
  },
  {
    id: "kind",
    title: "Kind & Positive Only",
    description: "Keep community uplifting respectful",
    icon: ShieldCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "grow",
    title: "Grow Together",
    description: "Inspire others inspired each day",
    icon: Star,
    iconBg: "bg-brightPurple/15",
    iconColor: "text-brightPurple",
  },
];

const inlinePosts = [
  {
    id: "hp1",
    category: "Inspiration",
    categoryClass: "bg-brightPurple/12 text-brightPurple",
    content:
      "Today I finally did something I've been putting off for months. Small win, but I'm proud of myself. 🌸",
    time: "2h ago",
    likes: 128,
    comments: 24,
  },
  {
    id: "hp2",
    category: "Milestone",
    categoryClass: "bg-softGold/25 text-amber-700",
    content:
      "Day 30 of choosing myself. I'm becoming someone I'm really proud of. ✨",
    time: "5h ago",
    likes: 96,
    comments: 18,
  },
  {
    id: "hp3",
    category: "Support",
    categoryClass: "bg-green-100 text-green-700",
    content:
      "Anxious morning, but I did my breathing exercise and it helped so much. Taking it one moment at a time. 💜",
    time: "8h ago",
    likes: 74,
    comments: 12,
  },
  {
    id: "hp4",
    category: "Gratitude",
    categoryClass: "bg-pink-100 text-pink-600",
    content:
      "Grateful for this community. You all motivate me more than you know. Thank you! 🤍",
    time: "1d ago",
    likes: 142,
    comments: 31,
  },
];

const challengeDays = [
  { day: "Mon", done: true },
  { day: "Tue", done: true },
  { day: "Wed", done: true },
  { day: "Thu", done: true },
  { day: "Fri", done: true },
  { day: "Sat", done: true },
  { day: "Sun", done: false },
];

const popularTopics = [
  { id: "pt1", emoji: "🏆", tag: "#dailyWin", label: "Daily Wins", posts: "1.2K" },
  { id: "pt2", emoji: "🧠", tag: "#mentalhealth", label: "Mental Health", posts: "2.4K" },
  { id: "pt3", emoji: "💖", tag: "#selflove", label: "Self Love", posts: "1.8K" },
  { id: "pt4", emoji: "🌿", tag: "#anxiety", label: "Anxiety Support", posts: "987" },
];

export function CommunityClient() {
  const [activeTab, setActiveTab] = React.useState<TabId>("top");
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = React.useState<Record<string, number>>(
    Object.fromEntries(inlinePosts.map((p) => [p.id, p.likes]))
  );

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const nextLiked = !prev[postId];
      setLikeCounts((counts) => ({
        ...counts,
        [postId]: counts[postId] + (nextLiked ? 1 : -1),
      }));
      return { ...prev, [postId]: nextLiked };
    });
  };

  return (
    <section className="container py-16 md:py-20">
      {/* Feature Badges Row */}
      <div className="mb-12 md:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {featureBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="group rounded-2xl md:rounded-3xl bg-white border border-lavender/40 p-4 md:p-6 shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-transform text-center"
              >
                <div
                  className={cn(
                    "inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl mb-3 md:mb-4 group-hover:scale-110 transition-transform",
                    badge.iconBg
                  )}
                >
                  <Icon className={cn("h-5 w-5 md:h-6 md:w-6", badge.iconColor)} />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-brandText tracking-tight leading-tight">
                  {badge.title}
                </h3>
                <p className="mt-1 text-[10px] md:text-xs text-brandSecondaryText leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 md:gap-8">
        {/* LEFT 2/3 - Community Feed */}
        <div className="space-y-5 md:space-y-6">
          {/* Feed Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-brandText tracking-tight">
              Community Feed
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {/* Tabs Pill Group */}
              <div
                role="tablist"
                aria-label="Community feed sort"
                className="inline-flex items-center gap-1 rounded-full bg-softLavender/70 p-1 border border-lavender/40"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "inline-flex items-center rounded-full px-3.5 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-brightPurple text-offWhite shadow-soft"
                          : "text-brandSecondaryText hover:text-brandText hover:bg-white/50"
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* +New Post Button */}
              <Button
                asChild
                size="sm"
                leftIcon={<PenSquare className="h-4 w-4" />}
                className="rounded-full px-4 md:px-5"
              >
                <Link href="/signup">
                  <span className="hidden sm:inline">New Post</span>
                  <span className="sm:hidden">Post</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* 4 Anonymous Feed Posts */}
          <div className="space-y-4 md:space-y-5">
            {inlinePosts.map((post) => {
              const isLiked = likedPosts[post.id] ?? false;
              const likesCount = likeCounts[post.id] ?? post.likes;
              return (
                <article
                  key={post.id}
                  className="group relative rounded-3xl bg-gradient-to-br from-white to-softLavender/30 border border-lavender/50 shadow-card hover:shadow-glow transition-colors p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="h-11 w-11 md:h-12 md:w-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-soft bg-gradient-to-br from-brandSecondaryText to-[#766D80]">
                        <User className="h-4.5 w-4.5 md:h-5 md:w-5" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Author + Category + Time + Menu */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-brandText tracking-tight text-sm md:text-base">
                          Anonymous
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider ml-auto order-3 sm:order-none sm:ml-0",
                            post.categoryClass
                          )}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs md:text-sm text-brandSecondaryText sm:ml-auto order-2">
                          {post.time}
                        </span>
                        <div className="relative order-4 sm:order-none">
                          <button
                            type="button"
                            aria-haspopup="menu"
                            aria-label="More post actions"
                            className="h-8 w-8 md:h-9 md:w-9 rounded-xl flex items-center justify-center hover:bg-softLavender text-brandSecondaryText"
                          >
                            <MoreHorizontal className="h-4.5 w-4.5 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-brandText/90">
                        {post.content}
                      </p>

                      {/* Actions */}
                      <div className="mt-4 md:mt-5 flex items-center gap-1.5 md:gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => toggleLike(post.id)}
                          aria-pressed={isLiked}
                          className={cn(
                            "inline-flex items-center gap-1.5 md:gap-2 rounded-xl px-3 md:px-3.5 py-1.5 md:py-2 text-xs md:text-sm font-semibold transition-colors",
                            isLiked
                              ? "bg-brightPurple/10 text-brightPurple"
                              : "text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple"
                          )}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4 md:h-4.5 md:w-4.5",
                              isLiked && "fill-current text-brightPurple"
                            )}
                          />
                          <span className="tabular-nums">{likesCount}</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 md:gap-2 rounded-xl px-3 md:px-3.5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 md:h-4.5 md:w-4.5" />
                          <span className="tabular-nums">{post.comments}</span>
                          <span className="hidden sm:inline">Comment</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 md:gap-2 rounded-xl px-3 md:px-3.5 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple transition-colors"
                        >
                          <Share2 className="h-4 w-4 md:h-4.5 md:w-4.5" />
                          <span className="hidden sm:inline">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="md"
              className="rounded-full px-6 border-lavender"
              rightIcon={<ChevronDown className="h-4 w-4" />}
            >
              Load more posts
            </Button>
          </div>
        </div>

        {/* RIGHT 1/3 - Sidebar */}
        <aside className="space-y-5 md:space-y-6">
          {/* a. Our Community Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primaryPurple via-brightPurple to-[#8b5cf6] text-offWhite p-6 md:p-7 shadow-glow">
            {/* Decorative translucent leaf SVG background */}
            <svg
              aria-hidden
              className="absolute -right-8 -top-8 w-48 h-48 opacity-15 pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              <path
                d="M100 10 C160 10 190 70 190 100 C190 150 140 190 100 190 C60 190 10 150 10 100 C10 70 40 10 100 10 Z"
                fill="white"
              />
              <path
                d="M100 100 L100 190"
                stroke="white"
                strokeWidth="3"
                opacity="0.5"
              />
              <path
                d="M100 100 Q60 80 30 120"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
                fill="none"
              />
              <path
                d="M100 100 Q140 80 170 120"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
                fill="none"
              />
              <path
                d="M100 100 Q70 60 50 90"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
                fill="none"
              />
              <path
                d="M100 100 Q130 60 150 90"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
                fill="none"
              />
            </svg>

            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-offWhite tracking-tight">
                Our Community
              </h3>
              <p className="mt-1.5 text-sm md:text-[15px] text-lavender/90 font-medium">
                Together we&apos;re stronger.
              </p>

              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">👥</span>
                  <span className="font-bold text-offWhite tabular-nums">
                    10,842
                  </span>
                  <span className="text-lavender/85">Members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">👥</span>
                  <span className="font-bold text-offWhite tabular-nums">
                    1,245
                  </span>
                  <span className="text-lavender/85">Online now</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-lg">📧</span>
                  <span className="font-bold text-offWhite tabular-nums">
                    24,568
                  </span>
                  <span className="text-lavender/85">Posts shared</span>
                </div>
              </div>
            </div>
          </div>

          {/* b. Community Challenge Card */}
          <div className="rounded-3xl bg-white border border-lavender/40 shadow-card p-6 md:p-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-softGold/20 text-amber-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
              <Trophy className="h-3.5 w-3.5" />
              Community Challenge
            </div>

            <h4 className="text-base md:text-lg font-bold text-brandText tracking-tight leading-tight">
              7-Day Positivity Challenge
            </h4>
            <p className="mt-1.5 text-xs md:text-sm text-brandSecondaryText leading-relaxed">
              Share something positive every day for 7 days.
            </p>

            {/* 7 Circles Row */}
            <div className="mt-5 grid grid-cols-7 gap-1.5 md:gap-2">
              {challengeDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "aspect-square w-full rounded-full flex items-center justify-center transition-colors",
                      d.done
                        ? "bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite shadow-soft"
                        : "border-2 border-lavender/60 bg-white text-lavender"
                    )}
                  >
                    {d.done ? (
                      <Check className="h-3 w-3 md:h-3.5 md:w-3.5 stroke-[3]" />
                    ) : (
                      <span className="text-[10px] md:text-[11px] font-bold opacity-0">
                        {d.day}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-medium text-brandSecondaryText">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>

            {/* Join Button */}
            <div className="mt-5">
              <Button size="md" className="w-full rounded-2xl">
                Join Challenge
              </Button>
            </div>

            {/* Avatars + People joining */}
            <div className="mt-4 pt-4 border-t border-lavender/40 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  { from: "from-brightPurple", to: "to-primaryPurple" },
                  { from: "from-lavender", to: "to-primaryPurple" },
                  { from: "from-softGold", to: "to-primaryPurple" },
                ].map((g, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-7 w-7 md:h-8 md:w-8 rounded-full border-2 border-white shadow-soft flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br",
                      g.from,
                      g.to
                    )}
                  >
                    {["M", "S", "A"][i]}
                  </div>
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium text-brandSecondaryText">
                320 people are joining
              </span>
            </div>
          </div>

          {/* c. Popular Topics Card */}
          <div className="rounded-3xl bg-white border border-lavender/40 shadow-card p-6 md:p-7">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 md:h-4.5 md:w-4.5 text-brightPurple" />
              <h4 className="text-sm font-bold uppercase tracking-widest text-brandSecondaryText">
                Popular Topics
              </h4>
            </div>

            <div className="space-y-1">
              {popularTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href="#"
                  className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-softLavender/60 transition-colors"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-softLavender text-base">
                    {topic.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-brightPurple shrink-0" />
                      <span className="text-xs md:text-sm font-semibold text-brandText truncate">
                        {topic.tag.replace("#", "")}
                      </span>
                    </div>
                    <span className="text-[11px] md:text-xs text-brandSecondaryText">
                      {topic.label}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-brandSecondaryText shrink-0 tabular-nums">
                    {topic.posts}
                  </span>
                </Link>
              ))}
            </div>

            {/* Footer link */}
            <div className="mt-4 pt-3 border-t border-lavender/40">
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-brightPurple hover:text-primaryPurple transition-colors group"
              >
                Explore all topics
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* FINAL CTA BANNER */}
      <div className="mt-14 md:mt-20">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-10 md:py-14 bg-gradient-to-br from-deepPurple via-[#1f1038] to-primaryPurple text-offWhite">
          {/* Decorative purple lotus leaf BG on left */}
          <svg
            aria-hidden
            className="absolute -left-16 -bottom-12 w-72 h-72 md:w-96 md:h-96 opacity-20 pointer-events-none"
            viewBox="0 0 300 300"
            fill="none"
          >
            <defs>
              <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B9A5E8" />
                <stop offset="100%" stopColor="#6D3FE8" />
              </linearGradient>
            </defs>
            {/* Main lotus flower shape */}
            <ellipse cx="150" cy="170" rx="100" ry="60" fill="url(#lotusGrad)" opacity="0.6" />
            <ellipse cx="100" cy="150" rx="50" ry="80" fill="url(#lotusGrad)" transform="rotate(-25 100 150)" opacity="0.5" />
            <ellipse cx="200" cy="150" rx="50" ry="80" fill="url(#lotusGrad)" transform="rotate(25 200 150)" opacity="0.5" />
            <ellipse cx="80" cy="180" rx="40" ry="70" fill="url(#lotusGrad)" transform="rotate(-50 80 180)" opacity="0.4" />
            <ellipse cx="220" cy="180" rx="40" ry="70" fill="url(#lotusGrad)" transform="rotate(50 220 180)" opacity="0.4" />
            <ellipse cx="150" cy="130" rx="45" ry="70" fill="url(#lotusGrad)" opacity="0.6" />
            {/* Center */}
            <circle cx="150" cy="160" r="18" fill="#FCFAFF" opacity="0.3" />
            {/* Leaf veins */}
            <path d="M150 110 L150 220" stroke="white" strokeWidth="2" opacity="0.3" />
            <path d="M150 160 Q110 150 80 180" stroke="white" strokeWidth="1.5" opacity="0.2" fill="none" />
            <path d="M150 160 Q190 150 220 180" stroke="white" strokeWidth="1.5" opacity="0.2" fill="none" />
          </svg>

          {/* Glow blobs */}
          <div aria-hidden className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brightPurple/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-softGold/10 blur-3xl" />

          <div className="relative grid md:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
            {/* LEFT 2/3 */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-offWhite">
                Share your win or kind words.
              </h3>
              <p className="mt-3 text-sm md:text-lg text-lavender/90 leading-relaxed max-w-lg">
                Your words might be the light someone needs today.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex md:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-offWhite text-primaryPurple hover:bg-lavender/30 hover:text-offWhite border-0 shadow-glow rounded-2xl md:rounded-3xl"
                leftIcon={<PenSquare className="h-4.5 w-4.5 md:h-5 md:w-5" />}
              >
                <Link href="/signup">Create a Post</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
