"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Activity,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  LineChart,
  Target,
  Coins,
  Crown,
  Database,
  FlaskConical,
  Gavel,
  Handshake,
  Headphones,
  HeartHandshake,
  Layers,
  LayoutPanelTop,
  Megaphone,
  MessageCircle,
  Network,
  Receipt,
  Rocket,
  Scale,
  Server,
  Share2,
  Shield,
  ShieldAlert,
  Sparkles,
  Tags,
  Ticket,
  TrendingUp,
  Truck,
  UserPlus,
  Users,
  Wallet,
  Workflow,
  Code2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import teamConfig from "../config/sections/team.json"

type Responsibility = { icon: string; label: string }
type TeamMember = Omit<(typeof teamConfig.members)[number], "responsibilities"> & {
  responsibilities: Responsibility[]
}

const CARD =
  "rounded-tl-2xl rounded-br-2xl border border-gray-200/70 bg-white/90 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"

const ROLE_ICONS: Record<string, LucideIcon> = {
  crown: Crown,
  megaphone: Megaphone,
  briefcase: Briefcase,
}

const TASK_ICONS: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  layers: Layers,
  network: Network,
  shield: Shield,
  panel: LayoutPanelTop,
  database: Database,
  workflow: Workflow,
  activity: Activity,
  trending: TrendingUp,
  flask: FlaskConical,
  badge: BadgeCheck,
  ticket: Ticket,
  users: Users,
  message: MessageCircle,
  heart: HeartHandshake,
  share: Share2,
  megaphone: Megaphone,
  handshake: Handshake,
  calendar: Calendar,
  feedback: MessageSquare,
  headphones: Headphones,
  userplus: UserPlus,
  sparkles: Sparkles,
  wallet: Wallet,
  chart: LineChart,
  tags: Tags,
  building: Building2,
  target: Target,
  coins: Coins,
  receipt: Receipt,
  shieldalert: ShieldAlert,
  truck: Truck,
  gavel: Gavel,
  rocket: Rocket,
  scale: Scale,
}

const founder = teamConfig.members[0] as TeamMember
const leadership = teamConfig.members.slice(1) as TeamMember[]

function MemberAvatar({
  member,
  size = "md",
}: {
  member: TeamMember
  size?: "md" | "lg"
}) {
  const [useFallback, setUseFallback] = useState(false)
  const RoleIcon = ROLE_ICONS[member.icon] ?? Users
  const isLarge = size === "lg"

  const boxClass = isLarge
    ? "relative h-32 w-32 shrink-0 overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 border-gray-200/80 shadow-sm dark:border-white/15 sm:h-40 sm:w-40"
    : "relative mx-auto h-28 w-28 overflow-hidden rounded-tl-2xl rounded-br-2xl border-2 border-gray-200/80 shadow-sm dark:border-white/15"

  const fallbackClass = isLarge
    ? "flex h-32 w-32 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl border-2 border-gray-200/80 bg-gray-50 dark:border-white/15 dark:bg-white/5 sm:h-40 sm:w-40"
    : "mx-auto flex h-28 w-28 items-center justify-center rounded-tl-2xl rounded-br-2xl border-2 border-gray-200/80 bg-gray-50 dark:border-white/15 dark:bg-white/5"

  if (!useFallback && member.avatar) {
    return (
      <div className={boxClass}>
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover"
          sizes={isLarge ? "160px" : "112px"}
          onError={() => setUseFallback(true)}
        />
        {member.id === "raj" && (
          <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-tl-lg rounded-br-lg border border-gray-200/80 bg-white shadow-md dark:border-white/15 dark:bg-[#121318]">
            <Crown className="h-4 w-4 icon-text-primary" />
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={fallbackClass}>
      <RoleIcon
        className={`${isLarge ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10"} text-gray-400 dark:text-gray-500`}
        strokeWidth={1.5}
      />
    </div>
  )
}

function ResponsibilitiesList({
  items,
  columns = 2,
}: {
  items: Responsibility[]
  columns?: 1 | 2 | 3
}) {
  const { t } = useLanguage()
  const gridClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : ""

  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {t("team.responsibilities")}
      </h4>

      <div className="rounded-tl-xl rounded-br-xl border border-gray-100 bg-gray-50/90 p-3 dark:border-white/[0.06] dark:bg-black/20 sm:p-4">
        <ul className={`grid gap-1 ${gridClass}`}>
          {items.map((item) => {
            const Icon = TASK_ICONS[item.icon] ?? BadgeCheck
            return (
              <li
                key={item.label}
                className="group flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-white/80 dark:hover:bg-white/[0.04]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-200/70 bg-white dark:border-white/10 dark:bg-white/[0.06]">
                  <Icon
                    className="h-3.5 w-3.5 text-gray-500 transition-colors group-hover:icon-text-primary dark:text-gray-400"
                    strokeWidth={2}
                  />
                </span>
                <span className="text-[13px] leading-snug text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function FounderCard() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55 }}
      className={`relative overflow-hidden shadow-sm ${CARD}`}
    >
      <div className="flex flex-col items-center gap-8 p-8 text-center sm:flex-row sm:items-start sm:p-10 sm:text-left">
        <MemberAvatar member={founder} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl border border-gray-200/80 bg-gray-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
            <Crown className="h-3.5 w-3.5 icon-text-primary" />
            {t("team.founderBadge")}
          </p>

          <h2 className="orbitron-font text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {founder.name}
          </h2>

          <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-400">{founder.role}</p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
            {founder.bio}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 px-8 pb-8 pt-6 dark:border-white/[0.06] sm:px-10 sm:pb-10">
        <ResponsibilitiesList items={founder.responsibilities} columns={3} />
      </div>
    </motion.article>
  )
}

function LeadershipCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const RoleIcon = ROLE_ICONS[member.icon] ?? Users

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
      className={`flex h-full flex-col overflow-hidden ${CARD}`}
    >
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-5 flex justify-center">
          <div className="relative">
            <MemberAvatar member={member} />
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-tl-md rounded-br-md border border-gray-200/80 bg-white shadow-sm dark:border-white/15 dark:bg-[#121318]">
              <RoleIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
          {member.handle && (
            <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-500">@{member.handle}</p>
          )}
          <p className="mt-2 text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
            {member.role}
          </p>
        </div>

        <p className="mt-4 flex-1 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {member.bio}
        </p>
      </div>

      <div className="border-t border-gray-100 px-6 pb-6 pt-5 dark:border-white/[0.06] sm:px-7 sm:pb-7">
        <ResponsibilitiesList items={member.responsibilities} columns={1} />
      </div>
    </motion.article>
  )
}

type TeamSectionProps = {
  showHeader?: boolean
}

export default function TeamSection({ showHeader = true }: TeamSectionProps) {
  const { t } = useLanguage()

  return (
    <div className={showHeader ? "relative overflow-hidden" : ""}>
      {showHeader && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]" />
      )}

      <div
        className={`relative z-10 mx-auto max-w-6xl ${showHeader ? "px-4 pb-16 pt-28 sm:px-6 lg:px-8" : ""}`}
      >
        {showHeader && (
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center sm:mb-14"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-gray-200/70 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
              <Users className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("team.badge")}</span>
            </div>

            <h1 className="orbitron-font text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {t("team.title")}{" "}
              <span className="icon-text-primary">{t("team.titleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
              {t("team.subtitle")}
            </p>
          </motion.header>
        )}

        <div className="flex flex-col gap-8">
          <FounderCard />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {leadership.map((member, index) => (
              <LeadershipCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
