"use client"

import { motion } from "framer-motion"
import stackConfig from "../../config/sections/database-stack.json"
import { useLanguage } from "../../contexts/LanguageContext"

type StackTech = (typeof stackConfig.technologies)[number]

function TechPill({ tech }: { tech: StackTech }) {
  return (
    <motion.div
      className="group relative flex shrink-0 cursor-pointer items-center gap-3 rounded-full border border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c0e17]/80 px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-secondary hover:shadow-lg hover:shadow-primary/10 dark:hover:border-secondary"
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 p-1.5 shadow-inner transition-transform duration-300 group-hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.icon}
          alt={tech.name}
          width={24}
          height={24}
          className="h-5 w-5 object-contain transition-all duration-300 drop-shadow-sm"
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-gray-800 transition-colors duration-200 group-hover:text-icon-text-primary dark:text-gray-200">
        {tech.name}
      </span>
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/15 via-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  )
}

function TechMarquee({ items, reverse = false }: { items: StackTech[]; reverse?: boolean }) {
  const track = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-scroll-tech-seamless-reverse" : "animate-scroll-tech-seamless"} pause-hover will-change-transform py-1`}
      >
        {track.map((tech, index) => (
          <TechPill key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

export default function DatabaseStack() {
  const { t } = useLanguage()
  const technologies = stackConfig.technologies
  const midpoint = Math.ceil(technologies.length / 2)
  const topRow = technologies.slice(0, midpoint)
  const bottomRow = technologies.slice(midpoint)

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-[#0a0b0f] transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header - Centered & Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto"
        >
          {/* Badge: Modern, borderless clean pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold mb-3">
            <span className="orbitron-font">{t("database.stackBadge")}</span>
          </div>

          <h2 className="orbitron-font mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white tracking-tight">
            {t("database.supportedDatabasesTitle")}{" "}
            <span className="icon-text-primary">{t("database.supportedDatabasesTitleHighlight")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Deploy production-ready SQL, NoSQL, in-memory caches, and message queues with instant 1-click provisioning.
          </p>
        </motion.div>

        {/* Marquee with CSS mask-image edge fade (no solid side overlays or borders) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] space-y-4">
          <TechMarquee items={topRow.length ? topRow : technologies} />
          <TechMarquee items={bottomRow.length ? bottomRow : technologies} reverse />
        </div>
      </div>
    </section>
  )
}
