"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Image from "next/image"
import {
  Zap,
  Terminal,
  FolderOpen,
  Plug,
  Puzzle,
  Package,
  Layers,
  RefreshCw,
  Upload,
  Users,
  Globe,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import showcaseConfig from "@/app/config/sections/showcase.json"
import { useLanguage } from "../contexts/LanguageContext"
import uiConfig from "@/app/config/sections/ui.json"

interface ShowcaseCard {
  id: number
  icon: LucideIcon
  title: string
  description: string
  imageDark: string
  imageLight: string
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Terminal,
  FolderOpen,
  Plug,
  Puzzle,
  Package,
  Layers,
  RefreshCw,
  Upload,
  Users,
  Globe,
}

export default function PanelShowcase() {
  const { t } = useLanguage()
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scrollHints, setScrollHints] = useState({ top: false, bottom: true })
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const mobileTabsContainerRef = useRef<HTMLDivElement>(null)
  const skipAutoListScroll = useRef(true)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const scrollFeatureInList = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const list = listRef.current
    const item = itemRefs.current[index]
    if (!list || !item) return

    const padding = 4
    const itemTop = item.offsetTop
    const itemBottom = itemTop + item.offsetHeight
    const viewTop = list.scrollTop
    const viewBottom = viewTop + list.clientHeight

    if (itemTop < viewTop + padding) {
      list.scrollTo({ top: itemTop - padding, behavior })
    } else if (itemBottom > viewBottom - padding) {
      list.scrollTo({ top: itemBottom - list.clientHeight + padding, behavior })
    }
  }, [])

  const updateScrollHints = useCallback(() => {
    const el = listRef.current
    if (!el) return
    setScrollHints({
      top: el.scrollTop > 10,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 10,
    })
  }, [])

  const scrollListBy = (delta: number) => {
    listRef.current?.scrollBy({ top: delta, behavior: "smooth" })
  }

  const showcaseCards: ShowcaseCard[] = useMemo(
    () =>
      showcaseConfig.showcase.cards.map((card) => ({
        id: card.id,
        icon: iconMap[card.icon] ?? Zap,
        title: card.title,
        description: card.description,
        imageDark: card.imageDark,
        imageLight: card.imageLight,
      })),
    [],
  )

  useEffect(() => {
    const duration = showcaseConfig.showcase.settings.autoAdvanceInterval || 6000
    const intervalMs = 50
    const step = (100 * intervalMs) / duration

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          return 100
        }
        return prev + step
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [activeCard])

  useEffect(() => {
    if (progress >= 100) {
      setActiveCard((prev) => (prev + 1) % showcaseCards.length)
      setProgress(0)
    }
  }, [progress, showcaseCards.length])

  useEffect(() => {
    if (skipAutoListScroll.current) {
      skipAutoListScroll.current = false
      return
    }
    scrollFeatureInList(activeCard)
  }, [activeCard, scrollFeatureInList])

  const handleCardClick = (index: number) => {
    setActiveCard(index)
    setProgress(0)
    scrollFeatureInList(index)
  }

  useEffect(() => {
    const container = mobileTabsContainerRef.current
    const targetTab = mobileTabRefs.current[activeCard]
    if (!container || !targetTab) return

    const containerWidth = container.clientWidth
    const tabLeft = targetTab.offsetLeft
    const tabWidth = targetTab.clientWidth
    const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: "smooth",
    })
  }, [activeCard])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const threshold = 40
    if (diff > threshold) {
      // Swiped left -> next
      handleCardClick((activeCard + 1) % showcaseCards.length)
    } else if (diff < -threshold) {
      // Swiped right -> prev
      handleCardClick((activeCard - 1 + showcaseCards.length) % showcaseCards.length)
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    updateScrollHints()
    el.addEventListener("scroll", updateScrollHints, { passive: true })
    window.addEventListener("resize", updateScrollHints)
    return () => {
      el.removeEventListener("scroll", updateScrollHints)
      window.removeEventListener("resize", updateScrollHints)
    }
  }, [updateScrollHints, showcaseCards.length])

  const active = showcaseCards[activeCard]

  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full">
      <div className="absolute top-20 -left-32 w-64 h-64 icon-text-primary rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-72 h-72 icon-text-primary rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-4 border border-secondary">
            <span className="icon-text-primary orbitron-font text-sm">{t("panelShowcase.badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 orbitron-font tracking-tight">
            {t("panelShowcase.title").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="icon-text-primary">{t("panelShowcase.title").split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">{t("panelShowcase.subtitle")}</p>
        </motion.div>

        {/* Mobile Horizontal Tool Selector */}
        <div className="lg:hidden mb-5">
          {/* Header Row */}
          <div className="mb-2.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-[0.14em] uppercase text-gray-500 dark:text-gray-400">
                {t("panelShowcase.featuresLabel")}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 text-[11px] font-mono">
              <span className="font-bold text-blue-600 dark:text-blue-400">{activeCard + 1}</span>
              <span className="text-gray-400 dark:text-gray-500">/</span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">{showcaseCards.length}</span>
            </div>
          </div>

          {/* Smooth Carousel Container with Subtle Edge Fades */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gray-50 dark:from-[#0a0b0f] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 dark:from-[#0a0b0f] to-transparent z-10" />

            <div
              ref={mobileTabsContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
            >
              {showcaseCards.map((card, index) => {
                const Icon = card.icon
                const isActive = index === activeCard
                return (
                  <button
                    key={card.id}
                    ref={(el) => {
                      mobileTabRefs.current[index] = el
                    }}
                    type="button"
                    onClick={() => handleCardClick(index)}
                    className={`relative shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${isActive
                      ? "border-blue-500/80 bg-blue-500/15 text-white shadow-sm ring-1 ring-blue-400/40"
                      : "border-gray-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0e17] text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white"
                      }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                        }`}
                    />
                    <span className={isActive ? "font-bold text-gray-900 dark:text-white" : "font-medium"}>
                      {card.title}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[270px_1fr] xl:grid-cols-[290px_1fr] gap-4 lg:gap-5 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex flex-col min-h-0"
          >
            <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {t("panelShowcase.featuresLabel")}
                </p>
              </div>
              <span className="font-mono rounded-full border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                {t("panelShowcase.featuresCount")}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-tl-2xl rounded-br-2xl border border-secondary bg-white backdrop-blur-xl shadow-lg dark:bg-gray-950/20">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white via-white/80 to-transparent transition-opacity duration-300 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/80 ${scrollHints.top ? "opacity-100" : "opacity-0"
                  }`}
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-11 z-10 h-10 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-300 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/80 ${scrollHints.bottom ? "opacity-100" : "opacity-0"
                  }`}
              />

              <div
                ref={listRef}
                className="showcase-feature-scroll flex max-h-[380px] lg:max-h-[420px] flex-col gap-1 overflow-y-auto scroll-smooth p-2 snap-y snap-mandatory"
              >
                {showcaseCards.map((card, index) => {
                  const Icon = card.icon
                  const isActive = index === activeCard

                  return (
                    <motion.button
                      key={card.id}
                      ref={(el) => {
                        itemRefs.current[index] = el
                      }}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      onClick={() => handleCardClick(index)}
                      className={`relative w-full snap-start text-left transition-all duration-300 rounded-tl-xl rounded-br-xl border hover:border-secondary hover:hover-gradient ${isActive
                        ? "border-secondary bg-icon-text-primary/10 shadow-sm dark:bg-icon-text-primary/10"
                        : "border-transparent bg-transparent hover:bg-white/40 dark:hover:bg-white/[0.05]"
                        }`}
                    >
                      {isActive && (
                        <div
                          className="pointer-events-none absolute inset-0 overflow-hidden rounded-tl-xl rounded-br-xl"
                          aria-hidden
                        >
                          <motion.div
                            className="absolute inset-y-0 left-0 hover-gradient"
                            initial={false}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        </div>
                      )}

                      <div className="relative z-[1] flex items-center gap-2.5 py-2 px-2.5 sm:py-2.5 sm:px-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${isActive
                            ? "border-secondary bg-white dark:bg-white/10"
                            : "border-secondary/40 bg-gray-50/80 dark:border-white/10 dark:bg-white/[0.04]"
                            }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${isActive ? "icon-text-primary" : "text-gray-500 dark:text-gray-400"
                              }`}
                          />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-semibold leading-tight ${isActive ? "icon-text-primary font-bold" : "text-gray-700 dark:text-gray-300"
                            }`}
                        >
                          {card.title}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-secondary px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => scrollListBy(-120)}
                  disabled={!scrollHints.top}
                  aria-label="Scroll features up"
                  className="flex h-7 w-7 items-center justify-center rounded-tl-xl rounded-br-xl border border-transparent text-gray-500 transition-all duration-300 hover:border-secondary hover:hover-gradient hover:text-[var(--icon-text-primary)] disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">Scroll for more</span>
                <button
                  type="button"
                  onClick={() => scrollListBy(120)}
                  disabled={!scrollHints.bottom}
                  aria-label="Scroll features down"
                  className="flex h-7 w-7 items-center justify-center rounded-tl-xl rounded-br-xl border border-transparent text-gray-500 transition-all duration-300 hover:border-secondary hover:hover-gradient hover:text-[var(--icon-text-primary)] disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex flex-col min-h-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative flex w-full flex-col overflow-hidden rounded-tl-2xl rounded-br-2xl border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl shadow-lg">
              {/* Image Preview Container */}
              <div
                className="relative w-full overflow-hidden bg-gray-50/60 dark:bg-black/30"
                style={{ aspectRatio: "1910 / 940" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <div className="hidden dark:block relative w-full h-full">
                      <Image
                        src={active.imageDark}
                        alt={active.title}
                        fill
                        className="object-cover object-top"
                        quality={95}
                        priority={activeCard === 0}
                        sizes="(max-width: 1024px) 100vw, 70vw"
                      />
                    </div>
                    <div className="block dark:hidden relative w-full h-full">
                      <Image
                        src={active.imageLight}
                        alt={active.title}
                        fill
                        className="object-cover object-top"
                        quality={95}
                        priority={activeCard === 0}
                        sizes="(max-width: 1024px) 100vw, 70vw"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1 bg-gray-200 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Details & Controls */}
              <div className="border-t border-secondary px-4 py-3 sm:px-5 sm:py-3.5 bg-white/80 dark:bg-[#0a0b0f]/80 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <active.icon className="h-4 w-4 icon-text-primary shrink-0" />
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                            {active.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2 sm:line-clamp-none">
                          {active.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Mobile Thumb Navigation */}
                  <div className="flex lg:hidden items-center gap-1.5 shrink-0 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleCardClick((activeCard - 1 + showcaseCards.length) % showcaseCards.length)}
                      aria-label="Previous tool"
                      className="p-2 rounded-lg border border-secondary text-gray-600 dark:text-gray-300 hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCardClick((activeCard + 1) % showcaseCards.length)}
                      aria-label="Next tool"
                      className="p-2 rounded-lg border border-secondary text-gray-600 dark:text-gray-300 hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {uiConfig.christmasTheme.enabled && (
                <>
                  <Image
                    src="/christmas/button-deco-up.png"
                    alt=""
                    width={28}
                    height={28}
                    className="absolute top-2 right-2 pointer-events-none z-10"
                  />
                  <Image
                    src="/christmas/button-deco-down.png"
                    alt=""
                    width={28}
                    height={28}
                    className="absolute bottom-24 left-2 pointer-events-none z-10"
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
