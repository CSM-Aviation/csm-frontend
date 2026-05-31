"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Field } from "./Field";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { FormProgress } from "./FormProgress";
import { Button } from "@/components/ui/Button";
import { buildMailto } from "@/lib/mailto";
import { site } from "@/content/site";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/api/fleet";

type Variant = "quote" | "trip";

interface RequestFormProps {
  variant: Variant;
  defaultCategory?: string;
  defaultAircraft?: string;
}

interface FormState {
  tripType: string;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  category: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const STEPS = ["Route & dates", "Passengers", "Contact"];

const categoryOptions = [
  { value: "", label: "Not sure yet" },
  ...CATEGORY_ORDER.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RequestForm({ variant, defaultCategory = "", defaultAircraft }: RequestFormProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormState>({
    tripType: "one-way",
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: "",
    category: defaultCategory,
    notes: defaultAircraft ? `Interested in aircraft ref: ${defaultAircraft}` : "",
    name: "",
    email: "",
    phone: "",
  });

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function validateStep(index: number): boolean {
    const next: Errors = {};
    if (index === 0) {
      if (!form.from.trim()) next.from = "Where are you departing from?";
      if (!form.to.trim()) next.to = "Where are you headed?";
      if (!form.departDate) next.departDate = "Pick a departure date.";
      if (form.tripType === "round" && !form.returnDate)
        next.returnDate = "Pick a return date.";
    }
    if (index === 1) {
      if (!form.passengers.trim()) next.passengers = "How many passengers?";
      else if (Number(form.passengers) < 1) next.passengers = "At least one passenger.";
    }
    if (index === 2) {
      if (!form.name.trim()) next.name = "Your name, please.";
      if (!form.email.trim()) next.email = "We'll need an email to reply.";
      else if (!emailRe.test(form.email)) next.email = "That email doesn't look right.";
      if (!form.phone.trim()) next.phone = "A phone number for 24/7 reach.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    // Final step — compose the request as a prefilled email and confirm.
    const subject = `${variant === "quote" ? "Quote" : "Trip"} request — ${form.from || "?"} → ${form.to || "?"}`;
    const href = buildMailto(site.email.charter, subject, {
      "Trip type": form.tripType === "round" ? "Round trip" : "One way",
      From: form.from,
      To: form.to,
      Departing: form.departDate,
      Returning: form.tripType === "round" ? form.returnDate : undefined,
      Passengers: form.passengers,
      "Aircraft preference": form.category ? CATEGORY_LABELS[form.category as keyof typeof CATEGORY_LABELS] : undefined,
      Notes: form.notes,
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
    });
    if (typeof window !== "undefined") window.location.href = href;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-s4 rounded-lg border border-success bg-fog-raised p-s7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-paper-on-dark">
          <Check size={24} strokeWidth={2} />
        </span>
        <h2 className="font-display text-h3 font-semibold text-ink">Request on its way.</h2>
        <p className="max-w-measure text-body text-ink-soft">
          We’ve opened your email with the details filled in — send it and a specialist will
          respond personally, day or night. Prefer to talk now? Call{" "}
          <a href={site.phone.href} className="tnum font-medium text-saddle underline">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const isLast = step === STEPS.length - 1;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-s7">
      <FormProgress steps={STEPS} current={step} />

      {step === 0 && (
        <div className="flex flex-col gap-s5">
          <Select
            label="Trip type"
            name="tripType"
            options={[
              { value: "one-way", label: "One way" },
              { value: "round", label: "Round trip" },
            ]}
            value={form.tripType}
            onChange={set("tripType")}
          />
          <div className="grid gap-s5 sm:grid-cols-2">
            <Field label="From" name="from" placeholder="City or airport" value={form.from} onChange={set("from")} error={errors.from} required />
            <Field label="To" name="to" placeholder="City or airport" value={form.to} onChange={set("to")} error={errors.to} required />
          </div>
          <div className="grid gap-s5 sm:grid-cols-2">
            <Field label="Departure" name="departDate" type="date" value={form.departDate} onChange={set("departDate")} error={errors.departDate} required />
            {form.tripType === "round" && (
              <Field label="Return" name="returnDate" type="date" value={form.returnDate} onChange={set("returnDate")} error={errors.returnDate} required />
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-s5">
          <div className="grid gap-s5 sm:grid-cols-2">
            <Field label="Passengers" name="passengers" type="number" min={1} inputMode="numeric" value={form.passengers} onChange={set("passengers")} error={errors.passengers} required />
            <Select label="Aircraft preference" name="category" options={categoryOptions} value={form.category} onChange={set("category")} hint="We'll recommend if you're unsure." />
          </div>
          <Textarea label="Anything we should know?" name="notes" rows={4} placeholder="Special requests, flexibility, medical/cargo needs…" value={form.notes} onChange={set("notes")} />
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-s5">
          <Field label="Name" name="name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} required />
          <div className="grid gap-s5 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} required />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} error={errors.phone} required />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-s4">
        {step > 0 ? (
          <Button as="button" type="button" variant="text" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button as="button" type="submit" variant="primary">
          {isLast ? (variant === "quote" ? "Request a Quote" : "Plan a Trip") : "Continue"}
        </Button>
      </div>
    </form>
  );
}
