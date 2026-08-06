# GVR Automation — Marketing Website & Business Growth Assessment™

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Built to the GVR Product
Blueprint v1.0 — Phases 0 through 4 (Foundation & Design System, Marketing
Website, Business Growth Assessment™, Thank You / Sales Engine).

## What's in this build

- **Design system** (`tailwind.config.ts`, `src/app/globals.css`) — every color,
  font size, spacing value, radius, and shadow from the Constitution, encoded as
  Tailwind tokens. Fonts (Manrope + Inter) are self-hosted via `@fontsource` —
  no runtime request to Google Fonts, which is both faster and avoids third-party
  tracking pixels.
- **Reusable component library** (`src/components/ui`) — Button, Card, Badge,
  Alert, IconCard, StatCard, PricingCard, TestimonialCard, FAQAccordion, Timeline,
  ProgressBar, SectionContainer, CTABanner, PageHeader.
- **10 marketing pages**: Home, AI Receptionist, Solutions, Pricing, About, FAQ,
  Contact, Privacy Policy, Terms of Service, 404.
- **Business Growth Assessment™** (`/business-growth-assessment`) — a 9-step,
  mobile-first, save-and-resume wizard with a merged scoring engine (see
  `src/lib/assessment/scoring.ts` for the exact rubric and why it's built the way
  it is).
- **Thank You / report page** (`/thank-you`) — shows the Business Growth Score™,
  category breakdown, recommendations, "what happens next" timeline, and a
  calendar booking embed.
- **GoHighLevel Configuration Playbook** (`GHL_PLAYBOOK.md`) — not code, but the
  exact tags/fields/workflows/email/SMS copy to build inside your GHL sub-account
  so submissions actually go somewhere.

## What's intentionally NOT in this build

Per the founder's build-checkpoint decision, **Phase 6 (Client Portal & Business
Dashboard)** is scoped as its own follow-on project — it needs authenticated
logins and a real database, neither of which is specified in the blueprint's tech
stack. Build this site first, get it live, then come back for the portal with a
proper auth/database decision.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before you can see it fully styled

Copy `.env.example` to `.env.local` and fill in real values — the site renders
fine with the placeholders, but pricing, contact info, and integrations won't be
real yet:

```bash
cp .env.example .env.local
```

## Connecting GoHighLevel

1. Follow `GHL_PLAYBOOK.md` top to bottom to build the pipeline, tags, custom
   fields, workflows, and calendars inside your GHL sub-account.
2. Set `NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL` and `NEXT_PUBLIC_CONTACT_WEBHOOK_URL`
   to the inbound webhook URLs GHL gives you.
3. Set `NEXT_PUBLIC_GHL_CALENDAR_URL` to your Business Strategy Session calendar's
   embed URL.
4. Submit one real test assessment on the live site and confirm it lands
   correctly in GHL before considering this connected.

## Before Launch — full checklist

**Business facts still needed (search `TODO` across the codebase for exact
locations):**
- [x] Real pricing for GVR Start / Growth / Scale — published as of Revision #2
- [ ] Real AI Receptionist final pricing beyond "starting at $199/month"
- [ ] Real business phone, email, and city/state (`.env.local`)
- [ ] Confirm governing-law state on `/terms-of-service` (currently Pennsylvania,
      per the blueprint's default)
- [x] Business hours in footer (Mon–Fri, 9am–5pm ET) — added Revision #2;
      update if actual hours differ
- [ ] Business hours on `/contact` page itself (not yet added — only the footer has it)
- [ ] Real founder photo for the "Meet George" section on `/about` — currently
      a placeholder initials avatar (`src/app/about/page.tsx`, search `TODO(founder)`)
- [ ] Founder bio copy on `/about` is a first draft — review/replace with George's
      own words before launch (same `TODO(founder)` spot)
- [ ] Set "Last Updated" dates on `/privacy-policy` and `/terms-of-service`

**Infrastructure:**
- [ ] Domain `gvrautomation.com` pointed at your hosting (see "Deploying" below)
- [ ] SSL enabled (automatic on Vercel)
- [ ] GoHighLevel connected end-to-end (see above)
- [ ] `NEXT_PUBLIC_GA4_ID` and/or `NEXT_PUBLIC_CLARITY_ID` set, if you want
      analytics from day one
- [ ] Add real testimonials once available — as of Revision #2 there are
      intentionally none on the site (no fabricated reviews); the homepage
      "Why Businesses Choose GVR Automation" section uses feature-based trust
      cards instead. `TestimonialCard` is still available in `src/components/ui`
      whenever real client feedback exists.
- [ ] Run `npm run build` locally or let Vercel build it — this repo's dev
      sandbox has a CPU/time constraint that prevented a full production build
      from completing there; `npx tsc --noEmit` and `npx eslint` both pass clean,
      which catches the vast majority of real issues, but a full build on real
      hardware (your machine or Vercel) is the final gate before going live.

## Deploying (Vercel — recommended, matches the blueprint's tech stack)

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. Add all variables from `.env.example` (with real values) in Vercel's Project
   Settings → Environment Variables.
4. Deploy. Point `gvrautomation.com`'s DNS at Vercel per their domain
   instructions (Vercel gives you exact A/CNAME records once you add the domain
   in Project Settings → Domains).

## Project structure

```
src/
  app/                    # routes (App Router)
  components/
    ui/                   # design-system primitives
    layout/                # Header, Footer, Logo, CookieBanner
    sections/              # page-specific composed sections
    assessment/             # assessment form fields, wizard, score gauge
    seo/                    # structured data, analytics
  lib/
    site-config.ts          # single source of truth for contact info, pricing, env-driven URLs
    assessment/              # scoring engine, question options, GHL payload mapping, save/resume
    content/                 # long-form page copy kept out of JSX for readability
  types/
    assessment.ts            # the assessment answer shape
```
