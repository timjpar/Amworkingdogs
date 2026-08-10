interface FenceProps {
  className?: string;
  color?: string;
  size?: number;
}

/** Simple pasture fence mark — used to head "on the farm" sections. */
export function Fence({
  className = "",
  color = "var(--c-accent)",
  size = 40,
}: FenceProps) {
  return (
    <svg
      width={size}
      height={(size * 5) / 8}
      viewBox="0 0 80 50"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 10 V44 M40 6 V44 M66 10 V44" />
      <path d="M6 20 H74 M6 32 H74" strokeWidth="3.5" />
    </svg>
  );
}
