import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS, FONTS, BRAND } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { PageHero, PageSection, SectionHeading, Card } from "../shared/Shared";
import { useLocale } from "../shared/i18n";
import { Reveal, Stagger, StaggerItem } from "../shared/motion";

type InquiryType = "" | "bank-govt-investor" | "vendor" | "buyer" | "training" | "general";

interface FormState {
  name: string; org: string; designation: string; inquiryType: InquiryType; phone: string; email: string; message: string; budget: string; visit: boolean;
}

const initialForm: FormState = { name: "", org: "", designation: "", inquiryType: "", phone: "", email: "", message: "", budget: "", visit: false };

export function ContactPage() {
  const { t } = useLocale();
  const c = t.contact;
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(f: FormState): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!f.name.trim()) errs.name = c.form.errors.name;
    if (!f.inquiryType) errs.inquiryType = c.form.errors.inquiryType;
    if (!f.phone.trim() && !f.email.trim()) errs.contact = c.form.errors.contact;
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = c.form.errors.email;
    if (!f.message.trim() || f.message.trim().length < 20) errs.message = c.form.errors.message;
    return errs;
  }

  function handleChange(key: keyof FormState, val: string | boolean) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("submitting");
    try {
      const subject = encodeURIComponent(`[Kutirchar EcoFarm] ${form.inquiryType} — ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nOrganisation: ${form.org || "—"}\nDesignation: ${form.designation || "—"}\nInquiry Type: ${form.inquiryType}\nPhone: ${form.phone || "—"}\nEmail: ${form.email || "—"}\nBudget: ${form.budget || "—"}\nWants site visit: ${form.visit ? "Yes" : "No"}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:${BRAND.contact.email}?subject=${subject}&body=${body}`;
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleReset() { setForm(initialForm); setErrors({}); setStatus("idle"); }

  const channels = [
    { icon: "✉", label: c.emailLabel, value: BRAND.contact.email, href: `mailto:${BRAND.contact.email}`, desc: c.emailDesc },
    ...(BRAND.contact.phone ? [{ icon: "📞", label: t.nav.contact, value: BRAND.contact.phone, href: `tel:${BRAND.contact.phone}`, desc: c.phoneDesc }] : []),
    ...(BRAND.contact.whatsapp ? [{ icon: "💬", label: c.whatsappLabel, value: c.whatsappValue, href: `https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}?text=Hello%20Kutirchar%20EcoFarm`, desc: c.whatsappDesc }] : []),
  ];

  return (
    <div>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>

          {/* Left: contact channels */}
          <div>
            <Reveal>
              <SectionHeading title={c.directTitle} />
            </Reveal>
            <Stagger style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              {channels.map((ch) => (
                <StaggerItem key={ch.label} y={12}>
                  <motion.a
                    href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={{ duration: MOTION.dur.fast, ease: EASE }}
                    style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", background: "white", borderRadius: 12, border: "1px solid #e5eee9", textDecoration: "none" }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{ch.icon}</span>
                    <div>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 2px" }}>{ch.label}</p>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText, margin: "0 0 3px" }}>{ch.value}</p>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: 0 }}>{ch.desc}</p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Team block */}
            <SectionHeading title={c.teamTitle} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <div style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "16px 18px", color: "white" }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>{c.teamLead.name}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.8)", margin: "0 0 4px" }}>{c.teamLead.role}</p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: 0 }}>{c.teamLead.phone} · {c.teamLead.orgs}</p>
              </div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", margin: "4px 0 0" }}>{c.teamOthersLabel}</p>
              {c.teamOthers.map((m) => (
                <div key={m.name} style={{ background: "white", border: "1px solid #e5eee9", borderRadius: 10, padding: "12px 16px" }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 2px" }}>{m.name}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.kutircharGreen, margin: "0 0 2px" }}>{m.role}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: 0 }}>{m.phone}</p>
                </div>
              ))}
            </div>

            <SectionHeading title={c.locationTitle} />
            <Card>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#444", lineHeight: 1.7, margin: "0 0 8px", whiteSpace: "pre-line" as const }}>
                <strong>{BRAND.nameEn}</strong>{"\n"}{c.addressLines}
              </p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: "0 0 8px" }}>{c.milkVitaNote}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", margin: 0 }}>{c.visitNote}</p>
            </Card>

            <div style={{ marginTop: 24 }}>
              <SectionHeading title={c.inquiryTypesTitle} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.inquiryTypes.map((it) => (
                  <div key={it.value} style={{ padding: "10px 14px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0" }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 2px" }}>{it.label}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: 0 }}>{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <SectionHeading title={c.notSharedTitle} />
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {c.notShared.map((item) => (
                  <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.65, marginBottom: 3 }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 24 }}>
              <SectionHeading title={c.partnersTitle} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {c.partners.map((pt) => (
                  <span key={pt.name} style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS.charcoalText, background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 8, padding: "6px 12px" }}>
                    <strong>{pt.name}</strong> — {pt.note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: MOTION.dur.base, ease: EASE }}
                role="status" aria-live="polite" style={{ background: "#f0f9f3", border: "2px solid #c0ddc8", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
                <p style={{ fontSize: 48, margin: "0 0 16px" }}>✓</p>
                <h3 style={{ fontFamily: FONTS.serif, fontSize: 24, color: COLORS.kutircharGreen, margin: "0 0 10px" }}>{c.form.successTitle}</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.7, margin: "0 0 8px" }}>
                  {c.form.successBody}
                </p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "0 0 24px" }}>
                  {c.form.successUrgent}
                </p>
                <button onClick={handleReset} style={{ background: COLORS.kutircharGreen, color: "white", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                  {c.form.submitAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily: FONTS.serif, fontSize: 22, color: COLORS.charcoalText, margin: "0 0 24px" }}>{c.form.title}</h3>

                <FormField label={c.form.inquiryType} error={errors.inquiryType}>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => handleChange("inquiryType", e.target.value)}
                    style={inputStyle(!!errors.inquiryType)}
                    aria-required="true"
                    aria-invalid={!!errors.inquiryType}
                  >
                    <option value="">{c.form.inquiryTypePlaceholder}</option>
                    {c.inquiryTypes.map((it) => <option key={it.value} value={it.value}>{it.label}</option>)}
                  </select>
                </FormField>

                <FormField label={c.form.name} error={errors.name}>
                  <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={c.form.namePlaceholder} style={inputStyle(!!errors.name)} aria-required="true" aria-invalid={!!errors.name} />
                </FormField>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <FormField label={c.form.org}>
                    <input type="text" value={form.org} onChange={(e) => handleChange("org", e.target.value)}
                      placeholder={c.form.orgPlaceholder} style={inputStyle(false)} />
                  </FormField>
                  <FormField label={c.form.designation}>
                    <input type="text" value={form.designation} onChange={(e) => handleChange("designation", e.target.value)}
                      placeholder={c.form.designationPlaceholder} style={inputStyle(false)} />
                  </FormField>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <FormField label={c.form.phone} error={errors.contact}>
                    <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder={c.form.phonePlaceholder} style={inputStyle(!!errors.contact)} aria-invalid={!!errors.contact} />
                  </FormField>
                  <FormField label={c.form.email} error={errors.email}>
                    <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)}
                      placeholder={c.form.emailPlaceholder} style={inputStyle(!!errors.email)} aria-invalid={!!errors.email} />
                  </FormField>
                </div>
                {errors.contact && <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.riskRed, margin: "-10px 0 12px" }}>{errors.contact}</p>}

                <FormField label={c.form.budget}>
                  <select value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} style={inputStyle(false)}>
                    <option value="">{c.form.budgetNone}</option>
                    {c.form.budgetOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </FormField>

                <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText }}>
                  <input type="checkbox" checked={form.visit} onChange={(e) => handleChange("visit", e.target.checked)} />
                  {c.form.visit}
                </label>

                <FormField label={c.form.message} error={errors.message}>
                  <textarea value={form.message} onChange={(e) => handleChange("message", e.target.value)}
                    placeholder={c.form.messagePlaceholder}
                    rows={5} style={{ ...inputStyle(!!errors.message), resize: "vertical" as const }}
                    aria-required="true" aria-invalid={!!errors.message} />
                </FormField>

                <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", lineHeight: 1.55, margin: "0 0 20px", background: "#f9f9f9", padding: "10px 12px", borderRadius: 8 }}>
                  {c.form.privacyNote}
                </p>

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%", background: status === "submitting" ? "#888" : COLORS.kutircharGreen,
                    color: "white", fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700,
                    padding: "14px", borderRadius: 10, border: "none",
                    cursor: status === "submitting" ? "wait" : "pointer", transition: "background 0.15s",
                  }}
                >
                  {status === "submitting" ? c.form.submitting : `${c.form.submit} →`}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </PageSection>
    </div>
  );
}

function FormField({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: COLORS.charcoalText, marginBottom: 5 }}>{label}</label>
      {children}
      {error && <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.riskRed, margin: "4px 0 0" }}>{error}</p>}
    </div>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%", fontFamily: FONTS.sans, fontSize: 13,
    padding: "10px 14px", borderRadius: 8, outline: "none",
    border: `1.5px solid ${hasError ? COLORS.riskRed : "#d0d5dd"}`,
    background: "white", color: COLORS.charcoalText,
    transition: "border-color 0.15s",
  };
}
