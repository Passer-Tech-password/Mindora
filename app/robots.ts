import type { MetadataRoute } from "next";

// TODO: Replace with your actual production site URL
const SITE_URL = "https://mindora.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
