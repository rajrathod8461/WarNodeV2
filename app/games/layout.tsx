import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.games)

export default function GamesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="games" />
      {children}
    </>
  )
}
