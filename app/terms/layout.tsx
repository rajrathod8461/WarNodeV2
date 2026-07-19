import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.terms)

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="terms" />
      {children}
    </>
  )
}
