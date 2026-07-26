import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import bn from "../../../i18n/bn.json";
import en from "../../../i18n/en.json";

export type Locale = "bn" | "en";
export type LocaleData = typeof bn;

const locales: Record<Locale, LocaleData> = { bn, en };
const STORAGE_KEY = "kutirchar-lang";

function getInitialLocale(): Locale {
  // Explicit ?lang= param wins (shareable language-specific links)
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "bn" || param === "en") return param;
  } catch {
    /* URL parsing unavailable — fall through */
  }
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

// ── Locale digit helpers (used by CountUp stats etc.) ───────────────────────
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Render a number using Bangla numerals when locale is bn. */
export function toLocaleDigits(n: number | string, locale: Locale): string {
  const s = String(n);
  return locale === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;
}

/** Parse a display number like "~৮০" or "~80" into { value, prefix, suffix }. */
export function parseLocaleNumber(raw: string): { value: number; prefix: string; suffix: string } {
  const ascii = raw.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
  const m = ascii.match(/-?\d+(?:\.\d+)?/);
  if (!m || m.index === undefined) return { value: 0, prefix: raw, suffix: "" };
  return {
    value: parseFloat(m[0]),
    prefix: raw.slice(0, m.index),
    suffix: raw.slice(m.index + m[0].length),
  };
}
