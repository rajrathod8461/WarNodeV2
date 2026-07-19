import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.policy)

export default function PolicyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="policy" />
      {children}
    </>
  )
}
