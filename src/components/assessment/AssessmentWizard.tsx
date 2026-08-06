"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  TextField,
  TextAreaField,
  SelectField,
  RadioCardGroup,
  CheckboxCardGroup,
  YesNoPlanningRow,
  EmojiScale,
} from "@/components/assessment/fields";
import { emptyAnswers, type AssessmentAnswers } from "@/types/assessment";
import {
  industries,
  employeeOptions,
  leadSourceOptions,
  monthlyLeadOptions,
  contactMethodOptions,
  phoneAnsweredByOptions,
  missedCallOptions,
  challengeOptions,
  goalOptions,
  afterHoursWorkOptions,
  lastWeekendOffOptions,
  confidenceLeavingOptions,
  systemsChecklist,
} from "@/lib/assessment/options";
import { calculateAssessmentResult } from "@/lib/assessment/scoring";
import { buildGhlPayload } from "@/lib/assessment/ghl-payload";
import {
  saveAssessmentProgress,
  loadAssessmentProgress,
  clearAssessmentProgress,
  RESULT_SESSION_KEY,
} from "@/lib/assessment/storage";
import { siteConfig } from "@/lib/site-config";

const TOTAL_STEPS = 9;

function update<K extends keyof AssessmentAnswers>(
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>,
  key: K,
  value: AssessmentAnswers[K]
) {
  setAnswers((prev) => ({ ...prev, [key]: value }));
}

export function AssessmentWizard() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<AssessmentAnswers>(emptyAnswers);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [restored, setRestored] = React.useState(false);

  // Save & Resume — restore progress on mount.
  React.useEffect(() => {
    const { answers: saved, step: savedStep } = loadAssessmentProgress();
    if (saved) {
      setAnswers(saved);
      setStep(savedStep || 1);
      setRestored(true);
    }
  }, []);

  // Persist on every change once the user has started.
  React.useEffect(() => {
    if (step > 0) saveAssessmentProgress(answers, step);
  }, [answers, step]);

  const goNext = () => {
    setError(null);
    const validationError = validateStep(step, answers);
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const validationError = validateStep(step, answers);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = calculateAssessmentResult(answers);
      const payload = buildGhlPayload(answers, result);

      if (siteConfig.assessment.submitEndpoint) {
        const res = await fetch(siteConfig.assessment.submitEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Submission failed with status ${res.status}`);
      } else {
        // eslint-disable-next-line no-console
        console.warn("[Assessment] No submitEndpoint configured — logging payload instead:", payload);
      }

      try {
        window.sessionStorage.setItem(
          RESULT_SESSION_KEY,
          JSON.stringify({ answers, result })
        );
      } catch {
        /* sessionStorage unavailable — the thank-you page falls back to a generic view */
      }

      clearAssessmentProgress();
      router.push("/thank-you");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Assessment] submission error", err);
      setError("Something went wrong submitting your assessment. Please try again.");
      setSubmitting(false);
    }
  };

  if (step === 0) {
    return <IntroScreen onStart={() => setStep(1)} restored={restored} />;
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      <div className="mt-8">
        {error && (
          <div className="mb-6">
            <Alert tone="danger" role="alert">
              {error}
            </Alert>
          </div>
        )}

        <StepContent step={step} answers={answers} setAnswers={setAnswers} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="text" onClick={goBack} disabled={step === 1}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
        </Button>
        {step < TOTAL_STEPS ? (
          <Button onClick={goNext}>
            Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
              </>
            ) : (
              "Get My FREE Business Growth Score"
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}

function IntroScreen({ onStart, restored }: { onStart: () => void; restored: boolean }) {
  return (
    <Card className="mx-auto max-w-2xl text-center">
      <p className="text-caption font-bold uppercase tracking-wide text-green-hover">
        FREE Business Growth Assessment™
      </p>
      <h1 className="mt-3 font-heading text-h3-mobile md:text-h2-mobile font-extrabold text-navy">
        Let&rsquo;s understand your business first.
      </h1>
      <p className="mx-auto mt-5 max-w-prose text-body text-ink-secondary">
        To help us provide meaningful recommendations, please answer each question as honestly as
        possible. Our goal isn&rsquo;t to sell you software. It&rsquo;s to understand your
        business, identify opportunities for improvement, and determine whether we&rsquo;re the
        right partner to help you grow. Not every business is a fit — and that&rsquo;s okay. If we
        believe we can help, we&rsquo;ll explain how. If not, we&rsquo;ll tell you that too.
      </p>
      <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left text-small text-ink">
        <li>✓ Takes less than 3 minutes</li>
        <li>✓ Personalized recommendations</li>
        <li>✓ No obligation</li>
        <li>✓ Designed specifically for local businesses</li>
      </ul>
      {restored && (
        <p className="mt-4 text-caption text-green-hover">
          We found a saved, in-progress assessment — pick up right where you left off.
        </p>
      )}
      <Button onClick={onStart} className="mt-8">
        Start My Assessment
      </Button>
    </Card>
  );
}

function StepContent({
  step,
  answers,
  setAnswers,
}: {
  step: number;
  answers: AssessmentAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>;
}) {
  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <h2 className="font-heading text-h4-mobile font-bold text-navy">Tell us about your business.</h2>
          <TextField label="Business Name" name="businessName" value={answers.businessName} onChange={(e) => update(setAnswers, "businessName", e.target.value)} />
          <TextField label="Owner Name" name="ownerName" value={answers.ownerName} onChange={(e) => update(setAnswers, "ownerName", e.target.value)} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TextField label="Phone Number" name="phone" type="tel" value={answers.phone} onChange={(e) => update(setAnswers, "phone", e.target.value)} />
            <TextField label="Email" name="email" type="email" value={answers.email} onChange={(e) => update(setAnswers, "email", e.target.value)} />
          </div>
          <TextField label="Website" name="website" optional value={answers.website} onChange={(e) => update(setAnswers, "website", e.target.value)} />
          <SelectField label="Industry" name="industry" options={industries} value={answers.industry} onChange={(e) => update(setAnswers, "industry", e.target.value)} />
          <RadioCardGroup label="Employees" name="employees" options={employeeOptions} value={answers.employees} onChange={(v) => update(setAnswers, "employees", v as AssessmentAnswers["employees"])} columns={4} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <TextField label="Years in Business" name="yearsInBusiness" value={answers.yearsInBusiness} onChange={(e) => update(setAnswers, "yearsInBusiness", e.target.value)} />
            <TextField label="Annual Revenue" name="annualRevenue" optional value={answers.annualRevenue} onChange={(e) => update(setAnswers, "annualRevenue", e.target.value)} />
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <h2 className="font-heading text-h4-mobile font-bold text-navy">How do customers currently find you?</h2>
          <CheckboxCardGroup label="Lead sources" options={leadSourceOptions} values={answers.leadSources} onChange={(v) => update(setAnswers, "leadSources", v)} columns={3} />
          <RadioCardGroup label="Average new leads each month" name="monthlyLeads" options={monthlyLeadOptions} value={answers.monthlyLeads} onChange={(v) => update(setAnswers, "monthlyLeads", v as AssessmentAnswers["monthlyLeads"])} columns={4} />
          <TextField label="Average job value" name="averageJobValue" optional placeholder="$" value={answers.averageJobValue} onChange={(e) => update(setAnswers, "averageJobValue", e.target.value)} />
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <h2 className="font-heading text-h4-mobile font-bold text-navy">How do customers usually contact you?</h2>
          <CheckboxCardGroup label="Contact methods" options={contactMethodOptions} values={answers.contactMethods} onChange={(v) => update(setAnswers, "contactMethods", v)} columns={3} />
          <RadioCardGroup label="Who usually answers the phone?" name="phoneAnsweredBy" options={phoneAnsweredByOptions} value={answers.phoneAnsweredBy} onChange={(v) => update(setAnswers, "phoneAnsweredBy", v as AssessmentAnswers["phoneAnsweredBy"])} columns={4} />
          <RadioCardGroup label="How many calls do you think you miss each week?" name="missedCallsPerWeek" options={missedCallOptions} value={answers.missedCallsPerWeek} onChange={(v) => update(setAnswers, "missedCallsPerWeek", v as AssessmentAnswers["missedCallsPerWeek"])} columns={3} />
          <TextAreaField
            label="If someone contacts you after business hours, what usually happens?"
            name="afterHoursBehavior"
            optional
            placeholder="Tell us more if you'd like — the more context you provide, the better we can understand your situation."
            value={answers.afterHoursBehavior}
            onChange={(e) => update(setAnswers, "afterHoursBehavior", e.target.value)}
          />
        </div>
      );

    case 4:
      return (
        <div>
          <h2 className="font-heading text-h4-mobile font-bold text-navy">Do you currently have:</h2>
          <p className="mt-2 text-small text-ink-secondary">
            No wrong answers here — this just helps us understand what&rsquo;s already working.
          </p>
          <div className="mt-6">
            {systemsChecklist.map(({ key, label }) => (
              <YesNoPlanningRow
                key={key}
                label={label}
                value={answers.systems[key]}
                onChange={(v) =>
                  setAnswers((prev) => ({ ...prev, systems: { ...prev.systems, [key]: v } }))
                }
              />
            ))}
          </div>
        </div>
      );

    case 5:
      return (
        <div className="space-y-6">
          <h2 className="font-heading text-h4-mobile font-bold text-navy">What slows your business down the most?</h2>
          <CheckboxCardGroup label="Choose up to three" options={challengeOptions} values={answers.challenges} onChange={(v) => update(setAnswers, "challenges", v)} max={3} columns={2} />
          <TextAreaField
            label="Elaborate"
            name="challengesElaborate"
            optional
            placeholder="Tell us more if you'd like. The more context you provide, the better we can understand your situation."
            value={answers.challengesElaborate}
            onChange={(e) => update(setAnswers, "challengesElaborate", e.target.value)}
          />
        </div>
      );

    case 6:
      return (
        <div className="space-y-6">
          <h2 className="font-heading text-h4-mobile font-bold text-navy">
            What would make the biggest difference over the next 12 months?
          </h2>
          <CheckboxCardGroup label="Choose up to three" options={goalOptions} values={answers.goals} onChange={(v) => update(setAnswers, "goals", v)} max={3} columns={2} />
          <TextAreaField
            label="Elaborate"
            name="goalsElaborate"
            optional
            value={answers.goalsElaborate}
            onChange={(e) => update(setAnswers, "goalsElaborate", e.target.value)}
          />
        </div>
      );

    case 7:
      return (
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-h4-mobile font-bold text-navy">
              Your Business Should Support Your Life — Not Replace It.
            </h2>
            <p className="mt-2 text-small text-ink-secondary">
              These next questions help us understand how your business affects your daily
              life — not just your operations.
            </p>
          </div>
          <RadioCardGroup label="How often do you work after business hours?" name="afterHoursWork" options={afterHoursWorkOptions} value={answers.afterHoursWork} onChange={(v) => update(setAnswers, "afterHoursWork", v as AssessmentAnswers["afterHoursWork"])} columns={2} />
          <RadioCardGroup
            label="When was the last time you took a full weekend off without checking work?"
            name="lastWeekendOff"
            options={lastWeekendOffOptions}
            value={answers.lastWeekendOff}
            onChange={(v) => update(setAnswers, "lastWeekendOff", v as AssessmentAnswers["lastWeekendOff"])}
            columns={2}
          />
          <div>
            <p className="mb-3 text-small font-semibold text-navy">
              If you stepped away for one week, how confident are you that your business would
              continue running smoothly?
            </p>
            <EmojiScale
              options={confidenceLeavingOptions}
              value={answers.confidenceLeaving}
              onChange={(v) => update(setAnswers, "confidenceLeaving", v as AssessmentAnswers["confidenceLeaving"])}
            />
          </div>
          <TextAreaField
            label="Elaborate"
            name="wellBeingElaborate"
            optional
            placeholder="If there's anything you'd like us to know about your business or the challenges you're facing, feel free to share it here."
            value={answers.wellBeingElaborate}
            onChange={(e) => update(setAnswers, "wellBeingElaborate", e.target.value)}
          />
        </div>
      );

    case 8:
      return (
        <div>
          <h2 className="font-heading text-h4-mobile font-bold text-navy">One Last Question…</h2>
          <p className="mt-2 text-body text-ink-secondary">
            If we could help you solve just one problem in your business over the next 90
            days — what would make the biggest difference for you?
          </p>
          <div className="mt-6">
            <TextAreaField
              label="Your answer"
              name="biggestOpportunity90Days"
              value={answers.biggestOpportunity90Days}
              onChange={(e) => update(setAnswers, "biggestOpportunity90Days", e.target.value)}
            />
          </div>
        </div>
      );

    case 9:
      return (
        <div>
          <h2 className="font-heading text-h4-mobile font-bold text-navy">Almost Done</h2>
          <p className="mt-3 text-small text-ink-secondary">
            Review your answers by clicking Back at any time, or submit below to see your
            Business Growth Score™.
          </p>
          <label className="mt-6 flex items-start gap-3 rounded-input border border-border bg-surface-muted p-4">
            <input
              type="checkbox"
              checked={answers.consent}
              onChange={(e) => update(setAnswers, "consent", e.target.checked)}
              className="mt-1 h-5 w-5 flex-shrink-0 rounded border-border text-green focus-visible:outline-none"
            />
            <span className="text-small text-ink">
              I agree to be contacted regarding my Business Growth Assessment™ and understand
              that my information will be used to provide recommendations and schedule a
              consultation if requested.
            </span>
          </label>
        </div>
      );

    default:
      return null;
  }
}

function validateStep(step: number, a: AssessmentAnswers): string | null {
  switch (step) {
    case 1:
      if (!a.businessName || !a.ownerName || !a.phone || !a.email || !a.industry || !a.employees) {
        return "Please fill in your business name, owner name, phone, email, industry, and team size to continue.";
      }
      if (!/^\S+@\S+\.\S+$/.test(a.email)) return "Please enter a valid email address.";
      return null;
    case 2:
      if (a.leadSources.length === 0 || !a.monthlyLeads) {
        return "Please select at least one lead source and your average monthly leads.";
      }
      return null;
    case 3:
      if (a.contactMethods.length === 0 || !a.phoneAnsweredBy || !a.missedCallsPerWeek) {
        return "Please answer how customers contact you, who answers the phone, and roughly how many calls you miss.";
      }
      return null;
    case 5:
      if (a.challenges.length === 0) return "Please choose at least one challenge.";
      return null;
    case 6:
      if (a.goals.length === 0) return "Please choose at least one goal.";
      return null;
    case 7:
      if (!a.afterHoursWork || !a.lastWeekendOff || !a.confidenceLeaving) {
        return "Please answer all three questions in this section.";
      }
      return null;
    case 8:
      if (!a.biggestOpportunity90Days.trim()) {
        return "Please share what would make the biggest difference for your business.";
      }
      return null;
    case 9:
      if (!a.consent) return "Please confirm you agree to be contacted before submitting.";
      return null;
    default:
      return null;
  }
}
