import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";

const cardStyles = [
  { color: COLORS.kutircharGreen, bg: "#f0f9f3" },
  { color: COLORS.bioOliveDeep, bg: "#f5f6ee" },
  { color: COLORS.kutircharGreen, bg: "#f0f9f3" },
  { color: COLORS.solarGold, bg: "#fffde7" },
  { color: COLORS.solarGold, bg: "#fffde7" },
  { color: COLORS.riverBlue, bg: "#eff6fb" },
];

export function EcosystemPage() {
  const { t } = useLocale();
  const e = t.ecosystem;

  return (
    <div>
      <PageHero
        title={e.heroTitle}
        subtitle={e.heroSubtitle}
      />

      {/* Circular Loop */}
      <PageSection>
        <SectionHeading title={e.loopTitle} subtitle={e.loopSubtitle} center />

        {/* Visual flow diagram */}
        <div style={{ background: COLORS.fieldMist, borderRadius: 16, padding: "32px 24px", marginBottom: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {e.loopNodes.map((node) => (
              <div key={node.num} style={{ background: "white", borderRadius: 12, padding: "16px", border: "1px solid #e5eee9", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ background: COLORS.kutircharGreen, color: "white", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{node.num}</span>
                <div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 3px" }}>{node.title}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0, lineHeight: 1.5 }}>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(31,107,58,0.1)", borderRadius: 20, padding: "6px 16px" }}>
              <span style={{ fontSize: 14 }}>↺</span>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, fontWeight: 600 }}>{e.loopRestart}</span>
            </div>
          </div>
        </div>

        {/* Breeding at the center */}
        <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "24px 28px", color: "white", marginBottom: 40, textAlign: "center" }}>
          <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{e.breedingCenterTitle}</p>
          <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.82)", maxWidth: 640, margin: "0 auto", lineHeight: 1.65 }}>{e.breedingCenterBody}</p>
        </div>

        {/* System components */}
        <SectionHeading title={e.systemsTitle} subtitle={e.systemsSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {e.flowCards.map((item, i) => {
            const style = cardStyles[i % cardStyles.length];
            return (
              <Card key={item.title} style={{ borderTop: `3px solid ${style.color}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{item.icon}</span>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: style.color, margin: 0 }}>{item.title}</p>
                  </div>
                  <PhaseChip phase={item.phase as "Now" | "Next" | "Later"} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>{e.inputsLabel}</p>
                    {item.inputs.map((inp) => (
                      <div key={inp} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                        <span style={{ color: "#aaa", fontSize: 12, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{inp}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>{e.outputsLabel}</p>
                    {item.outputs.map((out) => (
                      <div key={out} style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                        <span style={{ color: style.color, fontSize: 12, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: style.bg, borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: style.color, fontWeight: 600, margin: 0 }}>📍 {item.phaseNote}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </PageSection>

      {/* Bankable + financial impact */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <SectionHeading title={e.bankableTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {e.bankableItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={e.impactTitle} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#888", lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>{e.impactNote}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.impactRows.map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", background: "white", borderRadius: 8, padding: "10px 14px", border: "1px solid #e5eee9" }}>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText }}>{row.label}</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, color: COLORS.kutircharGreen }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* Why circular */}
      <PageSection>
        <SectionHeading title={e.whyTitle} subtitle={e.whySubtitle} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {e.whyItems.map((item) => (
            <div key={item.title} style={{ background: "white", borderRadius: 12, padding: "18px", border: "1px solid #e5eee9", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <CtaButton to="/products" size="lg">{e.seeProducts} →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
