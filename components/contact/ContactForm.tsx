"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  Send,
  Tag,
  User,
} from "lucide-react";
import { callables } from "@/lib/firebase/functions";
import { Button } from "@/components/ui/Button";

const SUBJECTS = [
  "General",
  "Support",
  "Billing",
  "Privacy",
  "Partnerships",
  "Press",
] as const;

type Subject = (typeof SUBJECTS)[number];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const fieldBase =
  "block w-full rounded-2xl border border-lavender/50 bg-softLavender/40 text-brandText placeholder:text-brandSecondaryText/60 focus:border-brightPurple focus:outline-none focus:ring-2 focus:ring-brightPurple/20 transition-all";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState<Subject>("General");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const cancelledRef = React.useRef(false);

  React.useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (name.trim().length < 2) {
      next.name = "Please enter your name (at least 2 characters).";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      next.message = "Please add a little more detail (at least 10 characters).";
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      setFormError(null);
      return;
    }

    setSubmitting(true);
    setFormError(null);
    setSubmitted(false);

    try {
      const result = await callables.contactSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject,
        message: message.trim(),
      });

      if (cancelledRef.current) return;

      if (result.status === "ok") {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("General");
        setMessage("");
        setErrors({});
      } else if (result.status === "unconfigured") {
        setFormError(
          "Contact form is temporarily unavailable. Please email support@mindora.app instead."
        );
      } else {
        setFormError(
          "Your message couldn't be sent right now. Please check your connection and try again."
        );
      }
    } catch {
      if (cancelledRef.current) return;
      setFormError(
        "Your message couldn't be sent right now. Please check your connection and try again."
      );
    } finally {
      if (!cancelledRef.current) setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-lavender/50 bg-white p-6 md:p-8 shadow-card">
      <h2 className="text-xl font-semibold text-brandText tracking-tight">
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-brandSecondaryText">
        Fill in the form and we&apos;ll get back to you within 2 business days.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-brandText"
          >
            Name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
              <User className="h-5 w-5" aria-hidden />
            </span>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              placeholder="Your name"
              className={`${fieldBase} h-12 pl-12 pr-4`}
            />
          </div>
          {errors.name && (
            <p id="contact-name-error" className="text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-brandText"
          >
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              placeholder="you@example.com"
              className={`${fieldBase} h-12 pl-12 pr-4`}
            />
          </div>
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-brandText"
          >
            Subject
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-brandSecondaryText">
              <Tag className="h-5 w-5" aria-hidden />
            </span>
            <select
              id="contact-subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className={`${fieldBase} h-12 pl-12 pr-10 appearance-none cursor-pointer`}
            >
              {SUBJECTS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-brandText"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            placeholder="How can we help?"
            className={`${fieldBase} px-4 py-3 resize-y`}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-xs text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            disabled={submitting}
            rightIcon={<Send className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            {submitting ? "Sending…" : "Send message"}
          </Button>
          <span className="text-xs text-brandSecondaryText leading-relaxed">
            This form isn&apos;t monitored for emergencies. If you&apos;re in
            crisis, please contact your local emergency services.
          </span>
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {submitted ? "Your message was received." : ""}
        </div>

        {submitted && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-brightPurple/30 bg-softLavender/70 p-4"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-brightPurple"
              aria-hidden
            />
            <p className="text-sm text-brandText">
              Thank you! Your message was received and our team will reply within
              2 business days.
            </p>
          </div>
        )}

        {formError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
              aria-hidden
            />
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}
      </form>
    </div>
  );
}
