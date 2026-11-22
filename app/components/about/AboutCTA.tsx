'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageCircle, Users } from 'lucide-react'

/**
 * Closing call to action.
 *
 * Notes on the rewrite:
 * - Uses next/link, not raw <a>. The previous anchors triggered a full document
 *   reload on every internal navigation instead of client-side routing.
 * - The accent wash is derived from --icon-primary via color-mix rather than a
 *   hardcoded rgba(59,130,246,…), so it follows the site's theme switcher.
 * - The panel background now matches the page surface (#0a0b0f) instead of the
 *   one-off #0b1220 it used before.
 * - globals.css resets outlines, so every link carries an explicit
 *   focus-visible ring.
 * - The sheen sweep and drifting blobs animate transform only.
 */
export default function AboutCTA() {
  const reduce = useReducedMotion()

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl border border-secondary bg-white dark:bg-[#0a0b0f] px-6 py-14 text-center sm:px-14"
          style={{
            backgroundImage:
              'linear-gradient(135deg, color-mix(in srgb, var(--icon-primary) 18%, transparent), color-mix(in srgb, var(--icon-primary) 4%, transparent) 45%, transparent 70%)',
          }}
        >
          {/* Sheen sweeping across the panel */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/10 will-change-transform"
              animate={{ x: ['0%', '450%'] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1.5,
              }}
            />
          )}

          {/* Decorative drifting blobs */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 blob-primary rounded-full blur-3xl will-change-transform"
            animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 blob-secondary rounded-full blur-3xl will-change-transform"
            animate={reduce ? undefined : { x: [0, -25, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <h2 className="orbitron-font mx-auto mb-4 max-w-2xl text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white text-balance">
              Ready to Deploy on a Network Built to <span className="icon-text-primary">Win</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
              Spin up a server in minutes with guaranteed resources, WarShield DDoS protection
              included, and 24/7 human support. No overselling, ever.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/games"
                className="group button-primary text-button-primary orbitron-font inline-flex items-center gap-2 rounded-md px-6 py-3 font-bold no-underline transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--icon-primary)]"
              >
                Deploy Your Server
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-secondary px-6 py-3 font-medium text-gray-800 dark:text-white no-underline transition-colors hover:hover-gradient hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--icon-primary)]"
              >
                <MessageCircle className="h-5 w-5 icon-text-primary" aria-hidden="true" />
                Talk to Sales
              </Link>
            </div>

            {/* Internal wayfinding — the About page previously linked nowhere else. */}
            <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
              Prefer to know who you&apos;re buying from?{' '}
              <Link
                href="/team"
                className="icon-text-primary inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--icon-primary)]"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                Meet the team
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
