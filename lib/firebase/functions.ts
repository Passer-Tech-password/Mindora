"use client";

import {getFirebase} from "@/lib/firebase";
import {isFirebaseConfigured} from "./config";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
  type Functions,
  type HttpsCallableResult,
} from "firebase/functions";

let functionsInstance: Functions | null = null;
let checkedEmulator = false;

export type CallableStatus = "ok" | "unconfigured" | "unavailable" | "error";

export interface CallableResult<T> {
  status: CallableStatus;
  data?: T;
  error?: string;
}

export function getFunctionsClient(): Functions | null {
  if (!isFirebaseConfigured()) return null;
  const {app} = getFirebase();
  if (!app) return null;
  if (!functionsInstance) {
    try {
      functionsInstance = getFunctions(app);
      if (!checkedEmulator) {
        checkedEmulator = true;
        const host =
          process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST ||
          (
            globalThis as unknown as {
              __FIREBASE_FUNCTIONS_EMULATOR_HOST__?: string;
            }
          ).__FIREBASE_FUNCTIONS_EMULATOR_HOST__;
        if (host) {
          const [h, portStr] = host.split(":");
          const port = Number(portStr) || 5001;
          try {
            connectFunctionsEmulator(functionsInstance, h ?? "localhost", port);
          } catch {
            /* emulator already connected on HMR */
          }
        }
      }
    } catch {
      functionsInstance = null;
    }
  }
  return functionsInstance;
}

function isFunctionsDeployedError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e ?? "");
  return (
    msg.includes("not-found") ||
    msg.includes("NOT_FOUND") ||
    msg.includes("timeout") ||
    msg.includes("deadline-exceeded") ||
    msg.includes("unavailable") ||
    msg.includes("internal") ||
    msg.includes("Failed to fetch") ||
    msg.includes("network") ||
    msg.includes("CORS") ||
    msg.includes("No 'Access-Control-Allow-Origin'")
  );
}

export async function callFunction<I extends Record<string, unknown>, O>(
  name: string,
  input: I,
  opts?: {timeoutMs?: number}
): Promise<CallableResult<O>> {
  const fns = getFunctionsClient();
  if (!fns) {
    return {status: "unconfigured"};
  }
  const timeoutMs = opts?.timeoutMs ?? 6000;
  try {
    const callable = httpsCallable<I, O>(fns, name);
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    let result: HttpsCallableResult<O>;
    try {
      result = await callable(input);
    } finally {
      clearTimeout(t);
    }
    return {status: "ok", data: result.data};
  } catch (e) {
    if (isFunctionsDeployedError(e)) {
      return {
        status: "unavailable",
        error:
          e instanceof Error
            ? e.message
            : "Functions are not deployed or reachable right now.",
      };
    }
    return {
      status: "error",
      error: e instanceof Error ? e.message : "Unknown callable error.",
    };
  }
}

/* --------------------- Typed wrappers for each function --------------------- */

import type {AdminStats, AffirmationItem, AudioItem, ChallengeItem, CommunityReport, MindoraUser} from "@/components/auth/AuthContext";

export interface MoodRecord {
  id: string;
  label: string;
  emoji: string;
  note?: string;
  createdAt: string;
}

export interface SavedItemRecord {
  id: string;
  kind: "affirmation" | "audio" | "article";
  refId: string;
  title: string;
  category?: string;
  gradient?: string;
  createdAt: string;
}

export type AdminUserList = Omit<MindoraUser, "stats">[];

export const callables = {
  /* Admin */
  adminGetStats: () =>
    callFunction<Record<string, unknown>, AdminStats>("adminGetStats", {}),
  adminListUsers: (input: {limit?: number}) =>
    callFunction<{limit?: number}, AdminUserList>("adminListUsers", input),
  adminDeleteUser: (input: {userId: string}) =>
    callFunction<{userId: string}, void>("adminDeleteUser", input),
  adminUpdateUserRole: (input: {userId: string; role: "user" | "admin"}) =>
    callFunction<{userId: string; role: "user" | "admin"}, void>(
      "adminUpdateUserRole",
      input
    ),
  adminReviewReport: (
    input: {reportId: string; status: CommunityReport["status"]}
  ) =>
    callFunction<
      {reportId: string; status: CommunityReport["status"]},
      void
    >("adminReviewReport", input),

  /* Content */
  contentAddAffirmation: (input: {text: string; category: string}) =>
    callFunction<{text: string; category: string}, AffirmationItem>(
      "contentAddAffirmation",
      input
    ),
  contentDeleteAffirmation: (input: {id: string}) =>
    callFunction<{id: string}, void>("contentDeleteAffirmation", input),
  contentListAffirmations: (input: {category?: string; limit?: number} = {}) =>
    callFunction<{category?: string; limit?: number}, AffirmationItem[]>(
      "contentListAffirmations",
      input
    ),
  contentUploadAudio: (
    input: {
      title: string;
      category: string;
      durationSec?: number;
      sizeKb?: number;
      storagePath?: string;
    }
  ) =>
    callFunction<
      {
        title: string;
        category: string;
        durationSec?: number;
        sizeKb?: number;
        storagePath?: string;
      },
      AudioItem
    >("contentUploadAudio", input),
  contentDeleteAudio: (input: {id: string}) =>
    callFunction<{id: string}, void>("contentDeleteAudio", input),
  contentListAudios: (
    input: {category?: string; limit?: number; publishedOnly?: boolean} = {}
  ) =>
    callFunction<
      {category?: string; limit?: number; publishedOnly?: boolean},
      AudioItem[]
    >("contentListAudios", input),
  contentCreateChallenge: (input: {title: string; days: number}) =>
    callFunction<{title: string; days: number}, ChallengeItem>(
      "contentCreateChallenge",
      input
    ),
  contentListChallenges: () =>
    callFunction<Record<string, unknown>, ChallengeItem[]>(
      "contentListChallenges",
      {}
    ),

  /* Community */
  communityCreatePost: (
    input: {content: string; category: string; isAnonymous?: boolean}
  ) =>
    callFunction<
      {content: string; category: string; isAnonymous?: boolean},
      {
        id: string;
        authorId: string;
        authorName: string;
        isAnonymous: boolean;
        content: string;
        category: string;
        createdAt: string;
        likesCount: number;
        commentsCount: number;
      }
    >("communityCreatePost", input),
  communityListPosts: (input: {category?: string; limit?: number} = {}) =>
    callFunction<
      {category?: string; limit?: number},
      {
        id: string;
        authorId: string;
        authorName: string;
        isAnonymous: boolean;
        category: string;
        content: string;
        createdAt: string;
        likesCount: number;
        commentsCount: number;
      }[]
    >("communityListPosts", input),
  communityToggleLike: (input: {postId: string}) =>
    callFunction<{postId: string}, {liked: boolean; likesCount: number}>(
      "communityToggleLike",
      input
    ),
  communityAddComment: (
    input: {postId: string; content: string; isAnonymous?: boolean}
  ) =>
    callFunction<
      {postId: string; content: string; isAnonymous?: boolean},
      {id: string; content: string; createdAt: string; likesCount: number}
    >("communityAddComment", input),
  communityCreateReport: (
    input: {
      targetType: "post" | "comment" | "user";
      targetId: string;
      reason: string;
      details?: string;
    }
  ) =>
    callFunction<
      {
        targetType: "post" | "comment" | "user";
        targetId: string;
        reason: string;
        details?: string;
      },
      void
    >("communityCreateReport", input),

  /* User-facing */
  userSaveMood: (input: {label: string; emoji: string; note?: string}) =>
    callFunction<{label: string; emoji: string; note?: string}, MoodRecord>(
      "userSaveMood",
      input
    ),
  userGetMoodHistory: (input: {limit?: number} = {}) =>
    callFunction<{limit?: number}, MoodRecord[]>(
      "userGetMoodHistory",
      input
    ),
  userToggleSavedItem: (
    input: {
      kind: "affirmation" | "audio" | "article";
      refId: string;
      title: string;
      category?: string;
      gradient?: string;
    }
  ) =>
    callFunction<
      {
        kind: "affirmation" | "audio" | "article";
        refId: string;
        title: string;
        category?: string;
        gradient?: string;
      },
      {saved: boolean; itemId: string}
    >("userToggleSavedItem", input),
  userGetSavedItems: (
    input: {
      kind?: "affirmation" | "audio" | "article";
      limit?: number;
    } = {}
  ) =>
    callFunction<
      {kind?: "affirmation" | "audio" | "article"; limit?: number},
      SavedItemRecord[]
    >("userGetSavedItems", input),
  userGetDailyAffirmation: () =>
    callFunction<
      Record<string, unknown>,
      {id: string; text: string; category: string; author: string; date: string}
    >("userGetDailyAffirmation", {}),
} as const;
