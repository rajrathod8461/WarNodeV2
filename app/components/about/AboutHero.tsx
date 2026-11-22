'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import AboutAmbientBg from './AboutAmbientBg'
import CountUpStat, { type StatItem } from './CountUpStat'

const STATS: StatItem[] = [
  { value: 99.9, decimals: 1, suffix: '%', label: 'Uptime Guarantee' },
  { value: 20, prefix: '<', suffix: 'ms', label: 'India Edge Latency' },
  { value: 7.0, decimals: 1, suffix: ' GB/s', label: 'NVMe Gen4 Speeds' },
  { value: 500, suffix: '+', label: 'Active Deployments' },
]

/**
 * About page hero: headline, positioning statement and the headline metrics.
 *
 * Split out of app/about/page.tsx so that the page itself can stay a server
 * component — only this hero and the individual sections need client-side
 * motion.
 */
export default function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <AboutAmbientBg />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
            <Award className="w-4 h-4 icon-text-primary" aria-hidden="true" />
            <span className="icon-text-primary text-sm font-medium">About WarNodes</span>
          </p>

          <h1 className="orbitron-font mb-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white text-balance">
            Next-Gen Infrastructure For{' '}
            <span className="icon-text-primary relative inline-block">
              Everyone
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1418 125"
                aria-hidden="true"
                focusable="false"
                className="absolute left-0 w-full text-icon-text-primary top-full -mt-1 pointer-events-none"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path
                  d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"
                  fill="currentColor"
                />
              </motion.svg>
            </span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            WarNodes was built to deliver premium cloud, game, VPS and web hosting across India and
            worldwide — without inflated prices or oversold servers. You get the resources you pay
            for, on hardware we operate ourselves.
          </p>
        </motion.div>

        {/* Headline metrics */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none p-0 m-0">
          {STATS.map((stat, i) => (
            <li key={stat.label}>
              <CountUpStat stat={stat} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
