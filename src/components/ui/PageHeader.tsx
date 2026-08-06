import * as React from "react";
import { cn } from "@/lib/utils";

/** Consistent eyebrow + H1 + supporting copy used at the top of interior pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left ml-0",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-caption font-bold uppercase tracking-wide",
            dark ? "text-green" : "text-green-hover"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className={cn(
          "text-h1-mobile md:text-h1 font-heading font-extrabold",
          dark ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "mt-6 text-body md:text-[20px] leading-relaxed",
            dark ? "text-white/80" : "text-ink-secondary",
            align === "center" && "mx-auto max-w-prose"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
