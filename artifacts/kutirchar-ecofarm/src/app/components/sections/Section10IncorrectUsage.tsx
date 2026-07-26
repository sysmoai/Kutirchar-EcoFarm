import * as React from "react";
import logoIcon from "../../../imports/image.png";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section10IncorrectUsage() {
  return (
    <div>
      <SectionHeader
        num="10"
        title="Incorrect Usage"
        desc="These examples show what must never be done with the Kutirchar EcoFarm logo. Violations damage brand credibility and must be corrected immediately."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <WrongExample title="Do not stretch or distort" desc="Never change the icon's aspect ratio. Always scale uniformly.">
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 80, height: 50, objectFit: "fill", opacity: 0.7 }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#B42318", marginTop: 6 }}>Kutirchar EcoFarm</span>
          </div>
        </WrongExample>

        <WrongExample title='Do not split "Kutirchar"' desc='Always write "Kutirchar" as one word. Never "Kutir Char".'>
          <div style={{ textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 6 }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#B42318" }}>Kutir Char</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#B42318" }}>Eco Farm</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not use random gradients" desc="Never apply gradient fills to the logo or icon. Use flat colors only.">
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
              <img src={logoIcon} alt="wrong" style={{ width: "80%", height: "80%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#B42318" }}>Kutirchar EcoFarm</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not use on busy backgrounds" desc="Logo must always sit on a clean, high-contrast background.">
          <div style={{ background: "repeating-linear-gradient(45deg, #e8f5e9, #e8f5e9 5px, #c8e6c9 5px, #c8e6c9 10px)", padding: 12, borderRadius: 8, textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 50, height: 50, objectFit: "contain" }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, color: "#1F6B3A" }}>Kutirchar EcoFarm</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not use low contrast colors" desc="Never use yellow, orange, or pastel tones for the logo on light backgrounds.">
          <div style={{ background: "#FFFDE7", padding: 12, borderRadius: 8, textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 50, height: 50, objectFit: "contain", filter: "sepia(1) saturate(2) hue-rotate(20deg) brightness(1.5)" }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#F2B544" }}>Kutirchar EcoFarm</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not use unofficial fonts" desc="Always use Playfair Display for English wordmark. No decorative or script fonts.">
          <div style={{ textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 6 }} />
            <p style={{ fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic", color: "#ff6b35" }}>Kutirchar EcoFarm</p>
            <p style={{ fontFamily: "fantasy", fontSize: 12, color: "#ff6b35" }}>কুটিরচর</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not add extra elements" desc="Never add animals, symbols, stars, badges, or decorations to the icon.">
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img src={logoIcon} alt="wrong" style={{ width: 56, height: 56, objectFit: "contain" }} />
              <span style={{ position: "absolute", top: -8, right: -12, fontSize: 20 }}>⭐</span>
              <span style={{ position: "absolute", bottom: -4, left: -8, fontSize: 16 }}>🔥</span>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, color: "#B42318", marginTop: 4 }}>Kutirchar EcoFarm</p>
          </div>
        </WrongExample>

        <WrongExample title='Do not split "EcoFarm"' desc='Always write "EcoFarm" as one word. Never "Eco Farm".'>
          <div style={{ textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 6 }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#B42318" }}>Kutirchar</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#B42318" }}>Eco Farm</p>
          </div>
        </WrongExample>

        <WrongExample title="Do not rotate the icon" desc="The logo and icon must always appear in their upright, standard orientation.">
          <div style={{ textAlign: "center" }}>
            <img src={logoIcon} alt="wrong" style={{ width: 56, height: 56, objectFit: "contain", transform: "rotate(45deg)", marginBottom: 12 }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, color: "#B42318", marginTop: 4 }}>Kutirchar EcoFarm</p>
          </div>
        </WrongExample>
      </div>

      <Card label="Complete List of Prohibited Uses">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            "Stretch, distort, or skew the logo in any direction",
            'Split "Kutirchar" into "Kutir Char" — it is one word',
            'Split "EcoFarm" into "Eco Farm" — it is one word',
            "Apply random gradients to the logo or icon",
            "Place logo on a busy, patterned, or low-contrast background",
            "Remove or replace the central K with any other symbol",
            "Change the circular structure of the icon",
            "Add extra animals, objects, or decorative elements",
            "Use cartoon, clip-art, or childish effects",
            "Use unofficial names, nicknames, or alternate spellings",
            "Use low-contrast colors (yellow on white, green on green, etc.)",
            "Use decorative, script, or novelty fonts for the wordmark",
            "Rotate, flip, or mirror the logo or icon",
            "Use the brand colors in wrong context (e.g., red in logo)",
            "Apply the logo at below-minimum size (see Section 06)",
            "Place white logo on a white or very light background",
            "Pixelate or use a low-resolution version of the icon",
            "Use only the wordmark without the icon in primary contexts",
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 px-3 rounded" style={{ background: i % 2 === 0 ? "#fff5f5" : "transparent" }}>
              <span style={{ color: "#B42318", fontWeight: 700, flexShrink: 0, fontSize: 14, marginTop: 1 }}>✕</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#1E2420", lineHeight: 1.5 }}>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WrongExample({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #fecdca" }}>
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: "#fff5f5" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#B42318", fontWeight: 700 }}>✕ {title}</span>
      </div>
      <div className="p-4 flex items-center justify-center min-h-24" style={{ background: "white" }}>
        {children}
      </div>
      <div className="px-3 py-2" style={{ background: "#fff5f5" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", lineHeight: 1.4 }}>{desc}</p>
      </div>
    </div>
  );
}
