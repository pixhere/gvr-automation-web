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
    return (
      <Card className="mx-auto max-w-lg text-center">
        <CalendarClock className="mx-auto h-10 w-10 text-green-hover" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-h4-mobile font-bold text-navy">
          Booking Calendar — Not Yet Connected
        </h3>
        <p className="mt-3 text-small text-ink-secondary">
          Once <code className="rounded bg-navy/5 px-1.5 py-0.5">NEXT_PUBLIC_GHL_CALENDAR_URL</code>{" "}
          is set to your GoHighLevel calendar embed link, this space becomes a live, responsive
          booking calendar with timezone detection and confirmation. In the meantime, reach us
          directly:
        </p>
        <Button href={`tel:${siteConfig.contact.phoneHref}`} className="mt-6">
          Call {siteConfig.contact.phone}
        </Button>
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
