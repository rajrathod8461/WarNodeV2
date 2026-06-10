"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  ArrowRight,
  Gamepad2,
  Terminal,
  Bot,
  Globe,
  Wrench,
  CheckCircle2,
  XCircle,
  CreditCard,
  MessageCircle,
  Headphones,
  type LucideIcon,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AccordionSection } from "../components/legal/AccordionSection"
import legalConfig from "../config/sections/legal.json"
import type { RefundPolicyConfig } from "../types/legal"

const refund = legalConfig.refundPolicy as RefundPolicyConfig

const serviceIconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Terminal,
  Bot,
  Globe,
}

export default function RefundPolicyPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id))

  const openAndScroll = (id: string) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const quickLinks = [
    { id: "guarantee", label: "24h Guarantee", icon: ShieldCheck },
    { id: "services", label: "Service Terms", icon: Gamepad2 },
    { id: "development", label: "Development", icon: Wrench },
    { id: "non-refundable", label: "Non-Refundable", icon: XCircle },
    { id: "processing", label: "Payouts", icon: CreditCard },
    { id: "support", label: "Support", icon: MessageCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/banners/vps.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary card-primary px-4 py-2">
              <ShieldCheck className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium icon-text-primary">{refund.badge}</span>
            </div>

            <h1 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {refund.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
              {refund.intro}
            </p>
          </motion.header>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {quickLinks.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => openAndScroll(id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                  openId === id
                    ? "border-secondary button-primary text-button-primary"
                    : "border-secondary bg-white/70 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>

          <motion.div className="space-y-3">
            <AccordionSection
              id="guarantee"
              title={refund.guarantee.title}
              icon={ShieldCheck}
              summary={refund.guarantee.description}
              open={openId === "guarantee"}
              onToggle={() => toggle("guarantee")}
            >
              <span className="mb-4 inline-block rounded-full border border-secondary card-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider icon-text-primary">
                {refund.guarantee.badge}
              </span>
              <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                {refund.guarantee.description}
              </p>
              <a
                href={refund.guarantee.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-secondary button-primary px-6 py-3 text-sm font-medium text-button-primary transition-colors hover:border-secondary hover:hover-gradient"
              >
                {refund.guarantee.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </AccordionSection>

            <AccordionSection
              id="services"
              title={refund.serviceTermsTitle}
              icon={Gamepad2}
              summary="Minecraft, VPS, Bot, and Web hosting refund windows."
              open={openId === "services"}
              onToggle={() => toggle("services")}
              delay={0.04}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {refund.serviceTerms.map((service) => {
                  const Icon = serviceIconMap[service.icon] ?? Gamepad2
                  return (
                    <div
                      key={service.title}
                      className="rounded-tl-xl rounded-br-xl border border-secondary bg-gray-50 p-4 dark:bg-white/5"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary card-primary">
                          <Icon className="h-4 w-4 icon-text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                          <p className="text-xs font-medium icon-text-primary">{service.period}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                    </div>
                  )
                })}
              </div>
            </AccordionSection>

            <AccordionSection
              id="development"
              title={refund.development.title}
              icon={Wrench}
              summary={refund.development.note}
              open={openId === "development"}
              onToggle={() => toggle("development")}
              delay={0.08}
            >
              <p className="mb-4 rounded-lg border border-secondary/50 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:bg-white/5 dark:text-gray-300">
                {refund.development.note}
              </p>
              <ul className="space-y-2">
                {refund.development.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 icon-text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              id="non-refundable"
              title={refund.nonRefundableTitle}
              icon={XCircle}
              summary="Illegal activity, chargebacks, and TOS violations."
              open={openId === "non-refundable"}
              onToggle={() => toggle("non-refundable")}
              delay={0.12}
            >
              <ul className="space-y-4">
                {refund.nonRefundable.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionSection>

            <AccordionSection
              id="processing"
              title={refund.processing.title}
              icon={CreditCard}
              summary={refund.processing.description}
              open={openId === "processing"}
              onToggle={() => toggle("processing")}
              delay={0.16}
            >
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {refund.processing.description}
              </p>
            </AccordionSection>

            <AccordionSection
              id="support"
              title={refund.support.title}
              icon={MessageCircle}
              summary={refund.support.description}
              open={openId === "support"}
              onToggle={() => toggle("support")}
              delay={0.2}
            >
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{refund.support.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={refund.support.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-secondary button-primary px-6 py-3 text-sm font-medium text-button-primary transition-colors hover:border-secondary hover:hover-gradient"
                >
                  <MessageCircle className="h-4 w-4" />
                  {refund.support.discordLabel}
                </a>
                <a
                  href={refund.support.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-secondary bg-white/70 px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
                >
                  <Headphones className="h-4 w-4 icon-text-primary" />
                  {refund.support.ticketLabel}
                </a>
              </div>
            </AccordionSection>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
