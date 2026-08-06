import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

/**
 * Base card: 24px radius, generous padding, subtle shadow, no heavy borders.
 * Revision #1: padding was p-8, which the 8px-grid spacing override in
 * tailwind.config.ts silently renders as only 8px — nowhere near "generous."
 * Bumped to p-10 (40px, unaffected by that override) across every card
 * sitewide (problem cards, solution cards, pricing, trust cards, etc.).
 */
export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-white p-10 shadow-sm transition-all duration-DEFAULT",
        hoverable && "hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
