import type { Metadata } from "next"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TeamSection from "../components/TeamSection"
import { siteMetadata } from "../lib/site-metadata"

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the WarNodes leadership team — infrastructure, community, and business operations behind India's smoothest hosting experience.",
  alternates: {
    canonical: `${siteMetadata.url}/team`,
  },
  openGraph: {
    title: `Our Team | ${siteMetadata.name}`,
    description:
      "Meet Raj Rathod, Sarthak Tiwari, and Shubh Gupta — the team building and supporting WarNodes.",
    url: `${siteMetadata.url}/team`,
  },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />
      <TeamSection />
      <Footer />
    </div>
  )
}
