import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import Loader from "../loader/Loader";

const AllPackage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getPackages = async () => {
    try {
      const response = await api.get(`/package/pagination`);
      setPackages(response?.data?.data?.result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  if (isLoading) {
    return (
      <Loader/>
    );
  };


  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
        {packages?.map((pkg) => {
          const validDate = pkg?.validDate;
          const isValid = validDate ? new Date(validDate) > Date.now() : false;

          return (
            <div
              key={pkg._id}
              className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col justify-between"
            >
              <div>
                <Link to={`/package/${pkg._id}`}>
                  <img
                    src={API_BASE_URL + pkg.photo}
                    alt={pkg.name}
                    className="w-full h-[180px] rounded-md mb-4"
                  />
                </Link>

                <Link
                  to={`/package/${pkg._id}`}
                  className="text-lg sm:text-xl inline-block font-semibold mb-2 mt-3 text-semisecondary"
                >
                  {pkg.name}
                </Link>

                <div className="flex items-center gap-2">
                  <p className="text-lg sm:text-xl font-bold text-green-600 mb-2">
                    Tk.{" "}
                    {new Intl.NumberFormat({
                      style: "currency",
                      currency: "BDT",
                    }).format(pkg.mrpPrice)}
                  </p>
                  {pkg.discountPrice > 0 && (
                    <p className="text-sm sm:text-base font-bold line-through text-red-500 mb-2">
                      Tk.{" "}
                      {new Intl.NumberFormat({
                        style: "currency",
                        currency: "BDT",
                      }).format(pkg.price)}
                    </p>
                  )}
                </div>

                <ul className="mb-4 ml-5 text-gray-700">
                  {pkg?.packageIncludes?.splice(0, 4).map((feature, index) => (
                    <li key={index} className="relative">
                      {feature}
                      <span className="absolute -left-5 top-1/2 -translate-y-1/2">
                        <FaCheck />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {pkg?.discountPrice > 0 ? (
                <>
                  {isValid ? (
                    <Link
                      to={`/package/${pkg._id}`}
                      className="w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                    >
                      Place Order
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full block text-center border border-red-600 text-red-600 py-2 px-4 rounded font-bold transition-all ease-linear duration-200"
                    >
                      Package Expired
                    </button>
                  )}
                </>
              ) : (
                <Link
                  to={`/package/${pkg._id}`}
                  className="w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                >
                  Place Order
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPackage;
