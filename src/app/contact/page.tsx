import type { Metadata } from "next";
import { Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Harrisburg, PA",
  description:
    "Book a free strategy session or reach GVR Automation by phone, email, or message — serving local service businesses across Pennsylvania and the United States.",
};

export default function ContactPage() {
  return (
    <SectionContainer background="muted" innerClassName="py-20 md:py-28">
      <PageHeader
        eyebrow="Contact"
        title="Let's Talk About Your Business"
        description="Every business is different. Let's have a conversation about your goals and see if GVR Automation is the right partner to help you grow."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <h2 className="font-heading text-h4-mobile font-bold text-navy">Get in Touch</h2>
            <div className="mt-6 space-y-5">
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="flex items-start gap-3 text-small text-ink hover:text-green-hover">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-hover" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-start gap-3 text-small text-ink hover:text-green-hover">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-hover" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-start gap-3 text-small text-ink">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-hover" aria-hidden="true" />
                <div>
                  <p>Monday – Friday</p>
                  <p>9:00 AM – 5:00 PM ET</p>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2 text-caption text-ink-secondary leading-relaxed">
              <p className="font-semibold text-navy">Proudly Based in Harrisburg, Pennsylvania.</p>
              <p>
                We proudly serve local service businesses throughout Central Pennsylvania and
                work with business owners across the United States through remote consultations
                and AI-powered business solutions.
              </p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <ContactForm />
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
}
