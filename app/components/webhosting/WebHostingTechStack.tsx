"use client"

import { motion } from "framer-motion"
import stackConfig from "../../config/sections/webhosting-stack.json"
import { useLanguage } from "../../contexts/LanguageContext"

type StackTech = (typeof stackConfig.technologies)[number]

const LIGHT_ICONS = new Set([
  "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  "https://cdn.simpleicons.org/flask/FFFFFF",
  "https://cdn.simpleicons.org/express/FFFFFF",
  "https://cdn.simpleicons.org/github/FFFFFF",
  "https://cdn.simpleicons.org/steam/FFFFFF",
])

function TechPill({ tech }: { tech: StackTech }) {
  const needsInvert = LIGHT_ICONS.has(tech.icon)

  return (
    <motion.div
      className="flex shrink-0 items-center gap-2.5 rounded-full border border-secondary bg-white/60 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:bg-white/5"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={tech.icon}
        alt={tech.name}
        width={24}
        height={24}
        className={`h-6 w-6 object-contain ${needsInvert ? "invert opacity-80 dark:opacity-90" : ""}`}
        loading="lazy"
        decoding="async"
      />
      <span className="whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
        {tech.name}
      </span>
    </motion.div>
  )
}

function TechMarquee({ items, reverse = false }: { items: StackTech[]; reverse?: boolean }) {
  const track = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className={`flex w-max gap-4 ${reverse ? "animate-scroll-tech-reverse" : "animate-scroll-tech"} will-change-transform`}
        aria-hidden={false}
      >
        {track.map((tech, index) => (
          <TechPill key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  )
}

export default function WebHostingTechStack() {
  const { t } = useLanguage()
  const technologies = stackConfig.technologies
  const primary = technologies.slice(0, 8)
  const secondary = technologies.slice(8)

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0a0b0f]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-icon-text-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {t("webHostingStack.badge")}
          </p>
          <h2 className="orbitron-font text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            {t("webHostingStack.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-300">
            {t("webHostingStack.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4"
        >
          <TechMarquee items={primary.length ? primary : technologies} />
          <TechMarquee items={secondary.length ? secondary : technologies} reverse />
        </motion.div>
      </div>
    </section>
  )
}
