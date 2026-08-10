interface PawProps {
  className?: string;
  color?: string;
  size?: number;
}

export function Paw({
  className = "",
  color = "var(--c-accent)",
  size = 28,
}: PawProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="8.6" cy="10.4" rx="3.4" ry="4.4" transform="rotate(-18 8.6 10.4)" />
      <ellipse cx="15.2" cy="6.6" rx="3.5" ry="4.6" />
      <ellipse cx="22.2" cy="9.2" rx="3.4" ry="4.4" transform="rotate(16 22.2 9.2)" />
      <ellipse cx="27" cy="16.4" rx="3" ry="3.8" transform="rotate(32 27 16.4)" />
      <path d="M16 13.4c-5 0-9 3.7-9 8.2 0 4.2 3.9 6.9 9 6.9s9-2.7 9-6.9c0-4.5-4-8.2-9-8.2z" />
    </svg>
  );
}
