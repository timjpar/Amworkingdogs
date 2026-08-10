interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "accent" | "muted" | "soft-brand" | "soft-accent";
}

export function Badge({ children, variant = "brand" }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    brand: { background: "var(--c-brand)", color: "var(--c-brand-fg)" },
    accent: { background: "var(--c-accent)", color: "var(--c-accent-fg)" },
    muted: {
      background: "color-mix(in srgb, var(--c-ink) 10%, transparent)",
      color: "var(--c-ink-2)",
    },
    "soft-brand": {
      background: "color-mix(in srgb, var(--c-brand) 18%, var(--c-page))",
      color: "var(--c-brand)",
    },
    "soft-accent": {
      background: "color-mix(in srgb, var(--c-accent) 28%, var(--c-page))",
      color: "color-mix(in srgb, var(--c-accent-fg) 80%, var(--c-ink))",
    },
  };

  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
