import { useState, useEffect, useRef, useCallback, useId } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoIcon from "../../../imports/image.png";
import { BRAND, COLORS, FONTS } from "../../brand";
import { EASE } from "../../motion";
import { useLocale, type Locale } from "../shared/i18n";
import { CtaButton } from "../shared/Shared";

type NavLinkItem = { type: "link"; to: string; key: string };
type NavGroupItem = { type: "group"; key: string; items: { to: string; key: string }[] };

type NavItem = NavLinkItem | NavGroupItem;

const navStructure: NavItem[] = [
  { type: "link", to: "/", key: "home" },
  {
    type: "group",
    key: "about",
    items: [
      { to: "/project", key: "project" },
      { to: "/executive-summary", key: "executiveSummary" },
    ],
  },
  {
    type: "group",
    key: "farm",
    items: [
      { to: "/ecosystem", key: "ecosystem" },
      { to: "/products", key: "products" },
      { to: "/digital", key: "digital" },
    ],
  },
  {
    type: "group",
    key: "trust",
    items: [
      { to: "/proof", key: "proof" },
      { to: "/updates", key: "updates" },
      { to: "/faq", key: "faq" },
      { to: "/privacy", key: "privacy" },
    ],
  },
  { type: "link", to: "/brand-guide", key: "brandGuideFull" },
  { type: "link", to: "/contact", key: "contact" },
];

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
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.22)",
        padding: 2,
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
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              padding: compact ? "5px 12px" : "4px 10px",
              lineHeight: 1.4,
              transition: "all 0.15s",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s",
      }}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function groupIsActive(item: NavGroupItem, pathname: string) {
  return item.items.some((child) => pathname === child.to || pathname.startsWith(`${child.to}/`));
}

function NavGroup({
  item,
  open,
  onOpen,
  onClose,
  label,
}: {
  item: NavGroupItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  label: string;
}) {
  const { locale, t } = useLocale();
  const { pathname } = useLocation();
  const isActive = groupIsActive(item, pathname);
  const dropdownId = useId();
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => onOpen(), 40);
  }, [onOpen]);

  const handleLeave = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => onClose(), 160);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const navLabel = (key: string) => ((t.nav as unknown as Record<string, string>)[key]) ?? key;

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "relative" }}
    >
      <button
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={dropdownId}
        onClick={() => (open ? onClose() : onOpen())}
        style={{
          fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
          fontSize: 12.5,
          fontWeight: isActive ? 700 : 500,
          color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.82)",
          textDecoration: "none",
          padding: "6px 9px",
          borderRadius: 6,
          background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
          transition: "all 0.15s",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
          border: "none",
          boxShadow: isActive ? `inset 0 -2px 0 0 ${COLORS.solarGold}` : "inset 0 -2px 0 0 transparent",
          minHeight: 40,
        }}
      >
        {label}
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={dropdownId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              minWidth: 200,
              background: "rgba(11,79,42,0.98)",
              backdropFilter: "blur(10px) saturate(1.2)",
              WebkitBackdropFilter: "blur(10px) saturate(1.2)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "8px",
              boxShadow: "0 14px 28px rgba(0,0,0,0.28)",
              zIndex: 110,
            }}
          >
            {item.items.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                end={child.to === "/"}
                onClick={() => onClose()}
                style={({ isActive }) => ({
                  display: "block",
                  fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  padding: "10px 12px",
                  borderRadius: 6,
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  whiteSpace: "nowrap",
                  minHeight: 40,
                  transition: "all 0.15s",
                })}
              >
                {navLabel(child.key)}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MainNav() {
  const { pathname } = useLocation();
  const { locale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<Set<string>>(new Set());
  const [drawerTop, setDrawerTop] = useState(60);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const updateDrawerTop = useCallback(() => {
    const rect = headerRef.current?.getBoundingClientRect();
    if (rect) setDrawerTop(rect.bottom);
  }, []);

  useEffect(() => {
    updateDrawerTop();
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      updateDrawerTop();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateDrawerTop);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateDrawerTop);
    };
  }, [updateDrawerTop]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
        return;
      }
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
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 50);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const expanded = new Set<string>();
    navStructure.forEach((item) => {
      if (item.type === "group" && groupIsActive(item, pathname)) {
        expanded.add(item.key);
      }
    });
    setExpandedMobile(expanded);
    updateDrawerTop();
  }, [menuOpen, pathname, updateDrawerTop]);

  // Close desktop dropdowns on Escape or click outside the header
  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [openDropdown]);

  const navLabel = (key: string) => ((t.nav as unknown as Record<string, string>)[key]) ?? key;
  const groupLabel = (key: string) =>
    ((t.nav.categories as unknown as Record<string, string>)?.[key]) ?? key;

  const linkBaseStyle: React.CSSProperties = {
    fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
    fontSize: 12.5,
    fontWeight: 500,
    color: "rgba(255,255,255,0.82)",
    textDecoration: "none",
    padding: "6px 9px",
    borderRadius: 6,
    background: "transparent",
    borderBottom: "2px solid transparent",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    minHeight: 40,
  };

  return (
    <header>
      <nav
        ref={headerRef}
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
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            height: scrolled ? 52 : 60,
            gap: 16,
            transition: "height 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Link
            to="/"
            aria-label={`${BRAND.nameEn} \u2014 ${navLabel("home")}`}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
          >
            <img
              src={logoIcon}
              alt=""
              style={{ width: 36, height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            <div style={{ lineHeight: 1 }}>
              <p
                lang="en"
                style={{ fontFamily: FONTS.serif, fontSize: 13, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}
              >
                {BRAND.nameEn}
              </p>
              <p
                lang="bn"
                style={{ fontFamily: FONTS.serifBengali, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.3 }}
              >
                {BRAND.nameBn}
              </p>
            </div>
          </Link>

          <div
            className="desktop-only"
            style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "flex-end" }}
          >
            {navStructure.map((item) => {
              if (item.type === "link") {
                const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    style={({ isActive: active }) => ({
                      ...linkBaseStyle,
                      fontWeight: active || isActive ? 700 : 500,
                      color: active || isActive ? COLORS.solarGold : "rgba(255,255,255,0.82)",
                      background: active || isActive ? "rgba(255,255,255,0.08)" : "transparent",
                      borderBottom: active || isActive ? `2px solid ${COLORS.solarGold}` : "2px solid transparent",
                    })}
                  >
                    {navLabel(item.key)}
                  </NavLink>
                );
              }
              const isActive = groupIsActive(item, pathname);
              return (
                <NavGroup
                  key={item.key}
                  item={item}
                  label={groupLabel(item.key)}
                  open={openDropdown === item.key}
                  onOpen={() => {
                    setOpenDropdown(item.key);
                  }}
                  onClose={() => {
                    setOpenDropdown((current) => (current === item.key ? null : current));
                  }}
                />
              );
            })}
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", marginLeft: 6 }} />
            <div style={{ marginLeft: 6 }}>
              <CtaButton to="/contact" variant="gold" size="sm">
                {navLabel("partnership")} \u2192
              </CtaButton>
            </div>
            <div style={{ marginLeft: 8 }}>
              <LangToggle />
            </div>
          </div>

          <div className="mobile-only" style={{ marginLeft: "auto", alignItems: "center", gap: 8 }}>
            <LangToggle compact />
            <button
              ref={menuBtnRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? navLabel("closeMenu") : navLabel("openMenu")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 10,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                minWidth: 44,
                minHeight: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", width: 22, height: 2.5, background: "white", borderRadius: 2, originX: 0.5 }}
                />
              ))}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "fixed",
                  top: drawerTop,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.45)",
                  zIndex: 99,
                }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                ref={drawerRef}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  position: "fixed",
                  top: drawerTop,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflowY: "auto",
                  background: COLORS.deepFarmGreen,
                  zIndex: 100,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px 28px",
                    paddingBottom: "max(28px, env(safe-area-inset-bottom))",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {navStructure.map((item, i) => {
                    if (item.type === "link") {
                      const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                      return (
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
                            style={({ isActive: active }) => ({
                              fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                              fontSize: 15,
                              fontWeight: active || isActive ? 700 : 500,
                              color: active || isActive ? COLORS.solarGold : "rgba(255,255,255,0.88)",
                              textDecoration: "none",
                              padding: "12px 10px",
                              borderRadius: 8,
                              background: active || isActive ? "rgba(255,255,255,0.08)" : "transparent",
                              borderBottom: "1px solid rgba(255,255,255,0.07)",
                              minHeight: 48,
                              display: "flex",
                              alignItems: "center",
                            })}
                          >
                            {navLabel(item.key)}
                          </NavLink>
                        </motion.div>
                      );
                    }
                    const isActive = groupIsActive(item, pathname);
                    const expanded = expandedMobile.has(item.key);
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25, ease: EASE }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", borderRadius: 8 }}
                      >
                        <button
                          aria-expanded={expanded}
                          onClick={() => {
                            setExpandedMobile((prev) => {
                              const next = new Set(prev);
                              if (next.has(item.key)) next.delete(item.key);
                              else next.add(item.key);
                              return next;
                            });
                          }}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                            fontSize: 15,
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.88)",
                            background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                            border: "none",
                            borderRadius: 8,
                            padding: "12px 10px",
                            minHeight: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                          }}
                        >
                          {groupLabel(item.key)}
                          <ChevronIcon open={expanded} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              style={{ overflow: "hidden" }}
                            >
                              <div style={{ padding: "4px 0 8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
                                {item.items.map((child) => (
                                  <NavLink
                                    key={child.to}
                                    to={child.to}
                                    end={child.to === "/"}
                                    onClick={() => setMenuOpen(false)}
                                    style={({ isActive }) => ({
                                      fontFamily: locale === "bn" ? FONTS.bengali : FONTS.sans,
                                      fontSize: 14,
                                      fontWeight: isActive ? 700 : 500,
                                      color: isActive ? COLORS.solarGold : "rgba(255,255,255,0.78)",
                                      textDecoration: "none",
                                      padding: "10px 12px",
                                      borderRadius: 6,
                                      background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                                      minHeight: 40,
                                      display: "flex",
                                      alignItems: "center",
                                    })}
                                  >
                                    {navLabel(child.key)}
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navStructure.length * 0.04, duration: 0.25, ease: EASE }}
                  >
                    <CtaButton
                      to="/contact"
                      variant="gold"
                      size="lg"
                      fullWidth
                      style={{ marginTop: 8 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {navLabel("partnershipInquiry")} \u2192
                    </CtaButton>
                  </motion.div>

                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <a
                      href={`mailto:${BRAND.contact.email}`}
                      style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "6px 0" }}
                    >
                      {BRAND.contact.email}
                    </a>
                    <a
                      href={`tel:${BRAND.contact.phone}`}
                      style={{ fontFamily: FONTS.sans, fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "6px 0" }}
                    >
                      {BRAND.contact.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
