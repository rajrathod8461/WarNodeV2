import HomePageClient from "./components/home/HomePageClient"
import HomeSeoContent from "./components/home/HomeSeoContent"
import { buildFaqPageSchema, homeFaqs } from "./lib/seo"

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageSchema(homeFaqs)),
        }}
      />
      <HomeSeoContent />
      <HomePageClient />
    </main>
  )
}
