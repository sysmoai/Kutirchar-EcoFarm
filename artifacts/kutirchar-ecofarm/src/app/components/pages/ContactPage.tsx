import * as React from "react";
import { useState } from "react";
import { COLORS, FONTS, BRAND } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card } from "../shared/Shared";

type InquiryType = "" | "bank-govt-investor" | "vendor" | "buyer" | "training" | "partnership" | "general";

interface FormState {
  name: string; org: string; inquiryType: InquiryType; phone: string; email: string; message: string; budget: string;
}

const initialForm: FormState = { name: "", org: "", inquiryType: "", phone: "", email: "", message: "", budget: "" };

const inquiryTypes = [
  { value: "bank-govt-investor", label: "Bank / Government / Investor", desc: "Formal due diligence, evidence pack request, or investment discussion" },
  { value: "vendor",             label: "Vendor / Contractor",          desc: "Soil test, survey, solar, biogas, CCTV, or construction quote" },
  { value: "buyer",              label: "Buyer",                        desc: "Dairy, compost, silage, bio-slurry (Next phase offerings)" },
  { value: "training",           label: "Training / Visit",             desc: "Farm tour or training inquiry (Later phase)" },
  { value: "partnership",        label: "Partnership / NGO / CSR",      desc: "Collaborative programme or development partnership" },
  { value: "general",            label: "General Inquiry",              desc: "Any other question or message" },
];

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.inquiryType) errors.inquiryType = "Please select an inquiry type";
  if (!form.phone.trim() && !form.email.trim()) errors.contact = "Provide at least phone or email";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address";
  if (!form.message.trim() || form.message.trim().length < 20) errors.message = "Message must be at least 20 characters";
  return errors;
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(key: keyof FormState, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("submitting");
    try {
      // Build mailto: link as functional fallback until backend API is configured
      const subject = encodeURIComponent(`[Kutirchar EcoFarm] ${form.inquiryType} — ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nOrganisation: ${form.org || "—"}\nInquiry Type: ${form.inquiryType}\nPhone: ${form.phone || "—"}\nEmail: ${form.email || "—"}\nBudget: ${form.budget || "—"}\n\nMessage:\n${form.message}`
      );
      // Open email client (non-blocking, works even without backend)
      window.location.href = `mailto:info@kutircharecofarm.com?subject=${subject}&body=${body}`;
      // Small delay so the mailto: opens before we show success
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleReset() { setForm(initialForm); setErrors({}); setStatus("idle"); }

  return (
    <div>
      <PageHero
        title="Contact & Partnership"
        titleBn="যোগাযোগ ও অংশীদারিত্ব"
        subtitle="Submit a specific inquiry. We respond to all formal inquiries within 3 business days. Select your inquiry type so we can direct it correctly."
      />

      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>

          {/* Left: contact channels */}
          <div>
            <SectionHeading title="Direct Contact" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                { icon: "✉", label: "Email", value: BRAND.contact.email, href: `mailto:${BRAND.contact.email}`, desc: "Best for formal inquiries, documentation requests" },
                // Phone / WhatsApp are only shown once a real, verified line exists in brand.ts.
                // No fabricated numbers, and no broken tel:/wa.me links from empty values.
                ...(BRAND.contact.phone ? [{ icon: "📞", label: "Phone / Call", value: BRAND.contact.phone, href: `tel:${BRAND.contact.phone}`, desc: "Available 9am–6pm (Bangladesh time)" }] : []),
                ...(BRAND.contact.whatsapp ? [{ icon: "💬", label: "WhatsApp", value: "WhatsApp Chat", href: `https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}?text=Hello%20Kutirchar%20EcoFarm`, desc: "Quick questions and pre-inquiry chat" }] : []),
              ].map((ch) => (
                <a key={ch.label} href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 18px", background: "white", borderRadius: 12, border: "1px solid #e5eee9", textDecoration: "none", transition: "border-color 0.15s" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{ch.icon}</span>
                  <div>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 2px" }}>{ch.label}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: COLORS.charcoalText, margin: "0 0 3px" }}>{ch.value}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: 0 }}>{ch.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {!BRAND.contact.phone && !BRAND.contact.whatsapp && (
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: "-16px 0 32px" }}>
                A direct phone / WhatsApp line is shared after a formal inquiry — email us first and we will respond with the appropriate contact channel for your request.
              </p>
            )}

            <SectionHeading title="Office Location" />
            <Card>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#444", lineHeight: 1.7, margin: "0 0 12px" }}>
                <strong>Kutirchar EcoFarm</strong><br />
                Kutirchar Village, Bhadraghat<br />
                Kamarkhanda, Sirajganj<br />
                Bangladesh
              </p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", margin: 0 }}>
                Site visits by appointment only. Please submit a formal inquiry first.
              </p>
            </Card>

            <div style={{ marginTop: 24 }}>
              <SectionHeading title="Inquiry Types" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {inquiryTypes.map((t) => (
                  <div key={t.value} style={{ padding: "10px 14px", background: "#fafafa", borderRadius: 8, border: "1px solid #f0f0f0" }}>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 600, color: COLORS.charcoalText, margin: "0 0 2px" }}>{t.label}</p>
                    <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", margin: 0 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === "success" ? (
              <div role="status" aria-live="polite" style={{ background: "#f0f9f3", border: "2px solid #c0ddc8", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
                <p style={{ fontSize: 48, margin: "0 0 16px" }}>✓</p>
                <h3 style={{ fontFamily: FONTS.serif, fontSize: 24, color: COLORS.kutircharGreen, margin: "0 0 10px" }}>Inquiry Received</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.7, margin: "0 0 8px" }}>
                  Thank you for reaching out to Kutirchar EcoFarm. We will review your inquiry and respond within <strong>3 business days</strong>.
                </p>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", margin: "0 0 24px" }}>
                  For urgent matters, email us directly at info@kutircharecofarm.com.
                </p>
                <button onClick={handleReset} style={{ background: COLORS.kutircharGreen, color: "white", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, padding: "11px 24px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily: FONTS.serif, fontSize: 22, color: COLORS.charcoalText, margin: "0 0 24px" }}>Submit Formal Inquiry</h3>

                {/* Inquiry type */}
                <FormField label="Inquiry Type *" error={errors.inquiryType}>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => handleChange("inquiryType", e.target.value)}
                    style={inputStyle(!!errors.inquiryType)}
                    aria-required="true"
                    aria-invalid={!!errors.inquiryType}
                  >
                    <option value="">Select inquiry type...</option>
                    {inquiryTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </FormField>

                {/* Name */}
                <FormField label="Full Name *" error={errors.name}>
                  <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name" style={inputStyle(!!errors.name)} aria-required="true" aria-invalid={!!errors.name} />
                </FormField>

                {/* Org */}
                <FormField label="Organisation / Institution">
                  <input type="text" value={form.org} onChange={(e) => handleChange("org", e.target.value)}
                    placeholder="Bank, NGO, government dept., company (if applicable)" style={inputStyle(false)} />
                </FormField>

                {/* Contact */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <FormField label="Phone / WhatsApp" error={errors.contact}>
                    <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+880 ..." style={inputStyle(!!errors.contact)} aria-invalid={!!errors.contact} />
                  </FormField>
                  <FormField label="Email" error={errors.email}>
                    <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@example.com" style={inputStyle(!!errors.email)} aria-invalid={!!errors.email} />
                  </FormField>
                </div>
                {errors.contact && <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.riskRed, margin: "-10px 0 12px" }}>{errors.contact}</p>}

                {/* Budget (optional) */}
                <FormField label="Budget Range (optional)">
                  <select value={form.budget} onChange={(e) => handleChange("budget", e.target.value)} style={inputStyle(false)}>
                    <option value="">Prefer not to say</option>
                    <option value="under-50k">Under BDT 50,000</option>
                    <option value="50k-200k">BDT 50,000 – 2,00,000</option>
                    <option value="200k-1m">BDT 2,00,000 – 10,00,000</option>
                    <option value="above-1m">Above BDT 10,00,000</option>
                  </select>
                </FormField>

                {/* Message */}
                <FormField label="Message *" error={errors.message}>
                  <textarea value={form.message} onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Describe your inquiry, purpose, and what you need from Kutirchar EcoFarm..."
                    rows={5} style={{ ...inputStyle(!!errors.message), resize: "vertical" as const }}
                    aria-required="true" aria-invalid={!!errors.message} />
                </FormField>

                {/* Privacy note */}
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "#6b7280", lineHeight: 1.55, margin: "0 0 20px", background: "#f9f9f9", padding: "10px 12px", borderRadius: 8 }}>
                  🔒 Your contact information is used only to respond to your inquiry. We do not share your details with third parties. No sensitive documents are collected through this form.
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    width: "100%", background: status === "submitting" ? "#888" : COLORS.kutircharGreen,
                    color: "white", fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700,
                    padding: "14px", borderRadius: 10, border: "none",
                    cursor: status === "submitting" ? "wait" : "pointer", transition: "background 0.15s",
                  }}
                >
                  {status === "submitting" ? "Submitting..." : "Submit Inquiry →"}
                </button>
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
