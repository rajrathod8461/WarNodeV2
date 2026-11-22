'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  Zap,
  ShieldCheck,
  Users,
  HeartHandshake,
  Globe,
  Gauge,
  type LucideIcon,
} from 'lucide-react'
import SectionHeader from './SectionHeader'

type Visual = 'bars' | 'shield' | 'none'

interface BentoCard {
  icon: LucideIcon
  title: string
  desc: string
  visual: Visual
  /** Extra grid-span classes for the bento layout (md and up). */
  span: string
}

const CARDS: BentoCard[] = [
  {
    icon: Zap,
    title: 'High-Octane Performance',
    desc: 'Pure Gen4 NVMe, high-frequency chips, and guaranteed RAM. We never oversell compute or storage — the resources you buy are the resources you get.',
    visual: 'bars',
    span: 'md:col-span-2',
  },
  {
    icon: ShieldCheck,
    title: 'Unbreakable Security',
    desc: 'Multi-terabit WarShield DDoS protection built into the network core — on every plan, at no additional cost.',
    visual: 'shield',
    span: 'md:row-span-2',
  },
  {
    icon: Users,
    title: 'Developer & Gamer First',
    desc: 'Built by people who live in terminals and lobbies. Sub-millisecond response times and full root control.',
    visual: 'none',
    span: '',
  },
  {
    icon: HeartHandshake,
    title: '24/7 Human Support',
    desc: 'Real technicians and moderators — not bots — reachable any hour via ticket, Discord, and live chat.',
    visual: 'none',
    span: '',
  },
  {
    icon: Globe,
    title: 'Global Edge Network',
    desc: 'Edge locations across continents keep your workloads and players close to the metal, wherever they are.',
    visual: 'none',
    span: 'md:col-span-2',
  },
  {
    icon: Gauge,
    title: '99.9% Uptime',
    desc: 'Redundant power, network, and auto-recovery keep you online — backed by a real uptime guarantee.',
    visual: 'none',
    span: '',
  },
]

/**
 * Live throughput equalizer.
 *
 * The bar's full height is fixed in CSS and the motion happens on `scaleY` with
 * a bottom transform-origin — visually identical to animating `height`, but it
 * runs on the compositor instead of forcing layout on every frame.
 * Only animates once the card is on screen.
 */
function BarsVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion()
  const bars = [0.45, 0.7, 0.35, 0.9, 0.55, 0.75, 0.4, 0.85, 0.6]

  return (
    <div className="mt-5 flex h-16 items-end gap-1.5" aria-hidden="true">
      {bars.map((peak, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-[var(--icon-primary)]/40 to-[var(--icon-primary)]/80 will-change-transform"
          style={{ height: `${peak * 100}%`, transformOrigin: 'bottom' }}
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={
            reduce
              ? { scaleY: 1 }
              : active
                ? { scaleY: [0.28, 1, 0.45, 0.9, 0.35] }
                : { scaleY: 0 }
          }
          transition={
            reduce || !active
              ? { duration: 0.4, ease: 'easeOut' }
              : {
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: i * 0.09,
                }
          }
        />
      ))}
    </div>
  )
}

/**
 * Shield with outward radar pulses. Animates scale/opacity only, so the rings
 * never reflow their neighbours.
 */
function ShieldVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion()

  return (
    <div className="relative mt-5 flex h-32 items-center justify-center" aria-hidden="true">
      {!reduce &&
        active &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-16 w-16 rounded-full border border-[var(--icon-primary)] will-change-transform"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeOut',
              delay: i * 0.86,
            }}
          />
        ))}

      {/* Static fallback ring so the visual still reads when motion is off. */}
      {(reduce || !active) && (
        <span className="absolute h-24 w-24 rounded-full border border-[var(--icon-primary)] opacity-25" />
      )}

      <motion.span
        className="relative flex h-16 w-16 items-center justify-center rounded-full card-primary border border-secondary will-change-transform"
        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ShieldCheck className="h-8 w-8 icon-text-primary" />
      </motion.span>
    </div>
  )
}

function Card({ card, index }: { card: BentoCard; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = card.icon

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      // whileHover rather than a Tailwind hover:-translate class: framer-motion
      // writes an inline transform on this node, which would win over the class.
      whileHover={reduce ? undefined : { y: -6 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-md border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl p-6 transition-colors duration-300 hover:border-primary hover:hover-gradient ${card.span}`}
    >
      {/* Floating icon tile */}
      <motion.span
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg card-primary border border-secondary will-change-transform"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      >
        <Icon className="h-6 w-6 icon-text-primary" aria-hidden="true" />
      </motion.span>

      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors">
        {card.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.desc}</p>

      {card.visual === 'bars' && <BarsVisual active={inView} />}
      {card.visual === 'shield' && <ShieldVisual active={inView} />}
    </motion.li>
  )
}

export default function WhyBento() {
  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="Why WarNodes"
            title={
              <span id="why-heading">
                Everything You Need, <span className="icon-text-primary">Nothing You Don&apos;t</span>
              </span>
            }
            description="The engineering decisions behind every WarNodes plan — and the trade-offs we refuse to make."
          />
        </motion.div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr list-none p-0 m-0">
          {CARDS.map((card, index) => (
            <Card key={card.title} card={card} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
