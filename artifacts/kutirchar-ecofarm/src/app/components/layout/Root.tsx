import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";
import logoIcon from "../../../imports/image.png";
import { BRAND, COLORS, FONTS } from "../../brand";
import { useLocale, type Locale } from "../shared/i18n";

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
    { value: "bn", label: "বাংলা" },
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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const key = seoKeyByPath[pathname] ?? "notFound";
    const page = (t.seo.pages as Record<string, { title: string; description: string }>)[key];
    if (!page) return;
    document.title = page.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", page.description);
  }, [pathname, t]);

  // Close the mobile menu on Escape (standard keyboard expectation)
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const navLabel = (key: (typeof navRoutes)[number]["key"]) => t.nav[key];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.documentIvory, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans }}>

      {/* ── Skip to content (keyboard / screen-reader users) ─────────────── */}
      <a href="#main-content" className="skip-link">{t.nav.skipToContent}</a>

      {/* ── Top phase banner — dual-script brand identity element ────────── */}
      <div style={{ background: COLORS.kutircharGreen, padding: "6px 0", textAlign: "center" }}>
        <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: "0.08em", margin: 0 }}>
          <span lang="bn" style={{ fontFamily: FONTS.bengali, fontSize: 12, marginRight: 8 }}>{t.banner.phaseBn}</span>
          <span lang="en">{t.banner.phaseEn}</span>
        </p>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          background: COLORS.deepFarmGreen,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
          transition: "box-shadow 0.2s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 60, gap: 16 }}>

          {/* Logo — dual-script lockup, always both scripts (brand identity) */}
          <Link to="/" aria-label={`${BRAND.nameEn} — ${t.nav.home}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src={logoIcon} alt={`${BRAND.nameEn} logo`} style={{ width: 36, height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            <div style={{ lineHeight: 1 }}>
              <p lang="en" style={{ fontFamily: FONTS.serif, fontSize: 13, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>{BRAND.nameEn}</p>
              <p lang="bn" style={{ fontFamily: FONTS.serifBengali, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.3 }}>{BRAND.nameBn}</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "flex-end" }}>
            {navRoutes.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                style={({ isActive }) => ({
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
                })}
              >
                {navLabel(item.key)}
              </NavLink>
            ))}
            {/* Brand Guide link — separated */}
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

          {/* Mobile: toggle + menu button */}
          <div className="show-mobile" style={{ marginLeft: "auto", display: "none", alignItems: "center", gap: 8 }}>
            <LangToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                flexDirection: "column" as const,
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: 22, height: 2, background: "white", borderRadius: 2,
                  transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px, 5px)" : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "scale(0)") : "none",
                  transition: "all 0.2s" }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div
            style={{ background: COLORS.deepFarmGreen, borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 20px 20px" }}
          >
            {navRoutes.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                style={({ isActive }) => ({
                  display: "block",
                  fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "11px 12px",
                  borderRadius: 8,
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                })}
              >
                {navLabel(item.key)}
              </NavLink>
            ))}
            <Link
              to="/brand-guide"
              style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.88)", textDecoration: "none", padding: "11px 12px", borderRadius: 8, background: "rgba(242,181,68,0.08)", border: "1px solid rgba(242,181,68,0.2)", marginTop: 4 }}
            >
              🎨 {t.nav.brandGuideFull}
            </Link>
            <Link
              to="/contact"
              style={{ display: "block", marginTop: 10, textAlign: "center", background: COLORS.solarGold, color: COLORS.deepFarmGreen, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 10, textDecoration: "none" }}
            >
              {t.nav.partnershipInquiry} →
            </Link>
          </div>
        )}
      </nav>

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <Outlet />
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ background: COLORS.deepFarmGreen, paddingTop: 48, paddingBottom: 24 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>

            {/* Brand column */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <img src={logoIcon} alt="" style={{ width: 36, height: 36, filter: "brightness(0) invert(1)" }} />
                <div>
                  <p lang="en" style={{ fontFamily: FONTS.serif, fontSize: 14, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>{BRAND.nameEn}</p>
                  <p lang="bn" style={{ fontFamily: FONTS.serifBengali, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.68)", margin: 0, lineHeight: 1.3 }}>{BRAND.nameBn}</p>
                </div>
              </div>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: "0 0 12px" }}>
                {t.footer.tagline}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.62)", lineHeight: 1.6, margin: 0 }}>
                {t.footer.address}<br />{t.footer.addressLine2}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.62)", letterSpacing: locale === "bn" ? "0.02em" : "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{t.footer.navigate}</p>
              {navRoutes.map((item) => (
                <Link key={item.to} to={item.to}
                  style={{ display: "block", fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.72)", textDecoration: "none", padding: "4px 0" }}>
                  {navLabel(item.key)}
                </Link>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "10px 0" }} />
              <Link to="/brand-guide"
                style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 13, color: COLORS.solarGold, textDecoration: "none", padding: "4px 0", fontWeight: 600 }}>
                🎨 {t.nav.brandGuideFull} →
              </Link>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.62)", letterSpacing: locale === "bn" ? "0.02em" : "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{t.footer.contactHeading}</p>
              <a href={`mailto:${BRAND.contact.email}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontFamily: FONTS.sans, fontSize: 13, padding: "4px 0" }}>
                ✉ {BRAND.contact.email}
              </a>
              {BRAND.contact.phones.map((p) => (
                <a key={p.number} href={`tel:${p.number}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 13, padding: "4px 0" }}>
                  📞 {locale === "bn" ? p.nameBn : p.nameEn} — <span style={{ fontFamily: FONTS.sans }}>{p.number}</span>
                </a>
              ))}
              <a href={`https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontFamily: FONTS.sans, fontSize: 13, padding: "4px 0" }}>
                💬 WhatsApp
              </a>
              <Link to="/contact" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 13, padding: "4px 0" }}>
                ✍ {t.footer.inquiryForm}
              </Link>
              <a href={`https://${BRAND.contact.website}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontFamily: FONTS.sans, fontSize: 13, padding: "4px 0" }}>
                🌐 {BRAND.contact.website}
              </a>
            </div>

            {/* Trust & Legal */}
            <div>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.62)", letterSpacing: locale === "bn" ? "0.02em" : "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{t.footer.trustHeading}</p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: "0 0 8px" }}>
                {t.footer.trust1}
              </p>
              <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0 }}>
                {t.footer.trust2}
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.62)", margin: 0 }}>
              {t.footer.copyright}
            </p>
            <p lang="bn" style={{ fontFamily: FONTS.bengali, fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {t.footer.motto}
            </p>
          </div>
        </div>
      </footer>

      {/* ── Responsive CSS ───────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${COLORS.solarGold};
          outline-offset: 2px;
          border-radius: 4px;
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
