'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  HardDrive,
  Network,
  MemoryStick,
  Globe,
  Zap,
  Server,
  ShieldCheck,
  Activity,
  Radio,
  ArrowRight,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SPECS = [
  {
    category: 'Compute',
    icon: Cpu,
    items: [
      { label: 'CPU Architecture', value: 'AMD EPYC / Intel Xeon', bar: 98 },
      { label: 'Core Frequency', value: 'Up to 4.9 GHz Boost', bar: 93 },
      { label: 'Threads per Node', value: '128–256 vThreads', bar: 88 },
      { label: 'Virtualization', value: 'KVM Type-1 Hypervisor', bar: 100 },
    ],
  },
  {
    category: 'Storage',
    icon: HardDrive,
    items: [
      { label: 'Drive Type', value: 'Gen4 NVMe PCIe 4.0', bar: 100 },
      { label: 'Sequential Read', value: '7,000 MB/s', bar: 100 },
      { label: 'Sequential Write', value: '6,500 MB/s', bar: 95 },
      { label: 'RAID Protection', value: 'RAID 10 Redundancy', bar: 90 },
    ],
  },
  {
    category: 'Memory',
    icon: MemoryStick,
    items: [
      { label: 'RAM Type', value: 'DDR5 ECC Registered', bar: 100 },
      { label: 'RAM Speed', value: '4800–5600 MHz', bar: 92 },
      { label: 'Max per Node', value: 'Up to 1.5 TB RAM', bar: 85 },
      { label: 'Allocation', value: 'Dedicated (no sharing)', bar: 100 },
    ],
  },
  {
    category: 'Network',
    icon: Network,
    items: [
      { label: 'Uplink Speed', value: '10 Gbps / 40 Gbps', bar: 95 },
      { label: 'DDoS Mitigation', value: 'Tbps-scale WarShield', bar: 100 },
      { label: 'Peering', value: 'Tier-1 BGP Multi-homed', bar: 90 },
      { label: 'IPv4 / IPv6', value: 'Dual-stack Supported', bar: 100 },
    ],
  },
]

const NODES = [
  { city: 'Mumbai', country: 'India', latency: '< 5ms', status: 'Online', flag: '🇮🇳' },
  { city: 'Delhi', country: 'India', latency: '< 8ms', status: 'Online', flag: '🇮🇳' },
  { city: 'Singapore', country: 'Singapore', latency: '< 30ms', status: 'Online', flag: '🇸🇬' },
  { city: 'Frankfurt', country: 'Germany', latency: '< 110ms', status: 'Online', flag: '🇩🇪' },
  { city: 'New York', country: 'USA', latency: '< 180ms', status: 'Online', flag: '🇺🇸' },
  { city: 'Los Angeles', country: 'USA', latency: '< 200ms', status: 'Beta', flag: '🇺🇸' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function SpecBar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function InfrastructurePage() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
            <Server className="w-4 h-4 icon-text-primary" />
            <span className="icon-text-primary text-sm font-medium">Enterprise Infrastructure</span>
          </div>
          <h1 className="orbitron-font mb-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our{' '}
            <span className="icon-text-primary relative inline-block">
              Infrastructure
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1418 125"
                className="absolute left-0 w-full text-icon-text-primary top-full -mt-1 pointer-events-none"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" fill="currentColor" />
              </motion.svg>
            </span>
          </h1>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300 text-md leading-relaxed">
            Every WarNodes server runs on enterprise-grade bare metal designed for maximum throughput, redundancy, and security.
          </p>
        </motion.div>
      </section>

      {/* ─── Spec Explorer ─── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SPECS.map((s, i) => {
            const Icon = s.icon
            return (
              <button
                key={s.category}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md border text-sm font-semibold transition-all orbitron-font ${
                  activeCategory === i
                    ? 'border-secondary button-primary text-button-primary'
                    : 'border-primary card-primary text-gray-500 dark:text-gray-400 hover:hover-gradient hover:border-secondary hover:text-icon-text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {s.category}
              </button>
            )
          })}
        </div>

        {/* Spec display — two-column layout */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Left: big visual panel */}
          <div className="rounded-xl border border-secondary bg-white dark:bg-gray-950/30 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[340px] hover:hover-gradient transition-all">
            <div>
              {(() => {
                const Icon = SPECS[activeCategory].icon
                return (
                  <div className="w-14 h-14 rounded-xl card-primary border border-secondary flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 icon-text-primary" />
                  </div>
                )
              })()}
              <h2 className="orbitron-font text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                {SPECS[activeCategory].category}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enterprise-grade {SPECS[activeCategory].category.toLowerCase()} specifications across all WarNodes deployments.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                All Systems Nominal
              </span>
            </div>
          </div>

          {/* Right: spec rows with bars */}
          <div className="flex flex-col gap-4">
            {SPECS[activeCategory].items.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl border border-secondary bg-white dark:bg-gray-950/30 backdrop-blur-xl px-6 py-4 hover:hover-gradient transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="orbitron-font text-xs font-bold icon-text-primary">{spec.bar}%</span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">{spec.value}</p>
                <SpecBar value={spec.bar} delay={i * 0.1} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Network Nodes ─── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="orbitron-font text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Global <span className="icon-text-primary">Network</span> Nodes
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Real-time status of all WarNodes edge locations.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {NODES.map((node) => (
            <motion.div
              key={node.city}
              variants={itemVariants}
              className="rounded-xl border border-secondary bg-white dark:bg-gray-950/30 backdrop-blur-xl p-5 flex items-center gap-4 hover:hover-gradient hover:border-secondary transition-all group"
            >
              <div className="text-3xl">{node.flag}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{node.city}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{node.country}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="orbitron-font text-xs font-bold icon-text-primary">{node.latency}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-0.5 ${
                  node.status === 'Online' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${
                    node.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-yellow-400 animate-pulse'
                  }`} />
                  {node.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
