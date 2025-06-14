"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";

// Type definitions
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

interface DynamicStar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface ProtectedLinkPageProps {
  id?: string;
}

const ProtectedLinkPage: React.FC<ProtectedLinkPageProps> = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stars, setStars] = useState<DynamicStar[]>([]);
  const [backgroundStars, setBackgroundStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate background stars on mount
  useEffect(() => {
    const generateBackgroundStars = (): void => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          animationDelay: Math.random() * 3,
        });
      }
      setBackgroundStars(newStars);
    };
    generateBackgroundStars();
  }, []);

  // Create star animation when password changes
  useEffect(() => {
    if (password.length > 0) {
      const colors: string[] = [
        "#FF6B35",
        "#F7931E",
        "#FFD23F",
        "#06FFA5",
        "#3BCEAC",
        "#0EAD69",
      ];
      const newStar: DynamicStar = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10, // Keep stars within bounds
        y: Math.random() * 60 + 20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setStars((prev) => [...prev, newStar]);

      // Remove star after animation
      const timeoutId = setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 2000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timeoutId);
    }
  }, [password.length]);

  const handleSubmit = async (): Promise<void> => {
    if (!password.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Here you would validate the password and redirect
      console.log("Password submitted:", password);
      setIsLoading(false);
      // Redirect logic would go here
    }, 2000);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (password.length < 8) {
      setPassword(e.target.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 animated-grid" />
      </div>

      {/* Background Stars */}
      {backgroundStars.map((star: Star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white twinkle-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}

      {/* Dynamic Stars from Password Input */}
      {stars.map((star: DynamicStar) => (
        <div
          key={star.id}
          className="absolute rounded-full star-burst"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 20px ${star.color}`,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 shield-bounce">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2 gradient-text">
              Protected Link Access
            </h1>
            <p className="text-gray-400 text-sm">
              Enter the password to access this protected content
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl p-8 shadow-2xl border glass-card">
            <div className="space-y-6">
              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Access Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-12 py-3 bg-black/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[...Array(8)].map((_, i: number) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i < password.length
                          ? "password-indicator-active"
                          : "password-indicator-inactive"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {password.length > 0 &&
                    `${password.length} character${password.length !== 1 ? "s" : ""} entered`}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!password.trim() || isLoading}
                className={`w-full py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 group ${
                  !password.trim() || isLoading
                    ? "submit-button-disabled"
                    : "submit-button-active"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full loading-spinner" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Access Link</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              Powered by{" "}
              <span className="text-orange-500 font-medium">RedirectTo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLinkPage;
