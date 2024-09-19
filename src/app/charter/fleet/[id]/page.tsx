"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AircraftDetailPageProps {
  params: { id: string };
  searchParams: { model: string };
}

const AircraftDetailPage = ({ params, searchParams }: AircraftDetailPageProps) => {
  const { id } = params;
  const { model } = searchParams;
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`/api/images?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched images:", data);
        setImages(data);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, [id]);

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-5xl font-bold mb-4 text-blue-600">Aircraft Details</h1>
      {id && model && images.length > 0 ? (
        <div className="">
          <p className="text-5xl text-center mb-6">
            {id} - {model}
          </p>
          <div className="flex  px-10 flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative w-full h-[400px] mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={`${model} - Image ${selectedImage + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-24   flex-shrink-0 cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={img}
                      alt={`${model} - Thumbnail ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-10 ">
              <button className=" text-black border-gray-400  border-2 font-bold py-5 px-10 rounded-2xl hover:bg-red-700 hover:text-white transition duration-300">
                CHARTER QUOTE
              </button>
              <button className=" text-black font-bold py-5 px-10 border-gray-400  border-2  rounded-2xl hover:bg-blue-700  hover:text-white transition duration-300">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading aircraft details...</p>
      )}
    </div>
  );
};

export default AircraftDetailPage;