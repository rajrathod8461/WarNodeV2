"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type CinematicBackgroundProps = {
  className?: string
  intensity?: "subtle" | "hero"
}

export default function CinematicBackground({
  className,
  intensity = "subtle",
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let width = 0
    let height = 0

    const particles = Array.from({ length: intensity === "hero" ? 48 : 24 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.0004 + 0.0001,
      opacity: Math.random() * 0.5 + 0.15,
    }))

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.y -= particle.speed
        if (particle.y < -0.05) particle.y = 1.05

        ctx.beginPath()
        ctx.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${particle.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [intensity])

  return (
    <div className={cn("premium-bg pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="premium-aurora absolute inset-0" />
      <div className="premium-grid absolute inset-0 opacity-40" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      <div className="premium-noise absolute inset-0 opacity-[0.035]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060a]/20 to-[#05060a]" />
    </div>
  )
}
