"use client";

import React, { useState, useEffect } from "react";
import { Link, BarChart3, Clock, Shield, AlertCircle } from "lucide-react";

import { URLTable } from "../../component/dashboard/table/URLTable";
import { ActivityFeed } from "../../component/dashboard/activity/ActivityFeed";
import { SummaryCard } from "../../component/dashboard/summary-cards/SummaryCard";
import { SettingsCard } from "../../component/dashboard/settings/SettingsCard";
import { GuestLimitCard } from "../../component/dashboard/summary-cards/GuestLimitCard";
import AnimatedStarButton from "../../component/custom/AnimatedButton";
import UrlCreationForm from "../../component/URL/urlCreationForm";
import { useUrlManagement } from "../../hooks/useUrlQueries";
import { useAuth } from "../../hooks/useAuth";
import SigninModal from "../../modals/SigninModal";
import ChartSection from "../../../component/dashboard/chart/ChartSection";
import CountryDistribution from "../../../component/dashboard/distribution/CountryDistribution";
import { useTheme } from "../../providers/ThemeProvider";

const LoadingSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-4 max-w-9xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-48 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse mb-2 border border-white/10 dark:border-white/20"></div>
            <div className="h-4 w-64 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse border border-white/10 dark:border-white/20"></div>
          </div>
          <div className="h-12 w-32 bg-white/8 dark:bg-black/30 backdrop-blur-xl rounded animate-pulse border border-white/10 dark:border-white/20"></div>
        </div>

        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-40 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-120 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
          <div className="h-120 bg-white/3 dark:bg-black/40 backdrop-blur-xl rounded-lg animate-pulse border border-white/15 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/60"></div>
        </div>
      </div>
    </div>
  );
};

// Error Component
const ErrorDisplay: React.FC<{ error: string; onRetry: () => void }> = ({
  error,
  onRetry,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-center space-y-4 bg-white/3 dark:bg-black/50 backdrop-blur-xl rounded-lg p-8 border border-white/15 dark:border-white/25 shadow-2xl shadow-black/40 dark:shadow-black/80">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold text-white">
          Failed to load dashboard
        </h2>
        <p className="text-white/70 dark:text-white/80">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-orange-700/80 hover:bg-orange-600/90 rounded-lg transition-colors text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const URLShortenerDashboard: React.FC = () => {
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isUrlFormOpen, setIsUrlFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  // Guest user state
  const isGuest = !user;
  const guestLimit = 5;

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
    createSuccess,
    resetCreateState,
  } = useUrlManagement();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset create state when form closes
  useEffect(() => {
    if (!isUrlFormOpen && createSuccess) {
      resetCreateState();
    }
  }, [isUrlFormOpen, createSuccess, resetCreateState]);

  // Prevent hydration mismatch by showing loading until mounted
  if (!mounted) {
    return <LoadingSkeleton />;
  }

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

  const closeSigninModal = () => setIsSigninModalOpen(false);
  const handleOpenSigninModal = () => {
    setIsSigninModalOpen(true);
    setIsUrlFormOpen(false);
  };
  const handleOpenUrlForm = () => {
    setIsUrlFormOpen(true);
    setIsSigninModalOpen(false);
  };

  return (
    <>
      <SigninModal isOpen={isSigninModalOpen} onClose={closeSigninModal} />

      <div
        className="min-h-screen"
        style={{
          backgroundImage: `url('/images/${theme === "dark" ? "background-dark.png" : "background.jpeg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
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
            <div className="flex items-center gap-3">
              <AnimatedStarButton className="p-3" onClick={handleOpenUrlForm}>
                Create URL
              </AnimatedStarButton>
            </div>
          </div>
          <UrlCreationForm
            isOpen={isUrlFormOpen}
            onClose={() => setIsUrlFormOpen(false)}
            onSuccess={() => setIsUrlFormOpen(false)}
          />
          {/* Guest Limit Card */}
          {isGuest && summary.totalUrls === 5 && (
            <GuestLimitCard
              current={summary.totalUrls}
              limit={guestLimit}
              setIsSigninModalOpen={handleOpenSigninModal}
            />
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <SummaryCard
              title="Total URLs"
              value={summary.totalUrls}
              subtitle={`${summary.totalUrls === 1 ? "1 URL" : `${summary.totalUrls} URLs`} created`}
              icon={Link}
            />
            <SummaryCard
              title="Total Clicks"
              value={summary.totalClicks.toLocaleString()}
              subtitle="+23% from last week"
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
            <SettingsCard isGuest={!user} />
          </div>

          {/* URLs Table */}
          <URLTable urls={urls} isGuest={!user} />
        </div>
      </div>
    </>
  );
};

export default URLShortenerDashboard;
