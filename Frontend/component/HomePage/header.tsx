"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import AnimatedStarButton from "../custom/AnimatedButton";
import SigninModal from "../../modals/SigninModal";

const Header = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, loading: isLoading, signOut } = useAuth();

  const openSigninModal = () => setIsSigninModalOpen(true);
  const closeSigninModal = () => setIsSigninModalOpen(false);

  // Close signin modal when user logs in
  useEffect(() => {
    if (user && isSigninModalOpen) {
      closeSigninModal();
    }
  }, [user, isSigninModalOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
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
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProductDropdownOpen(!isProductDropdownOpen)
                    }
                    className="group flex items-center text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-all duration-300 group-hover:translate-x-0.5">
                      Product
                    </span>
                    <svg
                      className={`ml-1 h-4 w-4 transition-all duration-300 transform relative z-10 ${
                        isProductDropdownOpen
                          ? "rotate-180 text-amber-400 scale-110"
                          : "group-hover:scale-110 group-hover:translate-y-0.5"
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
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-400/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                    {/* Animated border */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-amber-400/20 rounded-lg transition-all duration-300" />
                  </button>

                  {isProductDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 p-4 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 w-96">
                      <div className="grid grid-cols-2 gap-3 h-80">
                        <div className="row-span-2 group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-600/20 hover:from-orange-500/30 hover:to-amber-600/30 border border-orange-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/20">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 5.656l4 4a4 4 0 005.656 0l1.102-1.101m-.758-4.899a4 4 0 00-5.656-5.656l-4 4a4 4 0 005.656 0l1.1-1.1"
                                  />
                                </svg>
                              </div>
                              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-300 transition-colors">
                                URL Shortener
                              </h3>
                              <p className="text-white/70 text-sm leading-relaxed">
                                Transform long URLs into short, memorable links
                                with custom aliases and tracking.
                              </p>
                            </div>
                            <div className="flex items-center text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                              Get Started
                              <svg
                                className="w-4 h-4 ml-1"
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
                            </div>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border border-amber-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-1 group-hover:text-amber-300 transition-colors">
                              Analytics
                            </h3>
                            <p className="text-white/70 text-xs">
                              Track clicks, locations, and performance metrics.
                            </p>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-600/20 to-amber-700/20 hover:from-orange-600/30 hover:to-amber-700/30 border border-orange-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-600/20">
                          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-600/10 to-amber-700/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                          <div className="relative z-10">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-700 rounded-lg flex items-center justify-center mb-3 group-hover:pulse transition-all duration-300">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-1 group-hover:text-orange-300 transition-colors">
                              QR Codes
                            </h3>
                            <p className="text-white/70 text-xs">
                              Generate QR codes for easy mobile sharing.
                            </p>
                          </div>
                        </div>

                        <div className="col-span-2 group relative overflow-hidden bg-gradient-to-r from-amber-600/20 to-orange-500/20 hover:from-amber-600/30 hover:to-orange-500/30 border border-amber-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-600/20">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-white font-semibold group-hover:text-amber-300 transition-colors">
                                  Custom Domains
                                </h3>
                                <p className="text-white/70 text-sm">
                                  Use your own branded domain for professional
                                  links.
                                </p>
                              </div>
                            </div>
                            <div className="text-orange-400 group-hover:translate-x-2 transition-transform duration-300">
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
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                <div className="relative">
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
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
              <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/20 z-40">
                <div className="px-4 py-6 space-y-6">
                  <div className="space-y-4">
                    <button
                      onClick={() =>
                        setIsProductDropdownOpen(!isProductDropdownOpen)
                      }
                      className="flex items-center justify-between w-full text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
                    >
                      <span>Product</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 ${
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
                    // Mobile Product Cards
                    {isProductDropdownOpen && (
                      <div className="space-y-3 pl-4 animate-in slide-in-from-top-2 duration-300">
                        // URL Shortener Card
                        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-600/20 hover:from-orange-500/30 hover:to-amber-600/30 border border-orange-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.828 10.172a4 4 0 00-5.656 5.656l4 4a4 4 0 005.656 0l1.102-1.101m-.758-4.899a4 4 0 00-5.656-5.656l-4 4a4 4 0 005.656 0l1.1-1.1"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base mb-1">
                                URL Shortener
                              </h3>
                              <p className="text-white/70 text-sm">
                                Transform long URLs into short, memorable links
                                with custom aliases.
                              </p>
                            </div>
                          </div>
                        </div>
                        // Analytics Card
                        <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border border-amber-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base mb-1">
                                Analytics
                              </h3>
                              <p className="text-white/70 text-sm">
                                Track clicks, locations, and performance
                                metrics.
                              </p>
                            </div>
                          </div>
                        </div>
                        // QR Codes Card
                        <div className="group relative overflow-hidden bg-gradient-to-br from-orange-600/20 to-amber-700/20 hover:from-orange-600/30 hover:to-amber-700/30 border border-orange-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-700 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base mb-1">
                                QR Codes
                              </h3>
                              <p className="text-white/70 text-sm">
                                Generate QR codes for easy mobile sharing.
                              </p>
                            </div>
                          </div>
                        </div>
                        // Custom Domains Card
                        <div className="group relative overflow-hidden bg-gradient-to-r from-amber-600/20 to-orange-500/20 hover:from-amber-600/30 hover:to-orange-500/30 border border-amber-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-base mb-1">
                                Custom Domains
                              </h3>
                              <p className="text-white/70 text-sm">
                                Use your own branded domain for professional
                                links.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 border-t border-white/20 pt-6">
                    <a
                      href="/blog"
                      className="block text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </a>

                    <a
                      href="https://github.com/vedas-dixit/RedirecTo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-white/80 hover:text-white text-lg font-medium transition-colors duration-200"
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

          {(isProductDropdownOpen ||
            isProfileDropdownOpen ||
            isMobileMenuOpen) && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                setIsProductDropdownOpen(false);
                setIsProfileDropdownOpen(false);
                setIsMobileMenuOpen(false);
              }}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
