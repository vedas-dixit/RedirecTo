import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { SummaryCardProps } from "../types/dashboard.types";
import { useState, useEffect } from "react";

// Dynamic import for client-side only
const LiquidGlassWrapper = ({ children }: { children: React.ReactNode }) => {
  const [LiquidGlass, setLiquidGlass] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import("liquid-glass-react").then((module) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
}) => (
  <Card className="bg-white/5 backdrop-blur-md border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <LiquidGlassWrapper>
        <div className="w-full h-full" />
      </LiquidGlassWrapper>
    </div>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
      <CardTitle className="text-sm font-medium text-white/90">
        {title}
      </CardTitle>
      {/* <Icon className="h-4 w-4 text-white drop-shadow-sm" /> */}
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-2xl font-bold text-white drop-shadow-sm mb-2">
        {value}
      </div>
      <p className="text-xs text-white/70">{subtitle}</p>
    </CardContent>
  </Card>
);
