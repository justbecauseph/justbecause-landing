"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";

const Turnstile = dynamic(() => import("react-turnstile"), {
  ssr: false,
  loading: () => <div className="h-[65px] w-[300px] rounded-lg bg-[#111926]/60 animate-pulse" />,
});

const SERVICE_OPTIONS = [
  { value: "integration", label: "Platform Integration" },
  { value: "cloud", label: "Cloud Deployment" },
  { value: "development", label: "Solutions Development" },
  { value: "consultancy", label: "IT Consultancy" },
  { value: "other", label: "Other Inquiries" },
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
        turnstileToken: "Complete the security verification before sending.",
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
      setServerError("Complete the security verification before sending.");
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

  return (
    <ErrorBoundary>
      <div className="relative rounded-2xl bg-[#0D131C] border border-slate-800/90 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Console header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/90 bg-[#070A0F]/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              CONSOLE // PROJECT BRIEF INTAKE
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400">SLA &lt; 24H RESPONSE</span>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          {submitStatus === "success" ? (
            <output className="mb-8 p-5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 rounded-xl flex items-start gap-3.5">
              <svg
                className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="font-semibold text-sm text-white">Project brief received</div>
                <div className="text-sm text-emerald-200/80 mt-0.5">
                  An engineer from our Manila team will review your requirements and reply within 24
                  hours.
                </div>
              </div>
            </output>
          ) : null}

          {submitStatus === "error" ? (
            <div
              role="alert"
              className="mb-8 p-5 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-xl"
            >
              <div className="font-semibold text-sm text-white">
                Could not deliver your project brief
              </div>
              <div className="text-sm text-rose-200/80 mt-1">
                {serverError ||
                  "Check your connection and try again, or email info@justbecause.ph directly."}
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Rivera"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3 bg-[#070A0F] border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#38BDF8] transition-colors ${
                    errors.name ? "border-rose-500/80" : "border-slate-800 hover:border-slate-700"
                  }`}
                />
                {errors.name ? (
                  <p id="name-error" className="text-rose-400 text-xs font-mono mt-2">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3 bg-[#070A0F] border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#38BDF8] transition-colors ${
                    errors.email ? "border-rose-500/80" : "border-slate-800 hover:border-slate-700"
                  }`}
                />
                {errors.email ? (
                  <p id="email-error" className="text-rose-400 text-xs font-mono mt-2">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="service"
                  className="block font-mono text-xs uppercase tracking-wider text-slate-300"
                >
                  Capability Needed
                </label>
                <span className="font-mono text-[11px] text-slate-500">Select a focus area</span>
              </div>

              {/* Quick-select interactive pills synced with select */}
              <div className="flex flex-wrap gap-2 mb-3">
                {SERVICE_OPTIONS.map((opt) => {
                  const selected = formData.service === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectServicePill(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                        selected
                          ? "bg-[#38BDF8]/15 border-[#38BDF8] text-[#38BDF8]"
                          : "bg-[#070A0F] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  className={`w-full px-4 py-3 bg-[#070A0F] border rounded-xl text-white text-sm focus:outline-none focus:border-[#38BDF8] transition-colors appearance-none cursor-pointer ${
                    errors.service
                      ? "border-rose-500/80"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <option value="" className="bg-[#070A0F] text-slate-400">
                    Select capability area
                  </option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#070A0F] text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {errors.service ? (
                <p id="service-error" className="text-rose-400 text-xs font-mono mt-2">
                  {errors.service}
                </p>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-slate-300"
                >
                  System Context &amp; Goals
                </label>
                <span
                  className={`font-mono text-xs ${
                    formData.message.length > 500 ? "text-rose-400" : "text-slate-500"
                  }`}
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
                placeholder="Describe the systems you want to connect, target cloud environment, timeline, or current bottleneck..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full px-4 py-3 bg-[#070A0F] border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#38BDF8] transition-colors resize-none ${
                  errors.message ? "border-rose-500/80" : "border-slate-800 hover:border-slate-700"
                }`}
              />
              {errors.message ? (
                <p id="message-error" className="text-rose-400 text-xs font-mono mt-2">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="pt-1">
              <div className="inline-flex p-3 bg-[#070A0F] rounded-xl border border-slate-800/90">
                <Turnstile
                  key={turnstileKey}
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onVerify={setTurnstileToken}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                  theme="dark"
                />
              </div>
              {errors.turnstileToken ? (
                <p className="text-rose-400 text-xs font-mono mt-2">{errors.turnstileToken}</p>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success" || !turnstileToken}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#38BDF8] hover:bg-[#2DD4BF] text-[#070A0F] font-semibold py-3.5 px-7 rounded-xl text-sm transition-all duration-200 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_28px_rgba(56,189,248,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#070A0F]/30 border-t-[#070A0F] rounded-full animate-spin" />
                    <span>Sending Project Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Send Project Brief</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="text-slate-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider px-4 py-2 cursor-pointer"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ContactForm;
