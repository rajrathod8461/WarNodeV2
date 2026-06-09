"use client"

import { Suspense } from "react"
import VPSPricingSection from "./VPSPricingSection"

function VPSPricingFallback() {
  return (
    <div className="min-h-[50vh] bg-gray-50 dark:bg-[#0a0b0f] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
    </div>
  )
}

export default function VPSPricingSectionWrapper() {
  return (
    <Suspense fallback={<VPSPricingFallback />}>
      <VPSPricingSection />
    </Suspense>
  )
}
