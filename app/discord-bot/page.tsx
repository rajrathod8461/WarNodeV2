import DiscordPricingSection from '../components/discord/DiscordPricingSection';
import DiscordLanguagesStack from '../components/discord/DiscordLanguagesStack';
import FeaturesSection from "../components/FeaturesSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import LocationsSection from '../components/LocationsSection';

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <DiscordPricingSection />
      <DiscordLanguagesStack />
      <FeaturesSection />
      <LocationsSection />
      <Footer />
    </div>
  );
}
