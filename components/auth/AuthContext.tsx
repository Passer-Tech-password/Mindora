"use client";

import * as React from "react";
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignInWithGoogle,
  firebaseSignOut,
  firebaseSendPasswordReset,
  firebaseUpdateDisplayName,
  getFirebase,
  isEmailPasswordSignInAvailable,
  subscribeToAuthState,
} from "@/lib/firebase";
import {
  callables,
  type MoodRecord,
  type SavedItemRecord as FunctionsSavedItemRecord,
  type UserSettings,
} from "@/lib/firebase/functions";

export type { UserSettings };

export type SavedItemRecord = FunctionsSavedItemRecord;

export type UserRole = "user" | "admin";

export interface MindoraUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  plan: "free" | "premium";
  createdAt: string;
  stats: {
    currentStreak: number;
    longestStreak: number;
    savedItems: number;
    communityPosts: number;
    level: number;
    wellnessProgress: number;
  };
}

export interface CommunityReport {
  id: string;
  type: "Post" | "Comment";
  content: string;
  reportedBy: string;
  date: string;
  status: "Pending" | "Reviewed" | "Resolved";
}

export interface AffirmationItem {
  id: string;
  text: string;
  category: string;
  createdAt: string;
  author: string;
}

export interface AudioItem {
  id: string;
  title: string;
  category: string;
  durationSec: number;
  sizeKb: number;
  published: boolean;
  createdAt: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  days: number;
  participants: number;
  status: "Active" | "Draft" | "Archived";
}

export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  premiumSubscribers: number;
  userGrowth: number;
  postGrowth: number;
  commentGrowth: number;
  premiumGrowth: number;
  usersGrowthLast30D: number[];
  contentDistribution: { label: string; percent: number; color: string }[];
  topTopics: { label: string; posts: number; growth: number; color: string; tone?: string }[];
  recentUsers: Omit<MindoraUser, "stats">[];
  reports: CommunityReport[];
  recentActivity: {
    id: string;
    icon: "user" | "post" | "subscription" | "report" | "comment";
    title: string;
    detail: string;
    time: string;
    tone: "purple" | "blue" | "gold" | "red" | "indigo";
  }[];
  systemHealth: { name: string; status: "Online" | "Healthy" | "Active"; tone: string }[];
  affirmations: AffirmationItem[];
  audios: AudioItem[];
  challenges: ChallengeItem[];
  subscriptions: {
    total: number;
    monthly: number;
    yearly: number;
    trials: number;
    churn: number;
    mrr: number;
  };
}

export interface CommunityPostRecord {
  id: string;
  authorId: string;
  authorName: string;
  isAnonymous: boolean;
  category: string;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
}

export interface DailyAffirmation {
  id: string;
  text: string;
  category: string;
  author: string;
  date: string;
}

interface AuthContextValue {
  user: MindoraUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<MindoraUser>;
  loginWithGoogle: () => Promise<MindoraUser>;
  sendPasswordReset: (email: string) => Promise<void>;
  signup: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<MindoraUser>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<MindoraUser>) => void;
  updateDisplayName: (name: string) => Promise<void>;

  // Account settings
  getSettings: () => Promise<UserSettings>;
  updateSettings: (settings: UserSettings) => Promise<UserSettings>;
  deleteAccount: () => Promise<void>;

  // Admin-only data APIs
  getAdminStats: () => Promise<AdminStats>;
  listUsers: () => Promise<MindoraUser[]>;
  deleteUser: (userId: string) => Promise<void>;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;

  // Content CRUD
  addAffirmation: (data: { text: string; category: string }) => Promise<AffirmationItem>;
  deleteAffirmation: (id: string) => Promise<void>;
  listAffirmations: () => Promise<AffirmationItem[]>;

  uploadAudio: (data: { title: string; category: string; durationSec?: number; sizeKb?: number; fileName?: string }) => Promise<AudioItem>;
  deleteAudio: (id: string) => Promise<void>;
  listAudios: () => Promise<AudioItem[]>;

  createChallenge: (data: { title: string; days: number }) => Promise<ChallengeItem>;
  listChallenges: () => Promise<ChallengeItem[]>;

  reviewReport: (reportId: string, status: CommunityReport["status"]) => Promise<void>;

  // User-facing wellness APIs
  getDailyAffirmation: () => Promise<DailyAffirmation>;
  saveMoodCheckIn: (data: { label: string; emoji: string; note?: string }) => Promise<MoodRecord>;
  getMoodHistory: (opts?: { limit?: number }) => Promise<MoodRecord[]>;

  toggleSavedItem: (data: {
    kind: "affirmation" | "audio" | "article";
    refId: string;
    title: string;
    category?: string;
    gradient?: string;
  }) => Promise<{ saved: boolean; itemId: string }>;
  getSavedItems: (opts?: { kind?: "affirmation" | "audio" | "article"; limit?: number }) => Promise<SavedItemRecord[]>;

  // Community APIs
  createCommunityPost: (input: { content: string; category: string; isAnonymous?: boolean }) => Promise<CommunityPostRecord>;
  listCommunityPosts: (opts?: { category?: string; limit?: number }) => Promise<CommunityPostRecord[]>;
  likePost: (postId: string) => Promise<{ liked: boolean; likesCount: number }>;
  addComment: (input: { postId: string; content: string; isAnonymous?: boolean }) => Promise<{ id: string; content: string; createdAt: string; likesCount: number }>;
  submitReport: (input: { targetType: "post" | "comment" | "user"; targetId: string; reason: string; details?: string }) => Promise<void>;
}

/* ------------------------------ Admin emails ------------------------------ */

const DEFAULT_ADMIN_EMAILS: string[] = [
  "admin@mindora.app",
  "super@mindora.app",
  "mindoraapp698@gmail.com",
];

const ENV_ADMIN_EMAILS: string[] = (() => {
  const list: string[] = [...DEFAULT_ADMIN_EMAILS];
  const envAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (envAdmin && envAdmin.length > 0 && !list.includes(envAdmin)) {
    list.push(envAdmin);
  }
  return list;
})();

const ADMIN_EMAILS: readonly string[] = ENV_ADMIN_EMAILS;

export function getAdminEmails(): readonly string[] {
  return ADMIN_EMAILS;
}

export interface FirebaseConnectionStatus {
  configured: boolean;
  projectId: string | undefined;
}

export function getFirebaseConnectionStatus(): FirebaseConnectionStatus {
  const { configured, config } = getFirebase();
  return { configured, projectId: config.projectId };
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

/* ------------------------------- Helpers --------------------------------- */

const EMPTY_STATS: MindoraUser["stats"] = {
  currentStreak: 0,
  longestStreak: 0,
  savedItems: 0,
  communityPosts: 0,
  level: 0,
  wellnessProgress: 0,
};

const EMPTY_ADMIN_STATS: AdminStats = {
  totalUsers: 0,
  totalPosts: 0,
  totalComments: 0,
  premiumSubscribers: 0,
  userGrowth: 0,
  postGrowth: 0,
  commentGrowth: 0,
  premiumGrowth: 0,
  usersGrowthLast30D: [],
  contentDistribution: [],
  topTopics: [],
  recentUsers: [],
  reports: [],
  recentActivity: [],
  systemHealth: [],
  affirmations: [],
  audios: [],
  challenges: [],
  subscriptions: { total: 0, monthly: 0, yearly: 0, trials: 0, churn: 0, mrr: 0 },
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function splitDisplayName(displayName: string, email: string): {
  firstName: string;
  lastName: string;
} {
  const fromDisplay = displayName.trim().replace(/\s+/g, " ");
  if (fromDisplay) {
    const [first, ...rest] = fromDisplay.split(" ");
    return { firstName: titleCase(first), lastName: rest.map(titleCase).join(" ") };
  }
  const localPart = email.split("@")[0] ?? "";
  const cleaned = localPart.replace(/[^a-zA-Z]+/g, " ").trim();
  if (cleaned) {
    const [first, ...rest] = cleaned.split(" ");
    return { firstName: titleCase(first), lastName: rest.map(titleCase).join(" ") };
  }
  return { firstName: "Friend", lastName: "" };
}

function friendlyAuthError(err: unknown, mode: "login" | "signup"): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code?: unknown }).code ?? "")
      : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/weak-password":
      return "Please choose a stronger password (at least 8 characters).";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled. Please try again.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Please allow popups and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    case "auth/operation-not-allowed":
      return "This sign-in method isn't enabled yet. Please use email and password.";
    default:
      return mode === "signup"
        ? "Unable to create your account right now. Please try again."
        : "Unable to log in right now. Please try again.";
  }
}

type FirebaseUserLike = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  metadata: { creationTime?: string };
};

function deriveMindoraUserFromFirebase(input: {
  fbUser: FirebaseUserLike;
  fallbackEmail: string;
  overrides?: Partial<MindoraUser>;
}): MindoraUser {
  const { fbUser, fallbackEmail, overrides } = input;
  const email = (fbUser.email ?? fallbackEmail).trim();
  const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
  const { firstName, lastName } = splitDisplayName(fbUser.displayName ?? "", email);
  const fullName = `${firstName} ${lastName}`.trim();
  const role: UserRole = overrides?.role ?? (isAdmin ? "admin" : "user");
  return {
    id: fbUser.uid,
    firstName,
    lastName,
    fullName,
    email,
    role,
    avatar: fbUser.photoURL ?? undefined,
    plan: role === "admin" ? "premium" : "free",
    createdAt: fbUser.metadata?.creationTime ?? new Date().toISOString(),
    stats: { ...EMPTY_STATS },
    ...overrides,
  };
}

/* ================================================================= */
/*                          Provider                                   */
/* ================================================================= */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<MindoraUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const normalise = React.useCallback((u: MindoraUser | null): MindoraUser | null => {
    if (!u) return null;
    const email = String(u.email ?? "").toLowerCase();
    const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : (u.role ?? "user");
    return {
      ...u,
      role,
      plan: role === "admin" ? "premium" : (u.plan ?? "free"),
    };
  }, []);

  /* Keep the session in sync with Firebase Auth. */
  React.useEffect(() => {
    let active = true;

    if (!isEmailPasswordSignInAvailable()) {
      setIsLoading(false);
      return () => {
        active = false;
      };
    }

    const unsubscribe = subscribeToAuthState((fbUser) => {
      if (!active) return;
      if (!fbUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      setUser(
        normalise(
          deriveMindoraUserFromFirebase({
            fbUser,
            fallbackEmail: fbUser.email ?? "",
          })
        )
      );
      setIsLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [normalise]);

  const login = React.useCallback(
    async (email: string, password: string): Promise<MindoraUser> => {
      setError(null);
      if (!isValidEmail(email)) {
        const message = "Please enter a valid email address.";
        setError(message);
        throw new Error(message);
      }
      if (!password || password.length < 8) {
        const message = "Password must be at least 8 characters.";
        setError(message);
        throw new Error(message);
      }

      let fbUser: FirebaseUserLike | null = null;
      try {
        fbUser = await firebaseSignIn(email, password);
      } catch (err) {
        const message = friendlyAuthError(err, "login");
        setError(message);
        throw new Error(message);
      }

      if (!fbUser) {
        const message = "Sign-in is not available right now. Please try again later.";
        setError(message);
        throw new Error(message);
      }

      const profile = normalise(
        deriveMindoraUserFromFirebase({ fbUser, fallbackEmail: email })
      ) as MindoraUser;
      setUser(profile);
      return profile;
    },
    [normalise]
  );

  const loginWithGoogle = React.useCallback(async (): Promise<MindoraUser> => {
    setError(null);
    let fbUser: FirebaseUserLike | null = null;
    try {
      fbUser = await firebaseSignInWithGoogle();
    } catch (err) {
      const message = friendlyAuthError(err, "login");
      setError(message);
      throw new Error(message);
    }
    if (!fbUser) {
      const message = "Google sign-in is not available right now. Please try again later.";
      setError(message);
      throw new Error(message);
    }
    const profile = normalise(
      deriveMindoraUserFromFirebase({
        fbUser,
        fallbackEmail: fbUser.email ?? "",
      })
    ) as MindoraUser;
    setUser(profile);
    return profile;
  }, [normalise]);

  const sendPasswordReset = React.useCallback(async (email: string) => {
    setError(null);
    if (!isValidEmail(email)) {
      const message = "Please enter a valid email address.";
      setError(message);
      throw new Error(message);
    }
    await firebaseSendPasswordReset(email.trim());
  }, []);

  const signup = React.useCallback(
    async (input: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }): Promise<MindoraUser> => {
      setError(null);
      if (!input.firstName.trim() || !input.lastName.trim()) {
        const message = "Please enter your first and last name.";
        setError(message);
        throw new Error(message);
      }
      if (!isValidEmail(input.email)) {
        const message = "Please enter a valid email address.";
        setError(message);
        throw new Error(message);
      }
      if (!input.password || input.password.length < 8) {
        const message = "Password must be at least 8 characters.";
        setError(message);
        throw new Error(message);
      }

      let fbUser: FirebaseUserLike | null = null;
      try {
        fbUser = await firebaseSignUp(input.email, input.password);
      } catch (err) {
        const message = friendlyAuthError(err, "signup");
        setError(message);
        throw new Error(message);
      }

      if (!fbUser) {
        const message =
          "Account creation is not available right now. Please try again later.";
        setError(message);
        throw new Error(message);
      }

      const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim();
      try {
        await firebaseUpdateDisplayName(fullName);
      } catch {
        /* the account is created; display name can be set later */
      }

      const normalisedEmail = input.email.toLowerCase();
      const profile = normalise(
        deriveMindoraUserFromFirebase({
          fbUser,
          fallbackEmail: input.email,
          overrides: {
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
            fullName,
            email: input.email,
            role: ADMIN_EMAILS.includes(normalisedEmail) ? "admin" : "user",
          },
        })
      ) as MindoraUser;
      setUser(profile);
      return profile;
    },
    [normalise]
  );

  const logout = React.useCallback(async () => {
    await firebaseSignOut();
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = React.useCallback((patch: Partial<MindoraUser>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const updateDisplayName = React.useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (trimmed.length < 2) {
        throw new Error("Please enter your name (at least 2 characters).");
      }
      await firebaseUpdateDisplayName(trimmed);
      const { firstName, lastName } = splitDisplayName(
        trimmed,
        user?.email ?? ""
      );
      setUser((prev) =>
        prev ? { ...prev, firstName, lastName, fullName: trimmed } : prev
      );
    },
    [user?.email]
  );

  const getSettings = React.useCallback(async (): Promise<UserSettings> => {
    const result = await callables.userGetSettings();
    if (result.status === "ok" && result.data) return result.data;
    throw new Error(result.error ?? "Unable to load your settings right now.");
  }, []);

  const updateSettings = React.useCallback(
    async (settings: UserSettings): Promise<UserSettings> => {
      const result = await callables.userUpdateSettings({ settings });
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to save your settings right now.");
    },
    []
  );

  const deleteAccount = React.useCallback(async () => {
    const result = await callables.userDeleteAccount();
    if (result.status !== "ok") {
      throw new Error(result.error ?? "Unable to delete your account right now.");
    }
    await firebaseSignOut();
    setUser(null);
  }, []);

  /* ---------------- Admin data ------------------ */

  const getAdminStats = React.useCallback(async (): Promise<AdminStats> => {
    const result = await callables.adminGetStats();
    if (result.status === "ok" && result.data) {
      return result.data;
    }
    return EMPTY_ADMIN_STATS;
  }, []);

  const listUsers = React.useCallback(async (): Promise<MindoraUser[]> => {
    const result = await callables.adminListUsers({ limit: 100 });
    if (result.status === "ok" && result.data) {
      return result.data.map<MindoraUser>((u) => ({ ...u, stats: { ...EMPTY_STATS } }));
    }
    return [];
  }, []);

  const deleteUser = React.useCallback(async (userId: string) => {
    const result = await callables.adminDeleteUser({ userId });
    if (result.status === "ok") return;
    throw new Error(result.error ?? "Unable to delete this user right now.");
  }, []);

  const updateUserRole = React.useCallback(async (userId: string, role: UserRole) => {
    const result = await callables.adminUpdateUserRole({ userId, role });
    if (result.status === "ok") return;
    throw new Error(result.error ?? "Unable to update this user's role right now.");
  }, []);

  /* --------------- Content CRUD ------------------ */

  const addAffirmation = React.useCallback(async (data: { text: string; category: string }) => {
    const result = await callables.contentAddAffirmation(data);
    if (result.status === "ok" && result.data) return result.data;
    throw new Error(result.error ?? "Unable to add this affirmation right now.");
  }, []);

  const deleteAffirmation = React.useCallback(async (id: string) => {
    const result = await callables.contentDeleteAffirmation({ id });
    if (result.status === "ok") return;
    throw new Error(result.error ?? "Unable to delete this affirmation right now.");
  }, []);

  const listAffirmations = React.useCallback(async () => {
    const result = await callables.contentListAffirmations({ limit: 100 });
    if (result.status === "ok" && result.data) return result.data;
    return [];
  }, []);

  const uploadAudio = React.useCallback(
    async (data: {
      title: string;
      category: string;
      durationSec?: number;
      sizeKb?: number;
      fileName?: string;
    }) => {
      const result = await callables.contentUploadAudio({
        title: data.title || data.fileName || "Untitled",
        category: data.category,
        durationSec: data.durationSec,
        sizeKb: data.sizeKb,
      });
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to upload this audio right now.");
    },
    []
  );

  const deleteAudio = React.useCallback(async (id: string) => {
    const result = await callables.contentDeleteAudio({ id });
    if (result.status === "ok") return;
    throw new Error(result.error ?? "Unable to delete this audio right now.");
  }, []);

  const listAudios = React.useCallback(async () => {
    const result = await callables.contentListAudios({ limit: 100 });
    if (result.status === "ok" && result.data) return result.data;
    return [];
  }, []);

  const createChallenge = React.useCallback(async (data: { title: string; days: number }) => {
    const result = await callables.contentCreateChallenge(data);
    if (result.status === "ok" && result.data) return result.data;
    throw new Error(result.error ?? "Unable to create this challenge right now.");
  }, []);

  const listChallenges = React.useCallback(async () => {
    const result = await callables.contentListChallenges();
    if (result.status === "ok" && result.data) return result.data;
    return [];
  }, []);

  const reviewReport = React.useCallback(
    async (reportId: string, status: CommunityReport["status"]) => {
      const result = await callables.adminReviewReport({ reportId, status });
      if (result.status === "ok") return;
      throw new Error(result.error ?? "Unable to update this report right now.");
    },
    []
  );

  /* ---------------- User-facing wellness APIs ---------------- */

  const getDailyAffirmation = React.useCallback(async (): Promise<DailyAffirmation> => {
    const result = await callables.userGetDailyAffirmation();
    if (result.status === "ok" && result.data) return result.data;
    throw new Error(result.error ?? "Today's affirmation isn't available right now.");
  }, []);

  const saveMoodCheckIn = React.useCallback(
    async (data: { label: string; emoji: string; note?: string }): Promise<MoodRecord> => {
      const result = await callables.userSaveMood(data);
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to save your check-in right now.");
    },
    []
  );

  const getMoodHistory = React.useCallback(
    async (opts?: { limit?: number }): Promise<MoodRecord[]> => {
      const result = await callables.userGetMoodHistory({ limit: opts?.limit ?? 60 });
      if (result.status === "ok" && result.data) return result.data;
      return [];
    },
    []
  );

  const toggleSavedItem = React.useCallback(
    async (data: {
      kind: "affirmation" | "audio" | "article";
      refId: string;
      title: string;
      category?: string;
      gradient?: string;
    }): Promise<{ saved: boolean; itemId: string }> => {
      const result = await callables.userToggleSavedItem(data);
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to update your saved items right now.");
    },
    []
  );

  const getSavedItems = React.useCallback(
    async (opts?: {
      kind?: "affirmation" | "audio" | "article";
      limit?: number;
    }): Promise<SavedItemRecord[]> => {
      const result = await callables.userGetSavedItems({
        kind: opts?.kind,
        limit: opts?.limit ?? 100,
      });
      if (result.status === "ok" && result.data) return result.data;
      return [];
    },
    []
  );

  /* ---------------- Community APIs ---------------- */

  const createCommunityPost = React.useCallback(
    async (input: {
      content: string;
      category: string;
      isAnonymous?: boolean;
    }): Promise<CommunityPostRecord> => {
      const result = await callables.communityCreatePost(input);
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to publish your post right now.");
    },
    []
  );

  const listCommunityPosts = React.useCallback(
    async (opts?: { category?: string; limit?: number }): Promise<CommunityPostRecord[]> => {
      const result = await callables.communityListPosts({
        category: opts?.category,
        limit: opts?.limit ?? 20,
      });
      if (result.status === "ok" && result.data) return result.data;
      return [];
    },
    []
  );

  const likePost = React.useCallback(
    async (postId: string): Promise<{ liked: boolean; likesCount: number }> => {
      const result = await callables.communityToggleLike({ postId });
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to update this post right now.");
    },
    []
  );

  const addComment = React.useCallback(
    async (input: {
      postId: string;
      content: string;
      isAnonymous?: boolean;
    }): Promise<{ id: string; content: string; createdAt: string; likesCount: number }> => {
      const result = await callables.communityAddComment(input);
      if (result.status === "ok" && result.data) return result.data;
      throw new Error(result.error ?? "Unable to post your comment right now.");
    },
    []
  );

  const submitReport = React.useCallback(
    async (input: {
      targetType: "post" | "comment" | "user";
      targetId: string;
      reason: string;
      details?: string;
    }): Promise<void> => {
      const result = await callables.communityCreateReport(input);
      if (result.status === "ok") return;
      throw new Error(result.error ?? "Unable to submit your report right now.");
    },
    []
  );

  const value: AuthContextValue = {
    user,
    isLoading,
    error,
    login,
    loginWithGoogle,
    sendPasswordReset,
    signup,
    logout,
    updateProfile,
    updateDisplayName,
    getSettings,
    updateSettings,
    deleteAccount,
    getAdminStats,
    listUsers,
    deleteUser,
    updateUserRole,
    addAffirmation,
    deleteAffirmation,
    listAffirmations,
    uploadAudio,
    deleteAudio,
    listAudios,
    createChallenge,
    listChallenges,
    reviewReport,
    getDailyAffirmation,
    saveMoodCheckIn,
    getMoodHistory,
    toggleSavedItem,
    getSavedItems,
    createCommunityPost,
    listCommunityPosts,
    likePost,
    addComment,
    submitReport,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth must be used within an <AuthProvider>. Add AuthProvider to your layout tree."
    );
  }
  return ctx;
}
