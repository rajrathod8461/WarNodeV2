const SITE_URL = "https://warnode.cloud"

const PROFESSIONAL_DESCRIPTION =
  "India's premier cloud hosting for developers and gamers. High-performance VPS, Dedicated & VDS servers, Game servers (Minecraft, Rust, Palworld, CS2, FiveM), Managed Databases, Web & Business Email Hosting with WarShield DDoS protection."

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
