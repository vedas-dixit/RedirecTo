"use client";

import React, { useState, ReactNode, ButtonHTMLAttributes } from "react";

interface AnimatedStarButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classname?: string;
}

const AnimatedStarButton: React.FC<AnimatedStarButton> = ({
  children,
  className = "",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`relative cursor-pointer overflow-hidden bg-white/10 hover:bg-white/20 text-white font-semibold rounded-md text-base border border-white/20 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transform hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Shooting stars container */}
      <div className="absolute inset-0 pointer-events-none">
        {isHovered && (
          <>
            {/* Star 1 */}
            <div
              className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-75"
              style={{
                top: "20%",
                left: "10%",
                animationDelay: "0ms",
                animationDuration: "1500ms",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Star 2 */}
            <div
              className="absolute w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-60"
              style={{
                top: "60%",
                left: "80%",
                animationDelay: "300ms",
                animationDuration: "1200ms",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Star 3 */}
            <div
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-80"
              style={{
                top: "30%",
                left: "60%",
                animationDelay: "600ms",
                animationDuration: "1800ms",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Star 4 */}
            <div
              className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-70"
              style={{
                top: "70%",
                left: "25%",
                animationDelay: "900ms",
                animationDuration: "1400ms",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Star 5 */}
            <div
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-90"
              style={{
                top: "15%",
                left: "45%",
                animationDelay: "1200ms",
                animationDuration: "1600ms",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Shooting star trail 1 */}
            <div
              className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"
              style={{
                top: "40%",
                left: "20%",
                transform: "rotate(45deg)",
                animationDelay: "400ms",
                animationDuration: "2000ms",
              }}
            ></div>

            {/* Shooting star trail 2 */}
            <div
              className="absolute w-6 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
              style={{
                top: "65%",
                left: "55%",
                transform: "rotate(-30deg)",
                animationDelay: "800ms",
                animationDuration: "1800ms",
              }}
            ></div>
          </>
        )}
      </div>

      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 rounded-md transition-opacity duration-300 ${
          isHovered ? "opacity-20" : "opacity-0"
        } bg-gradient-to-r from-white/10 via-white/20 to-white/10`}
      ></div>
    </button>
  );
};

export default AnimatedStarButton;
