import { BrandLogo } from "../BrandLogo";
import { SealLogo } from "../SealLogo";
import logoIcon from "../../../imports/image.png";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section09UsageExamples() {
  return (
    <div>
      <SectionHeader
        num="09"
        title="Usage Examples"
        desc="Real-world mockups showing the logo in context — from website headers to formal bank reports. All examples use the official brand colors, typography, and logo lockups."
      />

      <div className="space-y-6">
        {/* Website Header */}
        <Card label="1. Website Header">
          <div style={{ background: "#0B4F2A", borderRadius: 8, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BrandLogo variant="horizontal" iconSize={40} mode="white" bilingual />
            <div className="flex gap-6">
              {["About", "Farm", "Biogas", "Solar", "Reports", "Contact"].map((item) => (
                <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* Website Hero */}
        <Card label="2. Website Hero Section">
          <div style={{ background: "linear-gradient(135deg, #0B4F2A 0%, #1F6B3A 60%, #4F9A3D 100%)", borderRadius: 12, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, background: "rgba(255,255,255,0.03)", borderRadius: "50%" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <BrandLogo variant="stacked" iconSize={80} mode="white" bilingual />
              <div style={{ width: 48, height: 2, background: "#F2B544", margin: "20px auto 16px" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Smart Cattle & Circular Energy Ecosystem
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.72)", textAlign: "center", marginTop: 8 }}>
                Dairy · Biogas · Solar · Silage
              </p>
            </div>
          </div>
        </Card>

        {/* Bank Report Cover */}
        <Card label="3. Bank-Ready Report Cover">
          <div style={{ background: "#FAF7EF", border: "1px solid #d4e8db", borderRadius: 8, padding: "32px", maxWidth: 480 }}>
            <div style={{ borderBottom: "2px solid #1F6B3A", paddingBottom: 16, marginBottom: 20 }}>
              <div className="flex items-center justify-between">
                <BrandLogo variant="horizontal" iconSize={48} mode="color" bilingual />
                <SealLogo size={70} mode="dark-green" />
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1F6B3A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Official Report</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1E2420", marginBottom: 4, lineHeight: 1.2 }}>Verification & Foundation</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1F6B3A", marginBottom: 16, lineHeight: 1.2 }}>Phase — Progress Report</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginBottom: 4 }}>Reporting period 2026</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6b7280" }}>Prepared for: bank / government verification review</p>
            <div style={{ borderTop: "1px solid #e0eed5", marginTop: 20, paddingTop: 12 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280" }}>Kutirchar EcoFarm · Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh</p>
            </div>
          </div>
        </Card>

        {/* Business Card */}
        <Card label="4. Business Card">
          <div className="flex gap-4 flex-wrap">
            <div style={{ width: 280, background: "#FAF7EF", border: "1px solid #d4e8db", borderRadius: 8, padding: "20px 18px" }}>
              <BrandLogo variant="horizontal" iconSize={44} mode="color" />
              <div style={{ borderTop: "1px solid #e0eed5", marginTop: 14, paddingTop: 12 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1E2420" }}>Emon Hossain</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#1F6B3A", fontWeight: 500, marginTop: 2 }}>Farm Director & Operations Head</p>
                <div className="mt-3 space-y-1">
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#666" }}>📞 Direct line shared on formal inquiry</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#666" }}>✉ info@kutircharecofarm.com</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#666" }}>🌐 kutircharecofarm.com</p>
                </div>
              </div>
            </div>
            <div style={{ width: 280, background: "#0B4F2A", borderRadius: 8, padding: "20px 18px" }}>
              <BrandLogo variant="horizontal" iconSize={44} mode="white" />
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: 14, paddingTop: 12 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "white" }}>Emon Hossain</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 2 }}>Farm Director & Operations Head</p>
                <div className="mt-3 space-y-1">
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>📞 Direct line shared on formal inquiry</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>✉ info@kutircharecofarm.com</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Media */}
        <Card label="5. Social Media Profile">
          <div className="flex gap-6 flex-wrap items-start">
            <div className="flex flex-col items-center gap-2">
              <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "3px solid #1F6B3A" }}>
                <img src={logoIcon} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280" }}>WhatsApp / Facebook</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", background: "#FAF7EF", border: "2px solid #1F6B3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={logoIcon} alt="app" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280" }}>LinkedIn / App Icon</span>
            </div>
            <div style={{ flex: 1, minWidth: 240, background: "linear-gradient(135deg, #1F6B3A, #4F9A3D)", borderRadius: 12, padding: 20 }}>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.5)", background: "#0B4F2A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={logoIcon} alt="avatar" style={{ width: "90%", height: "90%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 600, color: "white", lineHeight: 1.15 }}>Kutirchar EcoFarm</p>
                  <div style={{ height: 1, background: "white", opacity: 0.20, margin: "3px 0" }} />
                  <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 13, fontWeight: 600, color: "white", lineHeight: 1.4 }}>কুটিরচর ইকোফার্ম</p>
                </div>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Smart Cattle & Circular Energy Ecosystem — Dairy · Biogas · Solar · Silage</p>
            </div>
          </div>
        </Card>

        {/* Government Document */}
        <Card label="6. Government Partnership Letter Header">
          <div style={{ background: "white", border: "1px solid #ddd", borderRadius: 8, padding: "24px 28px" }}>
            <div className="flex items-start justify-between mb-4">
              <BrandLogo variant="horizontal" iconSize={52} mode="color" bilingual />
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#666" }}>Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#666" }}>Bangladesh</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1F6B3A", marginTop: 4 }}>www.kutircharecofarm.com</p>
              </div>
            </div>
            <div style={{ borderBottom: "2px solid #1F6B3A", marginBottom: 16 }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280" }}>Date: June 23, 2026</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#555", marginTop: 8 }}>To: The Director General, Department of Agricultural Extension, Government of Bangladesh</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1E2420", marginTop: 12 }}>Re: Formal Partnership Proposal — Circular Agriculture & Clean Energy Initiative</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
