import { motion } from "framer-motion";
import fieldsImg from "../../../assets/images/project-fields.webp";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, PhaseItem, InfoRow, CtaButton, StopRule } from "../shared/Shared";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem, IllustrativeImage, MonogramAvatar } from "../shared/motion";

export function ProjectPage() {
  const { t } = useLocale();
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
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading title={p.whyTitle} />
            <Stagger>
              {p.whyItems.map((item) => (
                <StaggerItem key={item.heading} y={12}>
                  <div style={{ marginBottom: 18 }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 4px" }}>{item.heading}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
        <Reveal>
          <IllustrativeImage
            src={fieldsImg}
            alt={p.whatIsTitle}
            width={1200}
            height={900}
            radius={16}
            style={{ marginTop: 40 }}
          />
        </Reveal>
      </PageSection>

      {/* Founder */}
      <PageSection bg={COLORS.fieldMist}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "start" }}>
          <Reveal>
            <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "28px", color: "white" }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" as const }}>
                {p.founderLabel}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: MOTION.viewportMargin }}
                transition={{ duration: MOTION.dur.scene, ease: EASE, delay: 0.2 }}
                style={{ fontFamily: FONTS.serif, fontSize: 17, color: "white", lineHeight: 1.65, margin: "0 0 18px", fontStyle: "italic" }}
              >
                {p.founderQuote}
              </motion.p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <MonogramAvatar name={p.founderName} size={44} />
                <div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 2px" }}>{p.founderName}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{p.founderRole}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: "0 0 20px" }}>
              {p.founderBio}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.missionTitle}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 18px" }}>{p.missionBody}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{p.vision10Title}</p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 12px" }}>{p.vision10Body}</p>
            <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
              {p.tenYearPhases.map((tp) => (
                <StaggerItem key={tp.phase} y={10} style={{ height: "100%" }}>
                  <div style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 8, padding: "10px 12px", height: "100%" }}>
                    <p style={{ fontFamily: FONTS.mono, fontSize: 10, color: "#6b7280", margin: "0 0 2px" }}>{tp.phase}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>{tp.title}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </PageSection>

      {/* Location */}
      <PageSection>
        <Reveal>
          <SectionHeading title={p.locationTitle} subtitle={p.locationSubtitle} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          <Reveal>
            <div style={{ background: "white", borderRadius: 12, padding: "24px", border: "1px solid #e5eee9", height: "100%" }}>
              {p.locationRows.map((row) => <InfoRow key={row.label} label={row.label} value={row.value} />)}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white", height: "100%" }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.72)", marginBottom: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                {p.landStatusTitle}
              </p>
              <Stagger>
                {p.landStatus.map((item) => (
                  <StaggerItem key={item} y={8}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <span style={{ color: "#f87171", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>○</span>
                      <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </PageSection>

      {/* Phase Roadmap — progress line draws in, phases unlock in order */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading
            title={p.roadmapTitle}
            subtitle={p.roadmapSubtitle}
          />
        </Reveal>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: MOTION.viewportMargin }}
          transition={{ duration: MOTION.dur.scene * 1.2, ease: EASE }}
          style={{ height: 3, background: `linear-gradient(90deg, ${COLORS.kutircharGreen}, ${COLORS.solarGold})`, borderRadius: 2, transformOrigin: "left center", marginBottom: 20 }}
          aria-hidden="true"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 }}>
          {p.phases.map((ph, i) => (
            <motion.div
              key={ph.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: MOTION.viewportMargin }}
              transition={{ duration: MOTION.dur.slow, ease: EASE, delay: 0.15 + i * 0.18 }}
              style={{ height: "100%" }}
            >
              <PhaseItem phase={ph.phase} label={ph.label} title={ph.title} items={ph.items} active={ph.phase === p.phases[0].phase} />
            </motion.div>
          ))}
        </div>
        <Reveal>
          <StopRule>
            {p.roadmapStopRule}
          </StopRule>
        </Reveal>
      </PageSection>

      {/* People — monogram avatars (no real faces policy) */}
      <PageSection>
        <Reveal>
          <SectionHeading title={p.peopleTitle} subtitle={p.peopleSubtitle} />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 24 }}>
          {p.people.map((person) => (
            <StaggerItem key={person.name} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <div style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 12, padding: "20px", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <MonogramAvatar name={person.name} size={46} />
                    <div>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 2px" }}>{person.name}</p>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600, color: COLORS.kutircharGreen, margin: 0 }}>{person.role}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{person.bio}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <StopRule>{p.kycNote}</StopRule>
        </Reveal>
      </PageSection>

      {/* P5: Breed Science deep section */}
      {p.breedScience && (
        <PageSection bg={COLORS.fieldMist}>
          <Reveal>
            <SectionHeading title={p.breedScience.title} />
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "-10px 0 18px" }}>{p.breedScience.orgs}</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {p.breedScience.process.map((step: string, i: number) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: "white", borderRadius: 10, border: "1px solid #e5eee9", padding: "14px 16px", height: "100%" }}>
                  <p style={{ fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>0{i + 1}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: "#444", lineHeight: 1.65, margin: 0 }}>{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: "16px 0 0", lineHeight: 1.6, fontStyle: "italic" }}>
              {p.breedScience.note}
            </p>
          </Reveal>
        </PageSection>
      )}

      {/* P5: Sub-project plans (6 sub-projects with full CAPEX/OPEX/stop rules) */}
      {p.subProjects && (
        <PageSection>
          <Reveal>
            <SectionHeading title="Sub-Project Plans (CAPEX / OPEX / Stop Rules)" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {p.subProjects.map((sp: any, i: number) => (
              <Reveal key={sp.name} delay={i * 0.05}>
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5eee9", padding: "18px", height: "100%" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{sp.name}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: "0 0 10px" }}>{sp.goal}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "0 0 4px" }}><strong>Science:</strong> {sp.science}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "0 0 4px" }}><strong>CAPEX:</strong> {sp.capex}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "0 0 4px" }}><strong>OPEX:</strong> {sp.opex}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#888", margin: "0 0 4px" }}><strong>Timing:</strong> {sp.timing}</p>
                  <div style={{ background: "#fff5f5", borderRadius: 6, padding: "8px 10px", marginTop: 10 }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#7f1d1d", margin: 0, fontWeight: 600 }}>Stop: {sp.stopRule}</p>
                  </div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 10, color: "#aaa", margin: "8px 0 0" }}>Proof: {sp.proof}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}

      {/* P5: 5-Year Roadmap */}
      {p.roadmap5Year && (
        <PageSection bg={COLORS.fieldMist}>
          <Reveal>
            <SectionHeading title={p.roadmap5Year.title} />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {p.roadmap5Year.phases.map((ph: any, i: number) => (
              <Reveal key={ph.year} delay={i * 0.08}>
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5eee9", padding: "16px", height: "100%", borderTop: `3px solid ${i === 0 ? COLORS.kutircharGreen : i === 4 ? COLORS.solarGold : COLORS.riverBlue}` }}>
                  <p style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 4px" }}>{ph.year}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 8px" }}>{ph.label}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {ph.gates.map((g: string) => (
                      <span key={g} style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#555", lineHeight: 1.5 }}>• {g}</span>
                    ))}
                  </div>
                  <span style={{ display: "inline-block", marginTop: 10, fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: ph.status === "\u099a\u09b2\u09ae\u09be\u09a8" || ph.status === "In Progress" ? COLORS.kutircharGreen : "#888", background: ph.status === "\u099a\u09b2\u09ae\u09be\u09a8" || ph.status === "In Progress" ? "#f0f9f3" : "#f5f5f5", padding: "2px 8px", borderRadius: 4 }}>{ph.status}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}

      {/* Positioning */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <SectionHeading title={p.positioningTitle} subtitle={p.positioningSubtitle} center />
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {p.audiences.map((item) => (
            <StaggerItem key={item.title} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <div style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 12, padding: "20px", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 8px" }}>{item.title}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <CtaButton to="/proof" size="lg">{p.viewProofPack} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>
    </div>
  );
}
