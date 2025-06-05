"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const Header = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)

  return (
    <header className="bg-black/20 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo, Product dropdown, Docs */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/images/logo2.svg" alt="Logo" width={100} height={100} />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {/* Product Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  className="flex items-center text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Product
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isProductDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isProductDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-md border border-white/20 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                        Feature 1
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                        Feature 2
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                        Feature 3
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white">
                        Pricing
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Docs */}
              <a
                href="/docs"
                className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Blog
              </a>
            </nav>
          </div>

          {/* Right side - GitHub and Sign In */}
          <div className="flex items-center space-x-4">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* Sign In Button */}
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 backdrop-blur-sm">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white/80 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProductDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProductDropdownOpen(false)}
        />
      )}
    </header>
  )
}

export default Header