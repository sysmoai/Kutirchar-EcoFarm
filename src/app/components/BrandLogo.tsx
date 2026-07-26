import logoIcon from "../../imports/image.png";
import { BRAND } from "../brand";

export interface BrandLogoProps {
  iconSize?: number;
  variant?: "horizontal" | "stacked" | "icon-only";
  bilingual?: boolean;
  bengaliFirst?: boolean;
  mode?: "color" | "dark-green" | "black" | "white" | "watermark";
  showTagline?: boolean;
  showShortDesc?: boolean;
  className?: string;
}

// ─── Color maps ───────────────────────────────────────────────────────────────

const FILTERS: Record<string, string> = {
  color:       "none",
  "dark-green":"grayscale(1) sepia(1) saturate(8) hue-rotate(85deg) brightness(0.65)",
  black:       "brightness(0)",
  white:       "brightness(0) invert(1)",
  // Watermark uses NO filter — logo keeps its colours and shape.
  // Opacity is applied via style.opacity below so K, cattle, solar
  // and the circular border remain visible at low opacity.
  watermark:   "none",
};

const TEXT_COLOR: Record<string, string> = {
  color:       "#1F6B3A",
  "dark-green":"#0B4F2A",
  black:       "#000000",
  white:       "#FFFFFF",
  watermark:   "rgba(31,107,58,0.12)",  // faint brand green, not black
};

const ACCENT_COLOR: Record<string, string> = {
  color:       "#4F9A3D",
  "dark-green":"#1F6B3A",
  black:       "#333333",
  white:       "rgba(255,255,255,0.75)",
  watermark:   "rgba(31,107,58,0.08)",  // tagline — even fainter brand green
};

// ─── Component ────────────────────────────────────────────────────────────────

export function BrandLogo({
  iconSize = 64,
  variant = "horizontal",
  bilingual = false,
  bengaliFirst = false,
  mode = "color",
  showTagline = false,
  showShortDesc = false,
  className = "",
}: BrandLogoProps) {
  const filter      = FILTERS[mode];
  const textColor   = TEXT_COLOR[mode];
  const accentColor = ACCENT_COLOR[mode];

  // ── Icon ──────────────────────────────────────────────────────────────────
  const iconEl = (
    <img
      src={logoIcon}
      alt="Kutirchar EcoFarm icon"
      style={{
        width: iconSize,
        height: iconSize,
        objectFit: "contain",
        filter: (filter && filter !== "none") ? filter : undefined,
        // Watermark: opacity 0.10 preserves the logo's shape while
        // making it faint enough to sit behind document content.
        opacity: mode === "watermark" ? 0.10 : undefined,
        flexShrink: 0,
        display: "block",
      }}
    />
  );

  // ── English name ──────────────────────────────────────────────────────────
  // Playfair Display 600 is the authoritative wordmark for English.
  const engEl = (
    <span style={{
      fontFamily:    "'Playfair Display', Georgia, serif",
      fontWeight:    600,
      fontSize:      iconSize * 0.280,   // primary size anchor
      color:         textColor,
      letterSpacing: "0.020em",
      lineHeight:    1.15,
      display:       "block",
    }}>
      {BRAND.nameEn}
    </span>
  );

  // ── Bengali name ──────────────────────────────────────────────────────────
  // Sibling wordmark to the English. Both are DISPLAY SERIFS with matching
  // stroke contrast and elegant curves, so the pair reads as one family:
  //   Playfair Display 600   → high-contrast display serif
  //   Noto Serif Bengali 600 → high-contrast Bangla display serif (matched weight)
  // Bengali font size is increased slightly (~14%) so its x-height and visual bulk
  // balance perfectly with the English uppercase ascenders.
  const benEl = (
    <span style={{
      fontFamily:    "'Noto Serif Bengali', Georgia, serif",
      fontWeight:    600,
      fontSize:      iconSize * 0.320,   // bumped up to visually match English size
      color:         textColor,
      letterSpacing: "0",
      lineHeight:    1.40,               // room for matras without feeling loose
      display:       "block",
      opacity:       1,
    }}>
      {BRAND.nameBn}
    </span>
  );

  // ── Bilingual separator ───────────────────────────────────────────────────
  // A 1px rule between the two names — gives the pair a unified, professional
  // bilingual identity (standard in government, bank, and UN bilingual marks).
  const sep = (
    <div style={{
      height:     "1px",
      background: textColor,
      opacity:    mode === "watermark" ? 0.04 : 0.20,
      margin:     `${iconSize * 0.055}px 0`,
      display:    "block",
      width:      "100%",
    }} />
  );

  // ── Tagline ───────────────────────────────────────────────────────────────
  const taglineEl = showTagline ? (
    <span style={{
      fontFamily:    "'Inter', sans-serif",
      fontWeight:    400,
      fontSize:      iconSize * 0.140,
      color:         accentColor,
      letterSpacing: "0.050em",
      display:       "block",
      marginTop:     iconSize * 0.08,
      textTransform: "uppercase" as const,
    }}>
      {BRAND.tagline}
    </span>
  ) : null;

  // ── Short descriptor ──────────────────────────────────────────────────────
  const shortDescEl = showShortDesc ? (
    <span style={{
      fontFamily:    "'Inter', sans-serif",
      fontWeight:    400,
      fontSize:      iconSize * 0.155,
      color:         accentColor,
      letterSpacing: "0.060em",
      display:       "block",
      marginTop:     iconSize * 0.06,
    }}>
      {BRAND.shortDesc}
    </span>
  ) : null;

  if (variant === "icon-only") {
    return <div className={className}>{iconEl}</div>;
  }

  // ── Name order: bengaliFirst puts Bengali on top ──────────────────────────
  const primaryEl   = bengaliFirst ? benEl   : engEl;
  const secondaryEl = bilingual    ? (bengaliFirst ? engEl : benEl) : null;

  // ── Horizontal ────────────────────────────────────────────────────────────
  if (variant === "horizontal") {
    return (
      <div
        className={className}
        style={{ display: "flex", alignItems: "center", gap: iconSize * 0.20 }}
      >
        {iconEl}
        <div>
          {primaryEl}
          {secondaryEl && sep}
          {secondaryEl}
          {taglineEl}
          {shortDescEl}
        </div>
      </div>
    );
  }

  // ── Stacked ───────────────────────────────────────────────────────────────
  return (
    <div
      className={className}
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           iconSize * 0.16,
      }}
    >
      {iconEl}
      <div style={{ textAlign: "center" }}>
        {primaryEl}
        {secondaryEl && sep}
        {secondaryEl}
        {taglineEl}
        {shortDescEl}
      </div>
    </div>
  );
}
