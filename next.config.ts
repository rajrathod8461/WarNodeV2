import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.warnode.cloud" }],
        destination: "https://warnode.cloud/:path*",
        permanent: true,
      },
      { source: "/terms-of-services", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/policy", permanent: true },
      { source: "/refund-policy", destination: "/refund", permanent: true },
      { source: "/webhosting", destination: "/web-hosting", permanent: true },
      { source: "/discord", destination: "/discord-bot", permanent: true },
      { source: "/minecraft", destination: "/games?game=minecraft", permanent: true },
      { source: "/hytale", destination: "/games?game=hytale", permanent: true },
      { source: "/updates", destination: "https://updates.warnode.cloud", permanent: false },
      { source: "/announcements", destination: "https://updates.warnode.cloud", permanent: false },
    ]
  },

  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
      ],
    },
    {
      source: "/banners/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
