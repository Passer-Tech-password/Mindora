"use client";

import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import { getStorage } from "firebase/storage";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let initialized = false;

const requiredKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

type EnvKey = (typeof requiredKeys)[number];

function readConfig(): FirebaseOptions | null {
  if (typeof window === "undefined") {
    const env = process.env as Partial<Record<EnvKey, string>>;
    const missing = requiredKeys.filter((k) => !env[k]);
    if (missing.length > 0) return null;
    return {
      apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
  }
  const win = window as unknown as { __ENV__?: Partial<Record<EnvKey, string>> };
  const env: Partial<Record<EnvKey, string>> = {};
  for (const k of requiredKeys) {
    const v =
      win.__ENV__?.[k] ??
      (process.env as Partial<Record<EnvKey, string>>)[k];
    if (!v) return null;
    env[k] = v;
  }
  return {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };
}

export function isFirebaseConfigured(): boolean {
  return readConfig() !== null;
}

function ensureInit(): { ok: boolean } {
  if (initialized) return { ok: !!app };
  initialized = true;
  const config = readConfig();
  if (!config) return { ok: false };
  try {
    app = getApps().length ? getApp() : initializeApp(config);
    auth = getAuth(app);
    firestore = getFirestore(app);
    storage = getStorage(app);
    return { ok: true };
  } catch {
    app = null;
    auth = null;
    firestore = null;
    storage = null;
    return { ok: false };
  }
}

export function getFirebaseApp(): FirebaseApp | null {
  ensureInit();
  return app;
}

export function getFirebaseAuth(): Auth | null {
  ensureInit();
  return auth;
}

export function getFirebaseFirestore(): Firestore | null {
  ensureInit();
  return firestore;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  ensureInit();
  return storage;
}

export const COLLECTIONS = {
  users: "users",
  posts: "posts",
  comments: "comments",
  likes: "likes",
  reports: "reports",
  communityChallenges: "communityChallenges",
  notifications: "notifications",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
