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
    import('liquid-glass-react').then((module) => {
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
      </div>      <CardHeader className="relative z-10 pb-2 sm:pb-4">
        <CardTitle className="text-white/90 text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="text-white/70 text-sm">
          {description}
        </CardDescription>
      </CardHeader>      <CardContent className="relative z-10 p-3 sm:p-6">
        {data.length > 0 ? (
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
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />            <XAxis
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
              />            <Line
                type="monotone"
                dataKey="clicks"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth={2}
                dot={{
                  fill: "rgba(255, 255, 255, 0.9)",
                  strokeWidth: 1,
                  r: 3,
                  stroke: "rgba(255, 255, 255, 0.5)"
                }}
                activeDot={{
                  r: 5,
                  fill: "#ffffff",
                  stroke: "rgba(255, 255, 255, 0.3)",
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>) : (<div className="h-72 flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No click data available</p>
                    <p className="text-sm">Create some URLs to see analytics</p>
                  </div>
                </div>)}
      </CardContent>
    </Card>
  );
};

export default ChartSection;
