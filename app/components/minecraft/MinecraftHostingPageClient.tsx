"use client"

import { lazy, Suspense } from "react"
import Navbar from "../Navbar"
import MinecraftPricingSection from "./MinecraftPricingSection"
import Footer from "../Footer"

const FeaturesSection = lazy(() => import("../FeaturesSection"))
const PanelShowcase = lazy(() => import("../PanelShowcase"))
const LocationsSection = lazy(() => import("../LocationsSection"))
const WallOfLove = lazy(() => import("../WallOfLove"))

export default function MinecraftHostingPageClient() {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-[#0a0b0f]">
      <Navbar />
      <MinecraftPricingSection />

      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={null}>
        <PanelShowcase />
      </Suspense>

      <Suspense fallback={null}>
        <LocationsSection />
      </Suspense>

      <Suspense fallback={null}>
        <WallOfLove />
      </Suspense>

      <Footer />
    </div>
  )
}
