import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";

const flow = [
  { icon: "🐄", title: "Livestock & Dairy", color: COLORS.kutircharGreen, bg: "#f0f9f3",
    inputs: ["Local cows (2–3 initially)", "Napier fodder + silage", "Clean water supply"],
    outputs: ["Fresh dairy milk", "Manure (biogas input)", "Bio-slurry (after digestion)"],
    phase: "Now" as const, phaseNote: "Phase 1: Pilot cattle barn on Zone A" },
  { icon: "⚗️", title: "Biogas Digester", color: COLORS.bioOliveDeep, bg: "#f5f6ee",
    inputs: ["Cattle manure (daily)", "Water for slurry mix", "Organic kitchen waste"],
    outputs: ["Cooking gas (replace LPG)", "Bio-slurry liquid fertilizer", "Reduced waste odour"],
    phase: "Next" as const, phaseNote: "Phase 3: 6m³ digester (gate: consistent manure)" },
  { icon: "🌿", title: "Bio-Slurry Fertilizer", color: COLORS.kutircharGreen, bg: "#f0f9f3",
    inputs: ["Digester effluent", "Water dilution", "Compost blend"],
    outputs: ["Organic liquid fertilizer", "Soil microbiome improvement", "Napier grass yield boost"],
    phase: "Next" as const, phaseNote: "Phase 3+: After biogas digester is operational" },
  { icon: "🌾", title: "Napier / Silage / Fodder", color: COLORS.solarGold, bg: "#fffde7",
    inputs: ["Bio-slurry as fertilizer", "Rainwater + irrigation", "Land on Zone A"],
    outputs: ["Year-round cattle feed", "Silage surplus for sale", "Reduced feed purchase cost"],
    phase: "Next" as const, phaseNote: "Phase 1–2: Napier cultivation starts early" },
  { icon: "☀️", title: "Solar Energy", color: COLORS.solarGold, bg: "#fffde7",
    inputs: ["Rooftop installation area", "Solar panels + inverter", "Battery / grid tie"],
    outputs: ["Farm operations power", "CCTV & monitoring power", "Reduced electricity bill"],
    phase: "Next" as const, phaseNote: "Phase 1: Small solar (100–500W)" },
  { icon: "📊", title: "Digital Monitoring", color: COLORS.riverBlue, bg: "#eff6fb",
    inputs: ["Starlink connectivity", "CCTV cameras", "UPS backup power"],
    outputs: ["Real-time farm visibility", "Remote monitoring dashboard", "Evidence for governance"],
    phase: "Later" as const, phaseNote: "Phase 2–3: After connectivity confirmed" },
];

const circularLogic = [
  { from: "Cattle", arrow: "produces", to: "Manure" },
  { from: "Manure", arrow: "feeds", to: "Biogas Digester" },
  { from: "Biogas", arrow: "generates", to: "Cooking Gas + Bio-Slurry" },
  { from: "Bio-Slurry", arrow: "fertilizes", to: "Napier Grass" },
  { from: "Napier", arrow: "feeds back to", to: "Cattle" },
  { from: "Solar", arrow: "powers", to: "Farm Operations" },
];

export function EcosystemPage() {
  return (
    <div>
      <PageHero
        title="The Circular Ecosystem"
        titleBn="সার্কুলার ইকোসিস্টেম"
        subtitle="Cattle, energy, soil, and food in one closed loop. Every waste becomes an input. Every input reduces cost. Every cycle builds resilience."
      />

      {/* Circular Logic Flow */}
      <PageSection>
        <SectionHeading title="Input → Process → Output → Value" subtitle="The core logic of the Kutirchar EcoFarm circular system. Each arrow is a real, documented transfer of value." center />

        {/* Visual flow diagram */}
        <div style={{ background: COLORS.fieldMist, borderRadius: 16, padding: "32px 24px", marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "8px 0" }}>
            {circularLogic.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ background: COLORS.kutircharGreen, color: "white", borderRadius: 8, padding: "8px 16px", fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700 }}>
                  {step.from}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 10px" }}>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 10, color: "#6b7280", fontStyle: "italic" }}>{step.arrow}</span>
                  <span style={{ fontSize: 18, color: COLORS.kutircharGreen, lineHeight: 1 }}>→</span>
                </div>
                {i === circularLogic.length - 1 && (
                  <div style={{ background: COLORS.solarGold, color: COLORS.deepFarmGreen, borderRadius: 8, padding: "8px 16px", fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700 }}>
                    {step.to}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(31,107,58,0.1)", borderRadius: 20, padding: "6px 16px" }}>
              <span style={{ fontSize: 14 }}>↺</span>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, fontWeight: 600 }}>Circular loop restarts — Napier feeds cattle again</span>
            </div>
          </div>
        </div>

        {/* System components */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {flow.map((item) => (
            <Card key={item.title} style={{ borderTop: `3px solid ${item.color}` }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: item.color, margin: 0 }}>{item.title}</p>
                </div>
                <PhaseChip phase={item.phase} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>Inputs</p>
                  {item.inputs.map((inp) => (
                    <div key={inp} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                      <span style={{ color: "#aaa", fontSize: 12, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{inp}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>Outputs</p>
                  {item.outputs.map((out) => (
                    <div key={out} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                      <span style={{ color: item.color, fontSize: 12, flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: item.bg, borderRadius: 8, padding: "8px 12px" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: item.color, fontWeight: 600, margin: 0 }}>📍 {item.phaseNote}</p>
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* Why circular */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="Why Circular?" subtitle="Each loop in the system reduces dependence on purchased inputs and increases farm resilience." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            { icon: "💸", title: "Reduces Input Cost", body: "Bio-slurry replaces chemical fertilizer. Napier silage reduces feed purchase. Biogas replaces LPG." },
            { icon: "♻️", title: "Zero Waste Target", body: "Manure → biogas → bio-slurry → fertilizer → fodder → manure. Nothing is wasted." },
            { icon: "🏦", title: "Bankable Model", body: "Documented circular outputs create verifiable income streams at each phase. Clear audit trail." },
            { icon: "🌱", title: "Soil Regeneration", body: "Bio-slurry improves soil organic matter over time. Long-term land value improvement." },
            { icon: "⚡", title: "Energy Independence", body: "Solar + biogas combination reduces dependence on grid and LPG supply chains." },
            { icon: "📡", title: "Monitored & Verified", body: "Digital monitoring ensures all outputs are measured and documented for governance purposes." },
          ].map((item) => (
            <div key={item.title} style={{ background: "white", borderRadius: 12, padding: "18px", border: "1px solid #e5eee9", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <CtaButton to="/products" size="lg">See Phase-Gated Products →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
