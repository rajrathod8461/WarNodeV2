"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "../contexts/LanguageContext"
import { SectionHeader } from "./premium/ui/SectionHeader"
import { ScrollReveal } from "./premium/ui/ScrollReveal"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    { question: t("faq.question1"), answer: t("faq.answer1") },
    { question: t("faq.question2"), answer: t("faq.answer2") },
    { question: t("faq.question3"), answer: t("faq.answer3") },
    { question: t("faq.question4"), answer: t("faq.answer4") },
    { question: t("faq.question5"), answer: t("faq.answer5") },
  ]

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(19,127,236,0.08),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              className="mb-8 md:mb-10"
              eyebrow="Support"
              title={
                <>
                  Answers before you{" "}
                  <span className="text-white/40">need to ask</span>
                </>
              }
              description={t("faq.subtitle")}
            />
            <ScrollReveal className="relative mx-auto hidden aspect-square max-w-sm lg:block">
              <Image
                src="/faq.png"
                alt={t("faq.title")}
                fill
                sizes="400px"
                className="object-contain opacity-90"
              />
            </ScrollReveal>
          </div>

          <div className="space-y-3 lg:col-span-7">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              return (
                <ScrollReveal key={faq.question} delay={index * 0.05}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      open
                        ? "border-[#137fec]/35 bg-[#137fec]/8"
                        : "border-white/[0.08] bg-white/[0.025] hover:border-white/15"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      aria-expanded={open}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-[#137fec]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-base font-medium text-white sm:text-lg">
                        {faq.question}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-white/50 sm:px-6 sm:pb-6 sm:pl-[4.5rem] sm:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
