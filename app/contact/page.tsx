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
  ArrowRight,
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f] z-0 pointer-events-none" />
      
      {/* Background Blobs */}
      <div className="absolute top-20 -left-32 w-64 h-64 blob-primary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      <div className="absolute top-40 -right-32 w-72 h-72 blob-primary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 -right-24 w-56 h-56 blob-secondary rounded-full blur-3xl z-[2] opacity-50 pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />

        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center flex flex-col items-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary card-primary px-4 py-1.5 shadow-sm">
              <LifeBuoy className="h-4 w-4 icon-text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider icon-text-primary">{t("contact.badge")}</span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="orbitron-font mb-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight"
            >
              {t("contact.title").split(' ').slice(0, -1).join(' ')} <span className="icon-text-primary">{t("contact.title").split(' ').slice(-1)[0]}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {t("contact.intro")}
            </motion.p>
          </motion.header>

          <div className="mb-12 grid gap-5 sm:gap-6 md:grid-cols-3">
            {channelCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="flex flex-col bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md p-6 sm:p-8 hover:border-secondary hover:hover-gradient group transition-all duration-300 relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg font-semibold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors pr-2">
                      {t(card.titleKey)}
                    </h2>
                    <div className="w-12 h-12 border-l border-b border-primary rounded-tr-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 icon-primary" />
                    </div>
                  </div>
                  
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {t(card.descKey)}
                  </p>
                  
                  {"highlight" in card && card.highlight && (
                    <p className="mb-6 text-sm font-medium icon-text-primary">{card.highlight}</p>
                  )}
                  
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-2 self-start rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-300 w-full hover:scale-[1.02] ${
                      "primary" in card && card.primary
                        ? "button-primary text-white hover:shadow-lg hover:shadow-icon-text-primary/20"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/10"
                    }`}
                  >
                    {t(card.ctaKey)}
                    {card.external ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </a>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-md p-6 sm:p-8 hover:border-secondary transition-all duration-300 relative group flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h2 className="mb-3 text-xl font-bold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors">
                {t("contact.addressTitle")}
              </h2>
              <p className="mb-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                {t("contact.addressIntro")}
              </p>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-md bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/5 min-w-[280px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white dark:bg-black/50 border border-primary">
                <MapPin className="h-6 w-6 icon-primary" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">{contact.address.company}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{contact.address.city}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{contact.address.country}</p>
                <p className="mt-2 text-xs font-medium icon-text-primary">{contact.address.note}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-secondary rounded-md p-8 sm:p-12 text-center relative overflow-hidden group hover-gradient transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 blob-secondary rounded-full blur-3xl opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold orbitron-font text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors">
                {t("contact.ctaTitle")}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {t("contact.ctaDesc")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary text-white orbitron-font px-6 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Users className="h-4 w-4" />
                  {t("contact.joinCommunity")}
                </a>
                <a
                  href={contact.helpDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 px-6 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  {t("contact.viewDocs")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
