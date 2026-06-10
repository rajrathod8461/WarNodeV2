"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Download,
  Ban,
  CreditCard,
  Trash2,
  CheckCircle2,
  Lock,
  Shield,
  Settings,
  Cloud,
  Mail,
  Cookie,
  Scale,
  Eye,
  Edit,
  Database,
  Share2,
  type LucideIcon,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AccordionSection } from "../components/legal/AccordionSection"
import legalConfig from "../config/sections/legal.json"
import type { PrivacyPolicyConfig } from "../types/legal"

const privacy = legalConfig.privacyPolicy as PrivacyPolicyConfig

const iconMap: Record<string, LucideIcon> = {
  Ban,
  CreditCard,
  Trash2,
  CheckCircle2,
  Lock,
  Shield,
  Settings,
  Cloud,
  Mail,
  Cookie,
  Scale,
  Eye,
  Edit,
  Download,
  Database,
  Share2,
}

const sectionNav = [
  { id: "collect", label: "Data Collection", icon: Database },
  { id: "how-we-use", label: "How We Use", icon: CheckCircle2 },
  { id: "security", label: "Security", icon: Lock },
  { id: "data-sharing", label: "Data Sharing", icon: Share2 },
  { id: "cookies", label: "Cookies", icon: Cookie },
  { id: "your-rights", label: "Your Rights", icon: Scale },
]

export default function PrivacyPage() {
  const [openId, setOpenId] = useState<string | null>("collect")

  const toggleSection = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const openAndScroll = (id: string) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const handleDownloadPdf = () => {
    window.print()
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
              <ShieldCheck className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium icon-text-primary">{privacy.badge}</span>
            </div>

            <h1 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {privacy.title}
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              {privacy.intro}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-lg border border-secondary bg-white/70 px-4 py-2 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
                Last Updated: {privacy.lastUpdated}
              </span>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 rounded-lg border border-secondary bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
              >
                <Download className="h-4 w-4 icon-text-primary" />
                Download PDF
              </button>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-8 grid gap-4 sm:grid-cols-3"
          >
            {privacy.quickSummary.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Shield
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.06 }}
                  className="rounded-tl-xl rounded-br-xl border border-secondary bg-white/80 p-5 backdrop-blur-xl dark:bg-gray-950/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-secondary card-primary">
                    <Icon className="h-5 w-5 icon-text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {sectionNav.map(({ id, label, icon: Icon }) => {
              const isOpen = openId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => openAndScroll(id)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                    isOpen
                      ? "border-secondary button-primary text-button-primary"
                      : "border-secondary bg-white/70 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            <AccordionSection
              id="collect"
              title="What We Collect"
              icon={Database}
              summary={privacy.whatWeCollect.tldr}
              open={openId === "collect"}
              onToggle={() => toggleSection("collect")}
            >
              <p className="mb-5 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span>{" "}
                {privacy.whatWeCollect.tldr}
              </p>
              <div className="space-y-3 sm:hidden">
                {privacy.whatWeCollect.rows.map((row) => (
                  <div
                    key={row.dataType}
                    className="rounded-lg border border-secondary bg-gray-50 p-4 dark:bg-white/5"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">{row.dataType}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{row.purpose}</p>
                    <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Required: {row.required}
                    </p>
                  </div>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-lg border border-secondary sm:block">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="border-b border-secondary bg-gray-50 dark:bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Data Type</th>
                      <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Purpose</th>
                      <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacy.whatWeCollect.rows.map((row) => (
                      <tr key={row.dataType} className="border-b border-secondary/60 last:border-0">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.dataType}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.purpose}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.required}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionSection>

            <AccordionSection
              id="how-we-use"
              title="How We Use Your Data"
              icon={CheckCircle2}
              summary={privacy.howWeUse.tldr}
              open={openId === "how-we-use"}
              onToggle={() => toggleSection("how-we-use")}
              delay={0.04}
            >
              <p className="mb-5 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span> {privacy.howWeUse.tldr}
              </p>
              <ul className="space-y-3">
                {privacy.howWeUse.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 icon-text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              id="security"
              title="Security Measures"
              icon={Lock}
              summary={privacy.security.tldr}
              open={openId === "security"}
              onToggle={() => toggleSection("security")}
              delay={0.08}
            >
              <p className="mb-5 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span> {privacy.security.tldr}
              </p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {privacy.security.items.map((item) => {
                  const Icon =
                    item.includes("Encryption") ? Lock : item.includes("SSL") ? Shield : Settings
                  return (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-secondary bg-gray-50 px-4 py-3 dark:bg-white/5"
                    >
                      <Icon className="h-5 w-5 shrink-0 icon-text-primary" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item}</span>
                    </li>
                  )
                })}
              </ul>
            </AccordionSection>

            <AccordionSection
              id="data-sharing"
              title="Data Sharing"
              icon={Share2}
              summary={privacy.dataSharing.tldr}
              open={openId === "data-sharing"}
              onToggle={() => toggleSection("data-sharing")}
              delay={0.12}
            >
              <p className="mb-5 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span>{" "}
                {privacy.dataSharing.tldr}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {privacy.dataSharing.providers.map((provider) => {
                  const Icon = iconMap[provider.icon] ?? Cloud
                  return (
                    <div
                      key={provider.name}
                      className="flex items-center gap-3 rounded-lg border border-secondary bg-gray-50 px-4 py-3 dark:bg-white/5"
                    >
                      <Icon className="h-5 w-5 shrink-0 icon-text-primary" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{provider.name}</span>
                    </div>
                  )
                })}
              </div>
            </AccordionSection>

            <AccordionSection
              id="cookies"
              title="Cookies"
              icon={Cookie}
              summary={privacy.cookies.tldr}
              open={openId === "cookies"}
              onToggle={() => toggleSection("cookies")}
              delay={0.16}
            >
              <p className="mb-4 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-600 dark:bg-white/5 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">TL;DR:</span> {privacy.cookies.tldr}
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-secondary bg-gray-50 px-4 py-3 dark:bg-white/5">
                <Cookie className="mt-0.5 h-5 w-5 shrink-0 icon-text-primary" />
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {privacy.cookies.description}
                </p>
              </div>
            </AccordionSection>

            <AccordionSection
              id="your-rights"
              title="Your Rights"
              icon={Scale}
              summary="You can access, correct, download, or delete your personal data at any time."
              open={openId === "your-rights"}
              onToggle={() => toggleSection("your-rights")}
              delay={0.2}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {privacy.yourRights.rights.map((right) => {
                  const Icon = iconMap[right.icon] ?? Eye
                  return (
                    <div
                      key={right.label}
                      className="flex flex-col items-center gap-2 rounded-lg border border-secondary bg-gray-50 px-4 py-4 text-center dark:bg-white/5"
                    >
                      <Icon className="h-6 w-6 icon-text-primary" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{right.label}</span>
                    </div>
                  )
                })}
              </div>
            </AccordionSection>
          </div>

          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-tl-2xl rounded-br-2xl border border-secondary bg-white/80 p-8 text-center backdrop-blur-xl dark:bg-gray-950/30"
          >
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Have privacy questions?</h3>
            <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
              Our data protection team is here to help you.
            </p>
            <a
              href={`mailto:${privacy.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-lg border border-secondary button-primary px-6 py-3 text-sm font-medium text-button-primary no-underline transition-colors hover:border-secondary hover:hover-gradient"
            >
              <Mail className="h-4 w-4" />
              {privacy.contactEmail}
            </a>
          </motion.footer>
        </div>
      </div>

      <Footer />
    </div>
  )
}
