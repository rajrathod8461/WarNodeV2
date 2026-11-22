"use client"

import Image from "next/image"
import { Star, CheckCircle2 } from "lucide-react"
import { FaDiscord } from "react-icons/fa6"
import reviewsData from "../config/sections/reviews.json"

export interface ReviewItem {
  id: string
  username: string
  stars: number
  date: string
  comment: string
  avatar: string
}

export default function WallOfLove() {
  const reviews = reviewsData as ReviewItem[]

  // Split into 2 rows for smooth multi-lane scrolling
  const row1 = reviews.slice(0, 8)
  const row2 = reviews.slice(8)

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold mb-3">
            <span className="orbitron-font">Wall of Love</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white orbitron-font tracking-tight">
            Trusted by Real <span className="icon-text-primary">Server Owners</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Real feedback from community founders and gamers hosting their servers on WarNodes.
          </p>

          {/* Clean Rating Badge without any 15+ text */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-xs text-gray-900 dark:text-white orbitron-font">4.9 / 5</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">• Discord Verified</span>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Window (Edge-Faded Marquee) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] space-y-5">
        {/* Row 1: Leftward Scrolling Track */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-5 shrink-0 animate-scroll-tech pause-hover will-change-transform py-1 items-stretch">
            {[...row1, ...row1].map((review, idx) => (
              <ReviewCard key={`r1-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Scrolling Track */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-5 shrink-0 animate-scroll-tech-reverse pause-hover will-change-transform py-1 items-stretch">
            {[...row2, ...row2].map((review, idx) => (
              <ReviewCard key={`r2-${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function getCardWidthClass(len: number) {
  if (len > 350) {
    // Very long reviews (e.g. livecreeperr: 506 chars) -> expand horizontally
    return "w-[340px] sm:w-[540px] md:w-[620px] lg:w-[680px]"
  }
  if (len > 240) {
    // Long reviews (e.g. lwkslick: 319, crafterdhyey: 310, itzjustlime: 283)
    return "w-[300px] sm:w-[420px] md:w-[470px] lg:w-[500px]"
  }
  if (len > 130) {
    // Medium reviews (e.g. kakrotxgoku: 219, natsu4269: 229, utk4rshxdog: 195, mehakqt_: 189)
    return "w-[280px] sm:w-[340px] md:w-[370px] lg:w-[390px]"
  }
  // Short reviews (e.g. texio_mc: 20, shiva026951: 69, harness_1: 78, a4dhiiiiiii: 105)
  return "w-[250px] sm:w-[290px] md:w-[310px] lg:w-[330px]"
}

function ReviewCard({ review }: { review: ReviewItem }) {
  const widthClass = getCardWidthClass(review.comment.length)

  return (
    <article className={`${widthClass} shrink-0 flex flex-col justify-between rounded-xl p-5 bg-white/70 dark:bg-[#0c0e17]/85 backdrop-blur-md border border-gray-200/80 dark:border-white/10 hover:border-secondary hover:hover-gradient transition-all duration-300 shadow-sm hover:shadow-lg`}>
      <div className="flex-1 flex flex-col">
        {/* Top Header: User Profile + Stars */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/30">
              <Image
                src={review.avatar}
                alt={review.username}
                width={40}
                height={40}
                className="object-cover w-full h-full"
                unoptimized={review.avatar.endsWith(".gif")}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-gray-900 dark:text-white truncate font-mono">
                  @{review.username}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10 shrink-0" />
              </div>
              <span className="text-[11px] text-gray-400 font-mono block">
                {review.date}
              </span>
            </div>
          </div>

          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0" title="Discord Vouch">
            <FaDiscord className="w-4 h-4" />
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400 mb-2.5">
          {[...Array(review.stars)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
        </div>

        {/* Exact Unedited Review Comment - Full text displayed without truncation */}
        <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed italic break-words flex-1">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Subtle Verified Indicator */}
      <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
        <span className="text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          Verified Review
        </span>
        <span>WarNodes Customer</span>
      </div>
    </article>
  )
}
