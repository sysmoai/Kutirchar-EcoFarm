import * as React from "react";
import { SealLogo } from "../SealLogo";
import { BrandLogo } from "../BrandLogo";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section04SealSystem() {
  return (
    <div>
      <SectionHeader
        num="04"
        title="Seal + Stamp System"
        desc="The official circular seal for formal documents, government correspondence, bank submissions, investor packs, and organizational certificates. Double outer ring, Playfair Display English arc, Noto Serif Bengali arc (matched serif sibling), and the master icon centered inside the inner field."
      />

      {/* ── Four main seal variants ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <Card label="Full-Color Official Seal">
          <SealBox bg="#FAF7EF">
            <SealLogo size={260} mode="color" />
          </SealBox>
          <SealMeta
            label="Primary"
            usage="Official digital documents, premium print, investor packs, report covers, website use."
            specs={["Kutirchar Green #1F6B3A", "White background", "Playfair Display English", "Noto Serif Bengali"]}
          />
        </Card>

        <Card label="Dark Green Single-Color Seal">
          <SealBox bg="white" bordered>
            <SealLogo size={260} mode="dark-green" />
          </SealBox>
          <SealMeta
            label="Print / Document"
            usage="Printed reports, proposals, letterhead, vendor quotations — cost-efficient single-ink print."
            specs={["Deep Farm Green #0B4F2A", "White / Ivory background", "Single ink color", "Print-ready"]}
          />
        </Card>

        <Card label="Black Stamp Version">
          <SealBox bg="white" bordered>
            <SealLogo size={260} mode="black" />
          </SealBox>
          <SealMeta
            label="Stamp / Fax / Photocopy"
            usage="Rubber stamp, fax transmission, photocopied documents, black-and-white laser print, legal submissions."
            specs={["Charcoal #1E2420", "White background", "Maximum contrast", "Mono print safe"]}
          />
        </Card>

        <Card label="White / Reverse Seal">
          <SealBox bg="#1F6B3A">
            <SealLogo size={260} mode="white" background="#1F6B3A" />
          </SealBox>
          <SealMeta
            label="Reverse / Certificate"
            usage="Dark green backgrounds, certificate embossing, premium cover pages, presentation slides, banners."
            specs={["White on Kutirchar Green", "Reversed for dark surfaces", "Certificate-grade", "Premium print"]}
          />
        </Card>
      </div>

      {/* ── Size comparison ── */}
      <Card label="Seal at Multiple Sizes — Legibility Check" className="mb-6">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginBottom: 20, lineHeight: 1.6 }}>
          The seal must remain fully legible at all usage sizes. Check that the arc text, separator dots, and icon are all clear at each scale. Minimum recommended seal size for print is <strong>30mm / 85px</strong>.
        </p>
        <div className="flex flex-wrap items-end gap-8 p-4" style={{ background: "#FAF7EF", borderRadius: 8 }}>
          {[240, 160, 120, 85, 60].map((sz) => (
            <div key={sz} className="flex flex-col items-center gap-2">
              <SealLogo size={sz} mode="color" />
              <span style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#6b7280" }}>{sz}px</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: sz < 85 ? "#B42318" : "#4F9A3D", fontWeight: 600 }}>
                {sz < 85 ? "Too small" : sz === 85 ? "Minimum" : "✓ OK"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Seal on Deep Green background ── */}
      <Card label="White Seal on All Green Variants" className="mb-6">
        <div className="flex flex-wrap gap-4 p-4 rounded-lg" style={{ background: "#1E2420" }}>
          {(["#1F6B3A", "#0B4F2A", "#4F9A3D", "#4A2F1B"] as const).map((bg, i) => (
            <div key={bg} className="flex flex-col items-center gap-2">
              <div style={{ background: bg, borderRadius: 8, padding: 16 }}>
                <SealLogo size={120} mode="white" background={bg} />
              </div>
              <span style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#6b7280" }}>{bg}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280" }}>
                {["Kutirchar Green", "Deep Farm Green", "Field Green", "Soil Brown"][i]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Bank document mockup ── */}
      <Card label="Bank-Ready PDF Document Mock" className="mb-6">
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #d4e8db" }}>
          {/* Document header band */}
          <div style={{ background: "#0B4F2A", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BrandLogo variant="horizontal" iconSize={40} mode="white" bilingual />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.72)", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
              Official Document
            </span>
          </div>

          {/* Document body */}
          <div className="p-6" style={{ background: "#FAF7EF" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="col-span-2">
                <div style={{ borderBottom: "1px solid #d4e8db", paddingBottom: 14, marginBottom: 16 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#1F6B3A", lineHeight: 1.2 }}>
                    Verification & Foundation Phase — Progress Report
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                    Reporting period 2026 · Kutirchar EcoFarm
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.8 }}>
                  <span style={{ color: "#6b7280", fontWeight: 600 }}>Re:</span>
                  <span style={{ color: "#333" }}>Verification & Foundation Phase — Progress Report</span>
                  <span style={{ color: "#6b7280", fontWeight: 600 }}>To:</span>
                  <span style={{ color: "#333" }}>[Recipient — bank / government verification office]</span>
                  <span style={{ color: "#6b7280", fontWeight: 600 }}>From:</span>
                  <span style={{ color: "#333" }}>Emon Hossain, Farm Director — Kutirchar EcoFarm</span>
                  <span style={{ color: "#6b7280", fontWeight: 600 }}>Location:</span>
                  <span style={{ color: "#333" }}>Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj</span>
                  <span style={{ color: "#6b7280", fontWeight: 600 }}>Date:</span>
                  <span style={{ color: "#333" }}>June 2026</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 14, fontStyle: "italic", lineHeight: 1.6 }}>
                  Specimen only — illustrates how the official organizational seal is placed on a formal report. Names and recipients are placeholders.
                </p>
              </div>

              {/* Seal column */}
              <div className="flex flex-col items-center gap-3">
                <SealLogo size={150} mode="dark-green" />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", textAlign: "center", letterSpacing: "0.08em" }}>
                  OFFICIAL SEAL<br />Kutirchar EcoFarm
                </p>
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div style={{ background: "#e8f2ec", borderTop: "1px solid #d4e8db", padding: "8px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 12, fontWeight: 600, color: "#1F6B3A" }}>কুটিরচর ইকোফার্ম</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280" }}>kutircharecofarm.com · info@kutircharecofarm.com</span>
          </div>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginTop: 12, lineHeight: 1.6 }}>
          Use the <strong>Dark Green</strong> or <strong>Black</strong> seal on printed documents. Use the <strong>Full-Color</strong> seal on premium digital reports and PDFs. The White/Reverse seal is for dark-background contexts only.
        </p>
      </Card>

      {/* ── Usage rules ── */}
      <Card label="Seal Usage Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1F6B3A", marginBottom: 10 }}>Correct Use</p>
            <ul className="space-y-2">
              {[
                "Place seal on clean, high-contrast, solid backgrounds only",
                "Use Dark Green or Black seal for print documents",
                "Use Full-Color seal for digital PDFs and presentations",
                "White/Reverse seal on dark green or brown backgrounds only",
                "Minimum print size: 30mm / 85px diameter",
                "Always use official English + Bengali name in arc text",
                "Place seal in the top-right or bottom-right of formal documents",
              ].map((rule) => (
                <li key={rule} className="flex gap-2 items-start">
                  <span style={{ color: "#1F6B3A", fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555", lineHeight: 1.5 }}>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#B42318", marginBottom: 10 }}>Never Do This</p>
            <ul className="space-y-2">
              {[
                "Never place the seal on a patterned, textured, or photo background",
                "Never resize the seal below 30mm / 85px",
                "Never distort or change the seal proportions",
                "Never alter the arc text — use exact official names only",
                "Never remove the separator dots or rings",
                "Never use a color-inverted or gradient version of the seal",
                "Never place the Full-Color seal on a dark or saturated background",
              ].map((rule) => (
                <li key={rule} className="flex gap-2 items-start">
                  <span style={{ color: "#B42318", fontWeight: 700, flexShrink: 0, fontSize: 13 }}>✕</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555", lineHeight: 1.5 }}>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ background: "#fff8ed", border: "1px solid #F2B544" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#1E2420", lineHeight: 1.65 }}>
            <strong style={{ color: "#4A2F1B" }}>Developer Note:</strong> The seal uses <strong>Playfair Display</strong> and <strong>Noto Serif Bengali</strong> perfectly matched at `font-weight: 600`. To prevent the Bengali matra (top continuous line) from crushing on the concave bottom curve in the SVG, the engine uses a <strong>Single Matra Pivot Radius</strong> (`0.376`). English text draws UP from this radius, and Bengali text hangs DOWN from this radius (`dominantBaseline="hanging"`). This is the only mathematically sound way to render continuous script on a circular path. Never alter this geometry!
          </p>
        </div>
      </Card>
    </div>
  );
}

// ── Helper components ────────────────────────────────────────────────────────

function SealBox({ children, bg, bordered }: { children: React.ReactNode; bg: string; bordered?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{
        background: bg,
        border: bordered ? "1px solid #ddd" : "1px solid transparent",
        padding: 28,
        minHeight: 220,
      }}
    >
      {children}
    </div>
  );
}

function SealMeta({ label, usage, specs }: { label: string; usage: string; specs: string[] }) {
  return (
    <div className="mt-4 space-y-2">
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, color: "#1F6B3A", letterSpacing: "0.08em", textTransform: "uppercase" as const, background: "#f0f9f3", padding: "2px 8px", borderRadius: 4 }}>
        {label}
      </span>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555", lineHeight: 1.6 }}>{usage}</p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {specs.map((s) => (
          <span key={s} style={{ fontFamily: "'Inter', monospace", fontSize: 10, color: "#1F6B3A", background: "#f7fbf8", border: "1px solid #e0eed5", padding: "1px 7px", borderRadius: 3 }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
