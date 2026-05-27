"use client"

import { motion } from "framer-motion"
import stackConfig from "../../config/sections/discord-stack.json"
import { useLanguage } from "../../contexts/LanguageContext"

type StackTech = (typeof stackConfig.technologies)[number]

const LIGHT_ICONS = new Set([
  "https://cdn.simpleicons.org/openjdk/FFFFFF",
  "https://cdn.simpleicons.org/rust/FFFFFF",
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
  const track = [...items, ...items, ...items, ...items]

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`flex w-max gap-4 ${reverse ? "animate-scroll-tech-seamless-reverse" : "animate-scroll-tech-seamless"} will-change-transform`}
      >
        {track.map((tech, index) => (
          <TechPill key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function DiscordLanguagesStack() {
  const { t } = useLanguage()
  const technologies = stackConfig.technologies
  const midpoint = Math.ceil(technologies.length / 2)
  const topRow = technologies.slice(0, midpoint)
  const bottomRow = technologies.slice(midpoint)

  return (
    <section className="relative overflow-hidden bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 dark:bg-[#0a0b0f]">
      <motion.div className="blob-primary absolute top-20 -left-32 z-[2] h-64 w-64 rounded-full blur-3xl" />
      <motion.div className="blob-primary absolute top-40 -right-32 h-72 w-72 rounded-full blur-3xl" />

      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-gray-50 to-transparent sm:w-24 dark:from-[#0a0b0f]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-gray-50 to-transparent sm:w-24 dark:from-[#0a0b0f]"
        aria-hidden
      />

      <motion.div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-left sm:mb-12"
        >
          <motion.div className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
            <span className="icon-text-primary text-sm">{t("discord.stackBadge")}</span>
          </motion.div>

          <h2 className="orbitron-font mb-0 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
            {t("discord.supportedLanguagesTitle")}{" "}
            <span className="icon-text-primary">{t("discord.supportedLanguagesTitleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          <TechMarquee items={topRow.length ? topRow : technologies} />
          <TechMarquee items={bottomRow.length ? bottomRow : technologies} reverse />
        </div>
      </motion.div>
    </section>
  )
}
