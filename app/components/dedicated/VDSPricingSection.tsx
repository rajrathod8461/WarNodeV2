"use client"

import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi, 
  Check, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  MapPin,
  CreditCard,
  ChevronRight
} from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import dediConfig from "../../config/sections/dedicated.json"
import type { DediConfig, DedicatedPlan } from "../../types/dedicated"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"
import { CountryFlag } from "../CountryFlag"
import { useDedicatedStock } from "../../hooks/useDedicatedStock"

const config = dediConfig as DediConfig

export default function VDSPricingSection() {
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const { t } = useLanguage()
  const { isOutOfStock, isChecking } = useDedicatedStock()

  // Flatten all plans for cross-filtering
  const allPlans = useMemo(() => {
    const list: (DedicatedPlan & { cpuTypeId: string; numericPrice: number; numericRam: number })[] = []
    Object.entries(config.plans).forEach(([cpuTypeId, plans]) => {
      plans.forEach((p) => {
        const numPrice = parseFloat(p.price.replace(/[£$€¥₹C\$A\$,]/g, "")) || 0
        const numRam = parseInt(p.ram.replace(/\D/g, ""), 10) || 0
        list.push({
          ...p,
          cpuTypeId,
          numericPrice: numPrice,
          numericRam: numRam,
        })
      })
    })
    return list
  }, [])

  // Filter States
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCPU, setSelectedCPU] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("germany")
  const [maxPrice, setMaxPrice] = useState<number>(30000)
  const [maxRam, setMaxRam] = useState<number>(256)

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCPU("all")
    setSelectedLocation("germany")
    setMaxPrice(30000)
    setMaxRam(256)
  }

  // Filtered plans
  const filteredPlans = useMemo(() => {
    return allPlans.filter((plan) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = plan.name.toLowerCase().includes(q)
        const matchCpu = plan.cpuDetail.toLowerCase().includes(q)
        const matchRam = plan.ram.toLowerCase().includes(q)
        const matchStorage = plan.storage.toLowerCase().includes(q)
        if (!matchName && !matchCpu && !matchRam && !matchStorage) return false
      }

      if (selectedCPU !== "all" && plan.cpuTypeId !== selectedCPU) {
        return false
      }

      if (plan.numericPrice > maxPrice) {
        return false
      }

      if (plan.numericRam > maxRam) {
        return false
      }

      return true
    })
  }, [allPlans, searchQuery, selectedCPU, maxPrice, maxRam])

  const currentLocation = config.locations.find((l) => l.id === selectedLocation) || config.locations[0]

  return (
    <div className="bg-[#07090e] text-white relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen">
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/dedicated.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] via-transparent to-[#07090e]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section matching Nova */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              {/* Category Badge */}
              <div className="inline-flex items-center bg-[#1c64f2] text-white px-3.5 py-1.5 rounded-lg mb-4 shadow-lg shadow-blue-600/30">
                <span className="text-xs font-bold tracking-wide">Dedicated Servers</span>
              </div>
              
              {/* Title with Doodle Underline */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight flex flex-wrap items-center gap-2.5 font-sans">
                <span>Dedicated Server</span>
                <span className="text-[#1c64f2] relative inline-block">
                  Solutions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1418 125"
                    className="absolute left-0 w-full text-[#1c64f2] top-full -mt-1 pointer-events-none"
                    fill="currentColor"
                  >
                    <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z" />
                  </svg>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
                Bare metal dedicated servers with enterprise-grade hardware, full control, and maximum performance for demanding applications.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="mt-2 sm:mt-0">
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
                className="w-full sm:w-40"
              />
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-3 bg-[#0a0d14] border border-[#181d2a] rounded-2xl p-4 shadow-xl space-y-5">
            {/* Header: Filters + Reset */}
            <div className="flex items-center justify-between border-b border-[#181d2a] pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#1c64f2]" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition-colors duration-150"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>

            {/* SEARCH Filter */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#121622] border border-[#1f2638] px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                <Search className="w-3 h-3 text-[#1c64f2]" />
                <span>Search</span>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#101420] border border-[#1e2538] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1c64f2] transition-colors"
                />
              </div>
            </div>

            {/* PRICE RANGE Filter */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#121622] border border-[#1f2638] px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                <CreditCard className="w-3 h-3 text-[#1c64f2]" />
                <span>Price Range</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                <span className="bg-[#101420] border border-[#1e2538] px-3 py-1.5 rounded-lg text-xs">
                  {convertPrice("₹6,699.00")}
                </span>
                <span className="bg-[#101420] border border-[#1e2538] px-3 py-1.5 rounded-lg text-xs">
                  {convertPrice(`₹${maxPrice.toLocaleString()}.00`)}
                </span>
              </div>
              <input
                type="range"
                min="6699"
                max="30000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1a2030] rounded-lg appearance-none cursor-pointer accent-[#1c64f2] focus:outline-none"
              />
            </div>

            {/* MEMORY (RAM) Filter */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#121622] border border-[#1f2638] px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                <MemoryStick className="w-3 h-3 text-[#1c64f2]" />
                <span>Memory (RAM)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                <span className="bg-[#101420] border border-[#1e2538] px-3 py-1.5 rounded-lg text-xs">
                  16 GB
                </span>
                <span className="bg-[#101420] border border-[#1e2538] px-3 py-1.5 rounded-lg text-xs">
                  {maxRam} GB
                </span>
              </div>
              <input
                type="range"
                min="16"
                max="256"
                step="16"
                value={maxRam}
                onChange={(e) => setMaxRam(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1a2030] rounded-lg appearance-none cursor-pointer accent-[#1c64f2] focus:outline-none"
              />
            </div>

            {/* CPU TYPE Filter */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#121622] border border-[#1f2638] px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                <Cpu className="w-3 h-3 text-[#1c64f2]" />
                <span>CPU Type</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCPU("all")}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 border ${
                    selectedCPU === "all"
                      ? "bg-[#1c64f2]/20 border-[#1c64f2] text-white"
                      : "bg-[#101420] border-[#1e2538] text-gray-400 hover:text-white hover:bg-[#141926]"
                  }`}
                >
                  <span className="font-semibold">All CPUs</span>
                  <span className="text-[10px] bg-[#1a2030] text-gray-300 px-2 py-0.5 rounded-full">
                    {allPlans.length}
                  </span>
                </button>

                {config.planTypes.map((cpu) => {
                  const isSelected = selectedCPU === cpu.id
                  const count = allPlans.filter((p) => p.cpuTypeId === cpu.id).length

                  return (
                    <button
                      key={cpu.id}
                      onClick={() => setSelectedCPU(cpu.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 border ${
                        isSelected
                          ? "bg-[#1c64f2]/20 border-[#1c64f2] text-white"
                          : "bg-[#101420] border-[#1e2538] text-gray-400 hover:text-white hover:bg-[#141926]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={cpu.image || "/cpu/intel.png"}
                          alt={cpu.name}
                          width={18}
                          height={18}
                          className="object-contain shrink-0"
                        />
                        <span className="truncate">{cpu.displayName}</span>
                      </div>
                      <span className="text-[10px] bg-[#1a2030] text-gray-300 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* LOCATION Filter */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-[#121622] border border-[#1f2638] px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                <MapPin className="w-3 h-3 text-[#1c64f2]" />
                <span>Location</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {config.locations.map((location) => {
                  const isSelected = selectedLocation === location.id

                  return (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 border ${
                        isSelected
                          ? "bg-gradient-to-r from-[#2c1512] to-[#1a1212] border-[#7f2d22] text-white shadow-md shadow-red-950/40 ring-1 ring-[#a83a2d]/50"
                          : "bg-[#101420] border-[#1e2538] text-gray-400 hover:text-white hover:bg-[#141926]"
                      }`}
                    >
                      <CountryFlag
                        code={location.flag}
                        alt={`${location.name} flag`}
                        size="sm"
                      />
                      <span>{location.displayName}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Section: Plans Grid */}
          <div className="lg:col-span-9 space-y-4">
            {/* Showing X plans counter */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-300 font-semibold">
                Showing <span className="text-[#1c64f2] font-bold">{filteredPlans.length}</span> plans
              </p>
            </div>

            {/* Plans Grid matching Nova */}
            {filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredPlans.map((plan) => {
                  const cpuTypeObj = config.planTypes.find((pt) => pt.id === plan.cpuTypeId)
                  const outOfStock = isOutOfStock(plan.id)

                  return (
                    <div
                      key={plan.id}
                      className="group relative bg-[#0a0d14] border-2 border-[#181d2a] hover:border-[#1c64f2] rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[6px_6px_0px_0px_#1c64f2] transition-all duration-200 hover:-translate-y-1 hover:translate-x-[-1px] flex flex-col justify-between"
                    >
                      {/* Top-Right Diagonal Ribbon Badge */}
                      {outOfStock ? (
                        <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-20">
                          <div className="absolute transform rotate-45 bg-red-600 text-white font-extrabold text-[9px] tracking-widest py-1 text-center w-36 top-5 -right-8 shadow-md uppercase">
                            Out of stock
                          </div>
                        </div>
                      ) : plan.badge ? (
                        <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-20">
                          <div className="absolute transform rotate-45 bg-[#1c64f2] text-white font-extrabold text-[9px] tracking-widest py-1 text-center w-36 top-5 -right-8 shadow-md uppercase">
                            {plan.badge}
                          </div>
                        </div>
                      ) : null}

                      <div className="p-6">
                        {/* Top Row: CPU Square Icon + Plan Name + Subtitle */}
                        <div className="flex items-center gap-3.5 mb-5">
                          <div className="w-12 h-12 rounded-lg bg-[#121622] border-2 border-[#22293d] flex items-center justify-center text-[#1c64f2] shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                            <Cpu className="w-6 h-6 stroke-[2]" />
                          </div>
                          <div className="min-w-0 pr-8">
                            <h3 className="text-xl font-bold text-white tracking-wide truncate">
                              {plan.name}
                            </h3>
                            <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">
                              {plan.cpuDetail}
                            </p>
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="flex items-baseline mb-6">
                          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                            {convertPrice(plan.price)}
                          </span>
                          <span className="ml-1.5 text-sm text-gray-400 font-medium">
                            {plan.period}
                          </span>
                        </div>

                        {/* 2x2 Specs Grid with Vibrant Blue Geometric Icons */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-6 pt-4 border-t border-[#181d2a]">
                          {/* CPU Cores */}
                          <div className="flex items-start gap-2.5">
                            <div className="text-[#1c64f2] mt-0.5 shrink-0">
                              <Cpu className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate leading-tight">
                                {plan.cpu}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                {plan.cpuDetail}
                              </p>
                            </div>
                          </div>

                          {/* RAM */}
                          <div className="flex items-start gap-2.5">
                            <div className="text-[#1c64f2] mt-0.5 shrink-0">
                              <MemoryStick className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate leading-tight">
                                {plan.ram}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                {plan.ramDetail}
                              </p>
                            </div>
                          </div>

                          {/* Storage */}
                          <div className="flex items-start gap-2.5">
                            <div className="text-[#1c64f2] mt-0.5 shrink-0">
                              <HardDrive className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate leading-tight">
                                {plan.storage}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                {plan.storageDetail}
                              </p>
                            </div>
                          </div>

                          {/* Bandwidth */}
                          <div className="flex items-start gap-2.5">
                            <div className="text-[#1c64f2] mt-0.5 shrink-0">
                              <Wifi className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate leading-tight">
                                {plan.bandwidth}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                {plan.bandwidthDetail}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Features Checkmarks */}
                        <div className="space-y-2 mb-6 pt-4 border-t border-[#181d2a]">
                          {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
                              <Check className="w-3.5 h-3.5 text-[#1c64f2] shrink-0 stroke-[2.5]" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Location pill + Order Button */}
                      <div className="px-6 pb-6 pt-0 space-y-4">
                        {/* Available Location Pill */}
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>Available in</span>
                          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2e1511] to-[#1c1110] border border-[#6b2c21]/70 px-3 py-1 rounded-full shadow-inner">
                            <CountryFlag
                              code={currentLocation.flag}
                              alt={currentLocation.name}
                              size="sm"
                            />
                            <span className="text-xs font-bold text-white tracking-wide">
                              {currentLocation.displayName}
                            </span>
                          </div>
                        </div>

                        {/* Order Button matching Nova */}
                        {isChecking ? (
                          <button
                            type="button"
                            disabled
                            className="w-full bg-[#121622] border border-[#22293d] text-gray-400 font-bold py-3.5 px-4 rounded-xl cursor-wait flex items-center justify-center gap-2 text-sm shadow-inner"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span>Checking stock…</span>
                          </button>
                        ) : outOfStock ? (
                          <button
                            type="button"
                            disabled
                            className="w-full bg-red-500/15 border border-red-500/40 text-red-400 font-bold py-3.5 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-inner"
                          >
                            <span>Out of stock</span>
                          </button>
                        ) : (
                          <a
                            href={plan.orderLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#1c64f2] hover:bg-[#1554cb] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm"
                          >
                            <span>Order Now</span>
                            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#0a0d14] border border-[#181d2a] rounded-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-800/40 flex items-center justify-center mb-4 text-gray-500">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No matching servers found</h3>
                <p className="text-sm text-gray-400 max-w-sm mb-6">
                  Try adjusting your search criteria or price/RAM sliders to see more available configurations.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#1c64f2] hover:bg-[#1554cb] text-white text-xs font-bold rounded-xl transition-all duration-150"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
