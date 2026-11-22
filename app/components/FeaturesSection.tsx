"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Cloud,
  Shield,
  Headphones,
  Cpu,
  Zap,
  Check,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import uiConfig from "../config/sections/ui.json";

const cardBaseClass =
  "bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-primary rounded-xl hover:border-secondary hover:hover-gradient group transition-all duration-300 relative overflow-hidden flex flex-col";

const CardIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 border-l border-b border-primary rounded-tr-xl flex items-center justify-center flex-shrink-0">
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 icon-primary" />
  </div>
);

export default function FeaturesSection() {
  const { t } = useLanguage();

  const continents = [
    {
      name: "Asia",
      flags: ["/flags/in.svg", "/flags/sg.svg"],
      title: "India & Singapore",
    },
    {
      name: "Europe",
      flags: ["/flags/de.svg", "/flags/eu.svg"],
      title: "Frankfurt (Germany)",
    },
    {
      name: "North America",
      flags: ["/flags/us.svg"],
      title: "Washington DC",
    },
    {
      name: "Middle East",
      flags: ["/flags/ae.svg"],
      title: "Dubai (UAE)",
    },
  ];

  const stats = [
    { value: "8+", label: t("features.statLocations") },
    { value: "4", label: t("features.statContinents") },
    { value: "99.9%", label: t("features.statUptime") },
  ];

  const performanceSpecs = [
    "Enterprise Intel Xeon & AMD EPYC CPUs",
    "Gen4 NVMe SSD storage for instant read/write",
    "DDR5 ECC RAM for maximum stability",
    "Optimized for large modpacks & plugins",
  ];

  const networkSpecs = [
    "Anycast network routing worldwide",
    "Sub-10ms response within region",
    "BGP-optimized peering with major ISPs",
    "Real-time traffic shaping during attacks",
  ];

  const chatMessages = [
    {
      from: "user",
      text: t("features.supportChat1"),
    },
    {
      from: "agent",
      text: t("features.supportChat2"),
    },
  ];

  // 1. Global Network Card (4 cols on lg)
  const GlobalNetworkCard = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className={`${cardBaseClass} flex flex-col flex-1`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 px-4 pt-4 sm:pt-6 sm:px-6 pb-2 relative z-10">
            <h3 className="text-base sm:text-lg font-semibold orbitron-font text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-icon-text-primary transition-colors">
              {t("features.globalNetwork")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm max-w-[70%] sm:max-w-[60%]">
              {t("features.globalNetworkDesc")}
            </p>
          </div>
          <CardIcon icon={Cloud} />
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 max-w-[60%] sm:max-w-[48%]">
          {stats.map((stat, i) => {
            const isUptime = stat.value === "99.9%";
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
              >
                {isUptime ? (
                  <a
                    href="https://status.warnode.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group/status hover:opacity-90 transition-opacity"
                    title="View live network status at status.warnode.cloud"
                  >
                    <p className="orbitron-font font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors flex items-center gap-1.5">
                      {stat.value}
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-medium hover:underline">
                      {stat.label}
                    </p>
                  </a>
                ) : (
                  <>
                    <p className="orbitron-font font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 dark:text-white group-hover:text-icon-text-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">
                      {stat.label}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-3 px-4 sm:px-6 pb-5 sm:pb-6 pt-2 max-w-[85%] sm:max-w-[70%]">
          {continents.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.35 + 0.08 * i }}
              className="flex items-center gap-2"
              title={item.title}
            >
              <div className="flex items-center gap-1 shrink-0">
                {item.flags.map((flagUrl, fIdx) => (
                  <img
                    key={fIdx}
                    src={flagUrl}
                    alt=""
                    width={22}
                    height={15}
                    className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm border border-black/20 dark:border-white/20 shrink-0"
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-y-0 -right-24 sm:-right-32 w-[75%] sm:w-[65%] flex items-center pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 0.35, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[916/451]"
          >
            <Image
              src="/world-map-2.png"
              alt="World map with server locations"
              fill
              className="object-contain object-right"
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // 2. DDoS Protection Card (2 cols on lg)
  const DdosProtectionCard = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`${cardBaseClass} lg:col-span-2 flex flex-col`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 px-4 pt-4 sm:pt-4 sm:px-6 pb-0">
            <h3 className="text-base sm:text-lg font-semibold orbitron-font text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-icon-text-primary transition-colors">
              {t("features.ddosProtection")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {t("features.ddosProtectionDesc")}
            </p>
          </div>
          <CardIcon icon={Shield} />
        </div>

        <div className="flex-1 flex flex-col justify-end p-4 sm:p-6 pt-4">
          <svg
            viewBox="0 0 200 90"
            preserveAspectRatio="none"
            className="w-full h-28"
            role="img"
            aria-label={`${t("features.ddosBlocked")} / ${t("features.ddosClean")}`}
          >
            <defs>
              <linearGradient id="ddos-attack-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ddos-clean-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,80 L18,76 C34,72 44,34 58,20 C68,10 76,12 86,30 C98,52 114,72 136,79 L200,82 L200,90 L0,90 Z"
              fill="url(#ddos-attack-fill)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.path
              d="M0,80 L18,76 C34,72 44,34 58,20 C68,10 76,12 86,30 C98,52 114,72 136,79 L200,82"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-[#ef4444]"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
            />
            <motion.path
              d="M0,58 C30,54 55,62 85,57 C120,51 160,58 200,53 L200,90 L0,90 Z"
              fill="url(#ddos-clean-fill)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
            <motion.path
              d="M0,58 C30,54 55,62 85,57 C120,51 160,58 200,53"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-[#0ea5e9] dark:stroke-[#0e93d9]"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>
    );
  };

  // 3. 24/7 Support Card (2 cols on lg)
  const SupportCard = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className={`${cardBaseClass} lg:col-span-2 flex flex-col`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 px-4 pt-4 sm:pt-4 sm:px-6 pb-0">
            <h3 className="text-base sm:text-lg font-semibold orbitron-font text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-icon-text-primary transition-colors">
              {t("features.supportTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {t("features.supportDesc")}
            </p>
          </div>
          <CardIcon icon={Headphones} />
        </div>

        <div className="flex-1 flex flex-col justify-end gap-2.5 p-4 sm:p-6 pt-4">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.5 + 0.35 * i }}
              className={`max-w-[85%] text-xs sm:text-sm px-3.5 py-2.5 ${
                msg.from === "user"
                  ? "self-end text-white rounded-2xl rounded-br-sm shadow-sm"
                  : "self-start bg-gray-200/70 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-2xl rounded-bl-sm"
              }`}
              style={msg.from === "user" ? { backgroundColor: "var(--icon-primary, #2563eb)" } : undefined}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // 4. High Performance Card (1 col in subgrid)
  const HighPerformanceCard = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
        className={`${cardBaseClass} flex flex-col`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 px-4 pt-4 sm:pt-4 sm:px-6 pb-0">
            <h3 className="text-base sm:text-lg font-semibold orbitron-font text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-icon-text-primary transition-colors">
              {t("features.highPerformance")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {t("features.highPerformanceDesc")}
            </p>
          </div>
          <CardIcon icon={Cpu} />
        </div>

        <div className="flex-1 flex flex-col gap-3 px-4 sm:px-6 pb-4 sm:pb-6 pt-5">
          <ul className="space-y-2 sm:space-y-2.5">
            {performanceSpecs.map((spec) => (
              <li key={spec} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 icon-primary flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 font-normal">
                  {spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };

  // 5. Low Latency Card (1 col in subgrid)
  const LowLatencyCard = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${cardBaseClass} flex flex-col`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 px-4 pt-4 sm:pt-4 sm:px-6 pb-0">
            <h3 className="text-base sm:text-lg font-semibold orbitron-font text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-icon-text-primary transition-colors">
              {t("features.lowLatency")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              {t("features.lowLatencyDesc")}
            </p>
          </div>
          <CardIcon icon={Zap} />
        </div>

        <div className="flex-1 flex flex-col gap-3 px-4 sm:px-6 pb-4 sm:pb-6 pt-5">
          <ul className="space-y-2 sm:space-y-2.5">
            {networkSpecs.map((spec) => (
              <li key={spec} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 icon-primary flex-shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 font-normal">
                  {spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };

  const titleText = t("features.title") || "Advanced Features";
  const titleWords = titleText.split(" ");
  const mainTitle = titleWords.slice(0, -1).join(" ");
  const lastTitleWord = titleWords.slice(-1)[0];

  return (
    <div
      id="features"
      className="bg-gray-50 dark:bg-[#0a0b0f] relative py-8 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/90 to-gray-50 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/90 dark:to-[#0a0b0f] z-0" />

      <div className="absolute top-20 -left-32 w-64 h-64 blob-primary rounded-full blur-3xl z-[2]" />
      <div className="absolute top-40 -right-32 w-72 h-72 blob-primary rounded-full blur-3xl" />
      <div className="absolute bottom-32 -right-24 w-56 h-56 blob-secondary rounded-full blur-3xl" />

      <div className="relative pt-12 z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16"
        >
          <div className="inline-flex items-center gap-2 button-primary text-button-primary px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-4">
            <span className="text-sm font-medium">
              {t("features.badge")}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 orbitron-font">
            {mainTitle} <span className="icon-text-primary">{lastTitleWord}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid layout: 6 columns on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Row 1, Col 1-4: Global Network */}
          <div className="relative lg:col-span-4 flex">
            <GlobalNetworkCard />
            {uiConfig.christmasTheme.enabled && (
              <>
                <Image
                  src="/christmas/leaf-up.png"
                  alt="Christmas decoration"
                  width={80}
                  height={80}
                  className="absolute -top-6 -left-6 z-20 pointer-events-none"
                />
                <Image
                  src="/christmas/leaf-down.png"
                  alt="Christmas decoration"
                  width={80}
                  height={80}
                  className="absolute -bottom-6 -right-6 z-20 pointer-events-none"
                />
              </>
            )}
          </div>

          {/* Row 1, Col 5-6: DDoS Protection */}
          <DdosProtectionCard />

          {/* Row 2, Col 1-2: 24/7 Support */}
          <SupportCard />

          {/* Row 2, Col 3-6: High Performance & Low Latency */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <HighPerformanceCard />
            <LowLatencyCard />
          </div>
        </div>
      </div>
    </div>
  );
}
