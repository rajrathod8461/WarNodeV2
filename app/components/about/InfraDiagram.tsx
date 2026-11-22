'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import SectionHeader from './SectionHeader'

const CENTER = { x: 400, y: 250 }

interface Node {
  name: string
  x: number
  y: number
  labelDy: number
}

// NOTE: confirm this region list matches the locations WarNodes actually serves.
const NODES: Node[] = [
  { name: 'Mumbai', x: 150, y: 105, labelDy: -16 },
  { name: 'Singapore', x: 650, y: 115, labelDy: -16 },
  { name: 'Frankfurt', x: 110, y: 270, labelDy: 28 },
  { name: 'Tokyo', x: 690, y: 270, labelDy: 28 },
  { name: 'London', x: 205, y: 415, labelDy: 30 },
  { name: 'New York', x: 595, y: 415, labelDy: 30 },
]

/**
 * Core-and-edge topology diagram.
 *
 * All continuous motion here is transform/opacity only. The radar pulses on the
 * nodes and the core scale a wrapping <g> instead of animating the SVG `r`
 * attribute — same visual, but `r` is a geometry attribute that forces a
 * re-render of the shape every frame, while `scale` composites.
 */
export default function InfraDiagram() {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 px-4 sm:px-6 lg:px-8"
      aria-labelledby="infra-heading"
    >
      {/* Dotted backdrop */}
      <div className="dottedfeatures pointer-events-none absolute inset-0 opacity-30 dark:opacity-20" />
      {/* Wrapper owns the centering transform so framer-motion's inline
          transform on the child can't clobber it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="h-full w-full blob-primary rounded-full blur-3xl will-change-transform"
          animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="Global Infrastructure"
            title={
              <span id="infra-heading">
                One Core, <span className="icon-text-primary">Everywhere You Play</span>
              </span>
            }
            description="Every WarNodes deployment is routed through a hardened core and mirrored to edge locations worldwide — so your players connect to the nearest, fastest node automatically."
          />
        </motion.div>

        <svg
          ref={ref}
          viewBox="0 0 800 500"
          className="icon-text-primary mx-auto h-auto w-full max-w-4xl"
          role="img"
          aria-label={`Diagram: a central WarNodes core connected to edge regions in ${NODES.map((n) => n.name).join(', ')}`}
        >
          {/* Connection lines (draw on view) */}
          {NODES.map((node, i) => (
            <motion.line
              key={`line-${node.name}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={node.x}
              y2={node.y}
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={inView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, delay: reduce ? 0 : i * 0.12, ease: 'easeInOut' }}
            />
          ))}

          {/* Pulses travelling core -> node */}
          {!reduce &&
            inView &&
            NODES.map((node, i) => (
              <motion.circle
                key={`pulse-${node.name}`}
                r={4}
                fill="currentColor"
                initial={{ cx: CENTER.x, cy: CENTER.y, opacity: 0 }}
                animate={{
                  cx: [CENTER.x, node.x],
                  cy: [CENTER.y, node.y],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.9 + i * 0.35,
                  repeatDelay: 0.9,
                }}
              />
            ))}

          {/* Radar pulses on each region node (scale, not `r`) */}
          {!reduce &&
            inView &&
            NODES.map((node, i) => (
              <motion.g
                key={`ping-${node.name}`}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: i * 0.4,
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={9}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
              </motion.g>
            ))}

          {/* Region nodes */}
          {NODES.map((node, i) => (
            <motion.g
              key={`node-${node.name}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView || reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : 0.6 + i * 0.12,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={9}
                className="fill-gray-50 dark:fill-[#0a0b0f]"
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <circle cx={node.x} cy={node.y} r={4} fill="currentColor" />
              <g className="text-gray-600 dark:text-gray-300">
                <text
                  x={node.x}
                  y={node.y + node.labelDy}
                  textAnchor="middle"
                  fill="currentColor"
                  className="orbitron-font"
                  style={{ fontSize: 13, fontWeight: 600 }}
                >
                  {node.name}
                </text>
              </g>
            </motion.g>
          ))}

          {/* Core radar rings (scale, not `r`) */}
          {!reduce &&
            inView &&
            [0, 1].map((i) => (
              <motion.g
                key={`core-ring-${i}`}
                style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 2.05], opacity: [0.5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: i * 1.5,
                }}
              >
                <circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r={34}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                />
              </motion.g>
            ))}

          {/* Slow orbiting dashed ring around the core */}
          <motion.g
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={52}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="6 10"
            />
          </motion.g>

          {/* Core */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={34}
            className="fill-gray-50 dark:fill-[#0a0b0f]"
            stroke="currentColor"
            strokeWidth={2}
          />
          {/* stacked-server glyph */}
          <motion.g
            stroke="currentColor"
            strokeWidth={1.6}
            fill="none"
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x={CENTER.x - 16} y={CENTER.y - 13} width={32} height={9} rx={2.5} />
            <rect x={CENTER.x - 16} y={CENTER.y - 1} width={32} height={9} rx={2.5} />
            <circle cx={CENTER.x - 10} cy={CENTER.y - 8.5} r={1.4} fill="currentColor" />
            <circle cx={CENTER.x - 10} cy={CENTER.y + 3.5} r={1.4} fill="currentColor" />
          </motion.g>
          <text
            x={CENTER.x}
            y={CENTER.y + 58}
            textAnchor="middle"
            fill="currentColor"
            className="orbitron-font"
            style={{ fontSize: 15, fontWeight: 800 }}
          >
            WarNodes Core
          </text>
        </svg>
      </div>
    </section>
  )
}
