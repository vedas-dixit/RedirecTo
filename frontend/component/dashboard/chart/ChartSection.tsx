"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../src/component/UI/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

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

interface ChartData {
  day: string;
  clicks: number;
}

interface ChartSectionProps {
  data: ChartData[];
  title?: string;
  description?: string;
}

const ChartSection: React.FC<ChartSectionProps> = ({
  data,
  title = "Clicks Over Time",
  description = "Last 7 days",
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>{" "}
      <CardHeader className="relative z-10 pb-2 sm:pb-4">
        <CardTitle className="text-white/90 text-lg">{title}</CardTitle>
        <CardDescription className="text-white/70 text-sm">
          {description}
        </CardDescription>
      </CardHeader>{" "}
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white/80 mb-2">
                No Click Analytics Data Available
              </h3>
              <p className="text-sm text-white/60">
                Create some URLs and share them to see click analytics here
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
              />{" "}
              <XAxis
                dataKey="day"
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={10}
                tickLine={{ stroke: "rgba(255, 255, 255, 0.3)" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.3)" }}
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={10}
                tickLine={{ stroke: "rgba(255, 255, 255, 0.3)" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.3)" }}
                tick={{ fontSize: 10 }}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
                labelStyle={{ color: "rgba(255, 255, 255, 0.9)" }}
                itemStyle={{ color: "rgba(255, 255, 255, 0.9)" }}
              />{" "}
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth={2}
                dot={{
                  fill: "rgba(255, 255, 255, 0.9)",
                  strokeWidth: 1,
                  r: 3,
                  stroke: "rgba(255, 255, 255, 0.5)",
                }}
                activeDot={{
                  r: 5,
                  fill: "#ffffff",
                  stroke: "rgba(255, 255, 255, 0.3)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartSection;
