"use client"

import { Check, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { CurrencySelector, useCurrency } from "./ui/CurrencySelector"
import type { Currency } from "../types/ui"
import pricingConfig from "../config/sections/pricing.json"
import type { PricingConfig } from "../types/pricing"
import { useLanguage } from "../contexts/LanguageContext"
import warnodesConfig from "../config/sections/warnodes.json"
import { SectionHeader } from "./premium/ui/SectionHeader"
import { ScrollReveal } from "./premium/ui/ScrollReveal"
import { TiltCard } from "./premium/ui/TiltCard"
import { cn } from "@/lib/utils"

const config = pricingConfig as PricingConfig
const FEATURE_COUNT = 5

function PricingCard({
  plan,
  index,
  selectedCurrency,
  convertPrice,
  t,
}: {
  plan: PricingConfig["section"]["plans"][number]
  index: number
  selectedCurrency: Currency
  convertPrice: (price: string) => string
  t: (key: string) => string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(500px at ${mouseX}px ${mouseY}px, rgba(19,127,236,0.18), transparent 50%)`

  const currencyCode = selectedCurrency.code as "INR" | "USD" | "EUR"
  const priceLabel =
    plan.displayPrices?.[currencyCode] ||
    convertPrice(String(plan.basePrice))

  return (
    <ScrollReveal delay={index * 0.07} className="h-full">
      <TiltCard
        popular={plan.popular}
        intensity={7}
        className={cn(
          "flex h-full flex-col bg-[#080b14]/90 backdrop-blur-xl",
          plan.popular && "md:-translate-y-2"
        )}
      >
        <div
          className="relative flex h-full flex-col"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
          }}
        >
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glow }} />

          {plan.popular && (
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-xl border border-t-0 border-[#137fec]/40 bg-[#137fec]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-100 backdrop-blur-md">
              Best value
            </div>
          )}

          <div className="relative h-36 shrink-0 overflow-hidden sm:h-40">
            <Image
              src={plan.image || "/placeholder.svg"}
              alt={t(plan.titleKey)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/40 to-transparent" />
          </div>

          <div className="relative flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold tracking-tight text-white">{t(plan.titleKey)}</h3>
            <p className="mt-2 min-h-[40px] text-sm leading-relaxed text-white/45">
              {t(plan.descriptionKey)}
            </p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-white">{priceLabel}</span>
              {plan.priceSuffix && (
                <span className="text-sm text-white/40">{plan.priceSuffix}</span>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.featuresKeys.slice(0, FEATURE_COUNT).map((key) => (
                <li key={key} className="flex items-start gap-2.5 text-sm text-white/65">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#137fec]/15">
                    <Check className="h-3 w-3 text-[#137fec]" strokeWidth={3} />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>

            <Link
              href={plan.link}
              className={cn(
                "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition-all duration-300",
                plan.popular
                  ? "bg-white text-[#05060a] hover:bg-blue-50"
                  : "border border-white/12 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]"
              )}
            >
              {t(plan.buttonTextKey)}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  )
}

export default function PricingSection() {
  const { t } = useLanguage()
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#137fec]/10 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              {t("pricingSection.title")}{" "}
              <span className="text-[#137fec]">{t("pricingSection.titleHighlight")}</span>
            </>
          }
          description={t("pricingSection.description")}
          actions={
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full sm:w-56"
            />
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {config.section.plans.map((plan, index) => (
            <PricingCard
              key={plan.titleKey}
              plan={plan}
              index={index}
              selectedCurrency={selectedCurrency}
              convertPrice={convertPrice}
              t={t}
            />
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <p className="text-sm text-white/45">
            {t("pricingSection.footerText")}{" "}
            <a
              href={warnodesConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#137fec] transition-colors hover:text-blue-300"
            >
              {t("pricingSection.footerLinkText")}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
