import type { Metadata } from 'next'
import EmailPricingSection from '../components/email/EmailPricingSection'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: 'Email Hosting — WarNodes | Professional Business Email',
  description:
    'Professional email hosting with custom domains, spam protection, SSL/TLS encryption, webmail access, and plans starting at ₹39/mo.',
}

export default function EmailHostingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <EmailPricingSection />
      <Footer />
    </div>
  )
}
