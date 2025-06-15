import { User as SupabaseUser } from "@supabase/supabase-js";

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

export interface RecentClick {
  time: string;
  country: string;
  flag: string;
}

export interface SummaryData {
  totalUrls: number;
  totalClicks: number;
  protectedUrls: number;
  recentClick?: RecentClick | null;
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

export interface PreparedUser {
  id?: string;
  is_guest: boolean;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  provider: string | null;
  provider_id: string | null;
}

export interface GuestUser extends PreparedUser {
  guest_uuid: string;
}

export type UserPayload = PreparedUser | GuestUser | SupabaseUser;

export interface CreateUrlRequest {
  long_url: string;
  user?: UserPayload;
}

export interface DashboardResponse {
  urls: URLData[];
  summary: SummaryData;
  clicksOverTime: ClickData[];
  countryData: CountryData[];
  recentActivity: Activity[];
}

export interface ApiError {
  detail: string;
  status?: number;
}

export interface QueryProviderProps {
  children: React.ReactNode;
}


