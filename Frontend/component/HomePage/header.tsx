"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import AnimatedStarButton from "../custom/AnimatedButton";
import SigninModal from "../../modals/SigninModal";
import ProductDropdown from "./ProductDropdown";
import MobileProductCards from "./MobileProductCards";

const Header = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for outside click detection
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const { user, loading: isLoading, signOut } = useAuth();

  const openSigninModal = () => setIsSigninModalOpen(true);
  const closeSigninModal = () => setIsSigninModalOpen(false);

  // Close signin modal when user logs in
  useEffect(() => {
    if (user && isSigninModalOpen) {
      closeSigninModal();
    }
  }, [user, isSigninModalOpen]);

  // Handle outside clicks for dropdowns - Fixed version
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close product dropdown if clicked outside (desktop only)
      if (
        isProductDropdownOpen &&
        productDropdownRef.current &&
        !productDropdownRef.current.contains(target) &&
        !isMobileMenuOpen // Don't close if mobile menu is open
      ) {
        setIsProductDropdownOpen(false);
      }

      // Close profile dropdown if clicked outside
      if (
        isProfileDropdownOpen &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(target)
      ) {
        setIsProfileDropdownOpen(false);
      }

      // Close mobile menu if clicked outside (excluding the hamburger button)
      // Also close product dropdown if mobile menu closes
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
        setIsProductDropdownOpen(false); // Close product dropdown when mobile menu closes
      }
    };

    // Always add the event listener, regardless of dropdown state
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProductDropdownOpen, isProfileDropdownOpen, isMobileMenuOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleMobileProductCardClose = () => {
    setIsProductDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    const newMenuState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newMenuState);

    // If closing mobile menu, also close product dropdown
    if (!newMenuState) {
      setIsProductDropdownOpen(false);
    }
  };

  const handleMobileProductToggle = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const getUserDisplayName = () => {
    if (!user) return "";

    // Try to get name from user metadata
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
    if (fullName) return fullName;

    // Fallback to email
    return user.email || "User";
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  };

  return (
    <>
      <SigninModal isOpen={isSigninModalOpen} onClose={closeSigninModal} />

      <header className="bg-black/20 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo, Product dropdown, Docs */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo2.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                {/* Product Dropdown */}
                <div className="relative" ref={productDropdownRef}>
                  {/* Product Dropdown Button */}
                  <button
                    onClick={() =>
                      setIsProductDropdownOpen(!isProductDropdownOpen)
                    }
                    className="flex items-center text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Product
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isProductDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Product Dropdown Component */}
                  <ProductDropdown
                    isOpen={isProductDropdownOpen}
                    onClose={() => setIsProductDropdownOpen(false)}
                  />
                </div>

                {/* Docs */}
                <a
                  href="/blog"
                  className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Blog
                </a>
              </nav>
            </div>

            {/* Right side - GitHub and Sign In/Profile */}
            <div className="flex items-center space-x-4">
              {/* GitHub Link - Hidden on mobile */}
              <a
                href="https://github.com/vedas-dixit/RedirecTo"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block text-white/80 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Conditional Auth UI */}
              {isLoading ? (
                // Loading state
                <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              ) : user ? (
                // User Profile Dropdown
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {getUserAvatar() ? (
                      <Image
                        src={getUserAvatar()}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden lg:block">
                      {getUserDisplayName()}
                    </span>
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-black/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-white/20">
                          <p className="text-sm text-white font-medium">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-white/60">{user.email}</p>
                        </div>
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          Profile
                        </a>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          Settings
                        </a>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Sign In Button
                <AnimatedStarButton
                  className="px-4 py-2"
                  onClick={openSigninModal}
                >
                  Sign In
                </AnimatedStarButton>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <button
                  ref={mobileMenuButtonRef}
                  onClick={handleMobileMenuToggle}
                  className="text-white/80 hover:text-white p-2 transition-colors duration-200"
                >
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div
                className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/20 z-40"
                ref={mobileMenuRef}
              >
                <div className="px-4 py-6 space-y-6">
                  <div className="space-y-4">
                    <button
                      onClick={handleMobileProductToggle}
                      className="flex items-center justify-center w-full text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
                    >
                      Product
                      <svg
                        className={`ml-1 h-5 w-5 transition-transform duration-300 ${
                          isProductDropdownOpen
                            ? "rotate-180 text-amber-400"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <MobileProductCards
                      isOpen={isProductDropdownOpen}
                      onClose={handleMobileProductCardClose}
                    />
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-4">
                    <a
                      href="/blog"
                      className="flex items-center justify-center text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </a>

                    <div className="border-t border-white/20"></div>

                    <a
                      href="https://github.com/vedas-dixit/RedirecTo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
