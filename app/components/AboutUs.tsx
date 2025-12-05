"use client";
import { useState, useEffect } from "react";

const COLORS = {
  gold: "#D2A679",
  textDark: "#3C2F2F",
  softBg: "#F9F5F0",
  cardBg: "#ffffff",
};

const STATS = [
  { 
    number: "10+", 
    label: "Years of Excellence", 
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    )
  },
  { 
    number: "5K+", 
    label: "Happy Customers", 
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    number: "100%", 
    label: "Authentic Products", 
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  { 
    number: "24/7", 
    label: "Customer Support", 
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
];

export default function AboutIntro() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("about-intro");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleLearnMore = () => {
    console.log("Navigating to /about");
    // In real app: router.push('/about')
  };

  return (
    <section
      id="about-intro"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: COLORS.softBg }}
    >
      {/* Background Decorative Elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: COLORS.gold }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: COLORS.gold }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 backdrop-blur-sm"
              style={{
                borderColor: COLORS.gold,
                backgroundColor: `${COLORS.gold}15`,
              }}
            >
              <svg className="w-5 h-5" style={{ color: COLORS.gold }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span
                className="text-sm font-semibold"
                style={{ color: COLORS.textDark }}
              >
                Est. 2014 • A Decade of Excellence
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: COLORS.textDark }}
              >
                Your Trusted
                <br />
                <span style={{ color: COLORS.gold }}>Fashion Partner</span>
              </h2>
              <div
                className="h-1 w-24 rounded-full"
                style={{ backgroundColor: COLORS.gold }}
              />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p
                className="text-lg leading-relaxed opacity-90"
                style={{ color: COLORS.textDark }}
              >
                For over <strong>10 years</strong>, ML Luxury has been the
                go-to destination for premium men's fashion. What started as a
                passion project on WhatsApp has evolved into a trusted brand
                serving thousands of style-conscious customers.
              </p>
              <p
                className="text-lg leading-relaxed opacity-90"
                style={{ color: COLORS.textDark }}
              >
                Today, we're proud to bring our expertise to the digital world
                with a seamless online shopping experience. From curated
                collections to personalized service, we remain committed to
                delivering excellence in every interaction.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleLearnMore}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4"
              style={{
                backgroundColor: COLORS.textDark,
                color: COLORS.cardBg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.gold;
                e.currentTarget.style.color = COLORS.textDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.textDark;
                e.currentTarget.style.color = COLORS.cardBg;
              }}
            >
              Learn More About Us
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Right Content - Stats Grid */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  style={{
                    backgroundColor: COLORS.cardBg,
                    border: `2px solid ${COLORS.gold}20`,
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="mb-4 transform group-hover:scale-110 transition-transform"
                    style={{ color: COLORS.gold }}
                  >
                    {stat.icon}
                  </div>

                  {/* Number */}
                  <div
                    className="text-4xl lg:text-5xl font-bold mb-2"
                    style={{ color: COLORS.gold }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <p
                    className="text-sm lg:text-base font-medium opacity-80"
                    style={{ color: COLORS.textDark }}
                  >
                    {stat.label}
                  </p>

                  {/* Hover Effect Border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `3px solid ${COLORS.gold}`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div
              className="mt-8 p-6 rounded-2xl text-center"
              style={{
                backgroundColor: COLORS.cardBg,
                border: `2px solid ${COLORS.gold}20`,
              }}
            >
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-7 h-7"
                    style={{ color: COLORS.gold }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p
                className="text-lg font-semibold mb-1"
                style={{ color: COLORS.textDark }}
              >
                4.9/5 Average Rating
              </p>
              <p
                className="text-sm opacity-70"
                style={{ color: COLORS.textDark }}
              >
                Based on 10,000+ verified reviews
              </p>
            </div>
          </div>
        </div>

        {/* Journey Timeline - Optional */}
        <div
          className={`mt-20 transform transition-all duration-1000 delay-500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <div
            className="rounded-3xl p-8 lg:p-12"
            style={{ backgroundColor: COLORS.cardBg }}
          >
            <h3
              className="text-3xl lg:text-4xl font-bold text-center mb-12"
              style={{ color: COLORS.textDark }}
            >
              Our Journey
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Then */}
              <div className="text-center space-y-4">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.gold}20`, color: COLORS.gold }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4
                  className="text-xl font-bold"
                  style={{ color: COLORS.gold }}
                >
                  2014 - Humble Beginnings
                </h4>
                <p
                  className="opacity-80"
                  style={{ color: COLORS.textDark }}
                >
                  Started with personalized service on WhatsApp, building trust
                  one customer at a time.
                </p>
              </div>

              {/* Now */}
              <div className="text-center space-y-4">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.gold}20`, color: COLORS.gold }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4
                  className="text-xl font-bold"
                  style={{ color: COLORS.gold }}
                >
                  2025 - Digital Evolution
                </h4>
                <p
                  className="opacity-80"
                  style={{ color: COLORS.textDark }}
                >
                  Launching our premium website to serve you better with
                  enhanced shopping experience.
                </p>
              </div>

              {/* Future */}
              <div className="text-center space-y-4">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${COLORS.gold}20`, color: COLORS.gold }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4
                  className="text-xl font-bold"
                  style={{ color: COLORS.gold }}
                >
                  Future - Your Style, Elevated
                </h4>
                <p
                  className="opacity-80"
                  style={{ color: COLORS.textDark }}
                >
                  Continuing to innovate and bring you the finest fashion with
                  unmatched service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}