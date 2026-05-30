"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Cpu,
  MemoryStick,
  Shield,
  Network,
  Check,
  Headphones,
  Globe,
  EyeOff,
  Layers,
  ScanSearch,
  Gamepad2,
  ShieldCheck,
  Minus,
  type LucideIcon,
} from "lucide-react"
import type { DDoSAddon, DDoSComparisonRow } from "../../types/ddos"
import ddosConfig from "../../config/sections/ddos.json"
import type { DDoSConfig, DDoSLocation, DDoSPlan, DDoSPlanPrices } from "../../types/ddos"
import type { Currency } from "../../types/ui"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"
import { useProductStock } from "../../hooks/useProductStock"
import { CountryFlag } from "../CountryFlag"

const config = ddosConfig as DDoSConfig

const WARSHIELD_CORNER = "rounded-tl-2xl rounded-br-2xl"
const WARSHIELD_CORNER_SM = "rounded-tl-xl rounded-br-xl"

const ADDON_ICONS: Record<string, LucideIcon> = {
  ram: MemoryStick,
  port: Network,
  ip: Globe,
  firewall: Shield,
}

const COMPARISON_ICONS: Record<string, LucideIcon> = {
  "Built for Minecraft": Gamepad2,
  "Backend Stealth": EyeOff,
  "Packet Inspection": ScanSearch,
  "Multi-Layer Scrubbing": Layers,
  "Flood Suppression": ShieldCheck,
}

function WarShieldPlanOrderButton({
  plan,
  orderNowText,
}: {
  plan: DDoSPlan
  orderNowText: string
}) {
  const stock = useProductStock(plan.orderLink)

  if (stock.isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className={`orbitron-font flex w-full cursor-not-allowed items-center justify-center gap-2 border border-red-500/60 bg-red-600/80 px-6 py-3 font-medium text-white ${WARSHIELD_CORNER}`}
      >
        Out of stock
      </button>
    )
  }

  return (
    <a
      href={plan.orderLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`orbitron-font flex w-full items-center justify-center gap-2 border border-transparent px-6 py-3 font-medium button-primary text-button-primary no-underline transition-colors duration-300 hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] ${WARSHIELD_CORNER}`}
    >
      {orderNowText}
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )
}

function featureLineIcon(line: string): LucideIcon {
  const lower = line.toLowerCase()
  if (/\bram\b|gb dedicated/.test(lower)) return MemoryStick
  if (/vcpu|core/.test(lower)) return Cpu
  if (/port/.test(lower)) return Network
  if (/support|ticket|priority|vip|queue|community/.test(lower)) return Headphones
  if (/shield|protection|firewall|ddos|filter|ovh|tcp|vac/.test(lower)) return Shield
  return Check
}

const CARD_BORDER = "border-gray-200/50 dark:border-white/10"
const CARD_DIVIDER = "border-gray-200/40 dark:border-white/10"
const SECTION_BADGE_CORNER = "rounded-tl-xl rounded-br-2xl"

const TITLE_UNDERLINE_PATH =
  "M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"

function ThemedSectionHeading({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description?: string
}) {
  const words = title.split(" ")
  const lastWord = words.slice(-1)[0] ?? title
  const leading = words.slice(0, -1).join(" ")

  return (
    <div className="mb-6 text-left">
      <div
        className={`mb-4 inline-flex items-center gap-2 border border-secondary card-primary px-4 py-2 ${SECTION_BADGE_CORNER}`}
      >
        <span className="text-sm icon-text-primary">{badge}</span>
      </div>
      <h3 className="orbitron-font mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {leading ? `${leading} ` : ""}
        <span className="icon-text-primary relative">
          {lastWord}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1418 125"
            className="absolute left-0 w-full text-icon-text-primary"
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1, pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <path d={TITLE_UNDERLINE_PATH} fill="currentColor" />
          </motion.svg>
        </span>
      </h3>
      {description ? (
        <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">{description}</p>
      ) : null}
    </div>
  )
}

function WarShieldPlanCard({
  plan,
  locationName,
  locationFlag,
  priceLabel,
  orderNowText,
}: {
  plan: DDoSPlan
  locationName: string
  locationFlag: string
  priceLabel: string
  orderNowText: string
}) {
  const features = plan.detailLines ?? []
  const isPopular = plan.popular || plan.badge === "Popular"

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden border bg-white/90 backdrop-blur-xl transition-all duration-300 hover:border-[var(--border-secondary)] hover:hover-gradient dark:bg-gray-950/30 dark:hover:hover-gradient ${WARSHIELD_CORNER} ${CARD_BORDER} ${
        isPopular ? "ring-1 ring-[var(--icon-text-primary)]/25" : ""
      }`}
    >
      {plan.badge && (
        <div className="absolute right-4 top-4 z-10">
          <span className={`button-primary px-3 py-1 text-xs font-medium text-white ${WARSHIELD_CORNER}`}>
            {plan.badge}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 pr-10">
          <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <CountryFlag code={locationFlag} alt={locationName} size="sm" />
            <span>{locationName}</span>
          </p>
        </div>

        <ul className={`mb-6 flex-1 space-y-2.5 border-y py-5 ${CARD_DIVIDER}`}>
          {features.map((line) => {
            const Icon = featureLineIcon(line)
            return (
              <li key={line} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 icon-primary" strokeWidth={2} aria-hidden />
                <span className="text-sm leading-snug text-gray-700 dark:text-gray-300">{line}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto">
          <div className="mb-4 flex items-baseline justify-center">
            <span className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white">{priceLabel}</span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/mo</span>
          </div>
          <WarShieldPlanOrderButton plan={plan} orderNowText={orderNowText} />
        </div>
      </div>
    </div>
  )
}

function WarShieldComparisonTable({
  rows,
  featureLabel,
  ispLabel,
}: {
  rows: DDoSComparisonRow[]
  featureLabel: string
  ispLabel: string
}) {
  return (
    <>
      <div className={`hidden overflow-hidden md:block ${WARSHIELD_CORNER} ${CARD_BORDER} border bg-white/90 dark:bg-gray-950/30`}>
        <div className={`grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1.15fr)] border-b ${CARD_DIVIDER}`}>
          <div className="px-5 py-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
              {featureLabel}
            </span>
          </div>
          <div className={`border-l px-5 py-4 ${CARD_DIVIDER}`}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
              {ispLabel}
            </span>
          </div>
          <div className={`border-l bg-[var(--icon-text-primary)]/[0.06] px-5 py-4 ${CARD_DIVIDER}`}>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 icon-primary" strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] icon-text-primary">
                WarShield
              </span>
            </div>
          </div>
        </div>

        {rows.map((row, index) => {
          const FeatureIcon = COMPARISON_ICONS[row.feature] ?? Shield
          return (
            <div
              key={row.feature}
              className={`grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1.15fr)] ${
                index < rows.length - 1 ? `border-b ${CARD_DIVIDER}` : ""
              } ${index % 2 === 1 ? "bg-gray-50/40 dark:bg-white/[0.02]" : ""}`}
            >
              <div className="flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100/90 dark:bg-white/5">
                  <FeatureIcon className="h-4 w-4 icon-primary" strokeWidth={2} aria-hidden />
                </span>
                <span className="pt-1 text-sm font-semibold text-gray-900 dark:text-white">{row.feature}</span>
              </div>
              <div className={`flex items-start gap-2.5 border-l px-5 py-4 ${CARD_DIVIDER}`}>
                <Minus className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-gray-500" strokeWidth={2.5} aria-hidden />
                <span className="text-sm leading-snug text-gray-500 dark:text-gray-400">{row.ispShield}</span>
              </div>
              <div
                className={`flex items-start gap-2.5 border-l bg-[var(--icon-text-primary)]/[0.06] px-5 py-4 ${CARD_DIVIDER}`}
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 icon-primary" strokeWidth={2.5} aria-hidden />
                <span className="text-sm font-medium leading-snug text-gray-800 dark:text-gray-200">
                  {row.warShield === "✓" ? "Included" : row.warShield}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => {
          const FeatureIcon = COMPARISON_ICONS[row.feature] ?? Shield
          return (
            <div
              key={row.feature}
              className={`border bg-white/90 p-4 dark:bg-gray-950/30 ${WARSHIELD_CORNER} ${CARD_BORDER}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100/90 dark:bg-white/5">
                  <FeatureIcon className="h-4 w-4 icon-primary" strokeWidth={2} aria-hidden />
                </span>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{row.feature}</h4>
              </div>
              <div className="space-y-2">
                <div className={`rounded-lg px-3 py-2.5 ${WARSHIELD_CORNER_SM} bg-gray-50/80 dark:bg-white/[0.03]`}>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">{ispLabel}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{row.ispShield}</p>
                </div>
                <div
                  className={`rounded-lg px-3 py-2.5 ${WARSHIELD_CORNER_SM} bg-[var(--icon-text-primary)]/[0.08]`}
                >
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide icon-text-primary">WarShield</p>
                  <p className="flex items-start gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 icon-primary" strokeWidth={2.5} aria-hidden />
                    <span>{row.warShield === "✓" ? "Included" : row.warShield}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function WarShieldAddonCard({
  addon,
  convertPrice,
  currencyCode,
  oneTimeLabel,
}: {
  addon: DDoSAddon
  convertPrice: (price: string) => string
  currencyCode: string
  oneTimeLabel: string
}) {
  const Icon = ADDON_ICONS[addon.id] ?? Shield

  return (
    <div
      className={`group/addon border bg-white/90 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--border-secondary)] hover:hover-gradient dark:bg-gray-950/30 dark:hover:hover-gradient ${WARSHIELD_CORNER} ${CARD_BORDER}`}
    >
      <div className="mb-4 flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center bg-gray-100/80 dark:bg-white/5 ${WARSHIELD_CORNER_SM}`}
        >
          <Icon className="h-5 w-5 icon-primary" strokeWidth={2} aria-hidden />
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white">{addon.name}</h4>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{addon.unit}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <AddonSlotPrice inrAmount={addon.price} convertPrice={convertPrice} currencyCode={currencyCode} />
        {addon.oneTime && (
          <span
            className={`shrink-0 bg-gray-100/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-white/5 dark:text-gray-400 ${WARSHIELD_CORNER_SM}`}
          >
            {oneTimeLabel}
          </span>
        )}
      </div>
    </div>
  )
}

function AddonSlotPrice({
  inrAmount,
  convertPrice,
  currencyCode,
}: {
  inrAmount: number
  convertPrice: (price: string) => string
  currencyCode: string
}) {
  const target = convertPrice(`₹${inrAmount}`)
  const [display, setDisplay] = useState(target)
  const spinningRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplay(convertPrice(`₹${inrAmount}`))
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      spinningRef.current = false
    }
  }, [inrAmount, currencyCode, convertPrice])

  const runSpin = useCallback(() => {
    if (spinningRef.current) return
    spinningRef.current = true
    let tick = 0
    const maxTicks = 22
    const cap = Math.max(inrAmount * 5, 999)
    intervalRef.current = setInterval(() => {
      tick++
      const jitter = Math.floor(Math.random() * cap) + 1
      setDisplay(convertPrice(`₹${jitter}`))
      if (tick >= maxTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplay(convertPrice(`₹${inrAmount}`))
        spinningRef.current = false
      }
    }, 48)
  }, [inrAmount, convertPrice])

  return (
    <span
      role="presentation"
      onMouseEnter={runSpin}
      className="orbitron-font inline-block min-h-[2.5rem] cursor-default select-none text-2xl font-bold tabular-nums text-icon-text-primary transition-[filter,transform] duration-150 hover:scale-[1.03]"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {display}
    </span>
  )
}

function formatWarShieldPrice(prices: DDoSPlanPrices, currency: Currency): string {
  const amount = prices[currency.code as keyof DDoSPlanPrices]
  if (currency.code === "INR") {
    return `${currency.symbol}${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `${currency.symbol}${amount.toFixed(2)}`
}

export default function WarShieldPricingSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const { t } = useLanguage()
  const [selectedLocation, setSelectedLocation] = useState<string>(config.locations[0]?.id || "")
  const showLocationPicker = config.locations.length > 1

  useEffect(() => {
    const location = searchParams.get("location")
    if (location && config.locations.some((l) => l.id === location)) {
      setSelectedLocation(location)
    }
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("location", selectedLocation)
    const newUrl = `/ddos?${params.toString()}`
    const currentUrl = window.location.pathname + window.location.search
    if (newUrl !== currentUrl) {
      router.replace(newUrl)
    }
  }, [selectedLocation, router])

  const currentLocation = config.locations.find((loc) => loc.id === selectedLocation)

  if (!currentLocation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0a0b0f]">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-icon-text-primary" />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 dark:bg-[#0a0b0f]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${config.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-left"
        >
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-tl-xl rounded-br-2xl border border-secondary card-primary px-4 py-2">
                <span className="text-sm icon-text-primary">{t("ddos.badge")}</span>
              </div>
              <h2 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                {t("ddos.title").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="icon-text-primary relative">
                  {t("ddos.title").split(" ").slice(-1)[0]}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1418 125"
                    className="absolute left-0 w-full text-icon-text-primary"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.35 }}
                  >
                    <path
                      d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </span>
              </h2>
              <p className="max-w-3xl text-sm text-gray-600 dark:text-gray-300">{t("ddos.description")}</p>
              {!showLocationPicker && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CountryFlag code={currentLocation.flag} alt="" size="sm" />
                  <span>
                    <span className="font-medium text-gray-900 dark:text-white">{currentLocation.name}</span>{" "}
                    — {t("ddos.popEdge")}
                  </span>
                </div>
              )}
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="mt-4 w-full sm:mt-0 sm:w-64"
            />
          </div>
        </motion.div>

        {showLocationPicker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <h3 className="mb-3.5 text-sm font-medium text-gray-700 dark:text-gray-300">{t("ddos.step1")}</h3>
            <div className="flex flex-wrap gap-2">
              {config.locations.map((location: DDoSLocation) => {
                const isSelected = selectedLocation === location.id
                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => setSelectedLocation(location.id)}
                    className={`flex items-center gap-3 rounded-tl-2xl rounded-br-2xl px-6 py-3.5 font-medium transition-all duration-300 ${
                      isSelected
                        ? "button-primary border-primary text-button-primary shadow-lg"
                        : "border border-secondary bg-gray-200 text-gray-700 hover:border-secondary dark:bg-gray-800/20 dark:text-gray-200 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <CountryFlag code={location.flag} alt={`${location.name} flag`} size="md" className="rounded-full" />
                    <span className="text-sm font-medium">{location.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        <h3
          id="warshield-plans"
          className="mb-3 scroll-mt-28 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {showLocationPicker ? t("ddos.step2") : t("ddos.choosePlan")}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.plans.map((plan: DDoSPlan, index: number) => {
              const priceLabel = plan.prices
                ? formatWarShieldPrice(plan.prices, selectedCurrency)
                : convertPrice(`₹${plan.price}`)
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="h-full"
                >
                  <WarShieldPlanCard
                    plan={plan}
                    locationName={currentLocation.name}
                    locationFlag={currentLocation.flag}
                    priceLabel={priceLabel}
                    orderNowText={t("common.orderNow")}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <ThemedSectionHeading badge={t("ddos.addonsBadge")} title={t("ddos.addonsTitle")} />
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.addons.map((addon) => (
              <WarShieldAddonCard
                key={addon.id}
                addon={addon}
                convertPrice={convertPrice}
                currencyCode={selectedCurrency.code}
                oneTimeLabel={t("ddos.oneTime")}
              />
            ))}
          </div>

          <ThemedSectionHeading
            badge={t("ddos.comparisonBadge")}
            title={t("ddos.comparisonTitle")}
            description={t("ddos.comparisonDesc")}
          />
          <WarShieldComparisonTable
            rows={config.comparison}
            featureLabel={t("ddos.feature")}
            ispLabel={t("ddos.ispShield")}
          />

          <div className={`mt-8 border bg-white/90 p-8 dark:bg-gray-950/30 sm:p-10 ${WARSHIELD_CORNER} ${CARD_BORDER}`}>
            <div className="max-w-2xl">
              <p className="orbitron-font text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                <span className="icon-text-primary">{t("ddos.ctaStayOnline")}</span>
              </p>
              <p className="orbitron-font mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {t("ddos.ctaStayProtected")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                {t("ddos.ctaBody")}
              </p>
              <a
                href="#warshield-plans"
                className={`button-primary text-button-primary mt-6 inline-flex items-center justify-center border border-transparent px-6 py-3 font-medium transition-colors duration-300 hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] ${WARSHIELD_CORNER}`}
              >
                {t("ddos.deployNow")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
