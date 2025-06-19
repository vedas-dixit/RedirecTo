import { User as SupabaseUser } from "@supabase/supabase-js";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface AnimatedStarButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  Link?: string;
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
  id: string;
  is_guest: boolean;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
  provider: string | null;
  provider_id: string | null;
}

export type UserPayload = PreparedUser | SupabaseUser;

export interface CreateUrlRequest {
  long_url: string;
  user: {
    id: string;
  };
  expires_at?: string | null;
  click_limit?: number;
  password?: string | null;
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

export interface UrlFormData {
  destination: string;
  is_protected: boolean;
  password?: string;
  expires_at?: string;
  click_limit?: number;
}

export interface UrlCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: UrlFormData) => void;
}

export interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

export interface DynamicStar {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface ProtectedLinkPageProps {
  id?: string;
}

export type protectedUrlPageProp = {
  shortCode: string;
};

export interface CreateUserResponse {
  user_id: string;
  is_guest: boolean;
  email?: string;
  name?: string;
  avatar_url?: string;
  provider: string;
  message: string;
}
