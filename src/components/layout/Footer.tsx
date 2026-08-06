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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            {/* Revision #3: logo bumped up and given its own padded, subtly
                lighter chip so it can't get lost against the footer
                background — addresses the "logo blending in" report. */}
            <div className="inline-flex rounded-input bg-white/10 p-4">
              <Logo variant="wordmark" imgClassName="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="mt-5 max-w-xs text-small text-white/70 leading-relaxed">
              Helping local businesses automate repetitive work, capture more leads, and grow
              with practical AI solutions.
            </p>
            <p className="mt-4 max-w-xs text-caption text-white/50">
              Based in Harrisburg, PA
              <br />
              Proudly serving local businesses across Pennsylvania and throughout the United
              States.
            </p>
            {/* Revision #2: business hours added to footer per feedback. */}
            <p className="mt-4 max-w-xs text-caption text-white/50">
              Mon&ndash;Fri, 9am&ndash;5pm ET
            </p>
            <div className="mt-6 flex gap-4">
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
            <Button href={primaryCta.href} size="sm" className="mt-4">
              Book Strategy Session
            </Button>
            <div className="mt-6 space-y-2 text-small text-white/70">
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-white">
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
