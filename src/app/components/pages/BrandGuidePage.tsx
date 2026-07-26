import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import logoIcon from "../../../imports/image.png";
import { COLORS, FONTS } from "../../brand";

// ── Import all 14 brand guide sections ──────────────────────────────────────
import { Section00MasterLogo } from "../sections/Section00MasterLogo";
import { Section01LogoSystem } from "../sections/Section01LogoSystem";
import { Section02LogoLockups } from "../sections/Section02LogoLockups";
import { Section03IconSystem } from "../sections/Section03IconSystem";
import { Section04SealSystem } from "../sections/Section04SealSystem";
import { Section05Monochrome } from "../sections/Section05Monochrome";
import { Section06ClearSpace } from "../sections/Section06ClearSpace";
import { Section07ColorSystem } from "../sections/Section07ColorSystem";
import { Section08Typography } from "../sections/Section08Typography";
import { Section09UsageExamples } from "../sections/Section09UsageExamples";
import { Section10IncorrectUsage } from "../sections/Section10IncorrectUsage";
import { Section11ExportAssets } from "../sections/Section11ExportAssets";
import { Section12DeveloperNotes } from "../sections/Section12DeveloperNotes";
import { Section13AIAgentTokens } from "../sections/Section13AIAgentTokens";

const navItems = [
  { id: 0,  num: "00", label: "Master Logo Source",    group: "Logo System" },
  { id: 1,  num: "01", label: "Logo System",           group: "Logo System" },
  { id: 2,  num: "02", label: "Logo Lockups",          group: "Logo System" },
  { id: 3,  num: "03", label: "Icon System",           group: "Logo System" },
  { id: 4,  num: "04", label: "Seal + Stamp System",   group: "Logo System" },
  { id: 5,  num: "05", label: "Monochrome + Reverse",  group: "Color & Type" },
  { id: 6,  num: "06", label: "Clear Space & Sizing",  group: "Color & Type" },
  { id: 7,  num: "07", label: "Color System",          group: "Color & Type" },
  { id: 8,  num: "08", label: "Typography System",     group: "Color & Type" },
  { id: 9,  num: "09", label: "Usage Examples",        group: "Guidelines" },
  { id: 10, num: "10", label: "Incorrect Usage",       group: "Guidelines" },
  { id: 11, num: "11", label: "Export Assets",         group: "Production" },
  { id: 12, num: "12", label: "Developer Notes",       group: "Production" },
  { id: 13, num: "13", label: "AI Agent Tokens",       group: "Production" },
];

const sections: Record<number, React.ReactNode> = {
  0:  <Section00MasterLogo />,
  1:  <Section01LogoSystem />,
  2:  <Section02LogoLockups />,
  3:  <Section03IconSystem />,
  4:  <Section04SealSystem />,
  5:  <Section05Monochrome />,
  6:  <Section06ClearSpace />,
  7:  <Section07ColorSystem />,
  8:  <Section08Typography />,
  9:  <Section09UsageExamples />,
  10: <Section10IncorrectUsage />,
  11: <Section11ExportAssets />,
  12: <Section12DeveloperNotes />,
  13: <Section13AIAgentTokens />,
};

const groups = ["Logo System", "Color & Type", "Guidelines", "Production"];

export function BrandGuidePage() {
  const [searchParams] = useSearchParams();
  const parsedSection = Number(searchParams.get("section"));
  const initialSection = Number.isFinite(parsedSection) ? Math.min(13, Math.max(0, Math.trunc(parsedSection))) : 0;
  const [activeSection, setActiveSection] = useState(initialSection);
  // Default open on desktop, closed on mobile (where the sidebar is an overlay drawer)
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 768 : true));
  const containerRef = useRef<HTMLDivElement>(null);

  // On mobile, jumping to a section should close the drawer to reveal the content
  function goToSection(id: number) {
    setActiveSection(id);
    if (typeof window !== "undefined" && window.innerWidth <= 768) setSidebarOpen(false);
  }

  // Update document title
  useEffect(() => {
    const nav = navItems[activeSection];
    document.title = `${nav.num} — ${nav.label} | Brand Guide | Kutirchar EcoFarm`;
    return () => { document.title = "Kutirchar EcoFarm"; };
  }, [activeSection]);

  // Scroll content to top on section change
  const contentId = "brand-guide-content";
  useEffect(() => {
    document.getElementById(contentId)?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  return (
    <div ref={containerRef} style={{ position: "relative", display: "flex", height: "calc(100vh - 92px)", minHeight: 400, overflow: "hidden", background: COLORS.documentIvory }}>

      {/* Backdrop — only visible on mobile when the drawer is open */}
      {sidebarOpen && (
        <button
          className="bg-backdrop"
          aria-label="Close section navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className="bg-sidebar"
        aria-label="Brand guide sections"
        style={{
          width: sidebarOpen ? 256 : 0,
          minWidth: sidebarOpen ? 256 : 0,
          background: COLORS.deepFarmGreen,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease, min-width 0.2s ease",
          overflow: "hidden",
          flexShrink: 0,
          height: "100%",
        }}
      >
        {/* Sidebar header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", marginBottom: 10, padding: "4px 0" }}>
            <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.72)" }}>← Website</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={logoIcon} alt="logo" style={{ width: 28, height: 28, filter: "brightness(0) invert(1)", flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: FONTS.serif, fontSize: 12, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>Brand Identity Guide</p>
              <p style={{ fontFamily: FONTS.bengali, fontSize: 10, color: "rgba(255,255,255,0.72)", margin: 0 }}>কুটিরচর ইকোফার্ম</p>
            </div>
          </div>
        </div>

        {/* Nav by groups */}
        <nav style={{ overflowY: "auto", flex: 1, padding: "8px 0" }}>
          {groups.map((group) => (
            <div key={group}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.62)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "10px 16px 4px" }}>{group}</p>
              {navItems.filter((n) => n.group === group).map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToSection(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      padding: "7px 16px", background: isActive ? "rgba(242,181,68,0.12)" : "transparent",
                      border: "none", borderLeft: isActive ? `3px solid ${COLORS.solarGold}` : "3px solid transparent",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ fontFamily: FONTS.mono, fontSize: 9, color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.62)", fontWeight: 700, minWidth: 20 }}>{item.num}</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: isActive ? "white" : "rgba(255,255,255,0.65)", fontWeight: isActive ? 600 : 400, lineHeight: 1.3 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div style={{ padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 9, color: "rgba(255,255,255,0.62)", lineHeight: 1.5, margin: 0 }}>
            Brand locked 21 June 2026<br />Sections: 00–13
          </p>
        </div>
      </aside>

      {/* ── Main content area ────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          background: "white", borderBottom: "1px solid #e0eed5",
          padding: "0 20px", height: 48,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}
              aria-label={sidebarOpen ? "Hide section navigation" : "Show section navigation"}
              aria-expanded={sidebarOpen}
            >
              {[0,1,2].map((i) => <span key={i} style={{ display: "block", width: 16, height: 2, background: COLORS.kutircharGreen, borderRadius: 1 }} />)}
            </button>
            <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280" }}>
              {navItems[activeSection]?.num} — {navItems[activeSection]?.label}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Quick jump to Export */}
            {activeSection !== 11 && (
              <button
                onClick={() => goToSection(11)}
                style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.kutircharGreen, background: "#f0f9f3", border: `1px solid #c0ddc8`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}
              >
                ↓ Export Assets
              </button>
            )}
            <Link to="/" style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", textDecoration: "none" }}>← Back to Website</Link>
          </div>
        </div>

        {/* Section content */}
        <main
          id={contentId}
          style={{ flex: 1, overflowY: "auto", padding: "32px 32px 60px" }}
        >
          <div style={{ maxWidth: 1080, width: "100%" }}>
            {sections[activeSection]}
          </div>
        </main>

        {/* Bottom nav */}
        <div style={{ background: "white", borderTop: "1px solid #e0eed5", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <button
            onClick={() => goToSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            style={{ fontFamily: FONTS.sans, fontSize: 12, color: activeSection === 0 ? "#ccc" : COLORS.kutircharGreen, background: "none", border: "none", cursor: activeSection === 0 ? "default" : "pointer", fontWeight: 500 }}
          >
            ← {activeSection > 0 ? navItems[activeSection - 1].label : ""}
          </button>

          {/* Section dots */}
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                title={item.label}
                aria-label={`${item.num} — ${item.label}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                style={{ width: 6, height: 6, borderRadius: "50%", background: activeSection === item.id ? COLORS.kutircharGreen : "#d4e8db", border: "none", cursor: "pointer", padding: 0 }}
              />
            ))}
          </div>

          <button
            onClick={() => goToSection(Math.min(13, activeSection + 1))}
            disabled={activeSection === 13}
            style={{ fontFamily: FONTS.sans, fontSize: 12, color: activeSection === 13 ? "#ccc" : COLORS.kutircharGreen, background: "none", border: "none", cursor: activeSection === 13 ? "default" : "pointer", fontWeight: 500 }}
          >
            {activeSection < 13 ? navItems[activeSection + 1].label : ""} →
          </button>
        </div>
      </div>

      <style>{`
        .bg-backdrop { display: none; }
        @media (max-width: 768px) {
          /* Sidebar becomes an overlay drawer so the toggle works on mobile */
          .bg-sidebar {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 50;
            box-shadow: 2px 0 20px rgba(0,0,0,0.35);
          }
          .bg-backdrop {
            display: block;
            position: absolute;
            inset: 0;
            z-index: 40;
            background: rgba(0,0,0,0.45);
            border: none;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
}
