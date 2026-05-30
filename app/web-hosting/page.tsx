import WebHostingPricingSection from '../components/webhosting/WebHostingPricingSection';
import WebHostingTechStack from '../components/webhosting/WebHostingTechStack';
import FeaturesSection from "../components/FeaturesSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import LocationsSection from '../components/LocationsSection';

export default function WebHostingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <WebHostingPricingSection />
      <WebHostingTechStack />
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  );
}
