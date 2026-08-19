/**
 * The site's main domain, and the hosts that only exist to point at it.
 *
 * Lives in its own dependency-free module because `next.config.ts` imports it
 * as well as the app does: the redirect that retires the old domain and the
 * canonical that names the new one have to agree, and nothing catches it if
 * they quietly drift apart.
 */

/**
 * Canonical origin. Canonicals, `sitemap.xml`, `robots.txt`, OG image URLs, and
 * the JSON-LD ids all point here. No trailing slash — callers concatenate paths.
 */
export const PRIMARY_ORIGIN = "https://easttnfarmdogs.com";

/**
 * Hosts that still reach this app but shouldn't be what anyone lands on.
 * amworkingdogs.com was the original domain, and the links to it already out in
 * the world — Facebook, the Google Business Profile, anything printed — have to
 * keep working, so it stays attached in Vercel and 308s here instead.
 *
 * A regex, which Next anchors with `^...$` before matching the Host header
 * (lowercased, port stripped). See `redirects()` in next.config.ts.
 */
export const RETIRED_HOST_PATTERN = "(?:www\\.)?amworkingdogs\\.com";
