// ─── Reusable motion primitives ──────────────────────────────────────────────
// All animations: transform/opacity only. Reduced motion is honored globally
// via <MotionConfig reducedMotion="user"> in App.tsx; components that run
// continuous animation (Marquee) additionally gate on useReducedMotion().
import * as React from "react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { useLocale } from "./i18n";

// ── Reveal: fade + slide into view (once) ───────────────────────────────────
export function Reveal({
  children, delay = 0, y = MOTION.distance, x = 0, duration = MOTION.dur.slow,
  once = true, style,
}: {
  children: React.ReactNode; delay?: number; y?: number; x?: number;
  duration?: number; once?: boolean; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: MOTION.viewportMargin }}
      transition={{ duration, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container + items ────────────────────────────────────────────────
const staggerContainer = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const staggerItem = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: MOTION.dur.slow * 0.75, ease: EASE } },
});

export function Stagger({
  children, stagger = MOTION.stagger, delay = 0, once = true, style,
}: {
  children: React.ReactNode; stagger?: number; delay?: number;
  once?: boolean; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: MOTION.viewportMargin }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children, y = 18, style,
}: { children: React.ReactNode; y?: number; style?: React.CSSProperties }) {
  return (
    <motion.div variants={staggerItem(y)} style={style}>
      {children}
    </motion.div>
  );
}

// ── CountUp: number counts up when scrolled into view ───────────────────────
export function CountUp({
  to, from = 0, duration = 1.2, format, style,
}: {
  to: number; from?: number; duration?: number;
  format?: (n: number) => string; style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState(from);

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) { setValue(to); return; }
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  return <span ref={ref} style={style}>{format ? format(value) : String(value)}</span>;
}

// ── Marquee: slow continuous strip (disabled under reduced motion) ──────────
export function Marquee({
  children, durationSec = 36, gap = 44, style,
}: {
  children: React.ReactNode; durationSec?: number; gap?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap, justifyContent: "center", ...style }}>
        {children}
      </div>
    );
  }
  return (
    <div style={{ overflow: "hidden", position: "relative", ...style }} aria-hidden={false}>
      <div
        className="kef-marquee-track"
        style={{
          display: "flex", gap, width: "max-content",
          animation: `kef-marquee ${durationSec}s linear infinite`,
        }}
      >
        <div style={{ display: "flex", gap, flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", gap, flexShrink: 0 }} aria-hidden="true">{children}</div>
      </div>
      <style>{`
        @keyframes kef-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - ${gap / 2}px)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kef-marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── IllustrativeImage: AI-generated visual with mandatory disclosure label ──
export function IllustrativeImage({
  src, alt, width, height, radius = 14, priority = false, style, imgStyle,
}: {
  src: string; alt: string; width: number; height: number; radius?: number;
  priority?: boolean; style?: React.CSSProperties; imgStyle?: React.CSSProperties;
}) {
  const { t, locale } = useLocale();
  return (
    <figure style={{ position: "relative", margin: 0, lineHeight: 0, ...style }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ width: "100%", height: "auto", display: "block", borderRadius: radius, ...imgStyle }}
      />
      <figcaption
        style={{
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(30,36,32,0.72)", color: "rgba(255,255,255,0.94)",
          fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
          fontSize: 10.5, lineHeight: 1.5, padding: "3px 10px", borderRadius: 6,
          backdropFilter: "blur(4px)",
        }}
      >
        {t.common.illustrative}
      </figcaption>
    </figure>
  );
}

// ── MonogramAvatar: initials avatar (no real faces policy) ──────────────────
export function MonogramAvatar({
  name, size = 56, bg = COLORS.kutircharGreen, style,
}: { name: string; size?: number; bg?: string; style?: React.CSSProperties }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => Array.from(w)[0])
    .join("");
  return (
    <div
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: "50%", background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontFamily: FONTS.serif, fontWeight: 600,
        fontSize: size * 0.34, letterSpacing: "0.02em", flexShrink: 0,
        border: `2px solid ${COLORS.solarGold}`,
        ...style,
      }}
    >
      {initials}
    </div>
  );
}
