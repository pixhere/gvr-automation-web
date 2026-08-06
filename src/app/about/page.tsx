import type { Metadata } from "next";
import { TrendingUp, Gem, Award, HeartHandshake, Sparkles } from "lucide-react";
import { IconCard } from "@/components/ui/IconCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { CTABanner } from "@/components/ui/CTABanner";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Meet GVR Automation",
  description:
    "Meet the team behind GVR Automation and learn why we help local service business owners automate follow-up, capture more leads, and build businesses that support their lives — not consume them.",
};

const values = [
  { icon: TrendingUp, title: "Growth", description: "We are always improving." },
  { icon: Gem, title: "Value", description: "Every recommendation should create measurable business value." },
  { icon: Award, title: "Results", description: "Success is measured by outcomes, not activity." },
  { icon: HeartHandshake, title: "Partnership", description: "We succeed when our clients succeed." },
  { icon: Sparkles, title: "Simplicity", description: "Complex systems should feel simple to use." },
];

const journey = [
  { title: "Discover GVR", status: "complete" as const },
  { title: "Business Growth Assessment™", status: "complete" as const },
  { title: "Strategy Session", status: "current" as const },
  { title: "Long-Term Partnership", status: "upcoming" as const },
];

export default function AboutPage() {
  return (
    <>
      <SectionContainer background="navy" innerClassName="py-20 md:py-28">
        <PageHeader
          eyebrow="About GVR Automation"
          title="Technology should give business owners more freedom — not more work."
          dark
        />
      </SectionContainer>

      <SectionContainer background="white">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="text-caption font-bold uppercase tracking-wide text-green-hover">Our Mission</p>
            <p className="mt-3 text-body text-ink">
              Help local business owners generate more leads, improve operations, reduce manual
              work, and create businesses that continue growing regardless of economic
              conditions.
            </p>
          </div>
          <div>
            <p className="text-caption font-bold uppercase tracking-wide text-green-hover">Our Vision</p>
            <p className="mt-3 text-body text-ink">
              Become the most trusted AI Growth Platform for local service businesses in the
              United States.
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2-mobile font-heading font-extrabold text-navy">Why We Exist</h2>
          <div className="mx-auto mt-8 max-w-prose space-y-5 text-body text-ink-secondary">
            <p>
              Behind every business is a person — a father, a mother, a spouse, a son or
              daughter carrying responsibilities that extend far beyond work.
            </p>
            <p>
              Too many owners spend evenings answering phones, weekends catching up on paperwork,
              and vacations worrying about what they&rsquo;re missing.
            </p>
            <p className="font-heading font-semibold text-navy">
              We believe success shouldn&rsquo;t require sacrificing the people you built the
              business for. Technology is simply the tool. Freedom is the outcome.
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <PageHeader eyebrow="Core Values" title="What Guides Every Decision" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value) => (
            <IconCard key={value.title} {...value} tone="green" />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer background="muted">
        <div className="mx-auto max-w-3xl">
          <PageHeader eyebrow="Business Philosophy" title="We diagnose before we prescribe." />
          <div className="mt-8 space-y-5 text-body text-ink-secondary">
            <p>
              We never sell software first. We diagnose problems, then prescribe solutions —
              every consultation starts with listening.
            </p>
            <p>
              Think trusted business advisor, not salesperson. If we&rsquo;re not the right fit
              for your business, we&rsquo;ll tell you.
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer background="white">
        <PageHeader eyebrow="Our Process" title="Your Journey With GVR Automation" />
        <div className="mt-14">
          <Timeline steps={journey} />
        </div>
      </SectionContainer>

      {/* Revision #2: "Meet George" founder section — approved by the founder,
          who confirmed a real bio and photo are coming. TODO(founder): replace
          the placeholder initials avatar below with the real photo, and review/
          replace this draft bio copy with your own words before launch. */}
      <SectionContainer background="muted">
        <PageHeader eyebrow="Meet the Founder" title="A Note From George" />
        <Card className="mx-auto mt-14 max-w-3xl">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            {/* TODO(founder): swap for a real headshot (e.g. next/image) once received. */}
            <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-navy text-h3-mobile font-heading font-extrabold text-white">
              G
            </div>
            <div>
              <p className="text-body text-ink-secondary leading-relaxed">
                I started GVR Automation because I watched too many good local business owners
                get buried in the parts of the job nobody talks about — missed calls, cold
                follow-up, and hours lost to admin work instead of the customers and family who
                actually matter.
              </p>
              <p className="mt-4 text-body text-ink-secondary leading-relaxed">
                I don&rsquo;t believe in selling technology for its own sake. I believe in
                understanding how your business actually runs, then recommending only what
                genuinely helps. If we&rsquo;re not the right fit, I&rsquo;ll tell you that too.
              </p>
              <p className="mt-6 font-heading text-body font-bold text-navy">
                George
                <span className="ml-2 font-normal text-ink-secondary">Founder, GVR Automation</span>
              </p>
            </div>
          </div>
        </Card>
      </SectionContainer>

      <SectionContainer background="white">
        <CTABanner />
      </SectionContainer>
    </>
  );
}
