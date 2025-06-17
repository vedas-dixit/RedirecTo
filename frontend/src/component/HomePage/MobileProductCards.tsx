"use client";
import React from "react";
import { MobileProductCardsProps } from "./types/product-dropdown.types";

const MobileProductCards: React.FC<MobileProductCardsProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleCardClick = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="space-y-3 px-4 animate-in slide-in-from-top-2 duration-300">
      {" "}
      {/* URL Shortener Card */}
      <div
        className="group relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-amber-600/20 hover:from-orange-500/30 hover:to-amber-600/30 border border-orange-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
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
              Transform long URLs into short, memorable links with custom
              aliases.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* Analytics Card */}
      <div
        className="group relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border border-amber-500/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
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
              Track clicks, locations, and performance metrics.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* QR Codes Card */}
      <div
        className="group relative overflow-hidden bg-gradient-to-br from-orange-600/20 to-amber-700/20 hover:from-orange-600/30 hover:to-amber-700/30 border border-orange-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
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
      </div>{" "}
      {/* Custom Domains Card */}
      <div
        className="group relative overflow-hidden bg-gradient-to-r from-amber-600/20 to-orange-500/20 hover:from-amber-600/30 hover:to-orange-500/30 border border-amber-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
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
              Use your own branded domain for professional links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCards;
