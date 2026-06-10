"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Zap,
  CreditCard,
  CheckCircle2,
  Lock,
  MessageCircle,
  Shield,
  AlertTriangle,
  Clock,
  ArrowRight,
  X,
  ChevronDown,
  type LucideIcon,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AccordionSection } from "../components/legal/AccordionSection"
import legalConfig from "../config/sections/legal.json"
import warnodesConfig from "../config/sections/warnodes.json"
import type { TermsOfServiceConfig, TermsSection } from "../types/legal"

const terms = legalConfig.termsOfService as TermsOfServiceConfig

const iconMap: Record<string, LucideIcon> = {
  Zap,
  CreditCard,
  CheckCircle2,
  Lock,
  MessageCircle,
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-secondary bg-gray-50 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white"
      >
        {question}
        <ChevronDown
          className={`h-4 w-4 shrink-0 icon-text-primary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="border-t border-secondary/60 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {answer}
        </p>
      )}
    </div>
  )
}

function TermsSectionContent({ section }: { section: TermsSection }) {
  return (
    <>
      <p className="mb-5 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
        <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span> {section.tldr}
      </p>

      {section.stats && (
        <div className="mb-6 grid grid-cols-3 gap-3">
          {section.stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-lg border border-secondary bg-gray-50 px-3 py-4 text-center dark:bg-white/5"
            >
              <div className="orbitron-font text-lg font-bold icon-text-primary sm:text-xl">{stat.value}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {section.listTitle && section.listItems && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">{section.listTitle}</h3>
          <ul className="space-y-2">
            {section.listItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 icon-text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">{sub.title}</h3>
          <ul className="space-y-2">
            {sub.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 icon-text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.allowedItems && (
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-green-600 dark:text-green-400">
              {section.allowedTitle ?? "Allowed"}
            </h3>
            <ul className="space-y-2">
              {section.allowedItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {section.prohibitedItems && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-red-600 dark:text-red-400">
                {section.prohibitedTitle ?? "Prohibited"}
              </h3>
              <ul className="space-y-2">
                {section.prohibitedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!section.allowedItems && section.listItems && !section.listTitle && (
        <ul className="mb-6 space-y-2">
          {section.listItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 icon-text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.faqs && (
        <div className="mb-6 space-y-2">
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Common Questions</h3>
          {section.faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}

      {section.callout && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 dark:bg-amber-950/20">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{section.callout.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-400/90">
              {section.callout.content}
            </p>
          </div>
        </div>
      )}

      {section.highlight && (
        <div
          className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
            section.id === "aup"
              ? "border-red-500/30 bg-red-50 dark:bg-red-950/20"
              : "border-secondary bg-gray-50 dark:bg-white/5"
          }`}
        >
          {section.id === "aup" ? (
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          ) : section.id === "sla" ? (
            <Shield className="mt-0.5 h-5 w-5 shrink-0 icon-text-primary" />
          ) : (
            <Lock className="mt-0.5 h-5 w-5 shrink-0 icon-text-primary" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{section.highlight.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {section.highlight.content}
            </p>
          </div>
        </div>
      )}

      {section.id === "support" && (
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={warnodesConfig.links.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary button-primary px-6 py-3 text-sm font-medium text-button-primary transition-colors hover:border-secondary hover:hover-gradient"
          >
            <MessageCircle className="h-4 w-4" />
            Open a Ticket
          </a>
          <a
            href={terms.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary bg-white/70 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            Join Discord
          </a>
        </div>
      )}
    </>
  )
}

export default function TermsPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const openAndScroll = (id: string) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

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

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary card-primary px-4 py-2">
              <Zap className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium icon-text-primary">{terms.badge}</span>
            </div>

            <h1 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {terms.title}
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              {terms.intro}
            </p>
            <span className="inline-block rounded-lg border border-secondary bg-white/70 px-4 py-2 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
              Last Updated: {terms.lastUpdated}
            </span>
          </motion.header>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {terms.sections.map((section) => {
              const Icon = iconMap[section.icon] ?? Zap
              const isOpen = openId === section.id
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => openAndScroll(section.id)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                    isOpen
                      ? "border-secondary button-primary text-button-primary"
                      : "border-secondary bg-white/70 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.title}
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            {terms.sections.map((section, index) => {
              const Icon = iconMap[section.icon] ?? Zap
              return (
                <AccordionSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  icon={Icon}
                  summary={section.tldr}
                  open={openId === section.id}
                  onToggle={() => toggleSection(section.id)}
                  delay={index * 0.04}
                >
                  <TermsSectionContent section={section} />
                </AccordionSection>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
