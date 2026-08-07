"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, primaryCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on route change.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || menuOpen;

  return (
    // Revision #1: taller (88px vs 80px), more left/right padding via the
    // shared container-page fix, and menu items are centered vertically.
    <header
      className={cn(
        "sticky top-0 z-50 h-[88px] transition-all duration-DEFAULT",
        solid ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-page flex h-full items-center justify-between">
        <Logo variant="wordmark" priority className="shrink-0 pr-6" />

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-2 text-small font-semibold text-navy transition-colors duration-DEFAULT hover:text-green-hover",
                "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-green after:transition-all after:duration-DEFAULT hover:after:w-full",
                pathname === link.href && "text-green-hover after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={primaryCta.href} size="sm">
            {primaryCta.label}
          </Button>
        </div>

        {/* Revision #3: min-h/min-w added alongside the fixed h-11/w-11 so the
            44×44px touch target can never get squeezed below spec on very
            narrow screens (320px), and shrink-0 keeps it from shrinking in
            the flex row at all. */}
        <button
          type="button"
          className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-input text-navy transition-colors duration-fast hover:bg-navy/5 active:bg-navy/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Revision #3 bugfix: this was `max-h-96`, which the 8px-grid spacing
          override in tailwind.config.ts silently renders as 96px instead of
          Tailwind's default 24rem (384px) — nowhere near enough room for 5
          nav links + a CTA button, so the open menu was getting clipped to a
          96px sliver. Switched to an arbitrary value that's immune to the
          override, with plenty of headroom, plus an opacity fade for a
          smoother open/close. */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden bg-white shadow-md transition-[max-height,opacity] duration-DEFAULT ease-out md:hidden",
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-2 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-[44px] rounded-input px-2 py-3 text-body font-semibold text-navy transition-colors duration-fast hover:bg-navy/5"
            >
              {link.label}
            </Link>
          ))}
          <Button href={primaryCta.href} className="mt-3 w-full">
            {primaryCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
