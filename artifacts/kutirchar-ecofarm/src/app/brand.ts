// ─── Kutirchar EcoFarm — Brand Constants ─────────────────────────────────────
// Single source of truth. All components read from here.

export const BRAND = {
  nameEn:    "Kutirchar EcoFarm",
  nameBn:    "কুটিরচর ইকোফার্ম",
  owner:     "Emon Hossain",
  tagline:   "Smart Cattle & Circular Energy Ecosystem",
  shortDesc: "Dairy · Biogas · Solar · Silage",
  phase:     "Verification & Foundation Phase",
  location: {
    village:  "Kutirchar",
    union:    "Bhadraghat",
    upazila:  "Kamarkhanda",
    district: "Sirajganj",
    country:  "Bangladesh",
    full:     "Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh",
  },
  contact: {
    email:    "info@kutircharecofarm.com",
    website:  "kutircharecofarm.com",
    // Left empty on purpose: no fabricated numbers are published. When a real,
    // verified line exists, set it here and the footer/contact channels auto-enable.
    whatsapp: "" as string,
    phone:    "" as string,
  },
  zoneA: "10 decimal private/core land",
  zoneB: "12 decimal non-private/ejmali — removable use only",
} as const;

export const COLORS = {
  kutircharGreen: "#1F6B3A",
  deepFarmGreen:  "#0B4F2A",
  fieldGreen:     "#4F9A3D",
  fieldMist:      "#EEF5EA",
  documentIvory:  "#FAF7EF",
  charcoalText:   "#1E2420",
  solarGold:      "#F2B544",
  verificationYellow: "#F4C430", // certification badges / verified-status indicators only
  riverBlue:      "#2E6F8E",
  soilBrown:      "#4A2F1B",
  bioOlive:       "#708238",
  bioOliveDeep:   "#5E6E30", // WCAG-AA olive for small text on light backgrounds (~5:1)
  riskRed:        "#B42318",
  govGray:        "#4B5563",
} as const;

// ─── Bilingual type system ───────────────────────────────────────────────────
// English and Bangla mirror each other so the two names read as ONE family:
//   Display / wordmark  →  serif        (Playfair Display  ↔  Noto Serif Bengali)
//   Body / UI           →  sans         (Inter             ↔  Noto Sans Bengali)
// Both display faces share high stroke-contrast + elegant curves; both body
// faces are humanist, low-contrast, and highly legible at small sizes.
export const FONTS = {
  serif:        "'Playfair Display', Georgia, serif",       // English display + wordmark
  serifBengali: "'Noto Serif Bengali', Georgia, serif",     // Bangla display + wordmark (pairs with serif)
  sans:         "'Inter', 'Manrope', sans-serif",           // English body / UI
  bengali:      "'Noto Sans Bengali', sans-serif",          // Bangla body / UI (pairs with sans)
  mono:         "'Inter', monospace",
} as const;

// Phase chip colours
export const PHASE_COLORS = {
  Now:   { bg: "#f0f9f3", text: COLORS.kutircharGreen, border: "#c0ddc8", dot: COLORS.kutircharGreen },
  Next:  { bg: "#eff6fb", text: COLORS.riverBlue,      border: "#b8d4e0", dot: COLORS.riverBlue },
  // text uses a deeper olive (#5E6E30 ≈ 5.1:1 on bg) for WCAG AA; dot/border keep the brand olive
  Later: { bg: "#f5f6ee", text: COLORS.bioOliveDeep,   border: "#cdd4a8", dot: COLORS.bioOlive },
} as const;
