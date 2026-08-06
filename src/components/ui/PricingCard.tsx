import * as React from "react";
import { Check } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export function PricingCard({
  name,
  price,
  priceNote,
  idealFor,
  features,
  cta,
  featured = false,
}: {
  name: string;
  price: string;
  priceNote?: string;
  idealFor: string;
  features: readonly string[];
  cta: string;
  featured?: boolean;
}) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col",
        featured && "border-2 border-green shadow-md"
      )}
    >
      {featured && (
        <Badge tone="green" className="absolute -top-3 left-8">
          Most Popular
        </Badge>
      )}
      <h3 className="text-h4-mobile font-heading font-bold text-navy">{name}</h3>
      <p className="mt-2 text-small text-ink-secondary">{idealFor}</p>
      <div className="mt-6">
        <span className="font-heading text-h3-mobile font-extrabold text-navy">{price}</span>
        {priceNote && <p className="mt-1 text-caption text-ink-secondary">{priceNote}</p>}
      </div>
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-small text-ink">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-hover" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Button href="/contact" variant={featured ? "primary" : "secondary"} className="mt-8 w-full">
        {cta}
      </Button>
    </Card>
  );
}
