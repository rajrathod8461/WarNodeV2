import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LocationsSection from '../components/LocationsSection'
import FeaturesSection from '../components/FeaturesSection'

export const metadata: Metadata = {
  title: 'Global Server Locations & Network — WarNodes',
  description: 'Explore WarNodes ultra-low latency worldwide network locations including Mumbai, Delhi, Hyderabad, Singapore, Frankfurt, and Washington DC.',
}

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <div className="pt-20">
        <LocationsSection />
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  )
}
