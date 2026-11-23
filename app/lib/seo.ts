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
    title: "Game Server Hosting India – Minecraft, Rust, FiveM, CS2, Palworld",
    description:
      "Ultra-low latency game server hosting in India with instant setup, Pterodactyl panel, modpack installers, NVMe SSDs, and WarShield DDoS protection for Minecraft, Rust, Palworld, FiveM, Counter-Strike 2, and Hytale.",
    body: "Order Minecraft, Rust, Palworld, FiveM, CS2 or Hytale servers with instant deployment, modpack support, plugin installers, live console access, and sub-15ms low-latency routes across India.",
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
  databaseHosting: {
    title: "Database Hosting India – Managed MySQL, PostgreSQL, MongoDB, Redis",
    description:
      "Deploy managed and standalone databases with Gen4 NVMe storage, ultra-low latency, automated backups, and 24/7 uptime across India.",
    body: "Host MariaDB, MySQL, PostgreSQL, MongoDB, Redis, Valkey, SQLite, Memcached, CouchDB, Cassandra, ClickHouse, Elasticsearch, InfluxDB, Neo4j, RabbitMQ, and KeyDB with instant deployment and DDoS protection.",
    path: "/database-hosting",
  },
  emailHosting: {
    title: "Business Email Hosting India – Custom Domain & Webmail",
    description:
      "Professional business email hosting with custom domain branding, Webmail, spam filtering, SSL/TLS encryption, and 99.9% uptime starting at ₹39/mo.",
    body: "Create secure business email addresses with custom domain branding. Unlimited email forwarders, responsive webmail access, DKIM/SPF/DMARC authentication, and seamless compatibility with Outlook, Apple Mail, and mobile devices.",
    path: "/email-hosting",
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
  about: {
    title: "About WarNodes – Our Mission & Infrastructure",
    description:
      "Learn how WarNodes builds premium game, VPS and web hosting across India and beyond — guaranteed resources, no overselling, and WarShield DDoS protection on every plan.",
    body: "WarNodes runs Gen4 NVMe hardware and high-frequency compute across Indian and global edge locations, backed by a 99.9% uptime guarantee, multi-terabit WarShield DDoS mitigation, and 24/7 human support from real engineers.",
    path: "/about",
  },
  team: {
    title: "Our Team",
    description:
      "Meet the WarNodes team behind India's smoothest hosting experience — infrastructure, support and customer success.",
    path: "/team",
  },
  dedicated: {
    title: "Dedicated & VDS Servers India – AMD EPYC & Intel Xeon",
    description:
      "Enterprise bare-metal dedicated servers and high-frequency Virtual Dedicated Servers (VDS) in India & Singapore with unmetered bandwidth and 10Gbps uplinks.",
    body: "Deploy enterprise bare-metal and VDS instances powered by AMD EPYC and Intel Xeon processors. Full root access, IPMI/KVM management, customizable RAM/storage arrays, and dedicated 10Gbps ports optimized for game networks, SaaS workloads, and high-concurrency applications.",
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
      "Yes! Selected plans include WarShield DDoS Protection, designed to help safeguard your services against malicious attacks and unwanted traffic, ensuring better stability and uptime.",
  },
] as const

export const internalServiceLinks = [
  { href: "/vps", label: "VPS Hosting" },
  { href: "/dedicated", label: "Dedicated & VDS Servers" },
  { href: "/database-hosting", label: "Database Hosting" },
  { href: "/email-hosting", label: "Business Email Hosting" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/games", label: "Game Server Hosting" },
  { href: "/games?game=minecraft", label: "Minecraft Hosting" },
  { href: "/games?game=rust", label: "Rust Hosting" },
  { href: "/games?game=palworld", label: "Palworld Hosting" },
  { href: "/games?game=fivem", label: "FiveM Hosting" },
  { href: "/games?game=cs2", label: "Counter-Strike 2 Hosting" },
  { href: "/games?game=hytale", label: "Hytale Hosting" },
  { href: "/discord-bot", label: "Discord Bot Hosting" },
  { href: "/ddos", label: "WarShield DDoS Protection" },
  { href: "/about", label: "About WarNodes" },
  { href: "/contact", label: "Contact Us" },
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
  { name: "Dedicated & VDS Servers", url: `${siteMetadata.url}/dedicated` },
  { name: "Database Hosting", url: `${siteMetadata.url}/database-hosting` },
  { name: "Business Email Hosting", url: `${siteMetadata.url}/email-hosting` },
  { name: "Web Hosting", url: `${siteMetadata.url}/web-hosting` },
  { name: "Game Server Hosting", url: `${siteMetadata.url}/games` },
  { name: "Minecraft Hosting", url: `${siteMetadata.url}/games?game=minecraft` },
  { name: "Rust Hosting", url: `${siteMetadata.url}/games?game=rust` },
  { name: "Palworld Hosting", url: `${siteMetadata.url}/games?game=palworld` },
  { name: "FiveM Hosting", url: `${siteMetadata.url}/games?game=fivem` },
  { name: "Counter-Strike 2 Hosting", url: `${siteMetadata.url}/games?game=cs2` },
  { name: "Discord Bot Hosting", url: `${siteMetadata.url}/discord-bot` },
  { name: "WarShield DDoS Protection", url: `${siteMetadata.url}/ddos` },
  { name: "Contact Us", url: `${siteMetadata.url}/contact` },
]
