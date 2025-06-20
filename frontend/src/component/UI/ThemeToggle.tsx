import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../providers/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-12 h-12 rounded-full transition-all duration-500 group
        bg-gradient-to-br from-white/5 via-orange-50/15 to-orange-100/10 dark:from-black/40 dark:via-orange-900/25 dark:to-orange-800/20 
        hover:from-white/10 hover:via-orange-100/25 hover:to-orange-200/15 dark:hover:from-black/60 dark:hover:via-orange-800/35 dark:hover:to-orange-700/30 
        backdrop-blur-xl border border-white/15 dark:border-white/20 hover:border-orange-300/40 dark:hover:border-orange-400/40
        flex items-center justify-center shadow-2xl dark:shadow-orange-500/25 hover:shadow-orange-500/35 dark:hover:shadow-orange-500/45
        hover:scale-105 active:scale-95
        ${className}
      `}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-white transition-all duration-300" />
        ) : (
          <Sun className="w-5 h-5 text-white transition-all duration-300" />
        )}
      </div>{" "}
      {/* Enhanced orange glassmorphic glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/50 via-orange-400/40 to-orange-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      {/* Additional inner orange glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/25 to-orange-500/25 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none" />
    </button>
  );
};
