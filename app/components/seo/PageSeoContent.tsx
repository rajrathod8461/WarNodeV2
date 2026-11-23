import Link from "next/link"
import { internalServiceLinks, pageSeo, type PageSeoKey } from "../../lib/seo"

type Props = {
  pageKey: Exclude<PageSeoKey, "home">
  /**
   * Heading level for the hidden summary. Defaults to "h1" for backwards
   * compatibility, but routes that already render their own visible <h1>
   * should pass "h2" so the document has exactly one top-level heading.
   */
  as?: "h1" | "h2"
}

export default function PageSeoContent({ pageKey, as: Heading = "h1" }: Props) {
  const page = pageSeo[pageKey]

  return (
    <section className="sr-only" aria-label={`${page.title} overview`}>
      <Heading>{page.title}</Heading>
      <p>{page.description}</p>
      {"body" in page && page.body ? <p>{page.body}</p> : null}

      <nav aria-label="Related WarNodes services">
        <ul>
          {internalServiceLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
