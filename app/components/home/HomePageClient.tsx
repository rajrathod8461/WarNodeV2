"use client"

import HeroSection from "../HeroSection"
import FeaturesSection from "../FeaturesSection"
import PanelShowcase from "../PanelShowcase"
import LocationsSection from "../LocationsSection"
import WallOfLove from "../WallOfLove"
import FAQSection from "../FAQSection"
import PricingSection from "../PricingSection"
import Footer from "../Footer"
import Navbar from "../Navbar"

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <LocationsSection />
      <PanelShowcase />
      <WallOfLove />
      <FAQSection />
      <Footer />
    </div>
  )
}
