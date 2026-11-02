import type { FAQItem, TeamMember } from "@/types";

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
