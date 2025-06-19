import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import AnimatedStarButton from "../custom/AnimatedButton";
import { UrlCreationFormProps, UrlFormData } from "@/types/types";
import { useUrlManagement } from "@/hooks/useUrlQueries";

const UrlCreationForm: React.FC<UrlCreationFormProps & { onSuccess?: () => void }> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UrlFormData>({
    destination: "",
    is_protected: false,
    password: "",
    expires_at: "",
    click_limit: 0,
  });

  const { createUrl, createSuccess } = useUrlManagement();

  const [showPassword, setShowPassword] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);
  useDisableScroll(isOpen);

  React.useEffect(() => {
    if (createSuccess) {
      setFormData({
        destination: "",
        is_protected: false,
        password: "",
        expires_at: "",
        click_limit: 0,
      });
      if (onSuccess) onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess]);

  const handleSubmit = () => {
    const payloadToSend = {
      ...formData,
      expires_at: hasExpiry ? formData.expires_at : null,
      click_limit:
        formData.click_limit === 0 ? undefined : formData.click_limit,
      password: formData.is_protected ? formData.password : null,
      long_url: formData.destination, // key correction if needed
    };

    createUrl(payloadToSend); // perfect
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w- w-full h-full inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        {/* Glassy modal container */}
        <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-orange-500/5 pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white/90">
                Create a Short URL
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Form */}
          <div className="relative p-6 space-y-6">
            {/* URL Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                Your Long URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 hover:bg-white/10"
                  required
                />
              </div>
            </div>

            {/* Protected URL Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  Password Protection
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      is_protected: !formData.is_protected,
                    })
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm border ${
                    formData.is_protected
                      ? "bg-orange-500/80 border-orange-500/40"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      formData.is_protected ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {formData.is_protected && (
                <div className="relative overflow-hidden">
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Enter password for protected URL"
                      className="w-full px-4 py-2 pr-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 hover:bg-white/10"
                      required={formData.is_protected}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Expiry Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                  Set Expiry Date
                </label>
                <button
                  type="button"
                  onClick={() => setHasExpiry(!hasExpiry)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm border ${
                    hasExpiry
                      ? "bg-orange-500/80 border-orange-500/40"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      hasExpiry ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {hasExpiry && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <input
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) =>
                      setFormData({ ...formData, expires_at: e.target.value })
                    }
                    min={getTodayDate()}
                    className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 hover:bg-white/10 [color-scheme:dark]"
                    required={hasExpiry}
                  />
                </div>
              )}
            </div>

            {/* Click Limit */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                Click Limit
              </label>
              <input
                type="number"
                value={formData.click_limit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    click_limit: Math.min(parseInt(e.target.value) || 0, 10000),
                  })
                }
                placeholder="0 (unlimited clicks)"
                min="0"
                className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-200 hover:bg-white/10"
              />
              <p className="text-xs text-white/50">
                Set to 0 for unlimited clicks
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-bold"
              >
                Cancel
              </button>
              <AnimatedStarButton
                className={"flex-1 px-6 "}
                onClick={handleSubmit}
              >
                Create
              </AnimatedStarButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCreationForm;
