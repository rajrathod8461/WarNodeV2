import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.dedicated)

export default function DedicatedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="dedicated" />
      {children}
    </>
  )
}
