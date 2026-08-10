interface RidgeProps {
  className?: string;
  color?: string;
  size?: number;
}

/** Stylized Smoky Mountain ridgeline — the section-header mark. */
export function Ridge({
  className = "",
  color = "var(--c-brand)",
  size = 40,
}: RidgeProps) {
  return (
    <svg
      width={size}
      height={(size * 5) / 8}
      viewBox="0 0 80 50"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 42 L20 16 L31 30 L44 8 L60 32 L69 22 L78 42 Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M20 16 L26.5 24 L20 27.5 L13.5 24 Z"
        fill="#fff"
        opacity="0.55"
      />
      <path d="M44 8 L51 19 L44 22.5 L37 19 Z" fill="#fff" opacity="0.55" />
    </svg>
  );
}
