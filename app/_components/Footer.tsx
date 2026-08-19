import Link from "next/link";
import { LINKS } from "@/app/_config/links";
import { BUSINESS } from "@/app/_config/business";
import { serviceAreas } from "@/app/_data/serviceAreas";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="rail-bg pt-12 pb-6"
      style={{ borderTop: "1px solid color-mix(in srgb, var(--c-rail-fg) 12%, transparent)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 12%, transparent)" }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold block mb-3"
              style={{ color: "var(--c-rail-fg)", fontFamily: "var(--font-display)", textDecoration: "none" }}
            >
              AM Working Dogs
            </Link>
            <p className="text-sm leading-relaxed mb-4 opacity-75" style={{ color: "var(--c-rail-fg)" }}>
              Kangal x Great Pyrenees livestock guardian dogs, whelped and raised on a
              working homestead in the Smoky Mountain foothills of Newport, Tennessee.
            </p>
            <p className="text-xs opacity-60" style={{ color: "var(--c-rail-fg)" }}>
              Farm visits by appointment.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-60"
              style={{ color: "var(--c-rail-fg)" }}
            >
              Quick Links
            </h3>
            <nav className="space-y-2">
              {[
                { href: "/puppies", label: "Available Puppies" },
                { href: "/dogs/breed", label: "The Breed" },
                { href: "/dogs/working", label: "What They Do" },
                { href: "/dogs/care", label: "Care & Training" },
                { href: "/dogs/faq", label: "FAQ" },
                { href: "/reserve", label: "Reserve a Puppy" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="block text-sm hover:opacity-100 transition-opacity"
                  style={{ color: "var(--c-rail-fg)", opacity: 0.7, textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Areas served */}
          <div>
            <h3
              className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-60"
              style={{ color: "var(--c-rail-fg)" }}
            >
              Areas We Serve
            </h3>
            <nav className="space-y-2">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/guardian-dogs-for-sale/${area.slug}`}
                  prefetch={false}
                  className="block text-sm hover:opacity-100 transition-opacity"
                  style={{ color: "var(--c-rail-fg)", opacity: 0.7, textDecoration: "none" }}
                >
                  Guardian Dogs in {area.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-60"
              style={{ color: "var(--c-rail-fg)" }}
            >
              Connect
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <a
                  href={LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 h-11 px-4 rounded-btn font-medium text-sm transition-opacity hover:opacity-80"
                  style={{ background: "#1877f2", color: "white", textDecoration: "none" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Follow on Facebook
                </a>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 h-11 px-4 rounded-btn font-medium text-sm transition-opacity hover:opacity-80"
                  style={{
                    background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-none">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Follow on Instagram
                </a>
              </div>

              <div className="text-xs opacity-60 space-y-1" style={{ color: "var(--c-rail-fg)" }}>
                <p>
                  Call or text Michael:{" "}
                  <a href={LINKS.phoneHref} style={{ color: "var(--c-rail-fg)" }}>{LINKS.phone}</a>
                </p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${LINKS.email}`} style={{ color: "var(--c-rail-fg)" }}>{LINKS.email}</a>
                </p>
                <p>
                  {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
                </p>
              </div>

              <p className="text-xs opacity-60" style={{ color: "var(--c-rail-fg)" }}>
                Also raising rabbits and poultry at{" "}
                <a
                  href={LINKS.sisterSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--c-rail-fg)", textDecoration: "underline" }}
                >
                  AMRabbits
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50"
          style={{ color: "var(--c-rail-fg)" }}
        >
          <p>© {year} AM Working Dogs. All rights reserved.</p>
          <p>Livestock Guardian Dogs · Smoky Mountains, TN</p>
        </div>
      </div>
    </footer>
  );
}
