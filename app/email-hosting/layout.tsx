import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.emailHosting)

export default function EmailHostingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="emailHosting" />
      {children}
    </>
  )
}
