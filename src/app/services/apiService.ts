// services/apiService.ts

import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
});

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface ErrorResponse {
  message?: string;
}

export interface SeoData {
  _id?: string;
  page?: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  robots: string;
  author: string;
  language: string;
  siteName: string;
  type: 'website' | 'article' | 'book' | 'profile'; // Restrict to allowed types
  twitterHandle: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];

}

export interface Vendor {
  _id: string;
  companyName: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
  argusStatus?: string;
  wyvernStatus?: string;
  isbaoStatus?: string;
  alternativeCertification?: string;
  documents?: {
    certificate?: string;
    smsManual?: string;
    opsSpec?: string;
    insurance?: string;
    additionalCerts?: string;
  };
  rejectReason?: string;
}

// New: Cache implementation
interface CacheItem<T> {
  data: T;
  expiry: number;
}


const cache: { [key: string]: CacheItem<any> } = {};
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

// New: Function to get cached data or fetch new data
async function getCachedData<T>(
  key: string,
  fetchFunction: () => Promise<ApiResponse<T>>,
  cacheTime: number = DEFAULT_CACHE_TIME
): Promise<ApiResponse<T>> {
  const now = Date.now();
  const cachedItem = cache[key];

  if (cachedItem && now < cachedItem.expiry) {
    return { data: cachedItem.data, error: null };
  }

  const response = await fetchFunction();

  if (!response.error) {
    cache[key] = {
      data: response.data,
      expiry: now + cacheTime
    };
  }

  return response;
}

async function handleApiResponse<T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    return { data: response.data, error: null };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error('API Error:', axiosError.response?.data || axiosError.message);
    return {
      data: null,
      error: axiosError.response?.data?.message ?? axiosError.message ?? 'An unknown error occurred'
    };
  }
}

// Check if localStorage is available
const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

// Add a request interceptor to include the token in requests
api.interceptors.request.use((config) => {
  if (isLocalStorageAvailable) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const apiService = {
  async get<T>(endpoint: string, cacheTime?: number): Promise<ApiResponse<T>> {
    return getCachedData<T>(
      endpoint,
      () => handleApiResponse(api.get<T>(endpoint)),
      cacheTime
    );
  },

  // New: Method to clear cache
  clearCache(endpoint?: string) {
    if (endpoint) {
      delete cache[endpoint];
    } else {
      Object.keys(cache).forEach(key => delete cache[key]);
    }
  },

  async post<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return handleApiResponse(api.post<T>(endpoint, data, config));
  },

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return handleApiResponse(api.put<T>(endpoint, data));
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return handleApiResponse(api.delete<T>(endpoint));
  },

  // New auth methods
  async login(username: string, password: string): Promise<ApiResponse<{ token: string }>> {
    return handleApiResponse(api.post<{ token: string }>('/api/auth/login', { username, password }));
  },

  async logout(): Promise<ApiResponse<void>> {
    return handleApiResponse(api.post<void>('/api/auth/logout'));
  },

  // New analytics methods
  async trackPageView(data: PageViewData): Promise<ApiResponse<void>> {
    return handleApiResponse(api.post<void>('/api/analytics/pageview', data));
  },

  async getAnalyticsDashboard(timeframe: string = '7d'): Promise<ApiResponse<AnalyticsDashboardData>> {
    return this.get<AnalyticsDashboardData>(`/api/analytics/dashboard?timeframe=${timeframe}`);
  },

  async fetchFleet(cacheTime?: number): Promise<ApiResponse<FleetItem[]>> {
    return this.get<FleetItem[]>('/api/fleet', cacheTime);
  },

  async fetchSeoData(page: string): Promise<ApiResponse<SeoData>> {
    // For SEO data, we don't need authentication, so we can bypass the token check
    return handleApiResponse(api.get<SeoData>(`/api/seo/${page}`));
  },

  // New SEO configuration methods
  async getAllSeoConfigurations(): Promise<ApiResponse<SeoData[]>> {
    return this.get<SeoData[]>('/api/seo/configurations/all');
  },

  async updateSeoConfiguration(id: string, config: Partial<SeoData>): Promise<ApiResponse<void>> {
    return this.put<void>(`/api/seo/configurations/${id}`, config);
  },

  async submitSurvey(data: SurveySubmission): Promise<ApiResponse<{ id: string }>> {
    return handleApiResponse(api.post<{ id: string }>('/api/surveys', data));
  },

  async getSurveys(): Promise<ApiResponse<Array<SurveySubmission & { submittedAt: string }>>> {
    return handleApiResponse(api.get<Array<SurveySubmission & { submittedAt: string }>>('/api/surveys'));
  },

  // Vendor management methods
  async getAllVendors(): Promise<ApiResponse<Vendor[]>> {
    return handleApiResponse(api.get<Vendor[]>('/api/vendor-form/all'));
  },

  async getVendor(id: string): Promise<ApiResponse<Vendor>> {
    return handleApiResponse(api.get<Vendor>(`/api/vendor-form/${id}`));
  },

  async updateVendorStatus(id: string, status: 'Approved' | 'Rejected' | 'Pending', rejectReason?: string): Promise<ApiResponse<void>> {
    const data: { status: string; rejectReason?: string } = { status };
    
    // Only include rejectReason if it's provided and status is 'Rejected'
    if (status === 'Rejected' && rejectReason) {
        data.rejectReason = rejectReason;
    }
    
    return this.put<void>(`/api/vendor-form/${id}/status`, data);
}

  // Add more methods as needed
};

// Specific API calls
export const fetchConfig = () => apiService.get<Config>('/api/config');


export interface SurveySubmission {
  _id: string;
  approved: boolean;
  submittedAt: string | number | Date;
  fullName: string;
  bookingEfficiency: number;      // 1-5 rating
  // fboLocating: number;           // 1-5 rating
  // fboStaffCourtesy: number;      // 1-5 rating
  aircraftCleanliness: number;   // 1-5 rating
  cabinComfort: number;          // 1-5 rating
  crewProfessionalism: number;   // 1-5 rating
  overallSatisfaction: number;   // 1-5 rating
  willRecommend: string;         // 'Yes' or 'No'
  email: string;                 // Optional
  comments: string;              // Optional
}

// Define your types
export interface Config {
  header_color: string;
  home_video: string;
  f1_video1: string;
  f1_video2: string;
}


export interface FleetItem {
  _id: string;
  aircraftName: string;
  registration: string;
  seats: string;
  lavatory: string;
  altitude: string;
  cabinHeight: string;
  cabinLength: string;
  cabinWidth: string;
  description: string;
  doorHeight: string;
  doorWidth: string;
  luggageCapacity: string;
  range: string;
  speed: string;
  wifi: string;
  amenities: string;
  category: string;
  yor: string;
  imageUrls: string[];
}

// Add this new function to fetch fleet data
export const fetchFleet = () => apiService.get<FleetItem[]>('/api/fleet');


// New trip request interface
export interface TripRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  aircraftType: string;
  tripType: string;
  departureLocation: string;
  startDate: string;
  departureTime: string;
  destinationLocation: string;
  returnDate?: string;
  returnTime?: string;
  tripDetails: string;
}

// New type definitions for analytics
export interface PageViewData {
  sessionId: string;
  timestamp: string;
  url: string;
  path: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  pageViews: number;
  city: string;
  region: string;
  country: string;
}

export interface AnalyticsDashboardData {
  totalVisitors: number;
  totalPageViews: number;
  newUsers: number;
  dates: string[];
  pageViews: number[];
  userLocations: { [key: string]: number };
  pagesVisited: { [key: string]: number };
  visitorTrend: { date: string; visitors: number }[];
}

export interface AnalyticsOverview {
  totalVisitors: number;
  totalPageViews: number;
  newUsers: number;
  returningUsers: number;
}

export interface EngagementMetrics {
  hourlyActivity: Array<{
    _id: number;
    count: number;
  }>;
  trafficSources: {
    [source: string]: number;
  };
}

export interface GeographyData {
  userLocations: Record<string, number>;
  // or alternatively:
  // userLocations: {
  //   [location: string]: number;
  // };
}

export interface ContentMetrics {
  pagesVisited: Array<{
    path: string;
    views: number;
    uniqueVisitors: number;
    bounceRate: number;
  }>;
}

export interface TrendData {
  visitorTrend: Array<{
    date: string;
    visitors: number;
    pageviews: number;
  }>;
}

export interface AnalyticsDashboardData {
  overview: {
    totalVisitors: number;
    totalPageViews: number;
    newUsers: number;
    returningUsers: number;
  };
  trends: {
    visitorTrend: Array<{
      date: string;
      visitors: number;
      pageviews: number;
    }>;
  };
  engagement: {
    hourlyActivity: Array<{
      _id: number;
      count: number;
    }>;
    trafficSources: Record<string, number>;
    performanceMetrics: {
      bounceRate: number;
      avgSessionDuration: number;
      avgPagesPerSession: number;
    };
  };
  geography: {
    userLocations: Record<string, number>;
  };
  content: {
    pagesVisited: Array<{
      path: string;
      views: number;
      uniqueVisitors: number;
      bounceRate: number;
      avgTimeOnPage: number;
    }>;
  };
}

export const submitTripRequest = (data: TripRequest) => apiService.post<{ message: string; id: string }>('/api/trip-request', data);

// Add more specific API calls as needed

export const testCORS = () => apiService.get('/test-cors');
