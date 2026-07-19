import type { Metadata } from "next"
import { siteMetadata } from "./site-metadata"

type PageSeo = {
  title: string
  description: string
  path: string
  body?: string
}

export const pageSeo = {
  home: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    path: "/",
  },
  vps: {
    title: "VPS Hosting – AMD EPYC & Intel Xeon",
    description:
      "High-performance AMD EPYC and Intel Xeon VPS servers with NVMe storage, full root access and enterprise-grade reliability across India and Singapore.",
    body: "Deploy Linux or Windows VPS instances in Mumbai, Hyderabad, Delhi or Singapore with unmetered bandwidth options, multiple OS images, and WarShield protection included on every node.",
    path: "/vps",
  },
  webHosting: {
    title: "Web Hosting – LiteSpeed NVMe Hosting",
    description:
      "Fast NVMe-powered web hosting with LiteSpeed, free SSL, one-click applications and optimized performance for businesses and developers.",
    body: "Host WordPress, Laravel, Node.js and static sites on LiteSpeed with free SSL certificates, daily backups, and a control panel built for speed.",
    path: "/web-hosting",
  },
  games: {
    title: "Game Server Hosting – Instant Setup",
    description:
      "Reliable game servers with premium hardware, WarShield DDoS protection and instant setup for popular games including Minecraft and Hytale.",
    body: "Order Minecraft or Hytale servers with instant deployment, modpack support, plugin installers, live console access, and low-latency routes across India.",
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
    body: "Run Node.js, Python, Java, Go, Rust and other bot stacks with always-on uptime, DDoS protection, and easy deployment through the WarNodes panel.",
    path: "/discord-bot",
  },
  warShield: {
    title: "WarShield DDoS Protection",
    description:
      "Advanced network-level DDoS protection engineered to keep Minecraft and game services secure, stable and online across India and Singapore.",
    body: "Protect Minecraft, game servers and proxy workloads with multi-layer scrubbing, origin IP concealment, and Minecraft-aware protocol filtering.",
    path: "/ddos",
  },
  contact: {
    title: "Contact WarNodes – Sales & Support",
    description:
      "Get assistance from the WarNodes team for sales, technical support, custom solutions and enterprise hosting requirements.",
    body: "Reach WarNodes through tickets, email, or Discord for billing questions, migrations, custom hardware, and enterprise hosting plans.",
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
    body: "Get dedicated bare-metal resources for high-traffic game networks, SaaS platforms, and workloads that need predictable performance.",
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

export type PageSeoKey = keyof typeof pageSeo

export const homeFaqs = [
  {
    question: "How do I get started with game server hosting?",
    answer:
      "Getting started is simple! Choose your game, select a plan, and complete your order. Your server will be deployed automatically and ready to use within minutes.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer support through tickets and Discord. Whether you need help with setup, troubleshooting, or server management, our team is ready to assist you.",
  },
  {
    question: "Can I modify server settings and configurations?",
    answer:
      "Yes! You have full control over your server. Install mods, upload files, edit configurations, manage databases, and customize your server to fit your needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Credit Cards, Debit Cards, Net Banking, Digital Wallets, and selected Cryptocurrency payments for a convenient checkout experience.",
  },
  {
    question: "Do you offer DDoS protection?",
    answer:
      "Yes! All servers include advanced WarShield DDoS Protection to help keep your services secure, stable, and online against malicious attacks and unwanted traffic.",
  },
] as const

export const internalServiceLinks = [
  { href: "/vps", label: "VPS Hosting" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/games", label: "Game Server Hosting" },
  { href: "/games?game=minecraft", label: "Minecraft Hosting" },
  { href: "/games?game=hytale", label: "Hytale Hosting" },
  { href: "/discord-bot", label: "Discord Bot Hosting" },
  { href: "/ddos", label: "WarShield DDoS Protection" },
  { href: "/dedicated", label: "Dedicated Servers" },
  { href: "/contact", label: "Contact" },
] as const

export function buildFaqPageSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteMetadata.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

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
