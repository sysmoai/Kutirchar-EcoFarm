import logoIcon from "../../../imports/image.png";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section06ClearSpace() {
  return (
    <div>
      <SectionHeader
        num="06"
        title="Clear Space + Sizing Rules"
        desc="Minimum clear space and size rules ensure the logo always appears clean and legible. The spacing unit X equals the icon radius — half the icon diameter."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card label="Clear Space — Icon Only">
          <ClearSpaceDemo />
        </Card>
        <Card label="Clear Space — Horizontal Logo">
          <ClearSpaceHorizontal />
        </Card>
      </div>

      <Card label="Minimum Size Rules" className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { context: "Print — Full Logo",  minSize: "40mm wide",    pxEq: "≈ 113px",    note: "Minimum for letterhead, reports" },
            { context: "Website Header",     minSize: "120px wide",   pxEq: "Full logo",  note: "Nav bar horizontal lockup" },
            { context: "Icon Only (Web)",    minSize: "32px",         pxEq: "Icon only",  note: "Navigation, favicon, app tile" },
            { context: "Seal — Documents",   minSize: "30mm / 85px",  pxEq: "Seal only",  note: "Minimum readable seal size" },
            { context: "Signage",            minSize: "15cm wide",    pxEq: "Print master",note: "Farm entrance, outdoor banner" },
            { context: "Business Card",      minSize: "18mm wide",    pxEq: "≈ 51px",     note: "Compact horizontal lockup" },
            { context: "WhatsApp Avatar",    minSize: "500×500px",    pxEq: "Icon only",  note: "Square or circular crop" },
            { context: "Social Profile",     minSize: "400×400px",    pxEq: "Icon only",  note: "Minimum legible social size" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ background: "#f7fbf8", border: "1px solid #e0eed5" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#1F6B3A", marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
                {item.context}
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: "#1E2420" }}>{item.minSize}</p>
              <p style={{ fontFamily: "'Inter', monospace", fontSize: 11, color: "#1F6B3A" }}>{item.pxEq}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 4 }}>{item.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card label="X — Spacing Unit Definition">
        <div className="flex gap-8 items-start flex-wrap">
          <div className="flex-1" style={{ minWidth: 240 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "#1F6B3A", marginBottom: 8 }}>
              X = Icon Radius
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 14 }}>
              All clear space is measured in units of <strong>X</strong>, where X equals the radius of the round icon (half its diameter). This keeps spacing proportional at any size.
            </p>
            <ul className="space-y-2">
              {[
                "Minimum exclusion zone around icon: 1X on all sides",
                "Minimum exclusion zone around full logo: 1X top & bottom, 2X left & right",
                "Bilingual lockup: 0.5X gap between English and Bengali name lines",
                "Seal minimum exclusion: 0.5X outside the outer ring boundary",
                "Never place another logo or text element within the exclusion zone",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: "#1F6B3A", fontWeight: 700, marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555", lineHeight: 1.55 }}>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Self-contained diagram — no overflow */}
          <div className="flex flex-col items-center gap-4"
            style={{ background: "#FAF7EF", borderRadius: 12, padding: "28px 36px", minWidth: 220 }}>
            <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* 2X recommended zone */}
              <div style={{ position: "absolute", inset: 0, border: "1.5px dashed #c8ddc8", borderRadius: "50%" }} />
              {/* 1X exclusion zone */}
              <div style={{ position: "absolute", inset: 20, border: "1.5px dashed #9A6A00", borderRadius: "50%" }} />
              {/* Icon */}
              <img src={logoIcon} alt="spacing diagram" style={{ width: 80, height: 80, objectFit: "contain", position: "relative", zIndex: 1 }} />

              {/* 1X label — right side, inside container */}
              <div style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ width: 1, height: 20, background: "#9A6A00" }} />
                <span style={{ fontFamily: "'Inter', monospace", fontSize: 9, color: "#9A6A00", fontWeight: 700 }}>1X</span>
                <div style={{ width: 1, height: 20, background: "#9A6A00" }} />
              </div>

              {/* 2X label — left side, inside container */}
              <div style={{ position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ width: 1, height: 40, background: "#c8ddc8" }} />
                <span style={{ fontFamily: "'Inter', monospace", fontSize: 9, color: "#c8ddc8", fontWeight: 700 }}>2X</span>
                <div style={{ width: 1, height: 40, background: "#c8ddc8" }} />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div style={{ width: 24, height: 1, borderTop: "1.5px dashed #9A6A00" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280" }}>1X Exclusion zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: 24, height: 1, borderTop: "1.5px dashed #c8ddc8" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280" }}>2X Recommended safe zone</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ClearSpaceDemo() {
  const iconSize = 80;
  const x = 40; // spacing unit = icon radius

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Diagram: icon with two exclusion rings */}
      <div style={{ position: "relative", width: iconSize + x * 4, height: iconSize + x * 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer 2X ring */}
        <div style={{
          position: "absolute",
          width: iconSize + x * 4, height: iconSize + x * 4,
          border: "1.5px dashed #c8ddc8", borderRadius: 8,
          top: 0, left: 0,
        }} />
        {/* Inner 1X ring */}
        <div style={{
          position: "absolute",
          width: iconSize + x * 2, height: iconSize + x * 2,
          border: "1.5px dashed #9A6A00", borderRadius: 4,
          top: x, left: x,
        }} />
        {/* Icon */}
        <img src={logoIcon} alt="icon" style={{ width: iconSize, height: iconSize, objectFit: "contain", position: "relative", zIndex: 1 }} />

        {/* X measurement bracket on top */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontFamily: "'Inter', monospace", fontSize: 9, color: "#9A6A00", fontWeight: 700 }}>X = {x}px</span>
          <div style={{ width: 1, height: x, background: "#9A6A00" }} />
        </div>
      </div>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
        X = Icon radius = {x}px (half of {iconSize}px icon)
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#9A6A00" }}>── 1X exclusion</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1F6B3A" }}>── 2X safe zone</span>
      </div>
    </div>
  );
}

function ClearSpaceHorizontal() {
  return (
    <div className="flex flex-col items-center gap-4 p-4" style={{ background: "#fafafa", borderRadius: 8 }}>
      <div style={{ position: "relative", padding: "16px 24px" }}>
        <div style={{ position: "absolute", inset: 0, border: "1.5px dashed #9A6A00", borderRadius: 4 }} />
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="icon" style={{ width: 48, height: 48, objectFit: "contain" }} />
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1F6B3A", display: "block", lineHeight: 1.15 }}>
              Kutirchar EcoFarm
            </span>
            <div style={{ height: 1, background: "#1F6B3A", opacity: 0.18, margin: "3px 0" }} />
            <span style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 14, fontWeight: 600, color: "#1F6B3A", display: "block", lineHeight: 1.4 }}>
              কুটিরচর ইকোফার্ম
            </span>
          </div>
        </div>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", textAlign: "center" }}>
        Minimum 1X exclusion zone on all sides of the full lockup
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#9A6A00" }}>── Exclusion zone (1X)</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1F6B3A" }}>── Logo boundary</span>
      </div>
    </div>
  );
}
