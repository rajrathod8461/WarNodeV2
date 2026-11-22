'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Boxes, ShieldCheck, Headset, Timer, type LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'

interface Principle {
  icon: LucideIcon
  title: string
  desc: string
}

/**
 * Operating commitments — deliberately phrased as promises WarNodes makes,
 * not as unverifiable statistics. Each one restates a claim already made
 * elsewhere on the site, so nothing here introduces a new factual assertion.
 */
const PRINCIPLES: Principle[] = [
  {
    icon: Boxes,
    title: 'Resources stay yours',
    desc: 'We size every node so the CPU, RAM and NVMe you pay for remain available to you — no overselling, no noisy-neighbour surprises at peak hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Security is included, not upsold',
    desc: 'WarShield DDoS mitigation ships with every plan at no additional cost. Staying online is not a premium tier.',
  },
  {
    icon: Headset,
    title: 'Real engineers answer',
    desc: 'Tickets, Discord and live chat reach technicians who can read a stack trace and act on it — available around the clock, not a bot queue.',
  },
  {
    icon: Timer,
    title: 'Latency is a feature',
    desc: 'We place capacity close to the people using it and treat milliseconds as a product decision, not a marketing line.',
  },
]

export default function OperatingPrinciples() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="principles-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="How We Operate"
            title={
              <span id="principles-heading">
                Commitments We <span className="icon-text-primary">Hold Ourselves To</span>
              </span>
            }
            description="Hosting is easy to promise and hard to sustain. These are the standards we build against — and the ones you should hold us to."
          />
        </motion.div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 list-none p-0 m-0">
          {PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon
            return (
              <motion.li
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: 'easeOut' }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group flex h-full gap-4 rounded-md border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl p-6 transition-colors duration-300 hover:border-primary hover:hover-gradient"
              >
                <motion.span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg card-primary border border-secondary will-change-transform"
                  animate={reduce ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                >
                  <Icon className="h-5 w-5 icon-text-primary" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="mb-1.5 text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {principle.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {principle.desc}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
