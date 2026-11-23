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
    title: "Best Minecraft Server Hosting India – Intel & AMD EPYC from ₹35/GB",
    description:
      "High-performance Minecraft server hosting in India (Mumbai & Delhi) from ₹35/GB (₹59/mo). Free WarShield DDoS protection, Pterodactyl panel, 1-click modpacks, instant setup & 99.9% uptime.",
    body: "Deploy high-performance Minecraft Java and Bedrock servers powered by AMD EPYC and Intel Xeon processors with Gen4 NVMe storage. Full support for Paper, Purpur, Spigot, Forge, Fabric, and Geyser crossplay with sub-15ms latency across India.",
    path: "/minecraft-hosting",
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
    title: "Dedicated Servers Frankfurt, Germany – Intel Xeon Bare Metal",
    description:
      "Enterprise bare-metal dedicated servers hosted in Frankfurt, Germany. Intel Xeon E5 & Gold processors, DDR4 RAM, 1Gbit unmetered bandwidth, IPMI root access, and enterprise DDoS protection.",
    body: "Deploy high-performance dedicated servers located in Frankfurt, Germany (Tier-3 Datacenter). Powered by Intel Xeon processors with up to 64GB DDR4 RAM, unmetered 1Gbit connectivity, IPMI/KVM access, and WarShield protection for maximum European & global reach.",
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
  { href: "/dedicated", label: "Dedicated Servers (Frankfurt)" },
  { href: "/database-hosting", label: "Database Hosting" },
  { href: "/email-hosting", label: "Business Email Hosting" },
  { href: "/web-hosting", label: "Web Hosting" },
  { href: "/games", label: "Game Server Hosting" },
  { href: "/minecraft-hosting", label: "Minecraft Hosting" },
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
  { name: "Dedicated Servers (Frankfurt)", url: `${siteMetadata.url}/dedicated` },
  { name: "Database Hosting", url: `${siteMetadata.url}/database-hosting` },
  { name: "Business Email Hosting", url: `${siteMetadata.url}/email-hosting` },
  { name: "Web Hosting", url: `${siteMetadata.url}/web-hosting` },
  { name: "Game Server Hosting", url: `${siteMetadata.url}/games` },
  { name: "Minecraft Hosting", url: `${siteMetadata.url}/minecraft-hosting` },
  { name: "Rust Hosting", url: `${siteMetadata.url}/games?game=rust` },
  { name: "Palworld Hosting", url: `${siteMetadata.url}/games?game=palworld` },
  { name: "FiveM Hosting", url: `${siteMetadata.url}/games?game=fivem` },
  { name: "Counter-Strike 2 Hosting", url: `${siteMetadata.url}/games?game=cs2` },
  { name: "Discord Bot Hosting", url: `${siteMetadata.url}/discord-bot` },
  { name: "WarShield DDoS Protection", url: `${siteMetadata.url}/ddos` },
  { name: "Contact Us", url: `${siteMetadata.url}/contact` },
]

export const minecraftFaqs = [
  {
    question: "What makes WarNodes the best Minecraft server hosting in India?",
    answer:
      "WarNodes delivers ultra-low ping (5–20ms across India) through Tier-3 Mumbai and Delhi datacenters, powered by high-frequency Intel Xeon and AMD EPYC CPUs, Gen4 NVMe storage, free WarShield DDoS protection, and the lowest prices starting at just ₹35/GB (₹59/mo).",
  },
  {
    question: "How much does Minecraft server hosting cost in India?",
    answer:
      "WarNodes plans start at only ₹59/month for 2GB RAM on Intel Xeon (approx ₹35/GB for higher tiers) and ₹79/month on AMD EPYC (approx ₹39/GB). This makes WarNodes significantly more affordable than competitors like LordCloud (₹90/mo) and Shockbyte.",
  },
  {
    question: "How much RAM do I need for my Minecraft server?",
    answer:
      "For Vanilla Minecraft with 1–5 friends, 2GB RAM (COW plan) is ideal. For Paper/Purpur with 10–25 plugins, 4GB to 6GB RAM (PIG or SHEEP) is recommended. For heavy modpacks (Forge, Fabric, All the Mods, RL茫Craft), choose 8GB to 16GB RAM (SLIME or CHICKEN).",
  },
  {
    question: "Can both Java and Bedrock (mobile/console) players join my server?",
    answer:
      "Yes! Our Pterodactyl panel features pre-configured GeyserMC and Floodgate crossplay plugins. You can enable crossplay with one click so players on PC (Java), Android, iOS, Xbox, PlayStation, and Switch can all play together.",
  },
  {
    question: "Which Minecraft versions and mod loaders are supported?",
    answer:
      "We support every Minecraft release from 1.8 to 1.21+, including Paper, Purpur, Spigot, Vanilla, Forge, Fabric, NeoForge, Mohist, BungeeCord, Velocity, and Bedrock Dedicated Server.",
  },
  {
    question: "Do you offer DDoS protection for Minecraft servers?",
    answer:
      "Yes! Every Minecraft server includes free enterprise WarShield DDoS protection with L3/L4/L7 intelligent traffic scrubbing, blocking Minecraft protocol attacks, bot floods, and SYN floods without lag spikes.",
  },
  {
    question: "How do I install mods and plugins on my server?",
    answer:
      "Our customized Pterodactyl panel includes a built-in 1-click modpack installer (CurseForge, Modrinth) and plugin manager. You can also drag and drop JAR files directly through the web File Manager or high-speed SFTP.",
  },
  {
    question: "Where are your Minecraft servers located in India?",
    answer:
      "Our game nodes are located in carrier-neutral Tier-3 datacenters in Mumbai and Delhi with direct peering to Jio, Airtel, ACT, and Tata, ensuring 5–20ms latency anywhere in India.",
  },
  {
    question: "Is deployment instant after payment?",
    answer:
      "Yes, your Minecraft server is automatically provisioned and ready within 60 seconds after your payment is confirmed.",
  },
  {
    question: "Can I upload my existing Minecraft world or custom JAR file?",
    answer:
      "Absolutely. You have full root access to your server directory via SFTP and web File Manager. You can upload custom server JARs, existing world saves, datapacks, and configurations.",
  },
  {
    question: "Do you provide a free subdomain for my Minecraft server?",
    answer:
      "Yes! Every server comes with a free custom subdomain (e.g., yourname.warnode.cloud) so your players can join without typing complex port numbers.",
  },
  {
    question: "Do I get a free MySQL database for plugins?",
    answer:
      "Yes, 1 free managed MySQL database is included with every plan for plugins like LuckPerms, CoreProtect, Vault, and economy systems.",
  },
  {
    question: "Can I upgrade or downgrade my Minecraft server plan later?",
    answer:
      "Yes, you can upgrade your CPU, RAM, or storage at any time through our portal with 1 click. All your files, worlds, and settings remain completely intact.",
  },
  {
    question: "Do you offer automated backups?",
    answer:
      "Yes, automated backups with off-site replication and 1-click restoration are built directly into our panel.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept all major Indian and international payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards, NetBanking, and Crypto.",
  },
] as const

export function buildMinecraftProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Minecraft Server Hosting India",
    image: `${siteMetadata.url}/banners/minecraft-banners.webp`,
    description:
      "High-performance Minecraft server hosting in India with low latency, NVMe Gen4 SSD storage, WarShield DDoS protection, and 24/7 support. Powered by Intel Xeon and AMD EPYC processors starting from ₹35/GB (₹59/month).",
    brand: {
      "@type": "Brand",
      name: "WarNodes",
    },
    offers: {
      "@type": "AggregateOffer",
      url: `${siteMetadata.url}/minecraft-hosting`,
      priceCurrency: "INR",
      lowPrice: "59",
      highPrice: "959",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "WarNodes",
        url: siteMetadata.url,
      },
    },
  }
}

export function buildMinecraftFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteMetadata.url}/minecraft-hosting#faq`,
    mainEntity: minecraftFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function buildMinecraftBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Minecraft Hosting",
        item: `${siteMetadata.url}/minecraft-hosting`,
      },
    ],
  }
}

export function buildMinecraftLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WarNodes Cloud Services",
    url: siteMetadata.url,
    logo: siteMetadata.logoUrl,
    image: `${siteMetadata.url}/banners/minecraft-banners.webp`,
    telephone: "+91-8461000000",
    email: "support@warnode.cloud",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.076,
      longitude: 72.8777,
    },
  }
}
