"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { ScrollReveal } from "../ui/ScrollReveal"
import { MagneticButton } from "../ui/MagneticButton"
import { Shield, Server, Skull } from "lucide-react"

type Particle = {
  x: number
  y: number
  vx: number
  life: number
  maxLife: number
  kind: "malicious" | "clean"
  filtered: boolean
}

export default function WarShieldViz({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const particles: Particle[] = []

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const spawn = () => {
      const malicious = Math.random() > 0.35
      particles.push({
        x: -10,
        y: h * (0.25 + Math.random() * 0.5),
        vx: 1.2 + Math.random() * 1.8,
        life: 0,
        maxLife: 180 + Math.random() * 80,
        kind: malicious ? "malicious" : "clean",
        filtered: false,
      })
    }

    let spawnTimer = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      const shieldX = w * 0.48
      const serverX = w * 0.82
      const midY = h * 0.5

      // lanes
      ctx.strokeStyle = "rgba(255,255,255,0.04)"
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.moveTo(0, midY)
      ctx.lineTo(w, midY)
      ctx.stroke()
      ctx.setLineDash([])

      // shield arc
      const grd = ctx.createRadialGradient(shieldX, midY, 10, shieldX, midY, 90)
      grd.addColorStop(0, "rgba(19,127,236,0.35)")
      grd.addColorStop(1, "rgba(19,127,236,0)")
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(shieldX, midY, 90, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "rgba(34,211,238,0.55)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(shieldX, midY, 52, -Math.PI / 2.2, Math.PI / 2.2)
      ctx.stroke()

      spawnTimer++
      if (spawnTimer % 8 === 0) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx

        if (!p.filtered && p.kind === "malicious" && p.x >= shieldX - 20) {
          p.filtered = true
          p.vx *= -0.35
          p.y += (Math.random() - 0.5) * 40
        }

        if (p.kind === "clean" && p.x > shieldX) {
          p.vx = Math.max(p.vx, 2.2)
        }

        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.kind === "malicious" ? 3.2 : 2.4, 0, Math.PI * 2)
        ctx.fillStyle =
          p.kind === "malicious"
            ? `rgba(248,113,113,${alpha * 0.9})`
            : `rgba(52,211,153,${alpha * 0.9})`
        ctx.fill()

        if (p.x > w + 20 || p.x < -40 || p.life > p.maxLife) {
          particles.splice(i, 1)
        }
      }

      // server glow
      const sg = ctx.createRadialGradient(serverX, midY, 4, serverX, midY, 40)
      sg.addColorStop(0, "rgba(52,211,153,0.5)")
      sg.addColorStop(1, "rgba(52,211,153,0)")
      ctx.fillStyle = sg
      ctx.beginPath()
      ctx.arc(serverX, midY, 40, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [reduced])

  return (
    <section className={cn("relative overflow-hidden py-24 md:py-32", className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(19,127,236,0.12),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              WarShield
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Malicious traffic in.
              <br />
              <span className="bg-gradient-to-r from-[#137fec] to-cyan-300 bg-clip-text text-transparent">
                Clean packets out.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
              WarShield filters volumetric and application-layer attacks in real time —
              so your game servers and apps stay online when it matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="/ddos" variant="primary">
                Explore WarShield
              </MagneticButton>
              <MagneticButton href="https://portal.warnode.cloud" variant="secondary" external>
                Deploy protection
              </MagneticButton>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: Skull, label: "Threats", value: "Blocked" },
                { icon: Shield, label: "WarShield", value: "Active" },
                { icon: Server, label: "Origin", value: "Protected" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-sm"
                >
                  <item.icon className="mb-2 h-4 w-4 text-[#137fec]" />
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{item.label}</p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#070b14]/80 p-4 shadow-[0_40px_100px_-40px_rgba(19,127,236,0.5)] backdrop-blur-xl sm:p-6">
              <div className="mb-4 flex items-center justify-between text-xs text-white/40">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live mitigation
                </span>
                <span>Tbps+ capacity</span>
              </div>
              <div className="relative aspect-[16/10] w-full">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[8%] text-[10px] font-medium uppercase tracking-wider sm:text-xs">
                  <span className="rounded-full border border-red-400/30 bg-red-500/10 px-2.5 py-1 text-red-300">
                    Attack
                  </span>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
                    WarShield
                  </span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
                    Server
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-white/45">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" /> Malicious
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Clean
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
