const SITE_URL = "https://warnode.cloud"

export const siteMetadata = {
  url: SITE_URL,
  name: "WarNodes",
  title: "WarNodes | Next-Gen Developer Hosting",
  ogTitle: "⚡ WarNodes - India's Smoothest Hosting Experience",
  siteName: "WarNodes || India's Smoothest Hosting Experience",
  description:
    "Next-gen infrastructure for developers and gamers — Gen4 NVMe Minecraft hosting, VPS, Discord bot & web hosting with WarShield DDoS protection.",
  ogDescription:
    "⚡ Next-Gen Developer Hosting · Deploy in Seconds\n\n🎮 Minecraft · ☁️ VPS · 🤖 Bot · 🌐 Web Hosting\n💾 NVMe Storage · 🛡️ DDoS Protection · 🌍 Global Locations\n\nPremium hosting architecture starting at free tier.",
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
