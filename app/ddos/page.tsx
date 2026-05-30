import { Suspense } from 'react'
import Navbar from '../components/Navbar'
import WarShieldPricingSection from '../components/ddos/WarShieldPricingSection'
import FeaturesSection from '../components/FeaturesSection'
import LocationsSection from '../components/LocationsSection'
import Footer from '../components/Footer'

export default function DDoSPage() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />
      <Suspense fallback={null}>
        <WarShieldPricingSection />
      </Suspense>
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  )
}
