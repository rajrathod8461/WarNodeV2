import type { MetadataRoute } from "next"
import { siteMetadata } from "./lib/site-metadata"

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/vps", priority: 0.9, changeFrequency: "weekly" },
  { path: "/games", priority: 0.9, changeFrequency: "weekly" },
  { path: "/web-hosting", priority: 0.9, changeFrequency: "weekly" },
  { path: "/discord-bot", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ddos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/dedicated", priority: 0.7, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "/policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.4, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.url

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
