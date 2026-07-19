"use client"

import FeaturesSection from "../FeaturesSection"
import LocationsSection from "../LocationsSection"
import VPSPricingSectionWrapper from "./VPSPricingSectionWrapper"
import OSSelectionSection from "./OSSelectionSection"
import Footer from "../Footer"
import Navbar from "../Navbar"

export default function VPSPageClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <VPSPricingSectionWrapper />
      <OSSelectionSection />
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  )
}
