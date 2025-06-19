import React from "react";

interface GlassyToastProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
}

const typeStyles = {
  error: "bg-red-500/20 border-red-400/40 text-red-200",
  success: "bg-green-500/20 border-green-400/40 text-green-200",
  info: "bg-white/10 border-white/20 text-white",
};

const GlassyToast: React.FC<GlassyToastProps> = ({ message, type = "info", onClose }) => {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999] min-w-[240px] max-w-xs px-6 py-3 rounded-2xl shadow-xl border backdrop-blur-lg glassy-loader-box animate-fade-in flex items-center gap-3 ${typeStyles[type]}`}
      role="alert"
    >
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded-full hover:bg-white/10 transition"
        aria-label="Dismiss notification"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-white/70 hover:text-white">
          <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default GlassyToast; 