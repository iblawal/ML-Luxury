"use client";

import { useState, useEffect, useCallback } from "react";

// =========================
// Types
// =========================
interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

type ConsentStatus = "pending" | "accepted" | "customized" | "rejected";

// =========================
// Configuration
// =========================
const COOKIE_CONFIG = {
  cookieName: "ml_luxury_cookie_consent",
  cookieExpiry: 365, // days
  colors: {
    background: "#3C2F2F",
    text: "#F6F1E9",
    primary: "#D8A878",
    border: "#6E6458",
  },
};

const COOKIE_CATEGORIES = [
  {
    id: "necessary",
    label: "Necessary Cookies",
    description:
      "Essential for the website to function properly. These cannot be disabled.",
    required: true,
  },
  {
    id: "functional",
    label: "Functional Cookies",
    description:
      "Enable enhanced functionality and personalization, such as language preferences and region settings.",
    required: false,
  },
  {
    id: "analytics",
    label: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
    required: false,
  },
  {
    id: "marketing",
    label: "Marketing Cookies",
    description:
      "Used to track visitors across websites to display relevant advertisements.",
    required: false,
  },
] as const;

// =========================
// Cookie Utilities
// =========================
class CookieManager {
  static setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  static getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  static deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  static saveConsent(preferences: CookiePreferences, status: ConsentStatus): void {
    const consent = {
      status,
      preferences,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    this.setCookie(
      COOKIE_CONFIG.cookieName,
      JSON.stringify(consent),
      COOKIE_CONFIG.cookieExpiry
    );
  }

  static getConsent(): {
    status: ConsentStatus;
    preferences: CookiePreferences;
    timestamp: string;
    version: string;
  } | null {
    const cookie = this.getCookie(COOKIE_CONFIG.cookieName);
    if (!cookie) return null;

    try {
      return JSON.parse(cookie);
    } catch (error) {
      console.error("Failed to parse cookie consent:", error);
      return null;
    }
  }

  static clearConsent(): void {
    this.deleteCookie(COOKIE_CONFIG.cookieName);
  }
}

// =========================
// Component
// =========================
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Check for existing consent on mount
  useEffect(() => {
    const consent = CookieManager.getConsent();
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      setPreferences(consent.preferences);
    }
  }, []);

  // Prevent body scroll when settings modal is open
  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSettings]);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    CookieManager.saveConsent(allAccepted, "accepted");
    setIsVisible(false);
    setShowSettings(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    CookieManager.saveConsent(onlyNecessary, "rejected");
    setIsVisible(false);
    setShowSettings(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    CookieManager.saveConsent(preferences, "customized");
    setIsVisible(false);
    setShowSettings(false);
  }, [preferences]);

  const togglePreference = useCallback((key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
        style={{ backgroundColor: COOKIE_CONFIG.colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#4A3737] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#6E6458]/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <svg
                    className="w-6 h-6 text-[#D8A878] shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: COOKIE_CONFIG.colors.text }}
                    >
                      We Value Your Privacy
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: `${COOKIE_CONFIG.colors.text}E6` }}
                    >
                      We use cookies to enhance your browsing experience, serve
                      personalized content, and analyze our traffic. By clicking
                      "Accept All", you consent to our use of cookies.{" "}
                      <button
                        onClick={openSettings}
                        className="underline hover:text-[#D8A878] transition-colors"
                      >
                        Customize your preferences
                      </button>{" "}
                      or read our{" "}
                      <a
                        href="/privacy"
                        className="underline hover:text-[#D8A878] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: COOKIE_CONFIG.colors.primary,
                    color: COOKIE_CONFIG.colors.text,
                  }}
                >
                  Reject All
                </button>
                <button
                  onClick={openSettings}
                  className="px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: COOKIE_CONFIG.colors.border,
                    color: COOKIE_CONFIG.colors.text,
                  }}
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: COOKIE_CONFIG.colors.primary,
                    color: COOKIE_CONFIG.colors.background,
                  }}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in"
            onClick={closeSettings}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-scale-in">
            <div
              className="bg-[#4A3737] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 border-b"
                style={{ borderColor: `${COOKIE_CONFIG.colors.border}40` }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: COOKIE_CONFIG.colors.text }}
                  >
                    Cookie Preferences
                  </h2>
                  <button
                    onClick={closeSettings}
                    className="p-2 rounded-lg hover:bg-[#6E6458]/30 transition-colors"
                    aria-label="Close settings"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke={COOKIE_CONFIG.colors.text}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: `${COOKIE_CONFIG.colors.text}CC` }}
                >
                  Manage your cookie preferences below. You can enable or disable
                  different types of cookies according to your preferences.
                </p>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {COOKIE_CATEGORIES.map((category) => {
                    const key = category.id as keyof CookiePreferences;
                    return (
                      <div
                        key={category.id}
                        className="p-4 rounded-lg border"
                        style={{ borderColor: `${COOKIE_CONFIG.colors.border}40` }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3
                                className="font-semibold"
                                style={{ color: COOKIE_CONFIG.colors.text }}
                              >
                                {category.label}
                              </h3>
                              {category.required && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: `${COOKIE_CONFIG.colors.primary}20`,
                                    color: COOKIE_CONFIG.colors.primary,
                                  }}
                                >
                                  Required
                                </span>
                              )}
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: `${COOKIE_CONFIG.colors.text}B3` }}
                            >
                              {category.description}
                            </p>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            onClick={() => togglePreference(key)}
                            disabled={category.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878] ${
                              category.required ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            style={{
                              backgroundColor: preferences[key]
                                ? COOKIE_CONFIG.colors.primary
                                : COOKIE_CONFIG.colors.border,
                            }}
                            aria-label={`Toggle ${category.label}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                preferences[key] ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div
                className="p-6 border-t flex flex-col sm:flex-row gap-3"
                style={{ borderColor: `${COOKIE_CONFIG.colors.border}40` }}
              >
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: COOKIE_CONFIG.colors.border,
                    color: COOKIE_CONFIG.colors.text,
                  }}
                >
                  Reject All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: COOKIE_CONFIG.colors.primary,
                    color: COOKIE_CONFIG.colors.background,
                  }}
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
                  style={{
                    backgroundColor: COOKIE_CONFIG.colors.primary,
                    color: COOKIE_CONFIG.colors.background,
                  }}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}