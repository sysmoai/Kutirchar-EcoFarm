import React from 'react';
import { COLORS, FONTS, BRAND } from '../../brand';
import { PageHero, PageSection, Card } from '../shared/Shared';

const sections = [
  { id: 1, title: 'What information we collect', body: 'We only collect information you voluntarily provide through our Contact form. We never request or collect NID, PIN, passport numbers, bank account details, or any other sensitive personal identity documents. This website does not use cookie-based tracking or personalized advertising.' },
  { id: 2, title: 'How we use your information', body: 'Information you provide is used solely to respond to your specific inquiry. We do not send marketing emails, share or sell to third parties, perform automated profiling, or use your information beyond your initial inquiry.' },
  { id: 3, title: 'Data storage and security', body: 'Inquiry information is stored in our email system and retained for up to 12 months after resolution, unless longer retention is required by law. Our website uses HTTPS encryption.' },
  { id: 4, title: 'Third-party sharing', body: 'We do not sell, trade, or rent your information to third parties. We may share your information only when you explicitly request it, when required by law, or to protect our legal rights.' },
  { id: 5, title: 'Your rights', body: 'You have the right to request what information we hold, request correction, request deletion (subject to legal requirements), and opt out of future communications. We respond to all data requests within 14 business days.' },
  { id: 6, title: 'Cookies and analytics', body: 'This website does not use cookies for personalized advertising, user tracking, or behavioral profiling. We may use cookie-free analytics to measure aggregate, anonymous metrics.' },
  { id: 7, title: 'Contact', body: 'For questions about this Privacy Policy or requests regarding your data, contact info@kutircharecofarm.com. Postal address: Kutirchar EcoFarm, Kutirchar, Bhadraghat, Kamarkhanda, Sirajganj, Bangladesh.' },
];

export function PrivacyPage() {
  return React.createElement('div', null,
    React.createElement(PageHero, {
      title: 'Privacy Policy',
      titleBn: '\u0997\u09cb\u09aa\u09a8\u09c0\u09af\u09bc\u09a4\u09be \u09a8\u09c0\u09a4\u09bf',
      subtitle: 'Kutirchar EcoFarm respects your privacy. This policy explains how we collect, use, and protect information.'
    }),
    React.createElement(PageSection, null,
      React.createElement('div', { style: { maxWidth: 800, margin: '0 auto' } },
        React.createElement('p', { style: { fontFamily: FONTS.sans, fontSize: 12, color: '#6b7280', marginBottom: 32 } }, 'Last updated: June 2026'),
        sections.map(function(s) {
          return React.createElement('div', { key: s.id, style: { marginBottom: 32 } },
            React.createElement('h3', { style: { fontFamily: FONTS.sans, fontSize: 16, fontWeight: 700, color: COLORS.kutircharGreen, margin: '0 0 10px' } }, s.id + '. ' + s.title),
            React.createElement('p', { style: { fontFamily: FONTS.sans, fontSize: 14, color: '#444', lineHeight: 1.75, margin: 0 } }, s.body)
          );
        })
      )
    )
  );
}
