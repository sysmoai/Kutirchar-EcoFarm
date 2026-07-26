import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import logoIcon from "../../../imports/image.png";
import heroImg from "../../../assets/images/hero-char-farm.webp";
import { BRAND, COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PhaseChip } from "../shared/PhaseChip";
import { PageSection, Card, StopRule, CtaButton } from "../shared/Shared";
import { useLocale, toLocaleDigits, parseLocaleNumber } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem, CountUp, Marquee } from "../shared/motion";

// ── Local: hero wordmark mask-reveal ─────────────────────────────────────────
function MaskReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: MOTION.dur.scene * 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Local: mini circular-loop teaser (decorative) ────────────────────────────
function EcoMiniLoop({ size = 72 }: { size?: number }) {
  const reduced = useReducedMotion();
  const r = size / 2 - 8;
  const c = size / 2;
  const dots = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return { x: c + r * Math.cos(a), y: c + r * Math.sin(a) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ display: "block" }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke={COLORS.kutircharGreen} strokeOpacity={0.25} strokeWidth={1.5} strokeDasharray="3 5" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3} fill={i % 2 === 0 ? COLORS.kutircharGreen : COLORS.solarGold} />
      ))}
      {!reduced && (
        <motion.circle
          cx={c}
          cy={c - r}
          r={4.5}
          fill={COLORS.solarGold}
          style={{ transformOrigin: `${c}px ${c}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        />
      )}
    </svg>
  );
}

export function HomePage() {
  const { t, locale } = useLocale();
  const h = t.home;
  const categoryLabel = (id: string) => t.updates.categories.find((c) => c.id === id)?.label ?? id;

  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <div>

      {/* ── Hero — char-land parallax (2 layers ≤12%) + wordmark mask-reveal ── */}
      <section ref={heroRef} style={{ background: COLORS.deepFarmGreen, padding: "72px 0 64px", position: "relative", overflow: "hidden" }}>
        {/* Layer 1 — illustrative char-land image, slow parallax */}
        <motion.div style={{ position: "absolute", inset: 0, y: reduced ? 0 : bgY }} aria-hidden="true">
          <img
            src={heroImg}
            alt=""
            width={1600}
            height={900}
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(11,79,42,0.93) 0%, rgba(31,107,58,0.88) 55%, rgba(11,79,42,0.82) 100%)` }} />
        </motion.div>
        {/* Layer 2 — dot pattern, faster parallax */}
        <motion.div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px", y: reduced ? 0 : patternY }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: MOTION.dur.slow, ease: EASE }}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
              >
                <span style={{ background: "rgba(242,181,68,0.15)", border: "1px solid rgba(242,181,68,0.3)", color: COLORS.solarGold, fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.08em" }}>
                  {h.heroTag}
                </span>
              </motion.div>

              <MaskReveal delay={0.05}>
                <p style={{ fontFamily: FONTS.serifBengali, fontWeight: 600, fontSize: 20, color: "rgba(255,255,255,0.9)", margin: "0 0 8px", lineHeight: 1.35 }}>
                  {BRAND.nameBn}
                </p>
              </MaskReveal>
              <MaskReveal delay={0.14}>
                <h1 style={{ fontFamily: FONTS.serif, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 700, color: "white", margin: "0 0 16px", lineHeight: 1.15 }}>
                  {BRAND.nameEn}
                </h1>
              </MaskReveal>
              <MaskReveal delay={0.24}>
                <p style={{ fontFamily: FONTS.sans, fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.85)", margin: "0 0 10px", lineHeight: 1.6, maxWidth: 560 }}>
                  {h.heroTagline}
                </p>
              </MaskReveal>
              <MaskReveal delay={0.32}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "rgba(255,255,255,0.82)", margin: "0 0 32px" }}>
                  {h.heroSubtitle}
                </p>
              </MaskReveal>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION.dur.slow, ease: EASE, delay: 0.42 }}
                style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
              >
                <CtaButton to="/proof" variant="gold" size="lg">{h.ctaBank} →</CtaButton>
                <CtaButton to="/products" variant="secondary" size="md">{h.ctaProducts}</CtaButton>
                <CtaButton to="/contact" variant="ghostLight" size="md">{h.ctaVisit} ↗</CtaButton>
              </motion.div>
            </div>

            {/* Logo */}
            <motion.div
              className="hero-logo"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: MOTION.dur.scene, ease: EASE, delay: 0.2 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ width: 160, height: 160, background: "rgba(255,255,255,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.15)", backdropFilter: "blur(2px)" }}>
                <img src={logoIcon} alt={BRAND.nameEn} style={{ width: 130, height: 130, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* AI-image disclosure label */}
        <p style={{ position: "absolute", bottom: 8, right: 12, margin: 0, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 10, color: "rgba(255,255,255,0.55)", zIndex: 1 }}>
          {t.common.illustrative}
        </p>
      </section>

      {/* ── Trust strip — slow marquee ────────────────────────────────────── */}
      <section style={{ background: COLORS.charcoalText, padding: "16px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Marquee durationSec={44} gap={40}>
            {h.trustItems.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 12, color: item.safe ? "#4ade80" : "#f87171" }}>{item.safe ? "✓" : "⚠"}</span>
                <span style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                  <strong style={{ color: "white" }}>{item.label}:</strong> {item.value}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── Project at a glance ───────────────────────────────────────────── */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
          <Reveal>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 14px" }}>
              {h.whatIsTitle}
            </h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#444", lineHeight: 1.75, margin: "0 0 14px" }}>
              {h.whatIsP1}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 20px" }}>
              {h.whatIsP2}
            </p>
            <CtaButton to="/project" variant="outline">{h.readOverview} →</CtaButton>
          </Reveal>
          <Reveal delay={0.12}>
            <StopRule>
              <strong>{h.stopRulesLabel}</strong> {h.homeStopRule}
            </StopRule>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {h.stats.map((stat, i) => {
                const parsed = parseLocaleNumber(stat.num);
                return (
                  <div key={stat.label} style={{ background: "#f9f9f9", border: "1px solid #ebebeb", borderRadius: 10, padding: "14px 16px" }}>
                    <p style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 700, color: [COLORS.kutircharGreen, COLORS.riverBlue, COLORS.riskRed, COLORS.bioOlive][i % 4], margin: "0 0 2px" }}>
                      <CountUp
                        to={parsed.value}
                        duration={1.1}
                        format={(n) => `${parsed.prefix}${toLocaleDigits(n, locale)}${parsed.suffix}`}
                      />
                      <span style={{ fontSize: 13, fontWeight: 500 }}> {stat.unit}</span>
                    </p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0 }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </PageSection>

      {/* ── Ecosystem mini overview — teaser loop + stagger ───────────────── */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <EcoMiniLoop />
            </div>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 28, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 10px" }}>
              {h.ecosystemTitle}
            </h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", maxWidth: 540, margin: "0 auto 8px" }}>
              {h.ecosystemDesc}
            </p>
            <PhaseChip phase="Now" size="md" />
          </div>
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 28 }}>
          {h.ecosystemNodes.map((item) => (
            <StaggerItem key={item.label}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <Card style={{ textAlign: "center", padding: "20px 16px", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 6px" }}>{item.label}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#666", margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center" }}>
            <CtaButton to="/ecosystem" variant="primary">{h.seeFullFlow} →</CtaButton>
          </div>
        </Reveal>
      </PageSection>

      {/* ── Proof & Governance preview ────────────────────────────────────── */}
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
          <div>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <h2 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>
                  {h.proofTitle}
                </h2>
              </div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 20px" }}>
                {h.proofDesc}
              </p>
            </Reveal>
            <Stagger style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {h.gaps.map((gap) => (
                <StaggerItem key={gap.label} y={12}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0" }}>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText }}>{gap.label}</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 600, color: gap.status === h.gaps[0].status ? COLORS.riverBlue : gap.status.toLowerCase().includes("gap") || gap.status.toLowerCase().includes("open") ? COLORS.riskRed : "#6b7280" }}>
                      {gap.status}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <CtaButton to="/proof" variant="primary">{h.viewFullAudit} →</CtaButton>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div style={{ background: COLORS.deepFarmGreen, borderRadius: 16, padding: "28px", color: "white" }}>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" as const }}>
                {h.govLabel}
              </p>
              <p style={{ fontFamily: FONTS.serif, fontSize: 18, color: "white", lineHeight: 1.6, margin: "0 0 18px", fontStyle: "italic" }}>
                {h.govQuote}
              </p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                {h.govNote}
              </p>
            </div>
          </Reveal>
        </div>
      </PageSection>

      {/* ── Latest Updates — card stagger ─────────────────────────────────── */}
      <PageSection bg={COLORS.fieldMist}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 600, color: COLORS.charcoalText, margin: 0 }}>
              {h.updatesTitle}
            </h2>
            <Link to="/updates" style={{ fontFamily: FONTS.sans, fontSize: 14, color: COLORS.kutircharGreen, fontWeight: 600, textDecoration: "none" }}>
              {h.viewAllUpdates} →
            </Link>
          </div>
        </Reveal>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {t.updates.entries.slice(0, 3).map((u) => (
            <StaggerItem key={u.title} style={{ height: "100%" }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: MOTION.dur.fast, ease: EASE }} style={{ height: "100%" }}>
                <Card style={{ height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: COLORS.riverBlue, background: "#eff6fb", padding: "2px 8px", borderRadius: 6, border: "1px solid #b8d4e0" }}>{categoryLabel(u.categoryId)}</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280" }}>{u.date}</span>
                  </div>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 8px" }}>{u.title}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: "0 0 12px" }}>{u.summary}</p>
                  <Link to="/updates" style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.kutircharGreen, fontWeight: 600, textDecoration: "none" }}>{h.readFull} →</Link>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      {/* ── Brand Guide CTA ──────────────────────────────────────────────── */}
      <PageSection>
        <Reveal>
          <div style={{ background: COLORS.deepFarmGreen, borderRadius: 20, padding: "32px 36px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
            <div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 6 }}>{h.brandCtaKicker}</p>
              <h3 style={{ fontFamily: FONTS.serif, fontSize: 22, fontWeight: 600, color: "white", margin: "0 0 8px" }}>
                {h.brandCtaTitle}
              </h3>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
                {h.brandCtaDesc}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <CtaButton to="/brand-guide" variant="gold" size="md">{h.brandCtaOpen}</CtaButton>
              <CtaButton to="/brand-guide?section=11" variant="secondary" size="md">{h.brandCtaDownload}</CtaButton>
            </div>
          </div>
        </Reveal>
      </PageSection>

      {/* ── Partnership CTA ───────────────────────────────────────────────── */}
      <PageSection bg={COLORS.kutircharGreen} py={56}>
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: FONTS.bengali, fontSize: 16, color: "rgba(255,255,255,0.85)", margin: "0 0 8px" }}>{h.partnerKicker}</p>
            <h2 style={{ fontFamily: FONTS.serif, fontSize: 32, fontWeight: 600, color: "white", margin: "0 0 14px" }}>
              {h.partnerTitle}
            </h2>
            <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.65 }}>
              {h.partnerDesc}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <CtaButton to="/contact" variant="gold" size="lg">{h.startPartnership} →</CtaButton>
              <CtaButton to="/proof" variant="secondary" size="lg">{h.viewProofPack}</CtaButton>
            </div>
          </div>
        </Reveal>
      </PageSection>

      <style>{`
        @media (max-width: 768px) {
          .hero-logo { display: none !important; }
        }
      `}</style>
    </div>
  );
}
