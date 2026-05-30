import { useEffect, useMemo, useState, useSyncExternalStore } from "react"

type StockState =
  | { status: "idle" | "loading" }
  | { status: "in_stock" }
  | { status: "out_of_stock" }
  | { status: "error" }

const CACHE_TTL_MS = 5 * 60 * 1000

const cache = new Map<string, { state: StockState; at: number }>()
const inflight = new Map<string, Promise<StockState>>()
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((l) => l())
}

function isPortalProductUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === "https:" && u.hostname === "portal.warnode.cloud"
  } catch {
    return false
  }
}

function getCached(orderLink: string): StockState | null {
  const entry = cache.get(orderLink)
  if (!entry) return null
  if (Date.now() - entry.at > CACHE_TTL_MS) {
    cache.delete(orderLink)
    return null
  }
  if (entry.state.status === "loading" || entry.state.status === "idle") return null
  return entry.state
}

async function fetchStock(orderLink: string): Promise<StockState> {
  const cached = getCached(orderLink)
  if (cached) return cached

  const pending = inflight.get(orderLink)
  if (pending) return pending

  const promise = fetch(`/api/stock?url=${encodeURIComponent(orderLink)}`, { cache: "no-store" })
    .then((r) => r.json())
    .then((data: { inStock?: boolean }): StockState => {
      if (data?.inStock === false) return { status: "out_of_stock" }
      return { status: "in_stock" }
    })
    .catch((): StockState => ({ status: "in_stock" }))
    .then((state) => {
      cache.set(orderLink, { state, at: Date.now() })
      notify()
      return state
    })
    .finally(() => {
      inflight.delete(orderLink)
    })

  inflight.set(orderLink, promise)
  return promise
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(orderLink: string, eligible: boolean): StockState {
  if (!eligible) return { status: "idle" }
  const cached = getCached(orderLink)
  if (cached) return cached
  if (inflight.has(orderLink)) return { status: "loading" }
  return { status: "loading" }
}

export function useProductStock(orderLink?: string) {
  const eligible = useMemo(() => !!orderLink && isPortalProductUrl(orderLink), [orderLink])
  const key = eligible && orderLink ? orderLink : ""

  const state = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key, eligible),
    () => getSnapshot(key, eligible),
  )

  useEffect(() => {
    if (!eligible || !orderLink) return
    if (getCached(orderLink)) return
    void fetchStock(orderLink)
  }, [eligible, orderLink])

  return {
    ...state,
    eligible,
    isOutOfStock: state.status === "out_of_stock",
    isChecking: state.status === "loading",
  }
}
