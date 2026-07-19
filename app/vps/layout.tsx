import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.vps)

export default function VpsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="vps" />
      {children}
    </>
  )
}
