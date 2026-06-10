import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.policy)

export default function PolicyLayout({ children }: { children: ReactNode }) {
  return children
}
