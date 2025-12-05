"use client";
import { useEffect, useState } from "react";

// Configuration object for easy customization
const HERO_CONFIG = {
  content: {
    heading: "Unleash Your Style.",
    subheading: "Premium Men's Fashion.",
    description:
      "Explore exclusive collections crafted with elegance and confidence.",
    discount: "🎉 Enjoy 25% off your first purchase — limited time offer!",
    cta: {
      primary: { text: "Shop Now", href: "/shop" },
      secondary: { text: "Explore Collections", href: "/collections" },
    },
  },
  colors: {
    background: "#F6F1E9",
    text: "#3C2F2F",
    accent: "#F4A460",
    secondary: "#D8A878",
    overlay: "#5A3E2B",
  },
};

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  // --- MOVABLE DISCOUNT TEXT ---
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 80) {
          setDirection(-1);
        } else if (prev <= 0) {
          setDirection(1);
        }
        return prev + direction * 1.2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [direction]);

  const handleCTAClick = (href: string) => {
    console.log(`Navigating to: ${href}`);
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: HERO_CONFIG.colors.background }}
      aria-label="Hero section"
    >
      {/* Background Decorative Elements */}
      <div
        className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: HERO_CONFIG.colors.secondary }}
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: HERO_CONFIG.colors.accent }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT TEXT CONTENT — MOBILE FIRST */}
          <div
            className={`order-1 lg:order-1 space-y-8 transform transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            {/* Headings */}
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ color: HERO_CONFIG.colors.text }}
              >
                {HERO_CONFIG.content.heading}
              </h1>

              <div className="relative inline-block">
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{ color: HERO_CONFIG.colors.text }}
                >
                  {HERO_CONFIG.content.subheading}
                </h1>

                <div
                  className="absolute -bottom-2 left-0 right-0 h-3 -z-10 opacity-30"
                  style={{ backgroundColor: HERO_CONFIG.colors.accent }}
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="text-lg sm:text-xl leading-relaxed max-w-xl opacity-80"
              style={{ color: HERO_CONFIG.colors.overlay }}
            >
              {HERO_CONFIG.content.description}
            </p>

            {/* MOVABLE DISCOUNT BADGE */}
            <div
              className="inline-block px-5 py-3 rounded-xl shadow-md border text-sm sm:text-base font-semibold transition-all"
              style={{
                transform: `translateX(${position}px)`,
                backgroundColor: `${HERO_CONFIG.colors.accent}22`,
                borderColor: `${HERO_CONFIG.colors.accent}55`,
                color: HERO_CONFIG.colors.text,
              }}
            >
              {HERO_CONFIG.content.discount}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => handleCTAClick(HERO_CONFIG.content.cta.primary.href)}
                className="px-8 py-4 font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
                style={{
                  backgroundColor: HERO_CONFIG.colors.text,
                  color: HERO_CONFIG.colors.background,
                }}
              >
                {HERO_CONFIG.content.cta.primary.text}
              </button>

              <button
                onClick={() =>
                  handleCTAClick(HERO_CONFIG.content.cta.secondary.href)
                }
                className="px-8 py-4 border-2 font-semibold rounded-full transform hover:scale-105 transition-all duration-300 text-lg"
                style={{
                  borderColor: HERO_CONFIG.colors.text,
                  color: HERO_CONFIG.colors.text,
                }}
              >
                {HERO_CONFIG.content.cta.secondary.text}
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE GROUP */}
          <div
            className={`order-2 lg:order-2 relative h-auto lg:h-[600px] transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* MOBILE: STACK IMAGES VERTICALLY */}
            <div className="flex flex-col items-center gap-6 lg:hidden">
              <img
                src="/hero-image1.jpg"
                className="w-72 h-96 rounded-2xl object-cover shadow-xl"
              />
              <img
                src="/hero-image2.jpg"
                className="w-64 h-80 rounded-2xl object-cover shadow-xl"
              />
              <img
                src="/hero-image3.jpg"
                className="w-48 h-60 rounded-2xl object-cover shadow-xl"
              />
            </div>

            {/* DESKTOP: ABSOLUTE POSITIONING */}
            <div className="hidden lg:block">
              {/* Large Image */}
              <div className="absolute bottom-0 left-0 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl z-10">
                <img src="/hero-image1.jpg" className="w-full h-full object-cover" />
              </div>

              {/* Secondary */}
              <div className="absolute top-0 right-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl z-30">
                <img src="/hero-image2.jpg" className="w-full h-full object-cover" />
              </div>

              {/* Middle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-60 rounded-2xl overflow-hidden shadow-xl z-20">
                <img src="/hero-image3.jpg" className="w-full h-full object-cover" />
              </div>

              {/* Floating badge */}
              <div className="absolute top-12 left-8 z-40">
                <div
                  className="rounded-full px-5 py-2.5 shadow-lg text-sm font-semibold"
                  style={{
                    backgroundColor: HERO_CONFIG.colors.text,
                    color: HERO_CONFIG.colors.background,
                  }}
                >
                  ✨ Premium Quality
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute bottom-24 right-8 z-40">
                <div className="bg-white rounded-xl shadow-xl p-4 max-w-[140px]">
                  <p className="text-xs font-semibold mb-1">
                    New Arrival
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-lg"
                      style={{ backgroundColor: HERO_CONFIG.colors.accent }}
                    />
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                      <div className="w-3/4 h-2 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      

      
    
  



            {/* Decorative Circle Element */}
            <div
              className="absolute top-20 left-12 w-24 h-24 rounded-full opacity-20 blur-xl"
              style={{ backgroundColor: HERO_CONFIG.colors.accent }}
            />
            <div
              className="absolute bottom-32 right-20 w-32 h-32 rounded-full opacity-20 blur-xl"
              style={{ backgroundColor: HERO_CONFIG.colors.secondary }}
            />
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
