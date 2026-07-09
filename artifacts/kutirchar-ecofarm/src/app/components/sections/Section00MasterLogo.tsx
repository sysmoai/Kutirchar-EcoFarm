import * as React from "react";
import logoIcon from "../../../imports/image.png";

export function Section00MasterLogo() {
  const sizes = [256, 128, 64, 48, 32, 16];

  return (
    <div>
      <SectionHeader num="00" title="Master Logo Source" desc="The uploaded round icon is the official master source. All logo variations derive from this icon. Do not replace, alter, or reinterpret the core icon structure." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card label="Uploaded Master Icon — Full Size">
          <div className="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-100">
            <img src={logoIcon} alt="Kutirchar EcoFarm Master Icon" className="w-64 h-64 object-contain" />
          </div>
        </Card>

        <Card label="Production-Ready Preview">
          <div className="flex items-center justify-center p-8" style={{ background: "#FAF7EF", borderRadius: 8 }}>
            <img src={logoIcon} alt="Kutirchar EcoFarm Master Icon" className="w-64 h-64 object-contain" style={{ filter: "drop-shadow(0 4px 16px rgba(31,107,58,0.15))" }} />
          </div>
        </Card>
      </div>

      <Card label="Multi-Size Preview — Favicon to Print">
        <div className="flex flex-wrap items-end gap-8 p-6 bg-white rounded-lg">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <img src={logoIcon} alt="icon" style={{ width: s, height: s, objectFit: "contain", imageRendering: s <= 32 ? "pixelated" : "auto" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", marginTop: 4 }}>{s}px</span>
            </div>
          ))}
        </div>
      </Card>

      <Card label="Icon Structure Notes" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NoteItem icon="K" label="Central K" note="Represents Kutirchar — the village and place identity. The K is intentional and must be preserved at all times." color="#1F6B3A" />
          <NoteItem icon="🐄" label="Cattle / Livestock" note="Represents the dairy and livestock farming foundation of Kutirchar EcoFarm." color="#0B4F2A" />
          <NoteItem icon="☀️" label="Solar Panels + Sun" note="Represents solar energy generation as part of the circular energy ecosystem." color="#F2B544" />
          <NoteItem icon="⚗️" label="Biogas Dome" note="Represents the biogas digester and circular energy system — converting waste to energy." color="#4F9A3D" />
          <NoteItem icon="🌿" label="Agricultural Fields" note="Wave lines at the bottom represent the farmland and field cultivation." color="#708238" />
          <NoteItem icon="🍃" label="Circular Leaf Frame" note="The circular leaf/plant frame represents the circular ecosystem and nature-forward identity." color="#1F6B3A" />
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ background: "#FAF7EF", border: "1px solid #d4e8db" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1E2420", lineHeight: 1.6 }}>
            <strong style={{ color: "#1F6B3A" }}>"The central K is intentional."</strong>{" "}
            It represents Kutirchar, the location identity of Kutirchar EcoFarm. The entire icon composition represents the Kutirchar EcoFarm circular ecosystem: local land identity, cattle/livestock, solar energy, biogas, fields, nature, and circular sustainability.
          </p>
        </div>
      </Card>
    </div>
  );
}

function NoteItem({ icon, label, note, color }: { icon: string; label: string; note: string; color: string }) {
  // The element's brand color is carried by the left-border accent (non-text, meets
  // 3:1) so the label text can stay charcoal and meet WCAG AA at 13px — some brand
  // colors (solar gold, field green, olive) fail 4.5:1 as small text on this tint.
  return (
    <div className="flex gap-3 p-3 rounded-lg" style={{ background: "#f8fdf9", border: "1px solid #e0eed5", borderLeft: `3px solid ${color}` }}>
      <div className="text-xl mt-0.5">{icon}</div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#1E2420", marginBottom: 2 }}>{label}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#555", lineHeight: 1.5 }}>{note}</p>
      </div>
    </div>
  );
}

export function SectionHeader({ num, title, desc }: { num: string; title: string; desc?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <span style={{ fontFamily: "'Inter', monospace", fontSize: 12, color: "#1F6B3A", fontWeight: 700, letterSpacing: "0.1em", background: "#f0f9f3", padding: "2px 8px", borderRadius: 4 }}>
          {num}
        </span>
        <div style={{ height: 1, width: 32, background: "#1F6B3A", opacity: 0.3 }} />
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 600, color: "#1E2420", lineHeight: 1.2, marginBottom: 8 }}>{title}</h2>
      {desc && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.6, maxWidth: 640 }}>{desc}</p>}
      <div style={{ height: 2, background: "linear-gradient(90deg, #1F6B3A 0%, transparent 100%)", marginTop: 16, borderRadius: 2 }} />
    </div>
  );
}

export function Card({ label, children, className = "" }: { label?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ border: "1px solid #e5eee9", background: "#fff" }}>
      {label && (
        <div className="px-5 py-3" style={{ background: "#f7fbf8", borderBottom: "1px solid #e5eee9" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#1F6B3A", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
