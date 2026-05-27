"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, Gamepad2, ExternalLink } from "lucide-react"
import DiscordBanner from "./DiscordBanner"
import { useLanguage } from "../contexts/LanguageContext"
import warnodesConfig from "../config/sections/warnodes.json"
import heroConfig from "../config/sections/hero.json"
import type { HeroConfig } from "../types/hero"
import { withLogoVersion } from "../lib/logo"

const heroSettings = heroConfig as HeroConfig

export default function Footer() {
  const { t } = useLanguage()
  const { company, links } = warnodesConfig
  const footerLogoSrc = withLogoVersion(
    heroSettings.navbar.logo,
    heroSettings.navbar.logoVersion
  )

  const quickLinks = [
    { name: t('footer.clientArea'), href: links.portal },
    { name: t('footer.discord'), href: links.discord },
    { name: t('footer.vpsHosting'), href: "/vps" },
    { name: t('footer.gameServerHosting'), href: "/games" },
    { name: "Web Hosting", href: "/webhosting" },
    { name: t('footer.ddosProtection'), href: "/ddos" },
    { name: "Network Status", href: links.status, external: true },
  ]

  const legalLinks = [
    { name: t('navbar.termsOfService'), href: "/terms-of-services" },
    { name: t('navbar.privacyPolicy'), href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ]

  const contactInfo = [
    { icon: Mail, label: t('footer.email'), value: company.contactEmail, href: `mailto:${company.contactEmail}` },
    { icon: Phone, label: t('footer.phone'), value: "Discord Support", href: links.discord },
    { icon: Gamepad2, label: t('footer.gamePanel'), value: "panel.warnode.cloud", href: links.panel },
  ]

  return (
    <motion.div className="relative">
      <motion.div className="relative z-30 -mb-47">
        <DiscordBanner />
      </motion.div>

      <footer className="bg-gray-100 dark:bg-[#0a0b0f] border-t border-gray-200 dark:border-white/10 relative z-10 pt-8">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div className="grid grid-cols-1 mt-24 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <motion.div className="mb-6">
                <Image
                  src={footerLogoSrc}
                  alt={`${company.name} Logo`}
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  unoptimized
                />
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {t('footer.description')}
              </p>
              <motion.div className="text-xs text-gray-500 dark:text-gray-500">
                <a href={links.status} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-icon-primary transition-colors">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {t('footer.systemsOperational')}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-gray-600 dark:text-gray-400 hover:text-icon-primary transition-colors text-sm flex items-center gap-1"
                    >
                      {link.name}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-icon-primary transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t('footer.contactUs')}</h3>
              <ul className="space-y-3">
                {contactInfo.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <item.icon className="w-4 h-4 icon-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{item.label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-icon-primary transition-colors">{item.value}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-500 dark:text-gray-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs text-center sm:text-right">
              {company.tagline}
            </p>
          </motion.div>
        </motion.div>
      </footer>
    </motion.div>
  )
}
