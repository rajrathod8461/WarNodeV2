import type { ReactNode } from "react"
import { buildPageMetadata, pageSeo } from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.games)

export default function GamesLayout({ children }: { children: ReactNode }) {
  return children
}
