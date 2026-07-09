import { motion } from "framer-motion";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton, ProofCard } from "../shared/Shared";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem } from "../shared/motion";

const statusColors: Record<string, string> = {
  notStarted: "#888",
  inProgress: COLORS.riverBlue,
  openGap: COLORS.riskRed,
  notApplicable: COLORS.bioOliveDeep,
};

export function ProofPage() {
  const { t } = useLocale();
  const p = t.proof;

  return (
    <div>
      <PageHero
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
        dark
      />

      {/* Privacy notice */}
      <section style={{ background: COLORS.solarGold, padding: "10px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.deepFarmGreen, margin: 0, textAlign: "center", fontWeight: 600 }}>
            {p.privacyBanner}
          </p>
        </div>
      </section>

      {/* Audit Ledger — rows cascade in */}
      <PageSection>
        <Reveal>
          <SectionHeading
            title={p.ledgerTitle}
            subtitle={p.ledgerSubtitle}
          />
        </Reveal>
        <div style={{ overflowX: "auto", marginBottom: 32 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONTS.sans, fontSize: 13 }}>
            <thead>
              <tr style={{ background: COLORS.deepFarmGreen }}>
                {p.tableHeaders.map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "white", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.auditRows.map((row, i) => {
                const statusColor = statusColors[row.statusKey] ?? "#888";
                return (
                  <motion.tr
                    key={row.gap}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: MOTION.viewportMargin }}
                    transition={{ duration: MOTION.dur.base, ease: EASE, delay: i * 0.05 }}
                    style={{ background: i % 2 === 0 ? "#fafafa" : "white", borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.charcoalText }}>{row.gap}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ color: statusColor, fontWeight: 700, fontSize: 12 }}>● {row.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#555" }}>{row.evidence}</td>
                    <td style={{ padding: "12px 16px", color: COLORS.riskRed, fontSize: 12 }}>{row.stopRule}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Stop rules callout — slam-in */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: MOTION.viewportMargin }}
          transition={{ duration: MOTION.dur.base, ease: EASE }}
          style={{ background: "#fff5f5", border: `2px solid #fecdca`, borderRadius: 12, padding: "24px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>🛑</span>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: "#7f1d1d", margin: 0 }}>{p.stopRulesTitle}</p>
          </div>
          <Stagger stagger={0.05} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
            {p.stopRules.map((rule) => (
              <StaggerItem key={rule} y={8}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: COLORS.riskRed, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#7f1d1d", lineHeight: 1.55 }}>{rule}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </motion.div>
      </PageSection>

      {/* Finance & Breeding governance */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <Reveal>
            <SectionHeading title={p.financeTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {p.financeItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading title={p.breedingTitle} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{p.breedingBody}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{p.breedingRecordsLabel}</p>
            <Stagger stagger={0.04} style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.breedingRecords.map((r) => (
                <StaggerItem key={r} y={6}>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 11, background: "white", color: COLORS.charcoalText, border: "1px solid #e5eee9", padding: "2px 8px", borderRadius: 10, display: "inline-block" }}>{r}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </PageSection>

      {/* Evidence Status */}
      <PageSection>
        <Reveal>
          <SectionHeading title={p.evidenceTitle} subtitle={p.evidenceSubtitle} />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 28 }}>
          {p.evidenceCards.map((card) => (
            <StaggerItem key={card.label} style={{ height: "100%" }}>
              <ProofCard label={card.label} status={card.status as "verified" | "pending" | "missing"} note={card.note} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5eee9", padding: "20px 24px" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: COLORS.charcoalText }}>{p.requestNoteLabel}</strong> {p.requestNote}
            </p>
          </div>
        </Reveal>
      </PageSection>

      {/* Financing sources */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading title={p.financingTitle} subtitle={p.financingSubtitle} />
        </Reveal>
        <Stagger stagger={0.04} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {p.financingItems.map((item) => (
            <StaggerItem key={item} y={8}>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "white", border: "1px solid #e5eee9", borderRadius: 8, padding: "8px 14px", display: "inline-block" }}>{item}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* Zone system */}
      <PageSection>
        <Reveal>
          <SectionHeading title={p.zoneTitle} subtitle={p.zoneSubtitle} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 28 }}>
          <Reveal x={-20} y={0}>
            <Card style={{ borderLeft: `4px solid ${COLORS.kutircharGreen}`, height: "100%" }}>
              <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.zoneA.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 12px" }}>{p.zoneA.sub}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{p.zoneA.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.zoneA.uses.map((u) => (
                  <span key={u} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "#f0f9f3", color: COLORS.kutircharGreen, border: "1px solid #c0ddc8", padding: "2px 8px", borderRadius: 10 }}>{u}</span>
                ))}
              </div>
            </Card>
          </Reveal>
          <Reveal x={20} y={0} delay={0.1}>
            <Card style={{ borderLeft: `4px solid ${COLORS.riverBlue}`, height: "100%" }}>
              <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, color: COLORS.riverBlue, margin: "0 0 6px" }}>{p.zoneB.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 12px" }}>{p.zoneB.sub}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{p.zoneB.body}</p>
              <StopRule>{p.zoneB.stopRule}</StopRule>
              <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.zoneB.uses.map((u) => (
                  <span key={u} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "#eff6fb", color: COLORS.riverBlue, border: "1px solid #b8d4e0", padding: "2px 8px", borderRadius: 10 }}>✓ {u}</span>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </PageSection>

      {/* Request CTA */}
      <PageSection bg={COLORS.deepFarmGreen} py={48}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, color: "white", margin: "0 0 12px" }}>{p.ctaTitle}</h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.72)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.65 }}>
              {p.ctaBody}
            </p>
            <CtaButton to="/contact" variant="gold" size="lg">{p.ctaButton} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>
    </div>
  );
}
