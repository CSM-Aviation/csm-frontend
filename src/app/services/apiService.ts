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
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return handleApiResponse(api.get<T>(endpoint));
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

  async getAnalyticsDashboard(): Promise<ApiResponse<AnalyticsDashboardData>> {
    return handleApiResponse(api.get<AnalyticsDashboardData>('/api/analytics/dashboard'));
  },

  async fetchSeoData(page: string): Promise<ApiResponse<SeoData>> {
    // For SEO data, we don't need authentication, so we can bypass the token check
    return handleApiResponse(api.get<SeoData>(`/api/seo/${page}`, {
      headers: { Authorization: undefined }
    }));
  },

  // New SEO configuration methods
  async getAllSeoConfigurations(): Promise<ApiResponse<SeoData[]>> {
    return this.get<SeoData[]>('/api/seo/configurations/all');
  },

  async updateSeoConfiguration(id: string, config: Partial<SeoData>): Promise<ApiResponse<void>> {
    return this.put<void>(`/api/seo/configurations/${id}`, config);
  },
  // Add more methods as needed
};

// Specific API calls
export const fetchConfig = () => apiService.get<Config>('/api/config');

// Define your types
export interface Config {
  header_color: string;
  home_video: string;
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
  yom: string;
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

export const submitTripRequest = (data: TripRequest) => apiService.post<{ message: string; id: string }>('/api/trip-request', data);

// Add more specific API calls as needed

export const testCORS = () => apiService.get('/test-cors');
