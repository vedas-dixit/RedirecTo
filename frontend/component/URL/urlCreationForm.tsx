import React, { useState } from "react";
import { X, Link, Sparkles } from "lucide-react";
import { useCreateUrl } from "../../hooks/createUrl";
import { UrlCreationFormProps } from "@/types/types";

// Custom hook placeholder - you can implement this later

const UrlCreationForm: React.FC<UrlCreationFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [longUrl, setLongUrl] = useState("");
  const { createUrl } = useCreateUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;

    await createUrl(longUrl);
    setLongUrl("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-300" />

      {/* Modal */}
      <div className="relative bg-[#171717] rounded-3xl border border-orange-900/60 p-8 w-full max-w-md mx-auto shadow-2xl shadow-orange-900/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-10 rounded-3xl">
          <div className="w-full h-full bg-gradient-to-br from-orange-600/20 to-transparent rounded-3xl" />
        </div>

        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 rounded-3xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-800/30 rounded-xl flex items-center justify-center group-hover:bg-orange-700/40 transition-all duration-300">
                <Link className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-white text-2xl font-semibold">
                Create Short URL
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 bg-orange-800/20 hover:bg-orange-700/30 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium block">
                Enter your long URL
              </label>
              <div className="relative group">
                <input
                  type="url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className="w-full bg-[#0f0f0f] border border-orange-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600/60 focus:ring-2 focus:ring-orange-600/20 transition-all duration-300 group-hover:border-orange-800/60"
                  required
                />

                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl py-3 px-6 font-medium transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!longUrl.trim() || false}
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl py-3 px-6 font-medium transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-orange-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
              >
                {false ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    Create URL
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full opacity-60 animate-ping" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-orange-600 rounded-full opacity-40 animate-pulse" />
      </div>
    </div>
  );
};

export default UrlCreationForm;
