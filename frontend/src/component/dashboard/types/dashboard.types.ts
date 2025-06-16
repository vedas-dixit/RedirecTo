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
  id: string;
  shortUrl: string;
  country: string;
  flag: string;
  time: string;
}

export interface URLData {
  id: string;
  shortUrl: string;
  destination: string;
  clicks: number;
  ttl: string;
  status: string;
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
  setIsSigninModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
