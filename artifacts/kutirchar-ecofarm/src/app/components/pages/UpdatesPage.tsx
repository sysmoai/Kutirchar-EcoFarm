import { useState } from "react";
import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection, SectionHeading, Card } from "../shared/Shared";
import { PhaseChip } from "../shared/PhaseChip";
import { useLocale } from "../shared/i18n";

const statusColors: Record<string, string> = {
  completed: COLORS.kutircharGreen,
  inProgress: COLORS.riverBlue,
  open: COLORS.riskRed,
  planning: COLORS.bioOliveDeep,
};

export function UpdatesPage() {
  const { t } = useLocale();
  const u = t.updates;
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? u.entries : u.entries.filter((e) => e.categoryId === filter);

  return (
    <div>
      <PageHero
        title={u.heroTitle}
        subtitle={u.heroSubtitle}
      />

      {/* Editorial note */}
      <section style={{ background: COLORS.charcoalText, padding: "12px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "0 0 4px" }}>
            {u.editorialNote}
          </p>
          <p style={{ fontFamily: FONTS.sans, fontSize: 11, color: "rgba(255,255,255,0.5)", margin: 0 }}>
            {u.cadenceLabel}
          </p>
        </div>
      </section>

      <PageSection>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {u.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={{
                fontFamily: FONTS.sans, fontSize: 12, fontWeight: 600,
                padding: "6px 14px", borderRadius: 20, cursor: "pointer", transition: "all 0.15s",
                background: filter === cat.id ? COLORS.kutircharGreen : "white",
                color: filter === cat.id ? "white" : COLORS.kutircharGreen,
                border: `1.5px solid ${filter === cat.id ? COLORS.kutircharGreen : "#e0eed5"}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Update cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {filtered.map((update) => {
            const catLabel = u.categories.find((c) => c.id === update.categoryId)?.label ?? update.categoryId;
            return (
              <Card key={update.title}>
                {/* Header */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: FONTS.sans, fontSize: 10, fontWeight: 700, color: COLORS.riverBlue, background: "#eff6fb", padding: "2px 8px", borderRadius: 6, border: "1px solid #b8d4e0" }}>{catLabel}</span>
                    <PhaseChip phase={update.phase as "Now" | "Next" | "Later"} />
                    <span style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: statusColors[update.statusKey] ?? "#888" }}>● {update.status}</span>
                  </div>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", fontWeight: 500 }}>{update.date}</span>
                </div>

                <h3 style={{ fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 10px" }}>{update.title}</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.7, margin: "0 0 16px" }}>{update.summary}</p>

                {/* Evidence + Gaps + Next */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  {update.evidenceAdded.length > 0 && (
                    <div style={{ background: "#f0f9f3", borderRadius: 8, padding: "12px 14px" }}>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.kutircharGreen, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{u.evidenceLabel}</p>
                      {update.evidenceAdded.map((e) => (
                        <div key={e} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                          <span style={{ color: COLORS.kutircharGreen, fontSize: 12 }}>✓</span>
                          <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#333" }}>{e}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {update.openGaps.length > 0 && (
                    <div style={{ background: "#fff5f5", borderRadius: 8, padding: "12px 14px" }}>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.riskRed, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{u.gapsLabel}</p>
                      {update.openGaps.map((g) => (
                        <div key={g} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                          <span style={{ color: COLORS.riskRed, fontSize: 12 }}>○</span>
                          <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555" }}>{g}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {update.next30.length > 0 && (
                    <div style={{ background: "#eff6fb", borderRadius: 8, padding: "12px 14px" }}>
                      <p style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, color: COLORS.riverBlue, marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{u.next30Label}</p>
                      {update.next30.map((n) => (
                        <div key={n} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                          <span style={{ color: COLORS.riverBlue, fontSize: 12 }}>→</span>
                          <span style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#333" }}>{n}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#6b7280" }}>{u.emptyState}</p>
          </div>
        )}
      </PageSection>

      {/* How we report */}
      <PageSection bg={COLORS.fieldMist}>
        <SectionHeading title={u.howTitle} subtitle={u.howSubtitle} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {u.howItems.map((item) => (
            <div key={item.title} style={{ background: "white", borderRadius: 12, padding: "20px", border: "1px solid #e5eee9", textAlign: "center" }}>
              <p style={{ fontSize: 28, margin: "0 0 8px" }}>{item.icon}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, color: COLORS.charcoalText, margin: "0 0 6px" }}>{item.title}</p>
              <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
