import { NextResponse } from "next/server"

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
  return (
    text.includes("out of stock") ||
    text.includes("sold out") ||
    text.includes("currently unavailable") ||
    text.includes("not available") ||
    text.includes("unavailable")
  )
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
      return NextResponse.json({ inStock: true, confidence: "unknown" })
    }

    const html = await res.text()
    const outOfStock = inferOutOfStock(html)

    return NextResponse.json({
      inStock: !outOfStock,
      confidence: "html",
    })
  } catch {
    return NextResponse.json({ inStock: true, confidence: "unknown" })
  } finally {
    clearTimeout(timeout)
  }
}
