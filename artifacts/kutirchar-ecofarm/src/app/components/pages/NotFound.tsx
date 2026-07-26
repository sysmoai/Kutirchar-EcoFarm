import { motion } from "framer-motion";
import { CtaButton } from "../shared/Shared";
import { COLORS, FONTS } from "../../brand";
import { EASE, MOTION } from "../../motion";
import { useLocale } from "../shared/i18n";

export function NotFound() {
  const { t } = useLocale();
  const n = t.notFound;

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center", background: COLORS.documentIvory }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION.dur.slow, ease: EASE }}
      >
        <p style={{ fontFamily: FONTS.serif, fontSize: 80, fontWeight: 700, color: COLORS.fieldMist, margin: "0 0 8px", lineHeight: 1 }}>404</p>
        <h1 style={{ fontFamily: FONTS.serif, fontSize: 28, color: COLORS.charcoalText, margin: "0 0 12px" }}>{n.title}</h1>
        <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#666", margin: "0 0 28px", lineHeight: 1.65 }}>
          {n.body}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <CtaButton to="/" variant="primary" size="md">← {n.goHome}</CtaButton>
          <CtaButton to="/contact" variant="outline" size="md">{n.contactUs}</CtaButton>
        </div>
      </motion.div>
    </div>
  );
}
