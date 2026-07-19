import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.discordBot)

export default function DiscordBotLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="discordBot" />
      {children}
    </>
  )
}
