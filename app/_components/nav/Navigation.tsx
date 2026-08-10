"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SocialLinks } from "@/app/_components/ui/SocialLinks";
import { LINKS } from "@/app/_config/links";

const dogLinks: { href: string; label: string }[] = [
  { href: "/dogs/breed", label: "The Breed" },
  { href: "/dogs/working", label: "What They Do" },
  { href: "/dogs/care", label: "Care & Training" },
  { href: "/dogs/faq", label: "FAQ" },
  { href: "/dogs/gallery", label: "Gallery" },
];

const buyingLinks: { href: string; label: string }[] = [
  { href: "/puppies", label: "Available Puppies" },
  { href: "/reserve", label: "Reserve a Puppy" },
  { href: "/buying/process", label: "How It Works" },
  { href: "/buying/policy", label: "Health & Sales Policy" },
  { href: "/buying/transport", label: "Pickup & Transport" },
  { href: "/guardian-dogs-for-sale", label: "Areas We Serve" },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
];

export function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dogsOpen, setDogsOpen] = useState(false);
  const [buyingOpen, setBuyingOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const buyingActive =
    pathname.startsWith("/puppies") ||
    pathname.startsWith("/reserve") ||
    pathname.startsWith("/buying") ||
    pathname.startsWith("/guardian-dogs-for-sale");

  return (
    <>
      {/* ============ DESKTOP NAV ============ */}
      <nav
        className="hidden min-[1060px]:flex items-center justify-between px-6 lg:px-10 py-3 sticky top-0 z-[999] rail-bg"
        aria-label="Main navigation"
        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-rail-fg) 15%, transparent)" }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6">
          <Link href="/" className="shrink-0" style={{ textDecoration: "none" }} aria-label="AM Working Dogs home">
            <Image
              src="/images/logo/logo.svg"
              alt="AM Working Dogs"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
          </Link>

          <div className="flex min-w-0 items-center gap-1">
            <NavLink href="/" active={isActive("/")}>Home</NavLink>
            <NavLink href="/about" active={isActive("/about")}>About Us</NavLink>

            <Dropdown label="About the Dogs" active={pathname.startsWith("/dogs")} links={dogLinks} />
            <Dropdown label="Buying a Puppy" active={buyingActive} links={buyingLinks} />

            <NavLink href="/contact" active={isActive("/contact")}>Contact</NavLink>
          </div>
        </div>

        {/* Right: social + call + CTA */}
        <div className="flex shrink-0 items-center gap-3">
          <SocialLinks light />
          <a
            href={LINKS.phoneHref}
            className="h-9 px-4 gap-1.5 rounded-btn text-sm font-semibold inline-flex items-center justify-center transition-colors hover:bg-[color-mix(in_srgb,var(--c-rail-fg)_12%,transparent)]"
            style={{
              border: "1px solid color-mix(in srgb, var(--c-rail-fg) 45%, transparent)",
              color: "var(--c-rail-fg)",
              textDecoration: "none",
            }}
            aria-label={`Call ${LINKS.phone}`}
          >
            <PhoneIcon />
            Call
          </a>
          <Link
            href="/puppies"
            className="h-9 px-4 rounded-btn text-sm font-semibold inline-flex items-center justify-center transition-all hover:opacity-90"
            style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
          >
            Available Puppies
          </Link>
        </div>
      </nav>

      {/* ============ MOBILE NAV ============ */}
      <nav
        className="min-[1060px]:hidden sticky top-0 z-[999] rail-bg"
        aria-label="Main navigation"
        style={{ borderBottom: "1px solid color-mix(in srgb, var(--c-rail-fg) 15%, transparent)" }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" onClick={() => setDrawerOpen(false)} style={{ textDecoration: "none" }} aria-label="AM Working Dogs home">
            <Image
              src="/images/logo/logo.svg"
              alt="AM Working Dogs"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={LINKS.phoneHref}
              className="h-9 px-3 gap-1.5 rounded-btn text-sm font-semibold inline-flex items-center justify-center transition-colors hover:bg-[color-mix(in_srgb,var(--c-rail-fg)_12%,transparent)]"
              style={{
                border: "1px solid color-mix(in srgb, var(--c-rail-fg) 45%, transparent)",
                color: "var(--c-rail-fg)",
                textDecoration: "none",
              }}
              aria-label={`Call ${LINKS.phone}`}
            >
              <PhoneIcon />
              Call
            </a>
            <button
              onClick={() => setDrawerOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center rounded-btn"
              style={{ color: "var(--c-rail-fg)" }}
              // Stable label; aria-expanded carries the state. Naming it
              // "Close menu" would collide with the drawer's own close button.
              aria-label="Menu"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ============ MOBILE DRAWER ============
          Sits above the announcement banner (z-1001); otherwise the banner
          covers the drawer header and its close button. */}
      {drawerOpen && (
        <div className="min-[1060px]:hidden fixed inset-0 z-[1100] flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="relative w-4/5 max-w-xs h-full overflow-y-auto rail-bg flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 15%, transparent)" }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: "var(--c-rail-fg)", fontFamily: "var(--font-display)" }}
              >
                AM Working Dogs
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-btn"
                style={{ color: "var(--c-rail-fg)" }}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {mainLinks.map((link) => (
                <DrawerLink
                  key={link.href}
                  href={link.href}
                  active={isActive(link.href)}
                  onClick={() => setDrawerOpen(false)}
                >
                  {link.label}
                </DrawerLink>
              ))}

              <DrawerGroup
                label="About the Dogs"
                open={dogsOpen}
                onToggle={() => setDogsOpen((o) => !o)}
                links={dogLinks}
                isActive={isActive}
                onNavigate={() => setDrawerOpen(false)}
              />

              <DrawerGroup
                label="Buying a Puppy"
                open={buyingOpen}
                onToggle={() => setBuyingOpen((o) => !o)}
                links={buyingLinks}
                isActive={isActive}
                onNavigate={() => setDrawerOpen(false)}
              />

              <DrawerLink
                href="/contact"
                active={isActive("/contact")}
                onClick={() => setDrawerOpen(false)}
              >
                Contact
              </DrawerLink>
            </nav>

            <div
              className="px-5 py-5 border-t space-y-4"
              style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 15%, transparent)" }}
            >
              <Link
                href="/puppies"
                className="flex items-center justify-center h-12 rounded-btn font-semibold text-sm w-full"
                style={{ background: "var(--c-accent)", color: "var(--c-accent-fg)", textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                Available Puppies
              </Link>
              <a
                href={LINKS.phoneHref}
                className="flex items-center justify-center gap-2 h-12 rounded-btn font-semibold text-sm w-full transition-colors hover:bg-[color-mix(in_srgb,var(--c-rail-fg)_12%,transparent)]"
                style={{
                  border: "1px solid color-mix(in srgb, var(--c-rail-fg) 45%, transparent)",
                  color: "var(--c-rail-fg)",
                  textDecoration: "none",
                }}
                onClick={() => setDrawerOpen(false)}
              >
                <PhoneIcon />
                Call {LINKS.phone}
              </a>
              <div className="flex justify-center">
                <SocialLinks light showLabels />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Dropdown({
  label,
  active,
  links,
}: {
  label: string;
  active: boolean;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 px-3 py-2 rounded-btn text-sm font-medium transition-colors"
        style={{ color: active ? "var(--c-accent)" : "var(--c-rail-fg)" }}
        aria-haspopup="true"
      >
        {label}
        <svg
          viewBox="0 0 16 16"
          className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <div className="absolute top-full left-0 pt-2 min-w-[220px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
        <div
          className="rounded-card border shadow-xl overflow-hidden"
          style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 text-sm hover:bg-[var(--c-panel)] transition-colors"
              style={{ color: "var(--c-ink)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrawerGroup({
  label,
  open,
  onToggle,
  links,
  isActive,
  onNavigate,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  links: { href: string; label: string }[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 rounded-btn text-sm font-medium"
        style={{ color: "var(--c-rail-fg)" }}
        aria-expanded={open}
      >
        {label}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="w-4 h-4 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div
          className="ml-4 pl-3 border-l space-y-1"
          style={{ borderColor: "color-mix(in srgb, var(--c-rail-fg) 20%, transparent)" }}
        >
          {links.map((link) => (
            <DrawerLink
              key={link.href}
              href={link.href}
              active={isActive(link.href)}
              onClick={onNavigate}
              sub
            >
              {link.label}
            </DrawerLink>
          ))}
        </div>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-btn text-sm font-medium transition-colors"
      style={{
        color: active ? "var(--c-accent)" : "var(--c-rail-fg)",
        textDecoration: "none",
        background: active ? "color-mix(in srgb, var(--c-accent) 15%, transparent)" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}

function DrawerLink({
  href,
  active,
  children,
  onClick,
  sub = false,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center w-full px-4 py-3 rounded-btn font-medium transition-colors"
      style={{
        color: active ? "var(--c-accent)" : "var(--c-rail-fg)",
        textDecoration: "none",
        background: active ? "color-mix(in srgb, var(--c-accent) 15%, transparent)" : "transparent",
        fontSize: sub ? "0.8125rem" : "0.875rem",
      }}
    >
      {children}
    </Link>
  );
}
