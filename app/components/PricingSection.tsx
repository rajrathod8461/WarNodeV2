"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ChevronRight,
  Gamepad2,
  Server,
  ShieldCheck,
  Zap,
  HardDrive,
  Headphones,
  Globe,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { CurrencySelector, useCurrency } from "./ui/CurrencySelector"
import pricingConfig from "../config/sections/pricing.json"
import type { PricingConfig, PricingPlan } from "../types/pricing"
import { useLanguage } from "../contexts/LanguageContext"
import uiConfig from "../config/sections/ui.json"
import warnodesConfig from "../config/sections/warnodes.json"

const config = pricingConfig as PricingConfig
const FEATURE_COUNT = 4

interface ViewAllCard {
  isViewAll: true
  title: string
  badge: string
  image: string
  description: string
  priceLabel: string
  priceValue: string
  priceSuffix?: string
  features: string[]
  buttonText: string
  link: string
}

type CardItem = PricingPlan | ViewAllCard

interface CategoryConfig {
  id: string
  label: string
  subtitle: string
  icon: LucideIcon
  cards: (number | ViewAllCard)[]
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "game-servers",
    label: "Game Servers",
    subtitle: "Minecraft, Palworld & More",
    icon: Gamepad2,
    cards: [
      0, // Minecraft Hosting
      11, // Palworld Hosting
      {
        isViewAll: true,
        title: "All Game Servers",
        badge: "6 Games",
        image: "/Gaming_banner_design_request_f02fae14_2K.jpg",
        description: "Browse our complete gaming library with instant setup & mod support",
        priceLabel: "Available Titles",
        priceValue: "6 Games",
        priceSuffix: "supported",
        features: [
          "Minecraft, CS2, Palworld & more",
          "Rust, FiveM & Hytale servers",
          "WarShield DDoS protection included",
          "Low-latency Indian & Asian nodes",
        ],
        buttonText: "View All 6 Games",
        link: "/games",
      },
    ],
  },
  {
    id: "vps-dedicated",
    label: "VPS & Dedicated",
    subtitle: "VPS, Dedicated & Database",
    icon: Server,
    cards: [
      1, // VPS Hosting
      8, // Dedicated Servers
      4, // Database Hosting
    ],
  },
  {
    id: "web-email-bots",
    label: "Web, Email & Bots",
    subtitle: "Websites, Business Mail & Bots",
    icon: Globe,
    cards: [
      2, // Web Hosting
      9, // Email Hosting
      3, // Discord Bot Hosting
    ],
  },
]

const TRUST_METRICS = [
  {
    icon: Zap,
    title: "Instant Setup",
    desc: "Online in < 60 seconds",
  },
  {
    icon: ShieldCheck,
    title: "WarShield Defense",
    desc: "L4 / L7 traffic mitigation",
  },
  {
    icon: HardDrive,
    title: "Gen4 NVMe I/O",
    desc: "High-speed enterprise storage",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Help via Discord & Tickets",
  },
]

export default function PricingSection() {
  const { t } = useLanguage()
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const [activeCategoryId, setActiveCategoryId] = useState<string>("game-servers")

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0]

  const resolvedCards: CardItem[] = activeCategory.cards
    .map((item) => {
      if (typeof item === "number") {
        return config.section.plans[item]
      }
      return item
    })
    .filter(Boolean) as CardItem[]

  return (
    <section className="bg-gray-50 dark:bg-[#0a0b0f] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 text-left"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white orbitron-font">
              {t("pricingSection.title")}{" "}
              <span className="icon-text-primary">{t("pricingSection.titleHighlight")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
              {t("pricingSection.description")}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-56">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Interactive Category Selector Tabs (3 Categories) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategoryId === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  type="button"
                  className={`relative flex items-center gap-3 p-3.5 sm:p-4 rounded-lg transition-all duration-300 text-left outline-none cursor-pointer ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePricingCategoryBg"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-white/10 border border-blue-500/30 dark:border-blue-400/30 shadow-md dark:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div
                    className={`relative z-10 p-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base orbitron-font truncate">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 block truncate mt-0.5">
                      {cat.subtitle}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* 3-Card Grid with Website Hover Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {resolvedCards.map((card, index) => {
              const isViewAll = "isViewAll" in card && card.isViewAll
              const plan = !isViewAll ? (card as PricingPlan) : null
              const viewAllCard = isViewAll ? (card as ViewAllCard) : null

              let displayPrice = ""
              let suffix = ""
              let priceLabel = t("gameServerList.startingAt")

              if (plan) {
                const manualPrice = plan.displayPrices?.[selectedCurrency.code as "INR" | "USD" | "EUR"]
                displayPrice = manualPrice ?? convertPrice(plan.basePrice.toString())
                const isFree = displayPrice.toUpperCase() === "FREE"
                suffix = isFree ? "" : (plan.priceSuffix ?? "/month")
                if (plan.showStartingPrice === false) {
                  priceLabel = "Pricing Tier"
                }
              } else if (viewAllCard) {
                displayPrice = viewAllCard.priceValue
                suffix = viewAllCard.priceSuffix ? ` ${viewAllCard.priceSuffix}` : ""
                priceLabel = viewAllCard.priceLabel
              }

              const title = plan ? t(plan.titleKey) : viewAllCard?.title || ""
              const description = plan ? t(plan.descriptionKey) : viewAllCard?.description || ""
              const image = plan ? plan.image : viewAllCard?.image || "/placeholder.svg"
              const link = plan ? plan.link : viewAllCard?.link || "/games"
              const buttonText = plan ? t(plan.buttonTextKey) : viewAllCard?.buttonText || "View More"
              const isPopular = plan?.popular ?? false
              const badge = plan?.badge || viewAllCard?.badge

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className={`relative flex flex-col h-full rounded-tl-2xl rounded-br-2xl overflow-hidden backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 group ${
                    isPopular
                      ? "border-blue-500/40 bg-white/80 dark:bg-[#0b0e17] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-500/60"
                      : "border-gray-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#0b0e17] shadow-sm hover:shadow-xl hover:shadow-black/20 hover:border-blue-500/30"
                  }`}
                >
                  {/* Top Image Banner with Seamless Multi-Layer Gradient Dissolve */}
                  <div className="relative h-48 sm:h-52 w-full shrink-0 overflow-hidden bg-[#0b0e17] rounded-tl-2xl">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={90}
                      priority={isPopular}
                    />

                    {/* Smooth Ambient and Bottom Fades - Zero Pixel Bleed on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0b0e17] via-white/95 dark:via-[#0b0e17]/95 via-30% to-transparent pointer-events-none" />
                    {/* Solid bottom strip ensures no subpixel scaling artifacts leak through */}
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-white dark:bg-[#0b0e17] pointer-events-none" />

                    {/* Badges on Image (Web Hosting signature 2-side smooth & 2-side sharp) */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                      {isPopular && (
                        <span className="px-3 py-1 rounded-tl-xl rounded-br-xl text-[11px] font-bold button-primary text-button-primary shadow-md">
                          Popular
                        </span>
                      )}
                      {badge && (
                        <span className="px-3 py-1 rounded-tl-xl rounded-br-xl text-[11px] font-semibold bg-black/70 backdrop-blur-md text-gray-200 border border-white/15 shadow-md">
                          {badge}
                        </span>
                      )}
                    </div>

                    {/* Title over Image */}
                    <div className="absolute bottom-3 left-5 right-5 z-10">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white orbitron-font tracking-wide drop-shadow-sm">
                        {title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content (overlaps banner by 2px with matching background to kill any seam) */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 -mt-1.5 relative z-10 bg-white dark:bg-[#0b0e17]">
                    {/* Short 1-Line Description */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1 leading-relaxed mb-4">
                      {description}
                    </p>

                    {/* Price Block */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                        {priceLabel}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white orbitron-font">
                          {displayPrice}
                        </span>
                        {suffix && (
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {suffix}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Smooth Gradient Divider (Replaces harsh sharp solid line) */}
                    <div className="relative mb-5">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent" />
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-6 flex-1 min-h-[7rem]">
                      {plan &&
                        plan.featuresKeys.slice(0, FEATURE_COUNT).map((featureKey, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                            <div className="p-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 truncate">
                              {t(featureKey)}
                            </span>
                          </li>
                        ))}

                      {viewAllCard &&
                        viewAllCard.features.map((featureText, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                            <div className="p-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 truncate">
                              {featureText}
                            </span>
                          </li>
                        ))}
                    </ul>

                    {/* Action CTA Button (Web Hosting signature 2-side smooth & 2-side sharp) */}
                    <div className="relative mt-auto">
                      <Link
                        href={link}
                        className={`w-full py-3 px-4 rounded-tl-xl rounded-br-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-between group/btn ${
                          isPopular || plan?.buttonStyle === "primary"
                            ? "button-primary text-button-primary shadow-sm hover:shadow-md hover:shadow-blue-500/20"
                            : "bg-white/10 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-blue-500/40 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className="w-full orbitron-font text-center">{buttonText}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>

                      {uiConfig.christmasTheme.enabled && (
                        <>
                          <Image
                            src="/christmas/button-deco-up.png"
                            alt=""
                            width={24}
                            height={24}
                            className="absolute -top-2 -right-2 pointer-events-none"
                          />
                          <Image
                            src="/christmas/button-deco-down.png"
                            alt=""
                            width={24}
                            height={24}
                            className="absolute -bottom-2 -left-2 pointer-events-none"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Minimal Trust Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-secondary backdrop-blur-sm"
        >
          {TRUST_METRICS.map((metric, i) => {
            const Icon = metric.icon
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg hover:hover-gradient hover:border-secondary transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                    {metric.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {metric.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Section Footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {t("pricingSection.footerText")}{" "}
            <a
              href={warnodesConfig.links.tickets}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-text-primary hover:text-icon-text-primary/80 font-medium inline-flex items-center gap-1 hover:underline"
            >
              {t("pricingSection.footerLinkText")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
