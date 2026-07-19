import Link from "next/link"
import { homeFaqs, internalServiceLinks } from "../../lib/seo"
import { siteMetadata } from "../../lib/site-metadata"

const DISCORD_URL = "https://dcd.gg/warnode"

export default function HomeSeoContent() {
  return (
    <section className="sr-only" aria-label="WarNodes hosting overview">
      <h1>{siteMetadata.title}</h1>

      <p>
        WarNodes delivers India&apos;s smoothest hosting experience for developers, businesses and
        gamers. Our infrastructure runs on Gen4 NVMe storage, high-frequency AMD EPYC and Intel Xeon
        CPUs, and enterprise-grade WarShield DDoS protection across Mumbai, Hyderabad, Delhi and
        Singapore.
      </p>

      <h2>Hosting services</h2>
      <p>
        Choose VPS hosting with full root access, fast web hosting on LiteSpeed, game server hosting
        for Minecraft and Hytale, always-on Discord bot hosting, and standalone WarShield proxy
        protection for critical workloads.
      </p>

      <nav aria-label="WarNodes services">
        <ul>
          {internalServiceLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/team">Our Team</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/refund">Refund Policy</Link>
          </li>
        </ul>
      </nav>

      <h2>Why choose WarNodes</h2>
      <p>
        Every plan includes instant setup, 99.9% uptime targets, and expert support. Minecraft and
        game servers deploy on the WarNodes panel with modpack support, plugin installers, and live
        console access. VPS customers get unmetered bandwidth options, multiple operating systems, and
        low-latency routes across India. Web hosting plans include free SSL, daily backups, and
        one-click app installs.
      </p>

      <h2>Frequently asked questions</h2>
      {homeFaqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}

      <h2>Support and community</h2>
      <p>
        Need help choosing a plan or migrating an existing server? Visit our contact page or join the
        WarNodes community on{" "}
        <a href={DISCORD_URL} rel="noopener noreferrer">
          Discord
        </a>{" "}
        for sales questions, technical support, and product updates.
      </p>
    </section>
  )
}
