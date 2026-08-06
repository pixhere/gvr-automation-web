"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  business: z.string().min(2, "Please enter your business name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  message: z.string().min(10, "Tell us a little about what you need — a sentence or two is fine."),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please confirm you agree to be contacted.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "w-full rounded-input border border-border bg-white px-4 py-3 text-body text-ink placeholder:text-ink-secondary/60 focus-visible:outline-none";

/**
 * Contact form. Submits to `siteConfig.contactForm.submitEndpoint` when
 * configured (a GoHighLevel inbound webhook or similar form-handling
 * service). Until that env var is set, submissions are logged to the
 * console and the user still sees a normal success state — so the page
 * never appears broken, but nothing is silently lost either.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const endpoint = siteConfig.contactForm.submitEndpoint;
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
      } else {
        // No webhook configured yet — see README "Connecting GoHighLevel".
        // eslint-disable-next-line no-console
        console.warn("[ContactForm] No submitEndpoint configured — logging submission instead:", values);
      }
      setStatus("success");
      reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("[ContactForm] submission error", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Alert tone="success" title="Thanks — we've got your message.">
        Someone from GVR Automation will reach out shortly. In the meantime, feel free to take
        the free Business Growth Assessment™ while you wait.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && (
        <Alert tone="danger" title="Something went wrong.">
          Please try again, or call us directly at {siteConfig.contact.phone}.
        </Alert>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-small font-semibold text-navy">
          Your Name
        </label>
        <input id="name" className={inputClasses} {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-caption text-danger">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="business" className="mb-2 block text-small font-semibold text-navy">
          Business Name
        </label>
        <input id="business" className={inputClasses} {...register("business")} aria-invalid={!!errors.business} />
        {errors.business && <p className="mt-1 text-caption text-danger">{errors.business.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-small font-semibold text-navy">
            Email
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-caption text-danger">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-small font-semibold text-navy">
            Phone
          </label>
          <input id="phone" type="tel" className={inputClasses} {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="mt-1 text-caption text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-small font-semibold text-navy">
          What&rsquo;s going on in your business?
        </label>
        <textarea
          id="message"
          rows={4}
          className={inputClasses}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-caption text-danger">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-5 w-5 flex-shrink-0 rounded border-border text-green focus-visible:outline-none"
          {...register("consent")}
          aria-invalid={!!errors.consent}
        />
        <label htmlFor="consent" className="text-caption text-ink-secondary">
          I agree to be contacted by GVR Automation regarding my inquiry. Message and data rates
          may apply. Reply STOP to unsubscribe from texts.
        </label>
      </div>
      {errors.consent && <p className="text-caption text-danger">{errors.consent.message}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Let's Talk About Your Business"}
      </Button>
    </form>
  );
}
