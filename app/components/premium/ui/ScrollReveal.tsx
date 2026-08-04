"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
  ...props
}: ScrollRevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
