import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection } from "../shared/Shared";
import { useLocale } from "../shared/i18n";
import { Reveal } from "../shared/motion";

export function PrivacyPage() {
  const { t } = useLocale();
  const p = t.privacy;

  return (
    <div>
      <PageHero title={p.heroTitle} subtitle={p.heroSubtitle} />
      <PageSection>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: FONTS.sans, fontSize: 12, color: "#6b7280", marginBottom: 32 }}>{p.lastUpdated}</p>
          {p.sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) * 0.06}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 10px" }}>{i + 1}. {s.title}</h3>
                <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
