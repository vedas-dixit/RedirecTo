"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, Shield, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useUrlManagement } from "@/hooks/useUrlQueries";

// Mock types for demonstration
interface DynamicStar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

interface ProtectedUrlPageProp {
  shortCode: string;
}

const ProtectedLinkPage: React.FC<ProtectedUrlPageProp> = ({
  shortCode = "demo123",
}) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [stars, setStars] = useState<DynamicStar[]>([]);
  const [backgroundStars, setBackgroundStars] = useState<Star[]>([]);
  const [error, setError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { useVerifyPasswordMutation } = useUrlManagement();
  const { mutate: verifyPassword, isPending } = useVerifyPasswordMutation();

  useEffect(() => {
    const generateBackgroundStars = (): void => {
      const newStars: Star[] = [];
      for (let i = 0; i < 40; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          animationDelay: Math.random() * 5,
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
        "#ff4444",
        "#ff6b47",
        "#ff8c42",
        "#ffa726",
        "#ffb347",
        "#ff7043",
      ];
      const newStar: DynamicStar = {
        id: Date.now() + Math.random(),
        x: Math.random() * 70 + 15,
        y: Math.random() * 50 + 25,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setStars((prev) => [...prev, newStar]);

      const timeoutId = setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [password.length]);

  const handleSubmit = async (): Promise<void> => {
    if (!password.trim()) return;

    verifyPassword(
      { shortCode, password },
      {
        onSuccess: (data) => {
          window.location.href = data.destination;
        },
        onError: (error) => {
          console.error("Invalid password", error);
        },
      },
    );
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(e.target.value);
    setError("");
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
      className="min-h-screen relative overflow-hidden"
      ref={containerRef}
      style={{
        background:
          "radial-gradient(circle,rgba(77, 39, 39, 1) 0%, rgba(158, 82, 47, 1) 50%, rgba(112, 52, 52, 1) 100%)",
      }}
    >
      {/* Animated gradient overlay with flowing effects */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 10% 20%, rgba(255, 68, 68, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 80%, rgba(255, 107, 71, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 60% 10%, rgba(204, 43, 43, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 90%, rgba(139, 26, 26, 0.2) 0%, transparent 50%)
          `,
          animation: "gradientShift 15s ease-in-out infinite alternate",
        }}
      />

      {/* Flowing curved shapes */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 68, 68, 0.3) 0%, transparent 70%)",
            transform: "rotate(-15deg)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 107, 71, 0.4) 0%, transparent 70%)",
            transform: "rotate(25deg)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Background Stars */}
      {backgroundStars.map((star: Star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 180, 71, 0.4) 100%)",
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: "4s",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
        />
      ))}

      {/* Dynamic Stars from Password Input */}
      {stars.map((star: DynamicStar) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 20px ${star.color}, 0 0 40px ${star.color}40`,
            animationDuration: "1.5s",
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 relative group">
              <div
                className="absolute inset-0 backdrop-blur-xl rounded-3xl border group-hover:bg-white/15 transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              />
              <Shield className="w-12 h-12 text-white relative z-10 drop-shadow-2xl" />
              <Sparkles className="w-5 h-5 text-orange-200 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-2xl">
              Protected Access
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
              Enter the password to access this protected content
            </p>
          </div>

          {/* Main Card */}
          <div className="relative group">
            {/* Enhanced glass background */}
            <div
              className="absolute inset-0 backdrop-blur-2xl rounded-3xl shadow-2xl border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            />
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 107, 71, 0.1) 0%, transparent 50%, rgba(255, 68, 68, 0.1) 100%)",
              }}
            />

            <div className="relative z-10 p-8 sm:p-10">
              <div className="space-y-7">
                {/* Password Input */}
                <div className="space-y-4">
                  <label className="block text-base font-semibold text-white/95">
                    Access Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-6 w-6 text-white/70 group-focus-within:text-white/90 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your password"
                      className="w-full pl-14 pr-16 py-5 backdrop-blur-sm rounded-2xl focus:ring-2 focus:ring-white/40 focus:border-white/50 text-white text-lg placeholder-white/60 transition-all duration-300"
                      style={{
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.25)",
                      }}
                      disabled={isPending}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/70 hover:text-white/95 transition-colors focus:outline-none"
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6" />
                      ) : (
                        <Eye className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    {[...Array(12)].map((_, i: number) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                          i < password.length
                            ? "bg-gradient-to-r from-orange-800 to-red-800 shadow-lg"
                            : "bg-white/25"
                        }`}
                        style={{
                          boxShadow:
                            i < password.length
                              ? "0 0 10px rgba(255, 107, 71, 0.5)"
                              : undefined,
                        }}
                      />
                    ))}
                  </div>
                  {password.length > 0 && (
                    <p className="text-sm text-white/80 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-orange-300 rounded-full animate-pulse shadow-lg" />
                      {password.length} character
                      {password.length !== 1 ? "s" : ""} entered
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div
                    className="p-4 backdrop-blur-sm border rounded-2xl"
                    style={{
                      background: "rgba(255, 68, 68, 0.2)",
                      borderColor: "rgba(255, 68, 68, 0.4)",
                    }}
                  >
                    <p className="text-red-100 text-sm text-center font-medium">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!password.trim() || isPending}
                  className={`w-full py-5 px-8 text-lg font-bold rounded-2xl transition-all duration-500 ease-in-out flex items-center justify-center space-x-3 group relative overflow-hidden backdrop-blur-md ${
                    !password.trim() || isPending
                      ? "text-white/70 cursor-not-allowed"
                      : "text-orange-900 shadow-2xl hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                  style={{
                    background:
                      !password.trim() || isPending
                        ? "rgba(255, 255, 255, 0.15)" // frosted white
                        : "linear-gradient(135deg, #fff3e0 0%, #ffe0cc 50%, #ffd1b3 100%)", // light orange almost white
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow:
                      !password.trim() || isPending
                        ? "0 4px 20px rgba(255, 255, 255, 0.1)"
                        : "0 20px 40px -12px rgba(255, 195, 160, 0.4)",
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  {isPending ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Access...</span>
                    </>
                  ) : (
                    <>
                      <span>Let&apos;s Redirect</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-10">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-sm rounded-full border"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              <div className="w-2.5 h-2.5 bg-orange-300 rounded-full animate-pulse shadow-lg" />
              <p className="text-sm text-white/90 font-medium">
                Secured by{" "}
                <span className="text-orange-200 font-bold">RedirectTo</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1) rotate(2deg);
            opacity: 0.4;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-15deg);
          }
          50% {
            transform: translateY(-20px) rotate(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProtectedLinkPage;
