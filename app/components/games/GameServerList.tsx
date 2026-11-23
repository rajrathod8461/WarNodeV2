"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  Shield,
  Cpu,
  HardDrive,
  MemoryStick,
  ArrowRight,
  Users,
  Star,
} from "lucide-react"
import Link from "next/link"
import gamesConfig from "../../config/sections/games.json"
import uiConfig from "../../config/sections/ui.json"
import type { GamesConfig, Game, GamePlan, GameLocation } from "../../types/games"
import type { Currency } from "../../types/ui"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"
import { CountryFlag } from "../CountryFlag"
import { useProductStock } from "../../hooks/useProductStock"
const config = gamesConfig as GamesConfig
const PLAN_TYPE_IDS = config.planTypes.map((t) => t.id)

const CPU_BRAND = {
  intel: {
    primary: "#0071C5",
    glow: "rgba(0, 113, 197, 0.18)",
    border: "rgba(0, 113, 197, 0.5)",
    surface: "rgba(0, 113, 197, 0.1)",
  },
  amd: {
    primary: "#D9480F",
    glow: "rgba(217, 72, 15, 0.2)",
    border: "rgba(217, 72, 15, 0.55)",
    surface: "rgba(217, 72, 15, 0.1)",
  },
} as const

function getCpuBrand(planTypeId: string) {
  return planTypeId === "amd" ? CPU_BRAND.amd : CPU_BRAND.intel
}

function getPlanIcon(plan: GamePlan, game?: Game): string {
  if (plan.image) return encodeURI(plan.image)
  if (game?.id === "hytale") {
    return encodeURI(game.icon || game.banner || "/banners/hytale.webp")
  }
  if (game?.id === "cs2") {
    if (plan.type === "intel") {
      return encodeURI("/banners/cs2intel.png")
    }
    return encodeURI("/banners/counter_strike_2card.png")
  }
  if (game?.id === "rust") {
    return encodeURI(game.icon || "/icons/rust-icon.webp")
  }
  if (game?.id === "palworld") {
    return encodeURI(game.icon || "/icons/logo (2).png")
  }
  if (game?.id === "fivem") {
    return encodeURI(game.icon || "/icons/824336.jpg")
  }
  const mob = plan.id.replace(/^amd-/, "")
  if (plan.type === "amd") {
    return encodeURI(`/pricing/mc icons/amd mc icons/${mob} amd.png`)
  }
  return encodeURI(`/pricing/mc icons/intel mc icons/${mob}.png`)
}

function formatFixedGamePrice(
  prices: NonNullable<GamePlan["prices"]>,
  currency: Currency
): string {
  const amount = prices[currency.code as keyof typeof prices]
  if (currency.code === "INR") return `${currency.symbol}${Math.round(amount)}`
  return `${currency.symbol}${amount.toFixed(2)}`
}

function GamePlanOrderButton({
  plan,
  planBrand,
  orderNowText,
}: {
  plan: GamePlan
  planBrand: {
    primary: string
    glow?: string
    border?: string
    surface?: string
  }
  orderNowText: string
}) {
  const stock = useProductStock(plan.orderLink)

  if (stock.eligible && stock.isChecking) {
    return (
      <button
        type="button"
        disabled
        className="orbitron-font shrink-0 cursor-wait rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-gray-300"
      >
        Checking…
      </button>
    )
  }

  if (stock.isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className="orbitron-font shrink-0 cursor-not-allowed rounded-lg border border-red-500/60 bg-red-600/80 px-5 py-2.5 text-xs font-bold text-white"
      >
        Out of stock
      </button>
    )
  }

  return (
    <a
      href={plan.orderLink}
      className="orbitron-font shrink-0 rounded-lg border px-5 py-2.5 text-xs sm:text-sm font-bold text-white no-underline transition-all duration-200 hover:opacity-90 shadow-sm hover:shadow-md active:scale-95"
      style={{
        borderColor: planBrand.primary,
        backgroundColor: planBrand.primary,
      }}
    >
      {orderNowText}
    </a>
  )
}

export default function GameServerList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const { t } = useLanguage()
  const requestedGame = searchParams.get("game")
  const requestedLocation = searchParams.get("location")
  const requestedPlan = searchParams.get("plan")

  const selectedGame =
    requestedGame && config.games.some((g: Game) => g.id === requestedGame)
      ? requestedGame
      : config.games[0]?.id || "minecraft"

  const gameIsHytale = config.games.find((g) => g.id === selectedGame)?.id === "hytale"

  const rawLocation =
    requestedLocation && config.locations.some((l) => l.id === requestedLocation)
      ? requestedLocation
      : config.locations[0]?.id || "mumbai"

  const rawPlan =
    requestedPlan && PLAN_TYPE_IDS.includes(requestedPlan)
      ? requestedPlan
      : PLAN_TYPE_IDS[0] || "intel"

  let selectedPlanType = rawPlan
  let selectedLocation = rawLocation

  if (!gameIsHytale) {
    const locationConfig = config.locations.find((loc) => loc.id === rawLocation)
    if (locationConfig && !locationConfig.availablePlanTypes.includes(rawPlan)) {
      if (locationConfig.availablePlanTypes.length > 0) {
        selectedPlanType = locationConfig.availablePlanTypes[0]
      }
    }
  }

  const currentGame = config.games.find((g: Game) => g.id === selectedGame)
  const currentLocation = config.locations.find((loc) => loc.id === selectedLocation)
  const availablePlanTypes = currentLocation?.availablePlanTypes || []
  const isHytaleLayout = currentGame?.id === "hytale"

  const updateRoute = (nextGame: string, nextLoc: string, nextPlan: string) => {
    const params = new URLSearchParams()
    params.set("game", nextGame)
    params.set("location", nextLoc)
    params.set("plan", nextPlan)
    router.replace(`/games?${params.toString()}`, { scroll: false })
  }

  const handleGameSelection = (gameId: string) => {
    updateRoute(gameId, selectedLocation, selectedPlanType)
  }

  const handlePlanTypeSelection = (planType: string) => {
    if (!availablePlanTypes.includes(planType)) return
    updateRoute(selectedGame, selectedLocation, planType)
  }

  const handleLocationSelection = (locationId: string) => {
    const newLocation = config.locations.find((loc) => loc.id === locationId)
    if (!newLocation) return
    if (!isHytaleLayout && !newLocation.availablePlanTypes.includes(selectedPlanType)) return
    updateRoute(selectedGame, locationId, selectedPlanType)
  }

  if (!currentGame || !currentLocation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const activeCpuBrand = getCpuBrand(selectedPlanType)
  const accentStyle = {
    "--accent-color": activeCpuBrand.primary,
    "--accent-glow": activeCpuBrand.glow,
    "--accent-border": activeCpuBrand.border,
  } as React.CSSProperties

  return (
    <div
      className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500"
      style={accentStyle}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${currentGame?.banner}')`,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ backgroundColor: activeCpuBrand.glow }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
      </div>

      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="inline-flex items-left gap-2 bg-[var(--accent-color)]/10 px-4 py-2 rounded-tl-xl rounded-br-xl mb-4">
                <span className="text-[var(--accent-color)] text-sm">{t('gameServerList.badge')}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font">
                {t('gameServerList.title').split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-[var(--accent-color)]">{t('gameServerList.title').split(' ').slice(-2).join(' ')}</span>
              </h2>
              <p className="text-md text-gray-600 max-w-3xl dark:text-gray-300">
                {t('gameServerList.description')}
              </p>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full sm:w-64 mt-4 sm:mt-0"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-left items-left">
            {!isHytaleLayout && (
              <div className="flex flex-col items-left">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('gameServerList.step1')}</h3>
                <div className="flex flex-wrap gap-2">
                  {config.planTypes.map((type) => {
                    const isSelected = selectedPlanType === type.id
                    const isAvailable = availablePlanTypes.includes(type.id)
                    const brand = getCpuBrand(type.id)

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handlePlanTypeSelection(type.id)}
                        disabled={!isAvailable}
                        style={
                          isSelected
                            ? {
                                backgroundColor: brand.surface,
                                borderColor: brand.primary,
                                color: brand.primary,
                                boxShadow: `0 4px 16px ${brand.glow}`,
                              }
                            : isAvailable
                              ? { borderColor: brand.border }
                              : undefined
                        }
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border shadow-sm ${
                          isSelected
                            ? "bg-white/80 dark:bg-gray-800/40"
                            : isAvailable
                              ? "bg-white/80 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:brightness-105"
                              : "cursor-not-allowed border-gray-200/60 bg-gray-100/60 text-gray-400 opacity-40 dark:border-gray-700/40 dark:bg-gray-800/10 dark:text-gray-500"
                        }`}
                      >
                        <Image
                          src={type.image || "/placeholder.svg"}
                          alt={type.name}
                          width={32}
                          height={32}
                          className={`rounded-md object-contain ${!isAvailable ? "opacity-50" : ""}`}
                        />
                        <span className="text-sm font-semibold">{type.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col items-left">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3.5">
                {isHytaleLayout ? t("gameServerList.step1LocationNoCpu") : t("gameServerList.step2")}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {config.locations.map((location: GameLocation) => {
                  const isSelected = selectedLocation === location.id
                  const isAvailable =
                    isHytaleLayout || location.availablePlanTypes.includes(selectedPlanType)

                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => handleLocationSelection(location.id)}
                      disabled={!isAvailable}
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${activeCpuBrand.primary}18`,
                              borderColor: activeCpuBrand.border,
                              color: activeCpuBrand.primary,
                            }
                          : undefined
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border ${
                        isSelected
                          ? "shadow-sm"
                          : isAvailable
                            ? "bg-white/80 dark:bg-gray-800/40 border-gray-200 dark:border-gray-600/40 text-gray-700 dark:text-gray-300 hover:border-[var(--accent-border)]"
                            : "cursor-not-allowed border-gray-200/60 bg-gray-100/60 text-gray-400 opacity-40 dark:border-gray-700/40 dark:bg-gray-800/10 dark:text-gray-500"
                      }`}
                    >
                      <CountryFlag
                        code={location.flag}
                        alt={`${location.name} flag`}
                        size="sm"
                        className={!isAvailable ? "opacity-50" : ""}
                      />
                      <span className="text-sm font-medium">{location.name}</span>
                    </button>
                  )
                })}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary bg-white/20 px-4 py-3 text-sm text-gray-600 backdrop-blur-sm transition-all duration-300 hover:border-secondary hover:hover-gradient dark:bg-white/5 dark:text-gray-300"
                >
                  <ArrowRight className="h-4 w-4 icon-primary" />
                  <span>
                    {t("gameServerList.moreLocations")}{" "}
                    <span className="font-medium icon-text-primary">{t("gameServerList.contactUs")}</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {isHytaleLayout ? t("gameServerList.step2GameNoCpu") : t("gameServerList.step3")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 relative">
            {config.games.map((game: Game, index: number) => {
              const firstFeaturedGame = config.games.find((g: Game) => g.featured)
              const showChristmas = uiConfig.christmasTheme.enabled && game.id === firstFeaturedGame?.id

              return (
                <div key={game.id} className="relative">
                  <button
                    onClick={() => handleGameSelection(game.id)}
                    style={
                      selectedGame === game.id
                        ? {
                            backgroundColor: `${activeCpuBrand.primary}30`,
                            borderColor: activeCpuBrand.border,
                          }
                        : undefined
                    }
                    className={`relative w-full group rounded-xl transition-all duration-300 p-3 text-left backdrop-blur-sm border ${
                      selectedGame === game.id
                        ? "text-white shadow-sm"
                        : "bg-white/60 dark:bg-gray-800/30 border-gray-200 dark:border-gray-600/40 text-gray-700 dark:text-gray-300 hover:border-[var(--accent-border)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/90 p-1 dark:bg-black/30">
                        <Image
                          src={game.icon || "/placeholder.svg"}
                          alt={game.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 ">
                          <h4 className="font-bold text-sm truncate">{game.name}</h4>
                          {game.featured && (
                            <div
                              className="px-2 py-0.5 text-xs rounded-md backdrop-blur-sm text-white"
                              style={{ backgroundColor: activeCpuBrand.primary }}
                            >
                              {t('gameServerList.featured')}
                            </div>
                          )}
                        </div>
                        <p
                          className="text-xs opacity-80 line-clamp-2 mt-1 leading-snug"
                          title={game.description}
                        >
                          {game.description}
                        </p>
                      </div>
                    </div>
                  </button>
                  {showChristmas && (
                    <Image
                      src="/christmas/ice.png"
                      alt="Christmas decoration"
                      width={60}
                      height={60}
                      className="absolute z-[9999] -bottom-16 right-4 pointer-events-none"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {isHytaleLayout ? t("gameServerList.step3PlanNoCpu") : t("gameServerList.step4")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

          {(() => {
            const plansToRender =
              isHytaleLayout
                ? currentGame.plans.intel || []
                : currentGame.plans[selectedPlanType] ||
                  currentGame.plans.intel ||
                  currentGame.plans.amd ||
                  Object.values(currentGame.plans)[0] ||
                  []

            return plansToRender
          })().map((plan: GamePlan, index: number) => {
            const planBrand = getCpuBrand(plan.type)

            return (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-sm ${
                plan.featured
                  ? "border-blue-500/50 hover:border-blue-400 bg-white/80 dark:bg-[#0e111a]/95 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                  : "border-gray-200/80 dark:border-[#1e2333] hover:border-blue-500/40 bg-white/60 dark:bg-[#0d1017]/95 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Left Accent Strip */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1 opacity-90 transition-opacity group-hover:opacity-100 z-10"
                style={{ backgroundColor: planBrand.primary }}
              />

              {/* Top Right Tag for Popular Plan */}
              {plan.featured && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Popular
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-6 pl-6 flex flex-col flex-1">
                {/* Header: CPU Type & Plan Name */}
                <div className="mb-4">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] mb-1 font-mono"
                    style={{ color: planBrand.primary }}
                  >
                    {plan.type === "amd" ? "AMD EPYC" : "Intel Xeon"}
                  </span>
                  <h3 className="orbitron-font text-2xl font-bold leading-none text-gray-900 dark:text-white tracking-wide">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <CountryFlag
                      code={currentLocation?.flag || config.locations[0].flag}
                      alt={currentLocation?.name || "Location"}
                      size="sm"
                    />
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{currentLocation?.name}</span>
                  </div>
                </div>

                {/* Clean Specs Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-auto">
                  {[
                    { icon: MemoryStick, label: "RAM", value: plan.ram },
                    { icon: Cpu, label: "CPU", value: plan.cpu },
                    { icon: HardDrive, label: "Storage", value: plan.storage },
                    plan.slots
                      ? { icon: Users, label: "Slots", value: `${plan.slots} Slots` }
                      : { icon: Shield, label: "DDoS", value: "Included", full: t("gameServerList.ddosProtection") },
                  ].map(({ icon: Icon, label, value, full }) => (
                    <div
                      key={label}
                      className="rounded-lg border border-gray-200/60 dark:border-white/[0.08] bg-gray-50/50 dark:bg-white/[0.03] px-3.5 py-3 transition-colors"
                    >
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: planBrand.primary }} />
                        {label}
                      </div>
                      <p
                        className="text-sm sm:text-base font-bold leading-tight text-gray-900 dark:text-white truncate"
                        title={full}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Price + Button */}
              <div className="border-t border-gray-200/80 dark:border-[#1c2233] bg-gray-50/70 dark:bg-[#07090f] p-5 pl-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Starting at</p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold orbitron-font"
                      style={{ color: planBrand.primary }}
                    >
                      {plan.prices
                        ? formatFixedGamePrice(plan.prices, selectedCurrency)
                        : convertPrice(`₹${plan.price}`)}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">/mo</span>
                  </div>
                </div>
                <GamePlanOrderButton
                  plan={plan}
                  planBrand={planBrand}
                  orderNowText={t("gameServerList.orderNow")}
                />
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
