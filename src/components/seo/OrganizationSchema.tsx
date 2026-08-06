import { siteConfig } from "@/lib/site-config";

/**
 * Organization + LocalBusiness JSON-LD, per Phase 11 (SEO) of the blueprint.
 * Rendered once in the root layout so it applies site-wide.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/logo-full.png`,
        slogan: siteConfig.tagline,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.phoneHref,
          email: siteConfig.contact.email,
          contactType: "customer service",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        image: `${siteConfig.url}/brand/logo-full.png`,
        url: siteConfig.url,
        telephone: siteConfig.contact.phoneHref,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.contact.city,
          addressRegion: siteConfig.contact.state,
          ...(siteConfig.contact.addressLine ? { streetAddress: siteConfig.contact.addressLine } : {}),
        },
        priceRange: "$$",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
