import { NextResponse } from "next/server"

const STOCK_CACHE_TTL_MS = 60_000
const stockCache = new Map<string, { body: { inStock: boolean; confidence: string }; at: number }>()

function isAllowedUrl(raw: string): URL | null {
  try {
    const url = new URL(raw)
    if (url.protocol !== "https:") return null
    if (url.username || url.password) return null
    if (url.hostname !== "portal.warnode.cloud") return null
    return url
  } catch {
    return null
  }
}

function inferOutOfStock(html: string): boolean {
  const text = html.toLowerCase()
  if (/\bout of stock\b/.test(text)) return true
  if (/\bsold out\b/.test(text)) return true
  if (/\bnot in stock\b/.test(text)) return true
  if (/\bcurrently unavailable\b/.test(text)) return true
  if (/\bproduct unavailable\b/.test(text)) return true
  if (/\bthis product is unavailable\b/.test(text)) return true
  return false
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const rawUrl = searchParams.get("url")

  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 })
  }

  const url = isAllowedUrl(rawUrl)
  if (!url) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 })
  }

  const cacheKey = url.toString()
  const cached = stockCache.get(cacheKey)
  if (cached && Date.now() - cached.at < STOCK_CACHE_TTL_MS) {
    return NextResponse.json(cached.body)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6500)

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "warnodes-site-stock-check/1.0",
        accept: "text/html,*/*",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      const body = { inStock: true, confidence: "unknown" }
      stockCache.set(cacheKey, { body, at: Date.now() })
      return NextResponse.json(body)
    }

    const html = await res.text()
    const outOfStock = inferOutOfStock(html)

    const body = {
      inStock: !outOfStock,
      confidence: "html",
    }
    stockCache.set(cacheKey, { body, at: Date.now() })
    return NextResponse.json(body)
  } catch {
    const body = { inStock: true, confidence: "unknown" }
    stockCache.set(cacheKey, { body, at: Date.now() })
    return NextResponse.json(body)
  } finally {
    clearTimeout(timeout)
  }
}
