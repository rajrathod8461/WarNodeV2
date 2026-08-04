"use client"

import { HardDrive, Zap, Shield, Gauge } from "lucide-react"
import { SectionHeader } from "../ui/SectionHeader"
import { ScrollReveal } from "../ui/ScrollReveal"
import { AnimatedCounter } from "../ui/AnimatedCounter"
import { TiltCard } from "../ui/TiltCard"
import warnodesConfig from "@/app/config/sections/warnodes.json"
import { cn } from "@/lib/utils"

const metrics = [
  {
    icon: HardDrive,
    value: warnodesConfig.stats.nvmeSpeed,
    label: "Gen4 NVMe throughput",
    detail: "Blazing sequential reads for instant world loads and database bursts.",
  },
  {
    icon: Zap,
    value: warnodesConfig.stats.indiaLatency,
    label: "India edge latency",
    detail: "PoPs in Mumbai, Delhi & Hyderabad keep players and APIs close.",
  },
  {
    icon: Shield,
    value: "Tbps+",
    label: "WarShield capacity",
    detail: "Volumetric and L7 mitigation purpose-built for game protocols.",
  },
  {
    icon: Gauge,
    value: warnodesConfig.stats.uptime,
    label: "Network uptime",
    detail: "SLA-backed reliability with transparent status monitoring.",
  },
]

export default function PerformanceSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-24 md:py-32", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(19,127,236,0.1),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Performance"
          title={
            <>
              Numbers that feel like{" "}
              <span className="text-[#137fec]">cheating</span>
            </>
          }
          description="Hardware and network engineered for the moments that decide matches, deploys, and uptime."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.08}>
              <TiltCard className="h-full bg-[#080b14]/90 p-6 backdrop-blur-xl" intensity={8}>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#137fec]/10">
                  <m.icon className="h-5 w-5 text-[#137fec]" />
                </div>
                <AnimatedCounter
                  value={m.value}
                  className="block text-3xl font-semibold tracking-tight text-white"
                />
                <p className="mt-2 text-sm font-medium text-white/80">{m.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/40">{m.detail}</p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
