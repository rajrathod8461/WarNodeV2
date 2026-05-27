import WarShieldListWrapper from "../components/ddos/WarShieldListWrapper"
import FeaturesSection from "../components/FeaturesSection"
import LocationsSection from "../components/LocationsSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function DDoSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <WarShieldListWrapper />
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  )
}
