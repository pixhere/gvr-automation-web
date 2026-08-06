import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "default" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-heading font-semibold transition-all duration-DEFAULT ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

// Revision #2: standardized button system per founder feedback.
// Primary = solid green / white text. Secondary = white / green border /
// green text. Tertiary (text) = green text link. Used consistently
// sitewide instead of the previous mix of navy, green, and outlined buttons.
const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-white shadow-sm hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  secondary:
    "bg-white text-green-hover border-2 border-green hover:bg-green/5 active:bg-green/10",
  text: "bg-transparent text-green-hover underline-offset-4 hover:underline p-0 h-auto",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-14 px-8 text-body",
  sm: "h-11 px-6 text-small",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Primary / Secondary / Text button per the GVR design system.
 * Renders a Next.js <Link> when `href` is provided, otherwise a <button>.
 */
export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant !== "text" && sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
