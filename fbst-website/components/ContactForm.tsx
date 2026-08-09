"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const REASONS = [
  { value: "support", label: "Support" },
  { value: "referral", label: "Referral" },
  { value: "partnership", label: "Partnership" },
  { value: "funding", label: "Funding" },
  { value: "safeguarding", label: "Safeguarding" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      contact: data.get("contact"),
      reason: data.get("reason"),
      preferredMethod: data.get("preferredMethod"),
      preferredTime: data.get("preferredTime"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      company_website: data.get("company_website"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (res.ok && result.ok) {
        setStatus("success");
        form.reset();
      } else {
        setErrors(result.errors ?? {});
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-baobab/30 bg-baobab/10 p-8 text-center">
        <p className="font-display text-xl font-semibold text-baobab mb-2">
          Thank you for contacting FBST.
        </p>
        <p className="text-ink/80 leading-relaxed max-w-md mx-auto">
          Your message has been received. We will use the safe contact method you selected.
          Please do not send additional sensitive information unless an authorised team
          member requests it through a secure process.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-baobab underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — visually hidden via clipping, not display:none (some bots skip display:none fields) */}
      <div className="sr-only">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Name or preferred name" htmlFor="name" error={errors.name}>
        <input id="name" name="name" type="text" className={inputClass} required maxLength={200} />
      </Field>

      <Field label="Email or safe telephone number" htmlFor="contact" error={errors.contact}>
        <input id="contact" name="contact" type="text" className={inputClass} required maxLength={200} />
      </Field>

      <Field label="Reason for contact" htmlFor="reason" error={errors.reason}>
        <select id="reason" name="reason" className={inputClass} required defaultValue="">
          <option value="" disabled>
            Choose a reason
          </option>
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Preferred and safe contact method" htmlFor="preferredMethod" error={errors.preferredMethod}>
        <input
          id="preferredMethod"
          name="preferredMethod"
          type="text"
          placeholder="e.g. email, phone call, WhatsApp"
          className={inputClass}
          required
          maxLength={100}
        />
      </Field>

      <Field label="Preferred contact time (optional)" htmlFor="preferredTime">
        <input id="preferredTime" name="preferredTime" type="text" className={inputClass} maxLength={100} />
      </Field>

      <Field label="Short message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputClass}
          required
          maxLength={4000}
          placeholder="Do not include unnecessary sensitive information."
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" id="consent" name="consent" className="mt-1 h-4 w-4 accent-baobab" required />
        <span>
          I consent to FBST contacting me using the method above.
          {errors.consent && <span className="block text-baobab-dark font-medium mt-1">{errors.consent}</span>}
        </span>
      </label>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="text-sm text-baobab-dark font-medium">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-full bg-baobab px-7 py-3 text-sm font-semibold text-sand hover:bg-baobab-dark transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-baobab/20 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-baobab outline-none transition-colors";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink/85 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-baobab-dark font-medium">{error}</p>}
    </div>
  );
}
