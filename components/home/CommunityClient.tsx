"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { communityCategories } from "@/constants";
import { useAuth } from "@/components/auth/AuthContext";
import { callables, type CallableResult } from "@/lib/firebase/functions";
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
  TrendingUp,
  PenSquare,
  ChevronDown,
  Hash,
  Shield,
  Sunrise,
  Check,
  Loader2,
  MessageCircle,
  RefreshCw,
  Lock,
} from "lucide-react";

type CommunityPost = {
  id: string;
  authorId: string;
  authorName: string;
  isAnonymous: boolean;
  category: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
};

type Challenge = {
  id: string;
  title: string;
  days: number;
  participants: number;
  status: "Active" | "Draft" | "Archived";
};

type SortId = "top" | "recent";

const PAGE_SIZE = 10;

const sortTabs: { id: SortId; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "top", label: "Top" },
];

function getCommunityIcon(name: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    trophy: Trophy,
    heart: Heart,
    shield: Shield,
    sparkles: Sparkles,
    sunrise: Sunrise,
  };
  return map[name] ?? Sparkles;
}

const communityCategoryDescriptions: Record<string, string> = {
  "daily-wins": "Celebrate the small steps that move you forward.",
  "self-love": "Gentle practices to be kind to yourself.",
  "anxiety-support": "A calm space to share worries and breathe together.",
  motivation: "A gentle nudge forward when you need it most.",
  gratitude: "Notice and share the good in everyday moments.",
};

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

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return "";
  const diff = Date.now() - t;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function communityErrorMessage(res: CallableResult<unknown>): string {
  switch (res.status) {
    case "unconfigured":
      return "The community isn't connected yet. Please check back soon.";
    case "unavailable":
      return "The community service is temporarily unavailable. Please try again in a moment.";
    default:
      return res.error ?? "We couldn't reach the community right now.";
  }
}

function authorInitial(name: string, isAnonymous: boolean): string {
  if (isAnonymous) return "A";
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "M";
}

export function CommunityClient() {
  const { user, isLoading: authLoading } = useAuth();
  const feedRef = React.useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [sort, setSort] = React.useState<SortId>("recent");

  const [posts, setPosts] = React.useState<CommunityPost[]>([]);
  const [postsLoading, setPostsLoading] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [postsError, setPostsError] = React.useState<string | null>(null);
  const [limit, setLimit] = React.useState(PAGE_SIZE);

  const [likedIds, setLikedIds] = React.useState<Set<string>>(new Set());
  const [pendingLikes, setPendingLikes] = React.useState<Set<string>>(new Set());

  const [composerOpen, setComposerOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [draftCategory, setDraftCategory] = React.useState(
    communityCategories[0]?.name ?? "Daily Wins"
  );
  const [anonymous, setAnonymous] = React.useState(true);
  const [posting, setPosting] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const [challenges, setChallenges] = React.useState<Challenge[]>([]);
  const [challengesLoading, setChallengesLoading] = React.useState(true);
  const [challengesError, setChallengesError] = React.useState<string | null>(null);

  const loadPosts = React.useCallback(
    async (nextLimit: number, category: string | null, mode: "initial" | "more") => {
      if (mode === "more") setLoadingMore(true);
      else setPostsLoading(true);
      setPostsError(null);

      const res = await callables.communityListPosts({
        limit: nextLimit,
        ...(category ? { category } : {}),
      });

      if (res.status === "ok" && res.data) {
        setPosts(res.data);
      } else {
        setPosts([]);
        setPostsError(communityErrorMessage(res));
      }

      if (mode === "more") setLoadingMore(false);
      else setPostsLoading(false);
    },
    []
  );

  // Load the live feed for signed-in members only — the backend requires auth.
  React.useEffect(() => {
    if (!user) {
      setPosts([]);
      setPostsError(null);
      setPostsLoading(false);
      return;
    }
    setLimit(PAGE_SIZE);
    void loadPosts(PAGE_SIZE, activeCategory, "initial");
  }, [user, activeCategory, loadPosts]);

  // Load the real challenge list (public endpoint).
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setChallengesLoading(true);
      setChallengesError(null);
      const res = await callables.contentListChallenges();
      if (cancelled) return;
      if (res.status === "ok" && res.data) {
        setChallenges(res.data.filter((c) => c.status === "Active"));
      } else {
        setChallenges([]);
        setChallengesError(communityErrorMessage(res));
      }
      setChallengesLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedPosts = React.useMemo(() => {
    const copy = [...posts];
    if (sort === "top") {
      copy.sort((a, b) => b.likesCount - a.likesCount);
    } else {
      copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return copy;
  }, [posts, sort]);

  const hasMore = posts.length >= limit;

  const onLoadMore = () => {
    const next = limit + PAGE_SIZE;
    setLimit(next);
    void loadPosts(next, activeCategory, "more");
  };

  const selectCategory = (id: string | null) => {
    setActiveCategory(id);
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openComposer = () => {
    setComposerOpen(true);
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onToggleLike = async (post: CommunityPost) => {
    if (!user || pendingLikes.has(post.id)) return;
    setPendingLikes((prev) => new Set(prev).add(post.id));
    setActionError(null);
    const res = await callables.communityToggleLike({ postId: post.id });
    if (res.status === "ok" && res.data) {
      const { liked, likesCount } = res.data;
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, likesCount } : p))
      );
      setLikedIds((prev) => {
        const next = new Set(prev);
        if (liked) next.add(post.id);
        else next.delete(post.id);
        return next;
      });
    } else {
      setActionError(communityErrorMessage(res));
    }
    setPendingLikes((prev) => {
      const next = new Set(prev);
      next.delete(post.id);
      return next;
    });
  };

  const onSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (posting) return;
    const content = draft.trim();
    if (content.length < 3) {
      setActionError("Please write at least a few words before sharing.");
      return;
    }
    setPosting(true);
    setActionError(null);
    setNotice(null);

    const res = await callables.communityCreatePost({
      content,
      category: draftCategory,
      isAnonymous: anonymous,
    });

    if (res.status === "ok") {
      setDraft("");
      setNotice("Your post is now live in the community.");
      setLimit(PAGE_SIZE);
      void loadPosts(PAGE_SIZE, activeCategory, "initial");
    } else {
      setActionError(communityErrorMessage(res));
    }
    setPosting(false);
  };

  const renderFeed = () => {
    if (authLoading) {
      return (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-lavender/50 bg-white/70 px-6 py-14 text-sm text-brandSecondaryText shadow-card">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading the community…
        </div>
      );
    }

    if (!user) {
      return (
        <div className="rounded-3xl border border-lavender/50 bg-gradient-to-br from-white to-softLavender/40 p-8 md:p-10 text-center shadow-card">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brightPurple/15 text-primaryPurple">
            <Lock className="h-6 w-6" aria-hidden />
          </div>
          <h4 className="mt-4 text-lg md:text-xl font-bold text-brandText tracking-tight">
            Sign in to join the conversation
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm md:text-base text-brandSecondaryText leading-relaxed">
            The community feed is private to Mindora members so everyone can share
            safely. Create a free account to read posts, encourage others, and
            celebrate your wins.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="md" className="w-full sm:w-auto rounded-2xl">
              <Link href="/signup">Create free account</Link>
            </Button>
            <Button
              asChild
              size="md"
              variant="secondary"
              className="w-full sm:w-auto rounded-2xl"
            >
              <Link href="/login?from=%2Fcommunity">Sign in</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 md:space-y-5">
        {/* Inline composer */}
        <div className="rounded-3xl border border-lavender/50 bg-white p-5 md:p-6 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-brandText">
              <PenSquare className="h-4 w-4 text-brightPurple" aria-hidden />
              Share with the community
            </div>
            <button
              type="button"
              onClick={() => setComposerOpen((open) => !open)}
              className="text-xs font-semibold text-primaryPurple hover:text-brightPurple transition-colors"
              aria-expanded={composerOpen}
            >
              {composerOpen ? "Hide" : "Write a post"}
            </button>
          </div>

          {composerOpen ? (
            <form onSubmit={onSubmitPost} className="mt-4 space-y-4">
              <label htmlFor="community-post" className="sr-only">
                Your post
              </label>
              <textarea
                id="community-post"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                maxLength={1000}
                placeholder="Share a win, a kind word, or what's on your mind…"
                className="w-full resize-none rounded-2xl border border-lavender/60 bg-offWhite px-4 py-3 text-sm text-brandText placeholder:text-brandSecondaryText/70 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <label htmlFor="community-category" className="sr-only">
                    Category
                  </label>
                  <select
                    id="community-category"
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                    className="rounded-xl border border-lavender/60 bg-white px-3 py-2 text-sm text-brandText focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20"
                  >
                    {communityCategories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <label className="inline-flex items-center gap-2 text-xs font-medium text-brandSecondaryText">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="h-4 w-4 rounded border-lavender text-brightPurple focus:ring-brightPurple/30"
                    />
                    Post anonymously
                  </label>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  loading={posting}
                  className="rounded-xl px-5"
                >
                  Share post
                </Button>
              </div>
            </form>
          ) : null}
        </div>

        {notice ? (
          <div
            role="status"
            className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            <Check className="h-4 w-4" aria-hidden />
            {notice}
          </div>
        ) : null}

        {actionError ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {actionError}
          </div>
        ) : null}

        {postsLoading ? (
          <div className="flex items-center justify-center gap-2 rounded-3xl border border-lavender/50 bg-white/70 px-6 py-14 text-sm text-brandSecondaryText shadow-card">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading posts…
          </div>
        ) : postsError ? (
          <div className="rounded-3xl border border-lavender/50 bg-white p-8 text-center shadow-card">
            <p className="text-sm text-brandSecondaryText">{postsError}</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-4 rounded-xl"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={() => void loadPosts(limit, activeCategory, "initial")}
            >
              Try again
            </Button>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="rounded-3xl border border-lavender/50 bg-white p-8 md:p-10 text-center shadow-card">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-softLavender text-primaryPurple">
              <Sparkles className="h-6 w-6" aria-hidden />
            </div>
            <h4 className="mt-4 text-base md:text-lg font-bold text-brandText tracking-tight">
              No posts here yet
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-brandSecondaryText leading-relaxed">
              {activeCategory
                ? `Nothing has been shared in ${activeCategory} yet. Be the first.`
                : "Be the first to share something positive with the community."}
            </p>
            <Button size="sm" className="mt-5 rounded-xl" onClick={openComposer}>
              Write the first post
            </Button>
          </div>
        ) : (
          <>
            {sortedPosts.map((post) => {
              const liked = likedIds.has(post.id);
              const pending = pendingLikes.has(post.id);
              return (
                <article
                  key={post.id}
                  className="rounded-3xl border border-lavender/50 bg-gradient-to-br from-white to-softLavender/30 p-5 md:p-6 shadow-card hover:shadow-glow transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 md:h-12 md:w-12 shrink-0 rounded-2xl bg-gradient-to-br from-brightPurple/25 to-lavender/50 flex items-center justify-center text-sm font-bold text-primaryPurple">
                      {authorInitial(post.authorName, post.isAnonymous)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-bold text-brandText">
                          {post.isAnonymous ? "Anonymous" : post.authorName}
                        </span>
                        <span className="text-xs text-brandSecondaryText">
                          {relativeTime(post.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-softLavender/70 px-2.5 py-0.5 text-[11px] font-semibold text-primaryPurple">
                          <Hash className="h-3 w-3" aria-hidden />
                          {post.category}
                        </span>
                      </div>
                      <p className="mt-3 text-sm md:text-base leading-relaxed text-brandText/90 whitespace-pre-wrap break-words">
                        {post.content}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => void onToggleLike(post)}
                          disabled={pending}
                          aria-pressed={liked}
                          aria-label={liked ? "Unlike this post" : "Like this post"}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-60",
                            liked
                              ? "bg-pink-100 text-pink-600"
                              : "text-brandSecondaryText hover:bg-softLavender/70 hover:text-primaryPurple"
                          )}
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              liked && "fill-pink-500 text-pink-500"
                            )}
                            aria-hidden
                          />
                          {post.likesCount}
                        </button>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandSecondaryText">
                          <MessageCircle className="h-4 w-4" aria-hidden />
                          {post.commentsCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {hasMore ? (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  size="md"
                  className="rounded-full px-6 border-lavender"
                  loading={loadingMore}
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                  onClick={onLoadMore}
                >
                  Load more posts
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    );
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
      <div ref={feedRef} className="grid lg:grid-cols-[2fr_1fr] gap-6 md:gap-8 scroll-mt-28">
        {/* LEFT 2/3 - Community Feed */}
        <div className="space-y-5 md:space-y-6">
          {/* Feed Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-brandText tracking-tight">
              Community Feed
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {user ? (
                <div
                  role="tablist"
                  aria-label="Sort community feed"
                  className="inline-flex items-center gap-1 rounded-full bg-softLavender/70 p-1 border border-lavender/40"
                >
                  {sortTabs.map((tab) => {
                    const isActive = sort === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSort(tab.id)}
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
              ) : null}

              {user ? (
                <Button
                  size="sm"
                  leftIcon={<PenSquare className="h-4 w-4" />}
                  className="rounded-full px-4 md:px-5"
                  onClick={openComposer}
                >
                  New Post
                </Button>
              ) : (
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
              )}
            </div>
          </div>

          {renderFeed()}
        </div>

        {/* RIGHT 1/3 - Sidebar */}
        <aside className="space-y-5 md:space-y-6">
          {/* a. Our Community Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primaryPurple via-brightPurple to-[#8b5cf6] text-offWhite p-6 md:p-7 shadow-glow">
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
              <path d="M100 100 L100 190" stroke="white" strokeWidth="3" opacity="0.5" />
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
              <p className="mt-4 text-sm text-lavender/85 leading-relaxed">
                A kind, anonymous space to share wins, offer support, and grow together.
              </p>
              <Link
                href="/community-guidelines"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-offWhite hover:text-softGold transition-colors group"
              >
                Read our guidelines
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          {/* b. Community Challenges Card (live data) */}
          <div className="rounded-3xl bg-white border border-lavender/40 shadow-card p-6 md:p-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-softGold/20 text-amber-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
              <Trophy className="h-3.5 w-3.5" aria-hidden />
              Community Challenges
            </div>

            {challengesLoading ? (
              <div className="flex items-center gap-2 text-sm text-brandSecondaryText">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Loading challenges…
              </div>
            ) : challengesError ? (
              <p className="text-xs md:text-sm text-brandSecondaryText leading-relaxed">
                {challengesError}
              </p>
            ) : challenges.length === 0 ? (
              <p className="text-xs md:text-sm text-brandSecondaryText leading-relaxed">
                No active challenges right now. Our team is preparing the next one —
                check back soon.
              </p>
            ) : (
              <ul className="space-y-3">
                {challenges.slice(0, 3).map((challenge) => (
                  <li
                    key={challenge.id}
                    className="rounded-2xl border border-lavender/40 bg-offWhite/70 px-4 py-3"
                  >
                    <h4 className="text-sm font-bold text-brandText tracking-tight leading-tight">
                      {challenge.title}
                    </h4>
                    <p className="mt-1 text-xs text-brandSecondaryText">
                      {challenge.days}-day challenge ·{" "}
                      {challenge.participants}{" "}
                      {challenge.participants === 1 ? "participant" : "participants"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* c. Browse Topics Card (real category filter) */}
          <div className="rounded-3xl bg-white border border-lavender/40 shadow-card p-6 md:p-7">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-brightPurple" aria-hidden />
              <h4 className="text-sm font-bold uppercase tracking-widest text-brandSecondaryText">
                Browse Topics
              </h4>
            </div>

            <div className="space-y-1">
              {communityCategories.map((c) => {
                const Icon = getCommunityIcon(c.icon);
                const isActive = activeCategory === c.name;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectCategory(isActive ? null : c.name)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                      isActive
                        ? "bg-softLavender text-primaryPurple"
                        : "hover:bg-softLavender/60"
                    )}
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-softLavender text-primaryPurple">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs md:text-sm font-semibold text-brandText truncate">
                        {c.name}
                      </span>
                      <span className="block text-[11px] md:text-xs text-brandSecondaryText truncate">
                        {communityCategoryDescriptions[c.id]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-lavender/40">
              <button
                type="button"
                onClick={() => selectCategory(null)}
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-brightPurple hover:text-primaryPurple transition-colors group"
              >
                {activeCategory ? "Show all topics" : "Explore all topics"}
                <ArrowRight
                  className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* FINAL CTA BANNER */}
      <div className="mt-14 md:mt-20">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] px-6 sm:px-10 py-10 md:py-14 bg-gradient-to-br from-deepPurple via-[#1f1038] to-primaryPurple text-offWhite">
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
            <ellipse cx="150" cy="170" rx="100" ry="60" fill="url(#lotusGrad)" opacity="0.6" />
            <ellipse
              cx="100"
              cy="150"
              rx="50"
              ry="80"
              fill="url(#lotusGrad)"
              transform="rotate(-25 100 150)"
              opacity="0.5"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="50"
              ry="80"
              fill="url(#lotusGrad)"
              transform="rotate(25 200 150)"
              opacity="0.5"
            />
            <ellipse
              cx="80"
              cy="180"
              rx="40"
              ry="70"
              fill="url(#lotusGrad)"
              transform="rotate(-50 80 180)"
              opacity="0.4"
            />
            <ellipse
              cx="220"
              cy="180"
              rx="40"
              ry="70"
              fill="url(#lotusGrad)"
              transform="rotate(50 220 180)"
              opacity="0.4"
            />
            <ellipse cx="150" cy="130" rx="45" ry="70" fill="url(#lotusGrad)" opacity="0.6" />
            <circle cx="150" cy="160" r="18" fill="#FCFAFF" opacity="0.3" />
            <path d="M150 110 L150 220" stroke="white" strokeWidth="2" opacity="0.3" />
            <path
              d="M150 160 Q110 150 80 180"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.2"
              fill="none"
            />
            <path
              d="M150 160 Q190 150 220 180"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.2"
              fill="none"
            />
          </svg>

          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brightPurple/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-softGold/10 blur-3xl"
          />

          <div className="relative grid md:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-offWhite">
                Share your win or kind words.
              </h3>
              <p className="mt-3 text-sm md:text-lg text-lavender/90 leading-relaxed max-w-lg">
                Your words might be the light someone needs today.
              </p>
            </div>

            <div className="flex md:justify-end">
              {user ? (
                <Button
                  size="lg"
                  onClick={openComposer}
                  className="bg-offWhite text-primaryPurple hover:bg-lavender/30 hover:text-offWhite border-0 shadow-glow rounded-2xl md:rounded-3xl"
                  leftIcon={<PenSquare className="h-5 w-5" />}
                >
                  Create a Post
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-offWhite text-primaryPurple hover:bg-lavender/30 hover:text-offWhite border-0 shadow-glow rounded-2xl md:rounded-3xl"
                  leftIcon={<PenSquare className="h-5 w-5" />}
                >
                  <Link href="/signup">Create a Post</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
