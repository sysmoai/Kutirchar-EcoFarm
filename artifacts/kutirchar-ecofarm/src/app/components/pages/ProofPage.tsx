import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton, ProofCard } from "../shared/Shared";
import { useLocale } from "../shared/i18n";

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

      {/* Audit Ledger */}
      <PageSection>
        <SectionHeading
          title={p.ledgerTitle}
          subtitle={p.ledgerSubtitle}
        />
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
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: "#7f1d1d", margin: 0 }}>{p.stopRulesTitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
            {p.stopRules.map((rule) => (
              <div key={rule} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: COLORS.riskRed, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#7f1d1d", lineHeight: 1.55 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Finance & Breeding governance */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <SectionHeading title={p.financeTitle} />
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {p.financeItems.map((item) => (
                <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={p.breedingTitle} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{p.breedingBody}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{p.breedingRecordsLabel}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.breedingRecords.map((r) => (
                <span key={r} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "white", color: COLORS.charcoalText, border: "1px solid #e5eee9", padding: "2px 8px", borderRadius: 10 }}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* Evidence Status */}
      <PageSection>
        <SectionHeading title={p.evidenceTitle} subtitle={p.evidenceSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 28 }}>
          {p.evidenceCards.map((card) => (
            <ProofCard key={card.label} label={card.label} status={card.status as "verified" | "pending" | "missing"} note={card.note} />
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5eee9", padding: "20px 24px" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: COLORS.charcoalText }}>{p.requestNoteLabel}</strong> {p.requestNote}
          </p>
        </div>
      </PageSection>

      {/* Financing sources */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title={p.financingTitle} subtitle={p.financingSubtitle} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {p.financingItems.map((item) => (
            <span key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "white", border: "1px solid #e5eee9", borderRadius: 8, padding: "8px 14px" }}>{item}</span>
          ))}
        </div>
      </PageSection>

      {/* Zone system */}
      <PageSection>
        <SectionHeading title={p.zoneTitle} subtitle={p.zoneSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 28 }}>
          <Card style={{ borderLeft: `4px solid ${COLORS.kutircharGreen}` }}>
            <p style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 600, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.zoneA.title}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 12px" }}>{p.zoneA.sub}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{p.zoneA.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.zoneA.uses.map((u) => (
                <span key={u} style={{ fontFamily: FONTS.sans, fontSize: 11, background: "#f0f9f3", color: COLORS.kutircharGreen, border: "1px solid #c0ddc8", padding: "2px 8px", borderRadius: 10 }}>{u}</span>
              ))}
            </div>
          </Card>
          <Card style={{ borderLeft: `4px solid ${COLORS.riverBlue}` }}>
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
        </div>
      </PageSection>

      {/* Request CTA */}
      <PageSection bg={COLORS.deepFarmGreen} py={48}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, color: "white", margin: "0 0 12px" }}>{p.ctaTitle}</h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.72)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.65 }}>
            {p.ctaBody}
          </p>
          <CtaButton to="/contact" variant="gold" size="lg">{p.ctaButton} →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
