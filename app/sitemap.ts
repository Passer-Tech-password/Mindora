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
