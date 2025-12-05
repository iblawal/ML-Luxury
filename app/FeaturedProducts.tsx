"use client";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Product Interface

interface Product {
  id: string;
  name: string;
  category: string;
  size?: string[];
  color?:string[];
  price: number;
  oldPrice?: number;
  images: string[];
  tag?: string;
}

// Featured Products Data

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Luxury Sweatshirt",
    category: "Sweatshirts",
    price: 65000,
    oldPrice: 75000,
    tag: "Exclusive",
    images: ["/sweat-shirt1.jpg", "/sweat-shirt2.jpg"],
  },
  {
    id: "2",
    name: "Premium New Balance 9060 Sneakers",
    category: "Footwear",
    size: ["40", "41", "42", "43", "44", "45"],
    price: 100000,
    oldPrice: 120000,
    tag: "Exclusive",
    images: ["/sneakers1.jpg", "/sneakers2.jpg"],
  },
  {
    id: "3",
    name: "Premium Luxury Pupple Jeans",
    category: "Jeans",
    size: ["30", "32", "34", "36", "38"],
    price: 80000,
    oldPrice: 90000,
    tag: "Exclusive",
    images: ["/jean1.jpg", "/jean2.jpg"],
  },
  {
    id: "4",
    name: "Premium Luxury Jacket",
    category: "Jackets",
    price: 200000,
    tag: "Exclusive",
    images: ["/jacket1.jpg", "/jacket2.jpg"],
  },

  // Continued

  {
    id: "5",
    name: "Men’s Luxury Hoodie",
    category: "Hoodies",
    price: 100000,
    oldPrice: 120000,
    tag: "Exclusive",
    images: ["/hoodie1.jpg", "/hoodie2.jpg"],
  },
  {
    id: "6",
    name: "Premium Italian Leather Loafers",
    category: "Shoe",
    size: ["40", "41", "42", "43", "44", "45"],
    price: 200000,
    tag: "Exclusive",
    images: ["/loafers1.jpg", "/loafers2.jpg"],
  },
  {
    id: "7",
    name: "Premium large shoulder bag",
    category: "Bags",
    price: 90000,
    oldPrice: 110000,
    tag: "Exclusive",
    images: ["/bag1.jpg", "/bag2.jpg"],
  },
  {
    id: "8",
    name: "Premium Fluffy Contraction Vests ",
    category: "Vests",
    price: 50000,
    tag: "Exclusive",
    images: ["/vest1.jpg", "/vest2.jpg"],
  },
];

// Animation Variants

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

// Main Component

export default function FeaturedProducts() {
  const products = useMemo(() => FEATURED_PRODUCTS, []);

  return (
    <section className="py-16 md:py-20 bg-[#F6F1E9] px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header*/}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2F2F]">
            Trending Now
          </h2>
          <p className="text-[#5A3E2B]/70 mt-2">
            Curated essentials handpicked for the modern gentleman.
          </p>
        </div>

        {/* Grid*/}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-8
            overflow-x-auto md:overflow-visible
            snap-x md:snap-none
            flex-nowrap md:grid
        "
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="
                bg-white rounded-xl shadow-md hover:shadow-lg
                transition-all duration-300 cursor-pointer
                overflow-hidden relative snap-center min-w-[70%]
                sm:min-w-[45%] md:min-w-0
              "
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden group">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={product.images[1]}
                  alt="hover"
                  fill
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {product.tag && (
                  <span className="
                    absolute top-3 left-3 bg-[#5A3E2B] text-[#F6F1E9]
                    text-xs font-semibold px-3 py-1 rounded-full
                  ">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#3C2F2F]">
                  {product.name}
                </h3>

                <p className="text-sm text-[#5A3E2B]/70">
                  {product.category}
                </p>

                {/* Product size */}
                {product.size && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.size.map((s) => (
                      <span
                        key={s}
                        className="
                          text-xs px-2 py-1 rounded-md
                          border border-[#3C2F2F]/50
                          text-[#3C2F2F]
                        "
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price*/}
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xl font-bold text-[#3C2F2F]">
                    ₦{product.price.toLocaleString()}
                  </span>

                  {product.oldPrice && (
                    <span className="line-through text-[#5A3E2B]/50">
                      ₦{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Button*/}
                <div className="mt-4 space-y-2">
                  <button className="
                    w-full py-2 rounded-md border border-[#3C2F2F]
                    text-[#3C2F2F] font-medium
                    hover:bg-[#3C2F2F] hover:text-[#F6F1E9]
                    transition-all duration-300
                  ">
                    Quick Add
                  </button>

                  <button className="
                    w-full py-2 rounded-md bg-[#3C2F2F] text-[#F6F1E9]
                    font-medium hover:bg-[#5A3E2B] transition-all duration-300
                  ">
                    Order Now
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
