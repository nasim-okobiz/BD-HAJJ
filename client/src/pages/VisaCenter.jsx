import React, { useState, useEffect } from "react";
import Containar from "../components/container/Containar";
import api from "../components/axios/Axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../components/axios/config";
import { AiOutlineRight } from "react-icons/ai";

const VisaCenter = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package?priority=3");
        console.log("These are products", response.data);
        if (response.data.statusCode === 200) {
          setPackagesData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <div className="py-5 pl-4 sm:pl-[140px] bg-gray-50 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold block">
              Home
            </Link>
            <AiOutlineRight />
            <span>Visa Center</span>
          </nav>
        </Containar>
      </div>
      <Containar className={`pt-10 pb-40`}>
        {loading ? (
          <p>Loading...</p>
        ) : packagesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {packagesData.map((pkg) => (
              // <div
              //   key={visa.id}
              //   className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
              // >
              //   <h2 className="text-lg font-semibold">{visa.packageRef}</h2>
              //   <p className="text-gray-600">{visa.description}</p>
              //   <p className="text-blue-500 font-bold mt-2">
              //     ${visa.price.toFixed(2)}
              //   </p>
              // </div>
              <>
                <div
                  key={pkg._id}
                  className="overflow-hidden group cursor-pointer h-full p-4 bg-white shadow-xl rounded-lg relative z-20"
                >
                  <img
                    className="w-full h-[200px] object-cover rounded"
                    src={`${API_BASE_URL}${pkg?.photo}`}
                    alt={pkg?.name}
                  />
                  <div className="flex flex-col justify-between mt-3 space-y-5">
                    <h5 className="text-[16px] sm:text-[16px] text-[#4F5B69] font-semibold line-clamp-2">
                      {pkg.name.slice(0, 20).replace(/\s\S*$/, "") + " ..."}
                    </h5>
                    <p className="text-[13px] sm:text-[12px] text-[#7D8B99] line-clamp-2">
                      {pkg?.title.slice(0, 20).replace(/\s\S*$/, "") + " . . ."}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-[14px] font-semibold text-[#AA8751]">
                        TK {pkg?.mrpPrice?.toLocaleString()}/-
                      </span>
                      <div>
                        <span className="line-through text-[#6C7A84] text-[13px] font-medium">
                          TK {pkg?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/package/${pkg._id}`}
                      className="w-full block bg-semisecondary hover:text-semisecondary border border-semisecondary py-2 px-4 rounded text-white hover:bg-white font-bold transition-all ease-linear duration-200 text-center mt-5"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <p>No visa packages available.</p>
        )}
      </Containar>
    </div>
  );
};

export default VisaCenter;
