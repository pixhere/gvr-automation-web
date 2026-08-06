import * as React from "react";
import { Quote } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

/**
 * Testimonial card. Per the blueprint: never fabricate reviews.
 * Pass `isExample` to clearly label placeholder content until real
 * client testimonials are available.
 */
export function TestimonialCard({
  quote,
  name,
  business,
  isExample = true,
}: {
  quote: string;
  name: string;
  business: string;
  isExample?: boolean;
}) {
  return (
    <Card className="relative h-full">
      {isExample && (
        <Badge tone="silver" className="absolute right-6 top-6">
          Example
        </Badge>
      )}
      <Quote className="h-8 w-8 text-green/40" aria-hidden="true" />
      <p className="mt-4 text-body italic text-ink">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6">
        <p className="font-heading font-semibold text-navy">{name}</p>
        <p className="text-caption text-ink-secondary">{business}</p>
      </div>
    </Card>
  );
}
