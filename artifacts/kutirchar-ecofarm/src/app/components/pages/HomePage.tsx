import { Link } from "react-router";
import logoIcon from "../../../imports/image.png";
import { COLORS, FONTS } from "../../brand";
import { PhaseChip } from "../shared/PhaseChip";
import { PageSection, Card, StopRule, CtaButton } from "../shared/Shared";

const updates = [
  { date: "June 2026", category: "Verification", status: "In Progress", title: "Land boundary survey initiated", summary: "Formal boundary demarcation process started for Zone A (10 decimal private land). Surveyor appointed. Results pending." },
  { date: "May 2026",  category: "Governance",   status: "Open",        title: "Ejmali status clarification — Zone B", summary: "Zone B (12 decimal non-private) ejmali status under legal review. No permanent works until confirmed." },
  { date: "May 2026",  category: "Planning",     status: "Completed",   title: "Brand and digital identity locked", summary: "Official brand name 'Kutirchar EcoFarm / কুটিরচর ইকোফার্ম' locked. Logo, color system, and documentation published." },
];

const ecosystem = [
  { icon: "🐄", label: "Cattle & Dairy", value: "Core asset: local cows + Napier fodder" },
  { icon: "⚗️", label: "Biogas",         value: "Manure → energy + cooking gas" },
  { icon: "🌿", label: "Bio-Slurry",     value: "Liquid fertilizer from digester" },
  { icon: "☀️", label: "Solar",          value: "Farm power + load reduction" },
  { icon: "📦", label: "Silage / Fodder",value: "Napier grass surplus storage" },
  { icon: "📊", label: "Dashboard",      value: "CCTV + Starlink monitoring" },
];

const trustItems = [
  { label: "Zone A — Private", value: "10 decimal, core operations", safe: true },
  { label: "Zone B — Non-private", value: "12 decimal, removable use only", safe: true },
  { label: "Permanent RCC/Room on B", value: "ZERO — pending legal verification", safe: false },
  { label: "G+5 Foundation (Zone A)", value: "ZERO — pending soil-test gate", safe: false },
];

export function HomePage() {
  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(160deg, ${COLORS.deepFarmGreen} 0%, ${COLORS.kutircharGreen} 60%, #2d7a48 100%)`, padding: "72px 0 64px", position: "relative", overflow: "hidden" }}>
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ background: "rgba(242,181,68,0.15)", border: "1px solid rgba(242,181,68,0.3)", color: COLORS.solarGold, fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.08em" }}>
                  VERIFICATION & FOUNDATION PHASE
                </span>
              </div>

              <p style={{ fontFamily: FONTS.serifBengali, fontWeight: 600, fontSize: 20, color: "rgba(255,255,255,0.9)", margin: "0 0 8px", lineHeight: 1.35 }}>
                কুটিরচর ইকোফার্ম
              </p>
              <h1 style={{ fontFamily: FONTS.serif, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 700, color: "white", margin: "0 0 16px", lineHeight: 1.1 }}>
                Kutirchar EcoFarm
              </h1>
              <p style={{ fontFamily: FONTS.sans, fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.85)", margin: "0 0 10px", lineHeight: 1.6, maxWidth: 560 }}>
                Smart Cattle & Circular Energy Ecosystem
              </p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.82)", margin: "0 0 32px" }}>
                Dairy · Biogas · Solar · Silage — Kutirchar, Sirajganj, Bangladesh
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/proof" style={{ background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, padding: "13px 24px", borderRadius: 10, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  Bank &amp; Govt Pack →
                </Link>
                <Link to="/products" style={{ background: "rgba(255,255,255,0.12)", color: "white", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, padding: "13px 24px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}>
                  Products &amp; Services
                </Link>
                <Link to="/contact" style={{ background: "transparent", color: "rgba(255,255,255,0.75)", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 500, padding: "13px 20px", borderRadius: 10, textDecoration: "none" }}>
                  Partnership ↗
                </Link>
              </div>
            </div>

            {/* Logo */}
            <div className="hero-logo" style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 160, height: 160, background: "rgba(255,255,255,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.15)" }}>
                <img src={logoIcon} alt="Kutirchar EcoFarm icon" style={{ width: 130, height: 130, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <section style={{ background: COLORS.charcoalText, padding: "16px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px", alignItems: "center", justifyContent: "center" }}>
            {trustItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: item.safe ? "#4ade80" : "#f87171" }}>{item.safe ? "✓" : "⚠"}</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                  <strong style={{ color: "white" }}>{item.label}:</strong> {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project at a glance ───────────────────────────────────────────── */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
          <div>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 14px" }}>
              What is Kutirchar EcoFarm?
            </h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              A proof-based, phased rural smart farm in Kutirchar, Sirajganj — integrating cattle, dairy, biogas, Napier/silage cultivation, bio-slurry fertilizer, solar energy, and digital monitoring.
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 20px" }}>
              Every claim is gated: each phase unlocks only after verified evidence from the previous phase. No permanent construction without soil test, boundary survey, and legal clearance.
            </p>
            <CtaButton to="/project" variant="outline">Read Full Overview →</CtaButton>
          </div>
          <div>
            <StopRule>
              <strong>Non-Negotiable Stop Rules:</strong> No permanent structures on Zone B land until ejmali status is legally verified. No G+5 foundation until SPT soil test passes. No blind land filling until drainage outlet is confirmed. EMI must stay ≤ 50% of verified income.
            </StopRule>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { num: "10", unit: "decimal", label: "Zone A — Private", color: COLORS.kutircharGreen },
                { num: "12", unit: "decimal", label: "Zone B — Ejmali (removable only)", color: COLORS.riverBlue },
                { num: "0",  unit: "permanent", label: "Structures on B (legal pending)", color: COLORS.riskRed },
                { num: "4",  unit: "phases",  label: "Planned build-out phases", color: COLORS.bioOlive },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#f9f9f9", border: "1px solid #ebebeb", borderRadius: 10, padding: "14px 16px" }}>
                  <p style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 700, color: stat.color, margin: "0 0 2px" }}>{stat.num}<span style={{ fontSize: 13, fontWeight: 500 }}> {stat.unit}</span></p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── Ecosystem mini overview ───────────────────────────────────────── */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 10px" }}>
            The Circular Ecosystem
          </h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", maxWidth: 540, margin: "0 auto 8px" }}>
            Each output from one system becomes the input for the next — cattle, energy, soil, and profit in one loop.
          </p>
          <PhaseChip phase="Now" size="md" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 28 }}>
          {ecosystem.map((item) => (
            <Card key={item.label} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{item.label}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0, lineHeight: 1.5 }}>{item.value}</p>
            </Card>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <CtaButton to="/ecosystem" variant="primary">See Full Circular Flow →</CtaButton>
        </div>
      </PageSection>

      {/* ── Proof & Governance preview ────────────────────────────────────── */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>
                Proof &amp; Governance
              </h2>
            </div>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 20px" }}>
              Built for bank officers, government partners, and serious investors. Every phase is locked behind verified evidence. Open gaps are publicly shown — no hidden problems.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[
                { label: "Land documents",         status: "In Progress" },
                { label: "Boundary survey",         status: "Not Started" },
                { label: "SPT soil test",           status: "Not Started" },
                { label: "Ejmali legal status (B)", status: "Open Gap" },
                { label: "Drainage level survey",   status: "Not Started" },
              ].map((gap) => (
                <div key={gap.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0" }}>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText }}>{gap.label}</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 600, color: gap.status === "In Progress" ? COLORS.riverBlue : gap.status === "Open Gap" ? COLORS.riskRed : "#6b7280" }}>
                    {gap.status}
                  </span>
                </div>
              ))}
            </div>
            <CtaButton to="/proof" variant="primary">View Full Audit →</CtaButton>
          </div>
          <div>
            <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "28px", color: "white" }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" as const }}>
                Governance Principle
              </p>
              <p style={{ fontFamily: FONTS.serif, fontSize: 18, color: "white", lineHeight: 1.6, margin: "0 0 18px", fontStyle: "italic" }}>
                "Verification-first, phased execution — each phase unlocks only after evidence from the previous phase is confirmed."
              </p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                This means: no skipping steps. No claiming future services as current. No permanent construction without all verification gates passed.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── Latest Updates ────────────────────────────────────────────────── */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>
            Latest Updates
          </h2>
          <Link to="/updates" style={{ fontFamily: FONTS.sans, fontSize: 14, color: COLORS.kutircharGreen, fontWeight: 600, textDecoration: "none" }}>
            View All Updates →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {updates.map((u) => (
            <Card key={u.title}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: COLORS.riverBlue, background: "#eff6fb", padding: "2px 8px", borderRadius: 6, border: "1px solid #b8d4e0" }}>{u.category}</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280" }}>{u.date}</span>
              </div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 8px" }}>{u.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: "0 0 12px" }}>{u.summary}</p>
              <Link to="/updates" style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, fontWeight: 600, textDecoration: "none" }}>Read full update →</Link>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* ── Brand Guide CTA ──────────────────────────────────────────────── */}
      <PageSection>
        <div style={{ background: COLORS.deepFarmGreen, borderRadius: 20, padding: "32px 36px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div>
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 6 }}>Complete Brand System</p>
            <h3 style={{ fontFamily: FONTS.serif, fontSize: 22, fontWeight: 600, color: "white", margin: "0 0 8px" }}>
              Brand Identity Guide — Full System
            </h3>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
              Logo system · Color tokens · Typography · Seal · Export Assets · AI Agent Tokens<br/>
              <span style={{ fontFamily: FONTS.bengali, fontSize: 12, color: "rgba(255,255,255,0.72)" }}>লোগো, রং, টাইপোগ্রাফি, সিল, এবং সব ডাউনলোড</span>
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/brand-guide" style={{ background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, padding: "12px 24px", borderRadius: 10, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              🎨 Open Brand Guide
            </Link>
            <Link to="/brand-guide?section=11" style={{ background: "rgba(255,255,255,0.1)", color: "white", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, padding: "12px 20px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              ↓ Download All Assets
            </Link>
          </div>
        </div>
      </PageSection>

      {/* ── Partnership CTA ───────────────────────────────────────────────── */}
      <PageSection bg={COLORS.kutircharGreen} py={56}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: FONTS.bengali, fontSize: 16, color: "rgba(255,255,255,0.85)", margin: "0 0 8px" }}>অংশীদারিত্ব ও সহযোগিতা</p>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 32, fontWeight: 600, color: "white", margin: "0 0 14px" }}>
            Bank, Government &amp; Investor Inquiries
          </h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.65 }}>
            We welcome serious partnerships with banks, government agencies, NGOs, vendors, and investors. All documentation available in the Proof &amp; Governance section.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, padding: "14px 28px", borderRadius: 10, textDecoration: "none" }}>
              Start Partnership Discussion →
            </Link>
            <Link to="/proof" style={{ background: "rgba(255,255,255,0.12)", color: "white", fontFamily: FONTS.sans, fontSize: 15, fontWeight: 600, padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
              View Proof Pack
            </Link>
          </div>
        </div>
      </PageSection>

      <style>{`
        @media (max-width: 768px) {
          .hero-logo { display: none !important; }
        }
      `}</style>
    </div>
  );
}
