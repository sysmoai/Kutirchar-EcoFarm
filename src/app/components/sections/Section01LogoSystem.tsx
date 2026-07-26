import * as React from "react";
import { BrandLogo } from "../BrandLogo";
import { SectionHeader, Card } from "./Section00MasterLogo";
import logoIcon from "../../../imports/image.png";

export function Section01LogoSystem() {
  return (
    <div>
      <SectionHeader
        num="01"
        title="Logo System"
        desc="The complete logo system built around the master icon. Each variant serves a specific use case — from full-color primary identity to compact digital formats."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="Primary Logo — English">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="horizontal" iconSize={72} mode="color" />
          </LogoPreview>
          <VariantDesc>Icon + English name in Playfair Display. Primary brand presentation for all formal contexts.</VariantDesc>
        </Card>

        <Card label="Primary Logo — Bilingual">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="horizontal" iconSize={72} mode="color" bilingual />
          </LogoPreview>
          <VariantDesc>Icon + English + Bengali names. Official bilingual identity for government and bank documents.</VariantDesc>
        </Card>

        <Card label="Bengali-First Logo">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="horizontal" iconSize={72} mode="color" bilingual bengaliFirst />
          </LogoPreview>
          <VariantDesc>Bengali name as primary, English below. For local Bangladeshi context and regional communication.</VariantDesc>
        </Card>

        <Card label="Icon Only">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="icon-only" iconSize={100} mode="color" />
          </LogoPreview>
          <VariantDesc>Round icon alone. For app icons, favicons, social avatars, and space-constrained contexts.</VariantDesc>
        </Card>

        <Card label="Compact Logo">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="horizontal" iconSize={40} mode="color" />
          </LogoPreview>
          <VariantDesc>Reduced-size horizontal format for website headers, navigation bars, and document running headers.</VariantDesc>
        </Card>

        <Card label="Tagline Version">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="stacked" iconSize={80} mode="color" showTagline />
          </LogoPreview>
          <VariantDesc>Icon + name + tagline "Smart Cattle & Circular Energy Ecosystem". For presentations and covers.</VariantDesc>
        </Card>

        <Card label="Report Header Logo">
          <LogoPreview bg="white" bordered>
            <div className="w-full flex items-center justify-between px-4">
              <BrandLogo variant="horizontal" iconSize={44} mode="color" bilingual />
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1F6B3A", fontWeight: 600, letterSpacing: "0.06em" }}>OFFICIAL DOCUMENT</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#6b7280" }}>Kutirchar EcoFarm</p>
              </div>
            </div>
          </LogoPreview>
          <VariantDesc>Horizontal format for bank PDF headers, government reports, vendor quotations, and invoices.</VariantDesc>
        </Card>

        <Card label="Social Avatar / App Icon">
          <LogoPreview bg="#FAF7EF">
            <div className="flex items-center gap-6">
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "2px solid #1F6B3A" }}>
                <img src={logoIcon} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", background: "#FAF7EF", border: "2px solid #1F6B3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoIcon} alt="app icon" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
              </div>
              <div style={{ width: 80, height: 80, background: "#0B4F2A", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoIcon} alt="app icon dark" style={{ width: "85%", height: "85%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </div>
            </div>
          </LogoPreview>
          <VariantDesc>Round for WhatsApp/social profiles. Rounded square for app icons. Dark version for dark contexts.</VariantDesc>
        </Card>

        <Card label="Watermark Version">
          <LogoPreview bg="white" bordered>
            {/* Logo at z-0 behind document lines at z-1 */}
            <div style={{ position: "relative", width: "100%", minHeight: 116 }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 0 }}>
                <BrandLogo variant="stacked" iconSize={88} mode="watermark" />
              </div>
              <div style={{ position: "relative", zIndex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                {[100, 86, 94, 70, 82, 91].map((w, i) => (
                  <div key={i} style={{ height: 4, borderRadius: 2, background: "#ebebeb", width: `${w}%` }} />
                ))}
              </div>
            </div>
          </LogoPreview>
          <VariantDesc>Logo at 10% opacity — placed behind document content on reports, bank PDFs, and official letters.</VariantDesc>
        </Card>

        <Card label="Short Descriptor Version">
          <LogoPreview bg="#FAF7EF">
            <BrandLogo variant="stacked" iconSize={80} mode="color" showShortDesc />
          </LogoPreview>
          <VariantDesc>Icon + name + "Dairy · Biogas · Solar · Silage" descriptor for product labels and marketing materials.</VariantDesc>
        </Card>
      </div>
    </div>
  );
}

function LogoPreview({ children, bg, bordered }: { children: React.ReactNode; bg: string; bordered?: boolean }) {
  return (
    <div
      className="flex items-center justify-center min-h-32 rounded-lg mb-3"
      style={{ background: bg, border: bordered ? "1px solid #ddd" : "1px solid transparent", padding: "24px 20px" }}
    >
      {children}
    </div>
  );
}

function VariantDesc({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", lineHeight: 1.5 }}>{children}</p>;
}
