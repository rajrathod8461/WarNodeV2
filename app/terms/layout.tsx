import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.terms)

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children
}
