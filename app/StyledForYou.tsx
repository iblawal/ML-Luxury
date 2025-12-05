"use client";
import type { JSX } from "react";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/*Types */
type Product = {
  id: string;
  name: string;
  category: string;
  sizes?: string[];
  price: number;
  oldPrice?: number;
  images: string[];
  tag?: string;
};

/* Constants */
const LOOK_IMAGE = "/look-1.jpg"; // <-- Replace with your real image

const LOOK_PRODUCTS: Product[] = [
  {
    id: "s1",
    name: "Premium Luxury Polo Shirt",
    category: "Polo Shirt",
    sizes: ["S", "M", "L", "XL"],
    price: 45000,
    oldPrice: 55000,
    images: ["/style-1.jpg", "/style-2.jpg"],
    tag: "Exclusive",
  },
  {
    id: "s2",
    name: "Premium Purple Jeans",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    price: 80000,
    oldPrice: 90000,
    images: ["/style-3.jpg", "/jean2.jpg"],
    tag: "Exclusive",
  },
  {
    id: "s3",
    name: "NB 9060 Sneakers",
    category: "Footwear",
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: 100000,
    images: ["/style-4.jpg", "/sneakers2.jpg"],
    tag: "Exclusive",
  },
  {
    id: "s4",
    name: "Premium Shoulder Bag",
    category: "Bags",
    price: 90000,
    oldPrice: 110000,
    images: ["/bag1.jpg", "/bag2.jpg"],
    tag: "Exclusive",
  },
];

/* Animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

/* Utils */
const formatNGN = (value: number) =>
  `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

/* Component */
export default function StyledForYou(): JSX.Element {
  const products = useMemo(() => LOOK_PRODUCTS, []);

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string | undefined>>(
    () =>
      products.reduce((acc, p) => {
        acc[p.id] = p.sizes && p.sizes.length ? p.sizes[0] : undefined;
        return acc;
      }, {} as Record<string, string | undefined>)
  );

  const [loadingAdd, setLoadingAdd] = useState<Record<string, boolean>>({});
  const [loadingOrder, setLoadingOrder] = useState<Record<string, boolean>>({});
  const [loadingFullLook, setLoadingFullLook] = useState(false);

  const setSize = useCallback((productId: string, size: string) => {
    setSelectedSizes((s) => ({ ...s, [productId]: size }));
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      const id = product.id;
      setLoadingAdd((l) => ({ ...l, [id]: true }));
      try {
        await new Promise((r) => setTimeout(r, 700));
        console.log("Added to cart:", {
          productId: product.id,
          size: selectedSizes[product.id] ?? null,
        });
      } finally {
        setLoadingAdd((l) => ({ ...l, [id]: false }));
      }
    },
    [selectedSizes]
  );

  const orderNow = useCallback(
    async (product: Product) => {
      const id = product.id;
      setLoadingOrder((l) => ({ ...l, [id]: true }));
      try {
        await new Promise((r) => setTimeout(r, 700));
        console.log("Order now:", {
          productId: product.id,
          size: selectedSizes[product.id] ?? null,
        });
      } finally {
        setLoadingOrder((l) => ({ ...l, [id]: false }));
      }
    },
    [selectedSizes]
  );

  const shopFullLook = useCallback(async () => {
    setLoadingFullLook(true);
    try {
      const payload = products.map((p) => ({
        id: p.id,
        size: selectedSizes[p.id] ?? null,
        qty: 1,
      }));

      await new Promise((r) => setTimeout(r, 900));
      console.log("Full look added:", payload);
    } finally {
      setLoadingFullLook(false);
    }
  }, [products, selectedSizes]);

  return (
    <section className="py-16 md:py-24 bg-[#F6F1E9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C2F2F]">
            Styled For You
          </h2>
          <p className="text-[#5A3E2B]/70 mt-2 max-w-2xl">
            A ready-made outfit curated to elevate your style — add the full
            look to your cart or select pieces individually.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left image */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[680px]">
                <Image
                  src={LOOK_IMAGE}
                  alt="Styled for you look"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product, i) => (
                <motion.article
                  key={product.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  <div className="flex gap-3 p-4 items-center">
                    {}
                    <div className="w-20 h-20 relative rounded-md overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-[#3C2F2F] truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#5A3E2B]/70">
                            {product.category}
                          </p>
                        </div>

                        {product.tag && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5A3E2B] text-[#F6F1E9]">
                            {product.tag}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <span className="text-sm font-bold text-[#3C2F2F]">
                          {formatNGN(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs line-through text-[#5A3E2B]/60">
                            {formatNGN(product.oldPrice)}
                          </span>
                        )}
                      </div>

                      {/* sizes */}
                      {product.sizes && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.sizes.map((s) => {
                            const active = selectedSizes[product.id] === s;
                            return (
                              <button
                                key={s}
                                aria-pressed={active}
                                onClick={() => setSize(product.id, s)}
                                className={[
                                  "text-xs px-2 py-1 rounded-md border transition",
                                  active
                                    ? "bg-[#3C2F2F] text-[#F6F1E9] border-[#3C2F2F]"
                                    : "bg-white text-[#3C2F2F] border-[#D1C6BA]",
                                ].join(" ")}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[#eee] px-4 py-3 bg-white">
                    <div className="flex gap-3">
                      {/* Add to cart */}
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!!loadingAdd[product.id]}
                        className="flex-1 py-2 rounded-md border border-[#3C2F2F] text-[#3C2F2F] font-medium hover:bg-[#3C2F2F] hover:text-[#F6F1E9] transition"
                      >
                        {loadingAdd[product.id] ? "Adding…" : "Quick Add"}
                      </button>

                      {/* Order Now */}
                      <button
                        onClick={() => orderNow(product)}
                        disabled={!!loadingOrder[product.id]}
                        className="flex-1 py-2 rounded-md bg-[#3C2F2F] text-[#F6F1E9] font-medium hover:bg-[#5A3E2B] transition"
                      >
                        {loadingOrder[product.id] ? "Processing…" : "Order Now"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Full Look button */}
            <div className="mt-2">
              <button
                onClick={shopFullLook}
                disabled={loadingFullLook}
                className="w-full py-3 rounded-xl bg-[#3C2F2F] text-[#F6F1E9] text-lg font-semibold hover:bg-[#5A3E2B] transition"
              >
                {loadingFullLook ? "Adding full look…" : "Shop Full Look"}
              </button>

              <p className="text-xs text-[#5A3E2B]/70 mt-3">
                Add the full look to your cart with your selected sizes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
