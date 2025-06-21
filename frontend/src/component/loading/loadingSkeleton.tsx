import { useTheme } from "@/providers/ThemeProvider";

export const LoadingSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-4 max-w-9xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse mb-2 border border-white/10 dark:border-white/20"></div>
            <div className="h-4 w-64 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse border border-white/10 dark:border-white/20"></div>
          </div>
          <div className="h-12 w-32 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse border border-white/10 dark:border-white/20"></div>
        </div>

        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-120 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-120 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
        </div>
      </div>
    </div>
  );
};
