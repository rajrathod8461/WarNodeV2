"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Search,
  MessageCircle,
  AlertTriangle,
  CreditCard,
  ExternalLink,
  ChevronRight,
  LifeBuoy,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { AccordionSection } from "../components/legal/AccordionSection"
import { LegalSectionRenderer } from "../components/legal/LegalSectionRenderer"
import legalData from "../config/sections/legal.json"
import warnodesConfig from "../config/sections/warnodes.json"
import type { LegalPoliciesConfig, PolicyPart } from "../types/legal"

const legal = legalData as unknown as LegalPoliciesConfig
const refundPolicy: PolicyPart = legal.refundPolicy

export default function RefundPolicyPage() {
  const [openSectionId, setOpenSectionId] = useState<string | null>("refund-2")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return refundPolicy.sections
    const q = searchQuery.toLowerCase()
    return refundPolicy.sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(q) ||
        sec.content.some((c) => c.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const toggleSection = (id: string) => {
    setOpenSectionId((curr) => (curr === id ? null : id))
  }

  const expandAll = () => setOpenSectionId("ALL")
  const collapseAll = () => setOpenSectionId(null)
  const handlePrint = () => window.print()

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
              <ShieldCheck className="h-4 w-4 icon-text-primary" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider icon-text-primary">
                {refundPolicy.badge} · Part D
              </span>
            </div>

            <h1 className="orbitron-font mb-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
              {refundPolicy.title}
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {refundPolicy.intro}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Last Updated: {legal.lastUpdated}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Entity: {legal.entity}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Policy</span>
              </button>
            </div>
          </motion.header>

          {/* 24-Hour Guarantee Highlight Card */}
          <div className="mb-10 overflow-hidden rounded-2xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/[0.07] via-white/80 to-blue-500/[0.03] dark:from-blue-600/10 dark:via-[#0c0e17] dark:to-blue-900/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase mb-3">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Risk-Free Guarantee</span>
                </div>
                <h2 className="orbitron-font text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  24-Hour Money-Back Guarantee
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  If you are not satisfied with a new, first-time purchase of a paid hosting service, you can request a full refund within 24 hours of activation — no stress, no hidden penalties.
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>Applies to first-time product orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>Includes 100% of GST & service fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>Clock stops the moment you ticket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    <span>Paid to original method within 7 days</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-3">
                <a
                  href={warnodesConfig.links.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm button-primary text-button-primary shadow-sm hover:shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Request a Refund</span>
                </a>
                <span className="text-center text-[11px] font-mono text-gray-400">
                  Ticket via registered billing email
                </span>
              </div>
            </div>
          </div>

          {/* Refund Process 3-Step Timeline */}
          <div className="mb-10">
            <h3 className="orbitron-font text-lg font-bold text-gray-900 dark:text-white mb-4">
              How the Refund Process Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 font-mono font-bold text-sm">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Submit Ticket</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Open a ticket at portal.warnode.cloud within 24 hours of your service activation. State your invoice or service ID.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 font-mono font-bold text-sm">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Staff Review</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our billing team verifies eligibility within 2 business days. If approved, service is safely de-provisioned.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 font-mono font-bold text-sm">
                    3
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">Payout Initiated</h4>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Refund is returned to your original payment method (UPI / Card / NetBanking) within 7 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Search bar & Controls */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search refund clauses & services..."
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

          {/* All 13 Sections List */}
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
                  No matching refund clauses found for "{searchQuery}"
                </p>
                <p className="text-xs text-gray-500 mt-1">Try another search keyword or clear the filter.</p>
              </div>
            )}
          </div>

          {/* Contact Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border-2 border-secondary bg-white/90 dark:bg-[#0c0e17] shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">
                  <LifeBuoy className="h-4 w-4" />
                  <span>Billing & Payout Desk</span>
                </div>
                <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
                  Need help with an invoice or refund?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
                  Contact our billing team directly at <a href={`mailto:${legal.contacts.billing}`} className="text-blue-500 underline">{legal.contacts.billing}</a> or create a ticket in your client dashboard.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={warnodesConfig.links.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm button-primary text-button-primary shadow-sm hover:shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Create Billing Ticket</span>
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
