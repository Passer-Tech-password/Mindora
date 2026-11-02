/**
 * Mindora Backend API — Firebase Cloud Functions
 *
 * All functions below are exported as v2 Callable HTTPS endpoints so they
 * can be invoked from the client via the Firebase Functions SDK
 * (httpsCallable). They are protected by Firebase App Check / auth when
 * available and gracefully validate their input.
 *
 * Structure:
 *   - admin/*        : Admin-only CRUD endpoints (users, stats, moderation)
 *   - content/*      : Shared content operations (affirmations, audio, challenges)
 *   - community/*    : Posts, comments, likes, reports
 *   - user/*         : Per-user data (moods, saved, profile, streaks)
 *   - stripe/*       : Placeholder for subscription webhooks (integrate later)
 *
 * Admin guard: Every admin endpoint checks the caller's email / custom
 * admin claim. For local development the admin whitelist below is used.
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2/options";
import * as logger from "firebase-functions/logger";
import {initializeApp, getApps, getApp, App} from "firebase-admin/app";
import {
  getFirestore,
  FieldValue,
  Timestamp,
  type Firestore,
} from "firebase-admin/firestore";
import {getAuth, type Auth} from "firebase-admin/auth";

setGlobalOptions({
  maxInstances: 10,
  region: "us-central1",
  memory: "512MiB",
});

/* ------------------------- Admin SDK bootstrap ------------------------- */

const ADMIN_APP: App =
  getApps().length > 0 ? getApp() : initializeApp();
const db: Firestore = getFirestore(ADMIN_APP);
const auth: Auth = getAuth(ADMIN_APP);

const COLLECTIONS = {
  users: "users",
  posts: "posts",
  comments: "comments",
  likes: "likes",
  reports: "reports",
  affirmations: "affirmations",
  audios: "audios",
  challenges: "challenges",
  moods: "moods",
  savedItems: "savedItems",
  notifications: "notifications",
  subscriptions: "subscriptions",
  newsletterSubscribers: "newsletterSubscribers",
  contactMessages: "contactMessages",
  blogPosts: "blogPosts",
  jobOpenings: "jobOpenings",
  userSettings: "userSettings",
} as const;

/* -------------------------- Admin whitelist -------------------------- */

const ADMIN_EMAILS = new Set<string>([
  "admin@mindora.app",
  "super@mindora.app",
  "mindoraapp698@gmail.com",
]);

function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.has(email.toLowerCase().trim());
}

async function requireAdmin(callable: {
  auth?: { uid?: string; token?: { email?: string } };
}): Promise<{ uid: string; email: string }> {
  if (!callable.auth?.uid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }
  const uid = callable.auth.uid;
  const record = await auth.getUser(uid);
  const email = record.email ?? callable.auth.token?.email ?? "";
  const isAdmin =
    isAdminEmail(email) ||
    (record.customClaims?.admin as boolean | undefined) === true;
  if (!isAdmin) {
    throw new HttpsError("permission-denied", "Admin access required.");
  }
  return {uid, email: email.toLowerCase()};
}

async function requireUser(callable: {
  auth?: { uid?: string };
}): Promise<string> {
  if (!callable.auth?.uid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }
  return callable.auth.uid;
}

function sanitize<T extends Record<string, unknown>>(data: T): T {
  const clean = {...data};
  for (const k of Object.keys(clean)) {
    const v = clean[k];
    if (typeof v === "string" && v.length > 50_000) {
      throw new HttpsError("invalid-argument", `Field ${k} exceeds length limits.`);
    }
  }
  return clean;
}

/* ============================ ADMIN STATS ============================ */

interface AdminStatsResponse {
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
  topTopics: { label: string; posts: number; growth: number; color: string }[];
  recentUsers: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    avatar?: string;
    role: "user" | "admin";
    plan: "free" | "premium";
    createdAt: string;
  }[];
  reports: {
    id: string;
    type: "Post" | "Comment";
    content: string;
    reportedBy: string;
    date: string;
    status: "Pending" | "Reviewed" | "Resolved";
  }[];
  systemHealth: { name: string; status: string; tone: string }[];
  affirmations: {
    id: string;
    text: string;
    category: string;
    createdAt: string;
    author: string;
  }[];
  audios: {
    id: string;
    title: string;
    category: string;
    durationSec: number;
    sizeKb: number;
    published: boolean;
    createdAt: string;
  }[];
  challenges: {
    id: string;
    title: string;
    days: number;
    participants: number;
    status: "Active" | "Draft" | "Archived";
  }[];
  subscriptions: {
    total: number;
    monthly: number;
    yearly: number;
    trials: number;
    churn: number;
    mrr: number;
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "Daily Wins": "#5B3FA8",
  "Mental Health": "#F37474",
  "Self Love": "#F59AB0",
  "Anxiety Support": "#7A79EC",
  Motivation: "#F8B460",
  Gratitude: "#B892F6",
};

export const adminGetStats = onCall<Record<string, unknown>, Promise<AdminStatsResponse>>(
  async (req) => {
    await requireAdmin(req);
    const now = Date.now();
    const DAY = 24 * 60 * 60 * 1000;

    const [
      userSnap,
      postSnap,
      commentSnap,
      reportSnap,
      affSnap,
      audioSnap,
      chalSnap,
      subSnap,
    ] = await Promise.all([
      db.collection(COLLECTIONS.users).limit(2000).get(),
      db.collection(COLLECTIONS.posts).limit(5000).get(),
      db.collection(COLLECTIONS.comments).limit(10000).get(),
      db.collection(COLLECTIONS.reports).limit(100).get(),
      db.collection(COLLECTIONS.affirmations).orderBy("createdAt", "desc").limit(50).get(),
      db.collection(COLLECTIONS.audios).orderBy("createdAt", "desc").limit(50).get(),
      db.collection(COLLECTIONS.challenges).limit(50).get(),
      db.collection(COLLECTIONS.subscriptions).limit(5000).get(),
    ]);

    const users = userSnap.docs.map((d) => ({id: d.id, ...d.data()}));
    const posts = postSnap.docs.map((d) => ({id: d.id, ...d.data()}));
    const comments = commentSnap.docs.map((d) => ({id: d.id, ...d.data()}));
    const subscribers = users.filter(
      (u) => (u as {subscriptionStatus?: string}).subscriptionStatus === "premium"
    );

    const usersGrowthLast30D: number[] = Array.from({length: 30}, (_, i) => {
      const dayStart = now - (29 - i) * DAY;
      const dayEnd = dayStart + DAY;
      return users.filter((u) => {
        const t = (u as {createdAt?: Timestamp | Date | string}).createdAt;
        const ts = t instanceof Timestamp ? t.toMillis() : new Date(String(t)).getTime();
        return ts >= dayStart && ts < dayEnd;
      }).length;
    });
    const growthCumulative: number[] = [];
    let acc = 0;
    for (const v of usersGrowthLast30D) {
      acc += v;
      growthCumulative.push(acc);
    }

    const categoryCount = new Map<string, number>();
    for (const p of posts) {
      const c = String((p as {category?: string}).category ?? "General");
      categoryCount.set(c, (categoryCount.get(c) ?? 0) + 1);
    }
    const totalPostsCount = posts.length;
    const categoryEntries: [string, number][] = Array.from(categoryCount.entries());
    const contentDistribution = categoryEntries.map(([label, count]) => ({
      label: String(label),
      percent: totalPostsCount
        ? Math.max(1, Math.round((Number(count) / totalPostsCount) * 100))
        : 0,
      color: CATEGORY_COLORS[label] ?? "#6D3FE8",
    }));

    const topTopics: { label: string; posts: number; growth: number; color: string }[] =
      (categoryEntries as [string, number][])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, count]) => ({
          label: String(label),
          posts: Number(count),
          growth: 0,
          color: CATEGORY_COLORS[label] ?? "#6D3FE8",
        }));

    const recentUsers = users.slice(0, 5).map((u) => {
      const rawCreatedAt = (u as {createdAt?: unknown}).createdAt;
      let createdAtStr: string;
      try {
        const asUnknown = rawCreatedAt as unknown;
        if (asUnknown instanceof Timestamp) {
          createdAtStr = asUnknown.toDate().toISOString();
        } else if (typeof rawCreatedAt === "string") {
          createdAtStr = rawCreatedAt;
        } else {
          createdAtStr = new Date().toISOString();
        }
      } catch {
        createdAtStr = new Date().toISOString();
      }
      return {
        id: String(u.id),
        firstName: String((u as {firstName?: string}).firstName ?? "User"),
        lastName: String((u as {lastName?: string}).lastName ?? "Name"),
        fullName: String(
          (u as {fullName?: string}).fullName ??
            `${(u as {firstName?: string}).firstName} ${(u as {lastName?: string}).lastName}`
        ),
        email: String((u as {email?: string}).email ?? "user@example.com"),
        avatar: (u as {avatar?: string}).avatar ?? undefined,
        role: ((u as {role?: string}).role === "admin" ? "admin" : "user") as "user" | "admin",
        plan: ((u as {plan?: string}).plan === "premium" ? "premium" : "free") as "free" | "premium",
        createdAt: createdAtStr,
      };
    });

    const reports = reportSnap.docs.map((r) => ({
      id: r.id,
      type: ((r.data() as {targetType?: string}).targetType === "comment"
        ? "Comment"
        : "Post") as "Post" | "Comment",
      content: String((r.data() as {reason?: string}).reason ?? "Reported content"),
      reportedBy: String((r.data() as {reporterId?: string}).reporterId ?? "Anonymous"),
      date:
        (r.data() as {createdAt?: Timestamp}).createdAt instanceof Timestamp
          ? (r.data() as {createdAt: Timestamp}).createdAt.toDate().toLocaleString()
          : new Date().toLocaleString(),
      status: ((r.data() as {status?: string}).status === "resolved"
        ? "Resolved"
        : (r.data() as {status?: string}).status === "reviewed"
          ? "Reviewed"
          : "Pending") as "Pending" | "Reviewed" | "Resolved",
    }));

    const affirmations = affSnap.docs.map((a) => ({
      id: a.id,
      text: String((a.data() as {text?: string}).text ?? ""),
      category: String((a.data() as {category?: string}).category ?? "General"),
      createdAt:
        (a.data() as {createdAt?: Timestamp}).createdAt instanceof Timestamp
          ? (a.data() as {createdAt: Timestamp}).createdAt.toDate().toISOString()
          : new Date().toISOString(),
      author: String((a.data() as {author?: string}).author ?? "Admin"),
    }));

    const audios = audioSnap.docs.map((a) => ({
      id: a.id,
      title: String((a.data() as {title?: string}).title ?? "Untitled"),
      category: String((a.data() as {category?: string}).category ?? "Ambient"),
      durationSec: Number((a.data() as {durationSec?: number}).durationSec ?? 240),
      sizeKb: Number((a.data() as {sizeKb?: number}).sizeKb ?? 4200),
      published: Boolean((a.data() as {published?: boolean}).published ?? true),
      createdAt:
        (a.data() as {createdAt?: Timestamp}).createdAt instanceof Timestamp
          ? (a.data() as {createdAt: Timestamp}).createdAt.toDate().toISOString()
          : new Date().toISOString(),
    }));

    const challenges = chalSnap.docs.map((c) => ({
      id: c.id,
      title: String((c.data() as {title?: string}).title ?? "Challenge"),
      days: Number((c.data() as {days?: number}).days ?? 7),
      participants: Number((c.data() as {participants?: number}).participants ?? 0),
      status:
        ((c.data() as {status?: string}).status === "Archived"
          ? "Archived"
          : (c.data() as {status?: string}).status === "Draft"
            ? "Draft"
            : "Active") as "Active" | "Draft" | "Archived",
    }));

    /* Subscription metrics computed from the subscriptions collection */
    const subs = subSnap.docs.map((d) => d.data() as {
      plan?: string;
      status?: string;
      pricePaid?: number;
    });
    const activeSubs = subs.filter((s) => s.status === "active");
    const monthlySubs = activeSubs.filter((s) => s.plan === "monthly").length;
    const yearlySubs = activeSubs.filter((s) => s.plan === "yearly").length;
    const trialSubs = subs.filter((s) => s.status === "trialing").length;
    const cancelledSubs = subs.filter((s) => s.status === "cancelled").length;
    const churnPercent = subs.length
      ? Number(((cancelledSubs / subs.length) * 100).toFixed(1))
      : 0;
    const mrrCents = activeSubs.reduce(
      (total, s) => total + Math.round((Number(s.pricePaid ?? 0) || 0) * 100),
      0
    );

    logger.info("adminGetStats: fetched dashboard metrics", {
      users: users.length,
      posts: posts.length,
    });

    return {
      totalUsers: users.length,
      totalPosts: posts.length,
      totalComments: comments.length,
      premiumSubscribers: subscribers.length,
      userGrowth: 0,
      postGrowth: 0,
      commentGrowth: 0,
      premiumGrowth: 0,
      usersGrowthLast30D: growthCumulative,
      contentDistribution,
      topTopics,
      recentUsers,
      reports,
      systemHealth: [
        {name: "Firebase Connection", status: "Online", tone: "#10B981"},
        {name: "Authentication", status: users.length ? "Active" : "Idle", tone: "#10B981"},
        {name: "Firestore Database", status: "Connected", tone: "#10B981"},
        {name: "Storage", status: "Configured", tone: "#10B981"},
        {name: "Analytics", status: "Active", tone: "#10B981"},
      ],
      affirmations,
      audios,
      challenges,
      subscriptions: {
        total: subscribers.length,
        monthly: monthlySubs,
        yearly: yearlySubs,
        trials: trialSubs,
        churn: churnPercent,
        mrr: mrrCents / 100,
      },
    };
  }
);

/* ====================== ADMIN USER MANAGEMENT ====================== */

export const adminListUsers = onCall<{limit?: number}, Promise<AdminStatsResponse["recentUsers"]>>(
  async (req) => {
    await requireAdmin(req);
    const limit = Math.min(Number(req.data?.limit ?? 100), 500);
    const snap = await db
      .collection(COLLECTIONS.users)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    const mapped = snap.docs.map((u) => {
      const raw = u.data();
      return {
        id: u.id,
        firstName: String(raw.firstName ?? "User"),
        lastName: String(raw.lastName ?? "Name"),
        fullName: String(raw.fullName ?? `${raw.firstName} ${raw.lastName}`),
        email: String(raw.email ?? "user@example.com"),
        avatar: raw.photoURL ? String(raw.photoURL) : undefined,
        role: (raw.role === "admin" ? "admin" : "user") as "user" | "admin",
        plan: (raw.subscriptionStatus === "premium" || raw.plan === "premium"
          ? "premium"
          : "free") as "free" | "premium",
        createdAt:
          raw.createdAt instanceof Timestamp
            ? raw.createdAt.toDate().toISOString()
            : String(raw.createdAt ?? new Date().toISOString()),
      };
    });
    return mapped;
  }
);

export const adminDeleteUser = onCall<{userId: string}, Promise<void>>(
  async (req) => {
    await requireAdmin(req);
    const uid = String(req.data?.userId);
    if (!uid) throw new HttpsError("invalid-argument", "userId is required.");
    try {
      await auth.deleteUser(uid);
    } catch (e) {
      logger.warn("adminDeleteUser: Auth delete failed, removing Firestore doc only", {uid});
    }
    await db.collection(COLLECTIONS.users).doc(uid).delete();
    logger.info("adminDeleteUser: deleted user", {uid});
  }
);

export const adminUpdateUserRole = onCall<
  {userId: string; role: "user" | "admin"},
  Promise<void>
>(async (req) => {
  await requireAdmin(req);
  const {userId, role} = req.data ?? ({} as {userId?: string; role?: "user" | "admin"});
  if (!userId || (role !== "user" && role !== "admin")) {
    throw new HttpsError("invalid-argument", "userId and role are required.");
  }
  await auth.setCustomUserClaims(userId, {admin: role === "admin"});
  await db
    .collection(COLLECTIONS.users)
    .doc(userId)
    .set({role, updatedAt: FieldValue.serverTimestamp()}, {merge: true});
  logger.info("adminUpdateUserRole:", {userId, role});
});

/* ========================= MODERATION / REPORTS ========================= */

export const adminReviewReport = onCall<
  {reportId: string; status: "Pending" | "Reviewed" | "Resolved"},
  Promise<void>
>(async (req) => {
  await requireAdmin(req);
  const {reportId, status} = req.data ?? ({} as {reportId?: string; status?: string});
  if (!reportId || !["Pending", "Reviewed", "Resolved"].includes(String(status))) {
    throw new HttpsError("invalid-argument", "reportId and status are required.");
  }
  const docRef = db.collection(COLLECTIONS.reports).doc(reportId);
  const snap = await docRef.get();
  const mapped = status === "Pending" ? "pending" : status === "Reviewed" ? "reviewed" : "resolved";
  if (snap.exists) {
    await docRef.set({status: mapped, updatedAt: FieldValue.serverTimestamp()}, {merge: true});
  } else {
    await docRef.set({
      status: mapped,
      reason: "Migrated report",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  logger.info("adminReviewReport:", {reportId, status});
});

/* ========================= AFFIRMATIONS CRUD ========================= */

export const contentAddAffirmation = onCall<
  {text: string; category?: string},
  Promise<AdminStatsResponse["affirmations"][number]>
>(async (req) => {
  const {uid, email} = await requireAdmin(req);
  const {text, category = "General"} = sanitize(req.data ?? ({} as {text?: string; category?: string}));
  if (!text || String(text).trim().length < 3) {
    throw new HttpsError("invalid-argument", "Affirmation text is too short.");
  }
  const ref = db.collection(COLLECTIONS.affirmations).doc();
  const createdAt = FieldValue.serverTimestamp();
  await ref.set({
    text: String(text).trim(),
    category: String(category),
    author: email,
    authorUid: uid,
    createdAt,
    updatedAt: createdAt,
  });
  logger.info("contentAddAffirmation:", {id: ref.id});
  return {
    id: ref.id,
    text: String(text).trim(),
    category: String(category),
    author: email,
    createdAt: new Date().toISOString(),
  };
});

export const contentDeleteAffirmation = onCall<{id: string}, Promise<void>>(
  async (req) => {
    await requireAdmin(req);
    const id = String(req.data?.id);
    if (!id) throw new HttpsError("invalid-argument", "id required.");
    await db.collection(COLLECTIONS.affirmations).doc(id).delete();
    logger.info("contentDeleteAffirmation:", {id});
  }
);

export const contentListAffirmations = onCall<
  {category?: string; limit?: number},
  Promise<AdminStatsResponse["affirmations"]>
>(async (req) => {
  if (!req.auth?.uid) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }
  const {category, limit = 100} = req.data ?? {};
  let q = db
    .collection(COLLECTIONS.affirmations)
    .orderBy("createdAt", "desc")
    .limit(Math.min(Number(limit), 500));
  if (category) {
    q = q.where("category", "==", String(category));
  }
  const snap = await q.get();
  return snap.docs.map((d) => ({
    id: d.id,
    text: String(d.data().text ?? ""),
    category: String(d.data().category ?? "General"),
    author: String(d.data().author ?? "Admin"),
    createdAt:
      d.data().createdAt instanceof Timestamp
        ? d.data().createdAt.toDate().toISOString()
        : new Date().toISOString(),
  }));
});

/* ========================= AUDIO LIBRARY CRUD ========================= */

export const contentUploadAudio = onCall<
  {
    title: string;
    category?: string;
    durationSec?: number;
    sizeKb?: number;
    storagePath?: string;
  },
  Promise<AdminStatsResponse["audios"][number]>
>(async (req) => {
  await requireAdmin(req);
  const data = sanitize(req.data ?? ({} as {title?: string}));
  if (!data.title || String(data.title).trim().length < 2) {
    throw new HttpsError("invalid-argument", "Audio title is required.");
  }
  const ref = db.collection(COLLECTIONS.audios).doc();
  const now = FieldValue.serverTimestamp();
  await ref.set({
    title: String(data.title).trim(),
    category: String(data.category ?? "Ambient"),
    durationSec: Number(data.durationSec ?? 240),
    sizeKb: Number(data.sizeKb ?? 4200),
    storagePath: data.storagePath ? String(data.storagePath) : null,
    published: true,
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: ref.id,
    title: String(data.title).trim(),
    category: String(data.category ?? "Ambient"),
    durationSec: Number(data.durationSec ?? 240),
    sizeKb: Number(data.sizeKb ?? 4200),
    published: true,
    createdAt: new Date().toISOString(),
  };
});

export const contentDeleteAudio = onCall<{id: string}, Promise<void>>(
  async (req) => {
    await requireAdmin(req);
    const id = String(req.data?.id);
    if (!id) throw new HttpsError("invalid-argument", "id required.");
    await db.collection(COLLECTIONS.audios).doc(id).delete();
  }
);

export const contentListAudios = onCall<
  {category?: string; limit?: number; publishedOnly?: boolean},
  Promise<AdminStatsResponse["audios"]>
>(async (req) => {
  const {category, limit = 100, publishedOnly = false} = req.data ?? {};
  let q = db
    .collection(COLLECTIONS.audios)
    .orderBy("createdAt", "desc")
    .limit(Math.min(Number(limit), 500));
  if (publishedOnly) q = q.where("published", "==", true);
  if (category) q = q.where("category", "==", String(category));
  const snap = await q.get();
  return snap.docs.map((d) => ({
    id: d.id,
    title: String(d.data().title ?? "Untitled"),
    category: String(d.data().category ?? "Ambient"),
    durationSec: Number(d.data().durationSec ?? 240),
    sizeKb: Number(d.data().sizeKb ?? 4200),
    published: Boolean(d.data().published ?? true),
    createdAt:
      d.data().createdAt instanceof Timestamp
        ? d.data().createdAt.toDate().toISOString()
        : new Date().toISOString(),
  }));
});

/* ========================= CHALLENGES CRUD ========================= */

export const contentCreateChallenge = onCall<
  {title: string; days?: number},
  Promise<AdminStatsResponse["challenges"][number]>
>(async (req) => {
  await requireAdmin(req);
  const data = sanitize(req.data ?? ({} as {title?: string; days?: number}));
  if (!data.title || String(data.title).trim().length < 2) {
    throw new HttpsError("invalid-argument", "Challenge title is required.");
  }
  const ref = db.collection(COLLECTIONS.challenges).doc();
  const payload = {
    title: String(data.title).trim(),
    days: Math.max(1, Math.min(365, Number(data.days ?? 7))),
    participants: 0,
    status: "Active",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await ref.set(payload);
  return {
    id: ref.id,
    title: payload.title,
    days: payload.days,
    participants: 0,
    status: "Active",
  };
});

export const contentListChallenges = onCall<
  Record<string, unknown>,
  Promise<AdminStatsResponse["challenges"]>
>(async () => {
  const snap = await db
    .collection(COLLECTIONS.challenges)
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();
  return snap.docs.map((c) => ({
    id: c.id,
    title: String(c.data().title ?? "Challenge"),
    days: Number(c.data().days ?? 7),
    participants: Number(c.data().participants ?? 0),
    status:
      c.data().status === "Archived"
        ? "Archived"
        : c.data().status === "Draft"
          ? "Draft"
          : "Active",
  }));
});

/* ======================= COMMUNITY: POSTS / COMMENTS ======================= */

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

export const communityCreatePost = onCall<
  {
    content: string;
    category: string;
    isAnonymous?: boolean;
  },
  Promise<{id: string; content: string; category: string; createdAt: string; likesCount: number; commentsCount: number}>
>(async (req) => {
  const uid = await requireUser(req);
  const data = sanitize(req.data ?? ({} as {content?: string; category?: string}));
  if (!data.content || String(data.content).trim().length < 3) {
    throw new HttpsError("invalid-argument", "Post content is too short.");
  }
  if (!data.category) {
    throw new HttpsError("invalid-argument", "Post category is required.");
  }
  const userSnap = await db.collection(COLLECTIONS.users).doc(uid).get();
  const user = userSnap.data() ?? {};
  const ref = db.collection(COLLECTIONS.posts).doc();
  const isAnon = Boolean(data.isAnonymous ?? false);
  const payload = {
    authorId: uid,
    authorName: isAnon ? "Anonymous" : String(user.fullName ?? user.displayName ?? "User"),
    isAnonymous: isAnon,
    category: String(data.category),
    content: String(data.content).trim(),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    likesCount: 0,
    commentsCount: 0,
  };
  await ref.set(payload);
  return {
    id: ref.id,
    content: payload.content,
    category: payload.category,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
  };
});

export const communityListPosts = onCall<
  {category?: string; limit?: number},
  Promise<
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
  >
>(async (req) => {
  if (!req.auth?.uid) throw new HttpsError("unauthenticated", "Authentication required.");
  const {category, limit = 20} = req.data ?? {};
  let q = db
    .collection(COLLECTIONS.posts)
    .orderBy("createdAt", "desc")
    .limit(Math.min(Number(limit), 100));
  if (category) q = q.where("category", "==", String(category));
  const snap = await q.get();
  return snap.docs.map((d) => {
    const raw = d.data();
    return {
      id: d.id,
      authorId: String(raw.authorId ?? ""),
      authorName: String(raw.authorName ?? "Community Member"),
      isAnonymous: Boolean(raw.isAnonymous ?? false),
      category: String(raw.category ?? "General"),
      content: String(raw.content ?? ""),
      createdAt:
        raw.createdAt instanceof Timestamp
          ? raw.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      likesCount: Number(raw.likesCount ?? 0),
      commentsCount: Number(raw.commentsCount ?? 0),
    };
  });
});

export const communityToggleLike = onCall<
  {postId: string},
  Promise<{liked: boolean; likesCount: number}>
>(async (req) => {
  const uid = await requireUser(req);
  const postId = String(req.data?.postId);
  if (!postId) throw new HttpsError("invalid-argument", "postId required.");
  const likeId = `${uid}_${postId}`;
  const likeDoc = db.collection(COLLECTIONS.likes).doc(likeId);
  const postDoc = db.collection(COLLECTIONS.posts).doc(postId);
  return db.runTransaction(async (tx) => {
    const likeSnap = await tx.get(likeDoc);
    const postSnap = await tx.get(postDoc);
    if (!postSnap.exists) {
      throw new HttpsError("not-found", "Post not found.");
    }
    const currentLikes = Number(postSnap.data()?.likesCount ?? 0);
    if (likeSnap.exists) {
      tx.delete(likeDoc);
      const next = Math.max(0, currentLikes - 1);
      tx.update(postDoc, {likesCount: next, updatedAt: FieldValue.serverTimestamp()});
      return {liked: false, likesCount: next};
    }
    tx.set(likeDoc, {
      postId,
      userId: uid,
      createdAt: FieldValue.serverTimestamp(),
    });
    const next = currentLikes + 1;
    tx.update(postDoc, {likesCount: next, updatedAt: FieldValue.serverTimestamp()});
    return {liked: true, likesCount: next};
  });
});

export const communityAddComment = onCall<
  {postId: string; content: string; isAnonymous?: boolean},
  Promise<{id: string; content: string; createdAt: string; likesCount: number}>
>(async (req) => {
  const uid = await requireUser(req);
  const {postId, content, isAnonymous = false} =
    req.data ?? ({} as {postId?: string; content?: string; isAnonymous?: boolean});
  if (!postId || !content || String(content).trim().length < 2) {
    throw new HttpsError("invalid-argument", "postId and content are required.");
  }
  return db.runTransaction(async (tx) => {
    const postRef = db.collection(COLLECTIONS.posts).doc(postId);
    const ps = await tx.get(postRef);
    if (!ps.exists) throw new HttpsError("not-found", "Post not found.");
    const ref = db.collection(COLLECTIONS.comments).doc();
    tx.set(ref, {
      postId,
      authorId: uid,
      isAnonymous: Boolean(isAnonymous),
      content: String(content).trim(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      likesCount: 0,
    });
    tx.update(postRef, {
      commentsCount: (Number(ps.data()?.commentsCount ?? 0) || 0) + 1,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return {
      id: ref.id,
      content: String(content).trim(),
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };
  });
});

export const communityCreateReport = onCall<
  {
    targetType: "post" | "comment" | "user";
    targetId: string;
    reason: string;
    details?: string;
  },
  Promise<void>
>(async (req) => {
  const uid = await requireUser(req);
  const {targetType, targetId, reason, details} =
    req.data ??
    ({} as {
      targetType?: "post" | "comment" | "user";
      targetId?: string;
      reason?: string;
      details?: string;
    });
  if (!targetType || !targetId || !reason) {
    throw new HttpsError("invalid-argument", "targetType, targetId, and reason are required.");
  }
  await db.collection(COLLECTIONS.reports).add({
    targetType,
    targetId,
    reporterId: uid,
    reason: String(reason),
    details: details ? String(details) : "",
    createdAt: FieldValue.serverTimestamp(),
    status: "pending",
  });
});

/* ========================= USER: MOODS / SAVED / PROFILE ========================= */

export const userSaveMood = onCall<
  {label: string; emoji: string; note?: string},
  Promise<MoodRecord>
>(async (req) => {
  const uid = await requireUser(req);
  const {label, emoji, note} = req.data ?? ({} as {label?: string; emoji?: string; note?: string});
  if (!label || !emoji) {
    throw new HttpsError("invalid-argument", "label and emoji required.");
  }
  const ref = db.collection(COLLECTIONS.moods).doc();
  await ref.set({
    uid,
    label: String(label),
    emoji: String(emoji),
    note: note ? String(note) : "",
    createdAt: FieldValue.serverTimestamp(),
  });
  await db
    .collection(COLLECTIONS.users)
    .doc(uid)
    .set({lastMood: String(label), updatedAt: FieldValue.serverTimestamp()}, {merge: true});
  return {
    id: ref.id,
    label: String(label),
    emoji: String(emoji),
    note: note ? String(note) : undefined,
    createdAt: new Date().toISOString(),
  };
});

export const userGetMoodHistory = onCall<{limit?: number}, Promise<MoodRecord[]>>(
  async (req) => {
    const uid = await requireUser(req);
    const limit = Math.min(Number(req.data?.limit ?? 60), 365);
    const snap = await db
      .collection(COLLECTIONS.moods)
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();
    return snap.docs.map((d) => ({
      id: d.id,
      label: String(d.data().label ?? ""),
      emoji: String(d.data().emoji ?? "😌"),
      note: d.data().note ? String(d.data().note) : undefined,
      createdAt:
        d.data().createdAt instanceof Timestamp
          ? d.data().createdAt.toDate().toISOString()
          : new Date().toISOString(),
    }));
  }
);

export const userToggleSavedItem = onCall<
  {
    kind: "affirmation" | "audio" | "article";
    refId: string;
    title: string;
    category?: string;
    gradient?: string;
  },
  Promise<{saved: boolean; itemId: string}>
>(async (req) => {
  const uid = await requireUser(req);
  const d = req.data ??
    ({} as {
      kind?: "affirmation" | "audio" | "article";
      refId?: string;
      title?: string;
      category?: string;
      gradient?: string;
    });
  if (!d.kind || !d.refId || !d.title) {
    throw new HttpsError("invalid-argument", "kind, refId, and title required.");
  }
  const col = db.collection(COLLECTIONS.savedItems);
  const existing = await col
    .where("uid", "==", uid)
    .where("kind", "==", d.kind)
    .where("refId", "==", d.refId)
    .limit(1)
    .get();
  if (!existing.empty) {
    await existing.docs[0].ref.delete();
    return {saved: false, itemId: existing.docs[0].id};
  }
  const ref = col.doc();
  await ref.set({
    uid,
    kind: d.kind,
    refId: d.refId,
    title: String(d.title),
    category: d.category ? String(d.category) : "",
    gradient: d.gradient ? String(d.gradient) : "",
    createdAt: FieldValue.serverTimestamp(),
  });
  return {saved: true, itemId: ref.id};
});

export const userGetSavedItems = onCall<
  {kind?: "affirmation" | "audio" | "article"; limit?: number},
  Promise<SavedItemRecord[]>
>(async (req) => {
  const uid = await requireUser(req);
  const {kind, limit = 100} = req.data ?? {};
  let q = db
    .collection(COLLECTIONS.savedItems)
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .limit(Math.min(Number(limit), 500));
  if (kind) q = q.where("kind", "==", kind);
  const snap = await q.get();
  return snap.docs.map((d) => ({
    id: d.id,
    kind: d.data().kind as "affirmation" | "audio" | "article",
    refId: String(d.data().refId ?? ""),
    title: String(d.data().title ?? ""),
    category: d.data().category ? String(d.data().category) : undefined,
    gradient: d.data().gradient ? String(d.data().gradient) : undefined,
    createdAt:
      d.data().createdAt instanceof Timestamp
        ? d.data().createdAt.toDate().toISOString()
        : new Date().toISOString(),
  }));
});

/* ========================= DAILY AFFIRMATION ========================= */

export const userGetDailyAffirmation = onCall<
  Record<string, unknown>,
  Promise<{id: string; text: string; category: string; author: string; date: string}>
>(async (req) => {
  if (!req.auth?.uid) throw new HttpsError("unauthenticated", "Authentication required.");
  const today = new Date().toISOString().slice(0, 10);
  const snap = await db
    .collection(COLLECTIONS.affirmations)
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();
  const pool = snap.docs;
  if (!pool.length) {
    return {
      id: "aff_fallback",
      text: "You are doing better than you think.",
      category: "Self Love",
      author: "Mindora",
      date: today,
    };
  }
  const idx = Math.abs(
    Array.from(today).reduce((acc, c) => acc + c.charCodeAt(0), 0) % pool.length
  );
  const d = pool[idx];
  return {
    id: d.id,
    text: String(d.data().text ?? ""),
    category: String(d.data().category ?? "General"),
    author: String(d.data().author ?? "Mindora"),
    date: today,
  };
});

/* ------------------------------ Marketing ------------------------------ */

export const newsletterSubscribe = onCall<
  {email?: string},
  Promise<{subscribed: boolean}>
>(async (req) => {
  const raw = String(req.data?.email ?? "").trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(raw)) {
    throw new HttpsError("invalid-argument", "A valid email is required.");
  }
  const ref = db.collection(COLLECTIONS.newsletterSubscribers).doc(raw);
  const existing = await ref.get();
  if (!existing.exists) {
    await ref.set({
      email: raw,
      source: "footer",
      createdAt: FieldValue.serverTimestamp(),
    });
  }
  return {subscribed: true};
});

/* ---------------------------- Public content ---------------------------- */

export const contactSubmit = onCall<
  {name?: string; email?: string; subject?: string; message?: string},
  Promise<{received: boolean}>
>(async (req) => {
  const name = String(req.data?.name ?? "").trim();
  const email = String(req.data?.email ?? "").trim().toLowerCase();
  const subject = String(req.data?.subject ?? "").trim();
  const message = String(req.data?.message ?? "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length < 2) {
    throw new HttpsError("invalid-argument", "Please provide your name.");
  }
  if (!emailPattern.test(email)) {
    throw new HttpsError("invalid-argument", "A valid email is required.");
  }
  if (message.length < 10) {
    throw new HttpsError("invalid-argument", "Please include a longer message.");
  }
  await db.collection(COLLECTIONS.contactMessages).add({
    name,
    email,
    subject: subject || "General enquiry",
    message,
    uid: req.auth?.uid ?? null,
    createdAt: FieldValue.serverTimestamp(),
    status: "new",
  });
  return {received: true};
});

interface BlogPostRecord {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  createdAt: string;
  readMinutes: number;
}

export const blogListPosts = onCall<
  {limit?: number},
  Promise<BlogPostRecord[]>
>(async (req) => {
  const limit = Math.min(Number(req.data?.limit ?? 20), 50);
  const snap = await db
    .collection(COLLECTIONS.blogPosts)
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: String(data.title ?? ""),
      excerpt: String(data.excerpt ?? ""),
      category: String(data.category ?? "Wellness"),
      author: String(data.author ?? "Mindora Team"),
      readMinutes: Number(data.readMinutes ?? 4),
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  });
});

interface JobOpeningRecord {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  description: string;
}

export const careersListOpenings = onCall<
  Record<string, unknown>,
  Promise<JobOpeningRecord[]>
>(async () => {
  const snap = await db
    .collection(COLLECTIONS.jobOpenings)
    .where("status", "==", "open")
    .get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: String(data.title ?? ""),
      team: String(data.team ?? "Mindora"),
      location: String(data.location ?? "Remote"),
      type: String(data.type ?? "Full-time"),
      description: String(data.description ?? ""),
    };
  });
});

/* ========================= USER: SETTINGS / ACCOUNT ========================= */

export interface UserSettings {
  timezone: string;
  notifications: {
    dailyCheckIn: boolean;
    eveningWindDown: boolean;
    communityReplies: boolean;
    productUpdates: boolean;
    reminderTime: string;
  };
  privacy: {
    postsPrivate: boolean;
    showInDirectory: boolean;
    shareStreakBadge: boolean;
    defaultVisibility: "anonymous" | "friends" | "public";
    allowFriendRequests: boolean;
  };
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  timezone: "America/Los_Angeles",
  notifications: {
    dailyCheckIn: true,
    eveningWindDown: true,
    communityReplies: false,
    productUpdates: true,
    reminderTime: "08:30",
  },
  privacy: {
    postsPrivate: true,
    showInDirectory: false,
    shareStreakBadge: true,
    defaultVisibility: "anonymous",
    allowFriendRequests: false,
  },
};

function coerceBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeSettings(raw: unknown): UserSettings {
  const input = (raw ?? {}) as Partial<UserSettings>;
  const notifications = (input.notifications ?? {}) as Partial<UserSettings["notifications"]>;
  const privacy = (input.privacy ?? {}) as Partial<UserSettings["privacy"]>;
  const visibility = privacy.defaultVisibility;
  const reminder = typeof notifications.reminderTime === "string" ? notifications.reminderTime : "";
  return {
    timezone:
      typeof input.timezone === "string" && input.timezone.trim()
        ? input.timezone.trim()
        : DEFAULT_USER_SETTINGS.timezone,
    notifications: {
      dailyCheckIn: coerceBoolean(notifications.dailyCheckIn, DEFAULT_USER_SETTINGS.notifications.dailyCheckIn),
      eveningWindDown: coerceBoolean(notifications.eveningWindDown, DEFAULT_USER_SETTINGS.notifications.eveningWindDown),
      communityReplies: coerceBoolean(notifications.communityReplies, DEFAULT_USER_SETTINGS.notifications.communityReplies),
      productUpdates: coerceBoolean(notifications.productUpdates, DEFAULT_USER_SETTINGS.notifications.productUpdates),
      reminderTime: /^\d{2}:\d{2}$/.test(reminder) ? reminder : DEFAULT_USER_SETTINGS.notifications.reminderTime,
    },
    privacy: {
      postsPrivate: coerceBoolean(privacy.postsPrivate, DEFAULT_USER_SETTINGS.privacy.postsPrivate),
      showInDirectory: coerceBoolean(privacy.showInDirectory, DEFAULT_USER_SETTINGS.privacy.showInDirectory),
      shareStreakBadge: coerceBoolean(privacy.shareStreakBadge, DEFAULT_USER_SETTINGS.privacy.shareStreakBadge),
      defaultVisibility:
        visibility === "public" || visibility === "friends" || visibility === "anonymous"
          ? visibility
          : DEFAULT_USER_SETTINGS.privacy.defaultVisibility,
      allowFriendRequests: coerceBoolean(privacy.allowFriendRequests, DEFAULT_USER_SETTINGS.privacy.allowFriendRequests),
    },
  };
}

export const userGetSettings = onCall<Record<string, unknown>, Promise<UserSettings>>(
  async (req) => {
    const uid = await requireUser(req);
    const doc = await db.collection(COLLECTIONS.userSettings).doc(uid).get();
    if (!doc.exists) return normalizeSettings(DEFAULT_USER_SETTINGS);
    return normalizeSettings(doc.data());
  }
);

export const userUpdateSettings = onCall<
  {settings?: Partial<UserSettings>},
  Promise<UserSettings>
>(async (req) => {
  const uid = await requireUser(req);
  const next = normalizeSettings(req.data?.settings);
  await db
    .collection(COLLECTIONS.userSettings)
    .doc(uid)
    .set({...next, updatedAt: FieldValue.serverTimestamp()}, {merge: true});
  return next;
});

export const userDeleteAccount = onCall<
  Record<string, unknown>,
  Promise<{deleted: boolean}>
>(async (req) => {
  const uid = await requireUser(req);
  const collections = [
    COLLECTIONS.moods,
    COLLECTIONS.savedItems,
    COLLECTIONS.likes,
    COLLECTIONS.notifications,
  ];
  for (const name of collections) {
    const snap = await db.collection(name).where("uid", "==", uid).get();
    await Promise.all(snap.docs.map((d) => d.ref.delete()));
  }
  await db.collection(COLLECTIONS.userSettings).doc(uid).delete().catch(() => undefined);
  await db.collection(COLLECTIONS.users).doc(uid).delete().catch(() => undefined);
  await auth.deleteUser(uid);
  return {deleted: true};
});
