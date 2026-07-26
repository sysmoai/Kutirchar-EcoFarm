import { BrandLogo } from "../BrandLogo";
import { SealLogo } from "../SealLogo";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section12DeveloperNotes() {
  return (
    <div>
      <SectionHeader
        num="12"
        title="Developer / Production Notes"
        desc="Official handoff reference for designers, developers, AI agents, printers, and all stakeholders. This section is the single source of truth for production decisions."
      />

      {/* Official Handoff Statement */}
      <Card className="mb-6" label="Official Brand Lock Statement">
        <div className="p-5 rounded-lg" style={{ background: "#0B4F2A" }}>
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <BrandLogo variant="horizontal" iconSize={48} mode="white" bilingual />
            <SealLogo size={80} mode="white" background="#0B4F2A" />
          </div>
          <blockquote
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 14,
              color: "#FAF7EF",
              lineHeight: 1.75,
              fontStyle: "italic",
              borderLeft: "3px solid #F2B544",
              paddingLeft: 16,
            }}
          >
            "Use <strong style={{ fontStyle: "normal" }}>Kutirchar EcoFarm</strong> as the exact official English name.
            Use <strong style={{ fontStyle: "normal", fontFamily: "'Noto Sans Bengali', sans-serif" }}>কুটিরচর ইকোফার্ম</strong> as the exact official Bengali name.
            The uploaded round icon is the master logo icon. The K represents Kutirchar and must not be removed or replaced.
            The brand must remain evidence-first, bank-ready, government-ready, and rural-modern."
          </blockquote>
        </div>
      </Card>

      {/* Project Identity */}
      <Card label="Project Identity" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InfoRow label="Official English Name" value="Kutirchar EcoFarm" highlight />
            <InfoRow label="Official Bengali Name" value="কুটিরচর ইকোফার্ম" highlight bangla />
            <InfoRow label="Project Owner / Lead" value="EMON HOSSAIN" />
            <InfoRow label="Decision Status" value="FINAL / FIXED — 21 June 2026" />
            <InfoRow label="Positioning" value="Smart Cattle, Biogas, Solar, Silage & Circular Profit Ecosystem" />
            <InfoRow label="Tagline (Primary)" value="Smart Cattle & Circular Energy Ecosystem" />
            <InfoRow label="Tagline (Alternative)" value="Dairy • Biogas • Solar • Silage" />
            <InfoRow label="Tagline (Third)" value="From Village Farm to Smart Eco-System" />
          </div>
          <div className="space-y-3">
            <InfoRow label="Location" value="Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh" />
            <InfoRow label="Website" value="kutircharecofarm.com" />
            <InfoRow label="Email" value="info@kutircharecofarm.com" />
            <InfoRow label="Zone A" value="10 decimal private/core land" />
            <InfoRow label="Zone B" value="12 decimal non-private/ejmali — removable use only" />
            <InfoRow label="Brand Approach" value="Evidence-first. Auditor tone. No hype." />
          </div>
        </div>
      </Card>

      {/* Name Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="Official Name — English Spelling Rules">
          <div className="space-y-2">
            <NameRow label="Official English" value="Kutirchar EcoFarm" valid />
            <NameRow label="Official Bengali" value="কুটিরচর ইকোফার্ম" valid bangla />
            <NameRow label="Wrong — split surname" value="Kutir Char EcoFarm" valid={false} />
            <NameRow label="Wrong — split product" value="Kutirchar Eco Farm" valid={false} />
            <NameRow label="Wrong — all lowercase" value="kutirchar ecofarm" valid={false} />
            <NameRow label="Wrong — alternate name" value="Kutirchar Smart Farm" valid={false} />
            <NameRow label="Wrong — abbreviation" value="KEF / K-Farm" valid={false} />
          </div>
        </Card>

        <Card label="Sub-Brand Naming System">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
            Future modules always use the master brand as prefix. Never drop "Kutirchar EcoFarm" from the sub-brand name.
          </p>
          <div className="space-y-2">
            {[
              { sub: "Kutirchar EcoFarm Dairy", note: "Cattle & dairy outputs module" },
              { sub: "Kutirchar EcoFarm Energy", note: "Solar & biogas energy module" },
              { sub: "Kutirchar EcoFarm Biogas", note: "Biogas digester & slurry module" },
              { sub: "Kutirchar EcoFarm Silage", note: "Fodder & silage production module" },
              { sub: "Kutirchar EcoFarm Training", note: "Education & farm visit module" },
              { sub: "Kutirchar EcoFarm Dashboard", note: "Digital monitoring & reporting module" },
            ].map((item) => (
              <div key={item.sub} className="flex items-start gap-2 py-1.5" style={{ borderBottom: "1px solid #f0f4f1" }}>
                <span style={{ color: "#1F6B3A", fontWeight: 700, flexShrink: 0, fontSize: 13 }}>→</span>
                <div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 600, color: "#1F6B3A", display: "block" }}>{item.sub}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280" }}>{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Phase System */}
      <Card label="Phase Label System — Now / Next / Later" className="mb-6">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
          Every product, service, claim, and feature in the brand system must carry a phase label. This is non-negotiable for bank-ready and government-ready credibility. No over-promise. Evidence first.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              phase: "NOW",
              color: "#1F6B3A",
              bg: "#f0f9f3",
              border: "#c0ddc8",
              desc: "Active and operational. Evidence exists. Safe to claim publicly.",
              examples: ["Vendor onboarding", "Partnership discussions", "Land verification progress", "Brand presence"],
            },
            {
              phase: "NEXT",
              color: "#2E6F8E",
              bg: "#f0f6fa",
              border: "#b8d4e0",
              desc: "Planned for the next phase. Gates must pass before claiming.",
              examples: ["Livestock pilot outputs", "Compost/vermicompost", "Fodder/silage surplus", "Bio-slurry fertilizer"],
            },
            {
              phase: "LATER",
              color: "#708238",
              bg: "#f5f6ee",
              border: "#cdd4a8",
              desc: "Demand-gated or verification-gated. Do not show as active.",
              examples: ["Training/farm tours", "Smart monitoring demo", "Service apartment", "Brand licensing"],
            },
          ].map((item) => (
            <div key={item.phase} className="rounded-lg p-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 800, color: item.color, letterSpacing: "0.12em", background: item.border, padding: "2px 10px", borderRadius: 4 }}>
                  {item.phase}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555", lineHeight: 1.55, marginBottom: 10 }}>{item.desc}</p>
              <ul className="space-y-1">
                {item.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-1.5">
                    <span style={{ color: item.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>·</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555" }}>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Design Token Reference */}
      <Card label="Design Token Reference" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#1F6B3A", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" as const }}>Colors</p>
            {[
              ["--color-kutirchar-green", "#1F6B3A", "Primary identity"],
              ["--color-deep-farm-green", "#0B4F2A", "Dark surfaces"],
              ["--color-field-green", "#4F9A3D", "Accents, tags"],
              ["--color-field-mist", "#EEF5EA", "Card backgrounds"],
              ["--color-document-ivory", "#FAF7EF", "Page backgrounds"],
              ["--color-charcoal-text", "#1E2420", "Body text"],
              ["--color-solar-gold", "#F2B544", "Solar/energy accent"],
              ["--color-verification-yellow", "#F4C430", "Verified-status badges only"],
              ["--color-river-blue", "#2E6F8E", "Water/solar accent"],
              ["--color-soil-brown", "#4A2F1B", "Document/stamp"],
              ["--color-bio-olive", "#708238", "Biogas/organic"],
              ["--color-bio-olive-deep", "#5E6E30", "AA olive for small text"],
              ["--color-risk-red", "#B42318", "Stop-rule UI only"],
              ["--color-gov-gray", "#4B5563", "Governance/meta text"],
            ].map(([token, hex]) => (
              <div key={token} className="flex items-center gap-2 py-0.5">
                <div style={{ width: 10, height: 10, borderRadius: 2, background: hex, flexShrink: 0, border: "1px solid rgba(0,0,0,0.1)" }} />
                <code style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#555", flex: 1 }}>{token}</code>
                <code style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#1F6B3A", fontWeight: 700 }}>{hex}</code>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#1F6B3A", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" as const }}>Typography</p>
            {[
              ["--font-brand-serif", "'Playfair Display', Georgia, serif"],
              ["--font-ui-sans", "'Inter', 'Manrope', sans-serif"],
              ["--font-bengali", "'Noto Sans Bengali', sans-serif"],
              ["--font-bengali-serif", "'Noto Serif Bengali', serif"],
              ["--font-alt-ui", "'Source Sans 3', sans-serif"],
            ].map(([token, value]) => (
              <div key={token} className="py-1" style={{ borderBottom: "1px solid #f0f4f1" }}>
                <code style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#6b7280", display: "block" }}>{token}:</code>
                <code style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#1F6B3A" }}>{value}</code>
              </div>
            ))}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#1F6B3A", letterSpacing: "0.08em", marginBottom: 8, marginTop: 16, textTransform: "uppercase" as const }}>Logo Minimum Sizes</p>
            {[
              ["Favicon", "16px"],
              ["Web nav", "32px icon / 120px full logo"],
              ["Document header", "44–52px icon"],
              ["Business card", "18mm / 51px"],
              ["Signage", "15cm width"],
              ["Report cover", "80–120px icon"],
              ["Seal — documents", "30mm / 85px"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-0.5">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555" }}>{label}</span>
                <code style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#1F6B3A", fontWeight: 600 }}>{value}</code>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Brand Tone */}
      <Card label="Brand Tone & Voice" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1F6B3A", marginBottom: 8 }}>Brand Must Always Feel</p>
            <div className="flex flex-wrap gap-2">
              {["Evidence-First", "Bank-Ready", "Government-Ready", "Trustworthy", "Rural-Modern", "Practical", "Disciplined", "Auditor Tone", "Proof-Based", "Circular", "Professional", "Grounded"].map((tag) => (
                <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#1F6B3A", background: "#f0f9f3", border: "1px solid #c0ddc8", padding: "3px 10px", borderRadius: 4 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#B42318", marginBottom: 8 }}>Brand Must NEVER Feel</p>
            <div className="flex flex-wrap gap-2">
              {["Childish", "Cartoonish", "Startup-Hype", "Over-Decorated", "Casual", "Luxury-First", "Glossy-Green", "Exaggerated", "Unverified"].map((tag) => (
                <span key={tag} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, color: "#B42318", background: "#fff5f5", border: "1px solid #fecdca", padding: "3px 10px", borderRadius: 4 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ background: "#FAF7EF", border: "1px solid #e0eed5" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555", lineHeight: 1.65 }}>
            <strong style={{ color: "#1F6B3A" }}>Content rule:</strong> Every public claim must map to evidence, a phase status, or a next action. No over-promise. No sensitive personal identifiers (NID/PIN) on any public materials. Zone B content must show removable-only use — no permanent construction claims until verification gates are passed.
          </p>
        </div>
      </Card>

      {/* Brand Custodian */}
      <div className="p-4 rounded-xl" style={{ background: "#f0f9f3", border: "1px solid #c0ddc8" }}>
        <div className="flex items-start gap-3">
          <div style={{ width: 3, borderRadius: 4, background: "#1F6B3A", alignSelf: "stretch", flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: "#0B4F2A", marginBottom: 4 }}>Brand Custodian Notice</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#1E2420", lineHeight: 1.7 }}>
              This brand identity guide is the official reference for all Kutirchar EcoFarm communications. Brand Owner:{" "}
              <strong>EMON HOSSAIN</strong>. Decision locked: <strong>21 June 2026</strong>. Status: <strong>FINAL / FIXED</strong>.
              Any new applications or use cases not covered in this guide must be reviewed against these principles before publication.
              The master logo icon is locked — it must not be modified, recreated, or replaced without formal brand review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight, bangla }: { label: string; value: string; highlight?: boolean; bangla?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-1.5" style={{ borderBottom: "1px solid #f0f4f1" }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", minWidth: 140, flexShrink: 0, paddingTop: 1 }}>{label}</span>
      <span style={{
        fontFamily: bangla ? "'Noto Serif Bengali', Georgia, serif" : highlight ? "'Playfair Display', serif" : "'Inter', sans-serif",
        fontSize: bangla ? 14 : highlight ? 14 : 12,
        fontWeight: highlight ? 600 : 500,
        color: highlight ? "#1F6B3A" : "#1E2420",
        lineHeight: 1.45,
      }}>{value}</span>
    </div>
  );
}

function NameRow({ label, value, valid, bangla }: { label: string; value: string; valid: boolean; bangla?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-1.5" style={{ borderBottom: "1px solid #f0f4f1" }}>
      <span style={{ fontSize: 13, color: valid ? "#1F6B3A" : "#B42318", flexShrink: 0, fontWeight: 700 }}>{valid ? "✓" : "✕"}</span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", minWidth: 110, flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: bangla ? "'Noto Serif Bengali', Georgia, serif" : "'Playfair Display', serif", fontSize: 13, fontWeight: 600, color: valid ? "#1F6B3A" : "#B42318" }}>{value}</span>
    </div>
  );
}
