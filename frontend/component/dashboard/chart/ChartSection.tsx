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
import { useThemeStyles } from "../../../src/hooks/useThemeStyles";

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
  const styles = useThemeStyles();
  const gradients = styles.gradientAccents();

  return (
    <Card className={`${styles.glassmorphicCard("primary")} h-full group`}>
      {/* Gradient overlay for extra depth */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients.primary} opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}
      />
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>
      {/* Glowing accent border */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradients.glow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`}
      />{" "}
      <CardHeader className="relative z-10 pb-2 sm:pb-4">
        <CardTitle
          className={`${styles.text("primary")} group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300 text-lg`}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={`${styles.text("muted")} group-hover:text-white/90 dark:group-hover:text-orange-200/80 transition-colors duration-300 text-sm`}
        >
          {description}
        </CardDescription>
      </CardHeader>{" "}
      <CardContent className="relative z-10 p-3 sm:p-6">
        {!data || data.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-80 ${styles.text("muted")}`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-black/5 to-black/10 dark:from-orange-950/30 dark:to-orange-900/40 flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-orange-400/10">
                <svg
                  className="w-8 h-8 text-white/70 dark:text-orange-300/60"
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
              <h3
                className={`text-lg font-medium mb-2 ${styles.text("secondary")}`}
              >
                No Click Analytics Data Available
              </h3>
              <p className={`text-sm ${styles.text("muted")}`}>
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
