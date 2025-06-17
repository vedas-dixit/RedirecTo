"use client";

import React, { useState } from "react";
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
import ChartSection from "../../../component/dashboard/chart/ChartSection";
import CountryDistribution from "../../../component/dashboard/distribution/CountryDistribution";

// Main Dashboard Component
const URLShortenerDashboard: React.FC = () => {
  const data: SummaryData | GuestData = summaryData;
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);

  return (
    <div 
      className="min-h-screen"
      style={{
      backgroundImage: "url('/images/background.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed"
      }}
    >
      <div className="p-4 max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-300 text-sm mt-2">
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
  <GuestLimitCard
  current={data.totalUrls as number}
  limit={12}
  />
)}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
        title="Recent Click"
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
        {/* Clicks Over Time Chart */}
        <ChartSection data={clicksOverTime} />
        
        {/* Country Distribution Chart */}
        <CountryDistribution data={countryData} />
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
