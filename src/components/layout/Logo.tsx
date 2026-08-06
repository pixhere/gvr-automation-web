import * as React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Official GVR Automation logo. Per the Constitution: never recreate,
 * distort, or substitute this asset. Source files live in /public/brand.
 */
export function Logo({
  variant = "wordmark",
  className,
  imgClassName,
  priority = false,
}: {
  variant?: "icon" | "wordmark" | "full";
  className?: string;
  /** Revision #3: overrides the image's own height class (e.g. for a larger
      footer logo) — separate from `className`, which lands on the outer
      `<Link>`, not the `<Image>` itself. */
  imgClassName?: string;
  priority?: boolean;
}) {
  const sources = {
    icon: { src: "/brand/logo-icon.png", w: 1225, h: 474, h_class: "h-9" },
    wordmark: { src: "/brand/logo-wordmark.png", w: 1254, h: 594, h_class: "h-11" },
    full: { src: "/brand/logo-full.png", w: 1254, h: 778, h_class: "h-16" },
  } as const;
  const asset = sources[variant];

  return (
    <Link href="/" aria-label="GVR Automation — Home" className={className}>
      <Image
        src={asset.src}
        alt="GVR Automation"
        width={asset.w}
        height={asset.h}
        priority={priority}
        className={imgClassName ?? `${asset.h_class} w-auto`}
      />
    </Link>
  );
}
