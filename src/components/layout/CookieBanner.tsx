"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "gvr-cookie-consent";

/**
 * Simple, no-dark-patterns cookie notice per the Legal & Compliance spec.
 * Revision #2: redesigned to match the rest of the site's design system —
 * rounded top corners, real shadow, more padding, and the standardized
 * primary/secondary buttons instead of ad-hoc raw <button> styling.
 */
export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) — fail silently, don't block the page.
    }
  }, []);

  const respond = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 animate-slide-up sm:px-6"
    >
      <div className="container-page !px-0 flex w-full max-w-3xl flex-col items-center justify-between gap-4 rounded-card border border-border bg-white p-6 shadow-lg sm:flex-row">
        <p className="text-small text-ink-secondary">
          We use cookies to improve your experience.{" "}
          <Link href="/privacy-policy" className="font-semibold text-green-hover underline hover:text-green">
            Learn More
          </Link>
        </p>
        <div className="flex flex-shrink-0 items-center gap-3">
          <Button type="button" variant="secondary" size="sm" onClick={() => respond("declined")}>
            Decline
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={() => respond("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
