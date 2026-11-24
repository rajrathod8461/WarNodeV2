"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ShieldCheck } from "lucide-react"
import { FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa6"
import DiscordBanner from "./DiscordBanner"
import { useLanguage } from "../contexts/LanguageContext"
import warnodesConfig from "../config/sections/warnodes.json"
import navigationConfig from "../config/sections/navigation.json"
import heroConfig from "../config/sections/hero.json"
import type { HeroConfig } from "../types/hero"
import { withLogoVersion } from "../lib/logo"

const heroSettings = heroConfig as HeroConfig

type BadgeVariant = "blue" | "green" | "cyan" | "amber" | "pulse"

type FooterLink = {
  name: string
  href: string
  external?: boolean
  nofollow?: boolean
  badge?: string
  badgeVariant?: BadgeVariant
}

function renderBadge(text?: string, variant?: BadgeVariant) {
  if (variant === "pulse") {
    return (
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
    )
  }

  if (!text) return null

  const colorStyles: Record<BadgeVariant, string> = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    pulse: "",
  }

  return (
    <span
      className={`rounded-full border px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider leading-none ${
        colorStyles[variant || "blue"]
      }`}
    >
      {text}
    </span>
  )
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.name} className="leading-tight">
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel={
                link.nofollow
                  ? "noopener noreferrer nofollow"
                  : "noopener noreferrer"
              }
              className="group inline-flex items-center gap-1.5 py-1 text-[13px] xl:text-sm text-gray-600 transition-all duration-200 hover:text-blue-600 hover:translate-x-1 dark:text-gray-400 dark:hover:text-blue-400 whitespace-nowrap"
            >
              <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {link.name}
              </span>
              {link.badge && renderBadge(link.badge, link.badgeVariant)}
              <ExternalLink className="h-3 w-3 shrink-0 opacity-40 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              href={link.href}
              prefetch={true}
              className="group inline-flex items-center gap-1.5 py-1 text-[13px] xl:text-sm text-gray-600 transition-all duration-200 hover:text-blue-600 hover:translate-x-1 dark:text-gray-400 dark:hover:text-blue-400 whitespace-nowrap"
            >
              <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {link.name}
              </span>
              {link.badge && renderBadge(link.badge, link.badgeVariant)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

function FooterColumn({
  title,
  children,
  delay,
}: {
  title: string
  children: ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, delay }}
      className="min-w-0"
    >
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-200">
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const { company, links } = warnodesConfig
  const footerLogoSrc = withLogoVersion(
    heroSettings.navbar.logo,
    heroSettings.navbar.logoVersion
  )

  // 1. Hosting column (5 links)
  const hostingLinks: FooterLink[] = [
    { name: "VPS Hosting", href: "/vps" },
    { name: "Web Hosting", href: "/web-hosting" },
    { name: "Email Hosting", href: "/email-hosting" },
    { name: "Database Hosting", href: "/database-hosting" },
    { name: "Dedicated Servers", href: "/dedicated" },
  ]

  // 2. Solutions column (5 links)
  const solutionsLinks: FooterLink[] = [
    { name: "Minecraft Hosting", href: "/minecraft-hosting" },
    { name: "Game Server Hosting", href: "/games" },
    { name: "Counter-Strike 2", href: "/games?game=cs2" },
    { name: "Discord Bot Hosting", href: "/discord-bot" },
    { name: "DDoS Protection", href: "/ddos" },
  ]

  // 3. Network column
  const networkLinks: FooterLink[] = [
    { name: "Server Locations", href: "/locations" },
    { name: "WarShield", href: "/ddos" },
    { name: "Network Status", href: links.status, external: true, badgeVariant: "pulse", badge: "live" },
  ]

  // 4. Company column (5 links)
  const companyLinks: FooterLink[] = [
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers", badge: "Hiring", badgeVariant: "green" },
    { name: "Announcements", href: links.updates, external: true },
    { name: "Client Portal", href: links.portal, external: true },
  ]

  // 5. Support column (5 links)
  const supportLinks: FooterLink[] = [
    { name: "Contact Us", href: "/contact" },
    { name: "Knowledgebase", href: `${links.portal}/knowledgebase`, external: true },
    { name: "Open Ticket", href: links.tickets, external: true },
    { name: "Incidents", href: "https://status.warnode.cloud/r/21ff16ee2f2761fddf6d1567935561f0/incidents/", external: true },
    { name: "Discord Support", href: links.discord, external: true },
  ]

  // 6. Control Panels column (5 links)
  const panelLinks: FooterLink[] = [
    ...(navigationConfig.panels ?? []).map((panel) => ({
      name: panel.name,
      href: panel.href,
      external: true,
      nofollow: true,
    })),
    {
      name: "Client Area",
      href: navigationConfig.clientSpace?.href || links.portal,
      external: true,
      nofollow: true,
    },
  ]

  // 7. Legal column (5 links)
  const legalLinks: FooterLink[] = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/policy" },
    { name: "Refund Policy", href: "/refund" },
    { name: "SLA Guarantee", href: "/terms#sla", badge: "99.9%", badgeVariant: "amber" },
    { name: "Acceptable Use", href: "/terms#aup" },
  ]

  const socialLinks = [
    {
      name: "Discord",
      href: "https://dcd.gg/warnode",
      icon: FaDiscord,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@war-node",
      icon: FaYoutube,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/war_nodes?igsh=dmx6OWJlanJiNjU5",
      icon: FaInstagram,
    },
  ]

  return (
    <div className="relative">
      <div className="relative z-30 -mb-47">
        <DiscordBanner />
      </div>

      <footer className="relative z-10 border-t border-gray-200 bg-gray-100 pt-8 dark:border-white/10 dark:bg-[#0a0b0f]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Top Brand info card with Company Description, Trust Badges & Active Social Links */}
          <div className="mt-20 mb-12 flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-gray-200 dark:border-white/10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={footerLogoSrc}
                  alt={`${company.name} Logo`}
                  width={200}
                  height={60}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
                <span className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
                  {heroSettings.navbar.brandName}
                  <span className="icon-text-primary">{heroSettings.navbar.brandAccent}</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-6">
                {company.description || t("footer.description")}
              </p>

              {/* 24-Hour Guarantee directly below description */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700 dark:text-gray-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    24-Hour Money-Back Guarantee
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  No contract lock-ins or hidden cancellation fees
                </span>
              </div>
            </div>

            {/* Right: Social Follow Buttons & Accepted Payment Methods */}
            <div className="flex flex-col sm:items-start lg:items-end gap-5 shrink-0">
              <div className="flex flex-col sm:items-start lg:items-end gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Follow WarNodes
                </span>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((socialLink) => {
                    const Icon = socialLink.icon
                    return (
                      <a
                        key={socialLink.name}
                        href={socialLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={socialLink.name}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/80 bg-white text-gray-700 shadow-xs transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-50/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 hover:scale-105"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Accepted Payment Logos */}
              <div className="flex flex-col sm:items-start lg:items-end gap-2 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Accepted:
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:justify-start lg:justify-end">
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="UPI (Unified Payments Interface)">
                    <Image src="/payments/upi.svg" alt="UPI" width={52} height={18} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="RuPay">
                    <Image src="/payments/rupay.svg" alt="RuPay" width={54} height={18} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="Visa">
                    <Image src="/payments/visa.svg" alt="Visa" width={44} height={18} className="h-3 w-auto object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="Mastercard">
                    <Image src="/payments/mastercard.svg" alt="Mastercard" width={28} height={18} className="h-4 w-auto object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="NetBanking">
                    <Image src="/payments/netbanking.svg" alt="NetBanking" width={76} height={18} className="h-3.5 w-auto object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded-md bg-white border border-gray-200 shadow-xs flex items-center justify-center hover:scale-105 transition-transform" title="Cryptocurrency">
                    <Image src="/payments/crypto.svg" alt="Crypto" width={64} height={18} className="h-3.5 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7 Uniformly Balanced Columns Grid (5 links each) */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-x-3 xl:gap-x-8">
            {/* 1. Hosting */}
            <FooterColumn title="Hosting" delay={0.05}>
              <FooterLinkList links={hostingLinks} />
            </FooterColumn>

            {/* 2. Solutions */}
            <FooterColumn title="Solutions" delay={0.08}>
              <FooterLinkList links={solutionsLinks} />
            </FooterColumn>

            {/* 3. Network */}
            <FooterColumn title="Network" delay={0.11}>
              <FooterLinkList links={networkLinks} />
            </FooterColumn>

            {/* 4. Company */}
            <FooterColumn title="Company" delay={0.14}>
              <FooterLinkList links={companyLinks} />
            </FooterColumn>

            {/* 5. Support */}
            <FooterColumn title="Support" delay={0.17}>
              <FooterLinkList links={supportLinks} />
            </FooterColumn>

            {/* 6. Control Panels */}
            <FooterColumn title="Control Panels" delay={0.2}>
              <FooterLinkList links={panelLinks} />
            </FooterColumn>

            {/* 7. Legal */}
            <FooterColumn title="Legal" delay={0.23}>
              <FooterLinkList links={legalLinks} />
            </FooterColumn>
          </div>

          {/* Bottom Copyright & Status row */}
          <div className="mt-12 border-t border-gray-200 pt-6 dark:border-white/10">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} {company.name}. {t("footer.allRightsReserved")}
              </p>

              <a
                href={links.status}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3.5 py-1 text-xs text-gray-600 shadow-xs backdrop-blur transition-all hover:border-emerald-500/40 hover:text-emerald-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("footer.systemsOperational")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
