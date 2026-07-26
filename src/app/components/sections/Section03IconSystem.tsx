import * as React from "react";
import logoIcon from "../../../imports/image.png";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section03IconSystem() {
  const faviconSizes = [16, 32, 48, 64];
  const appIconSizes = [512, 256, 128];

  return (
    <div>
      <SectionHeader
        num="03"
        title="Icon System"
        desc="The round icon in all production contexts — from full-color master to monochrome variants, favicon sizes, and app icon specifications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="1. Master Full-Color Round Icon">
          <IconBox bg="#FAF7EF">
            <img src={logoIcon} alt="icon" style={{ width: 120, height: 120, objectFit: "contain" }} />
          </IconBox>
        </Card>

        <Card label="2. Full-Color Square App Tile">
          <IconBox bg="#FAF7EF">
            <div style={{ width: 120, height: 120, background: "#FAF7EF", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(31,107,58,0.15)", border: "1px solid #e0eed5" }}>
              <img src={logoIcon} alt="icon" style={{ width: "85%", height: "85%", objectFit: "contain" }} />
            </div>
          </IconBox>
        </Card>

        <Card label="3. Full-Color Circular Avatar">
          <IconBox bg="#FAF7EF">
            <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", border: "3px solid #1F6B3A", boxShadow: "0 4px 20px rgba(31,107,58,0.2)" }}>
              <img src={logoIcon} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </IconBox>
        </Card>

        <Card label="4. White Icon on Dark Green">
          <IconBox bg="#0B4F2A">
            <img src={logoIcon} alt="icon" style={{ width: 120, height: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </IconBox>
        </Card>

        <Card label="5. Dark Green Monochrome Icon">
          <IconBox bg="white" bordered>
            <img src={logoIcon} alt="icon" style={{ width: 120, height: 120, objectFit: "contain", filter: "grayscale(1) sepia(1) saturate(8) hue-rotate(85deg) brightness(0.65)" }} />
          </IconBox>
        </Card>

        <Card label="6. Black Icon on White">
          <IconBox bg="white" bordered>
            <img src={logoIcon} alt="icon" style={{ width: 120, height: 120, objectFit: "contain", filter: "brightness(0)" }} />
          </IconBox>
        </Card>

        <Card label="7. Embossed Stamp Style">
          <IconBox bg="white" bordered>
            <div style={{ width: 130, height: 130, borderRadius: "50%", border: "3px solid #1F6B3A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 2px 8px rgba(31,107,58,0.2), 0 2px 8px rgba(31,107,58,0.1)" }}>
              <img src={logoIcon} alt="stamp" style={{ width: "80%", height: "80%", objectFit: "contain", filter: "grayscale(1) sepia(1) saturate(8) hue-rotate(85deg) brightness(0.65)" }} />
            </div>
          </IconBox>
        </Card>

        <Card label="8. Icon on Soil Brown">
          <IconBox bg="#4A2F1B">
            <img src={logoIcon} alt="icon" style={{ width: 120, height: 120, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </IconBox>
        </Card>
      </div>

      <Card label="Favicon Size Preview — 16px / 32px / 48px / 64px" className="mb-6">
        <div className="flex items-end gap-10 p-4 flex-wrap">
          {faviconSizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div style={{ background: "#FAF7EF", padding: 6, borderRadius: 4, border: "1px solid #e0eed5" }}>
                <img src={logoIcon} alt={`${s}px`} style={{ width: s, height: s, objectFit: "contain", imageRendering: s <= 32 ? "pixelated" : "auto" }} />
              </div>
              <span style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#666" }}>{s}px</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280" }}>
                {s <= 16 ? "Browser tab" : s <= 32 ? "Desktop shortcut" : s <= 48 ? "Web app" : "High DPI"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card label="App Icon Preview — Production Sizes">
        <div className="flex items-end gap-8 p-4 flex-wrap">
          {appIconSizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div style={{ width: Math.min(s / 2, 128), height: Math.min(s / 2, 128), background: "#FAF7EF", borderRadius: Math.min(s / 8, 24), border: "1px solid #e0eed5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <img src={logoIcon} alt={`${s}px app`} style={{ width: "85%", height: "85%", objectFit: "contain" }} />
              </div>
              <span style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#666" }}>{s}×{s}px</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6b7280", marginTop: 12, lineHeight: 1.5 }}>
          Export 1024×1024px master. Generate 512, 256, 128, 64, 48, 32, 16px from the master. Always export on transparent background (PNG) and white background (PNG) versions.
        </p>
      </Card>
    </div>
  );
}

function IconBox({ children, bg, bordered }: { children: React.ReactNode; bg: string; bordered?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg min-h-36"
      style={{ background: bg, border: bordered ? "1px solid #ddd" : "1px solid transparent", padding: 24 }}
    >
      {children}
    </div>
  );
}
