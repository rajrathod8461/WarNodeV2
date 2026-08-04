"use client"

import dynamic from "next/dynamic"
import { SectionHeader } from "../ui/SectionHeader"
import { ScrollReveal } from "../ui/ScrollReveal"
import { AnimatedCounter } from "../ui/AnimatedCounter"
import warnodesConfig from "@/app/config/sections/warnodes.json"
import { cn } from "@/lib/utils"

const WorldMap = dynamic(() => import("@/app/components/ui/world-map"), { ssr: false })

const connections = [
  { start: { lat: 19.076, lng: 72.8777, label: "Mumbai" }, end: { lat: 1.3521, lng: 103.8198, label: "Singapore" } },
  { start: { lat: 19.076, lng: 72.8777, label: "Mumbai" }, end: { lat: 25.2048, lng: 55.2708, label: "Dubai" } },
  { start: { lat: 19.076, lng: 72.8777, label: "Mumbai" }, end: { lat: 50.1109, lng: 8.6821, label: "Frankfurt" } },
  { start: { lat: 1.3521, lng: 103.8198, label: "Singapore" }, end: { lat: 38.9072, lng: -77.0369, label: "Washington DC" } },
  { start: { lat: 28.6139, lng: 77.209, label: "Delhi" }, end: { lat: 17.385, lng: 78.4867, label: "Hyderabad" } },
]

export default function GlobalNetworkSection({ className }: { className?: string }) {
  const locations = warnodesConfig.locations.filter((l) => l.status === "active")

  return (
    <section className={cn("relative overflow-hidden py-24 md:py-32", className)}>
      <div className="pointer-events-none absolute inset-0 premium-grid opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Global Network"
          title={
            <>
              Infrastructure that{" "}
              <span className="bg-gradient-to-r from-white to-[#137fec] bg-clip-text text-transparent">
                spans continents
              </span>
            </>
          }
          description="Low-latency PoPs across India and key global hubs — engineered for gamers and builders who refuse to compromise on ping."
        />

        <ScrollReveal className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-4 sm:p-8">
          <WorldMap dots={connections} lineColor="#137fec" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060a] via-transparent to-transparent" />
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.name} delay={i * 0.05}>
              <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-[#137fec]/40 hover:bg-[#137fec]/5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{loc.name}</span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <p className="text-xs text-white/40">{loc.region}</p>
                <p className="mt-2 font-mono text-sm text-[#137fec]">{loc.ping}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: warnodesConfig.stats.indiaLatency, label: "India latency" },
            { value: warnodesConfig.stats.uptime, label: "Uptime SLA" },
            { value: String(locations.length), label: "Active locations" },
            { value: warnodesConfig.stats.ddosProtection, label: "Protection" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 + i * 0.05} className="text-center">
              <AnimatedCounter
                value={stat.value}
                className="block text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              />
              <span className="mt-1 block text-xs uppercase tracking-wider text-white/40">
                {stat.label}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
