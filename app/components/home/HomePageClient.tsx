"use client"

import dynamic from "next/dynamic"
import HeroSection from "../HeroSection"
import FeaturesSection from "../FeaturesSection"
import PanelShowcase from "../PanelShowcase"
import FAQSection from "../FAQSection"
import PricingSection from "../PricingSection"
import Footer from "../Footer"
import PremiumCtaSection from "../premium/PremiumCtaSection"
import Navbar from "../Navbar"
import SmoothScrollProvider from "../premium/providers/SmoothScrollProvider"
import PerformanceSection from "../premium/visuals/PerformanceSection"
import WarShieldViz from "../premium/visuals/WarShieldViz"

const GlobalNetworkSection = dynamic(
  () => import("../premium/visuals/GlobalNetworkSection"),
  { ssr: false }
)

export default function HomePageClient() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-[#05060a] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="premium-aurora absolute inset-0 opacity-80" />
          <div className="premium-noise absolute inset-0 opacity-[0.04]" />
        </div>
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PerformanceSection />
          <WarShieldViz />
          <GlobalNetworkSection />
          <PricingSection />
          <FAQSection />
          <PanelShowcase />
          <PremiumCtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
