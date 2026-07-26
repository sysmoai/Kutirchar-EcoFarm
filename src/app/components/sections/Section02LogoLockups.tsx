import * as React from "react";
import { BrandLogo } from "../BrandLogo";
import { SectionHeader, Card } from "./Section00MasterLogo";

export function Section02LogoLockups() {
  return (
    <div>
      <SectionHeader
        num="02"
        title="Logo Lockups"
        desc="Professional logo lockup configurations for all contexts — from letterhead to signage to digital headers."
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LockupCard label="A — Horizontal English Lockup" sub="Icon left · English name right · Primary format for most uses">
            <LockupBox bg="#FAF7EF">
              <BrandLogo variant="horizontal" iconSize={68} mode="color" />
            </LockupBox>
          </LockupCard>

          <LockupCard label="B — Horizontal Bilingual Lockup" sub="Icon left · English top · Bengali bottom">
            <LockupBox bg="#FAF7EF">
              <BrandLogo variant="horizontal" iconSize={68} mode="color" bilingual />
            </LockupBox>
          </LockupCard>

          <LockupCard label="C — Stacked English Lockup" sub="Icon top · English name below · Centered">
            <LockupBox bg="#FAF7EF">
              <BrandLogo variant="stacked" iconSize={88} mode="color" />
            </LockupBox>
          </LockupCard>

          <LockupCard label="D — Stacked Bilingual Lockup" sub="Icon top · English · Bengali below · Centered">
            <LockupBox bg="#FAF7EF">
              <BrandLogo variant="stacked" iconSize={88} mode="color" bilingual />
            </LockupBox>
          </LockupCard>

          <LockupCard label="E — Bengali-First Stacked Lockup" sub="Icon top · Bengali primary · English smaller below">
            <LockupBox bg="#FAF7EF">
              <BrandLogo variant="stacked" iconSize={88} mode="color" bilingual bengaliFirst />
            </LockupBox>
          </LockupCard>

          <LockupCard label="F — Document Header Lockup" sub="For letterhead · bank PDF · report cover · invoice · proposal">
            <LockupBox bg="white" bordered>
              <div className="w-full" style={{ borderBottom: "1px solid #e0eed5", paddingBottom: 12 }}>
                <div className="flex items-center justify-between">
                  <BrandLogo variant="horizontal" iconSize={48} mode="color" bilingual />
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#1F6B3A", fontWeight: 600, lineHeight: 1.2 }}>Kutirchar EcoFarm</p>
                    <div style={{ height: 1, background: "#1F6B3A", opacity: 0.18, margin: "3px 0" }} />
                    <p style={{ fontFamily: "'Noto Serif Bengali', Georgia, serif", fontSize: 13, fontWeight: 600, color: "#1F6B3A", lineHeight: 1.4 }}>কুটিরচর ইকোফার্ম</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#6b7280", marginTop: 3 }}>Smart Cattle & Circular Energy Ecosystem</p>
                  </div>
                </div>
              </div>
            </LockupBox>
          </LockupCard>
        </div>

        <LockupCard label="G — Premium Centered Lockup" sub="For website hero · report cover · presentation cover · executive summary">
          <LockupBox bg="#0B4F2A" tall>
            <div className="flex flex-col items-center gap-4">
              <BrandLogo variant="stacked" iconSize={120} mode="white" bilingual />
              <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.4)" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Smart Cattle & Circular Energy Ecosystem
              </p>
            </div>
          </LockupBox>
        </LockupCard>

        <LockupCard label="H — Signboard Lockup" sub="Large-format outdoor signage · farm entrance · exhibition banner">
          <LockupBox bg="#1F6B3A" tall>
            <BrandLogo variant="horizontal" iconSize={110} mode="white" bilingual />
          </LockupBox>
        </LockupCard>
      </div>
    </div>
  );
}

function LockupCard({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <Card label={label}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginBottom: 12 }}>{sub}</p>
      {children}
    </Card>
  );
}

function LockupBox({ children, bg, bordered, tall }: { children: React.ReactNode; bg: string; bordered?: boolean; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg ${tall ? "min-h-44" : "min-h-32"}`}
      style={{ background: bg, border: bordered ? "1px solid #ddd" : undefined, padding: "28px 24px" }}
    >
      {children}
    </div>
  );
}
