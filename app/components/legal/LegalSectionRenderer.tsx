"use client"

import React from "react"
import { Check, X, AlertCircle, ExternalLink, Mail, ShieldAlert } from "lucide-react"
import type { PolicySection } from "@/app/types/legal"

interface LegalSectionRendererProps {
  section: PolicySection
  searchQuery?: string
}

export function LegalSectionRenderer({ section, searchQuery = "" }: LegalSectionRendererProps) {
  // Helper to format text with links, emails, and bolded clause numbers
  const renderFormattedParagraph = (text: string, idx: number) => {
    // Match clause numbering like '1.1 ', '10.8 ', '2.12 ' at start
    const clauseMatch = text.match(/^(\d+\.\d+)\s+(.*)$/)

    if (clauseMatch) {
      const clauseNum = clauseMatch[1]
      const clauseBody = clauseMatch[2]

      // Highlight sub-title if present e.g. "Accurate details. You must give..."
      const subTitleMatch = clauseBody.match(/^([A-Z][A-Za-z0-9\s,\-–/()]+?\.)\s+(.*)$/)

      if (subTitleMatch && subTitleMatch[1].length < 45) {
        return (
          <div key={idx} className="flex items-start gap-2.5 py-1.5 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            <span className="shrink-0 font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-2 py-0.5 rounded border border-blue-500/20">
              {clauseNum}
            </span>
            <div className="flex-1">
              <span className="font-bold text-gray-900 dark:text-white mr-1.5">
                {subTitleMatch[1]}
              </span>
              <span>{renderTextWithLinks(subTitleMatch[2])}</span>
            </div>
          </div>
        )
      }

      return (
        <div key={idx} className="flex items-start gap-2.5 py-1.5 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          <span className="shrink-0 font-mono text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-2 py-0.5 rounded border border-blue-500/20">
            {clauseNum}
          </span>
          <div className="flex-1">
            {renderTextWithLinks(clauseBody)}
          </div>
        </div>
      )
    }

    // Standard paragraph or bullet
    return (
      <p key={idx} className="py-1.5 text-sm sm:text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
        {renderTextWithLinks(text)}
      </p>
    )
  }

  // Convert emails and URLs into clickable links
  const renderTextWithLinks = (content: string) => {
    // Regex for emails and common warnode URLs
    const parts = content.split(/([a-zA-Z0-9._%+-]+@warnode\.[a-z]+|https?:\/\/[^\s)]+|portal\.warnode\.cloud|status\.warnode\.cloud|warnode\.cloud|dcd\.gg\/warnode)/g)

    return parts.map((part, i) => {
      if (part.includes("@warnode.")) {
        return (
          <a
            key={i}
            href={`mailto:${part}`}
            className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:underline mx-0.5"
          >
            <Mail className="h-3 w-3 inline shrink-0" />
            <span>{part}</span>
          </a>
        )
      }
      if (part.startsWith("http://") || part.startsWith("https://")) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:underline mx-0.5"
          >
            <span>{part}</span>
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        )
      }
      if (["portal.warnode.cloud", "status.warnode.cloud", "warnode.cloud", "dcd.gg/warnode"].includes(part)) {
        const href = part === "dcd.gg/warnode" ? "https://dcd.gg/warnode" : `https://${part}`
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:underline mx-0.5"
          >
            <span>{part}</span>
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        )
      }
      return part
    })
  }

  return (
    <div className="space-y-2">
      {/* Paragraphs and clauses */}
      <div className="space-y-1">
        {section.content.map((p, idx) => renderFormattedParagraph(p, idx))}
      </div>

      {/* Render Structured Table if section has one */}
      {section.table && (
        <div className="mt-4 overflow-hidden rounded-xl border border-secondary shadow-md bg-white dark:bg-black/30">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-secondary bg-gray-50 dark:bg-white/[0.04]">
                <tr>
                  {section.table.headers.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-4 py-3 font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/40">
                {section.table.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="transition-colors hover:bg-blue-500/5 dark:hover:bg-white/[0.02]"
                  >
                    {row.map((cell, cIdx) => {
                      const isYes = cell.toLowerCase().startsWith("yes")
                      const isNo = cell.toLowerCase().startsWith("no")
                      const isFree = cell.toLowerCase().includes("not applicable")

                      return (
                        <td
                          key={cIdx}
                          className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200"
                        >
                          {cIdx === 1 && (isYes || isNo || isFree) ? (
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                                isYes
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                                  : isNo
                                  ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30"
                                  : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border-gray-300 dark:border-white/10"
                              }`}
                            >
                              {isYes && <Check className="h-3 w-3" />}
                              {isNo && <X className="h-3 w-3" />}
                              {cell}
                            </span>
                          ) : (
                            renderTextWithLinks(cell)
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
