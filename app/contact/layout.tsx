import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.contact)

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSeoContent pageKey="contact" />
      {children}
    </>
  )
}
