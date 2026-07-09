import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, Card, StopRule, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";

const products = {
  now: [
    { title: "Vendor Onboarding — Soil Test", body: "Accepting quotes from certified soil testing labs. Priority: SPT bore testing for Zone A foundation planning. Contact us to submit vendor credentials.", cta: { to: "/contact", label: "Submit Vendor Inquiry" } },
    { title: "Vendor Onboarding — Survey", body: "Boundary survey contractor required for Zone A land demarcation and Zone B survey. Must be licensed by the district land office.", cta: { to: "/contact", label: "Submit Survey Quote" } },
    { title: "Vendor Onboarding — Solar Quotes", body: "Requesting solar installation quotes for 100–500W rooftop system. Must include installation, wiring, inverter, and monitoring.", cta: { to: "/contact", label: "Submit Solar Quote" } },
    { title: "Partnership Discussions", body: "Open to discussions with NGOs, development organisations, and agricultural institutions about Phase 1–2 collaboration. No commitments yet — discussions only.", cta: { to: "/contact", label: "Begin Discussion" } },
  ],
  next: [
    { title: "Livestock Pilot Outputs", body: "When Phase 1 cattle operations are stable: fresh dairy for local sale. Volume will be small (2–3 cows). No claims until animals are in place and health records exist.", gated: "Gate: Phase 1 cattle operational & documented" },
    { title: "Compost / Vermicompost", body: "Pilot organic compost from cattle manure and Napier residue. For local farmers and home gardens. Volume TBD after pilot.", gated: "Gate: Phase 1 stable, manure accumulation sufficient" },
    { title: "Napier Fodder Surplus", body: "Fresh Napier grass surplus available to nearby livestock farmers. Subject to seasonal availability and our own feed requirements.", gated: "Gate: Napier established & surplus confirmed" },
    { title: "Bio-Slurry Fertilizer", body: "Liquid organic fertilizer from biogas digester effluent. For local farmers as soil amendment. Pricing and volume after Phase 3.", gated: "Gate: Phase 3 biogas operational" },
  ],
  later: [
    { title: "Training / Farm Tours", body: "Educational visits and training on circular farming, biogas operation, and digital monitoring. Available after Phase 3 is stable and digital monitoring is live.", gated: "Gate: Phase 3 verified + monitoring system operational" },
    { title: "Smart Monitoring Demo", body: "Live farm dashboard demonstration for agricultural institutions, development organisations, and other farmers. After our own monitoring system is proven.", gated: "Gate: Starlink + CCTV + dashboard fully operational" },
    { title: "Service Apartment", body: "Demand-gated only. A small guest/service accommodation on Zone A (after all legal verifications). Will not be planned until rental demand is formally verified through inquiry records.", gated: "Gate: Legal clearance + verified demand + Phase 4 stable" },
    { title: "Brand Consultancy", body: "Advising rural farms on circular energy and documentation best practices. Far future — only after Kutirchar EcoFarm is a proven and documented reference site.", gated: "Gate: All phases 0–4 completed & externally verified" },
  ],
};

export function ProductsPage() {
  return (
    <div>
      <PageHero
        title="Products & Services"
        titleBn="পণ্য ও সেবা"
        subtitle="Phase-gated offerings. We only offer what we can currently deliver. Future services are labelled Next or Later — they are not yet available."
      />

      {/* Phase policy */}
      <section style={{ background: COLORS.charcoalText, padding: "14px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
          {(["Now", "Next", "Later"] as const).map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PhaseChip phase={p} />
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                {p === "Now" ? "Active / available today" : p === "Next" ? "Next phase — gates must pass" : "Future — demand-gated"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* NOW */}
      <PageSection>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <PhaseChip phase="Now" size="md" />
          <div>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>Available Now</h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>Vendor onboarding, partnerships, and consultation discussions are open today.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {products.now.map((item) => (
            <Card key={item.title}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{item.body}</p>
              <CtaButton to={item.cta.to} variant="primary" size="sm">{item.cta.label} →</CtaButton>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* NEXT */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <PhaseChip phase="Next" size="md" />
          <div>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>Next Phase</h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>Available only after Phase 1 verification gates are passed. Not yet active.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {products.next.map((item) => (
            <Card key={item.title} style={{ opacity: 0.9 }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 12px" }}>{item.body}</p>
              <div style={{ background: "#eff6fb", border: "1px solid #b8d4e0", borderRadius: 8, padding: "8px 12px" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.riverBlue, fontWeight: 600, margin: 0 }}>⏳ {item.gated}</p>
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* LATER */}
      <PageSection>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <PhaseChip phase="Later" size="md" />
          <div>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>Later — Demand-Gated</h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>Far future. Only unlocked after all preceding phases are verified and stable.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {products.later.map((item) => (
            <Card key={item.title} style={{ opacity: 0.75 }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: "#6b7280", margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: "0 0 12px" }}>{item.body}</p>
              <div style={{ background: "#f5f6ee", border: "1px solid #cdd4a8", borderRadius: 8, padding: "8px 12px" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.bioOliveDeep, fontWeight: 600, margin: 0 }}>🔒 {item.gated}</p>
              </div>
            </Card>
          ))}
        </div>
        <StopRule>
          Later-phase services are not currently available and are not guaranteed. They are listed only to show the potential direction of the project after all required verification gates have been passed and documented.
        </StopRule>
      </PageSection>

      {/* Inquiry */}
      <PageSection bg={COLORS.deepFarmGreen} py={48}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, color: "white", margin: "0 0 12px" }}>Submit an Inquiry</h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.72)", maxWidth: 460, margin: "0 auto 24px", lineHeight: 1.65 }}>
            Whether you are a vendor, buyer, partner, or investor — submit a specific inquiry and we will respond within 3 business days.
          </p>
          <CtaButton to="/contact" variant="gold" size="lg">Go to Contact Form →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
