"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  type Auth,
  type User as FbUser,
} from "firebase/auth";
import type { User } from "@/types";
import {
  COLLECTIONS,
  getFirebaseAuth,
  getFirebaseFirestore,
  isFirebaseConfigured,
} from "./config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string; code?: string };

function toUser(u: FbUser, extra?: Partial<User>): User {
  const name = u.displayName?.split(" ") ?? [];
  return {
    uid: u.uid,
    firstName: extra?.firstName ?? name[0] ?? "",
    lastName: extra?.lastName ?? name.slice(1).join(" ") ?? "",
    email: u.email ?? "",
    photoURL: u.photoURL ?? undefined,
    createdAt: extra?.createdAt ?? new Date(),
    updatedAt: new Date(),
    subscriptionStatus: extra?.subscriptionStatus ?? "free",
    streak: extra?.streak ?? 0,
    lastMood: extra?.lastMood ?? undefined,
    onboardingCompleted: extra?.onboardingCompleted ?? false,
  };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!isFirebaseConfigured()) {
    return { ok: false, error: "Firebase is not configured." };
  }
  try {
    const auth = getFirebaseAuth() as Auth;
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const db = getFirebaseFirestore();
    let user: User = toUser(cred.user);
    if (db) {
      const snap = await getDoc(doc(db, COLLECTIONS.users, cred.user.uid));
      if (snap.exists()) {
        const data = snap.data() as Partial<User>;
        user = { ...user, ...data, uid: cred.user.uid, email: cred.user.email ?? user.email };
      }
    }
    return { ok: true, user };
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    return {
      ok: false,
      code: err.code,
      error: err.message ?? "Unable to sign in.",
    };
  }
}

export async function signUpWithEmail(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<AuthResult> {
  if (!isFirebaseConfigured()) {
    return { ok: false, error: "Firebase is not configured." };
  }
  try {
    const auth = getFirebaseAuth() as Auth;
    const cred = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    const displayName = [input.firstName, input.lastName].filter(Boolean).join(" ");
    if (displayName && cred.user) {
      await updateProfile(cred.user, { displayName });
    }
    const db = getFirebaseFirestore();
    const userDoc: User = toUser(cred.user, {
      firstName: input.firstName,
      lastName: input.lastName,
      subscriptionStatus: "free",
      streak: 0,
      onboardingCompleted: false,
      createdAt: new Date(),
    });
    if (db) {
      await setDoc(doc(db, COLLECTIONS.users, cred.user.uid), {
        ...userDoc,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return { ok: true, user: userDoc };
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string };
    return {
      ok: false,
      code: err.code,
      error: err.message ?? "Unable to create account.",
    };
  }
}

export async function signOut(): Promise<{ ok: boolean; error?: string }> {
  if (!isFirebaseConfigured()) return { ok: true };
  try {
    const auth = getFirebaseAuth();
    if (auth) await fbSignOut(auth);
    return { ok: true };
  } catch (e: unknown) {
    const err = e as { message?: string };
    return { ok: false, error: err.message };
  }
}

export function onAuthStateChange(
  listener: (user: User | null) => void
): () => void {
  if (!isFirebaseConfigured()) {
    listener(null);
    return () => {};
  }
  const auth = getFirebaseAuth();
  if (!auth) {
    listener(null);
    return () => {};
  }
  return onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) {
      listener(null);
      return;
    }
    const db = getFirebaseFirestore();
    if (!db) {
      listener(toUser(fbUser));
      return;
    }
    try {
      const snap = await getDoc(doc(db, COLLECTIONS.users, fbUser.uid));
      if (snap.exists()) {
        const data = snap.data() as Partial<User>;
        listener({ ...toUser(fbUser), ...data, uid: fbUser.uid });
      } else {
        listener(toUser(fbUser));
      }
    } catch {
      listener(toUser(fbUser));
    }
  });
}
