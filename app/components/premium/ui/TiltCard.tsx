"use client"

import { useRef, useState, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

type TiltCardProps = {
  children: ReactNode
  className?: string
  glow?: boolean
  intensity?: number
  popular?: boolean
}

export function TiltCard({
  children,
  className,
  glow = true,
  intensity = 10,
  popular = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [hovered, setHovered] = useState(false)

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glowBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(19,127,236,0.22), transparent 55%)`

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    const px = (x / rect.width - 0.5) * 2
    const py = (y / rect.height - 0.5) * 2
    rotateX.set(-py * intensity)
    rotateY.set(px * intensity)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-shadow duration-500",
        popular
          ? "border-blue-400/40 shadow-[0_0_0_1px_rgba(19,127,236,0.25),0_24px_80px_-20px_rgba(19,127,236,0.45)]"
          : "border-white/[0.08] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)]",
        hovered && !popular && "border-blue-400/25 shadow-[0_28px_70px_-24px_rgba(19,127,236,0.35)]",
        className
      )}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      {popular && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl p-px"
          style={{
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          aria-hidden
        >
          <div className="absolute -inset-full animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_65%,rgba(19,127,236,0.85)_100%)]" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay premium-noise" aria-hidden />
      <div className="relative z-10 h-full" style={{ transform: "translateZ(24px)" }}>
        {children}
      </div>
    </motion.div>
  )
}
