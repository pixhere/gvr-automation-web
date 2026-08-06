import type { Metadata } from "next";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the GVR Automation website and services.",
};

const LAST_UPDATED = "TODO: set launch date";
const GOVERNING_STATE = "Pennsylvania"; // per blueprint Part 9, confirm before launch

export default function TermsOfServicePage() {
  return (
    <SectionContainer background="white" innerClassName="py-20 md:py-28">
      <div className="prose-copy mx-auto">
        <p className="text-caption font-semibold uppercase tracking-wide text-green-hover">Legal</p>
        <h1 className="mt-2 font-heading text-h2-mobile font-extrabold text-navy">
          Terms of Service
        </h1>
        <p className="mt-2 text-caption text-ink-secondary">Last Updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-body text-ink">
          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Scope</h2>
            <p className="mt-3">
              These Terms apply to our website, the Business Growth Assessment™, consultations,
              CRM services, GVR AI Receptionist™, automation services, and future products
              offered by {siteConfig.name}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">No Guaranteed Results</h2>
            <p className="mt-3">
              We help improve business systems. We cannot guarantee revenue, rankings, sales,
              profit, or growth. Every business is different, and results depend on many factors
              outside our control.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Your Responsibilities</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide accurate information</li>
              <li>Participate during onboarding</li>
              <li>Review recommendations</li>
              <li>Maintain access to required accounts</li>
              <li>Communicate changes promptly</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Service Availability</h2>
            <p className="mt-3">
              We make reasonable efforts to maintain service availability. Scheduled maintenance
              may occur, and third-party platforms we depend on may occasionally experience
              interruptions outside of our control.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Intellectual Property</h2>
            <p className="mt-3">
              All {siteConfig.name} branding, documentation, workflows, and original content
              remain the property of {siteConfig.name} unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {siteConfig.name} is not liable for
              indirect, incidental, or consequential damages arising from use of our website or
              services. Our total liability for any claim is limited to the amount paid for the
              service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Governing Law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the Commonwealth of {GOVERNING_STATE},
              without regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Contact Us</h2>
            <p className="mt-3">
              {siteConfig.name}
              <br />
              {siteConfig.contact.email}
              <br />
              {siteConfig.contact.phone}
            </p>
          </section>
        </div>
      </div>
    </SectionContainer>
  );
}
