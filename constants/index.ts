import type { Mood, AudioTrack, Category, FeatureItem, StepItem, ValueItem } from "@/types";

export const APP_PATHS: string[] = [
  "/dashboard",
  "/profile",
  "/settings",
  "/mood-history",
  "/saved",
  "/admin",
];

export function startsWithAppPath(path: string): boolean {
  return APP_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

export interface LabelledLink {
  href: string;
  label: string;
  comingSoon?: boolean;
}

export const navLinks: LabelledLink[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/community", label: "Community" },
  { href: "/premium", label: "Premium" },
  { href: "/about", label: "About" },
];

export const footerLinks: {
  product: LabelledLink[];
  company: LabelledLink[];
  support: LabelledLink[];
} = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/premium", label: "Premium" },
    { href: "/community", label: "Explore" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/about", label: "Our Story" },
    { href: "/about", label: "Careers", comingSoon: true },
    { href: "/about", label: "Blog", comingSoon: true },
    { href: "/about", label: "Contact", comingSoon: true },
  ],
  support: [
    { href: "#", label: "Help Center", comingSoon: true },
    { href: "#", label: "Community Guidelines", comingSoon: true },
    { href: "#", label: "Privacy Policy", comingSoon: true },
    { href: "#", label: "Terms of Service", comingSoon: true },
  ],
};

export const socialLinks: (LabelledLink & { platform: "twitter" | "instagram" | "linkedin" | "facebook" })[] = [
  { href: "#", label: "Twitter", platform: "twitter", comingSoon: true },
  { href: "#", label: "Instagram", platform: "instagram", comingSoon: true },
  { href: "#", label: "LinkedIn", platform: "linkedin", comingSoon: true },
  { href: "#", label: "Facebook", platform: "facebook", comingSoon: true },
];

export const moods: Mood[] = [
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    color: "#D9B86C",
    bgColor: "rgba(217, 184, 108, 0.14)",
    message:
      "Wonderful! Savor this feeling — what made today bright? Writing it down helps you return here again.",
  },
  {
    id: "calm",
    label: "Calm",
    emoji: "😌",
    color: "#5B3FA8",
    bgColor: "rgba(91, 63, 168, 0.12)",
    message:
      "A peaceful moment. Breathe it in — this quiet is exactly where healing and clarity grow.",
  },
  {
    id: "low",
    label: "Low",
    emoji: "😔",
    color: "#766D80",
    bgColor: "rgba(118, 109, 128, 0.12)",
    message:
      "Low days are valid. You don't have to fix it all at once. Even one kind breath is a small win.",
  },
  {
    id: "anxious",
    label: "Anxious",
    emoji: "😰",
    color: "#6D3FE8",
    bgColor: "rgba(109, 63, 232, 0.12)",
    message:
      "Let's slow it down. Try the 4-7-8 breathing in the Audio tab — your nervous system will thank you.",
  },
  {
    id: "tired",
    label: "Tired",
    emoji: "😴",
    color: "#B9A5E8",
    bgColor: "rgba(185, 165, 232, 0.2)",
    message:
      "Your body and mind are asking for rest. Tonight, try the Night or Rain sounds — they'll meet you there.",
  },
  {
    id: "stressed",
    label: "Stressed",
    emoji: "😡",
    color: "#5B3FA8",
    bgColor: "rgba(91, 63, 168, 0.14)",
    message:
      "That pressure is real. Pause, step back if you can, and pick one tiny thing — just one — that feels doable.",
  },
];

export const affirmations = [
  {
    id: "aff-1",
    text: "You are doing better than you think.",
    category: "Self Love",
  },
  {
    id: "aff-2",
    text: "Small steps still move mountains.",
    category: "Motivation",
  },
  {
    id: "aff-3",
    text: "You are allowed to rest and breathe.",
    category: "Anxiety Relief",
  },
  {
    id: "aff-4",
    text: "Your feelings are valid, even the messy ones.",
    category: "Self Love",
  },
  {
    id: "aff-5",
    text: "Today you are learning how to carry tomorrow.",
    category: "Confidence",
  },
  {
    id: "aff-6",
    text: "Peace begins with a single, kind breath.",
    category: "Better Sleep",
  },
];

export const audioTracks: AudioTrack[] = [
  {
    id: "rain",
    title: "Rain",
    description: "Gentle rain over a window of lavender fields.",
    category: "ambient",
    durationSeconds: 60 * 45,
    coverGradient: "from-[#5B3FA8] to-[#24143D]",
    isPremium: false,
  },
  {
    id: "ocean",
    title: "Ocean",
    description: "Slow waves washing warm sand at golden hour.",
    category: "ambient",
    durationSeconds: 60 * 60,
    coverGradient: "from-[#6D3FE8] to-[#B9A5E8]",
    isPremium: false,
  },
  {
    id: "forest",
    title: "Forest",
    description: "Soft wind through pine and distant birdsong.",
    category: "ambient",
    durationSeconds: 60 * 50,
    coverGradient: "from-[#B9A5E8] to-[#5B3FA8]",
    isPremium: false,
  },
  {
    id: "night",
    title: "Night",
    description: "A quiet, starry night with distant crickets.",
    category: "ambient",
    durationSeconds: 60 * 55,
    coverGradient: "from-[#24143D] to-[#6D3FE8]",
    isPremium: true,
  },
  {
    id: "breathing",
    title: "Breathing",
    description: "Guided 4-7-8 breathing with soft chimes.",
    category: "breathing",
    durationSeconds: 60 * 8,
    coverGradient: "from-[#D9B86C] to-[#5B3FA8]",
    isPremium: false,
  },
  {
    id: "piano",
    title: "Piano",
    description: "Soft, warm piano drifting through lavender rooms.",
    category: "meditation",
    durationSeconds: 60 * 30,
    coverGradient: "from-[#F0EAFB] to-[#B9A5E8]",
    isPremium: true,
  },
];

export const exploreCategories: Category[] = [
  {
    id: "self-love",
    name: "Self Love",
    icon: "heart",
    gradient: "from-[#B9A5E8] via-[#F0EAFB] to-[#FCFAFF]",
    description: "Gentle practices to be kind to yourself.",
  },
  {
    id: "anxiety-relief",
    name: "Anxiety Relief",
    icon: "wind",
    gradient: "from-[#D9B86C]/30 via-[#F0EAFB] to-[#FCFAFF]",
    description: "Breathing tools and calm for worry-filled days.",
  },
  {
    id: "better-sleep",
    name: "Better Sleep",
    icon: "moon",
    gradient: "from-[#5B3FA8]/20 via-[#F0EAFB] to-[#FCFAFF]",
    description: "Stories and sounds to help you drift peacefully.",
  },
  {
    id: "motivation",
    name: "Motivation",
    icon: "sparkles",
    gradient: "from-[#D9B86C]/40 via-[#F0EAFB] to-[#FCFAFF]",
    description: "A gentle nudge forward when you need it most.",
  },
  {
    id: "confidence",
    name: "Confidence",
    icon: "zap",
    gradient: "from-[#6D3FE8]/20 via-[#F0EAFB] to-[#FCFAFF]",
    description: "Stand tall in who you are becoming.",
  },
];

export const communityCategories: Category[] = [
  {
    id: "daily-wins",
    name: "Daily Wins",
    icon: "trophy",
    gradient: "from-[#D9B86C]/20 to-[#F0EAFB]",
  },
  {
    id: "self-love",
    name: "Self Love",
    icon: "heart",
    gradient: "from-[#B9A5E8]/30 to-[#F0EAFB]",
  },
  {
    id: "anxiety-support",
    name: "Anxiety Support",
    icon: "shield",
    gradient: "from-[#6D3FE8]/15 to-[#F0EAFB]",
  },
  {
    id: "motivation",
    name: "Motivation",
    icon: "sparkles",
    gradient: "from-[#D9B86C]/30 to-[#F0EAFB]",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    icon: "sunrise",
    gradient: "from-[#B9A5E8]/30 to-[#F0EAFB]",
  },
];

export const features: FeatureItem[] = [
  {
    id: "mood-checkins",
    title: "Mood Check-ins",
    description:
      "A 10-second check-in builds awareness of how you really feel — without judgment.",
    icon: "smile",
    bullets: [
      "Six moods to match your moment",
      "Private notes and reflections",
      "Weekly and monthly patterns",
      "Exportable, always yours",
    ],
  },
  {
    id: "daily-affirmations",
    title: "Daily Affirmations",
    description:
      "Beautiful words to reset your mind — curated and personalized to your mood.",
    icon: "quote",
    bullets: [
      "Personalized to your day",
      "Save favorites for hard days",
      "Share with someone you love",
      "Listen in a calming voice",
    ],
  },
  {
    id: "calming-audio",
    title: "Calming Audio",
    description:
      "Sleep sounds, meditations, and breathing — ready the moment you press play.",
    icon: "headphones",
    bullets: [
      "Rain, Ocean, Forest, Night, Piano",
      "Guided breathing sessions",
      "Background playback",
      "Sleep timer and fade-out",
    ],
  },
  {
    id: "positive-community",
    title: "Positive Community",
    description:
      "A calm, moderated place to share wins, ask for support, and encourage others.",
    icon: "users",
    bullets: [
      "Anonymous posting available",
      "Moderated, safe categories",
      "Report and block tools",
      "Kindness-first guidelines",
    ],
  },
  {
    id: "daily-streaks",
    title: "Daily Streaks",
    description:
      "Consistency builds habits. Gentle streaks celebrate your showing up.",
    icon: "flame",
    bullets: [
      "Daily, weekly, monthly views",
      "Flexible grace days",
      "Celebration moments",
      "No shame. Just encouragement.",
    ],
  },
  {
    id: "saved-content",
    title: "Saved Content",
    description:
      "Pin the affirmations and tracks that mean the most — always within reach.",
    icon: "bookmark",
    bullets: [
      "Unlimited saves with Premium",
      "Folders and tags",
      "Offline-ready",
      "Personalized library",
    ],
  },
  {
    id: "personalized",
    title: "Personalized Experience",
    description:
      "Mindora learns what helps and surfaces it when you're likely to need it.",
    icon: "sparkles",
    bullets: [
      "Mood-matched content",
      "Gentle reminders at your times",
      "Custom home widgets",
      "Private by default",
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    description:
      "Your mind is safe here. End-to-end encryption philosophy, zero selling data.",
    icon: "shield-check",
    bullets: [
      "Account protected by Firebase Auth",
      "Data only yours, never sold",
      "Fine-grained privacy controls",
      "Transparent practices",
    ],
  },
];

export const steps: StepItem[] = [
  {
    id: "step-1",
    number: "01",
    title: "Check In",
    description: "Tell Mindora how you're feeling — it only takes a moment.",
    icon: "smile-plus",
  },
  {
    id: "step-2",
    number: "02",
    title: "Receive",
    description: "Get your daily affirmation — written just for where you are.",
    icon: "sparkles",
  },
  {
    id: "step-3",
    number: "03",
    title: "Reset",
    description: "Use calming audio and breathing tools to find your calm.",
    icon: "headphones",
  },
  {
    id: "step-4",
    number: "04",
    title: "Connect",
    description: "Share a win and encourage someone else in the community.",
    icon: "users",
  },
  {
    id: "step-5",
    number: "05",
    title: "Grow",
    description: "Build your daily streak and watch the habits compound.",
    icon: "flame",
  },
];

export const values: ValueItem[] = [
  {
    id: "empathy",
    title: "Empathy First",
    description:
      "Every line, color, and feature is shaped by asking: how would this feel to someone having a hard day?",
    icon: "heart-handshake",
  },
  {
    id: "trust",
    title: "Trust & Safety",
    description:
      "Privacy is non-negotiable. Your data stays yours, our community stays kind, and moderation never sleeps.",
    icon: "shield-check",
  },
  {
    id: "community",
    title: "Authentic Community",
    description:
      "No influencers, no clout-chasing. Just humans showing up honestly for each other.",
    icon: "users",
  },
  {
    id: "growth",
    title: "Growth Mindset",
    description:
      "Small daily steps beat overnight transformations. We celebrate the steady, messy, beautiful middle.",
    icon: "sprout",
  },
  {
    id: "positivity",
    title: "Positivity Always",
    description:
      "Not toxic positivity — warm, grounded, real optimism that meets you exactly where you are.",
    icon: "sunrise",
  },
];

export const benefitsHome = [
  {
    id: "b1",
    title: "Mood Check-ins",
    description: "Understand how you feel in seconds.",
    icon: "smile",
  },
  {
    id: "b2",
    title: "Daily Affirmations",
    description: "Beautiful words to reset your mind.",
    icon: "quote",
  },
  {
    id: "b3",
    title: "Calming Audio",
    description: "Sleep sounds, meditation and breathing.",
    icon: "headphones",
  },
  {
    id: "b4",
    title: "Positive Community",
    description: "Share, connect and grow.",
    icon: "users",
  },
];

export const premiumBenefits = [
  "Full affirmation library",
  "Exclusive calming sounds",
  "Advanced content",
  "Ad-free experience",
  "Offline access",
  "Unlimited saves",
];
