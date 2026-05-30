'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import languageConfig from '../config/sections/language.json';
import type { LanguageConfig, Language } from '../types/language';
import enTranslations from '../../public/lang/en.json';

const config = languageConfig as LanguageConfig;

interface Translations {
  [key: string]: unknown;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function canUsePreferenceCookies(): boolean {
  if (typeof window === 'undefined') return false;
  const cookieConsent = localStorage.getItem('cookie-consent');
  const cookiePreferences = localStorage.getItem('cookie-preferences');
  if (!cookieConsent || !cookiePreferences) return false;
  try {
    const prefs = JSON.parse(cookiePreferences) as { preferences?: boolean };
    return prefs.preferences === true;
  } catch {
    return false;
  }
}

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  if (!canUsePreferenceCookies()) return 'en';
  const saved = localStorage.getItem('language') as Language | null;
  if (saved && config.availableLanguages.some((l) => l.code === saved)) {
    return saved;
  }
  return 'en';
}

function applyDocumentLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  document.documentElement.lang = lang;
  const languageInfo = config.availableLanguages.find((l) => l.code === lang);
  document.documentElement.dir = languageInfo?.rtl ? 'rtl' : 'ltr';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(enTranslations as Translations);
  const [isLoading, setIsLoading] = useState(false);

  const loadTranslations = useCallback(async (lang: Language) => {
    if (lang === 'en') {
      setTranslations(enTranslations as Translations);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang} translations`);
      }
      const data = (await response.json()) as Translations;
      setTranslations(data);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      setTranslations(enTranslations as Translations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLanguage = getStoredLanguage();
    setLanguage(initialLanguage);
    applyDocumentLanguage(initialLanguage);
    void loadTranslations(initialLanguage);
  }, [loadTranslations]);

  const handleSetLanguage = useCallback(
    async (lang: Language) => {
      setLanguage(lang);
      applyDocumentLanguage(lang);

      if (typeof window !== 'undefined' && canUsePreferenceCookies()) {
        localStorage.setItem('language', lang);
      }

      await loadTranslations(lang);
    },
    [loadTranslations],
  );

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let value: unknown = translations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    },
    [translations],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      translations,
      t,
      isLoading,
    }),
    [language, handleSetLanguage, translations, t, isLoading],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
