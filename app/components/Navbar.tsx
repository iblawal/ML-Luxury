"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// Configuration
const NAVBAR_CONFIG = {
  brand: {
    name: "ML",
    fullName: "Modern Lifestyle",
  },
  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "categories", label: "Categories", href: "#categories" },
    { id: "shop", label: "Shop", href: "#shop" },
    { id: "about", label: "About", href: "#about" },
    {id: "testimonials", label: "Testimonials", href: "#testimonials"},
    { id: "contact", label: "Contact ", href: "#contact" },
  ],
  colors: {
    background: "#F4EDE3",
    text: "#4A2E1F",
    hover: "#D8A878",
  },
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback((href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {

      console.log(`Navigating to: ${href}`);
    
    }
    setIsMobileMenuOpen(false);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }, [searchQuery]);

  const handleSearchKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F4EDE3] shadow-lg"
            : "bg-[#F4EDE3]/95 backdrop-blur-sm"
        }`}
        style={{ backgroundColor: NAVBAR_CONFIG.colors.background }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:bg-[#D8A878] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878]"
                style={{
                  borderColor: NAVBAR_CONFIG.colors.text,
                  color: NAVBAR_CONFIG.colors.text,
                }}
                aria-label="Go to homepage"
              >
                <span className="text-xl md:text-2xl font-bold">
                  {NAVBAR_CONFIG.brand.name}
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAVBAR_CONFIG.navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className="text-base font-medium text-[#4A2E1F] hover:text-[#D8A878] transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D8A878] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Search Icon */}
              <button
                onClick={toggleSearch}
                className="p-2 rounded-full text-[#4A2E1F] hover:bg-[#D8A878]/40 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878]"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* User Account Icon */}
              <button
                onClick={() => handleNavigation("/account")}
                className="p-2 rounded-full text-[#4A2E1F] hover:bg-[#D8A878]/40 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878]"
                aria-label="User account"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {/* Cart Icon with Badge */}
              <button
                onClick={() => handleNavigation("/cart")}
                className="relative p-2 rounded-full text-[#4A2E1F] hover:bg-[#D8A878]/40 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878]"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A2E1F] rounded-full text-xs font-bold flex items-center justify-center text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg text-[#4A2E1F] hover:bg-[#D8A878]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D8A878]"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isSearchOpen ? "max-h-24" : "max-h-0"
          }`}
          style={{ backgroundColor: NAVBAR_CONFIG.colors.background }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search for products..."
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-[#4A2E1F]/40 bg-white text-[#4A2E1F] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D8A878] focus:border-[#D8A878]"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#4A2E1F] bg-[#D8A878]/40 hover:bg-[#D8A878]/60 transition-colors duration-200"
                aria-label="Submit search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-[#F4EDE3] z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl rounded-l-[40px] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#4A2E1F]/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#4A2E1F] flex items-center justify-center font-bold text-[#4A2E1F]">
                  {NAVBAR_CONFIG.brand.name}
                </div>
                <span className="font-semibold text-[#4A2E1F]">Menu</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-[#4A2E1F] hover:bg-[#D8A878]/40 transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-2">
                {NAVBAR_CONFIG.navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="w-full text-left px-4 py-3 rounded-lg font-medium text-[#4A2E1F] hover:bg-[#D8A878]/40 hover:text-[#D8A878] transition-all duration-200 flex items-center justify-between group"
                    >
                      {item.label}
                      <svg
                        className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-[#4A2E1F]/20">
              <p className="text-sm text-center mb-4 text-[#4A2E1F]/70">
                Need help? Contact us
              </p>
              <button
                onClick={() => handleNavigation("/contact")}
                className="w-full py-3 rounded-lg font-semibold bg-[#D8A878] text-[#4A2E1F] hover:scale-102 transition-transform duration-200"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}