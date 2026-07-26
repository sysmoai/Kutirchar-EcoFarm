import { PHASE_COLORS, FONTS } from "../../brand";

type Phase = "Now" | "Next" | "Later";

export function PhaseChip({ phase, size = "sm" }: { phase: Phase; size?: "sm" | "md" }) {
  const c = PHASE_COLORS[phase];
  const pd = size === "md" ? "4px 12px" : "2px 9px";
  const fs = size === "md" ? 12 : 10;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: pd, fontFamily: FONTS.sans,
      fontSize: fs, fontWeight: 700, letterSpacing: "0.06em",
      textTransform: "uppercase" as const, whiteSpace: "nowrap" as const,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {phase}
    </span>
  );
}
