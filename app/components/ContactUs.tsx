"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormState = "idle" | "validating" | "submitting" | "success" | "error";


const CONTACT_CONFIG = {
  colors: {
    background: "#F3EDE4",
    cardBackground: "#FFFFFF",
    primary: "#3C2F2F",
    secondary: "#D8A878",
    text: "#3C2F2F",
    textLight: "#6E6458",
    border: "#D2A679",
    error: "#DC2626",
    success: "#059669",
  },
  contactInfo: [
    {
      id: "email",
      icon: "email",
      label: "Email Us",
      value: "support@mlluxury.com",
      href: "mailto:support@mlluxury.com",
    },
    {
      id: "phone",
      icon: "phone",
      label: "Call Us",
      value: "+234 123 456 7890",
      href: "tel:+2341234567890",
    },
    {
      id: "location",
      icon: "location",
      label: "Visit Us",
      value: "Lagos, Nigeria",
      href: "#",
    },
  ],
  subjects: [
    "General Inquiry",
    "Order Support",
    "Product Question",
    "Partnership",
    "Feedback",
    "Other",
  ],
};


class FormValidator {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true; 
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  static validateRequired(value: string, minLength: number = 1): boolean {
    return value.trim().length >= minLength;
  }

  static validate(data: ContactFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.validateRequired(data.name, 2)) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!this.validateEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (data.phone && !this.validatePhone(data.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!this.validateRequired(data.subject)) {
      errors.subject = "Please select a subject";
    }

    if (!this.validateRequired(data.message, 10)) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  }
}


function ContactIcon({ type }: { type: string }) {
  const icons = {
    email: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    phone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    location: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return icons[type as keyof typeof icons] || icons.email;
}

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("validating");
    setErrors({});
    setApiError("");

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Client-side validation
    const validationErrors = FormValidator.validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormState("idle");
      return;
    }

    setFormState("submitting");

    try {
      // API call simulation
      await new Promise((resolve, reject) => {
        setTimeout(() => { 
          resolve(true);
        }, 2000);
      });

      // Success
      setFormState("success");
      formRef.current?.reset();
      
    
      setTimeout(() => {
        setFormState("idle");
      }, 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      setFormState("error");
      setApiError(
        error instanceof Error 
          ? error.message 
          : "Failed to send message. Please try again or contact us directly."
      );
      
      
      setTimeout(() => {
        setFormState("idle");
        setApiError("");
      }, 5000);
    }
  }, []);

  const isSubmitting = formState === "validating" || formState === "submitting";

  return (
    <section 
      className="w-full py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: CONTACT_CONFIG.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-4xl font-extrabold mb-4"
            style={{ color: CONTACT_CONFIG.colors.primary }}
          >
            Get in Touch
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: CONTACT_CONFIG.colors.textLight }}
          >
            Have a question or need assistance? We're here to help. Reach out to our team and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: CONTACT_CONFIG.colors.primary }}
              >
                Contact Information
              </h3>
              <p 
                className="text-sm mb-8"
                style={{ color: CONTACT_CONFIG.colors.textLight }}
              >
                Feel free to reach out through any of these channels. We're available to assist you.
              </p>
            </div>

            {CONTACT_CONFIG.contactInfo.map((info) => (
              <a
                key={info.id}
                href={info.href}
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md group"
                style={{ 
                  backgroundColor: CONTACT_CONFIG.colors.cardBackground,
                  borderWidth: '1px',
                  borderColor: `${CONTACT_CONFIG.colors.border}40`,
                }}
              >
                <div 
                  className="p-3 rounded-lg transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${CONTACT_CONFIG.colors.secondary}20`,
                    color: CONTACT_CONFIG.colors.secondary,
                  }}
                >
                  <ContactIcon type={info.icon} />
                </div>
                <div className="flex-1">
                  <p 
                    className="text-sm font-medium mb-1"
                    style={{ color: CONTACT_CONFIG.colors.textLight }}
                  >
                    {info.label}
                  </p>
                  <p 
                    className="font-semibold group-hover:text-[#D8A878] transition-colors"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl shadow-lg"
              style={{ 
                backgroundColor: CONTACT_CONFIG.colors.cardBackground,
                borderWidth: '1px',
                borderColor: `${CONTACT_CONFIG.colors.border}40`,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="name"
                    className="text-sm font-semibold"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: CONTACT_CONFIG.colors.background,
                      borderWidth: '2px',
                      borderColor: errors.name ? CONTACT_CONFIG.colors.error : `${CONTACT_CONFIG.colors.border}60`,
                      color: CONTACT_CONFIG.colors.primary,
                    }}
                    placeholder=""
                  />
                  {errors.name && (
                    <p className="text-xs" style={{ color: CONTACT_CONFIG.colors.error }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="email"
                    className="text-sm font-semibold"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: CONTACT_CONFIG.colors.background,
                      borderWidth: '2px',
                      borderColor: errors.email ? CONTACT_CONFIG.colors.error : `${CONTACT_CONFIG.colors.border}60`,
                      color: CONTACT_CONFIG.colors.primary,
                    }}
                    placeholder="your@email"
                  />
                  {errors.email && (
                    <p className="text-xs" style={{ color: CONTACT_CONFIG.colors.error }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="phone"
                    className="text-sm font-semibold"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: CONTACT_CONFIG.colors.background,
                      borderWidth: '2px',
                      borderColor: errors.phone ? CONTACT_CONFIG.colors.error : `${CONTACT_CONFIG.colors.border}60`,
                      color: CONTACT_CONFIG.colors.primary,
                    }}
                    placeholder="+234"
                  />
                  {errors.phone && (
                    <p className="text-xs" style={{ color: CONTACT_CONFIG.colors.error }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="subject"
                    className="text-sm font-semibold"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: CONTACT_CONFIG.colors.background,
                      borderWidth: '2px',
                      borderColor: errors.subject ? CONTACT_CONFIG.colors.error : `${CONTACT_CONFIG.colors.border}60`,
                      color: CONTACT_CONFIG.colors.primary,
                    }}
                  >
                    <option value="">Select a subject</option>
                    {CONTACT_CONFIG.subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-xs" style={{ color: CONTACT_CONFIG.colors.error }}>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label 
                    htmlFor="message"
                    className="text-sm font-semibold"
                    style={{ color: CONTACT_CONFIG.colors.primary }}
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: CONTACT_CONFIG.colors.background,
                      borderWidth: '2px',
                      borderColor: errors.message ? CONTACT_CONFIG.colors.error : `${CONTACT_CONFIG.colors.border}60`,
                      color: CONTACT_CONFIG.colors.primary,
                    }}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="text-xs" style={{ color: CONTACT_CONFIG.colors.error }}>
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: CONTACT_CONFIG.colors.primary,
                    color: CONTACT_CONFIG.colors.background,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {formState === "validating" ? "Validating..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Success Message */}
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg flex items-start gap-3"
                  style={{ 
                    backgroundColor: `${CONTACT_CONFIG.colors.success}15`,
                    borderWidth: '1px',
                    borderColor: CONTACT_CONFIG.colors.success,
                  }}
                >
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: CONTACT_CONFIG.colors.success }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: CONTACT_CONFIG.colors.success }}>
                      Message sent successfully!
                    </p>
                    <p className="text-sm mt-1" style={{ color: CONTACT_CONFIG.colors.textLight }}>
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {formState === "error" && apiError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg flex items-start gap-3"
                  style={{ 
                    backgroundColor: `${CONTACT_CONFIG.colors.error}15`,
                    borderWidth: '1px',
                    borderColor: CONTACT_CONFIG.colors.error,
                  }}
                >
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: CONTACT_CONFIG.colors.error }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: CONTACT_CONFIG.colors.error }}>
                      Failed to send message
                    </p>
                    <p className="text-sm mt-1" style={{ color: CONTACT_CONFIG.colors.textLight }}>
                      {apiError}
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}