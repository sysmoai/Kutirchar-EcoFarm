import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton, ProofCard } from "../shared/Shared";

const auditRows = [
  { gap: "Land Document Index",     status: "In Progress", evidence: "Title deed review ongoing", stopRule: "No permanent construction until clear title confirmed" },
  { gap: "Boundary Survey (Zone A)",status: "Not Started", evidence: "Surveyor identified, appointment pending", stopRule: "No foundation planning until boundary pegs set & mapped" },
  { gap: "SPT Soil Test",           status: "Not Started", evidence: "Soil test lab identified", stopRule: "No G+5 foundation decision without SPT result" },
  { gap: "Drainage Level Survey",   status: "Not Started", evidence: "Level instrument needed", stopRule: "No blind filling or earthwork without drainage outlet clarity" },
  { gap: "Zone B Ejmali Status",    status: "Open Gap",    evidence: "Legal opinion pending from upazila land office", stopRule: "Zone B: removable use only until ejmali status legally confirmed" },
  { gap: "Post Office Address Match",status: "Open Gap",   evidence: "Post address currently shows older village name", stopRule: "Resolve before official documents (bank forms, government applications)" },
  { gap: "Rental Demand Proof",     status: "Not Applicable", evidence: "Phase 5 only — not relevant in current phase", stopRule: "No service apartment planning until demand is verified through formal inquiry records" },
];

const stopRules = [
  "No SPT soil test → no G+5 foundation finalization",
  "No boundary lock → no permanent work",
  "Unclear drainage → no blind filling",
  "Zone B non-private/ejmali → removable-only. No permanent RCC, no room, no septic",
  "EMI must stay within ≤ 50% of proven rolling 12-month income",
  "No permanent structure on Zone B until legal verification passes",
  "No Phase 2 start until Phase 1 is stable and documented",
];

export function ProofPage() {
  return (
    <div>
      <PageHero
        title="Proof & Governance"
        titleBn="প্রমাণ ও নিয়ন্ত্রণ"
        subtitle="Bank-ready, government-ready, investor-ready. All open gaps are publicly documented. No hidden issues. Evidence-first at every step."
        dark
      />

      {/* Privacy notice */}
      <section style={{ background: COLORS.solarGold, padding: "10px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.deepFarmGreen, margin: 0, textAlign: "center", fontWeight: 600 }}>
            🔒 Privacy Policy: No NID, PIN, bank account numbers, sensitive IDs, or private legal documents are published on this website. Only safe summaries and redacted proof are shown publicly.
          </p>
        </div>
      </section>

      {/* Audit Ledger */}
      <PageSection>
        <SectionHeading
          title="Verification Audit Ledger"
          subtitle="Real-time status of all verification requirements. Updated as progress is made. Open gaps mean those phases have not started."
        />
        <div style={{ overflowX: "auto", marginBottom: 32 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.sans, fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.deepFarmGreen }}>
                {["Verification Gap", "Current Status", "Evidence Required", "Stop Rule If Missing"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditRows.map((row, i) => {
                const statusColor = row.status === "Not Started" ? "#888" : row.status === "In Progress" ? COLORS.riverBlue : row.status === "Open Gap" ? COLORS.riskRed : COLORS.bioOliveDeep;
                return (
                  <tr key={row.gap} style={{ background: i % 2 === 0 ? "#fafafa" : "white", borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.charcoalText }}>{row.gap}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: statusColor, fontWeight: 700, fontSize: 12 }}>● {row.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#555" }}>{row.evidence}</td>
                    <td style={{ padding: "12px 16px", color: COLORS.riskRed, fontSize: 12 }}>{row.stopRule}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Stop rules callout */}
        <div style={{ background: "#fff5f5", border: `2px solid #fecdca`, borderRadius: 12, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>🛑</span>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: "#7f1d1d", margin: 0 }}>Non-Negotiable Stop Rules</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
            {stopRules.map((rule) => (
              <div key={rule} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: COLORS.riskRed, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#7f1d1d", lineHeight: 1.55 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Evidence Status */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="Evidence Pack Status" subtitle="Downloadable documentation available to qualified stakeholders (bank, government, serious investors) upon formal request." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 28 }}>
          <ProofCard label="Land document index" status="pending" note="Title deed and ownership chain under review. Summary PDF available on request — no NID or sensitive IDs included." />
          <ProofCard label="Soil test report" status="missing" note="SPT soil test not yet conducted. Required before any foundation planning. Scheduled for Phase 0 completion." />
          <ProofCard label="Survey sketch & photos" status="missing" note="Boundary demarcation survey not yet complete. Surveyor appointed. Target: before Phase 1." />
          <ProofCard label="Drainage level table" status="missing" note="Site level and drainage outlet survey required before earthwork or land filling." />
          <ProofCard label="Zone B legal status" status="pending" note="Ejmali confirmation from upazila land office in progress. Current status: non-private use only (removable structures)." />
          <ProofCard label="Brand & identity lock" status="verified" note="Official brand name, logo, colors, and identity system locked. 21 June 2026. Status: FINAL/FIXED." />
        </div>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5eee9", padding: "20px 24px" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: COLORS.charcoalText }}>How to request the full evidence pack:</strong> Use the Contact page to submit a formal inquiry. Select "Bank / Govt / Investor" as the inquiry type and describe your purpose. We will share appropriate documentation based on your role and requirements. No NID, PIN, or private legal documents are shared publicly.
          </p>
        </div>
      </PageSection>

      {/* Zone system */}
      <PageSection>
        <SectionHeading title="Land Zone System" subtitle="Two zones with different legal status, different rules. This distinction is fundamental to all planning decisions." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 28 }}>
          <Card style={{ borderLeft: `4px solid ${COLORS.kutircharGreen}` }}>
            <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>Zone A — Private Core</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 12px" }}>10 decimal, private family land</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>Full ownership. Subject to SPT soil test before foundation. Permanent structures allowed after all Phase 0 verifications pass. G+5 potential after soil test gate.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Cattle barn (Phase 1)", "Biogas digester (Phase 3)", "Solar rooftop", "Permanent residence (after soil test)"].map((u) => (
                <span key={u} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "#f0f9f3", color: COLORS.kutircharGreen, border: "1px solid #c0ddc8", padding: "2px 8px", borderRadius: 10 }}>{u}</span>
              ))}
            </div>
          </Card>
          <Card style={{ borderLeft: `4px solid ${COLORS.riverBlue}` }}>
            <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, color: COLORS.riverBlue, margin: "0 0 6px" }}>Zone B — Non-Private / Ejmali</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 12px" }}>12 decimal, ejmali verification pending</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>Legal status under verification. Until ejmali confirmation, ONLY removable structures are permitted. No concrete, no RCC, no permanent plumbing.</p>
            <StopRule>Permanent RCC / room / septic on Zone B = ZERO until legal verification completes.</StopRule>
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Fodder racks", "Temporary shade", "Portable compost", "Loading/parking area", "Removable water tank"].map((u) => (
                <span key={u} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "#eff6fb", color: COLORS.riverBlue, border: "1px solid #b8d4e0", padding: "2px 8px", borderRadius: 10 }}>✓ {u}</span>
              ))}
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Request CTA */}
      <PageSection bg={COLORS.deepFarmGreen} py={48}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, color: "white", margin: "0 0 12px" }}>Request the Bank & Govt Pack</h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.72)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.65 }}>
            For bank credit officers, government departments, NGOs, or serious investors who need a formal evidence pack. Submit your inquiry with your role and purpose.
          </p>
          <CtaButton to="/contact" variant="gold" size="lg">Request Evidence Pack →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
