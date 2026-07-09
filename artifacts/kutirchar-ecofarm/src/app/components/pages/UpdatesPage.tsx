import { useState } from "react";
import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";

type Category = "All" | "Verification" | "Governance" | "Planning" | "Construction" | "Digital" | "Products";

const updates = [
  {
    date: "June 2026", category: "Governance" as const, phase: "Now" as const, status: "Completed",
    title: "Brand and digital identity locked — FINAL",
    summary: "Official brand name 'Kutirchar EcoFarm / কুটিরচর ইকোফার্ম' locked on 21 June 2026. Logo, color system, bilingual typography, and identity documentation published and version-controlled.",
    evidenceAdded: ["Brand identity guide published", "Color tokens documented", "Logo system finalised"],
    openGaps: [],
    next30: ["Brand guide pushed to GitHub", "Begin domain registration confirmation"],
  },
  {
    date: "June 2026", category: "Verification" as const, phase: "Now" as const, status: "In Progress",
    title: "Zone A boundary survey — initiated",
    summary: "Formal process for Zone A (10 decimal private land) boundary demarcation started. Surveyor identified. Appointment pending at district land survey office.",
    evidenceAdded: ["Surveyor contact confirmed"],
    openGaps: ["Survey appointment not yet secured", "Boundary pegs not placed"],
    next30: ["Book formal survey appointment", "Coordinate with upazila land office"],
  },
  {
    date: "May 2026", category: "Verification" as const, phase: "Now" as const, status: "Open",
    title: "Zone B ejmali legal status — open gap",
    summary: "Zone B (12 decimal) is non-private/ejmali. Legal clarification from upazila land office is required before any planning on that land. Currently: removable use only.",
    evidenceAdded: [],
    openGaps: ["Ejmali status not legally confirmed", "No survey sketch for Zone B", "Upazila verification outstanding"],
    next30: ["Request formal legal opinion from upazila land office", "Prepare Zone B documentation brief"],
  },
  {
    date: "May 2026", category: "Planning" as const, phase: "Now" as const, status: "In Progress",
    title: "Soil test planning — Phase 0 requirement",
    summary: "SPT soil test required before any foundation planning on Zone A. This is a hard gate — no G+5 or structural foundation decision until result in hand. Lab identified, sample collection pending.",
    evidenceAdded: ["Soil test lab identified"],
    openGaps: ["Sample collection not done", "Lab report not available"],
    next30: ["Schedule sample collection", "Confirm SPT test parameters with structural engineer"],
  },
  {
    date: "April 2026", category: "Planning" as const, phase: "Now" as const, status: "Completed",
    title: "Phase 0 checklist formalised",
    summary: "All Phase 0 verification requirements documented: land title, boundary, soil test, drainage, ejmali status, post office address. No phase advance until all items checked.",
    evidenceAdded: ["Phase 0 checklist document created", "Stop rules written and published"],
    openGaps: [],
    next30: ["Continue working through Phase 0 items in priority order"],
  },
  {
    date: "April 2026", category: "Digital" as const, phase: "Next" as const, status: "Planning",
    title: "Digital infrastructure scoping — Starlink + CCTV + UPS",
    summary: "Preliminary scope of digital infrastructure needs: Starlink for connectivity, IP cameras + NVR for security, UPS for power backup. Installation sequence drafted. No purchases until Phase 0 complete.",
    evidenceAdded: ["Infrastructure scoping document created", "Vendor shortlist started"],
    openGaps: ["Starlink address portability not confirmed", "Clear sky view test at site not done", "UPS load calculation not complete"],
    next30: ["Get 3 vendor quotes for UPS + CCTV", "Confirm Starlink address eligibility"],
  },
];

const categories: Category[] = ["All", "Verification", "Governance", "Planning", "Construction", "Digital", "Products"];

const statusColor = (s: string) =>
  s === "Completed" ? COLORS.kutircharGreen : s === "In Progress" ? COLORS.riverBlue : s === "Open" ? COLORS.riskRed : COLORS.bioOliveDeep;

export function UpdatesPage() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered = filter === "All" ? updates : updates.filter((u) => u.category === filter);

  return (
    <div>
      <PageHero
        title="Updates / Reports"
        titleBn="আপডেট ও প্রতিবেদন"
        subtitle="A living trust engine. Transparent, date-stamped updates showing progress, open gaps, evidence added, and next steps. No hype — only facts."
      />

      {/* Editorial note */}
      <section style={{ background: COLORS.charcoalText, padding: "12px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>
            📸 Photo-first · Evidence-referenced · No confidential IDs · Updated as progress occurs
          </p>
        </div>
      </section>

      <PageSection>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600,
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.15s",
                background: filter === cat ? COLORS.kutircharGreen : "white",
                color: filter === cat ? "white" : COLORS.kutircharGreen,
                border: `1.5px solid ${filter === cat ? COLORS.kutircharGreen : "#e0eed5"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Update cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {filtered.map((update) => (
            <Card key={update.title}>
              {/* Header */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: COLORS.riverBlue, background: "#eff6fb", padding: "2px 8px", borderRadius: 6, border: "1px solid #b8d4e0" }}>{update.category}</span>
                  <PhaseChip phase={update.phase} />
                  <span style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: statusColor(update.status) }}>● {update.status}</span>
                </div>
                <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{update.date}</span>
              </div>

              <h3 style={{ fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 10px" }}>{update.title}</h3>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.7, margin: "0 0 16px" }}>{update.summary}</p>

              {/* Evidence + Gaps + Next */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {update.evidenceAdded.length > 0 && (
                  <div style={{ background: "#f0f9f3", borderRadius: 8, padding: "12px 14px" }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.kutircharGreen, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Evidence Added</p>
                    {update.evidenceAdded.map((e) => (
                      <div key={e} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                        <span style={{ color: COLORS.kutircharGreen, fontSize: 12 }}>✓</span>
                        <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#333" }}>{e}</span>
                      </div>
                    ))}
                  </div>
                )}
                {update.openGaps.length > 0 && (
                  <div style={{ background: "#fff5f5", borderRadius: 8, padding: "12px 14px" }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.riskRed, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Open Gaps</p>
                    {update.openGaps.map((g) => (
                      <div key={g} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                        <span style={{ color: COLORS.riskRed, fontSize: 12 }}>○</span>
                        <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{g}</span>
                      </div>
                    ))}
                  </div>
                )}
                {update.next30.length > 0 && (
                  <div style={{ background: "#eff6fb", borderRadius: 8, padding: "12px 14px" }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.riverBlue, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Next 30 Days</p>
                    {update.next30.map((n) => (
                      <div key={n} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                        <span style={{ color: COLORS.riverBlue, fontSize: 12 }}>→</span>
                        <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#333" }}>{n}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#6b7280" }}>No updates in this category yet.</p>
          </div>
        )}
      </PageSection>

      {/* Subscribe note */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="How We Report" subtitle="Our commitment to transparent, evidence-first communication." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {[
            { icon: "📅", title: "Date-stamped", body: "Every update is dated. Nothing is backdated or modified without notation." },
            { icon: "🔗", title: "Evidence-referenced", body: "Claims reference specific documentation, available to qualified stakeholders on formal request. No claim without supporting evidence." },
            { icon: "🔓", title: "Open gaps shown", body: "We publicly show what is not done. Gaps are not hidden — they drive the work." },
            { icon: "🔒", title: "Privacy protected", body: "No NID, PIN, bank details, or sensitive personal identifiers ever published." },
          ].map((item) => (
            <div key={item.title} style={{ background: "white", borderRadius: 12, padding: "20px", border: "1px solid #e5eee9", textAlign: "center" }}>
              <p style={{ fontSize: 28, margin: "0 0 8px" }}>{item.icon}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 6px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
