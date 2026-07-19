import Link from "next/link"
import { internalServiceLinks, pageSeo, type PageSeoKey } from "../../lib/seo"

type Props = {
  pageKey: Exclude<PageSeoKey, "home" | "minecraft">
}

export default function PageSeoContent({ pageKey }: Props) {
  const page = pageSeo[pageKey]

  return (
    <section className="sr-only" aria-label={`${page.title} overview`}>
      <h1>{page.title}</h1>
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
