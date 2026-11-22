'use client'

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export interface StatItem {
  /** Numeric target the counter animates toward. */
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

/**
 * A single stat card whose number counts up from 0 the first time it scrolls
 * into view. Formatting (prefix/suffix/decimals) is preserved so values like
 * "<20ms", "99.9%", "7.0 GB/s" and "500+" render correctly.
 *
 * Accessibility: the animating number is hidden from assistive tech (a screen
 * reader would otherwise announce a meaningless mid-animation value). The final
 * value is exposed once, statically, via a visually-hidden sibling.
 */
export default function CountUpStat({ stat, index = 0 }: { stat: StatItem; index?: number }) {
  const { value, label, prefix = '', suffix = '', decimals = 0 } = stat
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const count = useMotionValue(0)
  const text = useTransform(count, (latest) => {
    const n = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
    return `${prefix}${n}${suffix}`
  })

  const finalText = `${prefix}${decimals > 0 ? value.toFixed(decimals) : value}${suffix}`

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      count.set(value)
      return
    }
    const controls = animate(count, value, {
      duration: 1.6,
      delay: index * 0.08,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [inView, reduce, value, index, count])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      // whileHover rather than a Tailwind hover:-translate class: framer-motion
      // writes an inline transform on this node, which would win over the class.
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative h-full overflow-hidden rounded-md border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl p-6 text-center transition-colors duration-300 hover:border-primary hover:hover-gradient"
    >
      <p className="sr-only">
        {finalText} {label}
      </p>
      <motion.p
        aria-hidden="true"
        className="orbitron-font mb-1 text-3xl sm:text-4xl font-extrabold icon-text-primary tabular-nums"
      >
        {text}
      </motion.p>
      <p aria-hidden="true" className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
      <span className="bottom-border-gradient absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}
