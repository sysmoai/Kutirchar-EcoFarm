import { Link } from "react-router";
import { COLORS, FONTS } from "../../brand";

export function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center", background: COLORS.documentIvory }}>
      <div>
        <p style={{ fontFamily: FONTS.serif, fontSize: 80, fontWeight: 700, color: COLORS.fieldMist, margin: "0 0 8px", lineHeight: 1 }}>404</p>
        <h1 style={{ fontFamily: FONTS.serif, fontSize: 28, color: COLORS.charcoalText, margin: "0 0 12px" }}>Page Not Found</h1>
        <p style={{ fontFamily: FONTS.sans, fontSize: 15, color: "#666", margin: "0 0 28px", lineHeight: 1.65 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" style={{ background: COLORS.kutircharGreen, color: "white", fontFamily: FONTS.sans, fontSize: 14, fontWeight: 700, padding: "11px 22px", borderRadius: 10, textDecoration: "none" }}>
            ← Go Home
          </Link>
          <Link to="/contact" style={{ background: "transparent", color: COLORS.kutircharGreen, fontFamily: FONTS.sans, fontSize: 14, fontWeight: 600, padding: "11px 22px", borderRadius: 10, textDecoration: "none", border: `1.5px solid ${COLORS.kutircharGreen}` }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
