import React from "react";
import Image from "next/image";

type Item = {
  name: string;
  link: string;
  image: string;
};

const items: Item[] = [
  {
    name: "Miami",
    link: "https://example.com/one",
    image: "/images/PopularDestinations/Miami/Miami.jpg",
  },
  {
    name: "New York",
    link: "https://example.com/two",
    image: "/images/PopularDestinations/New York/NewYork.jpg",
  },
  {
    name: "Los Angeles",
    link: "https://example.com/three",
    image: "/images/PopularDestinations/Los Angeles/LosAngeles.jpeg",
  },
  {
    name: "Las Vegas",
    link: "https://example.com/three",
    image: "/images/PopularDestinations/Las Vegas/LasVegas.jpeg",
  },
];

const PopularDestinations = () => {
  return (
    <>
      <div className="w-full h-full py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center pb-5">
            Popular Private Jet Charter Destinations
          </h1>
          <p className="text-center">
            Fly to your dream destination with Mercury Jets. We offer private
            jet charter flights to over 1,000 destinations worldwide. Depending
            on your needs and preferences, there are many private charter flight
            destinations to choose from.
          </p>
        </div>
        <div className="p-10 grid grid-cols-4 gap-4 ">
          {items.map((item) => (
            <div key={item.name} >
                <div className="bg-black" >
                <Image className="object-cover"
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                
              />
                </div>
             
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularDestinations;
