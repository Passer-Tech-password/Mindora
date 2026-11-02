import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mindora.app";
  const now = new Date();

  const marketing = [
    { route: "/", freq: "weekly" as const, priority: 1 },
    { route: "/features", freq: "monthly" as const, priority: 0.7 },
    { route: "/how-it-works", freq: "monthly" as const, priority: 0.7 },
    { route: "/community", freq: "monthly" as const, priority: 0.7 },
    { route: "/premium", freq: "monthly" as const, priority: 0.7 },
    { route: "/about", freq: "monthly" as const, priority: 0.7 },
    { route: "/blog", freq: "weekly" as const, priority: 0.6 },
    { route: "/careers", freq: "monthly" as const, priority: 0.6 },
    { route: "/contact", freq: "monthly" as const, priority: 0.6 },
    { route: "/help-center", freq: "monthly" as const, priority: 0.5 },
    { route: "/privacy-policy", freq: "yearly" as const, priority: 0.4 },
    { route: "/terms-of-service", freq: "yearly" as const, priority: 0.4 },
    { route: "/community-guidelines", freq: "yearly" as const, priority: 0.4 },
    { route: "/login", freq: "monthly" as const, priority: 0.7 },
    { route: "/signup", freq: "monthly" as const, priority: 0.7 },
  ];

  return marketing.map((m) => ({
    url: `${baseUrl}${m.route}`,
    lastModified: now,
    changeFrequency: m.freq,
    priority: m.priority,
  }));
}
