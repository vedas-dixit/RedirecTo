import { Card, CardContent, CardHeader, CardTitle } from "../../UI/card";
import { ActivityFeedProps } from "../types/dashboard.types";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

// Dynamic import for client-side only
const LiquidGlassWrapper = ({ children }: { children: React.ReactNode }) => {
  const [LiquidGlass, setLiquidGlass] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import('liquid-glass-react').then((module) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => (
  <Card className="bg-white/5 backdrop-blur-xl border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <LiquidGlassWrapper>
        <div className="w-full h-full" />
      </LiquidGlassWrapper>
    </div>
    <CardHeader className="relative z-10">
      <CardTitle className="flex items-center gap-2 text-white/90">
        Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-3 rounded-lg bg-black/10 hover:bg-white/15 transition-colors border border-none"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg text-white drop-shadow-sm">{activity.flag}</span>
              <div>
                <p className="text-sm font-medium text-white drop-shadow-sm">
                  {activity.shortUrl}
                </p>
                <p className="text-xs text-white/70">{activity.country}</p>
              </div>
            </div>
            <span className="text-xs text-white/70">{activity.time}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
