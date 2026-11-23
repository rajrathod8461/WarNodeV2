import type { ReactNode } from "react"
import PageSeoContent from "../components/seo/PageSeoContent"
import {
  buildPageMetadata,
  pageSeo,
  buildMinecraftProductSchema,
  buildMinecraftFaqSchema,
  buildMinecraftBreadcrumbSchema,
  buildMinecraftLocalBusinessSchema,
} from "../lib/seo"

export const metadata = buildPageMetadata(pageSeo.minecraft)

export default function MinecraftHostingLayout({ children }: { children: ReactNode }) {
  const schemas = [
    buildMinecraftProductSchema(),
    buildMinecraftFaqSchema(),
    buildMinecraftBreadcrumbSchema(),
    buildMinecraftLocalBusinessSchema(),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PageSeoContent pageKey="minecraft" as="h2" />
      {children}
    </>
  )
}
