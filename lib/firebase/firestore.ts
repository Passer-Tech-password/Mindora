"use client";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type Firestore,
} from "firebase/firestore";
import type {
  Comment,
  Post,
  Subscription,
  User,
} from "@/types";
import {
  COLLECTIONS,
  getFirebaseFirestore,
  isFirebaseConfigured,
} from "./config";

type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function dbOrNull(): Firestore | null {
  return isFirebaseConfigured() ? getFirebaseFirestore() : null;
}

const PROTECTED_USER_FIELDS = [
  "subscriptionStatus",
  "role",
  "admin",
] as const;

function stripProtectedFields<T extends Record<string, unknown>>(
  data: T
): Partial<T> {
  const clean = { ...data };
  for (const key of PROTECTED_USER_FIELDS) {
    delete clean[key];
  }
  return clean;
}

export async function createUserDoc(user: User): Promise<Result<User>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const cleanedRaw = stripProtectedFields(
      user as unknown as Record<string, unknown>
    );
    const cleaned = cleanedRaw as unknown as User;
    const payload: Record<string, unknown> = {
      ...cleanedRaw,
      createdAt: Timestamp.fromDate(
        typeof cleaned.createdAt === "string"
          ? new Date(cleaned.createdAt)
          : (cleaned.createdAt as Date)
      ),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, COLLECTIONS.users, user.uid), payload);
    return { ok: true, data: cleaned };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function getUserDoc(uid: string): Promise<Result<User | null>> {
  const db = dbOrNull();
  if (!db) return { ok: true, data: null };
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.users, uid));
    if (!snap.exists()) return { ok: true, data: null };
    return { ok: true, data: { ...snap.data(), uid } as User };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function updateUserDoc(
  uid: string,
  updates: Partial<User>
): Promise<Result<true>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const safe = stripProtectedFields(updates) as Partial<User>;
    await updateDoc(doc(db, COLLECTIONS.users, uid), {
      ...safe,
      updatedAt: serverTimestamp(),
    } as Record<string, unknown>);
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "likesCount" | "commentsCount">
): Promise<Result<Post>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const ref = await addDoc(collection(db, COLLECTIONS.posts), {
      ...post,
      createdAt: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
    });
    return {
      ok: true,
      data: {
        ...post,
        id: ref.id,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
      },
    };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function getPosts(opts?: {
  category?: string;
  limitCount?: number;
}): Promise<Result<Post[]>> {
  const db = dbOrNull();
  if (!db) return { ok: true, data: [] };
  try {
    const q = query(
      collection(db, COLLECTIONS.posts),
      ...(opts?.category ? [where("category", "==", opts.category)] : []),
      orderBy("createdAt", "desc"),
      limit(opts?.limitCount ?? 20)
    );
    const snap = await getDocs(q);
    const rows: Post[] = [];
    snap.forEach((d) => {
      const data = d.data() as Omit<Post, "id">;
      rows.push({ ...data, id: d.id });
    });
    return { ok: true, data: rows };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function addComment(
  comment: Omit<Comment, "id" | "createdAt" | "likesCount">
): Promise<Result<Comment>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const result = await runTransaction(db, async (tx) => {
      const postRef = doc(db, COLLECTIONS.posts, comment.postId);
      const postSnap = await tx.get(postRef);
      if (!postSnap.exists()) throw new Error("Post not found.");
      const ref = doc(collection(db, COLLECTIONS.comments));
      tx.set(ref, {
        ...comment,
        createdAt: serverTimestamp(),
        likesCount: 0,
      });
      tx.update(postRef, {
        commentsCount: increment(1),
        updatedAt: serverTimestamp(),
      });
      return ref.id;
    });
    return {
      ok: true,
      data: {
        ...comment,
        id: result,
        createdAt: new Date().toISOString(),
        likesCount: 0,
      },
    };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function toggleLike(params: {
  postId: string;
  userId: string;
}): Promise<Result<{ liked: boolean; likesCount: number }>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const likeDocId = `${params.userId}_${params.postId}`;
    const likeDoc = doc(db, COLLECTIONS.likes, likeDocId);
    const postDoc = doc(db, COLLECTIONS.posts, params.postId);

    const out = await runTransaction(db, async (tx) => {
      const snap = await tx.get(likeDoc);
      const postSnap = await tx.get(postDoc);
      if (!postSnap.exists()) throw new Error("Post not found.");
      const current = (postSnap.data()?.likesCount as number) ?? 0;
      if (snap.exists()) {
        tx.delete(likeDoc);
        tx.update(postDoc, { likesCount: Math.max(0, current - 1) });
        return { liked: false, likesCount: Math.max(0, current - 1) };
      }
      tx.set(likeDoc, {
        postId: params.postId,
        userId: params.userId,
        createdAt: serverTimestamp(),
      });
      tx.update(postDoc, { likesCount: current + 1 });
      return { liked: true, likesCount: current + 1 };
    });
    return { ok: true, data: out };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function createReport(params: {
  targetType: "post" | "comment" | "user";
  targetId: string;
  reporterId: string;
  reason: string;
  details?: string;
}): Promise<Result<true>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    await addDoc(collection(db, COLLECTIONS.reports), {
      ...params,
      createdAt: serverTimestamp(),
      status: "pending",
    });
    return { ok: true, data: true };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}

export async function createSubscriptionRecord(
  sub: Omit<Subscription, "id">
): Promise<Result<Subscription>> {
  const db = dbOrNull();
  if (!db) return { ok: false, error: "Firestore not configured." };
  try {
    const ref = await addDoc(collection(db, "subscriptions"), {
      ...sub,
      startedAt: serverTimestamp(),
      expiresAt: serverTimestamp(),
    });
    return { ok: true, data: { ...sub, id: ref.id } };
  } catch (e) {
    return { ok: false, error: (e as { message: string }).message };
  }
}
