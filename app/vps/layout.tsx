import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.vps)

export default function VpsLayout({ children }: { children: ReactNode }) {
  return children
}
