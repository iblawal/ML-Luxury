"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// =========================
// Types
// =========================
type Shop = {
  id: string;
  name: string;
  desc: string;
  color?: string[];
  price: number;
  sizes?: string[];
  image: string;
};

// =========================
// Data
// =========================
const SHOP: Shop[] = [
  {
    id: "a1",
    name: "Luxury T-Shirt",
    desc: "High Quality Vetement T-Shirt ",
    price: 45000,
    image: "/shop-1.jpg",
  },
  {
    id: "a2",
    name: "NIKE Shox TL",
    desc: "NIKE Shox TL.",
    color: ["Black", ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: 60000,
    image: "/shop-2.jpg",
  },
  {
    id: "a3",
    name: "Nike Nocta Track Sets",
    desc: "Nike Nocta Track Sets .",
    price: 35000,
    image: "/shop-3.jpg",
  },
  {
    id: "a4",
    name: "Rhude Tees",
    desc: "High Quality Rhude Tees.",
    price: 40000,
    image: "/shop-4.jpg",
  },
  {
    id: "a5",
    name: "Vintage Tees",
    desc: "High Quality Vintage Tees.",
    price: 30000,
    image: "/shop-5.jpg",
  },
  {
    id: "a6",
    name: "Luxury Sneakers",
    desc: "New Balance 740 Now Available.",
    sizes:["39","40","41","42","43","44","45"],
    price: 50000,
    image: "/shop-6.jpg",
  },
  {
    id: "a7",
    name: "Quality Shirt and Short",
    desc: "High Quality Botton Down Shirt X Combat Short.",
    color:["white", "Cream"],
    price: 40000,
    image: "/shop-7.jpg",
  },
  {
    id: "a8",
    name: "Vintage Tees",
    desc: "High Quality Vintage Tees.",
    price: 40000,
    image: "/shop-8.jpg",
  },
  {
    id: "a9",
    name: "Premium Luxury Joggers",
    desc: "Premium Luxury Joggers",
    color:["Black", "Grey", "Pink"],
    price: 70000,
    image: "/shop-9.jpg",
  },
  {
    id: "a10",
    name: "Vintage TEES",
    desc: "High Quality Vintage Tees.",
    price: 60000,
    image: "/shop-10.jpg",
  },
  {
    id: "a11",
    name: "Luxury Sneakers",
    desc: "New Balance 740 Now Available.",
    sizes:["39","40","41","42","43","44","45"],
    price: 60000,
    image: "/shop-11.jpg",
  },
  {
    id: "a12",
    name: "Rhude Tees",
    desc: "High Quality Rhude Tees.",
    price: 60000,
    image: "/shop-12.jpg",
  },
  {
    id: "a13",
    name: "Top Quality Cap",
    desc: "Limited Harcore Alice Hollywood Top Quality Caps.",
    price: 60000,
    image: "/shop-13.jpg",
  },
  {
    id: "a14",
    name: "Vancarhell Tees",
    desc: "High Quality Vancarhell Tees .",
    price: 60000,
    image: "/shop-14.jpg",
  },
  {
    id: "a15",
    name: "Top Quality Cap",
    desc: "Limited Harcore Alice Hollywood Top Quality Caps.",
    price: 60000,
    image: "/shop-15.jpg",
  },
  {
    id: "a16",
    name: "Luxury Religion Jean",
    desc: "Premium Luxury jean.",
    price: 60000,
    image: "/shop-16.jpg",
  },
  {
    id: "a17",
    name: "Premium Nike Socks",
    desc: "Luxury Nike Socks.",
    price: 60000,
    image: "/shop-17.jpg",
  },
  {
    id: "a18",
    name: "Luxury Relegion Jean",
    desc: "Premium Luxury Jean.",
    price: 60000,
    image: "/shop-18.jpg",
  },
  {
    id: "a19",
    name: "Top Quality caps",
    desc: "Limited Harcore Alice Hollywood Top Quality Caps.",
    price: 60000,
    image: "/shop-19.jpg",
  },
  {
    id: "a20",
    name: "Calvin Klein Shoe",
    desc: "Calvin Klein shoe.",
    sizes:["40","41,","42","43","44","45"],
    price: 60000,
    image: "/shop-20.jpg",
  },
];

// =========================
// Animations
// =========================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number): any => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// =========================
// Component
// =========================
export default function ShopNow() {
  const shop = useMemo(() => SHOP, []);

  return (
    <section className="py-20 px-5 bg-[#F3EDE4]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3C2F2F]">
            Explore Our Collection
          </h2>
          <p className="mt-3 text-base max-w-xl mx-auto text-[#3C2F2F]/70">
            Shop luxury products crafted with attention to detail and designed for individuals with premium taste.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
            grid 
            grid-cols-2
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-4
          "
        >
          {shop.map((item, index) => (
            <motion.article
              key={item.id}
              className="
                bg-[#FAF7F2] rounded-xl p-4 
                hover:shadow-md 
                transition-all duration-300 
                cursor-pointer
                group
                w-full
                relative
              "
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              {/* IMAGE */}
              <div className="w-full h-[180px] sm:h-60 relative mb-3 overflow-hidden rounded-lg bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="
                    object-cover 
                    rounded-xl
                    group-hover:scale-110
                    transition-all duration-700
                  "
                />
              </div>

              {/* NAME */}
              <h3 className="text-sm sm:text-base font-bold text-[#3C2F2F] mb-1 line-clamp-2">
                {item.name}
              </h3>

              {/* DESC */}
              <p className="text-xs text-[#3C2F2F]/60 mb-2 line-clamp-2">
                {item.desc}
              </p>

              {/* SIZES */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {item.sizes.map((s) => (
                    <span
                      key={s}
                      className="
                        text-xs px-2 py-1 rounded-md
                        border border-[#3C2F2F]/30
                        text-[#3C2F2F]
                        hover:bg-[#3C2F2F] hover:text-[#F6F1E9]
                        transition-all duration-200
                        cursor-pointer
                      "
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* COLORS */}
              {item.color && item.color.length > 0 && (
                <div className="mb-3 flex gap-2 items-center">
                  <span className="text-xs text-[#3C2F2F]/60">Colors:</span>
                  <div className="flex gap-1.5">
                    {item.color.map((c, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-[#3C2F2F]/20 cursor-pointer hover:border-[#3C2F2F] transition-all"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}


              {/* PRICE */}
              <p className="text-base sm:text-lg font-extrabold text-[#3C2F2F] mb-3">
                ₦{item.price.toLocaleString()}
              </p>

              {/* BUTTON (FIXED POSITION) */}
              <div className="mt-auto space-y-2">
                  <button className="
                    w-full py-2 rounded-lg border-2 border-[#3C2F2F]
                    text-[#3C2F2F] font-semibold text-xs sm:text-sm
                    hover:bg-[#3C2F2F] hover:text-[#F6F1E9]
                    transition-all duration-300
                  ">
                    Quick Add
                  </button>

                  <button className="
                    w-full py-2 rounded-lg bg-[#3C2F2F] text-[#F6F1E9]
                    font-semibold text-xs sm:text-sm hover:bg-[#5A3E2B] transition-all duration-300
                  ">
                    Order Now
                  </button>
                </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}