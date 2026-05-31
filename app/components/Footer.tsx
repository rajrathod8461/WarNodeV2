"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa6"
import DiscordBanner from "./DiscordBanner"
import { useLanguage } from "../contexts/LanguageContext"
import warnodesConfig from "../config/sections/warnodes.json"
import heroConfig from "../config/sections/hero.json"
import type { HeroConfig } from "../types/hero"
import { withLogoVersion } from "../lib/logo"

const heroSettings = heroConfig as HeroConfig

type FooterLink = {
  name: string
  href: string
  external?: boolean
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-icon-primary dark:text-gray-400"
          >
            {link.name}
            {link.external && <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />}
          </a>
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
        {title}
      </h3>
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const { company, links, social } = warnodesConfig
  const footerLogoSrc = withLogoVersion(
    heroSettings.navbar.logo,
    heroSettings.navbar.logoVersion
  )

  const hostingLinks: FooterLink[] = [
    { name: t("footer.gameServerHosting"), href: "/games" },
    { name: t("footer.vpsHosting"), href: "/vps" },
    { name: "Web Hosting", href: "/web-hosting" },
    { name: "Discord Bot Hosting", href: "/discord-bot" },
    { name: t("footer.ddosProtection"), href: "/ddos" },
  ]

  const companyLinks: FooterLink[] = [
    { name: t("footer.ourTeam"), href: "/team" },
    { name: t("footer.clientArea"), href: links.portal, external: true },
    { name: t("footer.networkStatus"), href: links.status, external: true },
  ]

  const supportLinks: FooterLink[] = [
    { name: t("footer.contactPage"), href: "/contact" },
    { name: t("footer.openTicket"), href: links.tickets, external: true },
    { name: t("footer.discordSupport"), href: links.discord, external: true },
  ]

  const legalLinks: FooterLink[] = [
    { name: t("navbar.termsOfService"), href: "/terms" },
    { name: t("navbar.privacyPolicy"), href: "/policy" },
    { name: "Refund Policy", href: "/refund" },
  ]

  const socialLinks = [
    { name: "Discord", href: social.discord, icon: FaDiscord },
    { name: "YouTube", href: social.youtube, icon: FaYoutube },
    { name: "Instagram", href: social.instagram, icon: FaInstagram },
  ]

  return (
    <motion.div className="relative">
      <motion.div className="relative z-30 -mb-47">
        <DiscordBanner />
      </motion.div>

      <footer className="relative z-10 border-t border-gray-200 bg-gray-100 pt-8 dark:border-white/10 dark:bg-[#0a0b0f]">
        <motion.div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-3 xl:col-span-2"
            >
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src={footerLogoSrc}
                  alt={`${company.name} Logo`}
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  unoptimized
                />
                <span className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
                  {heroSettings.navbar.brandName}
                  <span className="icon-text-primary">{heroSettings.navbar.brandAccent}</span>
                </span>
              </div>
              <p className="mb-5 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {t("footer.description")}
              </p>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500">
                Follow us
              </p>
              <div className="mb-5 flex items-center gap-2.5">
                {socialLinks.map((socialLink) => {
                  const Icon = socialLink.icon
                  return (
                    <a
                      key={socialLink.name}
                      href={socialLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLink.name}
                      className="flex h-9 w-9 items-center justify-center rounded-tl-lg rounded-br-lg border border-gray-200/50 bg-white/70 text-gray-600 transition-colors hover:border-secondary hover:text-icon-primary dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-icon-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            <FooterColumn title={t("footer.hosting")} delay={0.08}>
              <FooterLinkList links={hostingLinks} />
            </FooterColumn>

            <FooterColumn title={t("footer.company")} delay={0.12}>
              <FooterLinkList links={companyLinks} />
            </FooterColumn>

            <FooterColumn title={t("footer.support")} delay={0.16}>
              <FooterLinkList links={supportLinks} />
            </FooterColumn>

            <FooterColumn title={t("footer.legal")} delay={0.2}>
              <FooterLinkList links={legalLinks} />
            </FooterColumn>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-white/10 sm:flex-row"
          >
            <p className="text-center text-sm text-gray-500 dark:text-gray-500 sm:text-left">
              © {new Date().getFullYear()} {company.name}. {t("footer.allRightsReserved")}
            </p>
            <a
              href={links.status}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-icon-primary dark:text-gray-500"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              {t("footer.systemsOperational")}
            </a>
          </motion.div>
        </motion.div>
      </footer>
    </motion.div>
  )
}
