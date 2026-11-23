"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Shield,
  Zap,
  Check,
  ChevronDown,
  ArrowRight,
  Database,
  Globe,
  RefreshCw,
  Terminal,
  Gamepad2,
  Users,
  Sparkles,
  Server,
  Layers,
  HelpCircle,
} from "lucide-react"
import gamesConfig from "../../config/sections/games.json"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useProductStock } from "../../hooks/useProductStock"
import { minecraftFaqs } from "../../lib/seo"

interface MinecraftPlan {
  id: string
  name: string
  type: string
  ram: string
  cpu: string
  storage: string
  price: number
  prices?: {
    INR?: number
    USD?: number
    EUR?: number
  }
  orderLink: string
  popular?: boolean
}

function MinecraftOrderButton({
  plan,
  orderLink,
}: {
  plan: MinecraftPlan
  orderLink: string
}) {
  const stock = useProductStock(orderLink)

  if (stock.isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className="orbitron-font flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-tl-xl rounded-br-xl border border-red-500/60 bg-red-600/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm"
      >
        Out of Stock
      </button>
    )
  }

  return (
    <a
      href={orderLink}
      className="orbitron-font button-primary text-button-primary flex w-full items-center justify-center gap-2 rounded-tl-xl rounded-br-xl px-4 py-2.5 text-xs sm:text-sm font-bold no-underline transition-all duration-300 shadow-md hover:shadow-blue-500/25 group"
    >
      <span>Deploy Server</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

export default function MinecraftPricingSection() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency()
  const [cpuType, setCpuType] = useState<"intel" | "amd">("intel")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const mcConfig = gamesConfig.games.find((g) => g.id === "minecraft")
  const intelPlans: MinecraftPlan[] = (mcConfig?.plans?.intel || []).map((p: any, idx: number) => ({
    ...p,
    popular: idx === 1 || idx === 3, // PIG (4GB) and SLIME (8GB)
  }))
  const amdPlans: MinecraftPlan[] = (mcConfig?.plans?.amd || []).map((p: any, idx: number) => ({
    ...p,
    popular: idx === 1 || idx === 3,
  }))

  const activePlans = cpuType === "intel" ? intelPlans : amdPlans

  const formatPrice = (plan: MinecraftPlan) => {
    const code = selectedCurrency.code as "INR" | "USD" | "EUR"
    if (plan.prices && plan.prices[code] !== undefined) {
      return `${selectedCurrency.symbol}${plan.prices[code]}`
    }
    return `${selectedCurrency.symbol}${plan.price}`
  }

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[300px] bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full mb-4 shadow-sm backdrop-blur-md">
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wide uppercase">
              #1 Rated Minecraft Server Hosting India
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Best Minecraft Server Hosting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
              India
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Ultra-low latency Indian servers (Mumbai &amp; Delhi) with 10–20ms ping, 1-click modpacks
            (Paper, Purpur, Forge, Fabric), Java &amp; Bedrock Geyser crossplay, and built-in WarShield
            DDoS protection. Starting from just{" "}
            <strong className="text-emerald-500 dark:text-emerald-400 font-bold">₹35/GB (₹59/mo)</strong>.
          </p>

          {/* Live Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-gray-700 dark:text-gray-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 border border-gray-200/60 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>5–20ms Low Ping (India)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 border border-gray-200/60 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free WarShield DDoS Shield</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 border border-gray-200/60 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Pterodactyl Game Panel</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-gray-900/60 border border-gray-200/60 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Java + Bedrock Crossplay</span>
            </span>
          </div>
        </div>

        {/* Filter Controls Bar: CPU Brand Switcher + Currency Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-[#0e121d]/80 border border-gray-200 dark:border-[#1f2638] p-3 sm:p-4 rounded-tl-2xl rounded-br-2xl shadow-md backdrop-blur-xl mb-10">
          {/* CPU Type Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setCpuType("intel")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                cpuType === "intel"
                  ? "button-primary text-button-primary shadow-md"
                  : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Intel Xeon (Budget ₹35/GB)</span>
            </button>
            <button
              type="button"
              onClick={() => setCpuType("amd")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-tl-xl rounded-br-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                cpuType === "amd"
                  ? "button-primary text-button-primary shadow-md"
                  : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>AMD EPYC (Performance ₹39/GB)</span>
            </button>
          </div>

          {/* Currency Selector */}
          <div className="w-full sm:w-56">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
        </div>

        {/* Minecraft Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {activePlans.map((plan, index) => {
            const isPopular = plan.popular

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`relative flex flex-col h-full rounded-tl-2xl rounded-br-2xl overflow-hidden backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 group ${
                  isPopular
                    ? "border-emerald-500/50 bg-white/90 dark:bg-[#0b0f19] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:border-emerald-500"
                    : "border-gray-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-[#0b0f19] shadow-sm hover:shadow-xl hover:shadow-black/20 hover:border-blue-500/40"
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-tl-xl rounded-br-xl text-[11px] font-bold button-primary text-button-primary shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Header: Plan Name & Subtitle */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white orbitron-font">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase tracking-wider">
                      {cpuType === "intel" ? "Intel Xeon E5 Compute" : "AMD EPYC High Frequency"}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-4 border-b border-gray-100 dark:border-white/[0.08]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white orbitron-font">
                        {formatPrice(plan)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        /month
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      Instant 60-second automatic provisioning
                    </p>
                  </div>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-2.5 rounded-tl-xl rounded-br-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                        <MemoryStick className="w-3.5 h-3.5 text-emerald-500" />
                        <span>RAM</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                        {plan.ram}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-tl-xl rounded-br-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05]">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-500" />
                        <span>CPU</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                        {plan.cpu}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-tl-xl rounded-br-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] col-span-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                        <HardDrive className="w-3.5 h-3.5 text-purple-500" />
                        <span>Storage (NVMe Gen4)</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                        {plan.storage}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6 flex-1 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Unmetered Player Slots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>1-Click Modpack &amp; Plugin Installer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Java &amp; Bedrock Crossplay Ready</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Free 1x MySQL Database</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Free Custom Subdomain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>WarShield Game DDoS Protection</span>
                    </li>
                  </ul>

                  {/* Order Button */}
                  <div className="mt-auto">
                    <MinecraftOrderButton plan={plan} orderLink={plan.orderLink} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Section 2: Interactive RAM Calculator & Guide */}
        <div className="bg-white/80 dark:bg-[#0e121d]/90 border border-gray-200 dark:border-[#1f2638] rounded-tl-3xl rounded-br-3xl p-6 sm:p-10 shadow-xl backdrop-blur-xl mb-20">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wide mb-2">
              <Layers className="w-4 h-4" />
              <span>Buyer&apos;s Recommendation Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              How Much RAM Do You Need for Minecraft?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Choosing the right plan ensures stable 20 TPS without rubber-banding or lag spikes. Use our
              official recommendation chart below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-tl-2xl rounded-br-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10">
              <div className="text-emerald-500 font-extrabold text-lg mb-1 font-mono">2 GB – 4 GB RAM</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Vanilla &amp; Friends SMP</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Best for 1–8 players running Paper, Purpur, or Vanilla with standard worlds and essential plugins.
              </p>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-tl-lg rounded-br-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Recommended: COW / PIG
              </span>
            </div>

            <div className="p-5 rounded-tl-2xl rounded-br-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10">
              <div className="text-blue-500 font-extrabold text-lg mb-1 font-mono">6 GB – 8 GB RAM</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Public Community / Plugins</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Best for 15–35 players running 20–40 plugins, Geyser Bedrock crossplay, Dynmap, and economy.
              </p>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-tl-lg rounded-br-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Recommended: SHEEP / SLIME
              </span>
            </div>

            <div className="p-5 rounded-tl-2xl rounded-br-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10">
              <div className="text-purple-500 font-extrabold text-lg mb-1 font-mono">12 GB – 16 GB RAM</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Heavy Modpacks &amp; Quests</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                Built for Forge, Fabric, All The Mods, Better MC, and RL茫Craft with 200+ mods and 15+ concurrent players.
              </p>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-tl-lg rounded-br-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Recommended: VILLAGER / CHICKEN
              </span>
            </div>

            <div className="p-5 rounded-tl-2xl rounded-br-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/10">
              <div className="text-amber-500 font-extrabold text-lg mb-1 font-mono">20 GB – 32 GB RAM</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Large Networks &amp; Hubs</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                High-concurrency BungeeCord/Velocity proxy networks, Survival + Skyblock + Bedwars hubs with 100+ players.
              </p>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-tl-lg rounded-br-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Recommended: SPIDER / BLAZE
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Feature Highlights (The 6 Pillars) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              Engineered for Pure Gaming Performance
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Every WarNodes Minecraft server is optimized for high tick rates, lightning-fast chunk loading, and total server control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                10–20ms India Latency
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Direct peering with major Indian ISPs (Jio, Airtel, ACT, Tata) via Tier-3 datacenters in Mumbai and Delhi for lag-free PvP.
              </p>
            </div>

            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                WarShield Anti-DDoS
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Multi-terabit automated scrubbing engine engineered specifically for Minecraft protocol attacks, botnets, and UDP floods.
              </p>
            </div>

            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Custom Pterodactyl Panel
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Interactive web console, live resource graphs, full web file manager, SFTP credentials, and sub-user manager built for teams.
              </p>
            </div>

            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                1-Click Modpack Installer
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Switch server software in seconds. Paper, Purpur, Spigot, Forge, Fabric, Mohist, BungeeCord, and Bedrock with one click.
              </p>
            </div>

            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Java &amp; Bedrock Crossplay
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Pre-installed GeyserMC and Floodgate lets PC, mobile (Android/iOS), and console players all play on the same Indian server.
              </p>
            </div>

            <div className="p-6 rounded-tl-2xl rounded-br-2xl bg-white dark:bg-[#0c0f18] border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Free MySQL &amp; Backups
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Every plan comes with 1 free managed MySQL database for LuckPerms/CoreProtect and scheduled automated offsite backups.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: WarNodes vs Competitors Table */}
        <div className="bg-white/80 dark:bg-[#0e121d]/90 border border-gray-200 dark:border-[#1f2638] rounded-tl-3xl rounded-br-3xl p-6 sm:p-10 shadow-xl backdrop-blur-xl mb-20">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              WarNodes vs Competitors
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
              Compare WarNodes with other Indian and international Minecraft server hosting providers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-emerald-500 font-bold bg-emerald-500/5 rounded-tl-xl">
                    WarNodes (You)
                  </th>
                  <th className="py-3 px-4">LordCloud</th>
                  <th className="py-3 px-4">Shockbyte</th>
                  <th className="py-3 px-4">Hostinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Starting Price</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5">
                    ₹59/mo (₹35/GB)
                  </td>
                  <td className="py-3.5 px-4">₹90/mo</td>
                  <td className="py-3.5 px-4">₹220+/mo ($2.50)</td>
                  <td className="py-3.5 px-4">₹550+/mo</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Indian Server Locations</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5">
                    Mumbai &amp; Delhi (5–20ms)
                  </td>
                  <td className="py-3.5 px-4">Mumbai &amp; Noida</td>
                  <td className="py-3.5 px-4 text-red-400">Singapore / US (150ms+)</td>
                  <td className="py-3.5 px-4 text-amber-400">Overseas Cloud</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Hardware Type</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5">
                    Intel Xeon &amp; AMD EPYC
                  </td>
                  <td className="py-3.5 px-4">Intel / Ryzen</td>
                  <td className="py-3.5 px-4">Generic Xeon</td>
                  <td className="py-3.5 px-4">Standard Cloud VPS</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">DDoS Protection</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5">
                    WarShield L3/L4/L7 (Free)
                  </td>
                  <td className="py-3.5 px-4">Standard Scrubbing</td>
                  <td className="py-3.5 px-4">Basic OVH</td>
                  <td className="py-3.5 px-4">Cloudflare DNS</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Instant Indian UPI / QR</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5">
                    Yes (GPay, PhonePe, Paytm)
                  </td>
                  <td className="py-3.5 px-4">Yes</td>
                  <td className="py-3.5 px-4 text-red-400">No (Forex Fee Cards)</td>
                  <td className="py-3.5 px-4">Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold">Pterodactyl Game Panel</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500 bg-emerald-500/5 rounded-bl-xl">
                    Custom WarNodes Theme
                  </td>
                  <td className="py-3.5 px-4">Pterodactyl</td>
                  <td className="py-3.5 px-4">Multicraft</td>
                  <td className="py-3.5 px-4">Game Panel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Frequently Asked Questions (Matching FAQPage Schema) */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Minecraft Server Hosting – FAQ
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
              Everything you need to know about setting up, running, and optimizing your Indian Minecraft server.
            </p>
          </div>

          <div className="space-y-3">
            {minecraftFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx

              return (
                <div
                  key={idx}
                  className="rounded-tl-2xl rounded-br-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0c0f18]/80 backdrop-blur-md overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 dark:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-300 text-gray-400 ${
                        isOpen ? "rotate-180 text-emerald-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/[0.05] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
