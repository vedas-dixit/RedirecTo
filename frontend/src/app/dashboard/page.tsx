"use client";

import React, { useState, useEffect } from "react";
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
import { Link, BarChart3, Clock, Shield, Loader2, AlertCircle } from "lucide-react";

import { URLTable } from "../../../component/dashboard/table/URLTable";
import { ActivityFeed } from "../../../component/dashboard/activity/ActivityFeed";
import { SummaryCard } from "../../../component/dashboard/summary-cards/SummaryCard";
import { SettingsCard } from "../../../component/dashboard/settings/SettingsCard";
import { GuestLimitCard } from "../../../component/dashboard/summary-cards/GuestLimitCard";
import AnimatedStarButton from "../../../component/custom/AnimatedButton";
import UrlCreationForm from "../../../component/URL/urlCreationForm";
import { useUrlManagement } from "../../../hooks/useUrlQueries";
import { useAuth } from "../../../hooks/useAuth";

// Loading Skeleton Component
const LoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-black text-white">
    <div className="p-6 max-w-9xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse"></div>
        </div>
        <div className="h-12 w-32 bg-zinc-800 rounded animate-pulse"></div>
      </div>
      
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-80 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

// Error Component
const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
      <h2 className="text-xl font-semibold">Failed to load dashboard</h2>
      <p className="text-zinc-400">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Main Dashboard Component
const URLShortenerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);

  const {
    // Dashboard data
    urls,
    summary,
    clicksOverTime,
    countryData,
    recentActivity,
    isDashboardLoading,
    isDashboardError,
    dashboardError,
    refetchDashboard,
    
    // Create URL mutation
    isCreating,
    createSuccess,
    resetCreateState,
  } = useUrlManagement();

  // Reset create state when form closes
  useEffect(() => {
    if (!isUrlFormOpen && createSuccess) {
      resetCreateState();
    }
  }, [isUrlFormOpen, createSuccess, resetCreateState]);

  // Handle create URL success
  useEffect(() => {
    if (createSuccess) {
      setIsUrlFormOpen(false);
    }
  }, [createSuccess]);

  // Show loading state
  if (isDashboardLoading) {
    return <LoadingSkeleton />;
  }

  // Show error state
  if (isDashboardError) {
    return (
      <ErrorDisplay
        error={dashboardError?.detail || "An unexpected error occurred"}
        onRetry={refetchDashboard}
      />
    );
  }

  // Determine if user is guest (you may need to adjust this logic based on your auth system)
  const isGuest = !user;
  const guestLimit = 5;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 max-w-9xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400">
              Welcome back! Here&apos;s your URL analytics.
            </p>
          </div>
          <AnimatedStarButton
            className="p-3"
            onClick={() => setIsUrlFormOpen(true)}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create URL"
            )}
          </AnimatedStarButton>
        </div>

        {/* URL Creation Form */}
        <UrlCreationForm
          isOpen={isUrlFormOpen}
          onClose={() => setIsUrlFormOpen(false)}
        />

        {/* Guest Limit Card */}
        {isGuest && (
          <GuestLimitCard 
            current={summary.totalUrls} 
            limit={guestLimit} 
          />
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Short URLs"
            value={summary.totalUrls}
            subtitle={`${summary.totalUrls === 1 ? '1 URL' : `${summary.totalUrls} URLs`} created`}
            icon={Link}
          />
          <SummaryCard
            title="Total Clicks"
            value={summary.totalClicks.toLocaleString()}
            subtitle={summary.totalClicks === 0 ? "No clicks yet" : "All time clicks"}
            icon={BarChart3}
          />
          <SummaryCard
            title="Most Recent Click"
            value={summary.recentClick?.time || "No clicks yet"}
            subtitle={
              summary.recentClick
                ? `from ${summary.recentClick.country} ${summary.recentClick.flag}`
                : "Waiting for first click"
            }
            icon={Clock}
          />
          <SummaryCard
            title="Protected URLs"
            value={summary.protectedUrls}
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
              {clicksOverTime.length > 0 ? (
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
              ) : (
                <div className="h-72 flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No click data available</p>
                    <p className="text-sm">Create some URLs to see analytics</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Country Distribution */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">
                Click Distribution by Country
              </CardTitle>
              <CardDescription className="text-zinc-400">
                {countryData.length > 0 
                  ? `Top ${Math.min(countryData.length, 5)} countries`
                  : "No data available"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {countryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={countryData.slice(0, 5)} // Show top 5 countries
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
                      {countryData.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #ffffff",
                        borderRadius: "20px",
                      }}
                      labelStyle={{ color: "#ffffff" }}
                      itemStyle={{ color: "#ffffff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                    <svg
                      className="h-12 w-12 mx-auto mb-4 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <p>No geographic data available</p>
                    <p className="text-sm">Get clicks to see country distribution</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity and Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>
          <SettingsCard isGuest={isGuest} />
        </div>

        {/* URLs Table */}
        <URLTable urls={urls} isGuest={isGuest} />
      </div>
    </div>
  );
};

export default URLShortenerDashboard;