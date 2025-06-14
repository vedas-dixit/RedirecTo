"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../component/UI/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link, BarChart3, Clock, Shield } from "lucide-react";

import {
  summaryData,
  clicksOverTime,
  countryData,
  recentActivity,
  urlsData,
} from "./dummydata";
import {
  GuestData,
  SummaryData,
} from "../../../component/dashboard/types/dashboard.types";
import { URLTable } from "../../../component/dashboard/table/URLTable";
import { ActivityFeed } from "../../../component/dashboard/activity/ActivityFeed";
import { SummaryCard } from "../../../component/dashboard/summary-cards/SummaryCard";
import { SettingsCard } from "../../../component/dashboard/settings/SettingsCard";
import { GuestLimitCard } from "../../../component/dashboard/summary-cards/GuestLimitCard";
import AnimatedStarButton from "../../../component/custom/AnimatedButton";
import UrlCreationForm from "../../../component/URL/urlCreationForm";

// Main Dashboard Component
const URLShortenerDashboard: React.FC = () => {
  const data: SummaryData | GuestData = summaryData;
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 max-w-9xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400">
              {"Welcome back! Here's your URL analytics."}
            </p>
          </div>
          <AnimatedStarButton
            className="p-3"
            onClick={() => setIsUrlFormOpen(true)}
          >
            Create URL
          </AnimatedStarButton>
        </div>
        <UrlCreationForm
          isOpen={isUrlFormOpen}
          onClose={() => setIsUrlFormOpen(false)}
        />
        {/* Guest Limit Card */}
        {false && "limit" in data && (
          <GuestLimitCard current={data.totalUrls as number} limit={12} />
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Short URLs"
            value={data.totalUrls}
            subtitle={"+12 from last month"}
            icon={Link}
          />
          <SummaryCard
            title="Total Clicks"
            value={data.totalClicks.toLocaleString()}
            subtitle="+23% from last week"
            icon={BarChart3}
          />
          <SummaryCard
            title="Most Recent Click"
            value={data.recentClick.time}
            subtitle={`from ${data.recentClick.country} ${data.recentClick.flag}`}
            icon={Clock}
          />
          <SummaryCard
            title="Protected URLs"
            value={data.protectedUrls}
            subtitle="Password protected"
            icon={Shield}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clicks Over Time */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Clicks Over Time</CardTitle>
              <CardDescription className="text-zinc-400">
                Last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clicksOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Country Distribution */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">
                Click Distribution by Country
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Top 5 countries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="clicks"
                    label={({
                      country,
                      clicks,
                    }: {
                      country: string;
                      clicks: number;
                    }) => `${country}: ${clicks}`}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #ffff",
                      borderRadius: "20px",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    itemStyle={{ color: "#ffffff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>
          <SettingsCard isGuest={false} />
        </div>

        {/* URLs Table */}
        <URLTable urls={urlsData} isGuest={false} />
      </div>
    </div>
  );
};

export default URLShortenerDashboard;
