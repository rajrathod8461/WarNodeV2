import EmailPricingSection from '../components/email/EmailPricingSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function EmailHostingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <EmailPricingSection />
      <Footer />
    </div>
  )
}
