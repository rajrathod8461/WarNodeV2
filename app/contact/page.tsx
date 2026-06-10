"use client"

import { motion } from "framer-motion"
import {
  LifeBuoy,
  ClipboardList,
  Mail,
  MessageSquare,
  MapPin,
  Users,
  ExternalLink,
  ArrowUpRight,
  BookOpen,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import contactConfig from "../config/sections/contact.json"
import warnodesConfig from "../config/sections/warnodes.json"
import { useLanguage } from "../contexts/LanguageContext"

const contact = contactConfig
const links = warnodesConfig.links

const channelCards = [
  {
    icon: ClipboardList,
    titleKey: "contact.ticketTitle",
    descKey: "contact.ticketDesc",
    ctaKey: "contact.createTicket",
    href: links.tickets,
    external: true,
    primary: true,
  },
  {
    icon: Mail,
    titleKey: "contact.emailTitle",
    descKey: "contact.emailDesc",
    ctaKey: "contact.emailUs",
    href: `mailto:${contact.supportEmail}`,
    external: false,
    highlight: contact.supportEmail,
  },
  {
    icon: MessageSquare,
    titleKey: "contact.discordTitle",
    descKey: "contact.discordDesc",
    ctaKey: "contact.joinDiscord",
    href: links.discord,
    external: true,
  },
] as const

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />

      <div className="relative overflow-hidden">
        <motion.div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/banners/vps.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f]" />
        </motion.div>

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary card-primary px-4 py-2">
              <LifeBuoy className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium icon-text-primary">{t("contact.badge")}</span>
            </div>

            <h1 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              {t("contact.intro")}
            </p>
          </motion.header>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            {channelCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.titleKey}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex flex-col rounded-tl-2xl rounded-br-2xl border border-gray-200/50 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-tl-xl rounded-br-xl border border-secondary card-primary">
                    <Icon className="h-5 w-5 icon-text-primary" />
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {t(card.titleKey)}
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {t(card.descKey)}
                  </p>
                  {"highlight" in card && card.highlight && (
                    <p className="mb-4 text-sm font-medium icon-text-primary">{card.highlight}</p>
                  )}
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 self-start rounded-tl-xl rounded-br-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      "primary" in card && card.primary
                        ? "border-secondary button-primary text-button-primary hover:hover-gradient"
                        : "border-secondary bg-gray-50 text-gray-800 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {t(card.ctaKey)}
                    {card.external ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </a>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-10 rounded-tl-2xl rounded-br-2xl border border-gray-200/50 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5 sm:p-8"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              {t("contact.addressTitle")}
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{t("contact.addressIntro")}</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tl-xl rounded-br-xl border border-secondary card-primary">
                <MapPin className="h-5 w-5 icon-text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{contact.address.company}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{contact.address.city}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.address.country}</p>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">{contact.address.note}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-tl-2xl rounded-br-2xl border border-secondary card-primary p-6 text-center sm:p-8"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              {t("contact.ctaTitle")}
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {t("contact.ctaDesc")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl border border-secondary button-primary px-5 py-2.5 text-sm font-semibold text-button-primary transition-all hover:hover-gradient"
              >
                <Users className="h-4 w-4" />
                {t("contact.joinCommunity")}
              </a>
              <a
                href={contact.helpDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl border border-secondary bg-white/70 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                {t("contact.viewDocs")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
