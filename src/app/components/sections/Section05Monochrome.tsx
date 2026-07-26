import * as React from "react";
import { BrandLogo } from "../BrandLogo";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section05Monochrome() {
  return (
    <div>
      <SectionHeader
        num="05"
        title="Monochrome + Reverse Versions"
        desc="All logo variants in single-color formats for low-ink printing, black-and-white documents, embossing, and reverse applications on colored backgrounds."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="Full-Color — Master Reference">
          <ModeBox bg="#FAF7EF" label="Full Color · Primary">
            <BrandLogo variant="horizontal" iconSize={60} mode="color" bilingual />
          </ModeBox>
        </Card>

        <Card label="One-Color Dark Green">
          <ModeBox bg="white" label="One-Color Green · For print and proposals" bordered>
            <BrandLogo variant="horizontal" iconSize={60} mode="dark-green" bilingual />
          </ModeBox>
        </Card>

        <Card label="One-Color Black">
          <ModeBox bg="white" label="Black · For fax, photocopies, low-cost print" bordered>
            <BrandLogo variant="horizontal" iconSize={60} mode="black" bilingual />
          </ModeBox>
        </Card>

        <Card label="White on Deep Farm Green">
          <ModeBox bg="#0B4F2A" label="White on Deep Green · For headers and signage">
            <BrandLogo variant="horizontal" iconSize={60} mode="white" bilingual />
          </ModeBox>
        </Card>

        <Card label="White on Soil Brown">
          <ModeBox bg="#4A2F1B" label="White on Soil Brown · For earthy print materials">
            <BrandLogo variant="horizontal" iconSize={60} mode="white" bilingual />
          </ModeBox>
        </Card>

        <Card label="Stacked White on Green">
          <ModeBox bg="#1F6B3A" label="Stacked White · For presentation covers">
            <BrandLogo variant="stacked" iconSize={80} mode="white" bilingual />
          </ModeBox>
        </Card>

        <Card label="Watermark / Low-Opacity">
          <ModeBox bg="white" label="Watermark · Behind document content · 10% opacity" bordered>
            {/* In real documents the watermark sits BEHIND content.
                Logo is absolutely centred at z-index 0; document lines
                overlay at z-index 1 to demonstrate correct layering. */}
            <div style={{ position: "relative", width: 200, height: 160 }}>
              {/* Layer 0 — Watermark logo, centred, behind everything */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 0 }}>
                <BrandLogo variant="stacked" iconSize={78} mode="watermark" />
              </div>
              {/* Layer 1 — Document text lines, on top of watermark */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 7, padding: "0 18px", zIndex: 1 }}>
                <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", width: "100%" }} />
                <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", width: "85%" }} />
                <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", width: "92%" }} />
                <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", width: "78%" }} />
                <div style={{ height: 4, borderRadius: 2, background: "#e8e8e8", width: "88%" }} />
              </div>
            </div>
          </ModeBox>
        </Card>

        <Card label="Low-Ink Document Version">
          <ModeBox bg="white" label="Low-Ink · Minimal ink for laser print" bordered>
            <div style={{ opacity: 0.6 }}>
              <BrandLogo variant="horizontal" iconSize={60} mode="black" />
            </div>
          </ModeBox>
        </Card>
      </div>

      <Card label="Quick Reference — Mode vs. Usage">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse", fontFamily: "'Inter', sans-serif", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f7fbf8" }}>
                {["Mode", "Background", "Use When"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#1F6B3A", fontWeight: 600, letterSpacing: "0.04em", fontSize: 11, textTransform: "uppercase", borderBottom: "2px solid #e0eed5" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Full Color", "White / Ivory", "Digital, website, presentations, color print"],
                ["Dark Green", "White / Light", "Proposals, reports, single-color print"],
                ["Black", "White", "Fax, photocopies, legal stamp, low-cost print"],
                ["White on Green", "Dark Green", "Headers, signage, banners, certificates"],
                ["White on Brown", "Soil Brown", "Earthy collateral, local print, product labels"],
                ["Watermark", "White / Ivory", "Document background, PDF page underlays"],
              ].map(([mode, bg, use], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f4f1" }}>
                  <td style={{ padding: "10px 14px", color: "#1F6B3A", fontWeight: 500 }}>{mode}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{bg}</td>
                  <td style={{ padding: "10px 14px", color: "#555" }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ModeBox({ children, bg, label, bordered }: { children: React.ReactNode; bg: string; label: string; bordered?: boolean }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: bordered ? "1px solid #ddd" : undefined }}>
      <div className="flex items-center justify-center min-h-32" style={{ background: bg, padding: "24px 20px" }}>
        {children}
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", padding: "8px 12px", background: bg === "white" ? "#fafafa" : undefined }}>
        {label}
      </p>
    </div>
  );
}
