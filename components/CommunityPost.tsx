"use client";

import * as React from "react";
import type { Post } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import {
  Bookmark,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  User,
} from "lucide-react";

interface CommunityPostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onReport?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onComment?: (postId: string) => void;
  className?: string;
  compact?: boolean;
}

export function CommunityPost({
  post,
  onLike,
  onReport,
  onShare,
  onComment,
  className,
  compact = false,
}: CommunityPostProps) {
  const [liked, setLiked] = React.useState(post.isLiked ?? false);
  const [likes, setLikes] = React.useState(post.likesCount);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLike = () => {
    setLiked((l) => {
      const next = !l;
      setLikes((c) => c + (next ? 1 : -1));
      return next;
    });
    onLike?.(post.id);
  };

  const initials = post.isAnonymous
    ? "?"
    : (post.authorName?.[0] ?? "U").toUpperCase();

  return (
    <article
      className={cn(
        "group relative rounded-3xl bg-gradient-to-br from-white to-softLavender/30 border border-lavender/50 shadow-card hover:shadow-glow transition-all",
        compact ? "p-5" : "p-6 md:p-7",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-soft",
              post.isAnonymous
                ? "bg-gradient-to-br from-brandSecondaryText to-766D80"
                : "bg-gradient-to-br from-brightPurple via-primaryPurple to-deepPurple"
            )}
            aria-hidden
          >
            {post.isAnonymous ? (
              <User className="h-5 w-5" />
            ) : (
              <span className="text-sm">{initials}</span>
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-brandText tracking-tight">
              {post.isAnonymous ? "Anonymous" : post.authorName ?? "Mindora"}
            </p>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-wider",
                "bg-brightPurple/10 text-brightPurple"
              )}
            >
              {post.category.replace(/-/g, " ")}
            </span>
            <span className="text-xs md:text-sm text-brandSecondaryText ml-auto">
              {formatDate(post.createdAt)}
            </span>
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-softLavender text-brandSecondaryText"
                aria-label="More post actions"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-11 z-10 min-w-[160px] rounded-2xl bg-white shadow-glow border border-lavender/60 py-2"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onReport?.(post.id);
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-brandText hover:bg-softLavender"
                  >
                    <Flag className="h-4 w-4 text-brandSecondaryText" />
                    Report post
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-brandText hover:bg-softLavender"
                  >
                    <Bookmark className="h-4 w-4 text-brandSecondaryText" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-brandText/90">
            {post.content}
          </p>
          <div className="mt-5 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleLike}
              aria-pressed={liked}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all",
                liked
                  ? "bg-brightPurple/10 text-brightPurple"
                  : "text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple"
              )}
            >
              <Heart
                className={cn(
                  "h-4.5 w-4.5",
                  liked && "fill-current text-brightPurple"
                )}
              />
              <span className="tabular-nums">{likes}</span>
            </button>
            <button
              type="button"
              onClick={() => onComment?.(post.id)}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple transition-colors"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              <span className="tabular-nums">{post.commentsCount}</span>
              <span className="hidden sm:inline">Comment</span>
            </button>
            <button
              type="button"
              onClick={() => onShare?.(post.id)}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-brandSecondaryText hover:bg-softLavender hover:text-primaryPurple transition-colors"
            >
              <Share2 className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

interface CommunityFeedProps {
  posts: Post[];
  className?: string;
  compact?: boolean;
  onLike?: (postId: string) => void;
  onReport?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

export function CommunityFeed({
  posts,
  className,
  compact,
  onLike,
  onReport,
  onShare,
  onComment,
}: CommunityFeedProps) {
  return (
    <div className={cn("grid gap-5", className)}>
      {posts.map((post) => (
        <CommunityPost
          key={post.id}
          post={post}
          compact={compact}
          onLike={onLike}
          onReport={onReport}
          onShare={onShare}
          onComment={onComment}
        />
      ))}
    </div>
  );
}
