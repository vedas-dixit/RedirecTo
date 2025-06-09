// Types
import { LucideIcon } from "lucide-react";

export interface RecentClick {
  time: string;
  country: string;
  flag: string;
}
export interface SummaryData {
  totalUrls: number;
  totalClicks: number;
  recentClick: RecentClick;
  protectedUrls: number;
}

export interface GuestData extends SummaryData {
  limit: number;
}

export interface ClickData {
  day: string;
  clicks: number;
}

export interface CountryData {
  country: string;
  clicks: number;
  color: string;
}

export interface Activity {
  id: number;
  shortUrl: string;
  country: string;
  flag: string;
  time: string;
}

export interface URLData {
  id: number;
  shortUrl: string;
  destination: string;
  clicks: number;
  ttl: string;
  status: 'Active' | 'Expired';
  protected: boolean;
  createdAt: string;
}

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: string;
}

export interface GuestLimitCardProps {
  current: number;
  limit: number;
}

export interface ActivityFeedProps {
  activities: Activity[];
}

export interface URLTableProps {
  urls: URLData[];
  isGuest: boolean;
}

export interface SettingsCardProps {
  isGuest: boolean;
}