"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Config } from '../services/apiService';

interface ConfigContextType {
  config: Config | null;
  error: string | null;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await apiService.get<Config>('/api/config');
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setConfig(response.data);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, error }}>
      {children}
    </ConfigContext.Provider>
  );
};