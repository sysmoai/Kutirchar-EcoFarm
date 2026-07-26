// ─── SEO helpers: OG/Twitter meta, canonical, JSON-LD structured data ────────
// All values come from brand.ts and the i18n dictionaries (Zero Fake Data).
import { BRAND } from "../../brand";

const ORIGIN = `https://${BRAND.contact.website}`;
const OG_IMAGE = `${ORIGIN}/opengraph.jpg`;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id);
  if (!data) {
    existing?.remove();
    return;
  }
  const el = existing ?? (() => {
    const s = document.createElement("script");
    s.id = id;
    s.setAttribute("type", "application/ld+json");
    document.head.appendChild(s);
    return s;
  })();
  el.textContent = JSON.stringify(data);
}

interface SeoPage { title: string; description: string }
interface FaqItem { q: string; a: string }

export function applySeo(opts: {
  pathname: string;
  page: SeoPage;
  locale: "bn" | "en";
  homeLabel: string;
  faqItems?: FaqItem[];
}) {
  const { pathname, page, locale, homeLabel, faqItems } = opts;
  const url = `${ORIGIN}${pathname === "/" ? "/" : pathname}`;

  document.title = page.title;
  upsertMeta("name", "description", page.description);
  upsertCanonical(url);

  // Open Graph
  upsertMeta("property", "og:title", page.title);
  upsertMeta("property", "og:description", page.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", OG_IMAGE);
  upsertMeta("property", "og:site_name", BRAND.nameEn);
  upsertMeta("property", "og:locale", locale === "bn" ? "bn_BD" : "en_US");

  // Twitter
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", page.title);
  upsertMeta("name", "twitter:description", page.description);
  upsertMeta("name", "twitter:image", OG_IMAGE);

  // JSON-LD: Organization (site-wide)
  upsertJsonLd("jsonld-org", {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.nameEn,
    alternateName: BRAND.nameBn,
    url: ORIGIN,
    logo: `${ORIGIN}/favicon.png`,
    email: BRAND.contact.email,
    telephone: BRAND.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${BRAND.location.village}, ${BRAND.location.union}, ${BRAND.location.upazila}`,
      addressRegion: BRAND.location.district,
      addressCountry: "BD",
    },
  });

  // JSON-LD: LocalBusiness (site-wide; support email + verified phone lines + location)
  upsertJsonLd("jsonld-localbusiness", {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.nameEn,
    alternateName: BRAND.nameBn,
    description: BRAND.tagline,
    url: ORIGIN,
    image: OG_IMAGE,
    email: BRAND.contact.email,
    telephone: BRAND.contact.phones.map((p) => p.number),
    address: {
      "@type": "PostalAddress",
      addressLocality: `${BRAND.location.village}, ${BRAND.location.union}, ${BRAND.location.upazila}`,
      addressRegion: BRAND.location.district,
      addressCountry: "BD",
    },
  });

  // JSON-LD: BreadcrumbList (Home → current page; omitted on home)
  upsertJsonLd(
    "jsonld-breadcrumb",
    pathname === "/"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: homeLabel, item: `${ORIGIN}/` },
            { "@type": "ListItem", position: 2, name: page.title, item: url },
          ],
        },
  );

  // JSON-LD: FAQPage (only on /faq, from the real translated Q&A)
  upsertJsonLd(
    "jsonld-faq",
    pathname === "/faq" && faqItems && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null,
  );
}
