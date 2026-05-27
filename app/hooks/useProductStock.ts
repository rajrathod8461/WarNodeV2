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

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 6500)

    // Static export me API routes available nahi hote, so browser-side fetch.
    // Agar CORS/block/fetch fail ho jaye to button block na kare (treat as in stock).
    fetch(orderLink, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "user-agent": "warnodes-site-stock-check/1.0",
        accept: "text/html,*/*",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("fetch_failed")
        return res.text()
      })
      .then((html) => {
        if (cancelled) return
        const text = html.toLowerCase()
        const outOfStock =
          text.includes("out of stock") ||
          text.includes("sold out") ||
          text.includes("currently unavailable") ||
          text.includes("not available") ||
          text.includes("unavailable")

        const next: StockState = outOfStock ? { status: "out_of_stock" } : { status: "in_stock" }
        cache.set(orderLink, next)
        setState(next)
      })
      .catch(() => {
        if (cancelled) return
        const next: StockState = { status: "in_stock" }
        cache.set(orderLink, next)
        setState(next)
      })
      .finally(() => {
        window.clearTimeout(timeout)
      })

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [eligible, orderLink])

  return {
    ...state,
    eligible,
    isOutOfStock: state.status === "out_of_stock",
    isChecking: state.status === "loading",
  }
}

