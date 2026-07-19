import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.team)

export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="team" />
      {children}
    </>
  )
}
