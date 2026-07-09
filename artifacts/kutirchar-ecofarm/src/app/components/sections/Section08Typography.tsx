import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section08Typography() {
  return (
    <div>
      <SectionHeader
        num="08"
        title="Typography System"
        desc="A dual-language typographic system optimized for trustworthy, bank-ready communication in both English and Bengali. Premium serif for display, clean sans-serif for body and UI."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="English — Wordmark Style">
          <div className="p-4 rounded-lg" style={{ background: "#FAF7EF" }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.15 }}>Kutirchar</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.15 }}>EcoFarm</p>
          </div>
          <div className="mt-3 space-y-1">
            <TypeMeta label="Font" value="Playfair Display" />
            <TypeMeta label="Weight" value="SemiBold (600)" />
            <TypeMeta label="Style" value="Regular / No Italic in logo" />
            <TypeMeta label="Tracking" value="+0.02em (slight open)" />
            <TypeMeta label="Purpose" value="Logo wordmark, report headings, official documents" />
          </div>
        </Card>

        <Card label="Bengali — Wordmark Style">
          <div className="p-4 rounded-lg" style={{ background: "#FAF7EF" }}>
            <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 36, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.3 }}>কুটিরচর</p>
            <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 36, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.3 }}>ইকোফার্ম</p>
          </div>
          <div className="mt-3 space-y-1">
            <TypeMeta label="Font" value="Noto Serif Bengali" />
            <TypeMeta label="Weight" value="SemiBold (600)" />
            <TypeMeta label="Pairs with" value="Playfair Display (English sibling)" />
            <TypeMeta label="Tracking" value="0em (protects conjuncts)" />
            <TypeMeta label="Purpose" value="Bengali name in logo, official bilingual documents" />
          </div>
        </Card>
      </div>

      <Card label="English Type Scale" className="mb-6">
        <div className="space-y-4 p-4" style={{ background: "#FAF7EF", borderRadius: 8 }}>
          {[
            { label: "Display / Cover Title", font: "'Playfair Display', serif", size: 48, weight: 700, color: "#1E2420", text: "Kutirchar EcoFarm", spec: "Playfair Display · 48px · Bold" },
            { label: "Report H1", font: "'Playfair Display', serif", size: 32, weight: 600, color: "#1E2420", text: "Annual Operations Report", spec: "Playfair Display · 32px · SemiBold" },
            { label: "Section Heading H2", font: "'Inter', sans-serif", size: 22, weight: 600, color: "#1F6B3A", text: "Biogas Production Summary", spec: "Inter · 22px · SemiBold" },
            { label: "Sub-heading H3", font: "'Inter', sans-serif", size: 16, weight: 600, color: "#1E2420", text: "Quarterly Energy Output", spec: "Inter · 16px · SemiBold" },
            { label: "Body Text", font: "'Inter', sans-serif", size: 14, weight: 400, color: "#3a3a3a", text: "Kutirchar EcoFarm operates a closed-loop circular energy system integrating cattle, solar, and biogas production for sustainable rural development.", spec: "Inter · 14px · Regular · 1.65 line height" },
            { label: "Caption / Label", font: "'Inter', sans-serif", size: 11, weight: 600, color: "#1F6B3A", text: "SOLAR OUTPUT — PHASE 1 REPORT", spec: "Inter · 11px · SemiBold · Uppercase · +0.08em tracking" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", letterSpacing: "0.06em" }}>{item.label.toUpperCase()} · {item.spec}</span>
              <p style={{ fontFamily: item.font, fontSize: item.size, fontWeight: item.weight, color: item.color, lineHeight: 1.4 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card label="Bengali Type Scale" className="mb-6">
        <div className="space-y-4 p-4" style={{ background: "#FAF7EF", borderRadius: 8 }}>
          {[
            { label: "Display / Heading", font: "'Noto Serif Bengali', serif", size: 36, weight: 700, color: "#1F6B3A", text: "কুটিরচর ইকোফার্ম" },
            { label: "Section Heading", font: "'Noto Sans Bengali', sans-serif", size: 24, weight: 600, color: "#1E2420", text: "বার্ষিক কার্যক্রম প্রতিবেদন" },
            { label: "Body Text", font: "'Noto Sans Bengali', sans-serif", size: 14, weight: 400, color: "#3a3a3a", text: "কুটিরচর ইকোফার্ম একটি সুসংহত সার্কুলার এনার্জি ইকোসিস্টেম পরিচালনা করে যেখানে গবাদিপশু, সোলার এবং বায়োগ্যাস উৎপাদন একত্রিত।" },
            { label: "Caption", font: "'Noto Sans Bengali', sans-serif", size: 11, weight: 600, color: "#1F6B3A", text: "ডেইরি · বায়োগ্যাস · সোলার · সাইলেজ" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", letterSpacing: "0.06em" }}>{item.label.toUpperCase()}</span>
              <p style={{ fontFamily: item.font, fontSize: item.size, fontWeight: item.weight, color: item.color, lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card label="Bilingual Pairing — English + Bengali Together" className="mb-6">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
          When English and Bengali appear together — in logos, document headers, and official communications — these pairing rules ensure visual harmony and equal weight.
        </p>
        <div className="space-y-4">
          {/* Document Header Pairing */}
          <div className="p-4 rounded-lg" style={{ background: "#FAF7EF", border: "1px solid #e0eed5" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>DOCUMENT HEADER — BILINGUAL MATCH</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.15 }}>Kutirchar EcoFarm</p>
            <div style={{ height: 1, background: "#1F6B3A", opacity: 0.2, margin: "5px 0" }} />
            <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 25, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.4 }}>কুটিরচর ইকোফার্ম</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 6, letterSpacing: "0.04em" }}>Playfair Display + Noto Serif Bengali · Bengali upsized +14% (25px) for optical match ✓</p>
          </div>
          {/* Signage Pairing */}
          <div className="p-4 rounded-lg" style={{ background: "#0B4F2A" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>SIGNAGE / BANNER — BILINGUAL WHITE MATCH</span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.15 }}>Kutirchar EcoFarm</p>
            <div style={{ height: 1, background: "#FFFFFF", opacity: 0.2, margin: "6px 0" }} />
            <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 32, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.4 }}>কুটিরচর ইকোফার্ম</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>Playfair Display + Noto Serif Bengali · Bengali upsized +14% (32px) for optical match ✓</p>
          </div>
          {/* Body Pairing */}
          <div className="p-4 rounded-lg" style={{ background: "#f9f9f9" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>BODY COPY — PAIRING RULE</span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#1E2420", lineHeight: 1.65, marginBottom: 8 }}>
              Smart cattle and circular energy.
            </p>
            <p style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: 16, color: "#1E2420", lineHeight: 1.65 }}>
              স্মার্ট গবাদিপশু এবং সার্কুলার এনার্জি।
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 8 }}>
              Inter 14px + Noto Sans Bengali 16px (+14% optical boost)
            </p>
            <p style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: 14, color: "#1E2420", lineHeight: 1.65 }}>
              কুটিরচর ইকোফার্ম বাংলাদেশের গ্রামীণ এলাকায় একটি সার্কুলার এনার্জি ইকোসিস্টেম — গবাদিপশু, বায়োগ্যাস, সোলার ও সাইলেজ একত্রিত।
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 8 }}>
              Inter 14px + Noto Sans Bengali 14px · same size, same weight for parity
            </p>
          </div>
        </div>
      </Card>

      <Card label="Font Selection Guide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { fonts: ["Playfair Display", "Georgia (fallback)"], use: "Logo wordmark, report titles, certificate headings, presentation covers", style: "'Playfair Display', Georgia, serif" },
            { fonts: ["Inter", "Manrope (alt)", "Source Sans 3 (alt)"], use: "UI body text, captions, labels, document body, invoices, all digital UI", style: "'Inter', sans-serif" },
            { fonts: ["Noto Serif Bengali", "Noto Sans Bengali (body)"], use: "Noto Serif Bengali for the Bangla wordmark & display headings (sibling to Playfair); Noto Sans Bengali for Bangla body, captions & UI (sibling to Inter)", style: "'Noto Serif Bengali', Georgia, serif" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg" style={{ background: "#f7fbf8", border: "1px solid #e0eed5" }}>
              {item.fonts.map((f, j) => (
                <p key={j} style={{ fontFamily: item.style, fontSize: j === 0 ? 18 : 13, fontWeight: j === 0 ? 600 : 400, color: j === 0 ? "#1F6B3A" : "#6b7280", lineHeight: 1.3, marginBottom: 2 }}>{f}</p>
              ))}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555", marginTop: 8, lineHeight: 1.5 }}>{item.use}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TypeMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", minWidth: 80 }}>{label}:</span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#1E2420", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
