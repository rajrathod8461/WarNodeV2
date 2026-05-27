"use client"

import { motion } from "framer-motion"
import { Cpu, MemoryStick, HardDrive, Wifi, HeartPulse } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import discordConfig from "../../config/sections/discord.json"
import type { DiscordConfig, DiscordPlanPrices } from "../../types/discord"
import type { Currency } from "../../types/ui"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"

function formatDiscordPrice(prices: DiscordPlanPrices, currency: Currency): string {
  const amount = prices[currency.code as keyof DiscordPlanPrices]
  if (currency.code === "INR") return `${currency.symbol}${Math.round(amount)}`
  return `${currency.symbol}${amount.toFixed(2)}`
}

const config = discordConfig as DiscordConfig
const DISCORD_LOGO = config.discordLogo ?? "/icons/Discord-Symbol-Blurple.svg"
const HERO_BANNER = config.heroBanner ?? "/banners/discordbanner.avif"
const showPlanTypeStep = config.planTypes.length > 1

export default function DiscordPricingSection() {
  const { t } = useLanguage()
  const { selectedCurrency, setSelectedCurrency } = useCurrency()
  const [selectedPlanType, setSelectedPlanType] = useState(config.planTypes[0].id)

  const currentPlans = config.plans[selectedPlanType] || config.plans[config.planTypes[0].id]

  return (
    <motion.div className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0b0f]">
      <motion.div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BANNER}')` }}
        />
        <motion.div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/30 dark:to-transparent" />
        <motion.div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/45 dark:to-[#0a0b0f]/60" />
      </motion.div>

      <motion.div className="relative z-10 mx-auto mt-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-left"
        >
          <motion.div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <motion.div className="flex-1">
              <motion.div className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
                <span className="icon-text-primary text-sm">{t("discord.badge")}</span>
              </motion.div>
              <h2 className="orbitron-font mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                {t("discord.title").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="icon-text-primary relative">
                  {t("discord.title").split(" ").slice(-1)[0]}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1418 125"
                    className="absolute left-0 w-full text-icon-text-primary"
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
              <p className="max-w-3xl text-md text-gray-600 dark:text-gray-300">{t("discord.description")}</p>
            </motion.div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="mt-4 w-full sm:mt-0 sm:w-64"
            />
          </motion.div>
        </motion.div>

        {showPlanTypeStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t("discord.step1")}</h3>
            <motion.div className="flex flex-wrap gap-2">
              {config.planTypes.map((planType) => (
                <button
                  key={planType.id}
                  type="button"
                  onClick={() => setSelectedPlanType(planType.id)}
                  className={`flex items-center gap-3 rounded-tl-2xl rounded-br-2xl px-4 py-2 font-medium backdrop-blur-sm transition-all duration-300 ${
                    selectedPlanType === planType.id
                      ? "button-primary border-primary text-button-primary shadow-lg"
                      : "border border-secondary bg-gray-200 text-gray-700 dark:bg-gray-800/20 dark:text-gray-200 hover:border-secondary"
                  }`}
                >
                  <Image
                    src={planType.image || DISCORD_LOGO}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-md object-contain"
                    unoptimized
                  />
                  <span className="text-sm font-semibold">{planType.displayName}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}

        <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {showPlanTypeStep ? t("discord.step2") : t("discord.choosePlan")}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4"
        >
          <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative overflow-hidden rounded-md border border-secondary bg-white backdrop-blur-xl transition-all duration-300 hover:border-secondary hover:hover-gradient dark:bg-gray-950/20 dark:hover:hover-gradient"
              >
                {plan.badge && (
                  <motion.div className="absolute top-4 right-4">
                    <span className="button-primary rounded-tl-2xl rounded-br-2xl px-3 py-1 text-xs font-medium text-white">
                      {plan.badge}
                    </span>
                  </motion.div>
                )}
                <motion.div className="p-6">
                  <motion.div className="mb-6 flex items-center gap-4">
                    <motion.div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#5865F2]/10 p-2">
                      <Image
                        src={DISCORD_LOGO}
                        alt=""
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                        unoptimized
                      />
                    </motion.div>
                    <motion.div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("discord.planSubtitle")}</p>
                    </motion.div>
                  </motion.div>
                  <motion.div className="mb-6 grid grid-cols-2 gap-4">
                    <motion.div className="flex flex-col gap-1">
                      <motion.div className="flex items-center gap-2">
                        <Cpu className="icon-primary h-4 w-4" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{plan.cpuDetail}</span>
                      </motion.div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white">{plan.cpu}</span>
                    </motion.div>
                    <motion.div className="flex flex-col gap-1">
                      <motion.div className="flex items-center gap-2">
                        <MemoryStick className="icon-primary h-4 w-4" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{plan.ramDetail}</span>
                      </motion.div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white">{plan.ram}</span>
                    </motion.div>
                    <motion.div className="flex flex-col gap-1">
                      <motion.div className="flex items-center gap-2">
                        <HardDrive className="icon-primary h-4 w-4" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{plan.storageDetail}</span>
                      </motion.div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white">{plan.storage}</span>
                    </motion.div>
                    <motion.div className="flex flex-col gap-1">
                      <motion.div className="flex items-center gap-2">
                        <Wifi className="icon-primary h-4 w-4" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{plan.bandwidthDetail}</span>
                      </motion.div>
                      <span className="text-lg font-medium text-gray-900 dark:text-white">{plan.bandwidth}</span>
                    </motion.div>
                  </motion.div>
                  <motion.div className="mb-6 flex items-center gap-2">
                    <HeartPulse className="icon-primary h-4 w-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{plan.uptime}</span>
                  </motion.div>
                  <motion.div className="mt-6">
                    <motion.div className="mb-4 flex items-baseline justify-center">
                      <span className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.prices
                          ? formatDiscordPrice(plan.prices, selectedCurrency)
                          : plan.price}
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">{plan.period}</span>
                    </motion.div>
                    <a
                      href={plan.orderLink}
                      className="orbitron-font button-primary text-button-primary flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-6 py-3 font-medium transition-colors duration-300 hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)]"
                    >
                      {t("common.orderNow")}
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
