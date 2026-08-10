import {
  BUSINESS,
  AREAS_SERVED,
  SITE_URL,
  PUPPY_PRICE,
} from "@/app/_config/business";
import { CROSS } from "@/app/_data/breed";
import type { FaqItem } from "@/app/_types";

/**
 * Schema.org JSON-LD builders. Pure functions fed by the canonical business
 * identity (app/_config/business.ts) and the existing data files, rendered via
 * the <JsonLd> component. Validate output with Google's Rich Results Test.
 */

type JsonLd = Record<string, unknown>;

/** Stable @id for the business entity so other nodes (Offers) can reference it. */
export const BUSINESS_ID = `${SITE_URL}/#business`;

/** Sitewide LocalBusiness — the core local-SEO entity (who/where/contact). */
export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: AREAS_SERVED,
    founder: BUSINESS.founders.map((name) => ({ "@type": "Person", name })),
    knowsAbout: [
      "Livestock guardian dogs",
      "Kangal dogs",
      "Great Pyrenees",
      "Predator control for livestock",
      "Guardian dog training",
    ],
    sameAs: BUSINESS.sameAs,
  };
}

/** Product + Offer for a guardian puppy. */
export function puppyProductSchema(): JsonLd {
  const priceValidUntil = new Date(new Date().getFullYear() + 1, 11, 31)
    .toISOString()
    .slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${CROSS.name} Livestock Guardian Dog Puppy`,
    description: `${CROSS.ratio}. ${CROSS.summary}`,
    image: BUSINESS.image,
    category: "Animals & Pet Supplies > Live Animals",
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: {
      "@type": "Offer",
      price: PUPPY_PRICE,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil,
      url: `${SITE_URL}/puppies`,
      seller: { "@id": BUSINESS_ID },
    },
  };
}

/** FAQPage from the existing FAQ data. */
export function faqPageSchema(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** BreadcrumbList for nested pages. Paths are site-relative (e.g. "/dogs"). */
export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
