"use client"

import {
  Cpu,
  Shield,
  Zap,
  Settings,
  Cloud,
  Rocket,
  HardDrive,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { SectionHeader } from "./premium/ui/SectionHeader"
import { ScrollReveal } from "./premium/ui/ScrollReveal"
import { TiltCard } from "./premium/ui/TiltCard"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeaturesSection() {
  const { t } = useLanguage()

  const features: Feature[] = [
    {
      icon: HardDrive,
      title: t("features.highPerformance"),
      description: t("features.highPerformanceDesc"),
    },
    {
      icon: Zap,
      title: t("features.lowLatency"),
      description: t("features.lowLatencyDesc"),
    },
    {
      icon: Shield,
      title: t("features.advancedSecurity"),
      description: t("features.advancedSecurityDesc"),
    },
    {
      icon: Rocket,
      title: t("features.autoRecovery"),
      description: t("features.autoRecoveryDesc"),
    },
    {
      icon: Settings,
      title: t("features.fullControl"),
      description: t("features.fullControlDesc"),
    },
    {
      icon: Cpu,
      title: t("features.resourceScaling"),
      description: t("features.resourceScalingDesc"),
    },
    {
      icon: Cloud,
      title: t("features.globalNetwork"),
      description: t("features.globalNetworkDesc"),
    },
  ]

  const featured = features[0]
  const FeaturedIcon = featured.icon
  const rest = features.slice(1)

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 premium-grid opacity-25" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform"
          title={
            <>
              Built for speed.{" "}
              <span className="text-white/40">Hardened for scale.</span>
            </>
          }
          description={t("features.subtitle")}
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <TiltCard className="h-full min-h-[280px] bg-gradient-to-br from-[#137fec]/20 via-[#080b14] to-[#080b14] p-8" intensity={6} popular>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <FeaturedIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">{featured.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/55">{featured.description}</p>
              <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60">
                WarShield Protected
              </div>
            </TiltCard>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {rest.map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={feature.title} delay={0.05 * index}>
                  <TiltCard className="h-full bg-[#080b14]/80 p-6 backdrop-blur-xl" intensity={8}>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#137fec]/10">
                      <Icon className="h-5 w-5 text-[#137fec]" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">{feature.description}</p>
                  </TiltCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
