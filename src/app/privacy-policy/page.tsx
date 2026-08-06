import type { Metadata } from "next";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GVR Automation collects, uses, and protects your information.",
};

const LAST_UPDATED = "TODO: set launch date"; // e.g. "August 5, 2026"

export default function PrivacyPolicyPage() {
  return (
    <SectionContainer background="white" innerClassName="py-20 md:py-28">
      <div className="prose-copy mx-auto">
        <p className="text-caption font-semibold uppercase tracking-wide text-green-hover">
          Legal
        </p>
        <h1 className="mt-2 font-heading text-h2-mobile font-extrabold text-navy">
          Privacy Policy
        </h1>
        <p className="mt-2 text-caption text-ink-secondary">Last Updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-body text-ink">
          <p>
            {siteConfig.name} respects your privacy. This policy explains what information we
            collect, why we collect it, how we protect it, and the choices you have. We
            communicate in plain English on purpose — a business owner should never hesitate to
            share information because they&rsquo;re unsure how it will be used.
          </p>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Information We Collect</h2>
            <p className="mt-3">Information you provide directly, such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name, business name, phone number, email address, and website</li>
              <li>Business information (industry, employee count, years in business, etc.)</li>
              <li>Business Growth Assessment™ responses</li>
              <li>Consultation notes and communication preferences</li>
            </ul>
            <p className="mt-3">Information collected automatically, such as:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Browser and device type, IP address, and cookies</li>
              <li>Pages visited, time on site, and referral source (via analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Why We Collect It</h2>
            <p className="mt-3">We use this information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Provide personalized recommendations and schedule consultations</li>
              <li>Deliver the services you request</li>
              <li>Respond to inquiries and improve customer experience</li>
              <li>Improve our website and platform</li>
              <li>Meet legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Information Sharing</h2>
            <p className="mt-3">
              We do not sell customer information. Information may only be shared with trusted
              service providers required to operate our services — for example, payment
              processing, email and SMS delivery, our CRM platform (GoHighLevel), scheduling
              services, and cloud hosting — or when required by law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Data Security</h2>
            <p className="mt-3">
              We implement reasonable safeguards — including SSL encryption, encrypted forms, and
              access controls — to protect customer information. No online system is completely
              immune from risk, but protecting your information is a priority.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Your Rights</h2>
            <p className="mt-3">You may request to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access the information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Update your communication preferences</li>
              <li>Export your data, where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Third-Party Services</h2>
            <p className="mt-3">
              We use trusted third-party platforms including GoHighLevel (CRM, email, SMS,
              scheduling), Google Analytics, Microsoft Clarity, payment processors, and future AI
              providers. This list is updated as our integrations change.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Children&rsquo;s Privacy</h2>
            <p className="mt-3">
              Our services are intended for business owners and adults. We do not knowingly
              collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Changes to This Policy</h2>
            <p className="mt-3">
              We may update this policy from time to time. The &ldquo;Last Updated&rdquo; date
              above reflects the most recent revision.
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
              <br />
              {siteConfig.url}
            </p>
          </section>
        </div>
      </div>
    </SectionContainer>
  );
}
