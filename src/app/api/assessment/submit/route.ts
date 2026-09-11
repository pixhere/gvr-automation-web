import { NextRequest, NextResponse } from "next/server";
import { buildGhlPayload } from "@/lib/assessment/ghl-payload";
import { siteConfig } from "@/lib/site-config";
import type { AssessmentAnswers, AssessmentResult } from "@/types/assessment";

export const runtime = "nodejs";

/**
 * Receives a completed Business Growth Assessment from the client and
 * forwards it server-side to the GoHighLevel inbound webhook
 * (NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL). GHL owns notifying the founder
 * (email/SMS) via its own workflow — see GHL_PLAYBOOK.md §5, step 9
 * ("Internal notification"). Posting through this route instead of
 * straight from the client keeps the payload-building logic in one place
 * and gives us a spot to log failures server-side instead of losing leads
 * silently.
 */
export async function POST(req: NextRequest) {
  let body: { answers: AssessmentAnswers; result: AssessmentResult };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { answers, result } = body;
  if (!answers || !result) {
    return NextResponse.json({ ok: false, error: "Missing answers or result" }, { status: 400 });
  }

  const payload = buildGhlPayload(answers, result);
  const webhookUrl = siteConfig.assessment.submitEndpoint;

  if (!webhookUrl) {
    console.error(
      "[Assessment API] LEAD NOT DELIVERED — NEXT_PUBLIC_ASSESSMENT_WEBHOOK_URL is not set. " +
        "See README.md \"Connecting GoHighLevel\". Full payload:",
      JSON.stringify(payload)
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(
        `[Assessment API] GHL webhook responded ${res.status}. Full payload:`,
        JSON.stringify(payload)
      );
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[Assessment API] GHL webhook threw:", err, "Full payload:", JSON.stringify(payload));
    return NextResponse.json({ ok: true, delivered: false });
  }
}
