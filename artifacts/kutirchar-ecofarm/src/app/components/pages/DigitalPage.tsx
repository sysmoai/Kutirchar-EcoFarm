import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";

export function DigitalPage() {
  const { t } = useLocale();
  const d = t.digital;

  return (
    <div>
      <PageHero
        title={d.heroTitle}
        subtitle={d.heroSubtitle}
      />

      {/* Architecture overview */}
      <PageSection>
        <SectionHeading title={d.archTitle} subtitle={d.archSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          {d.modules.map((mod) => (
            <div key={mod.title} style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 28, margin: "0 0 6px" }}>{mod.icon}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>{mod.title}</p>
                </div>
                <PhaseChip phase={mod.phase as "Now" | "Next" | "Later"} />
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {mod.items.map((item) => <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 3 }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <SectionHeading title={d.gatesTitle} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {d.gates.map((g) => (
            <span key={g} style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "#fafafa", border: "1px solid #ebebeb", borderRadius: 8, padding: "6px 12px" }}>{g}</span>
          ))}
        </div>

        <StopRule>
          {d.stopRule}
        </StopRule>
      </PageSection>

      {/* System detail cards */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title={d.systemsTitle} subtitle={d.systemsSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {d.systems.map((sys) => (
            <Card key={sys.title}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{sys.icon}</span>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: 0 }}>{sys.title}</p>
                </div>
                <PhaseChip phase={sys.phase as "Now" | "Next" | "Later"} />
              </div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{sys.desc}</p>

              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>{d.gatesLabel}</p>
              {sys.gates.map((g) => (
                <div key={g} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: COLORS.riskRed, flexShrink: 0, fontSize: 12, marginTop: 1 }}>○</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{g}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 12, paddingTop: 12 }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>{d.outputsLabel}</p>
                {sys.outputs.map((o) => (
                  <div key={o} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: COLORS.kutircharGreen, flexShrink: 0, fontSize: 12 }}>✓</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{o}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* Breeding link */}
      <PageSection>
        <SectionHeading title={d.breedingLinkTitle} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {d.breedingLinkItems.map((item) => (
            <span key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, background: "#f0f9f3", border: "1px solid #c0ddc8", borderRadius: 8, padding: "6px 12px" }}>{item}</span>
          ))}
        </div>
      </PageSection>

      {/* Rollout sequence */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title={d.rolloutTitle} subtitle={d.rolloutSubtitle} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
          {d.rollout.map((item) => (
            <div key={item.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.kutircharGreen, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.step}</div>
              <div style={{ flex: 1, background: "white", borderRadius: 10, padding: "14px 18px", border: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: 0 }}>{item.title}</p>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.kutircharGreen, fontWeight: 600, whiteSpace: "nowrap" as const, marginLeft: 8 }}>{item.cost}</span>
                </div>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", margin: 0 }}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Outputs & financing */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          <div>
            <SectionHeading title={d.outputsTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {d.outputsItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>{d.financingNote}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#888", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{d.privacyNote}</p>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <CtaButton to="/contact" variant="primary">{d.vendorCta} →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
