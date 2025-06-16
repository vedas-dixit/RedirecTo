"use client";
import React from "react";
import { ProductDropdownProps } from "./types/product-dropdown.types";

const ProductDropdown: React.FC<ProductDropdownProps> = ({
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 p-4 bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 w-96">
      <div className="grid grid-cols-2 gap-3 h-80">
        {/* URL Shortener - Main Feature */}
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
                Transform long URLs into short, memorable links with custom
                aliases and tracking.
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

        {/* Analytics */}
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

        {/* QR Codes */}
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

        {/* Custom Domains */}
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
                  Use your own branded domain for professional links.
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
  );
};

export default ProductDropdown;
