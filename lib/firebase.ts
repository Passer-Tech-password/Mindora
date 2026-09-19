import { getApp, getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  inMemoryPersistence,
  initializeAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  type Auth,
  type User,
  type UserCredential,
} from "firebase/auth";

type FirebaseClientConfig = FirebaseOptions & {
  measurementId?: string;
  databaseURL?: string;
};

const CLIENT_ENV_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
  "NEXT_PUBLIC_FIREBASE_DATABASE_URL",
] as const;

function readConfigEnv(): { config: FirebaseClientConfig; configured: boolean } {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? undefined;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? undefined;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? undefined;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? undefined;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? undefined;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? undefined;
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? undefined;
  const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? undefined;

  void CLIENT_ENV_KEYS;

  const configured =
    !!apiKey &&
    typeof apiKey === "string" &&
    apiKey.length > 0 &&
    !!authDomain &&
    !!projectId &&
    !!appId;

  return {
    config: {
      apiKey: apiKey ?? "placeholder-api-key",
      authDomain,
      projectId: projectId ?? "mindora-local",
      storageBucket,
      messagingSenderId,
      appId: appId ?? "1:0:web:0",
      measurementId,
      databaseURL,
    },
    configured,
  };
}

export interface FirebaseClientConnection {
  app: FirebaseApp | null;
  auth: Auth | null;
  configured: boolean;
  config: FirebaseClientConfig;
}

let cached: FirebaseClientConnection | null = null;

function createFirebase(): FirebaseClientConnection {
  const { config, configured } = readConfigEnv();

  if (typeof window === "undefined" || !configured) {
    return { app: null, auth: null, configured, config };
  }

  const installed = getApps().length > 0;
  const app: FirebaseApp = installed ? getApp() : initializeApp(config as FirebaseOptions);

  let auth: Auth;
  try {
    auth = getAuth(app);
  } catch {
    auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: undefined,
    });
  }

  const emulatorHost =
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST ||
    (globalThis as unknown as { __FIREBASE_AUTH_EMULATOR_HOST__?: string }).__FIREBASE_AUTH_EMULATOR_HOST__;

  if (emulatorHost) {
    try {
      connectAuthEmulator(auth, emulatorHost, { disableWarnings: true });
    } catch {
      /* emulator already connected on HMR */
    }
  }

  return { app, auth, configured, config };
}

export function getFirebase(): FirebaseClientConnection {
  if (!cached) cached = createFirebase();
  return cached;
}

export function resetFirebaseConnectionForTest() {
  cached = null;
}

export async function firebaseSignIn(email: string, password: string): Promise<User | null> {
  const { auth, configured } = getFirebase();
  if (!configured || !auth) return null;
  if (typeof window === "undefined") return null;
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch {
    try {
      await setPersistence(auth, inMemoryPersistence);
    } catch {
      /* ignore */
    }
  }
  const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function firebaseSignUp(email: string, password: string): Promise<User | null> {
  const { auth, configured } = getFirebase();
  if (!configured || !auth || typeof window === "undefined") return null;
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function firebaseSignOut(): Promise<void> {
  const { auth, configured } = getFirebase();
  if (!configured || !auth || typeof window === "undefined") return;
  try {
    await fbSignOut(auth);
  } catch {
    /* ignore */
  }
}
