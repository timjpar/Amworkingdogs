import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonActionProps extends ButtonBaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type ButtonProps = ButtonLinkProps | ButtonActionProps;

const baseStyles =
  "inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] no-underline";

const sizeStyles = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

const variantStyles = {
  primary: "bg-brand hover:opacity-90 focus-visible:ring-brand",
  secondary: "bg-accent hover:opacity-90 focus-visible:ring-accent",
  outline: "bg-transparent border-2 hover:opacity-80",
  ghost: "bg-transparent hover:opacity-70",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const inlineStyle =
    variant === "outline"
      ? { borderColor: "var(--c-brand)", color: "var(--c-brand)" }
      : variant === "ghost"
      ? { color: "var(--c-link)" }
      : variant === "primary"
      ? { color: "var(--c-brand-fg)" }
      : { color: "var(--c-accent-fg)" };

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          style={inlineStyle}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={inlineStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-50 disabled:cursor-not-allowed`}
      style={inlineStyle}
    >
      {children}
    </button>
  );
}
