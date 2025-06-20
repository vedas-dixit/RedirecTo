"use client";

import React, { useState } from "react";
import { Lock, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useUrlManagement } from "@/hooks/useUrlQueries";

interface ProtectedUrlPageProp {
  shortCode: string;
}

const ProtectedLinkPage: React.FC<ProtectedUrlPageProp> = ({
  shortCode = "demo123",
}) => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { useVerifyPasswordMutation } = useUrlManagement();
  const { mutate: verifyPassword, isPending } = useVerifyPasswordMutation();

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-slate-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgb(255,255,255) 1px, transparent 0)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Gentle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/8 to-amber-500/8 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-amber-500/8 to-yellow-500/8 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-400/8 to-red-400/8 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black/50 backdrop-blur-xl rounded-2xl mb-6 shadow-2xl border border-orange-400/30">
              <Shield className="w-10 h-10 text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">
              Protected Content
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              This content is password protected. Please enter the password to
              continue.
            </p>
          </div>

          {/* Glassmorphic Main Card */}
          <div
            className="relative backdrop-blur-2xl rounded-2xl shadow-2x p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(251, 146, 60, 0.03) 50%, rgba(255, 255, 255, 0.05) 100%)",
              boxShadow:
                "0 25px 45px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(251, 146, 60, 0.05)",
            }}
          >
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-orange-400/[0.04] via-white/[0.03] to-transparent" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Password Input */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter password"
                    className="w-full pl-12 pr-12 py-4 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 text-white placeholder-gray-500 transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    disabled={isPending}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                    disabled={isPending}
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
              {password.length > 0 && (
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    {[...Array(8)].map((_, i: number) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          i < password.length
                            ? "bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm"
                            : "bg-white/10"
                        }`}
                        style={{
                          boxShadow:
                            i < password.length
                              ? "0 0 6px rgba(245, 158, 11, 0.4)"
                              : undefined,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span>{password.length} characters entered</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  className="p-4 backdrop-blur-sm border border-red-500/30 rounded-xl"
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    boxShadow: "inset 0 1px 0 rgba(239, 68, 68, 0.2)",
                  }}
                >
                  <p className="text-red-300 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!password.trim() || isPending}
                className={`w-full py-4 px-6 text-base font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-sm ${
                  !password.trim() || isPending
                    ? "text-gray-500 cursor-not-allowed border border-white/10"
                    : "text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border border-orange-400/30"
                }`}
                style={{
                  background:
                    !password.trim() || isPending
                      ? "rgba(255, 255, 255, 0.05)"
                      : "linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(249, 115, 22, 0.9) 100%)",
                  boxShadow:
                    !password.trim() || isPending
                      ? "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                      : "0 8px 32px rgba(245, 158, 11, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-amber-400 rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Access Content</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border border-white/10 shadow-sm"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
              <p className="text-xs text-gray-400 font-medium">
                Secured by{" "}
                <span className="text-orange-400 font-semibold">
                  RedirectTo
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLinkPage;
