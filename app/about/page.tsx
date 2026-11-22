import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LocationsSection from '../components/LocationsSection'
import AboutHero from '../components/about/AboutHero'
import OperatingPrinciples from '../components/about/OperatingPrinciples'
import JourneyTimeline from '../components/about/JourneyTimeline'
import WhyBento from '../components/about/WhyBento'
import InfraDiagram from '../components/about/InfraDiagram'
import AboutCTA from '../components/about/AboutCTA'

/**
 * About page.
 *
 * This is a server component — only the individual sections that need motion
 * or scroll tracking opt into the client bundle. The narrative order is
 * deliberate: who we are (hero) → what we commit to (principles) → how we got
 * here (journey) → what we build (why) → proof (infrastructure) → next step.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300 relative overflow-hidden">
      <Navbar />

      <main id="main-content">
        <AboutHero />
        <OperatingPrinciples />
        <JourneyTimeline />
        <WhyBento />
        <InfraDiagram />
        <AboutCTA />
        <LocationsSection />
      </main>

      <Footer />
    </div>
  )
}
