import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneMissed,
  Clock4,
  DatabaseZap,
  CalendarClock,
  FolderX,
  Users,
  PhoneCall,
  Database,
  Globe,
  MessageSquare,
  ClipboardList,
  Sparkles,
  Building2,
  TrendingUp,
  ArrowRight,
  Target,
  Shield,
  Rocket,
  Handshake,
  Radar,
  Zap,
  ListChecks,
  CalendarCheck,
  RefreshCw,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconCard } from "@/components/ui/IconCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTABanner } from "@/components/ui/CTABanner";
import { HeroDashboardMockup } from "@/components/sections/HeroDashboardMockup";
import { primaryCta, secondaryCta } from "@/lib/site-config";
import {
  problems,
  solutions,
  howItWorks,
  homeFaqs,
  automationCapabilities,
  industries,
} from "@/lib/content/home";

export const metadata: Metadata = {
  title: "AI Growth Platform for Local Service Businesses",
  description:
    "GVR Automation helps local service businesses capture more leads, respond faster, and automate repetitive work. Take the free Business Growth Assessment.",
};

const problemIcons = [PhoneMissed, Clock4, DatabaseZap, CalendarClock, FolderX, Users];
const solutionIcons = [PhoneCall, Database, Globe, MessageSquare, PhoneMissed, ClipboardList];
const capabilityIcons = [Radar, Zap, ListChecks, CalendarCheck, RefreshCw, Coffee];

/** Revision #2: compact repeated primary CTA — "People shouldn't have to
    scroll back to the top." Appears every 2-3 sections down the page. */
function RepeatCta({ label }: { label?: string }) {
  return (
    <div className="rounded-card border-2 border-green/20 bg-green/5 px-6 py-8 text-center sm:px-10">
      <p className="font-heading text-h4-mobile font-bold text-navy">
        {label ?? "See what your business could be missing."}
      </p>
      <Button href={primaryCta.href} className="mt-6">
        {primaryCta.label}
      </Button>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero -- */}
      {/* Revision #1: top padding was pt-16, which the 8px-grid override
          renders as only 16px — the hero was sitting almost flush under the
          nav. Fixed with safe (non-overridden) spacing values throughout. */}
      {/* Revision #4: dropped `overflow-hidden` from the section — the
          decorative gradient below is already pinned to the section's exact
          box via inset-0, so the section-level overflow clip was doing
          nothing except being one more "unnecessary overflow setting." */}
      <section className="relative bg-navy pb-28 pt-20 md:pb-36 md:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(34,197,94,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 40%)",
          }}
        />
        {/* Revision #4: mobile-only rhythm tightened (badge/button/checklist/
            disclaimer margins, and the grid gap) so the Business Growth Score
            preview card comes into view sooner on mobile without requiring
            several scrolls first. Desktop (md:) values are untouched. */}
        <div className="container-page relative grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <Badge tone="green" className="mb-6 md:mb-10">
              AI Growth Platform for Local Businesses
            </Badge>
            <h1 className="text-h1-mobile md:text-h1 font-heading font-extrabold text-white">
              When Every Lead Matters, Your Business Needs More Than Just Another CRM.
            </h1>
            {/* Revision #2: one-line clarity statement so first-time visitors
                immediately know what GVR actually does. */}
            <p className="mt-5 text-small font-semibold text-green">
              AI receptionist, CRM, automation, follow-up systems, and websites that help local
              businesses grow.
            </p>
            <p className="mt-5 max-w-prose text-body text-white/80 leading-relaxed">
              GVR Automation helps local service businesses capture more opportunities, automate
              repetitive work, and free up more time — so you can focus on growing your business
              instead of constantly managing it.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-12">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              {/* Revision #4 bugfix: the `secondary` variant's own bg-white
                  was never overridden here, so white text was rendering on a
                  white background — a completely invisible button. Added
                  !bg-transparent so it reads as an outline button on navy. */}
              <Button
                href={secondaryCta.href}
                variant="secondary"
                className="!border-white !bg-transparent !text-white hover:!bg-white/10"
              >
                {secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-8 flex flex-col gap-3 text-small text-white/80 sm:flex-row sm:gap-10 md:mt-10">
              <li>✓ Takes less than 3 minutes</li>
              <li>✓ Personalized business insights</li>
              <li>✓ No obligation</li>
            </ul>
            <p className="mt-4 max-w-prose text-caption text-white/50 md:mt-6">
              We don&rsquo;t believe in selling software before understanding your business.
              Every recommendation starts with a conversation.
            </p>
          </div>
          <HeroDashboardMockup />
        </div>
      </section>

      {/* ------------------------------------------------------ Trust Bar -- */}
      <SectionContainer background="white" innerClassName="py-14 md:py-20">
        <p className="text-center text-caption font-semibold uppercase tracking-wide text-ink-secondary">
          Trusted technology. Practical business solutions.
        </p>
        {/* Revision #3 bugfix: gap-8 rendered as 8px under the spacing
            override — the opposite of the Revision #2 "increase spacing" fix
            it was meant to be. gap-10 is a safe, genuinely larger value. */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { icon: Sparkles, label: "AI-Powered Automation" },
            { icon: Building2, label: "Built for Local Businesses" },
            { icon: TrendingUp, label: "Focused on Business Growth" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 rounded-input bg-surface-muted px-6 py-6">
              <Icon className="h-5 w-5 text-green-hover" aria-hidden="true" />
              <span className="text-small font-semibold text-navy">{label}</span>
            </div>
          ))}
        </div>
        {/* Revision #1 — trust badge strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-border pt-10">
          {[
            "No Contracts",
            "Free Business Assessment",
            "AI + Human Support",
            "Local Business Specialists",
            "Setup Assistance Included",
          ].map((label) => (
            <span key={label} className="flex items-center gap-2 text-small font-semibold text-navy">
              <span className="text-green-hover">✓</span> {label}
            </span>
          ))}
        </div>
      </SectionContainer>

      {/* -------------------------------------------------------- Problem -- */}
      <SectionContainer background="muted">
        <PageHeader
          eyebrow="The Reality Most Business Owners Face"
          title="Running a business shouldn't mean doing everything yourself."
          description="Most business owners don't struggle because they lack ambition. They struggle because every missed phone call, delayed follow-up, and repetitive task steals time they can never get back. Eventually, growth slows — not because demand disappears, but because the business becomes difficult to manage."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => {
            const Icon = problemIcons[i];
            return (
              <IconCard
                key={problem.title}
                icon={Icon}
                title={problem.title}
                description={problem.description}
                tone="navy-strong"
              />
            );
          })}
        </div>
      </SectionContainer>

      {/* --------------------------------------------- Repeat CTA (1 of 2) -- */}
      <SectionContainer background="white" innerClassName="py-0 pb-16 md:pb-20">
        <RepeatCta />
      </SectionContainer>

      {/* -------------------------------------------------- Why We Exist -- */}
      <SectionContainer background="navy">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2-mobile md:text-h2 font-heading font-extrabold text-white">
            We exist because business owners wear too many hats.
          </h2>
          <div className="mx-auto mt-8 max-w-prose space-y-5 text-body text-white/80">
            <p>
              Behind every business is a person. Sometimes they&rsquo;re also a father. A mother.
              A husband. A wife. A coach. A mentor. A friend.
            </p>
            <p>
              Too often, growing a business comes at the expense of everything else. We believe
              technology should give you more freedom — not more work. That&rsquo;s why GVR
              Automation exists.
            </p>
            <p>
              We&rsquo;re here to help you build a business that runs stronger, responds faster,
              and gives you back time for the people who matter most.
            </p>
          </div>
          <p className="mt-10 font-heading text-body font-semibold text-green">
            We don&rsquo;t succeed unless the businesses we work with succeed. That&rsquo;s what
            partnership means to us.
          </p>
        </div>
      </SectionContainer>

      {/* ---------------------------------------------------- Solutions -- */}
      <SectionContainer background="white">
        <PageHeader
          eyebrow="How We Help"
          title="Business Growth Through Smarter Systems"
          description="We don't start with software. We start by understanding how your business operates today, identifying where time and opportunities are being lost, and recommending practical improvements based on your goals."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => {
            const Icon = solutionIcons[i];
            return (
              <Card key={solution.title} hoverable className="flex h-full flex-col">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-input bg-green/10 text-green-hover">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-h4-mobile font-heading font-bold text-navy">{solution.title}</h3>
                <p className="mt-3 flex-1 text-small text-ink-secondary">{solution.description}</p>
                <Link
                  href={solution.href}
                  className="mt-5 inline-flex items-center gap-1 text-small font-semibold text-green-hover hover:underline"
                >
                  Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            );
          })}
        </div>
      </SectionContainer>

      {/* --------------------------------------- What Automation Can Do -- */}
      <SectionContainer background="navy">
        <PageHeader
          eyebrow="The Payoff"
          title="What Automation Can Do for Your Business"
          description="Less time spent chasing the day-to-day. More time spent on the work that actually grows your business."
          dark
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {automationCapabilities.map((item, i) => {
            const Icon = capabilityIcons[i];
            return (
              <div key={item.title} className="rounded-card bg-white/5 p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-input bg-green/15 text-green">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-h4-mobile font-heading font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-small text-white/70 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* -------------------------------------- Business Growth Assessment -- */}
      {/* Revision #1: horizontal gap reduced ~30% (gap-14→gap-10 at lg) so the
          preview card feels connected to the copy instead of floating; CTA
          moved above the checklist so it reads as the natural next step. */}
      <SectionContainer background="muted">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="mb-4 text-caption font-bold uppercase tracking-wide text-green-hover">
              Business Growth Assessment™
            </p>
            <h2 className="text-h2-mobile font-heading font-extrabold text-navy">
              Discover What&rsquo;s Holding Your Business Back
            </h2>
            <p className="mt-6 text-body text-ink-secondary leading-relaxed">
              Our Business Growth Assessment™ analyzes how your business generates leads,
              communicates with customers, and manages daily operations.
            </p>
            <Button href={primaryCta.href} className="mt-8">
              {primaryCta.label}
            </Button>
            <ul className="mt-8 space-y-3 text-small text-ink">
              <li>✓ Personalized recommendations</li>
              <li>✓ Business Growth Score™</li>
              <li>✓ Areas for improvement</li>
              <li>✓ Estimated time savings</li>
              <li>✓ Suggested next steps</li>
            </ul>
          </div>
          <Card className="mx-auto w-full max-w-md border-t-4 border-green shadow-md">
            <p className="text-caption font-semibold text-ink-secondary">Your Assessment</p>
            <p className="mt-1 font-heading text-h4-mobile font-bold text-navy">Step 6 of 10</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-pill bg-navy/10">
              <div className="h-full w-3/5 rounded-pill bg-green" />
            </div>
            <p className="mt-6 text-small font-semibold text-navy">
              What would make the biggest difference over the next 12 months?
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["More Leads", "More Time", "Better Organization"].map((tag) => (
                <span key={tag} className="rounded-pill border-2 border-green bg-green/5 px-4 py-2 text-caption font-semibold text-green-hover">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </SectionContainer>

      {/* ------------------------------------------------- How It Works -- */}
      <SectionContainer background="white">
        <PageHeader title="How It Works" align="center" />
        <div className="mt-14">
          <Timeline
            steps={howItWorks.map((step, i) => ({ ...step, status: i === 0 ? "current" : "upcoming" }))}
          />
        </div>
      </SectionContainer>

      {/* --------------------------------------------- Repeat CTA (2 of 2) -- */}
      <SectionContainer background="muted" innerClassName="py-0 pb-16 md:pb-20">
        <RepeatCta label="Ready to see where your business stands?" />
      </SectionContainer>

      {/* ------------------------------------------- Business Partner -- */}
      <SectionContainer background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2-mobile font-heading font-extrabold text-navy">
            More Than a Software Provider
          </h2>
          {/* Revision #1: narrower column for easier scanning, more space
              between paragraphs, final sentence highlighted in bold green. */}
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-body text-ink-secondary leading-relaxed">
            <p>
              We&rsquo;re not here to sell you another subscription. We&rsquo;re here to
              understand your business, identify opportunities for improvement, and recommend
              solutions that make sense for your goals.
            </p>
            <p>
              Sometimes that means implementing AI. Sometimes it means improving your follow-up
              process. Sometimes it means doing nothing at all.
            </p>
            <p className="font-heading text-body">
              <span className="font-bold text-green-hover">
                If we&rsquo;re not the right fit, we&rsquo;ll tell you.
              </span>{" "}
              <span className="font-semibold text-navy">That&rsquo;s what business partners do.</span>
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* -------------------------------------------- Why Choose GVR -- */}
      {/* Revision #1: fabricated/placeholder testimonials removed entirely —
          replaced with trust cards until real client feedback exists. */}
      <SectionContainer background="white">
        <PageHeader eyebrow="Why Businesses Choose Us" title="Why Businesses Choose GVR Automation" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <IconCard
            icon={Target}
            title="Personalized Solutions"
            description="No two businesses run the same way — every recommendation is based on how yours actually operates, not a generic package."
            tone="green"
          />
          <IconCard
            icon={Shield}
            title="No Long-Term Contracts"
            description="Stay because it's working, not because you're locked in. We earn the relationship every month."
            tone="green"
          />
          <IconCard
            icon={Rocket}
            title="AI + Human Strategy"
            description="Automation handles the repetitive work — real people guide the strategy behind it."
            tone="green"
          />
          <IconCard
            icon={Handshake}
            title="Built for Local Businesses"
            description="We understand the day-to-day reality of running a local service business, because that's who we build for."
            tone="green"
          />
        </div>
      </SectionContainer>

      {/* --------------------------------------- Built for Businesses -- */}
      <SectionContainer background="muted">
        <PageHeader
          eyebrow="Who We Work With"
          title="Built for Businesses Like Yours"
          description="GVR Automation is built around the day-to-day reality of local service businesses — not generic, one-size-fits-all software."
          align="center"
        />
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-pill border-2 border-border bg-white px-5 py-3 text-small font-semibold text-navy"
            >
              {industry}
            </span>
          ))}
        </div>
      </SectionContainer>

      {/* ------------------------------------------------------------ FAQ -- */}
      <SectionContainer background="muted">
        <PageHeader eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="mx-auto mt-16 max-w-3xl">
          <FAQAccordion items={[...homeFaqs]} />
        </div>
      </SectionContainer>

      {/* -------------------------------------------------------- Final CTA -- */}
      <SectionContainer background="white">
        <CTABanner />
      </SectionContainer>
    </>
  );
}
