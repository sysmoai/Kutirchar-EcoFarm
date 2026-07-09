import { FONTS, COLORS } from "../../brand";
import { PageHero, PageSection, Card } from "../shared/Shared";
import { useLocale } from "../shared/i18n";

export function ExecSummaryPage() {
  const { t } = useLocale();
  const e = t.execSummary;

  return (
    <div>
      <PageHero title={e.heroTitle} subtitle={e.heroSubtitle} />
      <PageSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {e.cards.map((c) => (
            <Card key={c.title}>
              <h3 style={{ fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 12px" }}>{c.title}</h3>
              <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 }}>{c.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
