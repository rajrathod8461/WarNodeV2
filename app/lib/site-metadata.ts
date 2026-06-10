const SITE_URL = "https://warnode.cloud"

const PROFESSIONAL_DESCRIPTION =
  "Premium VPS Hosting, Web Hosting, Discord Bot Hosting, Minecraft Hosting and Game Servers powered by NVMe infrastructure and protected by WarShield DDoS Protection. Built for developers, businesses and gamers across India."

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
