import React from "react";

import Containar from "../container/Containar";
import { Link } from "react-router-dom";
import bgshape from "../../assets/pattern/pattern.jpg";

// src/data/packagesData.js
const packagesData = [
  {
    id: 1,
    imageUrl: "https://mynilnod.com/storage/uploads/packageImage/27.jpg",
    name: "Duo Discovery Package",
    price: "TK. 60,000/-",
    roomSharing: "5-6 Persons Room Sharing",
    hotelDistance: "6 min from Makkah (500 mtr)",
    madinahDistance: "3 min from Madinah (200 mtr)"
  },
  {
    id: 2,
    imageUrl: "https://mynilnod.com/storage/uploads/packageImage/45.jpg",
    name: "Single Comfort Package",
    price: "TK. 80,000/-",
    roomSharing: "Single Room",
    hotelDistance: "5 min from Makkah (400 mtr)",
    madinahDistance: "2 min from Madinah (150 mtr)"
  },
  {
    id: 3,
    imageUrl: "https://mynilnod.com/storage/uploads/packageImage/33.jpg",
    name: "Family Relax Package",
    price: "TK. 100,000/-",
    roomSharing: "4 Persons Room Sharing",
    hotelDistance: "7 min from Makkah (600 mtr)",
    madinahDistance: "5 min from Madinah (250 mtr)"
  },
  {
    id: 4,
    imageUrl: "https://mynilnod.com/storage/uploads/packageImage/51.jpg",
    name: "Executive Deluxe Package",
    price: "TK. 150,000/-",
    roomSharing: "Double Room",
    hotelDistance: "3 min from Makkah (300 mtr)",
    madinahDistance: "1 min from Madinah (100 mtr)"
  },
  
];


const Package = ({ bgImage }) => {
  return (
    <div className="py-10 sm:py-32 font-philo relative bg-gray-100">
      <div className="absolute left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <Containar>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesData.map((pkg) => (
            <div key={pkg.id} className="z-20 overflow-hidden group cursor-pointer p-4 bg-white shadow-xl rounded-lg">
              <div className="h-[180px] w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-all ease-linear duration-300"
                  src={pkg.imageUrl}
                  alt={pkg.name}
                />
              </div>
              <div className="w-full flex">
                <div>
                  <Link to={`packages/${pkg.id}`} className="text-[18px] sm:text-[24px] leading-8 font-semibold mt-3 mb-2 line-clamp-2">
                    {pkg.name}
                  </Link>
                  <h3 className="text-[16px] sm:text-[20px] font-semibold">{pkg.price}</h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-[14px] sm:text-[16px]">{pkg.roomSharing}</p>
                    <p className="text-[14px] sm:text-[16px]">{pkg.hotelDistance}</p>
                    <p className="text-[14px] sm:text-[16px]">{pkg.madinahDistance}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <Link className="px-4 py-1.5 block w-full text-center hover:bg-white border border-semisecondary hover:text-semisecondary transition-all ease-linear duration-150 font-bold hover:border-semisecondary hover:border bg-semisecondary text-white rounded-lg" to={"/booking"}>
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Containar>
    </div>
  );
};

export default Package;
