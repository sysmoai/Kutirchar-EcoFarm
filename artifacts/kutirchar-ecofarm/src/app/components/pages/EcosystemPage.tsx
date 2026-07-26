import { motion, useReducedMotion } from "framer-motion";
import aerialImg from "../../../assets/images/ecosystem-aerial.webp";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, Card, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem, IllustrativeImage } from "../shared/motion";

const cardStyles = [
  { color: COLORS.kutircharGreen, bg: "#f0f9f3" },
  { color: COLORS.bioOliveDeep, bg: "#f5f6ee" },
  { color: COLORS.kutircharGreen, bg: "#f0f9f3" },
  { color: COLORS.solarGold, bg: "#fffde7" },
  { color: COLORS.solarGold, bg: "#fffde7" },
  { color: COLORS.riverBlue, bg: "#eff6fb" },
];

// ── Circular loop diagram: SVG ring + SMIL particles + HTML node cards ──────
function EcoLoop({ nodes, centerTitle }: { nodes: { num: string; title: string; desc: string }[]; centerTitle: string }) {
  const reduced = useReducedMotion();
  const C = 320; // viewBox center
  const R = 240; // ring radius
  const ringPath = `M ${C + R} ${C} A ${R} ${R} 0 1 1 ${C - R} ${C} A ${R} ${R} 0 1 1 ${C + R} ${C}`;

  return (
    <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", aspectRatio: "1 / 1" }}>
      {/* Ring + flowing particles */}
      <svg viewBox="0 0 640 640" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <circle cx={C} cy={C} r={R} fill="none" stroke={COLORS.kutircharGreen} strokeOpacity={0.3} strokeWidth={2} strokeDasharray="4 8" />
        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            <circle key={i} r={5} fill={i % 2 === 0 ? COLORS.solarGold : COLORS.kutircharGreen} opacity={0.9}>
              <animateMotion dur="14s" repeatCount="indefinite" begin={`${-i * 3.5}s`} path={ringPath} />
            </circle>
          ))}
      </svg>

      {/* Center — breeding hub */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "38%", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.dur.slow, ease: EASE, delay: 0.2 }}
          style={{ background: COLORS.deepFarmGreen, borderRadius: "50%", aspectRatio: "1 / 1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10%", boxShadow: "0 8px 30px rgba(11,79,42,0.25)" }}
        >
          <span style={{ fontSize: 26, marginBottom: 6 }} aria-hidden="true">🐄</span>
          <p style={{ fontFamily: FONTS.serif, fontSize: "clamp(11px, 1.4vw, 15px)", fontWeight: 600, color: "white", margin: 0, lineHeight: 1.4 }}>{centerTitle}</p>
        </motion.div>
      </div>

      {/* Nodes around the ring */}
      {nodes.map((node, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + 37.5 * Math.cos(a);
        const y = 50 + 37.5 * Math.sin(a);
        return (
          <motion.div
            key={node.num}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px 0px" }}
            transition={{ duration: MOTION.dur.base, ease: EASE, delay: 0.1 + i * MOTION.stagger }}
            whileHover={{ scale: 1.05 }}
            style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", width: "24%", minWidth: 118 }}
          >
            <div style={{ background: "white", borderRadius: 12, border: "1px solid #dce8e0", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", padding: "10px 12px", textAlign: "center" }}>
              <span style={{ background: COLORS.kutircharGreen, color: "white", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{node.num}</span>
              <p style={{ fontFamily: FONTS.sans, fontSize: "clamp(10px, 1.2vw, 12.5px)", fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 3px", lineHeight: 1.35 }}>{node.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: "clamp(9px, 1vw, 10.5px)", color: "#666", margin: 0, lineHeight: 1.45 }}>{node.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

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
        <Reveal>
          <SectionHeading title={e.loopTitle} subtitle={e.loopSubtitle} center />
        </Reveal>

        {/* Desktop: circular diagram · Mobile: numbered grid */}
        <div className="eco-loop-diagram" style={{ marginBottom: 24 }}>
          <EcoLoop nodes={e.loopNodes} centerTitle={e.breedingCenterTitle} />
        </div>
        <div className="eco-loop-grid" style={{ background: COLORS.fieldMist, borderRadius: 16, padding: "32px 24px", marginBottom: 24 }}>
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {e.loopNodes.map((node) => (
              <StaggerItem key={node.num} y={12}>
                <div style={{ background: "white", borderRadius: 12, padding: "16px", border: "1px solid #e5eee9", display: "flex", gap: 10, alignItems: "flex-start", height: "100%" }}>
                  <span style={{ background: COLORS.kutircharGreen, color: "white", borderRadius: "50%", width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{node.num}</span>
                  <div>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 3px" }}>{node.title}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0, lineHeight: 1.5 }}>{node.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(31,107,58,0.1)", borderRadius: 20, padding: "6px 16px" }}>
              <span style={{ fontSize: 14 }}>↺</span>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, fontWeight: 600 }}>{e.loopRestart}</span>
            </div>
          </div>
        </Reveal>

        {/* Breeding at the center */}
        <Reveal>
          <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "24px 28px", color: "white", marginBottom: 40, textAlign: "center" }}>
            <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{e.breedingCenterTitle}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.82)", maxWidth: 640, margin: "0 auto", lineHeight: 1.65 }}>{e.breedingCenterBody}</p>
          </div>
        </Reveal>

        {/* Illustrative aerial view */}
        <Reveal>
          <IllustrativeImage
            src={aerialImg}
            alt={e.loopTitle}
            width={1600}
            height={900}
            radius={16}
            style={{ marginBottom: 40 }}
          />
        </Reveal>

        {/* System components */}
        <Reveal>
          <SectionHeading title={e.systemsTitle} subtitle={e.systemsSubtitle} />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {e.flowCards.map((item, i) => {
            const style = cardStyles[i % cardStyles.length];
            return (
              <StaggerItem key={item.title} style={{ height: "100%" }}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                  <Card style={{ borderTop: `3px solid ${style.color}`, height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{item.icon}</span>
                        <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: style.color, margin: 0 }}>{item.title}</p>
                      </div>
                      <PhaseChip phase={item.phase as "Now" | "Next" | "Later"} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 12 }}>
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
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </PageSection>

      {/* P5: Silage Science (deep process) */}
      {e.silageScience && (
        <PageSection bg="#faf8f0">
          <Reveal>
            <SectionHeading title={e.silageScience.title} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "-10px 0 18px" }}>{e.silageScience.source}</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {e.silageScience.steps.map((step: string, i: number) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5eee9", padding: "14px 16px", height: "100%" }}>
                  <p style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, color: COLORS.solarGold, margin: "0 0 6px" }}>0{i + 1}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.65, margin: 0 }}>{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}

      {/* P5: Biogas Science (deep process) */}
      {e.biogasScience && (
        <PageSection>
          <Reveal>
            <SectionHeading title={e.biogasScience.title} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "-10px 0 18px" }}>{e.biogasScience.source}</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <Reveal>
              <Card style={{ borderLeft: `4px solid ${COLORS.kutircharGreen}`, height: "100%" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 10px" }}>Inputs</p>
                {e.biogasScience.inputs.map((inp: string) => (
                  <p key={inp} style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.7, margin: "0 0 6px" }}>• {inp}</p>
                ))}
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card style={{ borderLeft: `4px solid ${COLORS.riverBlue}`, height: "100%" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 10px" }}>Process</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.7, margin: 0 }}>{e.biogasScience.process}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.16}>
              <Card style={{ borderLeft: `4px solid ${COLORS.solarGold}`, height: "100%" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 10px" }}>Outputs</p>
                {e.biogasScience.outputs.map((out: string) => (
                  <p key={out} style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.7, margin: "0 0 6px" }}>✓ {out}</p>
                ))}
              </Card>
            </Reveal>
          </div>
        </PageSection>
      )}

      {/* Bankable + financial impact */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <Reveal>
            <SectionHeading title={e.bankableTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {e.bankableItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading title={e.impactTitle} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#888", lineHeight: 1.6, margin: "0 0 14px", fontStyle: "italic" }}>{e.impactNote}</p>
            <Stagger style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.impactRows.map((row) => (
                <StaggerItem key={row.label} y={10}>
                  <div style={{ display: "flex", justifyContent: "space-between", background: "white", borderRadius: 8, padding: "10px 14px", border: "1px solid #e5eee9" }}>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText }}>{row.label}</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, color: COLORS.kutircharGreen }}>{row.value}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </PageSection>

      {/* P5: Solar Science */}
      {e.solarScience && (
        <PageSection>
          <Reveal>
            <SectionHeading title={e.solarScience.title} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "-10px 0 18px" }}>{e.solarScience.source}</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { label: "Capacity", value: e.solarScience.capacity },
              { label: "Use", value: e.solarScience.use },
              { label: "Net Metering", value: e.solarScience.netMetering },
              { label: "Saving", value: e.solarScience.saving },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5eee9", padding: "16px", height: "100%" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.08em", margin: "0 0 8px" }}>{item.label}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.65, margin: 0 }}>{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}

      {/* Why circular */}
      <PageSection>
        <Reveal>
          <SectionHeading title={e.whyTitle} subtitle={e.whySubtitle} center />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {e.whyItems.map((item) => (
            <StaggerItem key={item.title} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <div style={{ background: "white", borderRadius: 12, padding: "18px", border: "1px solid #e5eee9", textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <CtaButton to="/products" size="lg">{e.seeProducts} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>

      <style>{`
        .eco-loop-grid { display: none; }
        @media (max-width: 860px) {
          .eco-loop-diagram { display: none; }
          .eco-loop-grid { display: block; }
        }
      `}</style>
    </div>
  );
}
