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

const GREY_CARD_SURFACE =
  "[background:radial-gradient(50%_50%_at_50%_100%,rgba(156,163,175,0.22)_0%,transparent_68%),linear-gradient(180deg,rgba(249,250,251,0.96),rgba(241,245,249,0.9))] dark:[background:radial-gradient(50%_50%_at_50%_100%,rgba(255,255,255,0.07)_0%,transparent_68%),linear-gradient(180deg,rgba(17,18,22,0.96),rgba(10,11,15,0.98))]"

const GREY_ROW_SURFACE =
  "[background:radial-gradient(50%_50%_at_50%_100%,rgba(156,163,175,0.14)_0%,transparent_75%),linear-gradient(180deg,rgba(243,244,246,0.85),rgba(249,250,251,0.75))] dark:[background:radial-gradient(50%_50%_at_50%_100%,rgba(255,255,255,0.04)_0%,transparent_75%),linear-gradient(180deg,rgba(14,15,19,0.9),rgba(10,11,15,0.82))]"

const TEAM_CARD = `group relative overflow-hidden rounded-tl-2xl rounded-br-2xl border border-gray-200/60 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-secondary/30 hover:shadow-md dark:border-white/[0.08] ${GREY_CARD_SURFACE}`

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
    ? "relative h-32 w-32 shrink-0 overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-lg ring-2 ring-secondary/15 transition-all duration-300 group-hover:shadow-xl group-hover:ring-secondary/50 sm:h-40 sm:w-40"
    : "relative mx-auto h-28 w-28 overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-md ring-2 ring-secondary/15 transition-all duration-300 group-hover:shadow-lg group-hover:ring-secondary/50"

  const fallbackClass = isLarge
    ? "flex h-32 w-32 shrink-0 items-center justify-center rounded-tl-2xl rounded-br-2xl bg-secondary/10 shadow-md ring-2 ring-secondary/15 transition-all duration-300 group-hover:ring-secondary/50 sm:h-40 sm:w-40"
    : "mx-auto flex h-28 w-28 items-center justify-center rounded-tl-2xl rounded-br-2xl bg-secondary/10 shadow-md ring-2 ring-secondary/15 transition-all duration-300 group-hover:ring-secondary/50"

  const badgeClass = isLarge
    ? "absolute -bottom-2 -right-2 z-10 flex h-9 w-9 items-center justify-center rounded-tl-lg rounded-br-lg button-primary shadow-lg"
    : "absolute -bottom-1.5 -right-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-tl-md rounded-br-md button-primary shadow-md"

  const badgeIconClass = isLarge ? "h-4 w-4" : "h-3.5 w-3.5"

  const avatarInner = !useFallback && member.avatar ? (
    <div className={boxClass}>
      <Image
        src={member.avatar}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={isLarge ? "160px" : "112px"}
        onError={() => setUseFallback(true)}
      />
    </div>
  ) : (
    <div className={fallbackClass}>
      <RoleIcon
        className={`${isLarge ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10"} icon-primary transition-colors duration-300 group-hover:icon-text-primary`}
        strokeWidth={1.5}
      />
    </div>
  )

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative shrink-0"
    >
      {avatarInner}
      <span className={badgeClass}>
        <RoleIcon className={`${badgeIconClass} text-white`} strokeWidth={2} />
      </span>
    </motion.div>
  )
}

function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300/60 to-transparent dark:via-white/10" />
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
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {t("team.responsibilities")}
      </h4>

      <ul className={`grid gap-1 ${gridClass}`}>
        {items.map((item, index) => {
          const Icon = TASK_ICONS[item.icon] ?? BadgeCheck
          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: index * 0.025 }}
              className={`group/item flex items-center gap-3 rounded-tl-lg rounded-br-lg border border-transparent px-2 py-2.5 transition-all duration-300 hover:border-secondary hover:hover-gradient ${GREY_ROW_SURFACE}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-tl-md rounded-br-md bg-secondary/10 transition-colors duration-300 group-hover/item:bg-secondary/20">
                <Icon
                  className="h-4 w-4 icon-primary transition-colors duration-300 group-hover/item:icon-text-primary"
                  strokeWidth={2}
                />
              </span>
              <span className="text-[13px] leading-snug text-gray-700 transition-colors duration-300 group-hover/item:icon-text-primary dark:text-gray-300">
                {item.label}
              </span>
            </motion.li>
          )
        })}
      </ul>
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
      className={TEAM_CARD}
    >
      <div className="flex flex-col items-center gap-8 p-8 text-center sm:flex-row sm:items-start sm:p-10 sm:text-left">
        <MemberAvatar member={founder} size="lg" />

        <div className="min-w-0 flex-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-tl-xl rounded-br-xl button-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-button-primary shadow-sm">
            <Crown className="h-3.5 w-3.5" />
            {t("team.founderBadge")}
          </p>

          <h2 className="orbitron-font text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-icon-text-primary dark:text-white sm:text-4xl">
            {founder.name}
          </h2>

          <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-400">{founder.role}</p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
            {founder.bio}
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 pt-2 sm:px-10 sm:pb-10">
        <SectionDivider />
        <div className="pt-6">
          <ResponsibilitiesList items={founder.responsibilities} columns={3} />
        </div>
      </div>
    </motion.article>
  )
}

function LeadershipCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
      className={`flex h-full flex-col ${TEAM_CARD}`}
    >
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-5 flex justify-center">
          <MemberAvatar member={member} />
        </div>

        <div className="text-center">
          <h3 className="orbitron-font text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-icon-text-primary dark:text-white">
            {member.name}
          </h3>
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

      <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7">
        <SectionDivider />
        <div className="pt-5">
          <ResponsibilitiesList items={member.responsibilities} columns={1} />
        </div>
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
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]" />
          <div className="absolute top-20 -left-32 z-[1] h-64 w-64 rounded-full blob-primary blur-3xl" />
          <div className="absolute bottom-20 -right-32 z-[1] h-72 w-72 rounded-full blob-secondary blur-3xl" />
        </>
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
            <div className={`mb-5 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-gray-200/60 px-4 py-2 transition-all duration-300 hover:border-secondary/30 dark:border-white/[0.08] ${GREY_ROW_SURFACE}`}>
              <Users className="h-4 w-4 icon-text-primary" />
              <span className="text-sm font-medium icon-text-primary">{t("team.badge")}</span>
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
