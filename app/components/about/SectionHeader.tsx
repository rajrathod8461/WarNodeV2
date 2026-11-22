import type { ReactNode } from 'react'

interface SectionHeaderProps {
  /** Small pill label above the heading, e.g. "Our Journey". */
  eyebrow: string
  /** Heading text. Pass a fragment to highlight part of it with <em>. */
  title: ReactNode
  /** Optional supporting paragraph below the heading. */
  description?: string
  /** Heading level — the page owns the single h1, so sections default to h2. */
  as?: 'h2' | 'h3'
  className?: string
}

/**
 * The shared section header used across the About page.
 *
 * Previously this markup was duplicated in JourneyTimeline, WhyBento and
 * InfraDiagram with drifting differences (centered vs. left, with/without a
 * description). Centralising it keeps one alignment system — left-aligned,
 * matching the hero — and one type scale.
 *
 * Server component: it renders static markup, so it stays out of the client
 * bundle. Entrance animation is handled by the parent section.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="card-primary mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary px-4 py-2">
        <span className="icon-text-primary text-sm font-medium">{eyebrow}</span>
      </p>
      <Heading className="orbitron-font text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-balance">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  )
}
