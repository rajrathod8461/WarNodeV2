import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.refund)

export default function RefundLayout({ children }: { children: ReactNode }) {
  return children
}
