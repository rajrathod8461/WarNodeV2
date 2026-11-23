"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Shield,
  Globe,
  Monitor,
  Zap,
  Lock,
  RefreshCw,
  Users,
  BarChart2,
  Clock,
  CheckCircle2,
  HardDrive,
  Inbox,
  ArrowRight,
  Sparkles,
  Server,
  Cpu,
  HeartPulse,
} from "lucide-react"
import Image from "next/image"
import emailConfig from "../../config/sections/email.json"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"
import type { Currency } from "../../types/ui"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Globe,
  Monitor,
  Zap,
  Lock,
  RefreshCw,
  Users,
  BarChart2,
  Clock,
  Mail,
  HardDrive,
  Inbox,
}

const getIcon = (name: string): React.ComponentType<{ className?: string }> => iconMap[name] || Mail

const INCLUDED_FEATURES = [
  "Custom domain email (@yourdomain.com)",
  "Web Email Control Panel",
  "Roundcube webmail access",
  "SSL/TLS encrypted connections",
  "IMAP, POP3 & SMTP support",
  "Spam & virus protection (SpamAssassin)",
  "Email aliases & forwarders",
  "Auto-responders & out-of-office",
  "99.9% uptime SLA guarantee",
]

interface EmailPlan {
  id: string
  name: string
  mailboxes: number
  storage: string
  storageRaw: number
  traffic?: string
  domains?: number
  emailAddresses?: number
  emailForwardings?: number
  price: number
  badge: string | null
  orderLink: string
}

function formatEmailPrice(basePriceINR: number, currency: Currency): string {
  if (currency.code === "INR") {
    return `${currency.symbol}${basePriceINR}`
  } else if (currency.code === "USD") {
    const usd = (basePriceINR / 85).toFixed(2)
    return `${currency.symbol}${usd}`
  } else if (currency.code === "EUR") {
    const eur = (basePriceINR / 92).toFixed(2)
    return `${currency.symbol}${eur}`
  }
  return `${currency.symbol}${basePriceINR}`
}

function EmailPlanCard({
  plan,
  index,
  currency,
}: {
  plan: EmailPlan
  index: number
  currency: Currency
}) {
  const isPopular = Boolean(plan.badge)

  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
      className={`relative overflow-hidden rounded-md border backdrop-blur-xl transition-all duration-300 hover:hover-gradient dark:hover:hover-gradient ${
        isPopular
          ? "border-primary shadow-lg shadow-primary/10 bg-white dark:bg-gray-950/40 ring-1 ring-primary/40"
          : "border-secondary bg-white dark:bg-gray-950/20 hover:border-secondary"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <motion.div className="absolute top-4 right-4 z-10">
          <span className="button-primary rounded-tl-2xl rounded-br-2xl px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {plan.badge}
          </span>
        </motion.div>
      )}

      <div className="p-6">
        {/* Header Icon + Name */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg card-primary border border-secondary p-2.5">
            <Mail className="h-8 w-8 icon-text-primary" />
          </div>
          <div>
            <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
              {plan.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">WarNodes Business Email</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
          {/* Storage */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <HardDrive className="icon-primary h-3.5 w-3.5" />
              <span>Disk Space</span>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {plan.storage}
            </span>
          </div>

          {/* Traffic */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Zap className="icon-primary h-3.5 w-3.5" />
              <span>Traffic</span>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {plan.traffic || "Unlimited"}
            </span>
          </div>

          {/* Domains */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Globe className="icon-primary h-3.5 w-3.5" />
              <span>Domains</span>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {plan.domains ?? 1} {plan.domains === 1 ? "Domain" : "Domains"}
            </span>
          </div>

          {/* Email Accounts */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Inbox className="icon-primary h-3.5 w-3.5" />
              <span>Email Accounts</span>
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {plan.mailboxes} {plan.mailboxes === 1 ? "Account" : "Accounts"}
            </span>
          </div>
        </div>

        {/* Addresses & Forwardings specs bar */}
        <div className="mb-5 flex items-center justify-between px-3 py-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs">
          <span className="text-gray-600 dark:text-gray-300">
            Addresses: <strong className="text-gray-900 dark:text-white">{plan.emailAddresses ?? plan.mailboxes * 5}</strong>
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-300">
            Forwardings: <strong className="text-gray-900 dark:text-white">{plan.emailForwardings ?? plan.mailboxes * 5}</strong>
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-500 font-medium">Free SSL</span>
        </div>

        {/* Pricing + Action Button */}
        <div className="mt-6">
          <div className="mb-4 flex items-baseline justify-center">
            <span className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white">
              {formatEmailPrice(plan.price, currency)}
            </span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">/mo</span>
          </div>

          <a
            href={plan.orderLink}
            className="orbitron-font button-primary text-button-primary flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 font-medium no-underline transition-colors duration-300 hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)]"
          >
            Order Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function EmailPricingSection() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency()
  const { t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const plans = emailConfig.plans as EmailPlan[]

  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Banners & Theme Gradients */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-20"
          style={{
            backgroundImage: `url('/Creating_email_hosting_banner_4671e6b5_2K.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/70 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/90 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/80 dark:to-[#0a0b0f]/60" />
      </div>

      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        {/* Header section with Badge, Title, Description, and CurrencySelector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
                <span className="icon-text-primary text-sm">{emailConfig.hero.badge}</span>
              </div>
              <h2 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                {emailConfig.hero.title}{" "}
                <span className="icon-text-primary relative inline-block">
                  {emailConfig.hero.titleHighlight}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1418 125"
                    className="absolute left-0 w-full text-icon-text-primary top-full -mt-1 pointer-events-none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path
                      d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </span>
              </h2>
              <p className="max-w-3xl text-md text-gray-600 dark:text-gray-300">
                {emailConfig.hero.description}
              </p>
            </div>

            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full sm:w-64 mt-4 sm:mt-0"
            />
          </div>
        </motion.div>

        {/* Step Indicator */}
        <h3 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          Choose Your Email Hosting Plan:
        </h3>

        {/* Plan Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <EmailPlanCard
                key={plan.id}
                plan={plan}
                index={index}
                currency={selectedCurrency}
              />
            ))}
          </div>
        </motion.div>

        {/* Feature Showcase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
            <span className="icon-text-primary text-sm">Everything Included</span>
          </div>
          <h2 className="orbitron-font mb-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Packed with <span className="icon-text-primary">WarNodes Features</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Every email plan is hosted on ultra-fast Gen4 NVMe storage with the full WarNodes panel capability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {emailConfig.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon)
            const isActive = activeFeature === index

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
                className={`relative p-6 rounded-md border backdrop-blur-xl transition-all duration-300 hover:hover-gradient ${
                  isActive
                    ? "border-primary card-primary shadow-lg shadow-primary/10"
                    : "border-secondary bg-white dark:bg-gray-950/20 hover:border-secondary"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg card-primary border border-secondary mb-4">
                  <IconComponent className="h-6 w-6 icon-text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* All Included Checklist Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-md border border-secondary bg-white/80 dark:bg-gray-950/30 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold orbitron-font text-gray-900 dark:text-white mb-6">
            All plans include standard features:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INCLUDED_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 icon-text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
