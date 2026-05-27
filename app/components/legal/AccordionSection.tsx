"use client"

import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, type LucideIcon } from "lucide-react"

export function AccordionSection({
  id,
  title,
  icon: Icon,
  summary,
  open,
  onToggle,
  children,
  delay = 0,
}: {
  id?: string
  title: string
  icon?: LucideIcon
  summary?: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="scroll-mt-28 overflow-hidden rounded-tl-2xl rounded-br-2xl border border-secondary bg-white/80 backdrop-blur-xl dark:bg-gray-950/30"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-start gap-3 p-5 text-left transition-colors sm:p-6 ${
          open ? "border-b border-secondary/60" : "hover:bg-gray-50/80 dark:hover:bg-white/5"
        }`}
      >
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-secondary card-primary">
            <Icon className="h-4 w-4 icon-text-primary" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="orbitron-font flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
            {title}
          </span>
          {summary && (
            <span className="mt-1.5 block text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
              {summary}
            </span>
          )}
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 icon-text-primary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-4 sm:p-6 sm:pt-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
