// services/apiService.ts

import axios, { AxiosResponse, AxiosError,AxiosRequestConfig  } from 'axios';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://www.csmaviation-api.com'
// const BASE_URL = 'https://ec2-54-215-27-231.us-west-1.compute.amazonaws.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface ErrorResponse {
  message?: string;
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

// Add a request interceptor to include the token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

export const submitTripRequest = (data: TripRequest) => apiService.post<{ message: string; id: string }>('/api/trip-request', data);

// Add more specific API calls as needed

export const testCORS = () => apiService.get('/test-cors');
