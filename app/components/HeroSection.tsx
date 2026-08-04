"use client"

import dynamic from "next/dynamic"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MagneticButton } from "./premium/ui/MagneticButton"
import { AnimatedCounter } from "./premium/ui/AnimatedCounter"
import CinematicBackground from "./premium/backgrounds/CinematicBackground"
import warnodesConfig from "../config/sections/warnodes.json"
import heroConfig from "../config/sections/hero.json"
import type { HeroConfig } from "../types/hero"
import { withLogoVersion } from "../lib/logo"

const NetworkScene = dynamic(() => import("./premium/visuals/NetworkScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(19,127,236,0.2),transparent_60%)]" />
  ),
})

const config = heroConfig as HeroConfig
const logoSrc = withLogoVersion(config.navbar.logo, config.navbar.logoVersion)

const stats = [
  { value: warnodesConfig.stats.nvmeSpeed, label: "NVMe" },
  { value: warnodesConfig.stats.indiaLatency, label: "India ping" },
  { value: warnodesConfig.stats.uptime, label: "Uptime" },
  { value: warnodesConfig.stats.users, label: "Customers" },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      <CinematicBackground intensity="hero" className="absolute inset-0" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                India&apos;s smoothest hosting
              </span>
            </div>

            <div className="mb-6 flex items-center gap-3">
              <Image
                src={logoSrc}
                alt="WarNodes"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                priority
                unoptimized
              />
              <h1 className="orbitron-font text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                War<span className="text-[#137fec]">Nodes</span>
              </h1>
            </div>

            <p className="max-w-xl text-balance text-xl font-medium leading-snug tracking-tight text-white/90 sm:text-2xl md:text-3xl">
              {warnodesConfig.company.tagline}
            </p>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
              {warnodesConfig.company.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton href="/games" variant="primary" className="w-full sm:w-auto">
                Deploy a server
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/ddos" variant="secondary" className="w-full sm:w-auto">
                <Play className="h-3.5 w-3.5 fill-current" />
                See WarShield
              </MagneticButton>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 backdrop-blur-sm sm:px-4"
                >
                  <AnimatedCounter
                    value={s.value}
                    className="block text-lg font-semibold tracking-tight text-white sm:text-xl"
                  />
                  <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-white/40">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-square max-h-[520px] w-full max-w-[560px] lg:max-h-none lg:max-w-none"
          >
            <div className="absolute inset-[8%] rounded-full bg-[#137fec]/15 blur-3xl" />
            <NetworkScene className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-[#070b14]/70 p-4 backdrop-blur-xl sm:inset-x-16">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Live fabric</p>
                  <p className="text-sm font-medium text-white">
                    Cloud nodes · WarShield · Gen4 NVMe
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  {config.hero.partners.slice(0, 3).map((p) => (
                    <div
                      key={p.name}
                      className="relative h-6 w-14 opacity-50 grayscale transition hover:opacity-100 hover:grayscale-0"
                    >
                      <Image src={p.src} alt={p.name} fill className="object-contain" sizes="56px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05060a] to-transparent" />
    </section>
  )
}
