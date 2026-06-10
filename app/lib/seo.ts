import type { Metadata } from "next"
import { siteMetadata } from "./site-metadata"

type PageSeo = {
  title: string
  description: string
  path: string
}

export const pageSeo = {
  home: {
    title: siteMetadata.title,
    description:
      "Premium VPS Hosting, Web Hosting, Discord Bot Hosting, Minecraft Hosting and Game Servers powered by NVMe infrastructure and protected by WarShield DDoS Protection. Built for developers, businesses and gamers across India.",
    path: "/",
  },
  vps: {
    title: "VPS Hosting – AMD EPYC & Intel Xeon",
    description:
      "High-performance AMD EPYC and Intel Xeon VPS servers with NVMe storage, full root access and enterprise-grade reliability across India and Singapore.",
    path: "/vps",
  },
  webHosting: {
    title: "Web Hosting – LiteSpeed NVMe Hosting",
    description:
      "Fast NVMe-powered web hosting with LiteSpeed, free SSL, one-click applications and optimized performance for businesses and developers.",
    path: "/web-hosting",
  },
  games: {
    title: "Game Server Hosting – Instant Setup",
    description:
      "Reliable game servers with premium hardware, WarShield DDoS protection and instant setup for popular games including Minecraft and Hytale.",
    path: "/games",
  },
  minecraft: {
    title: "Minecraft Server Hosting India",
    description:
      "Low-latency Minecraft hosting with instant deployment, modpack support, Pterodactyl panel and powerful AMD EPYC and Intel Xeon hardware.",
    path: "/games?game=minecraft",
  },
  discordBot: {
    title: "Discord Bot Hosting – 24/7 Uptime",
    description:
      "Keep your Discord bots online 24/7 with reliable uptime, powerful resources, multi-language support and easy deployment.",
    path: "/discord-bot",
  },
  warShield: {
    title: "WarShield DDoS Protection",
    description:
      "Advanced network-level DDoS protection engineered to keep Minecraft and game services secure, stable and online across India and Singapore.",
    path: "/ddos",
  },
  contact: {
    title: "Contact WarNodes – Sales & Support",
    description:
      "Get assistance from the WarNodes team for sales, technical support, custom solutions and enterprise hosting requirements.",
    path: "/contact",
  },
  team: {
    title: "Our Team",
    description:
      "Meet the WarNodes team behind India's smoothest hosting experience — infrastructure, support and customer success.",
    path: "/team",
  },
  dedicated: {
    title: "Dedicated Servers",
    description:
      "Enterprise bare-metal dedicated servers for maximum performance, custom hardware and managed infrastructure.",
    path: "/dedicated",
  },
  terms: {
    title: "Terms of Service",
    description:
      "WarNodes terms of service, acceptable use and hosting agreement for all WarNodes services.",
    path: "/terms",
  },
  policy: {
    title: "Privacy Policy",
    description:
      "How WarNodes collects, uses and protects your personal data across hosting and billing services.",
    path: "/policy",
  },
  refund: {
    title: "Refund Policy",
    description: "WarNodes refund policy, guarantee terms and billing dispute process.",
    path: "/refund",
  },
} as const satisfies Record<string, PageSeo>

export function buildPageMetadata(page: PageSeo): Metadata {
  const url = `${siteMetadata.url}${page.path}`

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.title} | ${siteMetadata.name}`,
      description: page.description,
      url,
      siteName: siteMetadata.siteName,
      images: [siteMetadata.ogImage],
    },
    twitter: {
      card: "summary",
      title: `${page.title} | ${siteMetadata.name}`,
      description: page.description,
      images: [siteMetadata.logoUrl],
    },
  }
}

export const serviceListSchema = [
  { name: "VPS Hosting", url: `${siteMetadata.url}/vps` },
  { name: "Web Hosting", url: `${siteMetadata.url}/web-hosting` },
  { name: "Game Server Hosting", url: `${siteMetadata.url}/games` },
  { name: "Minecraft Hosting", url: `${siteMetadata.url}/games?game=minecraft` },
  { name: "Discord Bot Hosting", url: `${siteMetadata.url}/discord-bot` },
  { name: "WarShield DDoS Protection", url: `${siteMetadata.url}/ddos` },
  { name: "Contact Us", url: `${siteMetadata.url}/contact` },
]
