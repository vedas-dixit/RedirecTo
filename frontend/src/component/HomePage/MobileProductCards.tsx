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
      {/* URL Protection Card */}
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-1">
              URL Protection
            </h3>
            <p className="text-white/70 text-sm">
              Secure your links with advanced protection and access controls.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* URL Analytics Card */}
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
              URL Analytics
            </h3>
            <p className="text-white/70 text-sm">
              Comprehensive tracking with detailed insights and metrics.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* URL Management Card */}
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-1">
              URL Management
            </h3>
            <p className="text-white/70 text-sm">
              Organize, edit, and manage all your links in one place.
            </p>
          </div>
        </div>
      </div>{" "}
      {/* Open Source Card */}
      <div
        className="group relative overflow-hidden bg-gradient-to-r from-amber-600/20 to-orange-500/20 hover:from-amber-600/30 hover:to-orange-500/30 border border-amber-600/20 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-1">
              Open Source
            </h3>
            <p className="text-white/70 text-sm">
              Free, transparent, and community-driven platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCards;
