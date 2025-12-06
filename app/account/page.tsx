"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F3EDE4]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-[#D8A878] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#3C2F2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#3C2F2F] mb-4">My Account</h1>
            <p className="text-[#3C2F2F]/70 mb-8">This feature is coming soon. Stay tuned!</p>
            <a href="/" className="inline-block px-8 py-3 bg-[#3C2F2F] text-[#F6F1E9] rounded-lg font-semibold hover:bg-[#5A3E2B] transition-all">
              Back to Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}