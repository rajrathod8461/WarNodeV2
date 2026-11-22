"use client"

import { useState, useEffect } from "react"

export type DedicatedStockMap = Record<string, boolean>

let cachedStocks: DedicatedStockMap | null = null
let lastFetchedAt = 0
const TTL = 60_000

export function useDedicatedStock() {
  const [stocks, setStocks] = useState<DedicatedStockMap>(() => cachedStocks || {})
  const [isLoading, setIsLoading] = useState<boolean>(() => !cachedStocks)

  useEffect(() => {
    const now = Date.now()
    if (cachedStocks && now - lastFetchedAt < TTL) {
      setStocks(cachedStocks)
      setIsLoading(false)
      return
    }

    let isMounted = true
    setIsLoading(true)

    fetch("/api/stock/dedicated", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dedicated stock")
        return res.json()
      })
      .then((data) => {
        if (isMounted && data?.stocks) {
          cachedStocks = data.stocks
          lastFetchedAt = Date.now()
          setStocks(data.stocks)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error("Error fetching dedicated stock:", err)
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return {
    stocks,
    isLoading,
    isChecking: isLoading,
    isOutOfStock: (planId: string) => {
      if (isLoading) return false
      return stocks[planId] === false
    },
  }
}

