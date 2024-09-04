// services/apiService.ts

import axios, { AxiosResponse, AxiosError } from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
const BASE_URL = 'http://54.215.27.231:5000'
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

export const apiService = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return handleApiResponse(api.get<T>(endpoint));
  },

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return handleApiResponse(api.post<T>(endpoint, data));
  },

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return handleApiResponse(api.put<T>(endpoint, data));
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return handleApiResponse(api.delete<T>(endpoint));
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

// Add more specific API calls as needed

export const testCORS = () => apiService.get('/test-cors');
