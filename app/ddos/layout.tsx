import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.warShield)

export default function WarShieldLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="warShield" />
      {children}
    </>
  )
}
