import { useTheme } from "../providers/ThemeProvider";

export const useThemeStyles = () => {
  const { theme } = useTheme();
  const getGlassmorphicCardStyles = (
    variant: "primary" | "secondary" | "accent" = "primary",
  ) => {
    const baseStyles =
      "backdrop-blur-xl transition-all duration-500 relative overflow-hidden group";
    if (theme === "dark") {
      switch (variant) {
        case "primary":
          return `${baseStyles} bg-gradient-to-br from-black/40 via-black/50 to-orange-950/15 border border-white/20 hover:border-orange-400/20 shadow-2xl shadow-black/60 hover:shadow-orange-500/10 hover:bg-gradient-to-br hover:from-black/50 hover:via-orange-950/20 hover:to-orange-900/15`;
        case "secondary":
          return `${baseStyles} bg-gradient-to-br from-black/30 via-black/40 to-orange-950/12 border border-white/15 hover:border-orange-400/15 shadow-xl shadow-black/50 hover:shadow-orange-500/8 hover:bg-gradient-to-br hover:from-black/40 hover:via-orange-950/18 hover:to-orange-900/12`;
        case "accent":
          return `${baseStyles} bg-gradient-to-br from-orange-950/20 via-black/50 to-orange-900/20 border border-orange-400/15 hover:border-orange-400/25 shadow-2xl shadow-black/50 hover:shadow-2xl hover:shadow-orange-500/15`;
        default:
          return `${baseStyles} bg-gradient-to-br from-black/40 via-black/50 to-orange-950/15 border border-white/20 shadow-2xl shadow-black/60`;
      }
    } else {
      switch (variant) {
        case "primary":
          return `${baseStyles} bg-gradient-to-br from-white/8 via-white/12 to-white/15 border border-white/25 hover:border-white/40 shadow-2xl shadow-black/30 hover:shadow-black/40`;
        case "secondary":
          return `${baseStyles} bg-gradient-to-br from-white/5 via-white/8 to-white/10 border border-white/20 hover:border-white/35 shadow-xl shadow-black/25 hover:shadow-black/35`;
        case "accent":
          return `${baseStyles} bg-gradient-to-br from-white/12 via-white/15 to-white/18 border border-white/30 hover:border-white/45 shadow-2xl shadow-black/35 hover:shadow-black/45`;
        default:
          return `${baseStyles} bg-gradient-to-br from-white/8 via-white/12 to-white/15 border border-white/25 shadow-2xl shadow-black/30`;
      }
    }
  };

  const getTextStyles = (
    variant: "primary" | "secondary" | "muted" = "primary",
  ) => {
    if (theme === "dark") {
      switch (variant) {
        case "primary":
          return "text-white/95";
        case "secondary":
          return "text-white/85";
        case "muted":
          return "text-white/80";
        default:
          return "text-white/95";
      }
    } else {
      switch (variant) {
        case "primary":
          return "text-white/90";
        case "secondary":
          return "text-white/80";
        case "muted":
          return "text-white/70";
        default:
          return "text-white/90";
      }
    }
  };

  const getBackgroundImage = () => {
    return `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`;
  };
  const getSkeletonStyles = () => {
    return theme === "dark"
      ? "bg-gradient-to-br from-black/40 via-orange-950/15 to-orange-900/10 border border-white/20 backdrop-blur-xl shadow-2xl shadow-orange-500/8"
      : "bg-gradient-to-br from-white/8 via-white/12 to-white/15 border border-white/25 backdrop-blur-xl shadow-2xl shadow-black/30";
  };
  const getGradientAccents = () => {
    if (theme === "dark") {
      return {
        primary: "from-orange-600/8 to-orange-700/6",
        secondary: "from-orange-500/6 to-orange-600/4",
        accent: "from-orange-500/12 via-orange-600/8 to-orange-700/12",
        glow: "from-orange-400/15 to-orange-300/12",
      };
    } else {
      return {
        primary: "from-white/20 to-white/15",
        secondary: "from-white/15 to-white/10",
        accent: "from-white/25 via-white/20 to-white/30",
        glow: "from-white/40 to-white/35",
      };
    }
  };
  return {
    glassmorphicCard: getGlassmorphicCardStyles,
    text: getTextStyles,
    backgroundImage: getBackgroundImage,
    skeleton: getSkeletonStyles,
    gradientAccents: getGradientAccents,
    theme,
  };
};
