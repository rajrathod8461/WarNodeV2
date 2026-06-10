import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.dedicated)

export default function DedicatedLayout({ children }: { children: ReactNode }) {
  return children
}
