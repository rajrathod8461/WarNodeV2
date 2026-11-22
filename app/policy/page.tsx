"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Scale,
  Printer,
  Search,
  MessageCircle,
  AlertTriangle,
  Mail,
  UserCheck,
  FileCheck2,
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
const privacyPolicy: PolicyPart = legal.privacyPolicy

export default function PrivacyPage() {
  const [openSectionId, setOpenSectionId] = useState<string | null>("privacy-1")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return privacyPolicy.sections
    const q = searchQuery.toLowerCase()
    return privacyPolicy.sections.filter(
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
                {privacyPolicy.badge} · Part E
              </span>
            </div>

            <h1 className="orbitron-font mb-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
              {privacyPolicy.title}
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {privacyPolicy.intro}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Last Updated: {legal.lastUpdated}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-secondary">
                Data Fiduciary: {legal.entity}
              </span>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </motion.header>

          {/* 3 Privacy Pillars Cards */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl border-2 border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-lg backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4">
                <EyeOff className="h-5 w-5" />
              </div>
              <h3 className="orbitron-font text-base font-bold text-gray-900 dark:text-white mb-1.5">
                Zero Ad Monetization
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We never sell, rent, or trade your personal data. We do not run third-party advertising or tracker pixels.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-lg backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="orbitron-font text-base font-bold text-gray-900 dark:text-white mb-1.5">
                DPDP Act 2023 Compliant
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Full statutory rights for Data Principals in India, including Right to Access, Correction, Erasure, and Redressal.
              </p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-secondary bg-white/80 dark:bg-[#0c0e17] shadow-lg backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="orbitron-font text-base font-bold text-gray-900 dark:text-white mb-1.5">
                Encryption & CERT-In Safety
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Strict TLS encryption in transit, isolated container volumes, and standard 180-day log compliance with CERT-In directives.
              </p>
            </div>
          </div>

          {/* Grievance Officer Box */}
          <div className="mb-10 p-6 sm:p-7 rounded-2xl border-2 border-blue-500/40 bg-blue-500/5 dark:bg-[#0f1422] shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    Grievance Officer (IT Act & DPDP Act 2023)
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    For privacy inquiries, grievance redressal, or exercising your statutory data rights:
                  </p>
                  <p className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mt-2">
                    Email: <a href="mailto:privacy@warnode.cloud" className="text-blue-500 underline font-bold">privacy@warnode.cloud</a> · Address: {legal.address}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold border border-blue-500/30">
                  Response within 48 Hours
                </span>
              </div>
            </div>
          </div>

          {/* Search bar & Controls */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search privacy clauses, data rows..."
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

          {/* All 16 Privacy Policy Sections */}
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
                  No matching privacy clauses found for "{searchQuery}"
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
                  <span>Data Protection Officer</span>
                </div>
                <h3 className="orbitron-font text-xl font-bold text-gray-900 dark:text-white">
                  Exercise your data rights or request records
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xl">
                  You can request an export or erasure of your account details at any time by emailing <a href="mailto:privacy@warnode.cloud" className="text-blue-500 underline font-medium">privacy@warnode.cloud</a> from your registered email.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="mailto:privacy@warnode.cloud"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm button-primary text-button-primary shadow-sm hover:shadow-md transition-all hover:opacity-90 active:scale-95"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Privacy Desk</span>
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
