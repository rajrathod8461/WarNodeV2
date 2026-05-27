"use client"

import { motion } from "framer-motion"
import { FaDiscord } from "react-icons/fa6"
import { useLanguage } from "../contexts/LanguageContext"
import warnodesConfig from "../config/sections/warnodes.json"
import discordConfig from "../config/sections/discord.json"
import type { DiscordConfig } from "../types/discord"

const config = discordConfig as DiscordConfig
const WUMPUS_HI = encodeURI(config.wumpusHi ?? "/Wumpus Hi.svg")
const WUMPUS_DANCE = encodeURI(config.wumpusDance ?? "/Wumpus series - wumpus dance.svg")

export default function DiscordBanner() {
    const { t } = useLanguage();
    const discordUrl = warnodesConfig.links.discord;

    return (
        <div className=" py-18 px-4 sm:px-6 lg:px-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                <div className="relative backdrop-blur-sm bg-blue-500 dark:bg-blue-700/80 overflow-hidden rounded-md border border-gray-600/20 dark:border-gray-400/10 p-8 md:p-12">
                    <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                        <FaDiscord className="absolute top-4 left-4 w-16 h-16 text-white" />
                        <FaDiscord className="absolute bottom-6 left-1/3 w-10 h-10 text-white" />
                    </div>

                    <motion.div
                        className="pointer-events-none absolute -bottom-4 right-2 z-10 hidden sm:block"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1, rotate: [-5, 5, -5] }}
                        transition={{
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            rotate: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                        }}
                        aria-hidden
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={WUMPUS_DANCE}
                            alt=""
                            className="h-28 w-auto md:h-36 drop-shadow-lg"
                            loading="lazy"
                        />
                    </motion.div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:pr-36 lg:pr-44">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <motion.div
                                    className="hidden shrink-0 sm:block"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                                    aria-hidden
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={WUMPUS_HI}
                                        alt=""
                                        className="h-16 w-auto md:h-20"
                                        loading="lazy"
                                    />
                                </motion.div>
                                <a
                                    href={discordUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center md:justify-start gap-3 "
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white orbitron-font">
                                        {t('discordBanner.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-200 dark:text-blue-400">{t('discordBanner.title').split(' ').slice(-1)[0]}</span>
                                    </h2>
                                </a>

                            </div>
                            <p className="text-xl text-white mb-2">
                                {t('discordBanner.subtitle')}
                            </p>
                            <p className=" text-white">
                                {t('discordBanner.description')}
                            </p>

                        </div>

                        <div className="flex-shrink-0">
                            <a
                                href={discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block transition-all duration-300 hover:scale-105"
                            >
                                <img
                                    src="/joinus.png"
                                    alt="Join Discord"
                                    className="w-auto h-12 md:h-16 "
                                />
                            </a>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    )
}
