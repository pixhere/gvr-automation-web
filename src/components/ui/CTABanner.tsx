import * as React from "react";
import { Button } from "./Button";
import { primaryCta, secondaryStrategyCta } from "@/lib/site-config";

/**
 * Final-CTA banner reused at the bottom of every page. Revision #2: now
 * always shows a secondary "Book a Free Strategy Session" button next to
 * the primary CTA by default (pass secondaryLabel="" to suppress it), and
 * the primary button gets extra size/shadow treatment as the page's
 * strongest visual element.
 */
export function CTABanner({
  title = "Let's Find the Biggest Opportunity in Your Business.",
  description = "The first step isn't buying software. It's understanding where your business can improve.",
  ctaLabel = primaryCta.label,
  ctaHref = primaryCta.href,
  secondaryLabel = secondaryStrategyCta.label,
  secondaryHref = secondaryStrategyCta.href,
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-h2-mobile md:text-h2 font-heading font-extrabold text-navy">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-prose text-body text-ink-secondary leading-relaxed">{description}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Taller, larger radius — the strongest visual element on the page. */}
          <Button
            href={ctaHref}
            size="default"
            className="!h-[64px] !rounded-btn-lg !px-10 shadow-md hover:shadow-xl"
          >
            {ctaLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
