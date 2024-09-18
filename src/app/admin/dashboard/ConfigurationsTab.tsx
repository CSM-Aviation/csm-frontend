import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useConfig } from '@/app/contexts/ConfigContext';

const ConfigurationsTab: React.FC = () => {
    const [headerColor, setHeaderColor] = useState('');
    const [homeVideo, setHomeVideo] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const { config } = useConfig();
    // Default color if config is not loaded yet

    useEffect(() => {
        const headerColor = config?.header_color || "#bdae7a";
        setHeaderColor(headerColor);
    }, []);

    //   const fetchCurrentConfig = async () => {
    //     const response = await apiService.get('/api/config');
    //     if (response.data) {
    //       setHeaderColor(response.data?.header_color);
    //     }
    //   };

    const handleColorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setHeaderColor(newColor);
        const response = await apiService.put('/api/update-header', { header_color: newColor });
        if (response.data) {
            setMessage('Header color updated successfully');
        } else {
            setMessage('Failed to update header color');
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHomeVideo(file);
            const formData = new FormData();
            formData.append('video', file);
            try {
                const response = await apiService.post('/api/update-home-video', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.data) {
                    setMessage('Home video updated successfully');
                } else {
                    setMessage('Failed to update home video');
                }
            } catch (error) {
                console.error('Error uploading video:', error);
                setMessage('Error uploading video');
            }
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Configurations</h3>
                <div className="mt-5">
                    <div className="mt-2">
                        <label htmlFor="header-color" className="block text-sm font-medium text-gray-700">
                            Header Color
                        </label>
                        <input
                            type="color"
                            id="header-color"
                            name="header-color"
                            value={headerColor}
                            onChange={handleColorChange}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="home-video" className="block text-sm font-medium text-gray-700">
                            Home Video
                        </label>
                        <input
                            type="file"
                            id="home-video"
                            name="home-video"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="mt-1 block w-full"
                        />
                    </div>
                    {message && (
                        <div className="mt-4 text-sm text-green-600">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfigurationsTab;