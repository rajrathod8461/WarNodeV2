'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Ambient animated backdrop for the About page.
 * Slow-drifting blurred orbs + a faint dotted grid + a top gradient wash.
 * Sits behind page content (z-0, pointer-events-none).
 *
 * The drift animates x/y only — transform-based, so it stays on the compositor
 * and never triggers layout. Motion collapses to a static layer when the user
 * prefers reduced motion.
 */
export default function AboutAmbientBg() {
  const reduce = useReducedMotion()

  const drift = (x: number[], y: number[], duration: number) =>
    reduce
      ? undefined
      : {
          x,
          y,
          transition: {
            duration,
            repeat: Infinity,
            repeatType: 'mirror' as const,
            ease: 'easeInOut' as const,
          },
        }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Faint dotted grid */}
      <div className="dottedfeatures absolute inset-0 opacity-[0.35] dark:opacity-25" />

      {/* Top gradient wash so the grid fades toward the header */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-gray-50 via-gray-50/70 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/70" />

      {/* Drifting blurred orbs */}
      <motion.div
        className="blob-primary absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full blur-3xl will-change-transform"
        animate={drift([0, 40, -20, 0], [0, 30, 60, 0], 22)}
      />
      <motion.div
        className="blob-secondary absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full blur-3xl will-change-transform"
        animate={drift([0, -50, 20, 0], [0, 40, -30, 0], 26)}
      />
      <motion.div
        className="blob-primary absolute bottom-0 left-1/4 h-80 w-80 rounded-full blur-3xl will-change-transform"
        animate={drift([0, 30, -30, 0], [0, -20, 20, 0], 30)}
      />

      {/* Bottom fade into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 to-transparent dark:from-[#0a0b0f]" />
    </div>
  )
}
