import { LINKS } from "@/app/_config/links";

interface SocialLinksProps {
  size?: "sm" | "md";
  light?: boolean;
  showLabels?: boolean;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09z" />
  </svg>
);

export function SocialLinks({ size = "md", light = false, showLabels = false }: SocialLinksProps) {
  const btnSize = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const iconColor = light ? "text-white/90 hover:text-white" : "hover:text-[var(--c-brand)]";

  const socials = [
    { href: LINKS.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: LINKS.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: LINKS.tiktok, label: "TikTok", Icon: TikTokIcon },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-1">
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSize} rounded-full flex items-center justify-center transition-colors ${iconColor}`}
          style={{ color: light ? "rgba(255,255,255,0.8)" : "var(--c-ink-2)" }}
          aria-label={`Follow us on ${label}`}
        >
          <Icon />
          {showLabels && <span className="sr-only">{label}</span>}
        </a>
      ))}
    </div>
  );
}
