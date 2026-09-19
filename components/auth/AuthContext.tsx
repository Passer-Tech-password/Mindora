"use client";

import * as React from "react";
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  getFirebase,
} from "@/lib/firebase";

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

interface AuthContextValue {
  user: MindoraUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<MindoraUser>;
  signup: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<MindoraUser>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<MindoraUser>) => void;

  // Admin-only data APIs (mock, client-side)
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
}

const STORAGE_KEY = "mindora.auth.user.v1";
const ADMIN_USERS_KEY = "mindora.admin.users.v1";
const ADMIN_AFFIRMATIONS_KEY = "mindora.admin.affirmations.v1";
const ADMIN_AUDIOS_KEY = "mindora.admin.audios.v1";
const ADMIN_CHALLENGES_KEY = "mindora.admin.challenges.v1";

const ENV_ADMIN_EMAILS: string[] = (() => {
  const list: string[] = ["admin@mindora.app", "super@mindora.app"];
  const envAdmin = (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (envAdmin && envAdmin.length > 0 && !list.includes(envAdmin)) {
    list.push(envAdmin);
  }
  return list;
})();

const ADMIN_EMAILS: readonly string[] = ENV_ADMIN_EMAILS;
const TARGET_ADMIN_EMAIL = "mindoraapp698@gmail.com";
const TARGET_ADMIN_PASSWORD = "Mindora@2026";

if (!ADMIN_EMAILS.includes(TARGET_ADMIN_EMAIL)) {
  (ADMIN_EMAILS as string[]).push(TARGET_ADMIN_EMAIL);
}

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

const DEFAULT_STATS: MindoraUser["stats"] = {
  currentStreak: 7,
  longestStreak: 14,
  savedItems: 12,
  communityPosts: 3,
  level: 1,
  wellnessProgress: 32,
};

function defaultAvatarUrl(name: string) {
  const prompt = encodeURIComponent(
    `professional headshot portrait of ${name}, warm friendly smile, mindfulness coach aesthetic, soft studio lighting, clean background`
  );
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=square`;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now()
    .toString(36)
    .slice(-4)}`;
}

/* -------------------- Mock dataset generators -------------------- */
const SEED_USERS_COUNT = 12_482;

function seedRecentUsers() {
  const raw = [
    { name: "Sarah Johnson", email: "sarah@example.com", ago: "2 hours ago", status: "Active" },
    { name: "Michael Brown", email: "michael@example.com", ago: "4 hours ago", status: "Active" },
    { name: "Emily Davis", email: "emily@example.com", ago: "6 hours ago", status: "Active" },
    { name: "James Wilson", email: "james@example.com", ago: "8 hours ago", status: "Active" },
    { name: "Olivia Martinez", email: "olivia@example.com", ago: "10 hours ago", status: "Active" },
  ];
  return raw.map<Omit<MindoraUser, "stats">>((u) => {
    const [f, l] = u.name.split(" ");
    return {
      id: uid("usr"),
      firstName: f,
      lastName: l,
      fullName: u.name,
      email: u.email,
      role: "user",
      plan: ["Sarah Johnson", "Olivia Martinez"].includes(u.name) ? "premium" : "free",
      avatar: defaultAvatarUrl(u.name),
      createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 10).toISOString(),
    };
  });
}

function seedUserGrowth30D() {
  const points = [1100, 1400, 1500, 1800, 1900, 2100, 2400, 2600, 2800, 3100, 3300, 3400, 3700, 3900, 4200, 4500, 4800, 5100, 5400, 5700, 5900, 6200, 6500, 6700, 6900, 7100, 7350, 7500, 7700, 7842];
  return points;
}

const CONTENT_DISTRIBUTION: AdminStats["contentDistribution"] = [
  { label: "Daily Wins", percent: 28, color: "#5B3FA8" },
  { label: "Mental Health", percent: 22, color: "#F37474" },
  { label: "Self Love", percent: 18, color: "#F59AB0" },
  { label: "Anxiety Support", percent: 12, color: "#7A79EC" },
  { label: "Motivation", percent: 11, color: "#F8B460" },
  { label: "Gratitude", percent: 9, color: "#B892F6" },
];

const TOP_TOPICS: AdminStats["topTopics"] = [
  { label: "Self Love", posts: 892, growth: 24, color: "#FCE7F3", tone: "#F472B6" },
  { label: "Mental Health", posts: 764, growth: 18, color: "#EDE9FE", tone: "#8B5CF6" },
  { label: "Motivation", posts: 632, growth: 15, color: "#FFEDD5", tone: "#F59E0B" },
  { label: "Anxiety Support", posts: 521, growth: 12, color: "#DBEAFE", tone: "#3B82F6" },
  { label: "Gratitude", posts: 438, growth: 10, color: "#D1FAE5", tone: "#10B981" },
];

const RECENT_ACTIVITY_SEED: AdminStats["recentActivity"] = [
  { id: "a1", icon: "user", title: "New user registered", detail: "john.doe@example.com", time: "2 minutes ago", tone: "purple" },
  { id: "a2", icon: "post", title: "New community post", detail: "\"Today I chose myself…\"", time: "5 minutes ago", tone: "blue" },
  { id: "a3", icon: "subscription", title: "New premium subscription", detail: "sarah.johnson@example.com", time: "12 minutes ago", tone: "gold" },
  { id: "a4", icon: "report", title: "Report submitted", detail: "Post #4587 - Inappropriate content", time: "18 minutes ago", tone: "red" },
  { id: "a5", icon: "comment", title: "New comment", detail: "On post #4521", time: "22 minutes ago", tone: "indigo" },
];

const SYSTEM_HEALTH_SEED: AdminStats["systemHealth"] = [
  { name: "Firebase Connection", status: "Online", tone: "#10B981" },
  { name: "Authentication", status: "Healthy", tone: "#10B981" },
  { name: "Firestore Database", status: "Healthy", tone: "#10B981" },
  { name: "Storage", status: "Healthy", tone: "#10B981" },
  { name: "Analytics", status: "Active", tone: "#10B981" },
];

const SEED_REPORTS: CommunityReport[] = [
  {
    id: "rep_1",
    type: "Post",
    content: "This is not helpful...",
    reportedBy: "Anonymous",
    date: "Aug 30, 2026 10:24 AM",
    status: "Pending",
  },
  {
    id: "rep_2",
    type: "Comment",
    content: "Inappropriate language...",
    reportedBy: "Anonymous",
    date: "Aug 30, 2026 09:12 AM",
    status: "Pending",
  },
  {
    id: "rep_3",
    type: "Post",
    content: "Off-topic content",
    reportedBy: "Anonymous",
    date: "Aug 30, 2026 08:45 AM",
    status: "Pending",
  },
];

/* -------------------- Helpers for localstorage state -------------------- */

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  metadata: { creationTime?: string };
};

function deriveMindoraUserFromFirebase(input: {
  fbUser: User;
  fallbackEmail: string;
  overrides?: Partial<MindoraUser>;
}): MindoraUser {
  const { fbUser, fallbackEmail, overrides } = input;
  const email = (fbUser.email ?? fallbackEmail).trim();
  const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
  const nameParts = (fbUser.displayName ?? "").trim();
  const [firstRaw, lastRaw] = nameParts
    ? nameParts.split(/\s+/)
    : (() => {
        const [firstPart] = email.split("@");
        const clean = firstPart.replace(/[^a-zA-Z]/g, " ").trim();
        return clean.split(/\s+/);
      })();
  const firstName = firstRaw
    ? firstRaw.charAt(0).toUpperCase() + firstRaw.slice(1).toLowerCase()
    : "Sarah";
  const lastName = lastRaw
    ? lastRaw.charAt(0).toUpperCase() + lastRaw.slice(1).toLowerCase()
    : "Johnson";
  const fullName = `${firstName} ${lastName}`.trim();
  const role: UserRole = overrides?.role ?? (isAdmin ? "admin" : "user");
  return {
    id: fbUser.uid || uid("usr"),
    firstName,
    lastName,
    fullName,
    email,
    role,
    avatar: fbUser.photoURL || defaultAvatarUrl(fullName),
    plan: role === "admin" ? "premium" : "free",
    createdAt: fbUser.metadata?.creationTime ?? new Date().toISOString(),
    stats: {
      ...DEFAULT_STATS,
      ...(role === "admin"
        ? { currentStreak: 30, level: 99, wellnessProgress: 100 }
        : {}),
    },
    ...overrides,
  };
}

function defaultAdmin(overrideEmail?: string): MindoraUser {
  const name = "Admin";
  const email = overrideEmail ?? "admin@mindora.app";
  return {
    id: "usr_admin",
    firstName: "Admin",
    lastName: "Mindora",
    fullName: "Admin Mindora",
    email,
    role: "admin",
    plan: "premium",
    avatar: defaultAvatarUrl(name),
    createdAt: new Date().toISOString(),
    stats: { ...DEFAULT_STATS, currentStreak: 30, level: 99, wellnessProgress: 100 },
  };
}

function isTargetAdminCredentials(email: string, password: string): boolean {
  return (
    email.toLowerCase() === TARGET_ADMIN_EMAIL.toLowerCase() &&
    password === TARGET_ADMIN_PASSWORD
  );
}

/* ================================================================= */
/*                          Provider                                   */
/* ================================================================= */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<MindoraUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const seeded = React.useRef(false);
  const ensureSeeds = React.useCallback(() => {
    if (seeded.current || typeof window === "undefined") return;
    seeded.current = true;

    const seedIfEmpty = <T,>(key: string, fallback: T) => {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, JSON.stringify(fallback));
      }
    };

    const affirmationsSeed: AffirmationItem[] = [
      { id: "aff_1", text: "You are doing better than you think.", category: "Self Love", createdAt: new Date().toISOString(), author: "Admin" },
      { id: "aff_2", text: "Small steps every day create big change.", category: "Motivation", createdAt: new Date().toISOString(), author: "Admin" },
      { id: "aff_3", text: "You deserve rest and peace.", category: "Anxiety Support", createdAt: new Date().toISOString(), author: "Admin" },
    ];
    seedIfEmpty(ADMIN_AFFIRMATIONS_KEY, affirmationsSeed);

    const audiosSeed: AudioItem[] = [
      { id: "aud_1", title: "Rain Sounds", category: "Sleep", durationSec: 600, sizeKb: 12400, published: true, createdAt: new Date().toISOString() },
      { id: "aud_2", title: "Forest Walk", category: "Nature", durationSec: 420, sizeKb: 8600, published: true, createdAt: new Date().toISOString() },
      { id: "aud_3", title: "Breathing Exercise", category: "Guided", durationSec: 300, sizeKb: 5200, published: true, createdAt: new Date().toISOString() },
    ];
    seedIfEmpty(ADMIN_AUDIOS_KEY, audiosSeed);

    const challengesSeed: ChallengeItem[] = [
      { id: "ch_1", title: "7-Day Positivity Challenge", days: 7, participants: 320, status: "Active" },
      { id: "ch_2", title: "30 Days of Gratitude", days: 30, participants: 1180, status: "Active" },
    ];
    seedIfEmpty(ADMIN_CHALLENGES_KEY, challengesSeed);

    const usersSeed = seedRecentUsers();
    seedIfEmpty(ADMIN_USERS_KEY, usersSeed);
  }, []);

  React.useEffect(() => {
    try {
      ensureSeeds();
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as MindoraUser;
        if (parsed && parsed.email) {
          const resolved: MindoraUser = {
            ...parsed,
            role: (parsed.role as MindoraUser["role"]) || "user",
          };
          setUser(resolved);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, [ensureSeeds]);

  const persist = React.useCallback((u: MindoraUser | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = React.useCallback(
    async (email: string, password: string): Promise<MindoraUser> => {
      setError(null);
      try {
        ensureSeeds();
        if (!isValidEmail(email)) {
          throw new Error("Please enter a valid email address.");
        }
        if (!password || password.length < 8) {
          throw new Error("Password must be at least 8 characters.");
        }
        await delay(300);

        const normalisedEmail = email.toLowerCase();

        try {
          const fbUser = await firebaseSignIn(email, password);
          if (fbUser) {
            const fbEmail = (fbUser.email ?? email).toLowerCase();
            const role: UserRole = ADMIN_EMAILS.includes(fbEmail) ? "admin" : "user";
            const profile = deriveMindoraUserFromFirebase({
              fbUser,
              fallbackEmail: email,
              overrides: { role },
            });
            persist(profile);
            return profile;
          }
        } catch {
          /* Firebase unavailable — fall through to local mock auth */
        }

        if (isTargetAdminCredentials(email, password)) {
          const admin = defaultAdmin(normalisedEmail);
          persist(admin);
          return admin;
        }

        if (ADMIN_EMAILS.includes(normalisedEmail)) {
          const admin = defaultAdmin(normalisedEmail);
          persist(admin);
          return admin;
        }

        const existingRaw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
        let existingUser: MindoraUser | null = null;
        if (existingRaw) {
          try {
            existingUser = JSON.parse(existingRaw) as MindoraUser;
          } catch {
            existingUser = null;
          }
        }
        if (existingUser && existingUser.email.toLowerCase() === normalisedEmail) {
          persist(existingUser);
          return existingUser;
        }

        const [firstPart] = email.split("@");
        const clean = firstPart.replace(/[^a-zA-Z]/g, " ");
        const parts = clean.trim().split(/\s+/);
        const firstName =
          parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase() : "Sarah";
        const lastName =
          parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase() : "Johnson";
        const fullName = `${firstName} ${lastName}`.trim();
        const created: MindoraUser = {
          id: uid("usr"),
          firstName,
          lastName,
          fullName,
          email,
          role: "user",
          avatar: defaultAvatarUrl(fullName),
          plan: "free",
          createdAt: new Date().toISOString(),
          stats: { ...DEFAULT_STATS },
        };
        persist(created);
        return created;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to log in right now.";
        setError(message);
        throw err;
      }
    },
    [persist, ensureSeeds]
  );

  const signup = React.useCallback(
    async (input: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }): Promise<MindoraUser> => {
      setError(null);
      try {
        ensureSeeds();
        if (!input.firstName.trim() || !input.lastName.trim()) {
          throw new Error("Please enter your first and last name.");
        }
        if (!isValidEmail(input.email)) {
          throw new Error("Please enter a valid email address.");
        }
        if (!input.password || input.password.length < 8) {
          throw new Error("Password must be at least 8 characters.");
        }
        await delay(300);

        try {
          const fbUser = await firebaseSignUp(input.email, input.password);
          if (fbUser) {
            const normalisedEmail = (fbUser.email ?? input.email).toLowerCase();
            const role: UserRole = ADMIN_EMAILS.includes(normalisedEmail) ? "admin" : "user";
            const profile: MindoraUser = deriveMindoraUserFromFirebase({
              fbUser,
              fallbackEmail: input.email,
              overrides: {
                firstName: input.firstName,
                lastName: input.lastName,
                fullName: `${input.firstName} ${input.lastName}`.trim(),
                email: input.email,
                role,
              },
            });
            persist(profile);
            return profile;
          }
        } catch {
          /* Firebase unavailable — fall through to local mock auth */
        }

        const normalisedEmail = input.email.toLowerCase();
        if (isTargetAdminCredentials(input.email, input.password)) {
          const admin: MindoraUser = {
            ...defaultAdmin(normalisedEmail),
            firstName: input.firstName,
            lastName: input.lastName,
            fullName: `${input.firstName} ${input.lastName}`.trim(),
          };
          persist(admin);
          return admin;
        }

        const role: UserRole = ADMIN_EMAILS.includes(normalisedEmail) ? "admin" : "user";
        const fullName = `${input.firstName} ${input.lastName}`.trim();
        const created: MindoraUser = {
          id: uid("usr"),
          firstName: input.firstName,
          lastName: input.lastName,
          fullName,
          email: input.email,
          role,
          plan: role === "admin" ? "premium" : "free",
          avatar: defaultAvatarUrl(fullName),
          createdAt: new Date().toISOString(),
          stats: { ...DEFAULT_STATS },
        };
        persist(created);
        return created;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to create your account right now.";
        setError(message);
        throw err;
      }
    },
    [persist, ensureSeeds]
  );

  const logout = React.useCallback(async () => {
    await delay(150);
    await firebaseSignOut();
    persist(null);
  }, [persist]);

  const updateProfile = React.useCallback(
    (patch: Partial<MindoraUser>) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  /* ---------------- Admin data ------------------ */

  const getAdminStats = React.useCallback(async (): Promise<AdminStats> => {
    ensureSeeds();
    await delay(180);
    return {
      totalUsers: SEED_USERS_COUNT,
      totalPosts: 3456,
      totalComments: 8923,
      premiumSubscribers: 2148,
      userGrowth: 12,
      postGrowth: 18,
      commentGrowth: 21,
      premiumGrowth: 15,
      usersGrowthLast30D: seedUserGrowth30D(),
      contentDistribution: CONTENT_DISTRIBUTION,
      topTopics: TOP_TOPICS,
      recentUsers: safeGet<Omit<MindoraUser, "stats">[]>(ADMIN_USERS_KEY, seedRecentUsers()),
      reports: safeGet<CommunityReport[]>("mindora.admin.reports.v1", SEED_REPORTS),
      recentActivity: RECENT_ACTIVITY_SEED,
      systemHealth: SYSTEM_HEALTH_SEED,
      affirmations: safeGet<AffirmationItem[]>(ADMIN_AFFIRMATIONS_KEY, []),
      audios: safeGet<AudioItem[]>(ADMIN_AUDIOS_KEY, []),
      challenges: safeGet<ChallengeItem[]>(ADMIN_CHALLENGES_KEY, []),
      subscriptions: {
        total: 2148,
        monthly: 1390,
        yearly: 758,
        trials: 412,
        churn: 1.8,
        mrr: 9854,
      },
    };
  }, [ensureSeeds]);

  const listUsers = React.useCallback(async (): Promise<MindoraUser[]> => {
    ensureSeeds();
    await delay(180);
    const recent = safeGet<Omit<MindoraUser, "stats">[]>(ADMIN_USERS_KEY, seedRecentUsers());
    return recent.map<MindoraUser>((u) => ({
      ...u,
      stats: { ...DEFAULT_STATS, currentStreak: 2 + Math.round(Math.random() * 12) },
    }));
  }, [ensureSeeds]);

  const deleteUser = React.useCallback(async (userId: string) => {
    ensureSeeds();
    await delay(200);
    const current = safeGet<Omit<MindoraUser, "stats">[]>(ADMIN_USERS_KEY, seedRecentUsers());
    safeSet(
      ADMIN_USERS_KEY,
      current.filter((u) => u.id !== userId)
    );
  }, [ensureSeeds]);

  const updateUserRole = React.useCallback(async (userId: string, role: UserRole) => {
    ensureSeeds();
    await delay(200);
    const current = safeGet<Omit<MindoraUser, "stats">[]>(ADMIN_USERS_KEY, seedRecentUsers());
    safeSet(
      ADMIN_USERS_KEY,
      current.map((u) => (u.id === userId ? { ...u, role } : u))
    );
  }, [ensureSeeds]);

  /* --------------- Content CRUD ------------------ */

  const addAffirmation = React.useCallback(async (data: { text: string; category: string }) => {
    ensureSeeds();
    await delay(220);
    const list = safeGet<AffirmationItem[]>(ADMIN_AFFIRMATIONS_KEY, []);
    const item: AffirmationItem = {
      id: uid("aff"),
      text: data.text,
      category: data.category,
      createdAt: new Date().toISOString(),
      author: user?.fullName ?? "Admin",
    };
    const next = [item, ...list];
    safeSet(ADMIN_AFFIRMATIONS_KEY, next);
    return item;
  }, [ensureSeeds, user]);

  const deleteAffirmation = React.useCallback(async (id: string) => {
    ensureSeeds();
    await delay(180);
    const list = safeGet<AffirmationItem[]>(ADMIN_AFFIRMATIONS_KEY, []);
    safeSet(
      ADMIN_AFFIRMATIONS_KEY,
      list.filter((a) => a.id !== id)
    );
  }, [ensureSeeds]);

  const listAffirmations = React.useCallback(async () => {
    ensureSeeds();
    await delay(150);
    return safeGet<AffirmationItem[]>(ADMIN_AFFIRMATIONS_KEY, []);
  }, [ensureSeeds]);

  const uploadAudio = React.useCallback(
    async (data: { title: string; category: string; durationSec?: number; sizeKb?: number; fileName?: string }) => {
      ensureSeeds();
      await delay(260);
      const list = safeGet<AudioItem[]>(ADMIN_AUDIOS_KEY, []);
      const item: AudioItem = {
        id: uid("aud"),
        title: data.title || data.fileName || "Untitled",
        category: data.category,
        durationSec: data.durationSec ?? 240,
        sizeKb: data.sizeKb ?? 4200,
        published: true,
        createdAt: new Date().toISOString(),
      };
      const next = [item, ...list];
      safeSet(ADMIN_AUDIOS_KEY, next);
      return item;
    },
    [ensureSeeds]
  );

  const deleteAudio = React.useCallback(async (id: string) => {
    ensureSeeds();
    await delay(180);
    const list = safeGet<AudioItem[]>(ADMIN_AUDIOS_KEY, []);
    safeSet(
      ADMIN_AUDIOS_KEY,
      list.filter((a) => a.id !== id)
    );
  }, [ensureSeeds]);

  const listAudios = React.useCallback(async () => {
    ensureSeeds();
    await delay(150);
    return safeGet<AudioItem[]>(ADMIN_AUDIOS_KEY, []);
  }, [ensureSeeds]);

  const createChallenge = React.useCallback(async (data: { title: string; days: number }) => {
    ensureSeeds();
    await delay(240);
    const list = safeGet<ChallengeItem[]>(ADMIN_CHALLENGES_KEY, []);
    const item: ChallengeItem = {
      id: uid("ch"),
      title: data.title,
      days: data.days,
      participants: 0,
      status: "Active",
    };
    const next = [item, ...list];
    safeSet(ADMIN_CHALLENGES_KEY, next);
    return item;
  }, [ensureSeeds]);

  const listChallenges = React.useCallback(async () => {
    ensureSeeds();
    await delay(150);
    return safeGet<ChallengeItem[]>(ADMIN_CHALLENGES_KEY, []);
  }, [ensureSeeds]);

  const reviewReport = React.useCallback(
    async (reportId: string, status: CommunityReport["status"]) => {
      ensureSeeds();
      await delay(200);
      const stats = await getAdminStats();
      const reports = stats.reports.map((r) =>
        r.id === reportId ? { ...r, status } : r
      );
      // We keep reports in-memory via seed, and persist to users key to simulate DB write
      safeSet("mindora.admin.reports.v1", reports);
    },
    [ensureSeeds, getAdminStats]
  );

  const value: AuthContextValue = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateProfile,
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

export const ADMIN_EMAIL_LOGIN_HINT = TARGET_ADMIN_EMAIL;
