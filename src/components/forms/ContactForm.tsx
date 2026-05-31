"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Field } from "./Field";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Button } from "@/components/ui/Button";
import { buildMailto } from "@/lib/mailto";
import { site } from "@/content/site";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  inquiry: string;
  message: string;
}

type Errors = Partial<Record<keyof ContactFormState, string>>;

const inquiryOptions = [
  { value: "charter", label: "Charter a flight" },
  { value: "management", label: "Aircraft management" },
  { value: "maintenance", label: "Maintenance / AOG" },
  { value: "general", label: "Something else" },
];

const inquiryLabels: Record<string, string> = {
  charter: "Charter",
  management: "Management",
  maintenance: "Maintenance",
  general: "General",
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form (§15): name, email, phone, inquiry type → routes the request,
 * and a message. Visible labels, --focus ring, --error messaging, and a
 * --success confirmation state (§08/§18).
 */
export function ContactForm({ defaultInquiry = "charter" }: { defaultInquiry?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    inquiry: defaultInquiry,
    message: "",
  });

  const set =
    (key: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Your name, please.";
    if (!form.email.trim()) next.email = "We'll need an email to reply.";
    else if (!emailRe.test(form.email)) next.email = "That email doesn't look right.";
    if (!form.message.trim()) next.message = "How can we help?";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `${inquiryLabels[form.inquiry] ?? "General"} inquiry — ${form.name}`;
    const href = buildMailto(site.email.charter, subject, {
      Inquiry: inquiryLabels[form.inquiry],
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      Message: form.message,
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
        <h2 className="font-display text-h3 font-semibold text-ink">Thank you — message ready.</h2>
        <p className="max-w-measure text-body text-ink-soft">
          We’ve opened your email with the details filled in. Send it and we’ll reply personally.
          For anything urgent, call{" "}
          <a href={site.phone.href} className="tnum font-medium text-saddle underline">
            {site.phone.display}
          </a>{" "}
          — 24/7.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-s5">
      <Field label="Name" name="name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} required />
      <div className="grid gap-s5 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
      </div>
      <Select label="What's this about?" name="inquiry" options={inquiryOptions} value={form.inquiry} onChange={set("inquiry")} />
      <Textarea label="Message" name="message" rows={5} value={form.message} onChange={set("message")} error={errors.message} required />
      <div>
        <Button as="button" type="submit" variant="primary">
          Send message
        </Button>
      </div>
    </form>
  );
}
