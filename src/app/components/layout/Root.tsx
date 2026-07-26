import { useEffect } from "react";
import { useOutlet, Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoIcon from "../../../imports/image.png";
import { BRAND, COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { useLocale } from "../shared/i18n";
import { applySeo } from "../shared/seo";
import { MainNav } from "./MainNav";

const seoKeyByPath: Record<string, keyof (typeof import("../../../i18n/bn.json"))["seo"]["pages"]> = {
  "/": "home",
  "/project": "project",
  "/proof": "proof",
  "/products": "products",
  "/ecosystem": "ecosystem",
  "/digital": "digital",
  "/updates": "updates",
  "/contact": "contact",
  "/faq": "faq",
  "/privacy": "privacy",
  "/executive-summary": "execSummary",
  "/brand-guide": "brandGuide",
};

export function Root() {
  const { pathname } = useLocation();
  const { t, locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    const key = seoKeyByPath[pathname] ?? "notFound";
    const page = (t.seo.pages as Record<string, { title: string; description: string }>)[key];
    if (!page) return;
    applySeo({
      pathname,
      page,
      locale,
      homeLabel: t.nav.home,
      faqItems: t.faq.items,
    });
  }, [pathname, t, locale]);

  const navLabel = (key: string) => ((t.nav as unknown as Record<string, string>)[key]) ?? key;
  const categoryLabel = (key: string) =>
    ((t.nav.categories as unknown as Record<string, string>)[key]) ?? key;
  const outlet = useOutlet();

  return (
    <div style={{ minHeight: "100dvh", background: COLORS.documentIvory, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans }}>

      {/* Skip to content */}
      <a href="#main-content" className="skip-link">{t.nav.skipToContent}</a>

      {/* Phase banner */}
      <div style={{ background: COLORS.kutircharGreen, padding: "6px 0", textAlign: "center" }}>
        <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: "0.08em", margin: 0 }}>
          <span lang="bn" style={{ fontFamily: FONTS.bengali, fontSize: 12, marginRight: 8 }}>{t.banner.phaseBn}</span>
          <span lang="en">{t.banner.phaseEn}</span>
        </p>
      </div>

      <MainNav />

      {/* ════════════════════════════════════════════════════════════════
         MAIN CONTENT  (route transition + scroll-to-top)
      ════════════════════════════════════════════════════════════════ */}
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: MOTION.dur.fast, ease: EASE } }}
            transition={{ duration: MOTION.dur.base, ease: EASE }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ════════════════════════════════════════════════════════════════
         FOOTER  (P8 spec: 5-column → mobile stack, brand, quick links,
         solutions, contact, legal, copyright, powered by)
      ════════════════════════════════════════════════════════════════ */}
      <footer style={{ background: COLORS.deepFarmGreen, paddingTop: 56, paddingBottom: 28 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 36, marginBottom: 44 }}>

            {/* A. Brand */}
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <img src={logoIcon} alt="" style={{ width: 36, height: 36, filter: "brightness(0) invert(1)", flexShrink: 0 }} />
                <div>
                  <p lang="en" style={{ fontFamily: FONTS.serif, fontSize: 14, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>{BRAND.nameEn}</p>
                  <p lang="bn" style={{ fontFamily: FONTS.serifBengali, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.68)", margin: 0, lineHeight: 1.3 }}>{BRAND.nameBn}</p>
                </div>
              </div>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 12px" }}>
                {t.footer.tagline}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 10px" }}>
                {t.footer.mission}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
                {t.footer.address}<br />{t.footer.addressLine2}
              </p>
            </div>

            {/* B. About */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{categoryLabel("about")}</p>
              <Link to="/" style={footerLink(locale === "bn")}>{navLabel("home")}</Link>
              <Link to="/project" style={footerLink(locale === "bn")}>{navLabel("project")}</Link>
              <Link to="/executive-summary" style={footerLink(locale === "bn")}>{navLabel("executiveSummary")}</Link>
            </div>

            {/* C. Farm */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{categoryLabel("farm")}</p>
              <Link to="/ecosystem" style={footerLink(locale === "bn")}>{navLabel("ecosystem")}</Link>
              <Link to="/products" style={footerLink(locale === "bn")}>{navLabel("products")}</Link>
              <Link to="/digital" style={footerLink(locale === "bn")}>{navLabel("digital")}</Link>
            </div>

            {/* D. Trust */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.trustHeading}</p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 8px" }}>
                {t.footer.trust1}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 12px" }}>
                {t.footer.trust2}
              </p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "12px 0" }} />
              <Link to="/proof" style={footerLink(locale === "bn")}>{navLabel("proof")}</Link>
              <Link to="/updates" style={footerLink(locale === "bn")}>{navLabel("updates")}</Link>
              <Link to="/brand-guide" style={{ ...footerLink(locale === "bn"), color: COLORS.solarGold, fontWeight: 600 }}>
                {t.nav.brandGuideFull} →
              </Link>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
              <Link to="/faq" style={{ ...footerLink(locale === "bn"), fontSize: 12 }}>{t.footer.faq || "FAQ"}</Link>
              <Link to="/privacy" style={{ ...footerLink(locale === "bn"), fontSize: 12 }}>{t.footer.privacy || "Privacy"}</Link>
            </div>

            {/* E. Contact */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.contactHeading}</p>
              <a href={`mailto:${BRAND.contact.email}`} style={footerContactLink}>
                {BRAND.contact.email}
              </a>
              {BRAND.contact.phones.map((p) => (
                <a key={p.number} href={`tel:${p.number}`} style={footerContactLink}>
                  {locale === "bn" ? p.nameBn : p.nameEn} — <span style={{ fontFamily: FONTS.sans }}>{p.number}</span>
                </a>
              ))}
              <a href={`https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={footerContactLink}>
                WhatsApp
              </a>
              <Link to="/contact" style={footerContactLink}>
                {t.footer.inquiryForm}
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.55)", margin: 0 }}>
              {t.footer.copyright}
            </p>
            <p lang="bn" style={{ fontFamily: FONTS.bengali, fontSize: 11, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              {t.footer.motto}
            </p>
            <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic" }}>
              {t.footer.poweredBy}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   Footer style helpers
   ═════════════════════════════════════════════════════════════════ */
function footerColHeading(isBn: boolean): React.CSSProperties {
  return {
    fontFamily: isBn ? FONTS.bengali : FONTS.sans,
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: isBn ? "0.02em" : "0.1em",
    textTransform: isBn ? undefined : "uppercase",
    marginBottom: 14,
  };
}

function footerLink(isBn: boolean): React.CSSProperties {
  return {
    display: "block",
    fontFamily: isBn ? FONTS.bengali : FONTS.sans,
    fontSize: 13,
    color: "rgba(255,255,255,0.68)",
    textDecoration: "none",
    padding: "5px 0",
    transition: "color 0.15s",
    minHeight: 28,
  };
}

const footerContactLink: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: "rgba(255,255,255,0.68)",
  textDecoration: "none",
  fontFamily: FONTS.sans,
  fontSize: 13,
  padding: "5px 0",
  minHeight: 28,
  transition: "color 0.15s",
};
