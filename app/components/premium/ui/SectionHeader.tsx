"use client"

import { cn } from "@/lib/utils"
import { ScrollReveal } from "./ScrollReveal"

type SectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
  className?: string
  actions?: React.ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  actions,
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#137fec]">
          <span className="h-px w-6 bg-[#137fec]/60" aria-hidden />
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          "flex flex-col gap-6",
          align === "left" && "sm:flex-row sm:items-end sm:justify-between"
        )}
      >
        <div className={cn(align === "center" && "mx-auto max-w-3xl")}>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </ScrollReveal>
  )
}
