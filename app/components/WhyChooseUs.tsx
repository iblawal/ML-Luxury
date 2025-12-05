"use client";
import React from "react";
import type { JSX } from "react";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: JSX.Element;
};

const COLORS = {
  gold: "#D2A679",
  textDark: "#3C2F2F",
  softBg: "#F9F5F0",
  cardBg: "#ffffff",
};

export default function WhyChooseUs() {
  const items: Feature[] = [
    {
      id: "f1",
      title: "Premium Quality",
      desc: "Hand-selected materials and precision craftsmanship for pieces that last.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={COLORS.gold}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L14.09 8.26H20.66L15.28 12.14L17.36 18.4L12 14.52L6.64 18.4L8.72 12.14L3.34 8.26H9.91L12 2Z" />
        </svg>
      ),
    },

    {
      id: "f2",
      title: "Fast & Tracked Delivery",
      desc: "Reliable shipping with tracking and careful packaging on every order.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={COLORS.gold}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 13V6H14V13H3ZM14 8H19L21 11V17H19C19 18.66 17.66 20 16 20C14.34 20 13 18.66 13 17H9C9 18.66 7.66 20 6 20C4.34 20 3 18.66 3 17H1V15H3V13H14V15H19V12.5L17.5 10H14V8Z" />
        </svg>
      ),
    },

    {
      id: "f3",
      title: "Exclusive Collections",
      desc: "Limited drops curated with style and attention to detail.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={COLORS.gold}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17V9L12 14L2 9V17Z" />
        </svg>
      ),
    },

    {
      id: "f4",
      title: "Secure Checkout",
      desc: "Encrypted payments and trusted providers keep your information safe.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill={COLORS.gold}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 8H7V6C7 3.79 8.79 2 11 2C13.21 2 15 3.79 15 6V8H17V22H7V8H17ZM9 6V8H13V6C13 4.9 12.1 4 11 4C9.9 4 9 4.9 9 6Z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-20 px-6"
      style={{
        backgroundColor: COLORS.softBg,
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading Section */}
        <div className="mb-16">
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ color: COLORS.textDark }}
          >
            Why Choose ML Luxury
          </h2>
          <p
            className="mt-3 text-base max-w-2xl"
            style={{ color: COLORS.textDark }}
          >
            We combine elegant design, premium materials and modern service to deliver
            a luxury shopping experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((f) => (
            <article
              key={f.id}
              className="p-7 rounded-2xl transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: COLORS.cardBg,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${COLORS.gold}22` }} // Gold tint background
                >
                  {f.icon}
                </div>

                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: COLORS.textDark }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: COLORS.textDark }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Space before Footer */}
      <div className="mt-28" />
    </section>
  );
}
