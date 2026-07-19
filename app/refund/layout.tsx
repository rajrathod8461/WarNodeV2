import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.refund)

export default function RefundLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="refund" />
      {children}
    </>
  )
}
