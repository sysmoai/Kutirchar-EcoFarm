import { useState, useCallback, type ReactNode } from "react";
import { BRAND } from "../../brand";
import logoIcon from "../../../imports/image.png";
import { SectionHeader, Card } from "./Section00MasterLogo";

// ─── Core Utilities ──────────────────────────────────────────────────────────

async function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("load failed"));
    img.src = src;
  });
}

function save(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url); resolve();
    }, "image/png");
  });
}

const FILTERS: Record<string, string | undefined> = {
  color: undefined,
  "dark-green": "grayscale(1) sepia(1) saturate(8) hue-rotate(85deg) brightness(0.65)",
  black: "brightness(0)",
  white: "brightness(0) invert(1)",
};

// ─── Icon PNG (with optional filter + bg) ────────────────────────────────────

async function dlIconPNG(size: number, filename: string, filter?: string, bg?: string, opacity?: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size); }
  const img = await loadImg(logoIcon);
  if (filter) ctx.filter = filter;
  if (opacity !== undefined) ctx.globalAlpha = opacity;
  ctx.drawImage(img, 0, 0, size, size);
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  await save(c, filename);
}

// ─── Branded Banner (icon + text on colored background) ──────────────────────

interface BannerOpts {
  bgColor: string;
  iconFilter?: string;
  textColor: string;
  subColor: string;
  layout: "center" | "left";
  showTagline?: boolean;
  showBengali?: boolean;
}

async function dlBannerPNG(w: number, h: number, filename: string, opts: BannerOpts) {
  await document.fonts.ready;
  const scale = w >= 2000 ? 1 : 2;
  const c = document.createElement("canvas");
  c.width = w * scale; c.height = h * scale;
  const ctx = c.getContext("2d")!;
  ctx.scale(scale, scale);

  ctx.fillStyle = opts.bgColor;
  ctx.fillRect(0, 0, w, h);

  const img = await loadImg(logoIcon);
  const shorter = Math.min(w, h);
  const iconSize = Math.round(shorter * (opts.layout === "center" ? 0.45 : 0.52));
  const iconFilter = opts.iconFilter;

  if (opts.layout === "center") {
    const ix = (w - iconSize) / 2;
    // When there is text below the icon, push icon up to 12% from top.
    // Otherwise centre the icon vertically.
    const iy = (opts.showTagline || opts.showBengali) ? h * 0.12 : (h - iconSize) / 2;
    if (iconFilter) ctx.filter = iconFilter;
    ctx.drawImage(img, ix, iy, iconSize, iconSize);
    ctx.filter = "none";

    const textY = iy + iconSize + h * 0.06;
    ctx.textAlign = "center";

    if (opts.showBengali) {
      // Both names SAME size — expert bilingual match
      const nameFontPx = Math.round(h * 0.075);
      const benFontPx = Math.round(nameFontPx * 1.14); // +14% optical boost
      ctx.fillStyle = opts.textColor;
      ctx.font = `600 ${nameFontPx}px "Playfair Display", Georgia, serif`;
      ctx.fillText("Kutirchar EcoFarm", w / 2, textY);
      // Thin separator (matches BrandLogo separator)
      const sepY = textY + nameFontPx * 0.9;
      ctx.save(); ctx.globalAlpha = 0.20; ctx.fillStyle = opts.textColor;
      ctx.fillRect(w * 0.25, sepY, w * 0.50, 1); ctx.restore();
      ctx.fillStyle = opts.textColor;             // same color — equal standing
      ctx.font = `600 ${benFontPx}px "Noto Serif Bengali", Georgia, serif`; // Upsized for optical match
      ctx.fillText("কুটিরচর ইকোফার্ম", w / 2, textY + h * 0.115);
      if (opts.showTagline) {
        ctx.fillStyle = opts.subColor;
        ctx.font = `400 ${Math.round(h * 0.036)}px "Inter", sans-serif`;
        ctx.fillText("Smart Cattle & Circular Energy Ecosystem", w / 2, textY + h * 0.210);
      }
    } else {
      ctx.fillStyle = opts.textColor;
      ctx.font = `600 ${Math.round(h * 0.088)}px "Playfair Display", Georgia, serif`;
      ctx.fillText("Kutirchar EcoFarm", w / 2, textY);
      if (opts.showTagline) {
        ctx.fillStyle = opts.subColor;
        ctx.font = `400 ${Math.round(h * 0.04)}px "Inter", sans-serif`;
        ctx.fillText("Smart Cattle & Circular Energy Ecosystem", w / 2, textY + h * 0.12);
      }
    }
  } else {
    // left layout — icon left, text right
    const pad = w * 0.05;
    const iy = (h - iconSize) / 2;
    if (iconFilter) ctx.filter = iconFilter;
    ctx.drawImage(img, pad, iy, iconSize, iconSize);
    ctx.filter = "none";

    const tx = pad + iconSize + w * 0.04;
    const tyBase = opts.showBengali ? h * 0.35 : h * 0.45;
    ctx.textAlign = "left";

    // Both names SAME size — expert bilingual match
    const namePx = Math.round(h * 0.18);
    const benNamePx = Math.round(namePx * 1.14); // +14% optical boost
    ctx.fillStyle = opts.textColor;
    ctx.font = `600 ${namePx}px "Playfair Display", Georgia, serif`;
    ctx.fillText("Kutirchar EcoFarm", tx, tyBase);

    if (opts.showBengali) {
      // Thin separator line between names
      const sepY2 = tyBase + namePx * 0.85;
      ctx.save(); ctx.globalAlpha = 0.20; ctx.fillStyle = opts.textColor;
      ctx.fillRect(tx, sepY2, w * 0.4, 1); ctx.restore();
      ctx.fillStyle = opts.textColor;              // equal color — equal standing
      ctx.font = `600 ${benNamePx}px "Noto Serif Bengali", Georgia, serif`; // Upsized for optical match
      ctx.fillText("কুটিরচর ইকোফার্ম", tx, tyBase + h * 0.255);
    }
    if (opts.showTagline) {
      ctx.fillStyle = opts.subColor;
      ctx.font = `400 ${Math.round(h * 0.09)}px "Inter", sans-serif`;
      ctx.fillText("Smart Cattle & Circular Energy Ecosystem", tx, tyBase + (opts.showBengali ? h * 0.42 : h * 0.24));
    }
  }

  await save(c, filename);
}

// ─── Logo Lockup (icon + text rendered to canvas) ────────────────────────────

async function dlLockup(
  type: "english" | "bilingual" | "bengali-first" | "stacked-en" | "stacked-bi",
  mode: "color" | "black" | "white",
  filename: string
) {
  await document.fonts.ready;
  const stacked = type.startsWith("stacked");
  const W = stacked ? 400 : 880; const H = stacked ? 420 : 170;
  const scale = 2;
  const c = document.createElement("canvas");
  c.width = W * scale; c.height = H * scale;
  const ctx = c.getContext("2d")!;
  ctx.scale(scale, scale);

  const bg  = mode === "white" ? "#0B4F2A" : "#FAF7EF";
  const tc  = mode === "white" ? "#FFFFFF" : mode === "black" ? "#000000" : "#1F6B3A";
  // sc was previously used for secondary text but all text now uses tc (equal standing).
  const flt = FILTERS[mode === "color" ? "color" : mode];

  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const img = await loadImg(logoIcon);

  // Helper: draw a 1px separator between the two name lines (matches BrandLogo)
  function drawSep(x1: number, x2: number, y: number) {
    ctx.save();
    ctx.globalAlpha = 0.20;
    ctx.fillStyle = tc;
    ctx.fillRect(x1, y, x2 - x1, 1);
    ctx.restore();
  }

  if (stacked) {
    // ── Icon centred near top ─────────────────────────────────────────────
    const is = 150; const ix = (W - is) / 2;
    if (flt) ctx.filter = flt;
    ctx.drawImage(img, ix, 24, is, is);    // icon: y=24 → 174
    ctx.filter = "none"; ctx.textAlign = "center";
    if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0.02em"; }

    if (type === "stacked-bi") {
      ctx.fillStyle = tc;
      ctx.font = `600 30px "Playfair Display", Georgia, serif`;
      ctx.fillText(BRAND.nameEn, W / 2, 278);
      drawSep(W * 0.22, W * 0.78, 285);          // separator at 278+30*0.2+1.65 = 285
      ctx.fillStyle = tc;
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0px"; }
      ctx.font = `600 34px "Noto Serif Bengali", Georgia, serif`; // 30px + 14% optical boost
      ctx.fillText(BRAND.nameBn, W / 2, 310);  // 285+1+1.65+30*0.73 = 310
    } else {
      ctx.fillStyle = tc;
      ctx.font = `600 30px "Playfair Display", Georgia, serif`;
      ctx.fillText(BRAND.nameEn, W / 2, 302);
    }
  } else {
    // ── Horizontal: icon left, text right ────────────────────────────────
    const is = 110; const iy = (H - is) / 2;
    if (flt) ctx.filter = flt;
    ctx.drawImage(img, 36, iy, is, is);
    ctx.filter = "none"; ctx.textAlign = "left";

    if (type === "bilingual") {
      // Both English 36px, Bengali 41px (+14% optical boost)
      ctx.fillStyle = tc; 
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0.02em"; }
      ctx.font = `600 36px "Playfair Display", Georgia, serif`;
      ctx.fillText(BRAND.nameEn, 176, 75);
      drawSep(176, W - 36, 90);              // gap: eng_bottom(82) → sep(90) = 8px ✓
      ctx.fillStyle = tc; 
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0px"; }
      ctx.font = `600 41px "Noto Serif Bengali", Georgia, serif`;
      ctx.fillText(BRAND.nameBn, 176, 120); // sep(91)→ben_top(120-26=94) = 3px ✓

    } else if (type === "bengali-first") {
      // Bengali 39px (+14% optical boost), English 34px
      ctx.fillStyle = tc; 
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0px"; }
      ctx.font = `600 39px "Noto Serif Bengali", Georgia, serif`;
      ctx.fillText(BRAND.nameBn, 176, 74);
      drawSep(176, W - 36, 89);             // gap: ben_bottom(81)→sep(89) = 8px ✓
      ctx.fillStyle = tc; 
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0.02em"; }
      ctx.font = `600 34px "Playfair Display", Georgia, serif`;
      ctx.fillText(BRAND.nameEn, 176, 117); // sep(90)→eng_top(117-25=92)= 2px ✓

    } else {
      // English only — vertically centre in H=170
      ctx.fillStyle = tc; 
      if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0.02em"; }
      ctx.font = `600 42px "Playfair Display", Georgia, serif`;
      ctx.fillText(BRAND.nameEn, 176, 97);  // centred: 97 ≈ H/2 + 42*0.73/2
    }
  }
  
  if ("letterSpacing" in ctx) { (ctx as any).letterSpacing = "0px"; }
  await save(c, filename);
}

// ─── Seal SVG + PNG ──────────────────────────────────────────────────────────

const SEAL_COLORS = {
  color:        { stroke: "#1F6B3A", bg: "#FFFFFF" },
  "dark-green": { stroke: "#0B4F2A", bg: "#FAF7EF" },
  black:        { stroke: "#1E2420", bg: "#FFFFFF" },
  white:        { stroke: "#FFFFFF", bg: "#1F6B3A" },
} as const;

// ── Font embedding for seals ─────────────────────────────────────────────────
// An SVG rasterised via new Image() renders in an isolated context WITHOUT access
// to the page's web fonts. To keep the seal's arc text in the real brand fonts
// (Playfair Display + Noto Serif Bengali) — and to guarantee the Bengali script
// shapes correctly even on systems with no Bengali system font — we embed a
// glyph-subset of each font directly into the SVG as a base64 @font-face.

function ab2b64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

const _fontCache: Record<string, string> = {};

// Fetch a single-subset @font-face (only the glyphs in `text`) and inline it.
async function embedFont(family: string, weight: number): Promise<string> {
  const key = `${family}|${weight}`;
  if (_fontCache[key] !== undefined) return _fontCache[key];
  
  // CRITICAL FIX: We MUST NOT use the `&text=` subsetting API for Bengali. 
  // Google Fonts subsetting strips out the GSUB/GPOS OpenType tables required for 
  // complex script shaping (conjuncts and the continuous top 'matra').
  // By fetching the full CSS, we retain all shaping rules so the text renders perfectly.
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`;
  let css = await (await fetch(cssUrl)).text();
  
  // Extract all WOFF2 URLs (Google splits full fonts into multiple unicode ranges)
  const urls = Array.from(css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)).map(m => m[1]);
  if (urls.length === 0) throw new Error("no woff2 url");
  
  const uniqueUrls = [...new Set(urls)];
  for (const url of uniqueUrls) {
    const buf = await (await fetch(url)).arrayBuffer();
    const b64 = ab2b64(buf);
    // Inject the base64 payload directly into the CSS
    css = css.split(url).join(`data:font/woff2;base64,${b64}`);
  }
  
  _fontCache[key] = css;
  return css;
}

// Build the <style> block embedding both arc fonts. Never throws — on any
// failure it returns "" so the seal still renders using system font fallbacks.
async function sealFontStyle(): Promise<string> {
  try {
    const [eng, ben] = await Promise.all([
      embedFont("Playfair Display", 700),
      embedFont("Noto Serif Bengali", 600),
    ]);
    return `<style>${eng}${ben}</style>`;
  } catch {
    return "";
  }
}

// Rasterise the master icon to a base64 PNG at `px` resolution. `px` tracks the
// seal's output size so the embedded icon stays crisp at large PNG/SVG scales
// (the icon fills ~0.73× the seal, so 1024 covers seals up to ~1400px).
async function getBase64(filter?: string, px = 1024): Promise<string> {
  const c = document.createElement("canvas"); c.width = c.height = px;
  const ctx = c.getContext("2d")!;
  const img = await loadImg(logoIcon);
  if (filter) ctx.filter = filter;
  ctx.drawImage(img, 0, 0, px, px);
  ctx.filter = "none";
  return c.toDataURL("image/png");
}

function sealSVG(b64: string, stroke: string, bg: string, size = 400, fontStyle = ""): string {
  const cx = size / 2;
  const cy = size / 2;
  // ── Proportions — must match SealLogo.tsx exactly ────────────────────────
  const outerR    = size * 0.484;
  const outerR2   = size * 0.460;
  const innerRing = size * 0.336;
  const topTextR  = size * 0.376;
  const botTextR  = size * 0.376; // matched to topTextR — Bengali anchored via dominant-baseline="hanging"
  const dotDist   = size * 0.398;
  const iconClipR = innerRing - size * 0.015;
  const iconW     = iconClipR / 0.46;          // logo circle fills clip field
  const iconX     = cx - iconW / 2;
  const iconY     = cy - iconW / 2;
  const dotR      = size * 0.0220;
  const engSize   = size * 0.0610;
  const benSize   = size * 0.0680; // +11% optical boost — matches SealLogo.tsx benFontSize
  const engSpc    = size * 0.0175;
  const benSpc    = 0; // ZERO tracking for Bengali to prevent broken conjuncts
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${BRAND.nameEn} official seal — ${BRAND.nameBn}">
  <defs>
    ${fontStyle}
    <path id="t" d="M ${cx-topTextR},${cy} A ${topTextR},${topTextR} 0 0,1 ${cx+topTextR},${cy}"/>
    <path id="b" d="M ${cx-botTextR},${cy} A ${botTextR},${botTextR} 0 0,0 ${cx+botTextR},${cy}"/>
    <clipPath id="ic"><circle cx="${cx}" cy="${cy}" r="${iconClipR}"/></clipPath>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="${bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${stroke}" stroke-width="${size*0.023}"/>
  <circle cx="${cx}" cy="${cy}" r="${outerR2}" fill="none" stroke="${stroke}" stroke-width="${size*0.004}"/>
  <circle cx="${cx-dotDist}" cy="${cy}" r="${dotR}" fill="${stroke}"/>
  <circle cx="${cx+dotDist}" cy="${cy}" r="${dotR}" fill="${stroke}"/>
  <text font-family="'Playfair Display',Georgia,'Times New Roman',serif" font-size="${engSize}" font-weight="700" fill="${stroke}" letter-spacing="${engSpc}" text-rendering="geometricPrecision">
    <textPath href="#t" startOffset="50%" text-anchor="middle">${BRAND.nameEn.toUpperCase()}</textPath>
  </text>
  <text font-family="'Noto Serif Bengali',Georgia,'Times New Roman',serif" font-size="${benSize}" font-weight="600" fill="${stroke}" letter-spacing="${benSpc}" text-rendering="geometricPrecision" dominant-baseline="hanging">
    <textPath href="#b" startOffset="50%" text-anchor="middle">${BRAND.nameBn}</textPath>
  </text>
  <circle cx="${cx}" cy="${cy}" r="${innerRing}" fill="${bg}" stroke="${stroke}" stroke-width="${size*0.008}"/>
  <image href="${b64}" x="${iconX}" y="${iconY}" width="${iconW}" height="${iconW}" clip-path="url(#ic)"/>
</svg>`;
}

async function dlSealSVG(mode: keyof typeof SEAL_COLORS) {
  const { stroke, bg } = SEAL_COLORS[mode];
  const [b64, fontStyle] = await Promise.all([getBase64(FILTERS[mode]), sealFontStyle()]);
  const svg = sealSVG(b64, stroke, bg, 400, fontStyle);
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const a = document.createElement("a"); a.href = url;
  a.download = `kutirchar-ecofarm-seal-${mode}.svg`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function dlSealPNG(mode: keyof typeof SEAL_COLORS, size: number) {
  await document.fonts.ready;
  const { stroke, bg } = SEAL_COLORS[mode];
  // Icon fills ~0.73× the seal; embed at ≥ that resolution so it stays crisp.
  const [b64, fontStyle] = await Promise.all([getBase64(FILTERS[mode], Math.max(1024, Math.ceil(size * 0.75))), sealFontStyle()]);
  const svgStr = sealSVG(b64, stroke, bg, size, fontStyle);
  const svgUrl = URL.createObjectURL(new Blob([svgStr], { type: "image/svg+xml" }));
  const svgImg = await loadImg(svgUrl);
  URL.revokeObjectURL(svgUrl);
  const c = document.createElement("canvas"); c.width = c.height = size;
  c.getContext("2d")!.drawImage(svgImg, 0, 0, size, size);
  await save(c, `kutirchar-ecofarm-seal-${mode}-${size}px.png`);
}

// ─── Component ───────────────────────────────────────────────────────────────

type DLS = "idle" | "busy" | "done" | "error";
type Tab = "social" | "icons" | "lockups" | "seal" | "favicons";

export function Section11ExportAssets() {
  const [status, setStatus] = useState<Record<string, DLS>>({});
  const [tab, setTab] = useState<Tab>("social");

  const run = useCallback(async (key: string, fn: () => Promise<void>) => {
    setStatus((s) => ({ ...s, [key]: "busy" }));
    try {
      await fn();
      setStatus((s) => ({ ...s, [key]: "done" }));
      setTimeout(() => setStatus((s) => ({ ...s, [key]: "idle" })), 2500);
    } catch {
      setStatus((s) => ({ ...s, [key]: "error" }));
      setTimeout(() => setStatus((s) => ({ ...s, [key]: "idle" })), 3000);
    }
  }, []);

  function Btn({ id, label, fn, wide }: { id: string; label?: string; fn: () => Promise<void>; wide?: boolean }) {
    const st = status[id] ?? "idle";
    const txt = { idle: label ?? "↓ Download PNG", busy: "Generating...", done: "✓ Saved", error: "✕ Failed" }[st];
    
    return (
      <button onClick={() => run(id, fn)} disabled={st === "busy"}
        style={{ 
          background: st === "done" ? "#f0f9f3" : st === "busy" ? "#fafafa" : "#ffffff", 
          border: st === "done" ? "1px solid #c0ddc8" : "1px solid #cce8d6", 
          color: st === "done" ? "#0B4F2A" : st === "busy" ? "#888" : "#1F6B3A",
          borderRadius: 8, padding: wide ? "9px 22px" : "7px 16px",
          fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600,
          cursor: st === "busy" ? "wait" : "pointer", transition: "all 0.15s",
          whiteSpace: "nowrap" as const, letterSpacing: "0.02em",
          boxShadow: st === "idle" ? "0 1px 3px rgba(31,107,58,0.08)" : "none" 
        }}
        onMouseEnter={(e) => { if(st === "idle") { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.borderColor = "#a3d3b6"; } }}
        onMouseLeave={(e) => { if(st === "idle") { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#cce8d6"; } }}
      >
        {txt}
      </button>
    );
  }

  const DARK_BANNER: BannerOpts = { bgColor: "#0B4F2A", iconFilter: FILTERS.white, textColor: "#FFFFFF", subColor: "rgba(255,255,255,0.75)", layout: "center", showBengali: true, showTagline: true };
  const DARK_WIDE:   BannerOpts = { bgColor: "#0B4F2A", iconFilter: FILTERS.white, textColor: "#FFFFFF", subColor: "rgba(255,255,255,0.72)", layout: "left",   showBengali: true, showTagline: true };
  const IVORY_BANNER:BannerOpts = { bgColor: "#FAF7EF", iconFilter: undefined,    textColor: "#1F6B3A", subColor: "#4F9A3D",                  layout: "center", showBengali: true, showTagline: true };

  const tabs: { id: Tab; label: string }[] = [
    { id: "social",  label: "Social Media" },
    { id: "icons",   label: "Icon Pack" },
    { id: "lockups", label: "Logo Lockups" },
    { id: "seal",    label: "Seal / Stamp" },
    { id: "favicons",label: "Favicon Pack" },
  ];

  return (
    <div>
      <SectionHeader num="11" title="Export Assets" desc="Download every brand asset directly from the browser — platform-ready social media files, high-resolution icon packs, logo lockups with text, SVG seals, and favicon sets. All generated live from the master icon." />

      {/* Tab Nav */}
      <div className="flex flex-wrap gap-1 mb-8 p-1.5 rounded-xl w-fit" style={{ background: "#f0fdf4", border: "1px solid #cce8d6" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? "#1F6B3A" : "transparent",
              color: tab === t.id ? "white" : "#2F4F3D",
              borderRadius: 8, padding: "8px 20px",
              fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s ease-in-out",
              boxShadow: tab === t.id ? "0 2px 4px rgba(31,107,58,0.2)" : "none"
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SOCIAL MEDIA TAB ── */}
      {tab === "social" && (
        <div className="space-y-6">

          {/* YouTube */}
          <Card label="YouTube">
            <PlatformHint text="YouTube Channel Icon displays as a circle. Channel Banner safe zone is the central 1546×423px — keep logo inside this area. Thumbnail is 16:9." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="yt-icon-800"   label="Channel Icon" size="800×800px"  sub="Displays as circle on YouTube"   fn={() => dlIconPNG(800, "youtube-channel-icon-800.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="yt-icon-800w"  label="Channel Icon (White on Green)" size="800×800px" sub="Dark bg variant" fn={() => dlIconPNG(800, "youtube-channel-icon-dark.png", FILTERS.white, "#0B4F2A")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round bg="#0B4F2A" filter={FILTERS.white} />} />
              <AssetRow id="yt-banner"     label="Channel Banner" size="2560×1440px" sub="Full-res. Safe zone 1546×423px" fn={() => dlBannerPNG(2560, 1440, "youtube-channel-banner-2560x1440.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={80} h={22} bg="#0B4F2A" />} />
              <AssetRow id="yt-banner-iv"  label="Channel Banner (Ivory)" size="2560×1440px" sub="Light background variant" fn={() => dlBannerPNG(2560, 1440, "youtube-channel-banner-ivory.png", IVORY_BANNER)} run={run} status={status} preview={<BannerThumb w={80} h={22} bg="#FAF7EF" />} />
              <AssetRow id="yt-thumb"      label="Video Thumbnail" size="1280×720px" sub="16:9 video thumbnail" fn={() => dlBannerPNG(1280, 720, "youtube-thumbnail-1280x720.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={72} h={40} bg="#0B4F2A" />} />
              <AssetRow id="yt-thumb-iv"   label="Video Thumbnail (Ivory)" size="1280×720px" sub="Light background" fn={() => dlBannerPNG(1280, 720, "youtube-thumbnail-ivory.png", IVORY_BANNER)} run={run} status={status} preview={<BannerThumb w={72} h={40} bg="#FAF7EF" />} />
            </div>
          </Card>

          {/* Facebook */}
          <Card label="Facebook">
            <PlatformHint text="Facebook Profile Photo displays as circle at 170×170px on desktop. Cover Photo is 851×315px — keep important content centred." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="fb-icon"       label="Profile Photo" size="180×180px"  sub="Displays as circle"       fn={() => dlIconPNG(180, "facebook-profile-180.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="fb-icon-1k"    label="Profile Photo HiRes" size="1000×1000px" sub="High DPI screens"  fn={() => dlIconPNG(1000, "facebook-profile-1000.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="fb-cover"      label="Cover Photo (Dark)" size="851×315px" sub="Desktop cover"       fn={() => dlBannerPNG(851, 315, "facebook-cover-dark-851x315.png", DARK_WIDE)} run={run} status={status} preview={<BannerThumb w={80} h={30} bg="#0B4F2A" />} />
              <AssetRow id="fb-cover-iv"   label="Cover Photo (Ivory)" size="851×315px" sub="Light background"   fn={() => dlBannerPNG(851, 315, "facebook-cover-ivory-851x315.png", { ...DARK_WIDE, bgColor:"#FAF7EF", iconFilter: undefined, textColor:"#1F6B3A", subColor:"#4F9A3D" })} run={run} status={status} preview={<BannerThumb w={80} h={30} bg="#FAF7EF" />} />
              <AssetRow id="fb-post"       label="Post Image" size="1200×630px"  sub="Link preview / post"       fn={() => dlBannerPNG(1200, 630, "facebook-post-1200x630.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={72} h={38} bg="#0B4F2A" />} />
              <AssetRow id="fb-story"      label="Story" size="1080×1920px"  sub="Vertical story format"        fn={() => dlBannerPNG(1080, 1920, "facebook-story-1080x1920.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={28} h={50} bg="#0B4F2A" />} />
            </div>
          </Card>

          {/* Instagram */}
          <Card label="Instagram">
            <PlatformHint text="Instagram Profile Photo displays as circle at 110×110px. Use square posts for feed; 1080×1350px portrait gets more screen real estate. Stories are 9:16." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="ig-icon"       label="Profile Photo" size="320×320px"  sub="Displays as circle"     fn={() => dlIconPNG(320, "instagram-profile-320.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="ig-post-sq"    label="Post — Square" size="1080×1080px" sub="Standard feed post"   fn={() => dlBannerPNG(1080, 1080, "instagram-post-square-1080.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={44} h={44} bg="#0B4F2A" />} />
              <AssetRow id="ig-post-pt"    label="Post — Portrait" size="1080×1350px" sub="More feed visibility" fn={() => dlBannerPNG(1080, 1350, "instagram-post-portrait-1080x1350.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={35} h={44} bg="#0B4F2A" />} />
              <AssetRow id="ig-story"      label="Story / Reel Cover" size="1080×1920px" sub="Vertical 9:16"   fn={() => dlBannerPNG(1080, 1920, "instagram-story-1080x1920.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={28} h={50} bg="#0B4F2A" />} />
              <AssetRow id="ig-post-iv"    label="Post — Square (Ivory)" size="1080×1080px" sub="Light variant"  fn={() => dlBannerPNG(1080, 1080, "instagram-post-square-ivory.png", IVORY_BANNER)} run={run} status={status} preview={<BannerThumb w={44} h={44} bg="#FAF7EF" />} />
            </div>
          </Card>

          {/* Twitter / X */}
          <Card label="Twitter / X">
            <PlatformHint text="Profile Photo displays as circle at 400×400px. Header image is 1500×500px — logo and text in the centre third is safest across all screen sizes." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="tw-icon"       label="Profile Photo" size="400×400px"  sub="Displays as circle"    fn={() => dlIconPNG(400, "twitter-profile-400.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="tw-header"     label="Header Banner (Dark)" size="1500×500px" sub="Profile header" fn={() => dlBannerPNG(1500, 500, "twitter-header-dark-1500x500.png", DARK_WIDE)} run={run} status={status} preview={<BannerThumb w={80} h={27} bg="#0B4F2A" />} />
              <AssetRow id="tw-header-iv"  label="Header Banner (Ivory)" size="1500×500px" sub="Light variant" fn={() => dlBannerPNG(1500, 500, "twitter-header-ivory-1500x500.png", { ...DARK_WIDE, bgColor:"#FAF7EF", iconFilter: undefined, textColor:"#1F6B3A", subColor:"#4F9A3D" })} run={run} status={status} preview={<BannerThumb w={80} h={27} bg="#FAF7EF" />} />
              <AssetRow id="tw-post"       label="Post Image" size="1200×675px"  sub="16:9 post card"         fn={() => dlBannerPNG(1200, 675, "twitter-post-1200x675.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={72} h={40} bg="#0B4F2A" />} />
            </div>
          </Card>

          {/* LinkedIn */}
          <Card label="LinkedIn">
            <PlatformHint text="Company Logo shows at 300×300px on company page. Background Banner is 1584×396px — very wide, keep logo within the central 60%." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="li-logo"       label="Company Logo" size="300×300px"   sub="Company page logo"   fn={() => dlIconPNG(300, "linkedin-company-logo-300.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} />} />
              <AssetRow id="li-profile"    label="Profile Photo" size="400×400px"  sub="Personal profile"   fn={() => dlIconPNG(400, "linkedin-profile-400.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="li-banner"     label="Background Banner (Dark)" size="1584×396px" sub="Company page banner" fn={() => dlBannerPNG(1584, 396, "linkedin-banner-dark-1584x396.png", DARK_WIDE)} run={run} status={status} preview={<BannerThumb w={80} h={20} bg="#0B4F2A" />} />
              <AssetRow id="li-banner-iv"  label="Background Banner (Ivory)" size="1584×396px" sub="Light variant" fn={() => dlBannerPNG(1584, 396, "linkedin-banner-ivory-1584x396.png", { ...DARK_WIDE, bgColor:"#FAF7EF", iconFilter: undefined, textColor:"#1F6B3A", subColor:"#4F9A3D" })} run={run} status={status} preview={<BannerThumb w={80} h={20} bg="#FAF7EF" />} />
              <AssetRow id="li-post"       label="Post Image" size="1200×627px"  sub="Feed post"            fn={() => dlBannerPNG(1200, 627, "linkedin-post-1200x627.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={72} h={38} bg="#0B4F2A" />} />
            </div>
          </Card>

          {/* WhatsApp + TikTok */}
          <Card label="WhatsApp · TikTok · Telegram">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <AssetRow id="wa-icon"       label="WhatsApp Profile Photo" size="500×500px"  sub="Displays as circle"         fn={() => dlIconPNG(500, "whatsapp-profile-500.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="wa-status"     label="WhatsApp Status" size="1080×1920px" sub="Vertical status format"      fn={() => dlBannerPNG(1080, 1920, "whatsapp-status-1080x1920.png", DARK_BANNER)} run={run} status={status} preview={<BannerThumb w={28} h={50} bg="#0B4F2A" />} />
              <AssetRow id="tt-icon"       label="TikTok Profile Photo" size="200×200px"   sub="Minimum recommended size"  fn={() => dlIconPNG(200, "tiktok-profile-200.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="tt-icon-hd"    label="TikTok Profile Photo HiRes" size="800×800px" sub="High quality"           fn={() => dlIconPNG(800, "tiktok-profile-800.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
              <AssetRow id="tg-icon"       label="Telegram Profile Photo" size="512×512px" sub="Recommended size"          fn={() => dlIconPNG(512, "telegram-profile-512.png")} run={run} status={status} preview={<Thumb src={logoIcon} size={40} round />} />
            </div>
          </Card>

          {/* All Profile Icons Quick Pack */}
          <Card label="Quick Pack — All Profile Icons">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Download all platform profile icons in one go.</p>
            <div className="flex flex-wrap gap-2">
              <Btn id="all-profiles" label="↓ Download All Profile Icons (7 files)" wide fn={async () => {
                const sizes = [{ s: 1080, n: "all-profile-1080.png" }, { s: 800, n: "all-profile-800.png" }, { s: 500, n: "all-profile-500.png" }, { s: 400, n: "all-profile-400.png" }, { s: 320, n: "all-profile-320.png" }, { s: 200, n: "all-profile-200.png" }, { s: 180, n: "all-profile-180.png" }];
                for (const { s, n } of sizes) { await dlIconPNG(s, `kutirchar-ecofarm-${n}`); await new Promise(r => setTimeout(r, 250)); }
              }} />
            </div>
          </Card>
        </div>
      )}

      {/* ── ICON PACK TAB ── */}
      {tab === "icons" && (
        <div className="space-y-6">
          <Card label="Full-Color Icon — All Sizes">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>Original master icon on transparent background.</p>
            <div className="flex flex-wrap gap-2">
              {[1024,512,256,128,64,48,32,16].map(sz => (
                <Btn key={sz} id={`ic-col-${sz}`} label={`${sz}px`} fn={() => dlIconPNG(sz, `kutirchar-ecofarm-icon-${sz}px.png`)} />
              ))}
            </div>
          </Card>
          <Card label="Black Icon — All Sizes">
            <div className="flex flex-wrap gap-2">
              {[1024,512,256,128,64,32].map(sz => (
                <Btn key={sz} id={`ic-blk-${sz}`} label={`${sz}px`} fn={() => dlIconPNG(sz, `kutirchar-ecofarm-icon-black-${sz}px.png`, FILTERS.black)} />
              ))}
            </div>
          </Card>
          <Card label="White Icon (on Dark Green background)">
            <div className="flex flex-wrap gap-2">
              {[1024,512,256,128,64,32].map(sz => (
                <Btn key={sz} id={`ic-wht-${sz}`} label={`${sz}px`} fn={() => dlIconPNG(sz, `kutirchar-ecofarm-icon-white-${sz}px.png`, FILTERS.white, "#0B4F2A")} />
              ))}
            </div>
          </Card>
          <Card label="Dark Green Monochrome Icon">
            <div className="flex flex-wrap gap-2">
              {[512,256,128,64].map(sz => (
                <Btn key={sz} id={`ic-dg-${sz}`} label={`${sz}px`} fn={() => dlIconPNG(sz, `kutirchar-ecofarm-icon-dark-green-${sz}px.png`, FILTERS["dark-green"])} />
              ))}
            </div>
          </Card>
          <Card label="Watermark Icon — 10% Opacity (for document backgrounds)">
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666", marginBottom: 12 }}>
              Logo at 10% opacity with transparent background. Place behind document content on bank reports, official letters, and PDFs. The icon retains its full colour and shape — K, cattle, solar, and circular form all visible as a ghost.
            </p>
            <div className="flex flex-wrap gap-2">
              {[1024,512,256,128].map(sz => (
                <Btn key={sz} id={`ic-wm-${sz}`} label={`${sz}px`} fn={() => dlIconPNG(sz, `kutirchar-ecofarm-watermark-${sz}px.png`, undefined, undefined, 0.10)} />
              ))}
            </div>
          </Card>

          <Card label="Download All (Full Color)">
            <Btn id="all-icons" label="↓ All 8 sizes (Full Color)" wide fn={async () => {
              for (const sz of [1024,512,256,128,64,48,32,16]) {
                await dlIconPNG(sz, `kutirchar-ecofarm-icon-${sz}px.png`);
                await new Promise(r => setTimeout(r, 200));
              }
            }} />
          </Card>
        </div>
      )}

      {/* ── LOCKUPS TAB ── */}
      {tab === "lockups" && (
        <Card label="Logo Lockups — Icon + Text (PNG @2x)">
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#666", marginBottom: 16 }}>Rendered with Playfair Display (English) + Noto Serif Bengali (Bangla) — matched serif siblings. Exported @2x for retina quality.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {([
              // ── Horizontal lockups ──────────────────────────────────────────
              { id:"lu-en-col",  t:"english",       m:"color", f:"kutirchar-ecofarm-logo-english.png",               l:"Horizontal — English (Color)" },
              { id:"lu-en-blk",  t:"english",       m:"black", f:"kutirchar-ecofarm-logo-english-black.png",          l:"Horizontal — English (Black)" },
              { id:"lu-en-wht",  t:"english",       m:"white", f:"kutirchar-ecofarm-logo-english-white.png",          l:"Horizontal — English (White on Green)" },
              { id:"lu-bi-col",  t:"bilingual",     m:"color", f:"kutirchar-ecofarm-logo-bilingual.png",              l:"Horizontal — Bilingual (Color)" },
              { id:"lu-bi-blk",  t:"bilingual",     m:"black", f:"kutirchar-ecofarm-logo-bilingual-black.png",        l:"Horizontal — Bilingual (Black)" },
              { id:"lu-bi-wht",  t:"bilingual",     m:"white", f:"kutirchar-ecofarm-logo-bilingual-white.png",        l:"Horizontal — Bilingual (White on Green)" },
              { id:"lu-bn-col",  t:"bengali-first", m:"color", f:"kutirchar-ecofarm-logo-bengali-first.png",          l:"Horizontal — Bengali-First (Color)" },
              { id:"lu-bn-blk",  t:"bengali-first", m:"black", f:"kutirchar-ecofarm-logo-bengali-first-black.png",    l:"Horizontal — Bengali-First (Black)" },
              { id:"lu-bn-wht",  t:"bengali-first", m:"white", f:"kutirchar-ecofarm-logo-bengali-first-white.png",    l:"Horizontal — Bengali-First (White on Green)" },
              // ── Stacked lockups ─────────────────────────────────────────────
              { id:"lu-st-col",  t:"stacked-en",    m:"color", f:"kutirchar-ecofarm-logo-stacked-english.png",        l:"Stacked — English (Color)" },
              { id:"lu-st-blk",  t:"stacked-en",    m:"black", f:"kutirchar-ecofarm-logo-stacked-english-black.png",  l:"Stacked — English (Black)" },
              { id:"lu-st-ewht", t:"stacked-en",    m:"white", f:"kutirchar-ecofarm-logo-stacked-english-white.png",  l:"Stacked — English (White on Green)" },
              { id:"lu-st-bi",   t:"stacked-bi",    m:"color", f:"kutirchar-ecofarm-logo-stacked-bilingual.png",      l:"Stacked — Bilingual (Color)" },
              { id:"lu-st-bblk", t:"stacked-bi",    m:"black", f:"kutirchar-ecofarm-logo-stacked-bilingual-black.png",l:"Stacked — Bilingual (Black)" },
              { id:"lu-st-wht",  t:"stacked-bi",    m:"white", f:"kutirchar-ecofarm-logo-stacked-bilingual-white.png",l:"Stacked — Bilingual (White on Green)" },
            ] as const).map(item => (
              <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ background:"#f7fbf8", border:"1px solid #e0eed5" }}>
                <div>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:600, color:"#1E2420" }}>{item.l}</p>
                  <p style={{ fontFamily:"'Inter',monospace", fontSize:10, color:"#aaa", marginTop:1 }}>{item.f}</p>
                </div>
                <Btn id={item.id} fn={() => dlLockup(item.t as any, item.m as any, item.f)} />
              </div>
            ))}
          </div>
          {/* Download All Lockups */}
          <div style={{ borderTop: "1px solid #e0eed5", marginTop: 16, paddingTop: 16, display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            <Btn id="lu-all-color" label="↓ All Color Lockups (5 files)" wide fn={async () => {
              const batch = [
                { t:"english" as const,       m:"color" as const, f:"kutirchar-ecofarm-logo-english.png" },
                { t:"bilingual" as const,     m:"color" as const, f:"kutirchar-ecofarm-logo-bilingual.png" },
                { t:"bengali-first" as const, m:"color" as const, f:"kutirchar-ecofarm-logo-bengali-first.png" },
                { t:"stacked-en" as const,    m:"color" as const, f:"kutirchar-ecofarm-logo-stacked-english.png" },
                { t:"stacked-bi" as const,    m:"color" as const, f:"kutirchar-ecofarm-logo-stacked-bilingual.png" },
              ];
              for (const { t, m, f } of batch) { await dlLockup(t, m, f); await new Promise(r => setTimeout(r, 300)); }
            }} />
            <Btn id="lu-all-white" label="↓ All White (Green bg) Lockups" wide fn={async () => {
              const batch = [
                { t:"english" as const,    m:"white" as const, f:"kutirchar-ecofarm-logo-english-white.png" },
                { t:"bilingual" as const,  m:"white" as const, f:"kutirchar-ecofarm-logo-bilingual-white.png" },
                { t:"stacked-bi" as const, m:"white" as const, f:"kutirchar-ecofarm-logo-stacked-bilingual-white.png" },
              ];
              for (const { t, m, f } of batch) { await dlLockup(t, m, f); await new Promise(r => setTimeout(r, 300)); }
            }} />
          </div>
        </Card>
      )}

      {/* ── SEAL TAB ── */}
      {tab === "seal" && (
        <Card label="Seal / Stamp Pack">
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#666", marginBottom:16 }}>SVG seals are fully self-contained — the brand arc fonts (Playfair Display + Noto Serif Bengali) are embedded, so they render identically in any tool even without the fonts installed. PNG seals are rasterized from the same source at the specified pixel size.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(["color","dark-green","black","white"] as const).map(mode => (
              <div key={mode} className="p-4 rounded-lg" style={{ background: SEAL_COLORS[mode].bg, border:"1px solid #e0eed5" }}>
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color: SEAL_COLORS[mode].stroke, marginBottom:12, letterSpacing:"0.06em", textTransform:"uppercase" as const }}>{mode.replace("-"," ")} Seal</p>
                <div className="flex flex-wrap gap-2">
                  <Btn id={`sl-svg-${mode}`}  label="SVG"     fn={() => dlSealSVG(mode)} />
                  <Btn id={`sl-200-${mode}`}  label="PNG 200" fn={() => dlSealPNG(mode, 200)} />
                  <Btn id={`sl-400-${mode}`}  label="PNG 400" fn={() => dlSealPNG(mode, 400)} />
                  <Btn id={`sl-800-${mode}`}  label="PNG 800" fn={() => dlSealPNG(mode, 800)} />
                  <Btn id={`sl-1200-${mode}`} label="PNG 1200" fn={() => dlSealPNG(mode, 1200)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ── FAVICONS TAB ── */}
      {tab === "favicons" && (
        <Card label="Favicon Pack">
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"#666", marginBottom:16 }}>All sizes needed for web browsers, iOS home screen, and Android. Use 32px as the default web favicon.</p>
          <div className="flex flex-wrap gap-4 mb-6">
            {[16,32,48,64,96,128,180,512].map(sz => (
              <div key={sz} className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ background:"#f7fbf8", border:"1px solid #e0eed5" }}>
                <img src={logoIcon} alt="" style={{ width: Math.min(sz, 64), height: Math.min(sz, 64), objectFit:"contain", imageRendering: sz <= 32 ? "pixelated" : "auto" }} />
                <span style={{ fontFamily:"'Inter',monospace", fontSize:10, color:"#888" }}>{sz}×{sz}</span>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:"#aaa", textAlign:"center" }}>
                  {sz===16?"Browser tab":sz===32?"Standard":sz===48?"Desktop":sz===64?"HiDPI":sz===96?"HiRes":sz===128?"App":sz===180?"Apple Touch":"PWA"}
                </span>
                <Btn id={`fav-${sz}`} label="↓ PNG" fn={() => dlIconPNG(sz, `favicon-${sz}x${sz}.png`)} />
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #e0eed5", paddingTop:16 }}>
            <Btn id="fav-all" label="↓ Download All 8 Favicon Sizes" wide fn={async () => {
              for (const sz of [16,32,48,64,96,128,180,512]) {
                await dlIconPNG(sz, `favicon-${sz}x${sz}.png`);
                await new Promise(r => setTimeout(r, 200));
              }
            }} />
          </div>
        </Card>
      )}

      {/* Platform Size Reference */}
      <div className="mt-6 p-4 rounded-xl" style={{ background:"#f7fbf8", border:"1px solid #e0eed5" }}>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"#1F6B3A", marginBottom:10, letterSpacing:"0.06em" }}>PLATFORM SIZE REFERENCE</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {[
            ["YouTube Channel Icon","800×800px"],["YouTube Banner","2560×1440px"],["YouTube Thumbnail","1280×720px"],
            ["Facebook Profile","180×180px"],["Facebook Cover","851×315px"],["Facebook Post","1200×630px"],
            ["Instagram Profile","320×320px"],["Instagram Post","1080×1080px"],["Instagram Story","1080×1920px"],
            ["Twitter/X Profile","400×400px"],["Twitter/X Header","1500×500px"],["Twitter/X Post","1200×675px"],
            ["LinkedIn Profile","400×400px"],["LinkedIn Banner","1584×396px"],["LinkedIn Post","1200×627px"],
            ["WhatsApp Photo","500×500px"],["TikTok Profile","200×200px"],["Telegram Profile","512×512px"],
          ].map(([label, size]) => (
            <div key={label} style={{ fontFamily:"'Inter',sans-serif", fontSize:10 }}>
              <span style={{ color:"#888" }}>{label}:</span>{" "}
              <span style={{ color:"#1F6B3A", fontWeight:600, fontFamily:"'Inter',monospace" }}>{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Helper sub-components ───────────────────────────────────────────────────

function PlatformHint({ text }: { text: string }) {
  return (
    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"#888", lineHeight:1.55, background:"#f7fbf8", padding:"8px 12px", borderRadius:6, border:"1px solid #e5eee9", marginBottom:4 }}>
      💡 {text}
    </p>
  );
}

function Thumb({ src, size, round, bg, filter }: { src: string; size: number; round?: boolean; bg?: string; filter?: string }) {
  // Use a subtle checkerboard pattern for transparent backgrounds so users can see the transparency
  const bgStyle = bg || `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="4" height="4" fill="%23f0f0f0"/><rect x="4" y="4" width="4" height="4" fill="%23f0f0f0"/><rect x="4" width="4" height="4" fill="%23ffffff"/><rect y="4" width="4" height="4" fill="%23ffffff"/></svg>')`;

  return (
    <div style={{ width:size, height:size, borderRadius: round ? "50%" : 8, overflow:"hidden", background: bgStyle, border: bg ? "none" : "1px solid #e0eed5", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)" }}>
      <img src={src} alt="" style={{ width:"85%", height:"85%", objectFit:"contain", filter }} />
    </div>
  );
}

function BannerThumb({ w, h, bg }: { w: number; h: number; bg: string }) {
  const isLight = bg === "#FAF7EF" || bg === "#FFFFFF" || bg === "white";
  const iconFilter = isLight ? undefined : "brightness(0) invert(1)";
  const iconSize = Math.round(Math.min(h, w) * 0.65);
  return (
    <div style={{ width:w, height:h, borderRadius:6, background:bg,
      border: isLight ? "1px solid #d0e0d5" : "1px solid transparent",
      flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.06)" }}>
      <img src={logoIcon} alt="" style={{ width:iconSize, height:iconSize, objectFit:"contain", filter: iconFilter, opacity: isLight ? 0.85 : 0.9 }} />
    </div>
  );
}

function AssetRow({ id, label, size, sub, fn, run, status, preview }: {
  id: string; label: string; size: string; sub: string; fn: () => Promise<void>;
  run: (key: string, fn: () => Promise<void>) => void;
  status: Record<string, DLS>;
  preview: ReactNode;
}) {
  const st = status[id] ?? "idle";
  const txt = { idle:"↓ Download PNG", busy:"Generating...", done:"✓ Saved", error:"✕ Failed" }[st];
  
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200" 
         style={{ background:"#ffffff", border:"1px solid #e0eed5", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}
         onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c0ddc8"}
         onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e0eed5"}>
      {preview}
      <div style={{ flex:1, minWidth:0 }}>
        <div className="flex items-center gap-2 mb-1">
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:700, color:"#1E2420" }}>{label}</p>
          <span style={{ fontFamily:"'Inter',monospace", fontSize:10, color:"#1F6B3A", fontWeight:700, background:"#f0f9f3", padding:"2px 6px", borderRadius:4, letterSpacing:"0.04em" }}>{size}</span>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"#6b7280", lineHeight: 1.4 }}>{sub}</p>
      </div>
      <button onClick={() => run(id, fn)} disabled={st === "busy"}
        style={{ background: st === "done" ? "#f0f9f3" : st === "busy" ? "#fafafa" : "#1F6B3A", 
          border: st === "done" ? "1px solid #c0ddc8" : "1px solid transparent",
          color: st === "done" ? "#0B4F2A" : st === "busy" ? "#888" : "#ffffff",
          borderRadius: 8, padding:"8px 16px", fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:600,
          cursor: st === "busy" ? "wait" : "pointer", transition:"all 0.15s", whiteSpace:"nowrap" as const, flexShrink:0,
          boxShadow: st === "idle" ? "0 2px 6px rgba(31,107,58,0.2)" : "none" }}>
        {txt}
      </button>
    </div>
  );
}
