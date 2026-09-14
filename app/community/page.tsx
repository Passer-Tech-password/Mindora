import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CommunityClient } from "@/components/home/CommunityClient";
import { Heart, Users, Play, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Community | Mindora — You Don't Have to Grow Alone",
  description:
    "Mindora Community is a safe, positive space where real people share wins, encourage each other, and grow together. Anonymous, moderated, and kind — always.",
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "Community | Mindora — You Don't Have to Grow Alone",
    description:
      "A safe anonymous space. Share, support, celebrate. Join thousands of kind souls lifting each other up every day.",
    type: "website",
    locale: "en_US",
    siteName: "Mindora",
  },
};

export default function CommunityPage() {
  return (
    <div className="flex-1">
      <section className="relative isolate overflow-hidden pt-24 md:pt-28 pb-10 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-softLavender/60 via-softLavender/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[380px] w-[380px] rounded-full bg-brightPurple/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[420px] w-[520px]"
        >
          <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M120 310C60 280 20 220 40 160C60 100 120 60 200 60C280 60 340 20 400 50C460 80 490 160 480 230C470 300 420 340 350 340L170 340C150 340 130 330 120 310Z"
              fill="url(#heartGradient)"
              fillOpacity="0.35"
            />
            <defs>
              <radialGradient id="heartGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(260 190) rotate(90) scale(190 260)">
                <stop stopColor="#C9B8F3" />
                <stop offset="1" stopColor="#6D3FE8" stopOpacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-lavender/50 px-4 py-1.5 text-xs md:text-sm font-medium text-primaryPurple mb-6 backdrop-blur-sm">
                <Heart className="h-3.5 w-3.5 fill-brightPurple/60 text-brightPurple" />
                Community
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold tracking-tight text-brandText leading-[1.05]">
                You don&apos;t have to{" "}
                <span className="bg-gradient-to-r from-primaryPurple via-brightPurple to-lavender bg-clip-text text-transparent">
                  grow alone.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-brandSecondaryText leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mindora Community is a safe, positive space where real people
                share wins, encourage each other, and grow together.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  rightIcon={<Sparkles className="h-4 w-4 ml-1" />}
                >
                  <Link href="/signup">Join the Community</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/how-it-works">
                    <Play className="h-4 w-4 mr-2 fill-brandText/20" />
                    How it works
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto max-w-xl w-full">
              <div aria-hidden className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-white/80 border border-lavender/50 flex items-center justify-center shadow-card animate-float">
                <Heart className="h-7 w-7 text-brightPurple fill-brightPurple/50" />
              </div>
              <div aria-hidden className="absolute -top-8 right-10 h-12 w-12 rounded-full bg-white/80 border border-lavender/50 flex items-center justify-center shadow-card animate-float [animation-delay:1.2s]">
                <Sparkles className="h-5 w-5 text-softGold" />
              </div>
              <div aria-hidden className="absolute top-1/3 -right-2 h-16 w-16 rounded-full bg-white/80 border border-lavender/50 flex items-center justify-center shadow-card animate-float [animation-delay:0.6s]">
                <Users className="h-7 w-7 text-primaryPurple" />
              </div>

              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-lavender/40 via-softLavender to-brightPurple/20 p-8 md:p-10 shadow-soft border border-white/60 backdrop-blur-sm">
                <svg viewBox="0 0 420 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="bgPurple" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#E0E7FF" />
                      <stop offset="1" stopColor="#F3EDFF" />
                    </linearGradient>
                    <linearGradient id="hair1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#1a0f30" />
                      <stop offset="1" stopColor="#3B1F6B" />
                    </linearGradient>
                    <linearGradient id="hair2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#4B1D10" />
                      <stop offset="1" stopColor="#2B1109" />
                    </linearGradient>
                    <linearGradient id="hair3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#5B3A26" />
                      <stop offset="1" stopColor="#3D2414" />
                    </linearGradient>
                    <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#F7D9BC" />
                      <stop offset="1" stopColor="#E9B997" />
                    </linearGradient>
                    <linearGradient id="skinDark" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#8C5A3C" />
                      <stop offset="1" stopColor="#5D3B27" />
                    </linearGradient>
                    <linearGradient id="skinMed" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#D4A27C" />
                      <stop offset="1" stopColor="#A97855" />
                    </linearGradient>
                  </defs>

                  <ellipse cx="210" cy="270" rx="160" ry="18" fill="url(#bgPurple)" />

                  <g transform="translate(30,55)">
                    <path d="M40 78 C 34 46, 72 16, 106 24 C 130 12, 176 22, 178 70 L 178 158 C 178 182, 158 194, 134 194 L 76 194 C 50 194, 34 182, 34 158 L 34 78 Z" fill="url(#hair1)" />
                    <circle cx="106" cy="96" r="40" fill="url(#skin)" />
                    <ellipse cx="88" cy="98" rx="3" ry="4" fill="#2B1B3C" />
                    <ellipse cx="124" cy="98" rx="3" ry="4" fill="#2B1B3C" />
                    <path d="M88 112 Q106 126 124 112" stroke="#8A5577" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M52 180 C 38 210, 56 250, 106 256 C 118 258 138 256, 148 248 L 148 208 C 132 208 118 212 106 212 C 90 212 72 206 62 200 Z" fill="#6D3FE8" />
                  </g>

                  <g transform="translate(130,35)">
                    <ellipse cx="72" cy="26" rx="44" ry="36" fill="url(#hair2)" />
                    <path d="M72 4 C 88 -8, 122 -6, 128 20 C 140 10, 160 22, 160 50 L 160 86 C 154 68, 134 58, 112 60 C 98 54, 78 54, 54 64 C 42 58, 30 66, 24 82 L 24 50 C 24 24, 44 8, 72 4 Z" fill="url(#hair2)" />
                    <circle cx="92" cy="82" r="40" fill="url(#skinDark)" />
                    <ellipse cx="78" cy="84" rx="3" ry="4" fill="#1E0E1C" />
                    <ellipse cx="106" cy="84" rx="3" ry="4" fill="#1E0E1C" />
                    <path d="M78 102 Q 92 116 106 102" stroke="#5E2E4A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M28 168 C 12 232, 80 274, 156 268 L 156 204 C 142 198, 128 192, 112 190 C 88 188, 68 192, 46 202 C 36 196, 30 184, 28 168 Z" fill="#F2C166" />
                    <rect x="34" y="180" width="124" height="6" rx="3" fill="#D9A54A" />
                  </g>

                  <g transform="translate(220,55)">
                    <path d="M24 64 C 18 46, 38 20, 62 20 C 82 8, 112 8, 128 26 C 162 24, 180 58, 172 84 L 172 160 C 172 182, 156 196, 132 196 L 64 196 C 44 196, 28 182, 24 160 L 24 64 Z" fill="#5B3A26" opacity="0" />
                    <path d="M42 40 C 34 50, 36 70, 44 80 L 44 140 C 44 172, 64 190, 98 190 C 134 190, 154 170, 154 140 L 154 80 C 162 66, 160 50, 154 40 C 148 22, 132 14, 116 16 C 114 8, 100 0, 86 0 C 72 0, 58 8, 56 16 C 40 14, 48 30, 42 40 Z" fill="#5B3A26" />
                    <circle cx="99" cy="84" r="36" fill="url(#skinMed)" />
                    <path d="M72 40 C 66 56, 70 80, 92 94 L 92 88 C 88 76, 88 64, 94 56 L 78 68 C 74 56, 76 44, 86 38 Z" fill="#3D2414" />
                    <ellipse cx="86" cy="86" rx="3" ry="4" fill="#2B1833" />
                    <ellipse cx="112" cy="86" rx="3" ry="4" fill="#2B1833" />
                    <path d="M86 102 Q 99 114 112 102" stroke="#7A4A66" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M38 180 C 20 240, 80 274, 150 264 L 150 202 C 132 196, 118 194, 98 194 C 78 194, 60 198, 46 204 Z" fill="#52406B" />
                    <ellipse cx="98" cy="206" rx="32" ry="5" fill="#3D2F52" />
                    <path d="M66 246 L 130 246" stroke="#3D2F52" strokeWidth="4" strokeLinecap="round" />
                    <path d="M60 220 L 136 220" stroke="#3D2F52" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  <g transform="translate(298,70)">
                    <path d="M20 62 C 14 40, 30 16, 52 14 C 70 4, 100 4, 116 22 C 144 20, 162 50, 154 78 L 154 156 C 154 180, 136 196, 110 196 L 50 196 C 30 196, 18 180, 14 158 L 14 62 Z" fill="url(#hair3)" opacity="0" />
                    <path d="M10 72 C -8 36, 22 0, 66 0 C 94 -4, 132 18, 148 54 L 148 74 C 146 54, 128 38, 106 34 C 100 24, 86 16, 72 16 C 58 16, 46 24, 40 36 C 26 36, 14 48, 10 72 Z" fill="#8C5A3C" />
                    <circle cx="82" cy="82" r="34" fill="url(#skin)" />
                    <ellipse cx="68" cy="84" rx="3" ry="4" fill="#331B3E" />
                    <ellipse cx="96" cy="84" rx="3" ry="4" fill="#331B3E" />
                    <path d="M68 100 Q 82 114 96 100" stroke="#926580" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M20 186 C 8 226, 38 268, 92 272 C 126 268, 148 250, 148 214 L 148 204 C 126 196, 108 192, 92 192 C 74 192, 56 196, 36 204 C 28 200, 22 194, 20 186 Z" fill="#F39CA4" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CommunityClient />
    </div>
  );
}
