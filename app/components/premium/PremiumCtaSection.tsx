"use client"

import { ArrowRight } from "lucide-react"
import warnodesConfig from "@/app/config/sections/warnodes.json"
import { MagneticButton } from "./ui/MagneticButton"
import { ScrollReveal } from "./ui/ScrollReveal"

export default function PremiumCtaSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="premium-glass relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16 md:px-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,127,236,0.18),transparent_65%)]" />
            <div className="pointer-events-none absolute inset-0 premium-noise opacity-[0.03]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#137fec]">
                Ready to deploy
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Launch on infrastructure built for India
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
                {warnodesConfig.company.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MagneticButton href="/games" variant="primary">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href={warnodesConfig.links.portal} variant="secondary" external>
                  Client area
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
