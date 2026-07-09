// ─── Shared UI primitives used across all pages ──────────────────────────────
import * as React from "react";
import { Link } from "react-router";
import { COLORS, FONTS } from "../../brand";
import { useLocale } from "../shared/i18n";

// Page section wrapper
export function PageSection({
  children, bg, py = 64, id,
}: { children: React.ReactNode; bg?: string; py?: number; id?: string }) {
  return (
    <section id={id} style={{ background: bg || COLORS.documentIvory, padding: `${py}px 0` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {children}
      </div>
    </section>
  );
}

// Page hero band
export function PageHero({ title, titleBn, subtitle, children, dark }: {
  title: string; titleBn?: string; subtitle?: string; children?: React.ReactNode; dark?: boolean;
}) {
  return (
    <section style={{
      background: dark ? COLORS.deepFarmGreen : COLORS.kutircharGreen,
      padding: "56px 0 48px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {titleBn && (
          <p style={{ fontFamily: FONTS.serifBengali, fontWeight: 500, fontSize: 16, color: "rgba(255,255,255,0.9)", marginBottom: 6, lineHeight: 1.4 }}>{titleBn}</p>
        )}
        <h1 style={{ fontFamily: FONTS.serif, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "white", margin: "0 0 14px", lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: FONTS.sans, fontSize: 16, color: "rgba(255,255,255,0.88)", maxWidth: 640, margin: 0, lineHeight: 1.65 }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

// Section heading
export function SectionHeading({ title, subtitle, center }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div style={{ marginBottom: 36, textAlign: center ? "center" : "left" }}>
      <h2 style={{ fontFamily: FONTS.serif, fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 10px" }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#555", lineHeight: 1.65, maxWidth: center ? 600 : 640, margin: center ? "0 auto" : 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Card wrapper
export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "white", border: `1px solid #e5eee9`, borderRadius: 12, padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", ...style }}>
      {children}
    </div>
  );
}

// Stop rule callout
export function StopRule({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff5f5", border: `1.5px solid #fecdca`, borderRadius: 10, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🛑</span>
      <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#7f1d1d", lineHeight: 1.65, margin: 0 }}>{children}</p>
    </div>
  );
}

// Proof / evidence card
export function ProofCard({ label, status, note }: { label: string; status: "verified" | "pending" | "missing"; note: string }) {
  const statusMap = {
    verified: { color: COLORS.kutircharGreen, bg: "#f0f9f3", border: "#c0ddc8", icon: "✓" },
    pending:  { color: COLORS.riverBlue,      bg: "#eff6fb", border: "#b8d4e0", icon: "⏳" },
    missing:  { color: COLORS.riskRed,        bg: "#fff5f5", border: "#fecdca", icon: "✕" },
  };
  const s = statusMap[status];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{label}</p>
        <span style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: s.color, background: "white", padding: "2px 8px", borderRadius: 10, border: `1px solid ${s.border}` }}>
          {s.icon} {status.toUpperCase()}
        </span>
      </div>
      <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.55, margin: 0 }}>{note}</p>
    </div>
  );
}

// CTA Button — shared, consistent, accessible.
// When disabled with a link destination, it renders as a non-interactive span
// so it cannot be activated or navigated.
export function CtaButton({
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  external = false,
  style,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "ghostLight" | "gold" | "white" | "dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  style?: React.CSSProperties;
}) {
  const { locale } = useLocale();

  type CssVars = React.CSSProperties & Record<string, string | number>;
  const v = (vars: Record<string, string>): CssVars => vars as CssVars;

  const sizes = {
    sm: { minHeight: 36, fontSize: 12, padding: "6px 14px" },
    md: { minHeight: 40, fontSize: 13.5, padding: "10px 20px" },
    lg: { minHeight: 48, fontSize: 15, padding: "12px 28px" },
  } as const;
  const s = sizes[size];

  const variantVars: Record<string, CssVars> = {
    primary: v({
      "--btn-bg": COLORS.kutircharGreen,
      "--btn-color": "white",
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-filter": "brightness(1.08)",
      "--btn-hover-shadow": "0 6px 14px rgba(31,107,58,0.25)",
      "--btn-focus-color": COLORS.solarGold,
    }),
    gold: v({
      "--btn-bg": COLORS.solarGold,
      "--btn-color": COLORS.deepFarmGreen,
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-filter": "brightness(1.08)",
      "--btn-hover-shadow": "0 6px 14px rgba(242,181,68,0.35)",
      "--btn-focus-color": COLORS.deepFarmGreen,
    }),
    white: v({
      "--btn-bg": "white",
      "--btn-color": COLORS.deepFarmGreen,
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-filter": "brightness(1.05)",
      "--btn-hover-shadow": "0 6px 14px rgba(255,255,255,0.25)",
      "--btn-focus-color": COLORS.solarGold,
    }),
    dark: v({
      "--btn-bg": COLORS.deepFarmGreen,
      "--btn-color": "white",
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-filter": "brightness(1.08)",
      "--btn-hover-shadow": "0 6px 14px rgba(11,79,42,0.3)",
      "--btn-focus-color": COLORS.solarGold,
    }),
    secondary: v({
      "--btn-bg": "rgba(255,255,255,0.12)",
      "--btn-color": "white",
      "--btn-border": "1.5px solid rgba(255,255,255,0.25)",
      "--btn-border-color": "rgba(255,255,255,0.25)",
      "--btn-hover-bg": "rgba(255,255,255,0.18)",
      "--btn-hover-border-color": "rgba(255,255,255,0.35)",
      "--btn-focus-color": COLORS.solarGold,
    }),
    outline: v({
      "--btn-bg": "transparent",
      "--btn-color": COLORS.kutircharGreen,
      "--btn-border": `1.5px solid ${COLORS.kutircharGreen}`,
      "--btn-border-color": COLORS.kutircharGreen,
      "--btn-hover-bg": "rgba(31,107,58,0.06)",
      "--btn-hover-border-color": COLORS.kutircharGreen,
      "--btn-focus-color": COLORS.kutircharGreen,
    }),
    ghost: v({
      "--btn-bg": "transparent",
      "--btn-color": COLORS.kutircharGreen,
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-bg": "rgba(31,107,58,0.06)",
      "--btn-focus-color": COLORS.kutircharGreen,
    }),
    ghostLight: v({
      "--btn-bg": "transparent",
      "--btn-color": "white",
      "--btn-border": "none",
      "--btn-border-color": "transparent",
      "--btn-hover-bg": "rgba(255,255,255,0.1)",
      "--btn-focus-color": COLORS.solarGold,
    }),
  };

  const cssVars: CssVars = {
    "--btn-min-height": `${s.minHeight}px`,
    "--btn-font-size": `${s.fontSize}px`,
    "--btn-padding": s.padding,
    "--btn-width": fullWidth ? "100%" : "auto",
    ...variantVars[variant],
  };

  const baseStyle: React.CSSProperties = {
    fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
    ...cssVars,
    ...style,
  };

  const common = {
    className: "cta-button",
    style: baseStyle,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : undefined,
    onClick: disabled ? undefined : onClick,
  } as const;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (to && !disabled) {
    return <Link to={to} {...common}>{content}</Link>;
  }
  if (href && !disabled) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...common}
      >
        {content}
      </a>
    );
  }
  if (to || href) {
    // Render a non-interactive element when a link-style CTA is disabled.
    return (
      <span role="button" {...common} tabIndex={-1}>
        {content}
      </span>
    );
  }
  return (
    <button type={type} disabled={disabled} {...common}>
      {content}
    </button>
  );
}

// Info row (label + value)
export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0f4f1" }}>
      <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", minWidth: 130, flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// Phase roadmap item
export function PhaseItem({ phase, label, title, items, active }: {
  phase: string; label: string; title: string; items: string[]; active?: boolean;
}) {
  return (
    <div style={{
      background: active ? "#f0f9f3" : "white",
      border: `1.5px solid ${active ? COLORS.kutircharGreen : "#e5eee9"}`,
      borderRadius: 12, padding: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: active ? COLORS.kutircharGreen : "#6b7280", fontWeight: 700, background: active ? "#e0f4e8" : "#f7f7f7", padding: "3px 10px", borderRadius: 6 }}>
          {phase}
        </span>
        <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280" }}>{label}</span>
      </div>
      <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 10px" }}>{title}</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((item) => (
          <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.65, marginBottom: 2 }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
