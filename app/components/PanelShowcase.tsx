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

const TICK_MS = showcaseConfig.showcase.settings.autoAdvanceInterval / 50

export default function PanelShowcase() {
  const { t } = useLanguage()
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scrollHints, setScrollHints] = useState({ top: false, bottom: true })
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const skipAutoListScroll = useRef(true)

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
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveCard((current) => (current + 1) % showcaseCards.length)
          return 0
        }
        return prev + 2
      })
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [showcaseCards.length])

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
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-20 -left-32 w-64 h-64 icon-text-primary rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 -right-32 w-72 h-72 icon-text-primary rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-4 border border-secondary">
            <span className="icon-text-primary orbitron-font text-sm">{t("panelShowcase.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 orbitron-font sm:mb-4">
            {t("panelShowcase.title").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="icon-text-primary">{t("panelShowcase.title").split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">{t("panelShowcase.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-5 lg:gap-6 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col min-h-0"
          >
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t("panelShowcase.featuresLabel")}
              </p>
              <span className="orbitron-font rounded-tl-lg rounded-br-lg border border-secondary/50 bg-white/60 px-2.5 py-0.5 text-xs font-bold icon-text-primary dark:bg-white/5">
                {t("panelShowcase.featuresCount")}
              </span>
            </div>

            <div className="relative overflow-hidden rounded-tl-2xl rounded-br-2xl border border-gray-200/80 bg-white/70 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white via-white/80 to-transparent transition-opacity duration-300 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/80 ${
                  scrollHints.top ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-11 z-10 h-10 bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-300 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/80 ${
                  scrollHints.bottom ? "opacity-100" : "opacity-0"
                }`}
              />

              <div
                ref={listRef}
                className="showcase-feature-scroll flex max-h-[min(62vh,480px)] flex-col gap-1 overflow-y-auto scroll-smooth p-2 snap-y snap-mandatory"
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
                      className={`relative w-full snap-start text-left transition-all duration-300 rounded-tl-xl rounded-br-xl border hover:border-secondary hover:hover-gradient ${
                        isActive
                          ? "border-secondary shadow-md dark:shadow-black/20"
                          : "border-transparent bg-transparent dark:hover:bg-white/[0.05]"
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

                      <div className="relative z-[1] flex items-center gap-3 py-2.5 pl-3 pr-3 sm:py-3 sm:pl-3.5">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            isActive
                              ? "border-secondary bg-white dark:bg-white/10"
                              : "border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              isActive ? "icon-text-primary" : "text-gray-500 dark:text-gray-400"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold leading-tight ${
                            isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {card.title}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-gray-200/80 px-2 py-1.5 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => scrollListBy(-120)}
                  disabled={!scrollHints.top}
                  aria-label="Scroll features up"
                  className="flex h-8 w-8 items-center justify-center rounded-tl-xl rounded-br-xl border border-transparent text-gray-500 transition-all duration-300 hover:border-secondary hover:hover-gradient hover:text-[var(--icon-text-primary)] disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">Scroll for more</span>
                <button
                  type="button"
                  onClick={() => scrollListBy(120)}
                  disabled={!scrollHints.bottom}
                  aria-label="Scroll features down"
                  className="flex h-8 w-8 items-center justify-center rounded-tl-xl rounded-br-xl border border-transparent text-gray-500 transition-all duration-300 hover:border-secondary hover:hover-gradient hover:text-[var(--icon-text-primary)] disabled:cursor-not-allowed disabled:opacity-30 dark:hover:text-white"
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
            className="relative flex min-h-[280px] sm:min-h-[360px]"
          >
            <div className="relative flex w-full flex-col overflow-hidden rounded-tl-2xl rounded-br-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-lg">
              <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] lg:min-h-[340px] bg-gray-100 dark:bg-[#0d0f14]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 p-3 sm:p-4"
                  >
                    <div className="hidden dark:block relative w-full h-full">
                      <Image
                        src={active.imageDark}
                        alt={active.title}
                        fill
                        className="object-contain object-top"
                        quality={90}
                        priority={activeCard === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                    <div className="block dark:hidden relative w-full h-full">
                      <Image
                        src={active.imageLight}
                        alt={active.title}
                        fill
                        className="object-contain object-top"
                        quality={90}
                        priority={activeCard === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10 px-4 py-4 sm:px-5 sm:py-5 bg-white dark:bg-[#0a0b0f]/80">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <active.icon className="h-4 w-4 icon-text-primary shrink-0" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {active.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{active.description}</p>
                  </motion.div>
                </AnimatePresence>
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
