import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useDisableScroll } from "@/hooks/useDisableScroll";
import AnimatedStarButton from "../custom/AnimatedButton";
import { UrlCreationFormProps, UrlFormData } from "@/types/types";
import { useUrlManagement } from "@/hooks/useUrlQueries";

// Error Message Component
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 mt-2 animate-in slide-in-from-top-1 duration-200">
      <div className="flex-shrink-0">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
      <p className="text-xs text-red-400 font-medium">{message}</p>
    </div>
  );
};

const UrlCreationForm: React.FC<
  UrlCreationFormProps & { onSuccess?: () => void }
> = ({ isOpen, onClose, onSuccess }) => {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setErrors({});
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess]);

  // Validation functions
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false;

    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 4;
  };

  const validateExpiry = (date: string): boolean => {
    if (!date) return false;
    const expiryDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return expiryDate > today;
  };

  const validateClickLimit = (limit: number): boolean => {
    return limit >= 0 && limit <= 10000;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // URL validation
    if (!formData.destination.trim()) {
      newErrors.destination = "URL is required";
    } else if (!validateUrl(formData.destination)) {
      newErrors.destination =
        "Please enter a valid URL (must start with http:// or https://)";
    }

    // Password validation
    if (formData.is_protected) {
      if (!formData?.password?.trim()) {
        newErrors.password = "Password is required for protected URLs";
      } else if (!validatePassword(formData.password || "")) {
        newErrors.password = "Password must be at least 4 characters long";
      }
    }

    // Expiry validation
    if (hasExpiry) {
      if (!formData.expires_at) {
        newErrors.expires_at = "Expiry date is required";
      } else if (!validateExpiry(formData.expires_at)) {
        newErrors.expires_at = "Expiry date must be in the future";
      }
    }

    // Click limit validation
    if (!validateClickLimit(formData.click_limit || 0)) {
      newErrors.click_limit = "Click limit must be between 0 and 10,000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payloadToSend = {
      ...formData,
      destination: formData.destination.trim(),
      expires_at: hasExpiry ? formData.expires_at : null,
      click_limit:
        formData.click_limit === 0 ? undefined : formData.click_limit,
      password: formData.is_protected ? formData.password : null,
      long_url: formData.destination.trim(),
    };

    try {
      await createUrl(payloadToSend);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w- w-full h-full inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        {/* Glassy modal container */}
        <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between p-6">
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
                  onChange={(e) => {
                    setFormData({ ...formData, destination: e.target.value });
                    clearError("destination");
                  }}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className={`w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg text-white/90 placeholder-white/40 focus:outline-none transition-all duration-200 hover:bg-white/10 ${
                    errors.destination
                      ? "border border-red-500/50 bg-red-500/5"
                      : "border border-transparent"
                  }`}
                  required
                />
              </div>
              {errors.destination && (
                <ErrorMessage message={errors.destination} />
              )}
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
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    formData.is_protected ? "bg-white/80" : "bg-white/10"
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
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          clearError("password");
                        }}
                        placeholder="Enter password for protected URL"
                        className={`w-full px-4 py-2 pr-12 bg-white/5 backdrop-blur-sm rounded-lg text-white/90 placeholder-white/40 focus:outline-none transition-all duration-200 hover:bg-white/10 ${
                          errors.password
                            ? "border border-red-500/50 bg-red-500/5"
                            : "border border-transparent"
                        }`}
                        required={formData.is_protected}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-white/50 hover:text-white/80 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {errors.password && (
                      <ErrorMessage message={errors.password} />
                    )}
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
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    hasExpiry ? "bg-white/80" : "bg-white/10"
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
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.expires_at}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          expires_at: e.target.value,
                        });
                        clearError("expires_at");
                      }}
                      min={getTodayDate()}
                      className={`w-full px-4 py-3.5 bg-white/5 backdrop-blur-sm rounded-2xl text-white/90 focus:outline-none transition-all duration-200 hover:bg-white/10 [color-scheme:dark] ${
                        errors.expires_at
                          ? "border border-red-500/50 bg-red-500/5"
                          : "border border-transparent"
                      }`}
                      required={hasExpiry}
                    />
                  </div>
                  {errors.expires_at && (
                    <ErrorMessage message={errors.expires_at} />
                  )}
                </div>
              )}
            </div>

            {/* Click Limit */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                Click Limit
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.click_limit}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      click_limit: Math.min(
                        parseInt(e.target.value) || 0,
                        10000,
                      ),
                    });
                    clearError("click_limit");
                  }}
                  placeholder="0 (unlimited clicks)"
                  min="0"
                  max="10000"
                  className={`w-full px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg text-white/90 placeholder-white/40 focus:outline-none transition-all duration-200 hover:bg-white/10 ${
                    errors.click_limit
                      ? "border border-red-500/50 bg-red-500/5"
                      : "border border-transparent"
                  }`}
                />
              </div>
              {errors.click_limit && (
                <ErrorMessage message={errors.click_limit} />
              )}
              <p className="text-xs text-white/50">
                Set to 0 for unlimited clicks
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 bg-white/5 backdrop-blur-sm text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-bold"
              >
                Cancel
              </button>
              <AnimatedStarButton
                className={"flex-1 px-6 "}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create"}
              </AnimatedStarButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCreationForm;
