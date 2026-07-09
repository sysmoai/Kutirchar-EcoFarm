import { useState, useEffect, useRef, useCallback } from "react";
import { useOutlet, NavLink, Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoIcon from "../../../imports/image.png";
import { BRAND, COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { useLocale, type Locale } from "../shared/i18n";
import { applySeo } from "../shared/seo";

const navRoutes = [
  { to: "/",           key: "home" },
  { to: "/project",    key: "project" },
  { to: "/proof",      key: "proof" },
  { to: "/ecosystem",  key: "ecosystem" },
  { to: "/products",   key: "products" },
  { to: "/digital",    key: "digital" },
  { to: "/updates",    key: "updates" },
  { to: "/contact",    key: "contact" },
] as const;

function LangToggle({ compact }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const options: { value: Locale; label: string }[] = [
    { value: "bn", label: "\u09ac\u09be\u0982\u09b2\u09be" },
    { value: "en", label: "EN" },
  ];
  return (
    <div
      role="group"
      aria-label={t.nav.langToggleLabel}
      style={{
        display: "inline-flex", alignItems: "center",
        background: "rgba(255,255,255,0.1)", borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.22)", padding: 2,
        flexShrink: 0,
      }}
    >
      {options.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setLocale(opt.value)}
            aria-pressed={active}
            lang={opt.value}
            style={{
              fontFamily: opt.value === "bn" ? FONTS.bengali : FONTS.sans,
              fontSize: compact ? 12 : 11.5,
              fontWeight: active ? 700 : 500,
              color: active ? COLORS.deepFarmGreen : "rgba(255,255,255,0.85)",
              background: active ? COLORS.solarGold : "transparent",
              border: "none", borderRadius: 6, cursor: "pointer",
              padding: compact ? "5px 12px" : "4px 10px",
              lineHeight: 1.4, transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { t, locale } = useLocale();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
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

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [menuOpen]);

  // Close mobile menu on Escape + focus trap
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); menuBtnRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    // Focus first item when opened
    setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 50);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Scroll detection for sticky navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabel = (key: (typeof navRoutes)[number]["key"]) => t.nav[key];
  const outlet = useOutlet();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
    fontSize: 12.5,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.82)",
    textDecoration: "none",
    padding: "6px 9px",
    borderRadius: 6,
    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
    borderBottom: isActive ? `2px solid ${COLORS.solarGold}` : "2px solid transparent",
    transition: "all 0.15s",
    whiteSpace: "nowrap" as const,
  });

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

      {/* ════════════════════════════════════════════════════════════════
         HEADER / NAVBAR  (P8 spec: sticky, shrink, active highlight,
         mobile drawer w/ body-lock, focus trap, Esc, stagger anim)
      ════════════════════════════════════════════════════════════════ */}
      <header>
        <nav
          role="navigation"
          aria-label="Main navigation"
          style={{
            background: scrolled ? "rgba(11,79,42,0.94)" : COLORS.deepFarmGreen,
            backdropFilter: scrolled ? "blur(10px) saturate(1.2)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(10px) saturate(1.2)" : "none",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.28)" : "none",
            transition: "box-shadow 0.25s, background 0.25s",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: scrolled ? 52 : 60, gap: 16, transition: "height 0.25s cubic-bezier(0.22,1,0.36,1)" }}>

            {/* Logo lockup */}
            <Link to="/" aria-label={`${BRAND.nameEn} \u2014 ${t.nav.home}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
              <img src={logoIcon} alt="" style={{ width: 36, height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              <div style={{ lineHeight: 1 }}>
                <p lang="en" style={{ fontFamily: FONTS.serif, fontSize: 13, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>{BRAND.nameEn}</p>
                <p lang="bn" style={{ fontFamily: FONTS.serifBengali, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.3 }}>{BRAND.nameBn}</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "flex-end" }}>
              {navRoutes.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  aria-current="page"
                  style={navLinkStyle}
                >
                  {navLabel(item.key)}
                </NavLink>
              ))}
              <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", marginLeft: 6 }} />
              <NavLink
                to="/brand-guide"
                style={({ isActive }) => ({
                  fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 12, fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.65)",
                  textDecoration: "none", padding: "6px 10px", borderRadius: 6,
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  border: `1px solid ${isActive ? COLORS.solarGold : "rgba(255,255,255,0.2)"}`,
                  display: "flex", alignItems: "center", gap: 5,
                  whiteSpace: "nowrap" as const,
                })}
              >
                🎨 {t.nav.brandGuide}
              </NavLink>
              <Link
                to="/contact"
                style={{ marginLeft: 6, background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 12.5, fontWeight: 700, padding: "7px 14px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap" as const }}
              >
                {t.nav.partnership} →
              </Link>
              <div style={{ marginLeft: 8 }}>
                <LangToggle />
              </div>
            </div>

            {/* Mobile: toggle + hamburger */}
            <div className="mobile-only" style={{ marginLeft: "auto", display: "none", alignItems: "center", gap: 8 }}>
              <LangToggle compact />
              <button
                ref={menuBtnRef}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 10, display: "flex", flexDirection: "column" as const, gap: 5,
                  minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{
                      rotate: menuOpen
                        ? (i === 0 ? 45 : i === 2 ? -45 : 0)
                        : 0,
                      y: menuOpen
                        ? (i === 0 ? 7 : i === 2 ? -7 : 0)
                        : 0,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "block", width: 22, height: 2.5, background: "white", borderRadius: 2, originX: 0.5 }}
                  />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={drawerRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden", background: COLORS.deepFarmGreen, borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div style={{ padding: "12px 20px 24px" }}>
                  {navRoutes.map((item, i) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25, ease: EASE }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => ({
                          fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                          fontSize: 15,
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.88)",
                          textDecoration: "none",
                          padding: "12px 10px",
                          borderRadius: 8,
                          background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                          minHeight: 44,
                          display: "flex", alignItems: "center",
                        })}
                      >
                        {navLabel(item.key)}
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navRoutes.length * 0.04, duration: 0.25, ease: EASE }}>
                    <Link
                      to="/brand-guide"
                      onClick={() => setMenuOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.88)", textDecoration: "none", padding: "12px 10px", borderRadius: 8, background: "rgba(242,181,68,0.08)", border: "1px solid rgba(242,181,68,0.2)", marginTop: 4, minHeight: 44 }}
                    >
                      🎨 {t.nav.brandGuideFull}
                    </Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (navRoutes.length + 1) * 0.04, duration: 0.25, ease: EASE }}>
                    <Link
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      style={{ display: "block", marginTop: 12, textAlign: "center", background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, textDecoration: "none", minHeight: 48 }}
                    >
                      {t.nav.partnershipInquiry} →
                    </Link>
                  </motion.div>

                  {/* Mobile contact strip */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <a href={`mailto:${BRAND.contact.email}`} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "6px 0" }}>
                      ✉️ {BRAND.contact.email}
                    </a>
                    <a href={`tel:${BRAND.contact.phone}`} style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "6px 0" }}>
                      📞 {BRAND.contact.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

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

            {/* B. Quick Links */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.navigate}</p>
              <Link to="/" style={footerLink(locale === "bn")}>{navLabel("home")}</Link>
              <Link to="/project" style={footerLink(locale === "bn")}>{navLabel("project")}</Link>
              <Link to="/ecosystem" style={footerLink(locale === "bn")}>{navLabel("ecosystem")}</Link>
              <Link to="/updates" style={footerLink(locale === "bn")}>{navLabel("updates")}</Link>
              <Link to="/contact" style={footerLink(locale === "bn")}>{navLabel("contact")}</Link>
            </div>

            {/* C. Solutions */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.legal || "Solutions"}</p>
              <Link to="/products" style={footerLink(locale === "bn")}>{navLabel("products")}</Link>
              <Link to="/digital" style={footerLink(locale === "bn")}>{navLabel("digital")}</Link>
              <Link to="/proof" style={footerLink(locale === "bn")}>{navLabel("proof")}</Link>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
              <Link to="/brand-guide" style={{ ...footerLink(locale === "bn"), color: COLORS.solarGold, fontWeight: 600 }}>
                🎨 {t.nav.brandGuideFull} →
              </Link>
            </div>

            {/* D. Contact */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.contactHeading}</p>
              <a href={`mailto:${BRAND.contact.email}`} style={footerContactLink}>
                ✉️ {BRAND.contact.email}
              </a>
              {BRAND.contact.phones.map((p) => (
                <a key={p.number} href={`tel:${p.number}`} style={footerContactLink}>
                  📞 {locale === "bn" ? p.nameBn : p.nameEn} — <span style={{ fontFamily: FONTS.sans }}>{p.number}</span>
                </a>
              ))}
              <a href={`https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={footerContactLink}>
                💬 WhatsApp
              </a>
              <Link to="/contact" style={footerContactLink}>
                ✍️ {t.footer.inquiryForm}
              </Link>
            </div>

            {/* E. Trust & Legal */}
            <div style={{ minWidth: 0 }}>
              <p style={footerColHeading(locale === "bn")}>{t.footer.trustHeading}</p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 8px" }}>
                {t.footer.trust1}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 0 12px" }}>
                {t.footer.trust2}
              </p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "12px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Link to="/faq" style={{ ...footerLink(locale === "bn"), fontSize: 12 }}>{t.footer.faq || "FAQ"}</Link>
                <Link to="/privacy" style={{ ...footerLink(locale === "bn"), fontSize: 12 }}>{t.footer.privacy || "Privacy"}</Link>
              </div>
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
