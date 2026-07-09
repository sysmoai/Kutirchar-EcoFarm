import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import bn from "../../../i18n/bn.json";
import en from "../../../i18n/en.json";

export type Locale = "bn" | "en";
export type LocaleData = typeof bn;

const locales: Record<Locale, LocaleData> = { bn, en };
const STORAGE_KEY = "kutirchar-lang";

function getInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "bn" || stored === "en") return stored;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return "bn";
}

const LocaleCtx = createContext<{ locale: Locale; t: LocaleData; setLocale: (l: Locale) => void }>({
  locale: "bn",
  t: bn,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const toggle = useCallback((l: Locale) => {
    setLocale(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* persistence unavailable — selection still applies for this session */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleCtx.Provider value={{ locale, t: locales[locale], setLocale: toggle }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleCtx);
}

export function t(path: string, locale: Locale) {
  const keys = path.split(".");
  let val: any = locales[locale];
  for (const k of keys) {
    if (val == null) return path;
    val = val[k];
  }
  return val ?? path;
}
