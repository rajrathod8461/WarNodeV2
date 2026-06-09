'use client'
import FeaturesSection from "../components/FeaturesSection"
import LocationsSection from "../components/LocationsSection"
import VPSPricingSectionWrapper from "../components/vps/VPSPricingSectionWrapper"
import OSSelectionSection from "../components/vps/OSSelectionSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";

export default function Home() {
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
