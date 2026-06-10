import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.warShield)

export default function WarShieldLayout({ children }: { children: ReactNode }) {
  return children
}
