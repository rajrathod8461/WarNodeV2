import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.discordBot)

export default function DiscordBotLayout({ children }: { children: ReactNode }) {
  return children
}
