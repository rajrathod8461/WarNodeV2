'use client';

import React, { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { NavigationConfig, NavigationItem, DropdownItem } from '../types/navigation';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/LanguageContext'
import {
  Cloud,
  Server,
  Gamepad2,
  Globe,
  Network,
  Info,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Moon,
  Sun,
  FileText,
  Shield,
  Check,
  Database,
  Mail,
  HardDrive,
  Archive,
  ShieldCheck,
  LayoutGrid,
  PhoneCall,
} from 'lucide-react';
import { FaDiscord } from "react-icons/fa6";
import { GrServerCluster } from "react-icons/gr";
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });
import { motion, AnimatePresence } from 'framer-motion';
import navigationConfig from '../config/sections/navigation.json';
import heroConfig from '../config/sections/hero.json';
import discordConfig from '../config/sections/discord.json';
import gamesConfig from '../config/sections/games.json';
import type { HeroConfig } from '../types/hero';
import type { DiscordConfig } from '../types/discord';
import { withLogoVersion } from '../lib/logo';
import uiConfig from '../config/sections/ui.json';

const config = navigationConfig as NavigationConfig;
const heroSettings = heroConfig as HeroConfig;
const navbarLogoSrc = withLogoVersion(
  heroSettings.navbar.logo,
  heroSettings.navbar.logoVersion
);
const WUMPUS_HI = encodeURI(
  (discordConfig as DiscordConfig).wumpusHi ?? "/Wumpus Hi.svg"
);


const iconMap: { [key: string]: React.ElementType } = {
  Cloud,
  Server,
  Gamepad2,
  Globe,
  Network,
  Info,
  User,
  FileText,
  Shield,
  Database,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Moon,
  Sun,
  Mail,
  HardDrive,
  Archive,
  ShieldCheck,
  LayoutGrid,
  PhoneCall,
  FaDiscord,
  GrServerCluster,
};

const getIcon = (iconName: string) => iconMap[iconName];


const ThemeToggle = React.memo(function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  const aria = theme === "light"
    ? "Switch to dark mode"
    : "Switch to light mode"

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8 text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="w-8 h-8 text-muted-foreground hover:text-primary"
      aria-label={aria}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
})


ThemeToggle.displayName = 'ThemeToggle'

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(config.banner.show);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiConfig, setConfettiConfig] = useState({
    recycle: false,
    numberOfPieces: 200,
    gravity: 0.3
  });
  const [showPopup, setShowPopup] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [mobileDropdownStates, setMobileDropdownStates] = useState<{ [key: string]: boolean }>({});
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.desktop-dropdown-container')) {
        setActiveDesktopDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleMobileDropdown = useCallback((itemName: string) => {
    setMobileDropdownStates(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  }, []);
  const gamesList = useMemo(() =>
    (gamesConfig as any).games || [],
    []
  );
  const filteredGames = useMemo(() =>
    heroSettings.hero.games.filter((game: any) => game.showInDropdown),
    [heroSettings.hero.games]
  );

  const handleCopyCode = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(config.banner.couponCode)
        .then(() => {
          setConfettiConfig({
            recycle: false,
            numberOfPieces: 200,
            gravity: 0.3
          });
          setShowConfetti(true);
          setShowPopup(true);
        })
        .catch(() => {
          alert('Failed to copy code. Please try again.');
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = config.banner.couponCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setConfettiConfig({
          recycle: false,
          numberOfPieces: 200,
          gravity: 0.3
        });
        setShowConfetti(true);
        setShowPopup(true);
      } catch (err) {
        alert('Failed to copy code. Please try again.');
      }
      document.body.removeChild(textArea);
    }
  }, [config.banner.couponCode]);

  const handleClosePopup = useCallback(() => {
    setConfettiConfig(prev => ({
      ...prev,
      gravity: 0.8,
      numberOfPieces: prev.numberOfPieces
    }));

    setShowPopup(false);

    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  }, []);

  const renderDropdown = useCallback((item: NavigationItem) => {
    if (item.dropdownType === 'games') {
      return (
        <div
          className={`absolute top-full left-0 rounded-2xl w-[600px] sm:w-[680px] lg:w-[740px] bg-white/95 dark:bg-[#0c0d14]/95 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200 z-50 p-4 ${
            activeDesktopDropdown === item.name
              ? 'opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none -translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gamesList.map((game: any) => (
              <Link
                key={game.id}
                href={`/games?game=${game.id}&location=mumbai&plan=intel`}
                className="relative flex items-center justify-between p-3.5 rounded-xl border border-gray-200/80 dark:border-white/10 overflow-hidden group/card hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.22)] transition-all duration-300 min-h-[96px] bg-gray-50 dark:bg-black/30"
                aria-label={`${game.name} game server hosting`}
                prefetch={true}
              >
                {/* Background Banner with zoom on hover */}
                <Image
                  src={game.banner}
                  alt={game.name}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105 opacity-30 dark:opacity-25"
                  quality={80}
                  loading="lazy"
                />

                {/* Dark Gradient overlay so text is 100% crisp & readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/85 to-gray-950/60 dark:from-[#0c0d14]/95 dark:via-[#0c0d14]/85 dark:to-[#0c0d14]/65 transition-colors duration-300 group-hover/card:opacity-90" />

                {/* Left side: Game Name & 2-line Description */}
                <div className="relative z-10 min-w-0 flex-1 pr-2.5">
                  <h4 className="text-white font-bold text-sm sm:text-base leading-tight group-hover/card:text-blue-400 transition-colors orbitron-font truncate">
                    {game.name}
                  </h4>
                  <p className="text-gray-300 text-xs line-clamp-2 mt-1 leading-snug">
                    {game.description}
                  </p>
                </div>

                {/* Right side: Square Game Icon badge */}
                <div className="relative z-10 w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-white/15 bg-black/40 p-1 shadow-md flex items-center justify-center group-hover/card:border-blue-400/50 transition-colors">
                  <Image
                    src={game.icon || "/icons/cs2-icon.webp"}
                    alt={game.name}
                    fill
                    className="object-contain p-0.5"
                    sizes="44px"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Premium High-End Footer Bar inside Dropdown */}
          <div className="mt-4 pt-3.5 border-t border-gray-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
            <div className="flex items-center flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instant Server Setup</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-medium border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DDoS Protection Included</span>
              </span>
            </div>

            <Link
              href="/games"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all duration-200 group/btn shrink-0"
            >
              <span className="orbitron-font">Explore All Games</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      );
    }

    if (item.dropdownType === 'more' && item.dropdownItems) {
      return (
        <div className={`absolute rounded-b-xl top-full left-1/2 -translate-x-1/2 w-[520px] bg-white/95 dark:bg-black/90 backdrop-blur-md border-t-2 border-top-nav -mt-[2px] shadow-2xl transition-all duration-200 z-10 p-4 ${activeDesktopDropdown === item.name ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
          <div className="grid grid-cols-2 gap-2">
            {item.dropdownItems.map((dropdownItem) => {
              const IconComp = dropdownItem.icon ? getIcon(dropdownItem.icon) : null;
              return (
                <Link
                  key={dropdownItem.name}
                  href={dropdownItem.href}
                  className="flex items-start gap-3 p-3 rounded-lg hover:border-secondary border-primary border hover:hover-gradient transition-all duration-200 group/item"
                  prefetch={true}
                >
                  {IconComp && (
                    <IconComp className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover/item:text-icon-text-primary transition-colors flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover/item:text-icon-text-primary transition-colors mb-1 truncate">
                      {dropdownItem.name}
                    </h3>
                    {dropdownItem.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                        {dropdownItem.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      );
    }

    if (item.dropdownType === 'legal' && item.dropdownItems) {
      return (
        <div className={`absolute rounded-b-xl top-full left-0 w-[280px] bg-white/95 dark:bg-black/90 backdrop-blur-md border-t-2 border-top-nav -mt-[2px] shadow-lg transition-all duration-200 z-10 p-4 ${activeDesktopDropdown === item.name ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
          <div className="space-y-2">
            {item.dropdownItems.map((dropdownItem) => {
              const translatedName = dropdownItem.name === 'Terms of Service' ? t('navbar.termsOfService') :
                dropdownItem.name === 'Privacy Policy' ? t('navbar.privacyPolicy') :
                  dropdownItem.name;
              const translatedDesc = dropdownItem.name === 'Terms of Service' ? t('navbar.termsDescription') :
                dropdownItem.name === 'Privacy Policy' ? t('navbar.privacyDescription') :
                  dropdownItem.description;

              return (
                <Link
                  key={dropdownItem.name}
                  href={dropdownItem.href}
                  className="block p-3 rounded-lg hover:border-secondary border-primary border hover:hover-gradient transition-all duration-200"
                  prefetch={true}
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {translatedName}
                  </h3>
                  {translatedDesc && (
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {translatedDesc}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }, [filteredGames, activeDesktopDropdown, t]);

  const getTranslatedNavName = useCallback((itemName: string) => {
    const navKey = itemName.toLowerCase().replace(/\s+/g, '');
    switch (navKey) {
      case 'games': return t('navbar.games');
      case 'cloud': return t('navbar.cloud');
      case 'dedicated': return t('navbar.dedicated');
      case 'discordbot': return t('navbar.discord');
      case 'webhosting': return t('navbar.webhosting');
      case 'vpshosting': return 'VPS Hosting';
      case 'database':
      case 'databasehosting': return t('navbar.database');
      case 'warshield': return t('navbar.warShield');
      case 'legal': return t('navbar.legal');
      case 'more': return 'More';
      case 'contactus':
      case 'contact': return 'Contact Us';
      default: return itemName;
    }
  }, [t]);

  const renderNavigationItem = useCallback((item: NavigationItem) => {
    const IconComponent = item.icon ? getIcon(item.icon) : null;
    const isActive = item.hasDropdown
      ? pathname.startsWith(item.href)
      : pathname === item.href;
    const translatedName = getTranslatedNavName(item.name);

    if (item.hasDropdown) {
      return (
        <div key={item.name} className="relative group desktop-dropdown-container">
          <Link
            href={item.href}
            onClick={(e) => {
              const isTouchDevice = (typeof window !== 'undefined') && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
              if (isTouchDevice) {
                if (activeDesktopDropdown !== item.name) {
                  e.preventDefault();
                  setActiveDesktopDropdown(item.name);
                } else if (item.href === '#') {
                  e.preventDefault();
                  setActiveDesktopDropdown(null);
                }
              } else if (item.href === '#') {
                e.preventDefault();
              }
            }}
            className={`px-4 py-6 text-sm font-medium relative text-gray-700 dark:text-slate-200 hover:text-icon-text-primary dark:hover:text-icon-text-primary transition-colors flex items-center gap-1.5
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-button-bg dark:after:bg-button-bg after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center
            hover:hover-gradient
            ${isActive ? 'text-icon-text-primary dark:text-icon-text-primary after:scale-x-100 hover-gradient' : ''}`}
            prefetch={true}
          >
            {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
            <span>{translatedName}</span>
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
          </Link>
          {renderDropdown(item)}
        </div>
      );
    }

    return (
      <div
        key={item.name}
        className={`relative ${item.href === "/discord-bot" ? "group/discord overflow-visible" : ""}`}
      >
        {item.href === "/discord-bot" && (
            <div
              className="pointer-events-none absolute left-1/2 top-full z-[60] hidden -translate-x-1/2 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover/discord:opacity-100 group-hover/discord:translate-y-0 md:block"
              aria-hidden
            >
              <div className="origin-top animate-[wumpus-wave_2.2s_ease-in-out_infinite]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={WUMPUS_HI}
                  alt=""
                  className="h-[72px] w-auto -scale-y-100 drop-shadow-[0_8px_20px_rgba(88,101,242,0.45)]"
                  loading="lazy"
                />
              </div>
            </div>
        )}
        <Link
          href={item.href}
          className={`px-4 py-6 text-sm font-medium relative text-gray-700 dark:text-slate-200 hover:text-icon-text-primary dark:hover:text-icon-text-primary transition-colors flex items-center gap-1.5
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-button-bg dark:after:bg-button-bg after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center
        hover:hover-gradient
        ${isActive ? 'text-icon-text-primary dark:text-icon-text-primary after:scale-x-100 hover-gradient' : ''}`}
          prefetch={true}
        >
          {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
          <span>{translatedName}</span>
        </Link>
      </div>
    );
  }, [pathname, renderDropdown, getTranslatedNavName]);

  const mobileSplitRowClass = useCallback((isActive: boolean, side: 'left' | 'right') => {
    const base = isActive
      ? 'card-primary text-icon-text-primary border border-secondary'
      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700';

    if (side === 'left') return `${base} border-r-0 rounded-l-lg`;
    return `${base} border-l-0 rounded-r-lg`;
  }, []);

  const renderMobileSplitNavRow = useCallback((
    key: string,
    label: string,
    icon: React.ElementType | null,
    isActive: boolean,
    isOpen: boolean,
    href?: string,
  ) => (
    <div className="mb-3 flex">
      {href ? (
        <Link
          href={href}
          className={`flex flex-1 items-center space-x-3 px-3 py-3 transition-colors ${mobileSplitRowClass(isActive, 'left')}`}
          onClick={closeMobileMenu}
          prefetch={true}
        >
          {icon && React.createElement(icon, { className: 'h-5 w-5' })}
          <span className="font-medium">{label}</span>
        </Link>
      ) : (
        <div className={`flex flex-1 items-center space-x-3 px-3 py-3 ${mobileSplitRowClass(isActive, 'left')}`}>
          {icon && React.createElement(icon, { className: 'h-5 w-5' })}
          <span className="font-medium">{label}</span>
        </div>
      )}
      <button
        type="button"
        onClick={() => toggleMobileDropdown(key)}
        aria-expanded={isOpen}
        aria-label={`Toggle ${label} menu`}
        className={`px-3 py-3 transition-all duration-200 ${mobileSplitRowClass(isActive, 'right')}`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      </button>
    </div>
  ), [closeMobileMenu, mobileSplitRowClass, toggleMobileDropdown]);

  const renderMobileNavigationItem = useCallback((item: NavigationItem) => {
    const IconComponent = item.icon ? getIcon(item.icon) : null;
    const translatedName = getTranslatedNavName(item.name);

    if (item.hasDropdown && item.dropdownType === 'games') {
      const isActive = pathname.startsWith('/games');
      const isDropdownOpen = mobileDropdownStates[item.name] || false;

      return (
        <div key={item.name}>
          {renderMobileSplitNavRow(item.name, translatedName, IconComponent, isActive, isDropdownOpen, item.href)}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mb-3 ml-2 overflow-hidden"
              >
                <div className="max-h-[50vh] space-y-2 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50/80 p-2 dark:border-gray-700 dark:bg-gray-900/60">
                  {gamesList.map((game: any) => (
                    <Link
                      key={game.id}
                      href={`/games?game=${game.id}&location=mumbai&plan=intel`}
                      className="relative flex items-center justify-between p-2.5 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden text-sm text-gray-700 dark:text-gray-200 transition-colors bg-white/70 dark:bg-black/40 hover:text-icon-text-primary"
                      onClick={closeMobileMenu}
                      aria-label={`${game.name} game server hosting`}
                      prefetch={true}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="truncate font-semibold text-gray-900 dark:text-white">{game.name}</p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {game.description}
                        </p>
                      </div>
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600 bg-black/20 p-0.5">
                        <Image
                          src={game.icon || "/icons/cs2-icon.webp"}
                          alt={game.name}
                          fill
                          sizes="36px"
                          className="object-contain p-0.5"
                          quality={75}
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (item.hasDropdown && item.dropdownType === 'more' && item.dropdownItems) {
      const isActive = item.dropdownItems.some((di) => pathname === di.href);
      const isDropdownOpen = mobileDropdownStates[item.name] || false;

      return (
        <div key={item.name}>
          {renderMobileSplitNavRow(item.name, translatedName, IconComponent, isActive, isDropdownOpen)}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mb-3 ml-2 overflow-hidden"
              >
                <div className="space-y-1 rounded-lg border border-gray-200 bg-gray-50/80 p-2 dark:border-gray-700 dark:bg-gray-800/30">
                  {item.dropdownItems.map((dropdownItem: DropdownItem) => {
                    const DdIcon = dropdownItem.icon ? getIcon(dropdownItem.icon) : null;
                    const itemActive = pathname === dropdownItem.href;
                    return (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                          itemActive
                            ? 'bg-white font-medium text-icon-text-primary dark:bg-gray-800/50'
                            : 'text-gray-600 hover:bg-white hover:text-icon-text-primary dark:text-gray-400 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={closeMobileMenu}
                        prefetch={true}
                      >
                        {DdIcon && <DdIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{dropdownItem.name}</p>
                          {dropdownItem.description && (
                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              {dropdownItem.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    if (item.hasDropdown && item.dropdownType === 'legal' && item.dropdownItems) {
      const isActive = item.dropdownItems.some((dropdownItem) => pathname === dropdownItem.href);
      const isDropdownOpen = mobileDropdownStates[item.name] || false;

      return (
        <div key={item.name}>
          {renderMobileSplitNavRow(item.name, translatedName, IconComponent, isActive, isDropdownOpen)}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mb-3 ml-2 overflow-hidden"
              >
                <div className="space-y-1 rounded-lg border border-gray-200 bg-gray-50/80 p-2 dark:border-gray-700 dark:bg-gray-800/30">
                  {item.dropdownItems.map((dropdownItem: DropdownItem) => {
                    const itemLabel = dropdownItem.name === 'Terms of Service' ? t('navbar.termsOfService') :
                      dropdownItem.name === 'Privacy Policy' ? t('navbar.privacyPolicy') :
                        dropdownItem.name;
                    const itemActive = pathname === dropdownItem.href;

                    return (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                          itemActive
                            ? 'bg-white font-medium text-icon-text-primary dark:bg-gray-800/50'
                            : 'text-gray-600 hover:bg-white hover:text-icon-text-primary dark:text-gray-400 dark:hover:bg-gray-800/50'
                        }`}
                        onClick={closeMobileMenu}
                        prefetch={true}
                      >
                        {itemLabel}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    const isActive = pathname === item.href;
    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center justify-between w-full px-3 py-3 rounded-lg transition-colors mb-2 ${isActive
          ? 'card-primary text-icon-text-primary border border-secondary'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }`}
        onClick={closeMobileMenu}
        prefetch={true}
      >
        <div className="flex items-center space-x-3">
          {IconComponent && <IconComponent className="w-5 h-5" />}
          <span className="font-medium">{translatedName}</span>
        </div>
        <ChevronRight className="w-4 h-4" />
      </Link>
    );
  }, [pathname, closeMobileMenu, filteredGames, mobileDropdownStates, renderMobileSplitNavRow, getTranslatedNavName, t]);

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>

      {showConfetti && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={confettiConfig.recycle}
            numberOfPieces={confettiConfig.numberOfPieces}
            gravity={confettiConfig.gravity}
          />
        </div>
      )}


      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute backdrop-blur-sm inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClosePopup}
            />
            <motion.div
              className="relative bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-secondary rounded-lg p-8 max-w-sm mx-4 text-center shadow-2xl"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 20
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4
              }}
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  damping: 20,
                  stiffness: 300
                }}
              >
                <div className="w-16 h-16 card-primary rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 icon-text-primary" />
                </div>
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Coupon Code Copied!
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                The coupon code has been copied to your clipboard.
              </motion.p>
              <motion.button
                onClick={handleClosePopup}
                className="w-full button-primary text-icon-text-primary px-6 py-3 rounded-lg font-semibold hover:hover-gradient border border-transparent hover:border-secondary transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 20
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.4
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ok, Thank you!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showBanner && config.banner.show && (
        <div
          className={`relative text-white text-sm py-3 px-4 transition-colors duration-300 ${!config.banner.useThemeColor ? config.banner.backgroundColor : ''
            }`}
          style={{
            backgroundColor: config.banner.useThemeColor
              ? 'var(--button-primary)'
              : undefined
          }}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex items-center justify-center space-x-2 sm:space-x-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 icon-text-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="icon-text-primary text-xs font-bold">%</span>
                </div>
                <span className="text-xs sm:text-sm md:text-base text-white font-medium">{config.banner.text}</span>
                <button
                  onClick={handleCopyCode}
                  className="bg-white/20 hover:bg-white/30 px-1.5 sm:px-2 md:px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 text-white border border-white/30 hover:border-white/50"
                >
                  {config.banner.couponCode}
                </button>
              </div>
              <button
                className="text-white hover:text-white/90 transition-colors flex-shrink-0"
                onClick={() => setShowBanner(false)}
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>
      )}


      <nav className={`fixed -mt-1 left-0 right-0 z-50 overflow-visible bg-white/90 dark:bg-[#10121b]/20 backdrop-blur-xs border-b border-gray-200/60 dark:border-[#272a32]/10 transition-all duration-300 ${isScrolled ? 'top-0' : (showBanner ? 'top-[52px]' : 'top-0')}`}>
        <div className="px-4 sm:px-0 max-w-7xl mx-auto">
          <div className="flex items-center">

            <div className="flex-shrink-0 flex items-center mr-6">
              <Link
                href="/"
                className="flex items-center space-x-3"
                aria-label="Go to homepage"
                prefetch={true}
              >
                <Image
                  src={navbarLogoSrc}
                  alt={`${heroSettings.navbar.brandName}${heroSettings.navbar.brandAccent}`}
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                  width={160}
                  height={48}
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 128px, 160px"
                />
                <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white orbitron-font">
                  {heroSettings.navbar.brandName}<span className="icon-text-primary">{heroSettings.navbar.brandAccent}</span>
                </span>
              </Link>
            </div>


            <div className="hidden md:flex md:items-center overflow-visible gap-0.5">
              {config.mainNavigation.map((item) => renderNavigationItem(item))}
            </div>


            <div className="hidden md:flex md:items-center md:space-x-4 ml-auto overflow-visible">
              <ThemeToggle />

              <div className="relative">
                <a
                  href={config.clientSpace.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center space-x-2 button-primary text-button-primary border border-transparent px-3 sm:px-4 py-2 rounded-lg orbitron-font text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] hover:border-[var(--border-secondary)]"
                >
                  {config.clientSpace.icon && getIcon(config.clientSpace.icon) && React.createElement(getIcon(config.clientSpace.icon), { className: "w-4 h-4" })}
                  <span>{t('navbar.clientSpace')}</span>
                </a>
                {uiConfig.christmasTheme.enabled && (
                  <>
                    <Image
                      src="/christmas/button-deco-up.png"
                      alt="Christmas decoration"
                      width={32}
                      height={32}
                      className="absolute -top-2 -right-2 pointer-events-none hidden sm:block"
                    />
                    <Image
                      src="/christmas/button-deco-down.png"
                      alt="Christmas decoration"
                      width={32}
                      height={32}
                      className="absolute -bottom-2 -left-2 pointer-events-none hidden sm:block"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center py-2 md:hidden ml-auto">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-icon-primary hover:text-icon-text-primary transition-colors relative"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Menu</span>
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} />
                </motion.div>
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 0 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
              id="mobile-menu"
              className="md:hidden bg-white dark:bg-[#10121b] border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="divide-y divide-gray-200 dark:divide-gray-700"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1
                }}
              >
                  <motion.div
                  className="px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {config.mainNavigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        delay: 0.1 + (index * 0.05),
                        duration: 0.2
                      }}
                    >
                      {renderMobileNavigationItem(item)}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="px-4 py-4 bg-gray-50/50 dark:bg-gray-800/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="flex items-center justify-between py-2 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                    <ThemeToggle />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <a
                      href={config.clientSpace.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 button-primary text-button-primary border border-transparent px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 w-full shadow-sm hover:shadow-md hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] hover:border-[var(--border-secondary)]"
                      onClick={closeMobileMenu}
                    >
                      {config.clientSpace.icon && getIcon(config.clientSpace.icon) && React.createElement(getIcon(config.clientSpace.icon), { className: "w-4 h-4" })}
                      <span>{t('navbar.clientSpace')}</span>
                    </a>
                    {uiConfig.christmasTheme.enabled && (
                      <>
                        <Image
                          src="/christmas/button-deco-up.png"
                          alt="Christmas decoration"
                          width={32}
                          height={32}
                          className="absolute -top-2 -right-2 pointer-events-none"
                        />
                        <Image
                          src="/christmas/button-deco-down.png"
                          alt="Christmas decoration"
                          width={32}
                          height={32}
                          className="absolute -bottom-2 -left-2 pointer-events-none"
                        />
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;