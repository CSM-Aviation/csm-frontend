// hooks/useConfig.ts
import { useState, useEffect } from 'react';
import { fetchConfig, Config } from '../services/apiService';

export function useConfig() {
    const [config, setConfig] = useState<Config | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getConfig() {
            setLoading(true);
            try {
                const response = await fetchConfig();
                if (response.error) {
                    setError(response.error);
                } else {
                    setConfig(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch config:", error);
            } finally {
                setLoading(false);
            }
            //   setLoading(false);
        }

        getConfig();
    }, []);

    return { config, loading, error };
}