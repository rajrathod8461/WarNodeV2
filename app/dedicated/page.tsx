'use client'

import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import VDSPricingSection from '../components/dedicated/VDSPricingSection'

const OSSelectionSection = lazy(() => import('../components/vps/OSSelectionSection'))
const FeaturesSection = lazy(() => import('../components/FeaturesSection'))
const LocationsSection = lazy(() => import('../components/LocationsSection'))
const FAQSection = lazy(() => import('../components/FAQSection'))
const PanelShowcase = lazy(() => import('../components/PanelShowcase'))
const Footer = lazy(() => import('../components/Footer'))

export default function DedicatedPage() {
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
