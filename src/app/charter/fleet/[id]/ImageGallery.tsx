import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';
import Image from 'next/image';
import customLoader from '../../../../../image-loader';

interface ImageGalleryProps {
    images: string[];
  }
  
  const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className="relative w-full h-[400px]">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          loader={customLoader}
          style={{ objectFit: isFullscreen ? 'contain' : 'cover' }}
          className="rounded-lg"
        />
        
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
          >
            {isFullscreen ? <X size={24} /> : <Maximize size={24} />}
          </button>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 px-2 py-1 rounded-full text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {!isFullscreen && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-24 h-20 cursor-pointer ${
                currentIndex === index ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                loader={customLoader}
                style={{ objectFit: 'cover' }}
                className="rounded"
              />
            </div>
          ))}
        </div>

      )}
      
    </div>
  );
};

export default ImageGallery;