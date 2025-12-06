"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F3EDE4]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-[#D8A878] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#3C2F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#3C2F2F] mb-4">Shopping Cart</h1>
            <p className="text-[#3C2F2F]/70 mb-8">Your cart is empty. This feature is coming soon!</p>
            <a href="/" className="inline-block px-8 py-3 bg-[#3C2F2F] text-[#F6F1E9] rounded-lg font-semibold hover:bg-[#5A3E2B] transition-all">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}