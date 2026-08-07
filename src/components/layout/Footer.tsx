import * as React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig, primaryCta } from "@/lib/site-config";

const solutionLinks = [
  { label: "AI Receptionist", href: "/ai-receptionist" },
  { label: "CRM & Organization", href: "/solutions#crm" },
  { label: "Websites & Funnels", href: "/solutions#websites" },
  { label: "Chat Widget", href: "/solutions#chat-widget" },
  { label: "Business Growth Assessment", href: "/business-growth-assessment" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Revision #3: footer background lightened ~12% (navy-450 vs the site's
    // base navy) for a softer, more readable footer that still stays inside
    // the brand palette.
    <footer className="bg-navy-450 text-white">
      <div className="container-page py-20">
        {/* Revision #4: centered on mobile (stacked single column), left-
            aligned on desktop exactly as before — text-align cascades to
            headings/paragraphs/links automatically; flex rows below get an
            explicit justify-center to match. */}
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:text-left">
          <div>
            {/* Revision #4 bugfix: brightness-0 + invert was flattening the
                logo's actual gray/green/black artwork into a solid white
                silhouette — unreadable, since this is a multi-tone raster
                logo, not a simple flat icon. Root cause removed: this now
                renders the exact same unmodified asset as the header, just
                larger, sitting on a light chip for contrast against navy. */}
            <div className="inline-flex rounded-input bg-white/90 p-4">
              <Logo variant="wordmark" imgClassName="h-12 w-auto" />
            </div>
            {/* Revision #4: mx-auto centers these width-constrained paragraphs
                as blocks on mobile (matching the centered text inside them);
                md:mx-0 restores the original left-anchored desktop layout. */}
            <p className="mx-auto mt-5 max-w-xs text-small text-white/70 leading-relaxed md:mx-0">
              Helping local businesses automate repetitive work, capture more leads, and grow
              with practical AI solutions.
            </p>
            <p className="mx-auto mt-4 max-w-xs text-caption text-white/50 md:mx-0">
              Based in Harrisburg, PA
              <br />
              Proudly serving local businesses across Pennsylvania and throughout the United
              States.
            </p>
            {/* Revision #2: business hours added to footer per feedback. */}
            <p className="mx-auto mt-4 max-w-xs text-caption text-white/50 md:mx-0">
              Mon&ndash;Fri, 9am&ndash;5pm ET
            </p>
            <div className="mt-6 flex justify-center gap-4 md:justify-start">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  aria-label="GVR Automation on Facebook"
                  className="text-white/60 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  aria-label="GVR Automation on Instagram"
                  className="text-white/60 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  aria-label="GVR Automation on LinkedIn"
                  className="text-white/60 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-caption font-bold uppercase tracking-wide text-white/50">
              Solutions
            </h2>
            <ul className="mt-4 space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-small text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-caption font-bold uppercase tracking-wide text-white/50">
              Company
            </h2>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-small text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-caption font-bold uppercase tracking-wide text-white/50">
              Let&rsquo;s Build Something Better
            </h2>
            <p className="mt-4 text-small text-white/80">
              Book a free strategy session and let&rsquo;s talk about your business.
            </p>
            {/* Revision #4: Button is inline-flex, so it centers automatically
                under the ancestor's text-center on mobile; md:text-left
                restores the original desktop alignment untouched. */}
            <Button href={primaryCta.href} size="sm" className="mt-4">
              Book Strategy Session
            </Button>
            {/* Revision #4: phone/email rows are flex (block-level), so they
                need their own justify-center to match the mobile-centered
                layout, plus a min-h-[44px] tap target so they're easy to tap
                on mobile per the ticket's requirement. */}
            <div className="mt-6 space-y-2 text-small text-white/70">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="flex min-h-[44px] items-center justify-center gap-2 hover:text-white md:justify-start"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex min-h-[44px] items-center justify-center gap-2 hover:text-white md:justify-start"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 text-caption text-white/50 md:flex-row">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
