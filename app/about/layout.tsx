import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.about)

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* The page renders its own visible <h1>, so the hidden summary uses h2. */}
      <PageSeoContent pageKey="about" as="h2" />
      {children}
    </>
  )
}
