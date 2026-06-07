"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Shield, Cpu, HardDrive, MemoryStick, ArrowRight } from "lucide-react"
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
    return encodeURI(game.icon || game.banner || "/hytale.webp")
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
  planBrand: (typeof CPU_BRAND)[keyof typeof CPU_BRAND]
  orderNowText: string
}) {
  const stock = useProductStock(plan.orderLink)

  if (stock.isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className="orbitron-font shrink-0 cursor-not-allowed rounded-tl-xl rounded-br-xl border-2 border-red-500/60 bg-red-600/80 px-4 py-2 text-xs font-semibold text-white sm:text-sm"
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
      className="orbitron-font shrink-0 rounded-tl-xl rounded-br-xl border-2 px-4 py-2 text-xs font-semibold text-white no-underline transition-all duration-300 hover:text-white sm:text-sm"
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
  const [selectedGame, setSelectedGame] = useState<string>(config.games[0]?.id || "")
  const [selectedLocation, setSelectedLocation] = useState<string>(config.locations[0]?.id || "")
  const [selectedPlanType, setSelectedPlanType] = useState(PLAN_TYPE_IDS[0] || "intel")

  useEffect(() => {
    const game = searchParams.get("game")
    const location = searchParams.get("location")
    const plan = searchParams.get("plan")

    if (game && config.games.some((g: Game) => g.id === game)) {
      setSelectedGame(game)
    }
    if (location && config.locations.some((l) => l.id === location)) {
      setSelectedLocation(location)
    }
    if (plan && PLAN_TYPE_IDS.includes(plan)) {
      setSelectedPlanType(plan)
    }
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams()
    params.set("game", selectedGame)
    params.set("location", selectedLocation)
    params.set("plan", selectedPlanType)
    const newUrl = `/games?${params.toString()}`
    const currentUrl = window.location.pathname + window.location.search
    if (newUrl !== currentUrl) {
      router.replace(newUrl)
    }
  }, [selectedGame, selectedLocation, selectedPlanType, router])

  const currentGame = config.games.find((g: Game) => g.id === selectedGame)
  const currentLocation = config.locations.find((loc) => loc.id === selectedLocation)
  const availablePlanTypes = currentLocation?.availablePlanTypes || []
  const isHytaleLayout = currentGame?.id === "hytale"

  useEffect(() => {
    if (isHytaleLayout) return
    const compatible = config.locations.filter((loc) => loc.availablePlanTypes.includes(selectedPlanType))
    if (compatible.length && !compatible.some((loc) => loc.id === selectedLocation)) {
      setSelectedLocation(compatible[0].id)
    }
  }, [selectedPlanType, selectedLocation, isHytaleLayout])

  const handlePlanTypeSelection = (planType: string) => {
    setSelectedPlanType(planType)
    const currentLoc = config.locations.find((loc) => loc.id === selectedLocation)
    if (currentLoc && !currentLoc.availablePlanTypes.includes(planType)) {
      const compatibleLocation = config.locations.find((loc) => loc.availablePlanTypes.includes(planType))
      if (compatibleLocation) {
        setSelectedLocation(compatibleLocation.id)
      }
    }
  }

  const visibleLocations = config.locations.filter((loc) =>
    isHytaleLayout ? loc.availablePlanTypes.length > 0 : loc.availablePlanTypes.includes(selectedPlanType)
  )

  const visiblePlanTypes = config.planTypes.filter((type) =>
    availablePlanTypes.includes(type.id)
  )

  const handleLocationSelection = (locationId: string) => {
    setSelectedLocation(locationId)
    const newLocation = config.locations.find((loc) => loc.id === locationId)
    if (newLocation && !newLocation.availablePlanTypes.includes(selectedPlanType)) {
      if (newLocation.availablePlanTypes.length > 0) {
        setSelectedPlanType(newLocation.availablePlanTypes[0])
      }
    }
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
                  {visiblePlanTypes.map((type) => {
                    const isSelected = selectedPlanType === type.id
                    const brand = getCpuBrand(type.id)

                    return (
                      <button
                        key={type.id}
                        onClick={() => handlePlanTypeSelection(type.id)}
                        style={
                          isSelected
                            ? {
                                backgroundColor: brand.surface,
                                borderColor: brand.primary,
                                color: brand.primary,
                                boxShadow: `0 4px 16px ${brand.glow}`,
                              }
                            : { borderColor: brand.border }
                        }
                        className={`flex items-center gap-3 px-6 py-2.5 rounded-tl-xl rounded-br-xl font-medium transition-all duration-300 backdrop-blur-sm border bg-white/80 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:brightness-105 shadow-md`}
                      >
                        <Image
                          src={type.image || "/placeholder.svg"}
                          alt={type.name}
                          width={32}
                          height={32}
                          className="rounded-md object-contain"
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
                {visibleLocations.map((location: GameLocation) => {
                  const isSelected = selectedLocation === location.id

                  return (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelection(location.id)}
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${activeCpuBrand.primary}18`,
                              borderColor: activeCpuBrand.border,
                              color: activeCpuBrand.primary,
                            }
                          : undefined
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-tl-xl rounded-br-xl font-medium transition-all duration-300 backdrop-blur-sm border ${
                        isSelected
                          ? "shadow-lg"
                          : "bg-white/80 dark:bg-gray-800/40 border-gray-200 dark:border-gray-600/40 text-gray-700 dark:text-gray-300 hover:border-[var(--accent-border)]"
                      }`}
                    >
                      <CountryFlag
                        code={location.flag}
                        alt={`${location.name} flag`}
                        size="sm"
                      />
                      <span className="text-sm font-medium">{location.name}</span>
                    </button>
                  )
                })}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl border border-primary bg-white/20 px-4 py-3 text-sm text-gray-600 backdrop-blur-sm transition-all duration-300 hover:border-secondary hover:hover-gradient dark:bg-white/5 dark:text-gray-300"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {config.games.map((game: Game, index: number) => {
              const firstFeaturedGame = config.games.find((g: Game) => g.featured)
              const showChristmas = uiConfig.christmasTheme.enabled && game.id === firstFeaturedGame?.id

              return (
                <div key={game.id} className="relative">
                  <button
                    onClick={() => setSelectedGame(game.id)}
                    style={
                      selectedGame === game.id
                        ? {
                            backgroundColor: `${activeCpuBrand.primary}30`,
                            borderColor: activeCpuBrand.border,
                          }
                        : undefined
                    }
                    className={`relative w-full group rounded-tl-xl rounded-br-xl transition-all duration-300 p-3 text-left backdrop-blur-sm border ${
                      selectedGame === game.id
                        ? "text-white shadow-lg"
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
                              className="px-2 py-0.5 text-xs rounded-tl-xl rounded-br-xl backdrop-blur-sm text-white"
                              style={{ backgroundColor: activeCpuBrand.primary }}
                            >
                              {t('gameServerList.featured')}
                            </div>
                          )}
                        </div>
                        <p className="text-xs opacity-80 line-clamp-2">{game.description}</p>
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
                : currentGame.plans[selectedPlanType] || []

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
              className="group relative overflow-hidden rounded-tl-2xl rounded-br-2xl border border-white/10 bg-[#14161c]/95 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)]/40 hover:shadow-[0_20px_48px_var(--accent-glow)]"
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1 opacity-80 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: planBrand.primary }}
              />
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-40"
                style={{ backgroundColor: planBrand.primary }}
              />

              <div className="relative flex min-h-[220px] flex-col-reverse sm:min-h-[200px] sm:flex-row">
                <div className="flex flex-1 flex-col p-5 sm:py-5 sm:pl-6 sm:pr-3">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: planBrand.primary }}
                      >
                        {plan.type === "amd" ? "AMD EPYC" : "Intel Xeon"}
                      </p>
                      <h3 className="orbitron-font text-2xl font-bold leading-none text-white">
                        {plan.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-400">
                        <CountryFlag
                          code={currentLocation?.flag || config.locations[0].flag}
                          alt={currentLocation?.name || "Location"}
                          size="sm"
                        />
                        <span>{currentLocation?.name}</span>
                      </div>
                    </div>
                    {plan.type === "amd" && (
                      <span
                        className="shrink-0 rounded-tl-lg rounded-br-lg px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white"
                        style={{ backgroundColor: CPU_BRAND.amd.primary }}
                      >
                        {t("gameServerList.premium")}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 grid flex-1 grid-cols-2 gap-2.5">
                    {[
                      { icon: MemoryStick, label: "RAM", value: plan.ram },
                      { icon: Cpu, label: "CPU", value: plan.cpu },
                      { icon: HardDrive, label: "Storage", value: plan.storage },
                      { icon: Shield, label: "DDoS", value: "Included", full: t("gameServerList.ddosProtection") },
                    ].map(({ icon: Icon, label, value, full }) => (
                      <div
                        key={label}
                        className="rounded-tl-lg rounded-br-lg border border-white/[0.08] bg-white/[0.05] px-3 py-2.5"
                      >
                        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                          <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent-color)]" />
                          {label}
                        </div>
                        <p
                          className="text-sm font-semibold leading-tight text-gray-100"
                          title={full}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">Starting at</p>
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-[1.6rem] font-bold leading-none"
                          style={{ color: planBrand.primary }}
                        >
                          {plan.prices
                            ? formatFixedGamePrice(plan.prices, selectedCurrency)
                            : convertPrice(`₹${plan.price}`)}
                        </span>
                        <span className="text-sm text-gray-500">/mo</span>
                      </div>
                    </div>
                    <GamePlanOrderButton
                      plan={plan}
                      planBrand={planBrand}
                      orderNowText={t("gameServerList.orderNow")}
                    />
                  </div>
                </div>

                <div className="relative flex h-44 shrink-0 items-center justify-center overflow-hidden sm:h-auto sm:w-[42%] sm:min-w-[130px]">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 55%, ${planBrand.glow} 0%, transparent 65%)`,
                    }}
                  />
                  <Image
                    src={getPlanIcon(plan, currentGame)}
                    alt={`${plan.name} plan`}
                    width={200}
                    height={200}
                    unoptimized
                    className="relative z-10 h-[150px] w-auto max-w-[92%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:h-[165px] lg:h-[175px]"
                  />
                </div>
              </div>
            </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
