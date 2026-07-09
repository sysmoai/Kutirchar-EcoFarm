import { COLORS, FONTS, BRAND } from "../../brand";
import { PageHero, PageSection, SectionHeading, PhaseItem, InfoRow, CtaButton, StopRule } from "../shared/Shared";

const phases = [
  { phase: "Phase 0", label: "Current", title: "Verification & Foundation", active: true, items: [
    "Land document index & legal review",
    "Boundary survey (Zone A & B demarcation)",
    "SPT soil test for foundation planning",
    "Drainage outlet survey & level mapping",
    "Zone B ejmali status legal clarification",
    "Digital infrastructure planning (Starlink, CCTV, UPS)",
  ]},
  { phase: "Phase 1", label: "Next", title: "Hygienic Pilot Farm + Small Solar", active: false, items: [
    "Hygienic cattle barn on Zone A (gate: all Phase 0 docs verified)",
    "First 2–3 local cows with Napier fodder cultivation",
    "Small rooftop solar (100–200W) for operations",
    "Basic CCTV installation & connectivity test",
    "Compost/vermicompost pilot",
  ]},
  { phase: "Phase 2", label: "Next", title: "Bio-Slurry & Silage Loop", active: false, items: [
    "Compost processing from first batch (gate: livestock stable)",
    "Napier silage first surplus storage",
    "Bio-slurry liquid fertilizer production trial",
    "Local vegetable inputs from bio-slurry output",
  ]},
  { phase: "Phase 3", label: "Later", title: "6m³ Biogas + Expanded Solar", active: false, items: [
    "6m³ biogas digester installation (gate: consistent manure input)",
    "Cooking gas for farm use — reduce LPG cost",
    "Expand rooftop solar (500W–1kW)",
    "Irrigation pump — gravity or solar",
    "Silage field expansion to adjacent Napier plots",
  ]},
  { phase: "Phase 4", label: "Later", title: "Scale & Monetization", active: false, items: [
    "Larger biogas system (gate: Phase 3 stable for 3+ months)",
    "Bio-slurry commercial sale to local farmers",
    "Silage surplus bulk sale",
    "Training/farm tour programme (gate: digital monitoring live)",
  ]},
  { phase: "Phase 5", label: "Later", title: "Demand-Gated Services", active: false, items: [
    "Service apartment (gate: verified demand + legal clearance)",
    "Brand licensing and franchise consultancy",
    "Smart monitoring demo for partner farms",
    "All Phase 5 items require explicit proof from Phases 0–4",
  ]},
];

export function ProjectPage() {
  return (
    <div>
      <PageHero
        title="The Project — Overview"
        titleBn="প্রকল্প পরিচিতি"
        subtitle="Kutirchar EcoFarm is a proof-based smart farm and circular energy ecosystem in Kutirchar, Sirajganj. Every phase is gated by evidence. No phase begins without documented proof from the previous stage."
      />

      {/* What & Why */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          <div>
            <SectionHeading title="What is Kutirchar EcoFarm?" />
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              A rural circular ecosystem in Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj. The project integrates cattle and dairy farming, biogas production from manure, Napier grass cultivation for silage and fodder, bio-slurry fertilizer, rooftop solar power, and digital farm monitoring — all on private family land.
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              The circular loop: livestock produce manure → manure feeds biogas → biogas gives energy + bio-slurry → bio-slurry fertilizes Napier → Napier feeds livestock. Each output reduces cost. Each cycle builds asset value.
            </p>
            <StopRule>
              Zone B (12 decimal non-private/ejmali land): removable use only — fodder racks, temporary shade, portable compost, water tank. No permanent concrete structures until legal verification is complete.
            </StopRule>
          </div>
          <div>
            <SectionHeading title="Why this project exists" />
            {[
              { heading: "Rural asset protection first", body: "Family land in Kutirchar represents long-term asset value. Proper documentation, boundary survey, and legal clarity must come before any construction." },
              { heading: "Phased monetization", body: "Instead of large upfront investment, each phase is self-funded from the output of the previous phase. No phase moves forward without verified proof." },
              { heading: "Strong governance & audit gates", body: "Every decision has a stop rule. Soil test before foundation. Boundary survey before permanent works. Income proof before EMI expansion." },
              { heading: "Evidence-first, not hype", body: "All public claims are conservative and verifiable. No overpromising. Bank officers and government stakeholders are the primary audience for all documentation." },
            ].map((item) => (
              <div key={item.heading} style={{ marginBottom: 18 }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 4px" }}>{item.heading}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Location */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="Project Location" subtitle="All operations are based at Kutirchar village. Site visits available by appointment." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", border: "1px solid #e5eee9" }}>
            {[
              { label: "Village", value: BRAND.location.village },
              { label: "Union", value: BRAND.location.union },
              { label: "Upazila", value: BRAND.location.upazila },
              { label: "District", value: BRAND.location.district },
              { label: "Country", value: BRAND.location.country },
              { label: "Zone A", value: BRAND.zoneA },
              { label: "Zone B", value: BRAND.zoneB },
            ].map((row) => <InfoRow key={row.label} label={row.label} value={row.value} />)}
          </div>
          <div style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.72)", marginBottom: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
              Land Status Summary
            </p>
            {[
              { item: "Zone A land documents — under review", done: false },
              { item: "Zone A boundary survey", done: false },
              { item: "Zone A SPT soil test", done: false },
              { item: "Zone B ejmali legal status", done: false },
              { item: "Zone B removable-use approval", done: false },
              { item: "Post office address verification", done: false },
            ].map((s) => (
              <div key={s.item} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ color: s.done ? "#4ade80" : "#f87171", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{s.done ? "✓" : "○"}</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{s.item}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Phase Roadmap */}
      <PageSection>
        <SectionHeading
          title="Phase Roadmap"
          subtitle="Six phases from verification to scale. Each phase requires documented evidence from the previous before proceeding. No skipping."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {phases.map((p) => <PhaseItem key={p.phase} {...p} />)}
        </div>
        <StopRule>
          This roadmap is illustrative. Phase 1 does not begin until all Phase 0 verification items are completed and documented. Phase 2 does not begin until Phase 1 outputs are stable for a minimum observation period.
        </StopRule>
      </PageSection>

      {/* Positioning */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="Brand Positioning" subtitle="Who this project is for — and what it is not." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { title: "Bank & Credit Officers", body: "Clear land documentation, phase-gated investment, verifiable income progression, conservative EMI discipline, and stop-rule governance.", icon: "🏦" },
            { title: "Government & Agriculture Dept.", body: "Proof-based circular farm model, soil and water verification first, biogas subsidy eligibility in later phases.", icon: "🏛️" },
            { title: "NGO & Development Partners", body: "Rural livelihood integration, food security (silage, organic fertilizer), circular energy, local employment.", icon: "🌍" },
            { title: "Serious Investors", body: "Asset-backed (family land), conservative phase progression, no hype, verifiable output at each stage.", icon: "📊" },
          ].map((item) => (
            <div key={item.title} style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 12, padding: "20px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <CtaButton to="/proof" size="lg">View Proof &amp; Governance Pack →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
