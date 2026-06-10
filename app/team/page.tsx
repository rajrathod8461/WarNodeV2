import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TeamSection from "../components/TeamSection"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />
      <TeamSection />
      <Footer />
    </div>
  )
}
