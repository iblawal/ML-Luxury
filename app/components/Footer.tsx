"use client";
import { useState, useCallback } from "react";

// Configuration
const FOOTER_CONFIG = {
  brand: {
    name: "ML",
    fullName: "ML Luxury",
    tagline: "Modern Lifestyle",
    story:
      "Crafting timeless elegance for the modern gentleman. Every piece in our collection tells a story of sophistication, quality, and uncompromising style.",
  },
  quickLinks: [
    { id: "home", label: "Home", href: "/" },
    { id: "shop", label: "Shop", href: "/shop" },
    { id: "collections", label: "Collections", href: "/collections" },
    { id: "account", label: "Account", href: "/account" },
  ],
  support: [
    { id: "help", label: "Help Center", href: "/help" },
    { id: "delivery", label: "Delivery", href: "/delivery" },
    { id: "payments", label: "Payments", href: "/payments" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  social: [
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com",
      icon: "instagram",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/+2347026089954",
      icon: "whatsapp",
    },
    {
      id: "phone",
      label: "Call Us",
      href: "tel:+2349061700017",
      icon: "phone",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:info@mlluxury.com",
      icon: "email",
    },
  ],
  colors: {
    background: "#3C2F2F",
    text: "#F6F1E9",
    heading: "#D8A878",
    border: "#6E6458",
  },
};

interface SocialIconProps {
  icon: string;
  label: string;
}

function SocialIcon({ icon, label }: SocialIconProps) {
  const icons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  };

  return (
    <span aria-label={label}>
      {icons[icon as keyof typeof icons] || icons.instagram}
    </span>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleNavigation = useCallback((href: string) => {
    console.log(`Navigating to: ${href}`);
    // In real app: router.push(href)
  }, []);

  const handleSocialClick = useCallback((href: string, label: string) => {
    console.log(`Opening ${label}: ${href}`);
    // In real app: window.open(href, '_blank')
  }, []);

  const handleSubscribe = useCallback(() => {
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeStatus("error");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
      return;
    }

    setSubscribeStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      console.log("Subscribing email:", email);
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1000);
  }, [email]);

  const handleSubscribeKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubscribe();
      }
    },
    [handleSubscribe]
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#3C2F2F] text-[#F6F1E9] pt-16 pb-6 rounded-t-[50px]"
      style={{ backgroundColor: FOOTER_CONFIG.colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xl"
                style={{
                  borderColor: FOOTER_CONFIG.colors.heading,
                  color: FOOTER_CONFIG.colors.heading,
                }}
              >
                {FOOTER_CONFIG.brand.name}
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: FOOTER_CONFIG.colors.heading }}
                >
                  {FOOTER_CONFIG.brand.fullName}
                </h3>
                <p className="text-sm opacity-80">
                  {FOOTER_CONFIG.brand.tagline}
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed opacity-90"
              style={{ color: FOOTER_CONFIG.colors.text }}
            >
              {FOOTER_CONFIG.brand.story}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: FOOTER_CONFIG.colors.heading }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm hover:text-[#D8A878] transition-colors duration-200 inline-flex items-center group"
                    style={{ color: FOOTER_CONFIG.colors.text }}
                  >
                    <span className="w-0 h-px bg-[#D8A878] transition-all duration-300 group-hover:w-4 group-hover:mr-2" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: FOOTER_CONFIG.colors.heading }}
            >
              Customer Support
            </h4>
            <ul className="space-y-3">
              {FOOTER_CONFIG.support.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm hover:text-[#D8A878] transition-colors duration-200 inline-flex items-center group"
                    style={{ color: FOOTER_CONFIG.colors.text }}
                  >
                    <span className="w-0 h-px bg-[#D8A878] transition-all duration-300 group-hover:w-4 group-hover:mr-2" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ color: FOOTER_CONFIG.colors.heading }}
            >
              Newsletter
            </h4>
            <p className="text-sm mb-4 opacity-90">
              Subscribe to get special offers, style tips, and exclusive updates.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleSubscribeKeyPress}
                  placeholder="Your email address"
                  disabled={subscribeStatus === "loading"}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#F6F1E9]/10 border border-[#6E6458]/30 text-[#F6F1E9] placeholder-[#F6F1E9]/50 focus:outline-none focus:ring-2 focus:ring-[#D8A878] focus:border-transparent transition-all duration-200 text-sm disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={subscribeStatus === "loading" || !email.trim()}
                className="w-full px-4 py-2.5 bg-[#D8A878] text-[#3C2F2F] rounded-lg font-semibold text-sm hover:bg-[#C99868] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {subscribeStatus === "loading" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Subscribing...
                  </>
                ) : subscribeStatus === "success" ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Subscribed!
                  </>
                ) : subscribeStatus === "error" ? (
                  "Invalid Email"
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            backgroundColor: FOOTER_CONFIG.colors.border,
            opacity: 0.2,
          }}
        />

        {/* Social Icons */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-6">
            {FOOTER_CONFIG.social.map((social) => (
              <button
                key={social.id}
                onClick={() => handleSocialClick(social.href, social.label)}
                className="w-10 h-10 rounded-full bg-[#F6F1E9]/10 hover:bg-[#D8A878] text-[#F6F1E9] hover:text-[#3C2F2F] flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D8A878] focus:ring-offset-2 focus:ring-offset-[#3C2F2F]"
                aria-label={`Visit our ${social.label}`}
              >
                <SocialIcon icon={social.icon} label={social.label} />
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            backgroundColor: FOOTER_CONFIG.colors.border,
            opacity: 0.2,
          }}
        />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm opacity-80">
            © {currentYear} {FOOTER_CONFIG.brand.fullName}. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <button
              onClick={() => handleNavigation("/privacy")}
              className="text-xs hover:text-[#D8A878] transition-colors duration-200 opacity-70 hover:opacity-100"
            >
              Privacy Policy
            </button>
            <span className="text-xs opacity-50">•</span>
            <button
              onClick={() => handleNavigation("/terms")}
              className="text-xs hover:text-[#D8A878] transition-colors duration-200 opacity-70 hover:opacity-100"
            >
              Terms of Service
            </button>
            <span className="text-xs opacity-50">•</span>
            <button
              onClick={() => handleNavigation("/cookies")}
              className="text-xs hover:text-[#D8A878] transition-colors duration-200 opacity-70 hover:opacity-100"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}