"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../UI/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

interface CountryData {
  country: string;
  clicks: number;
  color: string;
}

interface CountryDistributionProps {
  data: CountryData[];
  title?: string;
  description?: string;
}

const CountryDistribution: React.FC<CountryDistributionProps> = ({
  data,
  title = "Click Distribution by Country",
  description = "Top 5 countries",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create uniform color palette for consistency
  const uniformColors = [
    "rgba(255, 255, 255, 0.9)",
    "rgba(255, 255, 255, 0.8)",
    "rgba(255, 255, 255, 0.7)",
    "rgba(255, 255, 255, 0.6)",
    "rgba(255, 255, 255, 0.5)",
  ];

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>
      <CardHeader className="relative z-10 pb-2 sm:pb-4">
        <CardTitle className="text-white/90 text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-white/70 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 p-3 sm:p-6">        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 10, right: 15, bottom: 10, left: 15 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? 60 : 80}
              innerRadius={isMobile ? 20 : 30}
              dataKey="clicks"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={1}
              label={({
                country,
                clicks,
                percent,
              }: {
                country: string;
                clicks: number;
                percent: number;
              }) => 
                isMobile 
                  ? `${(percent * 100).toFixed(0)}%` 
                  : `${country}: ${clicks}`
              }
              labelLine={false}
              fontSize={isMobile ? 10 : 12}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={uniformColors[index % uniformColors.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "#000000",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
              }}
              labelStyle={{ color: "#000000", fontWeight: "500" }}
              itemStyle={{ color: "#000000" }}
              formatter={(value: number, name: string) => [
                `${value} clicks`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CountryDistribution;
