"use client"

import { ChevronDown, LayoutGrid } from "lucide-react"
import navigationConfig from "../config/sections/navigation.json"
import type { NavigationConfig } from "../types/navigation"
import { useLanguage } from "../contexts/LanguageContext"

const config = navigationConfig as NavigationConfig

interface PanelsSelectorProps {
  className?: string
  variant?: "compact" | "full"
}

export default function PanelsSelector({
  className = "",
  variant = "compact",
}: PanelsSelectorProps) {
  const { t } = useLanguage()

  if (!config.panels?.length) return null

  const panelItemClass =
    "block rounded-lg border border-primary p-3 transition-colors hover:border-secondary hover:hover-gradient"

  if (variant === "full") {
    return (
      <div className={`space-y-2 ${className}`}>
        {config.panels.map((panel) => (
          <a
            key={panel.href}
            href={panel.href}
            target="_blank"
            rel="noopener noreferrer"
            className={panelItemClass}
          >
            <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{panel.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{panel.host}</p>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`relative group/panels ${className}`}>
      <button
        type="button"
        className="relative flex items-center space-x-2 px-4 py-6 text-sm font-medium text-gray-700 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-button-bg after:transition-transform after:duration-300 after:content-[''] hover:text-icon-text-primary group-hover/panels:text-icon-text-primary group-hover/panels:after:scale-x-100 hover:hover-gradient group-hover/panels:hover-gradient dark:text-slate-200 dark:hover:text-icon-text-primary dark:group-hover/panels:text-icon-text-primary"
        aria-haspopup="listbox"
      >
        <LayoutGrid className="h-4 w-4" />
        <span>{t("navbar.panels")}</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover/panels:rotate-180" />
      </button>

      <div
        className="pointer-events-none absolute top-full left-0 z-[70] -mt-[2px] w-[280px] rounded-b-xl border-t-2 border-top-nav bg-white p-4 opacity-0 shadow-lg transition-opacity duration-200 group-hover/panels:pointer-events-auto group-hover/panels:opacity-100 dark:bg-black/90"
        role="listbox"
      >
        <div className="space-y-2">
          {config.panels.map((panel) => (
            <a
              key={panel.href}
              href={panel.href}
              target="_blank"
              rel="noopener noreferrer"
              role="option"
              className={panelItemClass}
            >
              <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{panel.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{panel.host}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
