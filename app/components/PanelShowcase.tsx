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
import { SectionHeader } from "./premium/ui/SectionHeader"
import { ScrollReveal } from "./premium/ui/ScrollReveal"

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
  const ActiveIcon = active.icon

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(19,127,236,0.1),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("panelShowcase.badge")}
          title={
            <>
              {t("panelShowcase.title").split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-[#137fec]">
                {t("panelShowcase.title").split(" ").slice(-2).join(" ")}
              </span>
            </>
          }
          description={t("panelShowcase.subtitle")}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-stretch lg:gap-6">
          <ScrollReveal className="flex min-h-0 flex-col">
            <div className="mb-3 flex items-center justify-between gap-2 px-1">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                {t("panelShowcase.featuresLabel")}
              </p>
              <span className="rounded-full border border-[#137fec]/30 bg-[#137fec]/10 px-2.5 py-0.5 text-xs font-semibold text-[#137fec]">
                {t("panelShowcase.featuresCount")}
              </span>
            </div>

            <div className="premium-glass relative overflow-hidden rounded-2xl">
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-[#080b14] via-[#080b14]/80 to-transparent transition-opacity duration-300 ${
                  scrollHints.top ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-11 z-10 h-10 bg-gradient-to-t from-[#080b14] via-[#080b14]/80 to-transparent transition-opacity duration-300 ${
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
                      className={`relative w-full snap-start rounded-xl border text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#137fec]/35 bg-[#137fec]/10 shadow-[0_8px_32px_-12px_rgba(19,127,236,0.35)]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
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
                              ? "border-[#137fec]/30 bg-[#137fec]/15"
                              : "border-white/10 bg-white/[0.04]"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              isActive ? "text-[#137fec]" : "text-white/40"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold leading-tight ${
                            isActive ? "text-white" : "text-white/45"
                          }`}
                        >
                          {card.title}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/[0.08] px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => scrollListBy(-120)}
                  disabled={!scrollHints.top}
                  aria-label="Scroll features up"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent text-white/50 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="text-[10px] text-white/35">Scroll for more</span>
                <button
                  type="button"
                  onClick={() => scrollListBy(120)}
                  disabled={!scrollHints.bottom}
                  aria-label="Scroll features down"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent text-white/50 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="relative flex min-h-[280px] sm:min-h-[360px]">
            <div className="premium-glass relative flex w-full flex-col overflow-hidden rounded-2xl">
              <div className="relative min-h-[220px] flex-1 bg-[#0d0f14] sm:min-h-[300px] lg:min-h-[340px]">
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

              <div className="border-t border-white/[0.08] bg-[#080b14]/80 px-4 py-4 sm:px-5 sm:py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <ActiveIcon className="h-4 w-4 shrink-0 text-[#137fec]" />
                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {active.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/45">{active.description}</p>
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
