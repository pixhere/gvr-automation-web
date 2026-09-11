"use client";

import * as React from "react";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site-config";

/**
 * GoHighLevel calendar embed. Renders the live embedded calendar once
 * `NEXT_PUBLIC_GHL_CALENDAR_URL` is set; otherwise shows a clearly
 * labeled placeholder so the page never looks broken pre-launch.
 * See /README.md "Connecting GoHighLevel".
 */
export function CalendarEmbed() {
  const url = siteConfig.booking.calendarEmbedUrl;

  if (!url) {
    // Customer-facing fallback — shown until the GHL calendar embed URL is
    // set (see /README.md "Connecting GoHighLevel"). No internal config
    // details are ever surfaced here; visitors only see a polished,
    // on-brand invitation to book directly.
    return (
      <Card className="mx-auto max-w-lg text-center">
        <CalendarClock className="mx-auto h-10 w-10 text-green-hover" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-h4-mobile font-bold text-navy">
          Let&rsquo;s Find You a Time
        </h3>
        <p className="mt-3 text-small text-ink-secondary">
          Online scheduling is being finished up. In the meantime, call or email us and
          we&rsquo;ll get your Free Strategy Session booked personally — usually within one
          business day.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={`tel:${siteConfig.contact.phoneHref}`}>
            Call {siteConfig.contact.phone}
          </Button>
          <Button href={`mailto:${siteConfig.contact.email}`} variant="secondary">
            Email Us
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-card shadow-md">
      <iframe
        src={url}
        title="Schedule your free strategy session"
        className="h-[720px] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
