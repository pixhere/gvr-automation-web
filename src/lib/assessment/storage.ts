import type { AssessmentAnswers } from "@/types/assessment";

const ANSWERS_KEY = "gvr-assessment-answers";
const STEP_KEY = "gvr-assessment-step";
export const RESULT_SESSION_KEY = "gvr-assessment-result";

/** Save & Resume: persist in-progress answers to localStorage until submission. */
export function saveAssessmentProgress(answers: AssessmentAnswers, step: number) {
  try {
    window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    window.localStorage.setItem(STEP_KEY, String(step));
  } catch {
    /* localStorage unavailable — degrade gracefully, don't block the form */
  }
}

export function loadAssessmentProgress(): { answers: AssessmentAnswers | null; step: number } {
  try {
    const raw = window.localStorage.getItem(ANSWERS_KEY);
    const step = Number(window.localStorage.getItem(STEP_KEY) ?? 0);
    return { answers: raw ? (JSON.parse(raw) as AssessmentAnswers) : null, step: Number.isFinite(step) ? step : 0 };
  } catch {
    return { answers: null, step: 0 };
  }
}

export function clearAssessmentProgress() {
  try {
    window.localStorage.removeItem(ANSWERS_KEY);
    window.localStorage.removeItem(STEP_KEY);
  } catch {
    /* noop */
  }
}
