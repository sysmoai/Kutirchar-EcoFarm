import { motion } from "framer-motion";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem } from "../shared/motion";

export function ProductsPage() {
  const { t } = useLocale();
  const pr = t.products;

  return (
    <div>
      <PageHero
        title={pr.heroTitle}
        subtitle={pr.heroSubtitle}
      />

      {/* Phase policy */}
      <section style={{ background: COLORS.charcoalText, padding: "14px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
          {([
            { p: "Now" as const, label: pr.legendNow },
            { p: "Next" as const, label: pr.legendNext },
            { p: "Later" as const, label: pr.legendLater },
          ]).map(({ p, label }) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PhaseChip phase={p} />
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NOW */}
      <PageSection>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <PhaseChip phase="Now" size="md" />
            <div>
              <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{pr.nowTitle}</h2>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>{pr.nowSubtitle}</p>
            </div>
          </div>
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {pr.now.map((item) => (
            <StaggerItem key={item.title} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <Card style={{ height: "100%" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{item.body}</p>
                  <CtaButton to="/contact" variant="primary" size="sm">{item.ctaLabel} →</CtaButton>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* NEXT */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <PhaseChip phase="Next" size="md" />
            <div>
              <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{pr.nextTitle}</h2>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>{pr.nextSubtitle}</p>
            </div>
          </div>
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {pr.next.map((item) => (
            <StaggerItem key={item.title} style={{ height: "100%" }}>
              <Card style={{ opacity: 0.9, height: "100%" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 8px" }}>{item.title}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 12px" }}>{item.body}</p>
                <div style={{ background: "#eff6fb", border: "1px solid #b8d4e0", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.riverBlue, fontWeight: 600, margin: 0 }}>⏳ {item.gated}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* LATER */}
      <PageSection>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <PhaseChip phase="Later" size="md" />
            <div>
              <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{pr.laterTitle}</h2>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "4px 0 0" }}>{pr.laterSubtitle}</p>
            </div>
          </div>
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {pr.later.map((item) => (
            <StaggerItem key={item.title} style={{ height: "100%" }}>
              <Card style={{ opacity: 0.75, height: "100%" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: "#6b7280", margin: "0 0 8px" }}>{item.title}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: "0 0 12px" }}>{item.body}</p>
                <div style={{ background: "#f5f6ee", border: "1px solid #cdd4a8", borderRadius: 8, padding: "8px 12px" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.bioOliveDeep, fontWeight: 600, margin: 0 }}>🔒 {item.gated}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <StopRule>
            {pr.laterStopRule}
          </StopRule>
        </Reveal>
      </PageSection>

      {/* Why us */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading title={pr.whyUsTitle} center />
        </Reveal>
        <Stagger stagger={0.04} style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {pr.whyUs.map((item) => (
            <StaggerItem key={item} y={8}>
              <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "white", border: "1px solid #e5eee9", borderRadius: 8, padding: "8px 14px", display: "inline-block" }}>{item}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* Inquiry */}
      <PageSection bg={COLORS.deepFarmGreen} py={48}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, color: "white", margin: "0 0 12px" }}>{pr.inquiryTitle}</h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.72)", maxWidth: 460, margin: "0 auto 24px", lineHeight: 1.65 }}>
              {pr.inquiryBody}
            </p>
            <CtaButton to="/contact" variant="gold" size="lg">{pr.inquiryCta} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>
    </div>
  );
}
