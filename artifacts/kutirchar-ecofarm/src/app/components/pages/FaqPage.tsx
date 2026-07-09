import React from "react";
import { COLORS, FONTS } from "../../brand";
import { PageHero, PageSection } from "../shared/Shared";

const faqItems = [  { q: 'What is Kutirchar EcoFarm?', a: 'A proof-based, phased rural smart farm and circular energy ecosystem in Kutirchar, Sirajganj, Bangladesh. Integrates cattle, biogas, Napier silage, bio-slurry fertilizer, rooftop solar, and digital monitoring on private family land.' },
  { q: 'What phase is the project currently in?', a: 'Phase 0: Verification and Foundation. Land document review, boundary survey planning, soil test arrangements, Zone B ejmali status verification, and drainage survey. No construction until all Phase 0 complete.' },
  { q: 'How does investment work?', a: 'Conservative financial policy. Monthly EMI stays within 50 percent of verified rolling 12-month income. Internal revenue funds each phase. External financing only after stable income.' },
  { q: 'What is Zone B and what is allowed there?', a: 'Zone B is 12 decimal non-private/ejmali land under legal verification. Only removable structures permitted: fodder racks, temporary shade, portable compost, loading area, removable water tank. No concrete or permanent structures.' },
  { q: 'How can I visit?', a: 'By appointment only. Submit inquiry via Contact page. Location: Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh.' },
  { q: 'Why show open gaps publicly?', a: 'Credibility through transparency. Built for bank officers, government, and investors. Open gaps prove we know what to work on, nothing hidden.' },
  { q: 'How to apply as vendor or partner?', a: 'Use Contact form. Select Vendor/Contractor or Partnership/NGO/CSR. Describe qualifications and proposal.' },
  { q: 'Is personal information collected?', a: 'Only what is needed to respond. Never NID, PIN, bank details, or sensitive documents. See Privacy page.' },
];

export function FaqPage() {
  return (
    React.createElement("div", null,
      React.createElement(PageHero, {
        title: "Frequently Asked Questions",
        titleBn: "\u09aa\u09cd\u09b0\u09b6\u09cd\u09a8\u09cb\u09a4\u09cd\u09a4\u09b0",
        subtitle: "Honest, evidence-first answers about Kutirchar EcoFarm. Project, financing, Zone B, privacy, and visits."
      }),
      React.createElement(PageSection, null,
        React.createElement("div", { style: { maxWidth: 800, margin: "0 auto" } },
          faqItems.map(function(item, i) {
            return React.createElement("div", { key: i, style: { marginBottom: 28, background: "#fff", borderRadius: 12, border: "1px solid #e5eee9", padding: "20px 24px" } },
              React.createElement("h3", { style: { fontFamily: FONTS.sans, fontSize: 15, fontWeight: 700, color: COLORS.kutircharGreen, margin: "0 0 10px" } }, item.q),
              React.createElement("p", { style: { fontFamily: FONTS.sans, fontSize: 14, color: "#444", lineHeight: 1.75, margin: 0 } }, item.a));
          }),
          React.createElement("hr", { style: { borderColor: "#e5eee9", marginTop: 32 } }),
          React.createElement("p", { style: { fontFamily: FONTS.sans, fontSize: 13, color: "#666", textAlign: "center", marginTop: 16 } }, "More questions? Reach us at info@kutircharecofarm.com")
        )
      )
    ));
}
