"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-input border border-border bg-white px-4 py-3 text-body text-ink placeholder:text-ink-secondary/60 focus-visible:outline-none";

export function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-small font-semibold text-navy">
      {children}
      {optional && <span className="ml-1 font-normal text-ink-secondary">(Optional)</span>}
    </label>
  );
}

export function TextField({
  label,
  optional,
  ...props
}: { label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name;
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <input id={id} className={fieldClasses} {...props} />
    </div>
  );
}

export function TextAreaField({
  label,
  optional,
  ...props
}: { label: string; optional?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = props.id ?? props.name;
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <textarea id={id} rows={4} className={fieldClasses} {...props} />
    </div>
  );
}

export function SelectField({
  label,
  optional,
  options,
  ...props
}: {
  label: string;
  optional?: boolean;
  options: readonly string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = props.id ?? props.name;
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <select id={id} className={cn(fieldClasses, "appearance-none")} {...props}>
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Single-select "radio card" group — large touch targets per the mobile-first rule. */
export function RadioCardGroup({
  label,
  name,
  options,
  value,
  onChange,
  optional,
  columns = 2,
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" }[columns];
  return (
    <fieldset>
      <legend className="mb-3 text-small font-semibold text-navy">
        {label}
        {optional && <span className="ml-1 font-normal text-ink-secondary">(Optional)</span>}
      </legend>
      <div className={cn("grid grid-cols-1 gap-3", colClass)}>
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={cn(
                "flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-input border-2 px-4 py-3 text-small font-semibold transition-all duration-DEFAULT hover:-translate-y-0.5 hover:shadow-sm",
                checked ? "border-green bg-green/5 text-green-hover" : "border-border bg-white text-navy hover:border-navy/30"
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              {opt}
              {checked && <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Multi-select checkbox group with an optional max-selection cap. */
export function CheckboxCardGroup({
  label,
  options,
  values,
  onChange,
  max,
  optional,
  columns = 2,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  max?: number;
  optional?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" }[columns];

  const toggle = (opt: string) => {
    const isSelected = values.includes(opt);
    if (isSelected) {
      onChange(values.filter((v) => v !== opt));
    } else {
      if (max && values.length >= max) return;
      onChange([...values, opt]);
    }
  };

  return (
    <fieldset>
      <legend className="mb-3 text-small font-semibold text-navy">
        {label}
        {max && <span className="ml-1 font-normal text-ink-secondary">(Choose up to {max})</span>}
        {optional && <span className="ml-1 font-normal text-ink-secondary">(Optional)</span>}
      </legend>
      <div className={cn("grid grid-cols-1 gap-3", colClass)}>
        {options.map((opt) => {
          const checked = values.includes(opt);
          const disabled = !checked && !!max && values.length >= max;
          return (
            <label
              key={opt}
              className={cn(
                "flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-input border-2 px-4 py-3 text-small font-semibold transition-all duration-DEFAULT",
                checked
                  ? "border-green bg-green/5 text-green-hover hover:-translate-y-0.5 hover:shadow-sm"
                  : disabled
                    ? "cursor-not-allowed border-border bg-surface-muted text-ink-secondary/50"
                    : "border-border bg-white text-navy hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-sm"
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(opt)}
                className="sr-only"
              />
              {opt}
              {checked && <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Yes / No / Planning Soon row — used across the Business Systems section. */
export function YesNoPlanningRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: "yes" | "no" | "planning") => void;
}) {
  const opts: { value: "yes" | "no" | "planning"; label: string }[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "planning", label: "Planning Soon" },
  ];
  return (
    <div className="flex flex-col items-start justify-between gap-3 border-b border-border py-4 last:border-none sm:flex-row sm:items-center">
      <p className="text-small font-semibold text-navy">{label}</p>
      <div className="flex gap-2">
        {opts.map((opt) => {
          const checked = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={checked}
              className={cn(
                "rounded-pill border-2 px-4 py-2 text-caption font-semibold transition-all duration-DEFAULT hover:-translate-y-0.5 hover:shadow-sm",
                checked ? "border-green bg-green text-white" : "border-border bg-white text-ink-secondary hover:border-navy/30"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Emoji confidence scale — used for "how confident would your business run without you" question. */
export function EmojiScale({
  options,
  value,
  onChange,
}: {
  options: readonly { value: string; emoji: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={checked}
            className={cn(
              "flex flex-col items-center gap-2 rounded-input border-2 px-4 py-5 text-center transition-all duration-DEFAULT hover:-translate-y-0.5 hover:shadow-sm",
              checked ? "border-green bg-green/5" : "border-border bg-white hover:border-navy/30"
            )}
          >
            <span className="text-3xl" aria-hidden="true">
              {opt.emoji}
            </span>
            <span className="text-caption font-semibold text-navy">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
