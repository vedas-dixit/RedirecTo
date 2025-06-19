import React, { JSX, useEffect, useRef, useState } from "react";
import { X, Mail, Save } from "lucide-react";
import { UpdateUserModalProps } from "@/types/types";
import { useToast } from "@/providers/QueryProvider";

interface UserUpdateData {
  email: string;
}

function UpdateUserModal({
  isOpen,
  onClose,
}: UpdateUserModalProps): JSX.Element | null {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserUpdateData>({
    email: "",
  });
  const [errors, setErrors] = useState<Partial<UserUpdateData>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<UserUpdateData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add authorization header if you have user token
            // 'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        showToast({ message: errorData.detail || "Failed to update user", type: "error" });
        throw new Error(errorData.detail || "Failed to update user");
      }

      // Close modal on success
      showToast({ message: "User updated successfully!", type: "success" });
      onClose();
    } catch (error) {
      console.error("Update user error:", error);
      if (error instanceof Error) {
        showToast({ message: error.message, type: "error" });
      }
      // You can add error handling here, like showing a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    field: keyof UserUpdateData,
    value: string,
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#171717] rounded-2xl shadow-2xl border border-orange-900/60 transform transition-all duration-300 scale-100 opacity-100 sm:max-w-lg"
      >
        {/* Close Button - Desktop */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-orange-700/40 rounded-full transition-colors duration-200 hidden sm:flex items-center justify-center"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>{" "}
        {/* Mobile Header with Close */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sm:hidden">
          <h2 className="text-xl font-semibold text-white">Update Email</h2>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 text-gray-400 hover:text-white hover:bg-orange-700/40 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {" "}
          {/* Header - Desktop */}
          <div className="text-center mb-8 hidden sm:block">
            <h2 className="text-2xl font-bold text-white mb-2">Update Email</h2>
            <p className="text-gray-400">Update your email address</p>
          </div>
          {/* Mobile Header Content */}
          <div className="text-center mb-6 sm:hidden">
            <p className="text-gray-400">Update your email address</p>
          </div>
          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>{" "}
            {/* Update Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl border border-orange-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {isLoading ? "Updating Email..." : "Update Email"}
            </button>
          </form>
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-900 text-gray-400">
                Secure update
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;
