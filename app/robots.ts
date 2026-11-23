import type { MetadataRoute } from "next"
import { siteMetadata } from "./lib/site-metadata"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
      },
      {
        userAgent: ["CCBot", "cohere-ai"],
        disallow: "/",
      },
    ],
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  }
}
