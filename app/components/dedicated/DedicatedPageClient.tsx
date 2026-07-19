"use client"

import { lazy, Suspense } from "react"
import Navbar from "../Navbar"
import VDSPricingSection from "./VDSPricingSection"

const OSSelectionSection = lazy(() => import("../vps/OSSelectionSection"))
const FeaturesSection = lazy(() => import("../FeaturesSection"))
const LocationsSection = lazy(() => import("../LocationsSection"))
const FAQSection = lazy(() => import("../FAQSection"))
const PanelShowcase = lazy(() => import("../PanelShowcase"))
const Footer = lazy(() => import("../Footer"))

export default function DedicatedPageClient() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />
      <VDSPricingSection />

      <Suspense fallback={null}>
        <OSSelectionSection />
      </Suspense>

      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={null}>
        <LocationsSection />
      </Suspense>

      <Suspense fallback={null}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={null}>
        <PanelShowcase />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
