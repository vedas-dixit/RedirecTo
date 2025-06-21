import { useTheme } from "@/providers/ThemeProvider";
import { AlertCircle } from "lucide-react";

export const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({
  error,
  onRetry,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-center space-y-4 bg-white/3 dark:bg-black/50 backdrop-blur-xl rounded-lg p-8 border border-white/15 dark:border-white/25 shadow-2xl shadow-black/40 dark:shadow-black/80">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold text-white">
          Failed to load dashboard
        </h2>
        <p className="text-white/70 dark:text-white/80">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-orange-700/80 hover:bg-orange-600/90 rounded-lg transition-colors text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
