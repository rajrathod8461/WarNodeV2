import { useEffect, useMemo, useState } from "react"

type StockState =
  | { status: "idle" | "loading" }
  | { status: "in_stock" }
  | { status: "out_of_stock" }
  | { status: "error" }

const cache = new Map<string, StockState>()

function isPortalProductUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === "https:" && u.hostname === "portal.warnode.cloud"
  } catch {
    return false
  }
}

export function useProductStock(orderLink?: string) {
  const eligible = useMemo(() => !!orderLink && isPortalProductUrl(orderLink), [orderLink])
  const key = eligible && orderLink ? orderLink : ""

  const [state, setState] = useState<StockState>(() => {
    if (!eligible) return { status: "idle" }
    return cache.get(key) ?? { status: "loading" }
  })

  useEffect(() => {
    if (!eligible || !orderLink) return

    const cached = cache.get(orderLink)
    if (cached && cached.status !== "loading" && cached.status !== "idle") {
      setState(cached)
      return
    }

    let cancelled = false
    setState({ status: "loading" })

    fetch(`/api/stock?url=${encodeURIComponent(orderLink)}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { inStock?: boolean }) => {
        if (cancelled) return
        const next: StockState =
          data && data.inStock === false ? { status: "out_of_stock" } : { status: "in_stock" }
        cache.set(orderLink, next)
        setState(next)
      })
      .catch(() => {
        if (cancelled) return
        const next: StockState = { status: "in_stock" }
        cache.set(orderLink, next)
        setState(next)
      })

    return () => {
      cancelled = true
    }
  }, [eligible, orderLink])

  return {
    ...state,
    eligible,
    isOutOfStock: state.status === "out_of_stock",
    isChecking: state.status === "loading",
  }
}
