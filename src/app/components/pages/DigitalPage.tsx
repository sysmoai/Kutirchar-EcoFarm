import { motion } from "framer-motion";
import isometricImg from "../../../assets/images/digital-isometric.webp";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem, IllustrativeImage } from "../shared/motion";

export function DigitalPage() {
  const { t } = useLocale();
  const d = t.digital;

  return (
    <div>
      <PageHero
        title={d.heroTitle}
        subtitle={d.heroSubtitle}
      />

      {/* Architecture overview — layers build up one by one */}
      <PageSection>
        <Reveal>
          <SectionHeading title={d.archTitle} subtitle={d.archSubtitle} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 32 }}>
          {d.modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: MOTION.viewportMargin }}
              transition={{ duration: MOTION.dur.slow, ease: EASE, delay: i * 0.14 }}
              style={{ height: "100%" }}
            >
              <div style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white", height: "100%" }}>
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
            </motion.div>
          ))}
        </div>

        {/* Illustrative farm-tech overview */}
        <Reveal>
          <IllustrativeImage
            src={isometricImg}
            alt={d.archTitle}
            width={1600}
            height={900}
            radius={16}
            style={{ marginBottom: 40 }}
          />
        </Reveal>

        <Reveal>
          <SectionHeading title={d.gatesTitle} />
        </Reveal>
        <Stagger stagger={0.04} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {d.gates.map((g) => (
            <StaggerItem key={g} y={8}>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "#fafafa", border: "1px solid #ebebeb", borderRadius: 8, padding: "6px 12px", display: "inline-block" }}>{g}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <StopRule>
            {d.stopRule}
          </StopRule>
        </Reveal>
      </PageSection>

      {/* System detail cards */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading title={d.systemsTitle} subtitle={d.systemsSubtitle} />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {d.systems.map((sys) => (
            <StaggerItem key={sys.title} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <Card style={{ height: "100%" }}>
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
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* Breeding link */}
      <PageSection>
        <Reveal>
          <SectionHeading title={d.breedingLinkTitle} />
        </Reveal>
        <Stagger stagger={0.04} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {d.breedingLinkItems.map((item) => (
            <StaggerItem key={item} y={8}>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, background: "#f0f9f3", border: "1px solid #c0ddc8", borderRadius: 8, padding: "6px 12px", display: "inline-block" }}>{item}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* Rollout sequence — steps slide in from the left */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading title={d.rolloutTitle} subtitle={d.rolloutSubtitle} />
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
          {d.rollout.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: MOTION.viewportMargin }}
              transition={{ duration: MOTION.dur.base, ease: EASE, delay: i * 0.1 }}
              style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
            >
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.kutircharGreen, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.step}</div>
              <div style={{ flex: 1, background: "white", borderRadius: 10, padding: "14px 18px", border: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: 0 }}>{item.title}</p>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.kutircharGreen, fontWeight: 600, whiteSpace: "nowrap" as const, marginLeft: 8 }}>{item.cost}</span>
                </div>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", margin: 0 }}>{item.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Outputs & financing */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          <Reveal>
            <SectionHeading title={d.outputsTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {d.outputsItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>{d.financingNote}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#888", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{d.privacyNote}</p>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ marginTop: 32 }}>
            <CtaButton to="/contact" variant="primary">{d.vendorCta} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>
    </div>
  );
}
