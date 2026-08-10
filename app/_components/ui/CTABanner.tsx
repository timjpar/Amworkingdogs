import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "brand" | "accent" | "dark";
}

export function CTABanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = "brand",
}: CTABannerProps) {
  const bg = {
    brand: "brand-band",
    accent: "section-band",
    dark: "rail-bg",
  }[variant];

  // The accent band uses dark ink on a gold field, so its buttons have to flip.
  const fg = variant === "accent" ? "var(--c-accent-fg)" : "var(--c-brand-fg)";
  const solidBg = variant === "accent" ? "var(--c-accent-fg)" : "#fff";
  const solidFg =
    variant === "accent"
      ? "var(--c-accent)"
      : variant === "dark"
      ? "var(--c-rail)"
      : "var(--c-brand)";

  return (
    <section className={`${bg} py-16 px-4`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: fg, fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg mb-8 opacity-90" style={{ color: fg }}>
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-btn transition-all active:scale-[0.98] hover:opacity-90"
            style={{ background: solidBg, color: solidFg, textDecoration: "none" }}
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-btn border-2 transition-all active:scale-[0.98] hover:opacity-80"
              style={{
                borderColor: `color-mix(in srgb, ${fg} 55%, transparent)`,
                color: fg,
                textDecoration: "none",
              }}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
