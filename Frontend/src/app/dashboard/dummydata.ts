// Types
interface RecentClick {
  time: string;
  country: string;
  flag: string;
}

interface SummaryData {
  totalUrls: number;
  totalClicks: number;
  recentClick: RecentClick;
  protectedUrls: number;
}

interface GuestData extends SummaryData {
  limit: number;
}

interface ClickData {
  day: string;
  clicks: number;
}

interface CountryData {
  country: string;
  clicks: number;
  color: string;
}

interface Activity {
  id: number;
  shortUrl: string;
  country: string;
  flag: string;
  time: string;
}

interface URLData {
  id: number;
  shortUrl: string;
  destination: string;
  clicks: number;
  ttl: string;
  status: 'Active' | 'Expired';
  protected: boolean;
  createdAt: string;
}


export const summaryData: SummaryData = {
  totalUrls: 124,
  totalClicks: 2847,
  recentClick: {
    time: '2 hours ago',
    country: 'India',
    flag: '🇮🇳'
  },
  protectedUrls: 8
};

export const guestData: GuestData = {
  totalUrls: 3,
  totalClicks: 47,
  recentClick: {
    time: '1 hour ago',
    country: 'USA',
    flag: '🇺🇸'
  },
  protectedUrls: 1,
  limit: 5
};

export const clicksOverTime: ClickData[] = [
  { day: 'Mon', clicks: 45 },
  { day: 'Tue', clicks: 52 },
  { day: 'Wed', clicks: 38 },
  { day: 'Thu', clicks: 67 },
  { day: 'Fri', clicks: 84 },
  { day: 'Sat', clicks: 91 },
  { day: 'Sun', clicks: 73 }
];

export const countryData: CountryData[] = [
  { country: 'India', clicks: 1247, color: '#f97316' },
  { country: 'USA', clicks: 892, color: '#3b82f6' },
  { country: 'UK', clicks: 345, color: '#10b981' },
  { country: 'Germany', clicks: 234, color: '#8b5cf6' },
  { country: 'Others', clicks: 129, color: '#f59e0b' }
];

export const recentActivity: Activity[] = [
  { id: 1, shortUrl: 'short.ly/abc123', country: 'India', flag: '🇮🇳', time: '2 mins ago' },
  { id: 2, shortUrl: 'short.ly/def456', country: 'USA', flag: '🇺🇸', time: '5 mins ago' },
  { id: 3, shortUrl: 'short.ly/ghi789', country: 'UK', flag: '🇬🇧', time: '12 mins ago' },
  { id: 4, shortUrl: 'short.ly/jkl012', country: 'Germany', flag: '🇩🇪', time: '18 mins ago' },
  { id: 5, shortUrl: 'short.ly/mno345', country: 'Canada', flag: '🇨🇦', time: '25 mins ago' }
];

export const urlsData: URLData[] = [
  {
    id: 1,
    shortUrl: 'short.ly/abc123',
    destination: 'https://example.com/very-long-url-that-needs-shortening',
    clicks: 234,
    ttl: '7 days',
    status: 'Active',
    protected: true,
    createdAt: '2024-06-01'
  },
  {
    id: 2,
    shortUrl: 'short.ly/def456',
    destination: 'https://github.com/user/repository',
    clicks: 156,
    ttl: 'Never',
    status: 'Active',
    protected: false,
    createdAt: '2024-06-02'
  },
  {
    id: 3,
    shortUrl: 'short.ly/ghi789',
    destination: 'https://docs.google.com/document/d/example',
    clicks: 89,
    ttl: 'Expired',
    status: 'Expired',
    protected: true,
    createdAt: '2024-05-28'
  }
];