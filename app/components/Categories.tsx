"use client";
import { useState, useCallback, useMemo, useEffect } from "react";

// Type definitions
interface Category {
  id: string;
  title: string;
  images: string[]; 
  description?: string;
  href: string;
  subcategories?: string[];
}

// CONFIG
const CATEGORIES_CONFIG = {
  sectionTitle: "Shop by Category",
  categories: [
    {
      id: "clothing",
      title: "Clothing",
      images: [
        "/category-cloth1.jpg",
        "/category-cloth2.jpg",
        "/category-cloth3.jpg",
        "/category-cloth4.jpg",
      ],
      description: "Tops, Jeans, Underwear, Jackets",
      href: "/category/clothing",
      subcategories: ["Tops", "Jeans", "Underwear", "Jackets"],
    },
    {
      id: "footwear",
      title: "Footwear",
      images: [
        "/category-footwear1.jpg",
        "/category-footwear2.jpg",
        "/category-footwear3.jpg",
        "/category-footwear4.jpg",
      ],
      description: "Sneakers, Shoes, Boots, Palms",
      href: "/category/footwear",
      subcategories: ["Sneakers", "Formal Shoes", "Boots"],
    },
    {
      id: "accessories",
      title: "Accessories",
      images: [
        "/category-acces1.jpg",
        "/category-acces2.jpg",
        "/category-acces3.jpg",
        "/category-acces4.jpg",
      ],
      description: "Bags, Belt, Caps, Wallets",
      href: "/category/accessories",
      subcategories: ["Bags", "Caps", "Wristwatch", "Belts"],
    },
  ] as Category[],
  styles: {
    cardHeight: "280px",
    overlay: {
      default: "bg-[#5A3E2B]/50",
      hover: "bg-[#5A3E2B]/40",
    },
  },
};

interface CategoryCardProps {
  category: Category;
  onCategoryClick: (category: Category) => void;
  index: number;
}

// CARD COMPONENT
function CategoryCard({ category, onCategoryClick }: CategoryCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Auto image rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % category.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [category.images.length]);

  const handleImageLoad = () => setIsLoaded(true);
  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-300"
      style={{ height: CATEGORIES_CONFIG.styles.cardHeight }}
      role="button"
      tabIndex={0}
      onClick={() => onCategoryClick(category)}
    >
      {/* IMAGE BACKGROUND */}
      <div className="absolute inset-0">
        {!hasError ? (
          <>
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${category.images[currentImage]})`,
              }}
            />

            {/* hidden loader img */}
            <img
              src={category.images[currentImage]}
              alt=""
              className="hidden"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#5A3E2B] to-[#3C2F2F]" />
        )}
      </div>

      {/* SKELETON */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 ${CATEGORIES_CONFIG.styles.overlay.default} group-hover:${CATEGORIES_CONFIG.styles.overlay.hover} transition-all`}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-[#F6F1E9] mb-2">
          {category.title}
        </h3>
        {category.description && (
          <p className="text-sm text-[#F6F1E9]/80 opacity-0 group-hover:opacity-100 transition-opacity">
            {category.description}
          </p>
        )}

        {/* HOVER ARROW */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <span className="text-[#F4A460] font-semibold flex items-center gap-2">
            Explore
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// MAIN EXPORT
export default function Categories() {
  const categories = useMemo(() => CATEGORIES_CONFIG.categories, []);

  const handleCategoryClick = (category: Category) => {
    console.log("Navigating to:", category.href);
  };

  return (
    <section className="py-16 md:py-20 bg-[#F6F1E9] px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2F2F]">
            {CATEGORIES_CONFIG.sectionTitle}
          </h2>
          <p className="text-[#5A3E2B]/70 max-w-2xl mx-auto">
            Discover our curated collections designed for the modern gentleman
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onCategoryClick={handleCategoryClick}
              index={index}
            />
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-[#3C2F2F] border-2 border-[#3C2F2F] rounded-md hover:bg-[#3C2F2F] hover:text-[#F6F1E9] transition-all">
            View All Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
