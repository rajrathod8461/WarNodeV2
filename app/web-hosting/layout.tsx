import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.webHosting)

export default function WebHostingLayout({ children }: { children: ReactNode }) {
  return children
}
