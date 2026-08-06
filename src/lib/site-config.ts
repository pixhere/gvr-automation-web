/**
 * GVR Automation — Site Configuration
 * ------------------------------------------------------------------
 * Single source of truth for values that change without a code review:
 * contact info, pricing, external service URLs, and tracking IDs.
 *
 * Per the GVR Development Constitution ("never hard-code values that
 * may change later"), every page pulls from here instead of inlining
 * phone numbers, prices, or embed URLs directly in JSX.
 *
 * ⚠️ PLACEHOLDER VALUES — see /README.md "Before Launch" checklist.
 * Anything marked TODO is not real business data and must be
 * replaced before this site goes live.
 */

export const siteConfig = {
  name: "GVR Automation",
  tagline: "Growth. Value. Results.",
  domain: "gvrautomation.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gvrautomation.com",

  // Confirmed real business contact info (Revision #1).
  contact: {
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "(717) 461-3617",
    phoneHref: process.env.NEXT_PUBLIC_BUSINESS_PHONE_HREF ?? "+17174613617",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "GVRautomation10@gmail.com",
    city: process.env.NEXT_PUBLIC_BUSINESS_CITY ?? "Harrisburg",
    state: process.env.NEXT_PUBLIC_BUSINESS_STATE ?? "PA",
    addressLine: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "", // optional street address for schema markup
  },

  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
  },

  // Booking calendar — GoHighLevel calendar embed URL.
  // TODO: set NEXT_PUBLIC_GHL_CALENDAR_URL once the GHL sub-account calendar is live.
  booking: {
    calendarEmbedUrl: process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ?? "",
  },

  // Assessment submission endpoint — wired to GoHighLevel via a form
  // webhook or the GHL API. See /README.md "Connecting GoHighLevel".
  assessment: {
    submitEndpoint: process.env.NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL ?? "",
  },

  // General contact form endpoint (GoHighLevel inbound webhook, or any
  // form-handling service). See /README.md "Connecting GoHighLevel".
  contactForm: {
    submitEndpoint: process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL ?? "",
  },

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  },
} as const;

export const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryCta = {
  label: "Get My FREE Business Growth Score",
  href: "/business-growth-assessment",
} as const;

export const secondaryCta = {
  label: "See How It Works",
  href: "#how-it-works",
} as const;

/** Revision #2: standardized secondary CTA shown across CTABanner instances sitewide. */
export const secondaryStrategyCta = {
  label: "Book a Free Strategy Session",
  href: "/contact",
} as const;

/**
 * Pricing — GVR Start / Growth / Scale.
 * Revision #2: published, founder-approved pricing per the strategy laid
 * out in the revision feedback — competitive for small local businesses
 * while covering the setup and ongoing support each plan requires.
 */
export const pricingTiers = [
  {
    id: "start",
    name: "GVR Start",
    price: "$297/mo",
    priceNote: "Perfect for solo owners who need to stop missing calls and organize new leads.",
    idealFor: "Solo owners who are missing calls and losing track of leads.",
    features: [
      "AI Receptionist",
      "Missed Call Text-Back",
      "Basic CRM Setup",
      "Contact Management",
      "Appointment Notifications",
      "Professional Setup & Configuration",
      "Email Support",
    ],
    cta: "Talk With Us",
    featured: false,
  },
  {
    id: "growth",
    name: "GVR Growth",
    price: "$697/mo",
    priceNote: "Designed for growing businesses ready to automate their sales process.",
    idealFor: "Growing teams that need automation and organization, not just answering.",
    features: [
      "Everything in Start",
      "Full CRM & Sales Pipeline",
      "Automated Lead Follow-Up",
      "Review Request Automation",
      "Website or Landing Page",
      "Calendar Integration",
      "Monthly Strategy Call",
      "Priority Support",
    ],
    cta: "Talk With Us",
    featured: true,
  },
  {
    id: "scale",
    name: "GVR Scale",
    price: "$1,297/mo",
    priceNote: "Complete automation for established businesses ready to scale.",
    idealFor: "Established businesses ready for full automation and quarterly strategy.",
    features: [
      "Everything in Growth",
      "AI Website Chat Widget",
      "Custom Funnels & Landing Pages",
      "Advanced Workflow Automation",
      "Multi-Location Support",
      "Quarterly Business Reviews",
      "Priority Feature Requests",
      "Dedicated Account Management",
    ],
    cta: "Talk With Us",
    featured: false,
  },
] as const;

/** Shown under the pricing grid — larger custom builds are scoped 1:1. */
export const pricingFootnote =
  "Need something bigger? Custom pricing is available for multi-location or enterprise businesses — we'll scope it together during your strategy session.";

/** AI Receptionist headline price shown on the marketing pages. */
export const aiReceptionistStartingPrice = "$199/month*"; // per blueprint Part 7 — usage-based, confirm final tiering before launch.
