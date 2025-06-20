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
      onClick={toggleTheme}      className={`
        relative w-12 h-12 rounded-lg transition-all duration-500 group
        bg-gradient-to-br from-white/5 via-orange-50/15 to-orange-100/10 dark:from-black/40 dark:via-orange-900/25 dark:to-orange-800/20 
        hover:from-white/10 dark:hover:from-black/60 dark:hover:via-orange-800/35 dark:hover:to-orange-700/30 
        backdrop-blur-xl border border-white/15 dark:border-white/20 hover:border-white-/40 dark:hover:border-orange-400/40
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
      </div>      {/* Enhanced orange glassmorphic glow effect */}
      
    </button>
  );
};
