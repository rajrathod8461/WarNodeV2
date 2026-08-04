"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

type AnimatedCounterProps = {
  value: string
  className?: string
  duration?: number
}

function parseStat(value: string): { prefix: string; num: number; suffix: string; decimals: number } | null {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return null
  const numStr = match[2]
  return {
    prefix: match[1],
    num: parseFloat(numStr),
    suffix: match[3],
    decimals: numStr.includes(".") ? numStr.split(".")[1].length : 0,
  }
}

export function AnimatedCounter({ value, className, duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = usePrefersReducedMotion()
  const parsed = parseStat(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView || !parsed || reduced) {
      setDisplay(value)
      return
    }

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      const current = parsed.num * eased
      setDisplay(
        `${parsed.prefix}${parsed.decimals > 0 ? current.toFixed(parsed.decimals) : Math.round(current)}${parsed.suffix}`
      )
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, parsed, reduced, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
