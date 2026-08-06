import * as React from "react";
import { cn } from "@/lib/utils";

type Background = "white" | "muted" | "navy";

const backgrounds: Record<Background, string> = {
  white: "bg-white",
  muted: "bg-surface-muted",
  navy: "bg-navy text-white",
};

/**
 * Standard section wrapper. Alternates white/light-gray backgrounds
 * across the page per the UX rules in the blueprint, with occasional
 * navy emphasis sections for contrast.
 */
export function SectionContainer({
  background = "white",
  className,
  innerClassName,
  id,
  children,
}: {
  background?: Background;
  className?: string;
  innerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn(backgrounds[background], className)}>
      {/* Revision #1: default vertical rhythm bumped from py-16/py-24 (which
          rendered as only 16px/24px under the 8px-grid spacing override) to
          genuinely spacious values so every section gets its own clear
          visual boundary and nothing feels compressed against the next. */}
      <div className={cn("container-page py-20 md:py-28", innerClassName)}>{children}</div>
    </section>
  );
}
