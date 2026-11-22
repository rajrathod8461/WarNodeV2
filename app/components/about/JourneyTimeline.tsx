'use client'

import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Rocket, Server, ShieldCheck, Globe, Trophy, type LucideIcon } from 'lucide-react'
import SectionHeader from './SectionHeader'

interface Milestone {
  year: string
  title: string
  desc: string
  icon: LucideIcon
}

// ---------------------------------------------------------------------------
// PLACEHOLDER CONTENT — NOT VERIFIED COMPANY HISTORY.
// The years and milestones below are illustrative examples, not confirmed
// WarNodes facts. Replace every entry with the real founding date and real
// milestones before this page is treated as public-facing marketing copy.
// ---------------------------------------------------------------------------
const MILESTONES: Milestone[] = [
  {
    year: '2019',
    title: 'The Spark',
    desc: 'Founded by gamers and engineers tired of laggy, oversold hosting. One rented box, one promise: never oversell.',
    icon: Rocket,
  },
  {
    year: '2020',
    title: 'First Edge Node',
    desc: 'Deployed our first India datacenter on pure Gen4 NVMe and high-frequency chips — sub-20ms latency from day one.',
    icon: Server,
  },
  {
    year: '2021',
    title: 'WarShield is Born',
    desc: 'Built multi-terabit DDoS mitigation directly into the network core, protecting every plan at no extra cost.',
    icon: ShieldCheck,
  },
  {
    year: '2023',
    title: 'Going Global',
    desc: 'Expanded to edge locations across continents, bringing low-latency compute closer to players everywhere.',
    icon: Globe,
  },
  {
    year: '2025',
    title: '500+ Deployments',
    desc: 'Trusted by studios, creators, and communities worldwide — with 99.9% uptime and 24/7 human support.',
    icon: Trophy,
  },
]

function MilestoneRow({ milestone, index }: { milestone: Milestone; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const Icon = milestone.icon
  const onLeft = index % 2 === 0
  const fromX = reduce ? 0 : onLeft ? -40 : 40

  return (
    <li ref={ref} className="relative flex md:items-center">
      {/* Node on the line, with a radar ping. The ping animates scale/opacity
          only, so it composites without touching layout. */}
      <span
        aria-hidden="true"
        className="absolute left-5 md:left-1/2 top-2 md:top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 md:-translate-y-1/2 items-center justify-center"
      >
        {!reduce && (
          <motion.span
            className="absolute h-3 w-3 rounded-full bg-[var(--icon-primary)] will-change-transform"
            animate={{ scale: [1, 2.6, 1], opacity: [0.55, 0, 0.55] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          />
        )}
        <span className="relative h-3 w-3 rounded-full bg-[var(--icon-primary)] ring-4 ring-gray-50 dark:ring-[#0a0b0f]" />
      </span>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: fromX }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: fromX }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`ml-12 w-[calc(100%-3rem)] md:ml-0 md:w-[calc(50%-2.75rem)] ${
          onLeft ? 'md:mr-auto md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'
        }`}
      >
        <div className="group h-full rounded-md border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl p-5 transition-[transform,border-color,background-image] duration-300 hover:-translate-y-1 hover:border-primary hover:hover-gradient">
          <div className={`flex items-center gap-3 mb-2 ${onLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg card-primary border border-secondary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5 icon-text-primary" aria-hidden="true" />
            </span>
            <span className="orbitron-font text-lg font-extrabold icon-text-primary">
              {milestone.year}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
            {milestone.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {milestone.desc}
          </p>
        </div>
      </motion.div>
    </li>
  )
}

export default function JourneyTimeline() {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="journey-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeader
            eyebrow="Our Journey"
            title={
              <span id="journey-heading">
                From One Box to a <span className="icon-text-primary">Global Network</span>
              </span>
            }
            description="How WarNodes grew from a single rented server into a multi-region hosting platform."
          />
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-4xl">
          {/* Timeline track — fills as the reader scrolls. */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-[var(--border-secondary)]"
          >
            <motion.div
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[var(--icon-primary)] to-transparent"
              style={{ scaleY: reduce ? 1 : scaleY }}
            />
          </div>

          <ol className="space-y-10 md:space-y-16 list-none p-0 m-0">
            {MILESTONES.map((milestone, index) => (
              <MilestoneRow key={milestone.year} milestone={milestone} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
