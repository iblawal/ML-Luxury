"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Type definitions
interface Testimonial {
  id: number;
  name: string;
  role: string;
  category: string;
  message: string;
  rating: number;
}

type Category = "All" | "Quality" | "Experience" | "Support";

// Colors
const COLORS = {
  gold: "#D2A679",
  textDark: "#3C2F2F",
  softBg: "#F9F5F0",
  cardBg: "#ffffff",
} as const;

// Testimonials (NO IMAGES)
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sola Daniels",
    role: "Loyal Customer",
    category: "Quality",
    message:
      "The experience is always premium - fast delivery and exceptional service. Every piece I've ordered exceeds my expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Temi Montana",
    role: "Top Buyer",
    category: "Support",
    message:
      "Customer support is world-class. They respond instantly and always fix things. ML Luxury truly cares about their customers.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aisha Kareem",
    role: "Verified Customer",
    category: "Experience",
    message:
      "I love the luxurious feel of the platform - smooth, elegant and professional. Shopping here is a pleasure.",
    rating: 5,
  },
  {
    id: 4,
    name: "Al Ameen",
    role: "Regular Shopper",
    category: "Quality",
    message:
      "Outstanding quality products. Every item is carefully curated and arrives in perfect condition. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Segun",
    role: "Fashion Enthusiast",
    category: "Experience",
    message:
      "The seamless shopping experience and attention to detail make ML Luxury my go-to destination for premium fashion.",
    rating: 5,
  },
];

const CATEGORIES: Category[] = ["All", "Quality", "Experience", "Support"];

// Star Rating
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className="w-4 h-4"
        style={{
          color: index < rating ? COLORS.gold : `${COLORS.textDark}30`,
        }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Testimonial Card (NO IMAGE)
const TestimonialCard = ({
  testimonial,
  variant = "carousel",
}: {
  testimonial: Testimonial;
  variant?: "carousel" | "grid";
}) => {
  const isCarousel = variant === "carousel";

  return (
    <div
      className={`
        ${isCarousel ? "min-w-[85%] sm:min-w-[70%] md:min-w-[45%] lg:min-w-[30%]" : "w-full"}
        rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6 relative bg-white border border-[#e7e2db]
      `}
    >
      {/* Quote Icon */}
      <svg
        className="w-8 h-8 mb-4 opacity-25"
        style={{ color: COLORS.gold }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Message */}
      <p className="text-base leading-relaxed mb-4" style={{ color: COLORS.textDark }}>
        “{testimonial.message}”
      </p>

      {/* Rating */}
      <StarRating rating={testimonial.rating} />

      {/* Author */}
      <div className="flex items-center gap-3 mt-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
          style={{
            backgroundColor: `${COLORS.gold}25`,
            color: COLORS.gold,
          }}
        >
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <h4 className="font-semibold text-lg" style={{ color: COLORS.textDark }}>
            {testimonial.name}
          </h4>
          <p className="text-sm opacity-70" style={{ color: COLORS.textDark }}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

// MAIN COMPONENT
export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [filtered, setFiltered] = useState<Testimonial[]>(TESTIMONIALS);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  useEffect(() => {
    setFiltered(
      selectedCategory === "All"
        ? TESTIMONIALS
        : TESTIMONIALS.filter((t) => t.category === selectedCategory)
    );
  }, [selectedCategory]);

  useEffect(() => {
    emblaApi?.scrollTo(0);
  }, [filtered, emblaApi]);

  return (
    <section
      className="py-20"
      style={{ backgroundColor: COLORS.softBg }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: `${COLORS.gold}25`,
              color: COLORS.textDark,
            }}
          >
            Testimonials
          </div>
          <h2
            className="text-4xl font-bold mb-3"
            style={{ color: COLORS.textDark }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-lg opacity-70 max-w-2xl mx-auto"
            style={{ color: COLORS.textDark }}
          >
            Trusted by thousands of customers who choose ML Luxury for premium quality.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-6 py-2 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: selectedCategory === cat ? COLORS.gold : "transparent",
                color: selectedCategory === cat ? COLORS.textDark : COLORS.gold,
                border: `2px solid ${COLORS.gold}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden mb-16" ref={emblaRef}>
          <div className="flex gap-6">
            {filtered.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} variant="carousel" />
            ))}
          </div>
        </div>

        {/* Grid (Desktop Only) */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <TestimonialCard key={`grid-${t.id}`} testimonial={t} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
