"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";

const Turnstile = dynamic(() => import("react-turnstile"), {
  ssr: false,
  loading: () => <div className="h-[65px] w-[300px] animate-pulse rounded-lg bg-mist" />,
});

const SERVICE_OPTIONS = [
  { value: "integration", label: "Platform integration" },
  { value: "cloud", label: "Cloud deployment" },
  { value: "development", label: "Solutions development" },
  { value: "consultancy", label: "IT consultancy" },
  { value: "other", label: "Something else" },
] as const;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string>("");
  const [turnstileKey, setTurnstileKey] = useState<number>(0);

  useEffect(() => {
    const handleSelectService = (event: Event) => {
      const customEvent = event as CustomEvent<{ service?: string }>;
      const selected = customEvent.detail?.service;
      if (selected) {
        setFormData((prev) => ({ ...prev, service: selected }));
        setErrors((prev) => {
          if (!prev.service) return prev;
          const next = { ...prev };
          delete next.service;
          return next;
        });
      }
    };

    window.addEventListener("justbecause:select-service", handleSelectService);
    return () => {
      window.removeEventListener("justbecause:select-service", handleSelectService);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setServerError("");
    }
  };

  const selectServicePill = (serviceValue: string) => {
    setFormData((prev) => ({ ...prev, service: serviceValue }));
    if (errors.service) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });
      setServerError("");
    }
  };

  const validate = async () => {
    const { contactFormSchema } = await import("../../../lib/validation");
    const formResult = contactFormSchema.safeParse(formData);
    if (!formResult.success) {
      const newErrors: Record<string, string> = {};
      formResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }

    if (!turnstileToken) {
      setErrors((prev) => ({
        ...prev,
        turnstileToken: "Complete the security check before sending.",
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validate();
    if (!isValid) return;

    if (!turnstileToken) {
      setSubmitStatus("error");
      setServerError("Complete the security check before sending.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setServerError("");

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", service: "", message: "" });
        setTurnstileToken(null);
        setServerError("");
        setTurnstileKey((prev) => prev + 1);
      } else {
        setSubmitStatus("error");
        setTurnstileToken(null);
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setServerError(`Request failed: ${error instanceof Error ? error.message : "Network error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", service: "", message: "" });
    setErrors({});
    setSubmitStatus(null);
    setServerError("");
    setTurnstileToken(null);
    setTurnstileKey((prev) => prev + 1);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/60 transition-colors focus:border-plum focus:outline-none focus:ring-4 focus:ring-plum/10 ${
      hasError ? "border-danger" : "border-ink/45 hover:border-ink/70"
    }`;
  const labelClass = "mb-2 block text-[15px] font-semibold text-ink";
  const errorClass = "mt-2 text-sm text-danger";

  return (
    <ErrorBoundary>
      <div className="rounded-3xl bg-paper p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-10">
        {submitStatus === "success" ? (
          <output className="mb-8 block rounded-2xl border border-teal/25 bg-teal/5 p-5">
            <span className="block font-semibold text-teal">Message sent</span>
            <span className="mt-1 block text-[15px] text-ink/75">
              An engineer will read it and reply within 24 hours.
            </span>
          </output>
        ) : null}

        {submitStatus === "error" ? (
          <div role="alert" className="mb-8 rounded-2xl border border-danger/30 bg-danger/5 p-5">
            <div className="font-semibold text-danger">Your message was not sent</div>
            <div className="mt-1 text-[15px] text-ink/75">
              {serverError ||
                "Check your connection and try again, or email info@justbecause.ph directly."}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-7" noValidate>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass(Boolean(errors.name))}
              />
              {errors.name ? (
                <p id="name-error" className={errorClass}>
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Work email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <p id="email-error" className={errorClass}>
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <fieldset aria-describedby={errors.service ? "service-error" : undefined}>
            <legend className={labelClass}>What do you need help with?</legend>
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_OPTIONS.map((opt) => {
                const selected = formData.service === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectServicePill(opt.value)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${
                      selected
                        ? "border-plum bg-plum text-white"
                        : "border-ink/45 bg-white text-ink/80 hover:border-plum hover:text-plum"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {errors.service ? (
              <p id="service-error" className={errorClass}>
                Choose the closest option.
              </p>
            ) : null}
          </fieldset>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="message" className={labelClass}>
                What are you trying to solve?
              </label>
              <span
                className={`text-sm ${formData.message.length > 500 ? "text-danger" : "text-ink/65"}`}
              >
                {formData.message.length}/500
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="The systems involved, where it hurts, and any deadline."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldClass(Boolean(errors.message))} resize-none`}
            />
            {errors.message ? (
              <p id="message-error" className={errorClass}>
                {errors.message}
              </p>
            ) : null}
          </div>

          <div>
            <Turnstile
              key={turnstileKey}
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
              onVerify={setTurnstileToken}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              theme="light"
            />
            {errors.turnstileToken ? <p className={errorClass}>{errors.turnstileToken}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === "success" || !turnstileToken}
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-plum px-8 py-4 font-semibold text-white transition-colors hover:bg-berry disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending message…
                </>
              ) : (
                "Send message"
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer text-[15px] text-ink/65 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Clear form
            </button>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default ContactForm;
