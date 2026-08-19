import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * Deliberately the *static*, no-nonce policy. Nonces would be stricter, but per
 * the Next.js CSP guide they require dynamic rendering, which disables static
 * generation and CDN caching — every page on this site is prerendered at build
 * time, and that is exactly what keeps it cheap to host. Trading that away for
 * a stricter script-src is the wrong deal on a brochure site with no auth, no
 * database, and no user-generated content rendered anywhere.
 *
 * Why 'unsafe-inline' is unavoidable here:
 *   - script-src: Next's own RSC bootstrap (`self.__next_f.push(...)`) is inline
 *     and differs per page, so it can't be hashed at build time.
 *   - style-src:  the components style via inline `style={{ ... }}` attributes
 *     throughout, which CSP treats as inline styles.
 *
 * Everything else is locked to 'self'. The site loads zero external
 * subresources — next/font self-hosts the Bitter/Source Sans files into
 * /_next/static/media, and the social/payment URLs are links, not loads — so
 * only connect-src carries an allowlist, for the contact form's POST.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // live.staticflickr.com: the puppy gallery is served straight from Flickr's
  // CDN so no image transformation is billed and no bytes leave our origin.
  "img-src 'self' blob: data: https://live.staticflickr.com",
  "font-src 'self'",
  // formsubmit.co receives the contact form's submission, which posts from the
  // browser rather than the server — FormSubmit answers 403 to requests from
  // cloud infrastructure. Same-origin fetches (RSC payloads) need 'self'.
  "connect-src 'self' https://formsubmit.co",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  /** Don't advertise the framework. */
  poweredByHeader: false,

  /**
   * Image Optimization is the largest billable line on this site (every unique
   * source × width × quality × format is a transformation, plus cache storage),
   * so the defaults are narrowed deliberately rather than left wide open.
   */
  images: {
    // One format, not AVIF+WebP: each configured format is cached separately.
    formats: ["image/webp"],
    // Next 16 restricts quality to this allowlist; stated explicitly.
    qualities: [75],
    // Trimmed from the default 8 widths. Sources top out at 1920 after
    // recompression, so 2048/3840 could only ever upscale — and each extra
    // width is another billed transformation per photo.
    deviceSizes: [640, 828, 1080, 1920],
    // Only used for images that pass `sizes`; all below the smallest deviceSize.
    imageSizes: [128, 256, 384],
    // 31 days, up from the 4h default — far fewer revalidations and cache writes.
    minimumCacheTTL: 2678400,
    // Only host allowed through the optimizer besides our own /images.
    remotePatterns: [
      { protocol: "https", hostname: "live.staticflickr.com", pathname: "/**", search: "" },
    ],
    // Confine the optimizer to our own photos and reject any query string.
    // Without this, /_next/image will optimize any local path at any allowed
    // width, so a script can loop widths to burn through transformations.
    localPatterns: [{ pathname: "/images/**", search: "" }],
    // Recompressed sources are all well under 1MB.
    maximumResponseBody: 5_000_000,
  },

  experimental: {
    // Reuse prefetched payloads for 30min instead of 5, so moving around the
    // site during one visit doesn't refetch the same RSC payloads.
    staleTimes: { static: 1800 },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // Host-level redirects (amworkingdogs.com and the www variants -> the main
      // domain) are NOT here. They're set on the project's domains in Vercel, so
      // they resolve at the edge without the request ever reaching a deployment.
      // Adding them here too would be dead code — see README, "Domains".
      //
      // Legacy paths from the AMRabbits site, where the guardian dogs used to live.
      { source: "/farm/livestock-guardian-dogs", destination: "/dogs/breed", permanent: true },
      { source: "/livestock-dogs", destination: "/dogs/breed", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/available-puppies", destination: "/puppies", permanent: true },
    ];
  },
};

export default nextConfig;
