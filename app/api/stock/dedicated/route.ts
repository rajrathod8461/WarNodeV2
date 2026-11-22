import { NextResponse } from "next/server"

const DATALIX_URL = "https://datalix.eu/rent-intel-dedicated-server"
const STOCK_CACHE_TTL_MS = 60_000

interface CachedDedicatedStock {
  stocks: Record<string, boolean>
  cachedAt: number
}

let cachedData: CachedDedicatedStock | null = null

function parseDatalixStock(html: string): Record<string, boolean> {
  const plans = [
    { id: "WN-DED-1", test: (title: string) => /Intel\s+Xeon\s+2630v4/i.test(title) && !/2x/i.test(title) },
    { id: "WN-DED-2", test: (title: string) => /2x\s+Intel\s+Xeon\s+2630v4/i.test(title) },
    { id: "WN-DED-3", test: (title: string) => /Intel\s+Xeon\s+2680v4/i.test(title) && !/2x/i.test(title) },
    { id: "WN-DED-4", test: (title: string) => /2x\s+Intel\s+Xeon\s+2680v4/i.test(title) },
    { id: "WN-DED-5", test: (title: string) => /Xeon\s+Gold\s+6138/i.test(title) && !/2x/i.test(title) },
    { id: "WN-DED-6", test: (title: string) => /2x\s+Xeon\s+Gold\s+6138/i.test(title) },
    { id: "WN-DED-7", test: (title: string) => /Xeon\s+Gold\s+6150/i.test(title) && !/2x/i.test(title) },
    { id: "WN-DED-8", test: (title: string) => /2x\s+Xeon\s+Gold\s+6150/i.test(title) },
  ]

  // Extract dx-card blocks
  const cardRegex = /<div[^>]*class="[^"]*dx-card[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?=<div[^>]*class="[^"]*dx-card|<div[^>]*class="[^"]*col-span|<\/section|$)/gi
  const cards: string[] = []
  let cardMatch: RegExpExecArray | null

  while ((cardMatch = cardRegex.exec(html)) !== null) {
    cards.push(cardMatch[1])
  }

  const stocks: Record<string, boolean> = {
    "WN-DED-1": true,
    "WN-DED-2": true,
    "WN-DED-3": true,
    "WN-DED-4": true,
    "WN-DED-5": false,
    "WN-DED-6": false,
    "WN-DED-7": false,
    "WN-DED-8": false,
  }

  plans.forEach((plan) => {
    for (const card of cards) {
      const h3Match = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)
      const title = h3Match ? h3Match[1].replace(/<[^>]+>/g, "").trim() : ""

      if (plan.test(title)) {
        const isSoldOut = /sold\s*out/i.test(card)
        const hasConfigure = /configure\s*now/i.test(card)
        stocks[plan.id] = !isSoldOut && hasConfigure
        break
      }
    }
  })

  return stocks
}

export async function GET() {
  const now = Date.now()
  if (cachedData && now - cachedData.cachedAt < STOCK_CACHE_TTL_MS) {
    return NextResponse.json({
      source: DATALIX_URL,
      stocks: cachedData.stocks,
      cached: true,
    })
  }

  try {
    const res = await fetch(DATALIX_URL, {
      method: "GET",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(7000),
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`Datalix returned HTTP ${res.status}`)
    }

    const html = await res.text()
    const stocks = parseDatalixStock(html)

    cachedData = {
      stocks,
      cachedAt: now,
    }

    return NextResponse.json({
      source: DATALIX_URL,
      stocks,
      cached: false,
    })
  } catch (error) {
    console.error("Failed to fetch Datalix dedicated stock:", error)
    // If we have stale cache, use it
    if (cachedData) {
      return NextResponse.json({
        source: DATALIX_URL,
        stocks: cachedData.stocks,
        cached: true,
        stale: true,
      })
    }

    // Fallback default
    return NextResponse.json({
      source: DATALIX_URL,
      stocks: {
        "WN-DED-1": true,
        "WN-DED-2": true,
        "WN-DED-3": true,
        "WN-DED-4": true,
        "WN-DED-5": false,
        "WN-DED-6": false,
        "WN-DED-7": false,
        "WN-DED-8": false,
      },
      fallback: true,
    })
  }
}

