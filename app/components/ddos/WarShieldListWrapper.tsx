"use client"

import { Suspense } from "react"
import WarShieldList from "./WarShieldList"

function WarShieldListFallback() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
    </div>
  )
}

export default function WarShieldListWrapper() {
  return (
    <Suspense fallback={<WarShieldListFallback />}>
      <WarShieldList />
    </Suspense>
  )
}
