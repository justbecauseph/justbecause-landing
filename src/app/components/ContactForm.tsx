"use client"

import React, { useState } from "react"
import ErrorBoundary from "./ErrorBoundary"
import Turnstile from "react-turnstile"
import { FaPaperPlane, FaRocket, FaCheckCircle } from "react-icons/fa"
import { contactFormSchema } from "../../../lib/validation"

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string>("")
  const [turnstileKey, setTurnstileKey] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
      setServerError("")
    }
  }

  const validate = () => {
    // First validate the form fields
    const formResult = contactFormSchema.safeParse(formData)
    if (!formResult.success) {
      const newErrors: Record<string, string> = {}
      formResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        newErrors[field] = issue.message
      })
      setErrors(newErrors)
      return false
    }

    // Then validate the turnstile token
    if (!turnstileToken) {
      console.log("Turnstile token missing")
      setErrors((prev) => ({ ...prev, turnstileToken: "Please complete the CAPTCHA" }))
      return false
    }

    console.log("All validation passed")
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")

    console.log("Validation started")
    const isValid = validate()
    console.log("Validation result:", isValid)
    if (!isValid) return

    if (!turnstileToken) {
      console.log("Turnstile token missing")
      setSubmitStatus("error")
      setServerError("Please complete the CAPTCHA")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setServerError("")

    try {
      console.log("Sending request to /api/contact")
      const requestBody = JSON.stringify({
        ...formData,
        turnstileToken,
      })

      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", service: "", message: "" })
        setTurnstileToken(null)
        setServerError("")
        setTurnstileKey((prev) => prev + 1)
      } else {
        setSubmitStatus("error")
        setTurnstileToken(null)
      }
    } catch (error: unknown) {
      console.error("Submission error:", error)
      setSubmitStatus("error")
      setServerError(`Client error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", service: "", message: "" })
    setErrors({})
    setSubmitStatus(null)
    setServerError("")
    setTurnstileToken(null)
    setTurnstileKey((prev) => prev + 1)
  }

  return (
    <ErrorBoundary>
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>

        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white mb-6 border border-white/10">
              <FaRocket className="mr-2 text-purple-400" />
              Ready to Launch Your Project?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Let&apos;s Build Something{" "}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EXTRAORDINARY
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Tell us about your vision and we&apos;ll turn it into reality with cutting-edge technology
            </p>
          </div>

          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 rounded-2xl backdrop-blur-xl flex items-center">
              <FaCheckCircle className="mr-3 text-green-400 text-xl" />
              <div>
                <div className="font-semibold">Message Sent Successfully!</div>
                <div className="text-sm text-green-300/80">We&apos;ll get back to you within 24 hours.</div>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 rounded-2xl backdrop-blur-xl">
              <div className="font-semibold">Oops! Something went wrong</div>
              <div className="text-sm text-red-300/80 mt-1">
                {serverError || "Please try again or contact us directly via email."}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider"
                >
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-xl group-hover:border-white/30 ${errors.name ? "border-red-400/50 focus:ring-red-500/50" : ""}`}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-xl group-hover:border-white/30 ${errors.email ? "border-red-400/50 focus:ring-red-500/50" : ""}`}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="service"
                className="block text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider"
              >
                Service of Interest
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-xl group-hover:border-white/30 appearance-none cursor-pointer ${errors.service ? "border-red-400/50 focus:ring-red-500/50" : ""}`}
                >
                  <option value="" className="bg-black text-white">
                    Select your project type
                  </option>
                  <option value="integration" className="bg-black text-white">
                    Platform Integration
                  </option>
                  <option value="cloud" className="bg-black text-white">
                    Cloud Deployment
                  </option>
                  <option value="development" className="bg-black text-white">
                    Solutions Development
                  </option>
                  <option value="consultancy" className="bg-black text-white">
                    IT Consultancy
                  </option>
                  <option value="other" className="bg-black text-white">
                    Other Inquiries
                  </option>
                </select>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 transform rotate-45"></div>
                </div>
              </div>
              {errors.service && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.service}
                </p>
              )}
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider"
              >
                Project Details
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  className={`w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-xl resize-none group-hover:border-white/30 ${errors.message ? "border-red-400/50 focus:ring-red-500/50" : ""}`}
                ></textarea>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              {errors.message && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <Turnstile
                  key={turnstileKey}
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onVerify={setTurnstileToken}
                  onError={() => setTurnstileToken(null)}
                  onExpire={() => setTurnstileToken(null)}
                  theme="dark"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success" || !turnstileToken}
                className="group relative bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden"
                onClick={() => console.log("Submit button clicked")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Launching Your Request...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Launch Your Project
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="text-white/60 hover:text-white/80 transition-colors duration-300 font-medium px-6 py-2"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default ContactForm
