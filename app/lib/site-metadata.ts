const SITE_URL = "https://warnode.cloud"

const PROFESSIONAL_DESCRIPTION =
  "High-performance Minecraft, VPS, Bot, and Web Hosting powered by enterprise-grade hardware, NVMe storage, advanced DDoS protection, global locations, and instant deployment."

export const siteMetadata = {
  url: SITE_URL,
  name: "WarNodes",
  title: "WarNodes – India's Smoothest Hosting Experience",
  ogTitle: "WarNodes – India's Smoothest Hosting Experience",
  siteName: "WarNodes – India's Smoothest Hosting Experience",
  description: PROFESSIONAL_DESCRIPTION,
  ogDescription: PROFESSIONAL_DESCRIPTION,
  themeColor: "#137fec",
  logoPath: "/meta/Logo.png",
  logoUrl: `${SITE_URL}/meta/Logo.png`,
  ogImage: {
    url: `${SITE_URL}/meta/Logo.png`,
    width: 1080,
    height: 1080,
    alt: "WarNodes Logo",
    type: "image/png" as const,
  },
}
