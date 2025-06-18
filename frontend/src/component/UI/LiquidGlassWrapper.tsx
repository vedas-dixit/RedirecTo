import { useState, useEffect } from "react";

interface LiquidGlassWrapperProps {
  children: React.ReactNode;
}

interface LiquidGlassComponent {
  default: React.ComponentType<{ children: React.ReactNode }>;
}

export const LiquidGlassWrapper: React.FC<LiquidGlassWrapperProps> = ({
  children,
}) => {
  const [LiquidGlass, setLiquidGlass] = useState<React.ComponentType<{
    children: React.ReactNode;
  }> | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import("liquid-glass-react").then((module: LiquidGlassComponent) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};
