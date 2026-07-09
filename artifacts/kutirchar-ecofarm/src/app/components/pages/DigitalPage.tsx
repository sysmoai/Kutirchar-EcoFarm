import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card, StopRule, CtaButton } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";

const systems = [
  { icon: "📡", title: "Starlink Connectivity", phase: "Later" as const, color: COLORS.riverBlue,
    desc: "High-speed satellite internet for remote farm monitoring, dashboard access, and real-time reporting.",
    gates: ["Availability at Kutirchar confirmed", "Final checkout price verified", "Service address portability rules cleared", "Clear sky view test passed at site"],
    outputs: ["Remote monitoring access", "Cloud backup for CCTV footage", "Dashboard access from anywhere", "Report generation and file uploads"],
  },
  { icon: "📷", title: "CCTV & NVR Security", phase: "Later" as const, color: COLORS.charcoalText,
    desc: "IP camera coverage of cattle barn, biogas site, and main entrance. Local NVR storage first, cloud second.",
    gates: ["Camera placement plan completed", "NVR local storage setup (priority over cloud)", "Bandwidth plan = local NVR first", "Power backup from UPS confirmed"],
    outputs: ["24/7 site security footage", "Evidence for governance and insurance", "Remote viewing (when connected)", "Incident documentation"],
  },
  { icon: "🔋", title: "UPS & Power Backup", phase: "Next" as const, color: COLORS.solarGold,
    desc: "Uninterruptible power supply to protect CCTV, monitoring, and network during load-shedding.",
    gates: ["Load calculation complete (CCTV + router + NVR)", "Battery capacity + grounding plan ready", "UPS connection verified with solar output"],
    outputs: ["Continuous monitoring during outages", "Protects NVR from data loss", "Extends farm operations during load-shedding"],
  },
  { icon: "🌐", title: "Network & Router", phase: "Next" as const, color: COLORS.bioOliveDeep,
    desc: "Local network setup for NVR, cameras, and monitoring devices. Starlink as WAN when available.",
    gates: ["Device inventory complete", "Cable routing plan for barn + biogas area", "Router/switch placement decided"],
    outputs: ["Local LAN for all monitoring devices", "Isolated network for security cameras", "Scalable for future devices"],
  },
];

export function DigitalPage() {
  return (
    <div>
      <PageHero
        title="Digital Infrastructure"
        titleBn="ডিজিটাল অবকাঠামো"
        subtitle="Connectivity, security, power backup, and monitoring — framed as operational reliability and governance infrastructure, not internet hype."
      />

      {/* Architecture overview */}
      <PageSection>
        <SectionHeading title="3-Module Architecture" subtitle="Starlink Core · Power & Protection · Network & Security. Each module is independent and gate-controlled." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40 }}>
          {[
            { icon: "📡", title: "Connectivity Core", items: ["Starlink satellite internet", "Primary WAN for monitoring", "Portability & address check required", "Clear sky view test at site"], phase: "Later" as const },
            { icon: "⚡", title: "Power & Protection", items: ["UPS backup (load-shedding protection)", "Solar integration for UPS charging", "Grounding plan required", "Protects all monitoring devices"], phase: "Next" as const },
            { icon: "🔒", title: "Network & Security", items: ["CCTV cameras (IP, PoE)", "Local NVR storage (primary)", "Router + managed switch", "Isolated security network"], phase: "Next" as const },
          ].map((mod) => (
            <div key={mod.title} style={{ background: COLORS.deepFarmGreen, borderRadius: 12, padding: "24px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <p style={{ fontSize: 28, margin: "0 0 6px" }}>{mod.icon}</p>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>{mod.title}</p>
                </div>
                <PhaseChip phase={mod.phase} />
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {mod.items.map((item) => <li key={item} style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 3 }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <StopRule>
          Digital infrastructure must not be treated as a "nice to have." It is a governance requirement — CCTV footage provides tamper-evident evidence for insurance, governance, and partner reporting. NVR local storage is mandatory before any cloud storage is considered.
        </StopRule>
      </PageSection>

      {/* System detail cards */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title="Verification Gates Per System" subtitle="Each system has gates that must be confirmed before installation proceeds." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {systems.map((sys) => (
            <Card key={sys.title}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{sys.icon}</span>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: sys.color, margin: 0 }}>{sys.title}</p>
                </div>
                <PhaseChip phase={sys.phase} />
              </div>
              <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", lineHeight: 1.65, margin: "0 0 14px" }}>{sys.desc}</p>

              <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>Verification Gates</p>
              {sys.gates.map((g) => (
                <div key={g} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: COLORS.riskRed, flexShrink: 0, fontSize: 12, marginTop: 1 }}>○</span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{g}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 12, paddingTop: 12 }}>
                <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 }}>Outputs</p>
                {sys.outputs.map((o) => (
                  <div key={o} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: COLORS.kutircharGreen, flexShrink: 0, fontSize: 12 }}>✓</span>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{o}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </PageSection>

      {/* Installation sequence */}
      <PageSection>
        <SectionHeading title="Recommended Installation Sequence" subtitle="Do not skip the order. Each step depends on the previous." />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
          {[
            { step: "1", title: "UPS + Grounding", note: "Install UPS and grounding system first. Everything else depends on stable power.", phase: "Next" as const },
            { step: "2", title: "NVR + Cameras (local only)", note: "Set up local NVR storage and IP cameras on internal LAN. No cloud yet. Record locally.", phase: "Next" as const },
            { step: "3", title: "Router + Managed Switch", note: "Segment network: cameras isolated from management devices.", phase: "Next" as const },
            { step: "4", title: "Starlink (when confirmed)", note: "Only after steps 1–3 are operational. Connect Starlink as WAN gateway for remote access.", phase: "Later" as const },
            { step: "5", title: "Dashboard + Remote Monitoring", note: "Only after Starlink and local infrastructure are verified. Dashboard is the final layer.", phase: "Later" as const },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.kutircharGreen, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.sans, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{item.step}</div>
              <div style={{ flex: 1, background: "#fafafa", borderRadius: 10, padding: "14px 18px", border: "1px solid #ebebeb" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: 0 }}>{item.title}</p>
                  <PhaseChip phase={item.phase} />
                </div>
                <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#555", margin: 0 }}>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <CtaButton to="/contact" variant="primary">Vendor / Tech Partner Inquiry →</CtaButton>
        </div>
      </PageSection>
    </div>
  );
}
