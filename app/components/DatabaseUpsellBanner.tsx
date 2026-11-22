'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Database, Zap, RefreshCw, HardDrive,
  Lock, Globe, LayoutDashboard, TrendingUp, ArrowRight, ChevronLeft, ChevronRight,
} from 'lucide-react'

const DB_FEATURES = [
  {
    icon: Database,
    title: 'Database Engines',
    desc: 'Run MySQL, MariaDB, or PostgreSQL — flexible configurations designed for everything from small apps to production workloads.',
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    desc: 'Skip complicated server configuration. Select your database, choose resources, and deploy a ready-to-use environment in seconds.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Backups',
    desc: 'Scheduled backups protect your database from accidental deletion, configuration issues, and unexpected failures.',
  },
  {
    icon: HardDrive,
    title: 'High-Performance NVMe',
    desc: 'NVMe SSD storage delivers fast, consistent read and write performance even under heavier workloads.',
  },
  {
    icon: Lock,
    title: 'Secure Connections',
    desc: 'Encrypted connections and controlled access help protect sensitive data while services communicate securely.',
  },
  {
    icon: Globe,
    title: 'Remote Access',
    desc: 'Connect apps, websites, dev environments, and external services via secure remote database access.',
  },
  {
    icon: LayoutDashboard,
    title: 'Easy Management',
    desc: 'Create databases, users, credentials, and permissions through a clean, straightforward management panel.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    desc: 'Upgrade to more RAM, CPU, or storage whenever your application grows — without rebuilding from scratch.',
  },
  {
    icon: LayoutDashboard,
    title: 'Developer Friendly',
    desc: 'Use standard database protocols and familiar tools to connect apps, manage data, run queries, and integrate into existing development workflows.',
  },
]

const CARDS_PER_SLIDE = 3
const TOTAL_SLIDES = Math.ceil(DB_FEATURES.length / CARDS_PER_SLIDE)
const INTERVAL_MS = 3500

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function DatabaseUpsellBanner() {
  const [[page, dir], setPage] = useState([0, 1])

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(([p]) => [(p + 1) % TOTAL_SLIDES, 1])
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const paginate = (newDir: number) => {
    setPage(([p]) => [((p + newDir) + TOTAL_SLIDES) % TOTAL_SLIDES, newDir])
  }

  const visibleFeatures = DB_FEATURES.slice(
    page * CARDS_PER_SLIDE,
    page * CARDS_PER_SLIDE + CARDS_PER_SLIDE,
  )

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50 dark:bg-[#0a0b0f]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[800px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="card-primary mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
              <Database className="w-4 h-4 icon-text-primary" />
              <span className="icon-text-primary text-sm font-medium">Database Hosting</span>
            </div>

            <h2 className="orbitron-font text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Need a Database for Your{' '}
              <span className="icon-text-primary relative inline-block">
                Application?
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1418 125"
                  className="absolute left-0 w-full text-icon-text-primary top-full -mt-1 pointer-events-none"
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="currentColor" />
                </motion.svg>
              </span>
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-md">
              Add a fully managed database to any plan — deployed alongside your server in seconds. Starting at{' '}
              <span className="font-bold text-gray-900 dark:text-white">Rs. 49/mo</span>.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['MySQL', 'MariaDB', 'PostgreSQL'].map((e) => (
                <span key={e} className="inline-flex items-center px-3 py-1.5 rounded-tl-xl rounded-br-xl border border-secondary card-primary text-xs font-semibold icon-text-primary orbitron-font">
                  {e}
                </span>
              ))}
            </div>

            <Link
              href="/database-hosting"
              className="button-primary text-button-primary orbitron-font inline-flex items-center gap-2 px-6 py-3 rounded-tl-2xl rounded-br-2xl text-sm font-semibold hover:border-[var(--border-secondary)] hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] transition-all group"
            >
              View Database Plans
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* RIGHT: auto-sliding carousel */}
          <div className="flex flex-col gap-5 pt-20 lg:pt-28">
            <div className="relative overflow-hidden min-h-[300px]">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={page}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4"
                >
                  {visibleFeatures.map((feat) => {
                    const Icon = feat.icon
                    return (
                      <div
                        key={feat.title}
                        className="flex gap-4 p-5 rounded-tl-2xl rounded-br-2xl border border-secondary bg-white dark:bg-gray-950/20 backdrop-blur-xl hover:hover-gradient hover:border-secondary transition-all group"
                      >
                        <div className="mt-0.5 w-10 h-10 flex-shrink-0 rounded-lg card-primary border border-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 icon-text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                            {feat.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(([p]) => [i, i > p ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === page
                        ? 'w-6 button-primary'
                        : 'w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(-1)}
                  className="w-8 h-8 flex items-center justify-center rounded-tl-lg rounded-br-lg border border-secondary card-primary hover:hover-gradient hover:border-secondary transition-all"
                >
                  <ChevronLeft className="w-4 h-4 icon-text-primary" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-8 h-8 flex items-center justify-center rounded-tl-lg rounded-br-lg border border-secondary card-primary hover:hover-gradient hover:border-secondary transition-all"
                >
                  <ChevronRight className="w-4 h-4 icon-text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}