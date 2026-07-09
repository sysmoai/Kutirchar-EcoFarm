import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection } from "../shared/Shared";
import { useLocale } from "../shared/i18n";

export function FaqPage() {
  const { t } = useLocale();
  const f = t.faq;

  return (
    <div>
      <PageHero title={f.heroTitle} subtitle={f.heroSubtitle} />
      <PageSection>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {f.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 28, background: "#fff", borderRadius: 12, border: "1px solid #e5eee9", padding: "20px 24px" }}>
              <h3 style={{ fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 10px" }}>{item.q}</h3>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
          <hr style={{ borderColor: "#e5eee9", marginTop: 32 }} />
          <p style={{ fontFamily: FONTS.sans, fontSize: 13, color: "#666", textAlign: "center", marginTop: 16 }}>{f.moreQuestions}</p>
        </div>
      </PageSection>
    </div>
  );
}
