import { COLORS, FONTS, BRAND } from '../../brand';
import { PageHero, PageSection, Card } from '../shared/Shared';

export function ExecSummaryPage() {
  return React.createElement('div', null,
    React.createElement(PageHero, { title: 'Executive Summary', titleBn: '\u0995\u09be\u09b0\u09cd\u09af\u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u09b9\u09c0 \u09b8\u09be\u09b0\u09b8\u0982\u0995\u09cd\u09b7\u09c7\u09aa', subtitle: 'One-page Bank and Government summary for Kutirchar EcoFarm. For qualified stakeholders conducting due diligence.' }),
    React.createElement(PageSection, null,
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 } },
        React.createElement(Card, null,
          React.createElement('h3', { style: { fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: '0 0 12px' } }, 'Project Summary'),
          React.createElement('p', { style: { fontFamily: FONTS.sans, fontSize: 14, color: '#444', lineHeight: 1.75, margin: 0 } }, 'Kutirchar EcoFarm is a proof-based, phased rural smart farm and circular energy ecosystem in Kutirchar, Sirajganj, Bangladesh. Integrates cattle/dairy, biogas, Napier silage, bio-slurry fertilizer, rooftop solar, and digital monitoring. Zone A (10 decimal, private) for core operations. Zone B (12 decimal, non-private/ejmali) for removable-use only until legal verification.')
        ),
        React.createElement(Card, null,
          React.createElement('h3', { style: { fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: '0 0 12px' } }, 'Phase Status'),
          React.createElement('p', { style: { fontFamily: FONTS.sans, fontSize: 14, color: '#444', lineHeight: 1.75, margin: 0 } }, 'Currently in Phase 0: Verification and Foundation. 7 open verification gaps. No permanent construction until all Phase 0 items completed. Conservative financial policy: EMI within 50 percent of verified rolling 12-month income. 6 phases planned (0-5), each gated by evidence from previous phase.')
        ),
        React.createElement(Card, null,
          React.createElement('h3', { style: { fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: '0 0 12px' } }, 'Contact'),
          React.createElement('p', { style: { fontFamily: FONTS.sans, fontSize: 14, color: '#444', lineHeight: 1.75, margin: 0 } }, 'Founder: Emon Hossain. Email: info@kutircharecofarm.com. Location: Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh. Field Ops: Md Al Amin. Full documentation available in Proof and Governance section upon formal request.')
        )
      )
    )
  );
}
import React from 'react';
