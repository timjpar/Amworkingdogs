import { LINKS } from "@/app/_config/links";

/**
 * Canonical business identity (NAP — Name, Address, Phone) for AM Working Dogs.
 *
 * Single source of truth for structured data (app/_lib/schema.ts), the footer,
 * and the contact page. Keep this consistent with the Google Business Profile
 * listing — NAP consistency across the web is a local-SEO ranking signal.
 */

export const SITE_URL = "https://amworkingdogs.com";

export const BUSINESS = {
  name: "AM Working Dogs",
  legalName: "AM Working Dogs",
  description:
    "Livestock guardian dog breeder in Newport, Tennessee raising Kangal x Great Pyrenees puppies. Whelped and raised on a working homestead among poultry, rabbits, and stock. Local pickup in East Tennessee; transport available.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.png`,
  image: `${SITE_URL}/images/dogs/kangal-pyrenees-guardian-dogs-pair-pasture.jpeg`,
  email: LINKS.email,
  /** E.164-style for schema; display/href versions live in links.ts. */
  telephone: "+1-423-540-6566",
  founders: ["Michael Parsons", "Ali Parsons"],
  /** Puppies run $800. */
  priceRange: "$$",
  /** Home-based kennel — no public street address. City-level only. */
  address: {
    locality: "Newport",
    region: "TN",
    regionName: "Tennessee",
    postalCode: "37821",
    country: "US",
  },
  /** Approximate Newport, TN centroid. Refine with the GBP map pin. */
  geo: {
    latitude: 35.9668,
    longitude: -83.1871,
  },
  /** By-appointment farm visits; no walk-in storefront hours. */
  hoursNote: "By appointment",
  sameAs: [LINKS.facebook, LINKS.instagram, LINKS.tiktok],
} as const;

/** Flat price for a puppy, male or female. Drives pricing cards and Offer schema. */
export const PUPPY_PRICE = 800;

/** Deposit that holds a puppy from the current litter. */
export const DEPOSIT = 200;

/**
 * Areas served — East Tennessee + Western North Carolina.
 * Feeds LocalBusiness.areaServed and the /guardian-dogs-for-sale pages.
 */
export const AREAS_SERVED: string[] = [
  "Newport, TN",
  "Cocke County, TN",
  "Sevier County, TN",
  "Jefferson County, TN",
  "Hamblen County, TN",
  "Knox County, TN",
  "Greene County, TN",
  "East Tennessee",
  "Smoky Mountains",
  "Western North Carolina",
  "Asheville, NC",
];

/**
 * Google Search Console verification token (HTML-tag method).
 * Paste the content value from Search Console here; leave "" to omit the tag.
 */
export const GOOGLE_SITE_VERIFICATION: string = "";
