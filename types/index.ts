export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  subscriptionStatus: "free" | "premium" | "expired";
  streak: number;
  lastMood?: string;
  onboardingCompleted: boolean;
}

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  message: string;
}

export interface Affirmation {
  id: string;
  text: string;
  category: string;
  audioUrl?: string;
  saved?: boolean;
}

export interface AudioTrack {
  id: string;
  title: string;
  description: string;
  category: "ambient" | "meditation" | "breathing";
  durationSeconds: number;
  coverGradient: string;
  isPremium: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName?: string;
  isAnonymous: boolean;
  category: string;
  content: string;
  createdAt: Date | string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  isAnonymous: boolean;
  content: string;
  createdAt: Date | string;
  likesCount: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "monthly" | "yearly";
  status: "active" | "cancelled" | "expired";
  startedAt: Date | string;
  expiresAt: Date | string;
  pricePaid: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  description?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  description: string;
  features: string[];
  highlight: boolean;
  badgeText?: string;
  cta: string;
}

export interface StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  initials: string;
  role: string;
  bio: string;
}
