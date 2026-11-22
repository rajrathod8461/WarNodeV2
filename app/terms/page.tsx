"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  ShieldCheck,
  Zap,
  Search,
  Printer,
  ChevronDown,
  MessageCircle,
  AlertTriangle,
  Scale,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  LifeBuoy,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AccordionSection } from "../components/legal/AccordionSection"
import { LegalSectionRenderer } from "../components/legal/LegalSectionRenderer"
import legalData from "../config/sections/legal.json"
import warnodesConfig from "../config/sections/warnodes.json"
import type { LegalPoliciesConfig, PolicyPart, PolicySection } from "../types/legal"

const legal = legalData as unknown as LegalPoliciesConfig

type PolicyTabKey = "tos" | "aup" | "sla"

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<PolicyTabKey>("tos")
  const [openSectionId, setOpenSectionId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle URL hash navigation (#tos, #aup, #sla)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "")
      if (hash === "aup") {
        setActiveTab("aup")
      } else if (hash === "sla") {
        setActiveTab("sla")
      } else if (hash === "tos") {
        setActiveTab("tos")
      }
    }

    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  // Active Policy Part data
  const currentPolicy: PolicyPart = useMemo(() => {
    switch (activeTab) {
      case "aup":
        return legal.acceptableUsePolicy
      case "sla":
        return legal.serviceLevelAgreement
      case "tos":
      default:
        return legal.termsOfService
    }
  }, [activeTab])

  // Reset open section when switching tabs
  useEffect(() => {
    if (currentPolicy.sections.length > 0) {
      setOpenSectionId(currentPolicy.sections[0].id)
    }
  }, [activeTab, currentPolicy])

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentPolicy.sections
    const q = searchQuery.toLowerCase()
    return currentPolicy.sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.content.some((c) => c.toLowerCase().includes(q))
    )
  }, [currentPolicy, searchQuery])

  const toggleSection = (id: string) => {
    setOpenSectionId((curr) => (curr === id ? null : id))
  }

  const expandAll = () => {
    setOpenSectionId("ALL")
  }

  const collapseAll = () => {
    setOpenSectionId(null)
  }

  const handleDownloadPdf = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />

      <div className="relative overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20"
            style={{ backgroundImage: "url('/banners/vps.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-tl-2xl rounded-br-2xl border border-secondary card-primary px-4 py-2">
              <Scale className="h-4 w-4 icon-text-primary" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider icon-text-primary">
                WarNodes Legal Policies · Version {legal.version}
              </span>
            </div>

            <h1 className="orbitron-font mb-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
              {currentPolicy.title}
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {currentPolicy.intro}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Last Updated: {legal.lastUpdated}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Jurisdiction: {legal.address}
              </span>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </motion.header>

          {/* 3 Main Policy Navigation Tabs */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-1.5 rounded-2xl border-2 border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-lg backdrop-blur-xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("tos")
                  window.location.hash = "tos"
                }}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  activeTab === "tos"
                    ? "border-blue-500/80 bg-blue-600 text-white shadow-sm"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/5"
                }`}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span>Terms of Service</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "tos" ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>
                  26 Sec
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("aup")
                  window.location.hash = "aup"
                }}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  activeTab === "aup"
                    ? "border-blue-500/80 bg-blue-600 text-white shadow-sm"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/5"
                }`}
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Acceptable Use (AUP)</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "aup" ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>
                  Security
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("sla")
                  window.location.hash = "sla"
                }}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  activeTab === "sla"
                    ? "border-blue-500/80 bg-blue-600 text-white shadow-sm"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/5"
                }`}
              >
                <Zap className="h-4 w-4 shrink-0" />
                <span>SLA Guarantee</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activeTab === "sla" ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>
                  99.9%
                </span>
              </button>
            </div>
          </div>

          {/* Search bar & Expand / Collapse controls */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search in ${currentPolicy.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-secondary bg-white/90 dark:bg-[#0c0e17] text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-mono">
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg border border-secondary bg-white/70 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg border border-secondary bg-white/70 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-3.5">
            {filteredSections.map((section, idx) => {
              const isOpen = openSectionId === section.id || openSectionId === "ALL"

              return (
                <AccordionSection
                  key={section.id}
                  id={section.id}
                  title={`${section.num}. ${section.title}`}
                  open={isOpen}
                  onToggle={() => toggleSection(section.id)}
                  delay={idx < 5 ? idx * 0.03 : 0}
                >
                  <LegalSectionRenderer section={section} searchQuery={searchQuery} />
                </AccordionSection>
              )
            })}

            {filteredSections.length === 0 && (
              <div className="p-8 text-center rounded-2xl border border-secondary bg-white/50 dark:bg-white/5">
                <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  No matching clauses found for "{searchQuery}"
                </p>
                <p className="text-xs text-gray-500 mt-1">Try another search keyword or clear the filter.</p>
              </div>
            )}
          </div>

          {/* Bottom Direct Support Links */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border-2 border-secondary bg-white/90 dark:bg-[#0c0e17] shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">
                  <LifeBuoy className="h-4 w-4" />
                  <span>Legal & Compliance Support</span>
                </div>
                <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
                  Have questions about our agreements or terms?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
                  Our engineering and support teams are available 24/7. Formal legal notices and inquiries can be submitted via client ticket or email.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={warnodesConfig.links.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm button-primary text-button-primary shadow-sm hover:shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Open Ticket</span>
                </a>
                <a
                  href={warnodesConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-secondary bg-white dark:bg-white/5 text-gray-800 dark:text-white shadow-sm hover:shadow-md hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Discord Community</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
