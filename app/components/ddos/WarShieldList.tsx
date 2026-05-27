"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Cpu,
  MemoryStick,
  Shield,
  Network,
  Headphones,
  Check,
} from "lucide-react"
import ddosConfig from "../../config/sections/ddos.json"
import type { DDoSConfig, DDoSLocation, DDoSPlan, DDoSPlanPrices } from "../../types/ddos"
import type { Currency } from "../../types/ui"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"
import { CountryFlag } from "../CountryFlag"

const config = ddosConfig as DDoSConfig

function formatWarShieldPrice(prices: DDoSPlanPrices, currency: Currency): string {
  const amount = prices[currency.code as keyof DDoSPlanPrices]
  if (currency.code === "INR") {
    return `${currency.symbol}${Math.round(amount)}`
  }
  return `${currency.symbol}${amount.toFixed(2)}`
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

export default function WarShieldList() {
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
    <div className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0b0f]">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-20"
          style={{ backgroundImage: `url('${config.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/50 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/70 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/90 to-gray-50/50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f]/70" />
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-left"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-1 card-primary">
                <span className="text-sm icon-text-primary">{t("ddos.badge")}</span>
              </div>
              <h1 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white">
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
              </h1>
              <p className="max-w-3xl text-md text-gray-600 dark:text-gray-300">{t("ddos.description")}</p>
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t("ddos.step1")}</h3>
            <div className="flex flex-wrap gap-2">
              {config.locations.map((location: DDoSLocation) => {
                const isSelected = selectedLocation === location.id
                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => setSelectedLocation(location.id)}
                    className={`flex items-center gap-3 rounded-tl-2xl rounded-br-2xl px-4 py-3 font-medium transition-all duration-300 ${
                      isSelected
                        ? "button-primary border-primary text-button-primary shadow-lg"
                        : "border border-secondary bg-gray-200 text-gray-700 hover:border-secondary dark:bg-gray-800/20 dark:text-gray-200 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <CountryFlag code={location.flag} alt={`${location.name} flag`} size="sm" />
                    <span className="text-sm font-medium">{location.name}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        <h3
          id="warshield-plans"
          className="mb-4 scroll-mt-28 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {showLocationPicker ? t("ddos.step2") : t("ddos.choosePlan")}
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {config.plans.map((plan: DDoSPlan, index: number) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`group relative flex h-full min-h-0 flex-col overflow-hidden rounded-tl-2xl rounded-br-2xl border bg-white/90 backdrop-blur-xl transition-all duration-300 dark:bg-gray-950/30 ${
                plan.popular
                  ? "border-icon-text-primary shadow-[0_0_0_1px_var(--icon-text-primary)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]"
                  : "border-secondary hover:border-secondary hover:hover-gradient dark:hover:hover-gradient"
              }`}
            >
              <div
                className={`absolute inset-y-0 left-0 w-1 rounded-tl-2xl ${
                  plan.popular ? "bg-icon-text-primary" : "bg-gray-300 dark:bg-gray-600 group-hover:bg-icon-text-primary"
                } transition-colors`}
              />
              <div className="relative flex min-h-0 flex-1 flex-col pl-5 pr-5 pb-6 pt-6 sm:pl-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CountryFlag code={currentLocation.flag} alt={currentLocation.name} size="sm" />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{currentLocation.name}</span>
                  </div>
                  {plan.badge && (
                    <span className="rounded-tl-lg rounded-br-lg bg-icon-text-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-icon-text-primary">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="orbitron-font mb-3 text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>

                <div className="mb-5 flex items-baseline gap-1">
                  <span className="orbitron-font text-3xl font-bold icon-text-primary">
                    {plan.prices ? formatWarShieldPrice(plan.prices, selectedCurrency) : convertPrice(`₹${plan.price}`)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
                </div>

                {plan.detailLines && plan.detailLines.length > 0 ? (
                  <ul className="mb-0 flex-1 space-y-2.5 border-t border-secondary pt-4">
                    {plan.detailLines.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm leading-snug text-gray-700 dark:text-gray-200">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-icon-text-primary" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="mb-5 grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
                      {[
                        { icon: MemoryStick, label: "RAM", value: plan.ram },
                        { icon: Cpu, label: "CPU", value: plan.cpu },
                        { icon: Network, label: "Ports", value: plan.ports },
                        { icon: Shield, label: "Shield", value: plan.protection },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="rounded-xl border border-secondary bg-gray-50/80 px-3 py-2 dark:bg-gray-900/40"
                        >
                          <div className="mb-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            <Icon className="h-3.5 w-3.5 shrink-0 icon-primary" />
                            {label}
                          </div>
                          <p className="text-xs font-semibold leading-snug text-gray-900 dark:text-gray-100">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-5 flex items-start gap-2 rounded-xl border border-secondary bg-gray-50/50 px-3 py-2.5 dark:bg-gray-900/30">
                      <Headphones className="mt-0.5 h-4 w-4 shrink-0 icon-primary" />
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t("ddos.support")}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.support}</p>
                      </div>
                    </div>
                  </div>
                )}

                <a
                  href={plan.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="orbitron-font mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 pt-5 font-medium text-button-primary transition-colors duration-300 button-primary hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)]"
                >
                  {t("gameServerList.orderNow")}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h3 className="orbitron-font mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("ddos.addonsTitle")}
          </h3>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.addons.map((addon) => (
              <div
                key={addon.id}
                className="group/addon rounded-tl-2xl rounded-br-2xl border border-secondary bg-white/90 p-5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(59,130,246,0.12)] dark:bg-gray-950/30 dark:hover:shadow-[0_8px_28px_rgba(59,130,246,0.08)]"
              >
                <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">{addon.name}</h4>
                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">{addon.unit}</p>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <AddonSlotPrice
                    inrAmount={addon.price}
                    convertPrice={convertPrice}
                    currencyCode={selectedCurrency.code}
                  />
                  {addon.oneTime && (
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{t("ddos.oneTime")}</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <h3 className="orbitron-font mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("ddos.comparisonTitle")}
          </h3>
          <div className="overflow-x-auto rounded-tl-2xl rounded-br-2xl border border-secondary bg-white/90 backdrop-blur-sm dark:bg-gray-950/30">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-secondary bg-gray-50 dark:bg-gray-900/50">
                  <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">{t("ddos.feature")}</th>
                  <th className="p-4 text-left font-medium text-gray-500 dark:text-gray-400">{t("ddos.ispShield")}</th>
                  <th className="p-4 text-left font-semibold icon-text-primary">WarShield</th>
                </tr>
              </thead>
              <tbody>
                {config.comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i % 2 === 0
                        ? "border-b border-secondary/60 bg-white/50 dark:border-gray-800 dark:bg-gray-900/20"
                        : "border-b border-secondary/60 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-900/10"
                    }
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{row.ispShield}</td>
                    <td className="p-4 font-medium icon-text-primary">
                      {row.warShield === "✓" ? <Check className="h-5 w-5" /> : row.warShield}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-tl-2xl rounded-br-2xl border border-secondary bg-gradient-to-br from-blue-600/12 via-white/90 to-transparent p-8 dark:from-blue-500/15 dark:via-gray-950/80 dark:to-transparent sm:p-10">
            <div className="max-w-2xl">
              <p className="orbitron-font text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                <span className="icon-text-primary">Stay online.</span>
              </p>
              <p className="orbitron-font mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Stay protected.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                Protect your gaming community with enterprise-grade infrastructure. Immediate deployment and
                zero-downtime migration.
              </p>
              <a
                href="#warshield-plans"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-transparent px-6 py-3 font-medium text-button-primary transition-colors duration-300 button-primary hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)]"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
