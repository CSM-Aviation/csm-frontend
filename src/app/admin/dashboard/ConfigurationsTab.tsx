import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { useConfig } from '@/app/contexts/ConfigContext';

const ConfigurationsTab: React.FC = () => {
    const [headerColor, setHeaderColor] = useState('');
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const { config } = useConfig();

    useEffect(() => {
        const headerColor = config?.header_color || "#bdae7a";
        setHeaderColor(headerColor);
    }, [config]);

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

    const handleVideoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedVideo(file);
            const previewUrl = URL.createObjectURL(file);
            setVideoPreviewUrl(previewUrl);
        }
    };

    const handleVideoUpload = async () => {
        if (selectedVideo) {
            const formData = new FormData();
            formData.append('video', selectedVideo);
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

    const handleRemoveVideo = () => {
        setSelectedVideo(null);
        setVideoPreviewUrl(null);
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
                            onChange={handleVideoSelection}
                            className="mt-1 block w-full"
                        />
                        {videoPreviewUrl && (
                            <div className="mt-4">
                                <video width="320" height="240" controls>
                                    <source src={videoPreviewUrl} type={selectedVideo?.type} />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="mt-2">
                                    <button
                                        onClick={handleRemoveVideo}
                                        className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={handleVideoUpload}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        )}
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