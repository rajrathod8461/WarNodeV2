import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.team)

export default function TeamLayout({ children }: { children: ReactNode }) {
  return children
}
