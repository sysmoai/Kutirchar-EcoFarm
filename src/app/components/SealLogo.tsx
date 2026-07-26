import logoIcon from "../../imports/image.png";
import { BRAND } from "../brand";

// ─── Types ──────────────────────────────────────────────────────────────────

interface SealLogoProps {
  size?: number;
  mode?: "color" | "dark-green" | "black" | "white";
  background?: string;
}

// ─── Color schemes ───────────────────────────────────────────────────────────

const SCHEME = {
  color:        { stroke: "#1F6B3A", text: "#1F6B3A", bg: "#FFFFFF" },
  "dark-green": { stroke: "#0B4F2A", text: "#0B4F2A", bg: "#FAF7EF" },
  black:        { stroke: "#1E2420", text: "#1E2420", bg: "#FFFFFF" },
  white:        { stroke: "#FFFFFF", text: "#FFFFFF", bg: "#1F6B3A" },
} as const;

const ICON_FILTER: Record<string, string | undefined> = {
  color:        undefined,
  "dark-green": "grayscale(1) sepia(1) saturate(8) hue-rotate(85deg) brightness(0.65)",
  black:        "brightness(0)",
  white:        "brightness(0) invert(1)",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function SealLogo({ size = 240, mode = "color", background }: SealLogoProps) {
  const sc     = SCHEME[mode];
  const bg     = background ?? sc.bg;
  const filter = ICON_FILTER[mode];

  const cx = size / 2;
  const cy = size / 2;

  // ── Expert Proportions ────────────────────────────────────────────────────
  const outerR    = size * 0.484;  // outer ring boundary
  const outerR2   = size * 0.460;  // thin inner band (double-ring)
  const innerRing = size * 0.336;  // inner separator ring

  // ── Matra Pivot Radius (Critical) ─────────────────────────────────────────
  // English text (top) draws up and out from this radius.
  // Bengali text (bottom) draws down and out from this radius (using dominantBaseline="hanging").
  // This locks the Bengali matra exactly to the curve without crushing it.
  const textPivotR  = size * 0.376;
  const dotDist   = size * 0.398;  // visual center of the text band

  // iconW is calculated so the logo circle fills the clip area.
  const iconClipR = innerRing - size * 0.015;
  const iconW     = iconClipR / 0.46;
  const iconX     = cx - iconW / 2;
  const iconY     = cy - iconW / 2;

  // ── Strokes ───────────────────────────────────────────────────────────────
  const outerStroke  = size * 0.023;  // thick outer ring
  const band2Stroke  = size * 0.004;  // thin inner band line
  const innerStroke  = size * 0.008;  // inner separator ring

  // ── Typography ────────────────────────────────────────────────────────────
  const engFontSize  = size * 0.0610;
  const benFontSize  = size * 0.0680;  // +11% optical boost restored to match English visual bulk
  const engSpacing   = size * 0.0175;
  const benSpacing   = 0;              // ZERO tracking for Bengali to prevent broken conjuncts/matras

  // ── Separator dots ────────────────────────────────────────────────────────
  const dotR = size * 0.0220;

  // ── SVG IDs ──────────────────────────────────────────────────────────────
  const uid    = `${size}-${mode}`;
  const topId  = `t${uid}`;
  const botId  = `b${uid}`;
  const clipId = `c${uid}`;

  // ── Arc paths ─────────────────────────────────────────────────────────────
  // Top:  clockwise from left to right
  // Bottom: counter-clockwise from left to right
  const topArc = `M ${cx - textPivotR},${cy} A ${textPivotR},${textPivotR} 0 0,1 ${cx + textPivotR},${cy}`;
  const botArc = `M ${cx - textPivotR},${cy} A ${textPivotR},${textPivotR} 0 0,0 ${cx + textPivotR},${cy}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${BRAND.nameEn} official seal — ${BRAND.nameBn}`}
    >
      <defs>
        <path id={topId} d={topArc} />
        <path id={botId} d={botArc} />
        {/* Clip icon to inner circle — ensures logo never overflows the separator ring */}
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={iconClipR} />
        </clipPath>
      </defs>

      {/* Layer 1 ── Background fill */}
      <circle cx={cx} cy={cy} r={outerR} fill={bg} />

      {/* Layer 2 ── Outer thick ring */}
      <circle
        cx={cx} cy={cy} r={outerR}
        fill="none"
        stroke={sc.stroke}
        strokeWidth={outerStroke}
      />

      {/* Layer 3 ── Inner thin band line (double-ring effect) */}
      <circle
        cx={cx} cy={cy} r={outerR2}
        fill="none"
        stroke={sc.stroke}
        strokeWidth={band2Stroke}
      />

      {/* Layer 4 ── Separator dots */}
      <circle cx={cx - dotDist} cy={cy} r={dotR} fill={sc.stroke} />
      <circle cx={cx + dotDist} cy={cy} r={dotR} fill={sc.stroke} />

      {/* Layer 5 ── English top arc */}
      <text
        fontFamily="'Playfair Display', Georgia, 'Times New Roman', serif"
        fontSize={engFontSize}
        fontWeight="700"
        fill={sc.text}
        letterSpacing={engSpacing}
        textRendering="geometricPrecision"
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          {BRAND.nameEn.toUpperCase()}
        </textPath>
      </text>

      {/* Layer 6 ── Bengali bottom arc */}
      <text
        fontFamily="'Noto Serif Bengali', Georgia, 'Times New Roman', serif"
        fontSize={benFontSize}
        fontWeight="600"
        fill={sc.text}
        letterSpacing={benSpacing}
        textRendering="geometricPrecision"
        dominantBaseline="hanging"
      >
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          {BRAND.nameBn}
        </textPath>
      </text>

      {/* Layer 7 ── Inner separator ring with background fill
           fill={bg} creates a clean white/ivory field behind the icon,
           hiding any text or rings that otherwise bleed into the icon zone */}
      <circle
        cx={cx} cy={cy} r={innerRing}
        fill={bg}
        stroke={sc.stroke}
        strokeWidth={innerStroke}
      />

      {/* Layer 8 ── Center icon (clipped — logo circle fills inner field) */}
      <image
        href={logoIcon}
        x={iconX}
        y={iconY}
        width={iconW}
        height={iconW}
        clipPath={`url(#${clipId})`}
        style={filter ? { filter } : undefined}
      />
    </svg>
  );
}
