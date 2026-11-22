import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.databaseHosting)

export default function DatabaseHostingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="databaseHosting" />
      {children}
    </>
  )
}
