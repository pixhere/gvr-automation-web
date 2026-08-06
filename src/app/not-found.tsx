import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { primaryCta } from "@/lib/site-config";

export default function NotFound() {
  return (
    <SectionContainer background="muted" innerClassName="py-20 text-center md:py-28">
      <p className="font-heading text-h1-mobile font-extrabold text-navy">404</p>
      <h1 className="mt-4 font-heading text-h3-mobile font-bold text-navy">
        We couldn&rsquo;t find that page.
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-body text-ink-secondary">
        The page you&rsquo;re looking for may have moved. Let&rsquo;s get you back on track.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/">Return Home</Button>
        <Button href={primaryCta.href} variant="secondary">
          {primaryCta.label}
        </Button>
      </div>
    </SectionContainer>
  );
}
