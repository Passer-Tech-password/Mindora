import type { Post, Comment, FAQItem, PricingTier, TeamMember } from "@/types";

export const posts: Post[] = [
  {
    id: "p1",
    authorId: "u-1",
    isAnonymous: true,
    category: "daily-wins",
    content:
      "Today I made my bed AND drank a glass of water before scrolling. I know it's tiny, but for me it's a mountain. 🙏",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    likesCount: 284,
    commentsCount: 19,
  },
  {
    id: "p2",
    authorId: "u-2",
    isAnonymous: true,
    category: "anxiety-support",
    content:
      "Had to leave a meeting early today because my chest got tight. I felt like I failed. Then I breathed for 5 minutes in the car. One win: I didn't quit the day entirely. 💜",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likesCount: 512,
    commentsCount: 42,
  },
  {
    id: "p3",
    authorId: "u-3",
    isAnonymous: true,
    category: "gratitude",
    content:
      "Grateful for the way the rain sounds on my window tonight. Grateful for people here who understand that small is still something.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likesCount: 376,
    commentsCount: 14,
  },
  {
    id: "p4",
    authorId: "u-4",
    isAnonymous: true,
    category: "self-love",
    content:
      "Reminder: healing isn't a straight line and neither are you. Be gentle with the bends in your journey today.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    likesCount: 821,
    commentsCount: 31,
  },
  {
    id: "p5",
    authorId: "u-5",
    isAnonymous: true,
    category: "motivation",
    content:
      "You don't have to catch up on everything today. Just the thing in front of you — and if even that is too much, just breathing is enough.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    likesCount: 1042,
    commentsCount: 58,
  },
  {
    id: "p6",
    authorId: "u-6",
    isAnonymous: true,
    category: "daily-wins",
    content:
      "Today I reached out to a friend I hadn't spoken to in months. Scary. She said she'd been thinking about me too. 💛",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    likesCount: 618,
    commentsCount: 27,
  },
];

export const sampleComments: Comment[] = [
  {
    id: "c1",
    postId: "p2",
    authorId: "u-7",
    isAnonymous: true,
    content:
      "You did not fail. You chose yourself over a room full of expectations. That is a WIN.",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    likesCount: 68,
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can I cancel my Premium subscription anytime?",
    answer:
      "Yes. Your Premium subscription can be cancelled at any time from your Account settings. You'll continue to have access until the end of your billing period, with no hidden fees or penalties.",
  },
  {
    id: "faq-2",
    question: "What's included in Premium?",
    answer:
      "Premium unlocks the full affirmation library, exclusive calming audio (Night, Piano, and more), advanced mood insights and patterns, offline access, unlimited saves, and a completely ad-free experience.",
  },
  {
    id: "faq-3",
    question: "Is Mindora free to start?",
    answer:
      "Absolutely. The core of Mindora — daily mood check-ins, a rotating set of affirmations, and several audio tracks — is free forever. Premium is there whenever you're ready for more.",
  },
  {
    id: "faq-4",
    question: "Is my data private?",
    answer:
      "Yes. We never sell your data. Your check-ins, notes, and saved content are private by default and protected by Firebase security. You can export or delete your data anytime from Settings.",
  },
  {
    id: "faq-5",
    question: "Can I post anonymously in the community?",
    answer:
      "Yes. You can toggle anonymous posting on any post or comment. Your identity stays private while still letting you share, connect, and receive kindness from others.",
  },
  {
    id: "faq-6",
    question: "Does Mindora replace therapy or medical care?",
    answer:
      "No. Mindora is a wellness tool, not a substitute for professional medical or mental-health advice. If you're in crisis, please reach out to a local helpline or a qualified professional.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "tier-monthly",
    name: "Monthly",
    price: 4.99,
    period: "month",
    description: "Perfect for trying Premium for a month.",
    features: premiumBenefitsList(),
    highlight: false,
    cta: "Start Monthly",
  },
  {
    id: "tier-yearly",
    name: "Yearly",
    price: 39.99,
    period: "year",
    description: "Save 33% — the best value for daily Mindora.",
    features: premiumBenefitsList(),
    highlight: true,
    badgeText: "Best Value",
    cta: "Start Free Trial",
  },
];

function premiumBenefitsList(): string[] {
  return [
    "Full affirmation library",
    "Exclusive calming sounds (Night, Piano + more)",
    "Advanced mood insights & patterns",
    "Ad-free experience everywhere",
    "Offline access to saved content",
    "Unlimited saves & folders",
  ];
}

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    initials: "M",
    role: "Co-Founder",
    bio: "Believes a kinder world begins inside each of us, one small breath at a time.",
  },
  {
    id: "tm2",
    initials: "S",
    role: "Wellness Lead",
    bio: "Writes affirmations and curates audio that meet you exactly where you are.",
  },
  {
    id: "tm3",
    initials: "A",
    role: "Engineering Lead",
    bio: "Builds calm code for a calm product — privacy, safety, and reliability first.",
  },
  {
    id: "tm4",
    initials: "C",
    role: "Community Lead",
    bio: "Keeps our community warm, moderated, and welcoming for every voice.",
  },
];

export const weekStreakData = [true, true, true, true, true, true, true];

export const extendedStreakData = Array.from({ length: 14 }, (_, i) => i < 14);
