import { COLORS, FONTS, BRAND } from "../../brand";
import { PageHero, PageSection, SectionHeading, PhaseItem, InfoRow, CtaButton, StopRule } from "../shared/Shared";
import { useLocale } from "../shared/i18n";

export function ProjectPage() {
  const { t, locale } = useLocale();
  const p = t.project;

  return (
    <div>
      <PageHero
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
      />

      {/* What & Why */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          <div>
            <SectionHeading title={p.whatIsTitle} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              {p.whatIsP1}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              {p.whatIsP2}
            </p>
            <StopRule>
              {p.zoneBStopRule}
            </StopRule>
          </div>
          <div>
            <SectionHeading title={p.whyTitle} />
            {p.whyItems.map((item) => (
              <div key={item.heading} style={{ marginBottom: 18 }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 4px" }}>{item.heading}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Founder */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "start" }}>
          <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "28px", color: "white" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" as const }}>
              {p.founderLabel}
            </p>
            <p style={{ fontFamily: FONTS.serif, fontSize: 17, color: "white", lineHeight: 1.65, margin: "0 0 18px", fontStyle: "italic" }}>
              {p.founderQuote}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 2px" }}>{p.founderName}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{p.founderRole}</p>
          </div>
          <div>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: "0 0 20px" }}>
              {p.founderBio}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.missionTitle}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 18px" }}>{p.missionBody}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.vision10Title}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 12px" }}>{p.vision10Body}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {p.tenYearPhases.map((tp) => (
                <div key={tp.phase} style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 8, padding: "10px 12px" }}>
                  <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: "#6b7280", margin: "0 0 2px" }}>{tp.phase}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{tp.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* Location */}
      <PageSection>
        <SectionHeading title={p.locationTitle} subtitle={p.locationSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          <div style={{ background: "white", borderRadius: 12, padding: "24px", border: "1px solid #e5eee9" }}>
            {p.locationRows.map((row) => <InfoRow key={row.label} label={row.label} value={row.value} />)}
          </div>
          <div style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.72)", marginBottom: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
              {p.landStatusTitle}
            </p>
            {p.landStatus.map((item) => (
              <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ color: "#f87171", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>○</span>
                <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* Phase Roadmap */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading
          title={p.roadmapTitle}
          subtitle={p.roadmapSubtitle}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {p.phases.map((ph) => <PhaseItem key={ph.phase} phase={ph.phase} label={ph.label} title={ph.title} items={ph.items} active={ph.phase === p.phases[0].phase} />)}
        </div>
        <StopRule>
          {p.roadmapStopRule}
        </StopRule>
      </PageSection>

      {/* People */}
      <PageSection>
        <SectionHeading title={p.peopleTitle} subtitle={p.peopleSubtitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 24 }}>
          {p.people.map((person) => (
            <div key={person.name} style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 12, padding: "20px" }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 2px" }}>{person.name}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{person.role}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{person.bio}</p>
            </div>
          ))}
        </div>
        <StopRule>{p.kycNote}</StopRule>
      </PageSection>

      {/* Positioning */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title={p.positioningTitle} subtitle={p.positioningSubtitle} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {p.audiences.map((item) => (
            <div key={item.title} style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 12, padding: "20px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <CtaButton to="/proof" size="lg">{p.viewProofPack} →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
