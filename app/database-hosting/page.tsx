import DatabasePricingSection from '../components/database/DatabasePricingSection';
import DatabaseStack from '../components/database/DatabaseStack';
import FeaturesSection from "../components/FeaturesSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import LocationsSection from '../components/LocationsSection';

export default function DatabaseHostingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <DatabasePricingSection />
      <DatabaseStack />
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  );
}
