"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../src/component/UI/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
        <CardTitle className="text-white/90 text-lg">{title}</CardTitle>
        <CardDescription className="text-white/70 text-sm">
          {description}
        </CardDescription>{" "}
      </CardHeader>
      <CardContent className="relative z-10 p-3 sm:p-6">
        {!data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 text-white/70">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white/80 mb-2">
                No Country Distribution Data Available
              </h3>
              <p className="text-sm text-white/60">
                Create some URLs and share them to see country analytics here
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <PieChart margin={{ top: 0, right: 15, bottom: 5, left: 15 }}>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                outerRadius={isMobile ? 85 : 130}
                innerRadius={isMobile ? 28 : 45}
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
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CountryDistribution;
