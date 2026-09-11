import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

interface ContactSubmission {
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Receives a general Contact form submission and forwards it server-side
 * to the GoHighLevel inbound webhook (NEXT_PUBLIC_CONTACT_WEBHOOK_URL).
 * See /README.md "Connecting GoHighLevel" and the assessment route for
 * the same pattern.
 */
export async function POST(req: NextRequest) {
  let values: ContactSubmission;
  try {
    values = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!values?.email || !values?.name) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const webhookUrl = siteConfig.contactForm.submitEndpoint;

  if (!webhookUrl) {
    console.error(
      "[Contact API] SUBMISSION NOT DELIVERED — NEXT_PUBLIC_CONTACT_WEBHOOK_URL is not set. " +
        "See README.md \"Connecting GoHighLevel\". Full payload:",
      JSON.stringify(values)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      console.error(
        `[Contact API] GHL webhook responded ${res.status}. Full payload:`,
        JSON.stringify(values)
      );
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[Contact API] GHL webhook threw:", err, "Full payload:", JSON.stringify(values));
    return NextResponse.json({ ok: true, delivered: false });
  }
}
