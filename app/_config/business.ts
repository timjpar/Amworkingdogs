import { LINKS } from "@/app/_config/links";
import { PRIMARY_ORIGIN } from "@/app/_config/domain";

/**
 * Canonical business identity (NAP — Name, Address, Phone) for AM Working Dogs.
 *
 * Single source of truth for structured data (app/_lib/schema.ts), the footer,
 * and the contact page. Keep this consistent with the Google Business Profile
 * listing — NAP consistency across the web is a local-SEO ranking signal.
 */

/**
 * Canonical origin, used for canonicals, the sitemap, robots.txt, OG image URLs,
 * and JSON-LD ids. Getting this wrong points Google at the wrong domain, so it
 * resolves in priority order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — escape hatch, pins an exact origin.
 *   2. PRIMARY_ORIGIN on any deploy running on Vercel.
 *   3. localhost for local dev, including `next start` against a local build.
 *
 * Step 2 used to read VERCEL_PROJECT_PRODUCTION_URL and describe whatever domain
 * Vercel called primary. That was right while the site was a bare *.vercel.app
 * deploy and wrong the moment a second domain was attached: during a domain
 * cutover it names the outgoing one, and on a preview deploy it hands Google a
 * throwaway hostname to compete with the real pages. The main domain is a
 * decision, not something to infer from the environment — so it's pinned.
 *
 * No trailing slash — callers concatenate paths directly.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL) return PRIMARY_ORIGIN;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

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
  /** Puppies run $500. */
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
export const PUPPY_PRICE = 500;

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
