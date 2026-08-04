"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  external?: boolean
  strength?: number
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  external = false,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22 })
  const springY = useSpring(y, { stiffness: 280, damping: 22 })

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const variants = {
    primary:
      "bg-[#137fec] text-white shadow-[0_0_40px_-8px_rgba(19,127,236,0.7)] hover:bg-[#1a8fff] hover:shadow-[0_0_50px_-6px_rgba(19,127,236,0.9)]",
    secondary:
      "border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/25 hover:bg-white/[0.08]",
    ghost: "text-white/80 hover:text-white hover:bg-white/[0.06]",
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.div>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {inner}
        </a>
      )
    }
    return (
      <Link href={href} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className="appearance-none border-0 bg-transparent p-0">
      {inner}
    </button>
  )
}
